import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dspvnz2yj',
  api_key: '776139941189846',
  api_secret: '0Rbajl3fxnZZbXNPHsWX1i7Kffo',
  secure: true,
});
export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit',
  });
};

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
