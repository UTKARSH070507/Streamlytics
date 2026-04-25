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

export default function AgeGroupChart() {
  const { ageGroupData, selectedAgeGroup, applyFilter } = useDataStore();

  const handleClick = (entry) => {
    applyFilter('ageGroup', entry.name);
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
        <BarChart data={ageGroupData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#808080' }}
          />
          <YAxis tick={{ fontSize: 12, fill: '#808080' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="#f59e0b"
            radius={[8, 8, 0, 0]}
            onClick={(entry) => handleClick(entry)}
            animationDuration={500}
            animationEasing="ease-out"
          >
            {ageGroupData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedAgeGroup === entry.name ? '#ffff00' : '#f59e0b'}
                style={{
                  filter: selectedAgeGroup === entry.name ? 'drop-shadow(0 0 8px #ffff00)' : 'none',
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
