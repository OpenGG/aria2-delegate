const yargs = require('yargs');

const collect = require('./processor/collect');

const header = require('./processor/header');

const URL = require('./processor/url');

const compose = require('compose-function');

const Args = (name, args) => yargs(args)

    .option('_', {
      type: 'string',
      coerce: compose(collect, URL('download_url')),
    })

    .option('index-out', {
      type: 'string',
      default: [],
      coerce: collect,
      desc: 'Index out',
    })
    .option('header', {
      default: [],
      coerce: header,
      desc: 'Request http header',
    })
    .option('rpc', {
      type: 'string',
      desc: 'RPC service url',
      demandOption: 'rpc is not provided',
      coerce: URL('rpc'),
    })

    .version()

    .help()

    .showHelpOnFail(
      false,
      `Check usage with:
  ${name} --help
`)

    .usage(
      `
Usage:

  ${name} [options] <download_url>

Examples:

  Simple:
    ${name} --rpc "http://127.0.0.1:6800/jsonrpc" <url>

  With password:
    ${name} --rpc "http://user:pass@127.0.0.1:6800/jsonrpc" <url>

  With secret token:
    ${name} --rpc "http://token:this_is_token@127.0.0.1:6800/jsonrpc" <url>

  Request header:
    ${name} --rpc "http://127.0.0.1:6800/jsonrpc" --header "User-Agent: Mozilla/5.0" --header.User-Agent "Mozilla/5.0" <url>
`);

module.exports = Args;
