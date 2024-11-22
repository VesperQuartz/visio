import { pipeline } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { text, code } = await request.json();
  console.log("the text", text);
  const translator = await pipeline(
    "translation",
    "Xenova/m2m100_418M",
  );
  const out = await translator(text, {
    src_lang: "en",
    tgt_lang: code,
  });
  return NextResponse.json(out);
};
