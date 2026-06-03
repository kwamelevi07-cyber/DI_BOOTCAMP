const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/connection');
const { authenticate } = require('../middleware/auth');
const { avatarUpload, documentUpload } = require('../middleware/upload');
require('dotenv').config();

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '2h' }
  );
}

const profileFields = `
  id, name, email, phone, city, job_title, organization, bio, birth_date,
  country, skills, linkedin_url, github_url, website_url, account_status,
  last_login_at, avatar_path, role, created_at
`;

router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    city,
    job_title,
    organization,
    bio,
    birth_date,
    country,
    skills,
    linkedin_url,
    github_url,
    website_url
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nom, email et mot de passe requis.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caracteres.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (
       name, email, password, phone, city, job_title, organization, bio,
       birth_date, country, skills, linkedin_url, github_url, website_url, role
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name.trim(),
      email.toLowerCase().trim(),
      hashedPassword,
      phone?.trim() || null,
      city?.trim() || null,
      job_title?.trim() || null,
      organization?.trim() || null,
      bio?.trim() || null,
      birth_date || null,
      country?.trim() || null,
      skills?.trim() || null,
      linkedin_url?.trim() || null,
      github_url?.trim() || null,
      website_url?.trim() || null,
      'user'
    ],
    function onInsert(error) {
      if (error) {
        if (error.message.includes('UNIQUE')) {
          return res.status(409).json({ message: 'Cet email est deja utilise.' });
        }

        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      const user = {
        id: this.lastID,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        city: city?.trim() || null,
        job_title: job_title?.trim() || null,
        organization: organization?.trim() || null,
        bio: bio?.trim() || null,
        birth_date: birth_date || null,
        country: country?.trim() || null,
        skills: skills?.trim() || null,
        linkedin_url: linkedin_url?.trim() || null,
        github_url: github_url?.trim() || null,
        website_url: website_url?.trim() || null,
        account_status: 'active',
        role: 'user'
      };
      return res.status(201).json({ token: createToken(user), user });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], async (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    if (user.account_status !== 'active') {
      return res.status(403).json({ message: 'Votre compte est suspendu ou en attente.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      job_title: user.job_title,
      organization: user.organization,
      bio: user.bio,
      birth_date: user.birth_date,
      country: user.country,
      skills: user.skills,
      linkedin_url: user.linkedin_url,
      github_url: user.github_url,
      website_url: user.website_url,
      account_status: user.account_status,
      last_login_at: user.last_login_at,
      avatar_path: user.avatar_path,
      role: user.role
    };

    db.run('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    return res.json({ token: createToken(safeUser), user: safeUser });
  });
});

router.get('/me', authenticate, (req, res) => {
  db.get(
    `SELECT ${profileFields}
     FROM users
     WHERE id = ?`,
    [req.user.id],
    (error, user) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable.' });
      }

      return res.json({ user });
    }
  );
});

router.put('/me', authenticate, (req, res) => {
  const {
    name,
    phone,
    city,
    job_title,
    organization,
    bio,
    birth_date,
    country,
    skills,
    linkedin_url,
    github_url,
    website_url
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Le nom complet est requis.' });
  }

  db.run(
    `UPDATE users
     SET name = ?, phone = ?, city = ?, job_title = ?, organization = ?,
         bio = ?, birth_date = ?, country = ?, skills = ?, linkedin_url = ?,
         github_url = ?, website_url = ?
     WHERE id = ?`,
    [
      name.trim(),
      phone?.trim() || null,
      city?.trim() || null,
      job_title?.trim() || null,
      organization?.trim() || null,
      bio?.trim() || null,
      birth_date || null,
      country?.trim() || null,
      skills?.trim() || null,
      linkedin_url?.trim() || null,
      github_url?.trim() || null,
      website_url?.trim() || null,
      req.user.id
    ],
    function onUpdate(error) {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Utilisateur introuvable.' });
      }

      db.get(
        `SELECT ${profileFields}
         FROM users
         WHERE id = ?`,
        [req.user.id],
        (selectError, user) => {
          if (selectError) {
            return res.status(500).json({ message: 'Erreur serveur.' });
          }

          return res.json({ message: 'Profil mis a jour.', user });
        }
      );
    }
  );
});

router.patch('/me/password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Ancien et nouveau mot de passe requis.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Le nouveau mot de passe doit contenir au moins 6 caracteres.' });
  }

  db.get('SELECT password FROM users WHERE id = ?', [req.user.id], async (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id], (updateError) => {
      if (updateError) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      return res.json({ message: 'Mot de passe mis a jour.' });
    });
  });
});

router.post('/me/avatar', authenticate, avatarUpload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Photo de profil requise.' });
  }

  const avatarPath = `/uploads/avatars/${req.file.filename}`;

  db.run('UPDATE users SET avatar_path = ? WHERE id = ?', [avatarPath, req.user.id], function onUpdate(error) {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.json({ message: 'Photo de profil mise a jour.', avatar_path: avatarPath });
  });
});

router.get('/me/files', authenticate, (req, res) => {
  db.all(
    `SELECT id, original_name, file_path, document_type, mime_type, size, created_at
     FROM user_files
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [req.user.id],
    (error, files) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      return res.json({ files });
    }
  );
});

router.post('/me/files', authenticate, documentUpload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Aucun fichier envoye.' });
  }

  const documentType = req.body.document_type?.trim() || 'Autre';
  let completed = 0;
  let failed = false;

  req.files.forEach((file) => {
    db.run(
      `INSERT INTO user_files (user_id, original_name, stored_name, file_path, document_type, mime_type, size)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        file.originalname,
        file.filename,
        `/uploads/documents/${file.filename}`,
        documentType,
        file.mimetype,
        file.size
      ],
      (error) => {
        if (failed) {
          return;
        }

        if (error) {
          failed = true;
          res.status(500).json({ message: 'Erreur serveur.' });
          return;
        }

        completed += 1;

        if (completed === req.files.length) {
          res.status(201).json({ message: 'Fichier(s) ajoute(s).' });
        }
      }
    );
  });
});

router.delete('/me/files/:id', authenticate, (req, res) => {
  db.get(
    'SELECT file_path FROM user_files WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (findError, file) => {
      if (findError) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      if (!file) {
        return res.status(404).json({ message: 'Fichier introuvable.' });
      }

      db.run(
        'DELETE FROM user_files WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        function onDelete(error) {
          if (error) {
            return res.status(500).json({ message: 'Erreur serveur.' });
          }

          const diskPath = path.resolve(__dirname, '../../', file.file_path.replace('/uploads/', 'uploads/'));

          fs.unlink(diskPath, () => {
            return res.json({ message: 'Fichier supprime.' });
          });
        }
      );
    }
  );
});

router.delete('/me/avatar', authenticate, (req, res) => {
  db.get('SELECT avatar_path FROM users WHERE id = ?', [req.user.id], (findError, user) => {
    if (findError) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (!user || !user.avatar_path) {
      return res.status(404).json({ message: 'Photo de profil introuvable.' });
    }

    db.run('UPDATE users SET avatar_path = NULL WHERE id = ?', [req.user.id], function onUpdate(error) {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur.' });
      }

      const diskPath = path.resolve(__dirname, '../../', user.avatar_path.replace('/uploads/', 'uploads/'));

      fs.unlink(diskPath, () => {
        return res.json({ message: 'Photo de profil supprimee.' });
      });
    });
  });
});

module.exports = router;
