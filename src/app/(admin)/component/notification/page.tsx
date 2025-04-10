"use client";

import { useState } from "react";
import Sidebar from "../sidebar/page";
import { Bell, Trash2, Menu } from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Booking Confirmed",
      message: "Your client Sarah booked a Swedish Massage at 3:00 PM.",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      title: "Previous Booking",
      message: "Emma completed her Facial Treatment at 5:00 PM.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="relative bg-gradient-to-br to-white dark:from-gray-900 dark:to-gray-950 min-h-screen">
      {/* Hamburger menu */}
      <div className="md:hidden p-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <Menu size={28} className="text-gray-800 dark:text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-10 md:ml-[260px]">
        <div className="max-w-4xl w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">Notifications</h2>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">No notifications available.</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className={`flex items-start justify-between p-4 rounded-xl border ${
                    note.read ? "bg-gray-50 dark:bg-gray-800" : "bg-purple-50 dark:bg-purple-900"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-white p-2 rounded-full">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{note.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{note.message}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{note.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete notification"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
