// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'equirocks',
      user:     'postgres',
      password: 'postgres_dev'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      stub: 'node_modules/knex/lib/migrations/migrate/stub/js.stub'
    }
  },
  
  production: {
    client: 'postgresql',
    connection: {
      database: 'equirocks',
      user:     'postgres',
      password: 'postgres_dev'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      stub: 'node_modules/knex/lib/migrations/migrate/stub/js.stub'
    }
  }

};
