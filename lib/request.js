const {
  request: requestHTTP,
} = require('http');

const {
  request: requestHTTPS,
} = require('https');

const {
  parse,
} = require('url');

const request = ({
    url,
    method = 'GET',
    timeout = 30 * 1000,
    data,
    headers,
  }) =>
  new Promise((resolve, reject) => {
    const r = url.startsWith('http:') ? requestHTTP : requestHTTPS;
    const opts = Object.assign(
      parse(url), {
        method,
        timeout,
        headers,
      }
    );
    const req = r(
      opts,
      (res) => {
        const {
          statusCode,
        } = res;
        if (statusCode !== 200) {
          reject(new Error(`Status code[${statusCode}] not 200`));
          res.destroy();
          req.abort();
          return;
        }
        const arr = [];
        res.on('error', reject);
        res.on('readable', () => {
          const buff = res.read();
          if (buff) {
            arr.push(buff);
          }
        });
        res.on('end', () =>
          resolve(Buffer.concat(arr))
        );
      }
    );
    req.on('error', reject);
    req.end(data);
  });

module.exports = request;
