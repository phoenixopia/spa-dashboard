"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus, faSquareRss } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function Booking() {
  const itemsPerPage = 3;
  const initialData = [
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Pending" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Completed" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Rejected" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Completed" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Completed" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Completed" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Completed" },
    { name: 'Apple MacBook Pro 17"', service: "High-end laptop", number: "1234567890", email:"asdfghjkl", date:"1.2.2001", status:"Pending" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", service: "", number: "", email: "", date: "", status: "" });
  const [addModal, setAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({ name: "", service: "", number: "", email: "", date: "" , status: ""});

  const totalItems = data.length;
  const [items, setItems] = useState(data);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof data[0] | null>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEditClick = (index: number) => {
    const item = data[index];
    setEditIndex(index);
    setEditForm(item);
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = editForm;
      setData(updated);
    }
    setShowModal(false);
  };

  const openModal = (item:any)=> {
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


  
  const handleAddBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const handleAddImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setNewBooking(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddSave = () => {
    setData(prev => [...prev, { ...newBooking, service: "Default Service", number: "0000000000", email: "default@example.com", date: new Date().toLocaleDateString(), status: "" }]);
    setAddModal(false);
  };
  console.log(selectedItem,'fsf')
 
// Removed redundant openModal declaration

  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        
      <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Booking Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-row gap-3 mb-4 sm:mb-0">
                <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faSquareRss}  className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total Bookings</h5>
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
                  <h5 className="font-thin text-green-400 dark:text-white mb-1">Today's Bookings</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </div>
            </div>
            
            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Booking</span>
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Booking List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Active Booking</p>
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
      <th className="px-6 py-3">Customer Name</th>
      <th className="px-6 py-3">Service</th>
      <th className="px-6 py-3">Phone Number</th>
      <th className="px-6 py-3 text-left">Email</th>
      <th className="px-6 py-3 text-left">Date</th>
      <th className="px-6 py-3 text-center">Status</th> 
    </tr>
  </thead>
  <tbody>
                  {currentItems.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => openModal(item)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
        <td className="px-6 py-4">{item.service}</td>
        <td className="px-6 py-4">{item.number}</td>
        <td className="px-6 py-4 text-left">{item.email}</td> 
        <td className="px-6 py-4 text-left">{item.date}</td>
        <td className="px-6 py-4 text-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
            item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
            item.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
            'bg-gray-100 text-gray-800' 
          }`}>
            {item.status}
          </span>
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





{/* Add Booking Modal */}
{addModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add Booking</h2>
        <button
          onClick={() => setAddModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
          aria-label="Close Modal"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Booking Name</label>
          <input
            name="name"
            type="text"
            value={newBooking.name}
            onChange={handleAddBookingChange}
            placeholder="Enter booking name"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Service</label>
          <input
            name="service"
            type="text"
            value={newBooking.service}
            onChange={handleAddBookingChange}
            placeholder="Enter service details"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            name="number"
            type="text"
            value={newBooking.number}
            onChange={handleAddBookingChange}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            name="email"
            type="text"
            value={newBooking.email}
            onChange={handleAddBookingChange}
            placeholder="Enter email address"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
          <input
            name="date"
            type="date"
            value={newBooking.date}
            onChange={handleAddBookingChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767]"
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

  






{showModal &&  (<div>


  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      
      {/* Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Booking Details</h2>
        <button
          onClick={()=>setShowModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Customer Info */}
      <p className="mb-5 text-sm text-center text-gray-600 dark:text-gray-300">
        Update status for <strong>{selectedItem?.name? selectedItem?.name :"-"}</strong>
      </p>

      {/* Date & Time Fields */}
      <div className="flex flex-col sm:flex-r+ow gap-4 mb-6">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
          <strong>Date:</strong> {selectedItem?.date}
        </div>
        {/* <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-white shadow-sm">
          <strong>Time:</strong> {selectedItem.time}
        </div> */}
      </div>

      {/* Status Dropdown Field */}
      <div className="mb-4 items-center">
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-[#008767] dark:text-gray-300">Change Status</label>
        <div className="relative">
          <select
            id="status"
            value={selectedItem?.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008767] pr-10"
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  </div>

</div>)}



    </div>
  );
}
