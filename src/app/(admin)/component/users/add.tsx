import React, { useState } from 'react';
import axios from 'axios';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>; // async save function from parent
  newUser: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    updatedAt?: string;
    password: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  setNewUserMessage: (message: string) => void; // ✅ added for setting error/success message
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newUser,
  onChange,
  setNewUserMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
    } catch (error) {
      // ✅ Handle error from backend
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message || 'Something went wrong while saving the user.';
        setNewUserMessage(`Error: ${msg}`);
      } else {
        setNewUserMessage('Error: Failed to connect to the server. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isSuccessMessage = newUser.message.toLowerCase().includes('success');

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add User</h2>
          <button
            onClick={onClose}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* ✅ Message Box */}
        {newUser.message && (
          <div
            className={`mb-4 px-4 py-2 rounded-md text-sm font-medium ${
              isSuccessMessage
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {newUser.message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">First Name</label>
            <input
              name="firstName"
              type="text"
              value={newUser.firstName}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={newUser.lastName}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={newUser.email}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              value={newUser.phoneNumber}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={newUser.password}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg text-white w-full sm:w-auto flex items-center justify-center ${
                isLoading ? 'bg-[#008767] cursor-not-allowed' : 'bg-[#008767] hover:bg-[#006d50]'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-5 w-5 mr-2 animate-spin text-white"
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
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
