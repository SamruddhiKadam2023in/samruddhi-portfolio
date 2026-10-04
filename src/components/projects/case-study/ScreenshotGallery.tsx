import { Expand } from 'lucide-react';
import { useState } from 'react';
import type { ProjectImage as ProjectImageData } from '../../../types/project';
import { Lightbox } from '../../common/Lightbox';
import { ProjectImage } from '../../common/ProjectImage';

interface ScreenshotGalleryProps {
  title: string;
  images: ProjectImageData[];
}

/** Responsive grid of captioned screenshots; each opens the keyboard-accessible lightbox. */
export function ScreenshotGallery({ title, images }: ScreenshotGalleryProps) {
  const [viewing, setViewing] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="rounded-xl border border-line-strong p-8 text-center font-mono text-sm text-fg-muted">
        [screenshots pending]
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((image, index) => (
          <li key={image.src}>
            <figure>
              <button
                type="button"
                onClick={() => setViewing(index)}
                aria-label={`Enlarge screenshot ${index + 1} of ${images.length}: ${image.alt}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card"
              >
                <ProjectImage
                  image={image}
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={14} aria-hidden />
                </span>
              </button>
              {image.caption && (
                <figcaption className="mt-2.5 flex gap-2 text-sm text-fg-secondary">
                  <span className="font-mono text-xs text-fg-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {image.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
      <Lightbox title={title} images={images} index={viewing} onChange={setViewing} />
    </>
  );
}
