import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FolderOpen,
  Phone,
  Calendar,
  Eye,
  X,
  AlertTriangle,
  User,
  GraduationCap,
  Ban,
  CheckCircle2,
  LogOut,
  Settings,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  UserCheck,
  Users,
  Upload,
} from 'lucide-react';

// UI Helpers to match the reference design

const formatIC = (ic) => {
  if (!ic) return '';
  const clean = ic.replace(/-/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 6)}-${clean.slice(6, 8)}-${clean.slice(8)}`;
  }
  return ic;
};

const getDisciplineStatus = (offenceCount) => {
  if (offenceCount >= 4) {
    return {
      text: 'Surat Dikeluarkan',
      className: 'inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-rose-50 dark:bg-[#3b0b14] text-rose-700 dark:text-[#f43f5e] border border-rose-200 dark:border-[#e11d48]/25'
    };
  } else if (offenceCount > 0) {
    return {
      text: 'Dalam Pemantauan',
      className: 'inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#fef3c7] dark:bg-[#78350f]/35 text-[#d97706] dark:text-[#fbbf24] border border-[#f59e0b]/25 dark:border-[#d97706]/20'
    };
  } else {
    return {
      text: 'Bersih',
      className: 'inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#059669] dark:text-[#34d399] border border-[#10b981]/20 dark:border-[#059669]/15'
    };
  }
};

const getAcademicStatus = (status) => {
  const mapping = {
    ACTIVE: {
      text: 'Aktif',
      className: 'inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#059669] dark:text-[#34d399] border border-[#10b981]/20'
    },
    SUSPENDED: {
      text: 'Digantung',
      className: 'inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200/30'
    },
    GRADUATED: {
      text: 'Tamat Pengajian',
      className: 'inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200/30'
    },
    WITHDRAWN: {
      text: 'Berhenti',
      className: 'inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200'
    }
  };
  return mapping[status] || { text: status, className: '' };
};

const Students = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [kursusFilter, setKursusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'class'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Data States
  const [students, setStudents] = useState([]);
  const [kursusList, setKursusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Promotion Management States
  const [promotionMode, setPromotionMode] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // Form Modal States
  const [formOpen, setFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Set to student object if editing
  const [studentNumber, setStudentNumber] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [name, setName] = useState('');
  const [kursusId, setKursusId] = useState('');
  const [cohort, setCohort] = useState('');
  const [programType, setProgramType] = useState('SVM');
  const [semester, setSemester] = useState('1');
  const [status, setStatus] = useState('ACTIVE');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Profile Modal State
  const [profileOpen, setProfileOpen] = useState(false);

  // CSV Import States
  const [importOpen, setImportOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState(null); // { headers: [], rows: [] }
  const [importErrors, setImportErrors] = useState([]);
  const [importSuccess, setImportSuccess] = useState('');
  const [importing, setImporting] = useState(false);

  // Filter and sort students dynamically on the frontend
  const filteredStudents = students.filter((student) => {
    if (activeTab === 'active' && student.status !== 'ACTIVE') return false;
    if (activeTab === 'history' && student.status === 'ACTIVE') return false;

    // Course filter
    if (kursusFilter && student.kursusId !== parseInt(kursusFilter)) return false;

    // Semester filter
    if (semesterFilter && student.semester !== parseInt(semesterFilter)) return false;

    // Class filter (e.g. SVM-1-2)
    if (classFilter) {
      const [progType, semStr, kIdStr] = classFilter.split('-');
      const sem = parseInt(semStr);
      const kId = parseInt(kIdStr);
      if (
        student.programType !== progType ||
        student.semester !== sem ||
        student.kursusId !== kId
      ) {
        return false;
      }
    }

    return true;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'class') {
      comparison = a.className.localeCompare(b.className);
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const fetchKursusList = async () => {
    try {
      const response = await API.get('/students/kursus');
      setKursusList(response.data);
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const getClassList = () => {
    const list = [];
    for (let sem = 1; sem <= 4; sem++) {
      for (const k of kursusList) {
        list.push({
          label: `${sem} SVM ${k.code}`,
          value: `SVM-${sem}-${k.id}`,
        });
      }
    }
    for (let sem = 5; sem <= 9; sem++) {
      for (const k of kursusList) {
        list.push({
          label: `${sem - 4} DVM ${k.code}`,
          value: `DVM-${sem}-${k.id}`,
        });
      }
    }
    return list;
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (kursusFilter) params.kursusId = kursusFilter;

      const response = await API.get('/students', { params });
      setStudents(response.data);
    } catch (err) {
      console.error('Failed to load students:', err);
      setError('Gagal memuat naik data direktori pelajar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKursusList();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [search, kursusFilter]);

  const handleOpenCreateForm = () => {
    setSelectedStudent(null);
    setStudentNumber('');
    setName('');
    setIcNumber('');
    setKursusId(kursusList[0]?.id || '');
    setCohort(new Date().getFullYear().toString());
    setProgramType('SVM');
    setSemester('1');
    setStatus('ACTIVE');
    setParentName('');
    setParentPhone('');
    setEmail('');
    setStudentPhone('');
    setFormError('');
    setFormOpen(true);
  };

  const handleOpenEditForm = (student) => {
    setSelectedStudent(student);
    setStudentNumber(student.studentNumber);
    setName(student.name);
    setIcNumber(student.icNumber);
    setKursusId(student.kursusId);
    setCohort(student.cohort.toString());
    setProgramType(student.programType);
    setSemester(student.semester.toString());
    setStatus(student.status);
    setParentName(student.parentName);
    setParentPhone(student.parentPhone);
    setEmail(student.email || '');
    setStudentPhone(student.studentPhone || '');
    setFormError('');
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedStudent(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    if (icNumber.replace(/-/g, '').length !== 12) {
      setFormError('No. Kad Pengenalan mestilah mengandungi 12 digit nombor.');
      setSubmitting(false);
      return;
    }

    if (!studentNumber.trim()) {
      setFormError('No. Pelajar (Student ID) diperlukan.');
      setSubmitting(false);
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Sila masukkan alamat email yang sah.');
      setSubmitting(false);
      return;
    }

    if (!studentPhone.trim() || studentPhone.trim().length < 6) {
      setFormError('Sila masukkan no. telefon pelajar yang sah (minima 6 digit).');
      setSubmitting(false);
      return;
    }

    const payload = {
      studentNumber: studentNumber.trim().toUpperCase(),
      icNumber: icNumber.replace(/-/g, '').trim(),
      name: name.trim(),
      email: email.trim(),
      studentPhone: studentPhone.trim(),
      kursusId: parseInt(kursusId),
      cohort: parseInt(cohort),
      programType,
      semester: parseInt(semester),
      status,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
    };

    try {
      if (selectedStudent) {
        // Update Student
        await API.put(`/students/${selectedStudent.studentNumber}`, payload);
      } else {
        // Create Student
        await API.post('/students', payload);
      }
      fetchStudents();
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save student details:', err);
      setFormError(err.response?.data?.message || 'Gagal menyimpan rekod maklumat pelajar.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (studentId, studentName) => {
    if (window.confirm(`Adakah anda pasti mahu memadam profil pelajar "${studentName}"? Semua rekod salah laku pelajar ini juga akan dipadamkan.`)) {
      try {
        await API.delete(`/students/${studentId}`);
        fetchStudents();
      } catch (err) {
        console.error('Failed to delete student:', err);
        alert(err.response?.data?.message || 'Gagal memadam profil pelajar.');
      }
    }
  };

  // ================= CSV IMPORT HANDLERS =================
  const handleOpenImport = () => {
    setImportOpen(true);
    setCsvFile(null);
    setCsvPreview(null);
    setImportErrors([]);
    setImportSuccess('');
  };

  const handleCloseImport = () => {
    setImportOpen(false);
    setCsvFile(null);
    setCsvPreview(null);
    setImportErrors([]);
    setImportSuccess('');
  };

  const handleDownloadTemplate = () => {
    const headers = 'NAMA PENUH,NO IC,NO PELAJAR,KELAS,KOHORT,EMAIL,TEL PELAJAR,NAMA PENJAGA,TEL PENJAGA,ALAMAT,POSKOD,BANDAR,NEGERI,KAUM\n';
    const sampleData = 'Syed Danish bin Syed Azhar,040404021234,K011QCEA099,5 DVM CEA,2024,syed.danish@student.edu.my,+601122334455,Syed Azhar,+601999887766,No. 12 Jalan 3,02600,Arau,Perlis,Melayu\n';
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + sampleData);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'templat_pelajar.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCsvFile(file);
    setImportErrors([]);
    setImportSuccess('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length > 0) {
        // Parse up to 6 lines for preview
        const rows = lines.slice(0, 6).map(line => {
          const cols = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              cols.push(current);
              current = '';
            } else {
              current += char;
            }
          }
          cols.push(current);
          return cols;
        });

        const headers = rows[0].map(h => h.trim());
        const dataPreview = rows.slice(1).map(row => {
          const item = {};
          headers.forEach((h, i) => {
            item[h] = row[i]?.trim() || '';
          });
          return item;
        });
        setCsvPreview({ headers, rows: dataPreview });
      }
    };
    reader.readAsText(file);
  };

  const handleImportSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      alert('Sila pilih fail CSV terlebih dahulu.');
      return;
    }

    setImporting(true);
    setImportErrors([]);
    setImportSuccess('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvText = event.target.result;
      try {
        const response = await API.post('/students/import', { csvText });
        const { successCount, errorCount, errors } = response.data;

        if (errorCount === 0) {
          setImportSuccess(`Berjaya mengimport ${successCount} pelajar! Semua data berjaya dimasukkan.`);
          fetchStudents();
        } else {
          setImportSuccess(`Import selesai dengan beberapa ralat. ${successCount} pelajar berjaya dimasukkan, ${errorCount} gagal.`);
          setImportErrors(errors);
          fetchStudents();
        }
      } catch (err) {
        console.error('Failed to import students:', err);
        alert(err.response?.data?.message || 'Ralat semasa memuat naik fail CSV.');
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(csvFile);
  };

  const handleOpenProfile = async (studentId) => {
    try {
      const response = await API.get(`/students/${studentId}`);
      setSelectedStudent(response.data);
      setProfileOpen(true);
    } catch (err) {
      console.error('Failed to load student profile:', err);
      alert('Gagal memuat naik profil pelajar.');
    }
  };

  // Promotion Multi-select Logic
  const handleToggleSelectStudent = (studentId) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    if (selectedStudentIds.length === sortedStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(sortedStudents.map(s => s.studentNumber));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExecutePromotion = async (action) => {
    if (selectedStudentIds.length === 0) {
      alert('Sila pilih sekurang-kurangnya seorang pelajar untuk dinaikkan kelas/semester.');
      return;
    }

    let confirmMsg = '';
    if (action === 'PROMOTE') {
      confirmMsg = `Adakah anda pasti mahu menaikkan kelas/semester bagi ${selectedStudentIds.length} pelajar yang dipilih?`;
    } else if (action === 'TRANSITION_DVM') {
      confirmMsg = `Adakah anda pasti mahu menaikkan ${selectedStudentIds.length} pelajar terpilih ke program DVM Semester 5?`;
    } else if (action === 'GRADUATE') {
      confirmMsg = `Adakah anda pasti mahu menetapkan status Tamat Pengajian (Graduasi) untuk ${selectedStudentIds.length} pelajar terpilih?`;
    }

    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    try {
      const response = await API.post('/students/promote', {
        studentIds: selectedStudentIds,
        action
      });
      alert(response.data.message);
      setSelectedStudentIds([]);
      setPromotionMode(false);
      fetchStudents();
    } catch (err) {
      console.error('Failed to promote students:', err);
      alert(err.response?.data?.message || 'Gagal melancarkan operasi kenaikan kelas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-wide">
            Data Pelajar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {filteredStudents.length} pelajar ({activeTab === 'active' ? 'Aktif' : 'Sejarah / Inaktif'})
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 dark:bg-[#0d1321]/50 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl self-start sm:self-center">
          <button
            onClick={() => {
              setActiveTab('active');
              setPromotionMode(false);
              setSelectedStudentIds([]);
              setClassFilter('');
              setKursusFilter('');
              setSemesterFilter('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'active'
              ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200'
              }`}
          >
            <UserCheck size={14} />
            Pelajar Aktif
          </button>
          <button
            onClick={() => {
              setActiveTab('history');
              setPromotionMode(false);
              setSelectedStudentIds([]);
              setClassFilter('');
              setKursusFilter('');
              setSemesterFilter('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'history'
              ? 'bg-white dark:bg-slate-850 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200'
              }`}
          >
            <Users size={14} />
            Sejarah / Inaktif
          </button>
        </div>

        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2">
            {activeTab === 'active' && (
              <button
                onClick={() => {
                  setPromotionMode(!promotionMode);
                  setSelectedStudentIds([]);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${promotionMode
                  ? 'bg-rose-50 border-rose-200 text-[#be123c] dark:bg-rose-950/20 dark:border-rose-900/30'
                  : 'bg-white hover:bg-slate-50 dark:bg-[#0d1321] dark:hover:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350'
                  }`}
              >
                <Settings size={14} />
                {promotionMode ? 'Tutup Pengurusan Naik Kelas' : 'Naik Kelas'}
              </button>
            )}
            <button
              onClick={handleOpenImport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-[#0d1321] text-xs font-bold text-slate-700 dark:text-slate-350 transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              <Upload size={14} />
              Import CSV
            </button>
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#be123c] hover:bg-[#9f1239] dark:bg-[#be123c] dark:hover:bg-[#9f1239] text-xs font-bold text-white transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              Tambah Pelajar
            </button>
          </div>
        )}
      </div>

      {/* Promotion Action Toolbar (Visible in promotion mode) */}
      {promotionMode && isAdmin && (
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-150 dark:border-indigo-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="text-indigo-650 dark:text-indigo-400 shrink-0" size={20} />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Mod Pengurusan Naik Kelas</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedStudentIds.length} pelajar dipilih daripada {sortedStudents.length}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleExecutePromotion('PROMOTE')}
              disabled={selectedStudentIds.length === 0}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              Naik Semester (+1 Sem)
            </button>
            <button
              onClick={() => handleExecutePromotion('TRANSITION_DVM')}
              disabled={selectedStudentIds.length === 0}
              className="px-3.5 py-2 rounded-xl bg-[#be123c] hover:bg-[#9f1239] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              Naik DVM (Sem 4 ➔ Sem 5)
            </button>
            <button
              onClick={() => handleExecutePromotion('GRADUATE')}
              disabled={selectedStudentIds.length === 0}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              Tamat Pengajian (Graduasi)
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, No Pelajar, IC, telefon..."
            className="w-full rounded-xl py-2.5 pl-9 pr-4 text-xs bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Course Filter */}
        <select
          value={kursusFilter}
          onChange={(e) => setKursusFilter(e.target.value)}
          className="rounded-xl py-2 px-3 text-xs bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
        >
          <option value="">Semua Kursus</option>
          {kursusList.map((k) => (
            <option key={k.id} value={k.id}>
              {k.name} ({k.code})
            </option>
          ))}
        </select>

        {/* Semester Filter */}
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="rounded-xl py-2 px-3 text-xs bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 focus:outline-none focus:border-rose-500 transition-colors cursor-pointer bg-transparent"
        >
          <option value="">Semua Semester</option>
          <option value="1">Semester 1 (SVM)</option>
          <option value="2">Semester 2 (SVM)</option>
          <option value="3">Semester 3 (SVM)</option>
          <option value="4">Semester 4 (SVM)</option>
          <option value="5">Semester 1 (DVM / Sem 5)</option>
          <option value="6">Semester 2 (DVM / Sem 6)</option>
          <option value="7">Semester 3 (DVM / Sem 7)</option>
          <option value="8">Semester 4 (DVM / Sem 8)</option>
          <option value="9">Semester 5 (DVM / Sem 9)</option>
        </select>

        {/* Class Filter */}
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="rounded-xl py-2 px-3 text-xs bg-white dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 focus:outline-none focus:border-rose-500 transition-colors cursor-pointer bg-transparent"
        >
          <option value="">Semua Kelas</option>
          {getClassList().map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table / List Container */}
      <div className="bg-white dark:bg-[#111928]/45 border border-slate-100 dark:border-slate-850/60 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-600/30 border-t-indigo-500 animate-spin" />
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Memuat naik senarai pelajar...</span>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-rose-500 font-medium">{error}</div>
        ) : sortedStudents.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            <FolderOpen className="mx-auto mb-3 opacity-30" size={40} />
            Tiada pelajar ditemui. Sila cuba kata kunci carian yang lain.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-850/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-450 dark:text-slate-400 tracking-wider uppercase">
                  {promotionMode && isAdmin && (
                    <th className="py-3 px-3 text-center w-10">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.length === sortedStudents.length && sortedStudents.length > 0}
                        onChange={handleSelectAllStudents}
                        className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 cursor-pointer"
                      />
                    </th>
                  )}
                  <th
                    className="py-3 px-3 w-[20%] cursor-pointer select-none hover:text-slate-850 dark:hover:text-white transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Nama Pelajar
                      {sortBy === 'name' ? (sortOrder === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : <ArrowUpDown size={11} className="opacity-35" />}
                    </div>
                  </th>
                  <th className="py-3 px-3 w-[11%]">No. Pelajar</th>
                  <th className="py-3 px-3 w-[13%]">No. Kad Pengenalan</th>
                  <th
                    className="py-3 px-3 w-[10%] cursor-pointer select-none hover:text-slate-850 dark:hover:text-white transition-colors"
                    onClick={() => handleSort('class')}
                  >
                    <div className="flex items-center gap-1">
                      Kelas
                      {sortBy === 'class' ? (sortOrder === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : <ArrowUpDown size={11} className="opacity-35" />}
                    </div>
                  </th>
                  <th className="py-3 px-3 w-[11%]">Telefon</th>
                  <th className="py-3 px-3 w-[7%] text-center !text-center">Kes</th>
                  <th className="py-3 px-3 w-[10%] text-center !text-center">Status Disiplin</th>
                  <th className="py-3 px-3 w-[10%] text-center !text-center">Status Akademik</th>
                  <th className="py-3 px-3 w-[8%] text-right !text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm text-slate-700 dark:text-slate-300">
                {sortedStudents.map((student) => {
                  const disciplineInfo = getDisciplineStatus(student.offenceCount);
                  const academicInfo = getAcademicStatus(student.status);
                  const isChecked = selectedStudentIds.includes(student.studentNumber);
                  return (
                    <tr
                      key={student.studentNumber}
                      className={`hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors animate-fade-in ${isChecked ? 'bg-indigo-50/20 dark:bg-indigo-950/5' : ''
                        }`}
                    >
                      {/* Checkbox Column */}
                      {promotionMode && isAdmin && (
                        <td className="py-3 px-3 text-center w-10">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelectStudent(student.studentNumber)}
                            className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 cursor-pointer"
                          />
                        </td>
                      )}

                      {/* NAMA PELAJAR */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-sm shrink-0">
                            {student.name ? student.name.charAt(0).toUpperCase() : 'P'}
                          </div>
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleOpenProfile(student.studentNumber)}
                              className="font-semibold text-slate-900 dark:text-white hover:text-[#be123c] dark:hover:text-rose-455 transition-colors text-left focus:outline-none cursor-pointer leading-tight text-[13px] md:text-sm"
                            >
                              {student.name}
                            </button>
                            <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-normal">
                              {student.email || 'Tiada Email'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* NO PELAJAR */}
                      <td className="py-3 px-3 text-slate-650 dark:text-slate-400 font-medium text-[13px]">
                        {student.studentNumber}
                      </td>

                      {/* NO. IC/PASPORT */}
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                        {formatIC(student.icNumber)}
                      </td>

                      {/* KELAS */}
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-semibold text-[13px]">
                        {student.className}
                      </td>

                      {/* TELEFON */}
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                        {student.studentPhone || 'N/A'}
                      </td>

                      {/* KES COUNT */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold whitespace-nowrap ${student.offenceCount >= 4
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                            : student.offenceCount > 0
                              ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200/20'
                            }`}
                        >
                          {student.offenceCount} kes
                        </span>
                      </td>

                      {/* DISCIPLINE STATUS BADGE */}
                      <td className="py-3 px-3 text-center">
                        <span className={disciplineInfo.className}>
                          {disciplineInfo.text}
                        </span>
                      </td>

                      {/* ACADEMIC STATUS BADGE */}
                      <td className="py-3 px-3 text-center">
                        <span className={academicInfo.className}>
                          {academicInfo.text}
                        </span>
                      </td>

                      {/* TINDAKAN */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-end gap-3.5">
                          <button
                            onClick={() => handleOpenProfile(student.studentNumber)}
                            className="text-slate-400 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors p-1 cursor-pointer"
                            title="Lihat Profil"
                          >
                            <Eye size={15} />
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => handleOpenEditForm(student)}
                                className="text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors p-1 cursor-pointer"
                                title="Kemaskini"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(student.studentNumber, student.name)}
                                className="text-slate-400 hover:text-[#be123c] dark:text-slate-500 dark:hover:text-[#be123c] transition-colors p-1 cursor-pointer"
                                title="Padam"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT STUDENT ================= */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#0d1321] border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedStudent ? 'Kemaskini Maklumat Pelajar' : 'Daftar Pelajar Baru'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm">
                <AlertTriangle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Nama Penuh Pelajar</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ahmad Danial bin Kassim"
                  className="w-full rounded-xl px-4 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                  required
                />
              </div>

              {/* Email & Student Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Alamat Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. danial@student.edu.my"
                    className="w-full rounded-xl px-4 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">No. Telefon Pelajar</label>
                  <input
                    type="text"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="e.g. +60123456789"
                    className="w-full rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Student Number & IC Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">No. Pelajar (Student ID)</label>
                  <input
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="e.g. K011QCEA018"
                    className="w-full rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900/50 disabled:text-slate-450 dark:disabled:text-slate-500 disabled:cursor-not-allowed"
                    disabled={!!selectedStudent}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">No. Kad Pengenalan</label>
                  <input
                    type="text"
                    value={icNumber}
                    onChange={(e) => setIcNumber(e.target.value)}
                    placeholder="e.g. 060504021111"
                    maxLength={12}
                    className="w-full rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Course & Cohort */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Kursus</label>
                  <select
                    value={kursusId}
                    onChange={(e) => setKursusId(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-850 dark:text-white bg-transparent"
                    required
                  >
                    <option value="">Pilih Kursus...</option>
                    {kursusList.map(k => (
                      <option key={k.id} value={k.id}>{k.name} ({k.code})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Kohort (Tahun Masuk)</label>
                  <input
                    type="number"
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full rounded-xl px-4 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Program Type, Semester & Academic Status */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Jenis Program</label>
                  <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-850 dark:text-white bg-transparent"
                    required
                  >
                    <option value="SVM">SVM</option>
                    <option value="DVM">DVM</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-850 dark:text-white bg-transparent"
                    required
                  >
                    {programType === 'SVM' ? (
                      <>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>
                    ) : (
                      <>
                        <option value="5">5 (1 DVM)</option>
                        <option value="6">6 (2 DVM)</option>
                        <option value="7">7 (3 DVM)</option>
                        <option value="8">8 (4 DVM)</option>
                        <option value="9">9 (5 DVM)</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Status Pelajar</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-850 dark:text-white bg-transparent"
                    required
                  >
                    <option value="ACTIVE">Aktif</option>
                    <option value="SUSPENDED">Digantung</option>
                    <option value="GRADUATED">Tamat (Graduasi)</option>
                    <option value="WITHDRAWN">Berhenti</option>
                  </select>
                </div>
              </div>

              {/* Parent Details */}
              <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Maklumat Penjaga</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Nama Ibu Bapa / Penjaga</label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Kassim bin Ali"
                      className="w-full rounded-xl px-4 py-2.5 text-xs focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">No. Telefon Hubungi</label>
                    <input
                      type="text"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="e.g. +60123456789"
                      className="w-full rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#be123c] hover:bg-[#9f1239] text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Maklumat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: STUDENT PROFILE & HISTORY ================= */}
      {profileOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white dark:bg-[#0d1321] border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User size={18} className="text-indigo-650 dark:text-indigo-400" />
                Profil Pelajar & Rekod Disiplin
              </h3>
              <button
                onClick={() => setProfileOpen(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-5 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 px-4 rounded-xl mt-4 shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">Nama Penuh</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{selectedStudent.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">No. Pelajar</span>
                <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{selectedStudent.studentNumber}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">No. Kad Pengenalan</span>
                <p className="text-xs font-mono text-slate-700 dark:text-slate-300">{formatIC(selectedStudent.icNumber)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">Kelas & Kohort</span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-305">{selectedStudent.className} (K{selectedStudent.cohort})</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">Nama Ibu Bapa / Penjaga</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">{selectedStudent.parentName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">No. Telefon Penjaga</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-mono">
                  <Phone size={12} className="text-emerald-600 dark:text-emerald-450 shrink-0" />
                  {selectedStudent.parentPhone}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">Status Akademik</span>
                <div>
                  <span className={getAcademicStatus(selectedStudent.status).className}>
                    {getAcademicStatus(selectedStudent.status).text}
                  </span>
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">Alamat Email</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 truncate">{selectedStudent.email || 'N/A'}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 tracking-wider">No. Telefon Pelajar</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-mono">
                  <Phone size={12} className="text-emerald-600 dark:text-emerald-450 shrink-0" />
                  {selectedStudent.studentPhone || 'N/A'}
                </p>
              </div>
            </div>

            {/* Misconduct History list */}
            <div className="flex-1 overflow-y-auto mt-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                Sejarah Pelanggaran Disiplin ({selectedStudent.records.length} kes didaftarkan)
              </h4>

              {selectedStudent.records.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                  Pelajar ini bersih daripada sebarang salah laku disiplin.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedStudent.records.map((rec) => {
                    const recDate = new Date(rec.date).toLocaleDateString('ms-MY', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    return (
                      <div
                        key={rec.id}
                        className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-indigo-650 dark:text-indigo-405 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-900/40">
                              {rec.offenceType.code}
                            </span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {rec.offenceType.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.offenceType.category === 'Major'
                                ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450'
                                : rec.offenceType.category === 'Medium'
                                  ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400'
                                  : 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-450'
                                }`}
                            >
                              {rec.offenceType.category === 'Major' ? 'Serious' : rec.offenceType.category === 'Medium' ? 'Moderate' : 'Minor'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono font-medium">
                            <Calendar size={13} />
                            {recDate}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-100/55 dark:bg-slate-950/20 p-3 rounded-lg border border-slate-200 dark:border-slate-900">
                          {rec.description}
                        </p>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between items-center">
                          <span>Didaftarkan oleh: <strong className="text-slate-700 dark:text-slate-400">{rec.teacher.name}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end mt-4 shrink-0">
              <button
                onClick={() => setProfileOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-305 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ================= MODAL: CSV BULK IMPORT ================= */}
      {importOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0d1321] border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload size={18} className="text-indigo-600 dark:text-indigo-400" />
                Import Pelajar Secara Pukal (CSV)
              </h3>
              <button
                onClick={handleCloseImport}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                disabled={importing}
              >
                <X size={20} />
              </button>
            </div>

            {/* Explanatory Info */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-150 dark:border-indigo-900/20 text-xs space-y-2 text-slate-700 dark:text-slate-350">
              <p className="font-semibold text-indigo-750 dark:text-indigo-400">
                Garis Panduan Import Data:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fail yang dimuat naik mestilah dalam format <strong>CSV (Comma Separated Values)</strong>.</li>
                <li>Sistem menyokong format eksport terus dari Google Sheets. Kolum tambahan yang tidak diperlukan akan diabaikan secara automatik.</li>
                <li>Kolum wajib di dalam fail CSV anda:
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">NAMA PENUH</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">NO IC</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">NO PELAJAR</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">KELAS</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">KOHORT</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">EMAIL</code>,
                  <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded mx-1 text-slate-900 dark:text-indigo-300 font-bold">TEL PELAJAR</code>.
                </li>
                <li>Siri kelas di dalam kolum <strong>KELAS</strong> mestilah berformat: <code className="font-bold">Semester [jarak] SVM/DVM [jarak] Kod Kursus</code> (cth: <code className="bg-slate-150 dark:bg-slate-800 px-1 rounded font-mono">1 SVM CMB</code> atau <code className="bg-slate-150 dark:bg-slate-800 px-1 rounded font-mono">5 DVM CEA</code>).</li>
                <li>Sila masukkan kolum <strong>NAMA PENJAGA</strong> dan <strong>TEL PENJAGA</strong> jika ada.</li>
              </ul>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="mt-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1.5"
              >
                📥 Muat Turun Templat Contoh CSV
              </button>
            </div>

            {/* Status Reports */}
            {importSuccess && (
              <div className={`p-4 rounded-xl border text-sm ${importErrors.length > 0
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                <p className="font-bold">{importSuccess}</p>
              </div>
            )}

            {/* Error logs */}
            {importErrors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider font-sans">Senarai Ralat Rujukan Fail (Import Dilangkau Bagi Baris Ini):</h4>
                <div className="max-h-40 overflow-y-auto border border-rose-500/20 bg-rose-500/5 rounded-xl p-3 space-y-1.5 text-xs text-rose-600 dark:text-rose-400 font-mono">
                  {importErrors.map((err, idx) => (
                    <div key={idx}>• Baris {err.line}: {err.message}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area Form */}
            <form onSubmit={handleImportSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Fail CSV</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-650 dark:file:bg-slate-800 dark:file:text-indigo-400 file:cursor-pointer cursor-pointer border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-white dark:bg-transparent"
                    disabled={importing}
                    required
                  />
                </div>
              </div>

              {/* Data Preview */}
              {csvPreview && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Previu 5 Baris Data Pertama:</h4>
                  <div className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-450 dark:text-slate-400 uppercase font-bold">
                          {csvPreview.headers.map((h, i) => (
                            <th key={i} className="py-2 px-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-600 dark:text-slate-350">
                        {csvPreview.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                            {csvPreview.headers.map((h, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 truncate max-w-xs">{row[h]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseImport}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  disabled={importing}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  disabled={importing || !csvFile}
                >
                  {importing ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Mengimport...
                    </>
                  ) : (
                    'Muat Naik & Import Pelajar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
