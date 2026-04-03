const express = require('express');
const { upload } = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Upload profile image
// @route   POST /api/upload/image
// @access  Private
router.post('/image', protect, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        // Cloudinary URL is attached to req.file.path
        res.status(200).json({
            success: true,
            url: req.file.path
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error during upload', error: err.message });
    }
});

module.exports = router;
