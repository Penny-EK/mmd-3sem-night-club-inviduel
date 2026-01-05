"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import ImageHover from "../ImageHover";

// Since the date part of the json object is formatted as one long string that consists of both
// the full date and the full time, the Date JS object will instead be used to separate
// - the Date part and the Time part to what it should correspond to in the provided Design File
function formatDate(string) {
  const date = new Date(string);

  const dateFormatted = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const timeFormatted = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date: dateFormatted, time: timeFormatted };
}

export default function GalleryContent({ data }) {
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

  // Bool check for if desktop button should be highlighted.
  // For desktop, 2 cards will be shown per set, each button will therefore control 2 indices of the array.
  const isDesktopActive = (btnIndex) => {
    // Updates the btnIndex by multiplying the value by 2.
    // startIndex points to the val of btnIndex * 2, per how the btns should control the indices.
    const startIndex = btnIndex * 2;
    // Button will be colored if currentIndex matches either of the two displayed cards.
    // This is to make sure the coloring will persist, even if we were to scroll by one when
    // - scrolling manually.
    return currentIndex === startIndex || currentIndex === startIndex + 1;
  };

  // Bool check for if a mobile btn should be highlighted.
  // Since mobile shows 1 card at a time, btnIndex and card index will be mapped directly.
  const isMobileActive = (btnIndex) => {
    return currentIndex === btnIndex;
  };

  return (
    <div className="grid place-items-center gap-y-16">
      <div className="w-full overflow-hidden px-8 max-md:px-0">
        <div
          ref={scrollingContainer}
          className="noScrollbar mt-8 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          tabIndex={0}
        >
          {/* Desktop Mapping */}
          {data.map((item, index) => {
            const { date, time } = formatDate(item.date);
            return (
              <div
                key={index}
                className="min-w-[350px] flex-[0_0_calc(50%-1rem)] snap-start max-lg:max-w-full max-md:flex-[0_0_100%]"
              >
                <ImageHover
                  imgSrc={item?.asset?.url}
                  imgAlt={item?.title}
                  imgWidth={570}
                  imgHeight={403}
                  imgClass="w-full"
                  topChildren={
                    <Link
                      href="#"
                      className="tracking-2pct bg-accent cursor-pointer rounded-sm px-6 py-3 font-medium capitalize"
                    >
                      Book now
                    </Link>
                  }
                  bottomChildren={
                    <>
                      <span className="tracking-2pct place-self-start text-lg font-medium capitalize">
                        {item?.title}
                      </span>
                      <span className="tracking-2pct text-base font-light mt-2">
                        {item.description.split(".").slice(0, 4).join(". ") +
                          "."}
                      </span>
                    </>
                  }
                  topCSS={"hoverToBottom"}
                  bottomCSS={"hoverToTop"}
                />
                <div className="bg-accent flex gap-x-4 px-6 py-2 *:text-xl *:font-medium max-lg:*:text-base">
                  <p>{date}</p>
                  <p>{time}</p>
                  <p>{item?.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <div className="flex gap-4 max-md:hidden">
          {[0, 1, 2].map((btnIndex) => (
            <button
              key={btnIndex}
              type="button"
              onClick={() => goToSlide(btnIndex * 2)}
              className={`h-5 w-5 transition-colors ${
                isDesktopActive(btnIndex) ? "bg-accent" : "bg-foreground"
              }`}
              aria-label={`Go to slide ${btnIndex + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-4 md:hidden">
          {data.slice(0, 6).map((_, btnIndex) => (
            <button
              key={btnIndex}
              type="button"
              onClick={() => goToSlide(btnIndex)}
              className={`h-5 w-5 transition-colors ${
                isMobileActive(btnIndex) ? "bg-accent" : "bg-foreground"
              }`}
              aria-label={`Go to slide ${btnIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
