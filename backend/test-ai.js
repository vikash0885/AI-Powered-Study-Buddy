import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function checkModels() {
    try {
        // The SDK doesn't have a direct "listModels" on the genAI instance in recent versions 
        // but we can try to use the REST API via fetch if needed.
        // However, let's try 'gemini-1.5-pro' as a fallback.
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
        for (const modelName of models) {
            try {
                console.log(`Testing model: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('hi');
                console.log(`✅ ${modelName} works! Response: ${result.response.text()}`);
                return;
            } catch (e) {
                console.log(`❌ ${modelName} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error('Terminal error:', error);
    }
}

checkModels();
