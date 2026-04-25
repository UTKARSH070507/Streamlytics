import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function StatCard({ label, value, icon: Icon, color, index }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
      />
      <div className={`relative p-8 bg-gradient-to-br ${color} rounded-xl text-white transform transition group-hover:scale-105 group-hover:shadow-2xl`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">{label}</p>
            <p className="text-3xl md:text-4xl font-black">{value}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/60"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, delay: index * 0.1 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
}
