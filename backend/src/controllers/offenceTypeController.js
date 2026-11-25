import { z } from 'zod';
import { query, queryOne } from '../config/db.js';

const offenceTypeSchema = z.object({
  code: z.string().min(2, 'Code must be at least 2 characters (e.g. A01)'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.enum(['Major', 'Medium', 'Minor']),
  description: z.string().optional(),
});

export const getAllOffenceTypes = async (req, res) => {
  try {
    const categories = await query(
      'SELECT id, code, name, category, description FROM `OffenceType` ORDER BY code ASC'
    );
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Get All Offence Types Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence types.' });
  }
};

export const getOffenceTypeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const oType = await queryOne(
      'SELECT id, code, name, category, description FROM `OffenceType` WHERE id = ?',
      [id]
    );

    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    return res.status(200).json(oType);
  } catch (error) {
    console.error('Get Offence Type By ID Error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching offence type.' });
  }
};

export const createOffenceType = async (req, res) => {
  try {
    const validation = offenceTypeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { code, name, category, description } = validation.data;
    const upperCode = code.toUpperCase();

    const existingCode = await queryOne('SELECT id FROM `OffenceType` WHERE code = ?', [upperCode]);
    if (existingCode) {
      return res.status(400).json({ message: `Offence type code '${code}' already exists.` });
    }

    const created = await query(
      'INSERT INTO `OffenceType` (code, name, category, description) VALUES (?, ?, ?, ?)',
      [upperCode, name, category, description ?? null]
    );
    const newOType = await queryOne(
      'SELECT id, code, name, category, description FROM `OffenceType` WHERE id = ?',
      [created.insertId]
    );

    return res.status(201).json({
      message: 'Offence type created successfully',
      offenceType: newOType,
    });
  } catch (error) {
    console.error('Create Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while creating offence type.' });
  }
};

export const updateOffenceType = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const validation = offenceTypeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { code, name, category, description } = validation.data;
    const upperCode = code.toUpperCase();

    const oType = await queryOne('SELECT id, code FROM `OffenceType` WHERE id = ?', [id]);
    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    if (upperCode !== oType.code) {
      const existingCode = await queryOne('SELECT id FROM `OffenceType` WHERE code = ?', [upperCode]);
      if (existingCode) {
        return res.status(400).json({ message: `Offence type code '${code}' already exists.` });
      }
    }

    await query(
      'UPDATE `OffenceType` SET code = ?, name = ?, category = ?, description = ? WHERE id = ?',
      [upperCode, name, category, description ?? null, id]
    );
    const updatedOType = await queryOne(
      'SELECT id, code, name, category, description FROM `OffenceType` WHERE id = ?',
      [id]
    );

    return res.status(200).json({
      message: 'Offence type updated successfully',
      offenceType: updatedOType,
    });
  } catch (error) {
    console.error('Update Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while updating offence type.' });
  }
};

export const deleteOffenceType = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid offence type ID.' });
    }

    const oType = await queryOne('SELECT id FROM `OffenceType` WHERE id = ?', [id]);
    if (!oType) {
      return res.status(404).json({ message: 'Offence type not found.' });
    }

    await query('DELETE FROM `OffenceType` WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Offence type deleted successfully.' });
  } catch (error) {
    console.error('Delete Offence Type Error:', error);
    return res.status(500).json({ message: 'Internal server error while deleting offence type.' });
  }
};
