import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { lowWeightImage } from "@utils/lowWeightImage";
import { Request } from "express";
import formidable from "formidable";
import fs from "fs/promises";

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
	const images = [];
	const [_, files] = await form.parse(req);
	for (const file of files.file!) {
		const fileExt = file.originalFilename?.split(".").pop();
		const fileName = `${storeId}_${Date.now()}.${fileExt}`;
		const fileContent = await fs.readFile(file.filepath);
		const fileContentLow = await lowWeightImage(fileContent);
		await s3.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: `${dirname}/${fileName}`,
				Body: fileContentLow,
			})
		);
		images.push(`https://${bucketName}.s3.amazonaws.com/${dirname}/${fileName}`);
	}
	return images;
};

const deleteImages = async (urls: string[]) => {
	const keys = urls.map((url) => {
		return url.split("/").pop();
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
