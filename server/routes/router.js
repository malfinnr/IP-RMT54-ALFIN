const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const LikeController = require("../controllers/LikeController");
const CommentController = require("../controllers/CommentController");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const authentication = require("../middlewares/authentication");
// const { upload } = require("../middlewares/multer");

router.get("/pub/products", ProductController.getPublicProduct);
router.get("/pub/products/:id", ProductController.getPublicProductById);
router.post("/login", UserController.postLogin);
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", UserController.postAddUser);
router.use(authentication);

// router.patch(
//   "/products/:id/cover-url",
//   upload.single("file"),
//   ProductController.updateProductCoverUrlById
// );

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

module.exports = router;
