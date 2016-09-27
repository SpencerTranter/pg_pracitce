"use strict";
const pg = require("pg");
const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function insert_person(firstname, lastname, birthdate){
  console.log('Adding...');

  knex('famous_people')
  .insert({
    first_name: firstname,
    last_name: lastname,
    birthdate: birthdate })
  .asCallback(function(err, result){
    if (err) return console.log(err);
    console.log('Added!');
    })
  }

insert_person(process.argv[2], process.argv[3], process.argv[4]);

