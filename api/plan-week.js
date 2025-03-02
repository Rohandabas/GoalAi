import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { summary } = req.body;
  if (!summary) {
    return res.status(400).json({ error: 'Weekly goal summary is required' });
  }

  try {
    if (!process.env.GEMINI_KEY) {
      throw new Error('GEMINI_Key environment variable is missing');
    }

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

    const promptText = `Create a weekly schedule based on this summary: "${summary}". Output as a JSON object with days (Monday to Saturday) as keys and arrays of goal objects (e.g., { text: "Goal", category: "Category" }), e.g., { "Monday": [{ text: "Exercise", category: "Health" }] }`;
    const result = await model.generateContent(promptText);
    const weeklyPlan = JSON.parse(result.response.text().trim()) || {
      Monday: [{ text: 'Exercise 20 min', category: 'Health' }],
      Tuesday: [{ text: 'Work 1 hour', category: 'Work' }],
      Wednesday: [{ text: 'Study notes', category: 'Learning' }],
      Thursday: [{ text: 'Complete project', category: 'Work' }],
      Friday: [{ text: 'Finish reading book', category: 'Learning' }],
      Saturday: [{ text: 'Outdoor activity', category: 'Health' }],
    };

    res.status(200).json({ weeklyPlan });
  } catch (error) {
    console.error('Error generating weekly plan:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}