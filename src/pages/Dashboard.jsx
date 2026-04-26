import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useDataStore } from '../hooks/useDataStore';
import { getQuarterlyKpiTrends, getQuarterlyRevenueTrajectory } from '../utils/dataParser';
import GenreChart from '../components/charts/GenreChart';
import CountryChart from '../components/charts/CountryChart';
import SubscriptionChart from '../components/charts/SubscriptionChart';
import DeviceChart from '../components/charts/DeviceChart';
import AgeGroupChart from '../components/charts/AgeGroupChart';
import ChurnRiskChart from '../components/charts/ChurnRiskChart';
import RegionChart from '../components/charts/RegionChart';
import WorldMap from '../components/WorldMap';
import FilterPanel from '../components/FilterPanel';
import StatsOverview from '../components/StatsOverview';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import KpiTrendPanel from '../components/charts/KpiTrendPanel';

export default function Dashboard() {
  const {
    filteredData,
    rawData,
    globalRevenueData,
    selectedCountry,
    selectedGenre,
    selectedSubscription,
    selectedDevice,
    selectedRegion,
    selectedChurnRisk,
    selectedAgeGroup,
    applyFilter,
    clearFilters,
    getActiveFilterCount,
  } = useDataStore();

  const activeFilters = getActiveFilterCount();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showRevenueTrend, setShowRevenueTrend] = useState(false);
  const [showKpiTrend, setShowKpiTrend] = useState(false);
  const activeFilterChips = [
    { type: 'country', label: 'Country', value: selectedCountry },
    { type: 'genre', label: 'Genre', value: selectedGenre },
    { type: 'subscription', label: 'Subscription', value: selectedSubscription },
    { type: 'device', label: 'Device', value: selectedDevice },
    { type: 'region', label: 'Region', value: selectedRegion },
    { type: 'churnRisk', label: 'Churn Risk', value: selectedChurnRisk },
    { type: 'ageGroup', label: 'Age Group', value: selectedAgeGroup },
  ].filter((chip) => chip.value);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && activeFilters > 0) {
        clearFilters();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFilters, clearFilters]);

  // Calculate live stats
  const stats = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return null;

    const totalUsers = filteredData.length;
    const avgWatchTime = (filteredData.reduce((sum, u) => sum + u.watchTimeHours, 0) / totalUsers).toFixed(1);
    const avgSatisfaction = (filteredData.reduce((sum, u) => sum + u.satisfactionScore, 0) / totalUsers).toFixed(1);
    const avgEngagement = (filteredData.reduce((sum, u) => sum + u.engagementRate, 0) / totalUsers).toFixed(1);
    const totalRevenue = filteredData.reduce((sum, u) => sum + u.monthlyIncome, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

    return {
      totalUsers,
      avgWatchTime,
      avgSatisfaction,
      avgEngagement,
      totalRevenue,
    };
  }, [filteredData]);

  const quarterlyRevenueData = useMemo(
    () => (globalRevenueData && globalRevenueData.length > 0 ? globalRevenueData : getQuarterlyRevenueTrajectory(filteredData)),
    [globalRevenueData, filteredData]
  );

  return (
    <div className="min-h-screen bg-netflix-darker pt-4 sm:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2">
                Analytics Dashboard
              </h1>
              <button
                type="button"
                onClick={activeFilters > 0 ? clearFilters : undefined}
                disabled={activeFilters === 0}
                className={`text-left transition ${
                  activeFilters > 0
                    ? 'text-netflix-red hover:text-netflix-light cursor-pointer'
                    : 'text-netflix-gray cursor-default'
                }`}
                title={activeFilters > 0 ? 'Click to clear all filters or press Esc' : undefined}
              >
                Exploring {filteredData.length.toLocaleString()} users
                {activeFilters > 0
                  ? ` with ${activeFilters} filter${activeFilters > 1 ? 's' : ''} applied • click here or press Esc to clear all`
                  : ''}
              </button>
            </div>

            {activeFilters > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="flex items-center gap-2 bg-netflix-red/20 hover:bg-netflix-red/30 text-netflix-red px-4 sm:px-6 py-2 rounded-lg font-semibold transition"
              >
                <X className="w-5 h-5" />
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="w-full inline-flex items-center justify-center gap-2 bg-netflix-dark border border-netflix-red/30 text-netflix-light px-4 py-3 rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {activeFilters > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-netflix-gray">Active Filters:</span>
            {activeFilterChips.map((chip) => (
              <button
                key={`${chip.type}-${chip.value}`}
                type="button"
                onClick={() => applyFilter(chip.type, chip.value)}
                className="inline-flex items-center gap-2 rounded-full border border-netflix-red/40 bg-netflix-red/15 px-3 py-1 text-sm text-netflix-light hover:bg-netflix-red/25 transition"
                title={`Remove ${chip.label} filter`}
              >
                <span className="font-semibold text-netflix-red">{chip.label}:</span>
                <span>{chip.value}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 text-sm text-netflix-red hover:text-netflix-light transition"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* Stats Overview */}
        {stats && (
          <StatsOverview
            stats={stats}
            onKpiClick={() => {
              setShowKpiTrend((prev) => !prev);
              setShowRevenueTrend(false);
            }}
            onRevenueClick={() => {
              setShowRevenueTrend((prev) => !prev);
              setShowKpiTrend(false);
            }}
            isKpiPanelOpen={showKpiTrend}
            isRevenuePanelOpen={showRevenueTrend}
          />
        )}

        <AnimatePresence>
          {showKpiTrend && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-netflix-dark border border-netflix-red/30 rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Quarterly KPI Trends</h2>
                  <button
                    type="button"
                    onClick={() => setShowKpiTrend(false)}
                    className="text-netflix-red hover:text-netflix-light transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <KpiTrendPanel data={getQuarterlyKpiTrends(filteredData)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRevenueTrend && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-netflix-dark border border-netflix-red/30 rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Global Revenue</h2>
                  <button
                    type="button"
                    onClick={() => setShowRevenueTrend(false)}
                    className="text-netflix-red hover:text-netflix-light transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <RevenueTrendChart data={quarterlyRevenueData} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 sm:mt-8">
          {/* Left Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}
          >
            <FilterPanel />
          </motion.div>

          {/* Main Content - Charts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* World Map */}
            <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6 overflow-hidden">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Global Distribution</h2>
              <WorldMap />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Genre Preferences</h2>
                <GenreChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Subscription Types</h2>
                <SubscriptionChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Top Countries</h2>
                <CountryChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Device Usage</h2>
                <DeviceChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Age Distribution</h2>
                <AgeGroupChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Churn Risk</h2>
                <ChurnRiskChart />
              </div>

              <div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4 sm:p-6 md:col-span-2">
                <h2 className="text-xl font-bold text-white mb-4">Regional Distribution</h2>
                <RegionChart />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
