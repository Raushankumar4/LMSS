import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signIn");
    setIsOpen(false);
  };

  // Common link classes
  const baseLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition";

  // Active & inactive classes
  const activeLinkClasses = "bg-blue-600 text-white";
  const inactiveLinkClasses =
    "text-gray-700 hover:bg-gray-200 hover:text-gray-900";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClasses} font-semibold tracking-wide ${
                isActive ? activeLinkClasses : inactiveLinkClasses
              }`
            }
          >
            LibraryApp
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {user?.role === "Admin" ? (
                  <NavLink
                    to="/borrow-requests"
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`
                    }
                  >
                    Borrow Requests
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/books"
                      className={({ isActive }) =>
                        `${baseLinkClasses} ${
                          isActive ? activeLinkClasses : inactiveLinkClasses
                        }`
                      }
                    >
                      My Books
                    </NavLink>
                    <NavLink
                      to="/my-borrow-requests"
                      className={({ isActive }) =>
                        `${baseLinkClasses} ${
                          isActive ? activeLinkClasses : inactiveLinkClasses
                        }`
                      }
                    >
                      Borrow Request
                    </NavLink>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signIn"
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signUp"
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 border-t pt-4 space-y-3">
            {isAuthenticated ? (
              <>
                {user?.role === "Admin" ? (
                  <NavLink
                    to="/borrow-requests"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `${baseLinkClasses} block ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`
                    }
                  >
                    Borrow Requests
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/books"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `${baseLinkClasses} block ${
                          isActive ? activeLinkClasses : inactiveLinkClasses
                        }`
                      }
                    >
                      My Books
                    </NavLink>
                    <NavLink
                      to="/my-borrow-requests"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `${baseLinkClasses} block ${
                          isActive ? activeLinkClasses : inactiveLinkClasses
                        }`
                      }
                    >
                      Borrow Request
                    </NavLink>
                  </>
                )}
                <span className="block font-medium">{user?.email}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signIn"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseLinkClasses} block ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signUp"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseLinkClasses} block ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
