import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Falko } from '@/components/Falko';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

const SOCIAL_BTNS = [
  {
    label: 'Continue with Apple',
    dark: true,
    route: '/(onboarding)/sign-up' as const,
  },
  {
    label: 'Continue with Google',
    dark: false,
    route: '/(onboarding)/sign-up' as const,
  },
];

export default function AuthGateScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Falko size={88} mood="happy" />
        <Text style={styles.headline}>Save your progress</Text>
        <Text style={styles.sub}>
          Create an account so streaks, badges and lessons sync across your devices.
        </Text>
      </View>

      <View style={styles.ctas}>
        <Pressable
          style={({ pressed }) => [styles.emailBtn, pressed && styles.pressed]}
          onPress={() => router.push('/(onboarding)/sign-up')}
        >
          <Text style={styles.emailLabel}>Sign up with email</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {SOCIAL_BTNS.map((b) => (
          <Pressable
            key={b.label}
            style={({ pressed }) => [
              styles.socialBtn,
              b.dark ? styles.socialDark : styles.socialLight,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push(b.route)}
          >
            <Text style={[styles.socialLabel, b.dark && styles.socialLabelDark]}>
              {b.label}
            </Text>
          </Pressable>
        ))}

        <View style={styles.signinRow}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/(onboarding)/sign-in')}>
            <Text style={styles.signinLink}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    alignItems: 'center',
    gap: 16,
  },
  headline: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.ink,
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  sub: {
    fontSize: FontSizes.body,
    lineHeight: 24,
    color: Colors.ink2,
    textAlign: 'center',
  },
  ctas: {
    paddingHorizontal: Spacing.screenH2,
    paddingBottom: 48,
    gap: 10,
  },
  emailBtn: {
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
  emailLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(0,0,0,0.08)' },
  dividerText: { fontSize: FontSizes.small, color: Colors.ink3, fontWeight: '500' },
  socialBtn: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialDark: { backgroundColor: Colors.ink },
  socialLight: { borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)', backgroundColor: Colors.white },
  socialLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink },
  socialLabelDark: { color: Colors.white },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  signinText: { fontSize: FontSizes.bodySmall, color: Colors.ink2 },
  signinLink: { fontSize: FontSizes.bodySmall, fontWeight: '700', color: Colors.red },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
