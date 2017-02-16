const format = (item, key) =>
  (
    key ?
    `${key}: ${item}` :
    item
  );

const joinKeys = (key, sub) =>
  (
    key ?
    `${key}-${sub}` :
    sub
  );

const isArrayKey = (key, length) => {
  const num = parseInt(key, 10);
  return typeof num === 'number' &&
    !isNaN(num) &&
    num > -1 &&
    num < length;
};

// const isPrimitive = item => {
//   const type = typeof item;
//   return type === 'string' ||
//     type === 'number' ||
//     type === 'boolean';
// }

const flattenObject = function* (f, entry, key) {
  for (const [sub, val] of Object.entries(entry)) {
    yield* f(val, joinKeys(key, sub));
  }
};

const flattenArray = function* (f, item, key) {
  const {
    length,
  } = item;
  for (const [index, entry] of Object.entries(item)) {
    if (isArrayKey(index, length)) {
      yield* f(entry, key);
    } else {
      yield* f(entry, joinKeys(key, index));
    }
  }
};

const flatten = function* (item, key = '') {
  if (Array.isArray(item)) {
    yield* flattenArray(flatten, item, key);
  } else if (item && typeof item === 'object') {
    yield* flattenObject(flatten, item, key);
  } else {
    yield format(item, key);
  }
  //  else if (isPrimitive(item)) {
  //   yield format(item, key);
  // }
  // return null;
};

const header = arg => [...flatten(arg)];

module.exports = header;
