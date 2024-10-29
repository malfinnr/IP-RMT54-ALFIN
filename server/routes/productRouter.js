const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
router.use(authentication);

router.post("/", ProductController.postProduct);
router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductsById);
router.put("/:id", ProductController.putIdProduct);
router.delete("/:id", ProductController.destroyProducts);

module.exports = router;
