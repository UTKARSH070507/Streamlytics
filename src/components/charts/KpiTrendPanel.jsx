import React, { useMemo } from 'react';
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

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const metricMeta = {
  totalUsers: {
    label: 'Total Users',
    color: '#ff1a1a',
    strokeWidth: 3,
    formatter: (value) => value.toLocaleString(),
    yFormatter: (value) => Math.round(value).toLocaleString(),
  },
  avgWatchTime: {
    label: 'Avg Watch Time',
    color: '#3b82f6',
    strokeWidth: 3,
    formatter: (value) => `${value.toFixed(1)} hrs`,
    yFormatter: (value) => `${value.toFixed(0)}h`,
  },
  avgSatisfaction: {
    label: 'Satisfaction',
    color: '#22c55e',
    strokeWidth: 3,
    formatter: (value) => `${value.toFixed(1)}/10`,
    yFormatter: (value) => value.toFixed(1),
  },
  avgEngagement: {
    label: 'Engagement',
    color: '#eab308',
    strokeWidth: 3,
    formatter: (value) => `${value.toFixed(1)}/10`,
    yFormatter: (value) => value.toFixed(1),
  },
};

function getYAxisDomain(values) {
  if (!values.length) return [0, 1];
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const pad = Math.max(1, Math.abs(max * 0.1));
    return [Math.max(0, min - pad), max + pad];
  }

  const pad = (max - min) * 0.12;
  return [Math.max(0, min - pad), max + pad];
}

function MetricSparkline({ data, metricKey }) {
  const meta = metricMeta[metricKey];
  const metricLabel = meta.label;

  const chartData = useMemo(() => {
    const series = data.filter((row) => row[metricKey] !== null && row[metricKey] !== undefined);

    if (metricKey !== 'totalUsers') return series;

    const firstNonZeroIndex = series.findIndex((row) => Number(row.totalUsers) > 0);
    if (firstNonZeroIndex === -1) return [];

    return series.slice(firstNonZeroIndex);
  }, [data, metricKey]);

  const domain = useMemo(
    () => getYAxisDomain(chartData.map((row) => Number(row[metricKey]))),
    [chartData, metricKey]
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload[0]) {
      const value = payload[0].value;
      if (value == null) return null;

      return (
        <div className="bg-netflix-dark border border-netflix-red/50 rounded p-3 text-netflix-light text-sm shadow-xl">
          <p className="font-semibold mb-1">{label}</p>
          <p style={{ color: meta.color }}>{metricLabel}: {meta.formatter(value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={cardVariants}
      className="rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-netflix-gray mb-1">Trend</p>
          <h4 className="text-lg font-bold text-netflix-light">{metricLabel}</h4>
        </div>
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: meta.color }} />
      </div>

      {chartData.length === 0 ? (
        <p className="text-netflix-gray text-sm py-10 text-center">No data available for this metric.</p>
      ) : (
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="1 0" stroke="#ffffff26" vertical />
            <XAxis
              dataKey="period"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval={Math.max(0, Math.floor(chartData.length / 8))}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={meta.yFormatter}
              width={46}
              domain={domain}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey={metricKey}
              stroke={meta.color}
              strokeWidth={meta.strokeWidth}
              dot={{ r: 2.5, fill: meta.color, stroke: meta.color }}
              activeDot={{ r: 5, fill: '#fff', stroke: meta.color }}
              connectNulls
              animationDuration={650}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      )}
    </motion.div>
  );
}

export default function KpiTrendPanel({ data, metricKey }) {
  const meta = metricMeta[metricKey] || metricMeta.totalUsers;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <motion.div
        className="w-full rounded-2xl border border-netflix-light/10 bg-gradient-to-br from-[#101228] via-[#111127] to-[#050712] p-5 sm:p-6 text-netflix-gray"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        Not enough date information to calculate KPI trends.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full rounded-2xl border border-netflix-light/10 bg-gradient-to-br from-[#101228] via-[#111127] to-[#050712] p-4 sm:p-6"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5c451] mb-2">Insights</p>
          <h3 className="text-2xl sm:text-4xl font-bold text-netflix-light">{meta.label} trend</h3>
        </div>
        <p className="text-sm sm:text-xl text-netflix-light/70">Quarterly trajectory</p>
      </div>

      <MetricSparkline data={data} metricKey={metricKey} />
    </motion.div>
  );
}
