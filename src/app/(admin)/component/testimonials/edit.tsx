import React, { useState } from "react";
import axios from "axios";

interface EditForm {
  firstName: string;
  lastName: string;
  message: string;
}

interface EdittestimonialModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editForm: EditForm;
  handleEditChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  testimonialId: string;
  BURL: string;
  refresh: () => void;
}

const EdittestimonialModal: React.FC<EdittestimonialModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  testimonialId,
  BURL,
  refresh,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading

  // If the modal is not open, return null to prevent rendering
  if (!showModal) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true); // Set loading to true when save starts
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      // Log token for debugging
      console.log("Token:", token);

      

      // Log FormData for debugging
      console.log("edit Data:", editForm);
      

      const response = await axios.put(`${BURL}/testimonial/edit/${testimonialId}`, {
      
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        
        editForm,
      });

      console.log("Response: edit testi", response); // Log the response for debugging

      setMessage("Testimonial updated successfully.");
      setMessageType("success");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
        refresh();
      }, 1500);
    } catch (error: any) {
      console.error("Error during request:", error); // Log any request error
      const backendMessage =
        error.response?.data?.message || "Error updating testimonial.";
      setMessage(backendMessage);
      setMessageType("error");
    } finally {
      setIsLoading(false); // Reset loading when the operation is complete
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit Testimonial
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
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={editForm.firstName}
              onChange={handleEditChange}
              placeholder="Enter first name"
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={editForm.lastName}
              onChange={handleEditChange}
              placeholder="Enter last name"
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#008767] file:text-white hover:file:bg-[#006d50]"
            />
            {imageFile && (
              <p className="text-xs text-gray-500 mt-1">Selected: {imageFile.name}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={editForm.message}
              onChange={handleEditChange}
              placeholder="Enter testimonial message"
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Status Message */}
          {message && (
            <p
              className={`text-sm ${
                messageType === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={isLoading} // Disable button when loading
              className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
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
                  <span className="ml-2">Saving...</span>
                </div>
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

export default EdittestimonialModal;
