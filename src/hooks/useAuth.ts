import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Level } from '@/lib/database.types';

export interface AuthState {
  session: Session | null;
  loading: boolean;
}

export function useSession(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signUp({ email, password });
  return { error };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) Alert.alert('Sign out error', error.message);
}

/** Deletes the signed-in user via GoTrue `DELETE /auth/v1/user` (requires valid session). */
export async function deleteCurrentUserAccount(): Promise<{ error: string | null }> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
  const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  if (!session?.access_token) {
    return { error: 'You must be signed in to delete your account.' };
  }
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/auth/v1/user`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: anon,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const body = await res.text();
      return { error: body || `Request failed (${res.status})` };
    }
    await supabase.auth.signOut();
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Something went wrong.';
    return { error: msg };
  }
}

export async function sendPasswordReset(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error };
}

type UserSettingsRow = import('@/lib/database.types').Database['public']['Tables']['user_settings']['Row'];

export async function saveOnboardingSettings(
  userId: string,
  level: Level,
  dailyGoalMinutes: number
): Promise<void> {
  const daily_goal_minutes = dailyGoalMinutes as UserSettingsRow['daily_goal_minutes'];
  await supabase.from('user_settings').upsert(
    {
      user_id: userId,
      level,
      daily_goal_minutes,
      onboarding_complete: true,
    },
    { onConflict: 'user_id' }
  );
}

export async function loadUserSettings(userId: string): Promise<UserSettingsRow | null> {
  const { data } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();
  return data as UserSettingsRow | null;
}

export async function loadProfile(userId: string) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
}
