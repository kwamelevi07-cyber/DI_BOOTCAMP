const API_URL = 'http://localhost:5000/api';

const authPanel = document.querySelector('#auth-panel');
const dashboard = document.querySelector('#dashboard');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const authMessage = document.querySelector('#auth-message');
const tabs = document.querySelectorAll('.tab');
const welcomeTitle = document.querySelector('#welcome-title');
const profileDetails = document.querySelector('#profile-details');
const adminPanel = document.querySelector('#admin-panel');
const usersTable = document.querySelector('#users-table');
const logoutButton = document.querySelector('#logout-button');
const refreshUsersButton = document.querySelector('#refresh-users');
const editProfile = document.querySelector('#edit-profile');
const profileForm = document.querySelector('#profile-form');
const profileMessage = document.querySelector('#profile-message');
const editProfileButton = document.querySelector('#edit-profile-button');
const cancelEditButton = document.querySelector('#cancel-edit-button');
const adminStatus = document.querySelector('#admin-status');
const profileAvatar = document.querySelector('#profile-avatar');
const avatarForm = document.querySelector('#avatar-form');
const avatarMessage = document.querySelector('#avatar-message');
const deleteAvatarButton = document.querySelector('#delete-avatar-button');
const filesForm = document.querySelector('#files-form');
const filesMessage = document.querySelector('#files-message');
const filesList = document.querySelector('#files-list');

let currentUser = null;
const defaultAvatar =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" rx="60" fill="%23dce5ea"/%3E%3Ccircle cx="60" cy="45" r="20" fill="%23667085"/%3E%3Cpath d="M24 104c6-24 24-36 36-36s30 12 36 36" fill="%23667085"/%3E%3C/svg%3E';

function getToken() {
  return localStorage.getItem('token');
}

function setSession(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...options.headers
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue.');
  }

  return data;
}

function showMessage(message) {
  authMessage.textContent = message;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function displayValue(value) {
  return escapeHtml(value || 'Non renseigne');
}

function inputValue(value) {
  return escapeHtml(value || '');
}

function showAuth() {
  authPanel.classList.remove('hidden');
  dashboard.classList.add('hidden');
  adminPanel.classList.add('hidden');
  editProfile.classList.add('hidden');
}

function renderProfile(user) {
  currentUser = user;
  welcomeTitle.textContent = `Bienvenue, ${user.name}`;
  profileAvatar.src = user.avatar_path ? `http://localhost:5000${user.avatar_path}` : defaultAvatar;
  profileAvatar.alt = user.avatar_path ? `Photo de ${user.name}` : 'Photo de profil non renseignee';
  profileDetails.innerHTML = `
    <div>
      <dt>Nom</dt>
      <dd>${displayValue(user.name)}</dd>
    </div>
    <div>
      <dt>Email</dt>
      <dd>${displayValue(user.email)}</dd>
    </div>
    <div>
      <dt>Telephone</dt>
      <dd>${displayValue(user.phone)}</dd>
    </div>
    <div>
      <dt>Ville</dt>
      <dd>${displayValue(user.city)}</dd>
    </div>
    <div>
      <dt>Profession</dt>
      <dd>${displayValue(user.job_title)}</dd>
    </div>
    <div>
      <dt>Organisation</dt>
      <dd>${displayValue(user.organization)}</dd>
    </div>
    <div>
      <dt>Role</dt>
      <dd>${displayValue(user.role)}</dd>
    </div>
    <div>
      <dt>Date creation</dt>
      <dd>${new Date(user.created_at).toLocaleString('fr-FR')}</dd>
    </div>
  `;
}

function formatFileSize(size) {
  if (!size) {
    return '0 Ko';
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} Ko`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
}

async function loadFiles() {
  const { files } = await request('/auth/me/files');

  if (files.length === 0) {
    filesList.innerHTML = '<p class="success-message">Aucun fichier complementaire ajoute.</p>';
    return;
  }

  filesList.innerHTML = files.map((file) => `
    <div class="file-item">
      <a href="http://localhost:5000${file.file_path}" target="_blank" rel="noreferrer">
        ${displayValue(file.original_name)}
      </a>
      <small>${formatFileSize(file.size)}</small>
      <button class="danger" data-file-delete-id="${file.id}">Supprimer</button>
    </div>
  `).join('');
}

function fillProfileForm(user) {
  profileForm.elements.name.value = user.name || '';
  profileForm.elements.phone.value = user.phone || '';
  profileForm.elements.city.value = user.city || '';
  profileForm.elements.job_title.value = user.job_title || '';
  profileForm.elements.organization.value = user.organization || '';
}

async function showDashboard() {
  try {
    const { user } = await request('/auth/me');
    authPanel.classList.add('hidden');
    dashboard.classList.remove('hidden');
    renderProfile(user);
    fillProfileForm(user);
    await loadFiles();

    if (user.role === 'admin') {
      adminPanel.classList.remove('hidden');
      await loadUsers();
    } else {
      adminPanel.classList.add('hidden');
    }
  } catch (error) {
    clearSession();
    showAuth();
    showMessage(error.message);
  }
}

async function loadUsers() {
  const { users } = await request('/admin/users');

  usersTable.innerHTML = users.map((user) => `
    <tr data-user-row="${user.id}">
      <td>
        <input type="text" data-field="name" value="${inputValue(user.name)}" required>
      </td>
      <td>${displayValue(user.email)}</td>
      <td>
        <input type="tel" data-field="phone" value="${inputValue(user.phone)}">
      </td>
      <td>
        <input type="text" data-field="city" value="${inputValue(user.city)}">
      </td>
      <td>
        <input type="text" data-field="job_title" value="${inputValue(user.job_title)}">
      </td>
      <td>
        <input type="text" data-field="organization" value="${inputValue(user.organization)}">
      </td>
      <td>
        <select data-field="role">
          <option value="user" ${user.role === 'user' ? 'selected' : ''}>user</option>
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option>
        </select>
      </td>
      <td>
        <input class="password-input" type="password" data-field="password" placeholder="Minimum 6 caracteres">
      </td>
      <td class="actions">
        <button class="secondary" data-save-user-id="${user.id}">Enregistrer</button>
        <button class="secondary" data-password-id="${user.id}">Mot de passe</button>
        <button class="danger" data-delete-id="${user.id}">Supprimer</button>
      </td>
    </tr>
  `).join('');
}

function getAdminRowData(userId) {
  const row = document.querySelector(`[data-user-row="${userId}"]`);

  return {
    row,
    data: {
      name: row.querySelector('[data-field="name"]').value,
      phone: row.querySelector('[data-field="phone"]').value,
      city: row.querySelector('[data-field="city"]').value,
      job_title: row.querySelector('[data-field="job_title"]').value,
      organization: row.querySelector('[data-field="organization"]').value,
      role: row.querySelector('[data-field="role"]').value
    },
    password: row.querySelector('[data-field="password"]').value
  };
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    showMessage('');

    const view = tab.dataset.view;
    loginForm.classList.toggle('hidden', view !== 'login');
    registerForm.classList.toggle('hidden', view !== 'register');
  });
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const formData = new FormData(loginForm);

  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData))
    });
    setSession(data);
    await showDashboard();
  } catch (error) {
    showMessage(error.message);
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const formData = new FormData(registerForm);

  try {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData))
    });
    setSession(data);
    registerForm.reset();
    await showDashboard();
  } catch (error) {
    showMessage(error.message);
  }
});

usersTable.addEventListener('click', async (event) => {
  const saveUserId = event.target.dataset.saveUserId;
  const passwordId = event.target.dataset.passwordId;
  const deleteId = event.target.dataset.deleteId;
  adminStatus.textContent = '';

  try {
    if (saveUserId) {
      const { data } = getAdminRowData(saveUserId);
      const response = await request(`/admin/users/${saveUserId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      adminStatus.textContent = response.message;
      await loadUsers();
    }

    if (passwordId) {
      const { row, password } = getAdminRowData(passwordId);
      const response = await request(`/admin/users/${passwordId}/password`, {
        method: 'PATCH',
        body: JSON.stringify({ password })
      });
      row.querySelector('[data-field="password"]').value = '';
      adminStatus.textContent = response.message;
    }

    if (deleteId && confirm('Supprimer cet utilisateur ?')) {
      const response = await request(`/admin/users/${deleteId}`, { method: 'DELETE' });
      adminStatus.textContent = response.message;
      await loadUsers();
    }
  } catch (error) {
    adminStatus.textContent = error.message;
  }
});

