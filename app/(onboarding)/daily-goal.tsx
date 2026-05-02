import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { Falko } from '@/components/Falko';
import { supabase } from '@/lib/supabase';
import { saveOnboardingSettings } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

const GOALS = [
  { mins: 5, label: 'Casual', sub: '5 min / day' },
  { mins: 10, label: 'Regular', sub: '10 min / day' },
  { mins: 15, label: 'Serious', sub: '15 min / day' },
  { mins: 20, label: 'Intense', sub: '20 min / day' },
];

export default function DailyGoalScreen() {
  const router = useRouter();
  const level = useAuthStore((s) => s.level);
  const completeLocal = useAuthStore((s) => s.completeOnboarding);
  const [selected, setSelected] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await saveOnboardingSettings(session.user.id, level, selected);
    }
    completeLocal();
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title="Daily goal" step="3 of 3" />
      <View style={styles.content}>
        <Text style={styles.headline}>How much time per day?</Text>
        <Text style={styles.sub}>Small, steady is better than big and brittle.</Text>

        <View style={styles.goals}>
          {GOALS.map((g) => {
            const isSelected = selected === g.mins;
            return (
              <Pressable
                key={g.mins}
                onPress={() => setSelected(g.mins)}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
              >
                <View style={[styles.goalIcon, isSelected && styles.goalIconSelected]}>
                  <Text style={[styles.goalMins, isSelected && styles.goalMinsSelected]}>
                    {g.mins}m
                  </Text>
                </View>
                <View style={styles.goalText}>
                  <Text style={styles.goalLabel}>{g.label}</Text>
                  <Text style={styles.goalSub}>{g.sub}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Falko nudge */}
        <View style={styles.nudge}>
          <Falko size={48} mood="happy" />
          <Text style={styles.nudgeText}>
            <Text style={styles.nudgeAccent}>Falko says: </Text>
            daily reminders make a 4× difference. Want one?
          </Text>
        </View>
      </View>

      <View style={styles.ctaWrap}>
        <Pressable
          style={({ pressed }) => [styles.cta, loading && { opacity: 0.6 }, pressed && !loading && styles.pressed]}
          onPress={handleStart}
          disabled={loading}
        >
          <Text style={styles.ctaLabel}>{loading ? 'Setting up…' : 'Start learning →'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenH2,
    paddingTop: 12,
  },
  headline: { fontSize: FontSizes.h1, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginBottom: 4 },
  sub: { fontSize: FontSizes.bodySmall, color: Colors.ink2, marginBottom: 24 },
  goals: { gap: 10 },
  goalCard: {
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  goalCardSelected: {
    borderWidth: 2,
    borderColor: Colors.red,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.cream2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconSelected: { backgroundColor: Colors.red },
  goalMins: { fontSize: FontSizes.bodySmall, fontWeight: '700', color: Colors.ink },
  goalMinsSelected: { color: Colors.white },
  goalText: { flex: 1 },
  goalLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink },
  goalSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 1 },
  nudge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.redTint,
    marginTop: 20,
  },
  nudgeText: { flex: 1, fontSize: FontSizes.small, color: Colors.ink, lineHeight: 20 },
  nudgeAccent: { fontWeight: '700', color: Colors.red },
  ctaWrap: { paddingHorizontal: Spacing.screenH2, paddingBottom: 40, paddingTop: 12, backgroundColor: Colors.cream },
  cta: {
    height: 56,
    borderRadius: Radii.button,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  ctaLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
