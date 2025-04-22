"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

import DeleteUserModal from "./delete";
import AddUserModal from "./add";
import EditUserModal from "./edit";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function User() {
  const itemsPerPage = 4;

  const [data, setData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    updatedAt: "",
    password: "",
  });
  const [userId, setUserId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    message: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  
  const [usercount, setuserCount] = useState(0);

  const handleAddSave = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || "";

      const response = await axios.post(`${BURL}/user/create`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      

      
    } catch (error) {
      console.error("Error adding user:", error);
      
    }
    setShowModal(false);
    fetchData();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || "";

      const response = await axios.put(`${BURL}/user/${userId}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage("✅ User updated successfully.");
      setShowModal(false);
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("❌ Failed to update user.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BURL}/user`);
      if (Array.isArray(res.data.data)) setData(res.data.data);
      else if (Array.isArray(res.data)) setData(res.data);

      else console.error("Unexpected data structure:", res.data);
      const usercount = res.data.pagination.total || 0; // Get the total number of services or default to 0
      setuserCount(usercount); // Update the state with the booking count
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <FontAwesomeIcon icon={faUser} className="text-2xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total Users</h5>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{usercount}</p>
                </div>
              </div>
              {message && (
                <p className="text-sm text-green-600 mt-4">{message}</p>
              )}
            </div>

            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add User</span>
            </button>
          </div>

          <AddUserModal
            isOpen={addModal}
            onSave={handleAddSave}
            newUser={newUser}
            onChange={handleAddUserChange}
            onAdd={() => fetchData()}
            setNewUserMessage={setMessage}
            onClose={() => setAddModal(false)}


          />

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Active Users</p>
                {/* <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-1.5 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                /> */}
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
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.firstName}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.phoneNumber}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          className="text-[#008767] hover:text-[#006d50]"
                          onClick={() => {
                            setEditForm({
                              firstName: item.firstName || "",
                              lastName: item.lastName || "",
                              email: item.email || "",
                              phoneNumber: item.phoneNumber || "",
                              updatedAt: item.updatedAt || "",
                              password: "",
                            });
                            setUserId(item.id);
                            setShowModal(true);
                          }}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteItemId(item.id);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-800"
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

      {/* Modals outside .map() */}
      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        editForm={editForm}
        handleEditChange={handleEditChange}
        userId={userId}
        BURL={BURL || ""}
        onUpdated={() => {
          fetchData();
          setMessage("✅ User updated successfully.");
          setTimeout(() => setMessage(""), 3000);
        }}
      />

      <DeleteUserModal
        isOpen={showDeleteModal}
        userId={deleteItemId}
        onDeleted={() => fetchData()}
        onClose={() => setShowDeleteModal(false)}

      />
    </div>
  );
}
