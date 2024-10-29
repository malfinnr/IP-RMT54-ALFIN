const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const authentication = require("../middlewares/authentication");

router.get("/pub/products", ProductController.getPublicProduct);
router.get("/pub/products/:id", ProductController.getPublicProductById);
router.post("/login", UserController.postLogin);
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.use(authentication);
router.post("/add-user", UserController.postAddUser);

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.patch(
  "/products/:id/cover-url",
  upload.single("file"),
  ProductController.updateProductCoverUrlById
);

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

module.exports = router;
