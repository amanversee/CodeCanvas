import React from 'react';

const ProfessionalTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#2563eb'; // Blue-600 default

    const renderTextWithBold = (text) => {
        if (!text) return text;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} className="font-bold text-gray-900">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white p-12 print:p-8 font-sans text-gray-700 flex flex-col">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                    {personalInfo.firstName || 'FIRST'} {personalInfo.lastName || 'LAST'}
                </h1>
                <h2 className="text-xl font-semibold mb-4 uppercase tracking-wider" style={{ color: color }}>
                    {personalInfo.jobTitle || 'PROFESSIONAL TITLE'}
                </h2>

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 font-medium">
                    {personalInfo.email && (
                        <span className="flex items-center gap-1.5 underline decoration-gray-200 underline-offset-4">{personalInfo.email}</span>
                    )}
                    {personalInfo.phone && <span className="flex items-center gap-1.5">{personalInfo.phone}</span>}
                    {(personalInfo.city || personalInfo.country) && (
                        <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8 pb-8 border-b border-gray-100">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Professional Summary</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                        {renderTextWithBold(summary)}
                    </p>
                </section>
            )}

            <div className="grid grid-cols-3 gap-12">
                {/* Main Content (Experience & Projects) */}
                <div className="col-span-2 space-y-8">
                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-gray-200"></span>
                                Experience
                            </h3>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900 text-base">{exp.position}</h4>
                                            <span className="text-xs font-bold text-gray-400 whitespace-nowrap ml-2">
                                                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold mb-3" style={{ color: color }}>{exp.company}</div>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                                            {renderTextWithBold(exp.description)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-gray-200"></span>
                                Key Projects
                            </h3>
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900 text-base">{proj.name}</h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs font-bold opacity-60 hover:opacity-100 transition-opacity" style={{ color: color }}>
                                                    LINK
                                                </a>
                                            )}
                                        </div>
                                        {proj.technologies && (
                                            <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                                                {Array.isArray(proj.technologies) ? proj.technologies.join(' / ') : proj.technologies}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {renderTextWithBold(proj.description)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Content (Education & Skills) */}
                <div className="col-span-1 space-y-8">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>Skills</h3>
                            <ul className="space-y-2">
                                {skills.map((skill, index) => (
                                    <li key={index} className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>Education</h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">{edu.degree}</p>
                                        <p className="text-xs font-bold mt-1" style={{ color: color }}>{edu.school}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                                            {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                                        </p>
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

export default ProfessionalTemplate;
