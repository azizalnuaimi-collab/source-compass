import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div role="status" className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#90F091] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" aria-label="loading">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <p className="mt-4 text-slate-300">Consulting academic archives...</p>
    </div>
  );
};