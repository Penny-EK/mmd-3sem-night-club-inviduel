// this component provides a confirmation popup for deleting comments with email verification

"use client";

// react imports
import { useState } from "react";

// next components
import { useRouter } from "next/navigation";

// icon imports
import { RiDeleteBinLine } from "react-icons/ri";

const ConfirmationPopUp = ({ id, email }) => {
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // handles delete action after email verification
  const handleDelete = async () => {
    // verify email matches before allowing deletion
    if (emailInput.trim().toLowerCase() !== email.toLowerCase()) {
      setErrorMessage("Email does not match!");
      return;
    }

    // send delete request to api
    try {
      const response = await fetch(`http://localhost:4000/comments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // reset form and close popup on success
        document.body.style.overflow = "unset";
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

  // handles cancel action and resets form
  const handleCancel = () => {
    document.body.style.overflow = "unset";
    setShowPopUp(false);
    setEmailInput("");
    setErrorMessage("");
  };

  return (
    <div>
      {/* delete icon button to trigger popup */}
      <RiDeleteBinLine
        size={25}
        className="hover:text-accent cursor-pointer"
        onClick={() => {
          document.body.style.overflow = "hidden";
          setShowPopUp(true);
        }}
      />
      {/* confirmation popup modal */}
      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="min-w-[300px] border-2 bg-(--background) p-5">
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

            {/* display error message if email doesn't match */}
            {errorMessage && (
              <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
            )}

            {/* action buttons */}
            <div className="mt-5 flex gap-2.5">
              <button
                onClick={handleDelete}
                disabled={!emailInput}
                className={`className="ml-auto hover:text-black" cursor-pointer border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:border-0 hover:bg-pink-600 ${
                  emailInput
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-60"
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
