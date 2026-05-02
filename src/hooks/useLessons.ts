import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Lesson = Database['public']['Tables']['lessons']['Row'];
type Flashcard = Database['public']['Tables']['flashcards']['Row'];
type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
type QuizOption = Database['public']['Tables']['quiz_options']['Row'];
type LessonProgress = Database['public']['Tables']['user_lesson_progress']['Row'];

export interface LessonWithProgress extends Lesson {
  progress: LessonProgress | null;
}

export interface LessonDetail {
  lesson: Lesson;
  flashcards: Flashcard[];
  questions: (QuizQuestion & { options: QuizOption[] })[];
}

export function useBeginnerLessons(userId: string | undefined) {
  const [lessons, setLessons] = useState<LessonWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLessons([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchBeginnerLessons(userId).then((data) => {
      if (!cancelled) {
        setLessons(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { lessons, loading };
}

export async function fetchBeginnerLessons(userId: string): Promise<LessonWithProgress[]> {
  const [{ data: lessons }, { data: progress }] = await Promise.all([
    supabase.from('lessons').select('*').eq('track', 'beginner').eq('published', true).order('sort_order'),
    supabase.from('user_lesson_progress').select('*').eq('user_id', userId),
  ]);

  return (lessons ?? []).map((lesson) => ({
    ...lesson,
    progress: progress?.find((p) => p.lesson_id === lesson.id) ?? null,
  }));
}

export async function fetchLessonDetail(lessonSlug: string): Promise<LessonDetail | null> {
  const { data: lesson } = await supabase.from('lessons').select('*').eq('slug', lessonSlug).single();

  if (!lesson) return null;

  const [{ data: flashcards }, { data: questions }] = await Promise.all([
    supabase.from('flashcards').select('*').eq('lesson_id', lesson.id).order('sort_order'),
    supabase.from('quiz_questions').select('*').eq('lesson_id', lesson.id).order('sort_order'),
  ]);

  const questionIds = (questions ?? []).map((q) => q.id);
  const { data: allOptions } = questionIds.length
    ? await supabase.from('quiz_options').select('*').in('question_id', questionIds).order('option_index')
    : { data: [] };

  const questionsWithOptions = (questions ?? []).map((q) => ({
    ...q,
    options: (allOptions ?? []).filter((o) => o.question_id === q.id),
  }));

  return {
    lesson,
    flashcards: flashcards ?? [],
    questions: questionsWithOptions,
  };
}

export async function markLessonComplete(
  userId: string,
  lessonId: string,
  stars: number = 3
): Promise<void> {
  await supabase.from('user_lesson_progress').upsert({
    user_id: userId,
    lesson_id: lessonId,
    state: 'complete',
    stars,
    completed_at: new Date().toISOString(),
  });
}

export async function saveFlashcardRating(
  userId: string,
  flashcardId: string,
  rating: 'again' | 'good' | 'easy',
  currentRepetitions: number,
  currentEaseFactor: number
): Promise<void> {
  const q = rating === 'easy' ? 5 : rating === 'good' ? 4 : 2;
  const newEase = Math.max(1.3, currentEaseFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const newReps = q >= 3 ? currentRepetitions + 1 : 0;
  const newInterval = newReps <= 1 ? 1 : newReps === 2 ? 6 : Math.round(currentRepetitions * newEase);
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  await supabase.from('user_flashcard_ratings').upsert({
    user_id: userId,
    flashcard_id: flashcardId,
    rating,
    ease_factor: newEase,
    interval_days: newInterval,
    repetitions: newReps,
    next_review_at: nextReview.toISOString(),
    last_rated_at: new Date().toISOString(),
  });
}

export async function saveQuizAnswer(
  userId: string,
  questionId: string,
  selectedOptionIndex: number,
  isCorrect: boolean
): Promise<void> {
  await supabase.from('user_quiz_answers').insert({
    user_id: userId,
    question_id: questionId,
    selected_option_index: selectedOptionIndex,
    is_correct: isCorrect,
  });
}
