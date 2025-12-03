import React, { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG');
  };

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-lg border-b border-indigo-500/30 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-center md:text-right gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 font-serif tracking-wider">
              البصيرة الكونية
            </h1>
            <p className="text-xs text-indigo-300 tracking-widest uppercase">علم التنجيم والأبراج</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="text-indigo-200 text-sm font-medium">{formatDate(currentTime)}</p>
          <p className="text-2xl font-light text-white font-mono" dir="ltr">{formatTime(currentTime)}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;