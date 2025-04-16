"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpa } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddbookingModal from './add'; // import the modal component
import EditbookingModal from "./edit"; // import the modal component
import EditBookingModal from "./edit";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function Booking() {
  const itemsPerPage = 3;
  const [data, setData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Fetch all the data from the server
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BURL}/booking`);
      console.log("API response:", res.data);

      if (Array.isArray(res.data.data)) {
        setData(res.data.data); // Assuming the response has a data array
      } else {
        console.error("Unexpected data structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentItems = [];
  for (let i = indexOfFirstItem; i < indexOfLastItem && data && i < data.length; i++) {
    currentItems.push(data[i]);
  }

  const handleRowClick = (item: any) => {
    setSelectedItem(item); // Set the selected item
    setShowModal(true); // Open the edit modal
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const [addModal, setAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: '', serviceId: '', price: 0, status: '', customerName: '', date: '', time: '', phoneNumber: '', email: ''});

  const handleAddBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSave = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || '';
      const response = await axios.post(
        `${BURL}/booking/create`,
        newBooking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log('booking added:', response?.data?.booking);
      setAddModal(false);
      fetchData(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Booking Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <FontAwesomeIcon icon={faSpa} className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total bookings</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add booking</span>
            </button>
          </div>

          <AddbookingModal
            isOpen={addModal}
            onClose={() => setAddModal(false)}
            onSave={handleAddSave}
            newbooking={newBooking}
            onChange={handleAddBookingChange}
          />

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Booking List</h2>
            </div>

            <div className="relative overflow-x-auto shadow-sm rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Customer Name</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item: any) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item)} // Pass clicked row item
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm">{item.customerName}</td>
                      <td className="px-4 py-2 text-sm">{item.service}</td>
                      <td className="px-4 py-2 text-sm">{item.date}</td>
                      <td className="px-4 py-2 text-sm">{item.time}</td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedItem && (
              <EditBookingModal
              showModal={showModal}
              selectedItem={selectedItem}
              closeModal={() => setShowModal(false)}
              setShowModal={setShowModal}
              refreshData={fetchData} // optional if you have a refetch function
            />
            
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
