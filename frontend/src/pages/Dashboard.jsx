import React, { useState, useEffect } from 'react';
import API from '../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from 'recharts';
import {
  Users,
  AlertOctagon,
  Award,
  Calendar,
  PieChart,
  TrendingUp,
  BarChart,
} from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await API.get('/analytics/dashboard');
        setData(response.data);
      } catch (err) {
        console.error('Failed to load dashboard analytics:', err);
        setError('Gagal mendapatkan maklumat ringkasan analisis.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600/30 border-t-indigo-500 animate-spin" />
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Menyusun data analisis...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-rose-500 border-rose-200 dark:border-rose-500/20 max-w-xl mx-auto mt-10">
        <AlertOctagon size={48} className="mx-auto mb-4" />
        <h3 className="font-bold text-lg">Error Loading Dashboard</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{error || 'Server connection failed.'}</p>
      </div>
    );
  }

  const { summary, categories, topOffences, programStats, monthlyTrend, topStudents } = data;

  // Pie chart format for Category Distribution
  const categoryChartData = [
    { name: 'Major', value: categories.Major, color: '#f43f5e' },
    { name: 'Medium', value: categories.Medium, color: '#f59e0b' },
    { name: 'Minor', value: categories.Minor, color: '#3b82f6' },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-wide">
          Analisis Kesalahan
        </h1>
        <p className="text-slate-550 dark:text-slate-400 text-sm mt-1">
          Ringkasan rekod disiplin dan analisis kesalahan pelajar.
        </p>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="glass rounded-2xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jumlah Pelajar
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{summary.totalStudents}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <Users size={24} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass rounded-2xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jumlah Salah Laku Logged
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{summary.totalOffences}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-455">
            <AlertOctagon size={24} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass rounded-2xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jumlah Pensyarah / Staf
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{summary.totalTeachers}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-650 dark:text-indigo-400">
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart: Trend over time */}
        <div className="glass rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Trend Kes Bulanan</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Rekod kes disiplin bagi 6 bulan terkini.</p>
            </div>
            <Calendar size={18} className="text-slate-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-card)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)', borderRadius: '12px' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Categories distribution */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Kategori Salah Laku</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pecahan kes mengikut tahap keparahan.</p>
            </div>
            <PieChart size={18} className="text-slate-400" />
          </div>
          <div className="h-48 w-full relative flex items-center justify-center">
            {categoryChartData.length === 0 ? (
              <p className="text-slate-500 text-sm">Tiada data direkodkan.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)', borderRadius: '12px' }} />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {categoryChartData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-slate-500 dark:text-slate-400 font-medium">{c.name} ({c.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 offences list */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">5 Kes Tertinggi</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Salah laku yang paling kerap berulang.</p>
            </div>
            <TrendingUp size={18} className="text-slate-400" />
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {topOffences.length === 0 ? (
              <p className="text-slate-500 text-sm text-center">Tiada data direkodkan.</p>
            ) : (
              topOffences.map((off, index) => (
                <div key={off.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{off.name}</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-650 dark:text-indigo-400">{off.count} kes</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Program distribution chart */}
        <div className="glass rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Salah Laku Mengikut Program / Kursus</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Taburan bilangan kes berdasarkan kursus pengajian.</p>
            </div>
            <BarChart size={18} className="text-slate-400" />
          </div>
          <div className="h-64 w-full">
            {programStats.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-slate-550 text-sm">Tiada data direkodkan.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={programStats} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-card)" />
                  <XAxis type="number" stroke="var(--text-muted)" fontSize={11} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={9} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]}>
                    {programStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Pelajar Bermasalah Tertinggi */}
      <div className="glass rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Pelajar Bermasalah Tertinggi</h4>
          <p className="text-xs text-slate-550 dark:text-slate-400">Senarai pelajar dengan jumlah salah laku tertinggi di kolej.</p>
        </div>

        <div className="space-y-3.5 pt-2">
          {!topStudents || topStudents.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">Tiada data salah laku direkodkan.</p>
          ) : (
            topStudents.map((st, index) => {
              const maxOffences = 5;
              const percent = Math.min((st.offenceCount / maxOffences) * 100, 100);

              let barColor = 'bg-rose-500';
              if (st.offenceCount < 3) {
                barColor = 'bg-amber-500';
              }
              if (st.offenceCount === 1) {
                barColor = 'bg-yellow-500/80';
              }

              const qualifiesForWarning = st.offenceCount >= 3;

              return (
                <div
                  key={st.id}
                  className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800/40 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/10 rounded-xl px-2.5 transition-colors"
                >
                  {/* Left Side: Index, Avatar, Details */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-slate-500 text-xs font-semibold w-5 shrink-0">{index + 1}</span>
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-sm shrink-0">
                      {st.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{st.name}</p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block mt-0.5">{st.program}</span>
                    </div>
                  </div>

                  {/* Right Side: Warning Badge, Progress Bar, count */}
                  <div className="flex items-center gap-6 shrink-0 ml-4">
                    {qualifiesForWarning && (
                      <span className="hidden sm:inline-block px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-50 dark:bg-rose-955/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40">
                        Surat Amaran
                      </span>
                    )}

                    {/* Progress bar container */}
                    <div className="flex items-center gap-3 w-32 sm:w-48">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 w-4 text-right">{st.offenceCount}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
