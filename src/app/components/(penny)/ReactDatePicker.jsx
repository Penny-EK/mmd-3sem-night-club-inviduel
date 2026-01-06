// this is a rework of the DatePicker component to make it work with react-hook-form

// this component is used in the BookingReactForm component to select a date for booking
"use client";

// React imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

// icon imports
import { forwardRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

// Use the DatePicker library to use in our BookingForm component
const DateInput = forwardRef(function DateInput(
  { value, onClick, error },
  ref,
) {
  return (
    <div className="relative w-full">
      <input
        readOnly
        ref={ref}
        onClick={onClick}
        value={value}
        placeholder="Select Date*"
        className={`text-foreground placeholder:text-foreground w-full border bg-transparent px-3 py-[18px] md:px-6 md:py-8 ${
          error ? "border-red-500" : "border-foreground"
        }`}
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute top-1/2 right-3 -translate-y-1/2 md:right-6"
      >
        {/* React icon to make the datepicker open when clicking the calendar */}
        <FaCalendarAlt className="text-foreground h-4 w-4" />
      </button>
    </div>
  );
});

export default function DatePickerField({ value, onChange, error }) {
  //   has the normal format that is later changed to make HTML compatible
  const displayValue = value ? format(value, "dd-MM-yyyy") : "";

  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={onChange}
        customInput={<DateInput error={error} />}
        // make the datepicker take full width
        wrapperClassName="w-full"
        // this makes the popup align under the input
        popperClassName="z-50"
        dateFormat="dd-MM-yyyy"
        popperPlacement="right"
      />

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
