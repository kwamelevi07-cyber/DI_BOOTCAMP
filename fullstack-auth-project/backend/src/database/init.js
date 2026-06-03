const bcrypt = require('bcryptjs');
const db = require('./connection');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
    
`;

db.serialize(async () => {
  db.run(createUsersTable);

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  db.run(
    `INSERT OR IGNORE INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    ['Administrateur', 'admin@example.com', adminPassword, 'admin']
  );

  db.run(
    `INSERT OR IGNORE INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    ['Utilisateur Demo', 'user@example.com', userPassword, 'user'],
    (error) => {
      if (error) {
        console.error('Erreur initialisation DB:', error.message);
      } else {
        console.log('Base de donnees initialisee avec succes.');
        console.log('Admin: admin@example.com / admin123');
        console.log('User : user@example.com / user123');
      }

      db.close();
    }
  );
});
