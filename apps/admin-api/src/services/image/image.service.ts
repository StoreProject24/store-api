import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Request } from 'express';
import formidable from 'formidable';
import fs from 'fs/promises';
import { lowWeightImage } from '~utils/lowWeightImage';

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

console.log("AWS_ENDPOINT ", process.env.AWS_ENDPOINT)
console.log("AWS_REGION ", process.env.AWS_REGION)
console.log("AWS_ACCESS_KEY_ID ", process.env.AWS_ACCESS_KEY_ID)
console.log("AWS_SECRET_ACCESS_KEY ", process.env.AWS_SECRET_ACCESS_KEY)
console.log("AWS_BUCKET_NAME ", process.env.AWS_BUCKET_NAME)


const bucketName = process.env.AWS_BUCKET_NAME;

const uploadImages = async (req: Request, storeId: number, dirname: string) => {
  const form = formidable({});
  const images: string[] = [];
  const [_, files] = await form.parse(req);
  for (const file of files.file!) {
    const fileExt = file.originalFilename?.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const fileContent = await fs.readFile(file.filepath);
    const fileContentLow = await lowWeightImage(fileContent);
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: `${storeId}/${dirname}/${fileName}`,
        Body: fileContentLow,
      })
    );
    images.push(`https://${bucketName}.s3.amazonaws.com/${storeId}/${dirname}/${fileName}`);
  }
  return images;
};

const deleteImages = async (urls: string[]) => {
  if (!urls.length) return;
  const keys = urls.map((url) => {
    const urlSplit = url.split('.com')[1];
    return urlSplit.substring(1, urlSplit.length);
  });
  for (const key of keys) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );
  }
};
export { uploadImages, deleteImages };
