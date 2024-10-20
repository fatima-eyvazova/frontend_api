import { v1 as randomId } from "uuid";
import { Baskets } from "../../models/basket.model.js";
import { Products } from "../../models/product.model.js";
import { getSingle } from "./product.service.js";
import { Types } from "mongoose";

export const create = async (req) => {
  const { productId, productCount } = req.body;

  const payload = {
    _id: randomId(),
    userId: req.user._id,
    organizationId: req.organizationId,
    products: [
      {
        productId,
        productCount,
      },
    ],
  };

  const basket = new Baskets(payload);
  basket.save();
  return basket;
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

export const update = async (id, productId, productCount, isInBasket) => {
  if (productCount === 0) {
    return Baskets.updateOne(
      { _id: id },
      {
        $pull: {
          products: { productId },
        },
      }
    );
  }

  if (isInBasket) {
    return Baskets.updateOne(
      { _id: id, "products.productId": productId },
      {
        $set: {
          "products.$.productCount": productCount,
        },
      }
    );
  }

  return Baskets.updateOne(
    { _id: id },
    {
      $push: {
        products: { productId, productCount },
      },
    }
  );
};

export const remove = async (_id) => {
  const { deletedCount } = await Baskets.deleteOne({ _id });
  if (deletedCount) {
    return "Basket deleted successfully";
  }
  throw new Error("Basket could not be deleted");
};
