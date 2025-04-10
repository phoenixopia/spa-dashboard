'use client';

import { useState } from 'react';

export default function UserSettings() {
  const [name, setName] = useState('Sosna Worku');
  const [email, setEmail] = useState('sosna@example.com');
  const [password] = useState('********');

  const [editField, setEditField] = useState<'name' | 'email' | 'password' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const closeModal = () => {
    setModalOpen(false);
    setEditField(null);
    setTempValue('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChange = () => {
    if (editField === 'name' && tempValue.trim()) {
      setName(tempValue);
    } else if (editField === 'email' && tempValue.trim()) {
      setEmail(tempValue);
    } else if (editField === 'password') {
      if (newPassword === confirmPassword && newPassword.length >= 6) {
        alert('Password updated!');
      } else {
        alert('Password confirmation does not match or too short');
        return;
      }
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
    <div className="text-sm text-gray-500 underline">{name}</div>
  </div>
  <button
    onClick={() => {
      setEditField('name');
      setModalOpen(true);
      setTempValue(name);
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
