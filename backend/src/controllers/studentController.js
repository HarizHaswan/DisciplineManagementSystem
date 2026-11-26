import { z } from 'zod';
import { query, queryOne, withTransaction } from '../config/db.js';
import { mapOffence, mapStudent } from '../config/rows.js';

// Zod validation schema for student creation/update
const studentSchema = z.object({
  studentNumber: z.string().min(3, 'Student ID must be at least 3 characters (e.g. K011QCEA018)'),
  icNumber: z.string().regex(/^\d{12}$/, 'IC Number must be exactly 12 numeric digits (e.g. 050102091234)'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  kursusId: z.coerce.number().int('Kursus ID must be an integer'),
  cohort: z.coerce.number().int('Cohort must be a valid year integer'),
  programType: z.enum(['SVM', 'DVM'], { errorMap: () => ({ message: 'Program Type must be SVM or DVM' }) }),
  semester: z.coerce.number().int().min(1).max(9, 'Semester must be between 1 and 9'),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'GRADUATED', 'WITHDRAWN']).default('ACTIVE'),
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  parentPhone: z.string().min(6, 'Parent contact number must be at least 6 characters'),
  email: z.string().email('Alamat email tidak sah.'),
  studentPhone: z.string().min(6, 'No. telefon pelajar sekurang-kurangnya 6 aksara.'),
});

const getClassName = (semester, programType, kursusCode) => {
  if (programType === 'SVM') {
    return `${semester} SVM ${kursusCode}`;
  } else {
    // DVM Sem 5-9 maps to 1-5 DVM
    return `${semester - 4} DVM ${kursusCode}`;
  }
};

// GET /api/students - List all students, supporting search filters
export const getAllStudents = async (req, res) => {
  try {
    const { search, kursusId, cohort, status } = req.query;

    const where = [];
    const params = [];

    if (search) {
      const term = `%${search}%`;
      where.push('(s.name LIKE ? OR s.icNumber LIKE ? OR s.studentNumber LIKE ? OR s.parentPhone LIKE ?)');
      params.push(term, term, term, term);
    }

    if (kursusId) {
      where.push('s.kursusId = ?');
      params.push(parseInt(kursusId, 10));
    }

    if (cohort) {
      where.push('s.cohort = ?');
      params.push(parseInt(cohort, 10));
    }

    if (status) {
      where.push('s.status = ?');
      params.push(status);
    }

    const students = await query(
      `SELECT s.*, k.code AS kursusCode, k.name AS kursusName,
              (SELECT COUNT(*) FROM \`DisciplinaryRecord\` r WHERE r.studentId = s.studentNumber) AS offenceCount
       FROM \`Student\` s
       JOIN \`Kursus\` k ON k.id = s.kursusId
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY s.name ASC`,
      params
    );

    const formattedStudents = students.map((s) => ({
      studentNumber: s.studentNumber,
      icNumber: s.icNumber,
      name: s.name,
      kursusId: s.kursusId,
      kursusCode: s.kursusCode,
      kursusName: s.kursusName,
      cohort: s.cohort,
      programType: s.programType,
      semester: s.semester,
      status: s.status,
      className: getClassName(s.semester, s.programType, s.kursusCode),
      email: s.email,
      studentPhone: s.studentPhone,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      createdAt: s.createdAt,
      offenceCount: Number(s.offenceCount),
    }));

    return res.status(200).json(formattedStudents);
  } catch (error) {
    console.error('Get All Students Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching students.' });
  }
};

