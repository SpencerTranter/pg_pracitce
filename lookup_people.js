"use strict";
const pg = require("pg");
// settings.json
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  search_person(process.argv[2]);
});

function search_person(name){
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text",[name], (err, result) => {
    console.log('Searching...');

    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found (${result.rows.length}) persons by the name \'${name}\'`);
    print_person(result.rows);
    client.end();
  });
}

function print_person(person_array){
  person_array.forEach(function(curr) {
    console.log(curr.id, curr.first_name, curr.last_name, curr.birthdate);
  });
}