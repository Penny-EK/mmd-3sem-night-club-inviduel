"use client";
// NextJS Components
import { useState, useRef } from "react";
// Other Components
import ImageHover from "@/app/components/(bjorn)/ImageHover";
import NavBtn from "@/app/components/(bjorn)/NavBtns";
// Icons
import { LuTwitter, LuFacebook } from "react-icons/lu";
import { IoLogoSnapchat } from "react-icons/io5";

export default function TestimonialsContent({ data }) {
  // Used for tracking which card is currently in view (by index in the data array)
  const [currentIndex, setCurrentIndex] = useState(0);

  // useRef returns a mutable reference object that persists across re-renders.
  // It is better than e.g. document.getElementById, because, due to how React works,
  // the ref starts as "null", but react automatically sets e.g. "ref.current" -
  // - to the DOM element after mount (render).
  const scrollingContainer = useRef(null);

  // Button handler to handle navigation to the item ID's by (index).
  // Updates state, and then scrolls the container, as well as
  // - calculating scroll position based on card width multiplied by the target index.
  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (scrollingContainer.current) {
      const firstCard = scrollingContainer.current.children[0];
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        scrollingContainer.current.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    }
  };

  // Functionality for scrolling, updates currentIndex when container is manually scrolled.
  // Calculates which accent btn should be colored based on scroll position.
  // Without it, manually scrolling will not update the currentIndex, which
  // won't color the correct btn.
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const firstCard = e.target.children[0];
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  // Handling of initial touch event to enable swipe detection later on in handleTouchMove.
  // and to measure current pos / swiped pos later on in handleTouchMove
  const handleTouchStart = (e) => {
    // touchDown will point to the X-pos of finger press
    const touchDown = e.touches[0].clientX;
    // Store it on the ref for usage in handleTouchMove
    scrollingContainer.current.touchDown = touchDown;
  };

  // Functionality for handling touch swiping.
  const handleTouchMove = (e) => {
    // Will not run if we are not touching down on the scrollingContainer
    if (!scrollingContainer.current.touchDown) return;
    // Get current finger position
    const currentTouch = e.touches[0].clientX;
    // "diff" is used to get the difference (num) between the previous touchDown pos
    // - and the current currentTouch x-pos
    const diff = scrollingContainer.current.touchDown - currentTouch;

    // Then, if the (diff) is above (swipe left) or below (swipe right) a certain number:
    if (diff > 50) {
      // Goes to next card
      setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
      // Resets the stored ref touchDown value, to prevent unintentional swipe triggers.
      scrollingContainer.current.touchDown = null;
    } else if (diff < -50) {
      // Goes to prev card.
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      scrollingContainer.current.touchDown = null;
    }
  };

  // Bool check for if the btn should be highlighted.
  // BtnIndex and card index will be mapped directly
  const isBtnActive = (btnIndex) => {
    return currentIndex === btnIndex;
  };

  return (
    <div className="bg-background-alpha col-span-full grid grid-cols-subgrid *:col-start-2 max-md:px-6">
      <div className="my-24 grid place-items-center gap-y-16">
        <div className="w-full overflow-hidden px-8 max-md:px-0">
          <div
            ref={scrollingContainer}
            className="noScrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth"
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            tabIndex={0}
          >
            {/* Desktop Mapping */}
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="my-4 grid flex-[0_0_100%] snap-start place-content-center place-items-center gap-y-8"
                >
                  <ImageHover
                    imgSrc={item?.asset?.url}
                    imgAlt={item?.name}
                    imgWidth={210}
                    imgHeight={210}
                  />
                  <div className="text-center font-medium">
                    <p className="tracking-7pct text-2xl">{item?.name}</p>
                    <p className="mt-8 max-w-[107ch] text-lg">
                      {item?.content}
                    </p>
                  </div>
                  <ul className="flex gap-x-6 max-lg:justify-between max-lg:gap-x-0">
                    <li>
                      <a
                        href={item?.facebook}
                        target="_blank"
                        className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid"
                      >
                        <LuFacebook className="h-6 w-6" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={item?.twitter}
                        target="_blank"
                        className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid"
                      >
                        <LuTwitter className="h-6 w-6" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://snapchat.com"
                        target="_blank"
                        className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid"
                      >
                        <IoLogoSnapchat className="h-6 w-6" />
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid place-items-center gap-y-6">
          <div className="flex gap-4">
            {[0, 1, 2].map((btnIndex) => (
              <button
                key={btnIndex}
                type="button"
                onClick={() => goToSlide(btnIndex)}
                className={`h-5 w-5 transition-colors ${
                  isBtnActive(btnIndex) ? "bg-accent" : "bg-foreground"
                }`}
                aria-label={`Go to slide ${btnIndex + 1}`}
              />
            ))}
          </div>
          {/* Added for accesibility reasons, per our heuristics test. */}
          <NavBtn
            handlePrevious={() => {
              if (currentIndex > 0) goToSlide(currentIndex - 1);
            }}
            handleNext={() => {
              if (currentIndex < data.length - 1) goToSlide(currentIndex + 1);
            }}
            ariaPrev="Go to Previous Slide"
            ariaNext="Go to Next Slide"
          />
        </div>
      </div>
    </div>
  );
}
