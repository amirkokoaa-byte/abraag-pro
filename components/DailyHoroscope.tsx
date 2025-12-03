import React, { useState } from 'react';
import { ZodiacSign } from '../types';
import { getDailyHoroscope } from '../services/geminiService';
import { Star, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { zodiacInArabic } from '../utils';

const DailyHoroscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [horoscope, setHoroscope] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFetchDaily = async () => {
    if (!selectedSign) return;
    
    setLoading(true);
    setHoroscope('');
    const result = await getDailyHoroscope(selectedSign as ZodiacSign);
    setHoroscope(result);
    setLoading(false);
  };

  return (
    <section className="bg-slate-900/60 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none transform -scale-x-100">
        <Star className="w-32 h-32 text-amber-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 font-serif border-b border-amber-500/30 pb-2 flex items-center gap-2">
        <Star className="text-amber-400 w-6 h-6 fill-current" />
        حظك اليوم
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedSign}
          onChange={(e) => setSelectedSign(e.target.value as ZodiacSign)}
          className="flex-1 bg-slate-800 border border-amber-500/30 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="">-- اختر برجك --</option>
          {Object.values(ZodiacSign).map((sign) => (
            <option key={sign} value={sign}>{zodiacInArabic[sign]}</option>
          ))}
        </select>
        
        <button
          onClick={handleFetchDaily}
          disabled={!selectedSign || loading}
          className="bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center min-w-[150px]"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'طالع الحظ'}
        </button>
      </div>

      {horoscope && (
        <div className="bg-amber-950/30 rounded-xl p-6 text-amber-100 prose prose-invert prose-amber max-w-none leading-relaxed">
          <ReactMarkdown>{horoscope}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default DailyHoroscope;