import React from 'react';
import {
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    LinkIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const CreativeTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, projects, skills, themeColor } = data;
    const color = themeColor || '#4f46e5'; // Indigo-600 default

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
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-2xl flex print:shadow-none font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[280px] shrink-0 text-white flex flex-col p-8" style={{ backgroundColor: color }}>
                {/* Profile Section */}
                <div className="mb-10 text-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30">
                        <UserIcon className="w-16 h-16 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-tighter leading-tight mb-2">
                        {personalInfo.firstName || 'First'}<br />
                        {personalInfo.lastName || 'Last'}
                    </h1>
                    <div className="h-1 w-12 bg-white mx-auto mb-4 rounded-full"></div>
                    <p className="text-sm font-medium opacity-90 uppercase tracking-widest px-2">
                        {personalInfo.jobTitle || 'Role Title'}
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mb-10">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/20 pb-2">Contact</h3>
                    <ul className="space-y-4">
                        {personalInfo.email && (
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <EnvelopeIcon className="w-4 h-4" />
                                </div>
                                <span className="text-xs truncate">{personalInfo.email}</span>
                            </li>
                        )}
                        {personalInfo.phone && (
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <PhoneIcon className="w-4 h-4" />
                                </div>
                                <span className="text-xs">{personalInfo.phone}</span>
                            </li>
                        )}
                        {(personalInfo.city || personalInfo.country) && (
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <MapPinIcon className="w-4 h-4" />
                                </div>
                                <span className="text-xs">
                                    {personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}
                                </span>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Skills Section */}
                <div className="mb-10">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/20 pb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills && skills.map((skill, index) => (
                            <span key={index} className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded border border-white/10 hover:bg-white/20 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Education Section (Sidebar Version) */}
                {education && education.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/20 pb-2">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <p className="text-xs font-bold">{edu.degree}</p>
                                    <p className="text-[10px] opacity-80">{edu.school}</p>
                                    <p className="text-[9px] opacity-60 italic mt-1 uppercase tracking-tighter">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 bg-white">
                {/* Summary */}
                {summary && (
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl text-white shadow-lg" style={{ backgroundColor: color }}>
                                <UserIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Profile Summary</h3>
                        </div>
                        <div className="pl-14">
                            <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                {renderTextWithBold(summary)}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl text-white shadow-lg" style={{ backgroundColor: color }}>
                                <BriefcaseIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Work Experience</h3>
                        </div>
                        <div className="space-y-8 pl-14 relative before:absolute before:inset-0 before:left-[1.35rem] before:h-full before:w-px before:bg-gray-100">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute left-[-2.1rem] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }}></div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base">{exp.position}</h4>
                                            <p className="text-sm font-semibold italic" style={{ color: color }}>{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1 md:mt-0">
                                            {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
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
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl text-white shadow-lg" style={{ backgroundColor: color }}>
                                <CodeBracketIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Key Projects</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6 pl-14">
                            {projects.map((proj) => (
                                <div key={proj.id} className="group border-b border-gray-50 pb-6 last:border-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900 text-base group-hover:text-indigo-600 transition-colors">
                                            {proj.name}
                                        </h4>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-gray-900">
                                                <LinkIcon className="w-3 h-3" />
                                                LIVE REPO
                                            </a>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                                            {Array.isArray(proj.technologies) ? proj.technologies.join(' • ') : proj.technologies}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {renderTextWithBold(proj.description)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default CreativeTemplate;
