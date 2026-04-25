import React from 'react';
import { motion } from 'framer-motion';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export default function RevenueTrendChart({ data }) {
  const hasData = Array.isArray(data) && data.length > 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-netflix-dark border border-netflix-red/50 rounded p-3 text-netflix-light text-sm">
          <p className="font-semibold">Year: {label}</p>
          <p className="text-netflix-red">
            Revenue: {Number(payload[0].value).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!hasData) {
    return (
      <motion.div
        className="w-full h-72 flex items-center justify-center text-netflix-gray"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        Not enough date information to calculate yearly revenue.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-72"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#e50914"
            strokeWidth={3}
            dot={{ r: 4, fill: '#e50914' }}
            activeDot={{ r: 6, fill: '#ffff00' }}
            animationDuration={700}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
