import { z } from 'zod';
import { prisma } from '../config/db.js';
import { generateWarningPDF } from '../services/pdfService.js';

const offenceRecordSchema = z.object({
  studentId: z.string().min(3, 'Student ID (No. Pelajar) must be at least 3 characters'),
  offenceTypeId: z.number().int('Offence Type ID must be an integer'),
  date: z.string().optional(), // ISO string from datepicker
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

// GET /api/offences - List all recorded offences
export const getAllOffences = async (req, res) => {
  try {
    const { studentId, category, search, startDate, endDate } = req.query;
    const where = {};

    if (studentId) {
      where.studentId = studentId; // String - No. Pelajar
    }

    if (category) {
      where.offenceType = { category };
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    if (search) {
      where.OR = [
        { student: { name: { contains: search } } },
        { student: { icNumber: { contains: search } } },
        { description: { contains: search } },
      ];
    }

    const offences = await prisma.disciplinaryRecord.findMany({
      where,
      include: {
        student: true,
        offenceType: true,
        teacher: {
          select: { id: true, name: true, role: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return res.status(200).json(offences);
  } catch (error) {
    console.error('Get All Offences Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence records.' });
  }
};

// GET /api/offences/:id - Get detailed offence record
export const getOffenceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const record = await prisma.disciplinaryRecord.findUnique({
      where: { id },
      include: {
        student: true,
        offenceType: true,
        teacher: {
          select: { id: true, name: true },
        },
      },
    });

    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    return res.status(200).json(record);
  } catch (error) {
    console.error('Get Offence By ID Error:', error);
    return res.status(500).json({ message: 'Internal server error while retrieving record.' });
  }
};

// POST /api/offences - Log a new offence (Teachers and Admins)
export const createOffence = async (req, res) => {
  try {
    const validation = offenceRecordSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { studentId, offenceTypeId, date, description } = validation.data;
    const teacherId = req.user.id; // From auth middleware

    // Validate student exists
    const student = await prisma.student.findUnique({
      where: { studentNumber: studentId },
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Validate offence type exists
    const oType = await prisma.offenceType.findUnique({
      where: { id: offenceTypeId },
    });
    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    // Create record
    const record = await prisma.disciplinaryRecord.create({
      data: {
        studentId,
        offenceTypeId,
        teacherId,
        date: date ? new Date(date) : new Date(),
        description,
      },
      include: {
        student: true,
        offenceType: true,
      },
    });

    // Check count of offences for this student to see if warning triggers
    const totalOffences = await prisma.disciplinaryRecord.count({
      where: { studentId },
    });

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

// PUT /api/offences/:id - Update offence details (Admin only)
export const updateOffence = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const validation = offenceRecordSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { studentId, offenceTypeId, date, description } = validation.data;

    // Check record exists
    const record = await prisma.disciplinaryRecord.findUnique({
      where: { id },
    });
    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    // Verify student & offence type exist
    const studentExist = await prisma.student.findUnique({ where: { studentNumber: studentId } });
    if (!studentExist) return res.status(404).json({ message: 'Student not found.' });

    const oTypeExist = await prisma.offenceType.findUnique({ where: { id: offenceTypeId } });
    if (!oTypeExist) return res.status(404).json({ message: 'Offence type not found.' });

    const updatedRecord = await prisma.disciplinaryRecord.update({
      where: { id },
      data: {
        studentId,
        offenceTypeId,
        date: date ? new Date(date) : record.date,
        description,
      },
      include: {
        student: true,
        offenceType: true,
      },
    });

    return res.status(200).json({
      message: 'Record updated successfully.',
      record: updatedRecord,
    });
  } catch (error) {
    console.error('Update Offence Error:', error);
    return res.status(500).json({ message: 'Internal server error while updating record.' });
  }
};

// DELETE /api/offences/:id - Delete offence record (Admin only)
export const deleteOffence = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid record ID.' });
    }

    const record = await prisma.disciplinaryRecord.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: 'Disciplinary record not found.' });
    }

    await prisma.disciplinaryRecord.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Disciplinary record deleted successfully.' });
  } catch (error) {
    console.error('Delete Offence Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting record.' });
  }
};

// GET /api/offences/warning-letter/:studentId/:warningIndex - Generate and download PDF
export const downloadWarningLetter = async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const warningIndex = parseInt(req.params.warningIndex);

    if (isNaN(studentId) || isNaN(warningIndex) || warningIndex < 1 || warningIndex > 3) {
      return res.status(400).json({ message: 'Invalid parameters provided.' });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Retrieve all recorded offences for the student to display in the letter
    const records = await prisma.disciplinaryRecord.findMany({
      where: { studentId },
      include: { offenceType: true },
      orderBy: { date: 'asc' },
    });

    // Double check that student qualifies for the letter
    // 3 offences -> Warning 1
    // 4 offences -> Warning 2
    // 5+ offences -> Suspension (Warning 3)
    if (warningIndex === 1 && records.length < 3) {
      return res.status(400).json({ message: 'Student does not qualify for Warning Letter 1 (requires at least 3 offences).' });
    }
    if (warningIndex === 2 && records.length < 4) {
      return res.status(400).json({ message: 'Student does not qualify for Warning Letter 2 (requires at least 4 offences).' });
    }
    if (warningIndex === 3 && records.length < 5) {
      return res.status(400).json({ message: 'Student does not qualify for Suspension / Warning Letter 3 (requires at least 5 offences).' });
    }

    // Generate PDF bytes
    const pdfBytes = await generateWarningPDF(student, records, warningIndex);

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
