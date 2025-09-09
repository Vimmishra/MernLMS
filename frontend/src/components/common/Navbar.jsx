import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null; // no navbar if not logged in

  // helper to check active link
  const getLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition font-medium ${
      location.pathname === path ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        {user.role === "user" ? (
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            📚 GNDD Library
          </Link>
        ) : (
          <Link to="/admin" className="text-2xl font-bold text-blue-600">
            📚 GNDD Library
          </Link>
        )}

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Links (desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          {user.role === "user" && (
            <>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/news" className={getLinkClass("/news")}>
                News
              </Link>

               <Link to="/Books" className={getLinkClass("/Books")}>
                Books
              </Link>
             
              <Link to="/my-borrows" className={getLinkClass("/my-borrows")}>
                Borrowed Books
              </Link>
            </>
          )}

          {user.role === "admin" && (
            <>
             
            </>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-gray-50 shadow">
          {user.role === "user" && (
            <>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/news" className={getLinkClass("/news")}>
                News
              </Link>
              <Link to="/books" className={getLinkClass("/books")}>
                Books
              </Link>
              <Link to="/my-borrows" className={getLinkClass("/my-borrows")}>
                Borrowed Books
              </Link>
            </>
          )}

          {user.role === "admin" && (
            <>
             
            </>
          )}

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
