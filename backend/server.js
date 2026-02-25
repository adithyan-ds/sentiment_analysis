import express from 'express';
import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const hf = new HfInference(process.env.HF_TOKEN);

app.post('/api/analyze', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Please provide text in valid JSON format." });
        }

       
        const result = await hf.textClassification({
            model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
            inputs: text
        });

        let highest = 0;
        let index = 0;

        result.forEach((x, i) => {
            if (x.score > highest) {
                highest = x.score; 
                index = i;
            }
        });

        res.json({
            score: highest * 100,
            label: result[index].label
        });

    } catch (error) {
    
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});