import fs from 'node:fs/promises';
import * as path from 'path';
import pkg from 'sqlite3';
const { Database } = pkg;

// const __dirname = import.meta.url;

export default class DbMigrate {
	db: pkg.Database;

	versionTable = '_version';
	// dbFile = './test2.db';
	dbFile = ':memory:';
	migrationsFolder = path.resolve(__dirname, 'migrations');

	constructor() {
		this.db = new Database(this.dbFile);
	}

	// Check the current version and return its name
	version(): Promise<any> {
		return new Promise((res, rej) => {
			this.sqlAll(`SELECT * FROM ${this.versionTable}`)
				.then((items) => res(items))
				.catch((error: Error) => {
					if (error.message.includes('no such table')) {
						res('');
					} else {
						rej(error);
					}
				});
		});
	}

	needsMigrating() {
		// Check if the database needs to be migrated to the most recent version
		// Returns a boolean
		this.version();
	}

	async migrate(target?: string) {
		// Migrate up or down, depending on the target (always up if null)
		// Apply the required steps
		// Set the current version in the db
		// Returns the current version if successful
        console.log('Getting version...')
		const version = await this.version();

		if (!version) {
			console.log('No version table found. Creating required tables...');
			await this.init();
		}

        console.log('Getting list of files...')
		const files = (await fs.readdir(this.migrationsFolder))
			.filter((fileName) => fileName.endsWith('.sql'))
			.sort();

        // TODO: Only run migrations going up (_UP.sql or .sql)

		console.log(version, files);

		files.forEach(async (file) => {
            console.log('Applying migration: ' + file)
			await this.sqlRunFile(path.resolve(this.migrationsFolder, file));
            // TODO: Save version
		});
	}

	init(): Promise<void> {
		return new Promise((res, rej) => {
			this.db.run(
				`
                    CREATE TABLE ${this.versionTable} ( 
                        date INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
                        name TEXT NOT NULL
                    );
                `,
				(error) => {
					if (error) rej(error);
					else res();
				}
			);
		});
	}

	sqlAll(sql: string): Promise<Record<string, any>[]> {
		return new Promise((res, rej) => {
			this.db.all(sql, (error, arr) => {
				if (error) rej(error);
				else res(arr);
			});
		});
	}

	sqlGet(sql: string): Promise<Record<string, any>> {
		return new Promise((res, rej) => {
			this.db.get(sql, (error, arr) => {
				if (error) rej(error);
				else res(arr);
			});
		});
	}

	sqlRunFile(filename: string): Promise<void> {
		return new Promise((res, rej) => {
			fs.readFile(filename, 'utf-8').then((data) =>
				this.db.exec(data, (error) => {
					if (error) rej(error);
					else res();
				})
			);
		});
	}
}
