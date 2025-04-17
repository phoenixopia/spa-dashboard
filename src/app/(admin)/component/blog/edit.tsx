import React, { useState } from "react";
import axios from "axios";

interface EditForm {
  title: string,
   imageURL: string, 
   content: string, updatedAt: Date
}

interface EditblogModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editForm: EditForm;
  handleEditChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  blogId: string;
  BURL: string;
  refresh: () => void;
}

const EditblogModal: React.FC<EditblogModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  blogId,
  BURL,
  refresh,
}) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  if (!showModal) return null;

  const handleSave = async () => {
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      await axios.put(
        `${BURL}/blog/edit/${blogId}`,
        {
          
          title: editForm.title, 
          content: editForm.content, 
          updatedAt: editForm.updatedAt, 
          imageURL: editForm.imageURL,
        
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage("blog updated successfully.");
      setMessageType("success");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
        refresh(); // ✅ Refresh after saving
      }, 1500);
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message || "Error updating blog.";
      setMessage(backendMessage);
      setMessageType("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit blog
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
              name="title"
              type="text"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Enter first name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

        

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              name="imageURL"
              type="text"
              value={editForm.imageURL}
              onChange={handleEditChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              placeholder="Enter blog message"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
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

export default EditblogModal;
