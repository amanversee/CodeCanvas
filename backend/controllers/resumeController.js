const Resume = require('../models/Resume');
const crypto = require('crypto');

/**
 * @desc    Get all resumes belonging to the authenticated user
 * @route   GET /api/resumes/user
 * @access  Private
 */
exports.getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id }).sort('-updatedAt');
        res.status(200).json({ success: true, count: resumes.length, data: resumes });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while fetching resumes', error: err.message });
    }
};

/**
 * @desc    Get a specific resume by ID
 * @route   GET /api/resumes/:id
 * @access  Private
 */
exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Verify ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this resume' });
        }

        res.status(200).json({ success: true, data: resume });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while fetching resume', error: err.message });
    }
};

/**
 * @desc    Create a new resume with a unique shareable slug
 * @route   POST /api/resumes
 * @access  Private
 */
exports.createResume = async (req, res) => {
    try {
        // Assign the resume to the current user
        req.body.userId = req.user.id;

        // Generate a unique 8-character hex slug for public sharing
        const hash = crypto.randomBytes(4).toString('hex');
        const userName = req.user.name ? req.user.name.split(' ')[0].toLowerCase() : 'user';
        req.body.publicSlug = `${userName}-${hash}`;

        const resume = await Resume.create(req.body);

        res.status(201).json({ success: true, data: resume });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while creating resume', error: err.message });
    }
};

/**
 * @desc    Update an existing resume
 * @route   PUT /api/resumes/:id
 * @access  Private
 */
exports.updateResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Verify ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this resume' });
        }

        resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: resume });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while updating resume', error: err.message });
    }
};

/**
 * @desc    Permanently delete a resume
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Verify ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this resume' });
        }

        await resume.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while deleting resume', error: err.message });
    }
};

/**
 * @desc    Get a public resume by its unique slug
 * @route   GET /api/resumes/public/:slug
 * @access  Public
 */
exports.getPublicResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ publicSlug: req.params.slug, isPublic: true });

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found or is currently private' });
        }

        res.status(200).json({ success: true, data: resume });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while fetching public resume', error: err.message });
    }
};
