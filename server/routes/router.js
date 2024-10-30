const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const likeRouter = require("./likeRouter");
const commentRouter = require("./commentRouter");

router.get("/pub/products", ProductController.getPublicProduct);
router.get("/pub/products/:id", ProductController.getPublicProductById);
router.post("/login", UserController.postLogin);
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", UserController.postAddUser);

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/likes", likeRouter);
router.use("/comment", commentRouter);
module.exports = router;
