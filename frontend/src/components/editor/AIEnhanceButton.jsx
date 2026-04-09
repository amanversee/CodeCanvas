import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import useAuthStore from '../../store/authStore';

const AIEnhanceButton = ({ text, type, onOptimize }) => {
    const [loading, setLoading] = useState(false);
    const { token } = useAuthStore();

    const handleEnhance = async () => {
        if (!text || text.trim().length < 10) {
            alert('Please write a few words first before enhancing.');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(
                `${API_URL}/ai/optimize`,
                { text, type },
                config
            );

            if (response.data.success) {
                onOptimize(response.data.optimizedText);
            }
        } catch (error) {
            console.error('[AIEnhanceButton] Optimization failed:', error);

            // Check if the server signals all keys are exhausted
            const serverData = error.response?.data;
            if (serverData?.allKeysFailed) {
                alert(
                    'Gemini API key is not working properly. Please check your API configuration.'
                );
            } else {
                alert(
                    serverData?.message ||
                    'Failed to enhance text. Please check your connection or AI limit.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleEnhance}
            disabled={loading}
            type="button"
            className="mt-2 text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-1 px-3 rounded shadow hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-1"
        >
            {loading ? (
                <span className="animate-pulse">Enhancing...</span>
            ) : (
                <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Enhance with AI
                </>
            )}
        </button>
    );
};

export default AIEnhanceButton;
