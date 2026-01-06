"use client";

import { useState } from "react";

// icon imports
import { RiDeleteBinLine } from "react-icons/ri";

const ConfirmationPopUp = ({ id, email }) => {
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
        // Refresh the page to show updated comments
        window.location.reload();
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
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete this comment?</p>
            <p
              style={{
                marginTop: "15px",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Please enter the email address to confirm:
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email address"
              className="border-accent border"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            />

            {errorMessage && (
              <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleDelete}
                disabled={!emailInput}
                style={{
                  padding: "10px 20px",
                  backgroundColor: emailInput ? "#ef4444" : "#9ca3af",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: emailInput ? "pointer" : "not-allowed",
                  opacity: emailInput ? 1 : 0.6,
                }}
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
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

// styles for popup
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popupStyle = {
  background: "var(--background)",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
};

export default ConfirmationPopUp;
