import {
  updateStoreInfo,
  getStoreInfo,
} from "../../services/dashboard/storeInfo.service.js";
import { Response } from "../../utils/response.utils.js";

export const updateStoreInfoController = async (req, res) => {
  try {
    const data = await updateStoreInfo(req.body);
    res.status(200).json(
      new Response({
        data,
      })
    );
  } catch (error) {
    res.status(500).json(new Response({ error: error.message }));
  }
};

export const getStoreInfoController = async (req, res) => {
  try {
    const data = await getStoreInfo();
    res.status(200).json(
      new Response({
        data,
      })
    );
  } catch (error) {
    res.status(500).json(new Response({ error: error.message }));
  }
};
