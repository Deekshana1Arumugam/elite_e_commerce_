function calculateDiscount(oldPrice, newPrice) {
  if (oldPrice <= 0 || newPrice < 0) return { discountPercentage: 0, discountAmount: 0 };

  const discountAmount = oldPrice - newPrice;
  const discountPercentage = ((discountAmount / oldPrice) * 100).toFixed(2);

  return {
    discountAmount: discountAmount.toFixed(2),
    discountPercentage,
  };
}

function paginate(model, page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return { limit, offset };
}

module.exports = {
  calculateDiscount,
  paginate,
};
