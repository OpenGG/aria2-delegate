const eslintrc = require('./.eslintrc.json');

module.exports =
  Object.assign({},
    eslintrc, {
      env: {
        node: true,
        jest: true,
      },
    });
