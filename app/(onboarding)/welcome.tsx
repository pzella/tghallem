import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Falko } from '@/components/Falko';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={[Colors.red, '#a50f22']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* decorative circles */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        {/* mascot */}
        <View style={styles.mascotWrap}>
          <View style={styles.mascotCircle}>
            <Falko size={170} mood="happy" />
          </View>
        </View>

        {/* copy */}
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>MERĦBA · WELCOME</Text>
          <Text style={styles.headline}>Learn Maltese{'\n'}the easy way</Text>
          <Text style={styles.sub}>Fun bite-sized lessons</Text>
        </View>

        {/* CTAs */}
        <View style={styles.ctas}>
          <Pressable
            style={({ pressed }) => [styles.ctaPrimary, pressed && styles.pressed]}
            onPress={() => router.push('/(onboarding)/slide2')}
          >
            <Text style={styles.ctaPrimaryLabel}>Start learning →</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.ctaSecondary, pressed && styles.pressed]}
            onPress={() => router.push('/(onboarding)/sign-in')}
          >
            <Text style={styles.ctaSecondaryLabel}>I already have an account</Text>
          </Pressable>

          {/* page dots */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  circleTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 200,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  mascotWrap: {
    alignItems: 'center',
    marginTop: 48,
  },
  mascotCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    paddingHorizontal: 32,
    paddingTop: 40,
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: FontSizes.small,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  headline: {
    fontSize: 40,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 46,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: 14,
  },
  sub: {
    fontSize: FontSizes.body,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 24,
  },
  ctas: {
    position: 'absolute',
    bottom: 48,
    left: Spacing.screenH2,
    right: Spacing.screenH2,
    gap: 12,
  },
  ctaPrimary: {
    height: 56,
    borderRadius: Radii.button,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  ctaPrimaryLabel: {
    fontSize: FontSizes.body,
    fontWeight: '700',
    color: Colors.red,
  },
  ctaSecondary: {
    height: 56,
    borderRadius: Radii.button,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSecondaryLabel: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.white,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.white,
  },
});
