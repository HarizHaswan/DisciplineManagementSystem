import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  Search,
  User,
  AlertTriangle,
  BookOpen,
  Calendar,
  FileCheck,
  CheckCircle,
  X,
  Phone,
  RefreshCw,
  FileText,
} from 'lucide-react';

const LogOffence = () => {
  const navigate = useNavigate();

  // Student Lookup States
  const [icInput, setIcInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [student, setStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Offence Form States
  const [offenceTypes, setOffenceTypes] = useState([]);
  const [selectedOffenceId, setSelectedOffenceId] = useState('');
  const [offenceDate, setOffenceDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Success Threshold Banner States
  const [successRecord, setSuccessRecord] = useState(null);
  const [warningAlert, setWarningAlert] = useState(null);

  // Fetch offence types on component mount
  useEffect(() => {
    const fetchOffenceTypes = async () => {
      try {
        const response = await API.get('/offence-types');
        setOffenceTypes(response.data);
      } catch (err) {
        console.error('Failed to load offence types:', err);
      }
    };
    fetchOffenceTypes();
  }, []);

  const handleIcInputChange = (e) => {
    let value = e.target.value;
    // Allow digits and hyphens only
    value = value.replace(/[^\d-]/g, '');
    setIcInput(value);
    setSearchError('');
  };

  const handleStudentLookup = async (e) => {
    if (e) e.preventDefault();
    setSearchError('');
    setWarningAlert(null);
    setSuccessRecord(null);

    // Strip hyphens for API call
    const cleanIC = icInput.replace(/-/g, '');

    if (cleanIC.length !== 12) {
      setSearchError('No. KP mestilah mengandungi 12 digit nombor.');
      return;
    }

    setSearching(true);
    try {
      const response = await API.get(`/students/ic/${cleanIC}`);
      setStudent(response.data);
    } catch (err) {
      console.error('Student lookup failed:', err);
      setStudent(null);
      setSearchError('Tiada rekod pelajar ditemui dengan No. KP ini. Sila semak semula.');
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    setIcInput('');
    setStudent(null);
    setSearchError('');
    setSelectedOffenceId('');
    setDescription('');
    setWarningAlert(null);
    setSuccessRecord(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    setSuccessRecord(null);

    if (!student) {
      setFormError('Sila pilih pelajar yang sah.');
      setSubmitting(false);
      return;
    }

    if (!selectedOffenceId) {
      setFormError('Sila pilih jenis salah laku.');
      setSubmitting(false);
      return;
    }

    if (description.trim().length < 5) {
      setFormError('Sila masukkan keterangan ringkas (minima 5 aksara).');
      setSubmitting(false);
      return;
    }

    const payload = {
      studentId: student.studentNumber,
      offenceTypeId: parseInt(selectedOffenceId),
      date: offenceDate,
      description: description.trim(),
    };

    try {
      const response = await API.post('/offences', payload);
      setSuccessRecord(response.data.record);

      const { warningStatus, totalOffences } = response.data;

      // Handle showing warning letter alerts
      if (warningStatus && warningStatus.warningTriggered) {
        setWarningAlert({
          index: warningStatus.warningIndex,
          label: warningStatus.warningLabel,
          studentId: student.studentNumber,
          totalOffences: totalOffences,
        });
      }

      // Reset form fields
      setSelectedOffenceId('');
      setDescription('');
      setIcInput('');
      setStudent(null);
    } catch (err) {
      console.error('Failed to log offence:', err);
      setFormError(err.response?.data?.message || 'Gagal merekod kes salah laku.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper count of past offences by severity
  const getOffenceCountsBySeverity = () => {
    if (!student) return { minor: 0, moderate: 0, serious: 0 };
    const counts = { minor: 0, moderate: 0, serious: 0 };
    student.records.forEach((r) => {
      const cat = r.offenceType.category.toLowerCase();
      if (cat === 'minor') counts.minor++;
      else if (cat === 'medium' || cat === 'moderate') counts.moderate++;
      else if (cat === 'major' || cat === 'serious') counts.serious++;
    });
    return counts;
  };

  const severityCounts = getOffenceCountsBySeverity();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-wide">
          Rekod Kesalahan Pelajar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Cari pelajar menggunakan nombor IC, kemudian log kesalahan disiplin.
        </p>
      </div>

      {/* Success Notification Banner */}
      {successRecord && (
        <div className="glass p-5 rounded-2xl border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/10 flex items-start gap-4">
          <CheckCircle className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={20} />
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Kes Salah Laku Berjaya Direkodkan</h4>
            <p className="text-xs text-slate-650 dark:text-slate-350">
              Pelajar <strong className="text-slate-950 dark:text-white">{successRecord.student.name}</strong> melakukan kesalahan{' '}
              <strong className="text-indigo-650 dark:text-indigo-350 font-semibold">[{successRecord.offenceType.code}] {successRecord.offenceType.name}</strong>.
            </p>
          </div>
          <button onClick={() => setSuccessRecord(null)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Warning Letter Trigger Alert */}
      {warningAlert && (
        <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/30 bg-rose-50/70 dark:bg-rose-950/20 shadow-sm space-y-4">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="text-rose-600 dark:text-rose-400 shrink-0 mt-1" size={22} />
            <div>
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base">Kelayakan Surat Amaran Tercapai!</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Pelajar telah mencapai sejumlah <strong className="text-rose-600 dark:text-rose-400 font-bold">{warningAlert.totalOffences} kes</strong> disiplin.
                Sila cetak <strong className="text-slate-950 dark:text-white font-bold">{warningAlert.label}</strong> sekarang.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pl-9">
            <button
              onClick={() => navigate('/warning-letters')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
            >
              <FileText size={13} />
              Cetak Surat Amaran
            </button>
            <button
              onClick={() => setWarningAlert(null)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            >
              Tutup Makluman
            </button>
          </div>
        </div>
      )}

      {/* CARD 1: Cari Pelajar */}
      <div className="glass border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
          <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Cari Pelajar</h3>
        </div>

        <form onSubmit={handleStudentLookup} className="space-y-2">
          <label className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest">
            Nombor IC Pelajar
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={icInput}
                onChange={handleIcInputChange}
                placeholder="Sila masukkan No. Kad Pengenalan Pelajar"
                className="w-full rounded-xl py-3 px-4 text-sm font-mono placeholder-slate-400 dark:placeholder-slate-600 focus:bg-white dark:focus:bg-slate-950 transition-all"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={searching || icInput.length < 12}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0f172a] dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 disabled:opacity-45 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <Search size={16} />
                Cari
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-650 dark:text-slate-300 transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                Set Semula
              </button>
            </div>
          </div>
          {searching && <p className="text-[11px] text-indigo-600 dark:text-indigo-400">Menghubungi pangkalan data...</p>}
          {searchError && <p className="text-[11px] text-rose-600 dark:text-rose-400">{searchError}</p>}
        </form>
      </div>

      {/* CARD 2: Maklumat Pelajar (Displays below Card 1) */}
      {student && (
        <div className="glass border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Maklumat Pelajar</h3>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            {/* Left Info Panel */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 w-full">
              {/* Avatar circle */}
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-750 dark:text-slate-200 flex items-center justify-center font-display font-extrabold text-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                {student.name.charAt(0)}
              </div>
              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 gap-x-6 flex-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Nama Penuh</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{student.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">No. Pelajar</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-mono block mt-0.5">{student.studentNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Kelas</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300 block mt-0.5">{student.className}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">No. Telefon Penjaga</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300 block mt-0.5 flex items-center gap-1 font-mono">
                    <Phone size={12} className="text-emerald-600 dark:text-emerald-400 text-xs" />
                    {student.parentPhone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">No. IC / Pasport</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-mono block mt-0.5">{student.icNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Ibu Bapa / Penjaga</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300 block mt-0.5">{student.parentName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Kohort</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300 block mt-0.5 font-mono">{student.cohort}</span>
                </div>
              </div>
            </div>

            {/* Right Score Box */}
            <div className="w-full md:w-36 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-500/5 p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-4xl font-black text-rose-600 dark:text-rose-450">{student.records.length}</span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-1">Kesalahan</span>
              {student.records.length >= 3 && (
                <span className="w-full mt-2 py-1 text-[9px] font-black uppercase text-center rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-550/30">
                  Surat Amaran
                </span>
              )}
            </div>
          </div>

          {/* Section: Past Records */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Rekod Lepas</h4>
              <div className="flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400 border border-blue-150 dark:border-blue-900/30">
                  {severityCounts.minor} x Minor
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-150 dark:border-amber-900/30">
                  {severityCounts.moderate} x Moderate
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/20 text-rose-750 dark:text-rose-450 border border-rose-150 dark:border-rose-900/30">
                  {severityCounts.serious} x Serious
                </span>
              </div>
            </div>

            {student.records.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 text-xs py-2 italic">Tiada rekod kesalahan lampau direkodkan.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-950/10">
                {student.records.map((rec) => {
                  const recDate = new Date(rec.date).toLocaleDateString('ms-MY', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <div key={rec.id} className="p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-100/30 dark:hover:bg-slate-900/10 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 dark:text-slate-400 font-mono w-20 shrink-0">{recDate}</span>
                        <span
                          className={`inline-flex items-center justify-center w-[72px] shrink-0 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] ${rec.offenceType.category === 'Major'
                            ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400'
                            : rec.offenceType.category === 'Medium'
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            }`}
                        >
                          {rec.offenceType.category === 'Major' ? 'Serious' : rec.offenceType.category === 'Medium' ? 'Moderate' : 'Minor'}
                        </span>
                        <span className="text-slate-900 dark:text-slate-100 font-semibold">{rec.offenceType.name}</span>
                      </div>
                      <span className="text-slate-500 dark:text-slate-450 italic max-w-sm truncate" title={rec.description}>
                        {rec.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CARD 3: Rekod Kesalahan (Displays below Card 2) */}
      {student && (
        <div className="glass border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Rekod Kesalahan</h3>
          </div>

          {formError && (
            <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-sm">
              <AlertTriangle size={18} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Offence Type Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650 dark:text-slate-400">Jenis Kes / Kategori Salah Laku</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <select
                  value={selectedOffenceId}
                  onChange={(e) => setSelectedOffenceId(e.target.value)}
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm font-mono focus:bg-white dark:focus:bg-slate-950 transition-all"
                  required
                >
                  <option value="">Sila Pilih Jenis Kes...</option>
                  {offenceTypes.map((ot) => (
                    <option key={ot.id} value={ot.id}>
                      [{ot.code}] {ot.name} ({ot.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Offence Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650 dark:text-slate-400">Tarikh Kejadian</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="date"
                  value={offenceDate}
                  onChange={(e) => setOffenceDate(e.target.value)}
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm focus:bg-white dark:focus:bg-slate-950 transition-all"
                  required
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650 dark:text-slate-400">Keterangan Kes Disiplin</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Nyatakan maklumat terperinci seperti lokasi kejadian, masa, bukti salah laku, dsb."
                className="w-full rounded-xl p-4 text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:bg-white dark:focus:bg-slate-950 transition-all"
                required
              />
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#0f172a] dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-sm font-semibold text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-sm cursor-pointer"
            >
              {submitting ? (
                'Merekodkan Kes...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FileCheck size={16} />
                  Simpan & Rujuk Amaran
                </span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LogOffence;
