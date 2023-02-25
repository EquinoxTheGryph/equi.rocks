/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
    .schema
    .createTable('icon', (table) => {
        table.string('name', 32).primary().index()
        table.text('data').notNullable()
    })
    .createTable('userLink', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).index()
        table.text('title').unique().notNullable()
        table.text('subTitle').notNullable()
        table.text('url').notNullable()
        table.string('icon', 32).references('name').inTable('icon')
    })
    .createTable('file', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).index()
        table.uuid('parent').nullable().references('id')
        table.string('name').notNullable()
        table.text('title').notNullable()
        table.text('description')
        table.string('mimeType').notNullable()
        table.binary('data')
        table.json('metadata')
        table.datetime('createdOn').notNullable()
        table.datetime('modifiedOn').notNullable()
    })
    .createTable('config', (table) => {
        table.string('name', 32).primary().index()
        table.json('data').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTable('icon')
    .dropTable('userLink')
    .dropTable('file')
    .dropTable('config')
};
