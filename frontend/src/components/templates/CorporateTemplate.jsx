import React from 'react';

const CorporateTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#0f172a'; // Default slate-900

    const renderTextWithBold = (text) => {
        if (!text) return text;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} className="font-semibold text-gray-900">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white p-12 print-scale font-serif text-gray-800 flex flex-col border-t-8" style={{ borderColor: color }}>
            {/* Header */}
            <header className="mb-6 pb-6 border-b-2 border-gray-300">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">
                            {personalInfo.firstName || 'FIRST'} {personalInfo.lastName || 'LAST'}
                        </h1>
                        {personalInfo.jobTitle && (
                            <h2 className="text-xl mt-2 tracking-wider font-semibold" style={{ color: color }}>
                                {personalInfo.jobTitle}
                            </h2>
                        )}
                    </div>
                    <div className="text-right text-sm text-gray-600 space-y-1">
                        {personalInfo.email && <div>{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {(personalInfo.city || personalInfo.country) && (
                            <div>
                                {personalInfo.city}
                                {personalInfo.city && personalInfo.country ? ', ' : ''}
                                {personalInfo.country}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="flex-1 space-y-8">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-2">Professional Summary</h3>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{renderTextWithBold(summary)}</p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4 pb-1 border-b" style={{ borderColor: color }}>
                            Professional Experience
                        </h3>
                        <div className="space-y-5">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-gray-900 text-base">{exp.position}</h4>
                                        <div className="text-sm font-semibold text-gray-600 whitespace-nowrap ml-2">
                                            {exp.startDate ? exp.startDate.split('-').reverse().join('-') : ''} -{' '}
                                            {exp.current ? 'Present' : exp.endDate ? exp.endDate.split('-').reverse().join('-') : ''}
                                        </div>
                                    </div>
                                    <div className="text-sm mb-2 font-medium" style={{ color: color }}>
                                        {exp.company}
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
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
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4 pb-1 border-b" style={{ borderColor: color }}>
                            Key Projects
                        </h3>
                        <div className="space-y-5">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex items-baseline space-x-2">
                                        <h4 className="font-bold text-gray-900 text-base">{proj.name}</h4>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs hover:underline text-gray-500">
                                                [Link]
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-sm font-medium mb-2" style={{ color: color }}>
                                        {proj.technologies && proj.technologies.join ? proj.technologies.join(', ') : proj.technologies}
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {renderTextWithBold(proj.description)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4 pb-1 border-b" style={{ borderColor: color }}>
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-900 text-base">
                                            {edu.degree} in {edu.fieldOfStudy}
                                        </h4>
                                        <span className="text-sm font-semibold text-gray-600 whitespace-nowrap ml-2">
                                            {edu.startDate ? edu.startDate.split('-').reverse().join('-') : ''} -{' '}
                                            {edu.current ? 'Present' : edu.endDate ? edu.endDate.split('-').reverse().join('-') : ''}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium" style={{ color: color }}>
                                        {edu.school}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b" style={{ borderColor: color }}>
                            Core Competencies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="text-sm text-gray-800 bg-gray-100 border border-gray-200 px-3 py-1 rounded-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CorporateTemplate;
