import React, { useState } from "react";
import axios from "axios";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface EditBookingModalProps {
  showModal: boolean;
  selectedItem: { _id: string; customerName: string; serviceId: string; price: number } | null;
  closeModal: () => void;
  setShowModal: (value: boolean) => void;
  refreshData?: () => void; // optional callback to refresh table/list
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({
  showModal,
  selectedItem,
  closeModal,
  setShowModal,
  refreshData,
}) => {
  const [editForm, setEditForm] = useState({
    name: selectedItem?.customerName || "",
    serviceId: selectedItem?.serviceId || "",
    price: selectedItem?.price || "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      const response = await axios.put(
        `${BURL}/booking/edit/${selectedItem?._id}`,
        {
          name: editForm.name,
          serviceId: editForm.serviceId,
          price: editForm.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage("Booking updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
        if (refreshData) refreshData();
      }, 1500);
    } catch (error) {
      console.error("Failed to update booking:", error);
      setMessage("Error updating booking. Please try again.");
      setMessageType("error");
    }
  };

  if (!showModal || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Edit Booking
          </h2>
          <button
            onClick={closeModal}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#008767] dark:text-gray-300">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#008767] dark:text-gray-300">
              Service ID
            </label>
            <input
              type="text"
              name="serviceId"
              value={editForm.serviceId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#008767] dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={editForm.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              messageType === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-[#008767] text-white px-4 py-2 rounded-lg hover:bg-[#006d50] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
