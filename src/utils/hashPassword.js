import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPaswword = await bcrypt.hash(password, salt);
  return hashedPaswword;
};

export const decryptPassword = async (clientPsw,backPsw) => {

  const isMatchPassword = await bcrypt.compare(clientPsw, backPsw);
  if (!isMatchPassword) {
    throw new Error("Incorrect password");
  }
  return isMatchPassword;
};
