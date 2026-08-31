import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const today = new Date().toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();
    const topicText = q ? `focusing specifically on the topic of "${q}" in agriculture/farming` : `relevant to Indian sugarcane farming, monsoons, subsidies, or farming technology`;
    
    const prompt = `Generate 4 agricultural news articles ${topicText}.
Output ONLY a JSON array of objects, with no markdown formatting or extra text.
Each object must have exactly these keys:
- "id": a unique string (e.g., "ai-1", "ai-2")
- "title": a catchy news headline (under 60 characters)
- "excerpt": a short summary (under 120 characters)
- "body": a short, concise article body (exactly 1 paragraph)
- "date": a realistic date strictly around ${today}. The year MUST be ${currentYear}.
- "author": a fictional author name or organization`;

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

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
