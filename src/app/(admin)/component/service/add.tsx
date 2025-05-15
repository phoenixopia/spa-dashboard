import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface Category {
  id: string;
  name: string;
}
interface Branch {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  imageURL: string;
  status: string;
}

interface AddserviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  newservice: {
    name: string;
    branchIds: string[]; // Changed to string array
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
  const [branches, setBranches] = useState<Branch[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get<{ data: Branch[] }>(`${BURL}/branch`);
        setBranches(response.data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setErrorMessage("Failed to load branches. Please try again later.");
      }
    };

    fetchBranches();
  }, []);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    // Create a synthetic event to pass to onChange
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: 'branchIds',
        value: selectedValues
      }
    } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
    onChange(syntheticEvent);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave();
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
            <label className="block text-sm font-medium mb-1 text-left text-gray-700 dark:text-gray-300">
              Branches
            </label>
            <select
              name="branchIds"
              multiple
              value={newservice.branchIds}
              onChange={handleBranchChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767] h-auto min-h-[42px]"
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple branches</p>
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