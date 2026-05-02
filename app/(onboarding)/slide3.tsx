import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Falko } from '@/components/Falko';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

const PILLARS = [
  { icon: '📚', title: 'Learn', sub: 'Vocabulary, grammar & phrases' },
  { icon: '🗣️', title: 'Speak', sub: 'Pronunciation & listening' },
  { icon: '🇲🇹', title: 'Belong', sub: 'Culture, history & community' },
];

export default function Slide3Screen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.skipRow}>
        <Pressable onPress={() => router.push('/(onboarding)/auth-gate')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.mascotRow}>
        <Falko size={100} mood="happy" />
      </View>

      <View style={styles.copy}>
        <Text style={styles.headline}>Three pillars,{'\n'}one journey</Text>
        <Text style={styles.sub}>Everything you need to truly speak Maltese.</Text>
      </View>

      <View style={styles.pillars}>
        {PILLARS.map((p) => (
          <View key={p.title} style={styles.pillar}>
            <Text style={styles.pillarIcon}>{p.icon}</Text>
            <View style={styles.pillarText}>
              <Text style={styles.pillarTitle}>{p.title}</Text>
              <Text style={styles.pillarSub}>{p.sub}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.ctas}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          onPress={() => router.push('/(onboarding)/auth-gate')}
        >
          <Text style={styles.ctaLabel}>Get started →</Text>
        </Pressable>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  skipRow: {
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: Spacing.screenH,
  },
  skip: { fontSize: FontSizes.bodySmall, fontWeight: '600', color: Colors.ink2 },
  mascotRow: { alignItems: 'center', marginTop: 8 },
  copy: { paddingHorizontal: 36, paddingTop: 20, alignItems: 'center' },
  headline: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.ink,
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 36,
    marginBottom: 10,
  },
  sub: {
    fontSize: FontSizes.bodySmall,
    lineHeight: 22,
    color: Colors.ink2,
    textAlign: 'center',
  },
  pillars: {
    marginTop: 28,
    paddingHorizontal: Spacing.screenH2,
    gap: 12,
  },
  pillar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  pillarIcon: { fontSize: 28 },
  pillarText: { flex: 1 },
  pillarTitle: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.ink },
  pillarSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 2 },
  ctas: {
    position: 'absolute',
    bottom: 48,
    left: Spacing.screenH2,
    right: Spacing.screenH2,
    gap: 16,
  },
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
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.15)' },
  dotActive: { width: 24, backgroundColor: Colors.red },
});
