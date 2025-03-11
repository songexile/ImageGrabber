import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from "cors"

dotenv.config(); // Load environment variables

const API_KEY = process.env.SERP_API as string; // Ensure TypeScript sees this as a string
console.log('API_KEY:', process.env.SERP_API);
console.log("HI")

const app = express();

app.use(cors());

app.get('/api/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query parameter is required and must be a string' });
      return;
    }

    const url = new URL('https://serpapi.com/search?');
    const params = new URLSearchParams({
      engine: 'google_images',
      q: query,
      api_key: API_KEY
    });

    url.search = params.toString(); 
  console.log(url.search)

    const response = await fetch(url.toString());
    const data = await response.json();

    res.json(data); // ✅ Send response
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
