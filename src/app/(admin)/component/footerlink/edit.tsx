import React, { useState } from "react";
import axios from "axios";

interface EditForm {
  name: string;
  link: string;
}

interface EditserviceModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editForm: EditForm;
  handleEditChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  serviceId: string;
  BURL: string;
  onSaveSuccess?: () => void;
  onEdited: () => void;
}

const EditserviceModal: React.FC<EditserviceModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  serviceId,
  BURL,
  onSaveSuccess,
  onEdited
}) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  if (!showModal) return null;
                console.log("footer id", serviceId)


  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      const response = await axios.put(
        `${BURL}/footer-links/edit/${serviceId}`,

        {
          name: editForm.name,
          link: editForm.link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );


      setMessage("link updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
        onSaveSuccess?.();
        onEdited();
      }, 1500);
    } catch (error) {
      console.error("Failed to update link:", error);
      setMessage("Error updating link. Please try again.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit Link
          </h2>
          <button
            onClick={() => {
              setShowModal(false);
              setMessage("");
              setMessageType("");
            }}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
            aria-label="Close Modal"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Link Name
            </label>
            <input
              name="name"
              type="text"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Enter the link name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

           <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Link
            </label>
            <input
              name="link"
              type="text"
              value={editForm.link}
              onChange={handleEditChange}
              placeholder="Enter the url for the link name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${messageType === "error" ? "text-red-600" : "text-green-600"}`}
            >
              {message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center ${
                isSaving
                  ? "bg-[#006d50] cursor-not-allowed"
                  : "bg-[#008767] hover:bg-[#006d50]"
              } text-white`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-1 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  <span> Saving...</span>
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

export default EditserviceModal;