'use client';

import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Hide the title visually but keep it for screen readers. */
  hideTitle?: boolean;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Extra controls rendered in the header bar, left of the close button. */
  headerSlot?: React.ReactNode;
}

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
};

/**
 * Radix Dialog wrapper.
 *
 * The hand-rolled modals this replaces rendered a fixed div and listened for
 * Escape, but never trapped focus, never returned focus to the trigger on
 * close, never marked the rest of the page aria-hidden, and left the body
 * scrollable behind the overlay. Radix handles all four.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  hideTitle = false,
  description,
  children,
  size = 'md',
  headerSlot,
}) => {
  /*
   * These dialogs are opened from shared state rather than a Dialog.Trigger, so
   * Radix has no trigger to hand focus back to and it falls through to <body> —
   * a keyboard user loses their place on close. Capture the element that had
   * focus when the dialog opened and restore it ourselves.
   */
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-md
                     data-[state=open]:animate-fade-in"
        />

        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] ${SIZES[size]}
                      max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2
                      overflow-y-auto rounded-lg border border-ink-200 bg-white shadow-2xl
                      focus:outline-none data-[state=open]:animate-modal-in`}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            lastFocused.current?.focus?.();
          }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink-200 bg-white/95 px-5 py-4 backdrop-blur-sm">
            {hideTitle ? (
              <Dialog.Title className="sr-only">{title}</Dialog.Title>
            ) : (
              <Dialog.Title className="text-[15px] font-semibold tracking-tight text-ink-900">
                {title}
              </Dialog.Title>
            )}

            <div className="flex items-center gap-2">
              {headerSlot}
              <Dialog.Close
                aria-label="Close dialog"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[4px]
                           text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          </div>

          {description ? (
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
          ) : null}

          <div className="p-5 sm:p-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
