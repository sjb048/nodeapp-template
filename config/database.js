const {Model} = require('objection');
/*
 @Purpose: Database setting information
*/

const env = require('../env');


const host = (env.host)?env.host:'localhost';
const database = (env.database_name)?env.database_name:'';
const user = (env.database_user)?env.database_user:'';
const password = (env.database_password)?env.database_password:'';
const debug = true;
const mysql = require('mysql');
const Knex = require('knex');
const knex  = Knex({
    client: "mysql",
    connection:{
        host: host ,
        user: user,
        password: password,
        database: database,
    },

    debug: true,
    pool: {
        min: 0,
        max: 100
    }
});


// knex.connect(function(err) {
//     if (err)
//         throw err;
//     console.log("Database Connected!");
//     // var sql = "CREATE TABLE users (email VARCHAR(255), address VARCHAR(255))";
//     // con.query(sql, function (err, result) {
//     //     if (err) throw err;
//     //     console.log("Table created");
//     // });
// });

module.exports = knex;