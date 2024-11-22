import { pipeline } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { text, modal } = await request.json();
  const synthesizer = await pipeline("text-to-speech", modal);
  const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/v3.0.0/speaker_embeddings.bin';
  const out = await synthesizer(text, {speaker_embeddings});
  return NextResponse.json(out);
};
