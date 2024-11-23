import { pipeline, env } from "@huggingface/transformers";

import { NextRequest, NextResponse } from "next/server";
env.cacheDir = "./.cache";

export const POST = async (request: NextRequest) => {
  const { text } = await request.json();
  console.log("the text", text);
  const synthesizer = await pipeline("text-to-speech", "Xenova/speecht5_tts");
  const speaker_embeddings =
    "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin";
  const out = await synthesizer(text, {
    speaker_embeddings,
  });
  return NextResponse.json(out);
};
