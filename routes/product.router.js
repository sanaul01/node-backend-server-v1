const express = require('express');
const router = express.Router();
const productController = require("../Controllers/product.controller")

router.route('/')
.get(productController.getProducts)
.post(productController.postProduct)

router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/:id').patch(productController.updateProduct);



module.exports = router;