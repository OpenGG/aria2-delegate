const {
  name,
} = require('../package.json');

const request = require('./request');

const co = require('co');

const main = require('./main');

const Args = require('./args');

const {
  argv,
} = Args(name, process.argv.slice(2));

co(
    main(request, argv)
  )
  .then(
    (ret) => {
      // eslint-disable-next-line no-console
      console.log(ret.toString());
    },
    (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(e.code || -1);
    }
  );
