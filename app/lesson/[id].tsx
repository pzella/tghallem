import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FOUNDATION_LESSONS } from '@/constants/lessonData';
import { useLessonStore } from '@/stores/useLessonStore';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

type Phase = 'list' | 'flashcard' | 'quiz' | 'complete';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('list');

  const lesson = FOUNDATION_LESSONS.find((l) => l.id === id);
  const { startLesson, cards, cardIndex, isFlipped, flipCard, rateCard, questions, questionIndex, selectedOption, answerState, selectOption, nextQuestion, lives } = useLessonStore();
  const { addXp, markLessonComplete } = useProgressionStore();

  useEffect(() => {
    if (lesson) {
      startLesson(lesson.id, lesson.cards, lesson.questions);
    }
  }, [id]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Lesson" />
        <View style={styles.center}>
          <Text style={styles.errorText}>Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── LESSON LIST ─────────────────────────────────��─────────
  if (phase === 'list') {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title="Beginner Path" />
        <ScrollView contentContainerStyle={styles.listContent}>
          <Text style={styles.unitTitle}>Foundation</Text>
          <Text style={styles.unitSub}>6 lessons · ~45 min total</Text>
          <ProgressBar progress={2 / 6} style={{ marginTop: 14 }} />
          <Text style={styles.unitProgress}>2 of 6 complete</Text>

          <View style={styles.lessonList}>
            {FOUNDATION_LESSONS.map((l, idx) => {
              const isDone = l.state === 'done';
              const isActive = l.state === 'active';
              const isLocked = l.state === 'locked';
              return (
                <Pressable
                  key={l.id}
                  disabled={isLocked}
                  onPress={() => {
                    startLesson(l.id, l.cards, l.questions);
                    setPhase('flashcard');
                  }}
                  style={[styles.lessonRow, isLocked && styles.lessonRowLocked]}
                >
                  {/* connector line */}
                  {idx < FOUNDATION_LESSONS.length - 1 && (
                    <View style={styles.connector} />
                  )}
                  {/* node */}
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
                      {l.title}
                    </Text>
                    <Text style={styles.lessonSub}>{l.subtitle}</Text>
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
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── FLASHCARD ─────────────────────────────────────────────
  if (phase === 'flashcard') {
    const card = cards[cardIndex];
    const isLastCard = cardIndex >= cards.length - 1;

    if (!card) {
      return (
        <SafeAreaView style={styles.safe} edges={['top']}>
          <AppHeader title={lesson.title} />
          <View style={styles.center}>
            <Text style={styles.completeTitle}>Cards done! Time for the quiz.</Text>
            <Pressable style={styles.cta} onPress={() => setPhase('quiz')}>
              <Text style={styles.ctaLabel}>Start Quiz →</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader title={lesson.title} />
        <View style={styles.flashcardScreen}>
          {/* progress */}
          <ProgressBar
            progress={(cardIndex + 1) / cards.length}
            style={{ marginHorizontal: Spacing.screenH2, marginBottom: 24 }}
          />
          <Text style={styles.cardCounter}>{cardIndex + 1} / {cards.length}</Text>

          {/* card */}
          <Pressable style={[styles.flashcard, isFlipped && styles.flashcardFlipped]} onPress={flipCard}>
            {!isFlipped ? (
              <View style={styles.cardFace}>
                <Text style={styles.cardHint}>Tap to reveal</Text>
                <Text style={styles.cardMaltese}>{card.maltese}</Text>
                <Text style={styles.cardPronunciation}>[{card.pronunciation}]</Text>
              </View>
            ) : (
              <View style={styles.cardFace}>
                <Text style={styles.cardEnglish}>{card.english}</Text>
                <Text style={styles.cardHint}>How well did you know this?</Text>
              </View>
            )}
          </Pressable>

          {/* rating buttons */}
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
                    rateCard(r.rating);
                    if (isLastCard) {
                      setPhase(lesson.questions.length > 0 ? 'quiz' : 'complete');
                    }
                  }}
                >
                  <Text style={[styles.ratingLabel, { color: r.color }]}>{r.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {!isFlipped && (
            <Text style={styles.cardInstruction}>Tap the card to flip it</Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ─── QUIZ ──────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = questions[questionIndex];
    const isLastQuestion = questionIndex >= questions.length - 1;

    if (!q) {
      setPhase('complete');
      return null;
    }

    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.quizHeader}>
          <AppHeader title={lesson.title} />
          {/* lives */}
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
                ? (answerState === 'correct' ? styles.optionCorrect : styles.optionWrong)
                : isRevealedCorrect
                ? styles.optionCorrect
                : null;
              return (
                <Pressable
                  key={idx}
                  style={[styles.option, optOverride]}
                  onPress={() => answerState === 'idle' && selectOption(idx)}
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
                <Text style={styles.ctaLabel}>
                  {isLastQuestion ? 'Finish →' : 'Continue →'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ─── COMPLETE ──────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.red }]} edges={['top', 'bottom']}>
      <View style={styles.completeScreen}>
        <Text style={styles.completeEmoji}>🎉</Text>
        <Text style={styles.completeHeadline}>Lesson complete!</Text>
        <Text style={styles.completeSub}>{lesson.title}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpBadgeText}>+{lesson.xpReward} XP</Text>
        </View>
        <Pressable
          style={styles.completeCta}
          onPress={() => {
            addXp(lesson.xpReward);
            markLessonComplete(lesson.id);
            router.back();
          }}
        >
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

  // list
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

  // flashcard
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

  // quiz
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

  // complete
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
