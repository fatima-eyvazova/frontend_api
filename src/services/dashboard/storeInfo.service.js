import { v1 as randomId } from "uuid";
import { StoreInfo } from "../../models/store.model.js";

export const updateStoreInfo = async (data) => {
  const store = await StoreInfo.findOneAndUpdate({ _id: data._id }, data, {
    new: true,
    runValidators: true,
  });

  return store;
};

export const getStoreInfo = async () => {
  let store = await StoreInfo.findOne();

  if (!store) {
    store = new StoreInfo({
      _id: randomId(),
      name: "Fayzelia 🛍️",
    });
    await store.save();
  }

  return store;
};
