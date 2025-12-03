import React, { useState } from 'react';
import { ZodiacSign } from '../types';
import { getCompatibilityReport } from '../services/geminiService';
import { Heart, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { zodiacInArabic } from '../utils';

const Compatibility: React.FC = () => {
  const [sign1, setSign1] = useState<ZodiacSign | ''>('');
  const [sign2, setSign2] = useState<ZodiacSign | ''>('');
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!sign1 || !sign2) return;
    
    setLoading(true);
    setReport('');
    const result = await getCompatibilityReport(sign1 as ZodiacSign, sign2 as ZodiacSign);
    setReport(result);
    setLoading(false);
  };

  return (
    <section className="bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none transform -scale-x-100">
        <Heart className="w-32 h-32 text-purple-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 font-serif border-b border-purple-500/30 pb-2 flex items-center gap-2">
        <Heart className="text-purple-400 w-6 h-6 fill-current" />
        توافق الحب
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
            <label className="text-xs text-purple-300 uppercase tracking-wider mb-1 block">الشريك الأول</label>
            <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value as ZodiacSign)}
            className="w-full bg-slate-800 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            >
            <option value="">اختر البرج</option>
            {Object.values(ZodiacSign).map((sign) => (
                <option key={sign} value={sign}>{zodiacInArabic[sign]}</option>
            ))}
            </select>
        </div>
        <div>
            <label className="text-xs text-purple-300 uppercase tracking-wider mb-1 block">الشريك الثاني</label>
            <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value as ZodiacSign)}
            className="w-full bg-slate-800 border border-purple-500/30 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            >
            <option value="">اختر البرج</option>
            {Object.values(ZodiacSign).map((sign) => (
                <option key={sign} value={sign}>{zodiacInArabic[sign]}</option>
            ))}
            </select>
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={!sign1 || !sign2 || loading}
        className="w-full bg-gradient-to-l from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center mb-6"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'تحليل الارتباط'}
      </button>

      {report && (
        <div className="bg-black/30 rounded-xl p-6 text-purple-100 prose prose-invert prose-purple max-w-none leading-relaxed border-r-4 border-purple-500">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default Compatibility;