import { v1 as randomId } from "uuid";
import { Products } from "../../models/product.model.js";
import { deleteFile } from "../../utils/deleteFile.js";
import { addFile } from "../../utils/addFile.js";

export const create = async (data) => {
  data._id = randomId();
  const product = new Products(data);
  await product.save();
  return product;
};

export const getAll = async (req) => {
  const {
    page,
    perPage,
    minPrice = "",
    maxPrice = "",
    search = "",
    isDeal,
    isPublish,
    categoryId,
    stock,
  } = req.query;
  let skip = (page - 1) * perPage;
  let costomQuery = {
    organizationId: req.organizationId,
    ...(stock !== undefined
      ? stock === "inStock"
        ? { stock: { $gte: 1 } }
        : { stock: 0 }
      : {}),
    ...(isDeal ? { isDeal } : {}),
    ...(isPublish ? { isPublish } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(search
      ? {
          $or: [
            { description: new RegExp(search, "i") },
            { title: new RegExp(search, "i") },
          ],
        }
      : {}),
    ...(minPrice
      ? {
          $or: [
            { salePrice: { $gt: minPrice, $lt: maxPrice ? maxPrice : 99999 } },
            {
              $and: [
                { salePrice: { $exists: false } },
                {
                  productPrice: {
                    $gt: minPrice,
                    $lt: maxPrice ? maxPrice : 99999,
                  },
                },
              ],
            },
          ],
        }
      : {}),
    ...(maxPrice
      ? {
          $or: [
            { salePrice: { $gt: minPrice ? minPrice : 0, $lt: maxPrice } },
            {
              $and: [
                { salePrice: { $exists: false } },
                {
                  productPrice: { $gt: minPrice ? minPrice : 0, $lt: maxPrice },
                },
              ],
            },
          ],
        }
      : {}),
  };

  const product = await Products.find(costomQuery, { organizationId: 0 })
    .limit(perPage || 10)
    .skip(skip || 0);

  const count = await Products.find(costomQuery, {
    organizationId: 0,
  }).countDocuments();
  return { product, totalCount: count };
};

export const update = async (data, _id) => {
  let clientArr = data.images.map((item) => item.public_id).filter((a) => a);
  let newFiles = data.images
    .map((item) => {
      if (!item.public_id) {
        return item;
      }
    })
    .filter((a) => a);

  let product = await Products.findOne({ _id });
  let backArr = product.images.map((item) => item.public_id);
  let diffArr = [];
  diffArr.push(
    ...backArr.filter((item) => {
      if (!clientArr.includes(item)) {
        return item;
      }
    })
  );
  let tempArr = product.images.filter((item) => {
    if (!diffArr.includes(item.public_id)) {
      return item;
    }
  });
  console.log(tempArr);
  let deletedFiles = diffArr.map((item) => deleteFile(item));
  let uploadedFiles = newFiles.map((item) => addFile(item, "products"));
  let generalArr = [...deletedFiles, ...uploadedFiles];
  let all = await Promise.all(generalArr);
  let newArr = all
    .filter((item) => item.public_id)
    .map(({ public_id, url }) => {
      return { public_id, url };
    });
  data.images = [...newArr, ...tempArr];
  const newProduct = await Products.updateOne({ _id }, data);
  return newProduct;
};

export const getSingle = async (_id, organizationId) => {
  const product = await Products.findOne({ _id, organizationId });
  return product;
};

export const remove = async (_id) => {
  const { deletedCount } = await Products.deleteOne({ _id });
  if (deletedCount) {
    return "product deleted successfully";
  }
  throw new Error("product could not be deleted");
};
