import { pipeline } from "@huggingface/transformers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { text, code } = await request.json();
  console.log("the text", text);
  const translator = await pipeline(
    "translation",
    "Xenova/mbart-large-50-many-to-many-mmt",
  );
  const out = await translator(text, {
    use_cache: true,
    src_lang: "en_XX",
    tgt_lang: code,
  });
  return NextResponse.json(out);
};
