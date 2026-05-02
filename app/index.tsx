import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Index() {
  const onboardingComplete = useAuthStore((s) => s.onboardingComplete);
  return onboardingComplete
    ? <Redirect href="/(tabs)" />
    : <Redirect href="/(onboarding)/welcome" />;
}
