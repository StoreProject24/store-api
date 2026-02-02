import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

export { getSignedImageUrls };
