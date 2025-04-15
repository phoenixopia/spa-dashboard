// components/user/delete.tsx
import React from "react";
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
  const handleDelete = async () => {
    if (!userId) return;

    try {
      await axios.delete(`${BURL}/user/delete/${userId}`);
      onDeleted(); // Refresh or refetch data
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
