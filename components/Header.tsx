import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-[#90F091]/20 sticky top-0 bg-[#002100]/80 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 py-4 md:px-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#90F091] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16.627l1.38-6.9L16.2 8.35l-6.9 1.38L8 16.627zM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Source Compass
        </h1>
      </div>
    </header>
  );
};