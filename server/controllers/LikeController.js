const { Like } = require("../models");

class LikeController {
  static async postLike(req, res, next) {
    try {
      const {} = req.body;
      const newLike = await Comment.create({});
      res.status(201).json(newLike);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LikeController;
