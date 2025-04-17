import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface Category {
  id: string;
  name: string;
  imageURL: string;
  description: string;
}

interface AddcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newcategory: {
    name: string;
    imageURL: string;
    description: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const AddcategoryModal: React.FC<AddcategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newcategory,
  onChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${BURL}/category`)
        .then(res => {
          setCategories(res.data.data);
          console.log('Fetched Categories:', res.data.data);
          setError(null);
        })
        .catch(err => {
          console.error('Error fetching categories:', err);
          setError('Failed to fetch categories. Please try again.');
        });
    }
  }, [isOpen]);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your preset

    // try {
    //   const res = await axios.post(
    //     'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
    //     formData
    //   );
    //   const imageURL = res.data.secure_url;

    //   // Update newcategory with image URL
    //   onChange({
    //     target: {
    //       name: 'imageURL',
    //       value: imageURL,
    //     },
    //   } as React.ChangeEvent<HTMLInputElement>);
    //   setError(null);
    // } catch (err) {
    //   console.error('Image upload failed:', err);
    //   setError('Image upload failed. Please try again.');
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add Category</h2>
          <button onClick={onClose} className="text-[#008767] hover:text-[#006d50] text-3xl font-bold">×</button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category Name</label>
            <input
              name="name"
              type="text"
              value={newcategory.name}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image</label>
            <input
              name="imageURL"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#008767] file:text-white hover:file:bg-[#006d50]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={newcategory.description}
              onChange={onChange}
              rows={3}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Save Button */}
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

export default AddcategoryModal;
