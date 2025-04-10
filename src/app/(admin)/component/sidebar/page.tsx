"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { faCalendarCheck, faGear, faRightFromBracket, faSpa, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 760 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  // Set initial active nav based on pathname and open relevant dropdowns
  useEffect(() => {
    if (pathname) {
      if (pathname.includes("/dashboard")) {
        setActiveNav("dashboard");
      } else if (pathname.includes("/services/category")) {
        setActiveNav("services-category");
        setIsServicesOpen(true);
      } else if (pathname.includes("/services/services")) {
        setActiveNav("services-services");
        setIsServicesOpen(true);
      } else if (pathname.includes("/services")) {
        setActiveNav("services");
        setIsServicesOpen(true);
      } else if (pathname.includes("/landing/blog")) {
        setActiveNav("landing-blog");
        setIsLandingOpen(true);
      } else if (pathname.includes("/landing/testimonials")) {
        setActiveNav("landing-testimonials");
        setIsLandingOpen(true);
      } else if (pathname.includes("/landing")) {
        setActiveNav("landing");
        setIsLandingOpen(true);
      } else if (pathname.includes("/booking")) {
        setActiveNav("booking");
      } else if (pathname.includes("/user")) {
        setActiveNav("user");
      }
      else if (pathname.includes("/setting")) {
        setActiveNav("setting");
      } else if (pathname.includes("/logout")) {
        setActiveNav("logout");
      }
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (windowWidth < 760) {
      setIsSidebarOpen(false);
    }
  };

  // Helper function to check if a parent nav is active
  const isParentActive = (parent: string) => {
    return activeNav.startsWith(parent);
  };

  if (!isMounted) return null;

  return (
    <div>
      {/* Toggle button - only shown when screen is < 1350px */}
      {windowWidth < 760 && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar - shown when screen is >= 1350px or when manually opened */}
      {(windowWidth >= 760 || isSidebarOpen) && (
        <aside
          ref={sidebarRef}
          id="sidebar-multi-level-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${
            isSidebarOpen || windowWidth >= 760 ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="mb-4 p-4">
            <Image src="/Images/logo.png" alt="Logo" width={100} height={100} />
          </div>

          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("dashboard");
                    window.location.href = "/dashboard";
                  }}
                  className={`flex items-center p-2 rounded-lg group ${
                    activeNav === "dashboard"
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <svg 
                    className={`w-5 h-5 ${
                      activeNav === "dashboard" ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-white"
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>

              {/* Services dropdown */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    if (!isServicesOpen) handleNavClick("services");
                  }}
                  className={`flex items-center w-full p-2 text-base transition duration-75 rounded-lg group ${
                    isParentActive("services")
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                 <FontAwesomeIcon icon={faSpa} />
                  <span className="flex-1 ms-3 text-left">Services</span>
                  {isServicesOpen ? (
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </button>

                {isServicesOpen && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a 
                        href="/services/category"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("services-category");
                          window.location.href = "/services/category";
                        }}
                        className={`flex items-center w-full p-2 pl-11 rounded-lg ${
                          activeNav === "services-category"
                            ? "bg-[#5932EA] text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        }`}
                      >
                        Category
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/services/services"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("services-services");
                          window.location.href = "/services/services";
                        }}
                        className={`flex items-center w-full p-2 pl-11 rounded-lg ${
                          activeNav === "services-services"
                            ? "bg-[#5932EA] text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        }`}
                      >
                        Services
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Landing Page Dropdown */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsLandingOpen(!isLandingOpen);
                    if (!isLandingOpen) handleNavClick("landing");
                  }}
                  className={`flex items-center w-full p-2 text-base transition duration-75 rounded-lg group ${
                    isParentActive("landing")
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="flex-1 ms-3 text-left">Landing page</span>
                  {isLandingOpen ? (
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </button>

                {isLandingOpen && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a 
                        href="/landing/blog"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("landing-blog");
                          window.location.href = "/landing/blog";
                        }}
                        className={`flex items-center w-full p-2 pl-11 rounded-lg ${
                          activeNav === "landing-blog"
                            ? "bg-[#5932EA] text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        }`}
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/landing/testimonials"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("landing-testimonials");
                          window.location.href = "/landing/testimonials";
                        }}
                        className={`flex items-center w-full p-2 pl-11 rounded-lg ${
                          activeNav === "landing-testimonials"
                            ? "bg-[#5932EA] text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        }`}
                      >
                        Testimonials
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              
              {/* Booking */}
              <li>
                <a 
                  href="/booking"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("booking");
                    window.location.href = "/booking";
                  }}
                  className={`flex items-center p-2 rounded-lg group ${
                    activeNav === "booking"
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} /> 
                  <span className="ms-3">Booking</span>
                </a>
              </li>
              <li>
                <a 
                  href="/user"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("user");
                    window.location.href = "/user";
                  }}
                  className={`flex items-center p-2 rounded-lg group ${
                    activeNav === "user"
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="flex-1 ms-3 whitespace-nowrap">User</span>
                </a>
              </li>

              <li>
                <a 
                  href="/setting"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("setting");
                    window.location.href = "/setting";
                  }}
                  className={`flex items-center p-2 rounded-lg group ${
                    activeNav === "setting"
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faGear} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
                </a>
              </li>




              <li>
                <a 
                  href="/logout"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("logout");
                    window.location.href = "/logout";
                  }}
                  className={`flex items-center p-2 rounded-lg group ${
                    activeNav === "logout"
                      ? "bg-[#5932EA] text-white"
                      : "text-gray-900 hover:bg-[#5932EA] hover:text-white dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ transform: 'scaleX(-1)' }} />

                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </a>
              </li>


              
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;