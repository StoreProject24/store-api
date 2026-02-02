import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    const key = `${storeId}/${dirname}/${fileName}`
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileContentLow,
        ContentType: file.mimetype || "image/png"
      })
    );
    images.push(key);
  }
  return images;
};

const getSignedImageUrls = async (keys: string[]) => {
  const images: string[] = []
  for (const key of keys) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
  
    const url = await getSignedUrl(s3 as any, command, {
      expiresIn: 60 * 60, // 1 hora
    })
    images.push(url)
  }
  return images
}

const deleteImages = async (keys: string[]) => {
  if (!keys.length) return;
  for (const key of keys) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );
  }
};
export { uploadImages, deleteImages, getSignedImageUrls };
