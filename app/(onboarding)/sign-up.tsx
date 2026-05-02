import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/useAuthStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

function validate(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  return errors;
}

export default function SignUpScreen() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const passwordChecks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'A number or symbol', ok: /[\d!@#$%^&*]/.test(password) },
  ];

  const canSubmit = terms && email.length > 0 && password.length >= 8;

  const handleSubmit = () => {
    setSubmitted(true);
    const errs = validate(email, password);
    setErrors(errs);
    if (Object.keys(errs).length === 0 && terms) {
      setUser({ id: 'local', email, name: email.split('@')[0] });
      router.push('/(onboarding)/level-select');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title="Create account" step="1 of 3" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headline}>What's your email?</Text>
          <Text style={styles.sub}>We'll use this to save your progress.</Text>

          <View style={styles.fields}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={submitted ? errors.email : undefined}
            />
            <Input
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={submitted ? errors.password : undefined}
            />
          </View>

          {password.length > 0 && (
            <View style={styles.checks}>
              {passwordChecks.map((c) => (
                <View key={c.label} style={styles.checkRow}>
                  <View style={[styles.checkDot, c.ok && styles.checkDotOk]} />
                  <Text style={[styles.checkLabel, c.ok && styles.checkLabelOk]}>{c.label}</Text>
                </View>
              ))}
            </View>
          )}

          <Pressable style={styles.checkboxRow} onPress={() => setTerms((t) => !t)}>
            <View style={[styles.checkbox, terms && styles.checkboxChecked]}>
              {terms && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the{' '}
              <Text style={styles.link}>Terms</Text>
              {' '}and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </Pressable>

          <Pressable style={styles.checkboxRow} onPress={() => setMarketing((m) => !m)}>
            <View style={[styles.checkbox, marketing && styles.checkboxChecked]}>
              {marketing && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Send me weekly Maltese tips and culture stories.</Text>
          </Pressable>
        </ScrollView>

        <View style={styles.ctaWrap}>
          <Pressable
            style={({ pressed }) => [
              styles.cta,
              !canSubmit && styles.ctaDisabled,
              pressed && canSubmit && styles.pressed,
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            <Text style={styles.ctaLabel}>Continue →</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.screenH2, paddingTop: 12, paddingBottom: 120 },
  headline: { fontSize: FontSizes.h1, fontWeight: '600', color: Colors.ink, marginBottom: 4, letterSpacing: -0.5 },
  sub: { fontSize: FontSizes.bodySmall, color: Colors.ink2 },
  fields: { marginTop: 28, gap: 18 },
  checks: { marginTop: 12, gap: 6 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.15)' },
  checkDotOk: { backgroundColor: Colors.sageDeep },
  checkLabel: { fontSize: FontSizes.small, color: Colors.ink3 },
  checkLabelOk: { color: Colors.sageDeep },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 24 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: Colors.red, borderColor: Colors.red },
  checkmark: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  checkboxLabel: { flex: 1, fontSize: FontSizes.small, color: Colors.ink2, lineHeight: 20 },
  link: { color: Colors.red, fontWeight: '600' },
  ctaWrap: {
    paddingHorizontal: Spacing.screenH2,
    paddingBottom: 40,
    paddingTop: 12,
    backgroundColor: Colors.cream,
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
  ctaDisabled: { opacity: 0.45 },
  ctaLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
