const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage, uploadMultipleImages, deleteImage } = require('../controllers/uploadController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/images', protect, upload.array('images', 10), uploadMultipleImages);
router.delete('/:publicId', protect, adminOnly, deleteImage);

module.exports = router;