// GET /api/students/:studentNumber - Get student detail by studentNumber with full offence history
export const getStudentById = async (req, res) => {
  try {
    const studentNumber = req.params.studentNumber;
    if (!studentNumber) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const row = await queryOne(
      `SELECT s.*, k.id AS kursus_id, k.code AS kursus_code, k.name AS kursus_name
       FROM \`Student\` s
       JOIN \`Kursus\` k ON k.id = s.kursusId
       WHERE s.studentNumber = ?`,
      [studentNumber]
    );

    if (!row) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const student = mapStudent(row);
    const recordRows = await query(
      `SELECT r.id, r.studentId, r.offenceTypeId, r.teacherId, r.date, r.description, r.createdAt, r.warningLetterId,
              o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
              o.category AS offenceType_category, o.description AS offenceType_description,
              u.id AS teacher_id, u.name AS teacher_name, u.role AS teacher_role
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       JOIN \`User\` u ON u.id = r.teacherId
       WHERE r.studentId = ?
       ORDER BY r.date DESC`,
      [studentNumber]
    );

    const formatted = {
      ...student,
      records: recordRows.map((record) => mapOffence(record, { includeTeacher: true })),
      kursusCode: student.kursus.code,
      kursusName: student.kursus.name,
      className: getClassName(student.semester, student.programType, student.kursus.code),
    };

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Get Student By ID Error:', error);
    return res.status(500).json({ message: 'Internal server error while retrieving student.' });
  }
};

// GET /api/students/ic/:icNumber - Find student profile by IC
export const getStudentByIC = async (req, res) => {
  try {
    const { icNumber } = req.params;

    if (!icNumber || !/^\d{12}$/.test(icNumber)) {
      return res.status(400).json({ message: 'IC Number must be exactly 12 numeric digits.' });
    }

    const row = await queryOne(
      `SELECT s.*, k.id AS kursus_id, k.code AS kursus_code, k.name AS kursus_name
       FROM \`Student\` s
       JOIN \`Kursus\` k ON k.id = s.kursusId
       WHERE s.icNumber = ?`,
      [icNumber]
    );

    if (!row) {
      return res.status(404).json({ message: 'No student found with this IC number.' });
    }

    const student = mapStudent(row);
    const recordRows = await query(
      `SELECT r.id, r.studentId, r.offenceTypeId, r.teacherId, r.date, r.description, r.createdAt, r.warningLetterId,
              o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
              o.category AS offenceType_category, o.description AS offenceType_description,
              u.id AS teacher_id, u.name AS teacher_name
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       JOIN \`User\` u ON u.id = r.teacherId
       WHERE r.studentId = ?
       ORDER BY r.date DESC`,
      [student.studentNumber]
    );

    const formatted = {
      ...student,
      records: recordRows.map((record) => mapOffence(record, { includeTeacher: true, includeTeacherRole: false })),
      kursusCode: student.kursus.code,
      kursusName: student.kursus.name,
      className: getClassName(student.semester, student.programType, student.kursus.code),
    };

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Get Student By IC Error:', error);
    return res.status(500).json({ message: 'Internal server error while searching for student.' });
  }
};

// POST /api/students - Create a student (Admin only)
export const createStudent = async (req, res) => {
  try {
    const validation = studentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const {
      studentNumber,
      icNumber,
      name,
      email,
      studentPhone,
      kursusId,
      cohort,
      programType,
      semester,
      status,
      parentName,
      parentPhone,
    } = validation.data;

    // Check if IC already exists
    const existingStudent = await queryOne(
      'SELECT studentNumber FROM `Student` WHERE icNumber = ?',
      [icNumber]
    );
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this IC number already exists.' });
    }

    const existingNumber = await queryOne(
      'SELECT studentNumber FROM `Student` WHERE studentNumber = ?',
      [studentNumber]
    );
    if (existingNumber) {
      return res.status(400).json({ message: 'A student with this Student ID already exists.' });
    }

    await query(
      `INSERT INTO \`Student\`
        (studentNumber, icNumber, name, email, studentPhone, kursusId, cohort, programType, semester, status, parentName, parentPhone, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))`,
      [studentNumber, icNumber, name, email, studentPhone, kursusId, cohort, programType, semester, status, parentName, parentPhone]
    );
    const newStudent = await queryOne('SELECT * FROM `Student` WHERE studentNumber = ?', [studentNumber]);

    return res.status(201).json({
      message: 'Student added successfully',
      student: newStudent,
    });
  } catch (error) {
    console.error('Create Student Error:', error);
    return res.status(500).json({ message: 'Internal server error while creating student.' });
  }
};

