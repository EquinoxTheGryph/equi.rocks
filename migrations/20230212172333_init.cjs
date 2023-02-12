// TODO: Check the data types and constraints

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex
    .schema
    .createTable('icon', (table) => {
        table.string('name', 32).primary()
        table.text('data').notNullable()
    })
    .createTable('userLink', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.text('title').unique().notNullable()
        table.text('subTitle').notNullable()
        table.text('url').notNullable()
        table.string('icon', 32).references('icon.name')
    })
    .createTable('file', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.uuid('parent').references('file.id').nullable()
        table.string('name')
        table.text('title')
        table.text('description')
        table.string('mimeType')
        table.binary('data')
        table.json('metadata')
        table.datetime('createdOn')
        table.datetime('modifiedOn')
    })
    .createTable('config', (table) => {
        table.string('name', 32).primary()
        table.json('value')
        // table.enu('type')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex
    .schema
    .dropTable('icon')
    .dropTable('userLink')
    .dropTable('file')
    .dropTable('config')
};
