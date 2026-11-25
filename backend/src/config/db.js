import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(backendRoot, '.env') });

export function getDbConfig(extra = {}) {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error('DATABASE_URL is not set. Add it to backend/.env');
  }

  const url = new URL(raw);
  const database = decodeURIComponent(url.pathname.replace(/^\//, ''));
  if (!database) {
    throw new Error('DATABASE_URL is missing a database name');
  }

  return {
    host: url.hostname === 'localhost' ? '127.0.0.1' : url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    timezone: 'Z',
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    ...extra,
  };
}

export const pool = mysql.createPool(getDbConfig());

export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export async function withTransaction(fn) {
  const conn = await pool.getConnection();
  const tx = {
    async query(sql, params = []) {
      const [rows] = await conn.query(sql, params);
      return rows;
    },
    async one(sql, params = []) {
      const [rows] = await conn.query(sql, params);
      return rows[0] || null;
    },
  };

  try {
    await conn.beginTransaction();
    const result = await fn(tx);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function closePool() {
  await pool.end();
}
