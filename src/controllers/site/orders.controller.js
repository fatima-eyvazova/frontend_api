import { create } from "../../services/orders.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const addNewOrder = catcher(async (req, res, next) => {
  if (!req.body.products.length) {
    throw new Error("Products field is required");
  }
  const costomData = {
    organizationId: req.organizationId,
    products: req.body.products,
    status: "pending",
    method: "card",
    customer: {
      userId: req.user._id,
      name: `${req.user.name} ${req.user.surname}`,
    },
  };

  const data = await create(costomData);
  res.status(200).json(
    new Response({
      data,
    })
  );
});
