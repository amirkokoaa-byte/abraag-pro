import React, { useState } from 'react';
import { calculateZodiacSign, zodiacInArabic } from '../utils';
import { ZodiacSign } from '../types';
import { Sparkles } from 'lucide-react';

const DiscoverSign: React.FC = () => {
  const [date, setDate] = useState('');
  const [sign, setSign] = useState<ZodiacSign | null>(null);

  const handleCalculate = () => {
    if (date) {
      const result = calculateZodiacSign(date);
      setSign(result);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-amber-400 w-6 h-6" />
        <h2 className="text-xl font-bold text-indigo-100 font-serif">اكتشف برجك</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">تاريخ الميلاد</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
                setSign(null); // Reset on change
            }}
            className="w-full bg-slate-800 border border-indigo-500/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
          />
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all active:scale-95"
        >
          اعرف برجي
        </button>

        {sign && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-indigo-200 text-sm">برجك هو</p>
            <p className="text-4xl font-bold text-amber-400 font-serif mt-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
              {zodiacInArabic[sign]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverSign;