'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';

interface SiteContextValue {
  /** Signed-in player, or null. Rendered in the header on every route. */
  currentUser: string | null;
  /** Opens the shared auth modal from anywhere in the tree. */
  openAuth: () => void;
  /** Shows the shared toast from anywhere in the tree. */
  showToast: (message: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSite must be used inside <SiteChrome>');
  }
  return ctx;
}

/**
 * The persistent shell: header, footer, auth modal and toast.
 *
 * These used to be re-declared on all nine routes, each with its own copy of
 * `currentUser` / `isAuthOpen` state — so signing in on one page was forgotten
 * the moment you navigated, and /app and /provably-fair rendered a bare
 * <Header /> whose Log in button did nothing. Holding that state here means one
 * session across the whole site and one place to change the chrome.
 */
export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 4500);
  }, []);

  const openAuth = useCallback(() => setIsAuthOpen(true), []);

  const handleAuthSuccess = useCallback(
    (username: string) => {
      setCurrentUser(username);
      showToast(`Welcome to 1xBet, ${username}. Your 200% welcome package is active.`);
    },
    [showToast]
  );

  const value = useMemo(
    () => ({ currentUser, openAuth, showToast }),
    [currentUser, openAuth, showToast]
  );

  return (
    <SiteContext.Provider value={value}>
      <Header onOpenAuth={openAuth} currentUser={currentUser} />

      {children}

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {toastMessage && (
        <div
          role="status"
          className="animate-rise-in fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-navy-800 bg-navy-900 px-4 py-3.5 shadow-2xl"
        >
          <CheckCircle2
            className="mt-px h-[18px] w-[18px] shrink-0 text-win-500"
            strokeWidth={2.2}
          />
          <span className="text-[13px] font-medium leading-snug text-white">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="-mr-1 -mt-1 shrink-0 cursor-pointer rounded-md p-1 text-navy-300 transition-colors hover:bg-surface-3 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </SiteContext.Provider>
  );
};
