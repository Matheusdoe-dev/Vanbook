module.exports = function parseCurrencyToFloat(value, format) {
  if (format === 'float') {
    return Number.parseFloat(value.replace('R$', '').trim());
  } else {
    return Number(value.replace('R$', '').trim());
  }
};
