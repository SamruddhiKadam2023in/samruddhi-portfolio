import { AnimatePresence, m } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface ToastMessage {
  id: number;
  text: string;
  tone: 'success' | 'error';
}

/**
 * Small toast announced through a polite live region.
 * The region stays mounted so screen readers pick up each new message.
 */
export function Toast({ message }: { message: ToastMessage | null }) {
  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <m.div
            key={message.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-elevated px-4 py-2.5 text-sm shadow-card"
          >
            {message.tone === 'success' ? (
              <Check size={15} aria-hidden className="text-success" />
            ) : (
              <X size={15} aria-hidden className="text-error" />
            )}
            {message.text}
          </m.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
