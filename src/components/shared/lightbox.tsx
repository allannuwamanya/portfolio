"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types";
import { assetUrl } from "@/lib/asset-url";

const SWIPE_THRESHOLD = 80;

/**
 * Full-screen viewer for a set of images. Controlled by the parent: `index` is
 * the open image, or null when closed.
 *
 * Keyboard: Esc closes, ← → navigate, Tab stays inside the dialog. Touch: drag
 * sideways to move between photos. Focus returns to whatever opened it.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  label,
}: {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  label: string;
}) {
  const open = index !== null;
  // Portals need `document`; waiting for mount keeps server and client markup identical.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const direction = React.useRef(1);
  const count = images.length;

  const go = React.useCallback(
    (step: number) => {
      if (index === null || count < 2) return;
      direction.current = step;
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Scroll lock, focus handling, and keyboard controls while open.
  React.useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
    // `go` changes with the index; re-binding keeps the handler current.
  }, [open, onClose, go]);

  // Warm the neighbouring photos so arrow-key navigation feels instant.
  React.useEffect(() => {
    if (index === null || count < 2) return;
    for (const step of [1, -1]) {
      const img = new window.Image();
      img.src = assetUrl(images[(index + step + count) % count].src);
    }
  }, [index, count, images]);

  if (!mounted) return null;

  const current = index === null ? null : images[index];

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
              {count > 1 ? `${index! + 1} / ${count}` : ""}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/60 text-foreground transition-colors hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            {count > 1 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground backdrop-blur transition-colors hover:bg-secondary sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <AnimatePresence mode="wait" initial={false} custom={direction.current}>
              <motion.div
                key={index}
                custom={direction.current}
                initial={{ opacity: 0, x: direction.current * 48, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction.current * -48, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                }}
                className="relative h-full w-full max-w-5xl cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={assetUrl(current.src)}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  draggable={false}
                  className="select-none object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground backdrop-blur transition-colors hover:bg-secondary sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          <p
            className="mx-auto max-w-2xl px-6 py-5 text-center text-sm leading-relaxed text-muted-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {current.alt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