logoutButton.addEventListener('click', () => {
  clearSession();
  showAuth();
});

refreshUsersButton.addEventListener('click', loadUsers);

editProfileButton.addEventListener('click', () => {
  if (currentUser) {
    fillProfileForm(currentUser);
  }

  profileMessage.textContent = '';
  editProfile.classList.remove('hidden');
});

cancelEditButton.addEventListener('click', () => {
  editProfile.classList.add('hidden');
  profileMessage.textContent = '';
});

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  profileMessage.textContent = '';

  const formData = new FormData(profileForm);

  try {
    const { user, message } = await request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(formData))
    });

    renderProfile(user);
    fillProfileForm(user);
    profileMessage.textContent = message;

    if (user.role === 'admin') {
      await loadUsers();
    }
  } catch (error) {
    profileMessage.textContent = error.message;
  }
});

avatarForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  avatarMessage.textContent = '';

  const formData = new FormData(avatarForm);

  try {
    const response = await request('/auth/me/avatar', {
      method: 'POST',
      body: formData
    });

    avatarMessage.textContent = response.message;
    avatarForm.reset();
    await showDashboard();
  } catch (error) {
    avatarMessage.textContent = error.message;
  }
});

deleteAvatarButton.addEventListener('click', async () => {
  avatarMessage.textContent = '';

  try {
    const response = await request('/auth/me/avatar', { method: 'DELETE' });
    avatarMessage.textContent = response.message;
    await showDashboard();
  } catch (error) {
    avatarMessage.textContent = error.message;
  }
});

filesForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  filesMessage.textContent = '';

  const formData = new FormData(filesForm);

  try {
    const response = await request('/auth/me/files', {
      method: 'POST',
      body: formData
    });

    filesMessage.textContent = response.message;
    filesForm.reset();
    await loadFiles();
  } catch (error) {
    filesMessage.textContent = error.message;
  }
});

filesList.addEventListener('click', async (event) => {
  const fileDeleteId = event.target.dataset.fileDeleteId;

  if (!fileDeleteId) {
    return;
  }

  try {
    const response = await request(`/auth/me/files/${fileDeleteId}`, { method: 'DELETE' });
    filesMessage.textContent = response.message;
    await loadFiles();
  } catch (error) {
    filesMessage.textContent = error.message;
  }
});

if (getToken()) {
  showDashboard();
} else {
  showAuth();
}
