import test from 'node:test'
import assert from 'node:assert/strict'

import add from '../src/add.js'
import at from '../src/at.js'
import camelCase from '../src/camelCase.js'
import capitalize from '../src/capitalize.js'
import castArray from '../src/castArray.js'
import ceil from '../src/ceil.js'
import chunk from '../src/chunk.js'
import clamp from '../src/clamp.js'
import compact from '../src/compact.js'
import countBy from '../src/countBy.js'
import defaultTo from '../src/defaultTo.js'
import defaultToAny from '../src/defaultToAny.js'
import difference from '../src/difference.js'
import divide from '../src/divide.js'
import drop from '../src/drop.js'
import endsWith from '../src/endsWith.js'
import eq from '../src/eq.js'
import every from '../src/every.js'
import filter from '../src/filter.js'
import get from '../src/get.js'
import isArguments from '../src/isArguments.js'
import isArrayLike from '../src/isArrayLike.js'
import isArrayLikeObject from '../src/isArrayLikeObject.js'
import isBoolean from '../src/isBoolean.js'
import isBuffer from '../src/isBuffer.js'
import isDate from '../src/isDate.js'
import isEmpty from '../src/isEmpty.js'
import isLength from '../src/isLength.js'
import isObject from '../src/isObject.js'
import isObjectLike from '../src/isObjectLike.js'
import isSymbol from '../src/isSymbol.js'
import isTypedArray from '../src/isTypedArray.js'
import keys from '../src/keys.js'
import map from '../src/map.js'
import memoize from '../src/memoize.js'
import reduce from '../src/reduce.js'
import slice from '../src/slice.js'
import toFinite from '../src/toFinite.js'
import toInteger from '../src/toInteger.js'
import toNumber from '../src/toNumber.js'
import toStringFn from '../src/toString.js'
import upperFirst from '../src/upperFirst.js'
import words from '../src/words.js'

test('add adds numeric arguments', () => {
  assert.strictEqual(add(6, 4), 10)
})

test('at reads values at multiple deep paths', () => {
  const object = { a: [{ b: { c: 3 } }, 4] }
  assert.deepEqual(at(object, ['a[0].b.c', 'a[1]']), [3, 4])
})

test('camelCase normalizes punctuation', () => {
  assert.strictEqual(camelCase('--foo-bar--'), 'fooBar')
})

test('capitalize uppercases first character and lowercases rest', () => {
  assert.strictEqual(capitalize('FRED'), 'Fred')
})

test('castArray wraps non-arrays and leaves arrays intact', () => {
  const array = [1, 2, 3]
  assert.strictEqual(castArray(array), array)
  assert.deepEqual(castArray(1), [1])
  assert.deepEqual(castArray(), [])
})

test('ceil respects precision', () => {
  assert.strictEqual(ceil(6.004, 2), 6.01)
  assert.strictEqual(ceil(6040, -2), 6100)
})

test('chunk splits arrays into requested sizes', () => {
  assert.deepEqual(chunk(['a', 'b', 'c', 'd'], 3), [['a', 'b', 'c'], ['d']])
})

test('clamp keeps number within bounds', () => {
  assert.strictEqual(clamp(10, -5, 5), 5)
  assert.strictEqual(clamp(-10, -5, 5), -5)
})

test('compact removes falsey values', () => {
  assert.deepEqual(compact([0, 1, false, 2, '', 3]), [1, 2, 3])
})

test('countBy tallies iteratee results', () => {
  const counts = countBy([6.1, 4.2, 6.3], Math.floor)
  assert.deepEqual(counts, { 4: 1, 6: 2 })
})

test('defaultTo falls back for nullish and NaN values', () => {
  assert.strictEqual(defaultTo(undefined, 10), 10)
  assert.strictEqual(defaultTo(NaN, 10), 10)
  assert.strictEqual(defaultTo('value', 10), 'value')
})

test('defaultToAny resolves first valid default', () => {
  assert.strictEqual(defaultToAny(undefined, null, NaN, 'fallback'), 'fallback')
  assert.strictEqual(defaultToAny(1, 2, 3), 1)
})

test('difference excludes provided values', () => {
  assert.deepEqual(difference([2, 1], [2, 3]), [1])
})

test('divide performs division', () => {
  assert.strictEqual(divide(6, 4), 1.5)
})

test('drop removes n elements from start', () => {
  assert.deepEqual(drop([1, 2, 3], 2), [3])
  assert.deepEqual(drop([1, 2, 3], 5), [])
})

test('endsWith honors optional position argument', () => {
  assert.strictEqual(endsWith('abc', 'c'), true)
  assert.strictEqual(endsWith('abc', 'b', 2), true)
  assert.strictEqual(endsWith('abc', 'b'), false)
})

test('eq performs SameValueZero comparison', () => {
  const object = { a: 1 }
  assert.strictEqual(eq(object, object), true)
  assert.strictEqual(eq(object, { a: 1 }), false)
  assert.strictEqual(eq(NaN, NaN), true)
})

test('every validates predicates for all entries', () => {
  assert.strictEqual(every([2, 4, 6], (n) => n % 2 === 0), true)
  assert.strictEqual(every([true, 1, null], Boolean), false)
  assert.strictEqual(every([], () => false), true)
})

test('filter returns only matching values', () => {
  assert.deepEqual(filter([1, 2, 3], (n) => n > 1), [2, 3])
  assert.deepEqual(filter([1], (n) => n > 1), [])
})

test('get resolves deep paths with default fallback', () => {
  const object = { a: [{ b: { c: 3 } }] }
  assert.strictEqual(get(object, 'a[0].b.c'), 3)
  assert.strictEqual(get(object, 'a.b.c', 'default'), 'default')
})

