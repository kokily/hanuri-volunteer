import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { getCurrentUser } from "@/lib/auth/session";

/** YYYYMMDDHHmm 파일명용 타임스탬프 */
function timestamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `${pad(d.getHours())}${pad(d.getMinutes())}`
  );
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });

    const original = file.name.replaceAll("_", "").trim();
    const base = `${timestamp()}${original}`.split(".")[0];
    const key = `${base}.webp`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const webp = await sharp(buffer)
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: webp,
        ContentType: "image/webp",
      }),
    );

    return NextResponse.json({
      url: `https://${process.env.S3_BUCKET}/${key}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "파일 업로드 실패" }, { status: 500 });
  }
}
