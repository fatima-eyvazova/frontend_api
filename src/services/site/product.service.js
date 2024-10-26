import { v1 as randomId } from "uuid";
import { Products } from "../../models/product.model.js";
import { ProductReviews } from "../../models/review.model.js";

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
    rating,
  } = req.query;
  let skip = (page - 1) * perPage;
  const ratings = rating?.split(",");

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
    ...(rating
      ? {
          "rating.avgRating": { $in: ratings },
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

export const addFeedback = async (
  productId,
  review = "",
  avgRating,
  overallRatingPoints,
  overallRatingCount
) => {
  const updated = await Products.findOneAndUpdate(
    { _id: productId },
    {
      $set: {
        "rating.avgRating": avgRating,
        "rating.overallRatingCount": overallRatingCount,
        "rating.overallRatingPoints": overallRatingPoints,
      },
    }
  );

  const id = randomId();
  const rev = new ProductReviews({
    _id: id,
    description: review,
    productId,
  });
  await rev.save();

  return { updated, review: rev };
};

export const getReviews = async (productId) => {
  return ProductReviews.find({ productId });
};
