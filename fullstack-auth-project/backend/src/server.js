const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

require('./database/connection');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'null'] }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'API Auth en ligne.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((error, req, res, next) => {
  if (error) {
    return res.status(400).json({ message: error.message || 'Erreur serveur.' });
  }

  return next();
});

app.listen(port, () => {
  console.log(`Serveur lance sur http://localhost:${port}`);
});
