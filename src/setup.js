import fs from "fs";
import readline from "readline-sync";
const envVars = [
    "OpenAI API Key (--openai)",
    "Microsoft TTS API Key (--speechkey)",
    "Microsoft Speech Region API Key (--speechregion)",
];
const env = {};

function setup() {
    // Check if the .env file is empty
    if (!fs.existsSync(".env")) {
        fs.writeFileSync(".env", "");
    }

    // Check if the .env file is empty
    const envFile = fs.readFileSync(".env", "utf8");
    if (envFile) {
        console.log(".env file is not empty, setup skipped.");
        return;
    }

    envVars.forEach((v) => {
        env[v] = readline.question(`Enter ${v}: `);
    });

    fs.writeFileSync(
        ".env",
        Object.entries(env)
            .map((e) => e.join("="))
            .join("\n")
    );
}

setup();
