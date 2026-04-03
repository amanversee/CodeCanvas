import React from 'react';
import Input from '../Input';

const EducationForm = ({ resumeData, setResumeData }) => {
    const handleAdd = () => {
        const newEdu = {
            id: Date.now().toString(),
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, newEdu]
        });
    };

    const handleRemove = (id) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.filter(edu => edu.id !== id)
        });
    };

    const handleChange = (id, field, value) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                <button
                    onClick={handleAdd}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Education
                </button>
            </div>

            {resumeData.education.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No education added yet. Click 'Add Education' to start.</p>
            ) : (
                resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border relative transition-colors">
                        <button
                            onClick={() => handleRemove(edu.id)}
                            className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                            title="Remove"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Education {index + 1}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Institution/School"
                                value={edu.school}
                                onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                                placeholder="University of Science"
                            />
                            <Input
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                                placeholder="Bachelors of Science"
                            />
                        </div>

                        <Input
                            label="Field of Study"
                            value={edu.fieldOfStudy}
                            onChange={(e) => handleChange(edu.id, 'fieldOfStudy', e.target.value)}
                            placeholder="Computer Science"
                        />

                        <div className="grid grid-cols-2 gap-4 items-end">
                            <Input
                                label="Start Date"
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                            />
                            <div className="space-y-2">
                                {!edu.current && (
                                    <Input
                                        label="End Date"
                                        type="month"
                                        value={edu.endDate}
                                        onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                                    />
                                )}
                                <label className="flex items-center gap-2 mb-4 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={edu.current}
                                        onChange={(e) => handleChange(edu.id, 'current', e.target.checked)}
                                        className="rounded text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">I currently study here</span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default EducationForm;
