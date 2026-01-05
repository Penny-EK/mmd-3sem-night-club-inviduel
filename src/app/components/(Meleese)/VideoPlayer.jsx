"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videos = [
  "/media/video-crowd.mp4",
  "/media/video-dj-crowd1.mp4",
  "/media/video-dj-crowd-2.mp4",
];

export default function VideoPlayer() {
  const [index, setIndex] = useState(0);

  function prevVideo() {
    setIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
  }

  function nextVideo() {
    setIndex((i) => (i === videos.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="mb-[26px] flex min-h-80 flex-col items-center gap-4">
      {/* Needs Full bleed when screen is small */}

      <div className="min-h-32 w-full max-w-3xl overflow-hidden rounded-lg shadow-lg sm:col-start-1 sm:col-end-4 md:h-100">
        <video
          key={index}
          src={videos[index]}
          // controls
          autoPlay
          className="h-auto w-full"
        />
      </div>

      <div className="mt-8 flex items-center gap-6 text-white">
        <button
          onClick={prevVideo}
          className="border border-white p-3 transition hover:bg-white hover:text-black"
        >
          <FaChevronLeft size={15} />
        </button>

        <button
          onClick={nextVideo}
          className="border border-white p-3 transition hover:bg-white hover:text-black"
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
