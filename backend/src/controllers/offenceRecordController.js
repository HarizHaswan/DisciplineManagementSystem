import { z } from 'zod';
import { query, queryOne } from '../config/db.js';
import { mapOffence, mapStudent, OFFENCE_COLUMNS, OFFENCE_JOINS } from '../config/rows.js';
import { generateWarningPDF } from '../services/pdfService.js';

const offenceRecordSchema = z.object({
  studentId: z.string().min(3, 'Student ID (No. Pelajar) must be at least 3 characters'),
  offenceTypeId: z.number().int('Offence Type ID must be an integer'),
  date: z.string().optional(),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

const getClassName = (semester, programType, kursusCode) => {
  if (programType === 'SVM') {
    return `${semester} SVM ${kursusCode}`;
  }
  return `${semester - 4} DVM ${kursusCode}`;
};

async function findOffence(id, { includeTeacherRole = true } = {}) {
  const row = await queryOne(
    `SELECT ${OFFENCE_COLUMNS} ${OFFENCE_JOINS} WHERE r.id = ?`,
    [id]
  );
  if (!row) return null;
  return mapOffence(row, { includeStudent: true, includeTeacher: true, includeTeacherRole });
}

export const getAllOffences = async (req, res) => {
  try {
    const { studentId, category, search, startDate, endDate } = req.query;
    const where = [];
    const params = [];

    if (studentId) {
      where.push('r.studentId = ?');
      params.push(studentId);
    }

    if (category) {
      where.push('o.category = ?');
      params.push(category);
    }

    if (startDate) {
      where.push('r.date >= ?');
      params.push(new Date(startDate));
    }

    if (endDate) {
      where.push('r.date <= ?');
      params.push(new Date(endDate));
    }

    if (search) {
      const term = `%${search}%`;
      where.push('(s.name LIKE ? OR s.icNumber LIKE ? OR r.description LIKE ?)');
      params.push(term, term, term);
    }

    const rows = await query(
      `SELECT ${OFFENCE_COLUMNS}
       ${OFFENCE_JOINS}
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY r.date DESC`,
      params
    );

    return res.status(200).json(rows.map((row) => mapOffence(row, {
      includeStudent: true,
      includeTeacher: true,
    })));
  } catch (error) {
    console.error('Get All Offences Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence records.' });
  }
};

export const getOffenceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const record = await findOffence(id, { includeTeacherRole: false });
    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    return res.status(200).json(record);
  } catch (error) {
    console.error('Get Offence By ID Error:', error);
    return res.status(500).json({ message: 'Internal server error while retrieving record.' });
  }
};

