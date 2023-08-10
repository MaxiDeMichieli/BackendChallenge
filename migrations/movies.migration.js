const sqlite = require('sqlite3');
const axios = require('axios');

const db = new sqlite.Database('data/conexa.db');

axios.get('https://swapi.dev/api/films').then((response) => {
  const moviesToInsert = response.data.results;

  let query = '';
  for (const movie of moviesToInsert) {
    query += `INSERT INTO "movies" ("title", "director", "producer", "releaseDate") VALUES ('${movie.title}', '${movie.director}', '${movie.producer}', '${movie.release_date}');\n`;
  }

  db.exec(query);
});
