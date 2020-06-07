const { products } = require("../src/data/products"); //this contains the product array already

const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

function getShoppingCart(ids, productsList) {
  const products = getProducts(ids, productsList);
  const categoryList = getCategoryList(products);
  const promotion = getLook(categoryList);

  let priceObject = {
    hiddenRegularTotalPrice: 0,
    discountValue: 0,
  };

  products.map((product) => {
    const regularPrice = product.regularPrice;
    const promoPrice = getPromoPrice(promotion, product);
    const discount = regularPrice - promoPrice;
    priceObject.hiddenRegularTotalPrice += regularPrice;
    priceObject.discountValue += discount;
  });

  const totalPrice =
    priceObject.hiddenRegularTotalPrice - priceObject.discountValue;
  const discountValue = priceObject.discountValue;
  let discountPercentage = discountValue / priceObject.hiddenRegularTotalPrice;
  //to achando 15.62 e eh pra achar 15.63
  discountPercentage *= 10000;
  discountPercentage = Math.round(discountPercentage) / 100;
  discountPercentage = discountPercentage.toString() + "%";

  let productsAbridged = [];
  products.map((product) =>
    productsAbridged.push({ name: product.name, category: product.category })
  );

  return {
    products: productsAbridged,
    promotion: promotion,
    totalPrice: totalPrice.toFixed(2),
    discountValue: discountValue.toFixed(2),
    discount: discountPercentage,
  };
}

function getProducts(ids, productsList) {
  const products = ids.map((id) => {
    return productsList.find((product) => product.id === id);
  });
  return products;
}

function getCategoryList(products) {
  let categoryList = [];
  products.map((product) => {
    if (!categoryList.includes(product.category)) {
      categoryList = categoryList.concat(product.category);
    }
  });

  return categoryList;
}

function getLook(categoryList) {
  const length = categoryList.length;
  switch (length) {
    case 1:
      return "SINGLE LOOK";
    case 2:
      return "DOUBLE LOOK";
    case 3:
      return "TRIPLE LOOK";
    case 4:
      return "FULL LOOK";
    default:
      return "YOU DUN' GOT NO LOOK YO";
  }
}

function getPromoPrice(look, product) {
  const promotion = product.promotions.find((promotion) =>
    promotion.looks.includes(look)
  );
  if (promotion) {
    return promotion.price;
  } else return product.regularPrice;
}

const products1 = getProducts([130, 140, 230, 260], products);
//console.log("getProducts:", products1);
const categoryList1 = getCategoryList(products1);
//console.log("getCategoryList:", categoryList1);
const look1 = getLook(categoryList1);
//console.log("getLook:", look1);
const promoPrice1 = getPromoPrice(look1, products1[1]);
//console.log("getPromoPrice:", promoPrice1);
const shoppingCart1 = getShoppingCart([130, 140, 230, 260], products);
console.log("getShoppingCart:", shoppingCart1);

module.exports = {
  getShoppingCart,
};
