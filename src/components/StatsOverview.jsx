import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Smile, Zap, DollarSign } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function StatsOverview({
  stats,
  onKpiClick,
  onRevenueClick,
  isKpiPanelOpen,
  isRevenuePanelOpen,
}) {
  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-netflix-red to-red-600',
      clickable: true,
      helperText: 'Click to view KPI trends',
    },
    {
      label: 'Avg Watch Time',
      value: stats.avgWatchTime + ' hrs',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-700',
    },
    {
      label: 'Satisfaction',
      value: stats.avgSatisfaction + '/10',
      icon: Smile,
      color: 'from-green-500 to-green-700',
    },
    {
      label: 'Engagement',
      value: stats.avgEngagement + '/10',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      label: 'Revenue',
      value: stats.totalRevenue,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-700',
      clickable: true,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.button
            key={index}
            variants={itemVariants}
            type="button"
            onClick={
              card.label === 'Total Users'
                ? onKpiClick
                : card.label === 'Revenue'
                  ? onRevenueClick
                  : undefined
            }
            className={`group w-full text-left bg-gradient-to-br ${card.color} rounded-lg p-6 text-white transform transition hover:scale-105 hover:shadow-2xl ${card.clickable ? 'cursor-pointer' : 'cursor-default'}`}
            aria-label={
              card.label === 'Total Users'
                ? 'Toggle KPI trends chart'
                : card.label === 'Revenue'
                  ? 'Toggle revenue chart'
                  : undefined
            }
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-90 mb-1">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                {card.label === 'Total Users' && (
                  <p className="text-xs opacity-85 mt-2">
                    {isKpiPanelOpen ? 'Click to hide KPI trends' : card.helperText}
                  </p>
                )}
                {card.clickable && card.label === 'Revenue' && (
                  <p className="text-xs opacity-85 mt-2">
                    {isRevenuePanelOpen ? 'Click to hide revenue trend' : 'Click to view revenue trend'}
                  </p>
                )}
              </div>
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
