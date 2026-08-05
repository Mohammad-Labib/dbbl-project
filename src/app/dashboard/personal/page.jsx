'use client'
import React, { useState } from 'react';

const ConstructionProfile = () => {
    // Default set to false for Light Mode initial state
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [copied, setCopied] = useState(false);

    const user = {
        name: "Admin",
        title: "Afra Corporation Ltd.",
        subtitle: "Specializing in Structural Engineering & Infrastructure",
        location: "Dhaka, Bangladesh",
        email: "labib.construction@example.com",
        phone: "+880 1700-000000",
        bio: "Experienced Construction Project Manager and Civil Engineer specializing in large-scale residential, commercial, and infrastructure developments. Dedicated to safety standards, budget efficiency, structural integrity, and modern architectural execution.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500",
        skills: [
            { name: "Structural Analysis & Design", level: 92 },
            { name: "Site Supervision & Safety Management", level: 95 },
            { name: "AutoCAD & Revit 3D Modeling", level: 88 },
            { name: "Project Estimation & Cost Control", level: 85 },
            { name: "Quality Assurance (QA/QC)", level: 90 },
        ],
        stats: [
            { label: "Completed Projects", value: "25+" },
            { label: "On-Site Hours", value: "5,000+" },
            { label: "Industry Experience", value: "5+ Yrs" }
        ],
        projects: [
            { name: "Commercial Tower Complex", desc: "18-story reinforced concrete commercial building with smart HVAC and basement parking.", tag: "Commercial" },
            { name: "Urban Expressway Bridge", desc: "4-lane pre-stressed concrete girder bridge expansion targeting heavy traffic flow.", tag: "Infrastructure" },
            { name: "Green Eco Residential Community", desc: "Sustainable residential housing project utilizing solar integration and eco-friendly materials.", tag: "Residential" }
        ],
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(user.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 sm:p-6 ${
            isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-100 text-slate-800'
        }`}>
            <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl border relative overflow-hidden backdrop-blur-md ${
                isDarkMode 
                    ? 'bg-zinc-900/90 border-zinc-800/80 shadow-amber-950/20' 
                    : 'bg-white/90 border-slate-200 shadow-slate-200/50'
            }`}>
                
                {/* Background Decorative Gradient (Construction Amber Glow) */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Theme Toggle Button */}
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`absolute top-6 right-6 p-2.5 rounded-2xl border transition-all duration-300 active:scale-95 ${
                        isDarkMode 
                            ? 'bg-zinc-800/80 border-zinc-700 text-amber-400 hover:bg-zinc-700 hover:border-zinc-600' 
                            : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
                    }`}
                    title="Toggle Theme"
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>

                {/* Profile Banner / Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative group">
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-28 h-28 rounded-2xl object-cover ring-4 ring-amber-500/40 shadow-xl group-hover:scale-105 transition-all duration-300"
                        />
                        {/* Construction Safety Badge */}
                        <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 border-2 border-zinc-900 rounded-lg shadow-md" title="Site Ready">
                            <svg className="w-3.5 h-3.5 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10h2v4h-2zm0 5h2v2h-2z"/>
                            </svg>
                        </span>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {user.name}
                        </h2>
                        <p className="text-sm font-bold text-amber-500 flex items-center justify-center sm:justify-start gap-1">
                            <span>🏗️</span> {user.title}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{user.subtitle}</p>
                        
                        <div className={`flex items-center justify-center sm:justify-start gap-1 text-xs pt-1.5 ${
                            isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                        }`}>
                            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {user.location}
                        </div>
                    </div>
                </div>

                {/* Stats Counter */}
                <div className={`grid grid-cols-3 gap-3 my-6 p-3.5 rounded-2xl border text-center transition-colors ${
                    isDarkMode ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-amber-50/50 border-amber-100'
                }`}>
                    {user.stats.map((stat, i) => (
                        <div key={i} className="space-y-0.5">
                            <p className="text-lg sm:text-xl font-black text-amber-500 tracking-tight">{stat.value}</p>
                            <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                            }`}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tab Navigation */}
                <div className={`flex p-1 rounded-xl mb-6 border ${
                    isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-100 border-slate-200'
                }`}>
                    {['overview', 'skills', 'projects'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all duration-200 ${
                                activeTab === tab 
                                    ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20' 
                                    : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dynamic Content Views */}
                <div className="min-h-[140px]">
                    {activeTab === 'overview' && (
                        <div className="space-y-4 animate-fadeIn">
                            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                                {user.bio}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {["Civil Engineering", "Site Safety", "Structural Design", "AutoCAD", "Cost Estimation"].map((spec, idx) => (
                                    <span key={idx} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                                        isDarkMode 
                                            ? 'bg-zinc-800/60 border-zinc-700/80 text-amber-400 hover:border-amber-500/50' 
                                            : 'bg-amber-100/60 border-amber-200/80 text-amber-800 hover:bg-amber-100'
                                    }`}>
                                        #{spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="space-y-3 animate-fadeIn">
                            {user.skills.map((skill, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className={isDarkMode ? 'text-zinc-200' : 'text-slate-700'}>{skill.name}</span>
                                        <span className="text-amber-500">{skill.level}%</span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                                        <div 
                                            className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out" 
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 gap-3 animate-fadeIn">
                            {user.projects.map((proj, i) => (
                                <div key={i} className={`p-3.5 rounded-xl border space-y-1.5 transition-all duration-200 hover:-translate-y-0.5 ${
                                    isDarkMode ? 'bg-zinc-800/40 border-zinc-800 hover:border-zinc-700' : 'bg-slate-50 border-slate-200/60 hover:border-amber-300'
                                }`}>
                                    <div className="flex justify-between items-center">
                                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{proj.name}</h4>
                                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                                            {proj.tag}
                                        </span>
                                    </div>
                                    <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{proj.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className={`pt-6 border-t mt-6 flex flex-col sm:flex-row gap-3 ${
                    isDarkMode ? 'border-zinc-800/80' : 'border-slate-100'
                }`}>
                    <button 
                        onClick={copyEmail}
                        className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied ? "Copied Email!" : "Copy Contact Email"}
                    </button>

                    <div className="flex gap-2">
                        <a 
                            href={user.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border flex items-center justify-center text-xs font-bold transition-all active:scale-95 ${
                                isDarkMode 
                                    ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white' 
                                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Portfolio
                        </a>
                        <a 
                            href={user.socials.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border flex items-center justify-center text-xs font-bold transition-all active:scale-95 ${
                                isDarkMode 
                                    ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white' 
                                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConstructionProfile;