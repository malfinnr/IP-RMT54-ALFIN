const { Comment } = require("../models");

class CommentController {
  static async postComment(req, res, next) {
    try {
      const { comment, productId } = req.body;
      const newComment = await Comment.create({
        comment,
        productId,
        userId: req.user.id,
      });
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
