import React, { useState } from "react";
import axios from "axios";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onDeleted: () => void;
}

const BURL = process.env.NEXT_PUBLIC_APP_URL;

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  userId,
  onDeleted,
}) => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      const response = await axios.delete(`${BURL}/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setResponseMessage(response.data?.message || "User deleted successfully.");
      setIsSuccess(true);
      onDeleted();
      setTimeout(() => {
        setResponseMessage(null);
        onClose();
      }, 2000);
    } catch (error: any) {
      setResponseMessage(
        error.response?.data?.message || "Failed to delete user. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        {/* Response Message */}
        {responseMessage && (
          <div
            className={`rounded-md px-4 py-2 mb-4 text-sm font-medium ${
              isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {responseMessage}
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3 mb-4">
          <button
            onClick={() => {
              setResponseMessage(null);
              setIsSuccess(null);
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 text-sm rounded-md text-white flex items-center justify-center ${
              loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
