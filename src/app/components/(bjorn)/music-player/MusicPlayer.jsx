"use client";
// NextJS Components
import { useState } from "react";
import Image from "next/image";
// NPM AudioPlayer package from: https://www.npmjs.com/package/react-h5-audio-player 
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// Component Styling
import playerStyle from "./MusicPlayerStyle.module.css";
// Other Components
import ImageHover from "@/app/components/(bjorn)/ImageHover";
// Images
import track1 from "@/app/assets/content-img/track1.jpg";
import track2 from "@/app/assets/content-img/track2.jpg";
import track3 from "@/app/assets/content-img/track_thumb.jpg";
import track4 from "@/app/assets/content-img/track4.jpg";
import track5 from "@/app/assets/content-img/track5.jpg";
// Icons
import {
  IoCaretForward,
  IoCaretBack,
  IoPause,
  IoShuffle,
  IoVolumeHigh,
  IoVolumeMute,
  IoPlaySkipForward,
  IoPlaySkipBack,
} from "react-icons/io5";

export default function MusicPlayer() {
  const audioTracks = [
    {
      title: "Black Box Funky",
      src: "/media/black-box-funky.mp3",
      image: track1,
    },
    { title: "Euphoria", src: "/media/euphoria.mp3", image: track2 },
    { title: "Futuristic", src: "/media/music-comp-future.mp3", image: track3 },
    {
      title: "Fashion Red Tape",
      src: "/media/fashion-red-tape.mp3",
      image: track4,
    },
    {
      title: "Trap Music",
      src: "/media/music-comp-trap.mp3",
      image: track5,
    },
  ];
   const [currentTrack, setCurrentTrack] = useState(0);
   const [shuffle, setShuffle] = useState(false);

   // Handler for next track
   const handleClickNext = () => {
    // If shuffle is true, will set current track based on a randomly generated index
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * audioTracks.length);
      setCurrentTrack(randomIndex);
    } else {
      // Will loop back to the first track, thanks to the modulo operator part.
      // Otherwise will add 1 to the track index, moving to the next track
      setCurrentTrack((track) => (track + 1) % audioTracks.length);
    }
  };

  // Similar to how we handle Next Track, this is for previous track.
  // Here, we modify the boundary with (track - 1 + audioTracks.length) to ensure
  // - no negative numbers
  const handleClickPrevious = () => {
    setCurrentTrack((track) => (track - 1 + audioTracks.length) % audioTracks.length);
  };

  // Gallery Track picker, will set the currentTrack to the index of the song.
  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
  };

  // Shuffle function, handler for the toggling of true / false bool state.
  const toggleShuffle = () => {
    setShuffle((prev) => !prev);
  };

  return (
    <div className="grid max-lg:grid-cols-subgrid">
      <div className="flex items-center gap-x-4">
        <Image
          src={audioTracks[currentTrack].image}
          alt={audioTracks[currentTrack].title}
          width={232}
          height={192}
          className="max-lg:hidden"
        />
        <div className="flex-1">
          <p className="mb-4 max-lg:text-center text-2xl tracking-2pct max-lg:text-xl">{audioTracks[currentTrack].title}</p>
          <AudioPlayer 
            className={playerStyle.customPlayer}
            volume={0.2}
            src={audioTracks[currentTrack].src}
            showSkipControls
            showJumpControls={false}
            showDownloadProgress={false}
            showFilledProgress={false}
            autoPlayAfterSrcChange={true}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={handleClickNext}
            customAdditionalControls={[
              RHAP_UI.LOOP,
              <button
                key="shuffle"
                type="button"
                className="cursor-pointer"
                aria-label="Toggle shuffle"
                onClick={toggleShuffle}
              >
                <IoShuffle className={`size-8 ${shuffle ? 'text-accent' : 'text-foreground'}`} />
              </button>
            ]}
            customIcons={{
              play: <IoCaretForward className="size-8 text-foreground"/>,
              pause: <IoPause className="size-8 text-foreground"/>,
              previous: <IoPlaySkipBack className="size-8 text-foreground" />,
              next: <IoPlaySkipForward className="size-8 text-foreground" />,
              volume: <IoVolumeHigh className="size-8 text-foreground" />,
              volumeMute: <IoVolumeMute className="size-8 text-foreground" />,
            }}
          />
        </div>
      </div>
      <div className="flex cursor-pointer max-lg:hidden">
        {audioTracks.map((img, index) => (
          <div key={img.title} className="relative" onClick={() => handleTrackSelect(index)}>
            <ImageHover 
              imgSrc={img.image}
              imgAlt={img.alt}
              topChildren={
              <div className="self-end border-accent text-accent grid cursor-pointer place-items-center rounded-full border-4 border-solid p-1">
                  <IoCaretForward className="size-8" />
                </div>}
              bottomChildren={
              <span className="tracking-2pct bg-background w-full self-end py-3 text-center text-lg font-medium">
                {img.title}
              </span>
              }
              topCSS={index === currentTrack ? "opacity-100 visible" : ""}
              bottomCSS={index === currentTrack ? "opacity-100 visible" : ""}
            />
            </div>
        ))}
      </div>
      <div className="hidden max-lg:cursor-pointer max-lg:mt-8 max-lg:grid max-lg:place-items-center max-lg:gap-y-8">
        <div className="relative w-full">
          <ImageHover 
            imgSrc={audioTracks[currentTrack].image}
            imgAlt={audioTracks[currentTrack].title}
            imgWidth={399}
            imgHeight={264}
            imgClass="w-full"
            topChildren={
              <div className="self-end border-accent text-accent grid cursor-pointer place-items-center rounded-full border-4 border-solid p-1">
                  <IoCaretForward className="size-8" />
                </div>}
              bottomChildren={
              <span className="tracking-2pct bg-background w-full self-end py-3 text-center text-lg font-medium">
                {audioTracks[currentTrack].title}
              </span>
              }
            />
        </div>
        <div className="flex gap-x-3">
          <button
            type="button"
            onClick={handleClickPrevious}
            className="border-foreground hover:text-background hover:bg-foreground grid place-items-center border-2 border-solid p-3"
          >
            <IoCaretBack className="size-8" />
          </button>
          <button
            type="button"
            onClick={handleClickNext}
            className="border-foreground hover:text-background hover:bg-foreground grid place-items-center border-2 border-solid p-3"
          >
            <IoCaretForward className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
