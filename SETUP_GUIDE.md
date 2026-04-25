# 🚀 Streamlytics Setup Guide

Complete step-by-step guide to set up and run the Netflix Analytics Dashboard on your local machine.

## ⚙️ System Requirements

Before you start, ensure you have:

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)
- **Git**: For version control (optional)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Check Your System

```bash
# Check Node.js version
node --version
# Expected output: v16.0.0 or higher

# Check npm version
npm --version
# Expected output: 7.0.0 or higher
```

## 📥 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /home/utkarsh_07/Documents/Codes/netflix-analytics
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:

- React and React DOM
- Vite build tool
- Tailwind CSS
- Recharts
- Leaflet & React Leaflet
- Framer Motion
- Zustand
- XLSX parser
- All development dependencies

**Expected time**: 2-5 minutes depending on internet speed

### Step 3: Verify Installation

```bash
# Check if node_modules exists
ls -la node_modules/ | head -20

# You should see many packages listed
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output**:

```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Step 5: Open in Browser

The app should automatically open at `http://localhost:3000`

If it doesn't, manually open:

- **http://localhost:3000** in your web browser

## 🎯 First Steps in the App

### Home Page (Landing Page)

1. **View Key Statistics**: Top 4 metrics about the dataset
2. **Read Features**: Overview of dashboard capabilities
3. **Navigate**: Click "Explore Dashboard" or use the navbar

### Dashboard Page (Main Feature)

1. **Loading**: Wait for data to load (should be instant)
2. **Explore Stats**: View live statistics at the top
3. **View World Map**: See global user distribution
4. **Browse Charts**: 7 interactive charts with different data visualizations
5. **Apply Filters**: Click any element in charts or use left sidebar

## 🎮 How to Use Filters

### Using Filter Panel (Left Sidebar)

1. **Click any filter option** to apply it:
   - Genre, Subscription Type, Country, Region, Age Group, Device, Churn Risk

2. **Watch all charts update** in real-time

3. **Apply multiple filters** by clicking different options

4. **Remove a filter** by clicking it again (toggle)

5. **Clear all filters** using the "Clear Filters" button at the top

### Using Interactive Charts

1. **Click on chart elements**:
   - Click pie chart segments
   - Click bars in bar charts
   - Click circles on the map

2. **Hover for details**: Tooltips show additional information

3. **Real-time updates**: All other charts respond instantly

## 📊 Understanding the Dashboard

### Top Stats (5 Cards)

- **Total Users**: Count of users in current filter
- **Avg Watch Time**: Average hours watched
- **Satisfaction**: Customer satisfaction score (1-10)
- **Engagement**: User engagement score (1-10)
- **Revenue**: Total monthly income

### World Map

- **Large circles**: More users in that country
- **Yellow glow**: Currently filtered country
- **Click circles**: Filter by country
- **Hover**: See country metrics

### Charts (7 Total)

1. **Genre Preferences** (Pie Chart)
   - Shows which genres are most popular
   - Click to filter by genre

2. **Top Countries** (Bar Chart)
   - Top 8 countries by user count
   - Click bars to filter

3. **Subscription Types** (Pie Chart)
   - Distribution of Basic/Standard/Premium
   - Click segments to filter

4. **Device Usage** (Bar Chart)
   - Users by device (Laptop, TV, Mobile)
   - Click bars to filter

5. **Age Distribution** (Bar Chart)
   - Users grouped by age range
   - Click bars to filter

6. **Churn Risk** (Pie Chart)
   - Users by risk level (Low, Medium, High)
   - Click segments to filter

7. **Regional Distribution** (Horizontal Bar Chart)
   - Users by geographic region
   - Click bars to filter

## 🔨 Development Commands

### Start Development Server

```bash
npm run dev
```

- Starts local development server
- Hot-reloads on file changes
- Opens at http://localhost:3000

### Build for Production

```bash
npm run build
```

- Creates optimized production build
- Output in `dist/` folder
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

- Serves the built version locally
- Use to test before deployment

### Check Code Quality

```bash
npm run lint
```

- Runs ESLint to check code quality
- Reports any issues

## 📁 Key Files to Know

### Configuration Files

- **vite.config.js**: Vite build configuration
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS configuration
- **package.json**: Dependencies and scripts

### Main Application

- **src/App.jsx**: Main app component with routing
- **src/main.jsx**: React entry point
- **src/index.css**: Global styles
- **index.html**: HTML template