test('isArguments detects arguments objects', () => {
  function getArgs() {
    return arguments
  }
  assert.strictEqual(isArguments(getArgs(1, 2)), true)
  assert.strictEqual(isArguments([1, 2]), false)
})

test('isArrayLike checks for non-function values with valid length', () => {
  assert.strictEqual(isArrayLike('abc'), true)
  assert.strictEqual(isArrayLike(() => {}), false)
})

test('isArrayLikeObject additionally requires object-like values', () => {
  assert.strictEqual(isArrayLikeObject([1, 2, 3]), true)
  assert.strictEqual(isArrayLikeObject('abc'), false)
})

test('isBoolean handles primitives and objects', () => {
  assert.strictEqual(isBoolean(false), true)
  assert.strictEqual(isBoolean(new Boolean(true)), true) // eslint-disable-line no-new-wrappers
  assert.strictEqual(isBoolean(null), false)
})

test('isBuffer distinguishes Buffer instances', () => {
  assert.strictEqual(isBuffer(Buffer.from('a')), true)
  assert.strictEqual(isBuffer(new Uint8Array(2)), false)
})

test('isDate matches Date objects only', () => {
  assert.strictEqual(isDate(new Date()), true)
  assert.strictEqual(isDate('2020-01-01'), false)
})

test('isEmpty handles arrays, objects, maps, sets', () => {
  assert.strictEqual(isEmpty(null), true)
  assert.strictEqual(isEmpty([]), true)
  assert.strictEqual(isEmpty([1]), false)
  assert.strictEqual(isEmpty({}), true)
  assert.strictEqual(isEmpty({ a: 1 }), false)
  assert.strictEqual(isEmpty(new Set()), true)
  assert.strictEqual(isEmpty(new Set([1])), false)
})

test('isLength returns true only for valid array lengths', () => {
  assert.strictEqual(isLength(3), true)
  assert.strictEqual(isLength(Number.MIN_VALUE), false)
  assert.strictEqual(isLength(-1), false)
  assert.strictEqual(isLength(Infinity), false)
})

test('isObject returns true for objects and functions, not null', () => {
  assert.strictEqual(isObject({}), true)
  assert.strictEqual(isObject(() => {}), true)
  assert.strictEqual(isObject(null), false)
})

test('isObjectLike excludes functions and null', () => {
  assert.strictEqual(isObjectLike({}), true)
  assert.strictEqual(isObjectLike(() => {}), false)
  assert.strictEqual(isObjectLike(null), false)
})

test('isSymbol covers primitives and objects', () => {
  assert.strictEqual(isSymbol(Symbol.iterator), true)
  assert.strictEqual(isSymbol(Object(Symbol('a'))), true)
  assert.strictEqual(isSymbol('a'), false)
})

test('isTypedArray checks typed array instances', () => {
  assert.strictEqual(isTypedArray(new Uint8Array()), true)
  assert.strictEqual(isTypedArray([]), false)
})

test('keys returns enumerable own keys', () => {
  function Foo() {
    this.a = 1
    this.b = 2
  }
  Foo.prototype.c = 3
  const fooKeys = keys(new Foo()).sort()
  assert.deepEqual(fooKeys, ['a', 'b'])
  assert.deepEqual(keys('hi'), ['0', '1'])
})

test('map maps every element with iteratee', () => {
  assert.deepEqual(map([4, 8], (n) => n * n), [16, 64])
})

test('memoize caches results and exposes cache', () => {
  let calls = 0
  const double = memoize((n) => {
    calls += 1
    return n * 2
  })
  assert.strictEqual(double(2), 4)
  assert.strictEqual(double(2), 4)
  assert.strictEqual(calls, 1)
  double.cache.set(3, 9)
  assert.strictEqual(double(3), 9)
})

test('reduce accumulates arrays and objects', () => {
  assert.strictEqual(reduce([1, 2], (sum, n) => sum + n, 0), 3)
  const grouped = reduce({ a: 1, b: 2, c: 1 }, (result, value, key) => {
    (result[value] || (result[value] = [])).push(key)
    return result
  }, {})
  assert.deepEqual(grouped, { 1: ['a', 'c'], 2: ['b'] })
})

test('slice mirrors Array#slice semantics', () => {
  assert.deepEqual(slice([1, 2, 3, 4], 1, 3), [2, 3])
  assert.deepEqual(slice([1, 2, 3], -2), [2, 3])
})

test('toFinite converts infinity to max finite value', () => {
  assert.strictEqual(toFinite(Infinity), Number.MAX_VALUE)
  assert.strictEqual(toFinite('3.2'), 3.2)
})

test('toInteger floors toward zero', () => {
  assert.strictEqual(toInteger(3.2), 3)
  assert.strictEqual(toInteger(Number.MIN_VALUE), 0)
})

test('toNumber handles binary strings and symbols', () => {
  assert.strictEqual(toNumber('0b10'), 2)
  assert.ok(Number.isNaN(toNumber(Symbol('a'))))
})

test('toString converts nullish and preserves -0', () => {
  assert.strictEqual(toStringFn(null), '')
  assert.strictEqual(toStringFn(-0), '-0')
  assert.strictEqual(toStringFn([1, [2]]), '1,2')
})

test('upperFirst capitalizes only the first character', () => {
  assert.strictEqual(upperFirst('fred'), 'Fred')
})

test('words splits ASCII and unicode text, defaulting to empty string', () => {
  assert.deepEqual(words('fred, barney, & pebbles'), ['fred', 'barney', 'pebbles'])
  assert.deepEqual(words(undefined), [])
  assert.deepEqual(words('fred, barney, & pebbles', /[^, ]+/g), ['fred', 'barney', '&', 'pebbles'])
})
