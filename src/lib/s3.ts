
import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(
    file: File
  ): Promise<{ file_key: string; file_name: string }> {
    return new Promise((resolve, reject) => {
      try {

        // const region = process.env.NEXT_PUBLIC_S3_REGION!;
        // const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!;
        // const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!;
        // const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
        // console.log(process.env)
        // console.log('clerk key',process.env.CLERK_SECRET_KEY)
        // console.log('S3 Region:', region);
        // console.log('S3 Access Key ID:', accessKeyId);
        // console.log('S3 Secret Access Key:', secretAccessKey ? '******' : 'Not Set');
        // console.log('S3 Bucket Name:', bucketName);
        const s3 = new S3({
          region: process.env.NEXT_PUBLIC_S3_REGION!,
          credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
          },
        });
  
        const file_key =
          "uploads/" + Date.now().toString() + file.name.replace(" ", "-");
  
        const params = {
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
          Key: file_key,
          Body: file,
        };

        s3.putObject(params).then(data => {
            console.log('successfully uploaded to s3');
            resolve({
              file_key,
              file_name: file.name,
            });
          })
          .catch(error => {
            console.error('Error uploading to S3:', error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  
  export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
    return url;
  }