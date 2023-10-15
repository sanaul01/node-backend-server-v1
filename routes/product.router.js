const express = require('express');
const router = express.Router();
const productController = require("../Controllers/product.controller")

router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

router.route('/')
.get(productController.getProducts)
.post(productController.postProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProductById);

module.exports = router;