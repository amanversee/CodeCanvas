import React from 'react';

const ElegantTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#9333ea'; // Purple-600 default (for luxury feel)

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white p-16 print:p-8 font-serif text-gray-600 flex flex-col items-center">
            {/* Header */}
            <header className="mb-12 text-center w-full max-w-lg">
                <h1 className="text-5xl font-extralight uppercase tracking-[0.2em] text-gray-900 mb-6 border-b border-gray-100 pb-6">
                    {personalInfo.firstName || 'FIRST'} <br />
                    <span className="font-bold">{personalInfo.lastName || 'LAST'}</span>
                </h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase mb-6" style={{ color: color }}>
                    {personalInfo.jobTitle || 'ELEGANT PROFESSIONAL'}
                </p>

                <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {(personalInfo.city || personalInfo.country) && (
                        <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                    )}
                </div>
            </header>

            {/* Content Body */}
            <div className="w-full space-y-12">
                {/* Summary */}
                {summary && (
                    <section className="text-center">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 mb-6 flex justify-center items-center gap-4">
                            <span className="w-6 h-px bg-gray-200"></span>
                            The Narrative
                            <span className="w-6 h-px bg-gray-200"></span>
                        </h3>
                        <p className="text-sm leading-relaxed max-w-2xl mx-auto italic font-medium opacity-80">
                            {renderTextWithBold(summary)}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 mb-8 flex justify-center items-center gap-4">
                            <span className="w-6 h-px bg-gray-200"></span>
                            Experience
                            <span className="w-6 h-px bg-gray-200"></span>
                        </h3>
                        <div className="space-y-10">
                            {experience.map((exp) => (
                                <div key={exp.id} className="text-center group">
                                    <div className="flex flex-col items-center mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                                            {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                        <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{exp.position}</h4>
                                        <p className="text-sm font-semibold tracking-wider italic mt-0.5" style={{ color: color }}>{exp.company}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed group-hover:text-gray-700 transition-colors">
                                        {renderTextWithBold(exp.description)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Grid Section for Education & Skills */}
                <div className="grid grid-cols-2 gap-16 pt-8 border-t border-gray-50">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-6">Expertise</h3>
                            <div className="grid grid-cols-1 gap-y-3">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-50 pb-1.5 group">
                                        <span>{skill}</span>
                                        <div className="w-1.5 h-1.5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" style={{ backgroundColor: color }}></div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-6 text-right">Academic</h3>
                            <div className="space-y-8 text-right">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <p className="text-sm font-bold text-gray-900 leading-tight uppercase tracking-tight">{edu.degree}</p>
                                        <p className="text-[11px] font-bold mt-1.5 opacity-60 tracking-wider" style={{ color: color }}>{edu.school}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">
                                            {edu.startDate} — {edu.endDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="pt-8 border-t border-gray-50 text-center">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 mb-8 flex justify-center items-center gap-4">
                            <span className="w-6 h-px bg-gray-200"></span>
                            Selected Works
                            <span className="w-6 h-px bg-gray-200"></span>
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            {projects.map((proj) => (
                                <div key={proj.id} className="group">
                                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-2 group-hover:scale-110 transition-transform origin-center inline-block">
                                        {proj.name}
                                    </h4>
                                    <p className="text-[11px] leading-relaxed text-gray-500 max-w-xs mx-auto italic">
                                        {renderTextWithBold(proj.description)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ElegantTemplate;
