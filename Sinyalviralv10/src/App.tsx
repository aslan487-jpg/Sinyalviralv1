import { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./lib/ThemeContext";
import { useUser, type UserData } from "./lib/hooks";
import LandingPage from "./components/LandingPage";
import OnboardingPage from "./components/OnboardingPage";
import MainApp from "./components/MainApp";

function AppContent() {
  const { userId, loading, login, logout } = useUser();
  const [page, setPage] = useState<"landing" | "onboarding" | "app">("landing");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
  }, []);

  useEffect(() => {
    if (!loading && ready) {
      if (userId) {
        setPage("app");
      }
    }
  }, [userId, loading, ready]);

  const handleOnboardingComplete = useCallback((user: UserData) => {
    login(user.id);
    setPage("app");
  }, [login]);

  if (loading || !ready) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: "var(--c-bg)" }}>
        <div className="text-center anim-up">
          <div className="text-5xl mb-4 anim-float">🚦</div>
          <div className="text-2xl font-extrabold" style={{ color: "#0D9488" }}>SinyalViral</div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full anim-pulse" style={{ background: "#0D9488" }} />
            <span className="w-2 h-2 rounded-full anim-pulse" style={{ background: "#F97066", animationDelay: "200ms" }} />
            <span className="w-2 h-2 rounded-full anim-pulse" style={{ background: "#F59E0B", animationDelay: "400ms" }} />
          </div>
        </div>
      </div>
    );
  }

  if (page === "landing") {
    return <LandingPage onStart={() => setPage("onboarding")} />;
  }

  if (page === "onboarding") {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  if (!userId) {
    setPage("landing");
    return null;
  }

  return (
    <MainApp
      userId={userId}
      onLogout={() => {
        logout();
        setPage("landing");
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
