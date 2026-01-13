import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testFinalModel() {
    try {
        console.log('Testing model: gemini-2.0-flash...');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent('Explain in 1 sentence how Python loops work.');
        console.log('✅ SUCCESS! Response:', result.response.text());
    } catch (error) {
        console.error('❌ FAILED:', error.message);
    }
}

testFinalModel();
