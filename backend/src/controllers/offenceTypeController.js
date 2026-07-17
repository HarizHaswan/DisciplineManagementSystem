import { z } from 'zod';
import { prisma } from '../config/db.js';

const offenceTypeSchema = z.object({
  code: z.string().min(2, 'Code must be at least 2 characters (e.g. A01)'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.enum(['Major', 'Medium', 'Minor']),
  description: z.string().optional(),
});

// GET /api/offence-types - List all offence classifications
export const getAllOffenceTypes = async (req, res) => {
  try {
    const categories = await prisma.offenceType.findMany({
      orderBy: { code: 'asc' },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Get All Offence Types Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence types.' });
  }
};

// GET /api/offence-types/:id - Get details of an offence type
export const getOffenceTypeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const oType = await prisma.offenceType.findUnique({
      where: { id },
    });

    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    return res.status(200).json(oType);
  } catch (error) {
    console.error('Get Offence Type By ID Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence type.' });
  }
};

// POST /api/offence-types - Create new offence type (Admin only)
export const createOffenceType = async (req, res) => {
  try {
    const validation = offenceTypeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { code, name, category, description } = validation.data;

    // Check unique code
    const existingCode = await prisma.offenceType.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (existingCode) {
      return res.status(400).json({ message: `Offence type code '${code}' already exists.` });
    }

    const newOType = await prisma.offenceType.create({
      data: {
        code: code.toUpperCase(),
        name,
        category,
        description,
      },
    });

    return res.status(201).json({
      message: 'Offence type created successfully',
      offenceType: newOType,
    });
  } catch (error) {
    console.error('Create Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while creating offence type.' });
  }
};

// PUT /api/offence-types/:id - Update offence type (Admin only)
export const updateOffenceType = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const validation = offenceTypeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { code, name, category, description } = validation.data;

    // Check existence
    const oType = await prisma.offenceType.findUnique({
      where: { id },
    });

    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    // Check code duplication
    if (code.toUpperCase() !== oType.code) {
      const existingCode = await prisma.offenceType.findUnique({
        where: { code: code.toUpperCase() },
      });
      if (existingCode) {
        return res.status(400).json({ message: `Offence type code '${code}' already exists.` });
      }
    }

    const updatedOType = await prisma.offenceType.update({
      where: { id },
      data: {
        code: code.toUpperCase(),
        name,
        category,
        description,
      },
    });

    return res.status(200).json({
      message: 'Offence type updated successfully',
      offenceType: updatedOType,
    });
  } catch (error) {
    console.error('Update Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while updating offence type.' });
  }
};

// DELETE /api/offence-types/:id - Delete offence type (Admin only)
export const deleteOffenceType = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const oType = await prisma.offenceType.findUnique({
      where: { id },
    });

    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    await prisma.offenceType.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Offence type deleted successfully.' });
  } catch (error) {
    console.error('Delete Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting offence type.' });
  }
};
