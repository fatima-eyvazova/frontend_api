import { v1 as randomId } from "uuid";
import { Users } from "../../models/users.model.js";
import { encryptPassword } from "../../utils/hashPassword.js";

export const createAdmin = async (data, organizationId) => {
  const isExist = await Users.findOne({
    email: data.email,
  });
  if (isExist) {
    throw new Error("This email address already used");
  }

  let hashedPaswword = await encryptPassword(data.password);
  data._id = randomId();
  data.organizationId = organizationId;
  data.role = "admin";
  data.password = hashedPaswword;
  const user = new Users(data);
  await user.save();
  return user;
};
export const getAll = async (organizationId) => {
  const users = await Users.find(
    {
      organizationId,role:'admin'
    },
    { organizationId: 0 }
  );
  return users;
};

export const remove = async (_id, organizationId) => {
  const { deletedCount } = await Users.deleteOne({ _id, organizationId });
  if (deletedCount) {
    return "User deleted successfully";
  }
  throw new Error("User could not be deleted");
};
