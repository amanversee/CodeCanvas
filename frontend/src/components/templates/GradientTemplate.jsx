import React from 'react';

const GradientTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#06b6d4'; // Cyan-500 default

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white font-sans text-gray-800 flex flex-col relative overflow-hidden">
            {/* Background Gradient Mesh (Subtle) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-transparent opacity-5 rounded-full -mr-48 -mt-48 blur-3xl" style={{ backgroundColor: color }}></div>

            {/* Header with Gradient Background */}
            <header className="relative p-12 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}>
                <div className="relative z-10 flex justify-between items-end">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-black tracking-tight mb-2 drop-shadow-sm">
                            {(personalInfo.firstName || 'FIRST').toUpperCase()} {(personalInfo.lastName || 'LAST').toUpperCase()}
                        </h1>
                        <p className="text-xl font-bold opacity-90 uppercase tracking-[0.2em] mb-6">
                            {personalInfo.jobTitle || 'TECH INNOVATOR'}
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold opacity-80 uppercase tracking-wider">
                            {personalInfo.email && <span className="flex items-center gap-2">{personalInfo.email}</span>}
                            {personalInfo.phone && <span className="flex items-center gap-2">{personalInfo.phone}</span>}
                            {(personalInfo.city || personalInfo.country) && (
                                <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                            )}
                        </div>
                    </div>
                    {/* Glass Badge */}
                    <div className="hidden md:block w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center transform rotate-12 shadow-2xl">
                        <span className="text-3xl font-black opacity-40">RES</span>
                    </div>
                </div>
            </header>

            <div className="p-12 space-y-12 relative flex-1">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                            <span className="w-2 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                            The Vision
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed font-medium">
                            {renderTextWithBold(summary)}
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-5 gap-12">
                    <div className="col-span-3 space-y-12">
                        {/* Experience */}
                        {experience && experience.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                    <span className="w-2 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                                    The Journey
                                </h3>
                                <div className="space-y-10">
                                    {experience.map((exp) => (
                                        <div key={exp.id} className="group relative">
                                            <div className="flex flex-col mb-3">
                                                <h4 className="text-xl font-black tracking-tight text-gray-900 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, ${color}, #000)` }}>
                                                    {exp.position}
                                                </h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-sm font-bold uppercase tracking-wider opacity-60" style={{ color: color }}>{exp.company}</span>
                                                    <span className="text-[10px] font-black text-gray-300 uppercase underline decoration-2 underline-offset-4" style={{ decorationColor: color }}>
                                                        {exp.startDate} — {exp.endDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                {renderTextWithBold(exp.description)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Academic */}
                        {education && education.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                    <span className="w-2 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                                    Academic
                                </h3>
                                <div className="space-y-8">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <h4 className="text-lg font-black text-gray-900 leading-tight mb-1">{edu.degree}</h4>
                                            <p className="text-sm font-bold opacity-60" style={{ color: color }}>{edu.school}</p>
                                            <p className="text-[9px] font-black text-gray-300 mt-2 uppercase tracking-widest italic">{edu.startDate} — {edu.endDate}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-span-2 space-y-12">
                        {/* Skills - Modern Gradient Tabs */}
                        {skills && skills.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                    <span className="w-2 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                                    Arsenal
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="text-[11px] font-black px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 uppercase tracking-tighter hover:shadow-lg hover:-translate-y-1 transition-all">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects - Compact & Punchy */}
                        {projects && projects.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                    <span className="w-2 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                                    Artifacts
                                </h3>
                                <div className="space-y-6">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed border-2 hover:border-solid hover:bg-white hover:shadow-xl transition-all group">
                                            <h4 className="font-black text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{proj.name}</h4>
                                            <p className="text-[11px] text-gray-500 leading-relaxed font-medium line-clamp-2">
                                                {renderTextWithBold(proj.description)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Accent */}
            <footer className="h-2 w-full mt-auto" style={{ background: `linear-gradient(to right, ${color}, ${color}22)` }}></footer>
        </div>
    );
};

export default GradientTemplate;
