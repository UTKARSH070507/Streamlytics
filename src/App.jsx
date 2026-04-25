import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { parseExcelData } from './utils/dataParser';
import { useDataStore } from './hooks/useDataStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const setRawData = useDataStore((state) => state.setRawData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await parseExcelData();
        if (data && data.length > 0) {
          setRawData(data);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, [setRawData]);

  return (
    <Router>
      <div className="min-h-screen bg-netflix-darker text-netflix-light">
        <Navbar />
        {dataLoaded ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-netflix-light text-lg">Loading Streamlytics...</p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}
