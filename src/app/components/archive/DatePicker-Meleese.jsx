"use client";

import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Use the DatePicker library to use in our BookingForm component
const DateInput = forwardRef(function DateInput(
  { value, onClick, error },
  ref
) {
  return (
    <div className="relative w-full ">
      <input
        readOnly
        ref={ref}
        onClick={onClick}
        value={value}
        placeholder="Select Date"
        className={`bg-transparent border px-4 py-3 text-sm outline-red-400 w-full ${
          error ? "border-red-500" : "border-white"
        }`}
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {/* React icon to make the datepicker open when clicking the calendar */}
        <FaCalendarAlt className="w-4 h-4 text-gray-200" />
      </button>
    </div>
  );
});

export default function DatePickerField({ error, name = "date" }) {
  const [selected, setSelected] = useState(null);

//   has the normal format that is later changed to make HTML compatible
  const displayValue = selected ? format(selected, "dd-MM-yyyy") : "";


  return (
    <div className="w-full">
      <DatePicker
        selected={selected}
        onChange={(date) => setSelected(date)}
        dateFormat="dd-MM-yyyy"
        customInput={<DateInput error={error} />}
        // make the datepicker take full width
        wrapperClassName="w-full"
        // this makes the popup align under the input
        popperClassName="z-50"
      />

      {/* added a hidden input here so I can still use the validation code in BookingForm */}
      <input
        type="hidden"
        name={name}
        // Has to make the value formatted as yyyy-MM-dd to be compatible with HTML date input
        value={selected ? format(selected, "yyyy-MM-dd") : ""}
      />

      {error && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
