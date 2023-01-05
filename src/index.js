#! /usr/bin/env node

import { Command } from "commander";
import getStory from "./gpt.js";
import generateImages from "./image.js";
import polly from "./polly.js";
import generateSpeech from "./text-to-speech.js";
import generateVideo from "./video.js";
const program = new Command();
program
    .option("-p, --prompt <prompt>", "Story prompt")
    .option("-o, --output, <output>", "Output file");

program.parse(process.argv);

const options = program.opts();
const main = async () => {
    console.log("Generating story...");
    const story = await getStory(options.prompt);
    console.log("Generating images...");
    await generateImages(story.imagePrompts);
    console.log("Generating speech...");
    await polly(story.text, options.output);
};
main();
