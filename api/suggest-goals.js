import { GoogleGenerativeAI } from '@google/generative-ai';

// Try ESM import, fall back to CommonJS require for dotenv
let dotenv;
try {
  dotenv = await import('dotenv');
} catch (e) {
  dotenv = require('dotenv');
}
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    if (!process.env.GEMINI_KEY) {
      throw new Error('GEMINI_KEY environment variable is missing');
    }

    console.log('Initializing GoogleGenerativeAI with GEMINI_KEY:', process.env.GEMINI_KEY ? 'Found' : 'Not Found');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    console.log('Generating content with prompt:', prompt);
    const promptText = `Suggest 3 concise, actionable, and specific goals based on this prompt: "${prompt}". Output as a JSON array of strings, e.g., ["Goal 1", "Goal 2", "Goal 3"]`;
    const result = await model.generateContent(promptText);
    console.log('Gemini response:', result.response.text());

    const suggestions = JSON.parse(result.response.text().trim()) || ['Complete a small task today', 'Take a 10-minute walk', 'Plan tomorrow’s goals'];
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error in suggest-goals:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}