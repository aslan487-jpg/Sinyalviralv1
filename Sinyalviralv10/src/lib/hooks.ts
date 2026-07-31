import { useState, useEffect, useCallback } from "react";

export interface UserData {
  id: string;
  name: string;
  examDate: string;
  dailyLessonGoal: number;
  dailyQuestionGoal: number;
  createdAt: string;
}

const USERS_KEY = "sv_users";
const CURRENT_USER_KEY = "sv_user_id";

function getUsers(): Record<string, UserData> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, UserData>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    setUserId(stored);
    setLoading(false);
  }, []);

  const login = useCallback((id: string) => {
    localStorage.setItem(CURRENT_USER_KEY, id);
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUserId(null);
  }, []);

  const createUser = useCallback((data: Omit<UserData, "id" | "createdAt">): UserData => {
    const id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const user: UserData = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    };
    const users = getUsers();
    users[id] = user;
    saveUsers(users);
    return user;
  }, []);

  const getUser = useCallback((id: string): UserData | null => {
    const users = getUsers();
    return users[id] || null;
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<UserData>): UserData | null => {
    const users = getUsers();
    if (!users[id]) return null;
    users[id] = { ...users[id], ...updates };
    saveUsers(users);
    return users[id];
  }, []);

  return { userId, loading, login, logout, createUser, getUser, updateUser };
}

export function useDaysUntilExam(examDate: string | null): number {
  if (!examDate) return 0;
  const now = new Date();
  const exam = new Date(examDate);
  const diff = exam.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
