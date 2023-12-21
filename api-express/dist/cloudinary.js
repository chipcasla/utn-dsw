import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dspvnz2yj',
    api_key: '776139941189846',
    api_secret: '0Rbajl3fxnZZbXNPHsWX1i7Kffo',
    secure: true,
});
export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'replit',
    });
};
export const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};
export const transformImage = async (url) => {
    return await cloudinary.url(url, {
        width: 200,
        height: 150,
        gravity: 'auto',
        crop: 'fill',
        dpr: '3.0',
    });
};
//# sourceMappingURL=cloudinary.js.map