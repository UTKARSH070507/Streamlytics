import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, Users, TrendingUp } from 'lucide-react';
import { useDataStore } from '../hooks/useDataStore';
import StatCard from '../components/StatCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Home() {
  const { rawData } = useDataStore();

  const stats = [
    {
      label: 'Total Users',
      value: rawData.length.toLocaleString(),
      icon: Users,
      color: 'from-netflix-red to-red-600',
    },
    {
      label: 'Countries',
      value: [...new Set(rawData.map(u => u.country))].length,
      icon: Globe,
      color: 'from-blue-500 to-blue-700',
    },
    {
      label: 'Genres',
      value: [...new Set(rawData.map(u => u.favoriteGenre))].length,
      icon: BarChart3,
      color: 'from-purple-500 to-purple-700',
    },
    {
      label: 'Avg Watch Time',
      value: (rawData.reduce((sum, u) => sum + u.watchTimeHours, 0) / rawData.length).toFixed(0) + 'h',
      icon: TrendingUp,
      color: 'from-green-500 to-green-700',
    },
  ];

  return (
    <div className="min-h-screen bg-netflix-darker overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-netflix-red/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-netflix-red/20 text-netflix-red rounded-full text-sm font-semibold">
                ✨ Netflix Analytics Platform
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              Explore Your{' '}
              <span className="bg-gradient-to-r from-netflix-red to-red-500 text-transparent bg-clip-text">
                Streaming Data
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-netflix-gray max-w-2xl mx-auto mb-8"
            >
              Dive into interactive analytics and discover insights about Netflix users worldwide.
              Powered by real data visualization.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Explore Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#stats"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        id="stats"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-netflix-darker via-netflix-darker to-netflix-dark"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key Insights at a Glance
            </h2>
            <p className="text-netflix-gray text-lg">
              Comprehensive metrics across the Netflix platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Analytics Features
            </h2>
            <p className="text-netflix-gray text-lg">
              Everything you need to understand global streaming patterns
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                title: 'Interactive Charts',
                description: 'Beautiful, responsive charts that visualize data patterns instantly.',
                icon: '📊',
              },
              {
                title: 'World Map',
                description: 'Explore geographic distribution of users and engagement across countries.',
                icon: '🌍',
              },
              {
                title: 'Cross Filtering',
                description: 'Click any element to filter all charts dynamically in real-time.',
                icon: '🔗',
              },
              {
                title: 'Genre Analysis',
                description: 'Understand preference distributions and trends by content type.',
                icon: '🎬',
              },
              {
                title: 'Subscription Insights',
                description: 'Compare different subscription tiers and user engagement levels.',
                icon: '💳',
              },
              {
                title: 'Real-time Stats',
                description: 'All data updates instantly as you apply filters and explore.',
                icon: '⚡',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 bg-white/5 hover:bg-white/10 border border-netflix-red/20 hover:border-netflix-red/50 rounded-xl transition backdrop-blur-sm"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-netflix-gray">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-netflix-red/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore the Data?
          </h2>
          <p className="text-netflix-gray text-lg mb-8">
            Start your journey into Netflix analytics with our interactive dashboard.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-netflix-red hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Launch Dashboard
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-netflix-dark border-t border-netflix-red/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-netflix-gray">
          <p>
            © 2024 Streamlytics • Netflix Analytics Dashboard • Powered by React + Recharts + Leaflet
          </p>
        </div>
      </footer>
    </div>
  );
}
