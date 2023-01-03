import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function getStory(prompt) {
    console.log(prompt);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generate(prompt),
        temperature: 0.6,
        max_tokens: 1024,
    });

    const story = await {
        text: response.data.choices[0].text,
    };
    const filteredResult = extractBracketedStrings(story.text);
    const imagePrompts = filteredResult.imagePrompts;
    const storyText = filteredResult.text;
    console.log(story.text);
    return { text: storyText, imagePrompts: imagePrompts };
}

const generate = (prompt) => {
    return `"${prompt}" Generate an imaginative story video transcript based on this prompt. Also create a handful of verbose/descriptive relevant photorealistic/photo descriptions that might go well with the story in square brackets. The more descriptive, the better.`;
};

function extractBracketedStrings(input) {
    let output = [];
    let startIndex = -1;
    let endIndex = -1;
    let isOpenBracket = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "[") {
            startIndex = i;
            isOpenBracket = true;
        } else if (input[i] === "]") {
            endIndex = i;
            isOpenBracket = false;
            output.push(input.substring(startIndex + 1, endIndex));
            input =
                input.substring(0, startIndex) + input.substring(endIndex + 1);
            i -= endIndex - startIndex + 1;
            startIndex = -1;
            endIndex = -1;
        }
    }
    return { imagePrompts: output, text: input };
}
