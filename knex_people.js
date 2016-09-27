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

function search_person(name, cb){
  console.log('Searching...');

  knex('famous_people').select()
    .where({
        first_name: name })
    .orWhere({
      last_name : name })
    .asCallback(function(err, result){
      if (err) return console.log(err);
      console.log(`Found (${result.length}) persons by the name \'${name}\'`);
      cb(result);
    });
}

function print_person(person_array){
  person_array.forEach(function(curr) {
    console.log(curr.id, curr.first_name, curr.last_name, curr.birthdate);
  });
}

search_person(process.argv[2], print_person);