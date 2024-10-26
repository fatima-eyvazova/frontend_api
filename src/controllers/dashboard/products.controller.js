import {
  create,
  getAll,
  getSingle,
  remove,
  update,
} from "../../services/dashboard/product.service.js";
import { addFile } from "../../utils/addFile.js";
import { catcher } from "../../utils/catcher.utils.js";
import { deleteFile } from "../../utils/deleteFile.js";
import { Response } from "../../utils/response.utils.js";

export const addNewProduct = catcher(async (req, res, next) => {
  const { images } = req.body;
  if (images.length > 4) {
    throw new Error("There can be a maximum of 4 photos of the product");
  }
  console.log({ images });

  let fileArr = images.map((item) => addFile(item, "products"));
  console.log({ fileArr });

  let uploadedImgs = await Promise.all(fileArr);
  uploadedImgs = uploadedImgs.map(({ url, public_id }) => ({
    url,
    public_id,
  }));
  let costomData = {
    ...req.body,
    images: [...uploadedImgs],
    organizationId: req.organizationId,
  };
  const data = await create(costomData);
  res.json(
    new Response({
      data,
    })
  );
});
export const getAllProducts = catcher(async (req, res, next) => {
  const data = await getAll(req);
  res.status(200).json(
    new Response({
      data,
    })
  );
});

export const updateProduct = catcher(async (req, res, next) => {
  const { product_id } = req.params;
  const { images } = req.body;
  if (images.length > 4) {
    throw new Error("There can be a maximum of 4 photos of the product");
  }
  const data = await update(req.body, product_id);
  res.json(
    new Response({
      data: {
        data: data.modifiedCount ? "Product updated successfully" : data,
      },
    })
  );
});

export const deleteProduct = catcher(async (req, res, next) => {
  const { product_id } = req.params;
  const product = await getSingle(product_id, req.organizationId);
  let deletedFiles = product.images?.map((item) => deleteFile(item.public_id));
  await Promise.all(deletedFiles);
  let data = await remove(product._id);
  res.json(
    new Response({
      data,
    })
  );
});
