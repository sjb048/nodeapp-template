
const { Model } = require('objection');
const knex = require("../../config/database");

class Project extends Model {
    static get tableName() {
        return 'projects';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
            },
        };
    }
    static createTable() {
        return knex.schema.createTable(this.tableName,  (table) => {
            table.increments('id').primary();;
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.timestamps();
        });
    }
}

module.exports = Project;