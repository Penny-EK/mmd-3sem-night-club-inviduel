"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// icon imports
import { RiDeleteBinLine } from "react-icons/ri";

const ConfirmationPopUp = ({ id, email }) => {
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    if (emailInput.trim().toLowerCase() !== email.toLowerCase()) {
      setErrorMessage("Email does not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/comments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowPopUp(false);
        setEmailInput("");
        setErrorMessage("");
        // Refresh server data to show updated comments
        router.refresh();
      } else {
        setErrorMessage("Failed to delete comment");
      }
    } catch (error) {
      setErrorMessage("Error deleting comment");
      console.error("Error deleting comment:", error);
    }
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setEmailInput("");
    setErrorMessage("");
  };

  return (
    <div>
      <RiDeleteBinLine
        size={25}
        className="hover:text-accent cursor-pointer"
        onClick={() => setShowPopUp(true)}
      />
      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="min-w-[300px] rounded-lg bg-(--background) p-5">
            <h2 className="text-xl font-bold">Delete Comment</h2>
            <p className="mt-2">
              Are you sure you want to delete this comment?
            </p>
            <p className="mt-4 mb-1 font-medium">
              Please enter the email address to confirm:
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email address"
              className="border-accent mb-4 w-full rounded border p-2"
            />

            {errorMessage && (
              <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
            )}

            <div className="mt-5 flex gap-2.5">
              <button
                onClick={handleDelete}
                disabled={!emailInput}
                className={`rounded px-5 py-2.5 text-white ${
                  emailInput
                    ? "cursor-pointer bg-red-500 hover:bg-red-600"
                    : "cursor-not-allowed bg-gray-400 opacity-60"
                }`}
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                className="ml-auto cursor-pointer border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:bg-pink-600 hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPopUp;
