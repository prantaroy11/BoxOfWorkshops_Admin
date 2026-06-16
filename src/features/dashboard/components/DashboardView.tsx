'use client';

import React from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Flag,
  UserCheck
} from 'lucide-react';

const STATS = [
  { label: 'Total Practitioners', value: '1,248', trend: '+8.2%', positive: true, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Total Bookers', value: '6,582', trend: '+12.4%', positive: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Total Workshops', value: '2,756', trend: '+5.1%', positive: true, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Active Workshops', value: '28', trend: '-2.3%', positive: false, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-100' },
  { label: 'Platform Revenue', value: '$24,500', trend: '+18.7%', positive: true, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Today\'s Bookings', value: '23', trend: '+4', positive: true, icon: ArrowUpRight, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { label: 'Pending Approvals', value: '7', trend: '+3', positive: false, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  { label: 'Reported Users', value: '12', trend: '+2', positive: false, icon: Flag, color: 'text-red-600', bg: 'bg-red-100' },
];

export default function DashboardView() {
  return (
    <div className="space-y-[20px]">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white p-[20px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-xs font-medium mt-1">
                <span className={stat.positive ? 'text-emerald-500' : 'text-red-500'}>
                  {stat.positive ? '↗' : '↘'} {stat.trend}
                </span>
                <span className="text-slate-400 ml-1">vs last month</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
        <div className="lg:col-span-2 bg-white p-[20px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[400px] h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Bookings Over Time</h3>
              <p className="text-xs text-slate-500">Revenue & booking growth</p>
            </div>
            <div className="text-sm text-slate-500 flex gap-4">
              <button className="hover:text-slate-800">Filter</button>
              <button className="hover:text-slate-800">Export</button>
            </div>
          </div>
          {/* Placeholder for Recharts line chart */}
          <div className="w-full h-[250px] border-b border-l border-slate-100 flex items-end justify-between px-2 pb-2 text-xs text-slate-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        <div className="bg-white p-[20px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[400px] h-full flex flex-col">
          <div>
            <h3 className="font-semibold text-slate-800">Booking Status</h3>
            <p className="text-xs text-slate-500">Current breakdown</p>
          </div>
          {/* Placeholder for Recharts pie chart */}
          <div className="w-full h-[200px] mt-4 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-[12px] border-indigo-500 border-r-emerald-500 border-b-amber-500 border-l-red-500"></div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>Confirmed</span><span className="font-medium">58%</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Pending</span><span className="font-medium">22%</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Cancelled</span><span className="font-medium">12%</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Completed</span><span className="font-medium">8%</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-[20px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[400px] h-full flex flex-col">
          <div>
            <h3 className="font-semibold text-slate-800">Earnings Overview</h3>
            <p className="text-xs text-slate-500">Earned vs Refunded this week</p>
          </div>
          {/* Placeholder for Recharts bar chart */}
          <div className="w-full h-[250px] mt-4 border-b border-l border-slate-100 flex items-end justify-around px-4 pb-0">
             <div className="w-12 bg-red-500 h-[30%]"></div>
             <div className="w-12 bg-red-500 h-[50%]"></div>
             <div className="w-12 bg-red-500 h-[20%]"></div>
             <div className="w-12 bg-red-500 h-[60%]"></div>
             <div className="w-12 bg-red-500 h-[40%]"></div>
             <div className="w-12 bg-red-500 h-[70%]"></div>
             <div className="w-12 bg-red-500 h-[35%]"></div>
          </div>
        </div>

        <div className="bg-white p-[20px] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[400px] h-full flex flex-col overflow-y-auto">
          <div>
            <h3 className="font-semibold text-slate-800">Live Activity</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
              <div className="text-sm"><p className="text-slate-700">Practitioner Priya Sharma approved</p><p className="text-xs text-slate-400">2m ago</p></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">⊘</div>
              <div className="text-sm"><p className="text-slate-700">User Tom Bradley suspended</p><p className="text-xs text-slate-400">18m ago</p></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">$</div>
              <div className="text-sm"><p className="text-slate-700">Payout released to Roxanne Nguyen</p><p className="text-xs text-slate-400">45m ago</p></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">!</div>
              <div className="text-sm"><p className="text-slate-700">Fraud alert: duplicate account detected</p><p className="text-xs text-slate-400">1h ago</p></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
              <div className="text-sm"><p className="text-slate-700">Workshop Sourdough Baking approved</p><p className="text-xs text-slate-400">2h ago</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
