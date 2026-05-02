import { create } from 'zustand';

interface ProgressionState {
  xp: number;
  streakDays: number;
  masteredWordIds: string[];
  completedLessonIds: string[];
  // actions
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  markWordMastered: (wordId: string) => void;
  markLessonComplete: (lessonId: string) => void;
}

export const useProgressionStore = create<ProgressionState>((set) => ({
  xp: 0,
  streakDays: 0,
  masteredWordIds: [],
  completedLessonIds: [],

  addXp: (amount) => set((s) => ({ xp: s.xp + amount })),
  incrementStreak: () => set((s) => ({ streakDays: s.streakDays + 1 })),
  markWordMastered: (wordId) =>
    set((s) => ({
      masteredWordIds: s.masteredWordIds.includes(wordId)
        ? s.masteredWordIds
        : [...s.masteredWordIds, wordId],
    })),
  markLessonComplete: (lessonId) =>
    set((s) => ({
      completedLessonIds: s.completedLessonIds.includes(lessonId)
        ? s.completedLessonIds
        : [...s.completedLessonIds, lessonId],
    })),
}));
