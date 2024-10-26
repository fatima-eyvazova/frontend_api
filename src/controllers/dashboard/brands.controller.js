import {
  create,
  getAll,
  getSingle,
  remove,
  update,
} from "../../services/dashboard/brand.service.js";
import { addFile } from "../../utils/addFile.js";
import { catcher } from "../../utils/catcher.utils.js";
import { deleteFile } from "../../utils/deleteFile.js";
import { Response } from "../../utils/response.utils.js";

export const addNewBrand = catcher(async (req, res, next) => {
  const { image, name } = req.body;
  let img = null;
  if (image) {
    const { url, public_id } = await addFile(image, "categories");
    img = { url, public_id };
  }

  const costomData = {
    image: img,
    name,
    organizationId: req.organizationId,
  };
  const data = await create(costomData, req.organizationId);

  res.json(
    new Response({
      data,
    })
  );
});

export const getAllBrands = catcher(async (req, res, next) => {
  const data = await getAll(req.organizationId);
  res.json(
    new Response({
      data,
    })
  );
});

export const updateBrand = catcher(async (req, res, next) => {
  const { category_id } = req.params;
  const { image, name } = req.body;
  const category = await getSingle(category_id, req.organizationId);
  let img = null;
  if (image) {
    if (category.image?.public_id) {
      await deleteFile(category.image.public_id);
    }
    const { url, public_id } = await addFile(image, "categories");
    img = { url, public_id };
  }
  let costomData = { name, image: img };
  let data = await update(image ? costomData : { name }, category._id);
  res.json(
    new Response({
      data: {
        data: data.modifiedCount ? "Category updated successfully" : data,
      },
    })
  );
});

export const deleteBrand = catcher(async (req, res, next) => {
  const { category_id } = req.params;
  const category = await getSingle(category_id, req.organizationId);
  if (category.image.public_id) {
    await deleteFile(category?.image?.public_id);
  }
  let data = await remove(category._id);
  res.json(
    new Response({
      data,
    })
  );
});
