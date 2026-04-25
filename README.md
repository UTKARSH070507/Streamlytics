# Streamlytics - Netflix Analytics Dashboard 🎬📊

A production-ready, interactive Netflix-inspired analytics dashboard built with modern web technologies. Explore global Netflix user data through beautiful, interactive visualizations with real-time cross-filtering capabilities.

## 🌟 Features

### Core Features

- **Interactive Charts**: Genre distribution, subscription types, device usage, age demographics, and churn risk analysis
- **World Map Visualization**: Geographic distribution of users with interactive markers
- **Real-time Cross-Filtering**: Click any element to filter all charts dynamically
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Dark Theme**: Netflix-inspired dark mode with red accents
- **Smooth Animations**: Powered by Framer Motion for delightful interactions

### Data Insights

- Total users across countries
- Genre preferences and trends
- Subscription tier distribution
- Device usage patterns
- Age group demographics
- Churn risk assessment
- Regional analytics

### Interactive Elements

- Click on genres, countries, regions, devices, age groups, or subscription types to filter
- Dynamic stat updates as you filter
- Clear all filters with one click
- Hover tooltips with detailed information
- Clickable world map markers

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.3.6
- **Charts**: Recharts 2.10.3
- **Map**: Leaflet 1.9.4 + React Leaflet 4.2.3
- **Animations**: Framer Motion 10.16.4
- **State Management**: Zustand 4.4.7
- **Data Parsing**: XLSX 0.18.5
- **Icons**: Lucide React 0.294.0
- **Routing**: React Router DOM 6.20.0

## 📁 Project Structure

```
netflix-analytics/
├── public/
│   └── Netflix_Refined_Final.xlsx    # Dataset (auto-loaded)
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── GenreChart.jsx         # Pie chart for genres
│   │   │   ├── CountryChart.jsx       # Bar chart for countries
│   │   │   ├── SubscriptionChart.jsx  # Pie chart for subscriptions
│   │   │   ├── DeviceChart.jsx        # Bar chart for devices
│   │   │   ├── AgeGroupChart.jsx      # Bar chart for age groups
│   │   │   ├── ChurnRiskChart.jsx     # Pie chart for churn risk
│   │   │   └── RegionChart.jsx        # Horizontal bar chart for regions
│   │   ├── FilterPanel.jsx            # Left sidebar with filters
│   │   ├── StatsOverview.jsx          # Stats cards display
│   │   ├── WorldMap.jsx               # Leaflet world map
│   │   └── Navbar.jsx                 # Navigation bar
│   ├── pages/
│   │   ├── Home.jsx                   # Landing page
│   │   └── Dashboard.jsx              # Main dashboard
│   ├── hooks/
│   │   └── useDataStore.js            # Zustand data store
│   ├── utils/
│   │   └── dataParser.js              # Excel parsing & data aggregation
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global styles
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
└── README.md                          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:

   ```bash
   cd netflix-analytics
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## 🎮 How to Use

### Home Page

- Overview of the platform with key statistics
- Introduction to features
- Quick navigation to the dashboard
- Beautiful animations and hero section

### Dashboard

#### Viewing Data

1. The dashboard loads with all users by default
2. Charts display interactive visualizations of your data
3. Hover over chart elements to see detailed tooltips

#### Filtering Data

1. **Left Sidebar Filters**: Click any filter option to apply filters
   - Genres (top 7)
   - Subscription types
   - Countries (top 8)
   - Regions
   - Age groups
   - Devices
   - Churn risk levels

2. **Chart Interactions**: Click directly on chart elements to filter
   - Click pie chart segments
   - Click bar chart bars
   - Click map markers

3. **Multi-filtering**: Apply multiple filters simultaneously
   - All charts update in real-time
   - Stats refresh dynamically
   - Reset anytime with "Clear Filters" button

#### World Map

- Displays user distribution globally
- Circle size represents user count
- Click circles to filter by country
- Hover for detailed metrics per country

#### Real-time Stats

- **Total Users**: Current count in filtered view
- **Avg Watch Time**: Average hours watched
- **Satisfaction Score**: Customer satisfaction rating
- **Engagement Rate**: User engagement metric
- **Revenue**: Total monthly income

## 📊 Dataset Information

The dataset includes user information from the `User Data` sheet:

- **Age**: User age
- **Country**: User location
- **Region**: Geographic region
- **Subscription_Type**: Basic, Standard, or Premium
- **Watch_Time_Hours**: Total watch time
- **Favorite_Genre**: Preferred content genre
- **Last_Login**: Last login date
- **Subscription Length**: Months subscribed
- **Customer Satisfaction Score**: 1-10 rating
- **Engagement Rate**: 1-10 engagement metric
- **Device Used Most Often**: Laptop, TV, or Mobile
- **Payment History**: On-Time or Delayed
- **Support Queries**: Number of support tickets
- **Monthly Income**: User income
- **Promotional Offers**: Offers used
- **Number of Profiles**: Profiles created
- **Churn Risk**: Low, Medium, or High

## 🎨 Design Features

### Color Scheme

- **Dark Background**: `#0f0f0f` (Netflix-inspired)
- **Primary Red**: `#e50914` (Netflix red)
- **Text Light**: `#f5f5f1` (Off-white)
- **Gray Accent**: `#808080` (Medium gray)
- **Chart Colors**: Multi-color gradients for visual appeal

### Animations

- **Page Transitions**: Smooth fade and slide animations
- **Chart Loading**: Animated bar fills and chart renders
- **Button Hover**: Scale and shadow effects
- **Filter Selection**: Highlight with glow effects
- **Floating Elements**: Subtle background animations

### Responsiveness

- **Mobile**: Optimized single-column layout
- **Tablet**: 2-column chart layout
- **Desktop**: Full layout with sidebar filters and 3-column charts

## 🔄 State Management

Uses **Zustand** for efficient state management:

- Global data store
- Filter state management
- Real-time chart data aggregation
- Computed statistics

## 🚀 Performance Optimizations

- Lazy loading of components
- Memoized data calculations
- Efficient re-renders with React hooks
- Optimized bundle size with Vite
- CSS minification
- Tree-shaking of unused code

## 🐛 Troubleshooting

### App won't start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Charts not displaying

- Check browser console for errors
- Ensure Excel file is in `public/` folder
- Verify Recharts is installed correctly

### Map not showing

- Check if Leaflet CSS is loaded (in index.html)
- Verify browser permits mapbox resources
- Clear browser cache and refresh

### Filters not working

- Check browser console for errors
- Ensure Zustand store is properly initialized
- Try clearing browser cache

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Notes

- No sensitive data is stored
- Excel file is loaded client-side only
- No external API calls
- All processing happens in the browser

## 📝 Code Quality

- Clean, readable component structure
- Comprehensive comments on complex logic
- Reusable utility functions
- Consistent naming conventions
- Error handling for data parsing
- Responsive design patterns

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Leaflet](https://leafletjs.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📄 License

This project is open source and available for educational and commercial use.

## 🙋 Support

For issues or questions:

1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for error messages
4. Verify all dependencies are installed

## 🎉 Features Checklist

- ✅ React + Vite setup
- ✅ Tailwind CSS styling
- ✅ Interactive charts (7 different types)
- ✅ World map visualization
- ✅ Cross-filtering system
- ✅ Real-time stats updates
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Dark theme
- ✅ Data parsing from Excel
- ✅ Production-ready code
- ✅ Clean folder structure
- ✅ Comprehensive documentation

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

Enjoy exploring your Netflix analytics! 🚀📊
