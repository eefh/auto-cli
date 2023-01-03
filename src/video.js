import videoshow from "videoshow";
import path from "path";
import fs from "fs";
import { readdir, stat } from "fs/promises";

export default async function generateVideo(output) {
    let audio = "./audio.wav";
    let audioParams = {
        fade: true,
        loop: 14,
        delay: 1,
    };
    let videoOption = {
        loop: 12,
    };
    const imageSize = fs.readdirSync("./images").length;

    let images = [];
    for (let i = 0; i < imageSize; i++) {
        images.push(`./images/image${i}.png`);
    }

    await videoshow(images, videoOption)
        .audio(audio, audioParams)
        .save(output)
        .on("start", (command) => {
            console.log(`ffmpeg process started: ${command}`);
        })
        .on("error", (err) => {
            console.log(`An error has occured: ${err}`);
        })
        .on("end", (output) => {
            console.log(`Video created in: ${output}`);
            fs.readdir("./images", (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join("./images", file), (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
}
