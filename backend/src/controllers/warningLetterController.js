import { query, queryOne, withTransaction } from '../config/db.js';
import { mapOffence, mapStudent } from '../config/rows.js';
import { generateWarningPDF } from '../services/pdfService.js';

const getClassName = (semester, programType, kursusCode) => {
  if (programType === 'SVM') {
    return `${semester} SVM ${kursusCode}`;
  }
  return `${semester - 4} DVM ${kursusCode}`;
};

const STUDENT_WITH_KURSUS = `
  SELECT s.*, k.id AS kursus_id, k.code AS kursus_code, k.name AS kursus_name
  FROM \`Student\` s
  JOIN \`Kursus\` k ON k.id = s.kursusId
`;

function presentStudent(row) {
  const student = mapStudent(row);
  return {
    ...student,
    program: student.kursus.name,
    kursusCode: student.kursus.code,
    kursusName: student.kursus.name,
    className: getClassName(student.semester, student.programType, student.kursus.code),
  };
}

export const getAllWarningLetters = async (req, res) => {
  try {
    const { month, studentId, status } = req.query;
    const userRole = req.user.role;
    const where = [];
    const params = [];

    if (studentId) {
      where.push('wl.studentId = ?');
      params.push(String(studentId));
    }

    if (month) {
      where.push('wl.month = ?');
      params.push(month);
    }

    if (userRole === 'TEACHER') {
      where.push("wl.status = 'ISSUED'");
    } else if (status) {
      where.push('wl.status = ?');
      params.push(status);
    }

    const warningLetters = await query(
      `SELECT wl.id, wl.studentId, wl.warningTier, wl.issuedDate, wl.status, wl.month, wl.createdAt, wl.updatedAt,
              s.studentNumber, s.icNumber, s.name, s.email, s.studentPhone, s.kursusId, s.cohort,
              s.programType, s.semester, s.status AS studentStatus, s.parentName, s.parentPhone,
              s.createdAt AS studentCreatedAt, s.updatedAt AS studentUpdatedAt,
              k.id AS kursus_id, k.code AS kursus_code, k.name AS kursus_name
       FROM \`WarningLetter\` wl
       JOIN \`Student\` s ON s.studentNumber = wl.studentId
       JOIN \`Kursus\` k ON k.id = s.kursusId
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY wl.issuedDate DESC`,
      params
    );

    const studentIds = [...new Set(warningLetters.map((wl) => wl.studentId))];
    const allStudentRecords = studentIds.length > 0
      ? await query(
          `SELECT r.id, r.studentId, r.offenceTypeId, r.teacherId, r.date, r.description, r.createdAt, r.warningLetterId,
                  o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
                  o.category AS offenceType_category, o.description AS offenceType_description,
                  u.id AS teacher_id, u.name AS teacher_name, u.role AS teacher_role,
                  w.warningTier
           FROM \`DisciplinaryRecord\` r
           JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
           JOIN \`User\` u ON u.id = r.teacherId
           JOIN \`WarningLetter\` w ON w.id = r.warningLetterId
           WHERE r.studentId IN (?)
           ORDER BY r.date ASC, r.id ASC`,
          [studentIds]
        )
      : [];

    const formatted = warningLetters.map((wl) => {
      const student = presentStudent({
        studentNumber: wl.studentNumber,
        icNumber: wl.icNumber,
        name: wl.name,
        email: wl.email,
        studentPhone: wl.studentPhone,
        kursusId: wl.kursusId,
        cohort: wl.cohort,
        programType: wl.programType,
        semester: wl.semester,
        status: wl.studentStatus,
        parentName: wl.parentName,
        parentPhone: wl.parentPhone,
        createdAt: wl.studentCreatedAt,
        updatedAt: wl.studentUpdatedAt,
        kursus_id: wl.kursus_id,
        kursus_code: wl.kursus_code,
        kursus_name: wl.kursus_name,
      });

      const records = allStudentRecords
        .filter((rec) => rec.studentId === wl.studentId && rec.warningTier <= wl.warningTier)
        .map((rec) => {
          const offence = mapOffence(rec, { includeTeacher: true });
          delete offence.warningLetter;
          return offence;
        });

      return {
        id: wl.id,
        studentId: wl.studentId,
        warningTier: wl.warningTier,
        issuedDate: wl.issuedDate,
        status: wl.status,
        month: wl.month,
        createdAt: wl.createdAt,
        updatedAt: wl.updatedAt,
        records,
        student,
      };
    });

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Get All Warning Letters Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching warning letters.' });
  }
};

