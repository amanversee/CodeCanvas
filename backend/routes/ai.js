const express = require('express');
const { optimizeContent } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/optimize', protect, optimizeContent);

module.exports = router;
