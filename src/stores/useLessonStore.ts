import { create } from 'zustand';

type CardRating = 'again' | 'good' | 'easy';
type QuizAnswerState = 'idle' | 'correct' | 'wrong';

interface Flashcard {
  id: string;
  maltese: string;
  english: string;
  pronunciation?: string;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

interface LessonState {
  lessonId: string | null;
  cards: Flashcard[];
  cardIndex: number;
  isFlipped: boolean;
  questions: QuizQuestion[];
  questionIndex: number;
  selectedOption: number | null;
  answerState: QuizAnswerState;
  lives: number;
  // actions
  startLesson: (lessonId: string, cards: Flashcard[], questions: QuizQuestion[]) => void;
  flipCard: () => void;
  rateCard: (rating: CardRating) => void;
  selectOption: (index: number) => void;
  nextQuestion: () => void;
  loseLife: () => void;
  resetLesson: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonId: null,
  cards: [],
  cardIndex: 0,
  isFlipped: false,
  questions: [],
  questionIndex: 0,
  selectedOption: null,
  answerState: 'idle',
  lives: 3,

  startLesson: (lessonId, cards, questions) =>
    set({ lessonId, cards, questions, cardIndex: 0, isFlipped: false, questionIndex: 0, selectedOption: null, answerState: 'idle', lives: 3 }),

  flipCard: () => set((s) => ({ isFlipped: !s.isFlipped })),

  rateCard: (_rating) =>
    set((s) => ({
      cardIndex: Math.min(s.cardIndex + 1, s.cards.length - 1),
      isFlipped: false,
    })),

  selectOption: (index) => {
    const { questions, questionIndex } = get();
    const q = questions[questionIndex];
    const correct = q?.correctIndex === index;
    set({
      selectedOption: index,
      answerState: correct ? 'correct' : 'wrong',
    });
    if (!correct) {
      set((s) => ({ lives: Math.max(0, s.lives - 1) }));
    }
  },

  nextQuestion: () =>
    set((s) => ({
      questionIndex: Math.min(s.questionIndex + 1, s.questions.length - 1),
      selectedOption: null,
      answerState: 'idle',
    })),

  loseLife: () => set((s) => ({ lives: Math.max(0, s.lives - 1) })),

  resetLesson: () =>
    set({ lessonId: null, cards: [], questions: [], cardIndex: 0, isFlipped: false, questionIndex: 0, selectedOption: null, answerState: 'idle', lives: 3 }),
}));
