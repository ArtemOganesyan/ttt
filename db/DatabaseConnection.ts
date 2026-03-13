import mysql, { Pool, RowDataPacket } from 'mysql2/promise';
import { database } from '../config';

export class DatabaseConnection {
  private static pool: Pool | null = null;

  private static getPool(): Pool {
    if (!DatabaseConnection.pool) {
      DatabaseConnection.pool = mysql.createPool({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.name,
        connectionLimit: 5,
        connectTimeout: 10000,
      });
    }
    return DatabaseConnection.pool;
  }

  static async query<T extends RowDataPacket>(sql: string, params?: unknown[]): Promise<T[]> {
    const [rows] = await DatabaseConnection.getPool().query<T[]>(sql, params);
    return rows;
  }

  static async queryOne<T extends RowDataPacket>(sql: string, params?: unknown[]): Promise<T | null> {
    const rows = await DatabaseConnection.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  static async close(): Promise<void> {
    if (DatabaseConnection.pool) {
      await DatabaseConnection.pool.end();
      DatabaseConnection.pool = null;
    }
  }
}
