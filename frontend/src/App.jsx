import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyzeText = async () => {
    if (!text.trim()) {
      setError("Please enter some text!");
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const getSentimentTheme = (label) => {
    switch (label.toLowerCase()) {
      case 'positive': 
        return { text: 'text-emerald-400', bar: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-950/30 border-emerald-500/30', icon: '✨' };
      case 'negative': 
        return { text: 'text-rose-400', bar: 'from-rose-400 to-rose-600', bg: 'bg-rose-950/30 border-rose-500/30', icon: '⚠️' };
      default: 
        return { text: 'text-slate-300', bar: 'from-slate-400 to-slate-600', bg: 'bg-slate-800/50 border-slate-600/50', icon: '⚖️' };
    }
  };

  return (
    
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      
      <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.5)] p-8 sm:p-10 border border-white/10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight pb-1">
            AI Sentiment Analyzer
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-medium">
            Analyze the neural patterns behind your text.
          </p>
        </div>

        {/* Dark Input Area */}
        <div className="relative group">
          <textarea
            className="w-full h-36 p-5 text-slate-200 bg-slate-800/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none resize-none transition-all duration-300 placeholder:text-slate-400 shadow-inner"
            placeholder="Type a sentence here to uncover its emotional tone..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {error && (
          <div className="mt-4 text-rose-400 text-sm font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </div>
        )}

        
        <button
          onClick={analyzeText}
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 flex justify-center items-center gap-3 ${
            loading 
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-white/5' 
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] hover:-translate-y-1 active:translate-y-0'
          }`}
        >
          {loading && (
            <svg className="animate-spin h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? 'Processing Neural Data...' : 'Analyze Sentiment'}
        </button>

        
        {result && (
          <div className={`mt-10 p-7 rounded-2xl border backdrop-blur-md transition-all duration-700 ease-out animate-fade-in ${getSentimentTheme(result.label).bg}`}>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs mb-1">Detected Tone</span>
                <span className={`text-3xl font-black capitalize flex items-center gap-3 ${getSentimentTheme(result.label).text}`}>
                   {getSentimentTheme(result.label).icon} {result.label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs mb-1 block">Confidence</span>
                <span className="text-2xl font-bold text-slate-200">{result.score.toFixed(1)}%</span>
              </div>
            </div>

            {/* Dark Mode Progress Bar */}
            <div className="w-full bg-slate-950/50 rounded-full h-3 overflow-hidden shadow-inner border border-white/5">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getSentimentTheme(result.label).bar}`} 
                style={{ width: `${result.score}%` }}
              ></div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;