// PUT /api/students/:studentNumber - Update student details (Admin only)
export const updateStudent = async (req, res) => {
  try {
    const studentNumber = req.params.studentNumber;
    if (!studentNumber) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const validation = studentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const {
      icNumber,
      name,
      email,
      studentPhone,
      kursusId,
      cohort,
      programType,
      semester,
      status,
      parentName,
      parentPhone,
    } = validation.data;

    const student = await queryOne('SELECT * FROM `Student` WHERE studentNumber = ?', [studentNumber]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    if (icNumber !== student.icNumber) {
      const existingStudent = await queryOne(
        'SELECT studentNumber FROM `Student` WHERE icNumber = ?',
        [icNumber]
      );
      if (existingStudent) {
        return res.status(400).json({ message: 'A student with this new IC number already exists.' });
      }
    }

    await query(
      `UPDATE \`Student\`
       SET icNumber = ?, name = ?, email = ?, studentPhone = ?, kursusId = ?, cohort = ?,
           programType = ?, semester = ?, status = ?, parentName = ?, parentPhone = ?, updatedAt = NOW(3)
       WHERE studentNumber = ?`,
      [icNumber, name, email, studentPhone, kursusId, cohort, programType, semester, status, parentName, parentPhone, studentNumber]
    );
    const updatedStudent = await queryOne('SELECT * FROM `Student` WHERE studentNumber = ?', [studentNumber]);

    return res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Update Student Error:', error);
    return res.status(500).json({ message: 'Internal server error while updating student.' });
  }
};

// DELETE /api/students/:studentNumber - Delete student (Admin only)
export const deleteStudent = async (req, res) => {
  try {
    const studentNumber = req.params.studentNumber;
    if (!studentNumber) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const student = await queryOne('SELECT studentNumber FROM `Student` WHERE studentNumber = ?', [studentNumber]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    await query('DELETE FROM `Student` WHERE studentNumber = ?', [studentNumber]);

    return res.status(200).json({ message: 'Student profile deleted successfully.' });
  } catch (error) {
    console.error('Delete Student Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting student.' });
  }
};

// POST /api/students/promote - Bulk promote/transition/graduate students (Admin only)
export const promoteStudents = async (req, res) => {
  try {
    const { studentIds, action } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ message: 'studentIds array is required.' });
    }

    if (!['PROMOTE', 'TRANSITION_DVM', 'GRADUATE'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action type.' });
    }

    const results = await withTransaction(async (tx) => {
      const updated = [];

      for (const id of studentIds) {
        const student = await tx.one('SELECT * FROM `Student` WHERE studentNumber = ?', [id]);
        if (!student) continue;

        const updateData = {};

        if (action === 'PROMOTE') {
          if (student.programType === 'SVM' && student.semester < 4) {
            updateData.semester = student.semester + 1;
          } else if (student.programType === 'DVM' && student.semester < 9) {
            updateData.semester = student.semester + 1;
          }
        } else if (action === 'TRANSITION_DVM') {
          if (student.programType === 'SVM' && student.semester === 4) {
            updateData.programType = 'DVM';
            updateData.semester = 5;
          }
        } else if (action === 'GRADUATE') {
          if (student.programType === 'DVM' && student.semester === 9) {
            updateData.status = 'GRADUATED';
          }
        }

        if (Object.keys(updateData).length > 0) {
          await tx.query(
            `UPDATE \`Student\`
             SET semester = ?, programType = ?, status = ?, updatedAt = NOW(3)
             WHERE studentNumber = ?`,
            [
              updateData.semester ?? student.semester,
              updateData.programType ?? student.programType,
              updateData.status ?? student.status,
              id,
            ]
          );
          const up = await tx.one('SELECT * FROM `Student` WHERE studentNumber = ?', [id]);
          updated.push(up);
        }
      }

      return updated;
    });

    return res.status(200).json({
      message: `Successfully executed ${action} for ${results.length} students.`,
      updatedCount: results.length,
    });
  } catch (error) {
    console.error('Promote Students Error:', error);
    return res.status(500).json({ message: 'Internal server error while promoting students.' });
  }
};

// GET /api/students/kursus - Fetch all courses (for dropdowns)
export const getAllKursus = async (req, res) => {
  try {
    const kursus = await query('SELECT id, code, name FROM `Kursus` ORDER BY name ASC');
    return res.status(200).json(kursus);
  } catch (error) {
    console.error('Get All Kursus Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching courses.' });
  }
};

