import bcrypt from 'bcryptjs';
import { closePool, query } from '../config/db.js';

async function main() {
  console.log('Seeding database...');

  await query('DELETE FROM `DisciplinaryRecord`');
  await query('DELETE FROM `WarningLetter`');
  await query('DELETE FROM `Student`');
  await query('DELETE FROM `OffenceType`');
  await query('DELETE FROM `Kursus`');
  await query('DELETE FROM `User`');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const teacherPassword = await bcrypt.hash('teacher123', 10);

  await query(
    'INSERT INTO `User` (username, password, name, role, updatedAt) VALUES (?, ?, ?, ?, NOW(3))',
    ['admin', adminPassword, 'En. Azale (Admin)', 'ADMIN']
  );
  const teacher = await query(
    'INSERT INTO `User` (username, password, name, role, updatedAt) VALUES (?, ?, ?, ?, NOW(3))',
    ['teacher', teacherPassword, 'En. Haswan (Teacher)', 'TEACHER']
  );

  console.log('Users created:', { admin: 'admin', teacher: 'teacher' });

  const kursusList = [
    { code: 'CBG', name: 'Kesetiausahaan Pentadbiran' },
    { code: 'CMD', name: 'Teknologi Automotif' },
    { code: 'CEA', name: 'Teknologi Elektrik' },
    { code: 'CEB', name: 'Teknologi Elektronik' },
    { code: 'CMB', name: 'Teknologi Kimpalan' },
    { code: 'CCA', name: 'Teknologi Pembinaan' },
    { code: 'CMA', name: 'Teknologi Pemesinan Industri' },
    { code: 'CMC', name: 'Teknologi Penyejukan dan Penyamanan Udara' },
  ];

  const dbKursus = [];
  for (const kursus of kursusList) {
    const created = await query(
      'INSERT INTO `Kursus` (code, name) VALUES (?, ?)',
      [kursus.code, kursus.name]
    );
    dbKursus.push({ id: created.insertId, ...kursus });
  }
  console.log('Kursus seeded:', dbKursus.map((k) => k.code));

  const offenceTypes = [
    { code: 'A01', name: 'Truancy (Ponteng Sekolah)', category: 'Major', description: 'Ponteng kelas atau sekolah tanpa sebab munasabah.' },
    { code: 'A02', name: 'Smoking / Vaping (Merokok / Vape)', category: 'Major', description: 'Membawa atau menggunakan rokok/vape di kawasan kolej.' },
    { code: 'A03', name: 'Vandalism (Merosakkan Harta Benda)', category: 'Major', description: 'Merosakkan kemudahan kolej secara sengaja.' },
    { code: 'A04', name: 'Bullying / Fighting (Buli / Bergaduh)', category: 'Major', description: 'Melakukan buli fizikal/mental atau bergaduh.' },
    { code: 'B01', name: 'Late for Class (Lewat Masuk Kelas)', category: 'Medium', description: 'Kerap lewat masuk kelas tanpa alasan.' },
    { code: 'B02', name: 'Inappropriate Attire (Rambut / Pakaian)', category: 'Medium', description: 'Rambut panjang, tidak kemas, atau pakaian tidak mematuhi etika kolej.' },
    { code: 'B03', name: 'Rude Behavior (Biadap)', category: 'Medium', description: 'Bersikap tidak sopan kepada pensyarah atau kakitangan kolej.' },
    { code: 'C01', name: 'Unfinished Homework (Tidak Siap Tugasan)', category: 'Minor', description: 'Gagal menyiapkan tugasan amali/teori.' },
    { code: 'C02', name: 'Classroom Disruption (Bising dalam Kelas)', category: 'Minor', description: 'Mengganggu sesi pengajaran dan pembelajaran.' },
  ];

  const dbOffences = [];
  for (const offenceType of offenceTypes) {
    const created = await query(
      'INSERT INTO `OffenceType` (code, name, category, description) VALUES (?, ?, ?, ?)',
      [offenceType.code, offenceType.name, offenceType.category, offenceType.description]
    );
    dbOffences.push({ id: created.insertId, ...offenceType });
  }
  console.log('Offence types seeded.');

  const cmcKursus = dbKursus.find((k) => k.code === 'CMC');
  const cebKursus = dbKursus.find((k) => k.code === 'CEB');
  const cmaKursus = dbKursus.find((k) => k.code === 'CMA');
  const cmdKursus = dbKursus.find((k) => k.code === 'CMD');

  const students = [
    {
      studentNumber: 'K011QCMC012',
      icNumber: '060504021111',
      name: 'Ahmad Danial bin Kassim',
      email: 'ahmad.danial@student.edu.my',
      studentPhone: '+601123456789',
      kursusId: cmcKursus?.id || dbKursus[0].id,
      cohort: 2026,
      programType: 'SVM',
      semester: 4,
      status: 'ACTIVE',
      parentName: 'Kassim bin Ali',
      parentPhone: '+60123456789',
    },
    {
      studentNumber: 'K011QCEB008',
      icNumber: '060908022222',
      name: 'Siti Nur Aishah binti Omar',
      email: 'siti.nur.aishah@student.edu.my',
      studentPhone: '+601198765432',
      kursusId: cebKursus?.id || dbKursus[0].id,
      cohort: 2026,
      programType: 'SVM',
      semester: 2,
      status: 'ACTIVE',
      parentName: 'Omar bin Hassan',
      parentPhone: '+60198765432',
    },
    {
      studentNumber: 'K011QCMA005',
      icNumber: '050201083333',
      name: 'Chong Wei Ming',
      email: 'chong.wei.ming@student.edu.my',
      studentPhone: '+601134445555',
      kursusId: cmaKursus?.id || dbKursus[0].id,
      cohort: 2025,
      programType: 'SVM',
      semester: 4,
      status: 'ACTIVE',
      parentName: 'Chong Swee Keat',
      parentPhone: '+60134445555',
    },
    {
      studentNumber: 'K011QCMD015',
      icNumber: '061212094444',
      name: 'Muhammad Harith bin Roslan',
      email: 'muhammad.harith@student.edu.my',
      studentPhone: '+601175556666',
      kursusId: cmdKursus?.id || dbKursus[0].id,
      cohort: 2026,
      programType: 'SVM',
      semester: 1,
      status: 'ACTIVE',
      parentName: 'Roslan bin Ahmad',
      parentPhone: '+60175556666',
    },
  ];

  for (const student of students) {
    await query(
      `INSERT INTO \`Student\`
        (studentNumber, icNumber, name, email, studentPhone, kursusId, cohort, programType, semester, status, parentName, parentPhone, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))`,
      [
        student.studentNumber, student.icNumber, student.name, student.email, student.studentPhone,
        student.kursusId, student.cohort, student.programType, student.semester, student.status,
        student.parentName, student.parentPhone,
      ]
    );
  }
  console.log('Students seeded.');

  const teacherId = teacher.insertId;
  const byCode = (code) => dbOffences.find((offence) => offence.code === code)?.id || dbOffences[0].id;
  const records = [
    ['K011QCMC012', byCode('A01'), '2026-05-10T10:00:00Z', 'Ponteng kelas sewaktu sesi amali dijalankan.'],
    ['K011QCMC012', byCode('B01'), '2026-05-15T08:30:00Z', 'Kerap lewat masuk ke bengkel.'],
    ['K011QCMC012', byCode('B02'), '2026-06-02T09:00:00Z', 'Rambut panjang dan tidak mengikut peraturan kolej.'],
    ['K011QCMC012', byCode('A02'), '2026-06-15T14:00:00Z', 'Membawa vape ke kawasan asrama kolej.'],
    ['K011QCEB008', byCode('B01'), '2026-06-01T08:15:00Z', 'Lewat perhimpunan pagi hari Isnin.'],
    ['K011QCEB008', byCode('C01'), '2026-06-10T11:00:00Z', 'Gagal menghantar tugasan laporan amali sistem komputer.'],
    ['K011QCMA005', byCode('B03'), '2026-06-05T10:30:00Z', 'Melawan cakap pensyarah di dalam kelas.'],
  ];

  for (const [studentId, offenceTypeId, date, description] of records) {
    await query(
      `INSERT INTO \`DisciplinaryRecord\` (studentId, offenceTypeId, teacherId, date, description)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, offenceTypeId, teacherId, new Date(date), description]
    );
  }
  console.log('Sample disciplinary records seeded.');
  console.log('Database seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
