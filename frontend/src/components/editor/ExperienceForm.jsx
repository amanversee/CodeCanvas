import React from 'react';
import Input from '../Input';
import Button from '../Button';
import AIEnhanceButton from './AIEnhanceButton';

const ExperienceForm = ({ resumeData, setResumeData }) => {
    const handleAdd = () => {
        const newExp = {
            id: Date.now().toString(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setResumeData({
            ...resumeData,
            experience: [...resumeData.experience, newExp]
        });
    };

    const handleRemove = (id) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter(exp => exp.id !== id)
        });
    };

    const handleChange = (id, field, value) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Work Experience</h2>
                <button
                    onClick={handleAdd}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Experience
                </button>
            </div>

            {resumeData.experience.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No experience added yet. Click 'Add Experience' to start.</p>
            ) : (
                resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 relative transition-colors duration-200">
                        <button
                            onClick={() => handleRemove(exp.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                            title="Remove"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Experience {index + 1}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Job Title"
                                value={exp.position}
                                onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                                placeholder="Software Engineer"
                            />
                            <Input
                                label="Company"
                                value={exp.company}
                                onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                                placeholder="Tech Corp"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-end">
                            <Input
                                label="Start Date"
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                            />
                            <div className="space-y-2">
                                {!exp.current && (
                                    <Input
                                        label="End Date"
                                        type="month"
                                        value={exp.endDate}
                                        onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                    />
                                )}
                                <label className="flex items-center gap-2 mb-4 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                                        className="rounded text-primary-600 focus:ring-primary-500 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">I currently work here</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1 mb-4 relative">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <AIEnhanceButton
                                    text={exp.description}
                                    type="experience"
                                    onOptimize={(optimized) => handleChange(exp.id, 'description', optimized)}
                                />
                            </div>
                            <textarea
                                className="w-full h-32 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md shadow-sm resize-none text-sm text-gray-900 dark:text-white transition-colors duration-200"
                                placeholder="Describe your achievements and responsibilities..."
                                value={exp.description}
                                onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ExperienceForm;
