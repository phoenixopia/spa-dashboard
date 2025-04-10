"use client";

import Sidebar from "../sidebar/page";
import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarAlt, faCogs, faLayerGroup, faPlus, faSeedling, faSpa, faUsers, faCalendarCheck, faSquareRss, faBell } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { time } from "console";

export default function Dashboard() {
  const itemsPerPage = 3;
  const data = [
    { customerName: 'John Doe', service: 'Apple MacBook Pro 17"', phoneNumber: '+1 234 567 890', email: 'johndoe@example.com', date: '2025-04-08', status: 'Completed', time: '10:00 AM' },
    { customerName: 'Jane Smith', service: 'Microsoft Surface Pro', phoneNumber: '+1 987 654 321', email: 'janesmith@example.com', date: '2025-04-09', status: 'Pending', time: '10:00 AM' },
    { customerName: 'Michael Johnson', service: 'Magic Mouse 2', phoneNumber: '+1 555 123 456', email: 'michaeljohnson@example.com', date: '2025-04-10', status: 'Rejected', time: '10:00 AM' },
    { customerName: 'Emily Davis', service: 'iPhone 13', phoneNumber: '+1 321 654 987', email: 'emilydavis@example.com', date: '2025-04-11', status: 'Completed', time: '10:00 AM' },
    { customerName: 'James Brown', service: 'iPad Pro', phoneNumber: '+1 654 987 123', email: 'jamesbrown@example.com', date: '2025-04-12', status: 'Rejected' , time: '10:00 AM'},
    { customerName: 'Olivia Wilson', service: 'Apple Watch', phoneNumber: '+1 987 321 654', email: 'oliviawilson@example.com', date: '2025-04-13', status: 'Pending' , time: '10:00 AM'},
    { customerName: 'Liam Moore', service: 'AirPods Pro', phoneNumber: '+1 123 456 789', email: 'liammoore@example.com', date: '2025-04-14', status: 'Completed' , time: '10:00 AM'},
    { customerName: 'Sophia Taylor', service: 'Dell XPS 13', phoneNumber: '+1 765 432 109', email: 'sophiataylor@example.com', date: '2025-04-15', status: 'Pending', time: '10:00 AM' },
    { customerName: 'Liam Moore', service: 'AirPods Pro', phoneNumber: '+1 123 456 789', email: 'liammoore@example.com', date: '2025-04-14', status: 'Completed' , time: '10:00 AM'},
    { customerName: 'Sophia Taylor', service: 'Dell XPS 13', phoneNumber: '+1 765 432 109', email: 'sophiataylor@example.com', date: '2025-04-15', status: 'Pending', time: '10:00 AM' }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(data);
  const [selectedItem, setSelectedItem] = useState<typeof data[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPageCount = itemsPerPage;
  const totalPages = Math.ceil(items.length / itemsPerPageCount);
  const currentItems = items.slice((currentPage - 1) * itemsPerPageCount, currentPage * itemsPerPageCount);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const openModal = (item: typeof data[0]) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const updateStatus = (newStatus: string) => {
      const updatedItems = items.map((item: typeof data[0]) => {
        if (item === selectedItem) return { ...item, status: newStatus };
        return item;
      });
      setItems(updatedItems);
      closeModal();
    };

  const totalServices = 10;

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
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => openModal(item)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4">{item.customerName}</td>
                      <td className="px-6 py-4">{item.service}</td>
                      <td className="px-6 py-4">{item.phoneNumber}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">Previous</button>
              <p className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</p>
              <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl w-full max-w-lg relative shadow-xl">

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800 dark:text-white">Booking Details</h2>

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
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Change Status</label>
        <div className="relative">
          <select
            id="status"
            value={selectedItem.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          >
            <option value="Completed">Completed</option>
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
