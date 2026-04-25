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
          <p className="font-semibold">{label}</p>
          <p className="text-netflix-red">Global Revenue: {Number(payload[0].value).toLocaleString('en-US', {
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
        Not enough date information to calculate quarterly trajectory.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="rounded-2xl border border-netflix-light/10 bg-gradient-to-br from-[#101228] via-[#111127] to-[#050712] p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5c451] mb-2">Trend</p>
            <h3 className="text-2xl sm:text-4xl font-bold text-netflix-light">Global revenue</h3>
          </div>
          <p className="text-sm sm:text-xl text-netflix-light/70">Quarterly trajectory</p>
        </div>

        <div className="w-full h-72 sm:h-[460px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="1 0" stroke="#ffffff40" vertical />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: '#d1d5db' }}
                tickLine={false}
                axisLine={false}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={56}
              />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={(value) => {
              if (value >= 1000000000) return `$${(value / 1000000000).toFixed(0)}B`;
              if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
              return `$${Math.round(value / 1000)}k`;
            }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ff0e0e"
            strokeWidth={3}
            dot={{ r: 3.5, fill: '#ffd166', stroke: '#ffd166' }}
            activeDot={{ r: 5.5, fill: '#ffe88f', stroke: '#ffe88f' }}
            animationDuration={700}
            animationEasing="ease-out"
          />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
