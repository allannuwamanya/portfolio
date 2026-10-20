"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { GalleryImage } from "@/types";
import { assetUrl } from "@/lib/asset-url";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/shared/lightbox";

const MAX_TILES = 3;

/**
 * The photo strip at the top of an event or experience card.
 *
 * One photo fills the strip; two split it; three or more become a mosaic with a
 * "+N" tile. Every tile opens the lightbox. Photos are user-supplied, so one
 * that fails to load is dropped instead of leaving a broken frame.
 */
export function PhotoGallery({ images, title }: { images?: GalleryImage[]; title: string }) {
  const [failed, setFailed] = React.useState<Set<string>>(() => new Set());
  const [open, setOpen] = React.useState<number | null>(null);

  const usable = (images ?? []).filter((image) => !failed.has(image.src));
  if (usable.length === 0) return null;

  const tiles = usable.slice(0, MAX_TILES);
  const hidden = usable.length - tiles.length;

  const layout =
    tiles.length === 1
      ? "grid-cols-1"
      : tiles.length === 2
        ? "grid-cols-2"
        : "grid-cols-3 grid-rows-2";

  return (
    <>
      <div
        className={cn(
          "-mx-6 -mt-6 mb-1 grid aspect-[5/2] gap-0.5 overflow-hidden rounded-t-[1.25rem] border-b border-border/60 bg-border/40",
          layout,
        )}
      >
        {tiles.map((image, i) => {
          const isLastTile = i === tiles.length - 1;
          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photo ${i + 1} of ${usable.length}: ${image.alt}`}
              className={cn(
                "group relative overflow-hidden bg-secondary focus-visible:z-10",
                tiles.length >= 3 && i === 0 && "col-span-2 row-span-2",
              )}
            >
              <Image
                src={assetUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                onError={() => setFailed((prev) => new Set(prev).add(image.src))}
                className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
              {isLastTile && hidden > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 font-mono text-xl font-black text-white backdrop-blur-[2px]">
                  +{hidden}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Lightbox
        images={usable}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
        label={`${title}, photo gallery`}
      />
    </>
  );
}
