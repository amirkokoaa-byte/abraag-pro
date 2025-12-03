import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DiscoverSign from './components/DiscoverSign';
import AgeCalculator from './components/AgeCalculator';
import ZodiacInfo from './components/ZodiacInfo';
import Compatibility from './components/Compatibility';
import DailyHoroscope from './components/DailyHoroscope';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden stars">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Tools */}
          <div className="lg:col-span-1 space-y-8">
            <DiscoverSign />
            <AgeCalculator />
            
            <div className="p-6 bg-gradient-to-bl from-indigo-900/50 to-purple-900/50 rounded-2xl border border-white/10 text-center">
               <h3 className="text-xl font-serif text-amber-200 mb-2">اقتباس صوفي</h3>
               <p className="italic text-indigo-200 text-sm">
                 "النجوم تضيء الطريق فقط؛ لكنها لا تملي الرحلة."
               </p>
            </div>
          </div>

          {/* Right Column: Deep Content */}
          <div className="lg:col-span-2 space-y-12">
            <DailyHoroscope />
            <ZodiacInfo />
            <Compatibility />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;