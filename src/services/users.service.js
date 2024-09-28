import { v1 as randomId, v4 } from "uuid";
import { Users } from "../models/users.model.js";
import { createOrganization } from "./organizations.service.js";
import { decryptPassword, encryptPassword } from "../utils/hashPassword.js";

export const createSuperAdmin = async (data, res) => {
  const isExist = await Users.findOne({
    email: data.email,
  });
  if (isExist) {
    res.render("message", {
      title: "Error",
      desc: "This email address already used",
    });
    throw new Error("This email address already used");
  }
  if (data.password !== data.rePassword) {
    res.render("message", {
      title: "Error",
      desc: "Passwords are not match",
    });
    throw new Error("Passwords are not match");
  }
  let hashedPaswword = await encryptPassword(data.password);
  let organization = await createOrganization();
  data._id = randomId();
  data.organizationId = organization._id;
  data.role = "superadmin";
  data.password = hashedPaswword;
  const user = new Users(data);
  await user.save();
  return user;
};
export const loginSuperAdmin = async (data, res) => {
  const isExist = await Users.findOne({
    email: data.email,
  });
  if (!isExist) {
    res.render("message", {
      title: "Error",
      desc: "Incorrect email address",
    });
    throw new Error("Incorrect email address");
  }
  let isMatch = await decryptPassword(data.password, isExist.password);
  if (!isMatch) {
    res.render("message", {
      title: "Error",
      desc: "Incorrect password",
    });
    throw new Error("Incorrect password");
  }

  return isExist;
};
export const getSuperAdminByKeyId = async (organizationId) => {
  const user = await Users.findOne({
    organizationId,
  });
  return user;
};
