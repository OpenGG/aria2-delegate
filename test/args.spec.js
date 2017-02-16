const Args = require('../lib/args');

const test = (...args) => {
  const instance =
    Args(...args)
    .exitProcess(false);

  const {
    argv,
    exitError,
  } = instance;

  if (exitError) {
    throw exitError;
  }

  return argv;
};

const runMute = (fn) => {
  const {
    error,
  } = console;
  Object.assign(
    console, {
      error() {},
    }
  );
  try {
    const ret = fn();
    Object.assign(
      console, {
        error,
      }
    );
    return ret;
  } catch (e) {
    Object.assign(
      console, {
        error,
      }
    );
    throw e;
  }
};

describe('argv', () => {
  it('download_url: non', () => {
    expect(
      () =>
      runMute(
        () =>
        test('test', [], true)
      )
    ).toThrow(/download_url is/);
  });

  it('download_url: invalid', () => {
    expect(() =>
      runMute(
        () =>
        test('test', ['1234'], true)
      )
    ).toThrow(/download_url is/);
  });

  it('rpc: non', () => {
    expect(() =>
      runMute(() =>
        test('test', ['http://1234'], true)
      ).toThrow(/rpc is/)
    );
  });

  it('rpc: invalid', () => {
    expect(() =>
      runMute(() =>
        test('test', ['--rpc', '1234', 'http://1234'], true)
      ).toThrow(/rpc is/)
    );
  });

  it('download: http', () => {
    const argv = test('test', ['--rpc', 'http://5678', 'http://1234'], true);
    expect(argv)
      .toMatchObject({
        _: ['http://1234'],
        rpc: 'http://5678',
      });
  });

  it('download: https', () => {
    const argv = test('test', ['--rpc', 'http://5678', 'https://1234'], true);
    expect(argv)
      .toMatchObject({
        _: ['https://1234'],
        rpc: 'http://5678',
      });
  });

  it('rpc: https', () => {
    const argv = test('test', ['--rpc', 'https://5678', 'https://1234'], true);
    expect(argv)
      .toMatchObject({
        _: ['https://1234'],
        rpc: 'https://5678',
      });
  });

  it('simple', () => {
    const argv = test('test', ['--header', 'test: 2', '--index-out', 'test: 3', '--rpc', 'http://5678', 'https://1234'], true);
    expect(argv)
      .toMatchObject({
        header: ['test: 2'],
        'index-out': ['test: 3'],
        _: ['https://1234'],
        rpc: 'http://5678',
      });
  });

  it('array', () => {
    const argv = test('test', ['--header', 'test: 2', '--header', 'test: 5', '--index-out', 'test: 3', '--index-out', 'test: 4', '--rpc', 'http://5678', '--rpc', 'http://7890', 'https://1234', 'https://5678'], true);
    expect(argv)
      .toMatchObject({
        header: ['test: 2', 'test: 5'],
        'index-out': ['test: 3', 'test: 4'],
        _: ['https://5678'],
        rpc: 'http://7890',
      });
  });

  it('object', () => {
    const argv = test('test', ['--header.Cookie.a', '2345', '--header.Cookie', '44', '--header.Cookie', '55', '--header', 'Cookie: 66', '--header.Cookie', '77', '--index-out', 'test: 3', '--index-out', 'test: 4', '--rpc', 'http://5678', '--rpc', 'http://7890', 'https://1234', 'https://5678'], true);
    expect(argv)
      .toMatchObject({
        header: [
          'Cookie-a: 2345',
          'Cookie: 44',
          'Cookie: 55',
          'Cookie: 66',
          'Cookie: 77',
        ],
        'index-out': [
          'test: 3',
          'test: 4',
        ],
        _: ['https://5678'],
        rpc: 'http://7890',
      });
  });
});
