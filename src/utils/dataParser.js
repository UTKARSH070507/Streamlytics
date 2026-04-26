import * as XLSX from 'xlsx';

/**
 * Parse Excel file and return user data
 * @param {File} file - Excel file from public folder
 * @returns {Promise<Array>} Array of user data
 */
export const parseExcelData = async () => {
  try {
    // Fetch the Excel file from public folder
    const response = await fetch('/Netflix_Refined_Final.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    
    // Parse the workbook
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets['User Data'];
    
    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);
    
    // Clean and normalize data
    return data.map((row, index) => ({
      id: index + 1,
      age: parseInt(row.Age) || 0,
      country: row.Country || 'Unknown',
      region: row.Region || 'Unknown',
      subscriptionType: row.Subscription_Type || 'Basic',
      watchTimeHours: parseFloat(row.Watch_Time_Hours) || 0,
      favoriteGenre: row.Favorite_Genre || 'Unknown',
      lastLogin: row.Last_Login || 'N/A',
      subscriptionLength: parseInt(row['Subscription Length (Months)']) || 0,
      satisfactionScore: parseFloat(row['Customer Satisfaction Score (1-10)']) || 0,
      engagementRate: parseFloat(row['Engagement Rate (1-10)']) || 0,
      deviceUsed: row['Device Used Most Often'] || 'Unknown',
      paymentHistory: row['Payment History (On-Time/Delayed)'] || 'On-Time',
      supportQueries: parseInt(row['Support Queries Logged']) || 0,
      monthlyIncome: parseInt(row['Monthly Income ($)']) || 0,
      promoOffers: parseInt(row['Promotional Offers Used']) || 0,
      profilesCreated: parseInt(row['Number of Profiles Created']) || 0,
      churnRisk: row['Churn Risk'] || 'Low',
    }));
  } catch (error) {
    console.error('Error parsing Excel data:', error);
    return [];
  }
};

/**
 * Parse the workbook's Global Revenue sheet.
 * The sheet already contains quarterly revenue from 2019 onward.
 */
export const parseGlobalRevenueData = async () => {
  try {
    const response = await fetch('/Netflix_Refined_Final.xlsx');
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets['Global Revenue'];

    if (!sheet) return [];

    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    return rows
      .map((row) => {
        const date = parseGlobalRevenueDate(row.Date);
        const revenue = parseCurrencyValue(row['Global Revenue']);

        if (!date || revenue === null) return null;

        return {
          period: formatQuarterLabel(date),
          revenue,
          date,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.date - b.date);
  } catch (error) {
    console.error('Error parsing Global Revenue sheet:', error);
    return [];
  }
};

/**
 * Generate aggregated statistics
 */
export const generateStats = (data) => {
  if (!data || data.length === 0) return null;

  const totalUsers = data.length;
  const countries = [...new Set(data.map(u => u.country))].length;
  const genres = [...new Set(data.map(u => u.favoriteGenre))].length;
  const avgWatchTime = (data.reduce((sum, u) => sum + u.watchTimeHours, 0) / totalUsers).toFixed(2);
  const avgSatisfaction = (data.reduce((sum, u) => sum + u.satisfactionScore, 0) / totalUsers).toFixed(2);
  const totalRevenue = data.reduce((sum, u) => sum + u.monthlyIncome, 0);

  return {
    totalUsers,
    countries,
    genres,
    avgWatchTime,
    avgSatisfaction,
    totalRevenue,
  };
};

/**
 * Get genre distribution
 */
export const getGenreDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.favoriteGenre] = (distribution[user.favoriteGenre] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Get country distribution
 */
export const getCountryDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.country] = (distribution[user.country] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Get subscription type distribution
 */
export const getSubscriptionDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.subscriptionType] = (distribution[user.subscriptionType] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};

/**
 * Get device distribution
 */
export const getDeviceDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.deviceUsed] = (distribution[user.deviceUsed] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Get age group distribution
 */
export const getAgeGroupDistribution = (data) => {
  const groups = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0,
    '56-65': 0,
    '65+': 0,
  };

  data.forEach(user => {
    if (user.age <= 25) groups['18-25']++;
    else if (user.age <= 35) groups['26-35']++;
    else if (user.age <= 45) groups['36-45']++;
    else if (user.age <= 55) groups['46-55']++;
    else if (user.age <= 65) groups['56-65']++;
    else groups['65+']++;
  });

  return Object.entries(groups).map(([name, value]) => ({ name, value }));
};

/**
 * Get churn risk distribution
 */
export const getChurnRiskDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.churnRisk] = (distribution[user.churnRisk] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};

/**
 * Get region distribution
 */
