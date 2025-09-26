import React from 'react';

interface CitationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const CitationInput: React.FC<CitationInputProps> = ({ value, onChange, onSearch, isLoading }) => {
  return (
    <div className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="e.g., Turing, A. M. (1950). Computing machinery and intelligence. Mind, 59(236), 433-460."
        className="w-full h-32 p-4 text-slate-300 bg-[#002100] border border-[#90F091]/50 rounded-lg focus:ring-2 focus:ring-[#90F091] focus:border-[#90F091] transition duration-150 ease-in-out resize-y placeholder:text-slate-500"
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 bg-[#90F091] text-[#0A360A] font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90F091] disabled:bg-[#90F091]/50 disabled:text-[#0A360A]/70 disabled:cursor-not-allowed dark:focus:ring-offset-[#002100] transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
             'Find Source'
          )}
        </button>
      </div>
    </div>
  );
};