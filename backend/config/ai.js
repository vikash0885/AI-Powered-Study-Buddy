import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Grok API URL
const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

// System prompt for Study Buddy
const SYSTEM_PROMPT = `You are an AI-Powered Study Buddy designed to help students and learners.

Your goals:
• Explain concepts clearly and simply
• Help with school, college, and competitive exam studies
• Assist in programming and technical subjects
• Create study plans and revision notes
• Motivate and guide learners

Behavior Rules:
1. Always explain in simple, easy-to-understand language.
2. Adjust explanation level based on the user's question (school / college / beginner).
3. Use step-by-step explanations and examples.
4. If the user asks for code:
   - Provide clean, correct code
   - Explain logic simply
   - Mention time & space complexity (when relevant)
5. Keep responses clear, concise, and user-friendly.
6. Avoid unnecessary technical jargon unless requested.

Format responses with:
• Clear headings and bullet points
• Short paragraphs
• Code blocks with language specification when showing code
• Examples to illustrate concepts`;

/**
 * Generate AI response using Grok API
 */
export async function generateAIResponse(userMessage, conversationHistory = [], subject = null) {
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    if (subject) {
      messages.unshift({ role: "system", content: `Current subject: ${subject}` });
    }

    const response = await fetch(GROK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-2",
        messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Grok AI error:", error);
    throw new Error("Failed to generate AI response");
  }
}

/**
 * Generate Study Plan using Grok API
 */
export async function generateStudyPlan(subject, duration, hoursPerDay) {
  const prompt = `
Create a ${duration}-day study plan for ${subject}.
Study time per day: ${hoursPerDay} hours.
Return in clear bullet points.
`;

  return await generateAIResponse(prompt, [], subject);
}

export default null; // No longer using Gemini, export null or remove
