const fs = require('fs');
const path = require('path');
const sqlite = require('sqlite3');

const dataFolderPath = path.join('data');
const dbFilePath = path.join(dataFolderPath, 'conexa.db');

if (!fs.existsSync(dataFolderPath)) {
  fs.mkdirSync(dataFolderPath);
}

if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, '', 'utf-8');
}

const db = new sqlite.Database('data/conexa.db');
const dbStructureSql = fs.readFileSync(path.join(__dirname, 'db-structure.sql'), 'utf-8');
db.exec(dbStructureSql);
