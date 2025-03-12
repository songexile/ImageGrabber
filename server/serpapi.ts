import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from "cors";
import fs from 'fs';
import path from 'path';

dotenv.config(); // Load environment variables

const API_KEY = process.env.SERP_API as string; // Ensure TypeScript sees this as a string


const app = express();

app.use(cors());

// Toggle this to switch between real API and test data
const USE_TEST_DATA = process.env.USE_TEST_DATA === 'true';

app.get('/api/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query parameter is required and must be a string' });
      return;
    }

    if (USE_TEST_DATA) {
      // Get the current directory using import.meta.url
      const __dirname = path.dirname(new URL(import.meta.url).pathname);
      
      // Read test data from the file (assuming it's in JSON format)
      const testDataPath = path.join(__dirname, 'data', 'testdata.txt'); // Adjust path if necessary
      const testData = fs.readFileSync(testDataPath, 'utf-8');
      const jsonTestData = JSON.parse(testData);

      // Return the test data as the response
      const imageUrls = jsonTestData.images_results.map((result: any) => result.thumbnail); //result.original is the original image
      res.json(imageUrls); //testing just returning image preview
      console.log("Serving test data instead of real API.");
    } else {
      // Call the real API
      const url = new URL('https://serpapi.com/search?');
      const params = new URLSearchParams({
        engine: 'google_images',
        q: query,
        api_key: API_KEY
      });

      url.search = params.toString(); 
      console.log(url.search);

      const response = await fetch(url.toString());
      const data = await response.json();

      res.json(data); // Send the response from the real API
    }

  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
