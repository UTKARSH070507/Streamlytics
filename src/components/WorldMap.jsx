import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { useDataStore } from '../hooks/useDataStore';
import { getCountryMetrics } from '../utils/dataParser';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Country coordinates mapping
const COUNTRY_COORDS = {
  'United States': [37.0902, -95.7129],
  'United Kingdom': [55.3781, -3.4360],
  'Canada': [56.1304, -106.3468],
  'Australia': [-25.2744, 133.7751],
  'Germany': [51.1657, 10.4515],
  'France': [46.2276, 2.2137],
  'Spain': [40.4637, -3.7492],
  'Italy': [41.8719, 12.5674],
  'Brazil': [-14.2350, -51.9253],
  'Mexico': [23.6345, -102.5528],
  'India': [20.5937, 78.9629],
  'Japan': [36.2048, 138.2529],
  'China': [35.8617, 104.1954],
  'South Korea': [35.9078, 127.7669],
  'Russia': [61.5240, 105.3188],
  'Thailand': [15.8700, 100.9925],
  'Indonesia': [-0.7893, 113.9213],
  'Malaysia': [4.2105, 101.6964],
  'Singapore': [1.3521, 103.8198],
  'Vietnam': [14.0583, 108.2772],
  'Philippines': [12.8797, 121.7740],
  'Colombia': [4.5709, -74.2973],
  'Argentina': [-38.4161, -63.6167],
  'Chile': [-35.6751, -71.5430],
  'Peru': [-9.1900, -75.0152],
  'South Africa': [-30.5595, 22.9375],
  'Nigeria': [9.0820, 8.6753],
  'Kenya': [-0.0236, 37.9062],
  'Egypt': [26.8206, 30.8025],
  'Saudi Arabia': [23.8859, 45.0792],
  'United Arab Emirates': [23.4241, 53.8478],
  'Israel': [31.0461, 34.8516],
  'Turkey': [38.9637, 35.2433],
  'Poland': [51.9194, 19.1451],
  'Netherlands': [52.1326, 5.2913],
  'Belgium': [50.5039, 4.4699],
  'Sweden': [60.1282, 18.6435],
  'Norway': [60.4720, 8.4689],
  'Denmark': [56.2639, 9.5018],
  'Finland': [61.9241, 25.7482],
  'Greece': [39.0742, 21.8243],
  'Portugal': [39.3999, -8.2245],
  'Romania': [45.9432, 24.9668],
  'Hungary': [47.1625, 19.5033],
  'Czech Republic': [49.8175, 15.4730],
  'Ireland': [53.4129, -8.2439],
  'New Zealand': [-40.9006, 174.8860],
};

export default function WorldMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { filteredData, selectedCountry, applyFilter } = useDataStore();
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Get country metrics
    const countryMetrics = getCountryMetrics(filteredData);

    // Find max users for color scaling
    const maxUsers = Math.max(...countryMetrics.map(c => c.users), 1);

    // Add markers
    countryMetrics.forEach(country => {
      const coords = COUNTRY_COORDS[country.country];
      if (coords) {
        const intensity = country.users / maxUsers;
        const isSelected = selectedCountry === country.country;

        // Create color based on intensity
        let color = '#e50914';
        if (isSelected) {
          color = '#ffff00';
        } else if (intensity > 0.7) {
          color = '#e50914';
        } else if (intensity > 0.4) {
          color = '#ff7f50';
        } else {
          color = '#ffa07a';
        }

        const circleMarker = L.circleMarker(coords, {
          radius: Math.max(5, intensity * 20),
          fillColor: color,
          color: color,
          weight: isSelected ? 4 : 2,
          opacity: isSelected ? 1 : 0.8,
          fillOpacity: isSelected ? 0.9 : 0.7,
          className: isSelected ? 'shadow-2xl' : '',
        })
          .bindPopup(`
            <div class="bg-netflix-dark border border-netflix-red/50 rounded p-3 text-netflix-light" style="font-family: Inter, sans-serif;">
              <p class="font-bold">${country.country}</p>
              <p class="text-netflix-red">👥 ${country.users} users</p>
              <p class="text-sm">⏱️ Avg Watch: ${country.avgWatchTime}h</p>
              <p class="text-sm">⭐ Satisfaction: ${country.avgSatisfaction}/10</p>
              <p class="text-sm">💰 Revenue: $${country.revenue}</p>
            </div>
          `, {
            maxWidth: 250,
          })
          .on('click', () => {
            applyFilter('country', country.country);
          })
          .on('mouseover', function () {
            this.openPopup();
          })
          .on('mouseout', function () {
            if (selectedCountry !== country.country) {
              this.closePopup();
            }
          })
          .addTo(map);

        circleMarker.countryName = country.country;

        markersRef.current.push(circleMarker);
      }
    });
  }, [filteredData, selectedCountry, applyFilter]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedCountry && COUNTRY_COORDS[selectedCountry]) {
      const coords = COUNTRY_COORDS[selectedCountry];
      map.flyTo(coords, 4, { duration: 0.9 });

      const selectedMarker = markersRef.current.find(
        (marker) => marker.countryName === selectedCountry
      );
      if (selectedMarker) {
        selectedMarker.openPopup();
      }
      return;
    }

    map.flyTo([20, 0], 2, { duration: 0.9 });
  }, [selectedCountry]);

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        ref={mapRef}
        className="w-full h-72 sm:h-96 rounded-lg overflow-hidden border border-netflix-red/20"
        style={{ background: '#1a1a1a' }}
      />
      <p className="text-center text-xs text-netflix-gray mt-2">
        🌍 Circle size represents user count • Hover for details • Click on circles to filter and zoom • Larger circles = more users
      </p>
    </motion.div>
  );
}
