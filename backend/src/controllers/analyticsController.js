import { prisma } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Core counters
    const [studentCount, offenceCount, teacherCount] = await Promise.all([
      prisma.student.count(),
      prisma.disciplinaryRecord.count(),
      prisma.user.count({ where: { role: 'TEACHER' } }),
    ]);

    // 2. Fetch all offence records with student & kursus relationships
    const records = await prisma.disciplinaryRecord.findMany({
      include: {
        offenceType: true,
        student: {
          include: {
            kursus: true,
          }
        },
      },
    });

    // 3. Aggregate: Category Counts (Major, Medium, Minor)
    const categories = { Major: 0, Medium: 0, Minor: 0 };
    
    // 4. Aggregate: Top Offences (Name -> Count)
    const offenceFrequency = {};

    // 5. Aggregate: By Kursus / Course
    const programDistribution = {};

    // 6. Aggregate: By Month (Format: "YYYY-MM")
    const monthlyTrend = {};

    // Loop once to aggregate all stats
    records.forEach((rec) => {
      if (!rec.student) return;

      // Category
      const cat = rec.offenceType.category;
      if (categories[cat] !== undefined) {
        categories[cat]++;
      }

      // Specific Offence Name
      const offName = rec.offenceType.name;
      offenceFrequency[offName] = (offenceFrequency[offName] || 0) + 1;

      // Program / Course Name
      const prog = rec.student.kursus.name;
      programDistribution[prog] = (programDistribution[prog] || 0) + 1;

      // Month
      const dateObj = new Date(rec.date);
      const yearMonth = dateObj.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthlyTrend[yearMonth] = (monthlyTrend[yearMonth] || 0) + 1;
    });

    // Formulate top offences list (sorted)
    const topOffences = Object.entries(offenceFrequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Formulate program distribution list
    const programStats = Object.entries(programDistribution).map(([name, count]) => ({
      name,
      count,
    }));

    // Formulate monthly trend list (sorted chronologically)
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      months.push({
        month: label,
        count: monthlyTrend[label] || 0,
      });
    }

    // 7. Top 5 Students with highest offences count
    const studentsWithOffences = await prisma.student.findMany({
      select: {
        studentNumber: true,
        name: true,
        kursus: {
          select: { name: true }
        },
        _count: {
          select: { records: true },
        },
      },
    });

    const topStudents = studentsWithOffences
      .map((student) => ({
        id: student.studentNumber,
        name: student.name,
        program: student.kursus.name,
        offenceCount: student._count.records,
      }))
      .filter((s) => s.offenceCount > 0)
      .sort((a, b) => b.offenceCount - a.offenceCount)
      .slice(0, 5);

    return res.status(200).json({
      summary: {
        totalStudents: studentCount,
        totalOffences: offenceCount,
        totalTeachers: teacherCount,
      },
      categories,
      topOffences,
      programStats,
      monthlyTrend: months,
      topStudents,
    });
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error);
    return res.status(500).json({ message: 'Internal server error while compiling analytics.' });
  }
};
