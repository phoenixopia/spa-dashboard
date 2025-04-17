'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to get token from cookies
const getTokenFromCookie = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
  }
  return null;
};

export default function UserSettings() {
  const [firstName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password] = useState('********');
  const [editField, setEditField] = useState<'firstName' | 'email' | 'password' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getTokenFromCookie();
        console.log('Token:', token);

        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/user/single`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Important if cookies are used
          }
        );

        const data = response.data.data;
        setName(data.firstName);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setEditField(null);
    setTempValue('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChange = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      console.error('No token found in cookies');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      if (editField === 'password') {
        if (newPassword === confirmPassword && newPassword.length >= 6) {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_APP_URL}/user/edit`,
            { oldPassword, newPassword },
            { headers, withCredentials: true }
          );

          alert(response.status === 200 ? 'Password updated!' : 'Password update failed!');
        } else {
          alert('Password confirmation does not match or is too short');
        }
      } else if (tempValue.trim()) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_APP_URL}/user/edit`,
          { [editField as 'firstName' | 'email']: tempValue },
          { headers, withCredentials: true }
        );

        if (response.status === 200) {
          if (editField === 'firstName') setName(tempValue);
          if (editField === 'email') setEmail(tempValue);
          alert(`${editField} updated!`);
        } else {
          alert(`Failed to update ${editField}`);
        }
      }
    } catch (error) {
      alert(`Error updating ${editField}`);
      console.error(error);
    }

    closeModal();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:ml-[260px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-10">User Settings</h2>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Name */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <div className="text-base font-semibold text-gray-800">Name</div>
            <div className="text-sm text-gray-500 underline">{firstName}</div>
          </div>
          <button
            onClick={() => {
              setEditField('firstName');
              setModalOpen(true);
              setTempValue(firstName);
            }}
            className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            Change
          </button>
        </div>

        {/* Email */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <div className="text-base font-semibold text-gray-800">Email</div>
            <div className="text-sm text-gray-500 underline">{email}</div>
          </div>
          <button
            onClick={() => {
              setEditField('email');
              setModalOpen(true);
              setTempValue(email);
            }}
            className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            Change
          </button>
        </div>

        {/* Password */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <div className="text-base font-semibold text-gray-800">Password</div>
            <div className="text-sm text-gray-500 underline">{password}</div>
          </div>
          <button
            onClick={() => {
              setEditField('password');
              setModalOpen(true);
            }}
            className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            Change
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-6 relative">
            <h3 className="text-xl font-semibold text-gray-800">
              Change {editField ? editField.charAt(0).toUpperCase() + editField.slice(1) : ''}
            </h3>

            {editField === 'password' ? (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full p-3 border rounded-lg"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-3 border rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            ) : (
              <input
                type={editField === 'email' ? 'email' : 'text'}
                className="w-full p-3 border rounded-lg"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleChange}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
