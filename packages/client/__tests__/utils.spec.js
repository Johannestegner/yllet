import expect from 'expect';
import { isObject, objectKeysToSnakeCase, queryString } from '../src/utils';

describe('utils.isObject', () => {
  it('can test for objects', () => {
    [
      [true, {}],
      [false, 1],
      [false, false],
      [false, []],
      [false, ''],
      [false, 1.2],
      [false, new Error()]
    ].forEach(d => {
      expect(d[0]).toBe(isObject(d[1]));
    });
  });
});

describe('utils.objectKeysToSnakeCase', () => {
  it('can snake case object keys', () => {
    [
      [
        {
          test_data: 1
        },
        {
          testData: 1
        }
      ],
      [
        {
          test: {
            test_data: 1
          }
        },
        {
          test: {
            testData: 1
          }
        }
      ],
      [
        {
          abc: [
            {
              abc: {
                abc_data: 1
              }
            }
          ]
        },
        {
          abc: [
            {
              abc: {
                abcData: 1
              }
            }
          ]
        }
      ]
    ].forEach(d => {
      const obj = objectKeysToSnakeCase(d[1]);
      expect(d[0]).toEqual(obj);
    });
  });
});

describe('utils.queryString', () => {
  it('convert object to query string', () => {
    [
      [
        {
          a: 100,
          b: 'with spaces',
          c: [1, 2, 3],
          d: { x: 9, y: 8 }
        },
        'a=100&b=with%20spaces&c[]=1&c[]=2&c[]=3&d[x]=9&d[y]=8'
      ],
      [
        {
          foo: 'bar',
          posts: [21, 33, 150]
        },
        'foo=bar&posts[]=21&posts[]=33&posts[]=150'
      ]
    ].forEach(d => {
      const str = queryString(d[0]);
      expect(str).toEqual(d[1]);
    });
  });
});
