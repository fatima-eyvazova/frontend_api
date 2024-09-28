import { getAll } from "../../services/dashboard/brand.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getAllBrands = catcher(async (req, res, next) => {
  const data = await getAll(req.organizationId);
  res.status(200).json(
    new Response({
     data
    })
  );
});
