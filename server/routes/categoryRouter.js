const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middlewares/authentication");
router.use(authentication);

router.post("/", CategoryController.postCategory);
router.get("/", CategoryController.getAllCategory);
router.put("/:id", CategoryController.putIdCategory);

module.exports = router;
