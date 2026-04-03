import React from 'react';
import Input from '../Input';
import AIEnhanceButton from './AIEnhanceButton';

const ProjectsForm = ({ resumeData, setResumeData }) => {
    const handleAdd = () => {
        const newProj = {
            id: Date.now().toString(),
            name: '',
            technologies: '',
            link: '',
            description: ''
        };
        setResumeData({
            ...resumeData,
            projects: [...resumeData.projects, newProj]
        });
    };

    const handleRemove = (id) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.filter(proj => proj.id !== id)
        });
    };

    const handleChange = (id, field, value) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Projects</h2>
                <button
                    onClick={handleAdd}
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Project
                </button>
            </div>

            {resumeData.projects.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No projects added yet. Click 'Add Project' to start.</p>
            ) : (
                resumeData.projects.map((proj, index) => (
                    <div key={proj.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 relative transition-colors duration-200">
                        <button
                            onClick={() => handleRemove(proj.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                            title="Remove"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Project {index + 1}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Project Name"
                                value={proj.name}
                                onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                                placeholder="E-commerce Website"
                            />
                            <Input
                                label="Technologies Used"
                                value={proj.technologies}
                                onChange={(e) => handleChange(proj.id, 'technologies', e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                label="Project Link (Optional)"
                                value={proj.link}
                                onChange={(e) => handleChange(proj.id, 'link', e.target.value)}
                                placeholder="https://github.com/yourusername/project"
                            />
                        </div>

                        <div className="mt-4 space-y-1 relative">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <AIEnhanceButton
                                    text={proj.description}
                                    type="experience"
                                    onOptimize={(optimized) => handleChange(proj.id, 'description', optimized)}
                                />
                            </div>
                            <textarea
                                className="w-full h-32 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md shadow-sm resize-none text-sm text-gray-900 dark:text-white transition-colors duration-200"
                                placeholder="Describe the project, your role, and what you achieved..."
                                value={proj.description}
                                onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProjectsForm;
