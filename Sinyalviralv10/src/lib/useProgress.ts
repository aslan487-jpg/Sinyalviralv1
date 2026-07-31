import { useState, useEffect, useCallback } from "react";

interface NoteProgress {
  readCount: number;
  lastRead: string;
}

interface CardProgress {
  seen: boolean;
  lastSeen: string;
}

export interface ExamTask {
  type: "read_notes" | "review_cards" | "solve_questions";
  categoryId: string;
  categoryName: string;
  description: string;
  completed: boolean;
}

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  total: number;
  passed: boolean;
  examType: "mini" | "general";
  examIndex: number; // 0-3 mini, 0-2 general
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  tasks: ExamTask[];
  tasksCompleted: boolean;
}

interface AnswerRecord {
  questionId: string;
  categoryId: string;
  isCorrect: boolean;
  answeredAt: string;
}

interface CategoryStat {
  totalAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  isWeakArea: boolean;
  strengthScore: number;
}

interface ProgressData {
  notes: Record<string, NoteProgress>;
  cards: Record<string, CardProgress>;
  answers: AnswerRecord[];
  categoryStats: Record<string, CategoryStat>;
  questionsAnswered: number;
  streak: number;
  lastActiveDate: string;
  examResults: ExamResult[];
  gameScores: { gameType: string; score: number; date: string }[];
}

const STORAGE_KEY = "sv_progress";

