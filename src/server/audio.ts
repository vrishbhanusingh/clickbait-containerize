// "use server";
// // import { toFile } from "openai"
// // import Groq from "groq-sdk";
// import OpenAI from "openai";
// import fs from "fs";
// // import { openAIClient } from "./openai";
// // import { config } from "../config";
// // import { traceable } from "langsmith/traceable";

// // const groq = new Groq();
// const openAIClient = new OpenAI({
//   apiKey: process.env.OPENAI_API_SECRET_KEY,
// });

// export const transcribeAudio = async (audioData: string) => {
//   const audio = Buffer.from(audioData, "base64");
//   const filePath = "./tmp/input.wav";
//   try {
//     let transcription;

//     fs.writeFileSync(filePath, audio);

//     const readStream = fs.createReadStream(filePath);

//     console.log("openAIClient :>> ", openAIClient.audio);
//     // if (config.whisperModelProvider === "openai") {
//     transcription = await openAIClient.audio.transcriptions.create({
//       file: readStream,
//       model: "whisper-1",
//     });
//     // } else if (config.whisperModelProvider === "groq") {
//     //   transcription = await groq.audio.transcriptions.create({
//     //     file: await toFile(audioBlob, `audio-${timestamp}.wav`),
//     //     model: config.whisperModel,
//     //   });
//     // } else {
//     //   throw new Error("Invalid whisper model");
//     // }
//     return { status: true, message: transcription.text };
//   } catch (error) {
//     console.error("Error transcribing audio:", error);
//     return {
//       status: false,
//       message: "Error transcribing audio. Please try again later.",
//     };
//   }
// };

// export const generateTTS = async (text: string) => {
//   const mp3 = await openAIClient.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: text,
//   });
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   const base64Audio = buffer.toString("base64");

//   return `data:audio/mpeg;base64,${base64Audio}`;
// };

"use server";
// import { toFile } from "openai"
// import Groq from "groq-sdk";
import OpenAI from "openai";
import fs from "fs";
// import { openAIClient } from "./openai";
// import { config } from "../config";
// import { traceable } from "langsmith/traceable";

// const groq = new Groq();
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});

export const transcribeAudio = async (audioData: string) => {
  const audio = Buffer.from(audioData, "base64");
  const filePath = "./tmp/input.wav";
  try {
    let transcription;

    fs.writeFileSync(filePath, audio);

    const readStream = fs.createReadStream(filePath);

    console.log("openAIClient :>> ", openAIClient.audio);
    // if (config.whisperModelProvider === "openai") {
    transcription = await openAIClient.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });
    // } else if (config.whisperModelProvider === "groq") {
    //   transcription = await groq.audio.transcriptions.create({
    //     file: await toFile(audioBlob, `audio-${timestamp}.wav`),
    //     model: config.whisperModel,
    //   });
    // } else {
    //   throw new Error("Invalid whisper model");
    // }
    return { status: true, message: transcription.text };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return {
      status: false,
      message: "Error transcribing audio. Please try again later.",
    };
  }
};

export const generateTTS = async (text: string) => {
  try {
    const mp3 = await openAIClient.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString("base64");

    return `data:audio/mpeg;base64,${base64Audio}`;
  } catch (error) {
    console.error("Error generating TTS:", error);
  }
};