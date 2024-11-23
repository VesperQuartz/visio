import { pipeline, env } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";
env.allowRemoteModels = true;
env.cacheDir = "./.cache";

export const POST = async (request: NextRequest) => {
  const { text, code } = await request.json();
  const translator = await pipeline("translation", "Xenova/m2m100_418M");
  const out = await translator(text, {
    src_lang: "en",
    tgt_lang: code,
  } as never);
  return NextResponse.json(out);
};
