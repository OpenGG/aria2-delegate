const compound = require('../lib/compound');

describe('compound', () => {
  ['index-out', 'header'].forEach((key) => {
    it(`${key}:non-array`, () =>
      expect(
        compound([key, 1])
      )
      .toEqual([key, [1]])
    );
    it(`${key}:array`, () =>
      expect(
        compound([key, [1, 2]])
      )
      .toEqual([key, [1, 2]])
    );
  });

  it('other:non-array', () =>
    expect(
      compound(['other', 3])
    )
    .toEqual(['other', 3])
  );

  it('other:array', () =>
    expect(
      compound(['other', [1, 2]])
    )
    .toEqual(['other', [1, 2]])
  );
});
