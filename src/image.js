import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateImages(imagePrompts) {
    let images = [];
    for (let i = 0; i < imagePrompts.length; i++) {
        images.push(await generateImage(imagePrompts[i]));
    }

    return images;
}

const generateImage = async (prompt) => {
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
    });
    return response.data.data[0].url;
};
