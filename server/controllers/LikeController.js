const { Like } = require("../models");

class LikeController {
  static async postLike(req, res, next) {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
      const newLike = await Like.create({ userId, productId });
      res.status(201).json(newLike);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LikeController;
