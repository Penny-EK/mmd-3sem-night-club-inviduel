// Icons

import {
  IoCaretForward,
  IoCaretBack
} from "react-icons/io5";

export default function NavBtn({handlePrevious, handleNext, parentClass = "", btnClass = "", ariaPrev = "", ariaNext = ""}) {
  return ( 
    <div className={`flex gap-x-6 ${parentClass}`}>
          <button
            type="button"
            onClick={handlePrevious}
            className={`border-foreground hover:text-background transition hover:bg-foreground grid place-items-center border-2 border-solid p-1 ${btnClass}`}
            aria-label={ariaPrev}
          >
            <IoCaretBack className="size-8" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`border-foreground hover:text-background transition hover:bg-foreground grid place-items-center border-2 border-solid p-1 ${btnClass}`}
            aria-label={ariaNext}
          >
            <IoCaretForward className="size-8" />
          </button>
        </div>
   );
}