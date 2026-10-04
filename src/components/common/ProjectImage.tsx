import { ImageOff } from 'lucide-react';
import { useState } from 'react';
import type { ProjectImage as ProjectImageData } from '../../types/project';
import { cn } from '../../utils/cn';

const SMALL_WIDTH = 800;

interface ProjectImageProps {
  image: ProjectImageData;
  /** `sizes` attribute describing the rendered width. */
  sizes: string;
  eager?: boolean;
  /** `fluid` fills the container width; `contain` fits inside a max height (lightbox). */
  fit?: 'fluid' | 'contain';
  className?: string;
}

/** Responsive screenshot with a reserved aspect ratio and a visible fallback if it fails to load. */
export function ProjectImage({
  image,
  sizes,
  eager = false,
  fit = 'fluid',
  className,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const aspectRatio = `${image.width} / ${image.height}`;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${image.alt} (image unavailable)`}
        style={{ aspectRatio }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 bg-surface-elevated text-fg-muted',
          className,
        )}
      >
        <ImageOff size={22} aria-hidden />
        <span className="font-mono text-xs">screenshot unavailable</span>
      </div>
    );
  }

  const srcSet =
    image.width > SMALL_WIDTH
      ? `${image.src.replace(/\.webp$/, '-sm.webp')} ${SMALL_WIDTH}w, ${image.src} ${image.width}w`
      : undefined;

  return (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ aspectRatio }}
      className={cn(
        'block bg-surface-elevated',
        fit === 'fluid' ? 'h-auto w-full' : 'h-auto max-h-[calc(100dvh-11rem)] w-auto max-w-full',
        className,
      )}
    />
  );
}
