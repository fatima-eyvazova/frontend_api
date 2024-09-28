import { v1 as randomId, v4 } from "uuid";
import { Orders } from "../models/orders.model.js";
import { Products } from "../models/product.model.js";

export const create = async (data) => {
  let pro = data.products.map(async (item) => {
    let product = await Products.findOne({ _id: item.productId });
    if (product) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  });

  let all = await Promise.all(pro);

  let total = 0;
  all = all.map((item, i) => {
    if (item.salePrice) {
      total += item.salePrice * data.products[i].productCount;
    } else {
      total += item.productPrice * data.products[i].productCount;
    }
    console.log(total);
    if (item.stock - data.products[i].productCount >= 0) {
      return {
        stock: item.stock - data.products[i].productCount,
        _id: item._id,
      };
    } else {
      throw new Error(
        "We're sorry, but the requested product is currently out of stock."
      );
    }
  });
  const res = all.map(({ _id, stock }) => {
    return Products.updateOne({ _id }, { stock });
  });
  await Promise.all(res);
  data._id = randomId();
  data.total = total;
  const organization = new Orders(data);
  await organization.save();
  return organization;
};

export const getAll = async (req) => {
  const {
    page = 1,
    perPage = 10,
    startDate,
    endDate,
    search,
    status,
    day,
  } = req.query;

  const diffDay = new Date();
  diffDay.setDate(diffDay.getDate() - day || 0);
  let skip = (page == 1 ? 0 : page - 1) * perPage;

  const dateQuery = () => {
    if (startDate && !endDate) {
      return { createdAt: { $gte: new Date(startDate) } };
    } else if (endDate && !startDate) {
      return { createdAt: { $lte: new Date(endDate) } };
    } else if (startDate && endDate) {
      return {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else {
      return {};
    }
  };
  const query = {
    organizationId: req.organizationId,
    ...(search ? { "customer.name": new RegExp(search, "i") } : {}),
    ...(status ? { status } : {}),
    ...(day ? { createdAt: { $gte: diffDay } } : {}),
    ...dateQuery(),
  };
  const data = await Orders.find(query, {
    organizationId: 0,
    "products._id": 0,
    "customer._id": 0,
  })
    .limit(perPage)
    .skip(skip || 0);

  const count = await Orders.find(query, {
    organizationId: 0,
    "products._id": 0,
    "customer._id": 0,
  }).countDocuments();
  return { data, totalCount: count };
};

export const update = async (data, _id) => {
  let prew = await Orders.findOne({ _id });
  if (prew.status === "delivered") {
    throw new Error("You cannot change your order status");
  }
  const order = await Orders.updateOne(
    { _id },
    { status: data, completed: data === "delivered" ? new Date() : null }
  );
  return order;
};
