const {
  version,
  name,
} = require('../package.json');

const assert = require('assert');

const optimist = require('optimist');

const request = require('./request');

const co = require('co');

const main = require('./main');

const usage =
  `
${name} ${version}

  Deletgate cli command to remote aria2 rpc call

Usage

  ${name} [options] url

Examples

  Simple:
    ${name} --rpc 'http://127.0.0.1:6800/jsonrpc' <url>

  Password:
    ${name} --rpc 'http://user:pass@127.0.0.1:6800/jsonrpc' <url>

  Secret token:
    ${name} --rpc 'http://token:this_is_token_string@127.0.0.1:6800/jsonrpc' <url>

  Output file name:
    ${name} --rpc 'http://127.0.0.1:6800/jsonrpc' --out what.mkv  <url>

  HTTP request headers:
    ${name} --rpc 'http://127.0.0.1:6800/jsonrpc' \\
      --header 'User-Agent: Mozilla/5.0 Chrome/31.0.1650.63' <url>

    ${name} --rpc 'http://127.0.0.1:6800/jsonrpc' \\
      --header 'User-Agent: Mozilla/5.0 Chrome/31.0.1650.63' \\
      --header "Referer: http://127.0.0.1/"  <url>
  `;

const {
  argv,
} = optimist
  .usage(
    usage
  )
  .demand('rpc')
  .string([
    '_',
    'out',
    'rpc',
    'header',
  ])
  .describe('rpc', 'RPC service url')
  .describe('out', 'preferred file name')
  .describe('header', 'http request headers')
  .check(
    ({
      _: [URL],
    }) =>
    assert(URL, 'No url was provided')
  );

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
