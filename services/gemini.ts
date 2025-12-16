
import { GoogleGenAI } from "@google/genai";
import { UserInput, LandingPageData } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateLandingPage = async (input: UserInput): Promise<LandingPageData> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
ROLE: AI Landing Page Architect.

You are generating content for a system with a strict regex-based text parser. 
The headers MUST be exactly as shown below, on their own lines, with no markdown (like # or *) preceding them.

━━━━━━━━━━━━━━━━━━━━━━
OUTPUT STRUCTURE CONTRACT (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━

You must include ALL three sections in this exact order:

=== PREVIEW ===
[Provide RAW HTML here. Start with <main> and end with </main>. Use Tailwind classes. No markdown blocks.]

=== STRATEGY ===
[Provide marketing strategy, value prop, and audience details in plain text.]

=== CODE ===
[Provide the full production source code (index.html, script.js, etc.) using standard markdown code blocks.]

━━━━━━━━━━━━━━━━━━━━━━
DESIGN CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━
- Style: Modern SaaS (inspired by Linear, Vercel, Framer).
- Dark/Light mode: Support both using Tailwind's 'dark' class or CSS variables.
- Accent color: ${input.colorPreference || '#4F46E5'}.
- Typography: Headings: Plus Jakarta Sans; Body: Inter.
- Animation: Subtle entrance animations (CSS or simple JS).

IMPORTANT: 
Do not write anything outside of these three blocks. 
Never leave a section empty. 
If the model is struggling, provide a simplified high-quality fallback rather than an error.
  `;

  const prompt = `
    Generate a landing page architecture for:
    Business Idea: ${input.businessIdea}
    Target Audience: ${input.targetAudience}
    Primary Goal: ${input.primaryGoal}
    Tone & Style: ${input.toneStyle}
    Accent Color: ${input.colorPreference || "Indigo"}
    Notes: ${input.extraNotes || "None"}
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

    // Improved regex-based extraction for robustness against markdown headers or whitespace variations
    const extract = (blockName: string, nextBlockName?: string): string => {
      const escapedBlock = blockName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedNext = nextBlockName ? nextBlockName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '$';
      const regex = new RegExp(`${escapedBlock}\\s*([\\s\\S]*?)(?=${escapedNext}|$)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    let previewHtml = extract("=== PREVIEW ===", "=== STRATEGY ===");
    let strategy = extract("=== STRATEGY ===", "=== CODE ===");
    let code = extract("=== CODE ===");

    // Fallback parsing if explicit headers are slightly different (e.g. model added markdown)
    if (!previewHtml) previewHtml = extract("PREVIEW", "STRATEGY");
    if (!strategy) strategy = extract("STRATEGY", "CODE");
    if (!code) code = extract("CODE");

    // Final Validation and Fallback to prevent blank screens
    if (!previewHtml) {
      previewHtml = `
<main class="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
  <div class="max-w-md text-center space-y-6">
    <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
      <i class="fas fa-triangle-exclamation text-amber-600"></i>
    </div>
    <h1 class="text-3xl font-heading font-extrabold text-slate-900 dark:text-white">Preview Partial</h1>
    <p class="text-slate-600 dark:text-slate-400">The architecture was synthesized, but the visual preview required manual repair. Please check the "Code" tab for full source.</p>
    <a href="#" class="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold">Try Refreshing</a>
  </div>
</main>`;
    }

    if (!code) {
      code = "/* Source code extraction failed. Please check the full response below: */\n\n" + text;
    }

    return {
      previewHtml,
      strategy: strategy || "Detailed strategy breakdown was not formatted correctly by the engine.",
      code: code
    };

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "Engine failure during architectural synthesis.");
  }
};
