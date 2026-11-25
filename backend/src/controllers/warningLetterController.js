import { prisma } from '../config/db.js';
import { generateWarningPDF } from '../services/pdfService.js';

const getClassName = (semester, programType, kursusCode) => {
  if (programType === 'SVM') {
    return `${semester} SVM ${kursusCode}`;
  } else {
    // DVM Sem 5-9 maps to 1-5 DVM
    return `${semester - 4} DVM ${kursusCode}`;
  }
};

// GET /api/warning-letters - List warning letters, filter by student, month, status
export const getAllWarningLetters = async (req, res) => {
  try {
    const { month, studentId, status } = req.query;
    const userRole = req.user.role;

    const whereClause = {};

    if (studentId) {
      whereClause.studentId = parseInt(studentId);
    }

    if (month) {
      whereClause.month = month;
    }

    // Teachers can only view ISSUED warning letters
    if (userRole === 'TEACHER') {
      whereClause.status = 'ISSUED';
    } else if (status) {
      whereClause.status = status;
    }

    const warningLetters = await prisma.warningLetter.findMany({
      where: whereClause,
      include: {
        student: {
          include: {
            kursus: true,
          }
        },
      },
      orderBy: { issuedDate: 'desc' },
    });

    const studentIds = [...new Set(warningLetters.map((wl) => wl.studentId))];
    const allStudentRecords = studentIds.length > 0
      ? await prisma.disciplinaryRecord.findMany({
          where: {
            studentId: { in: studentIds },
            warningLetterId: { not: null },
          },
          include: {
            offenceType: true,
            teacher: true,
            warningLetter: { select: { warningTier: true } },
          },
          orderBy: [{ date: 'asc' }, { id: 'asc' }],
        })
      : [];

    const formatted = warningLetters.map((wl) => ({
      ...wl,
      records: allStudentRecords
        .filter((rec) => rec.studentId === wl.studentId && rec.warningLetter?.warningTier <= wl.warningTier)
        .map(({ warningLetter: _wl, ...rec }) => rec),
      student: {
        ...wl.student,
        kursusCode: wl.student.kursus.code,
        kursusName: wl.student.kursus.name,
        className: getClassName(wl.student.semester, wl.student.programType, wl.student.kursus.code),
      }
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Get All Warning Letters Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching warning letters.' });
  }
};

// GET /api/warning-letters/eligible - Get students qualifying for a new warning letter (Admin only)
export const getEligibleStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        kursus: true,
        records: {
          where: { warningLetterId: null },
          include: { offenceType: true },
          orderBy: { date: 'asc' },
        },
        warningLetters: {
          orderBy: { warningTier: 'desc' },
        },
      },
    });

    const eligible = [];

    for (const student of students) {
      const unlinkedCount = student.records.length;
      const highestWarning = student.warningLetters[0]?.warningTier || 0;

      let eligibleTier = 0;
      let offencesToLink = [];

      if (highestWarning === 0 && unlinkedCount >= 3) {
        eligibleTier = 1;
        offencesToLink = student.records.slice(0, 3);
      } else if (highestWarning === 1 && unlinkedCount >= 1) {
        eligibleTier = 2;
        offencesToLink = student.records.slice(0, 1);
      } else if (highestWarning === 2 && unlinkedCount >= 1) {
        eligibleTier = 3;
        offencesToLink = student.records.slice(0, 1);
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

// POST /api/warning-letters/generate - Create warning letter draft (Admin only)
export const generateWarningLetter = async (req, res) => {
  try {
    const { studentId, tier } = req.body;

    if (!studentId || !tier) {
      return res.status(400).json({ message: 'studentId and tier are required.' });
    }

    const student = await prisma.student.findUnique({
      where: { studentNumber: String(studentId) },
      include: {
        records: {
          where: { warningLetterId: null },
          orderBy: { date: 'asc' },
        },
        warningLetters: {
          orderBy: { warningTier: 'desc' },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const highestWarning = student.warningLetters[0]?.warningTier || 0;

    if (tier !== highestWarning + 1) {
      return res.status(400).json({ 
        message: `Invalid warning tier sequence. Student highest warning is ${highestWarning}, so next warning must be ${highestWarning + 1}.` 
      });
    }

    let offencesToLink = [];
    if (tier === 1 && student.records.length >= 3) {
      offencesToLink = student.records.slice(0, 3);
    } else if (tier === 2 && student.records.length >= 1) {
      offencesToLink = student.records.slice(0, 1);
    } else if (tier === 3 && student.records.length >= 1) {
      offencesToLink = student.records.slice(0, 1);
    } else {
      return res.status(400).json({ message: 'Student does not qualify for this warning tier.' });
    }

    const currentDate = new Date();
    const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    const warningLetter = await prisma.$transaction(async (tx) => {
      const letter = await tx.warningLetter.create({
        data: {
          studentId: student.studentNumber,
          warningTier: tier,
          status: 'PENDING',
          month: monthStr,
        },
      });

      await tx.disciplinaryRecord.updateMany({
        where: {
          id: { in: offencesToLink.map((o) => o.id) },
        },
        data: {
          warningLetterId: letter.id,
        },
      });

      return letter;
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

// POST /api/warning-letters/:id/issue - Approve and issue warning letter (Admin only)
export const issueWarningLetter = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await prisma.warningLetter.findUnique({
      where: { id },
    });

    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    if (warningLetter.status === 'ISSUED') {
      return res.status(400).json({ message: 'Warning letter has already been issued.' });
    }

    const updated = await prisma.warningLetter.update({
      where: { id },
      data: {
        status: 'ISSUED',
        issuedDate: new Date(),
      },
    });

    return res.status(200).json({
      message: 'Warning letter approved and issued successfully.',
      warningLetter: updated,
    });
  } catch (error) {
    console.error('Issue Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while issuing warning letter.' });
  }
};

// DELETE /api/warning-letters/:id - Delete warning letter draft (Admin only)
export const deleteWarningLetter = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await prisma.warningLetter.findUnique({
      where: { id },
    });

    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    if (warningLetter.status !== 'PENDING') {
      return res.status(400).json({ message: 'Only warning letter drafts (PENDING status) can be deleted.' });
    }

    await prisma.$transaction(async (tx) => {
      await tx.disciplinaryRecord.updateMany({
        where: { warningLetterId: id },
        data: { warningLetterId: null },
      });

      await tx.warningLetter.delete({
        where: { id },
      });
    });

    return res.status(200).json({ message: 'Warning letter draft deleted successfully, offences returned to pool.' });
  } catch (error) {
    console.error('Delete Warning Letter Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting warning letter draft.' });
  }
};

// GET /api/warning-letters/:id/pdf - Stream PDF of warning letter
export const getWarningLetterPDF = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid warning letter ID.' });
    }

    const warningLetter = await prisma.warningLetter.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            kursus: true,
          }
        },
      },
    });

    if (!warningLetter) {
      return res.status(404).json({ message: 'Warning letter not found.' });
    }

    // Teachers can only view/download ISSUED warning letters
    if (req.user.role === 'TEACHER' && warningLetter.status !== 'ISSUED') {
      return res.status(403).json({ message: 'Teachers are not authorized to preview warning letter drafts.' });
    }

    // Include all offences committed by the student up to this warning tier
    const cumulativeRecords = await prisma.disciplinaryRecord.findMany({
      where: {
        studentId: warningLetter.studentId,
        warningLetter: {
          warningTier: { lte: warningLetter.warningTier },
        },
      },
      include: { offenceType: true },
      orderBy: [{ date: 'asc' }, { id: 'asc' }],
    });

    // Adapt format to match what PDF generator expects
    const studentWithDynamicClass = {
      ...warningLetter.student,
      program: warningLetter.student.kursus.name,
      className: getClassName(warningLetter.student.semester, warningLetter.student.programType, warningLetter.student.kursus.code),
    };

    const pdfBytes = await generateWarningPDF(
      studentWithDynamicClass,
      cumulativeRecords,
      warningLetter.warningTier
    );

    const safeStudentName = warningLetter.student.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Surat_Amaran_${warningLetter.warningTier}_${safeStudentName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Get Warning Letter PDF Error:', error);
    return res.status(500).json({ message: 'Internal server error while generating warning letter PDF.' });
  }
};
