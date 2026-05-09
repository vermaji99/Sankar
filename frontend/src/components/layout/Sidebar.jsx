import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, BarChart3, MessageSquare, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Leads', icon: Users, path: '/leads' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            LeadFlow
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
