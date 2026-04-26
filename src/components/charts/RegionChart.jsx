import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDataStore } from '../../hooks/useDataStore';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function RegionChart() {
  const { regionData, selectedRegion, applyFilter } = useDataStore();

  const handleClick = (entry) => {
    applyFilter('region', entry.name);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-netflix-dark border border-netflix-red/50 rounded p-3 text-netflix-light text-sm">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-netflix-red">{payload[0].value} users</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="w-full h-80 cursor-pointer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regionData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#808080' }}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12, fill: '#808080' }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey="value"
            fill="#8b5cf6"
            radius={[0, 8, 8, 0]}
            onClick={(entry) => handleClick(entry)}
            animationDuration={500}
            animationEasing="ease-out"
          >
            {regionData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedRegion === entry.name ? '#ffff00' : '#8b5cf6'}
                style={{
                  filter: selectedRegion === entry.name ? 'drop-shadow(0 0 8px #ffff00)' : 'none',
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-netflix-gray mt-2">Click on a bar to filter</p>
    </motion.div>
  );
}
