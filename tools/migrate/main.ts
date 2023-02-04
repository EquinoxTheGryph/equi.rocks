import { program } from "commander";
import DbMigrate from "./DbMigrate"

const dbMigrate = new DbMigrate();

// console.log(a.needsMigrating())

program
    .name('migrate')
    .description('Manage the current database')
    .version('0.0.1')

program
    .command('version')
    .description('Get the database version')
    .action(() => {
        dbMigrate.version().then(a => {
            if (!a) {
                console.log('Table not initialized!')
            } else {
                console.log(a)
            }
        });
    })

program
    .command('init')
    .description('Initialize the database')
    .action(() => {
        dbMigrate.init()
    })

program
    .command('up')
    .description('Migrate up')
    .action(() => {
        dbMigrate.migrate()
    })

program.parse()