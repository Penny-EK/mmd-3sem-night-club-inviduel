// this component is called by the blog post page to display a comment form and handle comment submissions
"use client";

// react imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const CommentReactForm = ({ id }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // styling
  const baseInput =
    "w-full border px-3 py-[18px] md:px-6 md:py-8 bg-transparent text-foreground placeholder:text-foreground";
  const errorStyle = "mt-1 text-xs text-red-400";

  // when form is submitted, handleSubmit calls onSubmit function
  const onSubmit = async (data) => {
    try {
      setSuccess(false);

      // Add a small delay to show the submitting state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const commentData = {
        name: data.name,
        email: data.email,
        content: data.comment,
        blogpostId: id,
        date: new Date().toISOString(),
      };

      // push data to api
      const response = await fetch(
        "http://localhost:4000/comments?content-Type=application/json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        },
      );

      // if response is not successful - show error message
      if (!response.ok) {
        setError("root", {
          message:
            "Something went wrong while sending your comment. Please try again.",
        });
        return;
      }

      // If comment succeeds - show success message
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);

      // Refresh the page to show the new comment
      router.refresh();

      // if error occurs during fetch catch it and show error message
    } catch (err) {
      setError("root", {
        message: "Network error. Please try again later.",
      });
    }
  };

  return (
    <div>
      <h2 className="mb-11 text-[32px] font-bold uppercase">Leave a comment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 mb-8 flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
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
                className={`${baseInput} ${
                  errors.name ? "border-red-500" : "border-foreground"
                }`}
                type="text"
                placeholder="Your Name*"
              />
              {/* Error messages */}
              {errors.name && (
                <p className={errorStyle}>{errors.name.message}</p>
              )}
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
                className={`${baseInput} ${
                  errors.email ? "border-red-500" : "border-foreground"
                }`}
                type="text"
                placeholder="Your Email*"
              />
              {/* Error messages */}
              {errors.email && (
                <p className={errorStyle}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              {...register("comment", {
                // if input is empty - show error message
                required: "Comment is required",
              })}
              placeholder="Your Comment*"
              className={`${baseInput} ${
                errors.comment ? "border-red-500" : "border-foreground"
              } h-32 min-h-80`}
            />
            {/* Error messages */}
            {errors.comment && (
              <p className={errorStyle}>{errors.comment.message}</p>
            )}
          </div>

          {/* Success message */}
          {success && (
            <p className="mt-3 text-sm text-green-400">
              Your comment has been submitted!
            </p>
          )}
          <div className="flex items-start">
            {/* error message for whole form */}
            {errors.root && <p className={errorStyle}>{errors.root.message}</p>}

            <button
              className="ml-auto cursor-pointer border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:bg-pink-600 hover:text-black"
              type="submit"
              // disable button while submitting
              disabled={isSubmitting}
            >
              {/* if isSubmitting is true, change to "Submitting..." else show "Subscribe" */}
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentReactForm;
