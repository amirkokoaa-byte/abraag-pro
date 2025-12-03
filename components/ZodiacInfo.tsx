import React, { useState } from 'react';
import { ZodiacSign } from '../types';
import { getZodiacDetails } from '../services/geminiService';
import { BookOpen, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { zodiacInArabic } from '../utils';

const ZodiacInfo: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFetchInfo = async () => {
    if (!selectedSign) return;
    
    setLoading(true);
    setDetails('');
    const result = await getZodiacDetails(selectedSign as ZodiacSign);
    setDetails(result);
    setLoading(false);
  };

  return (
    <section className="bg-slate-900/60 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none transform -scale-x-100">
        <BookOpen className="w-32 h-32 text-indigo-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 font-serif border-b border-indigo-500/30 pb-2">
        معلومات مفصلة عن الأبراج
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedSign}
          onChange={(e) => setSelectedSign(e.target.value as ZodiacSign)}
          className="flex-1 bg-slate-800 border border-indigo-500/30 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">-- اختر البرج --</option>
          {Object.values(ZodiacSign).map((sign) => (
            <option key={sign} value={sign}>{zodiacInArabic[sign]}</option>
          ))}
        </select>
        
        <button
          onClick={handleFetchInfo}
          disabled={!selectedSign || loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center min-w-[150px]"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'كشف الحقائق'}
        </button>
      </div>

      {details && (
        <div className="bg-black/30 rounded-xl p-6 text-indigo-100 prose prose-invert prose-indigo max-w-none leading-relaxed">
           <ReactMarkdown>{details}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default ZodiacInfo;