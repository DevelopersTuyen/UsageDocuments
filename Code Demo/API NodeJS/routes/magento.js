const express = require('express');
const router = express.Router();

const ProductMagentoController = require('../controllers/ProductMagentoController.js');
const GetTokenApiMagento = require('../controllers/GetTokenApiMagento.js');

router.post('/get-token-api',GetTokenApiMagento.get_token_api);

router.get('/view-product-magento',ProductMagentoController.get_all_product);
router.post('/delete-product-magento',ProductMagentoController.delete_product);
router.post('/create-product-magento',ProductMagentoController.create_product);

router.get('/view-order-magento',ProductMagentoController.get_all_order);

router.get('/view-category-magento',ProductMagentoController.get_all_category);

module.exports = router;