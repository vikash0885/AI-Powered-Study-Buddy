import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing in .env file');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

export async function generateAIResponse(userMessage, conversationHistory = [], subject = null) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Build context from conversation history
        let context = SYSTEM_PROMPT;

        if (subject) {
            context += `\n\nCurrent subject context: ${subject}`;
        }

        // Add conversation history
        if (conversationHistory.length > 0) {
            context += '\n\nPrevious conversation:\n';
            conversationHistory.slice(-5).forEach(msg => {
                context += `${msg.role === 'user' ? 'Student' : 'Study Buddy'}: ${msg.content}\n`;
            });
        }

        context += `\n\nStudent: ${userMessage}\nStudy Buddy:`;

        const result = await model.generateContent(context);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw new Error('Failed to generate AI response. Please check your API key.');
    }
}

export async function generateStudyPlan(subject, duration, hoursPerDay) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Create a detailed study plan for the following:

Subject: ${subject}
Duration: ${duration}
Daily Study Time: ${hoursPerDay} hours

Please create a realistic, day-by-day study plan that includes:
1. Clear learning objectives for each day
2. Topics to cover
3. Recommended activities (reading, practice, projects)
4. Break times and revision sessions
5. Progressive difficulty

Format the plan clearly with headings, bullet points, and daily breakdowns.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Study Plan Generation Error:', error);
        throw new Error('Failed to generate study plan');
    }
}

export default genAI;
