"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPlus, faSquareRss } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Image from 'next/image';
import { Pencil, Trash2 } from "lucide-react";
import Link from 'next/link';

export default function Blog() {
  const itemsPerPage = 3;
  const data = [
    { name: 'Apple MacBook Pro 17"', description: 'High-end laptop', date: '2023-10-01' },
    { name: 'Microsoft Surface Pro', description: '2-in-1 device', date: '2023-10-02' },    
    { name: 'Microsoft Surface Pro', description: '2-in-1 device' , date: '2023-10-02'},
    { name: 'Magic Mouse 2', description: 'Wireless mouse', date: '2023-10-02' },
    { name: 'iPhone 13', description: 'Smartphone' , date: '2023-10-02'},
    { name: 'iPad Pro', description: 'Tablet' , date: '2023-10-02'},
    { name: 'Apple Watch', description: 'Smartwatch', date: '2023-10-02' },
    { name: 'AirPods Pro', description: 'Wireless earbuds', date: '2023-10-02' },
    { name: 'Dell XPS 13', description: 'Ultrabook' , date: '2023-10-02'},
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Blog Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-row gap-4 mb-4 sm:mb-0">
                <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faSquareRss}  className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total Blogs</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faSquareRss}  className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-thin text-green-400 dark:text-white mb-1">Active Blogs</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </div>
            </div>

            <button className="w-full sm:w-auto bg-[#5932EA] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Blog</span>
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Blog List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Active Blog</p>
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
                    <th scope="col" className="px-6 py-3">Blog Title</th>
                    <th scope="col" className="px-6 py-3">Picture</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Created At</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.name}
                      </th>
                      <td className="px-6 py-4">
                        <Image
                          src="/Images/hi.jpeg"
                          alt={item.name}
                          width={12}
                          height={12}
                          className="w-12 h-12 rounded object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4 text-right space-x-2">
  <button className="text-blue-600 dark:text-blue-500 hover:text-blue-800">
    <Pencil size={18} />
  </button>
  <button
    onClick={() => alert(`Deleting ${item.name}`)}
    className="text-red-600 dark:text-red-500 hover:text-red-800"
  >
    <Trash2 size={18} />
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
