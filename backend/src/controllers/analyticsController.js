import { query, queryOne } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [studentCountRow, offenceCountRow, teacherCountRow] = await Promise.all([
      queryOne('SELECT COUNT(*) AS count FROM `Student`'),
      queryOne('SELECT COUNT(*) AS count FROM `DisciplinaryRecord`'),
      queryOne("SELECT COUNT(*) AS count FROM `User` WHERE role = 'TEACHER'"),
    ]);

    const records = await query(
      `SELECT r.date, o.category AS offenceCategory, o.name AS offenceName, k.name AS kursusName
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       JOIN \`Student\` s ON s.studentNumber = r.studentId
       JOIN \`Kursus\` k ON k.id = s.kursusId`
    );

    const categories = { Major: 0, Medium: 0, Minor: 0 };
    const offenceFrequency = {};
    const programDistribution = {};
    const monthlyTrend = {};

    records.forEach((rec) => {
      const cat = rec.offenceCategory;
      if (categories[cat] !== undefined) {
        categories[cat]++;
      }

      offenceFrequency[rec.offenceName] = (offenceFrequency[rec.offenceName] || 0) + 1;
      programDistribution[rec.kursusName] = (programDistribution[rec.kursusName] || 0) + 1;

      const dateObj = new Date(rec.date);
      const yearMonth = dateObj.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthlyTrend[yearMonth] = (monthlyTrend[yearMonth] || 0) + 1;
    });

    const topOffences = Object.entries(offenceFrequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const programStats = Object.entries(programDistribution).map(([name, count]) => ({
      name,
      count,
    }));

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

    const studentsWithOffences = await query(
      `SELECT s.studentNumber, s.name, k.name AS program, COUNT(r.id) AS offenceCount
       FROM \`Student\` s
       JOIN \`Kursus\` k ON k.id = s.kursusId
       LEFT JOIN \`DisciplinaryRecord\` r ON r.studentId = s.studentNumber
       GROUP BY s.studentNumber, s.name, k.name
       HAVING COUNT(r.id) > 0
       ORDER BY offenceCount DESC
       LIMIT 5`
    );

    const topStudents = studentsWithOffences.map((student) => ({
      id: student.studentNumber,
      name: student.name,
      program: student.program,
      offenceCount: Number(student.offenceCount),
    }));

    return res.status(200).json({
      summary: {
        totalStudents: Number(studentCountRow.count),
        totalOffences: Number(offenceCountRow.count),
        totalTeachers: Number(teacherCountRow.count),
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
