import React, { useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import API_URL from '../../config/api';
import useAuthStore from '../../store/authStore';

const SummaryForm = ({ resumeData, setResumeData }) => {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const { token } = useAuthStore();

    const handleChange = (e) => {
        setResumeData({ ...resumeData, summary: e.target.value });
    };

    const handleAIOptimize = async () => {
        if (!resumeData.summary) return alert('Please enter some text first');
        setIsOptimizing(true);

        try {
            const res = await axios.post(`${API_URL}/ai/optimize`,
                { text: resumeData.summary, type: 'summary' },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setResumeData({ ...resumeData, summary: res.data.optimizedText });
        } catch (err) {
            alert('Failed to optimize text: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Professional Summary</h2>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAIOptimize}
                    isLoading={isOptimizing}
                    className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100"
                >
                    ✨ Enhance with AI
                </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Write a short and sweet summary that highlights your key skills and experiences.</p>

            <textarea
                className="w-full h-48 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md shadow-sm resize-none"
                placeholder="Experienced full stack developer with 5+ years of experience in MERN stack..."
                value={resumeData.summary}
                onChange={handleChange}
            />
        </div>
    );
};

export default SummaryForm;
