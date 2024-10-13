import { v1 as randomId } from "uuid";
import { Baskets } from "../../models/basket.model.js";
import { Products } from "../../models/product.model.js";
import { getSingle } from "./product.service.js";

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
  const basket = await Baskets.find(
    { organizationId: req.organizationId, userId: req.user._id },
    { organizationId: 0, createdAt: 0, updatedAt: 0 }
  );

  const basketProducts = [];
  let res = JSON.parse(JSON.stringify(basket));
  if (basket?.length) {
    for (let i = 0; i < basket.length; i++) {
      const product = await getSingle(basket[i]?.productId, req.organizationId);
      if (product) {
        basketProducts[i] = product;
      }
    }

    for (const pr of res) {
      for (const p of basketProducts) {
        if (pr?.productId === p?._id) {
          pr.product = p;
        }
      }
    }
  }

  return res;
};

export const update = async (data, _id) => {
  const basket = await Baskets.updateOne({ _id }, data);
  return basket;
};

export const remove = async (_id) => {
  const { deletedCount } = await Baskets.deleteOne({ _id });
  console.log(deletedCount);
  if (deletedCount) {
    return "Basket deleted successfully";
  }
  throw new Error("Basket could not be deleted");
};
