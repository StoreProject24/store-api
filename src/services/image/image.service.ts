import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Request } from "express";
import formidable from "formidable";
import fs from "fs/promises";

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const bucketName = process.env.AWS_BUCKET_NAME;

const uploadImages = async (req: Request, storeId: number, dirname: string) => {
	const form = formidable({});
	const images = [];
	const [_, files] = await form.parse(req);
	for (const file of files.file!) {
		const fileExt = file.filepath.split(".").pop();
		const fileName = `${storeId}_${Date.now()}.${fileExt}`;
		const fileContent = await fs.readFile(file.filepath);
		const params = {
			Bucket: bucketName,
			Key: `${dirname}/${fileName}`,
			Body: fileContent,
			ACL: "public-read",
		};
		await s3.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: `${dirname}/${fileName}`,
				Body: fileContent,
			})
		);
		images.push(`https://${bucketName}.s3.amazonaws.com/${dirname}/${fileName}`);
	}
};

const deleteImages = async (urls: string[]) => {
	const keys = urls.map((url) => {
		const key = url.split("/").pop();
		return { Key: key };
	});
	for (const key of keys) {
		const params = {
			Bucket: bucketName,
			Key: key,
		};

		await s3.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: key ?? "",
			})
		);
	}
};
export { uploadImages, deleteImages };
