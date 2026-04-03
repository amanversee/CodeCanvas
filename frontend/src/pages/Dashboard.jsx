import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Button from '../components/Button';
import axios from 'axios';
import API_URL from '../config/api';
import { PlusIcon, DocumentDuplicateIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'; // Using framer-motion/heroicons when available
import { templates } from '../components/editor/TemplateSelector';

const Dashboard = () => {
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Fetch resumes
        const fetchResumes = async () => {
            try {
                const token = useAuthStore.getState().token;
                const res = await axios.get(`${API_URL}/resumes/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResumes(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchResumes();
    }, [isAuthenticated, navigate]);

    const handleCreateNew = () => {
        navigate('/editor');
    };

    const handleCreateFromTemplate = async (templateId) => {
        try {
            const token = useAuthStore.getState().token;
            const templateDetails = templates.find(t => t.id === templateId);
            const payload = {
                title: `${templateDetails?.name || 'New'} Resume`,
                templateId: templateId,
                personalInfo: { firstName: '', lastName: '', email: '', phone: '', jobTitle: '' },
                summary: '',
                experience: [],
                education: [],
                skills: [],
                projects: [],
                themeColor: templateDetails?.previewColor || '#16a34a'
            };
            const res = await axios.post(`${API_URL}/resumes`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate(`/editor/${res.data.data._id}`);
        } catch (err) {
            console.error(err);
            alert('Failed to create resume from template');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                const token = useAuthStore.getState().token;
                await axios.delete(`${API_URL}/resumes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResumes(resumes.filter((r) => r._id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete resume');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-200">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:text-3xl sm:truncate">
                        My Resumes
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <Button onClick={handleCreateNew} className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Resume
                    </Button>
                </div>
            </div>

            {/* Template Selection Section */}
            <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Start from a Template</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => handleCreateFromTemplate(template.id)}
                            className="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden cursor-pointer hover:shadow-md hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 group flex flex-col"
                        >
                            <div className="h-40 bg-gray-50 dark:bg-gray-800 p-4 relative overflow-hidden flex justify-center border-b border-gray-100 dark:border-gray-700">
                                {/* Simplified mock representation of the template for the dashboard card */}
                                <div className="w-3/4 bg-white shadow-sm rounded-t-sm p-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
                                    <div className="h-3 w-1/2 rounded" style={{ backgroundColor: template.previewColor }}></div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                            <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="bg-white text-primary-600 font-medium text-xs py-1.5 px-4 rounded-full shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Use Template
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-center text-center">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">{template.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200 dark:border-dark-border mb-8" />

            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Saved Resumes</h3>
            </div>

            {resumes.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-dark-surface shadow rounded-lg border border-gray-200 dark:border-dark-border transition-colors duration-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No resumes</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new resume.</p>
                    <div className="mt-6">
                        <Button onClick={handleCreateNew}>Create New</Button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-md transition-all duration-200">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                        <span className="text-primary-500 dark:text-primary-400 text-xs font-bold">PDF</span>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => navigate(`/editor/${resume._id}`)} className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400" title="Edit">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(resume._id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400" title="Delete">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">{resume.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-dark-base px-6 py-3 border-t border-gray-200 dark:border-dark-border transition-colors">
                                <Link to={`/editor/${resume._id}`} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 flex justify-center">
                                    Open in Editor
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
