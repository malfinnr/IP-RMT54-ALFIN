const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const authentication = require("../middlewares/authentication");
router.use(authentication);

router.post("/:productId", CommentController.postComment);

module.exports = router;
