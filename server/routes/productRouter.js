const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { upload } = require("../middlewares/multer");
const uploadImageCloudinary = require("../middlewares/uploadImageCloudinary");

router.use(authentication);

router.post(
  "/",
  upload.single("image"),
  uploadImageCloudinary,
  ProductController.postProduct
);
router.get("/myproducts", ProductController.getAllMyProduct);
router.put(
  "/myproducts/:id",
  authorization,
  upload.single("image"),
  uploadImageCloudinary,
  ProductController.putIdProduct
);
router.delete(
  "/myproducts/:id",
  authorization,
  ProductController.destroyProducts
);

module.exports = router;
