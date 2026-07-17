import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user, token } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect accordingly
  useEffect(() => {
    if (token && user) {
      navigate('/log-offence');
    }
  }, [token, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Sila isi semua ruangan.');
      return;
    }

    const result = await login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc] dark:bg-[#070a13] font-sans transition-colors duration-250">

      {/* LEFT SIDE PANEL (40% width on large screens) */}
      <div className="w-full md:w-5/12 bg-[#0d1527] border-b md:border-b-0 md:border-r border-slate-800/40 p-8 md:p-12 lg:p-16 flex flex-col justify-between shrink-0">

        {/* Top Header Logo */}
        <div className="flex flex-col gap-3.5">
          <img src="/kvarau.png" alt="KV Arau Logo" className="h-14 w-auto object-contain self-start" />
        </div>

        {/* Middle Main Content */}
        <div className="my-10 md:my-auto max-w-sm">
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Kolej Vokasional Arau
          </h1>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed">
            Sistem Pengurusan Disiplin Pelajar — membantu pensyarah dan pentadbir memantau, merekod, dan mengurus isu disiplin dengan cekap.
          </p>
        </div>
        {/* Bottom Panel Copyright */}
        <div className="pt-6 border-t border-slate-800/40">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Kolej Vokasional Arau. Hak Cipta Terpelihara.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE PANEL (Login form, 60% width) */}
      <div className="flex-1 bg-slate-50 dark:bg-[#070a13] flex items-center justify-center p-6 md:p-12 lg:p-16">

        {/* Form Card */}
        <div className="w-full max-w-md bg-white dark:bg-[#111928]/40 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-2xl relative">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Log Masuk</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5">Masukkan kelayakan anda untuk mengakses sistem</p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Nama Pengguna
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan nama pengguna..."
                  className="w-full rounded-xl py-3 pl-11 pr-4 text-sm focus:bg-white transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Kata Laluan
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata laluan..."
                  className="w-full rounded-xl py-3 pl-11 pr-11 text-sm focus:bg-white transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-sm font-semibold text-white transition-all active:scale-[0.98] shadow-md hover:shadow-rose-600/10 cursor-pointer text-center"
            >
              Log Masuk
            </button>
          </form>

          {/* Footer note inside card */}
          <div className="text-center mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
              Untuk akses, hubungi Pentadbir Sistem.<br />Kolej Vokasional Arau.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
