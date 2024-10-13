import { Baskets } from "../../models/basket.model.js";
import { Products } from "../../models/product.model.js";
import {
  create,
  getAll,
  remove,
  update,
} from "../../services/site/basket.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getBasket = catcher(async (req, res, next) => {
  const data = await getAll(req);
  if (data) {
    return res.status(200).json(
      new Response({
        data,
      })
    );
  }
});
export const addNewProductToBasket = catcher(async (req, res, next) => {
  const { basket } = req.body;
  if (!basket) {
    throw new Error("Basket field is required");
  }
  let mapedArr = req.body.basket.map((item) => {
    return Baskets.findOne({
      productId: item.productId,
      userId: req.user._id,
    });
  });
  let isExist = await Promise.all(mapedArr);
  if (isExist.filter((item) => item).length > 0) {
    throw new Error(
      `The product called ${
        isExist.filter((item) => item)[0].productId
      } is already added`
    );
  }

  const data = await create(req);
  res.json(
    new Response({
      data: data,
    })
  );
});

export const updateBasket = catcher(async (req, res, next) => {
  const { basket_id } = req.params;
  const data = await update(req.body, basket_id);
  res.json(
    new Response({
      data: {
        data: data.modifiedCount ? "Basket updated successfully" : data,
      },
    })
  );
});

export const deleteBasket = catcher(async (req, res, next) => {
  const { basket_id } = req.params;
  let data = await remove(basket_id);
  res.json(
    new Response({
      data,
    })
  );
});
