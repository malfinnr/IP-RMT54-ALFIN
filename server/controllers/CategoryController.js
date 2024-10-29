const { Product, Category } = require("../models");

class CategoryController {
  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
  static async getAllCategory(req, res, next) {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json(allCategory);
    } catch (error) {
      next(error);
    }
  }
  static async putIdCategory(req, res, next) {
    try {
      const { name } = req.body;
      const categoryId = req.params.id;
      const dataCategory = await Category.findByPk(categoryId);
      if (!dataCategory) {
        // return res.status(404).json({ message: "error not found" });
        throw {
          name: "NotFound",
          message: "error not found",
        };
      }
      const updatedCategory = await Category.update(
        { name },
        {
          where: {
            id: categoryId,
          },
          returning: true,
        }
      );
      // console.log(updatedCategory);
      res.status(200).json(updatedCategory[1][0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
