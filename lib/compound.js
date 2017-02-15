const shouldBuildArray =
  (key, val) =>
  (
    key === 'header' ||
    key === 'index-out'
  ) &&
  !Array.isArray(val);

const compound = ([key, val]) => {
  if (
    shouldBuildArray(key, val)
  ) {
    return [
      key, [
        val,
      ],
    ];
  }
  return [key, val];
};

module.exports = compound;
