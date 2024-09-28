import { getAll, remove } from "../../services/dashboard/users.service.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const getAllUsers = catcher(async (req, res, next) => {
  const data = await getAll(req.organizationId);
  res.status(200).json(
    new Response({
      data,
    })
  );
});
export const deleteUser = catcher(async (req, res, next) => {
  const { user_id } = req.params;
  const data = await remove(user_id, req.organizationId);
  res.status(200).json(
    new Response({
      data,
    })
  );
});
