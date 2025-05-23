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
    description: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onAdd(): void;
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${BURL}/category`)
        .then(res => {
          setCategories(res.data.data);
          setError(null);
        })
        .catch(err => {
          console.error('Error fetching categories:', err);
          setError('Failed to fetch categories. Please try again.');
        });
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!newcategory.name || !newcategory.description || !imageFile) {
      setError('Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newcategory.name);
    formData.append('description', newcategory.description);
    formData.append('image', imageFile);

    try {
      setLoading(true);
      const token =
        document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))?.split('=')[1] || '';
      await axios.post(`${BURL}/category/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setError(null);
      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to add category:', err);
      setError('Failed to add category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add Category</h2>
          <button onClick={onClose} className="text-[#008767] hover:text-[#006d50] text-3xl font-bold">×</button>
        </div>

        {error && (
          <div className="mb-4 p-2 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#008767] file:text-white hover:file:bg-[#006d50]"
            />
          </div>

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

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
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
                  <span>Saving...</span>
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

export default AddcategoryModal;
