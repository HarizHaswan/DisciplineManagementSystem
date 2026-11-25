export function mapStudent(row) {
  if (!row) return null;

  const student = {
    studentNumber: row.studentNumber,
    icNumber: row.icNumber,
    name: row.name,
    email: row.email,
    studentPhone: row.studentPhone,
    kursusId: row.kursusId,
    cohort: row.cohort,
    programType: row.programType,
    semester: row.semester,
    status: row.status,
    parentName: row.parentName,
    parentPhone: row.parentPhone,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };

  if (row.kursus_id != null) {
    student.kursus = {
      id: row.kursus_id,
      code: row.kursus_code,
      name: row.kursus_name,
    };
  }

  return student;
}

export function mapOffenceType(row) {
  if (!row || row.offenceType_id == null) return null;
  return {
    id: row.offenceType_id,
    code: row.offenceType_code,
    name: row.offenceType_name,
    category: row.offenceType_category,
    description: row.offenceType_description,
  };
}

export function mapTeacher(row, { includeRole = true } = {}) {
  if (!row || row.teacher_id == null) return null;
  const teacher = {
    id: row.teacher_id,
    name: row.teacher_name,
  };
  if (includeRole) teacher.role = row.teacher_role;
  return teacher;
}

export function mapPrefixedStudent(row) {
  if (!row || row.student_studentNumber == null) return null;
  return {
    studentNumber: row.student_studentNumber,
    icNumber: row.student_icNumber,
    name: row.student_name,
    email: row.student_email,
    studentPhone: row.student_studentPhone,
    kursusId: row.student_kursusId,
    cohort: row.student_cohort,
    programType: row.student_programType,
    semester: row.student_semester,
    status: row.student_status,
    parentName: row.student_parentName,
    parentPhone: row.student_parentPhone,
    createdAt: row.student_createdAt,
    updatedAt: row.student_updatedAt,
  };
}

export function mapOffence(row, { includeStudent = false, includeTeacher = false, includeTeacherRole = true } = {}) {
  const offence = {
    id: row.id,
    studentId: row.studentId,
    offenceTypeId: row.offenceTypeId,
    teacherId: row.teacherId,
    date: row.date,
    description: row.description,
    createdAt: row.createdAt,
    warningLetterId: row.warningLetterId,
    offenceType: mapOffenceType(row),
  };

  if (includeStudent) offence.student = mapPrefixedStudent(row);
  if (includeTeacher) offence.teacher = mapTeacher(row, { includeRole: includeTeacherRole });
  if (row.warningTier != null) offence.warningLetter = { warningTier: row.warningTier };

  return offence;
}

export const OFFENCE_JOINS = `
  FROM \`DisciplinaryRecord\` r
  JOIN \`OffenceType\` o ON o.id = r.offenceTypeId
  JOIN \`Student\` s ON s.studentNumber = r.studentId
  JOIN \`User\` u ON u.id = r.teacherId
`;

export const OFFENCE_COLUMNS = `
  r.id, r.studentId, r.offenceTypeId, r.teacherId, r.date, r.description, r.createdAt, r.warningLetterId,
  o.id AS offenceType_id, o.code AS offenceType_code, o.name AS offenceType_name,
  o.category AS offenceType_category, o.description AS offenceType_description,
  s.studentNumber AS student_studentNumber, s.icNumber AS student_icNumber, s.name AS student_name,
  s.email AS student_email, s.studentPhone AS student_studentPhone, s.kursusId AS student_kursusId,
  s.cohort AS student_cohort, s.programType AS student_programType, s.semester AS student_semester,
  s.status AS student_status, s.parentName AS student_parentName, s.parentPhone AS student_parentPhone,
  s.createdAt AS student_createdAt, s.updatedAt AS student_updatedAt,
  u.id AS teacher_id, u.name AS teacher_name, u.role AS teacher_role
`;
