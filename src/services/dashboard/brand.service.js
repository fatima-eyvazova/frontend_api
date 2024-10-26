import { v1 as randomId } from "uuid";
import { Brands } from "../../models/brand.model.js";
import { deleteFile } from "../../utils/deleteFile.js";
export const create = async (data, organizationId) => {
  const isExist = await Brands.findOne({
    name: data.name,
    organizationId,
  });
  if (isExist) {
    await deleteFile(data.image.public_id);
    throw new Error("This category already used");
  }
  data._id = randomId();
  const brand = new Brands(data);
  await brand.save();
  return brand;
};
export const update = async (data, _id) => {
  const brand = await Brands.updateOne({ _id }, data);
  return brand;
};
export const getAll = async (organizationId) => {
  const brand = await Brands.find({ organizationId }, { organizationId: 0 });
  return brand;
};
export const getSingle = async (_id, organizationId) => {
  const brand = await Brands.findOne({ _id, organizationId });
  return brand;
};
export const remove = async (_id) => {
  const { deletedCount } = await Brands.deleteOne({ _id });
  if (deletedCount) {
    return "Category deleted successfully";
  }
  throw new Error("Category could not be deleted");
};
