import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Falko } from '@/components/Falko';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAuthStore } from '@/stores/useAuthStore';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

const CONTINUE_CARDS = [
  { id: 'alphabet', emoji: 'A', title: 'The Alphabet', sub: 'Lesson 4 · Letters Ġ Ħ Ż', pct: 0.8, bg: Colors.sage },
  { id: 'numbers', emoji: '5', title: 'Numbers 1–20', sub: 'Lesson 2 · Counting up', pct: 0.45, bg: Colors.cream2 },
];

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const dailyGoal = useAuthStore((s) => s.dailyGoalMinutes);
  const streakDays = useProgressionStore((s) => s.streakDays);
  const xp = useProgressionStore((s) => s.xp);

  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const dailyProgress = 3; // TODO: derive from progression store
  const dailyTotal = Math.round(dailyGoal / 3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* greeting row */}
        <View style={styles.greetRow}>
          <View>
            <Text style={styles.greetSub}>Bonġu, {firstName} 👋</Text>
            <Text style={styles.greetTitle}>Let's learn today</Text>
          </View>
          <View style={styles.streakPill}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakLabel}>{streakDays} days</Text>
          </View>
        </View>

        {/* daily goal card */}
        <Pressable
          style={styles.dailyCard}
          onPress={() => router.push('/lesson/foundation')}
        >
          <View style={styles.dailyCardFalko}>
            <Falko size={120} mood="happy" />
          </View>
          <Text style={styles.dailyEyebrow}>DAILY GOAL</Text>
          <Text style={styles.dailyTitle}>{dailyProgress} of {dailyTotal} lessons done</Text>
          <ProgressBar
            progress={dailyProgress / dailyTotal}
            height={8}
            color={Colors.white}
            trackColor="rgba(255,255,255,0.25)"
            style={styles.dailyProgress}
          />
          <View style={styles.dailyCta}>
            <Text style={styles.dailyCtaLabel}>Continue →</Text>
          </View>
        </Pressable>

        {/* continue cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pick up where you left off</Text>
          <Pressable onPress={() => router.push('/lesson/foundation')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.continueList}>
          {CONTINUE_CARDS.map((c) => (
            <Pressable
              key={c.id}
              style={styles.continueCard}
              onPress={() => router.push(`/lesson/${c.id}`)}
            >
              <View style={[styles.continueIcon, { backgroundColor: c.bg }]}>
                <Text style={styles.continueIconText}>{c.emoji}</Text>
              </View>
              <View style={styles.continueText}>
                <Text style={styles.continueTitle}>{c.title}</Text>
                <Text style={styles.continueSub}>{c.sub}</Text>
                <ProgressBar progress={c.pct} height={5} style={{ marginTop: 8 }} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* phrase of the day */}
        <View style={styles.phraseCard}>
          <View style={styles.phraseIcon}>
            <Text style={styles.phraseIconText}>💬</Text>
          </View>
          <View style={styles.phraseText}>
            <Text style={styles.phraseEyebrow}>PHRASE OF THE DAY</Text>
            <Text style={styles.phraseMaltese}>Kif int?</Text>
            <Text style={styles.phraseEnglish}>"How are you?"</Text>
          </View>
        </View>

        {/* XP row */}
        <View style={styles.xpRow}>
          <Text style={styles.xpLabel}>Total XP: <Text style={styles.xpValue}>{xp}</Text></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  greetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenH2,
    paddingTop: 8,
  },
  greetSub: { fontSize: FontSizes.small, color: Colors.ink2, fontWeight: '500' },
  greetTitle: { fontSize: FontSizes.h1Large, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginTop: 4 },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.red,
  },
  streakIcon: { fontSize: 16 },
  streakLabel: { fontSize: FontSizes.bodySmall, fontWeight: '700', color: Colors.white },
  dailyCard: {
    margin: Spacing.screenH,
    marginTop: 18,
    padding: 20,
    borderRadius: Radii.cardXl,
    backgroundColor: Colors.red,
    overflow: 'hidden',
  },
  dailyCardFalko: {
    position: 'absolute',
    right: -20,
    bottom: -10,
  },
  dailyEyebrow: {
    fontSize: FontSizes.label,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.85)',
  },
  dailyTitle: {
    fontSize: FontSizes.h2,
    fontWeight: '600',
    color: Colors.white,
    marginTop: 4,
    lineHeight: 28,
    maxWidth: 200,
  },
  dailyProgress: { marginTop: 16, width: 200 },
  dailyCta: {
    marginTop: 18,
    alignSelf: 'flex-start',
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyCtaLabel: { fontSize: FontSizes.bodySmall, fontWeight: '700', color: Colors.red },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.screenH,
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: { fontSize: FontSizes.h2Small, fontWeight: '600', color: Colors.ink },
  seeAll: { fontSize: FontSizes.small, color: Colors.red, fontWeight: '600' },
  continueList: { paddingHorizontal: Spacing.screenH, gap: 10 },
  continueCard: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  continueIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueIconText: { fontSize: 22, fontWeight: '600', color: Colors.ink },
  continueText: { flex: 1 },
  continueTitle: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink },
  continueSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 2 },
  phraseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: Spacing.screenH,
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: Colors.cream2,
  },
  phraseIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phraseIconText: { fontSize: 22 },
  phraseText: { flex: 1 },
  phraseEyebrow: { fontSize: FontSizes.label, fontWeight: '700', color: Colors.red, letterSpacing: 1 },
  phraseMaltese: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink, marginTop: 2 },
  phraseEnglish: { fontSize: FontSizes.small, color: Colors.ink2 },
  xpRow: { alignItems: 'center', marginTop: 20 },
  xpLabel: { fontSize: FontSizes.small, color: Colors.ink3 },
  xpValue: { color: Colors.red, fontWeight: '700' },
});
