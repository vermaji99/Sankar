import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const LeadFilter = ({ search, setSearch, status, setStatus, onClear }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search leads by name, phone or notes..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-white border-slate-200"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 w-full md:w-auto">
          {['ALL', 'Interested', 'NotInterested', 'Converted'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s === 'ALL' ? '' : s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                (s === 'ALL' && !status) || status === s
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {s === 'ALL' ? 'All Leads' : s}
            </button>
          ))}
        </div>

        {(search || status) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="text-slate-500 hover:text-red-600 h-9 px-2"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeadFilter;
