import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import type { ProjectImage as ProjectImageData } from '../../types/project';
import { ProjectImage } from './ProjectImage';

interface LightboxProps {
  title: string;
  images: ProjectImageData[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-screen screenshot viewer: Esc closes, ←/→ move between images, focus stays inside. */
export function Lightbox({ title, images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const count = images.length;

  useScrollLock(open);
  useFocusTrap(dialog, open);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onChange(null);
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onChange]);

  const image = index !== null ? images[index] : undefined;

  return createPortal(
    <AnimatePresence>
      {open && image && (
        <motion.div
          key="lightbox"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 text-white backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) onChange(null);
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="font-mono text-xs text-white/70" aria-live="polite">
              {title} · {index + 1} / {count}
            </p>
            <button
              ref={closeButton}
              type="button"
              onClick={() => onChange(null)}
              aria-label="Close screenshot viewer"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) onChange(null);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="flex max-h-full w-full max-w-6xl flex-col items-center"
              >
                <div className="min-h-0 overflow-hidden rounded-lg border border-white/10">
                  <ProjectImage
                    image={image}
                    sizes="(min-width: 1280px) 1152px, 100vw"
                    eager
                    fit="contain"
                  />
                </div>
                {image.caption && (
                  <figcaption className="mt-3 text-center text-sm text-white/80">
                    {image.caption}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-4"
                >
                  <ChevronLeft size={20} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-4"
                >
                  <ChevronRight size={20} aria-hidden />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="flex justify-center gap-1.5 py-4" aria-hidden>
              {images.map((img, i) => (
                <span
                  key={img.src}
                  className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
