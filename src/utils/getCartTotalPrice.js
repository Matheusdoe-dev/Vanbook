const Cart = require('../app/models/Cart');

const formatToCurrency = require('./formatToCurrency');
const parseCurrencyToNumber = require('./parseCurrencyToNumber');

module.exports = async function getCartTotalPrice() {
  const cart = await Cart.findAll();
  let totalPrice = 0;

  cart.forEach(({ product_cost, product_qty }) => {
    const price = parseCurrencyToNumber(product_cost, 'float');
    const result = price * product_qty;

    totalPrice = formatToCurrency('pt-br', 'BRL', result + totalPrice);
  });

  return totalPrice;
};
