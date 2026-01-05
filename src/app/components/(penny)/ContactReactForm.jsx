// this component is a rewrite of ContactForm.jsx using react-hook-form library

// this component is called by the contact page to display a contact form with validation

"use client";

// react imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// component imports
import SubmitButton from "@/app/components/(meleese)/buttons/Submit";

const ContactReactForm = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Base input styling
  const base =
    "w-full border px-3 py-[18px] md:px-6 md:py-8 bg-transparent text-foreground placeholder:text-foreground";

  const errorStyle = "mt-1 text-xs text-red-400";

  // when form is submitted, handleSubmit calls onSubmit function
  const onSubmit = async (data) => {
    try {
      setSuccess(false);

      // Add a small delay to show the submitting state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // push data to api
      const response = await fetch("http://localhost:4000/contact_messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError("root", {
          message: "Contact submission failed. Please try again.",
        });
        return;
      }

      // If submission succeeds - show success message
      setSuccess(true);
      reset();
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
    <div className="mb-[90px]">
      {/* Contact form */}
      <form
        className="m-auto flex max-w-[700px] flex-col gap-4"
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
              errors.name ? "border-red-500" : "border-white"
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
            type="text"
            placeholder="Your Email*"
            className={`${base} ${
              errors.email ? "border-red-500" : "border-white"
            }`}
          />
          {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            {...register("comment", {
              // if input is empty - show error message
              required: "Comment is required",
            })}
            placeholder="Your Comment*"
            className={`min-h-32 md:h-96 ${base} ${
              errors.comment ? "border-red-500" : "border-white"
            }`}
          />
          {errors.comment && (
            <p className={errorStyle}>{errors.comment.message}</p>
          )}
        </div>

        <SubmitButton />

        {/* Success message */}
        {success && (
          <p className="text-accent mt-4 text-center text-sm font-semibold tracking-wide uppercase">
            Message sent successfully!
          </p>
        )}

        {/* Error messages */}
        {errors.root && (
          <p className="mt-4 text-center text-sm font-semibold tracking-wide text-red-500 uppercase">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactReactForm;
