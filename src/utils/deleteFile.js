import { v2 as cloudinary } from "cloudinary";

export const deleteFile = async (public_id) => {
  try {
    const deleteimage = await cloudinary.uploader.destroy(public_id);
    if (!deleteimage || deleteimage?.result?.includes("not found")) {
      throw new Error("Image could not be deleted");
    }
    return deleteimage;
  } catch (error) {}

  return null;
};
