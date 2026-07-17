import { PrismaClient } from '../src/generated/client_new/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing records in correct order to respect foreign key constraints
  await prisma.warningLetter.deleteMany({});
  await prisma.disciplinaryRecord.deleteMany({});
  await prisma.offenceType.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.kursus.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create standard users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const teacherPassword = await bcrypt.hash('teacher123', 10);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      name: 'En. Azale (Admin)',
      role: 'ADMIN',
    },
  });

  const teacher = await prisma.user.create({
    data: {
      username: 'teacher',
      password: teacherPassword,
      name: 'En. Haswan (Teacher)',
      role: 'TEACHER',
    },
  });

  console.log('Users created:', { admin: admin.username, teacher: teacher.username });

  // 3. Seed Fixed Courses (Kursus)
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
  for (const k of kursusList) {
    const created = await prisma.kursus.create({ data: k });
    dbKursus.push(created);
  }
  console.log('Kursus seeded:', dbKursus.map(k => k.code));

  // 4. Create standard offence types
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

  for (const ot of offenceTypes) {
    await prisma.offenceType.create({ data: ot });
  }
  console.log('Offence types seeded.');

  // Find Kursus IDs
  const cmcKursus = dbKursus.find(k => k.code === 'CMC');
  const cebKursus = dbKursus.find(k => k.code === 'CEB');
  const cmaKursus = dbKursus.find(k => k.code === 'CMA');
  const cmdKursus = dbKursus.find(k => k.code === 'CMD');

  // 5. Create standard students
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

  const createdStudents = [];
  for (const student of students) {
    const s = await prisma.student.create({ data: student });
    createdStudents.push(s);
  }
  console.log('Students seeded.');

  // 6. Fetch offence types and user
  const dbOffences = await prisma.offenceType.findMany();
  const dbUser = await prisma.user.findFirst({ where: { role: 'TEACHER' } });

  if (dbUser && dbOffences.length > 0) {
    const student1 = createdStudents.find(s => s.icNumber === '060504021111'); // Ahmad Danial
    const student2 = createdStudents.find(s => s.icNumber === '060908022222'); // Siti Nur Aishah
    const student3 = createdStudents.find(s => s.icNumber === '050201083333'); // Chong Wei Ming

    const oA01 = dbOffences.find(o => o.code === 'A01');
    const oA02 = dbOffences.find(o => o.code === 'A02');
    const oB01 = dbOffences.find(o => o.code === 'B01');
    const oB02 = dbOffences.find(o => o.code === 'B02');
    const oB03 = dbOffences.find(o => o.code === 'B03');
    const oC01 = dbOffences.find(o => o.code === 'C01');

    // Ahmad Danial gets 4 offences
    if (student1) {
      await prisma.disciplinaryRecord.createMany({
        data: [
          {
            studentId: student1.studentNumber,
            offenceTypeId: oA01?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-05-10T10:00:00Z'),
            description: 'Ponteng kelas sewaktu sesi amali dijalankan.',
          },
          {
            studentId: student1.studentNumber,
            offenceTypeId: oB01?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-05-15T08:30:00Z'),
            description: 'Kerap lewat masuk ke bengkel.',
          },
          {
            studentId: student1.studentNumber,
            offenceTypeId: oB02?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-06-02T09:00:00Z'),
            description: 'Rambut panjang dan tidak mengikut peraturan kolej.',
          },
          {
            studentId: student1.studentNumber,
            offenceTypeId: oA02?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-06-15T14:00:00Z'),
            description: 'Membawa vape ke kawasan asrama kolej.',
          },
        ]
      });
    }

    // Siti Nur Aishah gets 2 offences
    if (student2) {
      await prisma.disciplinaryRecord.createMany({
        data: [
          {
            studentId: student2.studentNumber,
            offenceTypeId: oB01?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-06-01T08:15:00Z'),
            description: 'Lewat perhimpunan pagi hari Isnin.',
          },
          {
            studentId: student2.studentNumber,
            offenceTypeId: oC01?.id || dbOffences[0].id,
            teacherId: dbUser.id,
            date: new Date('2026-06-10T11:00:00Z'),
            description: 'Gagal menghantar tugasan laporan amali sistem komputer.',
          },
        ]
      });
    }

    // Chong Wei Ming gets 1 offence
    if (student3) {
      await prisma.disciplinaryRecord.create({
        data: {
          studentId: student3.studentNumber,
          offenceTypeId: oB03?.id || dbOffences[0].id,
          teacherId: dbUser.id,
          date: new Date('2026-06-05T10:30:00Z'),
          description: 'Melawan cakap pensyarah di dalam kelas.',
        }
      });
    }

    console.log('Sample disciplinary records seeded.');
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
