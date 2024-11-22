import { NextRequest, NextResponse } from "next/server";

import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

const Bucket = "lectus-bucket";
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const Body = (await file.arrayBuffer()) as Buffer;
    await s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));

    return NextResponse.json({
      key: process.env.AWS_S3_URL + file.name,
    });
  } catch (e) {
    console.error("error", e);
  }
}
