import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-netflix-darker border-b border-netflix-red/20 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              {!logoError ? (
                <img
                  src="/streamlytics-logo.svg"
                  alt="Streamlytics logo"
                  className="w-8 h-8 object-contain rounded-lg"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <BarChart3 className="w-8 h-8 text-netflix-red group-hover:text-netflix-light transition" />
              )}
              <div className="absolute inset-0 bg-netflix-red/20 rounded-lg blur-lg group-hover:blur-xl transition -z-10"></div>
            </div>
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-netflix-light group-hover:text-netflix-red transition">
              Streamlytics
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition ${
                isActive('/')
                  ? 'text-netflix-red bg-netflix-red/10'
                  : 'text-netflix-gray hover:text-netflix-light'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Home</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition ${
                isActive('/dashboard')
                  ? 'text-netflix-red bg-netflix-red/10'
                  : 'text-netflix-gray hover:text-netflix-light'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
