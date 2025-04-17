"use client";

import Sidebar from "../sidebar/page";
import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarAlt, faCogs, faLayerGroup, faPlus, faSeedling, faSpa, faUsers, faCalendarCheck, faSquareRss, faBell } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from "axios";
import { time } from "console";
import EditbookingModal from "../booking/edit"; // import the modal component

// Removed incorrect import of 'data' from "react-router-dom"
const BURL = process.env.NEXT_PUBLIC_APP_URL;


export default function Dashboard() {
  const itemsPerPage = 3;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<BookingItem[]>([]);
  type BookingItem = {
    id: string; // Add the missing 'id' property
    customerName: string;
    service: string;
    phoneNumber: string;
    email: string;
    date: string;
    time: string;
    status: "Approved" | "Pending" | "Rejected";
  };
  
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    serviceId: "",
    price: "",
    status: "",
    customerName: "",
    date: "",
    time: "",
    phoneNumber: "",
    email: "",
  });

  const [newBooking, setNewBooking] = useState({
    name: "",
    serviceId: "",
    price: "",
    status: "",
    customerName: "",
    date: "",
    time: "",
    phoneNumber: "",
    email: "",
  });

  const itemsPerPageCount = itemsPerPage;
  const totalPages = Math.ceil(items.length / itemsPerPageCount);
  const currentItems = items.slice((currentPage - 1) * itemsPerPageCount, currentPage * itemsPerPageCount);
  const [serviceMap, setServiceMap] = useState<{ [key: string]: string }>({});

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const openModal = (item: BookingItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const updateStatus = (newStatus: string) => {
      const updatedItems = items.map((item: BookingItem) => {
        if (item === selectedItem) return { ...item, status: newStatus as "Approved" | "Pending" | "Rejected" };
        return item;
      });
      setItems(updatedItems);
      closeModal();
    };

  // Fetch all the data from the server
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BURL}/booking`);
      console.log("API response:", res.data);

      if (Array.isArray(res.data.data)) {
        setItems(res.data.data); // Assuming the response has a data array
      } else {
        console.error("Unexpected data structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  
  const handleAddBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
    fetchData(); // Refresh the list after adding
  };

  const totalServices = 10;

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


  return (
    <div className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/Image/banner-bg.jpg")' }}>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex justify-between items-center">
            <span>Hello Admin <span className="inline-block mr-2">👋,</span></span>
            <Link href="/notification" className="focus:outline-none">
              <FontAwesomeIcon icon={faBell} className="text-2xl cursor-pointer" />
            </Link>
          </h2>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 mb-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard icon={faSpa} title="Total Services" value={totalServices} />
              <StatCard icon={faUsers} title="Total Users" value="10" />
              <StatCard icon={faCalendarCheck} title="Total Books" value="100" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 mb-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard icon={faSquareRss} title="Total Blogs" value={totalServices} />
              <StatCard icon={faUsers} title="Total Testimonials" value="10" />
              <StatCard icon={faCalendarCheck} title="Today Booked" value="100" />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Booking List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Latest booked</p>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-1.5 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
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
{selectedItem && (
              <EditbookingModal
                showModal={showModal}
                setShowModal={setShowModal}
                editForm={editForm}
                handleAddBookingChange={handleAddBookingChange}
                serviceId={selectedItem.service} // Adjusted the service mapping here
                BURL={BURL || ""} 
                closeModal={() => setShowModal(false)}
                selectedItem={selectedItem} // Pass the selectedItem here
                refreshData={fetchData}
              />
            )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">Previous</button>
              <p className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</p>
              <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>


      
{/* status edit Modal */}
{showModal && selectedItem && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      
      {/* Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Booking Details</h2>
        <button
          onClick={closeModal}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Customer Info */}
      <p className="mb-5 text-sm text-center text-gray-600 dark:text-gray-300">
        Update status for <strong>{selectedItem.customerName}</strong>
      </p>

      {/* Date & Time Fields */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
          <strong>Date:</strong> {selectedItem.date}
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
          <strong>Time:</strong> {selectedItem.time}
        </div>
      </div>

      {/* Status Dropdown Field */}
      <div className="mb-4 items-center">
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-[#008767] dark:text-gray-300">Change Status</label>
        <div className="relative">
          <select
            id="status"
            value={selectedItem.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767] pr-10"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  </div>
)}



    </div>
  );
}

function StatCard({ icon, title, value }: { icon: any; title: string; value: string | number }) {
  return (
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">{title}</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
function setEditForm(arg0: { name: any; serviceId: any; price: any; status: any; customerName: any; date: any; time: any; phoneNumber: any; email: any; }) {
  throw new Error("Function not implemented.");
}

