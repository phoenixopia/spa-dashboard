"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function Blog() {
  const itemsPerPage = 3;
  const initialData = [
    { name: 'Apple MacBook Pro 17"', description: "High-end laptop", image: "/Images/hi.jpeg" },
    { name: "Microsoft Surface Pro", description: "2-in-1 device", image: "/Images/hi.jpeg" },
    { name: "Magic Mouse 2", description: "Wireless mouse", image: "/Images/hi.jpeg" },
    { name: "iPhone 13", description: "Smartphone", image: "/Images/hi.jpeg" },
    { name: "iPad Pro", description: "Tablet", image: "/Images/hi.jpeg" },
    { name: "Apple Watch", description: "Smartwatch", image: "/Images/hi.jpeg" },
    { name: "AirPods Pro", description: "Wireless earbuds", image: "/Images/hi.jpeg" },
    { name: "Dell XPS 13", description: "Ultrabook", image: "/Images/hi.jpeg" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", image: "" });
  const [addModal, setAddModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ name: "", description: "", image: "" });

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setEditForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleAddImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setNewBlog(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddSave = () => {
    setData(prev => [...prev, newBlog]);
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Blog Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <FontAwesomeIcon icon={faLayerGroup} className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total Blogs</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
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
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Blog Title</th>
                    <th className="px-6 py-3">Picture</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                      <td className="px-6 py-4">
                        <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 rounded object-cover" />
                      </td>
                      <td className="px-6 py-4">{item.description}</td>
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

     {/* Add Blog Modal */}
{addModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Add Blog</h2>
        <button
          onClick={() => setAddModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Blog Name</label>
          <input
            name="name"
            type="text"
            value={newBlog.name}
            onChange={handleAddBlogChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={newBlog.description}
            onChange={handleAddBlogChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Upload Image</label>
          <input
  name="image"
  type="file"
  accept="image/*"
  onChange={handleAddImageUpload}
  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
             file:bg-[#008767] file:text-white file:font-semibold 
             hover:file:bg-[#006d50]
             border border-gray-300 dark:border-gray-600 px-3 py-2 
             rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
        Are you sure you want to delete this Blog?
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



     {/* Edit Blog Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Edit Blog</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-[#008767] hover:text-[#006d50] text-3xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Blog Name</label>
          <input
            name="name"
            type="text"
            value={editForm.name}
            onChange={handleEditChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Upload Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                       file:bg-[#008767] file:text-white file:font-semibold 
                       hover:file:bg-[#006d50] border border-gray-300 dark:border-gray-600 
                       px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
