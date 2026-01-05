"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/app/components/(meleese)/buttons/Submit";

const CommentForm = ({ id }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const baseInput =
    "w-full border px-3 py-[18px] md:px-6 md:py-8 bg-transparent text-foreground placeholder:text-foreground";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const formData = new FormData(e.target);
    const newErrors = {};

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const content = formData.get("comment")?.toString().trim() ?? "";

    // validation
    if (!name) newErrors.name = "Please enter your name";
    if (!email) newErrors.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email address";

    if (!content) newErrors.comment = "Please write a comment";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const data = {
      name,
      email,
      content,
      blogpostId: id,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/comments?content-Type=application/json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setErrors({
          form: "Something went wrong while sending your comment. Please try again.",
        });
        return;
      }

      e.target.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Refresh the page to show the new comment
      router.refresh();
    } catch (err) {
      setErrors({
        form: "Network error. Please try again later.",
      });
    }
  };

  return (
    <div>
      <h2 className="mt-[86px] mb-11 text-[32px] font-bold uppercase">
        Leave a comment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-8 mb-8 flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                className={`${baseInput} ${
                  errors.name ? "border-red-500" : "border-foreground"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email*"
                className={`${baseInput} ${
                  errors.email ? "border-red-500" : "border-foreground"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              name="comment"
              placeholder="Your Comment*"
              className={`${baseInput} h-32 min-h-80 ${
                errors.comment ? "border-red-500" : "border-foreground"
              }`}
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-red-400">{errors.comment}</p>
            )}
          </div>

          {errors.form && (
            <p className="mt-3 text-sm text-red-400">{errors.form}</p>
          )}

          {success && (
            <p className="mt-3 text-sm text-green-400">
              Your comment has been submitted! 🎉
            </p>
          )}
          <SubmitButton />
          {/* <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex w-44 items-center justify-center gap-2.5 border-t-2 border-b-2 border-white px-4 py-5"
          >
            <div className="justify-start font-['Ubuntu'] text-lg font-medium tracking-tight text-white uppercase">
              Submit
            </div>
          </button>
        </div> */}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
