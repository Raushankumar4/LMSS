import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/logIn")
    setIsOpen(false); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm text-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold tracking-wide">
            LibraryApp
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="font-medium">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signIn"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register
                </Link>
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
                <span className="block font-medium">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signIn"
                  onClick={() => setIsOpen(false)}
                  className="block text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  onClick={() => setIsOpen(false)}
                  className="block text-blue-600 hover:underline font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
