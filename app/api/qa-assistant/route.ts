import { NextRequest, NextResponse } from "next/server";
import { pipeline, env } from "@huggingface/transformers";
env.cacheDir = "./.cache";

export const POST = async (request: NextRequest) => {
    try{
        const {key, text} = await request.json();
        const qa_pipeline = await pipeline('document-question-answering', 'Xenova/donut-base-finetuned-docvqa');
        const output = await qa_pipeline(key, text);
        return NextResponse.json(output);
    }catch (e) {
        console.error(e)
    }
};