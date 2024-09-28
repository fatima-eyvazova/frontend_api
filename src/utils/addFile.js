import { v2 as cloudinary } from "cloudinary";
import { v1 as randomId, v4 } from "uuid";
export const addFile = async (file, path) => {
  const uploadedFile = await cloudinary.uploader.upload(file, {
    upload_preset: "ml_default",
    folder: `frontend-api/${path}/`,
    public_id: randomId(),
  });
  return uploadedFile;
};
