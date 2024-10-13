import { v1 as randomId } from "uuid";
import { Products } from "../../models/product.model.js";

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
    minPrice,
    maxPrice,
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

  const product = await Products.find(costomQuery, {
    organizationId: 0,
    createdAt: 0,
    updatedAt: 0,
  })
    .limit(perPage || 10)
    .skip(skip || 0);

  const count = await Products.find(costomQuery, {
    organizationId: 0,
  }).countDocuments();
  return { product, totalCount: count };
};

export const getSingle = async (_id, organizationId) => {
  const product = await Products.findOne({ _id, organizationId });
  return product;
};

export const addFeedback = (
  productId,
  review = "",
  avgRating,
  overallRatingPoints,
  overallRatingCount
) => {
  return Products.findOneAndUpdate(
    { _id: productId },
    {
      $set: {
        review,
        "rating.avgRating": avgRating,
        "rating.overallRatingCount": overallRatingCount,
        "rating.overallRatingPoints": overallRatingPoints,
      },
    }
  );
};
