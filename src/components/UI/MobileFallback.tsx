import React from 'react';
import { PORTFOLIO_DATA, DistrictInfo } from '../../data/portfolioData';
import { MapPin, ChevronRight, Calendar, ExternalLink } from 'lucide-react';

interface MobileFallbackProps {
  onSelectDistrict: (district: DistrictInfo) => void;
  onOpenDetails: (type: string, data?: unknown) => void;
}

export const MobileFallback: React.FC<MobileFallbackProps> = ({
  onSelectDistrict,
  onOpenDetails
}) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 md:p-8 overflow-y-auto">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono mb-3">
          POTTER CITY // 2.5D INTERACTIVE MAP
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-white mb-2">
          {PORTFOLIO_DATA.personal.name}
        </h1>
        <div className="text-cyan-400 font-medium text-sm mb-3">
          {PORTFOLIO_DATA.personal.heroTitle}
        </div>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
          {PORTFOLIO_DATA.personal.subheading}
        </p>

        <div className="flex items-center justify-center gap-2">
          <a
            href={PORTFOLIO_DATA.personal.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Call</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg cyber-panel text-cyan-300 text-xs flex items-center space-x-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Districts List Route */}
      <div className="max-w-xl mx-auto space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
          City Districts Route (Start ➔ Finish)
        </div>

        {PORTFOLIO_DATA.districts.map((d, index) => (
          <div
            key={d.id}
            onClick={() => {
              onSelectDistrict(d);
              onOpenDetails(d.id);
            }}
            className="cyber-panel p-4 rounded-xl cursor-pointer hover:border-cyan-400 transition-all flex items-center justify-between group border-l-4"
            style={{ borderColor: d.color }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" style={{ color: d.color }} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    STAGE {index + 1}
                  </span>
                  <span className="text-xs font-bold" style={{ color: d.color }}>
                    {d.shortLabel}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {d.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {d.tagline}
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

