import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Download,
  AlertTriangle,
  FileText,
  Trash2,
  Calendar,
  Eye,
  Plus,
  CheckCircle2,
  X,
  History,
  FileCheck,
  Search,
} from 'lucide-react';

const getProgramAbbreviation = (programName) => {
  if (!programName) return '';
  const mapping = {
    'Teknologi Penyejukan dan Penyamanan Udara': 'MPP',
    'Teknologi Sistem Komputer dan Rangkaian': 'KSK',
    'Pemesinan Industri': 'MPI',
    'Teknologi Automotif': 'MTA',
    'Perniagaan Runcit': 'KPR',
    'Kosmetologi': 'WPP'
  };
  return mapping[programName] || programName;
};

const formatClass = (student) => {
  const abbr = getProgramAbbreviation(student.program);
  return `${student.cohort} ${abbr}`;
};

// Generates the past 12 months dynamically for history filter
const getPastMonths = () => {
  const months = [];
  const currentDate = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthVal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = d.toLocaleDateString('ms-MY', { month: 'long', year: 'numeric' });
    months.push({ value: monthVal, label: monthLabel });
  }
  return months;
};

const WarningLetters = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // Tabs: 'active' or 'history'
  const [activeTab, setActiveTab] = useState('active');

  // Month values
  const pastMonthsList = getPastMonths();
  const currentMonthVal = pastMonthsList[0].value;
  const [selectedHistoryMonth, setSelectedHistoryMonth] = useState(pastMonthsList[1].value);

  // Data States
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [activeLetters, setActiveLetters] = useState([]);
  const [historyLetters, setHistoryLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Preview Modal States
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  const fetchActiveData = async () => {
    setLoading(true);
    try {
      // 1. Fetch current month's warning letters
      const lettersResponse = await API.get('/warning-letters', {
        params: { month: currentMonthVal }
      });
      setActiveLetters(lettersResponse.data);

      // 2. Fetch eligible students (Admin only)
      if (isAdmin) {
        const eligibleResponse = await API.get('/warning-letters/eligible');
        setEligibleStudents(eligibleResponse.data);
      }
    } catch (err) {
      console.error('Failed to fetch warning letter active data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const lettersResponse = await API.get('/warning-letters', {
        params: { month: selectedHistoryMonth }
      });
      setHistoryLetters(lettersResponse.data);
    } catch (err) {
      console.error('Failed to fetch warning letter history data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'active') {
      fetchActiveData();
    } else {
      fetchHistoryData();
    }
  }, [activeTab, selectedHistoryMonth]);

  // Handle generating warning letter draft
  const handleGenerateDraft = async (studentId, eligibleTier) => {
    setSubmitting(true);
    try {
      await API.post('/warning-letters/generate', {
        studentId,
        tier: eligibleTier
      });
      fetchActiveData();
    } catch (err) {
      console.error('Failed to generate warning letter draft:', err);
      alert(err.response?.data?.message || 'Gagal menjana draf surat amaran.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open the PDF preview modal
  const handleOpenPreview = async (letter) => {
    setSelectedLetter(letter);
    setPreviewOpen(true);
    setPreviewLoading(true);
    setPdfUrl('');
    try {
      const response = await API.get(`/warning-letters/${letter.id}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Failed to download preview PDF:', err);
      alert('Gagal memuat naik pratonton PDF.');
      setPreviewOpen(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Handle approving and issuing draft letter
  const handleIssueLetter = async (letterId) => {
    setSubmitting(true);
    try {
      await API.post(`/warning-letters/${letterId}/issue`);
      setPreviewOpen(false);
      fetchActiveData();

      // Trigger download of the PDF
      const response = await API.get(`/warning-letters/${letterId}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Surat_Amaran_${selectedLetter.warningTier}_${selectedLetter.student.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to issue warning letter:', err);
      alert('Gagal meluluskan surat amaran.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle deleting warning letter draft
  const handleDeleteDraft = async (letterId, studentName) => {
    if (!window.confirm(`Adakah anda pasti mahu memadam draf surat amaran untuk "${studentName}"? Rekod kesalahan akan dikembalikan semula.`)) {
      return;
    }
    setSubmitting(true);
    try {
      await API.delete(`/warning-letters/${letterId}`);
      setPreviewOpen(false);
      fetchActiveData();
    } catch (err) {
      console.error('Failed to delete warning letter draft:', err);
      alert('Gagal memadam draf surat amaran.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadPDF = async (letterId, warningTier, studentName) => {
    try {
      const response = await API.get(`/warning-letters/${letterId}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Surat_Amaran_${warningTier}_${studentName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert('Gagal memuat turun PDF.');
    }
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 1:
        return {
          text: 'Amaran Pertama',
          className: 'bg-amber-100/70 dark:bg-amber-950/30 text-amber-800 dark:text-amber-450 border border-amber-200/50 dark:border-amber-900/20 text-[11px] font-bold px-2.5 py-1 rounded-md'
        };
      case 2:
        return {
          text: 'Amaran Kedua',
          className: 'bg-orange-100/70 dark:bg-orange-950/30 text-orange-850 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/20 text-[11px] font-bold px-2.5 py-1 rounded-md'
        };
      default:
        return {
          text: 'Amaran Terakhir / Gantung',
          className: 'bg-rose-100/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-455 border border-rose-200/50 dark:border-rose-900/20 text-[11px] font-bold px-2.5 py-1 rounded-md'
        };
    }
  };

  // Grouping logic for active letters
  const groupLettersByStudent = (lettersList) => {
    const grouped = {};
    lettersList.forEach((letter) => {
      const studentNumber = letter.student.studentNumber;
      if (!grouped[studentNumber]) {
        grouped[studentNumber] = {
          student: letter.student,
          letters: []
        };
      }
      grouped[studentNumber].letters.push(letter);
    });
    // Sort letters: highest tier first
    Object.values(grouped).forEach(group => {
      group.letters.sort((a, b) => b.warningTier - a.warningTier);
    });
    return Object.values(grouped);
  };

  // Filtered lists based on search term
  const filteredEligible = eligibleStudents.filter((stud) =>
    stud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stud.icNumber.includes(searchTerm)
  );

  const filteredActive = activeLetters.filter((letter) =>
    letter.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.student.icNumber.includes(searchTerm)
  );
  const groupedActiveLetters = groupLettersByStudent(filteredActive);

  const filteredHistory = historyLetters.filter((letter) =>
    letter.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.student.icNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-wide">
            Surat Amaran
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Pusat Penjanaan dan Pengurusan Surat Amaran Pelajar Kolej Vokasional Arau
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'active'
              ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200'
              }`}
          >
            <FileCheck size={14} />
            Surat Bulan Ini
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'history'
              ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200'
              }`}
          >
            <History size={14} />
            Sejarah Surat
          </button>
        </div>
      </div>

      {/* Info warning thresholds (only on active tab) */}
      {activeTab === 'active' && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 text-xs md:text-sm flex items-start gap-2.5">
          <AlertTriangle className="shrink-0 mt-0.5" size={18} />
          <p className="leading-relaxed">
            <strong>Syarat Penjanaan Surat Amaran:</strong> Surat amaran rasmi dijana dalam format PDF jika rekod kesalahan didaftarkan mencecah kriteria bilangan kes: <strong>Amaran 1</strong> (3 kes), <strong>Amaran 2</strong> (4 kes), dan <strong>Amaran 3 / Penggantungan</strong> (5 kes ke atas).
          </p>
        </div>
      )}

      {/* Global Search Input Box */}
      <div className="flex items-center gap-3 bg-white dark:bg-[#111928]/45 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3.5 py-2 w-full max-w-md shadow-sm">
        <Search className="text-slate-400 dark:text-slate-500 shrink-0" size={18} />
        <input
          type="text"
          placeholder="Cari nama pelajar atau no IC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-0 focus:ring-0 outline-none text-xs md:text-sm w-full text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-sans search-input-field"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-slate-405 hover:text-slate-655 dark:text-slate-500 dark:hover:text-slate-350 cursor-pointer"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* TAB CONTENT: ACTIVE MONTH */}
      {activeTab === 'active' && (
        <div className="space-y-8">
          {/* Section A: Eligible Students (Admin only) */}
          {isAdmin && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-[#be123c]" />
                Pelajar Layak Surat Amaran
              </h2>
              {loading ? (
                <div className="py-8 text-center text-slate-500 text-sm">Memuat naik data...</div>
              ) : filteredEligible.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-900/10 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {searchTerm ? 'Tiada pelajar dijumpai mengikut carian anda.' : 'Tiada pelajar dikesan memenuhi kriteria bilangan kes untuk amaran baru.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEligible.map((stud) => {
                    const badge = getTierBadge(stud.eligibleTier);
                    return (
                      <div
                        key={stud.studentId}
                        className="p-5 rounded-2xl bg-white dark:bg-[#111928]/45 border border-slate-150 dark:border-slate-800/60 shadow-sm flex flex-col justify-between gap-4"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">{stud.name}</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">{stud.icNumber} • {formatClass(stud)}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <span className={badge.className}>{badge.text}</span>
                              <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                {stud.offences.length} kes baru
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          disabled={submitting}
                          onClick={() => handleGenerateDraft(stud.studentId, stud.eligibleTier)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-rose-200 hover:border-rose-300 dark:border-rose-900/30 text-[#be123c] dark:text-rose-455 bg-rose-50/30 hover:bg-rose-50/60 dark:bg-rose-950/10 dark:hover:bg-rose-955/20 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <Plus size={14} />
                          Jana Draf Surat Amaran
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Section B: Current Month Warning Letters List (Timeline/Cards View) */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText size={18} className="text-[#be123c]" />
              Senarai Surat Amaran Bulan Ini ({pastMonthsList[0].label})
            </h2>

            {loading ? (
              <div className="py-12 text-center text-slate-500 text-sm">Memuat naik senarai surat...</div>
            ) : groupedActiveLetters.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-455 text-sm bg-slate-50/50 dark:bg-slate-900/10 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                {searchTerm ? 'Tiada rekod draf surat amaran dijumpai mengikut carian anda.' : 'Tiada rekod surat amaran draf atau dikeluarkan untuk bulan ini.'}
              </div>
            ) : (
              <div className="space-y-6">
                {groupedActiveLetters.map((group) => (
                  <div
                    key={group.student.studentNumber}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111928]/45 border border-slate-150 dark:border-slate-800/60 shadow-sm space-y-4 transition-all hover:shadow-md"
                  >
                    {/* Student Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/60">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">{group.student.name}</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                          {group.student.icNumber} • {formatClass(group.student)}
                        </p>
                      </div>
                      <div className="text-xs text-slate-450 dark:text-slate-400 font-medium">
                        Bilangan surat: <span className="font-bold text-slate-700 dark:text-slate-300">{group.letters.length}</span>
                      </div>
                    </div>

                    {/* Grouped Warning Letters under Student */}
                    <div className="space-y-3">
                      {group.letters.map((letter) => {
                        const badge = getTierBadge(letter.warningTier);
                        const isPending = letter.status === 'PENDING';
                        return (
                          <div
                            key={letter.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/50 dark:border-slate-800/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className={badge.className}>{badge.text}</span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${isPending
                                ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/30'
                                : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/30'
                                }`}>
                                {isPending ? 'Draf / Menunggu Pengesahan' : 'Telah Dikeluarkan'}
                              </span>
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Dijana: {new Date(letter.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              {isPending ? (
                                isAdmin ? (
                                  <>
                                    <button
                                      onClick={() => handleOpenPreview(letter)}
                                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#be123c] hover:bg-[#9f1239] text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm"
                                    >
                                      <Eye size={13} />
                                      Semak & Sahkan
                                    </button>
                                    <button
                                      disabled={submitting}
                                      onClick={() => handleDeleteDraft(letter.id, letter.student.name)}
                                      className="p-2 rounded-lg bg-white hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/20 text-slate-400 hover:text-[#be123c] border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                                      title="Padam Draf"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">Draf (Admin Sahkan)</span>
                                )
                              ) : (
                                <button
                                  onClick={() => handleDownloadPDF(letter.id, letter.warningTier, letter.student.name)}
                                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                                >
                                  <Download size={13} />
                                  Muat Turun PDF
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: HISTORY MONTHS */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Monthly filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Pilih Bulan Sejarah:</span>
            <select
              value={selectedHistoryMonth}
              onChange={(e) => setSelectedHistoryMonth(e.target.value)}
              className="rounded-xl py-2 px-3 text-sm bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
            >
              {pastMonthsList.slice(1).map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* History list */}
          <div className="bg-white dark:bg-[#111928]/45 border border-slate-100 dark:border-slate-850/60 rounded-2xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full border-4 border-indigo-650/30 border-t-indigo-500 animate-spin" />
                <span className="text-slate-555 dark:text-slate-400 text-sm font-medium">Memuat naik sejarah surat amaran...</span>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="py-20 text-center text-slate-555 text-sm">
                {searchTerm ? 'Tiada sejarah surat amaran dijumpai mengikut carian anda.' : 'Tiada surat amaran dikeluarkan pada bulan ini.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-850/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-450 dark:text-slate-400 tracking-wider uppercase">
                      <th className="py-4 px-4">Pelajar</th>
                      <th className="py-4 px-4">Program / Kelas</th>
                      <th className="py-4 px-4">Jenis Amaran</th>
                      <th className="py-4 px-4">Tarikh Dikeluarkan</th>
                      <th className="py-4 px-4 text-right">Muat Turun PDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm text-slate-700 dark:text-slate-300">
                    {filteredHistory.map((letter) => {
                      const badge = getTierBadge(letter.warningTier);
                      const issueDate = letter.issuedDate
                        ? new Date(letter.issuedDate).toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' })
                        : '-';
                      return (
                        <tr
                          key={letter.id}
                          className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors animate-fade-in"
                        >
                          <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">
                            <div className="flex flex-col">
                              <span>{letter.student.name}</span>
                              <span className="text-xs text-slate-400 dark:text-slate-550 font-normal">{letter.student.icNumber}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-455 font-medium">
                            {formatClass(letter.student)}
                          </td>
                          <td className="py-4 px-4">
                            <span className={badge.className}>{badge.text}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-455">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={13} />
                              {issueDate}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDownloadPDF(letter.id, letter.warningTier, letter.student.name)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                            >
                              <Download size={13} />
                              Muat Turun PDF
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: PREVIEW & REVIEW WARNING LETTER (ADMIN ONLY) ================= */}
      {previewOpen && selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white dark:bg-[#0d1321] border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck size={18} className="text-[#be123c]" />
                Semakan Surat Amaran
              </h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Double Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-5 overflow-hidden flex-1">

              {/* Left Pane: Live PDF Preview */}
              <div className="lg:col-span-2 h-[55vh] bg-slate-100 dark:bg-slate-900/60 rounded-2xl flex items-center justify-center border border-slate-200/50 dark:border-slate-800/60 relative overflow-hidden">
                {previewLoading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-4 border-indigo-650/30 border-t-indigo-500 animate-spin" />
                    <span className="text-slate-550 dark:text-slate-400 text-sm font-medium">Menjana pratonton PDF...</span>
                  </div>
                ) : pdfUrl ? (
                  <iframe
                    src={`${pdfUrl}#toolbar=0`}
                    className="w-full h-full border-0 rounded-2xl"
                    title="Warning Letter PDF Preview"
                  />
                ) : (
                  <div className="text-slate-500 text-sm">Gagal memuat naik pratonton PDF.</div>
                )}
              </div>

              {/* Right Pane: Letter Info Details */}
              <div className="flex flex-col justify-between overflow-y-auto pr-2 space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Maklumat Pelajar</h4>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedLetter.student.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{selectedLetter.student.icNumber}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{formatClass(selectedLetter.student)}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100/50 dark:border-rose-900/20 space-y-3">
                    <h4 className="text-xs font-bold text-[#be123c] uppercase tracking-wider">Jenis Surat</h4>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {getTierBadge(selectedLetter.warningTier).text}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rekod Kesalahan Terlibat</h4>
                    <div className="space-y-2 max-h-[22vh] overflow-y-auto pr-1">
                      {selectedLetter.records.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/35 border border-slate-100 dark:border-slate-800/80 text-xs"
                        >
                          <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200">
                            <span>{rec.offenceType.code}</span>
                            <span className="font-mono text-[10px] text-slate-400">{new Date(rec.date).toLocaleDateString('ms-MY')}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">{rec.offenceType.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm & Draft Actions */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-850 space-y-2.5">
                  <button
                    disabled={submitting || previewLoading}
                    onClick={() => handleIssueLetter(selectedLetter.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#be123c] hover:bg-[#9f1239] text-xs font-bold text-white transition-colors cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    <CheckCircle2 size={14} />
                    Sahkan & Muat Turun
                  </button>
                  <button
                    disabled={submitting}
                    onClick={() => handleDeleteDraft(selectedLetter.id, selectedLetter.student.name)}
                    className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-50 hover:bg-rose-50 dark:bg-slate-850 dark:hover:bg-rose-950/20 text-[#be123c] border border-slate-200 dark:border-slate-700/80 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    Padam Draf
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default WarningLetters;
