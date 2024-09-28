import { Users } from "../models/users.model.js";
import { getOrganizationById } from "../services/organizations.service.js";
import {
  createSuperAdmin,
  loginSuperAdmin,
} from "../services/users.service.js";
import { createToken } from "../utils/JWT.js";
import { catcher } from "../utils/catcher.utils.js";
import { decryptPassword } from "../utils/hashPassword.js";
import { Response } from "../utils/response.utils.js";

export const adminRegister = catcher(async (req, res) => {
  const admin = await createSuperAdmin(req.body, res);
  let organization = await getOrganizationById(admin.organizationId);
  res.render("message", {
    title: "Profile",
    desc: `your api key is:${organization.organizationKey}`,
  });
});

export const adminLogin = catcher(async (req, res) => {
  const admin = await loginSuperAdmin(req.body, res);
  let organization = await getOrganizationById(admin.organizationId);
  res.render("message", {
    title: "Profile",
    desc: `your api key is:${organization.organizationKey}`,
  });
});

export const Login = catcher(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email address");
  }

  let isMatch = await decryptPassword(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
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
export const profile = catcher(async (req, res, next) => {
  res.json(
    new Response({
      data: {
        user: req.user,
      },
    })
  );
});
