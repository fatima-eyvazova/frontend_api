import { Users } from "../../models/users.model.js";
import {
  addFeedback,
  getAll,
  getReviews,
  getSingle,
} from "../../services/site/product.service.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../services/site/users.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getAllProducts = catcher(async (req, res, next) => {
  const data = await getAll(req);
  res.status(200).json(
    new Response({
      data,
    })
  );
});

export const getSingleProduct = catcher(async (req, res, next) => {
  const { product_id } = req.params;
  const data = await getSingle(product_id, req.organizationId);
  res.status(200).json(
    new Response({
      data,
    })
  );
});

export const addRemoveFavorite = catcher(async (req, res, next) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(404).json({ message: "Product id is required!" });
  }

  const product = await getSingle(product_id, req.organizationId);
  if (!product) {
    return res.status(404).json({ message: "Product was not found!" });
  }

  const favs = req.user?.favorites;
  const foundItem = favs?.find((item) => item?._id === product_id);

  if (foundItem) {
    await removeFromFavorites(req.user?.id, product_id);
    return res.status(204).json();
  }

  await addToFavorites(req.user?.id, product);
  res.status(201).json({ message: "Product was added to favorites!" });
});

export const giveFeedback = catcher(async (req, res) => {
  const { product_id, review, rating } = req.body;
  const allowedRatings = [1, 2, 3, 4, 5];

  if (!allowedRatings.includes(rating)) {
    return res
      .status(404)
      .json({ message: "Rating must be in feedback and can be from 1 to 5!" });
  }

  const product = await getSingle(product_id, req.organizationId);
  if (!product) {
    return res.status(404).json({ message: "Product was not found!" });
  }

  const {
    rating: { overallRatingPoints, overallRatingCount },
  } = product;

  const newOverallRatingPoints = overallRatingPoints + rating;
  const newCount = overallRatingCount + 1;
  const newAvg = Math.round(newOverallRatingPoints / newCount);
  const updated = await addFeedback(
    product_id,
    review,
    newAvg,
    newOverallRatingPoints,
    newCount
  );

  if (!updated.updated || !updated.review) {
    return res
      .status(404)
      .json({ message: "Product update was not successful!" });
  }

  res.status(200).json({ message: "Product update was successful!" });
});

export const getReviewsByProductId = catcher(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(404).json({ message: "Product id is required" });
  }
  const data = await getReviews(productId);
  res.status(200).json(
    new Response({
      data,
    })
  );
});
