import root from './.internal/root.js';

/** Built-in value references. */
const Buffer = root.Buffer;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer && typeof Buffer.isBuffer === 'function' ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(new Buffer(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
const isBuffer = nativeIsBuffer || (() => false);

export default isBuffer;
