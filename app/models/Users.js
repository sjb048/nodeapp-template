// Task Model
const { Model } = require('objection');
const knex = require('../../config/database');
const {static} = require("express");
Model.knex(knex);
// Pass he knex connection to Objection
// Model.knex(db);

class Users extends Model {

    // Tells objection what the db
    // table is for the model
    static get tableName() {
        return 'users';
    }

    static get nameColumn()
    {
        return 'name';
    }
    static get emailColumn()
    {
        return 'email';
    }
    static get passwordColumn()
    {
        return 'password';
    }
    static  get jsonSchema(){
        return {
            type: 'object',
            required: ['name', 'email', 'password'],

            properties: {
                id: { type: 'integer' },
                // parentId: { type: ['integer', 'null'] },
                name: { type: 'string', minLength: 2, maxLength: 255 },
                email: { type: 'string' },
                password: {type: 'string', minLength: 6, maxLength: 255 }


                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.

            }
        };
    }


    static createTable() {
        return knex.schema.createTable('users',  (table) => {
            table.increments('id').primary();;
            table.string('name').notNullable();
            table.string('email').unique();
            table.string('password').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
}


module.exports = Users;