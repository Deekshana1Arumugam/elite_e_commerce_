const Product = require('../models/Product');
const { Op } = require('sequelize'); 
const { calculateDiscount, paginate } = require('../utils/helpers');


//add products
const addProduct = async (req, res) => {

  try {
    const { name, description, category, old_price, new_price, image_url, vendor_id, product_url } = req.body;

    const exdate = new Date();
   exdate.setDate(exdate.getDate() + 7);
   const expiry_date = Math.floor(exdate.getTime() / 1000);

//    console.log(expiry_date,"expiry_date")

    const newProduct = await Product.create({
      name, description, category, old_price, new_price, image_url, vendor_id, expiry_date, product_url
    });

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product!', error: err.message });
  }
};

//getAllProducts

const getAllProducts = async (req, res) => {
    try {
      let { page = 1, limit = 10, search } = req.query;
  
      page = parseInt(page);
      limit = parseInt(limit);
  
      let queryOptions = { where: {} };
  
      if (search) {
        queryOptions.where = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },     // ✅ Search in name
            { category: { [Op.like]: `%${search}%` } }  // ✅ Search in category
          ]
        };
      }
  
      // Apply pagination
      const { count, rows: products } = await Product.findAndCountAll({
        ...queryOptions,
        limit,
        offset: (page - 1) * limit,
      });
  
      const productsWithDiscount = products.map(product => {
        const { old_price, new_price } = product;
        const { discountAmount, discountPercentage } = calculateDiscount(parseFloat(old_price), parseFloat(new_price));
  
        return {
          ...product.toJSON(),
          old_price: parseFloat(old_price),
          new_price: parseFloat(new_price),
          discountAmount: parseFloat(discountAmount),
          discountPercentage: parseFloat(discountPercentage),
        };
      });
  
      res.status(200).json({
        message: 'Products retrieved successfully',
        totalRecords: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        pageSize: limit,
        products: productsWithDiscount
      });
  
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
  };
  
//getAllProductsByVendorId
const getProductByVendor = async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const products = await Product.findAll({ where: { vendor_id } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { addProduct, getAllProducts, getProductByVendor };