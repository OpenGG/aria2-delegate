const compound = require('./compound');
const filter = require('./filter');

const reducer =
  (map, [key, val]) =>
  Object.assign(map, {
    [key]: val,
  });

const processArgs =
  argv =>
  Object.entries(argv)
  .filter(filter)
  .map(compound)
  .reduce(
    reducer,
    Object.create(null)
  );

const getParam = (
    url,
    argv
  ) =>
  ({
    jsonrpc: '2.0',
    method: 'aria2.addUri',
    id: `${Date.now()}${Math.random()}`,
    params: [
      [url],
      processArgs(
        argv
      ),
    ],
  });

module.exports = getParam;
