import { Command } from "commander";
import getStory from "./gpt.js";
import generateImages from "./image.js";
import generateSpeech from "./text-to-speech.js";
const program = new Command();
program
    .option("-p, --prompt <prompt>", "Story prompt")
    .option("-o, --output, <output>", "Output file");

program.parse(process.argv);

const options = program.opts();
const main = async () => {
    console.log("Generating story...");
    const story = await getStory(options.prompt);
    await console.log(story.text);
    /*console.log("Generating images...");
    const images = await generateImages(story.imagePrompts);
    await images.forEach((url) => {
        console.log(url);
    });*/
    console.log("Generating speech...");
    generateSpeech(story.text);
};
main();
