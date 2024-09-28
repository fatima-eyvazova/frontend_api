import { updateStoreInfo } from "../../services/dashboard/storeInfo.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const updateStoreInfoController = catcher(async (req, res) => {
  const data = await updateStoreInfo(req.body);
  res.status(200).json(
    new Response({
      data,
    })
  );
});
