import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#90F091]/20">
      <div className="container mx-auto px-4 py-6 md:px-6 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Source Compass. An AI tool for academic research.</p>
      </div>
    </footer>
  );
};