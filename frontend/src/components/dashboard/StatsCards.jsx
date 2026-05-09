import React from 'react';
import { Users, UserCheck, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Leads',
      value: stats?.total || 0,
      icon: Users,
      color: 'bg-indigo-600',
    },
    {
      title: 'Interested',
      value: stats?.interested || 0,
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      title: 'Converted',
      value: stats?.converted || 0,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <StatCard key={card.title} {...card} delay={index * 0.1} />
      ))}
    </div>
  );
};

export default StatsCards;
