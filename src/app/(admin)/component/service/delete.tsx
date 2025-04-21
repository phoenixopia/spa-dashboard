import React, { useState } from "react";
import axios from "axios";

interface DeleteserviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
  onDeleted: () => void;
}

const BURL = process.env.NEXT_PUBLIC_APP_URL;

const DeleteserviceModal: React.FC<DeleteserviceModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  onDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!serviceId) return;

    const token =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || "";

    if (!token) {
      console.error("No token found in cookies.");
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${BURL}/service/delete/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      onDeleted(); // Refresh or refetch data
      onClose();
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this service? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 text-sm rounded-md text-white flex items-center justify-center gap-2 ${
              isDeleting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isDeleting ? (
              <>
                Deleting...
                <svg
                  className="animate-spin h-5 w-5 text-white"
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

export default DeleteserviceModal;
