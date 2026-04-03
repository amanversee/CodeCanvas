import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import axios from 'axios';
import API_URL from '../../config/api';
import useAuthStore from '../../store/authStore';

const SkillsForm = ({ resumeData, setResumeData }) => {
    const [skillInput, setSkillInput] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const { token } = useAuthStore();

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (!skillInput.trim()) return;

        // Check for duplicates
        if (!resumeData.skills.includes(skillInput.trim())) {
            setResumeData({
                ...resumeData,
                skills: [...resumeData.skills, skillInput.trim()]
            });
        }
        setSkillInput('');
    };

    const handleRemoveSkill = (skillToRemove) => {
        setResumeData({
            ...resumeData,
            skills: resumeData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const handleAIOptimize = async () => {
        if (resumeData.skills.length === 0) return alert('Please add some basic skills first');
        setIsOptimizing(true);

        try {
            const skillsText = resumeData.skills.join(', ');
            const res = await axios.post(`${API_URL}/ai/optimize`,
                { text: skillsText, type: 'skills' },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Parse CSV response
            const suggestedSkills = res.data.optimizedText.split(',').map(s => s.trim()).filter(s => s);

            const uniqueNewSkills = suggestedSkills.filter(s => !resumeData.skills.includes(s));

            if (uniqueNewSkills.length > 0) {
                setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, ...uniqueNewSkills]
                });
            }
        } catch (err) {
            alert('Failed to optimize skills: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAIOptimize}
                    isLoading={isOptimizing}
                    className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100"
                >
                    ✨ Suggest with AI
                </Button>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2 items-end">
                <div className="flex-1">
                    <Input
                        label="Add Skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. React.js, Python, Project Management"
                    />
                </div>
                <Button type="submit" className="mb-4">Add</Button>
            </form>

            {resumeData.skills.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">No skills added yet.</p>
            ) : (
                <div className="flex flex-wrap gap-2 mt-4">
                    {resumeData.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
                            >
                                <span className="sr-only">Remove skill</span>
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillsForm;
