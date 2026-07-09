const multer = require('multer');
const path = require('path');

// 1. Configure storage location and file naming format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Saves to the uploads folder we created
  },
  filename: (req, file, cb) => {
    // Generates unique filenames: userId-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Validate file types (only allow PDF, DOC, and DOCX)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|doc|docx/;
  const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedExtensions.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents (.doc, .docx) are allowed!'), false);
  }
};

// 3. Export configured multer middleware (limits file size to 5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;