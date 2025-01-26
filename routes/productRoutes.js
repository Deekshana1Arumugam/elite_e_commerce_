const express = require('express');
const { addProduct, getAllProducts, getProductByVendor } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, authorizeRoles(['admin', 'staff', 'vendor']), addProduct);

router.get('/getAll', getAllProducts);

router.get('/vendor/:vendor_id', getProductByVendor);

module.exports = router;
