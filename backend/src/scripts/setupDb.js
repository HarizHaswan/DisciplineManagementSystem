import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import { closePool, getDbConfig, query } from '../config/db.js';

const schemaPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../sql/schema.sql');

async function main() {
  const existing = await query(
    `SELECT table_name AS tableName
     FROM information_schema.tables
     WHERE table_schema = DATABASE() AND LOWER(table_name) = 'user'`
  );

  if (existing.length > 0) {
    console.log('Database tables already exist. Nothing to create.');
    return;
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const conn = await mysql.createConnection(getDbConfig({ multipleStatements: true }));
  try {
    await conn.query(schemaSql);
  } finally {
    await conn.end();
  }

  console.log('Database tables created.');
}

main()
  .catch((error) => {
    console.error('Failed to set up the database:');
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
