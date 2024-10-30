const { Product } = require("../models");

async function authorization(req, res, next) {
  const productId = req.params.id;
  const dataProduct = await Product.findByPk(productId);

  if (!dataProduct) {
    next({
      name: "NotFound",
      message: "Product Not Found",
    });
    return;
  }
  if (Number(req.user.id) !== Number(dataProduct.userId)) {
    next({
      name: "Forbidden",
      message: "You are not authorized",
    });
    return;
  }
  next();
}

module.exports = authorization;
