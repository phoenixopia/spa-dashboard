"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faPlus, faSpa } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddbookingModal from './add'; // import the modal component
import EditbookingModal from "./edit"; // import the modal component

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function Booking() {
  const itemsPerPage = 3;
  const [data, setData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0); // Store total count

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({
    name: '', serviceId: '', price: 0, status: '', customerName: '', date: '', time: '', phoneNumber: '', email: ''
  });

  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [serviceMap, setServiceMap] = useState<{ [key: string]: string }>({});

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

  // Fetch service data once and map the service names to their IDs
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BURL}/service`);
      const map: { [key: string]: string } = {};
      res.data.data.forEach((service: { id: string | number; name: string }) => {
        map[service.id] = service.name;
      });
      setServiceMap(map); // Set the service map
    } catch (error) {
      console.error("Failed to load services", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch bookings data
    fetchServices(); // Fetch services data
  }, []); // Runs once when the component mounts

  // Get current page items based on pagination
  const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Fetch total count for today’s bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BURL}/booking/today`);
        if (res.data && res.data.pagination) {
          setTotalCount(res.data.pagination.total); // Set total count from pagination
        }
      } catch (error) {
        console.error("Error fetching today's bookings:", error);
      }
    };

    fetchBookings(); // Call the function inside useEffect
  }, []);

  const handleRowClick = (item: any) => {
    setSelectedItem(item); // Set the selected item
    setEditForm({
      name: item.name,
      serviceId: item.serviceId,
      price: item.price,
      status: item.status,
      customerName: item.customerName,
      date: item.date,
      time: item.time,
      phoneNumber: item.phoneNumber,
      email: item.email,
    });
    setShowModal(true); // Open the edit modal
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const [addModal, setAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: '', serviceId: '', price: 0, status: '', customerName: '', date: '', time: '', phoneNumber: '', email: ''
  });

  const handleAddBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
    fetchData(); // Refresh the list after adding
  };

  const handleAddSave = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))?.split('=')[1] || '';
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
      console.log('Booking added:', response?.data?.booking);
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

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Card 1 */}
            <div className="w-full sm:w-auto bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">
                    Total Bookings
                  </h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {totalItems}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full sm:w-auto bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">
                    Total Bookings for Today
                  </h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {totalCount}
                  </p>
                </div>
              </div>
            </div>
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
      <th className="px-6 py-3 text-left">Customer Name</th>
      <th className="px-6 py-3 text-left">Service</th>
      <th className="px-6 py-3 text-left">Phone Number</th>
      <th className="px-6 py-3 text-left">Email</th>
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
        <td className="px-6 py-3 text-left">{`${item.firstName} ${item.lastName}`}</td>
        <td className="px-6 py-3 text-left">{serviceMap[item.serviceId] || "Loading..."}</td>
        <td className="px-6 py-3 text-left">{item.phoneNumber}</td>
        <td className="px-6 py-3 text-left">{item.email || "null"}</td>
        <td className="px-6 py-3 text-right">
          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${item.status === "Approved"
              ? "bg-green-100 text-green-800"
              : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"}`}
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
              <EditbookingModal
                showModal={showModal}
                setShowModal={setShowModal}
                editForm={editForm}
                handleAddBookingChange={handleAddBookingChange}
                serviceId={selectedItem.serviceId} // Adjusted the serviceId mapping here
                BURL={BURL || ""} 
                closeModal={() => setShowModal(false)}
                selectedItem={selectedItem} // Pass the selectedItem here
                refreshData={fetchData}
              />
            )}

            <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">Previous</button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
