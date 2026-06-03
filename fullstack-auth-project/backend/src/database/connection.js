const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const databaseFile = process.env.DATABASE_FILE || './src/database/app.db';
const dbPath = path.resolve(__dirname, '../../', databaseFile);

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erreur de connexion SQLite:', error.message);
    process.exit(1);
  }
});

module.exports = db;
