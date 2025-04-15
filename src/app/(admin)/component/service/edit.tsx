import React, { useEffect, useState } from "react";
import axios from "axios";

interface EditForm {
  name: string;
  categoryId: string;
  price: number;
}

interface EditserviceModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editForm: EditForm;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  serviceId: string;
  BURL: string;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

const EditserviceModal: React.FC<EditserviceModalProps> = ({
  showModal,
  setShowModal,
  editForm,
  handleEditChange,
  serviceId,
  BURL,
}) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    if (showModal) {
      axios
        .get(`${BURL}/category`)
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });
    }
  }, [showModal, BURL]);

  if (!showModal) return null;

  const handleSave = async () => {
    
    try {
      const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || '';
      const response = await axios.put(
        `${BURL}/service/edit/${serviceId}`,
        {
          name: editForm.name,
          categoryId: editForm.categoryId,
          price: editForm.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setMessage("Service updated successfully!");
      setMessageType("success");
      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
      }, 1500);
    } catch (error) {
      console.error("Failed to update service:", error);
      setMessage("Error updating service. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit service
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
              Name
            </label>
            <input
              name="name"
              type="text"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Enter service's full name"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="categoryId"
              value={editForm.categoryId}
              onChange={handleEditChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                messageType === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

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

export default EditserviceModal;
