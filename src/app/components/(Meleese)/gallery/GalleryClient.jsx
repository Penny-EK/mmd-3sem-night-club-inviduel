"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ReadMore from "../buttons/ReadMore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

// only 2 rows this time with 4 and 3 images respectively
const row_configuration = [
  { cols: "grid-cols-[1.33fr_1fr_1.33fr_1fr]", count: 4 },
  { cols: "grid-cols-[1.33fr_1.66fr_1.66fr]", count: 3 },
];

export default function GalleryClient({ data }) {
  // null = no popup open
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const isOpen = activeIndex !== null;

  // SHOW PREV/NEXT IMAGE IN PopUp
  const showPrev = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + data.length) % data.length,
    );

  const showNext = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % data.length));

  let offset = 0;

  // Couldnt find the right text in the API, so just hardcoded it
  const hardcodedText =
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, " +
    "by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, " +
    "you need to be sure there isn't anything embarrassing hidden in the middle of text.";

  return (
    <div className="col-[1/4] mb-12 grid">
      {/* GALLERY GRID with map */}
      {row_configuration.map((row, rowIndex) => {
        const images = data.slice(offset, offset + row.count);
        const startIndex = offset;
        offset += row.count;

        return (
          // uses framer motion to animate in, once 33% of the element is in view (amount)
          <motion.div
            key={rowIndex}
            className={`grid ${row.cols} *:h-full *:w-full *:object-cover max-md:grid-cols-1`}
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: rowIndex * 0.15,
            }}
          >
            {images.map((item, i) => {
              const globalIndex = startIndex + i;

              return (
                <button
                  key={item?.id ?? `${rowIndex}-${i}`}
                  type="button"
                  className="group relative h-full w-full"
                  onClick={() => setActiveIndex(globalIndex)}
                >
                  <Image
                    src={item?.asset?.url || "/placeholder.webp"}
                    alt={item?.description || "Gallery image"}
                    width={970}
                    height={560}
                    className="h-[221px] w-full object-cover md:h-full md:max-h-[530px]"
                  />

                  {/* darken on hover + triangles */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/50" />
                  <div className="pointer-events-none">
                    <div className="bg-accent absolute top-0 left-0 h-10 w-10 opacity-0 transition [clip-path:polygon(0_0,100%_0,0_100%)] group-hover:opacity-100" />
                    <div className="bg-accent absolute right-0 bottom-0 h-10 w-10 opacity-0 transition [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:opacity-100" />
                  </div>
                </button>
              );
            })}
          </motion.div>
        );
      })}

      {/* PopUp */}
      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          tabIndex={-1} // takes the focus when it appears, priority outside of normal tab order
          ref={(node) => node && node.focus()}
          // keyboard navigation for esc, left and right
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
          }}
          onClick={close}
        >
          {/* LEFT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="focus-visible:outline-accent absolute top-1/2 left-6 -translate-y-1/2 border border-white p-4 transition hover:bg-white hover:text-black focus-visible:outline"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute top-1/2 right-6 -translate-y-1/2 border border-white p-4 transition hover:bg-white hover:text-black"
          >
            <FaChevronRight size={20} />
          </button>
          <div
            className="relative w-full max-w-3xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* big image */}
            <Image
              src={data[activeIndex]?.asset?.url || "/placeholder.webp"}
              alt={data[activeIndex]?.description || "Gallery image"}
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
            />

            <div className="border-t border-zinc-700 p-6 md:p-8">
              <h2 className="mb-3 text-xl font-semibold tracking-wide uppercase">
                Night Club Party
              </h2>
              <p className="text-foreground/80 mb-6 text-xs leading-relaxed">
                {hardcodedText}
              </p>
              <Link href="/blog">
                <ReadMore />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
