const filter =
  ([key]) =>
  key !== '_' &&
  key !== 'rpc' &&
  !key.startsWith('$');

module.exports = filter;
