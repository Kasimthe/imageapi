const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('image');

// Handle POST request to /api/images
router.post('/', (req, res) => {
  // Handle file upload
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Failed to upload image.' });
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).send({ error: 'No image file provided.' });
    }

    // Return URL of stored image in response
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    return res.status(201).send({ imageUrl });
  });
});

module.exports = router;
