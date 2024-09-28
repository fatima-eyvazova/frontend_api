import { getAll, getSingle } from "../../services/site/product.service.js";
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
