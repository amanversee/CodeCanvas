import React from 'react';

const ClassicTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#16a34a';

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-lg p-12 print-scale font-serif text-gray-800 flex flex-col">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">
                    {personalInfo.firstName || 'FIRST'} {personalInfo.lastName || 'LAST'}
                </h1>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && (
                        <>
                            <span className="hidden sm:inline" style={{ color: color }}>•</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <>
                            <span className="hidden sm:inline" style={{ color: color }}>•</span>
                            <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                        </>
                    )}
                    {personalInfo.jobTitle && (
                        <>
                            <span className="hidden sm:inline" style={{ color: color }}>•</span>
                            <span className="font-semibold" style={{ color: color }}>{personalInfo.jobTitle}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 pb-1 mb-2 uppercase tracking-wide" style={{ borderColor: color }}>Professional Summary</h3>
                    <p className="text-sm text-gray-800 leading-relaxed text-justify">{renderTextWithBold(summary)}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 pb-1 mb-4 uppercase tracking-wide" style={{ borderColor: color }}>Experience</h3>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900 text-base">{exp.position}</h4>
                                    <span className="text-sm font-medium text-gray-700 italic whitespace-nowrap ml-2">
                                        {exp.startDate ? exp.startDate.split('-').reverse().join('-') : ''} - {exp.current ? 'Present' : (exp.endDate ? exp.endDate.split('-').reverse().join('-') : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-gray-700 mb-2" style={{ color: color }}>{exp.company}</div>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{renderTextWithBold(exp.description)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 pb-1 mb-4 uppercase tracking-wide" style={{ borderColor: color }}>Projects</h3>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900 text-base">{proj.name}</h4>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm font-medium italic hover:underline" style={{ color: color }}>
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <div className="text-sm italic text-gray-600 mb-2">{proj.technologies && proj.technologies.join ? proj.technologies.join(', ') : proj.technologies}</div>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{renderTextWithBold(proj.description)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 pb-1 mb-4 uppercase tracking-wide" style={{ borderColor: color }}>Education</h3>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900 text-base">{edu.degree} in {edu.fieldOfStudy}</h4>
                                    <span className="text-sm font-medium text-gray-700 italic whitespace-nowrap ml-2">
                                        {edu.startDate ? edu.startDate.split('-').reverse().join('-') : ''} - {edu.current ? 'Present' : (edu.endDate ? edu.endDate.split('-').reverse().join('-') : '')}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-800 font-semibold" style={{ color: color }}>{edu.school}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 pb-1 mb-3 uppercase tracking-wide" style={{ borderColor: color }}>Skills</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-800">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <span className="mr-2 text-xs" style={{ color: color }}>❖</span>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