export const getRegionDistribution = (data) => {
  const distribution = {};
  data.forEach(user => {
    distribution[user.region] = (distribution[user.region] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Get average metrics by country
 */
export const getCountryMetrics = (data) => {
  const metrics = {};
  
  data.forEach(user => {
    if (!metrics[user.country]) {
      metrics[user.country] = {
        count: 0,
        totalWatchTime: 0,
        totalSatisfaction: 0,
        totalRevenue: 0,
      };
    }
    metrics[user.country].count++;
    metrics[user.country].totalWatchTime += user.watchTimeHours;
    metrics[user.country].totalSatisfaction += user.satisfactionScore;
    metrics[user.country].totalRevenue += user.monthlyIncome;
  });

  return Object.entries(metrics)
    .map(([country, data]) => ({
      country,
      users: data.count,
      avgWatchTime: (data.totalWatchTime / data.count).toFixed(2),
      avgSatisfaction: (data.totalSatisfaction / data.count).toFixed(2),
      revenue: data.totalRevenue,
    }))
    .sort((a, b) => b.users - a.users);
};

/**
 * Get yearly revenue trend from filtered data.
 * Revenue is annualized as monthlyIncome * 12 and grouped by last login year.
 */
export const getYearlyRevenueDistribution = (data) => {
  const yearlyRevenue = {};

  data.forEach((user) => {
    const rawDate = String(user.lastLogin || '');
    const yearMatch = rawDate.match(/(19|20)\d{2}/);
    if (!yearMatch) return;

    const year = yearMatch[0];
    const annualRevenue = (Number(user.monthlyIncome) || 0) * 12;
    yearlyRevenue[year] = (yearlyRevenue[year] || 0) + annualRevenue;
  });

  return Object.entries(yearlyRevenue)
    .map(([year, revenue]) => ({ year, revenue }))
    .sort((a, b) => Number(a.year) - Number(b.year));
};

/**
 * Get cumulative quarterly revenue trajectory from filtered data.
 * Uses login date quarter labels like Mar 2024, Jun 2024, etc.
 */
export const getQuarterlyRevenueTrajectory = (data) => {
  const quarterMap = new Map();
  const quarterEndMonths = ['Mar', 'Jun', 'Sep', 'Dec'];

  data.forEach((user) => {
    const parsed = parseLoginDate(user.lastLogin);
    if (!parsed) return;

    const year = parsed.getFullYear();
    const quarter = Math.floor(parsed.getMonth() / 3) + 1;
    const key = `${year}-Q${quarter}`;
    const quarterRevenue = (Number(user.monthlyIncome) || 0) * 3;

    quarterMap.set(key, (quarterMap.get(key) || 0) + quarterRevenue);
  });

  const now = new Date();
  const startYear = 2019;
  const currentYear = now.getFullYear();
  const currentQuarter = Math.floor(now.getMonth() / 3) + 1;

  let runningRevenue = 0;
  const trajectory = [];

  for (let year = startYear; year <= currentYear; year++) {
    const maxQuarter = year === currentYear ? currentQuarter : 4;
    for (let quarter = 1; quarter <= maxQuarter; quarter++) {
      const key = `${year}-Q${quarter}`;
      const quarterRevenue = quarterMap.get(key) || 0;
      runningRevenue += quarterRevenue;

      trajectory.push({
        period: `${quarterEndMonths[quarter - 1]} ${year}`,
        revenue: runningRevenue,
        quarterRevenue,
      });
    }
  }

  return trajectory;
};

/**
 * Build quarterly KPI trends for total users, watch time, satisfaction, and engagement.
 */
export const getQuarterlyKpiTrends = (data) => {
  const quarterMap = new Map();
  const quarterEndMonths = ['Mar', 'Jun', 'Sep', 'Dec'];
  const startYear = 2019;
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentQuarter = Math.floor(current.getMonth() / 3) + 1;

  data.forEach((user) => {
    const parsed = parseLoginDate(user.lastLogin);
    if (!parsed) return;

    const year = parsed.getFullYear();
    const quarter = Math.floor(parsed.getMonth() / 3) + 1;
    const key = `${year}-Q${quarter}`;

    if (!quarterMap.has(key)) {
      quarterMap.set(key, {
        count: 0,
        totalWatchTime: 0,
        totalSatisfaction: 0,
        totalEngagement: 0,
      });
    }

    const bucket = quarterMap.get(key);
    bucket.count += 1;
    bucket.totalWatchTime += Number(user.watchTimeHours) || 0;
    bucket.totalSatisfaction += Number(user.satisfactionScore) || 0;
    bucket.totalEngagement += Number(user.engagementRate) || 0;
  });

  const trend = [];

  for (let year = startYear; year <= currentYear; year++) {
    const maxQuarter = year === currentYear ? currentQuarter : 4;
    for (let quarter = 1; quarter <= maxQuarter; quarter++) {
      const key = `${year}-Q${quarter}`;
      const bucket = quarterMap.get(key) || {
        count: 0,
        totalWatchTime: 0,
        totalSatisfaction: 0,
        totalEngagement: 0,
      };

      trend.push({
        period: `${quarterEndMonths[quarter - 1]} ${year}`,
        totalUsers: bucket.count,
        avgWatchTime: bucket.count ? bucket.totalWatchTime / bucket.count : null,
        avgSatisfaction: bucket.count ? bucket.totalSatisfaction / bucket.count : null,
        avgEngagement: bucket.count ? bucket.totalEngagement / bucket.count : null,
      });
    }
  }

  return trend;
};

function parseLoginDate(value) {
  if (!value) return null;

  const asString = String(value).trim();
  const direct = new Date(asString);
  if (!Number.isNaN(direct.getTime())) return direct;

  const match = asString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (!match) return null;

  const first = Number(match[1]);
  const second = Number(match[2]);
  let year = Number(match[3]);
  if (year < 100) year += 2000;

  const month = first > 12 ? second : first;
  const day = first > 12 ? first : second;
  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseGlobalRevenueDate(value) {
  if (!value) return null;

  const parts = String(value).trim().split('-');
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  let year = Number(parts[2]);
  if (!day || !month || !year) return null;
  if (year < 100) year += 2000;

  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseCurrencyValue(value) {
  if (value == null) return null;
  const numeric = String(value).replace(/[^0-9.-]/g, '');
  if (!numeric) return null;
  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? null : parsed;
}

function formatQuarterLabel(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const quarterLabels = ['Mar', 'Jun', 'Sep', 'Dec'];
  const quarter = Math.floor(month / 3);
  return `${quarterLabels[quarter]} ${year}`;
}
