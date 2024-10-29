const { Comment } = require("../models");

class CommentController {
  static async postComment(req, res, next) {
    try {
      const { comment } = req.body;
      const { productId } = req.params;
      const userId = req.user.id;
      const newComment = await Comment.create({
        comment,
        productId,
        userId,
      });
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
