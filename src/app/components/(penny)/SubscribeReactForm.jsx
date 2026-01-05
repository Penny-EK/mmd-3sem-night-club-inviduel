// this is a rework of the SubscribeForm component to make it work with react-hook-form

// this component is used in the frontpage to subscribe to the newsletter

"use client";

// react imports
import { useState } from "react";
import { useForm } from "react-hook-form";

const SubscribeReactForm = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // styling
  const errorStyle = "mt-1 text-xs text-red-400";

  // when form is submitted, handleSubmit calls onSubmit function
  const onSubmit = async (data) => {
    try {
      setSuccess(false);

      // Check if email already exists in the API
      const checkResponse = await fetch(
        `http://localhost:4000/newsletters?email=${data.email}`,
      );

      if (checkResponse.ok) {
        const existingEmails = await checkResponse.json();
        // Check if the email already exists
        if (existingEmails && existingEmails.length > 0) {
          setError("root", {
            message: "This email is already subscribed to our newsletter.",
          });
          return;
        }
      }

      // Add a small delay to show the submitting state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // push data to api
      const response = await fetch("http://localhost:4000/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // if response is not successful - show error message
      if (!response.ok) {
        setError("root", {
          message: "Subscription failed. Please try again.",
        });
        return;
      }

      // If subscription succeeds - show success message
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);

      // if error occurs during fetch catch it and show error message
    } catch (error) {
      setError("root", {
        message: "Subscription failed. Please try again.",
      });
    }
  };

  // rendering the component

  return (
    <div className="col-start-1 col-end-4 mt-[95px] mb-[18px] flex w-full flex-col items-center justify-center bg-black pt-16 text-white">
      <h1 className="font-medium tracking-widest uppercase">
        want the latest night club news
      </h1>
      <h2 className="-tracking-wider">
        Subscribe to our newsletter and never miss an{" "}
        <span className="text-accent">Event</span>
      </h2>
      {/* Subscription form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 mb-6 flex flex-col justify-center gap-4 md:flex-row">
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
            className={`${errors.email ? "border-red-500" : "border-white"} min-w-96 border-b-2 bg-transparent text-white placeholder:text-white`}
            type="text"
            placeholder="Enter Your Email"
          />

          <button
            className="border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:bg-pink-600 hover:text-black"
            type="submit"
            // disable button while submitting
            disabled={isSubmitting}
          >
            {/* if isSubmitting is true, change to "Submitting..." else show "Subscribe" */}
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </div>
        {/* Success message */}
        {success && (
          <p className="text-accent mt-4 text-center text-sm font-semibold tracking-wide uppercase">
            You're on the list! See you on the dance floor!
          </p>
        )}
        {/* Error messages */}
        {errors.email && <p className={errorStyle}>{errors.email.message}</p>}

        {/* error message for whole form */}
        {errors.root && <p className={errorStyle}>{errors.root.message}</p>}
      </form>
    </div>
  );
};

export default SubscribeReactForm;
