import React from 'react';
import { motion } from 'framer-motion';
import { useDataStore } from '../hooks/useDataStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function FilterPanel() {
  const {
    genreData,
    countryData,
    subscriptionData,
    deviceData,
    ageGroupData,
    churnRiskData,
    regionData,
    selectedCountry,
    selectedGenre,
    selectedSubscription,
    selectedDevice,
    selectedRegion,
    selectedChurnRisk,
    selectedAgeGroup,
    applyFilter,
  } = useDataStore();

  const isSelected = (filterType, value) => {
    const selections = {
      country: selectedCountry,
      genre: selectedGenre,
      subscription: selectedSubscription,
      device: selectedDevice,
      region: selectedRegion,
      churnRisk: selectedChurnRisk,
      ageGroup: selectedAgeGroup,
    };
    return selections[filterType] === value;
  };

  const FilterSection = ({ title, items, filterType, limit = null }) => {
    const displayItems = limit ? items.slice(0, limit) : items;

    return (
      <motion.div className="bg-netflix-dark border border-netflix-red/20 rounded-lg p-4">
        <h3 className="text-sm font-bold text-netflix-red mb-3 uppercase tracking-wider">
          {title}
        </h3>
        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayItems.map((item) => {
            const value = item.name || item;
            const selected = isSelected(filterType, value);

            return (
              <motion.button
                key={value}
                variants={itemVariants}
                onClick={() => applyFilter(filterType, value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition text-sm font-medium overflow-hidden ${
                  selected
                    ? 'bg-netflix-red text-white shadow-lg shadow-netflix-red/50'
                    : 'bg-white/5 text-netflix-gray hover:bg-white/10 hover:text-netflix-light'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-2">{value}</span>
                  {item.value && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      selected ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {item.value}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Filters</h2>

      {/* Genres */}
      <FilterSection
        title="Genres"
        items={genreData}
        filterType="genre"
        limit={7}
      />

      {/* Subscription */}
      <FilterSection
        title="Subscription"
        items={subscriptionData}
        filterType="subscription"
      />

      {/* Countries */}
      <FilterSection
        title="Top Countries"
        items={countryData}
        filterType="country"
        limit={8}
      />

      {/* Regions */}
      <FilterSection
        title="Regions"
        items={regionData}
        filterType="region"
      />

      {/* Age Groups */}
      <FilterSection
        title="Age Groups"
        items={ageGroupData}
        filterType="ageGroup"
      />

      {/* Devices */}
      <FilterSection
        title="Devices"
        items={deviceData}
        filterType="device"
      />

      {/* Churn Risk */}
      <FilterSection
        title="Churn Risk"
        items={churnRiskData}
        filterType="churnRisk"
      />

      {/* Info Box */}
      <div className="bg-netflix-red/10 border border-netflix-red/30 rounded-lg p-4 text-sm text-netflix-light">
        <p className="font-semibold mb-2">💡 Tip:</p>
        <p>Click any filter to update all charts. Click the dashboard status line or press Esc to clear all filters at once.</p>
      </div>
    </motion.div>
  );
}
