import { create } from 'zustand';
import {
  getGenreDistribution,
  getCountryDistribution,
  getSubscriptionDistribution,
  getDeviceDistribution,
  getAgeGroupDistribution,
  getChurnRiskDistribution,
  getRegionDistribution,
} from '../utils/dataParser';

/**
 * Zustand store for managing filters and data state
 */
export const useDataStore = create((set, get) => ({
  // Data
  rawData: [],
  filteredData: [],
  loading: true,
  error: null,

  // Filters
  selectedCountry: null,
  selectedGenre: null,
  selectedSubscription: null,
  selectedDevice: null,
  selectedRegion: null,
  selectedChurnRisk: null,
  selectedAgeGroup: null,

  // Derived data
  stats: null,
  genreData: [],
  countryData: [],
  subscriptionData: [],
  deviceData: [],
  ageGroupData: [],
  churnRiskData: [],
  regionData: [],

  // Initialize data
  setRawData: (data) => {
    set({ 
      rawData: data,
      filteredData: data,
      loading: false,
    });

    // Generate all charts data
    const genreData = getGenreDistribution(data);
    const countryData = getCountryDistribution(data);
    const subscriptionData = getSubscriptionDistribution(data);
    const deviceData = getDeviceDistribution(data);
    const ageGroupData = getAgeGroupDistribution(data);
    const churnRiskData = getChurnRiskDistribution(data);
    const regionData = getRegionDistribution(data);

    set({
      genreData,
      countryData,
      subscriptionData,
      deviceData,
      ageGroupData,
      churnRiskData,
      regionData,
    });
  },

  // Filter functions
  applyFilter: (filterType, value) => {
    const state = get();
    const currentFilters = {
      country: state.selectedCountry,
      genre: state.selectedGenre,
      subscription: state.selectedSubscription,
      device: state.selectedDevice,
      region: state.selectedRegion,
      churnRisk: state.selectedChurnRisk,
      ageGroup: state.selectedAgeGroup,
    };

    // Toggle filter (if same value clicked, clear it)
    if (currentFilters[filterType] === value) {
      currentFilters[filterType] = null;
    } else {
      currentFilters[filterType] = value;
    }

    set(currentFilters);

    // Apply all filters
    let filtered = state.rawData;

    if (currentFilters.country) {
      filtered = filtered.filter(d => d.country === currentFilters.country);
    }
    if (currentFilters.genre) {
      filtered = filtered.filter(d => d.favoriteGenre === currentFilters.genre);
    }
    if (currentFilters.subscription) {
      filtered = filtered.filter(d => d.subscriptionType === currentFilters.subscription);
    }
    if (currentFilters.device) {
      filtered = filtered.filter(d => d.deviceUsed === currentFilters.device);
    }
    if (currentFilters.region) {
      filtered = filtered.filter(d => d.region === currentFilters.region);
    }
    if (currentFilters.churnRisk) {
      filtered = filtered.filter(d => d.churnRisk === currentFilters.churnRisk);
    }
    if (currentFilters.ageGroup) {
      const [minAge, maxAge] = parseAgeGroup(currentFilters.ageGroup);
      filtered = filtered.filter(d => d.age >= minAge && d.age <= maxAge);
    }

    set({
      filteredData: filtered,
      genreData: getGenreDistribution(filtered),
      countryData: getCountryDistribution(filtered),
      subscriptionData: getSubscriptionDistribution(filtered),
      deviceData: getDeviceDistribution(filtered),
      ageGroupData: getAgeGroupDistribution(filtered),
      churnRiskData: getChurnRiskDistribution(filtered),
      regionData: getRegionDistribution(filtered),
    });
  },

  // Clear all filters
  clearFilters: () => {
    set({
      selectedCountry: null,
      selectedGenre: null,
      selectedSubscription: null,
      selectedDevice: null,
      selectedRegion: null,
      selectedChurnRisk: null,
      selectedAgeGroup: null,
      filteredData: get().rawData,
      genreData: getGenreDistribution(get().rawData),
      countryData: getCountryDistribution(get().rawData),
      subscriptionData: getSubscriptionDistribution(get().rawData),
      deviceData: getDeviceDistribution(get().rawData),
      ageGroupData: getAgeGroupDistribution(get().rawData),
      churnRiskData: getChurnRiskDistribution(get().rawData),
      regionData: getRegionDistribution(get().rawData),
    });
  },

  // Get active filter count
  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.selectedCountry) count++;
    if (state.selectedGenre) count++;
    if (state.selectedSubscription) count++;
    if (state.selectedDevice) count++;
    if (state.selectedRegion) count++;
    if (state.selectedChurnRisk) count++;
    if (state.selectedAgeGroup) count++;
    return count;
  },
}));

/**
 * Helper function to parse age group string
 */
function parseAgeGroup(ageGroup) {
  const ranges = {
    '18-25': [18, 25],
    '26-35': [26, 35],
    '36-45': [36, 45],
    '46-55': [46, 55],
    '56-65': [56, 65],
    '65+': [65, 120],
  };
  return ranges[ageGroup] || [0, 120];
}
