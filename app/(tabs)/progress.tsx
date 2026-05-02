import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSession } from '@/hooks/useAuth';
import { useUserStats } from '@/hooks/useProgression';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

const SKILLS = [
  { label: 'Vocabulary', pct: 0.62 },
  { label: 'Grammar', pct: 0.38 },
  { label: 'Listening', pct: 0.45 },
  { label: 'Reading', pct: 0.2 },
];

export default function ProgressScreen() {
  const { session } = useSession();
  const { stats } = useUserStats(session?.user?.id);

  const xp = stats?.total_xp ?? 0;
  const streakDays = stats?.current_streak ?? 0;
  const masteredWords = stats?.mastered_words ?? 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Progress</Text>

        {/* stat row */}
        <View style={styles.statRow}>
          {[
            { label: 'Words', value: masteredWords },
            { label: 'Streak', value: `${streakDays}d` },
            { label: 'XP', value: xp },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* skills */}
        <Text style={styles.sectionTitle}>Skills breakdown</Text>
        <View style={styles.skillList}>
          {SKILLS.map((sk) => (
            <View key={sk.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{sk.label}</Text>
              <ProgressBar progress={sk.pct} style={styles.skillBar} />
              <Text style={styles.skillPct}>{Math.round(sk.pct * 100)}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.screenH2, paddingTop: 24, paddingBottom: 100 },
  title: { fontSize: FontSizes.h1Large, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginBottom: 20 },
  statRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: Radii.card,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statValue: { fontSize: FontSizes.h1, fontWeight: '700', color: Colors.red },
  statLabel: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 4 },
  sectionTitle: { fontSize: FontSizes.h2Small, fontWeight: '600', color: Colors.ink, marginTop: 28, marginBottom: 16 },
  skillList: { gap: 14 },
  skillRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  skillLabel: { width: 84, fontSize: FontSizes.bodySmall, color: Colors.ink2 },
  skillBar: { flex: 1 },
  skillPct: { width: 36, fontSize: FontSizes.small, color: Colors.ink3, textAlign: 'right' },
});
