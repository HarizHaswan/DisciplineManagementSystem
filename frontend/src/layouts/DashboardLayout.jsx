import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  FileSpreadsheet,
  MailWarning,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dark/Light Theme state & synchronization
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sidebar navigation links (using user's customized names and route layout)
  const menuItems = [
    {
      name: 'Rekod Kesalahan',
      path: '/log-offence',
      icon: AlertTriangle,
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      name: 'Direktori Pelajar',
      path: '/students',
      icon: Users,
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      name: 'Senarai Kesalahan',
      path: '/offences',
      icon: FileSpreadsheet,
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      name: 'Surat Amaran',
      path: '/warning-letters',
      icon: MailWarning,
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      name: 'Analisis Kesalahan',
      path: '/',
      icon: LayoutDashboard,
      roles: ['ADMIN'], // Admin-only
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="h-screen flex overflow-hidden bg-page-bg text-text-main transition-colors duration-200">
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component (Static dark navy palette matching reference screenshot) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#0d1527] border-r border-slate-800/40 p-6 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Logo / Title (Stacked KV Arau logo and text layout) */}
          <div className="flex items-start justify-between pb-6 mb-6 border-b border-slate-800/60">
            <div className="flex flex-col gap-3.5">
              <img src="/kvarau.png" alt="KV Arau Logo" className="h-14 w-auto object-contain self-start" />
              <div className="flex flex-col">
                <span className="font-sans font-black text-xs text-white tracking-wider leading-snug">
                  SISTEM PENGURUSAN DISIPLIN
                </span>
                <span className="text-[9px] text-slate-400 font-semibold tracking-wide mt-1">
                  Kolej Vokasional Arau
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors pt-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* MENU Category Header */}
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">
            Menu
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                      ? 'bg-[#1b253b] text-white font-medium border-l-4 border-rose-500 rounded-l-none pl-3'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                    }`}
                >
                  <Icon
                    size={16}
                    className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                      }`}
                  />
                  <span className="text-xs">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Details & Logout (Matching reference footer) */}
        <div className="pt-4 border-t border-slate-800/60 space-y-2.5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs shrink-0">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="overflow-hidden flex flex-col">
              <span className="text-xs font-semibold text-slate-200 truncate leading-tight">
                {user?.name}
              </span>
              <span className="inline-block bg-rose-500/10 text-rose-500 border border-rose-500/15 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mt-1 w-max leading-none">
                {user?.role === 'ADMIN' ? 'Pentadbir' : 'Pensyarah'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/20 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={15} />
            <span className="text-xs font-medium">Log Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header - Mobile Only (Adapts dynamically, hidden on desktop) */}
        <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/60 bg-white/75 dark:bg-[#0d1321]/40 backdrop-blur-md px-6 flex items-center justify-between lg:hidden shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-mono tracking-wider">
            SISTEM PENGURUSAN DISIPLIN
          </span>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-[90rem] mx-auto space-y-6">{children}</div>
        </main>
      </div>

      {/* Floating Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg bg-white/90 dark:bg-[#0d1527]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800/60"
        title={theme === 'light' ? 'Tukar ke Mod Gelap' : 'Tukar ke Mod Cerah'}
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-indigo-600 dark:text-slate-300" />
        ) : (
          <Sun size={20} className="text-amber-400" />
        )}
      </button>
    </div>
  );
};

export default DashboardLayout;
