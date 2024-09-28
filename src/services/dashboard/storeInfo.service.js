import { v1 as randomId } from "uuid";
import { StoreInfo } from "../../models/store.model.js";

export const updateStoreInfo = async (data) => {
  data._id = randomId();
  const store = new StoreInfo(data);
  await store.save();
  return store;
};
