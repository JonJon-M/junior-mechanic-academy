import { useState, useEffect, useCallback } from 'react';

export interface PlayerProfile {
  name: string;
  avatar: string;
  xp: number;
  completedLessons: string[];
  completedModules: string[];
  earnedBadges: string[];
  quizScores: Record<string, number>;
  streak: number;
  lastLoginDate: string;
  totalQuizCorrect: number;
  workshopCompleted: boolean;
  diagnosisChallengesCompleted: number;
  leaderboardEntries: { name: string; xp: number; avatar: string }[];
}

const DEFAULT_PROFILE: PlayerProfile = {
  name: '',
  avatar: '👨‍🔧',
  xp: 0,
  completedLessons: [],
  completedModules: [],
  earnedBadges: [],
  quizScores: {},
  streak: 0,
  lastLoginDate: '',
  totalQuizCorrect: 0,
  workshopCompleted: false,
  diagnosisChallengesCompleted: 0,
  leaderboardEntries: [],
};

const STORAGE_KEY = 'jma_profile';

export function useProgress() {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
        return parsed;
      }
    } catch {}
    return DEFAULT_PROFILE;
  });

  const save = useCallback((updated: PlayerProfile) => {
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  // Update streak on mount
  useEffect(() => {
    const today = new Date().toDateString();
    if (profile.lastLoginDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = profile.lastLoginDate === yesterday ? profile.streak + 1 : 1;

    const updated = { ...profile, lastLoginDate: today, streak: newStreak };
    const badges = [...updated.earnedBadges];
    if (newStreak >= 3 && !badges.includes('streak-3')) badges.push('streak-3');
    updated.earnedBadges = badges;
    save(updated);
  }, []); // eslint-disable-line

  const updateName = useCallback((name: string) => {
    save({ ...profile, name });
  }, [profile, save]);

  const updateAvatar = useCallback((avatar: string) => {
    save({ ...profile, avatar });
  }, [profile, save]);

  const completeLesson = useCallback((lessonId: string, xpReward: number) => {
    if (profile.completedLessons.includes(lessonId)) return profile;
    const badges = [...profile.earnedBadges];
    const newXP = profile.xp + xpReward;
    if (!badges.includes('first-lesson')) badges.push('first-lesson');
    const updated: PlayerProfile = {
      ...profile,
      xp: newXP,
      completedLessons: [...profile.completedLessons, lessonId],
      earnedBadges: badges,
    };
    save(updated);
    return updated;
  }, [profile, save]);

  const completeModule = useCallback((moduleId: string, badgeId: string) => {
    const badges = [...profile.earnedBadges];
    if (!badges.includes(badgeId)) badges.push(badgeId);
    const modules = [...profile.completedModules];
    if (!modules.includes(moduleId)) modules.push(moduleId);
    const updated = { ...profile, completedModules: modules, earnedBadges: badges };
    save(updated);
    return updated;
  }, [profile, save]);

  const submitQuiz = useCallback((moduleId: string, score: number, _total: number) => {
    const newCorrect = profile.totalQuizCorrect + score;
    const badges = [...profile.earnedBadges];
    if (newCorrect >= 10 && !badges.includes('quiz-master')) badges.push('quiz-master');
    const updated = {
      ...profile,
      quizScores: { ...profile.quizScores, [moduleId]: score },
      totalQuizCorrect: newCorrect,
      earnedBadges: badges,
    };
    save(updated);
    return updated;
  }, [profile, save]);

  const completeWorkshop = useCallback(() => {
    const badges = [...profile.earnedBadges];
    if (!badges.includes('workshop-builder')) badges.push('workshop-builder');
    const updated = { ...profile, workshopCompleted: true, xp: profile.xp + 100, earnedBadges: badges };
    save(updated);
    return updated;
  }, [profile, save]);

  const completeDiagnosis = useCallback(() => {
    const newCount = profile.diagnosisChallengesCompleted + 1;
    const badges = [...profile.earnedBadges];
    if (newCount >= 3 && !badges.includes('diagnostician')) badges.push('diagnostician');
    const updated = {
      ...profile,
      diagnosisChallengesCompleted: newCount,
      xp: profile.xp + 50,
      earnedBadges: badges,
    };
    save(updated);
    return updated;
  }, [profile, save]);

  const addToLeaderboard = useCallback((name: string, xp: number, avatar: string) => {
    const entries = profile.leaderboardEntries.filter(e => e.name !== name);
    entries.push({ name, xp, avatar });
    entries.sort((a, b) => b.xp - a.xp);
    save({ ...profile, leaderboardEntries: entries.slice(0, 10) });
  }, [profile, save]);

  const resetProgress = useCallback(() => {
    save(DEFAULT_PROFILE);
  }, [save]);

  return {
    profile,
    updateName,
    updateAvatar,
    completeLesson,
    completeModule,
    submitQuiz,
    completeWorkshop,
    completeDiagnosis,
    addToLeaderboard,
    resetProgress,
  };
}
