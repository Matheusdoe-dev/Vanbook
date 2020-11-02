module.exports = function formatToCurrency(lang, currency, value) {
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
