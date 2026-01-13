import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testFlashLatest() {
    try {
        console.log('Testing model: gemini-flash-latest...');
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const result = await model.generateContent('Hi');
        console.log('✅ SUCCESS! Response:', result.response.text());
    } catch (error) {
        console.error('❌ FAILED:', error.message);
    }
}

testFlashLatest();
