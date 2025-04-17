import React, { useState, useEffect } from "react";
import axios from "axios";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

interface Booking {
  id: string;
  status: "Approved" | "Pending" | "Rejected";
  customerName?: string;
  dateTime?: string; // Use string to match API response
  time?: string;
}

interface EditBookingModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddBookingChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  serviceId: any;
  BURL: string;
  editForm: any;
  closeModal: () => void;
  selectedItem: Booking | null;
  refreshData?: () => void;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({
  showModal,
  selectedItem,
  closeModal,
  setShowModal,
  refreshData,
}) => {
  const [status, setStatus] = useState<"Approved" | "Pending" | "Rejected">(
    selectedItem?.status || "Pending"
  );
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      setStatus(selectedItem.status);
    }
  }, [selectedItem]);

  const handleUpdateTime = async () => {
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || "";

      await axios.put(
        `${BURL}/booking/edit/${selectedItem?.id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessage("Booking status updateTimed successfully!");
      setMessageType("success");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setMessageType("");
        if (refreshData) refreshData();
      }, 1500);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setMessage("Failed to updateTime status. Please try again.");
      setMessageType("error");
    }
  };

  if (!showModal || !selectedItem) return null;

  // Safely parse the dateTime string
  const bookingdateTime = selectedItem.dateTime ? new Date(selectedItem.dateTime) : null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Booking Details
          </h2>
          <button
            onClick={closeModal}
            className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Customer Info */}
        <p className="mb-5 text-sm text-center text-gray-600 dark:text-gray-300">
          UpdateTime status for <strong>{selectedItem.customerName || "Customer"}</strong>
        </p>

        {/* dateTime & Time */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
            <strong>Date:</strong> {selectedItem.dateTime ? new Date(selectedItem.dateTime).toLocaleDateString() : "N/A"}

          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
            <strong>Time:</strong> {bookingdateTime ? bookingdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
          </div>
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-[#008767] dark:text-gray-300"
          >
            Change Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Approved" | "Pending" | "Rejected")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767] pr-10"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mt-2 text-sm text-center ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateTime}
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
