const express = require('express');
const {
    getUserResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume,
    getPublicResume
} = require('../controllers/resumeController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/user', protect, getUserResumes);
router.route('/')
    .post(protect, createResume);

router.route('/:id')
    .get(protect, getResume)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

router.get('/public/:slug', getPublicResume);

module.exports = router;
