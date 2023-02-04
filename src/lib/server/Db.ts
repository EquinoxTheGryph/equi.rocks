import { env } from '$env/dynamic/private';
import pkg from 'sqlite3';
const { Database } = pkg;

export class Db extends pkg.Database {
	/**
     *
     */
    constructor(filename: string, callback?: ((err: Error | null) => void) | undefined) {
        super(filename, callback);
        console.log('Connecting to DB');
    }
}

export const db = new Db(env.SQLITE_FILE);