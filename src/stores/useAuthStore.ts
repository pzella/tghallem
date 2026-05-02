import { create } from 'zustand';

type Level = 'beginner' | 'intermediate' | 'advanced';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  level: Level;
  dailyGoalMinutes: number;
  onboardingComplete: boolean;
  // actions
  setUser: (user: User | null) => void;
  setLevel: (level: Level) => void;
  setDailyGoal: (minutes: number) => void;
  completeOnboarding: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  level: 'beginner',
  dailyGoalMinutes: 10,
  onboardingComplete: false,

  setUser: (user) => set({ user }),
  setLevel: (level) => set({ level }),
  setDailyGoal: (dailyGoalMinutes) => set({ dailyGoalMinutes }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  signOut: () =>
    set({ user: null, onboardingComplete: false }),
}));
