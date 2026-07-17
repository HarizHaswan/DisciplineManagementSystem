import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Trash2,
  Calendar,
} from 'lucide-react';

const Offences = () => {
  const { isAdmin } = useAuth();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const recordsResponse = await API.get('/offences', {
        params: {
          search: search.trim() || undefined,
          category: categoryFilter || undefined,
        },
      });
      setRecords(recordsResponse.data);
    } catch (err) {
      console.error('Failed to load disciplinary records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search, categoryFilter]);

  const handleDeleteRecord = async (recordId, studentName) => {
    if (!window.confirm(`Adakah anda pasti mahu memadam rekod salah laku untuk "${studentName}"?`)) {
      return;
    }

    try {
      await API.delete(`/offences/${recordId}`);
      fetchRecords();
    } catch (err) {
      console.error('Failed to delete record:', err);
      alert('Gagal memadam rekod salah laku.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-wide">
            Senarai Kesalahan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Sejarah dan rekod salah laku pelajar Kolej Vokasional Arau
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, IC, atau keterangan..."
            className="w-full rounded-xl py-2 pl-9 pr-4 text-sm bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl py-2 px-3 text-sm bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
        >
          <option value="">Semua Kategori</option>
          <option value="Major">Major</option>
          <option value="Medium">Medium</option>
          <option value="Minor">Minor</option>
        </select>
      </div>

      {/* Table / List Container */}
      <div className="bg-white dark:bg-[#111928]/45 border border-slate-100 dark:border-slate-850/60 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-600/30 border-t-indigo-500 animate-spin" />
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Memuat naik sejarah kes...</span>
          </div>
        ) : records.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm">Tiada kes ditemui.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-850/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-450 dark:text-slate-400 tracking-wider uppercase">
                  <th className="py-4 px-6">Pelajar</th>
                  <th className="py-4 px-6">Tarikh Kes</th>
                  <th className="py-4 px-6">Salah Laku</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Keterangan</th>
                  <th className="py-4 px-6">Direkodkan Oleh</th>
                  {isAdmin && <th className="py-4 px-6 text-right">Tindakan</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm text-slate-700 dark:text-slate-300">
                {records.map((rec) => {
                  const recDate = new Date(rec.date).toLocaleDateString('ms-MY', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <tr
                      key={rec.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors animate-fade-in"
                    >
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white">{rec.student.name}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-normal">{rec.student.icNumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={13} />
                          {recDate}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/65 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-900/40">
                            {rec.offenceType.code}
                          </span>
                          <span>{rec.offenceType.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-md border font-medium ${
                            rec.offenceType.category === 'Major'
                              ? 'bg-rose-100/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/40'
                              : rec.offenceType.category === 'Medium'
                              ? 'bg-amber-100/70 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40'
                              : 'bg-blue-100/70 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/40'
                          }`}
                        >
                          {rec.offenceType.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400 max-w-xs truncate" title={rec.description}>
                        {rec.description}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{rec.teacher.name}</td>
                      {isAdmin && (
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteRecord(rec.id, rec.student.name)}
                            className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/45 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/20 transition-colors cursor-pointer"
                            title="Padam Rekod Kes"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offences;
