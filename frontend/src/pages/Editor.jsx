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
import TemplateSelector from '../components/editor/TemplateSelector';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import CorporateTemplate from '../components/templates/CorporateTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import PortfolioTemplate from '../components/templates/PortfolioTemplate';
import GradientTemplate from '../components/templates/GradientTemplate';
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
        pageStyle: `
            @page { size: A4; margin: 0; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
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

    const ActiveTemplate = () => {
        switch (resumeData.templateId) {
            case 'classic':
                return <ClassicTemplate data={resumeData} />;
            case 'minimal':
                return <MinimalTemplate data={resumeData} />;
            case 'corporate':
                return <CorporateTemplate data={resumeData} />;
            case 'creative':
                return <CreativeTemplate data={resumeData} />;
            case 'executive':
                return <ExecutiveTemplate data={resumeData} />;
            case 'professional':
                return <ProfessionalTemplate data={resumeData} />;
            case 'elegant':
                return <ElegantTemplate data={resumeData} />;
            case 'portfolio':
                return <PortfolioTemplate data={resumeData} />;
            case 'gradient':
                return <GradientTemplate data={resumeData} />;
            case 'modern':
            default:
                return <ModernTemplate data={resumeData} />;
        }
    };

    if (loading) return <div className="p-10 text-center">Loading editor...</div>;

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
                    <Button variant="secondary" onClick={handlePrint}>Download PDF</Button>
                    {id && <Button variant="secondary" onClick={handleSaveAsNew}>Save As New</Button>}
                    <Button onClick={handleSave}>{id ? 'Save' : 'Create'}</Button>
                </div>
            </header>

            {/* Main Editor Split */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Controls */}
                <div className="w-1/3 min-w-[350px] max-w-[500px] bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border flex flex-col shrink-0 flex-grow-0 transition-colors duration-200">
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
                        {/* Form Content goes here based on active tab */}
                        {activeTab === 'personal' && <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'summary' && <SummaryForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'experience' && <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'education' && <EducationForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'skills' && <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />}
                        {activeTab === 'projects' && <ProjectsForm resumeData={resumeData} setResumeData={setResumeData} />}
                    </div>
                </div>

                {/* Live Preview Pane */}
                <div className="flex-1 bg-gray-200 dark:bg-[#0f172a] p-8 overflow-y-auto flex justify-center transition-colors duration-200">
                    <div ref={componentRef} className="bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none">
                        <ActiveTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
