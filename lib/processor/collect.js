const collect = arg =>
  (
    Array.isArray(arg) ?
    arg : [arg]
  );

module.exports = collect;
