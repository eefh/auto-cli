import { Configuration, OpenAIApi } from "openai";
import { promises as fs } from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateImages(imagePrompts) {
    for (let i = 0; i < imagePrompts.length; i++) {
        await downloadImage(
            await generateImage(imagePrompts[i]),
            `./images/image${i}.png`
        );
    }
}
const downloadImage = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(path, buffer);
};

const generateImage = async (prompt) => {
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
    });
    return response.data.data[0].url;
};
