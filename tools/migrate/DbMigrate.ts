import pkg from 'sqlite3';
const { Database } = pkg;

export default class DbMigrate {
	db: pkg.Database;

    versionTable = '_version';
    dbFile = '_version';

	constructor() {
		this.db = new Database(this.dbFile);
	}

	version() {
		// Check the current version and return its name
        this.sqlAll(`SELECT * FROM ${this.versionTable}`)
            .then((items) => console.log(items))
            .catch((error) => console.error('ERROR',error))
	}

	needsMigrating() {
		// Check if the database needs to be migrated to the most recent version
		// Returns a boolean
        this.version()
	}

	migrate(target?: string) {
		// Migrate up or down, depending on the target (always up if null)
		// Apply the required steps
		// Set the current version in the db
		// Returns the current version if successful
	}

    createVersionTable() {
        this.db.run(`
            CREATE TABLE ${this.versionTable} ( 
                date INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
                name TEXT NOT NULL    
            );
        `, (error) => console.error(error));
    }

    sqlAll(sql: string) {
        return new Promise<Record<string,any>[]>((res, rej) => {
            this.db.all(sql, (error, arr) => {
                if (error) rej(error); 
                else res(arr);
            });
        })
    }

    sqlGet(sql: string) {
        return new Promise<Record<string,any>>((res, rej) => {
            this.db.get(sql, (error, arr) => {
                if (error) rej(error); 
                else res(arr);
            });
        })
    }
}