### Pages

- **src/pages/Home.jsx**: Landing page
- **src/pages/Dashboard.jsx**: Main dashboard

### Components

- **src/components/Navbar.jsx**: Navigation bar
- **src/components/FilterPanel.jsx**: Filter sidebar
- **src/components/StatsOverview.jsx**: Stats cards
- **src/components/WorldMap.jsx**: Leaflet map
- **src/components/charts/**: All chart components

### Utils & Hooks

- **src/utils/dataParser.js**: Excel parsing and data aggregation
- **src/hooks/useDataStore.js**: Zustand state management

## 🐛 Troubleshooting

### Issue: "npm: command not found"

**Solution**:

- Install Node.js from https://nodejs.org/
- Restart your terminal
- Try again

### Issue: Port 3000 already in use

**Solution**:

```bash
# Option 1: Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use a different port
npm run dev -- --port 3001
```

### Issue: Module not found errors

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Charts not loading

**Solution**:

- Check browser console (F12 or Cmd+Option+I)
- Clear browser cache
- Verify Excel file exists in public/ folder
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Map not displaying

**Solution**:

- Check if Leaflet CSS is in index.html
- Verify no browser extensions block mapbox
- Clear browser cache and refresh

### Issue: Filters not working

**Solution**:

- Open browser dev tools (F12)
- Check for console errors
- Try clearing browser cache
- Restart development server

## 🌐 Deploying to Production

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

```bash
# Build the project
npm run build

# Deploy dist/ folder to GitHub Pages
```

## 📚 Project Structure Details

```
netflix-analytics/
├── public/                          # Static files
│   └── Netflix_Refined_Final.xlsx   # Dataset
├── src/
│   ├── components/                  # React components
│   │   ├── charts/                  # Chart components
│   │   │   ├── GenreChart.jsx
│   │   │   ├── CountryChart.jsx
│   │   │   ├── SubscriptionChart.jsx
│   │   │   ├── DeviceChart.jsx
│   │   │   ├── AgeGroupChart.jsx
│   │   │   ├── ChurnRiskChart.jsx
│   │   │   └── RegionChart.jsx
│   │   ├── FilterPanel.jsx          # Filter sidebar
│   │   ├── Navbar.jsx               # Navigation
│   │   ├── StatsOverview.jsx        # Stats display
│   │   ├── StatCard.jsx             # Stat card component
│   │   └── WorldMap.jsx             # Leaflet map
│   ├── pages/                       # Page components
│   │   ├── Home.jsx                 # Home page
│   │   └── Dashboard.jsx            # Dashboard page
│   ├── hooks/                       # Custom hooks
│   │   └── useDataStore.js          # Zustand store
│   ├── utils/                       # Utility functions
│   │   └── dataParser.js            # Data processing
│   ├── App.jsx                      # Main app
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite config
├── tailwind.config.js               # Tailwind config
├── postcss.config.js                # PostCSS config
├── .gitignore                       # Git ignore rules
└── README.md                        # Main documentation
```

## 🎓 Learning Resources

After getting the app running, explore these resources to understand the codebase better:

1. **React Basics**
   - Components, hooks, state management
   - https://react.dev

2. **Vite**
   - Fast build tool and development server
   - https://vitejs.dev

3. **Tailwind CSS**
   - Utility-first CSS framework
   - https://tailwindcss.com

4. **Recharts**
   - React charting library
   - https://recharts.org

5. **Leaflet**
   - Interactive maps library
   - https://leafletjs.com

6. **Framer Motion**
   - Animation library
   - https://www.framer.com/motion/

7. **Zustand**
   - Lightweight state management
   - https://github.com/pmndrs/zustand

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] App opens at http://localhost:3000
- [ ] Home page loads with animations
- [ ] Dashboard page loads
- [ ] Charts render with data
- [ ] World map displays
- [ ] Clicking filters updates charts
- [ ] Multiple filters can be applied
- [ ] "Clear Filters" button works
- [ ] Stats update when filtering
- [ ] No console errors

## 🎉 You're Ready!

Once all checks pass, you have a fully functional Netflix Analytics Dashboard!

### Next Steps:

1. Explore the dashboard
2. Try different filter combinations
3. Review the code structure
4. Customize colors/styling if desired
5. Deploy to production when ready

## 📞 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Review browser console for error messages
3. Verify all dependencies installed correctly
4. Try the recommended fixes in order

---

**Happy Analyzing! 📊✨**
