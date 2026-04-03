import React from 'react';

const PortfolioTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#f97316'; // Orange-500 default (for creative energy)

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-[#fafafa] p-12 print:p-8 font-sans text-gray-800 flex flex-col">
            {/* Top Bar / Header */}
            <header className="flex justify-between items-start mb-16">
                <div className="max-w-md">
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.85] text-gray-900 mb-4">
                        {personalInfo.firstName || 'FIRST'}<br />
                        <span style={{ color: color }}>{personalInfo.lastName || 'LAST'}</span>
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest opacity-80 mb-6">
                        {personalInfo.jobTitle || 'CREATIVE DEVELOPER'}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-tight text-gray-400">
                        {personalInfo.email && <span className="hover:text-gray-900 transition-colors cursor-default">{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="hover:text-gray-900 transition-colors cursor-default">{personalInfo.phone}</span>}
                        {(personalInfo.city || personalInfo.country) && (
                            <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                        )}
                    </div>
                </div>

                {/* Visual Square */}
                <div className="w-32 h-32 rotate-12 flex items-center justify-center border-8 shadow-2xl transition-transform hover:rotate-0 duration-500" style={{ borderColor: color }}>
                    <span className="text-4xl font-black uppercase tracking-tighter" style={{ color: color }}>
                        {(personalInfo.firstName?.[0] || 'F')}{(personalInfo.lastName?.[0] || 'L')}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
                {/* Left Column (Main Focus: Projects & Experience) */}
                <div className="col-span-8 space-y-12">
                    {/* Summary (Brief) */}
                    {summary && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">The Intro</h3>
                            <p className="text-base font-medium leading-relaxed text-gray-600 border-l-4 pl-6" style={{ borderColor: color }}>
                                {renderTextWithBold(summary)}
                            </p>
                        </section>
                    )}

                    {/* Projects (Big Focus) */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Selected Works</h3>
                            <div className="space-y-10">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="group relative">
                                        <div className="flex justify-between items-end mb-3">
                                            <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                                                {proj.name}
                                            </h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] font-black underline uppercase tracking-widest text-gray-400 hover:text-gray-900">
                                                    VIEW CASE
                                                </a>
                                            )}
                                        </div>
                                        {proj.technologies && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {(Array.isArray(proj.technologies) ? proj.technologies : proj.technologies.split(',')).map((tech, i) => (
                                                    <span key={i} className="text-[9px] font-black px-2 py-0.5 bg-white border border-gray-100 shadow-sm text-gray-500 uppercase tracking-tighter">
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                                            {renderTextWithBold(proj.description)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Career Path</h3>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="flex gap-6">
                                        <div className="text-[10px] font-black uppercase tracking-tighter text-gray-300 pt-1 shrink-0 w-20 text-right">
                                            {exp.startDate} <br /> {exp.current ? 'NOW' : exp.endDate}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase tracking-tight text-gray-900">{exp.position}</h4>
                                            <p className="text-sm font-bold uppercase tracking-widest mb-3 opacity-60" style={{ color: color }}>{exp.company}</p>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                {renderTextWithBold(exp.description)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Meta: Skills & Education) */}
                <div className="col-span-4 space-y-12">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Stack</h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {skills.map((skill, index) => (
                                    <span key={index} className="text-[11px] font-black px-3 py-1 bg-gray-900 text-white uppercase tracking-tighter hover:rotate-3 transition-transform cursor-crosshair">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Degree</h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <p className="text-sm font-black uppercase tracking-tighter text-gray-900 leading-tight mb-1">{edu.degree}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: color }}>{edu.school}</p>
                                        <p className="text-[9px] font-black text-gray-300 uppercase italic">
                                            {edu.startDate} — {edu.endDate}
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

export default PortfolioTemplate;
