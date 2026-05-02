import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

export default function Slide2Screen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* skip */}
      <View style={styles.skipRow}>
        <Pressable onPress={() => router.push('/(onboarding)/auth-gate')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      {/* card stack illustration */}
      <View style={styles.illustrationWrap}>
        <View style={[styles.card, styles.cardLeft]}>
          <Text style={styles.cardLetter}>Ġ</Text>
        </View>
        <View style={[styles.card, styles.cardRight]}>
          <Text style={[styles.cardLetter, { color: Colors.ochre }]}>5</Text>
        </View>
        <View style={[styles.card, styles.cardFront]}>
          <Text style={[styles.cardLetter, { color: Colors.white, fontSize: 110 }]}>Ħ</Text>
        </View>
      </View>

      {/* copy */}
      <View style={styles.copy}>
        <Text style={styles.headline}>Bite-sized cards,{'\n'}real progress</Text>
        <Text style={styles.sub}>
          Swipe through letters, numbers, and phrases. 5 minutes a day is all it takes.
        </Text>
      </View>

      {/* CTAs */}
      <View style={styles.ctas}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          onPress={() => router.push('/(onboarding)/slide3')}
        >
          <Text style={styles.ctaLabel}>Continue →</Text>
        </Pressable>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
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
  skip: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.ink2,
  },
  illustrationWrap: {
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: 200,
    height: 260,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLeft: {
    backgroundColor: Colors.sage,
    transform: [{ rotate: '-8deg' }, { translateX: -30 }],
  },
  cardRight: {
    backgroundColor: Colors.ochreTint,
    transform: [{ rotate: '6deg' }, { translateX: 40 }],
  },
  cardFront: {
    width: 220,
    height: 280,
    borderRadius: 24,
    backgroundColor: Colors.red,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  cardLetter: {
    fontSize: 80,
    fontWeight: '600',
    color: Colors.sageDeep,
  },
  copy: {
    paddingHorizontal: 36,
    paddingTop: 20,
    alignItems: 'center',
  },
  headline: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.ink,
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 36,
    marginBottom: 12,
  },
  sub: {
    fontSize: FontSizes.body,
    lineHeight: 24,
    color: Colors.ink2,
    textAlign: 'center',
  },
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
  ctaLabel: {
    fontSize: FontSizes.body,
    fontWeight: '700',
    color: Colors.white,
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.red,
  },
});
