// Mirror of Supabase schema — regenerate when migrations change (`supabase gen types`).

export type Level = 'beginner' | 'intermediate' | 'advanced';
export type LessonState = 'not_started' | 'in_progress' | 'complete';
export type FlashcardRating = 'again' | 'good' | 'easy';
export type XpSource =
  | 'lesson_complete'
  | 'quiz_perfect'
  | 'streak_bonus'
  | 'share_badge'
  | 'invite'
  | 'daily_goal';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: { id: string; display_name?: string | null; avatar_url?: string | null };
        Update: { display_name?: string | null; avatar_url?: string | null };
      };
      user_settings: {
        Row: {
          user_id: string;
          level: Level;
          daily_goal_minutes: 5 | 10 | 15 | 20;
          notifications_enabled: boolean;
          onboarding_complete: boolean;
          locale: 'en' | 'mt';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          level?: Level;
          daily_goal_minutes?: number;
          notifications_enabled?: boolean;
          onboarding_complete?: boolean;
          locale?: 'en' | 'mt';
        };
        Update: {
          level?: Level;
          daily_goal_minutes?: number;
          notifications_enabled?: boolean;
          onboarding_complete?: boolean;
          locale?: 'en' | 'mt';
        };
      };
      lessons: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_mt: string | null;
          subtitle_en: string | null;
          track: Level;
          topic_id: string | null;
          sort_order: number;
          xp_reward: number;
          published: boolean;
          created_at: string;
        };
        Insert: never;
        Update: never;
      };
      flashcards: {
        Row: {
          id: string;
          lesson_id: string;
          maltese: string;
          english: string;
          pronunciation: string | null;
          audio_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: never;
        Update: never;
      };
      quiz_questions: {
        Row: {
          id: string;
          lesson_id: string;
          prompt: string;
          correct_option_index: number;
          sort_order: number;
          created_at: string;
        };
        Insert: never;
        Update: never;
      };
      quiz_options: {
        Row: {
          id: string;
          question_id: string;
          option_index: number;
          text: string;
        };
        Insert: never;
        Update: never;
      };
      user_lesson_progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          state: LessonState;
          stars: number;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          state?: LessonState;
          stars?: number;
          completed_at?: string | null;
        };
        Update: {
          state?: LessonState;
          stars?: number;
          completed_at?: string | null;
        };
      };
      user_flashcard_ratings: {
        Row: {
          user_id: string;
          flashcard_id: string;
          rating: FlashcardRating;
          ease_factor: number;
          interval_days: number;
          repetitions: number;
          next_review_at: string;
          last_rated_at: string;
        };
        Insert: {
          user_id: string;
          flashcard_id: string;
          rating: FlashcardRating;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          next_review_at?: string;
        };
        Update: {
          rating?: FlashcardRating;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          next_review_at?: string;
          last_rated_at?: string;
        };
      };
      user_quiz_answers: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          selected_option_index: number;
          is_correct: boolean;
          answered_at: string;
        };
        Insert: {
          user_id: string;
          question_id: string;
          selected_option_index: number;
          is_correct: boolean;
        };
        Update: never;
      };
      streaks: {
        Row: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_active_date: string | null;
          freeze_available: boolean;
          freeze_used_at: string | null;
          updated_at: string;
        };
        Insert: { user_id: string };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          last_active_date?: string | null;
          freeze_available?: boolean;
          freeze_used_at?: string | null;
        };
      };
      xp_log: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          source: XpSource;
          reference_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          amount: number;
          source: XpSource;
          reference_id?: string | null;
        };
        Update: never;
      };
      achievements: {
        Row: {
          id: string;
          title_en: string;
          title_mt: string | null;
          description_en: string;
          icon_emoji: string;
          condition_type: 'streak' | 'xp' | 'lessons_complete' | 'words_mastered';
          condition_value: number;
        };
        Insert: never;
        Update: never;
      };
      user_achievements: {
        Row: { user_id: string; achievement_id: string; earned_at: string };
        Insert: { user_id: string; achievement_id: string };
        Update: never;
      };
    };
    Views: {
      user_stats: {
        Row: {
          user_id: string;
          display_name: string | null;
          total_xp: number;
          current_streak: number;
          longest_streak: number;
          mastered_words: number;
          total_rated_words: number;
          lessons_complete: number;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
