"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function User() {
  const itemsPerPage = 3;
  const initialData = [
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001",password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
    { name: 'Apple MacBook Pro 17"', Phone:'1234567890',email: "High-end laptop", date: "12.23.2001", password:"" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", Phone: "", email: "", date: "", password: "" });
  const [addModal, setAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", Phone: "", email: "", date: "", password: "" });

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEditClick = (index: number) => {
    const item = data[index];
    setEditIndex(index);
    setEditForm({ ...item, Phone: "", password: "", email: item.email || "" });
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = { ...updated[editIndex], ...editForm };
      setData(updated);
    }
    setShowModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setEditForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setNewUser(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddSave = () => {
    setData(prev => [...prev, { ...newUser, date: new Date().toLocaleDateString() }]);
    setAddModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">User Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                    <FontAwesomeIcon icon={faUser}  className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total Users</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add User</span>
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Active User</p>
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
                    <th className="px-6 py-3">User Name</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>

                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>

                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.Phone}</th>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</th>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.date}</th>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
className="text-[#008767] dark:text-[#00b57e] hover:text-[#006d50] dark:hover:text-[#004f3a]"
onClick={() => handleEditClick(index + indexOfFirstItem)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
  onClick={() => {
    setDeleteIndex(index + indexOfFirstItem);
    setShowDeleteModal(true);
  }}
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



     {/* Add User Modal */}
{addModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add User</h2>
        <button
          onClick={() => setAddModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name of the user</label>
          <input
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleAddUserChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            name="name"
            type="text"
            value={newUser.email}
            onChange={handleAddUserChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            name="name"
            type="text"
            value={newUser.Phone}
            onChange={handleAddUserChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input
            name="name"
            type="text"
            value={newUser.password}
            onChange={handleAddUserChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        
        
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          
          <button
            onClick={handleAddSave}
            className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

      )}

  
{/* Delete Modal */}
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm dark:bg-gray-900">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Are you sure you want to delete this User?
      </h2>
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (deleteIndex !== null) {
              const updated = [...data];
              updated.splice(deleteIndex, 1);
              setData(updated);
            }
            setShowDeleteModal(false);
            setDeleteIndex(null);
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


{/* Edit User Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Edit User</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          aria-label="Close Modal"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name of the User</label>
          <input
            name="name"
            type="text"
            value={editForm.name}
            onChange={handleEditChange}
            placeholder="Enter user's full name"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            name="email"
            type="text"
            value={editForm.email}
            onChange={handleEditChange}
            placeholder="Enter email address"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            name="Phone"
            type="text"
            value={editForm.Phone}
            onChange={handleEditChange}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input
            name="password"
            type="password"
            value={editForm.password}
            onChange={handleEditChange}
            placeholder="Enter password"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#008767] text-white hover:bg-[#006d50] w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}



    </div>
  );
}
