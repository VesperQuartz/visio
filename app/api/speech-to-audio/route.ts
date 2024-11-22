import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { WaveFile } from "wavefile";
import path from "path";

const wav = new WaveFile();
export const POST = async (request: NextRequest) => {
  const { audio, sampling_rate, name } = await request.json();
  wav.fromScratch(1, sampling_rate, "32f", Object.values(audio));
  fs.writeFileSync(
    path.join(process.cwd() + `/public/${name}.wav`),
    wav.toBuffer(),
  );
  return NextResponse.json({ audio: `/${name}.wav` });
};
