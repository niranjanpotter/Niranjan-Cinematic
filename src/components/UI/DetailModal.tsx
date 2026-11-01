import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Award,
  Briefcase,
  Cpu,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Share2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA, ProjectItem } from '../../data/portfolioData';

interface DetailModalProps {
  isOpen: boolean;
  type: string;
  data?: unknown;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  type,
  data,
  onClose
}) => {
  // Trigger celebratory confetti on Achievements modal
  useEffect(() => {
    if (isOpen && type === 'achievements') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#f59e0b', '#3b82f6', '#ec4899']
        });
      } catch {
        // Fallback
      }
    }
  }, [isOpen, type]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="cyber-panel w-full max-w-3xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-cyan-500/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <span className="font-heading text-sm md:text-base font-bold text-white tracking-wider">
              {type === 'project' && 'PROJECT SPECIFICATION // ARCHITECTURE'}
              {type === 'intro' && 'CREATOR PROFILE // LEADERSHIP BIO'}
              {type === 'education' && 'ACADEMIC FOUNDATION // EDUCATION'}
              {type === 'skills' && 'ENTERPRISE TECH STACK // MATRIX'}
              {type === 'achievements' && 'HONORS, CERTIFICATIONS & IMPACT METRICS'}
              {type === 'experience' && 'PROFESSIONAL EXPERIENCE & TIMELINE'}
              {type === 'contact' && 'CONTACT GARAGE // COMMUNICATE & HIRE'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {/* --- CASE 1: SPECIFIC PROJECT DETAILS --- */}
          {type === 'project' && !!data && (() => {
            const proj = data as ProjectItem;
            return (
              <div className="space-y-5">
                <div>
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono">
                    {proj.category}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mt-2 mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                {/* Key Impact Metric Callout */}
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/40 flex items-start space-x-3">
                  <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono text-cyan-300 font-bold uppercase">
                      Verified Impact & Performance Gain
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {proj.impact}
                    </div>
                  </div>
                </div>

                {/* Technical Architecture Details */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                    Architecture Implementation & Work Delivered:
                  </h4>
                  <ul className="space-y-2">
                    {proj.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Technologies & Connectors:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-200 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* --- CASE 2: CREATOR INTRO BIO --- */}
          {type === 'intro' && (
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center space-x-4">
                  {/* Real Photo in Modal */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] shrink-0">
                    <img
                      src="/avatar.png"
                      alt="Niranjan Kumar Potter"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-black text-white">
                      {PORTFOLIO_DATA.personal.name}
                    </h2>
                    <div className="text-cyan-400 text-sm font-semibold">
                      {PORTFOLIO_DATA.personal.heroTitle}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {PORTFOLIO_DATA.personal.location}
                    </div>
                  </div>
                </div>

                <a
                  href={PORTFOLIO_DATA.personal.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 hover:brightness-110 transition-all self-start md:self-auto shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule MuleSoft Call</span>
                </a>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Executive Summary
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {PORTFOLIO_DATA.personal.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Career Pillars
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-cyan-400 font-semibold block mb-1">Technical Leadership</span>
                    API implementation ownership, architecture & code reviews, developer mentoring, stakeholder collaboration.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-cyan-400 font-semibold block mb-1">Integration Delivery</span>
                    Mule 4, API-led connectivity, RAML, DataWeave 2.0, REST, SOAP, GraphQL.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-cyan-400 font-semibold block mb-1">Modernization</span>
                    CloudHub 1.0 to 2.0 migrations, Java 17 upgrades, asynchronous messaging with Anypoint MQ.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-cyan-400 font-semibold block mb-1">Hypercare & Enablement</span>
                    End-to-end knowledge transfer for junior developers and support teams, post-go-live stabilization.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CASE 3: EDUCATION --- */}
          {type === 'education' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start space-x-3.5">
                <GraduationCap className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {PORTFOLIO_DATA.personal.education.degree}
                  </h3>
                  <div className="text-blue-300 text-sm font-mono mt-0.5">
                    {PORTFOLIO_DATA.personal.education.period}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Four-year undergraduate engineering program covering computer science, systems engineering, distributed architectures, algorithms, and database management.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Language Proficiencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.personal.education.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- CASE 4: SKILLS MATRIX --- */}
          {type === 'skills' && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Verified toolkit across integration runtimes, protocols, databases, cloud infrastructure, CI/CD pipelines, and emerging agentic orchestration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.skillCategories.map((cat) => (
                  <div key={cat.name} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold mb-2">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-200 border border-slate-700/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CASE 5: ACHIEVEMENTS & CERTIFICATIONS --- */}
          {type === 'achievements' && (
            <div className="space-y-6">
              {/* Delivery Outcomes Metrics */}
              <div>
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Quantified Business Delivery Outcomes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PORTFOLIO_DATA.metrics.map((m) => (
                    <div key={m.label} className="cyber-panel-gold p-3 rounded-xl">
                      <div className="font-heading text-xl font-bold text-amber-400">
                        {m.value}
                      </div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {m.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {m.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Awards */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  Recognition & Milestones
                </h4>
                <div className="space-y-2">
                  {PORTFOLIO_DATA.achievements
                    .filter((a) => a.category !== 'Metric')
                    .map((a) => (
                      <div key={a.title} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white">
                            {a.title}
                          </div>
                          <div className="text-xs text-slate-300">
                            {a.description}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Salesforce & Workato Credentials
                  </h4>
                  <a
                    href={PORTFOLIO_DATA.personal.links.trailblazer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>Verify on Trailblazer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {PORTFOLIO_DATA.certifications.map((c) => (
                    <div key={c.title} className="p-2.5 rounded bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                      <div className="font-semibold text-slate-200">
                        {c.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                        <span className="text-cyan-400">{c.issuer}</span>
                        <span>{c.dateOrStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- CASE 6: PROFESSIONAL EXPERIENCE --- */}
          {type === 'experience' && (
            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp) => (
                <div key={exp.company} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {exp.company}
                      </h3>
                      <div className="text-xs font-semibold text-emerald-400">
                        {exp.role}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 font-mono">
                    Domain: {exp.domain}
                  </div>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-emerald-400 mr-1 mt-0.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- CASE 7: CONTACT GARAGE --- */}
          {type === 'contact' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Let's Discuss MuleSoft
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Open for Senior MuleSoft Developer, Technical Lead, and Integration Architect discussions. Available for remote & relocation opportunities.
                </p>
              </div>

              {/* Direct Link Pedestals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading text-sm font-bold text-white">Calendly</div>
                      <div className="text-xs text-slate-400">Schedule MuleSoft Discussion</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading text-sm font-bold text-white">LinkedIn</div>
                      <div className="text-xs text-slate-400">Connect with Niranjan</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.links.trailblazer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading text-sm font-bold text-white">Salesforce Trailblazer</div>
                      <div className="text-xs text-slate-400">Double Star Ranger Credentials</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.links.repositories}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading text-sm font-bold text-white">GitHub Repositories</div>
                      <div className="text-xs text-slate-400">Public Projects & Code</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                </a>
              </div>

              {/* Resume / Contact action */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Professional Resume & Career Bio</div>
                    <div className="text-[11px] text-slate-400">View genuine contributions and career timeline</div>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 flex items-center justify-between bg-slate-950/80 text-xs font-mono text-slate-400">
          <span>SRI TECH // CINEMATIC ENGINE</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
