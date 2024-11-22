import { pipeline } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { url } = await request.json();
  const captioner = await pipeline(
    "image-to-text",
    "Xenova/vit-gpt2-image-captioning",
  );
  const output = await captioner(url);
  return NextResponse.json(output);
};
