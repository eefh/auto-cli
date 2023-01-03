import fs from "fs";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });
export default async function generateVideo(images, text, output) {
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "audio.wav", await fetchFile("./audio.wav"));
    for (let i = 0; i < 60; i++) {
        const num = `00${i}`.slice(-3);
    }
}