export const getEligibleStudents = async (req, res) => {
  try {
    const students = await query(STUDENT_WITH_KURSUS);
    const unlinked = await query(
      `SELECT r.id, r.studentId, r.offenceTypeId, r.teacherId, r.date, r.description, r.createdAt, r.warningLetterId,
              o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
              o.category AS offenceType_category, o.description AS offenceType_description
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       WHERE r.warningLetterId IS NULL
       ORDER BY r.date ASC, r.id ASC`
    );
    const letters = await query(
      'SELECT studentId, warningTier FROM `WarningLetter` ORDER BY warningTier DESC'
    );

    const recordsByStudent = new Map();
    for (const record of unlinked) {
      const list = recordsByStudent.get(record.studentId) || [];
      list.push(mapOffence(record));
      recordsByStudent.set(record.studentId, list);
    }

    const highestTier = new Map();
    for (const letter of letters) {
      if (!highestTier.has(letter.studentId)) {
        highestTier.set(letter.studentId, letter.warningTier);
      }
    }

    const eligible = [];
    for (const row of students) {
      const student = mapStudent(row);
      const records = recordsByStudent.get(student.studentNumber) || [];
      const highestWarning = highestTier.get(student.studentNumber) || 0;
      const unlinkedCount = records.length;

      let eligibleTier = 0;
      let offencesToLink = [];

      if (highestWarning === 0 && unlinkedCount >= 3) {
        eligibleTier = 1;
        offencesToLink = records.slice(0, 3);
      } else if (highestWarning === 1 && unlinkedCount >= 1) {
        eligibleTier = 2;
        offencesToLink = records.slice(0, 1);
      } else if (highestWarning === 2 && unlinkedCount >= 1) {
        eligibleTier = 3;
        offencesToLink = records.slice(0, 1);
      }

      if (eligibleTier > 0) {
        eligible.push({
          studentId: student.studentNumber,
          studentNumber: student.studentNumber,
          name: student.name,
          icNumber: student.icNumber,
          kursusId: student.kursusId,
          kursusCode: student.kursus.code,
          kursusName: student.kursus.name,
          program: student.kursus.name,
          cohort: student.cohort,
          programType: student.programType,
          semester: student.semester,
          className: getClassName(student.semester, student.programType, student.kursus.code),
          parentPhone: student.parentPhone,
          eligibleTier,
          offenceCount: offencesToLink.length,
          offences: offencesToLink,
        });
      }
    }

    return res.status(200).json(eligible);
  } catch (error) {
    console.error('Get Eligible Students Error:', error);
    return res.status(500).json({ message: 'Internal server error while checking warning letter eligibility.' });
  }
};

export const generateWarningLetter = async (req, res) => {
  try {
    const { studentId, tier } = req.body;

    if (!studentId || !tier) {
      return res.status(400).json({ message: 'studentId and tier are required.' });
    }

    const student = await queryOne(
      `${STUDENT_WITH_KURSUS} WHERE s.studentNumber = ?`,
      [String(studentId)]
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const records = await query(
      `SELECT id, date FROM \`DisciplinaryRecord\`
       WHERE studentId = ? AND warningLetterId IS NULL
       ORDER BY date ASC, id ASC`,
      [student.studentNumber]
    );
    const highest = await queryOne(
      'SELECT warningTier FROM `WarningLetter` WHERE studentId = ? ORDER BY warningTier DESC LIMIT 1',
      [student.studentNumber]
    );
    const highestWarning = highest?.warningTier || 0;

    if (tier !== highestWarning + 1) {
      return res.status(400).json({
        message: `Invalid warning tier sequence. Student highest warning is ${highestWarning}, so next warning must be ${highestWarning + 1}.`,
      });
    }

    let offencesToLink = [];
    if (tier === 1 && records.length >= 3) {
      offencesToLink = records.slice(0, 3);
    } else if (tier === 2 && records.length >= 1) {
      offencesToLink = records.slice(0, 1);
    } else if (tier === 3 && records.length >= 1) {
      offencesToLink = records.slice(0, 1);
    } else {
      return res.status(400).json({ message: 'Student does not qualify for this warning tier.' });
    }

    const currentDate = new Date();
    const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    const warningLetter = await withTransaction(async (tx) => {
      const created = await tx.query(
        `INSERT INTO \`WarningLetter\` (studentId, warningTier, status, month, updatedAt)
         VALUES (?, ?, 'PENDING', ?, NOW(3))`,
        [student.studentNumber, tier, monthStr]
      );

      await tx.query(
        'UPDATE `DisciplinaryRecord` SET warningLetterId = ? WHERE id IN (?)',
        [created.insertId, offencesToLink.map((offence) => offence.id)]
      );

      return tx.one('SELECT * FROM `WarningLetter` WHERE id = ?', [created.insertId]);
    });

    return res.status(201).json({
      message: 'Warning letter draft generated successfully.',
      warningLetter,
    });
  } catch (error) {
    console.error('Generate Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while generating warning letter draft.' });
  }
};

