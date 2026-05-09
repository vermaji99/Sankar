import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const DashboardCharts = ({ stats }) => {
  const pieData = [
    { name: 'Interested', value: stats?.interested || 0, color: '#3b82f6' },
    { name: 'Converted', value: stats?.converted || 0, color: '#22c55e' },
    { name: 'Not Interested', value: stats?.notInterested || 0, color: '#ef4444' },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lead Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full relative">
            <ResponsiveContainer width="100%" aspect={2} minWidth={0}>
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" aspect={2} minWidth={0}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
