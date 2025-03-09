import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(imageFile: File): Promise<string> {
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || "");
      })
      .end(buffer);
  });
}
// This code snippet imports the Cloudinary SDK and configures it with the Cloudinary credentials stored in the environment variables. The uploadImageToCloudinary function takes a File object as input, reads its contents as a Buffer, and uploads it to Cloudinary using the upload_stream method. The uploaded image URL is returned as a Promise.