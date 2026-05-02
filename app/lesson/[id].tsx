import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useLessonStore } from '@/stores/useLessonStore';
import { useSession } from '@/hooks/useAuth';
import {
  fetchBeginnerLessons,
  fetchLessonDetail,
  markLessonComplete,
  saveFlashcardRating,
  saveQuizAnswer,
  type LessonWithProgress,
  type LessonDetail,
} from '@/hooks/useLessons';
import { awardXp, recordDailyActivity, checkAndAwardAchievements } from '@/hooks/useProgression';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

type Phase = 'list' | 'flashcard' | 'quiz' | 'complete';

export default function LessonScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string }>();
  const slug = typeof rawId === 'string' ? rawId : rawId?.[0];
  const router = useRouter();
  const { session } = useSession();
  const userId = session?.user?.id;

  const [phase, setPhase] = useState<Phase>('list');
  const [allLessons, setAllLessons] = useState<LessonWithProgress[]>([]);
  const [currentDetail, setCurrentDetail] = useState<LessonDetail | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);

  const { startLesson, cards, cardIndex, isFlipped, flipCard, rateCard, questions, questionIndex, selectedOption, answerState, selectOption, nextQuestion, lives } = useLessonStore();

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setListLoading(true);
    fetchBeginnerLessons(userId).then((data) => {
      if (!cancelled) {
        setAllLessons(data);
        setListLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleStartLesson = useCallback(
    async (lessonSlug: string) => {
      setLessonLoading(true);
      const detail = await fetchLessonDetail(lessonSlug);
      setLessonLoading(false);
      if (!detail) return;

      setCurrentDetail(detail);
      const storeCards = detail.flashcards.map((f) => ({
        id: f.id,
        maltese: f.maltese,
        english: f.english,
        pronunciation: f.pronunciation ?? undefined,
      }));
      const storeQuestions = detail.questions.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        options: q.options.map((o) => o.text),
        correctIndex: q.correct_option_index,
      }));
      startLesson(detail.lesson.id, storeCards, storeQuestions);
      setPhase('flashcard');
    },
    [startLesson]
  );

  useEffect(() => {
    if (!slug || slug === 'foundation' || !userId) return;
    void handleStartLesson(slug);
  }, [slug, userId, handleStartLesson]);

  useEffect(() => {
    if (phase !== 'quiz') return;
    if (questions.length === 0) {
      setPhase('complete');
      return;
    }
    const q = questions[questionIndex];
    if (q === undefined) {
      setPhase('complete');
    }
  }, [phase, questions, questionIndex]);

  const getLessonState = (lesson: LessonWithProgress, index: number) => {
    if (lesson.progress?.state === 'complete') return 'done';
    const prevAllDone = allLessons.slice(0, index).every((l) => l.progress?.state === 'complete');
    return prevAllDone ? 'active' : 'locked';
  };

  const handleRateCard = async (rating: 'again' | 'good' | 'easy') => {
    const cardId = cards[cardIndex]?.id;
    rateCard(rating);
    if (userId && cardId) {
      saveFlashcardRating(userId, cardId, rating, 0, 2.5).catch(() => null);
    }
  };

  const handleSelectOption = async (idx: number) => {
    const questionId = questions[questionIndex]?.id;
    const q = questions[questionIndex];
    const isCorrect = q?.correctIndex === idx;
    selectOption(idx);
    if (userId && questionId) {
      saveQuizAnswer(userId, questionId, idx, isCorrect).catch(() => null);
    }
  };

  const handleComplete = async () => {
    if (userId && currentDetail) {
      const stars = lives >= 3 ? 3 : lives >= 2 ? 2 : 1;
      await Promise.all([
        markLessonComplete(userId, currentDetail.lesson.id, stars),
        awardXp(userId, currentDetail.lesson.xp_reward, 'lesson_complete', currentDetail.lesson.id),
        recordDailyActivity(userId),
      ]).catch(() => null);
      await checkAndAwardAchievements(userId).catch(() => null);
    }
    router.back();
  };

  if (!slug) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Lesson" />
        <View style={styles.center}>
          <Text style={styles.errorText}>Missing lesson.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === 'list') {
    const doneLessons = allLessons.filter((l) => l.progress?.state === 'complete').length;
    const totalLessons = allLessons.length;

    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Beginner Path" />
        <ScrollView contentContainerStyle={styles.listContent}>
          <Text style={styles.unitTitle}>Foundation</Text>
          <Text style={styles.unitSub}>
            {totalLessons > 0 ? `${totalLessons} lessons` : 'Loading lessons…'}
          </Text>
          {totalLessons > 0 && (
            <>
              <ProgressBar progress={doneLessons / totalLessons} style={{ marginTop: 14 }} />
              <Text style={styles.unitProgress}>
                {doneLessons} of {totalLessons} complete
              </Text>
            </>
          )}

          {listLoading ? (
            <ActivityIndicator style={{ marginTop: 40 }} color={Colors.red} />
          ) : (
            <View style={styles.lessonList}>
              {allLessons.map((l, idx) => {
                const state = getLessonState(l, idx);
                const isDone = state === 'done';
                const isActive = state === 'active';
                const isLocked = state === 'locked';
                return (
                  <Pressable
                    key={l.id}
                    disabled={isLocked}
                    onPress={() => handleStartLesson(l.slug)}
                    style={[styles.lessonRow, isLocked && styles.lessonRowLocked]}
                  >
                    {idx < allLessons.length - 1 && <View style={styles.connector} />}
                    <View style={[
                      styles.node,
                      isDone && styles.nodeDone,
                      isActive && styles.nodeActive,
                      isLocked && styles.nodeLocked,
                    ]}>
                      {isDone && <Text style={styles.nodeCheck}>✓</Text>}
                      {isActive && <Text style={styles.nodeNum}>{idx + 1}</Text>}
                      {isLocked && <Text style={styles.nodeLockIcon}>🔒</Text>}
                    </View>
                    <View style={styles.lessonInfo}>
                      <Text style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}>
                        {l.title_en}
                      </Text>
                      <Text style={styles.lessonSub}>{l.subtitle_en ?? ''}</Text>
                    </View>
                    {isActive && (
                      <View style={styles.startBadge}>
                        <Text style={styles.startBadgeLabel}>Start →</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (lessonLoading || !currentDetail) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Loading…" />
        <View style={styles.center}>
          <ActivityIndicator color={Colors.red} />
        </View>
      </SafeAreaView>
    );
  }

  const lesson = currentDetail.lesson;

  if (phase === 'flashcard') {
    const card = cards[cardIndex];
    const isLastCard = cardIndex >= cards.length - 1;

    if (!card) {
      return (
        <SafeAreaView style={styles.safe} edges={['top']}>
          <AppHeader title={lesson.title_en} />
          <View style={styles.center}>
            <Text style={styles.completeTitle}>Cards done! Time for the quiz.</Text>
            <Pressable style={styles.cta} onPress={() => setPhase(questions.length > 0 ? 'quiz' : 'complete')}>
              <Text style={styles.ctaLabel}>{questions.length > 0 ? 'Start Quiz →' : 'Finish →'}</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title={lesson.title_en} />
        <View style={styles.flashcardScreen}>
          <ProgressBar
            progress={(cardIndex + 1) / cards.length}
            style={{ marginHorizontal: Spacing.screenH2, marginBottom: 24 }}
          />
          <Text style={styles.cardCounter}>
            {cardIndex + 1} / {cards.length}
          </Text>

          <Pressable style={[styles.flashcard, isFlipped && styles.flashcardFlipped]} onPress={flipCard}>
            {!isFlipped ? (
              <View style={styles.cardFace}>
                <Text style={styles.cardHint}>Tap to reveal</Text>
                <Text style={styles.cardMaltese}>{card.maltese}</Text>
                {card.pronunciation ? (
                  <Text style={styles.cardPronunciation}>[{card.pronunciation}]</Text>
                ) : null}
              </View>
            ) : (
              <View style={styles.cardFace}>
                <Text style={styles.cardEnglish}>{card.english}</Text>
                <Text style={styles.cardHint}>How well did you know this?</Text>
              </View>
            )}
          </Pressable>

          {isFlipped && (
            <View style={styles.ratingRow}>
              {[
                { label: 'Again', color: Colors.red, rating: 'again' as const },
                { label: 'Good', color: Colors.sageDeep, rating: 'good' as const },
                { label: 'Easy', color: Colors.ochre, rating: 'easy' as const },
              ].map((r) => (
                <Pressable
                  key={r.rating}
                  style={[styles.ratingBtn, { borderColor: r.color }]}
                  onPress={() => {
                    handleRateCard(r.rating);
                    if (isLastCard) {
                      setPhase(questions.length > 0 ? 'quiz' : 'complete');
                    }
                  }}
                >
                  <Text style={[styles.ratingLabel, { color: r.color }]}>{r.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {!isFlipped && <Text style={styles.cardInstruction}>Tap the card to flip it</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (phase === 'quiz') {
    const q = questions[questionIndex];
    const isLastQuestion = questionIndex >= questions.length - 1;

    if (!q) {
      return (
        <SafeAreaView style={styles.safe} edges={['top']}>
          <AppHeader title={lesson.title_en} />
          <View style={styles.center}>
            <ActivityIndicator color={Colors.red} />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.quizHeader}>
          <AppHeader title={lesson.title_en} />
          <View style={styles.livesRow}>
            {[0, 1, 2].map((i) => (
              <Text key={i} style={[styles.heart, i >= lives && styles.heartLost]}>♥</Text>
            ))}
          </View>
        </View>

        <View style={styles.quizScreen}>
          <ProgressBar
            progress={(questionIndex + 1) / questions.length}
            style={{ marginHorizontal: Spacing.screenH2, marginBottom: 24 }}
          />
          <Text style={styles.quizPrompt}>{q.prompt}</Text>

          <View style={styles.optionList}>
            {q.options.map((opt, idx) => {
              const isSelected = answerState !== 'idle' && idx === selectedOption;
              const isRevealedCorrect = answerState !== 'idle' && idx === q.correctIndex;
              const optOverride = isSelected
                ? answerState === 'correct'
                  ? styles.optionCorrect
                  : styles.optionWrong
                : isRevealedCorrect
                  ? styles.optionCorrect
                  : null;
              return (
                <Pressable
                  key={idx}
                  style={[styles.option, optOverride]}
                  onPress={() => answerState === 'idle' && handleSelectOption(idx)}
                  disabled={answerState !== 'idle'}
                >
                  <Text style={[styles.optionText, (isSelected || isRevealedCorrect) && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {answerState !== 'idle' && (
            <View style={styles.ctaWrap}>
              <Pressable
                style={styles.cta}
                onPress={() => {
                  if (isLastQuestion) {
                    setPhase('complete');
                  } else {
                    nextQuestion();
                  }
                }}
              >
                <Text style={styles.ctaLabel}>{isLastQuestion ? 'Finish →' : 'Continue →'}</Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.red }]} edges={['top', 'bottom']}>
      <View style={styles.completeScreen}>
        <Text style={styles.completeEmoji}>🎉</Text>
        <Text style={styles.completeHeadline}>Lesson complete!</Text>
        <Text style={styles.completeSub}>{lesson.title_en}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpBadgeText}>+{lesson.xp_reward} XP</Text>
        </View>
        <Pressable style={styles.completeCta} onPress={handleComplete}>
          <Text style={styles.completeCtaLabel}>Back to lessons</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: Spacing.screenH2 },
  errorText: { fontSize: FontSizes.body, color: Colors.ink2 },

  listContent: { paddingHorizontal: Spacing.screenH, paddingBottom: 100, paddingTop: 4 },
  unitTitle: { fontSize: FontSizes.h1Large, fontWeight: '600', color: Colors.ink, marginTop: 8, letterSpacing: -0.5 },
  unitSub: { fontSize: FontSizes.bodySmall, color: Colors.ink2, marginTop: 4 },
  unitProgress: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 6 },
  lessonList: { marginTop: 20, position: 'relative' },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
    position: 'relative',
  },
  lessonRowLocked: { opacity: 0.5 },
  connector: {
    position: 'absolute',
    left: 21,
    top: 54,
    bottom: -10,
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  node: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: Colors.cream2,
  },
  nodeDone: { backgroundColor: Colors.sageDeep },
  nodeActive: { backgroundColor: Colors.red },
  nodeLocked: { backgroundColor: Colors.cream2 },
  nodeCheck: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  nodeNum: { color: Colors.white, fontSize: FontSizes.body, fontWeight: '700' },
  nodeLockIcon: { fontSize: 16 },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink },
  lessonTitleLocked: { color: Colors.ink3 },
  lessonSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 2 },
  startBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.red,
  },
  startBadgeLabel: { fontSize: FontSizes.small, fontWeight: '700', color: Colors.white },

  flashcardScreen: { flex: 1, paddingTop: 8 },
  cardCounter: { textAlign: 'center', fontSize: FontSizes.small, color: Colors.ink3, marginBottom: 12 },
  flashcard: {
    marginHorizontal: Spacing.screenH2,
    minHeight: 280,
    borderRadius: Radii.cardXl,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  flashcardFlipped: { backgroundColor: Colors.cream2 },
  cardFace: { alignItems: 'center', gap: 12 },
  cardHint: { fontSize: FontSizes.small, color: Colors.ink3 },
  cardMaltese: { fontSize: 48, fontWeight: '700', color: Colors.ink, letterSpacing: -1, textAlign: 'center' },
  cardPronunciation: { fontSize: FontSizes.body, color: Colors.ink2, fontStyle: 'italic' },
  cardEnglish: { fontSize: FontSizes.h1, fontWeight: '600', color: Colors.ink, textAlign: 'center' },
  cardInstruction: { textAlign: 'center', color: Colors.ink3, fontSize: FontSizes.small, marginTop: 20 },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: Spacing.screenH2,
    marginTop: 28,
    justifyContent: 'center',
  },
  ratingBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingLabel: { fontSize: FontSizes.bodySmall, fontWeight: '700' },

  quizHeader: {},
  quizScreen: { flex: 1, paddingTop: 8 },
  livesRow: { flexDirection: 'row', gap: 4, justifyContent: 'center', marginBottom: 8 },
  heart: { fontSize: 20, color: Colors.red },
  heartLost: { color: 'rgba(0,0,0,0.15)' },
  quizPrompt: {
    fontSize: FontSizes.h2,
    fontWeight: '600',
    color: Colors.ink,
    paddingHorizontal: Spacing.screenH2,
    marginBottom: 24,
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  optionList: { paddingHorizontal: Spacing.screenH, gap: 10 },
  option: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  optionCorrect: {
    backgroundColor: Colors.sage,
    borderColor: Colors.sageDeep,
    borderWidth: 2,
  },
  optionWrong: {
    backgroundColor: Colors.redTint,
    borderColor: Colors.red,
    borderWidth: 2,
  },
  optionText: { fontSize: FontSizes.body, color: Colors.ink, fontWeight: '500' },
  optionTextSelected: { fontWeight: '700' },
  ctaWrap: { paddingHorizontal: Spacing.screenH2, paddingTop: 24 },
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
  ctaLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },

  completeScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  completeEmoji: { fontSize: 72 },
  completeHeadline: { fontSize: FontSizes.hero, fontWeight: '700', color: Colors.white },
  completeSub: { fontSize: FontSizes.h2, color: 'rgba(255,255,255,0.8)' },
  xpBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  xpBadgeText: { fontSize: FontSizes.h2, fontWeight: '700', color: Colors.white },
  completeCta: {
    marginTop: 8,
    height: 56,
    paddingHorizontal: 40,
    borderRadius: Radii.button,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeCtaLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.red },
  completeTitle: { fontSize: FontSizes.h2, fontWeight: '600', color: Colors.ink },
});
