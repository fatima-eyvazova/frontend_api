import { v2 as cloudinary } from "cloudinary";

export const deleteFile = async (public_id) => {
  const deleteimage = await cloudinary.uploader.destroy(public_id);
  if (!deleteimage) {
    throw new Error("Image could not be deleted");
  }
  return deleteimage;
};
