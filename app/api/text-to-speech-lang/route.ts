import { pipeline } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { text, model } = await request.json();
  const synthesizer = await pipeline("text-to-speech", model);
  const out = await synthesizer(text, {});
  return NextResponse.json(out);
};
