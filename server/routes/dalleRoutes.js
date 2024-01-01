import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';


dotenv.config();
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_API_KEY,
    organization: 'org-fXiBS9BPfRfHCE5aNRufr4oO'
});

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!');
});

router.route('/').post(async (req, res) =>{
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.create({
            prompt:'Rainy day',
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.image[0].b64_json;
        console.log(image);

        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;