import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useDataStore } from '../../hooks/useDataStore';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16'];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function ChurnRiskChart() {
  const { churnRiskData, selectedChurnRisk, applyFilter } = useDataStore();

  const handleClick = (entry) => {
    applyFilter('churnRisk', entry.name);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const percentage = ((payload[0].value / churnRiskData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
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
            data={churnRiskData}
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
            {churnRiskData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedChurnRisk === entry.name ? '#ffff00' : COLORS[index % COLORS.length]}
                style={{
                  filter: selectedChurnRisk === entry.name ? 'drop-shadow(0 0 10px #ffff00)' : 'none',
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              color: '#f5f5f1',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-netflix-gray mt-2">Click on a segment to filter</p>
    </motion.div>
  );
}
