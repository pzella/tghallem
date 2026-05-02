import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useSession, loadUserSettings } from '@/hooks/useAuth';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_ALLOWED_INCOMPLETE = new Set([
  'level-select',
  'daily-goal',
  'sign-up',
  'sign-in',
  'auth-gate',
  'slide2',
  'slide3',
  'welcome',
]);

export default function RootLayout() {
  const { session, loading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    SplashScreen.hideAsync();

    const path = segments as string[];
    const group = path[0] ?? '';
    const screen = typeof path[1] === 'string' ? path[1] : '';
    const inOnboarding = group === '(onboarding)';

    if (!session) {
      if (!inOnboarding) {
        router.replace('/(onboarding)/welcome');
      }
      return;
    }

    loadUserSettings(session.user.id).then((settings) => {
      const complete = settings?.onboarding_complete === true;

      if (!complete) {
        if (group === '(tabs)' || group === 'lesson') {
          router.replace('/(onboarding)/level-select');
          return;
        }
        const allowed = inOnboarding && ONBOARDING_ALLOWED_INCOMPLETE.has(screen);
        if (!allowed) {
          router.replace('/(onboarding)/level-select');
        }
        return;
      }

      if (complete && inOnboarding) {
        router.replace('/(tabs)');
      }
    });
  }, [session, loading, segments, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="lesson/[id]"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="privacy" options={{ animation: 'slide_from_right' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