export const issueWarningLetter = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await queryOne('SELECT * FROM `WarningLetter` WHERE id = ?', [id]);
    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    if (warningLetter.status === 'ISSUED') {
      return res.status(400).json({ message: 'Warning letter has already been issued.' });
    }

    await query(
      `UPDATE \`WarningLetter\`
       SET status = 'ISSUED', issuedDate = NOW(3), updatedAt = NOW(3)
       WHERE id = ?`,
      [id]
    );
    const updated = await queryOne('SELECT * FROM `WarningLetter` WHERE id = ?', [id]);

    return res.status(200).json({
      message: 'Warning letter approved and issued successfully.',
      warningLetter: updated,
    });
  } catch (error) {
    console.error('Issue Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while issuing warning letter.' });
  }
};

export const deleteWarningLetter = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await queryOne('SELECT id, status FROM `WarningLetter` WHERE id = ?', [id]);
    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    if (warningLetter.status !== 'PENDING') {
      return res.status(400).json({ message: 'Only warning letter drafts (PENDING status) can be deleted.' });
    }

    await withTransaction(async (tx) => {
      await tx.query(
        'UPDATE `DisciplinaryRecord` SET warningLetterId = NULL WHERE warningLetterId = ?',
        [id]
      );
      await tx.query('DELETE FROM `WarningLetter` WHERE id = ?', [id]);
    });

    return res.status(200).json({ message: 'Warning letter draft deleted successfully, offences returned to pool.' });
  } catch (error) {
    console.error('Delete Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting warning letter draft.' });
  }
};

export const getWarningLetterPDF = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await queryOne(
      `SELECT wl.*, s.studentNumber, s.icNumber, s.name, s.email, s.studentPhone, s.kursusId, s.cohort,
              s.programType, s.semester, s.status AS studentStatus, s.parentName, s.parentPhone,
              s.createdAt AS studentCreatedAt, s.updatedAt AS studentUpdatedAt,
              k.id AS kursus_id, k.code AS kursus_code, k.name AS kursus_name
       FROM \`WarningLetter\` wl
       JOIN \`Student\` s ON s.studentNumber = wl.studentId
       JOIN \`Kursus\` k ON k.id = s.kursusId
       WHERE wl.id = ?`,
      [id]
    );

    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    if (req.user.role === 'TEACHER' && warningLetter.status !== 'ISSUED') {
      return res.status(403).json({ message: 'Teachers are not authorized to preview warning letter drafts.' });
    }

    const cumulativeRecords = await query(
      `SELECT r.id, r.date, r.description,
              o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
              o.category AS offenceType_category, o.description AS offenceType_description
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       JOIN \`WarningLetter\` w ON w.id = r.warningLetterId
       WHERE r.studentId = ? AND w.warningTier <= ?
       ORDER BY r.date ASC, r.id ASC`,
      [warningLetter.studentId, warningLetter.warningTier]
    );

    const student = presentStudent({
      studentNumber: warningLetter.studentNumber,
      icNumber: warningLetter.icNumber,
      name: warningLetter.name,
      email: warningLetter.email,
      studentPhone: warningLetter.studentPhone,
      kursusId: warningLetter.kursusId,
      cohort: warningLetter.cohort,
      programType: warningLetter.programType,
      semester: warningLetter.semester,
      status: warningLetter.studentStatus,
      parentName: warningLetter.parentName,
      parentPhone: warningLetter.parentPhone,
      createdAt: warningLetter.studentCreatedAt,
      updatedAt: warningLetter.studentUpdatedAt,
      kursus_id: warningLetter.kursus_id,
      kursus_code: warningLetter.kursus_code,
      kursus_name: warningLetter.kursus_name,
    });

    const pdfBytes = await generateWarningPDF(
      student,
      cumulativeRecords.map((record) => mapOffence(record)),
      warningLetter.warningTier
    );

    const safeStudentName = student.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Surat_Amaran_${warningLetter.warningTier}_${safeStudentName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Get Warning Letter PDF Error:', error);
    return res.status(500).json({ message: 'Internal server error while generating warning letter PDF.' });
  }
};
