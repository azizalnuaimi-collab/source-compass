import React from 'react';
import type { DatabaseRecommendation } from '../types';
import { DatabaseCard } from './DatabaseCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ResultsDisplayProps {
  isLoading: boolean;
  results: DatabaseRecommendation[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, results }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (results.length === 0) {
    return (
        <div className="text-center mt-12 p-8 bg-white/5 rounded-lg border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-300">No results yet</h3>
            <p className="mt-1 text-sm text-slate-400">Your recommended databases will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Top Recommendations</h2>
      <div className="space-y-4">
        {results.map((rec, index) => (
          <DatabaseCard key={index} recommendation={rec} isInitiallyOpen={index === 0} />
        ))}
      </div>
    </div>
  );
};