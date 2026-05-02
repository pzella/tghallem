import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type UserStats = Database['public']['Views']['user_stats']['Row'];
type XpSource = Database['public']['Tables']['xp_log']['Row']['source'];

export function useUserStats(userId: string | undefined) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setStats(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchUserStats(userId).then((data) => {
      if (!cancelled) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { stats, loading };
}

export async function fetchUserStats(userId: string): Promise<UserStats | null> {
  const { data } = await supabase.from('user_stats').select('*').eq('user_id', userId).single();
  return data;
}

export async function awardXp(
  userId: string,
  amount: number,
  source: XpSource,
  referenceId?: string
): Promise<void> {
  await supabase.from('xp_log').insert({
    user_id: userId,
    amount,
    source,
    reference_id: referenceId ?? null,
  });
}

export async function recordDailyActivity(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  const { data: streak } = await supabase.from('streaks').select('*').eq('user_id', userId).single();

  if (!streak) return;

  const lastActive = streak.last_active_date;

  if (lastActive === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const isConsecutive = lastActive === yesterdayStr;
  const newStreak = isConsecutive ? streak.current_streak + 1 : 1;

  await supabase
    .from('streaks')
    .update({
      current_streak: newStreak,
      longest_streak: Math.max(streak.longest_streak, newStreak),
      last_active_date: today,
    })
    .eq('user_id', userId);

  if ([3, 7, 14, 30, 60, 100].includes(newStreak)) {
    await awardXp(userId, newStreak >= 30 ? 50 : 20, 'streak_bonus');
  }
}

export async function checkAndAwardAchievements(userId: string): Promise<void> {
  const [statsResult, achievementsResult, earnedResult] = await Promise.all([
    supabase.from('user_stats').select('*').eq('user_id', userId).single(),
    supabase.from('achievements').select('*'),
    supabase.from('user_achievements').select('achievement_id').eq('user_id', userId),
  ]);

  const stats = statsResult.data;
  const achievements = achievementsResult.data ?? [];
  const earned = new Set((earnedResult.data ?? []).map((r) => r.achievement_id));

  if (!stats) return;

  const toAward = achievements.filter((a) => {
    if (earned.has(a.id)) return false;
    switch (a.condition_type) {
      case 'streak':
        return stats.current_streak >= a.condition_value;
      case 'xp':
        return stats.total_xp >= a.condition_value;
      case 'lessons_complete':
        return stats.lessons_complete >= a.condition_value;
      case 'words_mastered':
        return stats.mastered_words >= a.condition_value;
      default:
        return false;
    }
  });

  if (toAward.length === 0) return;

  await supabase.from('user_achievements').insert(toAward.map((a) => ({ user_id: userId, achievement_id: a.id })));
}
