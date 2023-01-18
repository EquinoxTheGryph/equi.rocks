import { Database } from 'sqlite3';

export class Db extends Database {
	
}

export const db = new Db(':memory:');
