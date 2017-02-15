const request = require('../lib/request');

describe('request', () => {
  const data = JSON.stringify({
    jsonrpc: '2.0',
    method: 'aria2.addUri',
    params: [
      ['what'],
      {
        a: 'this',
        b: 'is',
        c: ['life'],
        header: ['are'],
        'index-out': ['you', 'ok'],
      },
    ],
  });
  ['http', 'https'].forEach((protocol) => {
    it(protocol, () =>
      request({
        url: `${protocol}://httpbin.org/get?2=3&4=5`,
        headers: {
          what: 1,
          'Content-Type': 'application/json',
        },
        data,
      }).then(
        res => expect(
          JSON.parse(
            res
          )
        ).toMatchObject({
          args: {
            2: '3',
            4: '5',
          },
          headers: {
            What: '1',
            'Content-Type': 'application/json',
            Host: 'httpbin.org',
          },
          url: `${protocol}://httpbin.org/get?2=3&4=5`,
        }),
        () =>
        expect(1).toBe(2)
      )
    );
    it(`${protocol}:wrong method}`, () =>
      request({
        url: `${protocol}://httpbin.org/post`,
        headers: {
          what: 1,
          'Content-Type': 'application/json',
        },
        data,
      }).then(
        () =>
        expect(1).toBe(2),
        (e) => {
          expect(e).toBeInstanceOf(Error);
          expect(e.message).toBe('Status code[405] not 200');
        }
      )
    );
    it(`${protocol}:post`, () =>
      request({
        method: 'POST',
        url: `${protocol}://httpbin.org/post`,
        headers: {
          what: 1,
          'Content-Type': 'application/json',
        },
        data,
      }).then(
        (res) => {
          expect(
            JSON.parse(res)
          ).toMatchObject({
            args: {},
            data,
            files: {},
            form: {},
            headers: {
              'Content-Type': 'application/json',
              Host: 'httpbin.org',
              What: '1',
            },
            json: JSON.parse(data),
            url: `${protocol}://httpbin.org/post`,
          });
        },
        () =>
        expect(1).toBe(2)
      )
    );
    it(`${protocol}:auth`, () =>
      request({
        method: 'GET',
        url: `${protocol}://1:2@httpbin.org/basic-auth/1/2`,
        headers: {
          what: 1,
          'Content-Type': 'application/json',
        },
        data,
      }).then(
        res => expect(
          JSON.parse(
            res
          )
        ).toEqual({
          authenticated: true,
          user: '1',
        }),
        () =>
        expect(1).toBe(2)
      )
    );
  });
});
