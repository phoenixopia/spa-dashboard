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
  onSave: () => void;
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

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${BURL}/category`, {
        })
        .then(res => {
          setCategories(res.data.data);
          console.log('Fetched Categories:', res.data.data); // ✅ Move this inside the .then block
        })
        .catch(err => console.error('Error fetching categories:', err));
    }
  }, [isOpen]);
  

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
              onClick={onSave}
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

export default AddserviceModal;
