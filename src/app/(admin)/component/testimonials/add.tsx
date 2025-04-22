import React, { useState } from 'react';
import axios from 'axios';

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface testimonial {
  firstName: any,
  lastName: any,
  imageURL: any,
  message: any,
}

interface AddtestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newtestimonial: {
    firstName: string,
    lastName: string,
    imageURL: string,
    message: string,
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddtestimonialModal: React.FC<AddtestimonialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newtestimonial,
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (isLoading) return; // Prevent double submission
    setIsLoading(true);
    setError(null); // Clear any previous errors

    const formData = new FormData();
    formData.append('firstName', newtestimonial.firstName);
    formData.append('lastName', newtestimonial.lastName);
    formData.append('message', newtestimonial.message);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token =
        document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))?.split('=')[1] || '';

      await axios.post(`${BURL}/testimonial/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
      setError('Failed to save testimonial. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add testimonial</h2>
          <button onClick={onClose} className="text-[#008767] hover:text-[#006d50] text-3xl font-bold">×</button>
        </div>

        {error && (
          <div className="mb-4 p-2 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">First Name</label>
            <input
              name="firstName"
              type="text"
              value={newtestimonial.firstName}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={newtestimonial.lastName}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Upload Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#008767] file:text-white hover:file:bg-[#006d50]"
            />
            
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              value={newtestimonial.message}
              onChange={onChange}
              rows={3}
              className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              type="button"
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white w-full sm:w-auto flex items-center justify-center gap-2 ${
                isLoading ? 'bg-[#008767] cursor-not-allowed' : 'bg-[#008767] hover:bg-[#006d50]'
              }`}
            >
              {isLoading ? (
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

export default AddtestimonialModal;
