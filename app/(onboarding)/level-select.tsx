import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuthStore } from '@/stores/useAuthStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

type Level = 'beginner' | 'intermediate' | 'advanced';

const LEVELS: { id: Level; mt: string; en: string; sub: string; phrase: string; bars: number }[] = [
  { id: 'beginner', mt: 'Beġinner', en: 'Beginner', sub: "I'm new to Maltese", phrase: 'Bonġu! · Hello!', bars: 1 },
  { id: 'intermediate', mt: 'Medju', en: 'Intermediate', sub: 'I know some basics', phrase: 'Kif inti llum?', bars: 2 },
  { id: 'advanced', mt: 'Avvanzat', en: 'Advanced', sub: 'I can hold a conversation', phrase: 'Imma għaliex le?', bars: 3 },
];

export default function LevelSelectScreen() {
  const router = useRouter();
  const setLevel = useAuthStore((s) => s.setLevel);
  const [selected, setSelected] = useState<Level>('beginner');

  const handleContinue = () => {
    setLevel(selected);
    router.push('/(onboarding)/daily-goal');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title="Your level" step="2 of 3" />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headline}>Where are you starting?</Text>
        <Text style={styles.sub}>We'll pick a path that feels right — you can change this anytime.</Text>

        <View style={styles.levels}>
          {LEVELS.map((l) => {
            const isSelected = selected === l.id;
            return (
              <Pressable
                key={l.id}
                onPress={() => setSelected(l.id)}
                style={[styles.levelCard, isSelected && styles.levelCardSelected]}
              >
                {/* level indicator */}
                <View style={[styles.levelIcon, isSelected && styles.levelIconSelected]}>
                  {[1, 2, 3].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.bar,
                        { height: i <= l.bars ? 22 : 10 },
                        i <= l.bars
                          ? isSelected ? styles.barActiveSel : styles.barActive
                          : isSelected ? styles.barInactiveSel : styles.barInactive,
                      ]}
                    />
                  ))}
                </View>

                <View style={styles.levelText}>
                  <View style={styles.levelTitleRow}>
                    <Text style={styles.levelMt}>{l.mt}</Text>
                    <Text style={styles.levelEn}> · {l.en}</Text>
                  </View>
                  <Text style={styles.levelSub}>{l.sub}</Text>
                  <Text style={styles.levelPhrase}>"{l.phrase}"</Text>
                </View>

                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* placement test nudge */}
        <Pressable style={styles.placementRow}>
          <View style={styles.placementIcon}>
            <Text style={styles.placementEmoji}>?</Text>
          </View>
          <Text style={styles.placementText}>Not sure? Take a 2-min placement test</Text>
          <Text style={styles.placementChevron}>›</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.ctaWrap}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          onPress={handleContinue}
        >
          <Text style={styles.ctaLabel}>Continue →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.screenH2, paddingTop: 12, paddingBottom: 120 },
  headline: { fontSize: FontSizes.h1, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginBottom: 4 },
  sub: { fontSize: FontSizes.bodySmall, color: Colors.ink2, marginBottom: 24 },
  levels: { gap: 12 },
  levelCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  levelCardSelected: {
    borderWidth: 2,
    borderColor: Colors.red,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  levelIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.cream2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flexShrink: 0,
  },
  levelIconSelected: { backgroundColor: Colors.red },
  bar: { width: 8, borderRadius: 4 },
  barActive: { backgroundColor: Colors.red },
  barActiveSel: { backgroundColor: Colors.white },
  barInactive: { backgroundColor: 'rgba(0,0,0,0.12)' },
  barInactiveSel: { backgroundColor: 'rgba(255,255,255,0.35)' },
  levelText: { flex: 1 },
  levelTitleRow: { flexDirection: 'row', alignItems: 'baseline' },
  levelMt: { fontSize: FontSizes.h2Small, fontWeight: '600', color: Colors.ink },
  levelEn: { fontSize: FontSizes.small, color: Colors.ink2 },
  levelSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 2 },
  levelPhrase: { fontSize: FontSizes.small, fontStyle: 'italic', color: Colors.ink3, marginTop: 8 },
  checkBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: Colors.white, fontSize: 12, fontWeight: '800' },
  placementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.cream2,
    marginTop: 18,
  },
  placementIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placementEmoji: { fontSize: 18, fontWeight: '700', color: Colors.red },
  placementText: { flex: 1, fontSize: FontSizes.small, fontWeight: '600', color: Colors.ink },
  placementChevron: { fontSize: 18, color: Colors.ink2 },
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
