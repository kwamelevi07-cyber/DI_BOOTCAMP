# Projet complet frontend/backend/base de donnees

Ce projet contient une application complete avec inscription, connexion, interface utilisateur, interface administrateur et base de donnees SQLite.

## Structure

```text
fullstack-auth-project/
  backend/
    src/
      database/
      middleware/
      routes/
      server.js
  frontend/
    index.html
    styles.css
    app.js
```

## Fonctionnalites

- Inscription utilisateur
- Connexion avec JWT
- Interface utilisateur apres connexion
- Interface administrateur reservee au role `admin`
- Liste des utilisateurs
- Modification du role utilisateur/admin
- Suppression d'un utilisateur
- Base de donnees SQLite locale

## Installation backend

```bash
cd backend
npm install
copy .env.example .env
npm run init-db
npm run dev
```

Le backend sera disponible sur :

```text
http://localhost:5000
```

## Lancement frontend

Ouvre le fichier suivant dans ton navigateur :

```text
frontend/index.html
```

Tu peux aussi utiliser l'extension Live Server dans VS Code.

## Comptes de test

Administrateur :

```text
Email: admin@example.com
Mot de passe: admin123
```

Utilisateur :

```text
Email: user@example.com
Mot de passe: user123
```

## Routes API

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/admin/users
PATCH  /api/admin/users/:id/role
DELETE /api/admin/users/:id
```
