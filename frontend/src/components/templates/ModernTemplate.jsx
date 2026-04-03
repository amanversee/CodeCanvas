import React from 'react';

const ModernTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#16a34a'; // default primary color

    const renderTextWithBold = (text) => {
        if (!text) return text;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-lg p-10 print-scale font-sans text-gray-800 flex flex-col">
            {/* Header */}
            <header className="border-b-2 pb-4 mb-6" style={{ borderColor: color }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {personalInfo.firstName || 'FIRST'} {personalInfo.lastName || 'LAST'}
                </h1>
                {personalInfo.jobTitle && (
                    <h2 className="text-xl mt-1 font-medium" style={{ color: color }}>
                        {personalInfo.jobTitle}
                    </h2>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
                    {personalInfo.email && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo.phone && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {personalInfo.phone}
                        </span>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}
                        </span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Professional Summary</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{renderTextWithBold(summary)}</p>
                </section>
            )}

            <div className="flex gap-8 flex-1">
                {/* Left Column - Experience & Education */}
                <div className="flex-1">
                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Experience</h3>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800">{exp.position}</h4>
                                            <span className="text-sm font-medium whitespace-nowrap ml-2" style={{ color: color }}>
                                                {exp.startDate ? exp.startDate.split('-').reverse().join('-') : ''} - {exp.current ? 'Present' : (exp.endDate ? exp.endDate.split('-').reverse().join('-') : '')}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{renderTextWithBold(exp.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Projects</h3>
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800">{proj.name}</h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm font-medium" style={{ color: color }}>
                                                    Link
                                                </a>
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-gray-600 mb-2">{proj.technologies}</div>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{renderTextWithBold(proj.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h4>
                                            <span className="text-sm font-medium whitespace-nowrap ml-2" style={{ color: color }}>
                                                {edu.startDate ? edu.startDate.split('-').reverse().join('-') : ''} - {edu.current ? 'Present' : (edu.endDate ? edu.endDate.split('-').reverse().join('-') : '')}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">{edu.school}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Skills & Extras */}
                <div className="w-1/3">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Skills</h3>
                            <ul className="space-y-1">
                                {skills.map((skill, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                        <span className="mr-2" style={{ color: color }}>•</span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
