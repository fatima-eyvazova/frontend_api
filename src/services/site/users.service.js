import { v1 as randomId } from "uuid";
import { Users } from "../../models/users.model.js";
import { encryptPassword } from "../../utils/hashPassword.js";

export const createClient = async (data, organizationId) => {
  const isExist = await Users.findOne({
    email: data.email,
  });
  if (isExist) {
    throw new Error("This email address already used");
  }

  let hashedPaswword = await encryptPassword(data.password);
  data._id = randomId();
   data.organizationId = organizationId;
  data.role = "client";
  data.password = hashedPaswword;
  const user = new Users(data);
  await user.save();
  return user;

};
