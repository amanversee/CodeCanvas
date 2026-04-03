const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Resume title is required'],
        default: 'Untitled Resume'
    },
    templateId: {
        type: String,
        default: 'modern'
    },
    themeColor: {
        type: String,
        default: '#16a34a'
    },
    personalInfo: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' },
        jobTitle: { type: String, default: '' }
    },
    summary: {
        type: String,
        default: ''
    },
    experience: [{
        id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' }
    }],
    education: [{
        id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
        school: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' }
    }],
    skills: {
        type: [String],
        default: []
    },
    projects: [{
        id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        link: { type: String, default: '' },
        technologies: { type: [String], default: [] }
    }],
    socialLinks: [{
        id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
        network: { type: String, default: '' },
        url: { type: String, default: '' }
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    publicSlug: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);
