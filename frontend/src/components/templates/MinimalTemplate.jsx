import React from 'react';

const MinimalTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#16a34a';

    const renderTextWithBold = (text) => {
        if (!text) return text;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-lg p-14 print-scale font-sans text-gray-700 flex flex-col">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-1">
                    <span className="font-semibold">{personalInfo.firstName || 'FIRST'}</span> {personalInfo.lastName || 'LAST'}
                </h1>
                {personalInfo.jobTitle && (
                    <h2 className="text-lg tracking-widest uppercase mb-4" style={{ color: color }}>
                        {personalInfo.jobTitle}
                    </h2>
                )}

                <div className="flex flex-col gap-1 text-xs text-gray-500 uppercase tracking-wider">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {(personalInfo.city || personalInfo.country) && (
                        <div>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</div>
                    )}
                </div>
            </header>

            {/* Container for main content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex-1">

                {/* Left Sidebar (Skills & Education) */}
                <div className="md:col-span-1 space-y-8">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Skills</h3>
                            <ul className="space-y-2">
                                {skills.map((skill, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Education</h3>
                            <div className="space-y-5">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="text-sm font-semibold text-gray-800">{edu.degree}</div>
                                        <div className="text-xs text-gray-500 mb-1">{edu.fieldOfStudy}</div>
                                        <div className="text-xs text-gray-400 mb-1 whitespace-nowrap">
                                            {edu.startDate ? edu.startDate.split('-').reverse().join('-') : ''} - {edu.current ? 'Present' : (edu.endDate ? edu.endDate.split('-').reverse().join('-') : '')}
                                        </div>
                                        <div className="text-xs text-gray-600" style={{ color: color }}>{edu.school}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Main Content (Summary, Experience, Projects) */}
                <div className="md:col-span-3 space-y-8">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-2">Profile</h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-light">{renderTextWithBold(summary)}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-2">Experience</h3>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex flex-col mb-2">
                                            <h4 className="font-semibold text-gray-800 text-base">{exp.position}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <div className="text-sm" style={{ color: color }}>{exp.company}</div>
                                                <span className="text-xs text-gray-400 uppercase tracking-wider whitespace-nowrap ml-2">
                                                    {exp.startDate ? exp.startDate.split('-').reverse().join('-') : ''} — {exp.current ? 'Present' : (exp.endDate ? exp.endDate.split('-').reverse().join('-') : '')}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed font-light">{renderTextWithBold(exp.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-2">Projects</h3>
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex flex-col mb-2">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-gray-800 text-base">{proj.name}</h4>
                                                {proj.link && (
                                                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs hover:underline uppercase tracking-wider" style={{ color: color }}>
                                                        Link
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{proj.technologies && proj.technologies.join ? proj.technologies.join(', ') : proj.technologies}</div>
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed font-light">{renderTextWithBold(proj.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinimalTemplate;
