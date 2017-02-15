const getParam = require('./get-param');

const Main =
  (request, argv) =>
  function* main() {
    const {
      _: [
        url,
      ],
      rpc,
    } = argv;

    const param = getParam(
      url,
      argv
    );

    const data = yield request({
      method: 'POST',
      url: rpc,
      data: JSON.stringify(param),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  };

module.exports = Main;
