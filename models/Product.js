const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  old_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  new_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiry_date: {
    type: DataTypes.BIGINT,
    allowNull: true,
    validate: {
      isInt: true, 
    },
  },  
  product_url: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Product;