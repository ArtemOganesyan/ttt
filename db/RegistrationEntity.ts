import { RowDataPacket } from 'mysql2/promise';
import { DatabaseConnection } from './DatabaseConnection';

export interface RegistrationData extends RowDataPacket {
  gender: string;
  first_name: string;
  last_name: string;
  day_of_birth: string;
  month_of_birth: string;
  year_of_birth: string;
  email: string;
  company: string;
  newsletter: boolean;
  password: string;
}

export class RegistrationEntity {
  static async getById(id: number): Promise<RegistrationData | null> {
    return DatabaseConnection.queryOne<RegistrationData>(
      'SELECT * FROM registration_data WHERE id = ?',
      [id]
    );
  }

  static async getByEmail(email: string): Promise<RegistrationData | null> {
    return DatabaseConnection.queryOne<RegistrationData>(
      'SELECT * FROM registration_data WHERE email = ?',
      [email]
    );
  }

  static async getAll(): Promise<RegistrationData[]> {
    return DatabaseConnection.query<RegistrationData>(
      'SELECT * FROM registration_data'
    );
  }

  static async getFirst(): Promise<RegistrationData | null> {
    return DatabaseConnection.queryOne<RegistrationData>(
      'SELECT * FROM registration_data LIMIT 1'
    );
  }
}
