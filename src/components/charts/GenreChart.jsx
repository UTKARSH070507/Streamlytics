import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useDataStore } from '../../hooks/useDataStore';

const COLORS = ['#e50914', '#f20916', '#ff5736', '#ff7f50', '#ffa07a', '#ffb6a3', '#ffd4c4', '#ffecdb'];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function GenreChart() {
  const { genreData, selectedGenre, applyFilter } = useDataStore();

  const handleClick = (entry) => {
    applyFilter('genre', entry.name);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const percentage = ((payload[0].value / genreData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
      return (
        <div className="bg-netflix-dark border border-netflix-red/50 rounded p-3 text-netflix-light text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-netflix-red">
            {payload[0].value} users ({percentage}%)
          </p>
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
        <PieChart>
          <Pie
            data={genreData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onClick={(entry) => handleClick(entry)}
            animationDuration={500}
            animationEasing="ease-out"
          >
            {genreData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedGenre === entry.name ? '#ffff00' : COLORS[index % COLORS.length]}
                style={{
                  filter: selectedGenre === entry.name ? 'drop-shadow(0 0 10px #ffff00)' : 'none',
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend
            wrapperStyle={{
              color: '#f5f5f1',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-netflix-gray mt-2">Click on a genre to filter</p>
    </motion.div>
  );
}
