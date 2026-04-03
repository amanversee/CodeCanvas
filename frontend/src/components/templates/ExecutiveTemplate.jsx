import React from 'react';

const ExecutiveTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#1e293b'; // Slate-800 default

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white p-12 print:p-8 font-serif text-gray-800 flex flex-col border-t-[12px]" style={{ borderColor: color }}>
            {/* Header */}
            <header className="mb-10 text-center border-b pb-8 border-gray-100">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest text-gray-900 mb-3">
                    {personalInfo.firstName || 'FIRST'} {personalInfo.lastName || 'LAST'}
                </h1>
                <p className="text-lg font-medium tracking-[0.3em] uppercase mb-4" style={{ color: color }}>
                    {personalInfo.jobTitle || 'EXECUTIVE LEADERSHIP'}
                </p>

                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    {personalInfo.email && <span className="flex items-center gap-1.5">{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1.5">{personalInfo.phone}</span>}
                    {(personalInfo.city || personalInfo.country) && (
                        <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                    )}
                </div>
            </header>

            {/* Profile/Summary */}
            {summary && (
                <section className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mb-4 border-b pb-1 inline-block" style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
                        Professional Profile
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed text-justify italic">
                        {renderTextWithBold(summary)}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mb-6 border-b pb-1 inline-block" style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
                        Executive Experience
                    </h3>
                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-end mb-2">
                                    <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{exp.position}</h4>
                                    <span className="text-xs font-bold text-gray-500 uppercase">
                                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-bold mb-3 italic" style={{ color: color }}>{exp.company}</div>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {renderTextWithBold(exp.description)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Core Competencies (Skills) */}
            {skills && skills.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mb-6 border-b pb-1 inline-block" style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
                        Core Competencies
                    </h3>
                    <div className="grid grid-cols-3 gap-y-3 gap-x-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mb-6 border-b pb-1 inline-block" style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
                        Academic Background
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">{edu.degree}</h4>
                                    <p className="text-sm font-bold italic" style={{ color: color }}>{edu.school}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-500 uppercase">
                                    {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects (displayed as Achievements for Executive) */}
            {projects && projects.length > 0 && (
                <section>
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mb-6 border-b pb-1 inline-block" style={{ borderBottomColor: color, borderBottomWidth: '2px' }}>
                        Key Achievements
                    </h3>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id} className="flex gap-4">
                                <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-1">{proj.name}</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {renderTextWithBold(proj.description)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ExecutiveTemplate;
