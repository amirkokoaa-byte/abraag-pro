import React, { useState } from 'react';
import { calculateAge } from '../utils';
import { Clock } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [date, setDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = () => {
    if (date) {
      const result = calculateAge(date);
      setAge(result);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
       <div className="flex items-center gap-2 mb-4">
        <Clock className="text-amber-400 w-6 h-6" />
        <h2 className="text-xl font-bold text-indigo-100 font-serif">حاسبة العمر</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">تاريخ الميلاد</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
                setAge(null);
            }}
            className="w-full bg-slate-800 border border-indigo-500/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-slate-700 hover:bg-slate-600 border border-indigo-500/30 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          احسب العمر
        </button>

        {age && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center bg-slate-800/50 rounded-lg p-3">
            <div>
              <p className="text-2xl font-bold text-white">{age.years}</p>
              <p className="text-xs text-indigo-300">سنة</p>
            </div>
            <div className="border-x border-indigo-500/20">
              <p className="text-2xl font-bold text-white">{age.months}</p>
              <p className="text-xs text-indigo-300">شهر</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{age.days}</p>
              <p className="text-xs text-indigo-300">يوم</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;