// POST /api/students/import - Import students in bulk via CSV text
export const importStudents = async (req, res) => {
  try {
    const { csvText } = req.body;
    if (!csvText) {
      return res.status(400).json({ message: 'Sila hantar teks CSV untuk diimport.' });
    }

    // 1. Helper function for CSV parsing
    const parseCSV = (text) => {
      const result = [];
      let row = [''];
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            row[row.length - 1] += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          row.push('');
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
          if (char === '\r' && nextChar === '\n') {
            i++;
          }
          if (row.length > 1 || row[0] !== '') {
            result.push(row);
          }
          row = [''];
        } else {
          row[row.length - 1] += char;
        }
      }
      if (row.length > 1 || row[0] !== '') {
        result.push(row);
      }
      return result;
    };

    const rows = parseCSV(csvText);
    if (rows.length < 2) {
      return res.status(400).json({ message: 'Fail CSV tidak mengandungi data pelajar.' });
    }

    // 2. Identify Headers (all optional except at least one identifier column)
    const headers = rows[0].map(h => h.trim().toLowerCase());
    
    const idxName = headers.findIndex(h => /nama\s+penuh|nama/i.test(h));
    const idxIc = headers.findIndex(h => /no\s+ic|nric|ic\s+number|ic/i.test(h));
    const idxStudentNum = headers.findIndex(h => /no\s+pelajar|student\s+number|student\s+id/i.test(h));
    const idxKelas = headers.findIndex(h => /kelas|class/i.test(h));
    const idxCohort = headers.findIndex(h => /kohort|cohort/i.test(h));
    const idxEmail = headers.findIndex(h => /email|e-mel|e\s*mel/i.test(h));
    const idxStudentPhone = headers.findIndex(h => /tel\s+pelajar|student\s+phone|telefon\s+pelajar/i.test(h));
    const idxParentName = headers.findIndex(h => /nama\s+penjaga|parent\s+name|nama\s+bapa|nama\s+ibu/i.test(h));
    const idxParentPhone = headers.findIndex(h => /tel\s+penjaga|parent\s+phone|telefon\s+penjaga/i.test(h));

    if (idxName === -1 && idxIc === -1 && idxStudentNum === -1) {
      return res.status(400).json({
        message: 'Fail CSV mestilah mempunyai sekurang-kurangnya satu kolum pengenalan (NAMA PENUH, NO IC, atau NO PELAJAR).'
      });
    }

    // 3. Load Courses
    const courses = await query('SELECT id, code FROM `Kursus` ORDER BY id ASC');
    if (courses.length === 0) {
      return res.status(400).json({ message: 'Tiada rekod kursus ditemui dalam pangkalan data.' });
    }
    const courseMap = new Map(courses.map(k => [k.code.toUpperCase(), k.id]));
    const defaultKursusId = courses[0].id;
    const defaultCohort = new Date().getFullYear();

    // 4. Process each student row
    const errors = [];
    let successCount = 0;

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.every(cell => !cell?.trim())) continue; // skip completely empty lines

      const rawName = idxName !== -1 ? row[idxName]?.trim() || '' : '';
      const rawIc = idxIc !== -1 ? row[idxIc]?.trim() || '' : '';
      const rawStudentNum = idxStudentNum !== -1 ? row[idxStudentNum]?.trim() || '' : '';
      const rawKelas = idxKelas !== -1 ? row[idxKelas]?.trim() || '' : '';
      const rawCohort = idxCohort !== -1 ? row[idxCohort]?.trim() || '' : '';
      const rawEmail = idxEmail !== -1 ? row[idxEmail]?.trim() || '' : '';
      const rawStudentPhone = idxStudentPhone !== -1 ? row[idxStudentPhone]?.trim() || '' : '';
      const rawParentName = idxParentName !== -1 ? row[idxParentName]?.trim() || '' : '';
      const rawParentPhone = idxParentPhone !== -1 ? row[idxParentPhone]?.trim() || '' : '';

      const lineNum = r + 1;

      // Skip row if no identifying info at all
      if (!rawName && !rawIc && !rawStudentNum) {
        continue;
      }

      // Normalize identifiers with safe fallbacks if partially populated
      const digitsIc = rawIc.replace(/\D/g, '');
      const cleanIcBase = digitsIc || rawIc;
      const studentNum = (rawStudentNum || cleanIcBase || `TMP-${lineNum}-${Date.now()}`).toUpperCase();
      const cleanIc = cleanIcBase || `TMP-${studentNum}`;
      const studentName = rawName || studentNum;
      const studentEmail = rawEmail || null;
      const studentPhone = rawStudentPhone || null;

      // Cohort: parse if valid, otherwise default to current year
      const parsedCohortNum = parseInt(rawCohort, 10);
      const parsedCohort = !isNaN(parsedCohortNum) && parsedCohortNum >= 2000 && parsedCohortNum <= 2100
        ? parsedCohortNum
        : defaultCohort;

      // Class Parsing: try standard format first, otherwise fallback safely
      let classProg = /dvm/i.test(rawKelas) ? 'DVM' : 'SVM';
      let dbSemester = 1;
      let targetKursusId = defaultKursusId;

      const classMatch = rawKelas.match(/^(\d+)\s+(SVM|DVM)\s+(\w+)$/i);
      if (classMatch) {
        const classSem = parseInt(classMatch[1], 10);
        classProg = classMatch[2].toUpperCase();
        const classCourseCode = classMatch[3].toUpperCase();
        targetKursusId = courseMap.get(classCourseCode) || defaultKursusId;
        dbSemester = classProg === 'DVM' ? classSem + 4 : classSem;
        if (dbSemester < 1 || dbSemester > 9) {
          dbSemester = classProg === 'DVM' ? 5 : 1;
        }
      } else if (rawKelas) {
        const semMatch = rawKelas.match(/\d+/);
        if (semMatch) {
          const semNum = parseInt(semMatch[0], 10);
          dbSemester = classProg === 'DVM' ? Math.min(9, Math.max(5, semNum + 4)) : Math.min(4, Math.max(1, semNum));
        }
        for (const [code, id] of courseMap.entries()) {
          if (rawKelas.toUpperCase().includes(code)) {
            targetKursusId = id;
            break;
          }
        }
      }

      // Try-Catch to handle unique index violations
      try {
        const parentName = rawParentName || 'Penjaga';
        const parentPhone = rawParentPhone || 'N/A';
        const existing = await queryOne(
          'SELECT studentNumber FROM `Student` WHERE studentNumber = ?',
          [studentNum]
        );

        if (existing) {
          await query(
            `UPDATE \`Student\`
             SET icNumber = ?, name = ?, email = ?, studentPhone = ?, kursusId = ?, cohort = ?,
                 programType = ?, semester = ?, parentName = ?, parentPhone = ?, status = 'ACTIVE', updatedAt = NOW(3)
             WHERE studentNumber = ?`,
            [cleanIc, studentName, studentEmail, studentPhone, targetKursusId, parsedCohort, classProg, dbSemester, parentName, parentPhone, studentNum]
          );
        } else {
          await query(
            `INSERT INTO \`Student\`
              (studentNumber, icNumber, name, email, studentPhone, kursusId, cohort, programType, semester, status, parentName, parentPhone, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?, ?, NOW(3))`,
            [studentNum, cleanIc, studentName, studentEmail, studentPhone, targetKursusId, parsedCohort, classProg, dbSemester, parentName, parentPhone]
          );
        }
        successCount++;
      } catch (dbErr) {
        console.error(`Import DB Error on row ${lineNum}:`, dbErr);
        errors.push({ line: lineNum, message: 'No. Pelajar atau No. IC sudah digunakan oleh pelajar lain.' });
      }
    }

    return res.status(200).json({
      message: 'Proses import CSV selesai.',
      successCount,
      errorCount: errors.length,
      errors
    });
  } catch (err) {
    console.error('Import CSV Server Error:', err);
    return res.status(500).json({ message: 'Ralat pelayan semasa memproses import CSV.' });
  }
};
