// tableCreation.js

const knex = require('./config/database');
const userSchema = async () => {
    const exists = await knex.schema.hasTable('users');
    if (!exists) {
        return knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name', 255);
            table.string('email', 255).unique().index();
            table.string('password', 255);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
};

userSchema();

const projectSchema = async () => {
    const exists = await knex.schema.hasTable('projects');
    if (!exists) {
        return knex.schema.createTable('projects', (table) => {
            table.increments('id').primary();
            table.string('title');
            table.text('description');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
};
projectSchema();

module.exports = {projectSchema,userSchema};
