"use client";

import Sidebar from "../sidebar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus, faServer, faSpa } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import DeletecategoryModal from './delete'; // Adjust path if needed

import { Console } from "console";
import AddcategoryModal from './add'; // import the modal component
import EditcategoryModal from "./edit"; // import the modal component


const BURL = process.env.NEXT_PUBLIC_APP_URL;



export default function Category() {
  const itemsPerPage = 3;
  
  const [categoryMap, setCategoryMap] = useState<{ [key: string]: string }>({});

  
  const [data, setData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", imageURL: "", description: "" });
  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // console.log("data:", data);
  // console.log("type of data:", typeof data);
  // console.log("isArray:", Array.isArray(data));
  const currentItems = [];
  for (let i = indexOfFirstItem; i < indexOfLastItem && data && i < data.length; i++) {
    currentItems.push(data[i]);
  }
  

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleEditClick = (index: number) => {
    const item = data ? data[index] : null;
    setEditIndex(index);
    if (typeof item === "object" && item !== null) {
      if (typeof item === "object" && item !== null) {
        setEditForm({
          ...item, name: "", imageURL:"", description: ""
        });
      }
    }
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

 

  const [addModal, setAddModal] = useState(false);
const [newcategory, setNewcategory] = useState({
  name: "",
  description:"",
  imageURL: "",
  
});

const handleAddcategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
  const { name, value } = e.target;
  setNewcategory(prev => ({ ...prev, [name]: value }));
};

const handleAddSave = async () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || ''; // Extract token from cookies
    const response = await axios.post(
      `${BURL}/category/create`,
      newcategory,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log('category added:', response?.data?.category);
    setAddModal(false);
    fetchData(); // refresh list
  } catch (error) {
    console.error('Error adding category:', error);
  }
};




  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ Keep this
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); // ✅ Keep this
  const [categoryId, setcategoryId] = useState("");

  


const fetchData = async () => {
  try {
    const res = await axios.get(`${BURL}/category`);
    console.log("API category response:", res.data);

    // Confirm the actual response structure and access correctly:
    if (Array.isArray(res.data.data)) {
      setData(res.data.data); // this is correct if the API returns { data: [...] }
    } else if (Array.isArray(res.data)) {
      setData(res.data); // if API returns an array directly
    } else {
      console.error("Unexpected data structure:", res.data);
    }
  } catch (error) {
    console.error("Error fetching categorys:", error);
  }
};

useEffect(() => {
  fetchData();
}, []);



useEffect(() => {
  if (editIndex !== null && data && data[editIndex]) {
    const item = data[editIndex];
    setEditForm({
      name: item.name || "",
      imageURL: item.imageURL || "",
      description: item.description || "",
      
    });
  }
}, [editIndex, data]);


useEffect(() => {
  axios.get(`${BURL}/category`)
      .then((res) => {
        const map: { [key: string]: string } = {};
        res.data.data.forEach((cat: { id: string | number; name: string }) => {
          map[cat.id] = cat.name;
        });
        setCategoryMap(map);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);



  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>



      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-20 md:ml-[260px]">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Category Management</h2>

            <>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-white p-6 border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                         <FontAwesomeIcon icon={faSpa} className="text-2xl" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-400 dark:text-white mb-1">Total categorys</h5>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
              </div>
              </div>
            </div>

            <button
              onClick={() => setAddModal(true)}
              className="w-full sm:w-auto bg-[#008767] text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#006d50] transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Category</span>
            </button>
            </div>
            <AddcategoryModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAddSave}
        newcategory={newcategory}
        onChange={handleAddcategoryChange}
      />


      </>


          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">category List</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-green-700 font-medium whitespace-nowrap">Active category</p>
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
      <th className="px-6 py-3">category Name</th>
      <th className="px-6 py-3">Picture</th>
      <th className="px-6 py-3">Description</th>
      <th className="px-6 py-3 text-right">Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map((item, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {item.name}
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {item.imageURL && item.imageURL.length > 0 ? (
        <Image 
            src={item.imageURL} 
            alt="Item" 
            height={400}
            width={400}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : null}
</td>

        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {item.description}
        </td>
        
        <td className="px-6 py-4 text-right space-x-2">
        <button
  className="text-[#008767] dark:text-[#00b57e] hover:text-[#006d50] dark:hover:text-[#004f3a]"
  onClick={() => {
    setEditForm({
      name: item.name || "",
      description: item.description || "",
      imageURL: item.imageURL || "",
      
    });
    setcategoryId(item.id); // Or whatever your category ID key is
    setShowModal(true);
  }}
>
  <Pencil size={18} />
</button>


      <EditcategoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        editForm={editForm}
        handleEditChange={handleEditChange}
        categoryId={item.id}
        BURL={BURL || ""}
      />
          
        </td>
      </tr>
    ))}
  </tbody>
</table>
 <DeletecategoryModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        categoryId={deleteItemId}
        onDeleted={fetchData}
      />

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






    </div>
  );
}


