import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const prompt = `Generate 8 agricultural news articles relevant to Indian sugarcane farming, monsoons, subsidies, or farming technology.
Output ONLY a JSON array of objects, with no markdown formatting or extra text.
Each object must have exactly these keys:
- "id": a unique string (e.g., "ai-1", "ai-2")
- "title": a catchy news headline (under 60 characters)
- "excerpt": a short summary (under 120 characters)
- "body": a detailed article body (2-3 paragraphs)
- "date": a realistic recent date in YYYY-MM-DD format (must be on or around today's date: ${today})
- "author": a fictional author name or organization`;

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = response.data.candidates[0].content.parts[0].text;
    const articles = JSON.parse(text);
    
    res.status(200).json({ articles });
  } catch (error) {
    console.error('News generation error:', error?.response?.data || error);
    res.status(500).json({ message: 'Failed to generate news' });
  }
});

export default router;
