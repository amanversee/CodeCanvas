import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Button from '../components/Button';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import ResumePreview from '../components/preview/ResumePreview';
import ThemeToggle from '../components/ThemeToggle';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import API_URL from '../config/api';

// Placeholder initial state
const initialResumeState = {
    title: 'My Professional Resume',
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', jobTitle: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    themeColor: '#16a34a',
    templateId: 'modern'
};

const THEME_COLORS = [
    { name: 'Green', hex: '#16a34a' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Purple', hex: '#9333ea' },
    { name: 'Rose', hex: '#e11d48' },
    { name: 'Amber', hex: '#d97706' },
    { name: 'Cyan', hex: '#0891b2' },
    { name: 'Slate', hex: '#475569' }
];

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuthStore();
    const [activeTab, setActiveTab] = useState('personal');
    const [resumeData, setResumeData] = useState(initialResumeState);
    const [loading, setLoading] = useState(id ? true : false);
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return navigate('/login');

        const fetchResume = async () => {
            if (id) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const res = await axios.get(`${API_URL}/resumes/${id}`, config);

                    const savedData = res.data.data;
                    setResumeData({
                        title: savedData.title || initialResumeState.title,
                        personalInfo: savedData.personalInfo || initialResumeState.personalInfo,
                        summary: savedData.summary || '',
                        experience: savedData.experience || [],
                        education: savedData.education || [],
                        skills: savedData.skills || [],
                        projects: savedData.projects || [],
                        themeColor: savedData.themeColor || '#16a34a',
                        templateId: savedData.templateId || 'modern'
                    });
                } catch (err) {
                    console.error("Failed to fetch resume:", err);
                    alert("Failed to load your resume.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id, isAuthenticated, navigate, token]);

    const handleSave = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const payload = {
                title: resumeData.title,
                personalInfo: resumeData.personalInfo,
                summary: resumeData.summary,
                experience: resumeData.experience,
                education: resumeData.education,
                skills: resumeData.skills,
                projects: resumeData.projects,
                themeColor: resumeData.themeColor,
                templateId: resumeData.templateId || 'modern'
            };

            if (id) {
                // Update existing
                await axios.put(`${API_URL}/resumes/${id}`, payload, config);
                alert("Resume updated successfully!");
            } else {
                // Create new
                const response = await axios.post(`${API_URL}/resumes`, payload, config);
                alert("Resume created successfully!");
                navigate(`/editor/${response.data.data._id}`); // Redirect to edit mode
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            alert("Failed to save resume. Please try again.");
        }
    };

    const handleSaveAsNew = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const payload = {
                title: `${resumeData.title} (Copy)`,
                personalInfo: resumeData.personalInfo,
                summary: resumeData.summary,
                experience: resumeData.experience,
                education: resumeData.education,
                skills: resumeData.skills,
                projects: resumeData.projects,
                themeColor: resumeData.themeColor,
                templateId: resumeData.templateId || 'modern'
            };

            const response = await axios.post(`${API_URL}/resumes`, payload, config);
            alert("Resume copied successfully!");
            navigate(`/editor/${response.data.data._id}`);
        } catch (error) {
            console.error("Error copying resume:", error);
            alert("Failed to save as new. Please try again.");
        }
    };

    const componentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: resumeData.title || 'Resume',
        onBeforePrint: () => {
             return Promise.resolve();
        },
        pageStyle: `
            @page { size: A4; margin: 0mm; }
            @media print { 
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; }
                .print-scale { width: 210mm !important; min-height: 297mm !important; transform: none !important; }
            }
        `
    });

    const tabs = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' }
    ];

    if (loading) return <div className="p-10 text-center text-gray-900 dark:text-white">Loading editor...</div>;

    return (
        <div className="h-screen flex flex-col bg-gray-100 dark:bg-dark-base overflow-hidden transition-colors duration-200">
            {/* Editor Header */}
            <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border h-16 flex items-center justify-between px-6 shrink-0 transition-colors duration-200">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        &larr; Back
                    </button>
                    <input
                        type="text"
                        className="text-lg font-semibold bg-transparent border-b border-transparent text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:border-primary-500 px-1 placeholder-gray-400 dark:placeholder-gray-500"
                        value={resumeData.title}
                        onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 mr-4 border-r border-gray-300 dark:border-dark-border pr-4">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme:</span>
                        <div className="flex gap-1">
                            {THEME_COLORS.map(color => (
                                <button
                                    key={color.name}
                                    className={`w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none ${resumeData.themeColor === color.hex ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-dark-surface' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setResumeData({ ...resumeData, themeColor: color.hex })}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Template Selector Dropdown */}
                    <div className="hidden md:flex items-center gap-2 mr-2 border-r border-gray-300 dark:border-dark-border pr-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Template:</span>
                        <select
                            value={resumeData.templateId || 'modern'}
                            onChange={(e) => setResumeData({ ...resumeData, templateId: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-pointer"
                        >
                            <option value="modern">Modern</option>
                            <option value="classic">Classic</option>
                            <option value="minimal">Minimal</option>
                            <option value="corporate">Corporate</option>
                            <option value="creative">Creative</option>
                            <option value="executive">Executive</option>
                            <option value="professional">Professional</option>
                            <option value="elegant">Elegant</option>
                            <option value="portfolio">Portfolio</option>
                            <option value="gradient">Gradient</option>
                        </select>
                    </div>

                    <ThemeToggle />
                    <button 
                        onClick={() => setShowPreviewMobile(!showPreviewMobile)}
                        className="md:hidden flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-200"
                    >
                        {showPreviewMobile ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                    </button>
                    <Button variant="secondary" onClick={handlePrint} className="hidden sm:inline-flex">Download PDF</Button>
                    {id && <Button variant="secondary" onClick={handleSaveAsNew} className="hidden lg:inline-flex">Save As New</Button>}
                    <Button onClick={handleSave}>{id ? 'Save' : 'Create'}</Button>
                </div>
            </header>

            {/* Main Editor Split */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar Controls */}
                <div className={`${showPreviewMobile ? 'hidden' : 'flex'} w-full md:w-1/3 md:min-w-[350px] md:max-w-[500px] bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border flex-col shrink-0 flex-grow-0 transition-colors duration-200`}>
                    <div className="flex border-b border-gray-200 dark:border-dark-border overflow-x-auto custom-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-dark-base transition-colors duration-200">
                        {activeTab === 'personal' && <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'summary' && <SummaryForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'experience' && <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'education' && <EducationForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'skills' && <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'projects' && <ProjectsForm resumeData={resumeData} setResumeData={setResumeData} />}
                    </div>
                </div>

                {/* Live Preview Pane */}
                <div className={`${showPreviewMobile ? 'flex' : 'hidden md:flex'} flex-1 bg-gray-200 dark:bg-[#0f172a] p-4 md:p-8 overflow-y-auto justify-center transition-colors duration-200`}>
                    <div ref={componentRef} className="bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none origin-top transition-transform duration-200">
                        <ResumePreview data={resumeData} />
                    </div>
                </div>

                {/* Floating Download Button for Mobile */}
                {showPreviewMobile && (
                    <button 
                        onClick={handlePrint}
                        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 animate-bounce"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Editor;
