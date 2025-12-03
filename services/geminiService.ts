import { GoogleGenAI } from "@google/genai";
import { ZodiacSign } from "../types";
import { zodiacInArabic } from "../utils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const getZodiacDetails = async (sign: ZodiacSign): Promise<string> => {
  try {
    const arabicSign = zodiacInArabic[sign];
    const prompt = `
      قدم ملفًا تعريفيًا فلكيًا شاملاً ومفصلاً لبرج ${arabicSign} (Zodiac sign: ${sign}).
      قم بتضمين 3 أقسام مميزة:
      1. سمات الشخصية العميقة (اكتب فقرة من 5 أسطر على الأقل)
      2. المميزات (نقاط القوة)
      3. العيوب (نقاط الضعف)
      
      لا تكن مختصرًا. يجب أن تكون النغمة صوفية ولكن ثاقبة.
      قم بتنسيق الرد باستخدام عناوين Markdown.
      اجعل الرد باللغة العربية بالكامل.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "تعذر جلب تفاصيل البرج في الوقت الحالي.";
  } catch (error) {
    console.error("Error fetching zodiac details:", error);
    return "النجوم محجوبة حالياً. يرجى المحاولة مرة أخرى في وقت لاحق.";
  }
};

export const getCompatibilityReport = async (sign1: ZodiacSign, sign2: ZodiacSign): Promise<string> => {
  try {
    const arabicSign1 = zodiacInArabic[sign1];
    const arabicSign2 = zodiacInArabic[sign2];
    
    const prompt = `
      أنشئ تقرير توافق علاقة مفصل بين برج ${arabicSign1} وبرج ${arabicSign2}.
      حلل الاتصال بناءً على العناصر والأنماط والحكام الكوكبيين.
      
      يرجى تقديم إجابة مطولة (200 كلمة على الأقل) تغطي:
      - الاتصال العاطفي
      - أسلوب التواصل
      - التحديات المحتملة
      - شدة التوافق الكلي
      
      لا تستخدم نقاطًا نقطية للتحليل الرئيسي. اكتب بأسلوب سردي.
      اجعل الرد باللغة العربية بالكامل.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "تعذر حساب التوافق.";
  } catch (error) {
    console.error("Error fetching compatibility:", error);
    return "لا يمكن تحديد المحاذاة الكونية الآن.";
  }
};

export const getDailyHoroscope = async (sign: ZodiacSign): Promise<string> => {
  try {
    const arabicSign = zodiacInArabic[sign];
    const today = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const prompt = `
      اكتب توقعات ابراج يومية محددة لبرج ${arabicSign} لهذا اليوم، ${today}.
      ركز على الفرص والحظ واليقظة.
      قدم "نصيحة كونية لليوم" في النهاية.
      اجعلها مشجعة ولكن واقعية.
      اجعل الرد باللغة العربية بالكامل.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "تعذر قراءة النجوم اليوم.";
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return "غبار النجوم يتداخل مع الإرسال. حاول مرة أخرى لاحقًا.";
  }
};