"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarAlt, faCogs, faLayerGroup, faPlus, faSeedling, faSpa, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import { faSquareRss } from "@fortawesome/free-solid-svg-icons/faSquareRss";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";


export default function Dashboard() {
  const itemsPerPage = 3;
  const data = [
    { 
      customerName: 'John Doe', 
      service: 'Apple MacBook Pro 17"', 
      phoneNumber: '+1 234 567 890', 
      email: 'johndoe@example.com', 
      date: '2025-04-08', 
      status: 'Completed' 
    },
    { 
      customerName: 'Jane Smith', 
      service: 'Microsoft Surface Pro', 
      phoneNumber: '+1 987 654 321', 
      email: 'janesmith@example.com', 
      date: '2025-04-09', 
      status: 'Pending' 
    },
    { 
      customerName: 'Michael Johnson', 
      service: 'Magic Mouse 2', 
      phoneNumber: '+1 555 123 456', 
      email: 'michaeljohnson@example.com', 
      date: '2025-04-10', 
      status: 'Rejected' 
    },
    { 
      customerName: 'Emily Davis', 
      service: 'iPhone 13', 
      phoneNumber: '+1 321 654 987', 
      email: 'emilydavis@example.com', 
      date: '2025-04-11', 
      status: 'Completed' 
    },
    { 
      customerName: 'James Brown', 
      service: 'iPad Pro', 
      phoneNumber: '+1 654 987 123', 
      email: 'jamesbrown@example.com', 
      date: '2025-04-12', 
      status: 'Rejected' 
    },
    { 
      customerName: 'Olivia Wilson', 
      service: 'Apple Watch', 
      phoneNumber: '+1 987 321 654', 
      email: 'oliviawilson@example.com', 
      date: '2025-04-13', 
      status: 'Pending' 
    },
    { 
      customerName: 'Liam Moore', 
      service: 'AirPods Pro', 
      phoneNumber: '+1 123 456 789', 
      email: 'liammoore@example.com', 
      date: '2025-04-14', 
      status: 'Completed' 
    },
    { 
      customerName: 'Sophia Taylor', 
      service: 'Dell XPS 13', 
      phoneNumber: '+1 765 432 109', 
      email: 'sophiataylor@example.com', 
      date: '2025-04-15', 
      status: 'Pending' 
    },
    { 
      customerName: 'Liam Moore', 
      service: 'AirPods Pro', 
      phoneNumber: '+1 123 456 789', 
      email: 'liammoore@example.com', 
      date: '2025-04-14', 
      status: 'Completed' 
    },
    { 
      customerName: 'Sophia Taylor', 
      service: 'Dell XPS 13', 
      phoneNumber: '+1 765 432 109', 
      email: 'sophiataylor@example.com', 
      date: '2025-04-15', 
      status: 'Pending' 
    }
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const totalServices = 10; // Replace 10 with the actual number of services

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/Image/banner-bg.jpg")' }}>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex justify-between items-center">
  <span>Hello Admin <span className="inline-block mr-2">👋,</span></span>
  <button>
  <FontAwesomeIcon icon={faBell} className="text-2xl" />
  </button>
</h2>





<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 mb-8">
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {/* Total Services */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
      <FontAwesomeIcon icon={faSpa} className="text-2xl"/>
            </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Total Services</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{totalServices}</p>
      </div>
    </div>

    {/* Total Users */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
        <FontAwesomeIcon icon={faUsers} className="text-2xl" />
      </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Total Users</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">10</p>
      </div>
    </div>

    {/* Total Books */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r-0">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
      <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl" />      </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Total Books</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">100</p>
      </div>
    </div>

  </div>
</div>







<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 mb-8">
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {/* Total Services */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
      <FontAwesomeIcon icon={faSquareRss} className="text-2xl" />            </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Total Blogs</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{totalServices}</p>
      </div>
    </div>

    {/* Total Users */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
        <FontAwesomeIcon icon={faUsers} className="text-2xl" />
      </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Total Testimonials</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">10</p>
      </div>
    </div>

    {/* Total Books */}
    <div className="flex items-center space-x-4 dark:bg-green-100/10 p-4 rounded-md border-r-gray-100 lg:border-r-0">
      <div className="bg-green-100 text-green-600 p-3 rounded-full">
      <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl" />      </div>
      <div>
        <h5 className="text-lg font-semibold text-gray-300 dark:text-white mb-1">Today Books</h5>
        <p className="text-xl font-bold text-gray-900 dark:text-white">100</p>
      </div>
    </div>

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
              
              
              
              
              
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3">Customer Name</th>
      <th scope="col" className="px-6 py-3">Service</th>
      <th scope="col" className="px-6 py-3">Phone Number</th>
      <th scope="col" className="px-6 py-3">Email</th>
      <th scope="col" className="px-6 py-3">Date</th>
      <th scope="col" className="px-6 py-3 text-right">Status</th>
    </tr>
  </thead>
  <tbody>
  {currentItems.map((item, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {item.customerName}
      </td>
      <td className="px-6 py-4">{item.service}</td>
      <td className="px-6 py-4">{item.phoneNumber}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.date}</td>
      <td>
        <button
          className={`
            px-4 py-2 my-3 text-white font-semibold rounded-3xl
            ${item.status === 'Completed' ? 'bg-green-400 hover:bg-green-600' : ''}
            ${item.status === 'Pending' ? 'bg-yellow-400 hover:bg-yellow-500' : ''}
            ${item.status === 'Rejected' ? 'bg-red-400 hover:bg-red-600' : ''}
          `}
        >
          {item.status}
        </button>
      </td>
    </tr>
  ))}
</tbody>

</table>








            </div>




            {/* Footer: Pagination + Showing */}
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
                <span className="px-3">{currentPage} / {totalPages}</span>
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
