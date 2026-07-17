import { z } from 'zod';
import { prisma } from '../config/db.js';

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

    const whereClause = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { icNumber: { contains: search } },
        { studentNumber: { contains: search } },
        { parentPhone: { contains: search } },
      ];
    }

    if (kursusId) {
      whereClause.kursusId = parseInt(kursusId);
    }

    if (cohort) {
      whereClause.cohort = parseInt(cohort);
    }

    if (status) {
      whereClause.status = status;
    }

    const students = await prisma.student.findMany({
      where: whereClause,
      include: {
        kursus: true,
        _count: {
          select: { records: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Simplify records count in response and include virtual className
    const formattedStudents = students.map((s) => ({
      studentNumber: s.studentNumber,
      icNumber: s.icNumber,
      name: s.name,
      kursusId: s.kursusId,
      kursusCode: s.kursus.code,
      kursusName: s.kursus.name,
      cohort: s.cohort,
      programType: s.programType,
      semester: s.semester,
      status: s.status,
      className: getClassName(s.semester, s.programType, s.kursus.code),
      email: s.email,
      studentPhone: s.studentPhone,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      createdAt: s.createdAt,
      offenceCount: s._count.records,
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

    const student = await prisma.student.findUnique({
      where: { studentNumber },
      include: {
        kursus: true,
        records: {
          include: {
            offenceType: true,
            teacher: {
              select: { id: true, name: true, role: true },
            },
          },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const formatted = {
      ...student,
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

    const student = await prisma.student.findUnique({
      where: { icNumber },
      include: {
        kursus: true,
        records: {
          include: {
            offenceType: true,
            teacher: {
              select: { id: true, name: true },
            },
          },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'No student found with this IC number.' });
    }

    const formatted = {
      ...student,
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
    const existingStudent = await prisma.student.findUnique({
      where: { icNumber },
    });
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this IC number already exists.' });
    }

    // Check if Student ID already exists
    const existingNumber = await prisma.student.findUnique({
      where: { studentNumber },
    });
    if (existingNumber) {
      return res.status(400).json({ message: 'A student with this Student ID already exists.' });
    }

    const newStudent = await prisma.student.create({
      data: {
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
      },
    });

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

    const student = await prisma.student.findUnique({
      where: { studentNumber },
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Check if new IC is already taken by another student
    if (icNumber !== student.icNumber) {
      const existingStudent = await prisma.student.findUnique({
        where: { icNumber },
      });
      if (existingStudent) {
        return res.status(400).json({ message: 'A student with this new IC number already exists.' });
      }
    }

    const updatedStudent = await prisma.student.update({
      where: { studentNumber },
      data: {
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
      },
    });

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

    const student = await prisma.student.findUnique({
      where: { studentNumber },
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    await prisma.student.delete({
      where: { studentNumber },
    });

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

    const results = await prisma.$transaction(async (tx) => {
      const updated = [];

      for (const id of studentIds) {
        const student = await tx.student.findUnique({ where: { studentNumber: id } });
        if (!student) continue;

        let updateData = {};

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
          const up = await tx.student.update({
            where: { studentNumber: id },
            data: updateData,
          });
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
    const kursus = await prisma.kursus.findMany({
      orderBy: { name: 'asc' },
    });
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

    // 2. Identify Headers
    const headers = rows[0].map(h => h.trim().toLowerCase());
    
    const idxName = headers.findIndex(h => /nama\s+penuh|nama/i.test(h));
    const idxIc = headers.findIndex(h => /no\s+ic|nric|ic\s+number/i.test(h));
    const idxStudentNum = headers.findIndex(h => /no\s+pelajar|student\s+number|student\s+id/i.test(h));
    const idxKelas = headers.findIndex(h => /kelas|class/i.test(h));
    const idxCohort = headers.findIndex(h => /kohort|cohort/i.test(h));
    const idxEmail = headers.findIndex(h => /email|e-mel|e\s*mel/i.test(h));
    const idxStudentPhone = headers.findIndex(h => /tel\s+pelajar|student\s+phone|telefon\s+pelajar/i.test(h));
    const idxParentName = headers.findIndex(h => /nama\s+penjaga|parent\s+name|nama\s+bapa|nama\s+ibu/i.test(h));
    const idxParentPhone = headers.findIndex(h => /tel\s+penjaga|parent\s+phone|telefon\s+penjaga/i.test(h));

    if (idxName === -1 || idxIc === -1 || idxStudentNum === -1 || idxKelas === -1 || idxCohort === -1 || idxEmail === -1 || idxStudentPhone === -1) {
      return res.status(400).json({
        message: 'Fail CSV mestilah mempunyai kolum NAMA PENUH, NO IC, NO PELAJAR, KELAS, KOHORT, EMAIL, dan TEL PELAJAR.'
      });
    }

    // 3. Load Courses
    const courses = await prisma.kursus.findMany();
    const courseMap = new Map(courses.map(k => [k.code.toUpperCase(), k.id]));

    // 4. Process each student row
    const errors = [];
    let successCount = 0;

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (row.length < 5) continue; // skip empty lines or short lines

      const rawName = row[idxName]?.trim() || '';
      const rawIc = row[idxIc]?.trim() || '';
      const rawStudentNum = row[idxStudentNum]?.trim() || '';
      const rawKelas = row[idxKelas]?.trim() || '';
      const rawCohort = row[idxCohort]?.trim() || '';
      const rawEmail = row[idxEmail]?.trim() || '';
      const rawStudentPhone = row[idxStudentPhone]?.trim() || '';
      const rawParentName = idxParentName !== -1 ? row[idxParentName]?.trim() || '' : '';
      const rawParentPhone = idxParentPhone !== -1 ? row[idxParentPhone]?.trim() || '' : '';

      const lineNum = r + 1;

      // Basic column validation
      if (!rawName && !rawIc && !rawStudentNum && !rawKelas && !rawCohort && !rawEmail && !rawStudentPhone) {
        // Line is empty, skip quietly
        continue;
      }

      if (!rawName || !rawIc || !rawStudentNum || !rawKelas || !rawCohort || !rawEmail || !rawStudentPhone) {
        errors.push({ line: lineNum, message: 'Terdapat ruangan wajib yang kosong (NAMA PENUH, NO IC, NO PELAJAR, KELAS, KOHORT, EMAIL, atau TEL PELAJAR).' });
        continue;
      }

      // Name validation
      if (rawName.length < 2) {
        errors.push({ line: lineNum, message: 'Nama Pelajar mestilah sekurang-kurangnya 2 aksara.' });
        continue;
      }

      // IC Number validation
      const cleanIc = rawIc.replace(/\D/g, '');
      if (cleanIc.length !== 12) {
        errors.push({ line: lineNum, message: 'No. IC mestilah mengandungi 12 digit nombor sahaja.' });
        continue;
      }

      // Student ID validation
      if (rawStudentNum.length < 3) {
        errors.push({ line: lineNum, message: 'No. Pelajar mestilah sekurang-kurangnya 3 aksara.' });
        continue;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(rawEmail)) {
        errors.push({ line: lineNum, message: 'Format alamat email tidak sah.' });
        continue;
      }

      // Student Phone validation
      if (rawStudentPhone.length < 6) {
        errors.push({ line: lineNum, message: 'No. telefon pelajar sekurang-kurangnya 6 aksara.' });
        continue;
      }

      // Cohort validation
      const parsedCohort = parseInt(rawCohort);
      if (isNaN(parsedCohort) || parsedCohort < 2000 || parsedCohort > 2100) {
        errors.push({ line: lineNum, message: 'Kohort mestilah tahun kemasukan yang sah (cth. 2026).' });
        continue;
      }

      // Class Parsing: ^(\d+)\s+(SVM|DVM)\s+(\w+)$
      const classMatch = rawKelas.match(/^(\d+)\s+(SVM|DVM)\s+(\w+)$/i);
      if (!classMatch) {
        errors.push({ line: lineNum, message: `Format KELAS '${rawKelas}' tidak sah. Cth format: 1 SVM CMB` });
        continue;
      }

      const classSem = parseInt(classMatch[1]);
      const classProg = classMatch[2].toUpperCase();
      const classCourseCode = classMatch[3].toUpperCase();

      // Validate parsed course code
      const targetKursusId = courseMap.get(classCourseCode);
      if (!targetKursusId) {
        errors.push({ line: lineNum, message: `Kod Kursus '${classCourseCode}' tidak wujud dalam database.` });
        continue;
      }

      // Compute database semester level
      let dbSemester = classSem;
      if (classProg === 'DVM') {
        dbSemester = classSem + 4;
      }

      // Validate semester range
      if (dbSemester < 1 || dbSemester > 9) {
        errors.push({ line: lineNum, message: `Peringkat semester tidak sah untuk program ${classProg}.` });
        continue;
      }

      // Try-Catch to handle unique index violations or Prisma DB errors
      try {
        const studentNum = rawStudentNum.toUpperCase();
        await prisma.student.upsert({
          where: { studentNumber: studentNum },
          update: {
            icNumber: cleanIc,
            name: rawName,
            email: rawEmail,
            studentPhone: rawStudentPhone,
            kursusId: targetKursusId,
            cohort: parsedCohort,
            programType: classProg,
            semester: dbSemester,
            parentName: rawParentName || 'Penjaga',
            parentPhone: rawParentPhone || 'N/A',
            status: 'ACTIVE',
          },
          create: {
            studentNumber: studentNum,
            icNumber: cleanIc,
            name: rawName,
            email: rawEmail,
            studentPhone: rawStudentPhone,
            kursusId: targetKursusId,
            cohort: parsedCohort,
            programType: classProg,
            semester: dbSemester,
            parentName: rawParentName || 'Penjaga',
            parentPhone: rawParentPhone || 'N/A',
            status: 'ACTIVE',
          },
        });
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
