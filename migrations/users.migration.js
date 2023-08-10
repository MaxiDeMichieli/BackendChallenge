const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite.Database('data/conexa.db');

bcrypt.hash('Admin123.', 12).then((encryptedPassword) => {
  const query = `INSERT INTO "users" ("firstName", "lastName", "email", "role", "password") VALUES ('Admin', 'Admin', 'admin@test.com', 'ADMIN', '${encryptedPassword}')`;
  db.exec(query);
});
