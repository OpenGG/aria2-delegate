const Main = require('../lib/main');

describe('main', () => {
  it('normal', () => {
    const argv = {
      _: [
        'what',
      ],
      rpc: 'happend',
      a: 'this',
      b: 'is',
      c: ['life'],
      header: 'are',
      'index-out': ['you', 'ok'],
    };
    const expected = {
      method: 'POST',
      url: 'happend',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
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
      },
    };

    const request = arg => arg;

    const iterator = Main(request, argv)();

    const res = iterator.next();

    res.value.data = JSON.parse(res.value.data);

    expect(res)
      .toMatchObject({
        done: false,
        value: expected,
      });

    const ret = iterator.next(expected);

    expect(ret.done)
      .toBe(true);

    expect(ret.value)
      .toBe(expected);
  });
});
