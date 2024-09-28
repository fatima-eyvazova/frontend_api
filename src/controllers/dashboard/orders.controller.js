import { getAll, update } from "../../services/orders.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getOrders = catcher(async (req, res, next) => {
  const data = await getAll(req);
  res.json(
    new Response({
      data,
    })
  );
});
export const updateOrder = catcher(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const data = await update(status, orderId);
  res.json(
    new Response({
      data: {
        data: data.modifiedCount ? "Order updated successfully" : data,
      },
    })
  );
});
