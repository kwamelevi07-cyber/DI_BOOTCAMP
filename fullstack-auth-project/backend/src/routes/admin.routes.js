const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get('/users', (req, res) => {
  db.all(
    `SELECT id, name, email, phone, city, job_title, organization, country,
            skills, account_status, last_login_at, role, created_at
     FROM users
     ORDER BY created_at DESC`,
    [],
    (error, users) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      return res.json({ users });
    }
  );
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, city, job_title, organization, country, skills, account_status, role } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Le nom complet est requis.' });
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Role invalide.' });
  }

  if (!['active', 'pending', 'suspended'].includes(account_status)) {
    return res.status(400).json({ message: 'Statut de compte invalide.' });
  }

  db.run(
    `UPDATE users
     SET name = ?, phone = ?, city = ?, job_title = ?, organization = ?,
         country = ?, skills = ?, account_status = ?, role = ?
     WHERE id = ?`,
    [
      name.trim(),
      phone?.trim() || null,
      city?.trim() || null,
      job_title?.trim() || null,
      organization?.trim() || null,
      country?.trim() || null,
      skills?.trim() || null,
      account_status,
      role,
      id
    ],
    function onUpdate(error) {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Utilisateur introuvable.' });
      }

      return res.json({ message: 'Utilisateur mis a jour.' });
    }
  );
});

router.patch('/users/:id/role', (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Role invalide.' });
  }

  db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function onUpdate(error) {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.json({ message: 'Role mis a jour.' });
  });
});

router.patch('/users/:id/password', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caracteres.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], function onUpdate(error) {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.json({ message: 'Mot de passe mis a jour.' });
  });
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  if (Number(id) === req.user.id) {
    return res.status(400).json({ message: 'Vous ne pouvez pas supprimer votre propre compte.' });
  }

  db.run('DELETE FROM users WHERE id = ?', [id], function onDelete(error) {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.json({ message: 'Utilisateur supprime.' });
  });
});

module.exports = router;
