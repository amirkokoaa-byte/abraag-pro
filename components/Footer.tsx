import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 bg-slate-950 border-t border-indigo-900/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-indigo-300 font-medium text-lg">
          تم التطوير بواسطة المبرمج أمير لمعي
        </p>
        <p className="text-slate-600 text-sm mt-2">
          &copy; {new Date().getFullYear()} البصيرة الكونية. جميع النجوم متوافقة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;