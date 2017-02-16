const reg = /^https?:\/\/(?!$)/;

const validateURL =
  url =>
  reg.test(url);

module.exports = validateURL;
