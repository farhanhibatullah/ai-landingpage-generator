
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, LandingPageData } from "../types";

const API_KEY = process.env.API_KEY || "";

/**
 * Translates specific fields of UserInput to English using Gemini.
 * Kept as a helper tool for users who want to "English-ify" their prompts.
 */
export const translateInputToEnglish = async (input: Partial<UserInput>): Promise<Partial<UserInput>> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Translate the following landing page project details into professional, concise English. 
    Maintain the core meaning and proper nouns (like brand names).
    
    Details to translate:
    ${input.businessIdea ? `Business Idea: ${input.businessIdea}` : ''}
    ${input.targetAudience ? `Target Audience: ${input.targetAudience}` : ''}
    ${input.primaryGoal ? `Primary Goal: ${input.primaryGoal}` : ''}
    ${input.extraNotes ? `Additional Requirements: ${input.extraNotes}` : ''}

    Return the result as a JSON object with these keys: businessIdea, targetAudience, primaryGoal, extraNotes.
    ONLY return the JSON. No markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const translated = JSON.parse(response.text);
    return {
      businessIdea: translated.businessIdea || input.businessIdea,
      targetAudience: translated.targetAudience || input.targetAudience,
      primaryGoal: translated.primaryGoal || input.primaryGoal,
      extraNotes: translated.extraNotes || input.extraNotes,
    };
  } catch (error) {
    console.error("Translation Error:", error);
    return input; // Fallback to original
  }
};

/**
 * Gets AI-powered section recommendations. 
 * Detects the language of the input and responds in that same language.
 */
export const getSectionRecommendations = async (businessIdea: string, primaryGoal: string): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Analyze this business idea: "${businessIdea}" with the goal of "${primaryGoal}".
    
    TASK:
    1. Detect the language used in the business idea above.
    2. Suggest 6 specific, high-conversion sections for a landing page.
    3. IMPORTANT: Respond in the EXACT SAME LANGUAGE as the input business idea (e.g., if it's Indonesian, suggest in Indonesian).
    
    Format: Return ONLY a JSON array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Recommendation Error:", error);
    return [
      "Hero Section",
      "Features",
      "Testimonials",
      "How It Works",
      "Pricing",
      "CTA"
    ];
  }
};

/**
 * AI Landing Page Generation Service
 * Now supports strictly defined target languages for all generated copy.
 */
export const generateLandingPage = async (input: UserInput): Promise<LandingPageData> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const targetLang = input.targetLanguage || 'English';

  const systemInstruction = `
ROLE: AI Landing Page Architect (Strict Multilingual Generation).

CRITICAL DIRECTIVES:
1. OUTPUT LANGUAGE: You MUST write all the text content (Headlines, Paragraphs, Buttons, Captions) in the ${targetLang} language.
2. Even if the user input is in another language, the FINAL landing page output must be in ${targetLang}.
3. Implement EVERY SINGLE SECTION mentioned in the "Additional Requirements".
4. Use contextual Unsplash image URLs: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=1200.

━━━━━━━━━━━━━━━━━━━━━━
OUTPUT STRUCTURE CONTRACT
━━━━━━━━━━━━━━━━━━━━━━
You must include ALL four sections in this order:
=== PREVIEW === [HTML with Tailwind]
=== STRATEGY === [Marketing logic in ${targetLang}]
=== IMAGE_LOG === [Keywords used]
=== CODE === [Full HTML source]

━━━━━━━━━━━━━━━━━━━━━━
DESIGN CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━
- Primary Accent: ${input.colorPreference || "#4F46E5"}.
- Use this color for backgrounds, gradients, and UI elements to create a branded look.
- Use 'data-aos' for animations.
  `;

  const prompt = `
    Generate a complete landing page in ${targetLang} following this BLUEPRINT:
    
    - Business: ${input.businessIdea}
    - Audience: ${input.targetAudience}
    - Goal: ${input.primaryGoal}
    - Required Sections: ${input.extraNotes || "Standard layout"}
    - Theme: ${input.toneStyle}
    - Accent Color: ${input.colorPreference}
    
    Ensure all copy is fluent, natural, and persuasive in ${targetLang}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("The AI Engine returned an empty response.");

    const extract = (blockName: string, nextBlockName?: string): string => {
      const escapedBlock = blockName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedNext = nextBlockName ? nextBlockName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '$';
      const regex = new RegExp(`${escapedBlock}\\s*([\\s\\S]*?)(?=${escapedNext}|$)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    let previewHtml = extract("=== PREVIEW ===", "=== STRATEGY ===");
    let strategy = extract("=== STRATEGY ===", "=== IMAGE_LOG ===");
    let code = extract("=== CODE ===");

    if (!previewHtml) {
      previewHtml = `<main class="h-screen flex items-center justify-center bg-slate-900 text-white"><h1>Structural Synthesis Failure. Please try again.</h1></main>`;
    }

    return {
      previewHtml,
      strategy: strategy || "Strategy generation in progress...",
      code: code || "/* Code generation in progress... */"
    };

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "Engine failure during architectural synthesis.");
  }
};
