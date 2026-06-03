const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadsRoot = path.resolve(__dirname, '../../uploads');
const avatarsDir = path.join(uploadsRoot, 'avatars');
const documentsDir = path.join(uploadsRoot, 'documents');

[uploadsRoot, avatarsDir, documentsDir].forEach((directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
});

function storageFor(folder) {
  return multer.diskStorage({
    destination(req, file, callback) {
      callback(null, folder);
    },
    filename(req, file, callback) {
      const extension = path.extname(file.originalname);
      const safeName = `${req.user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
      callback(null, safeName);
    }
  });
}

const avatarUpload = multer({
  storage: storageFor(avatarsDir),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error('La photo doit etre une image.'));
      return;
    }

    callback(null, true);
  }
});

const documentUpload = multer({
  storage: storageFor(documentsDir),
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = {
  avatarUpload,
  documentUpload
};
