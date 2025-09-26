import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { CitationInput } from './components/CitationInput.tsx';
import { ResultsDisplay } from './components/ResultsDisplay.tsx';
import { Footer } from './components/Footer.tsx';
import { ErrorDisplay } from './components/ErrorDisplay.tsx';
import type { DatabaseRecommendation } from './types.ts';
import { findDatabasesForCitation } from './services/geminiService.ts';

const App: React.FC = () => {
  const [citation, setCitation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<DatabaseRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!citation.trim()) {
      setError('Please enter a citation to search.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const recommendations = await findDatabasesForCitation(citation);
      setResults(recommendations);
    } catch (err) {
      console.error(err);
      setError('Failed to get recommendations. Please check your citation or try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [citation]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-base text-slate-300 mb-8">
            Paste any academic citation below. Aziz made you this amazing tool and with the power of AI will analyze and suggest the best databases from your KU university's collection to find THE BEST match for you.
          </p>
          <CitationInput
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          {error && <ErrorDisplay message={error} />}
          <ResultsDisplay isLoading={isLoading} results={results} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;