import { program } from "commander";
import getStory from "./gpt.js";
program
    .option("-p, --prompt <prompt>", "Story prompt")
    .option("-o, --output, <output>", "Output file")
    .parse(process.argv);

const main = async () => {
    console.log("Generating story...");
    const story = await getStory(program.prompt);
    console.log(story);
};

main();
