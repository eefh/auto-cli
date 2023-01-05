import videoshow from "videoshow";
import path from "path";
import fs from "fs";
import { readdir, stat } from "fs/promises";
import editly from "editly";

export default async function generateVideo(output) {
    const imageSize = fs.readdirSync("./images").length;
    let edit = {
        outPath: "story.mp4",
        defaults: {
            transition: { name: "fade" },
            duration: 12,
        },
        audioFilePath: "./audio.mp3",
        height: 480,
        width: 640,
    };
    let clips = [];
    for (let i = 0; i < imageSize; i++) {
        clips.push({
            layers: [
                {
                    type: "image",
                    path: `./images/image${i}.png`,
                },
            ],
        });
    }
    edit.clips = clips;
    await editly(edit);
}

const wipe = async () => {
    await fs.readdir("./images", (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join("./images", file), (err) => {
                if (err) throw err;
            });
        }
    });
};
