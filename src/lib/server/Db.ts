import { Database } from 'sqlite3';

export class Db extends Database {
	/**
     *
     */
    constructor(filename: string, callback?: ((err: Error | null) => void) | undefined) {
        super(filename, callback);
        console.log('Connecting to DB');
    }
}

export const db = new Db(':memory:');