const defaultProgress: ProgressData = {
  notes: {},
  cards: {},
  answers: [],
  categoryStats: {},
  questionsAnswered: 0,
  streak: 0,
  lastActiveDate: "",
  examResults: [],
  gameScores: [],
};

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultProgress };
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadProgress();
    const today = new Date().toISOString().split("T")[0];
    if (loaded.lastActiveDate && loaded.lastActiveDate !== today) {
      const lastDate = new Date(loaded.lastActiveDate);
      const diff = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 1) loaded.streak = 0;
    }
    setData(loaded);
    setReady(true);
  }, []);

  const persist = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setData((prev) => {
      const next = updater(prev);
      next.lastActiveDate = new Date().toISOString().split("T")[0];
      saveProgress(next);
      return next;
    });
  }, []);

  const markNoteRead = useCallback((noteId: string) => {
    persist((prev) => {
      const existing = prev.notes[noteId];
      return {
        ...prev,
        notes: {
          ...prev.notes,
          [noteId]: {
            readCount: (existing?.readCount ?? 0) + 1,
            lastRead: new Date().toISOString(),
          },
        },
      };
    });
  }, [persist]);

  const markCardSeen = useCallback((cardId: string) => {
    persist((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardId]: { seen: true, lastSeen: new Date().toISOString() },
      },
    }));
  }, [persist]);

  const recordAnswer = useCallback((questionId: string, categoryId: string, isCorrect: boolean) => {
    persist((prev) => {
      const newAnswers = [...prev.answers, { questionId, categoryId, isCorrect, answeredAt: new Date().toISOString() }];
      
      const existing = prev.categoryStats[categoryId] || {
        totalAnswered: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        isWeakArea: false,
        strengthScore: 0,
      };
      
      const newTotal = existing.totalAnswered + 1;
      const newCorrect = existing.correctAnswers + (isCorrect ? 1 : 0);
      const newWrong = existing.wrongAnswers + (isCorrect ? 0 : 1);
      const score = (newCorrect / newTotal) * 100;
      const isWeak = score < 60 && newTotal >= 3;
      
      return {
        ...prev,
        answers: newAnswers,
        questionsAnswered: prev.questionsAnswered + 1,
        categoryStats: {
          ...prev.categoryStats,
          [categoryId]: {
            totalAnswered: newTotal,
            correctAnswers: newCorrect,
            wrongAnswers: newWrong,
            strengthScore: score,
            isWeakArea: isWeak,
          },
        },
        streak: prev.lastActiveDate === new Date().toISOString().split("T")[0] ? prev.streak : prev.streak + 1,
      };
    });
  }, [persist]);

  const incrementQuestions = useCallback((count: number = 1) => {
    persist((prev) => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + count,
      streak: prev.lastActiveDate === new Date().toISOString().split("T")[0] ? prev.streak : prev.streak + 1,
    }));
  }, [persist]);

  const saveExamResult = useCallback((result: Omit<ExamResult, "id" | "date">) => {
    persist((prev) => ({
      ...prev,
      examResults: [
        ...prev.examResults,
        {
          ...result,
          id: `exam-${Date.now()}`,
          date: new Date().toISOString(),
        },
      ],
    }));
  }, [persist]);

  const completeExamTask = useCallback((examId: string, taskIndex: number) => {
    persist((prev) => ({
      ...prev,
      examResults: prev.examResults.map((e) => {
        if (e.id !== examId) return e;
        const tasks = e.tasks.map((t, i) => (i === taskIndex ? { ...t, completed: true } : t));
        return { ...e, tasks, tasksCompleted: tasks.every((t) => t.completed) };
      }),
    }));
  }, [persist]);

  const saveGameScore = useCallback((gameType: string, score: number) => {
    persist((prev) => ({
      ...prev,
      gameScores: [...prev.gameScores, { gameType, score, date: new Date().toISOString() }],
    }));
  }, [persist]);

  const getNotesRead = useCallback(() => {
    return Object.keys(data.notes).length;
  }, [data.notes]);

  const getCardsSeen = useCallback(() => {
    return Object.keys(data.cards).filter((id) => data.cards[id]?.seen).length;
  }, [data.cards]);

  const getNoteReadCount = useCallback((noteId: string) => {
    return data.notes[noteId]?.readCount ?? 0;
  }, [data.notes]);

  const getLastExam = useCallback(() => {
    return data.examResults[data.examResults.length - 1] ?? null;
  }, [data.examResults]);

  const getExamByTypeAndIndex = useCallback(
    (examType: "mini" | "general", examIndex: number) => {
      return (
        data.examResults.find(
          (e) => e.examType === examType && e.examIndex === examIndex
        ) ?? null
      );
    },
    [data.examResults]
  );

  const getUnlockedExamLevel = useCallback(() => {
    // Mini 1 her zaman açık
    // Mini 2 → Mini 1 görevleri bitince
    // Mini 3 → Mini 2 görevleri bitince
    // Mini 4 → Mini 3 görevleri bitince
    // Genel 1 → Tüm mini denemeler bitince
    // Genel 2 → Genel 1 görevleri bitince
    // Genel 3 → Genel 2 görevleri bitince

    for (let i = 0; i < 4; i++) {
      const exam = getExamByTypeAndIndex("mini", i);
      if (!exam || !exam.tasksCompleted) {
        return { type: "mini" as const, index: i, canStart: !exam || exam.tasksCompleted || i === 0 };
      }
    }

    for (let i = 0; i < 3; i++) {
      const exam = getExamByTypeAndIndex("general", i);
      if (!exam || !exam.tasksCompleted) {
        return { type: "general" as const, index: i, canStart: !exam || exam.tasksCompleted || (i === 0) };
      }
    }

    return { type: "general" as const, index: 2, canStart: false };
  }, [getExamByTypeAndIndex]);

  const isExamUnlocked = useCallback(
    (examType: "mini" | "general", examIndex: number) => {
      if (examType === "mini" && examIndex === 0) return true;

      if (examType === "mini") {
        const prev = getExamByTypeAndIndex("mini", examIndex - 1);
        return prev !== null && prev.tasksCompleted;
      }

      if (examType === "general" && examIndex === 0) {
        // Tüm mini denemeler tamamlanmış olmalı
        for (let i = 0; i < 4; i++) {
          const mini = getExamByTypeAndIndex("mini", i);
          if (!mini || !mini.tasksCompleted) return false;
        }
        return true;
      }

      const prev = getExamByTypeAndIndex("general", examIndex - 1);
      return prev !== null && prev.tasksCompleted;
    },
    [getExamByTypeAndIndex]
  );

  const canTakeNewExam = useCallback(() => {
    const last = getLastExam();
    if (!last) return true;
    return last.tasksCompleted;
  }, [getLastExam]);

  const getWrongQuestionIds = useCallback(() => {
    return data.answers.filter((a) => !a.isCorrect).map((a) => a.questionId);
  }, [data.answers]);

  const getWeakCategoryIds = useCallback(() => {
    return Object.entries(data.categoryStats)
      .filter(([_, stat]) => stat.isWeakArea)
      .map(([id]) => id);
  }, [data.categoryStats]);

  const getBestGameScore = useCallback((gameType: string) => {
    const scores = data.gameScores.filter((s) => s.gameType === gameType);
    if (scores.length === 0) return 0;
    return Math.max(...scores.map((s) => s.score));
  }, [data.gameScores]);

  const getTotalStats = useCallback(() => {
    const total = data.questionsAnswered;
    const correct = Object.values(data.categoryStats).reduce((sum, s) => sum + s.correctAnswers, 0);
    return { totalAnswered: total, totalCorrect: correct };
  }, [data.questionsAnswered, data.categoryStats]);

  return {
    data,
    ready,
    markNoteRead,
    markCardSeen,
    recordAnswer,
    incrementQuestions,
    saveExamResult,
    completeExamTask,
    saveGameScore,
    getNotesRead,
    getCardsSeen,
    getNoteReadCount,
    getLastExam,
    getExamByTypeAndIndex,
    getUnlockedExamLevel,
    isExamUnlocked,
    canTakeNewExam,
    getWrongQuestionIds,
    getWeakCategoryIds,
    getBestGameScore,
    getTotalStats,
  };
}

export const examWeights: Record<string, { questions: number; total: number; stars: number; label: string }> = {
  "traffic-rules": { questions: 23, total: 50, stars: 3, label: "23/50 soru" },
  "traffic-signs": { questions: 23, total: 50, stars: 3, label: "Trafik ile ortak" },
  "first-aid": { questions: 12, total: 50, stars: 2, label: "12/50 soru" },
  "vehicle-tech": { questions: 9, total: 50, stars: 1, label: "9/50 soru" },
  "environment": { questions: 23, total: 50, stars: 3, label: "Trafik ile ortak" },
  "traffic-ethics": { questions: 6, total: 50, stars: 1, label: "6/50 soru" },
};
