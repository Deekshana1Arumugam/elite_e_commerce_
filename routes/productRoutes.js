const express = require('express');
const { addProduct, getAllProducts, getProductByVendor } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

//add products
router.post('/add', verifyToken, authorizeRoles(['admin', 'staff', 'vendor']), addProduct);

//getAllProducts
router.get('/getAll', getAllProducts);

//getByVendorId
router.get('/vendor/:vendor_id', getProductByVendor);

module.exports = router;
