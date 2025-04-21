import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface Category {
  id: string;
  name: string;
}

interface AddserviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>; // Updated to support async saving
  newservice: {
    name: string;
    categoryId: string;
    price: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddserviceModal: React.FC<AddserviceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newservice,
  onChange
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${BURL}/category`)
        .then(res => {
          setCategories(res.data.data);
          console.log('Fetched Categories:', res.data.data);
        })
        .catch(err => console.error('Error fetching categories:', err));
    }
  }, [isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(); // Wait for save to complete
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add service</h2>
          <button
            onClick={onClose}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Service Name</label>
            <input
              name="name"
              type="text"
              value={newservice.name}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="categoryId"
              value={newservice.categoryId}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Price</label>
            <input
              name="price"
              type="text"
              value={newservice.price}
              onChange={onChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
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
                <span>Saving...</span>
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

export default AddserviceModal;
