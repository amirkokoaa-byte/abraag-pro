import { ZodiacSign } from "./types";

export const calculateZodiacSign = (dateString: string): ZodiacSign | null => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // 1-12

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZodiacSign.Aries;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZodiacSign.Taurus;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZodiacSign.Gemini;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZodiacSign.Cancer;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZodiacSign.Leo;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZodiacSign.Virgo;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZodiacSign.Libra;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZodiacSign.Scorpio;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZodiacSign.Sagittarius;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZodiacSign.Capricorn;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZodiacSign.Aquarius;
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZodiacSign.Pisces;

  return null;
};

export const calculateAge = (dateString: string) => {
  if (!dateString) return null;

  const birthDate = new Date(dateString);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

export const zodiacInArabic: Record<string, string> = {
  [ZodiacSign.Aries]: "الحمل",
  [ZodiacSign.Taurus]: "الثور",
  [ZodiacSign.Gemini]: "الجوزاء",
  [ZodiacSign.Cancer]: "السرطان",
  [ZodiacSign.Leo]: "الأسد",
  [ZodiacSign.Virgo]: "العذراء",
  [ZodiacSign.Libra]: "الميزان",
  [ZodiacSign.Scorpio]: "العقرب",
  [ZodiacSign.Sagittarius]: "القوس",
  [ZodiacSign.Capricorn]: "الجدي",
  [ZodiacSign.Aquarius]: "الدلو",
  [ZodiacSign.Pisces]: "الحوت"
};