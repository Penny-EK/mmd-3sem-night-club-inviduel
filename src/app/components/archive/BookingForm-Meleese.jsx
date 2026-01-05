"use client";

import { useState } from "react";
import DatePicker from "@/app/components/archive/DatePicker-Meleese";
import SubmitButton from "@/app/components/(meleese)/buttons/Submit";

export default function BookingForm({ selectedTable }) {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    // without this the form just goes back to blank instantly
    e.preventDefault();

    const formData = new FormData(e.target);
    const newErrors = {};

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const guestsRaw = formData.get("guests")?.toString().trim() ?? "";
    const date = formData.get("date")?.toString().trim() ?? "";
    const contact = formData.get("contact")?.toString().trim() ?? "";

    // the feedback for each input field
    if (!name) newErrors.name = "Please enter your name";
    if (!email) newErrors.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email address";

    if (!selectedTable) {
      newErrors.table = "Please select a table";
    }

    if (!guestsRaw) {
      newErrors.guests = "Please enter number of guests.";
    } else {
      const guests = Number(guestsRaw);
      if (!Number.isFinite(guests) || guests <= 0) {
        newErrors.guests = "Please enter a valid number of guests";
      } else if (guests > 78) {
        newErrors.guests = "Our maximum capacity is 78 guests";
      }
    }

    if (!date) newErrors.date = "Please select a date";
    if (!contact) newErrors.contact = "Please enter your contact number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccess(true);

    // Once all validations are passed, show success message for 3 seconds
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  // base styling for input fields
  const base = "bg-transparent border px-4 py-3 text-sm outline-red-400 w-full";

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-xl font-bold tracking-wide uppercase">
        Book a table
      </h2>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            className={`${base} ${
              errors.name ? "border-red-500" : "border-white"
            }`}
            placeholder="Your Name*"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            className={`${base} ${
              errors.email ? "border-red-500" : "border-white"
            }`}
            placeholder="Your Email*"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* TABLE (from selection) */}
        <div>
          <input
            readOnly
            className={`${base} ${
              errors.table ? "border-red-500" : "border-white"
            }`}
            value={
              selectedTable ? `Table Number: ${selectedTable}` : "Table Number*"
            }
          />
          {errors.table && (
            <p className="mt-1 text-xs text-red-400">{errors.table}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="guests"
            className={`${base} ${
              errors.guests ? "border-red-500" : "border-white"
            }`}
            placeholder="Number of Guests*"
          />
          {errors.guests && (
            <p className="mt-1 text-xs text-red-400">{errors.guests}</p>
          )}
        </div>

        <div className="w-full">
          <DatePicker error={errors.date} />
        </div>

        <div>
          <input
            type="tel"
            name="contact"
            className={`${base} ${
              errors.contact ? "border-red-500" : "border-white"
            }`}
            placeholder="Your Contact Number*"
          />
          {errors.contact && (
            <p className="mt-1 text-xs text-red-400">{errors.contact}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <textarea
            name="comment"
            className={`min-h-32 w-full border border-white bg-transparent px-4 py-3 text-sm outline-red-400 md:col-span-2`}
            placeholder="Your Comment"
          />
        </div>

        <SubmitButton />

        {/* <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-10 py-3 text-sm font-semibold tracking-wide uppercase border-t-4 border-b-4 hover:bg-pink-600 hover:text-black transition"
            >
            Reserve
          </button>
        </div> */}
        {success && (
          <p className="flex justify-end text-sm font-medium text-white md:col-span-2">
            Your booking has been sent! 🎉
          </p>
        )}
      </form>
    </div>
  );
}
