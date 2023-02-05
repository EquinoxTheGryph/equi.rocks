import fs from 'node:fs/promises';
import * as path from 'path';
import pkg from 'sqlite3';
const { Database } = pkg;

interface VersionEntry {
	name: string
	date: number
}

export default class DbMigrate {
	db: pkg.Database;

	versionTable = '_version';
	dbFile = './test2.db';
	// dbFile = ':memory:';
	migrationsFolder = path.resolve(__dirname, 'migrations');

	migrationUpRegex = /^(?<version>\d)+_.+(?<!_DOWN)(_UP)?\.sql$/;
	migrationDownRegex = /^(?<version>\d)+_.+_DOWN\.sql$/;

	constructor() {
		this.db = new Database(this.dbFile);
	}

	// Check the current version and return its name
	version(): Promise<VersionEntry | null> {
		return new Promise((res, rej) => {
			this.sqlGet<VersionEntry>(
				`SELECT * FROM ${this.versionTable} ORDER BY name DESC`
			)
				.then((items) => {
					res(items);
				})
				.catch((error: Error) => {
					if (error.message.includes('no such table')) {
						res(null);
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

	async migrateUp(target?: string): Promise<VersionEntry | null> {
		// Migrate up or down, depending on the target (always up if null)
		// Apply the required steps
		// Set the current version in the db
		// Returns the current version if successful
		console.log('Getting version...');
		const version = await this.version();
		let versionNumber = parseInt(version?.name ?? '');

		if (isNaN(versionNumber)) {
			console.log('No version table found. Creating required tables...');
			await this.init();
			versionNumber = -1;
		}

		console.log('Getting list of files...');
		const files = (await fs.readdir(this.migrationsFolder))
			.filter((fileName) => {
				const match = fileName.match(this.migrationUpRegex);
				// console.log(fileName, match, (match?.groups?.version ?? -1) > currentVersion);
				return match && (match?.groups?.version ?? -1) > versionNumber;
			})
			.sort();

		if (!files?.length) {
			console.log('Database up to date!');
			return version;
		}

		let promiseChain = Promise.resolve();

		files.forEach((file) => {
			promiseChain = promiseChain
				.then(() => {
					console.log('Applying migration: ' + file);
					return this.sqlRunFile(path.resolve(this.migrationsFolder, file));
				})
				.then(() => {
					return this.sqlRun(`
						INSERT INTO ${this.versionTable} (name, date) 
						VALUES ("${file.replace(/(_UP)?\..+$/, '')}", UNIXEPOCH());
					`);
				});
		});

		await promiseChain;

		console.log('Database up to date!');
		return await this.version();
	}

	init(): Promise<void> {
		return new Promise((res, rej) => {
			this.db.run(
				`
                    CREATE TABLE ${this.versionTable} ( 
                        name TEXT NOT NULL PRIMARY KEY,
                        date INTEGER NOT NULL
                    );
                `,
				(error) => {
					if (error) rej(error);
					else res();
				}
			);
		});
	}

	//#region Promisified sql functions
	sqlAll<T = Record<string, unknown>>(sql: string): Promise<T[]> {
		return new Promise((res, rej) => {
			this.db.all(sql, (error, arr) => {
				if (error) rej(error);
				else res(arr);
			});
		});
	}

	sqlGet<T = Record<string, unknown>>(sql: string): Promise<T> {
		return new Promise((res, rej) => {
			this.db.get(sql, (error, arr) => {
				if (error) rej(error);
				else res(arr);
			});
		});
	}

	sqlRun(sql: string): Promise<void> {
		return new Promise((res, rej) => {
			this.db.run(sql, (error) => {
				if (error) rej(error);
				else res();
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
	//#endregion
}
