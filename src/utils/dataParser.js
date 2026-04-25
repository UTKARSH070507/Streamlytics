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
