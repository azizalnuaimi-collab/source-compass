import React, { useState } from 'react';
import type { DatabaseRecommendation } from '../types.ts';

interface DatabaseCardProps {
  recommendation: DatabaseRecommendation;
  isInitiallyOpen: boolean;
}

export const DatabaseCard: React.FC<DatabaseCardProps> = ({ recommendation, isInitiallyOpen }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const hasSearchPlan = recommendation.searchPlan && recommendation.searchPlan.length > 0;

  return (
    <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10 transition-all duration-300">
      <div className="flex items-start">
        <div className="flex-shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#90F091]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 4.5 8-4.5M12 12v9" />
           </svg>
        </div>
        <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold text-slate-100">{recommendation.databaseName}</h3>
            <p className="mt-1 text-slate-300">{recommendation.reason}</p>
        </div>
        {hasSearchPlan && (
           <button 
             onClick={() => setIsOpen(!isOpen)} 
             className="ml-4 p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90F091] focus:ring-offset-[#002100]"
             aria-expanded={isOpen}
           >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
        )}
      </div>

      {hasSearchPlan && (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <div className="pt-4 border-t border-[#90F091]/20">
                <h4 className="text-sm font-semibold text-slate-200 mb-3">
                Advanced Search Plan
                </h4>
                <div className="space-y-2 text-sm">
                {recommendation.searchPlan.map((step, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 items-center">
                        <span className="font-medium text-slate-400 col-span-1 truncate">{step.field}</span>
                        <div className="col-span-2 bg-[#002100] rounded p-2 flex items-center">
                           <code className="text-[#90F091] leading-tight flex-grow">{step.value}</code>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};