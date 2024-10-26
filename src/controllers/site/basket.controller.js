import { Baskets } from "../../models/basket.model.js";
import { Products } from "../../models/product.model.js";
import { create, remove, update } from "../../services/site/basket.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getBasket = catcher(async (req, res) => {
  const basket = await Baskets.findOne({ userId: req.user?.id });
  if (!basket) {
    return res.status(404).json("Basket was not found.");
  }

  const productInfos = [];
  for (const pr of basket?.products) {
    const productInfo = await Products.findOne({ _id: pr?.productId });
    const prInfo = JSON.parse(JSON.stringify(productInfo));
    prInfo.productCount = pr?.productCount;
    productInfos.push(prInfo);
  }

  const doc = { ...basket._doc };
  doc.products = productInfos;
  res.status(200).json(doc);
});

export const addNewProductToBasket = catcher(async (req, res) => {
  const { userId, productId, productCount } = req.body;
  if (!userId || !productId) {
    throw new Error("userId and productId fields are required");
  }

  if (productCount < 0 || !Number.isInteger(productCount)) {
    throw new Error("incorrect productCount");
  }

  const foundedBasket = await Baskets.findOne({
    userId,
  });

  if (foundedBasket) {
    const foundProductInBasket = foundedBasket.products.find(
      (pr) => pr?.productId === productId
    );
    if (foundProductInBasket) {
      const data = await update(
        foundedBasket._id,
        productId,
        productCount,
        true
      );
      return res.json(
        new Response({
          data,
        })
      );
    }

    const data = await update(
      foundedBasket._id,
      productId,
      productCount,
      false
    );
    return res.json(
      new Response({
        data: {
          data: data.modifiedCount ? "Basket updated successfully" : data,
        },
      })
    );
  }

  const data = await create(req);

  res.json(
    new Response({
      data: data,
    })
  );
});

export const deleteBasket = catcher(async (req, res) => {
  let data = await remove(req.user._id);
  res.json(
    new Response({
      data,
    })
  );
});
