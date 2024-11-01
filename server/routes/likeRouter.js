const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/LikeController");
const authentication = require("../middlewares/authentication");
router.use(authentication);

router.post("/:productId", LikeController.postLike);

module.exports = router;
