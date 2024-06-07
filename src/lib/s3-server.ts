import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import { promisify } from 'util';
import stream from "stream";
const pipeline = promisify(stream.pipeline);

export async function downloadfromS3(file_key: string): Promise<string | null> {
  try {
    const s3 = new S3({
      region: process.env.NEXT_PUBLIC_S3_REGION!,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const command = new GetObjectCommand(params);
    const { Body } = await s3.send(command);

    if (!Body) {
      throw new Error('No body returned from S3');
    }

    // Ensure the tmp directory exists
    const tmpDir = 'tmp';
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    const file_name = `${tmpDir}/pdf-${Date.now()}.pdf`;
    const file = fs.createWriteStream(file_name);

    // Use the pipeline to handle the stream
    await pipeline(Body as stream.Readable, file);

    return file_name;
  } catch (error) {
    console.error('Error downloading from S3:', error);
    return null;
  }
}