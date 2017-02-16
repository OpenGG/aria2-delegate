const validateURL =
  require('../utils/valid-url');

const URL =
  key =>
  (input) => {
    const url =
      Array.isArray(input) ?
      input[input.length - 1] :
      input;

    if (!url) {
      throw new Error(`${key} is not provided`);
    }

    if (!validateURL(url)) {
      throw new Error(`${key} is not valid url: ${url}`);
    }

    return url;
  };

module.exports = URL;