export const createOffence = async (req, res) => {
  try {
    const validation = offenceRecordSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { studentId, offenceTypeId, date, description } = validation.data;
    const teacherId = req.user.id;

    const student = await queryOne('SELECT studentNumber FROM `Student` WHERE studentNumber = ?', [studentId]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const oType = await queryOne('SELECT id FROM `OffenceType` WHERE id = ?', [offenceTypeId]);
    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    const created = await query(
      `INSERT INTO \`DisciplinaryRecord\` (studentId, offenceTypeId, teacherId, date, description)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, offenceTypeId, teacherId, date ? new Date(date) : new Date(), description]
    );

    const row = await queryOne(
      `SELECT ${OFFENCE_COLUMNS} ${OFFENCE_JOINS} WHERE r.id = ?`,
      [created.insertId]
    );
    const record = mapOffence(row, { includeStudent: true });
    delete record.teacher;

    const totalRow = await queryOne(
      'SELECT COUNT(*) AS count FROM `DisciplinaryRecord` WHERE studentId = ?',
      [studentId]
    );
    const totalOffences = Number(totalRow.count);

    let warningTriggered = false;
    let warningIndex = 0;
    let warningLabel = '';

    if (totalOffences === 3) {
      warningTriggered = true;
      warningIndex = 1;
      warningLabel = 'Warning Letter 1';
    } else if (totalOffences === 4) {
      warningTriggered = true;
      warningIndex = 2;
      warningLabel = 'Warning Letter 2';
    } else if (totalOffences >= 5) {
      warningTriggered = true;
      warningIndex = 3;
      warningLabel = 'Suspension / Warning Letter 3';
    }

    return res.status(201).json({
      message: 'Offence logged successfully.',
      record,
      totalOffences,
      warningStatus: {
        warningTriggered,
        warningIndex,
        warningLabel,
      },
    });
  } catch (error) {
    console.error('Create Offence Error:', error);
    return res.status(500).json({ message: 'Internal server error while logging offence.' });
  }
};

export const updateOffence = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const validation = offenceRecordSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { studentId, offenceTypeId, date, description } = validation.data;

    const record = await queryOne('SELECT id, date FROM `DisciplinaryRecord` WHERE id = ?', [id]);
    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    const studentExist = await queryOne('SELECT studentNumber FROM `Student` WHERE studentNumber = ?', [studentId]);
    if (!studentExist) return res.status(404).json({ message: 'Student not found.' });

    const oTypeExist = await queryOne('SELECT id FROM `OffenceType` WHERE id = ?', [offenceTypeId]);
    if (!oTypeExist) return res.status(404).json({ message: 'Offence type not found.' });

    await query(
      `UPDATE \`DisciplinaryRecord\`
       SET studentId = ?, offenceTypeId = ?, date = ?, description = ?
       WHERE id = ?`,
      [studentId, offenceTypeId, date ? new Date(date) : record.date, description, id]
    );

    const updatedRecord = await findOffence(id);
    delete updatedRecord.teacher;

    return res.status(200).json({
      message: 'Record updated successfully.',
      record: updatedRecord,
    });
  } catch (error) {
    console.error('Update Offence Error:', error);
    return res.status(500).json({ message: 'Internal server error while updating record.' });
  }
};

export const deleteOffence = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const record = await queryOne('SELECT id FROM `DisciplinaryRecord` WHERE id = ?', [id]);
    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    await query('DELETE FROM `DisciplinaryRecord` WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Disciplinary record deleted successfully.' });
  } catch (error) {
    console.error('Delete Offence Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting record.' });
  }
};

export const downloadWarningLetter = async (req, res) => {
  try {
    const studentNumber = req.params.studentId;
    const warningIndex = parseInt(req.params.warningIndex, 10);

    if (!studentNumber || isNaN(warningIndex) || warningIndex < 1 || warningIndex > 3) {
      return res.status(400).json({ message: 'Invalid parameters provided.' });
    }

    const row = await queryOne(
      `SELECT s.*, k.code AS kursus_code
       FROM \`Student\` s
       JOIN \`Kursus\` k ON k.id = s.kursusId
       WHERE s.studentNumber = ?`,
      [studentNumber]
    );
    if (!row) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const student = {
      ...mapStudent(row),
      className: getClassName(row.semester, row.programType, row.kursus_code),
    };

    const records = await query(
      `SELECT r.id, r.date, r.description,
              o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
              o.category AS offenceType_category, o.description AS offenceType_description
       FROM \`DisciplinaryRecord\` r
       JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
       WHERE r.studentId = ?
       ORDER BY r.date ASC`,
      [studentNumber]
    );
    const mappedRecords = records.map((record) => mapOffence(record));

    if (warningIndex === 1 && mappedRecords.length < 3) {
      return res.status(400).json({ message: 'Student does not qualify for Warning Letter 1 (requires at least 3 offences).' });
    }
    if (warningIndex === 2 && mappedRecords.length < 4) {
      return res.status(400).json({ message: 'Student does not qualify for Warning Letter 2 (requires at least 4 offences).' });
    }
    if (warningIndex === 3 && mappedRecords.length < 5) {
      return res.status(400).json({ message: 'Student does not qualify for Suspension / Warning Letter 3 (requires at least 5 offences).' });
    }

    const pdfBytes = await generateWarningPDF(student, mappedRecords, warningIndex);
    const safeStudentName = student.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Surat_Amaran_${warningIndex}_${safeStudentName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Download Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while generating warning letter PDF.' });
  }
};
