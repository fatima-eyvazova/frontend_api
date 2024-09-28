import { v1 as randomId } from "uuid";
import { Baskets } from "../../models/basket.model.js";

export const create = async (req) => {
  const { basket } = req.body;

  const costomData = basket.map(({ productCount, productId }) => {
    return {
      _id: randomId(),
      userId: req.user._id,
      organizationId: req.organizationId,
      productId,
      productCount,
    };
  });

  const product = await Baskets.insertMany(costomData);

  return product;
};

export const getAll = async (req) => {
  const product = await Baskets.find(
    { organizationId: req.organizationId, userId: req.user._id },
    { organizationId: 0, createdAt: 0, updatedAt: 0 }
  );

  return product;
};

export const update = async (data, _id) => {
  const basket = await Baskets.updateOne({ _id }, data);
  return basket;
};

export const remove = async (_id) => {
  const { deletedCount } = await Baskets.deleteOne({ _id });
  console.log(deletedCount)
  if (deletedCount) {
    return "Basket deleted successfully";
  }
  throw new Error("Basket could not be deleted");
};