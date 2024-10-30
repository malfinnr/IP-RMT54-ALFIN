const { Op } = require("sequelize");
const { Product, Category, User, Like, Comment } = require("../models");

class ProductController {
  static async postProduct(req, res, next) {
    try {
      const {
        name,
        description,
        fromName,
        durationOfRelationship,
        categoryId,
      } = req.body;
      const newProduct = await Product.create({
        name,
        image: req.file.secure_url,
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
  static async getAllMyProduct(req, res, next) {
    try {
      const allProducts = await Product.findAll({
        // attributes: { exclude: ["password"]},
        include: [
          {
            model: Category,
          },
          {
            model: Like,
          },
          {
            model: Comment,
          },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
        where: {
          userId: req.user.id,
        },
      });

      const productWithLikes = allProducts.map((product) => {
        return {
          ...product.toJSON(),
          totalLikes: product.Likes.length,
        };
      });

      res.status(200).json(productWithLikes);
    } catch (error) {
      next(error);
    }
  }
  static async putIdProduct(req, res, next) {
    try {
      const {
        name,
        description,
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
          image: req.file ? req.file.secure_url : dataProduct.image,
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
      const { categories, sort, search } = req.query;

      const paramQuerySQL = {
        where: {},
        include: [
          {
            model: Category,
          },
          {
            model: Like,
          },
          {
            model: Comment,
          },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
      };

      if (search) {
        paramQuerySQL.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (sort) {
        paramQuerySQL.order = [[sort.by, sort.order]];
      }

      if (categories) {
        const splitCategories = categories.split(",");
        paramQuerySQL.where = {
          categoryId: {
            [Op.or]: splitCategories,
          },
        };
      }
      const allProducts = await Product.findAll(paramQuerySQL);

      const productWithLikes = allProducts.map((product) => {
        return {
          ...product.toJSON(),
          totalLikes: product.Likes.length,
        };
      });

      res.status(200).json(productWithLikes);
    } catch (error) {
      next(error);
    }
  }
  static async getPublicProductById(req, res, next) {
    try {
      const productsId = req.params.id;
      const dataProduct = await Product.findByPk(productsId, {
        include: [
          {
            model: Category,
          },
          {
            model: Like,
          },
          {
            model: Comment,
          },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
      });
      if (!dataProduct) {
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      res.status(200).json({
        ...dataProduct.toJSON(),
        totalLikes: dataProduct.Likes.length,
      });
    } catch (error) {
      next(error);
    }
  }
  // static async updateProductCoverUrlById(req, res, next) {
  //   try {
  //     const productId = Number(req.params.id);
  //     const dataProduct = await Product.findByPk(productId);
  //     if (!dataProduct) {
  //       throw {
  //         name: "NotFound",
  //         message: "Product Not Found",
  //       };
  //     }

  //     await dataProduct.update({
  //       imgUrl: result.secure_url,
  //     });
  //     res.json({
  //       message: "Cover url has been updated",
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }
}

module.exports = ProductController;
