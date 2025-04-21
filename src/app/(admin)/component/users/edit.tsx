import React, { useState } from "react";
import axios from "axios";

interface EditForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface EditUserModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editForm: EditForm & { updatedAt: string };
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userId: string;
  BURL: string;
  onUpdated: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  userId,
  BURL,
  onUpdated,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false); // New loading state

  if (!showModal) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || '';

      const response = await axios.put(
        `${BURL}/user/edit/${userId}`,
        {
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          phoneNumber: editForm.phoneNumber,
          password: editForm.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "User updated successfully!");
      setMessageType("success");
      onUpdated();
      setShowModal(false);
    } catch (error: any) {
      console.error("Failed to update user:", error);
      const errMsg = error.response?.data?.message || "Error updating user. Please try again.";
      setMessage(errMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage(null);
    setMessageType(null);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit User
          </h2>
          <button
            onClick={handleClose}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
            aria-label="Close Modal"
          >
            ×
          </button>
        </div>

        {/* Show backend message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">
          {["firstName", "lastName", "email", "phoneNumber", "password"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
                {field === "phoneNumber" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                type={field === "password" ? "password" : "text"}
                value={(editForm as any)[field]}
                onChange={handleEditChange}
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 text-white 
                ${loading ? 'bg-[#006d50] cursor-not-allowed' : 'bg-[#008767] hover:bg-[#006d50]'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
