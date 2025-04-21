import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface testimonial {
  id: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  message: string;
}

interface AddtestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newtestimonial: {
    firstName: string;
    lastName: string;
    message: string;
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
  const [categories, setCategories] = useState<testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${BURL}/testimonial`)
        .then((res) => {
          setCategories(res.data.data);
          setError(null);
        })
        .catch((err) => {
          console.error('Error fetching testimonials:', err);
          setError('Failed to fetch testimonials.');
        });
    } else {
      setError(null);
      setSuccess(null);
      setImageFile(null);
    }
  }, [isOpen]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
   
  };

  const handleSave = async () => {
    setLoading(true); // Set loading to true when the save operation starts

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
      setSuccess('Testimonial added successfully!');
      setError(null);
      onSave(); // reload or close
    } catch (err) {
      console.error(err);
      setError('Failed to save testimonial. Please try again.');
      setSuccess(null);
    } finally {
      setLoading(false); // Set loading to false when the operation is complete
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Add Testimonial
          </h2>
          <button
            onClick={onClose}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-100 border border-green-400 text-green-700 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={newtestimonial.firstName}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={newtestimonial.lastName}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#008767] file:text-white hover:file:bg-[#006d50]"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={newtestimonial.message}
            onChange={onChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <div className="flex justify-end gap-2 mt-4">
          <button
              onClick={handleSave}
              disabled={loading} // Disable button while loading
              className={`px-4 py-2 rounded-lg ${loading ? 'bg-[#008767]' : 'bg-[#008767]'} text-white hover:${loading ? 'bg-[006d50]' : 'bg-[#006d50]'} transition-all`}
            >
              {loading ? (
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
