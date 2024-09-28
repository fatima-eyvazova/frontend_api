import { createClient } from "../../services/site/users.service.js";
import { createToken } from "../../utils/JWT.js";
import { catcher } from "../../utils/catcher.utils.js";
import { Response } from "../../utils/response.utils.js";

export const register = catcher(async (req, res, next) => {
  let user = await createClient(req.body, req.organizationId);
  let token = createToken(user._id);

  let sendedData = {
    _id: user._id,
    organizationId: user.organizationId,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  };
  res.json(
    new Response({
      data: {
        token,
        user: sendedData,
      },
    })
  );
});
