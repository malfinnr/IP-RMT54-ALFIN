const { Op } = require("sequelize");
const { Product, Category, User } = require("../models");

class ProductController {
  static async postProduct(req, res, next) {
    try {
      const {
        name,
        description,
        image,
        fromName,
        durationOfRelationship,
        categoryId,
      } = req.body;
      const newProduct = await Product.create({
        name,
        image,
        description,
        fromName,
        durationOfRelationship,
        categoryId,
        userId: req.user.id,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
  static async getAllProduct(req, res, next) {
    try {
      const allProducts = await Product.findAll({
        // attributes: { exclude: ["password"]},
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
      });
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }
  static async getProductsById(req, res, next) {
    try {
      const productsId = req.params.id;
      const dataProduct = await Product.findByPk(productsId);
      if (!dataProduct) {
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      res.status(200).json(dataProduct);
    } catch (error) {
      next(error);
    }
  }
  static async putIdProduct(req, res, next) {
    try {
      const {
        name,
        description,
        image,
        fromName,
        durationOfRelationship,
        categoryId,
      } = req.body;
      const productId = req.params.id;
      const dataProduct = await Product.findByPk(productId);
      // console.log(dataProduct, "9r38qreyqwuidat6");
      if (!dataProduct) {
        // return res.status(404).json({ message: "error not found" });
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      const updatedProduct = await Product.update(
        {
          name,
          description,
          image,
          fromName,
          durationOfRelationship,
          categoryId,
        },
        {
          where: {
            id: productId,
          },
          returning: true,
        }
      );
      res.status(200).json(updatedProduct[1][0]);
    } catch (error) {
      next(error);
    }
  }

  static async destroyProducts(req, res, next) {
    try {
      const productsId = req.params.id;
      const dataProduct = await Product.findByPk(productsId);
      if (!dataProduct) {
        // return res.status(404).json({ message: "error not found" });
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      await Product.destroy({
        where: {
          id: productsId,
        },
      });
      res
        .status(200)
        .json({ message: `${dataProduct.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async getPublicProduct(req, res, next) {
    try {
      const { filter, sort, search, page } = req.query;

      const paramQuerySQL = {
        limit: 10,
        offset: 0,
        where: {},
        include: [
          {
            model: Category,
          },
          {
            model: User,
          },
        ],
      };

      if (page) {
        paramQuerySQL.offset = page * paramQuerySQL.limit - paramQuerySQL.limit;
      }

      if (search) {
        paramQuerySQL.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (sort) {
        paramQuerySQL.order = [[sort.by, sort.order]];
      }

      if (filter && filter.categories) {
        const splitCategories = filter.categories.split(",");
        paramQuerySQL.where = {
          categoryId: {
            [Op.or]: splitCategories,
          },
        };
      }
      const allProducts = await Product.findAll(paramQuerySQL);
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }
  static async getPublicProductById(req, res, next) {
    try {
      const productsId = req.params.id;
      const dataProduct = await Product.findByPk(productsId);
      if (!dataProduct) {
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      res.status(200).json(dataProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
