import sharp from 'sharp';

export const lowWeightImage = async (image: Buffer) => {
  const lowWeightImage = await sharp(image)
    .resize({ width: 800 })
    .sharpen({
      sigma: 1,
    })
    .jpeg({ quality: 90 })
    .toBuffer();
  return lowWeightImage;
};
