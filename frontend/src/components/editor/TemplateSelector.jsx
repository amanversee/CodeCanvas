import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const templates = [
    {
        id: 'modern',
        name: 'Modern',
        description: 'A clean two-column layout perfect for modern professionals.',
        accentDark: true,
        previewColor: '#16a34a',
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional, professional layout suitable for corporate roles.',
        accentDark: false,
        previewColor: '#2563eb',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simplistic and elegant design focusing entirely on content.',
        accentDark: false,
        previewColor: '#475569',
    },
    {
        id: 'corporate',
        name: 'Corporate',
        description: 'A highly structured, traditional layout with distinct sections.',
        accentDark: true,
        previewColor: '#0f172a',
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'A visually striking template with a colored sidebar and modern icons.',
        accentDark: true,
        previewColor: '#4f46e5',
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Corporate professional layout with a focus on leadership and achievements.',
        accentDark: true,
        previewColor: '#1e293b',
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Balanced, clean layout suitable for a wide range of industries.',
        accentDark: true,
        previewColor: '#2563eb',
    },
    {
        id: 'elegant',
        name: 'Elegant',
        description: 'Clean minimal luxury style with high-end typography and whitespace.',
        accentDark: true,
        previewColor: '#9333ea',
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        description: 'Designer-style layout focusing on visual impact and projects.',
        accentDark: true,
        previewColor: '#f97316',
    },
    {
        id: 'gradient',
        name: 'Gradient',
        description: 'Modern colorful resume utilizing fresh gradients for a tech look.',
        accentDark: true,
        previewColor: '#06b6d4',
    }
];

const TemplateSelector = ({ resumeData, setResumeData }) => {

    const handleSelectTemplate = (templateId) => {
        setResumeData({
            ...resumeData,
            templateId: templateId
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose a Template</h2>
                <p className="text-gray-500 dark:text-gray-400">Select a layout that best fits your professional style.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                {templates.map((template) => {
                    const isSelected = resumeData.templateId === template.id || (!resumeData.templateId && template.id === 'modern');

                    return (
                        <div
                            key={template.id}
                            onClick={() => handleSelectTemplate(template.id)}
                            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 group ${isSelected
                                ? 'border-primary-500 shadow-lg shadow-primary-500/20 scale-[1.02]'
                                : 'border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                                }`}
                        >
                            {/* Template Preview Mockup */}
                            <div className="h-48 bg-gray-100 dark:bg-gray-800 relative p-4 flex justify-center overflow-hidden">
                                <div className="w-3/4 bg-white shadow-sm rounded-t-sm p-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                    {template.id === 'modern' && (
                                        <>
                                            <div className="h-4 w-1/2 rounded" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                                                </div>
                                                <div className="w-1/3 space-y-2">
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {template.id === 'classic' && (
                                        <>
                                            <div className="flex justify-center mb-2">
                                                <div className="h-4 w-1/2 rounded bg-gray-800"></div>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                                            <div className="h-2 bg-gray-200 rounded w-5/6 mb-4"></div>
                                            <div className="h-2 rounded w-1/4 mb-1" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                                        </>
                                    )}
                                    {template.id === 'minimal' && (
                                        <>
                                            <div className="h-6 w-2/3 rounded bg-gray-800 mb-4"></div>
                                            <div className="flex gap-4">
                                                <div className="w-1/4 space-y-2">
                                                    <div className="h-2 rounded w-full" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {template.id === 'corporate' && (
                                        <>
                                            <div className="flex justify-between items-end border-b-2 pb-2 mb-2" style={{ borderColor: resumeData?.themeColor || template.previewColor }}>
                                                <div className="h-5 w-1/2 rounded bg-gray-800"></div>
                                                <div className="h-2 w-1/4 rounded bg-gray-300"></div>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                                            <div className="h-2 bg-gray-200 rounded w-5/6 mb-3"></div>
                                            <div className="h-2 rounded w-1/3 mb-1" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                                            <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                                        </>
                                    )}
                                    {template.id === 'creative' && (
                                        <div className="flex gap-0 h-full absolute inset-0">
                                            <div className="w-[30%] h-full p-2 space-y-2 pt-4 flex flex-col items-center" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}>
                                                <div className="w-8 h-8 rounded-full bg-white/20 mb-2"></div>
                                                <div className="h-1.5 w-3/4 rounded bg-white/90"></div>
                                                <div className="h-1 w-full rounded bg-white/50"></div>
                                                <div className="h-1 w-4/5 rounded bg-white/50"></div>
                                            </div>
                                            <div className="flex-1 p-2 space-y-2 pt-4 bg-white">
                                                <div className="h-2 w-1/2 rounded bg-gray-200 mb-3"></div>
                                                <div className="space-y-1">
                                                    <div className="h-1 w-full bg-gray-100 rounded"></div>
                                                    <div className="h-1 w-5/6 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {template.id === 'executive' && (
                                        <div className="flex flex-col h-full absolute inset-0 p-3 pt-6 border-t-8" style={{ borderTopColor: resumeData?.themeColor || template.previewColor }}>
                                            <div className="h-2.5 w-1/2 bg-gray-800 rounded mx-auto mb-2"></div>
                                            <div className="h-1 w-3/4 bg-gray-400 rounded mx-auto mb-4"></div>
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                                                <div className="h-1.5 w-5/6 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    )}
                                    {template.id === 'professional' && (
                                        <div className="flex flex-col h-full absolute inset-0 p-3 pt-6">
                                            <div className="h-3 w-3/4 bg-gray-800 rounded mb-2"></div>
                                            <div className="h-1.5 w-1/2 rounded mb-4" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="col-span-2 space-y-1.5">
                                                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                                                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                                                </div>
                                                <div className="col-span-1 h-3 rounded bg-gray-100"></div>
                                            </div>
                                        </div>
                                    )}
                                    {template.id === 'elegant' && (
                                        <div className="flex flex-col h-full absolute inset-0 p-3 pt-8 items-center text-center">
                                            <div className="h-1.5 w-1/3 bg-gray-200 mb-1"></div>
                                            <div className="h-2.5 w-1/2 bg-gray-800 mb-4"></div>
                                            <div className="h-1 w-1/3 rounded mb-6" style={{ backgroundColor: resumeData?.themeColor || template.previewColor }}></div>
                                            <div className="h-1.5 w-full bg-gray-100 italic"></div>
                                        </div>
                                    )}
                                    {template.id === 'portfolio' && (
                                        <div className="flex flex-col h-full absolute inset-0 p-3 pt-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="h-8 w-1/2 bg-gray-900 rounded-sm"></div>
                                                <div className="w-6 h-6 border-2 rotate-12" style={{ borderColor: resumeData?.themeColor || template.previewColor }}></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                                                <div className="h-1.5 w-2/3 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    )}
                                    {template.id === 'gradient' && (
                                        <div className="flex flex-col h-full absolute inset-0">
                                            <div className="h-1/3 w-full p-3 pt-4" style={{ background: `linear-gradient(135deg, ${resumeData?.themeColor || template.previewColor} 0%, #000 150%)` }}>
                                                <div className="h-3 w-3/4 bg-white/40 rounded"></div>
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="h-1.5 w-full bg-gray-100 rounded"></div>
                                                <div className="h-1.5 w-5/6 bg-gray-100 rounded"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isSelected && (
                                    <div className="absolute top-3 right-3 bg-primary-500 text-white rounded-full p-1 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Template Info */}
                            <div className="p-4 bg-white dark:bg-dark-surface">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {template.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TemplateSelector;
