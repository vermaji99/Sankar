import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '../ui/input';

const Navbar = () => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between">
      <div className="w-96 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search everything..." 
          className="pl-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white shadow-sm overflow-hidden group-hover:border-indigo-100 transition-all">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
