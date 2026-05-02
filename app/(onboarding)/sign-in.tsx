import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { Input } from '@/components/ui/Input';
import { signInWithEmail } from '@/hooks/useAuth';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: authError } = await signInWithEmail(email, password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title="Sign in" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Text style={styles.headline}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to continue your Maltese journey.</Text>

          <View style={styles.fields}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setError('');
              }}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.ctaWrap}>
          <Pressable
            style={({ pressed }) => [styles.cta, loading && styles.ctaDisabled, pressed && !loading && styles.pressed]}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.ctaLabel}>{loading ? 'Signing in…' : 'Sign in →'}</Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/(onboarding)/sign-up')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  flex: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenH2,
    paddingTop: 12,
  },
  headline: { fontSize: FontSizes.h1, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginBottom: 4 },
  sub: { fontSize: FontSizes.bodySmall, color: Colors.ink2, marginBottom: 28 },
  fields: { gap: 18 },
  forgot: { alignSelf: 'flex-end', marginTop: 12 },
  forgotText: { fontSize: FontSizes.small, color: Colors.red, fontWeight: '600' },
  error: { marginTop: 16, fontSize: FontSizes.small, color: Colors.red, textAlign: 'center' },
  ctaWrap: { paddingHorizontal: Spacing.screenH2, paddingBottom: 40, gap: 16 },
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
  ctaDisabled: { opacity: 0.75 },
  ctaLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: FontSizes.bodySmall, color: Colors.ink2 },
  signupLink: { fontSize: FontSizes.bodySmall, fontWeight: '700', color: Colors.red },
});
