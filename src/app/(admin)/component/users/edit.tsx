import React from "react";
import axios from "axios";

interface EditForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;

}

interface EditUserModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editForm: EditForm;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userId: string;
  BURL: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  userId,
  BURL,
}) => {
  if (!showModal) return null;

  const handleSave = async () => {
    try {

      const test = await axios.put(`${BURL}/user/edit/${userId}`, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phoneNumber: editForm.phoneNumber,
        password: editForm.password,
      });
      console.log("User updated:", test);
      alert("User updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit User
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
            aria-label="Close Modal"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
          <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
         First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={editForm.firstName}
              onChange={handleEditChange}
              placeholder="Enter user's full name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
         Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={editForm.lastName}
              onChange={handleEditChange}
              placeholder="Enter user's full name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
          Email
            </label>
            <input
              name="email"
              type="text"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Enter email address"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
          Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              value={editForm.phoneNumber}
              onChange={handleEditChange}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
          Password
            </label>
            <input
              name="password"
              type="password"
              value={editForm.password}
              onChange={handleEditChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
