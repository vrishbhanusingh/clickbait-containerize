// "use server"
// import { s3Client } from "nodejs-s3-typescript";

// //S3 Config
// const s3Config = {
//     bucketName: process.env.AWS_S3_BUCKET_NAME!,
//     region: process.env.AWS_S3_REGION!,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID!
// }

// export const UploadImage = async (formData: FormData) => {
//     try {
//         const file = formData.get("file") as File;
//         const folderName = formData.get("folderName") as string;
//         const s3 = new s3Client({
//             ...s3Config,
//             dirName: folderName
//         });
//         const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()));
//         return res;
//     } catch (e) {
//         return "Image Upload failed"
//     }
// }