// this is a rewrite of BookingForm.jsx using react-hook-form library

// this component is called by the booking page to display a booking form with validation
"use client";

// React imports
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// Component imports
import DatePicker from "@/app/components/(penny)/ReactDatePicker";
import SubmitButton from "@/app/components/(meleese)/buttons/Submit";

const BookingReactForm = ({ tables, selectedTable, onTableReset }) => {
  // styles
  const base =
    "w-full border px-3 py-[18px] md:px-6 md:py-8 bg-transparent text-foreground placeholder:text-foreground";
  const errorStyle = "mt-1 text-xs text-red-400";

  const [success, setSuccess] = useState(false);

  // useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    // Enable live validation on every change
    mode: "onChange",
  });

  // function to check if selected date is available for the selected table
  const checkAvailability = async (date, tableNumber) => {
    const response = await fetch(`http://localhost:4000/reservations`);
    const data = await response.json();

    // filter bookings for the selected table
    const tableBookings = data.filter((f) => f.tableNumber == tableNumber);
    // check if any booking matches the selected date - if so, return false
    const available =
      tableBookings.find((f) => Date.parse(f.date) == date.getTime()) ==
      undefined;

    return available;
  };

  // when form is submitted, handleSubmit calls onSubmit function
  const onSubmit = async (data) => {
    try {
      setSuccess(false);
      // Validate selected table
      if (!selectedTable) {
        setError("table", {
          message: "Please select a table",
        });
        return;
      }

      // Validate number of guests
      const guests = Number(data.guests);
      const seats = tables.find((i) => i.id == selectedTable).type;
      if (!Number.isFinite(guests) || guests <= 0) {
        setError("guests", {
          message: "Please enter a valid number of guests",
        });
        return;
      } else if (guests > seats) {
        setError("guests", {
          message: "Table only has room for " + seats + " guests",
        });
        return;
      }

      // Add table number to data and remove the table field (it's just for display)
      const { table, ...formData } = data;
      const bookingData = {
        ...formData,
        tableNumber: selectedTable,
      };

      // Add a small delay to show the submitting state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const available = await checkAvailability(data.date, selectedTable);
      // push data to api
      if (available) {
        const response = await fetch("http://localhost:4000/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });
        // If response is not successful - show error message
        if (!response.ok) {
          setError("root", {
            message: "Booking submission failed. Please try again.",
          });
          return;
        }
      } else {
        setError("root", {
          message:
            "Selected table is not available at the chosen time. Please select another table or time.",
        });
        return;
      }

      // If submission succeeds - show success message
      setSuccess(true);

      // Reset form fields
      reset();

      // Reset selected table in parent component
      if (onTableReset) {
        onTableReset();
      }

      setTimeout(() => setSuccess(false), 5000);

      // if error occurs during fetch catch it and show error message
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  // rendering the component

  return (
    <div className="mt-12 mb-24 space-y-6">
      <h2 className="text-xl font-bold tracking-wide uppercase">
        Book a table
      </h2>

      {/* Booking form */}
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("name", {
              // if input is empty - show error message
              required: "Name is required",
              validate: (value) => {
                // input cannot contain numbers - if it does show error message
                if (/\d/.test(value)) {
                  return "Name cannot contain numbers";
                }
                return true;
              },
            })}
            type="text"
            placeholder="Your Name*"
            className={`${base} ${
              errors.name ? "border-red-500" : "border-foreground"
            }`}
          />
          {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", {
              // if input is empty - show error message
              required: "Email is required",
              validate: (value) => {
                // input must live up to expectations - if not show error message
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                  return "Please enter a valid email address";
                }
                return true;
              },
            })}
            placeholder="Your Email*"
            className={`${base} ${
              errors.email ? "border-red-500" : "border-foreground"
            }`}
          />
          {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
        </div>

        {/* TABLE (from selection) */}
        <div>
          <input
            {...register("table", {
              // if input is empty - show error message
              required: "Table selection is required",
              validate: () => (selectedTable ? true : "Please select a table"),
            })}
            readOnly
            className={`${base} ${
              errors.table ? "border-red-500" : "border-foreground"
            }`}
            value={
              selectedTable ? `Table Number: ${selectedTable}` : "Table Number*"
            }
          />
          {errors.table && <p className={errorStyle}>{errors.table.message}</p>}
        </div>

        <div>
          <input
            {...register("guests", {
              required: "Please enter number of guests",
              validate: (value) => {
                const guests = Number(value);
                if (!Number.isFinite(guests) || guests <= 0) {
                  return "Please enter a valid number of guests";
                }
                return true;
              },
            })}
            type="number"
            placeholder="Number of Guests*"
            className={`${base} ${
              errors.guests ? "border-red-500" : "border-foreground"
            }`}
          />
          {errors.guests && (
            <p className={errorStyle}>{errors.guests.message}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="date"
            control={control}
            rules={{ required: "Please select a date" }}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <div>
          <input
            {...register("contact", {
              required: "Please enter your contact number",
            })}
            type="tel"
            placeholder="Your Contact Number*"
            className={`${base} ${
              errors.contact ? "border-red-500" : "border-foreground"
            }`}
          />
          {errors.contact && (
            <p className={errorStyle}>{errors.contact.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <textarea
            {...register("comment")}
            placeholder="Your Comment"
            className={`border-foreground min-h-32 w-full border bg-transparent px-4 py-3 text-sm outline-red-400 md:col-span-2`}
          />
        </div>

        <button
          className="ml-auto border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:bg-pink-600 hover:text-black md:col-span-2"
          type="submit"
          // disable button while submitting
          disabled={isSubmitting}
        >
          {/* if isSubmitting is true, change to "Submitting..." else show "Subscribe" */}
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>

        {/* Success message */}
        {success && (
          <p className="text-accent mt-4 text-center text-sm font-semibold tracking-wide uppercase md:col-span-2">
            Your booking has been sent!
          </p>
        )}

        {/* Error messages */}
        {errors.root && (
          <p className={`${errorStyle} md:col-span-2`}>{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};

export default BookingReactForm;
