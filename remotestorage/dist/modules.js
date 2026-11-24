var PonderSourceModules = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed2 = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed2)) return i;
          buf[offset + i] = parsed2;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/readable-stream/lib/ours/primordials.js
  var require_primordials = __commonJS({
    "node_modules/readable-stream/lib/ours/primordials.js"(exports, module) {
      "use strict";
      var AggregateError = class extends Error {
        constructor(errors) {
          if (!Array.isArray(errors)) {
            throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
          }
          let message = "";
          for (let i = 0; i < errors.length; i++) {
            message += `    ${errors[i].stack}
`;
          }
          super(message);
          this.name = "AggregateError";
          this.errors = errors;
        }
      };
      module.exports = {
        AggregateError,
        ArrayIsArray(self2) {
          return Array.isArray(self2);
        },
        ArrayPrototypeIncludes(self2, el) {
          return self2.includes(el);
        },
        ArrayPrototypeIndexOf(self2, el) {
          return self2.indexOf(el);
        },
        ArrayPrototypeJoin(self2, sep) {
          return self2.join(sep);
        },
        ArrayPrototypeMap(self2, fn) {
          return self2.map(fn);
        },
        ArrayPrototypePop(self2, el) {
          return self2.pop(el);
        },
        ArrayPrototypePush(self2, el) {
          return self2.push(el);
        },
        ArrayPrototypeSlice(self2, start, end) {
          return self2.slice(start, end);
        },
        Error,
        FunctionPrototypeCall(fn, thisArgs, ...args) {
          return fn.call(thisArgs, ...args);
        },
        FunctionPrototypeSymbolHasInstance(self2, instance) {
          return Function.prototype[Symbol.hasInstance].call(self2, instance);
        },
        MathFloor: Math.floor,
        Number,
        NumberIsInteger: Number.isInteger,
        NumberIsNaN: Number.isNaN,
        NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
        NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
        NumberParseInt: Number.parseInt,
        ObjectDefineProperties(self2, props) {
          return Object.defineProperties(self2, props);
        },
        ObjectDefineProperty(self2, name, prop2) {
          return Object.defineProperty(self2, name, prop2);
        },
        ObjectGetOwnPropertyDescriptor(self2, name) {
          return Object.getOwnPropertyDescriptor(self2, name);
        },
        ObjectKeys(obj) {
          return Object.keys(obj);
        },
        ObjectSetPrototypeOf(target, proto) {
          return Object.setPrototypeOf(target, proto);
        },
        Promise,
        PromisePrototypeCatch(self2, fn) {
          return self2.catch(fn);
        },
        PromisePrototypeThen(self2, thenFn, catchFn) {
          return self2.then(thenFn, catchFn);
        },
        PromiseReject(err) {
          return Promise.reject(err);
        },
        PromiseResolve(val) {
          return Promise.resolve(val);
        },
        ReflectApply: Reflect.apply,
        RegExpPrototypeTest(self2, value) {
          return self2.test(value);
        },
        SafeSet: Set,
        String,
        StringPrototypeSlice(self2, start, end) {
          return self2.slice(start, end);
        },
        StringPrototypeToLowerCase(self2) {
          return self2.toLowerCase();
        },
        StringPrototypeToUpperCase(self2) {
          return self2.toUpperCase();
        },
        StringPrototypeTrim(self2) {
          return self2.trim();
        },
        Symbol,
        SymbolFor: Symbol.for,
        SymbolAsyncIterator: Symbol.asyncIterator,
        SymbolHasInstance: Symbol.hasInstance,
        SymbolIterator: Symbol.iterator,
        SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
        SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
        TypedArrayPrototypeSet(self2, buf, len) {
          return self2.set(buf, len);
        },
        Boolean,
        Uint8Array
      };
    }
  });

  // node_modules/readable-stream/lib/ours/util/inspect.js
  var require_inspect = __commonJS({
    "node_modules/readable-stream/lib/ours/util/inspect.js"(exports, module) {
      "use strict";
      module.exports = {
        format(format, ...args) {
          return format.replace(/%([sdifj])/g, function(...[_unused, type]) {
            const replacement = args.shift();
            if (type === "f") {
              return replacement.toFixed(6);
            } else if (type === "j") {
              return JSON.stringify(replacement);
            } else if (type === "s" && typeof replacement === "object") {
              const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
              return `${ctor} {}`.trim();
            } else {
              return replacement.toString();
            }
          });
        },
        inspect(value) {
          switch (typeof value) {
            case "string":
              if (value.includes("'")) {
                if (!value.includes('"')) {
                  return `"${value}"`;
                } else if (!value.includes("`") && !value.includes("${")) {
                  return `\`${value}\``;
                }
              }
              return `'${value}'`;
            case "number":
              if (isNaN(value)) {
                return "NaN";
              } else if (Object.is(value, -0)) {
                return String(value);
              }
              return value;
            case "bigint":
              return `${String(value)}n`;
            case "boolean":
            case "undefined":
              return String(value);
            case "object":
              return "{}";
          }
        }
      };
    }
  });

  // node_modules/readable-stream/lib/ours/errors.js
  var require_errors = __commonJS({
    "node_modules/readable-stream/lib/ours/errors.js"(exports, module) {
      "use strict";
      var { format, inspect } = require_inspect();
      var { AggregateError: CustomAggregateError } = require_primordials();
      var AggregateError = globalThis.AggregateError || CustomAggregateError;
      var kIsNodeError = Symbol("kIsNodeError");
      var kTypes = [
        "string",
        "function",
        "number",
        "object",
        // Accept 'Function' and 'Object' as alternative to the lower cased version.
        "Function",
        "Object",
        "boolean",
        "bigint",
        "symbol"
      ];
      var classRegExp = /^([A-Z][a-z0-9]*)+$/;
      var nodeInternalPrefix = "__node_internal_";
      var codes = {};
      function assert(value, message) {
        if (!value) {
          throw new codes.ERR_INTERNAL_ASSERTION(message);
        }
      }
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function getMessage(key, msg, args) {
        if (typeof msg === "function") {
          assert(
            msg.length <= args.length,
            // Default options do not count.
            `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
          );
          return msg(...args);
        }
        const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
        assert(
          expectedLength === args.length,
          `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
        );
        if (args.length === 0) {
          return msg;
        }
        return format(msg, ...args);
      }
      function E(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        class NodeError extends Base {
          constructor(...args) {
            super(getMessage(code, message, args));
          }
          toString() {
            return `${this.name} [${code}]: ${this.message}`;
          }
        }
        Object.defineProperties(NodeError.prototype, {
          name: {
            value: Base.name,
            writable: true,
            enumerable: false,
            configurable: true
          },
          toString: {
            value() {
              return `${this.name} [${code}]: ${this.message}`;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        NodeError.prototype.code = code;
        NodeError.prototype[kIsNodeError] = true;
        codes[code] = NodeError;
      }
      function hideStackFrames(fn) {
        const hidden = nodeInternalPrefix + fn.name;
        Object.defineProperty(fn, "name", {
          value: hidden
        });
        return fn;
      }
      function aggregateTwoErrors(innerError, outerError) {
        if (innerError && outerError && innerError !== outerError) {
          if (Array.isArray(outerError.errors)) {
            outerError.errors.push(innerError);
            return outerError;
          }
          const err = new AggregateError([outerError, innerError], outerError.message);
          err.code = outerError.code;
          return err;
        }
        return innerError || outerError;
      }
      var AbortError = class extends Error {
        constructor(message = "The operation was aborted", options = void 0) {
          if (options !== void 0 && typeof options !== "object") {
            throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
          }
          super(message, options);
          this.code = "ABORT_ERR";
          this.name = "AbortError";
        }
      };
      E("ERR_ASSERTION", "%s", Error);
      E(
        "ERR_INVALID_ARG_TYPE",
        (name, expected, actual) => {
          assert(typeof name === "string", "'name' must be a string");
          if (!Array.isArray(expected)) {
            expected = [expected];
          }
          let msg = "The ";
          if (name.endsWith(" argument")) {
            msg += `${name} `;
          } else {
            msg += `"${name}" ${name.includes(".") ? "property" : "argument"} `;
          }
          msg += "must be ";
          const types = [];
          const instances = [];
          const other = [];
          for (const value of expected) {
            assert(typeof value === "string", "All expected entries have to be of type string");
            if (kTypes.includes(value)) {
              types.push(value.toLowerCase());
            } else if (classRegExp.test(value)) {
              instances.push(value);
            } else {
              assert(value !== "object", 'The value "object" should be written as "Object"');
              other.push(value);
            }
          }
          if (instances.length > 0) {
            const pos = types.indexOf("object");
            if (pos !== -1) {
              types.splice(types, pos, 1);
              instances.push("Object");
            }
          }
          if (types.length > 0) {
            switch (types.length) {
              case 1:
                msg += `of type ${types[0]}`;
                break;
              case 2:
                msg += `one of type ${types[0]} or ${types[1]}`;
                break;
              default: {
                const last = types.pop();
                msg += `one of type ${types.join(", ")}, or ${last}`;
              }
            }
            if (instances.length > 0 || other.length > 0) {
              msg += " or ";
            }
          }
          if (instances.length > 0) {
            switch (instances.length) {
              case 1:
                msg += `an instance of ${instances[0]}`;
                break;
              case 2:
                msg += `an instance of ${instances[0]} or ${instances[1]}`;
                break;
              default: {
                const last = instances.pop();
                msg += `an instance of ${instances.join(", ")}, or ${last}`;
              }
            }
            if (other.length > 0) {
              msg += " or ";
            }
          }
          switch (other.length) {
            case 0:
              break;
            case 1:
              if (other[0].toLowerCase() !== other[0]) {
                msg += "an ";
              }
              msg += `${other[0]}`;
              break;
            case 2:
              msg += `one of ${other[0]} or ${other[1]}`;
              break;
            default: {
              const last = other.pop();
              msg += `one of ${other.join(", ")}, or ${last}`;
            }
          }
          if (actual == null) {
            msg += `. Received ${actual}`;
          } else if (typeof actual === "function" && actual.name) {
            msg += `. Received function ${actual.name}`;
          } else if (typeof actual === "object") {
            var _actual$constructor;
            if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
              msg += `. Received an instance of ${actual.constructor.name}`;
            } else {
              const inspected = inspect(actual, {
                depth: -1
              });
              msg += `. Received ${inspected}`;
            }
          } else {
            let inspected = inspect(actual, {
              colors: false
            });
            if (inspected.length > 25) {
              inspected = `${inspected.slice(0, 25)}...`;
            }
            msg += `. Received type ${typeof actual} (${inspected})`;
          }
          return msg;
        },
        TypeError
      );
      E(
        "ERR_INVALID_ARG_VALUE",
        (name, value, reason = "is invalid") => {
          let inspected = inspect(value);
          if (inspected.length > 128) {
            inspected = inspected.slice(0, 128) + "...";
          }
          const type = name.includes(".") ? "property" : "argument";
          return `The ${type} '${name}' ${reason}. Received ${inspected}`;
        },
        TypeError
      );
      E(
        "ERR_INVALID_RETURN_VALUE",
        (input, name, value) => {
          var _value$constructor;
          const type = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
          return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
        },
        TypeError
      );
      E(
        "ERR_MISSING_ARGS",
        (...args) => {
          assert(args.length > 0, "At least one arg needs to be specified");
          let msg;
          const len = args.length;
          args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
          switch (len) {
            case 1:
              msg += `The ${args[0]} argument`;
              break;
            case 2:
              msg += `The ${args[0]} and ${args[1]} arguments`;
              break;
            default:
              {
                const last = args.pop();
                msg += `The ${args.join(", ")}, and ${last} arguments`;
              }
              break;
          }
          return `${msg} must be specified`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        (str, range, input) => {
          assert(range, 'Missing "range" argument');
          let received;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            const limit = BigInt(2) ** BigInt(32);
            if (input > limit || input < -limit) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          } else {
            received = inspect(input);
          }
          return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
        },
        RangeError
      );
      E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
      E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
      E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
      E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
      E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
      E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
      E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
      E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
      E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
      E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
      module.exports = {
        AbortError,
        aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
        hideStackFrames,
        codes
      };
    }
  });

  // node_modules/abort-controller/browser.js
  var require_browser = __commonJS({
    "node_modules/abort-controller/browser.js"(exports, module) {
      "use strict";
      var { AbortController, AbortSignal } = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : (
        /* otherwise */
        void 0
      );
      module.exports = AbortController;
      module.exports.AbortSignal = AbortSignal;
      module.exports.default = AbortController;
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/readable-stream/lib/ours/util.js
  var require_util = __commonJS({
    "node_modules/readable-stream/lib/ours/util.js"(exports, module) {
      "use strict";
      var bufferModule = require_buffer();
      var { format, inspect } = require_inspect();
      var {
        codes: { ERR_INVALID_ARG_TYPE }
      } = require_errors();
      var { kResistStopPropagation, AggregateError, SymbolDispose } = require_primordials();
      var AbortSignal = globalThis.AbortSignal || require_browser().AbortSignal;
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
      var Blob = globalThis.Blob || bufferModule.Blob;
      var isBlob = typeof Blob !== "undefined" ? function isBlob2(b) {
        return b instanceof Blob;
      } : function isBlob2(b) {
        return false;
      };
      var validateAbortSignal = (signal, name) => {
        if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
          throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
        }
      };
      var validateFunction = (value, name) => {
        if (typeof value !== "function") {
          throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
        }
      };
      module.exports = {
        AggregateError,
        kEmptyObject: Object.freeze({}),
        once(callback) {
          let called = false;
          return function(...args) {
            if (called) {
              return;
            }
            called = true;
            callback.apply(this, args);
          };
        },
        createDeferredPromise: function() {
          let resolve;
          let reject;
          const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
          return {
            promise,
            resolve,
            reject
          };
        },
        promisify(fn) {
          return new Promise((resolve, reject) => {
            fn((err, ...args) => {
              if (err) {
                return reject(err);
              }
              return resolve(...args);
            });
          });
        },
        debuglog() {
          return function() {
          };
        },
        format,
        inspect,
        types: {
          isAsyncFunction(fn) {
            return fn instanceof AsyncFunction;
          },
          isArrayBufferView(arr) {
            return ArrayBuffer.isView(arr);
          }
        },
        isBlob,
        deprecate(fn, message) {
          return fn;
        },
        addAbortListener: require_events().addAbortListener || function addAbortListener(signal, listener) {
          if (signal === void 0) {
            throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
          }
          validateAbortSignal(signal, "signal");
          validateFunction(listener, "listener");
          let removeEventListener;
          if (signal.aborted) {
            queueMicrotask(() => listener());
          } else {
            signal.addEventListener("abort", listener, {
              __proto__: null,
              once: true,
              [kResistStopPropagation]: true
            });
            removeEventListener = () => {
              signal.removeEventListener("abort", listener);
            };
          }
          return {
            __proto__: null,
            [SymbolDispose]() {
              var _removeEventListener;
              (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
            }
          };
        },
        AbortSignalAny: AbortSignal.any || function AbortSignalAny(signals) {
          if (signals.length === 1) {
            return signals[0];
          }
          const ac = new AbortController();
          const abort = () => ac.abort();
          signals.forEach((signal) => {
            validateAbortSignal(signal, "signals");
            signal.addEventListener("abort", abort, {
              once: true
            });
          });
          ac.signal.addEventListener(
            "abort",
            () => {
              signals.forEach((signal) => signal.removeEventListener("abort", abort));
            },
            {
              once: true
            }
          );
          return ac.signal;
        }
      };
      module.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
    }
  });

  // node_modules/readable-stream/lib/internal/validators.js
  var require_validators = __commonJS({
    "node_modules/readable-stream/lib/internal/validators.js"(exports, module) {
      "use strict";
      var {
        ArrayIsArray,
        ArrayPrototypeIncludes,
        ArrayPrototypeJoin,
        ArrayPrototypeMap,
        NumberIsInteger,
        NumberIsNaN,
        NumberMAX_SAFE_INTEGER,
        NumberMIN_SAFE_INTEGER,
        NumberParseInt,
        ObjectPrototypeHasOwnProperty,
        RegExpPrototypeExec,
        String: String2,
        StringPrototypeToUpperCase,
        StringPrototypeTrim
      } = require_primordials();
      var {
        hideStackFrames,
        codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
      } = require_errors();
      var { normalizeEncoding } = require_util();
      var { isAsyncFunction, isArrayBufferView } = require_util().types;
      var signals = {};
      function isInt32(value) {
        return value === (value | 0);
      }
      function isUint32(value) {
        return value === value >>> 0;
      }
      var octalReg = /^[0-7]+$/;
      var modeDesc = "must be a 32-bit unsigned integer or an octal string";
      function parseFileMode(value, name, def) {
        if (typeof value === "undefined") {
          value = def;
        }
        if (typeof value === "string") {
          if (RegExpPrototypeExec(octalReg, value) === null) {
            throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc);
          }
          value = NumberParseInt(value, 8);
        }
        validateUint32(value, name);
        return value;
      }
      var validateInteger = hideStackFrames((value, name, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
        if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
        if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, "an integer", value);
        if (value < min || value > max) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
      });
      var validateInt32 = hideStackFrames((value, name, min = -2147483648, max = 2147483647) => {
        if (typeof value !== "number") {
          throw new ERR_INVALID_ARG_TYPE(name, "number", value);
        }
        if (!NumberIsInteger(value)) {
          throw new ERR_OUT_OF_RANGE(name, "an integer", value);
        }
        if (value < min || value > max) {
          throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
        }
      });
      var validateUint32 = hideStackFrames((value, name, positive = false) => {
        if (typeof value !== "number") {
          throw new ERR_INVALID_ARG_TYPE(name, "number", value);
        }
        if (!NumberIsInteger(value)) {
          throw new ERR_OUT_OF_RANGE(name, "an integer", value);
        }
        const min = positive ? 1 : 0;
        const max = 4294967295;
        if (value < min || value > max) {
          throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
        }
      });
      function validateString(value, name) {
        if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name, "string", value);
      }
      function validateNumber(value, name, min = void 0, max) {
        if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
        if (min != null && value < min || max != null && value > max || (min != null || max != null) && NumberIsNaN(value)) {
          throw new ERR_OUT_OF_RANGE(
            name,
            `${min != null ? `>= ${min}` : ""}${min != null && max != null ? " && " : ""}${max != null ? `<= ${max}` : ""}`,
            value
          );
        }
      }
      var validateOneOf = hideStackFrames((value, name, oneOf) => {
        if (!ArrayPrototypeIncludes(oneOf, value)) {
          const allowed = ArrayPrototypeJoin(
            ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
            ", "
          );
          const reason = "must be one of: " + allowed;
          throw new ERR_INVALID_ARG_VALUE(name, value, reason);
        }
      });
      function validateBoolean(value, name) {
        if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name, "boolean", value);
      }
      function getOwnPropertyValueOrDefault(options, key, defaultValue) {
        return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key];
      }
      var validateObject = hideStackFrames((value, name, options = null) => {
        const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
        const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
        const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
        if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
          throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        }
      });
      var validateDictionary = hideStackFrames((value, name) => {
        if (value != null && typeof value !== "object" && typeof value !== "function") {
          throw new ERR_INVALID_ARG_TYPE(name, "a dictionary", value);
        }
      });
      var validateArray = hideStackFrames((value, name, minLength = 0) => {
        if (!ArrayIsArray(value)) {
          throw new ERR_INVALID_ARG_TYPE(name, "Array", value);
        }
        if (value.length < minLength) {
          const reason = `must be longer than ${minLength}`;
          throw new ERR_INVALID_ARG_VALUE(name, value, reason);
        }
      });
      function validateStringArray(value, name) {
        validateArray(value, name);
        for (let i = 0; i < value.length; i++) {
          validateString(value[i], `${name}[${i}]`);
        }
      }
      function validateBooleanArray(value, name) {
        validateArray(value, name);
        for (let i = 0; i < value.length; i++) {
          validateBoolean(value[i], `${name}[${i}]`);
        }
      }
      function validateAbortSignalArray(value, name) {
        validateArray(value, name);
        for (let i = 0; i < value.length; i++) {
          const signal = value[i];
          const indexedName = `${name}[${i}]`;
          if (signal == null) {
            throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
          }
          validateAbortSignal(signal, indexedName);
        }
      }
      function validateSignalName(signal, name = "signal") {
        validateString(signal, name);
        if (signals[signal] === void 0) {
          if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
            throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
          }
          throw new ERR_UNKNOWN_SIGNAL(signal);
        }
      }
      var validateBuffer = hideStackFrames((buffer, name = "buffer") => {
        if (!isArrayBufferView(buffer)) {
          throw new ERR_INVALID_ARG_TYPE(name, ["Buffer", "TypedArray", "DataView"], buffer);
        }
      });
      function validateEncoding(data, encoding) {
        const normalizedEncoding = normalizeEncoding(encoding);
        const length = data.length;
        if (normalizedEncoding === "hex" && length % 2 !== 0) {
          throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
        }
      }
      function validatePort(port, name = "Port", allowZero = true) {
        if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
          throw new ERR_SOCKET_BAD_PORT(name, port, allowZero);
        }
        return port | 0;
      }
      var validateAbortSignal = hideStackFrames((signal, name) => {
        if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
          throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
        }
      });
      var validateFunction = hideStackFrames((value, name) => {
        if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      });
      var validatePlainFunction = hideStackFrames((value, name) => {
        if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      });
      var validateUndefined = hideStackFrames((value, name) => {
        if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name, "undefined", value);
      });
      function validateUnion(value, name, union) {
        if (!ArrayPrototypeIncludes(union, value)) {
          throw new ERR_INVALID_ARG_TYPE(name, `('${ArrayPrototypeJoin(union, "|")}')`, value);
        }
      }
      var linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
      function validateLinkHeaderFormat(value, name) {
        if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
          throw new ERR_INVALID_ARG_VALUE(
            name,
            value,
            'must be an array or string of format "</styles.css>; rel=preload; as=style"'
          );
        }
      }
      function validateLinkHeaderValue(hints) {
        if (typeof hints === "string") {
          validateLinkHeaderFormat(hints, "hints");
          return hints;
        } else if (ArrayIsArray(hints)) {
          const hintsLength = hints.length;
          let result = "";
          if (hintsLength === 0) {
            return result;
          }
          for (let i = 0; i < hintsLength; i++) {
            const link = hints[i];
            validateLinkHeaderFormat(link, "hints");
            result += link;
            if (i !== hintsLength - 1) {
              result += ", ";
            }
          }
          return result;
        }
        throw new ERR_INVALID_ARG_VALUE(
          "hints",
          hints,
          'must be an array or string of format "</styles.css>; rel=preload; as=style"'
        );
      }
      module.exports = {
        isInt32,
        isUint32,
        parseFileMode,
        validateArray,
        validateStringArray,
        validateBooleanArray,
        validateAbortSignalArray,
        validateBoolean,
        validateBuffer,
        validateDictionary,
        validateEncoding,
        validateFunction,
        validateInt32,
        validateInteger,
        validateNumber,
        validateObject,
        validateOneOf,
        validatePlainFunction,
        validatePort,
        validateSignalName,
        validateString,
        validateUint32,
        validateUndefined,
        validateUnion,
        validateAbortSignal,
        validateLinkHeaderValue
      };
    }
  });

  // node_modules/process/browser.js
  var require_browser2 = __commonJS({
    "node_modules/process/browser.js"(exports, module) {
      var process = module.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop2() {
      }
      process.on = noop2;
      process.addListener = noop2;
      process.once = noop2;
      process.off = noop2;
      process.removeListener = noop2;
      process.removeAllListeners = noop2;
      process.emit = noop2;
      process.prependListener = noop2;
      process.prependOnceListener = noop2;
      process.listeners = function(name) {
        return [];
      };
      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/shims/process.js
  var require_process = __commonJS({
    "node_modules/readable-stream/lib/internal/shims/process.js"(exports, module) {
      "use strict";
      var process = ((base, esmKey, keys, isValid) => {
        if (esmKey in base && base[esmKey] === true) {
          let candidate;
          for (const key of keys) {
            if (!(key in base)) {
              continue;
            }
            candidate = base[key];
            if (isValid(candidate)) {
              return candidate;
            }
          }
        }
        return base;
      })(require_browser2(), "__esModule", ["default", "process"], (candidate) => "nextTick" in candidate);
      module.exports = process;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/utils.js
  var require_utils = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/utils.js"(exports, module) {
      "use strict";
      var { SymbolAsyncIterator, SymbolIterator, SymbolFor } = require_primordials();
      var kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
      var kIsErrored = SymbolFor("nodejs.stream.errored");
      var kIsReadable = SymbolFor("nodejs.stream.readable");
      var kIsWritable = SymbolFor("nodejs.stream.writable");
      var kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
      var kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
      var kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
      function isReadableNodeStream(obj, strict = false) {
        var _obj$_readableState;
        return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
        (!obj._writableState || obj._readableState));
      }
      function isWritableNodeStream(obj) {
        var _obj$_writableState;
        return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
      }
      function isDuplexNodeStream(obj) {
        return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
      }
      function isNodeStream(obj) {
        return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
      }
      function isReadableStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
      }
      function isWritableStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
      }
      function isTransformStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
      }
      function isWebStream(obj) {
        return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
      }
      function isIterable(obj, isAsync) {
        if (obj == null) return false;
        if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
        if (isAsync === false) return typeof obj[SymbolIterator] === "function";
        return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
      }
      function isDestroyed(stream) {
        if (!isNodeStream(stream)) return null;
        const wState = stream._writableState;
        const rState = stream._readableState;
        const state = wState || rState;
        return !!(stream.destroyed || stream[kIsDestroyed] || state !== null && state !== void 0 && state.destroyed);
      }
      function isWritableEnded(stream) {
        if (!isWritableNodeStream(stream)) return null;
        if (stream.writableEnded === true) return true;
        const wState = stream._writableState;
        if (wState !== null && wState !== void 0 && wState.errored) return false;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
        return wState.ended;
      }
      function isWritableFinished(stream, strict) {
        if (!isWritableNodeStream(stream)) return null;
        if (stream.writableFinished === true) return true;
        const wState = stream._writableState;
        if (wState !== null && wState !== void 0 && wState.errored) return false;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
        return !!(wState.finished || strict === false && wState.ended === true && wState.length === 0);
      }
      function isReadableEnded(stream) {
        if (!isReadableNodeStream(stream)) return null;
        if (stream.readableEnded === true) return true;
        const rState = stream._readableState;
        if (!rState || rState.errored) return false;
        if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
        return rState.ended;
      }
      function isReadableFinished(stream, strict) {
        if (!isReadableNodeStream(stream)) return null;
        const rState = stream._readableState;
        if (rState !== null && rState !== void 0 && rState.errored) return false;
        if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
        return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
      }
      function isReadable(stream) {
        if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
        if (typeof (stream === null || stream === void 0 ? void 0 : stream.readable) !== "boolean") return null;
        if (isDestroyed(stream)) return false;
        return isReadableNodeStream(stream) && stream.readable && !isReadableFinished(stream);
      }
      function isWritable(stream) {
        if (stream && stream[kIsWritable] != null) return stream[kIsWritable];
        if (typeof (stream === null || stream === void 0 ? void 0 : stream.writable) !== "boolean") return null;
        if (isDestroyed(stream)) return false;
        return isWritableNodeStream(stream) && stream.writable && !isWritableEnded(stream);
      }
      function isFinished(stream, opts) {
        if (!isNodeStream(stream)) {
          return null;
        }
        if (isDestroyed(stream)) {
          return true;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable(stream)) {
          return false;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable(stream)) {
          return false;
        }
        return true;
      }
      function isWritableErrored(stream) {
        var _stream$_writableStat, _stream$_writableStat2;
        if (!isNodeStream(stream)) {
          return null;
        }
        if (stream.writableErrored) {
          return stream.writableErrored;
        }
        return (_stream$_writableStat = (_stream$_writableStat2 = stream._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
      }
      function isReadableErrored(stream) {
        var _stream$_readableStat, _stream$_readableStat2;
        if (!isNodeStream(stream)) {
          return null;
        }
        if (stream.readableErrored) {
          return stream.readableErrored;
        }
        return (_stream$_readableStat = (_stream$_readableStat2 = stream._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
      }
      function isClosed(stream) {
        if (!isNodeStream(stream)) {
          return null;
        }
        if (typeof stream.closed === "boolean") {
          return stream.closed;
        }
        const wState = stream._writableState;
        const rState = stream._readableState;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
          return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
        }
        if (typeof stream._closed === "boolean" && isOutgoingMessage(stream)) {
          return stream._closed;
        }
        return null;
      }
      function isOutgoingMessage(stream) {
        return typeof stream._closed === "boolean" && typeof stream._defaultKeepAlive === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean";
      }
      function isServerResponse(stream) {
        return typeof stream._sent100 === "boolean" && isOutgoingMessage(stream);
      }
      function isServerRequest(stream) {
        var _stream$req;
        return typeof stream._consuming === "boolean" && typeof stream._dumped === "boolean" && ((_stream$req = stream.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
      }
      function willEmitClose(stream) {
        if (!isNodeStream(stream)) return null;
        const wState = stream._writableState;
        const rState = stream._readableState;
        const state = wState || rState;
        return !state && isServerResponse(stream) || !!(state && state.autoDestroy && state.emitClose && state.closed === false);
      }
      function isDisturbed(stream) {
        var _stream$kIsDisturbed;
        return !!(stream && ((_stream$kIsDisturbed = stream[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream.readableDidRead || stream.readableAborted));
      }
      function isErrored(stream) {
        var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
        return !!(stream && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
      }
      module.exports = {
        isDestroyed,
        kIsDestroyed,
        isDisturbed,
        kIsDisturbed,
        isErrored,
        kIsErrored,
        isReadable,
        kIsReadable,
        kIsClosedPromise,
        kControllerErrorFunction,
        kIsWritable,
        isClosed,
        isDuplexNodeStream,
        isFinished,
        isIterable,
        isReadableNodeStream,
        isReadableStream,
        isReadableEnded,
        isReadableFinished,
        isReadableErrored,
        isNodeStream,
        isWebStream,
        isWritable,
        isWritableNodeStream,
        isWritableStream,
        isWritableEnded,
        isWritableFinished,
        isWritableErrored,
        isServerRequest,
        isServerResponse,
        willEmitClose,
        isTransformStream
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
      "use strict";
      var process = require_process();
      var { AbortError, codes } = require_errors();
      var { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes;
      var { kEmptyObject, once } = require_util();
      var { validateAbortSignal, validateFunction, validateObject, validateBoolean } = require_validators();
      var { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = require_primordials();
      var {
        isClosed,
        isReadable,
        isReadableNodeStream,
        isReadableStream,
        isReadableFinished,
        isReadableErrored,
        isWritable,
        isWritableNodeStream,
        isWritableStream,
        isWritableFinished,
        isWritableErrored,
        isNodeStream,
        willEmitClose: _willEmitClose,
        kIsClosedPromise
      } = require_utils();
      var addAbortListener;
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      var nop = () => {
      };
      function eos(stream, options, callback) {
        var _options$readable, _options$writable;
        if (arguments.length === 2) {
          callback = options;
          options = kEmptyObject;
        } else if (options == null) {
          options = kEmptyObject;
        } else {
          validateObject(options, "options");
        }
        validateFunction(callback, "callback");
        validateAbortSignal(options.signal, "options.signal");
        callback = once(callback);
        if (isReadableStream(stream) || isWritableStream(stream)) {
          return eosWeb(stream, options, callback);
        }
        if (!isNodeStream(stream)) {
          throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
        }
        const readable = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream);
        const writable = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream);
        const wState = stream._writableState;
        const rState = stream._readableState;
        const onlegacyfinish = () => {
          if (!stream.writable) {
            onfinish();
          }
        };
        let willEmitClose = _willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
        let writableFinished = isWritableFinished(stream, false);
        const onfinish = () => {
          writableFinished = true;
          if (stream.destroyed) {
            willEmitClose = false;
          }
          if (willEmitClose && (!stream.readable || readable)) {
            return;
          }
          if (!readable || readableFinished) {
            callback.call(stream);
          }
        };
        let readableFinished = isReadableFinished(stream, false);
        const onend = () => {
          readableFinished = true;
          if (stream.destroyed) {
            willEmitClose = false;
          }
          if (willEmitClose && (!stream.writable || writable)) {
            return;
          }
          if (!writable || writableFinished) {
            callback.call(stream);
          }
        };
        const onerror = (err) => {
          callback.call(stream, err);
        };
        let closed = isClosed(stream);
        const onclose = () => {
          closed = true;
          const errored = isWritableErrored(stream) || isReadableErrored(stream);
          if (errored && typeof errored !== "boolean") {
            return callback.call(stream, errored);
          }
          if (readable && !readableFinished && isReadableNodeStream(stream, true)) {
            if (!isReadableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
          }
          if (writable && !writableFinished) {
            if (!isWritableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
          }
          callback.call(stream);
        };
        const onclosed = () => {
          closed = true;
          const errored = isWritableErrored(stream) || isReadableErrored(stream);
          if (errored && typeof errored !== "boolean") {
            return callback.call(stream, errored);
          }
          callback.call(stream);
        };
        const onrequest = () => {
          stream.req.on("finish", onfinish);
        };
        if (isRequest(stream)) {
          stream.on("complete", onfinish);
          if (!willEmitClose) {
            stream.on("abort", onclose);
          }
          if (stream.req) {
            onrequest();
          } else {
            stream.on("request", onrequest);
          }
        } else if (writable && !wState) {
          stream.on("end", onlegacyfinish);
          stream.on("close", onlegacyfinish);
        }
        if (!willEmitClose && typeof stream.aborted === "boolean") {
          stream.on("aborted", onclose);
        }
        stream.on("end", onend);
        stream.on("finish", onfinish);
        if (options.error !== false) {
          stream.on("error", onerror);
        }
        stream.on("close", onclose);
        if (closed) {
          process.nextTick(onclose);
        } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
          if (!willEmitClose) {
            process.nextTick(onclosed);
          }
        } else if (!readable && (!willEmitClose || isReadable(stream)) && (writableFinished || isWritable(stream) === false)) {
          process.nextTick(onclosed);
        } else if (!writable && (!willEmitClose || isWritable(stream)) && (readableFinished || isReadable(stream) === false)) {
          process.nextTick(onclosed);
        } else if (rState && stream.req && stream.aborted) {
          process.nextTick(onclosed);
        }
        const cleanup = () => {
          callback = nop;
          stream.removeListener("aborted", onclose);
          stream.removeListener("complete", onfinish);
          stream.removeListener("abort", onclose);
          stream.removeListener("request", onrequest);
          if (stream.req) stream.req.removeListener("finish", onfinish);
          stream.removeListener("end", onlegacyfinish);
          stream.removeListener("close", onlegacyfinish);
          stream.removeListener("finish", onfinish);
          stream.removeListener("end", onend);
          stream.removeListener("error", onerror);
          stream.removeListener("close", onclose);
        };
        if (options.signal && !closed) {
          const abort = () => {
            const endCallback = callback;
            cleanup();
            endCallback.call(
              stream,
              new AbortError(void 0, {
                cause: options.signal.reason
              })
            );
          };
          if (options.signal.aborted) {
            process.nextTick(abort);
          } else {
            addAbortListener = addAbortListener || require_util().addAbortListener;
            const disposable = addAbortListener(options.signal, abort);
            const originalCallback = callback;
            callback = once((...args) => {
              disposable[SymbolDispose]();
              originalCallback.apply(stream, args);
            });
          }
        }
        return cleanup;
      }
      function eosWeb(stream, options, callback) {
        let isAborted = false;
        let abort = nop;
        if (options.signal) {
          abort = () => {
            isAborted = true;
            callback.call(
              stream,
              new AbortError(void 0, {
                cause: options.signal.reason
              })
            );
          };
          if (options.signal.aborted) {
            process.nextTick(abort);
          } else {
            addAbortListener = addAbortListener || require_util().addAbortListener;
            const disposable = addAbortListener(options.signal, abort);
            const originalCallback = callback;
            callback = once((...args) => {
              disposable[SymbolDispose]();
              originalCallback.apply(stream, args);
            });
          }
        }
        const resolverFn = (...args) => {
          if (!isAborted) {
            process.nextTick(() => callback.apply(stream, args));
          }
        };
        PromisePrototypeThen(stream[kIsClosedPromise].promise, resolverFn, resolverFn);
        return nop;
      }
      function finished(stream, opts) {
        var _opts;
        let autoCleanup = false;
        if (opts === null) {
          opts = kEmptyObject;
        }
        if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
          validateBoolean(opts.cleanup, "cleanup");
          autoCleanup = opts.cleanup;
        }
        return new Promise2((resolve, reject) => {
          const cleanup = eos(stream, opts, (err) => {
            if (autoCleanup) {
              cleanup();
            }
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
      module.exports = eos;
      module.exports.finished = finished;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
      "use strict";
      var process = require_process();
      var {
        aggregateTwoErrors,
        codes: { ERR_MULTIPLE_CALLBACK },
        AbortError
      } = require_errors();
      var { Symbol: Symbol2 } = require_primordials();
      var { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = require_utils();
      var kDestroy = Symbol2("kDestroy");
      var kConstruct = Symbol2("kConstruct");
      function checkError(err, w, r) {
        if (err) {
          err.stack;
          if (w && !w.errored) {
            w.errored = err;
          }
          if (r && !r.errored) {
            r.errored = err;
          }
        }
      }
      function destroy(err, cb) {
        const r = this._readableState;
        const w = this._writableState;
        const s = w || r;
        if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
          if (typeof cb === "function") {
            cb();
          }
          return this;
        }
        checkError(err, w, r);
        if (w) {
          w.destroyed = true;
        }
        if (r) {
          r.destroyed = true;
        }
        if (!s.constructed) {
          this.once(kDestroy, function(er) {
            _destroy(this, aggregateTwoErrors(er, err), cb);
          });
        } else {
          _destroy(this, err, cb);
        }
        return this;
      }
      function _destroy(self2, err, cb) {
        let called = false;
        function onDestroy(err2) {
          if (called) {
            return;
          }
          called = true;
          const r = self2._readableState;
          const w = self2._writableState;
          checkError(err2, w, r);
          if (w) {
            w.closed = true;
          }
          if (r) {
            r.closed = true;
          }
          if (typeof cb === "function") {
            cb(err2);
          }
          if (err2) {
            process.nextTick(emitErrorCloseNT, self2, err2);
          } else {
            process.nextTick(emitCloseNT, self2);
          }
        }
        try {
          self2._destroy(err || null, onDestroy);
        } catch (err2) {
          onDestroy(err2);
        }
      }
      function emitErrorCloseNT(self2, err) {
        emitErrorNT(self2, err);
        emitCloseNT(self2);
      }
      function emitCloseNT(self2) {
        const r = self2._readableState;
        const w = self2._writableState;
        if (w) {
          w.closeEmitted = true;
        }
        if (r) {
          r.closeEmitted = true;
        }
        if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
          self2.emit("close");
        }
      }
      function emitErrorNT(self2, err) {
        const r = self2._readableState;
        const w = self2._writableState;
        if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
          return;
        }
        if (w) {
          w.errorEmitted = true;
        }
        if (r) {
          r.errorEmitted = true;
        }
        self2.emit("error", err);
      }
      function undestroy() {
        const r = this._readableState;
        const w = this._writableState;
        if (r) {
          r.constructed = true;
          r.closed = false;
          r.closeEmitted = false;
          r.destroyed = false;
          r.errored = null;
          r.errorEmitted = false;
          r.reading = false;
          r.ended = r.readable === false;
          r.endEmitted = r.readable === false;
        }
        if (w) {
          w.constructed = true;
          w.destroyed = false;
          w.closed = false;
          w.closeEmitted = false;
          w.errored = null;
          w.errorEmitted = false;
          w.finalCalled = false;
          w.prefinished = false;
          w.ended = w.writable === false;
          w.ending = w.writable === false;
          w.finished = w.writable === false;
        }
      }
      function errorOrDestroy(stream, err, sync) {
        const r = stream._readableState;
        const w = stream._writableState;
        if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
          return this;
        }
        if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
          stream.destroy(err);
        else if (err) {
          err.stack;
          if (w && !w.errored) {
            w.errored = err;
          }
          if (r && !r.errored) {
            r.errored = err;
          }
          if (sync) {
            process.nextTick(emitErrorNT, stream, err);
          } else {
            emitErrorNT(stream, err);
          }
        }
      }
      function construct(stream, cb) {
        if (typeof stream._construct !== "function") {
          return;
        }
        const r = stream._readableState;
        const w = stream._writableState;
        if (r) {
          r.constructed = false;
        }
        if (w) {
          w.constructed = false;
        }
        stream.once(kConstruct, cb);
        if (stream.listenerCount(kConstruct) > 1) {
          return;
        }
        process.nextTick(constructNT, stream);
      }
      function constructNT(stream) {
        let called = false;
        function onConstruct(err) {
          if (called) {
            errorOrDestroy(stream, err !== null && err !== void 0 ? err : new ERR_MULTIPLE_CALLBACK());
            return;
          }
          called = true;
          const r = stream._readableState;
          const w = stream._writableState;
          const s = w || r;
          if (r) {
            r.constructed = true;
          }
          if (w) {
            w.constructed = true;
          }
          if (s.destroyed) {
            stream.emit(kDestroy, err);
          } else if (err) {
            errorOrDestroy(stream, err, true);
          } else {
            process.nextTick(emitConstructNT, stream);
          }
        }
        try {
          stream._construct((err) => {
            process.nextTick(onConstruct, err);
          });
        } catch (err) {
          process.nextTick(onConstruct, err);
        }
      }
      function emitConstructNT(stream) {
        stream.emit(kConstruct);
      }
      function isRequest(stream) {
        return (stream === null || stream === void 0 ? void 0 : stream.setHeader) && typeof stream.abort === "function";
      }
      function emitCloseLegacy(stream) {
        stream.emit("close");
      }
      function emitErrorCloseLegacy(stream, err) {
        stream.emit("error", err);
        process.nextTick(emitCloseLegacy, stream);
      }
      function destroyer(stream, err) {
        if (!stream || isDestroyed(stream)) {
          return;
        }
        if (!err && !isFinished(stream)) {
          err = new AbortError();
        }
        if (isServerRequest(stream)) {
          stream.socket = null;
          stream.destroy(err);
        } else if (isRequest(stream)) {
          stream.abort();
        } else if (isRequest(stream.req)) {
          stream.req.abort();
        } else if (typeof stream.destroy === "function") {
          stream.destroy(err);
        } else if (typeof stream.close === "function") {
          stream.close();
        } else if (err) {
          process.nextTick(emitErrorCloseLegacy, stream, err);
        } else {
          process.nextTick(emitCloseLegacy, stream);
        }
        if (!stream.destroyed) {
          stream[kIsDestroyed] = true;
        }
      }
      module.exports = {
        construct,
        destroyer,
        destroy,
        undestroy,
        errorOrDestroy
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/legacy.js
  var require_legacy = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/legacy.js"(exports, module) {
      "use strict";
      var { ArrayIsArray, ObjectSetPrototypeOf } = require_primordials();
      var { EventEmitter: EE } = require_events();
      function Stream(opts) {
        EE.call(this, opts);
      }
      ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
      ObjectSetPrototypeOf(Stream, EE);
      Stream.prototype.pipe = function(dest, options) {
        const source = this;
        function ondata(chunk) {
          if (dest.writable && dest.write(chunk) === false && source.pause) {
            source.pause();
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend);
          source.on("close", onclose);
        }
        let didOnEnd = false;
        function onend() {
          if (didOnEnd) return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd) return;
          didOnEnd = true;
          if (typeof dest.destroy === "function") dest.destroy();
        }
        function onerror(er) {
          var _this$listenerCount;
          cleanup();
          if (((_this$listenerCount = this.listenerCount) === null || _this$listenerCount === void 0 ? void 0 : _this$listenerCount.call(this, "error")) === 0) {
            this.emit("error", er);
          }
        }
        prependListener(source, "error", onerror);
        prependListener(dest, "error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
        if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
        else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
        else emitter._events[event] = [fn, emitter._events[event]];
      }
      module.exports = {
        Stream,
        prependListener
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/add-abort-signal.js
  var require_add_abort_signal = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/add-abort-signal.js"(exports, module) {
      "use strict";
      var { SymbolDispose } = require_primordials();
      var { AbortError, codes } = require_errors();
      var { isNodeStream, isWebStream, kControllerErrorFunction } = require_utils();
      var eos = require_end_of_stream();
      var { ERR_INVALID_ARG_TYPE } = codes;
      var addAbortListener;
      var validateAbortSignal = (signal, name) => {
        if (typeof signal !== "object" || !("aborted" in signal)) {
          throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
        }
      };
      module.exports.addAbortSignal = function addAbortSignal(signal, stream) {
        validateAbortSignal(signal, "signal");
        if (!isNodeStream(stream) && !isWebStream(stream)) {
          throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
        }
        return module.exports.addAbortSignalNoValidate(signal, stream);
      };
      module.exports.addAbortSignalNoValidate = function(signal, stream) {
        if (typeof signal !== "object" || !("aborted" in signal)) {
          return stream;
        }
        const onAbort = isNodeStream(stream) ? () => {
          stream.destroy(
            new AbortError(void 0, {
              cause: signal.reason
            })
          );
        } : () => {
          stream[kControllerErrorFunction](
            new AbortError(void 0, {
              cause: signal.reason
            })
          );
        };
        if (signal.aborted) {
          onAbort();
        } else {
          addAbortListener = addAbortListener || require_util().addAbortListener;
          const disposable = addAbortListener(signal, onAbort);
          eos(stream, disposable[SymbolDispose]);
        }
        return stream;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
      "use strict";
      var { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = require_primordials();
      var { Buffer: Buffer3 } = require_buffer();
      var { inspect } = require_util();
      module.exports = class BufferList {
        constructor() {
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        push(v) {
          const entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
        unshift(v) {
          const entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
        shift() {
          if (this.length === 0) return;
          const ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
        clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
        join(s) {
          if (this.length === 0) return "";
          let p = this.head;
          let ret = "" + p.data;
          while ((p = p.next) !== null) ret += s + p.data;
          return ret;
        }
        concat(n) {
          if (this.length === 0) return Buffer3.alloc(0);
          const ret = Buffer3.allocUnsafe(n >>> 0);
          let p = this.head;
          let i = 0;
          while (p) {
            TypedArrayPrototypeSet(ret, p.data, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
        consume(n, hasStrings) {
          const data = this.head.data;
          if (n < data.length) {
            const slice = data.slice(0, n);
            this.head.data = data.slice(n);
            return slice;
          }
          if (n === data.length) {
            return this.shift();
          }
          return hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        first() {
          return this.head.data;
        }
        *[SymbolIterator]() {
          for (let p = this.head; p; p = p.next) {
            yield p.data;
          }
        }
        // Consumes a specified amount of characters from the buffered data.
        _getString(n) {
          let ret = "";
          let p = this.head;
          let c = 0;
          do {
            const str = p.data;
            if (n > str.length) {
              ret += str;
              n -= str.length;
            } else {
              if (n === str.length) {
                ret += str;
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                ret += StringPrototypeSlice(str, 0, n);
                this.head = p;
                p.data = StringPrototypeSlice(str, n);
              }
              break;
            }
            ++c;
          } while ((p = p.next) !== null);
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
        _getBuffer(n) {
          const ret = Buffer3.allocUnsafe(n);
          const retLen = n;
          let p = this.head;
          let c = 0;
          do {
            const buf = p.data;
            if (n > buf.length) {
              TypedArrayPrototypeSet(ret, buf, retLen - n);
              n -= buf.length;
            } else {
              if (n === buf.length) {
                TypedArrayPrototypeSet(ret, buf, retLen - n);
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                TypedArrayPrototypeSet(ret, new Uint8Array2(buf.buffer, buf.byteOffset, n), retLen - n);
                this.head = p;
                p.data = buf.slice(n);
              }
              break;
            }
            ++c;
          } while ((p = p.next) !== null);
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
        [Symbol.for("nodejs.util.inspect.custom")](_, options) {
          return inspect(this, {
            ...options,
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          });
        }
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
      "use strict";
      var { MathFloor, NumberIsInteger } = require_primordials();
      var { validateInteger } = require_validators();
      var { ERR_INVALID_ARG_VALUE } = require_errors().codes;
      var defaultHighWaterMarkBytes = 16 * 1024;
      var defaultHighWaterMarkObjectMode = 16;
      function highWaterMarkFrom(options, isDuplex, duplexKey) {
        return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
      }
      function getDefaultHighWaterMark(objectMode) {
        return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
      }
      function setDefaultHighWaterMark(objectMode, value) {
        validateInteger(value, "value", 0);
        if (objectMode) {
          defaultHighWaterMarkObjectMode = value;
        } else {
          defaultHighWaterMarkBytes = value;
        }
      }
      function getHighWaterMark(state, options, duplexKey, isDuplex) {
        const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
        if (hwm != null) {
          if (!NumberIsInteger(hwm) || hwm < 0) {
            const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
            throw new ERR_INVALID_ARG_VALUE(name, hwm);
          }
          return MathFloor(hwm);
        }
        return getDefaultHighWaterMark(state.objectMode);
      }
      module.exports = {
        getHighWaterMark,
        getDefaultHighWaterMark,
        setDefaultHighWaterMark
      };
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      var buffer = require_buffer();
      var Buffer3 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer3(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer3.prototype);
      copyProps(Buffer3, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer3(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer3(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer3(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS({
    "node_modules/string_decoder/lib/string_decoder.js"(exports) {
      "use strict";
      var Buffer3 = require_safe_buffer().Buffer;
      var isEncoding = Buffer3.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc) return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried) return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer3.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer3.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0) return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0) return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127) return 0;
        else if (byte >> 5 === 6) return 2;
        else if (byte >> 4 === 14) return 3;
        else if (byte >> 3 === 30) return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i) return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2) nb = 0;
            else self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "\uFFFD";
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "\uFFFD";
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "\uFFFD";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== void 0) return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed) return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + "\uFFFD";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0) return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/from.js
  var require_from = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/from.js"(exports, module) {
      "use strict";
      var process = require_process();
      var { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = require_primordials();
      var { Buffer: Buffer3 } = require_buffer();
      var { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = require_errors().codes;
      function from(Readable2, iterable, opts) {
        let iterator;
        if (typeof iterable === "string" || iterable instanceof Buffer3) {
          return new Readable2({
            objectMode: true,
            ...opts,
            read() {
              this.push(iterable);
              this.push(null);
            }
          });
        }
        let isAsync;
        if (iterable && iterable[SymbolAsyncIterator]) {
          isAsync = true;
          iterator = iterable[SymbolAsyncIterator]();
        } else if (iterable && iterable[SymbolIterator]) {
          isAsync = false;
          iterator = iterable[SymbolIterator]();
        } else {
          throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
        }
        const readable = new Readable2({
          objectMode: true,
          highWaterMark: 1,
          // TODO(ronag): What options should be allowed?
          ...opts
        });
        let reading = false;
        readable._read = function() {
          if (!reading) {
            reading = true;
            next();
          }
        };
        readable._destroy = function(error, cb) {
          PromisePrototypeThen(
            close(error),
            () => process.nextTick(cb, error),
            // nextTick is here in case cb throws
            (e) => process.nextTick(cb, e || error)
          );
        };
        async function close(error) {
          const hadError = error !== void 0 && error !== null;
          const hasThrow = typeof iterator.throw === "function";
          if (hadError && hasThrow) {
            const { value, done } = await iterator.throw(error);
            await value;
            if (done) {
              return;
            }
          }
          if (typeof iterator.return === "function") {
            const { value } = await iterator.return();
            await value;
          }
        }
        async function next() {
          for (; ; ) {
            try {
              const { value, done } = isAsync ? await iterator.next() : iterator.next();
              if (done) {
                readable.push(null);
              } else {
                const res = value && typeof value.then === "function" ? await value : value;
                if (res === null) {
                  reading = false;
                  throw new ERR_STREAM_NULL_VALUES();
                } else if (readable.push(res)) {
                  continue;
                } else {
                  reading = false;
                }
              }
            } catch (err) {
              readable.destroy(err);
            }
            break;
          }
        }
        return readable;
      }
      module.exports = from;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/readable.js
  var require_readable = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/readable.js"(exports, module) {
      "use strict";
      var process = require_process();
      var {
        ArrayPrototypeIndexOf,
        NumberIsInteger,
        NumberIsNaN,
        NumberParseInt,
        ObjectDefineProperties,
        ObjectKeys,
        ObjectSetPrototypeOf,
        Promise: Promise2,
        SafeSet,
        SymbolAsyncDispose,
        SymbolAsyncIterator,
        Symbol: Symbol2
      } = require_primordials();
      module.exports = Readable2;
      Readable2.ReadableState = ReadableState;
      var { EventEmitter: EE } = require_events();
      var { Stream, prependListener } = require_legacy();
      var { Buffer: Buffer3 } = require_buffer();
      var { addAbortSignal } = require_add_abort_signal();
      var eos = require_end_of_stream();
      var debug = require_util().debuglog("stream", (fn) => {
        debug = fn;
      });
      var BufferList = require_buffer_list();
      var destroyImpl = require_destroy();
      var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
      var {
        aggregateTwoErrors,
        codes: {
          ERR_INVALID_ARG_TYPE,
          ERR_METHOD_NOT_IMPLEMENTED,
          ERR_OUT_OF_RANGE,
          ERR_STREAM_PUSH_AFTER_EOF,
          ERR_STREAM_UNSHIFT_AFTER_END_EVENT
        },
        AbortError
      } = require_errors();
      var { validateObject } = require_validators();
      var kPaused = Symbol2("kPaused");
      var { StringDecoder } = require_string_decoder();
      var from = require_from();
      ObjectSetPrototypeOf(Readable2.prototype, Stream.prototype);
      ObjectSetPrototypeOf(Readable2, Stream);
      var nop = () => {
      };
      var { errorOrDestroy } = destroyImpl;
      var kObjectMode = 1 << 0;
      var kEnded = 1 << 1;
      var kEndEmitted = 1 << 2;
      var kReading = 1 << 3;
      var kConstructed = 1 << 4;
      var kSync = 1 << 5;
      var kNeedReadable = 1 << 6;
      var kEmittedReadable = 1 << 7;
      var kReadableListening = 1 << 8;
      var kResumeScheduled = 1 << 9;
      var kErrorEmitted = 1 << 10;
      var kEmitClose = 1 << 11;
      var kAutoDestroy = 1 << 12;
      var kDestroyed = 1 << 13;
      var kClosed = 1 << 14;
      var kCloseEmitted = 1 << 15;
      var kMultiAwaitDrain = 1 << 16;
      var kReadingMore = 1 << 17;
      var kDataEmitted = 1 << 18;
      function makeBitMapDescriptor(bit) {
        return {
          enumerable: false,
          get() {
            return (this.state & bit) !== 0;
          },
          set(value) {
            if (value) this.state |= bit;
            else this.state &= ~bit;
          }
        };
      }
      ObjectDefineProperties(ReadableState.prototype, {
        objectMode: makeBitMapDescriptor(kObjectMode),
        ended: makeBitMapDescriptor(kEnded),
        endEmitted: makeBitMapDescriptor(kEndEmitted),
        reading: makeBitMapDescriptor(kReading),
        // Stream is still being constructed and cannot be
        // destroyed until construction finished or failed.
        // Async construction is opt in, therefore we start as
        // constructed.
        constructed: makeBitMapDescriptor(kConstructed),
        // A flag to be able to tell if the event 'readable'/'data' is emitted
        // immediately, or on a later tick.  We set this to true at first, because
        // any actions that shouldn't happen until "later" should generally also
        // not happen before the first read call.
        sync: makeBitMapDescriptor(kSync),
        // Whenever we return null, then we set a flag to say
        // that we're awaiting a 'readable' event emission.
        needReadable: makeBitMapDescriptor(kNeedReadable),
        emittedReadable: makeBitMapDescriptor(kEmittedReadable),
        readableListening: makeBitMapDescriptor(kReadableListening),
        resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
        // True if the error was already emitted and should not be thrown again.
        errorEmitted: makeBitMapDescriptor(kErrorEmitted),
        emitClose: makeBitMapDescriptor(kEmitClose),
        autoDestroy: makeBitMapDescriptor(kAutoDestroy),
        // Has it been destroyed.
        destroyed: makeBitMapDescriptor(kDestroyed),
        // Indicates whether the stream has finished destroying.
        closed: makeBitMapDescriptor(kClosed),
        // True if close has been emitted or would have been emitted
        // depending on emitClose.
        closeEmitted: makeBitMapDescriptor(kCloseEmitted),
        multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
        // If true, a maybeReadMore has been scheduled.
        readingMore: makeBitMapDescriptor(kReadingMore),
        dataEmitted: makeBitMapDescriptor(kDataEmitted)
      });
      function ReadableState(options, stream, isDuplex) {
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
        this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
        if (options && options.objectMode) this.state |= kObjectMode;
        if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
        this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = [];
        this.flowing = null;
        this[kPaused] = null;
        if (options && options.emitClose === false) this.state &= ~kEmitClose;
        if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
        this.errored = null;
        this.defaultEncoding = options && options.defaultEncoding || "utf8";
        this.awaitDrainWriters = null;
        this.decoder = null;
        this.encoding = null;
        if (options && options.encoding) {
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable2(options) {
        if (!(this instanceof Readable2)) return new Readable2(options);
        const isDuplex = this instanceof require_duplex();
        this._readableState = new ReadableState(options, this, isDuplex);
        if (options) {
          if (typeof options.read === "function") this._read = options.read;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
          if (typeof options.construct === "function") this._construct = options.construct;
          if (options.signal && !isDuplex) addAbortSignal(options.signal, this);
        }
        Stream.call(this, options);
        destroyImpl.construct(this, () => {
          if (this._readableState.needReadable) {
            maybeReadMore(this, this._readableState);
          }
        });
      }
      Readable2.prototype.destroy = destroyImpl.destroy;
      Readable2.prototype._undestroy = destroyImpl.undestroy;
      Readable2.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Readable2.prototype[EE.captureRejectionSymbol] = function(err) {
        this.destroy(err);
      };
      Readable2.prototype[SymbolAsyncDispose] = function() {
        let error;
        if (!this.destroyed) {
          error = this.readableEnded ? null : new AbortError();
          this.destroy(error);
        }
        return new Promise2((resolve, reject) => eos(this, (err) => err && err !== error ? reject(err) : resolve(null)));
      };
      Readable2.prototype.push = function(chunk, encoding) {
        return readableAddChunk(this, chunk, encoding, false);
      };
      Readable2.prototype.unshift = function(chunk, encoding) {
        return readableAddChunk(this, chunk, encoding, true);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront) {
        debug("readableAddChunk", chunk);
        const state = stream._readableState;
        let err;
        if ((state.state & kObjectMode) === 0) {
          if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (state.encoding !== encoding) {
              if (addToFront && state.encoding) {
                chunk = Buffer3.from(chunk, encoding).toString(state.encoding);
              } else {
                chunk = Buffer3.from(chunk, encoding);
                encoding = "";
              }
            }
          } else if (chunk instanceof Buffer3) {
            encoding = "";
          } else if (Stream._isUint8Array(chunk)) {
            chunk = Stream._uint8ArrayToBuffer(chunk);
            encoding = "";
          } else if (chunk != null) {
            err = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
          }
        }
        if (err) {
          errorOrDestroy(stream, err);
        } else if (chunk === null) {
          state.state &= ~kReading;
          onEofChunk(stream, state);
        } else if ((state.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
          if (addToFront) {
            if ((state.state & kEndEmitted) !== 0) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else if (state.destroyed || state.errored) return false;
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed || state.errored) {
            return false;
          } else {
            state.state &= ~kReading;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.state &= ~kReading;
          maybeReadMore(stream, state);
        }
        return !state.ended && (state.length < state.highWaterMark || state.length === 0);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
          if ((state.state & kMultiAwaitDrain) !== 0) {
            state.awaitDrainWriters.clear();
          } else {
            state.awaitDrainWriters = null;
          }
          state.dataEmitted = true;
          stream.emit("data", chunk);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);
          else state.buffer.push(chunk);
          if ((state.state & kNeedReadable) !== 0) emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      Readable2.prototype.isPaused = function() {
        const state = this._readableState;
        return state[kPaused] === true || state.flowing === false;
      };
      Readable2.prototype.setEncoding = function(enc) {
        const decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder;
        this._readableState.encoding = this._readableState.decoder.encoding;
        const buffer = this._readableState.buffer;
        let content = "";
        for (const data of buffer) {
          content += decoder.write(data);
        }
        buffer.clear();
        if (content !== "") buffer.push(content);
        this._readableState.length = content.length;
        return this;
      };
      var MAX_HWM = 1073741824;
      function computeNewHighWaterMark(n) {
        if (n > MAX_HWM) {
          throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if ((state.state & kObjectMode) !== 0) return 1;
        if (NumberIsNaN(n)) {
          if (state.flowing && state.length) return state.buffer.first().length;
          return state.length;
        }
        if (n <= state.length) return n;
        return state.ended ? state.length : 0;
      }
      Readable2.prototype.read = function(n) {
        debug("read", n);
        if (n === void 0) {
          n = NaN;
        } else if (!NumberIsInteger(n)) {
          n = NumberParseInt(n, 10);
        }
        const state = this._readableState;
        const nOrig = n;
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n !== 0) state.state &= ~kEmittedReadable;
        if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended) endReadable(this);
          else emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0) endReadable(this);
          return null;
        }
        let doRead = (state.state & kNeedReadable) !== 0;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
          doRead = false;
          debug("reading, ended or constructing", doRead);
        } else if (doRead) {
          debug("do read");
          state.state |= kReading | kSync;
          if (state.length === 0) state.state |= kNeedReadable;
          try {
            this._read(state.highWaterMark);
          } catch (err) {
            errorOrDestroy(this, err);
          }
          state.state &= ~kSync;
          if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        let ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
          state.needReadable = state.length <= state.highWaterMark;
          n = 0;
        } else {
          state.length -= n;
          if (state.multiAwaitDrain) {
            state.awaitDrainWriters.clear();
          } else {
            state.awaitDrainWriters = null;
          }
        }
        if (state.length === 0) {
          if (!state.ended) state.needReadable = true;
          if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
          state.dataEmitted = true;
          this.emit("data", ret);
        }
        return ret;
      };
      function onEofChunk(stream, state) {
        debug("onEofChunk");
        if (state.ended) return;
        if (state.decoder) {
          const chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        if (state.sync) {
          emitReadable(stream);
        } else {
          state.needReadable = false;
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
      function emitReadable(stream) {
        const state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable);
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          process.nextTick(emitReadable_, stream);
        }
      }
      function emitReadable_(stream) {
        const state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended);
        if (!state.destroyed && !state.errored && (state.length || state.ended)) {
          stream.emit("readable");
          state.emittedReadable = false;
        }
        state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore && state.constructed) {
          state.readingMore = true;
          process.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
          const len = state.length;
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
        }
        state.readingMore = false;
      }
      Readable2.prototype._read = function(n) {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
      };
      Readable2.prototype.pipe = function(dest, pipeOpts) {
        const src = this;
        const state = this._readableState;
        if (state.pipes.length === 1) {
          if (!state.multiAwaitDrain) {
            state.multiAwaitDrain = true;
            state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
          }
        }
        state.pipes.push(dest);
        debug("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
        const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        const endFn = doEnd ? onend : unpipe;
        if (state.endEmitted) process.nextTick(endFn);
        else src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
              unpipeInfo.hasUnpiped = true;
              cleanup();
            }
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        let ondrain;
        let cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          if (ondrain) {
            dest.removeListener("drain", ondrain);
          }
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        function pause() {
          if (!cleanedUp) {
            if (state.pipes.length === 1 && state.pipes[0] === dest) {
              debug("false write response, pause", 0);
              state.awaitDrainWriters = dest;
              state.multiAwaitDrain = false;
            } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
              debug("false write response, pause", state.awaitDrainWriters.size);
              state.awaitDrainWriters.add(dest);
            }
            src.pause();
          }
          if (!ondrain) {
            ondrain = pipeOnDrain(src, dest);
            dest.on("drain", ondrain);
          }
        }
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          const ret = dest.write(chunk);
          debug("dest.write", ret);
          if (ret === false) {
            pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (dest.listenerCount("error") === 0) {
            const s = dest._writableState || dest._readableState;
            if (s && !s.errorEmitted) {
              errorOrDestroy(dest, er);
            } else {
              dest.emit("error", er);
            }
          }
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (dest.writableNeedDrain === true) {
          pause();
        } else if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src, dest) {
        return function pipeOnDrainFunctionResult() {
          const state = src._readableState;
          if (state.awaitDrainWriters === dest) {
            debug("pipeOnDrain", 1);
            state.awaitDrainWriters = null;
          } else if (state.multiAwaitDrain) {
            debug("pipeOnDrain", state.awaitDrainWriters.size);
            state.awaitDrainWriters.delete(dest);
          }
          if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
            src.resume();
          }
        };
      }
      Readable2.prototype.unpipe = function(dest) {
        const state = this._readableState;
        const unpipeInfo = {
          hasUnpiped: false
        };
        if (state.pipes.length === 0) return this;
        if (!dest) {
          const dests = state.pipes;
          state.pipes = [];
          this.pause();
          for (let i = 0; i < dests.length; i++)
            dests[i].emit("unpipe", this, {
              hasUnpiped: false
            });
          return this;
        }
        const index = ArrayPrototypeIndexOf(state.pipes, dest);
        if (index === -1) return this;
        state.pipes.splice(index, 1);
        if (state.pipes.length === 0) this.pause();
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable2.prototype.on = function(ev, fn) {
        const res = Stream.prototype.on.call(this, ev, fn);
        const state = this._readableState;
        if (ev === "data") {
          state.readableListening = this.listenerCount("readable") > 0;
          if (state.flowing !== false) this.resume();
        } else if (ev === "readable") {
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
              emitReadable(this);
            } else if (!state.reading) {
              process.nextTick(nReadingNextTick, this);
            }
          }
        }
        return res;
      };
      Readable2.prototype.addListener = Readable2.prototype.on;
      Readable2.prototype.removeListener = function(ev, fn) {
        const res = Stream.prototype.removeListener.call(this, ev, fn);
        if (ev === "readable") {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      Readable2.prototype.off = Readable2.prototype.removeListener;
      Readable2.prototype.removeAllListeners = function(ev) {
        const res = Stream.prototype.removeAllListeners.apply(this, arguments);
        if (ev === "readable" || ev === void 0) {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      function updateReadableListening(self2) {
        const state = self2._readableState;
        state.readableListening = self2.listenerCount("readable") > 0;
        if (state.resumeScheduled && state[kPaused] === false) {
          state.flowing = true;
        } else if (self2.listenerCount("data") > 0) {
          self2.resume();
        } else if (!state.readableListening) {
          state.flowing = null;
        }
      }
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
      }
      Readable2.prototype.resume = function() {
        const state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = !state.readableListening;
          resume(this, state);
        }
        state[kPaused] = false;
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          process.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        debug("resume", state.reading);
        if (!state.reading) {
          stream.read(0);
        }
        state.resumeScheduled = false;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
      }
      Readable2.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (this._readableState.flowing !== false) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        this._readableState[kPaused] = true;
        return this;
      };
      function flow(stream) {
        const state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) ;
      }
      Readable2.prototype.wrap = function(stream) {
        let paused = false;
        stream.on("data", (chunk) => {
          if (!this.push(chunk) && stream.pause) {
            paused = true;
            stream.pause();
          }
        });
        stream.on("end", () => {
          this.push(null);
        });
        stream.on("error", (err) => {
          errorOrDestroy(this, err);
        });
        stream.on("close", () => {
          this.destroy();
        });
        stream.on("destroy", () => {
          this.destroy();
        });
        this._read = () => {
          if (paused && stream.resume) {
            paused = false;
            stream.resume();
          }
        };
        const streamKeys = ObjectKeys(stream);
        for (let j = 1; j < streamKeys.length; j++) {
          const i = streamKeys[j];
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = stream[i].bind(stream);
          }
        }
        return this;
      };
      Readable2.prototype[SymbolAsyncIterator] = function() {
        return streamToAsyncIterator(this);
      };
      Readable2.prototype.iterator = function(options) {
        if (options !== void 0) {
          validateObject(options, "options");
        }
        return streamToAsyncIterator(this, options);
      };
      function streamToAsyncIterator(stream, options) {
        if (typeof stream.read !== "function") {
          stream = Readable2.wrap(stream, {
            objectMode: true
          });
        }
        const iter = createAsyncIterator(stream, options);
        iter.stream = stream;
        return iter;
      }
      async function* createAsyncIterator(stream, options) {
        let callback = nop;
        function next(resolve) {
          if (this === stream) {
            callback();
            callback = nop;
          } else {
            callback = resolve;
          }
        }
        stream.on("readable", next);
        let error;
        const cleanup = eos(
          stream,
          {
            writable: false
          },
          (err) => {
            error = err ? aggregateTwoErrors(error, err) : null;
            callback();
            callback = nop;
          }
        );
        try {
          while (true) {
            const chunk = stream.destroyed ? null : stream.read();
            if (chunk !== null) {
              yield chunk;
            } else if (error) {
              throw error;
            } else if (error === null) {
              return;
            } else {
              await new Promise2(next);
            }
          }
        } catch (err) {
          error = aggregateTwoErrors(error, err);
          throw error;
        } finally {
          if ((error || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error === void 0 || stream._readableState.autoDestroy)) {
            destroyImpl.destroyer(stream, null);
          } else {
            stream.off("readable", next);
            cleanup();
          }
        }
      }
      ObjectDefineProperties(Readable2.prototype, {
        readable: {
          __proto__: null,
          get() {
            const r = this._readableState;
            return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
          },
          set(val) {
            if (this._readableState) {
              this._readableState.readable = !!val;
            }
          }
        },
        readableDidRead: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.dataEmitted;
          }
        },
        readableAborted: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
          }
        },
        readableHighWaterMark: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.highWaterMark;
          }
        },
        readableBuffer: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState && this._readableState.buffer;
          }
        },
        readableFlowing: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.flowing;
          },
          set: function(state) {
            if (this._readableState) {
              this._readableState.flowing = state;
            }
          }
        },
        readableLength: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState.length;
          }
        },
        readableObjectMode: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.objectMode : false;
          }
        },
        readableEncoding: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.encoding : null;
          }
        },
        errored: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.errored : null;
          }
        },
        closed: {
          __proto__: null,
          get() {
            return this._readableState ? this._readableState.closed : false;
          }
        },
        destroyed: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.destroyed : false;
          },
          set(value) {
            if (!this._readableState) {
              return;
            }
            this._readableState.destroyed = value;
          }
        },
        readableEnded: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.endEmitted : false;
          }
        }
      });
      ObjectDefineProperties(ReadableState.prototype, {
        // Legacy getter for `pipesCount`.
        pipesCount: {
          __proto__: null,
          get() {
            return this.pipes.length;
          }
        },
        // Legacy property for `paused`.
        paused: {
          __proto__: null,
          get() {
            return this[kPaused] !== false;
          },
          set(value) {
            this[kPaused] = !!value;
          }
        }
      });
      Readable2._fromList = fromList;
      function fromList(n, state) {
        if (state.length === 0) return null;
        let ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder) ret = state.buffer.join("");
          else if (state.buffer.length === 1) ret = state.buffer.first();
          else ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = state.buffer.consume(n, state.decoder);
        }
        return ret;
      }
      function endReadable(stream) {
        const state = stream._readableState;
        debug("endReadable", state.endEmitted);
        if (!state.endEmitted) {
          state.ended = true;
          process.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        debug("endReadableNT", state.endEmitted, state.length);
        if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.emit("end");
          if (stream.writable && stream.allowHalfOpen === false) {
            process.nextTick(endWritableNT, stream);
          } else if (state.autoDestroy) {
            const wState = stream._writableState;
            const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
            // if writable is explicitly set to false.
            (wState.finished || wState.writable === false);
            if (autoDestroy) {
              stream.destroy();
            }
          }
        }
      }
      function endWritableNT(stream) {
        const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
        if (writable) {
          stream.end();
        }
      }
      Readable2.from = function(iterable, opts) {
        return from(Readable2, iterable, opts);
      };
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Readable2.fromWeb = function(readableStream, options) {
        return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
      };
      Readable2.toWeb = function(streamReadable, options) {
        return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
      };
      Readable2.wrap = function(src, options) {
        var _ref, _src$readableObjectMo;
        return new Readable2({
          objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
          ...options,
          destroy(err, callback) {
            destroyImpl.destroyer(src, err);
            callback(err);
          }
        }).wrap(src);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/writable.js
  var require_writable = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/writable.js"(exports, module) {
      "use strict";
      var process = require_process();
      var {
        ArrayPrototypeSlice,
        Error: Error2,
        FunctionPrototypeSymbolHasInstance,
        ObjectDefineProperty,
        ObjectDefineProperties,
        ObjectSetPrototypeOf,
        StringPrototypeToLowerCase,
        Symbol: Symbol2,
        SymbolHasInstance
      } = require_primordials();
      module.exports = Writable;
      Writable.WritableState = WritableState;
      var { EventEmitter: EE } = require_events();
      var Stream = require_legacy().Stream;
      var { Buffer: Buffer3 } = require_buffer();
      var destroyImpl = require_destroy();
      var { addAbortSignal } = require_add_abort_signal();
      var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
      var {
        ERR_INVALID_ARG_TYPE,
        ERR_METHOD_NOT_IMPLEMENTED,
        ERR_MULTIPLE_CALLBACK,
        ERR_STREAM_CANNOT_PIPE,
        ERR_STREAM_DESTROYED,
        ERR_STREAM_ALREADY_FINISHED,
        ERR_STREAM_NULL_VALUES,
        ERR_STREAM_WRITE_AFTER_END,
        ERR_UNKNOWN_ENCODING
      } = require_errors().codes;
      var { errorOrDestroy } = destroyImpl;
      ObjectSetPrototypeOf(Writable.prototype, Stream.prototype);
      ObjectSetPrototypeOf(Writable, Stream);
      function nop() {
      }
      var kOnFinished = Symbol2("kOnFinished");
      function WritableState(options, stream, isDuplex) {
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
        this.objectMode = !!(options && options.objectMode);
        if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
        this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        const noDecode = !!(options && options.decodeStrings === false);
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options && options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = onwrite.bind(void 0, stream);
        this.writecb = null;
        this.writelen = 0;
        this.afterWriteTickInfo = null;
        resetBuffer(this);
        this.pendingcb = 0;
        this.constructed = true;
        this.prefinished = false;
        this.errorEmitted = false;
        this.emitClose = !options || options.emitClose !== false;
        this.autoDestroy = !options || options.autoDestroy !== false;
        this.errored = null;
        this.closed = false;
        this.closeEmitted = false;
        this[kOnFinished] = [];
      }
      function resetBuffer(state) {
        state.buffered = [];
        state.bufferedIndex = 0;
        state.allBuffers = true;
        state.allNoop = true;
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
      };
      ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
        __proto__: null,
        get() {
          return this.buffered.length - this.bufferedIndex;
        }
      });
      function Writable(options) {
        const isDuplex = this instanceof require_duplex();
        if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable, this)) return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex);
        if (options) {
          if (typeof options.write === "function") this._write = options.write;
          if (typeof options.writev === "function") this._writev = options.writev;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
          if (typeof options.final === "function") this._final = options.final;
          if (typeof options.construct === "function") this._construct = options.construct;
          if (options.signal) addAbortSignal(options.signal, this);
        }
        Stream.call(this, options);
        destroyImpl.construct(this, () => {
          const state = this._writableState;
          if (!state.writing) {
            clearBuffer(this, state);
          }
          finishMaybe(this, state);
        });
      }
      ObjectDefineProperty(Writable, SymbolHasInstance, {
        __proto__: null,
        value: function(object) {
          if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
      Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
      };
      function _write(stream, chunk, encoding, cb) {
        const state = stream._writableState;
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = state.defaultEncoding;
        } else {
          if (!encoding) encoding = state.defaultEncoding;
          else if (encoding !== "buffer" && !Buffer3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
          if (typeof cb !== "function") cb = nop;
        }
        if (chunk === null) {
          throw new ERR_STREAM_NULL_VALUES();
        } else if (!state.objectMode) {
          if (typeof chunk === "string") {
            if (state.decodeStrings !== false) {
              chunk = Buffer3.from(chunk, encoding);
              encoding = "buffer";
            }
          } else if (chunk instanceof Buffer3) {
            encoding = "buffer";
          } else if (Stream._isUint8Array(chunk)) {
            chunk = Stream._uint8ArrayToBuffer(chunk);
            encoding = "buffer";
          } else {
            throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
          }
        }
        let err;
        if (state.ending) {
          err = new ERR_STREAM_WRITE_AFTER_END();
        } else if (state.destroyed) {
          err = new ERR_STREAM_DESTROYED("write");
        }
        if (err) {
          process.nextTick(cb, err);
          errorOrDestroy(stream, err, true);
          return err;
        }
        state.pendingcb++;
        return writeOrBuffer(stream, state, chunk, encoding, cb);
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        return _write(this, chunk, encoding, cb) === true;
      };
      Writable.prototype.cork = function() {
        this._writableState.corked++;
      };
      Writable.prototype.uncork = function() {
        const state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing) clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
        if (!Buffer3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      function writeOrBuffer(stream, state, chunk, encoding, callback) {
        const len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        const ret = state.length < state.highWaterMark;
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked || state.errored || !state.constructed) {
          state.buffered.push({
            chunk,
            encoding,
            callback
          });
          if (state.allBuffers && encoding !== "buffer") {
            state.allBuffers = false;
          }
          if (state.allNoop && callback !== nop) {
            state.allNoop = false;
          }
        } else {
          state.writelen = len;
          state.writecb = callback;
          state.writing = true;
          state.sync = true;
          stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }
        return ret && !state.errored && !state.destroyed;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
        else if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, er, cb) {
        --state.pendingcb;
        cb(er);
        errorBuffer(state);
        errorOrDestroy(stream, er);
      }
      function onwrite(stream, er) {
        const state = stream._writableState;
        const sync = state.sync;
        const cb = state.writecb;
        if (typeof cb !== "function") {
          errorOrDestroy(stream, new ERR_MULTIPLE_CALLBACK());
          return;
        }
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
        if (er) {
          er.stack;
          if (!state.errored) {
            state.errored = er;
          }
          if (stream._readableState && !stream._readableState.errored) {
            stream._readableState.errored = er;
          }
          if (sync) {
            process.nextTick(onwriteError, stream, state, er, cb);
          } else {
            onwriteError(stream, state, er, cb);
          }
        } else {
          if (state.buffered.length > state.bufferedIndex) {
            clearBuffer(stream, state);
          }
          if (sync) {
            if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
              state.afterWriteTickInfo.count++;
            } else {
              state.afterWriteTickInfo = {
                count: 1,
                cb,
                stream,
                state
              };
              process.nextTick(afterWriteTick, state.afterWriteTickInfo);
            }
          } else {
            afterWrite(stream, state, 1, cb);
          }
        }
      }
      function afterWriteTick({ stream, state, count, cb }) {
        state.afterWriteTickInfo = null;
        return afterWrite(stream, state, count, cb);
      }
      function afterWrite(stream, state, count, cb) {
        const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
        if (needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
        while (count-- > 0) {
          state.pendingcb--;
          cb();
        }
        if (state.destroyed) {
          errorBuffer(state);
        }
        finishMaybe(stream, state);
      }
      function errorBuffer(state) {
        if (state.writing) {
          return;
        }
        for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
          var _state$errored;
          const { chunk, callback } = state.buffered[n];
          const len = state.objectMode ? 1 : chunk.length;
          state.length -= len;
          callback(
            (_state$errored = state.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
          );
        }
        const onfinishCallbacks = state[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          var _state$errored2;
          onfinishCallbacks[i](
            (_state$errored2 = state.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
          );
        }
        resetBuffer(state);
      }
      function clearBuffer(stream, state) {
        if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
          return;
        }
        const { buffered, bufferedIndex, objectMode } = state;
        const bufferedLength = buffered.length - bufferedIndex;
        if (!bufferedLength) {
          return;
        }
        let i = bufferedIndex;
        state.bufferProcessing = true;
        if (bufferedLength > 1 && stream._writev) {
          state.pendingcb -= bufferedLength - 1;
          const callback = state.allNoop ? nop : (err) => {
            for (let n = i; n < buffered.length; ++n) {
              buffered[n].callback(err);
            }
          };
          const chunks = state.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
          chunks.allBuffers = state.allBuffers;
          doWrite(stream, state, true, state.length, chunks, "", callback);
          resetBuffer(state);
        } else {
          do {
            const { chunk, encoding, callback } = buffered[i];
            buffered[i++] = null;
            const len = objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, callback);
          } while (i < buffered.length && !state.writing);
          if (i === buffered.length) {
            resetBuffer(state);
          } else if (i > 256) {
            buffered.splice(0, i);
            state.bufferedIndex = 0;
          } else {
            state.bufferedIndex = i;
          }
        }
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        if (this._writev) {
          this._writev(
            [
              {
                chunk,
                encoding
              }
            ],
            cb
          );
        } else {
          throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
        }
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        const state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        let err;
        if (chunk !== null && chunk !== void 0) {
          const ret = _write(this, chunk, encoding);
          if (ret instanceof Error2) {
            err = ret;
          }
        }
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (err) {
        } else if (!state.errored && !state.ending) {
          state.ending = true;
          finishMaybe(this, state, true);
          state.ended = true;
        } else if (state.finished) {
          err = new ERR_STREAM_ALREADY_FINISHED("end");
        } else if (state.destroyed) {
          err = new ERR_STREAM_DESTROYED("end");
        }
        if (typeof cb === "function") {
          if (err || state.finished) {
            process.nextTick(cb, err);
          } else {
            state[kOnFinished].push(cb);
          }
        }
        return this;
      };
      function needFinish(state) {
        return state.ending && !state.destroyed && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
      }
      function callFinal(stream, state) {
        let called = false;
        function onFinish(err) {
          if (called) {
            errorOrDestroy(stream, err !== null && err !== void 0 ? err : ERR_MULTIPLE_CALLBACK());
            return;
          }
          called = true;
          state.pendingcb--;
          if (err) {
            const onfinishCallbacks = state[kOnFinished].splice(0);
            for (let i = 0; i < onfinishCallbacks.length; i++) {
              onfinishCallbacks[i](err);
            }
            errorOrDestroy(stream, err, state.sync);
          } else if (needFinish(state)) {
            state.prefinished = true;
            stream.emit("prefinish");
            state.pendingcb++;
            process.nextTick(finish, stream, state);
          }
        }
        state.sync = true;
        state.pendingcb++;
        try {
          stream._final(onFinish);
        } catch (err) {
          onFinish(err);
        }
        state.sync = false;
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
          if (typeof stream._final === "function" && !state.destroyed) {
            state.finalCalled = true;
            callFinal(stream, state);
          } else {
            state.prefinished = true;
            stream.emit("prefinish");
          }
        }
      }
      function finishMaybe(stream, state, sync) {
        if (needFinish(state)) {
          prefinish(stream, state);
          if (state.pendingcb === 0) {
            if (sync) {
              state.pendingcb++;
              process.nextTick(
                (stream2, state2) => {
                  if (needFinish(state2)) {
                    finish(stream2, state2);
                  } else {
                    state2.pendingcb--;
                  }
                },
                stream,
                state
              );
            } else if (needFinish(state)) {
              state.pendingcb++;
              finish(stream, state);
            }
          }
        }
      }
      function finish(stream, state) {
        state.pendingcb--;
        state.finished = true;
        const onfinishCallbacks = state[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          onfinishCallbacks[i]();
        }
        stream.emit("finish");
        if (state.autoDestroy) {
          const rState = stream._readableState;
          const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
          // if readable is explicitly set to false.
          (rState.endEmitted || rState.readable === false);
          if (autoDestroy) {
            stream.destroy();
          }
        }
      }
      ObjectDefineProperties(Writable.prototype, {
        closed: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.closed : false;
          }
        },
        destroyed: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.destroyed : false;
          },
          set(value) {
            if (this._writableState) {
              this._writableState.destroyed = value;
            }
          }
        },
        writable: {
          __proto__: null,
          get() {
            const w = this._writableState;
            return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
          },
          set(val) {
            if (this._writableState) {
              this._writableState.writable = !!val;
            }
          }
        },
        writableFinished: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.finished : false;
          }
        },
        writableObjectMode: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.objectMode : false;
          }
        },
        writableBuffer: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.getBuffer();
          }
        },
        writableEnded: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.ending : false;
          }
        },
        writableNeedDrain: {
          __proto__: null,
          get() {
            const wState = this._writableState;
            if (!wState) return false;
            return !wState.destroyed && !wState.ending && wState.needDrain;
          }
        },
        writableHighWaterMark: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.highWaterMark;
          }
        },
        writableCorked: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.corked : 0;
          }
        },
        writableLength: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.length;
          }
        },
        errored: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._writableState ? this._writableState.errored : null;
          }
        },
        writableAborted: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
          }
        }
      });
      var destroy = destroyImpl.destroy;
      Writable.prototype.destroy = function(err, cb) {
        const state = this._writableState;
        if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
          process.nextTick(errorBuffer, state);
        }
        destroy.call(this, err, cb);
        return this;
      };
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Writable.prototype[EE.captureRejectionSymbol] = function(err) {
        this.destroy(err);
      };
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Writable.fromWeb = function(writableStream, options) {
        return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
      };
      Writable.toWeb = function(streamWritable) {
        return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/duplexify.js
  var require_duplexify = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/duplexify.js"(exports, module) {
      var process = require_process();
      var bufferModule = require_buffer();
      var {
        isReadable,
        isWritable,
        isIterable,
        isNodeStream,
        isReadableNodeStream,
        isWritableNodeStream,
        isDuplexNodeStream,
        isReadableStream,
        isWritableStream
      } = require_utils();
      var eos = require_end_of_stream();
      var {
        AbortError,
        codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
      } = require_errors();
      var { destroyer } = require_destroy();
      var Duplex = require_duplex();
      var Readable2 = require_readable();
      var Writable = require_writable();
      var { createDeferredPromise } = require_util();
      var from = require_from();
      var Blob = globalThis.Blob || bufferModule.Blob;
      var isBlob = typeof Blob !== "undefined" ? function isBlob2(b) {
        return b instanceof Blob;
      } : function isBlob2(b) {
        return false;
      };
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var { FunctionPrototypeCall } = require_primordials();
      var Duplexify = class extends Duplex {
        constructor(options) {
          super(options);
          if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
          }
          if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
          }
        }
      };
      module.exports = function duplexify(body, name) {
        if (isDuplexNodeStream(body)) {
          return body;
        }
        if (isReadableNodeStream(body)) {
          return _duplexify({
            readable: body
          });
        }
        if (isWritableNodeStream(body)) {
          return _duplexify({
            writable: body
          });
        }
        if (isNodeStream(body)) {
          return _duplexify({
            writable: false,
            readable: false
          });
        }
        if (isReadableStream(body)) {
          return _duplexify({
            readable: Readable2.fromWeb(body)
          });
        }
        if (isWritableStream(body)) {
          return _duplexify({
            writable: Writable.fromWeb(body)
          });
        }
        if (typeof body === "function") {
          const { value, write, final, destroy } = fromAsyncGen(body);
          if (isIterable(value)) {
            return from(Duplexify, value, {
              // TODO (ronag): highWaterMark?
              objectMode: true,
              write,
              final,
              destroy
            });
          }
          const then2 = value === null || value === void 0 ? void 0 : value.then;
          if (typeof then2 === "function") {
            let d;
            const promise = FunctionPrototypeCall(
              then2,
              value,
              (val) => {
                if (val != null) {
                  throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
                }
              },
              (err) => {
                destroyer(d, err);
              }
            );
            return d = new Duplexify({
              // TODO (ronag): highWaterMark?
              objectMode: true,
              readable: false,
              write,
              final(cb) {
                final(async () => {
                  try {
                    await promise;
                    process.nextTick(cb, null);
                  } catch (err) {
                    process.nextTick(cb, err);
                  }
                });
              },
              destroy
            });
          }
          throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name, value);
        }
        if (isBlob(body)) {
          return duplexify(body.arrayBuffer());
        }
        if (isIterable(body)) {
          return from(Duplexify, body, {
            // TODO (ronag): highWaterMark?
            objectMode: true,
            writable: false
          });
        }
        if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
          return Duplexify.fromWeb(body);
        }
        if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
          const readable = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify(body.readable) : void 0;
          const writable = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify(body.writable) : void 0;
          return _duplexify({
            readable,
            writable
          });
        }
        const then = body === null || body === void 0 ? void 0 : body.then;
        if (typeof then === "function") {
          let d;
          FunctionPrototypeCall(
            then,
            body,
            (val) => {
              if (val != null) {
                d.push(val);
              }
              d.push(null);
            },
            (err) => {
              destroyer(d, err);
            }
          );
          return d = new Duplexify({
            objectMode: true,
            writable: false,
            read() {
            }
          });
        }
        throw new ERR_INVALID_ARG_TYPE(
          name,
          [
            "Blob",
            "ReadableStream",
            "WritableStream",
            "Stream",
            "Iterable",
            "AsyncIterable",
            "Function",
            "{ readable, writable } pair",
            "Promise"
          ],
          body
        );
      };
      function fromAsyncGen(fn) {
        let { promise, resolve } = createDeferredPromise();
        const ac = new AbortController();
        const signal = ac.signal;
        const value = fn(
          (async function* () {
            while (true) {
              const _promise = promise;
              promise = null;
              const { chunk, done, cb } = await _promise;
              process.nextTick(cb);
              if (done) return;
              if (signal.aborted)
                throw new AbortError(void 0, {
                  cause: signal.reason
                });
              ({ promise, resolve } = createDeferredPromise());
              yield chunk;
            }
          })(),
          {
            signal
          }
        );
        return {
          value,
          write(chunk, encoding, cb) {
            const _resolve = resolve;
            resolve = null;
            _resolve({
              chunk,
              done: false,
              cb
            });
          },
          final(cb) {
            const _resolve = resolve;
            resolve = null;
            _resolve({
              done: true,
              cb
            });
          },
          destroy(err, cb) {
            ac.abort();
            cb(err);
          }
        };
      }
      function _duplexify(pair) {
        const r = pair.readable && typeof pair.readable.read !== "function" ? Readable2.wrap(pair.readable) : pair.readable;
        const w = pair.writable;
        let readable = !!isReadable(r);
        let writable = !!isWritable(w);
        let ondrain;
        let onfinish;
        let onreadable;
        let onclose;
        let d;
        function onfinished(err) {
          const cb = onclose;
          onclose = null;
          if (cb) {
            cb(err);
          } else if (err) {
            d.destroy(err);
          }
        }
        d = new Duplexify({
          // TODO (ronag): highWaterMark?
          readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
          writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
          readable,
          writable
        });
        if (writable) {
          eos(w, (err) => {
            writable = false;
            if (err) {
              destroyer(r, err);
            }
            onfinished(err);
          });
          d._write = function(chunk, encoding, callback) {
            if (w.write(chunk, encoding)) {
              callback();
            } else {
              ondrain = callback;
            }
          };
          d._final = function(callback) {
            w.end();
            onfinish = callback;
          };
          w.on("drain", function() {
            if (ondrain) {
              const cb = ondrain;
              ondrain = null;
              cb();
            }
          });
          w.on("finish", function() {
            if (onfinish) {
              const cb = onfinish;
              onfinish = null;
              cb();
            }
          });
        }
        if (readable) {
          eos(r, (err) => {
            readable = false;
            if (err) {
              destroyer(r, err);
            }
            onfinished(err);
          });
          r.on("readable", function() {
            if (onreadable) {
              const cb = onreadable;
              onreadable = null;
              cb();
            }
          });
          r.on("end", function() {
            d.push(null);
          });
          d._read = function() {
            while (true) {
              const buf = r.read();
              if (buf === null) {
                onreadable = d._read;
                return;
              }
              if (!d.push(buf)) {
                return;
              }
            }
          };
        }
        d._destroy = function(err, callback) {
          if (!err && onclose !== null) {
            err = new AbortError();
          }
          onreadable = null;
          ondrain = null;
          onfinish = null;
          if (onclose === null) {
            callback(err);
          } else {
            onclose = callback;
            destroyer(w, err);
            destroyer(r, err);
          }
        };
        return d;
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/duplex.js
  var require_duplex = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/duplex.js"(exports, module) {
      "use strict";
      var {
        ObjectDefineProperties,
        ObjectGetOwnPropertyDescriptor,
        ObjectKeys,
        ObjectSetPrototypeOf
      } = require_primordials();
      module.exports = Duplex;
      var Readable2 = require_readable();
      var Writable = require_writable();
      ObjectSetPrototypeOf(Duplex.prototype, Readable2.prototype);
      ObjectSetPrototypeOf(Duplex, Readable2);
      {
        const keys = ObjectKeys(Writable.prototype);
        for (let i = 0; i < keys.length; i++) {
          const method = keys[i];
          if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable2.call(this, options);
        Writable.call(this, options);
        if (options) {
          this.allowHalfOpen = options.allowHalfOpen !== false;
          if (options.readable === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
          }
          if (options.writable === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
          }
        } else {
          this.allowHalfOpen = true;
        }
      }
      ObjectDefineProperties(Duplex.prototype, {
        writable: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writable")
        },
        writableHighWaterMark: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark")
        },
        writableObjectMode: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableObjectMode")
        },
        writableBuffer: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableBuffer")
        },
        writableLength: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableLength")
        },
        writableFinished: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableFinished")
        },
        writableCorked: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableCorked")
        },
        writableEnded: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableEnded")
        },
        writableNeedDrain: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain")
        },
        destroyed: {
          __proto__: null,
          get() {
            if (this._readableState === void 0 || this._writableState === void 0) {
              return false;
            }
            return this._readableState.destroyed && this._writableState.destroyed;
          },
          set(value) {
            if (this._readableState && this._writableState) {
              this._readableState.destroyed = value;
              this._writableState.destroyed = value;
            }
          }
        }
      });
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Duplex.fromWeb = function(pair, options) {
        return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
      };
      Duplex.toWeb = function(duplex) {
        return lazyWebStreams().newReadableWritablePairFromDuplex(duplex);
      };
      var duplexify;
      Duplex.from = function(body) {
        if (!duplexify) {
          duplexify = require_duplexify();
        }
        return duplexify(body, "body");
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/transform.js
  var require_transform = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/transform.js"(exports, module) {
      "use strict";
      var { ObjectSetPrototypeOf, Symbol: Symbol2 } = require_primordials();
      module.exports = Transform3;
      var { ERR_METHOD_NOT_IMPLEMENTED } = require_errors().codes;
      var Duplex = require_duplex();
      var { getHighWaterMark } = require_state();
      ObjectSetPrototypeOf(Transform3.prototype, Duplex.prototype);
      ObjectSetPrototypeOf(Transform3, Duplex);
      var kCallback = Symbol2("kCallback");
      function Transform3(options) {
        if (!(this instanceof Transform3)) return new Transform3(options);
        const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
        if (readableHighWaterMark === 0) {
          options = {
            ...options,
            highWaterMark: null,
            readableHighWaterMark,
            // TODO (ronag): 0 is not optimal since we have
            // a "bug" where we check needDrain before calling _write and not after.
            // Refs: https://github.com/nodejs/node/pull/32887
            // Refs: https://github.com/nodejs/node/pull/35941
            writableHighWaterMark: options.writableHighWaterMark || 0
          };
        }
        Duplex.call(this, options);
        this._readableState.sync = false;
        this[kCallback] = null;
        if (options) {
          if (typeof options.transform === "function") this._transform = options.transform;
          if (typeof options.flush === "function") this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function final(cb) {
        if (typeof this._flush === "function" && !this.destroyed) {
          this._flush((er, data) => {
            if (er) {
              if (cb) {
                cb(er);
              } else {
                this.destroy(er);
              }
              return;
            }
            if (data != null) {
              this.push(data);
            }
            this.push(null);
            if (cb) {
              cb();
            }
          });
        } else {
          this.push(null);
          if (cb) {
            cb();
          }
        }
      }
      function prefinish() {
        if (this._final !== final) {
          final.call(this);
        }
      }
      Transform3.prototype._final = final;
      Transform3.prototype._transform = function(chunk, encoding, callback) {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
      };
      Transform3.prototype._write = function(chunk, encoding, callback) {
        const rState = this._readableState;
        const wState = this._writableState;
        const length = rState.length;
        this._transform(chunk, encoding, (err, val) => {
          if (err) {
            callback(err);
            return;
          }
          if (val != null) {
            this.push(val);
          }
          if (wState.ended || // Backwards compat.
          length === rState.length || // Backwards compat.
          rState.length < rState.highWaterMark) {
            callback();
          } else {
            this[kCallback] = callback;
          }
        });
      };
      Transform3.prototype._read = function() {
        if (this[kCallback]) {
          const callback = this[kCallback];
          this[kCallback] = null;
          callback();
        }
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/passthrough.js
  var require_passthrough = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/passthrough.js"(exports, module) {
      "use strict";
      var { ObjectSetPrototypeOf } = require_primordials();
      module.exports = PassThrough;
      var Transform3 = require_transform();
      ObjectSetPrototypeOf(PassThrough.prototype, Transform3.prototype);
      ObjectSetPrototypeOf(PassThrough, Transform3);
      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);
        Transform3.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
      var process = require_process();
      var { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = require_primordials();
      var eos = require_end_of_stream();
      var { once } = require_util();
      var destroyImpl = require_destroy();
      var Duplex = require_duplex();
      var {
        aggregateTwoErrors,
        codes: {
          ERR_INVALID_ARG_TYPE,
          ERR_INVALID_RETURN_VALUE,
          ERR_MISSING_ARGS,
          ERR_STREAM_DESTROYED,
          ERR_STREAM_PREMATURE_CLOSE
        },
        AbortError
      } = require_errors();
      var { validateFunction, validateAbortSignal } = require_validators();
      var {
        isIterable,
        isReadable,
        isReadableNodeStream,
        isNodeStream,
        isTransformStream,
        isWebStream,
        isReadableStream,
        isReadableFinished
      } = require_utils();
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var PassThrough;
      var Readable2;
      var addAbortListener;
      function destroyer(stream, reading, writing) {
        let finished = false;
        stream.on("close", () => {
          finished = true;
        });
        const cleanup = eos(
          stream,
          {
            readable: reading,
            writable: writing
          },
          (err) => {
            finished = !err;
          }
        );
        return {
          destroy: (err) => {
            if (finished) return;
            finished = true;
            destroyImpl.destroyer(stream, err || new ERR_STREAM_DESTROYED("pipe"));
          },
          cleanup
        };
      }
      function popCallback(streams) {
        validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
        return streams.pop();
      }
      function makeAsyncIterable(val) {
        if (isIterable(val)) {
          return val;
        } else if (isReadableNodeStream(val)) {
          return fromReadable(val);
        }
        throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
      }
      async function* fromReadable(val) {
        if (!Readable2) {
          Readable2 = require_readable();
        }
        yield* Readable2.prototype[SymbolAsyncIterator].call(val);
      }
      async function pumpToNode(iterable, writable, finish, { end }) {
        let error;
        let onresolve = null;
        const resume = (err) => {
          if (err) {
            error = err;
          }
          if (onresolve) {
            const callback = onresolve;
            onresolve = null;
            callback();
          }
        };
        const wait = () => new Promise2((resolve, reject) => {
          if (error) {
            reject(error);
          } else {
            onresolve = () => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            };
          }
        });
        writable.on("drain", resume);
        const cleanup = eos(
          writable,
          {
            readable: false
          },
          resume
        );
        try {
          if (writable.writableNeedDrain) {
            await wait();
          }
          for await (const chunk of iterable) {
            if (!writable.write(chunk)) {
              await wait();
            }
          }
          if (end) {
            writable.end();
            await wait();
          }
          finish();
        } catch (err) {
          finish(error !== err ? aggregateTwoErrors(error, err) : err);
        } finally {
          cleanup();
          writable.off("drain", resume);
        }
      }
      async function pumpToWeb(readable, writable, finish, { end }) {
        if (isTransformStream(writable)) {
          writable = writable.writable;
        }
        const writer = writable.getWriter();
        try {
          for await (const chunk of readable) {
            await writer.ready;
            writer.write(chunk).catch(() => {
            });
          }
          await writer.ready;
          if (end) {
            await writer.close();
          }
          finish();
        } catch (err) {
          try {
            await writer.abort(err);
            finish(err);
          } catch (err2) {
            finish(err2);
          }
        }
      }
      function pipeline(...streams) {
        return pipelineImpl(streams, once(popCallback(streams)));
      }
      function pipelineImpl(streams, callback, opts) {
        if (streams.length === 1 && ArrayIsArray(streams[0])) {
          streams = streams[0];
        }
        if (streams.length < 2) {
          throw new ERR_MISSING_ARGS("streams");
        }
        const ac = new AbortController();
        const signal = ac.signal;
        const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
        const lastStreamCleanup = [];
        validateAbortSignal(outerSignal, "options.signal");
        function abort() {
          finishImpl(new AbortError());
        }
        addAbortListener = addAbortListener || require_util().addAbortListener;
        let disposable;
        if (outerSignal) {
          disposable = addAbortListener(outerSignal, abort);
        }
        let error;
        let value;
        const destroys = [];
        let finishCount = 0;
        function finish(err) {
          finishImpl(err, --finishCount === 0);
        }
        function finishImpl(err, final) {
          var _disposable;
          if (err && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
            error = err;
          }
          if (!error && !final) {
            return;
          }
          while (destroys.length) {
            destroys.shift()(error);
          }
          ;
          (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
          ac.abort();
          if (final) {
            if (!error) {
              lastStreamCleanup.forEach((fn) => fn());
            }
            process.nextTick(callback, error, value);
          }
        }
        let ret;
        for (let i = 0; i < streams.length; i++) {
          const stream = streams[i];
          const reading = i < streams.length - 1;
          const writing = i > 0;
          const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
          const isLastStream = i === streams.length - 1;
          if (isNodeStream(stream)) {
            let onError2 = function(err) {
              if (err && err.name !== "AbortError" && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
                finish(err);
              }
            };
            var onError = onError2;
            if (end) {
              const { destroy, cleanup } = destroyer(stream, reading, writing);
              destroys.push(destroy);
              if (isReadable(stream) && isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            }
            stream.on("error", onError2);
            if (isReadable(stream) && isLastStream) {
              lastStreamCleanup.push(() => {
                stream.removeListener("error", onError2);
              });
            }
          }
          if (i === 0) {
            if (typeof stream === "function") {
              ret = stream({
                signal
              });
              if (!isIterable(ret)) {
                throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
              }
            } else if (isIterable(stream) || isReadableNodeStream(stream) || isTransformStream(stream)) {
              ret = stream;
            } else {
              ret = Duplex.from(stream);
            }
          } else if (typeof stream === "function") {
            if (isTransformStream(ret)) {
              var _ret;
              ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
            } else {
              ret = makeAsyncIterable(ret);
            }
            ret = stream(ret, {
              signal
            });
            if (reading) {
              if (!isIterable(ret, true)) {
                throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
              }
            } else {
              var _ret2;
              if (!PassThrough) {
                PassThrough = require_passthrough();
              }
              const pt = new PassThrough({
                objectMode: true
              });
              const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
              if (typeof then === "function") {
                finishCount++;
                then.call(
                  ret,
                  (val) => {
                    value = val;
                    if (val != null) {
                      pt.write(val);
                    }
                    if (end) {
                      pt.end();
                    }
                    process.nextTick(finish);
                  },
                  (err) => {
                    pt.destroy(err);
                    process.nextTick(finish, err);
                  }
                );
              } else if (isIterable(ret, true)) {
                finishCount++;
                pumpToNode(ret, pt, finish, {
                  end
                });
              } else if (isReadableStream(ret) || isTransformStream(ret)) {
                const toRead = ret.readable || ret;
                finishCount++;
                pumpToNode(toRead, pt, finish, {
                  end
                });
              } else {
                throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
              }
              ret = pt;
              const { destroy, cleanup } = destroyer(ret, false, true);
              destroys.push(destroy);
              if (isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            }
          } else if (isNodeStream(stream)) {
            if (isReadableNodeStream(ret)) {
              finishCount += 2;
              const cleanup = pipe(ret, stream, finish, {
                end
              });
              if (isReadable(stream) && isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            } else if (isTransformStream(ret) || isReadableStream(ret)) {
              const toRead = ret.readable || ret;
              finishCount++;
              pumpToNode(toRead, stream, finish, {
                end
              });
            } else if (isIterable(ret)) {
              finishCount++;
              pumpToNode(ret, stream, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_ARG_TYPE(
                "val",
                ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
                ret
              );
            }
            ret = stream;
          } else if (isWebStream(stream)) {
            if (isReadableNodeStream(ret)) {
              finishCount++;
              pumpToWeb(makeAsyncIterable(ret), stream, finish, {
                end
              });
            } else if (isReadableStream(ret) || isIterable(ret)) {
              finishCount++;
              pumpToWeb(ret, stream, finish, {
                end
              });
            } else if (isTransformStream(ret)) {
              finishCount++;
              pumpToWeb(ret.readable, stream, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_ARG_TYPE(
                "val",
                ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
                ret
              );
            }
            ret = stream;
          } else {
            ret = Duplex.from(stream);
          }
        }
        if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
          process.nextTick(abort);
        }
        return ret;
      }
      function pipe(src, dst, finish, { end }) {
        let ended = false;
        dst.on("close", () => {
          if (!ended) {
            finish(new ERR_STREAM_PREMATURE_CLOSE());
          }
        });
        src.pipe(dst, {
          end: false
        });
        if (end) {
          let endFn2 = function() {
            ended = true;
            dst.end();
          };
          var endFn = endFn2;
          if (isReadableFinished(src)) {
            process.nextTick(endFn2);
          } else {
            src.once("end", endFn2);
          }
        } else {
          finish();
        }
        eos(
          src,
          {
            readable: true,
            writable: false
          },
          (err) => {
            const rState = src._readableState;
            if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
              src.once("end", finish).once("error", finish);
            } else {
              finish(err);
            }
          }
        );
        return eos(
          dst,
          {
            readable: false,
            writable: true
          },
          finish
        );
      }
      module.exports = {
        pipelineImpl,
        pipeline
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/compose.js
  var require_compose = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/compose.js"(exports, module) {
      "use strict";
      var { pipeline } = require_pipeline();
      var Duplex = require_duplex();
      var { destroyer } = require_destroy();
      var {
        isNodeStream,
        isReadable,
        isWritable,
        isWebStream,
        isTransformStream,
        isWritableStream,
        isReadableStream
      } = require_utils();
      var {
        AbortError,
        codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
      } = require_errors();
      var eos = require_end_of_stream();
      module.exports = function compose(...streams) {
        if (streams.length === 0) {
          throw new ERR_MISSING_ARGS("streams");
        }
        if (streams.length === 1) {
          return Duplex.from(streams[0]);
        }
        const orgStreams = [...streams];
        if (typeof streams[0] === "function") {
          streams[0] = Duplex.from(streams[0]);
        }
        if (typeof streams[streams.length - 1] === "function") {
          const idx = streams.length - 1;
          streams[idx] = Duplex.from(streams[idx]);
        }
        for (let n = 0; n < streams.length; ++n) {
          if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
            continue;
          }
          if (n < streams.length - 1 && !(isReadable(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
          }
          if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
          }
        }
        let ondrain;
        let onfinish;
        let onreadable;
        let onclose;
        let d;
        function onfinished(err) {
          const cb = onclose;
          onclose = null;
          if (cb) {
            cb(err);
          } else if (err) {
            d.destroy(err);
          } else if (!readable && !writable) {
            d.destroy();
          }
        }
        const head = streams[0];
        const tail = pipeline(streams, onfinished);
        const writable = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
        const readable = !!(isReadable(tail) || isReadableStream(tail) || isTransformStream(tail));
        d = new Duplex({
          // TODO (ronag): highWaterMark?
          writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
          readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
          writable,
          readable
        });
        if (writable) {
          if (isNodeStream(head)) {
            d._write = function(chunk, encoding, callback) {
              if (head.write(chunk, encoding)) {
                callback();
              } else {
                ondrain = callback;
              }
            };
            d._final = function(callback) {
              head.end();
              onfinish = callback;
            };
            head.on("drain", function() {
              if (ondrain) {
                const cb = ondrain;
                ondrain = null;
                cb();
              }
            });
          } else if (isWebStream(head)) {
            const writable2 = isTransformStream(head) ? head.writable : head;
            const writer = writable2.getWriter();
            d._write = async function(chunk, encoding, callback) {
              try {
                await writer.ready;
                writer.write(chunk).catch(() => {
                });
                callback();
              } catch (err) {
                callback(err);
              }
            };
            d._final = async function(callback) {
              try {
                await writer.ready;
                writer.close().catch(() => {
                });
                onfinish = callback;
              } catch (err) {
                callback(err);
              }
            };
          }
          const toRead = isTransformStream(tail) ? tail.readable : tail;
          eos(toRead, () => {
            if (onfinish) {
              const cb = onfinish;
              onfinish = null;
              cb();
            }
          });
        }
        if (readable) {
          if (isNodeStream(tail)) {
            tail.on("readable", function() {
              if (onreadable) {
                const cb = onreadable;
                onreadable = null;
                cb();
              }
            });
            tail.on("end", function() {
              d.push(null);
            });
            d._read = function() {
              while (true) {
                const buf = tail.read();
                if (buf === null) {
                  onreadable = d._read;
                  return;
                }
                if (!d.push(buf)) {
                  return;
                }
              }
            };
          } else if (isWebStream(tail)) {
            const readable2 = isTransformStream(tail) ? tail.readable : tail;
            const reader = readable2.getReader();
            d._read = async function() {
              while (true) {
                try {
                  const { value, done } = await reader.read();
                  if (!d.push(value)) {
                    return;
                  }
                  if (done) {
                    d.push(null);
                    return;
                  }
                } catch {
                  return;
                }
              }
            };
          }
        }
        d._destroy = function(err, callback) {
          if (!err && onclose !== null) {
            err = new AbortError();
          }
          onreadable = null;
          ondrain = null;
          onfinish = null;
          if (onclose === null) {
            callback(err);
          } else {
            onclose = callback;
            if (isNodeStream(tail)) {
              destroyer(tail, err);
            }
          }
        };
        return d;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/operators.js
  var require_operators = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/operators.js"(exports, module) {
      "use strict";
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var {
        codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
        AbortError
      } = require_errors();
      var { validateAbortSignal, validateInteger, validateObject } = require_validators();
      var kWeakHandler = require_primordials().Symbol("kWeak");
      var kResistStopPropagation = require_primordials().Symbol("kResistStopPropagation");
      var { finished } = require_end_of_stream();
      var staticCompose = require_compose();
      var { addAbortSignalNoValidate } = require_add_abort_signal();
      var { isWritable, isNodeStream } = require_utils();
      var { deprecate } = require_util();
      var {
        ArrayPrototypePush,
        Boolean: Boolean2,
        MathFloor,
        Number: Number2,
        NumberIsNaN,
        Promise: Promise2,
        PromiseReject,
        PromiseResolve,
        PromisePrototypeThen,
        Symbol: Symbol2
      } = require_primordials();
      var kEmpty = Symbol2("kEmpty");
      var kEof = Symbol2("kEof");
      function compose(stream, options) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        if (isNodeStream(stream) && !isWritable(stream)) {
          throw new ERR_INVALID_ARG_VALUE("stream", stream, "must be writable");
        }
        const composedStream = staticCompose(this, stream);
        if (options !== null && options !== void 0 && options.signal) {
          addAbortSignalNoValidate(options.signal, composedStream);
        }
        return composedStream;
      }
      function map(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        let concurrency = 1;
        if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
          concurrency = MathFloor(options.concurrency);
        }
        let highWaterMark = concurrency - 1;
        if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
          highWaterMark = MathFloor(options.highWaterMark);
        }
        validateInteger(concurrency, "options.concurrency", 1);
        validateInteger(highWaterMark, "options.highWaterMark", 0);
        highWaterMark += concurrency;
        return async function* map2() {
          const signal = require_util().AbortSignalAny(
            [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
          );
          const stream = this;
          const queue = [];
          const signalOpt = {
            signal
          };
          let next;
          let resume;
          let done = false;
          let cnt = 0;
          function onCatch() {
            done = true;
            afterItemProcessed();
          }
          function afterItemProcessed() {
            cnt -= 1;
            maybeResume();
          }
          function maybeResume() {
            if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
              resume();
              resume = null;
            }
          }
          async function pump() {
            try {
              for await (let val of stream) {
                if (done) {
                  return;
                }
                if (signal.aborted) {
                  throw new AbortError();
                }
                try {
                  val = fn(val, signalOpt);
                  if (val === kEmpty) {
                    continue;
                  }
                  val = PromiseResolve(val);
                } catch (err) {
                  val = PromiseReject(err);
                }
                cnt += 1;
                PromisePrototypeThen(val, afterItemProcessed, onCatch);
                queue.push(val);
                if (next) {
                  next();
                  next = null;
                }
                if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
                  await new Promise2((resolve) => {
                    resume = resolve;
                  });
                }
              }
              queue.push(kEof);
            } catch (err) {
              const val = PromiseReject(err);
              PromisePrototypeThen(val, afterItemProcessed, onCatch);
              queue.push(val);
            } finally {
              done = true;
              if (next) {
                next();
                next = null;
              }
            }
          }
          pump();
          try {
            while (true) {
              while (queue.length > 0) {
                const val = await queue[0];
                if (val === kEof) {
                  return;
                }
                if (signal.aborted) {
                  throw new AbortError();
                }
                if (val !== kEmpty) {
                  yield val;
                }
                queue.shift();
                maybeResume();
              }
              await new Promise2((resolve) => {
                next = resolve;
              });
            }
          } finally {
            done = true;
            if (resume) {
              resume();
              resume = null;
            }
          }
        }.call(this);
      }
      function asIndexedPairs(options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        return async function* asIndexedPairs2() {
          let index = 0;
          for await (const val of this) {
            var _options$signal;
            if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
              throw new AbortError({
                cause: options.signal.reason
              });
            }
            yield [index++, val];
          }
        }.call(this);
      }
      async function some(fn, options = void 0) {
        for await (const unused of filter.call(this, fn, options)) {
          return true;
        }
        return false;
      }
      async function every(fn, options = void 0) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        return !await some.call(
          this,
          async (...args) => {
            return !await fn(...args);
          },
          options
        );
      }
      async function find(fn, options) {
        for await (const result of filter.call(this, fn, options)) {
          return result;
        }
        return void 0;
      }
      async function forEach(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        async function forEachFn(value, options2) {
          await fn(value, options2);
          return kEmpty;
        }
        for await (const unused of map.call(this, forEachFn, options)) ;
      }
      function filter(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        async function filterFn(value, options2) {
          if (await fn(value, options2)) {
            return value;
          }
          return kEmpty;
        }
        return map.call(this, filterFn, options);
      }
      var ReduceAwareErrMissingArgs = class extends ERR_MISSING_ARGS {
        constructor() {
          super("reduce");
          this.message = "Reduce of an empty stream requires an initial value";
        }
      };
      async function reduce(reducer, initialValue, options) {
        var _options$signal2;
        if (typeof reducer !== "function") {
          throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
        }
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        let hasInitialValue = arguments.length > 1;
        if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
          const err = new AbortError(void 0, {
            cause: options.signal.reason
          });
          this.once("error", () => {
          });
          await finished(this.destroy(err));
          throw err;
        }
        const ac = new AbortController();
        const signal = ac.signal;
        if (options !== null && options !== void 0 && options.signal) {
          const opts = {
            once: true,
            [kWeakHandler]: this,
            [kResistStopPropagation]: true
          };
          options.signal.addEventListener("abort", () => ac.abort(), opts);
        }
        let gotAnyItemFromStream = false;
        try {
          for await (const value of this) {
            var _options$signal3;
            gotAnyItemFromStream = true;
            if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
              throw new AbortError();
            }
            if (!hasInitialValue) {
              initialValue = value;
              hasInitialValue = true;
            } else {
              initialValue = await reducer(initialValue, value, {
                signal
              });
            }
          }
          if (!gotAnyItemFromStream && !hasInitialValue) {
            throw new ReduceAwareErrMissingArgs();
          }
        } finally {
          ac.abort();
        }
        return initialValue;
      }
      async function toArray(options) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        const result = [];
        for await (const val of this) {
          var _options$signal4;
          if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
            throw new AbortError(void 0, {
              cause: options.signal.reason
            });
          }
          ArrayPrototypePush(result, val);
        }
        return result;
      }
      function flatMap(fn, options) {
        const values3 = map.call(this, fn, options);
        return async function* flatMap2() {
          for await (const val of values3) {
            yield* val;
          }
        }.call(this);
      }
      function toIntegerOrInfinity(number) {
        number = Number2(number);
        if (NumberIsNaN(number)) {
          return 0;
        }
        if (number < 0) {
          throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
        }
        return number;
      }
      function drop(number, options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        number = toIntegerOrInfinity(number);
        return async function* drop2() {
          var _options$signal5;
          if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
            throw new AbortError();
          }
          for await (const val of this) {
            var _options$signal6;
            if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
              throw new AbortError();
            }
            if (number-- <= 0) {
              yield val;
            }
          }
        }.call(this);
      }
      function take(number, options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        number = toIntegerOrInfinity(number);
        return async function* take2() {
          var _options$signal7;
          if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
            throw new AbortError();
          }
          for await (const val of this) {
            var _options$signal8;
            if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
              throw new AbortError();
            }
            if (number-- > 0) {
              yield val;
            }
            if (number <= 0) {
              return;
            }
          }
        }.call(this);
      }
      module.exports.streamReturningOperators = {
        asIndexedPairs: deprecate(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
        drop,
        filter,
        flatMap,
        map,
        take,
        compose
      };
      module.exports.promiseReturningOperators = {
        every,
        forEach,
        reduce,
        toArray,
        some,
        find
      };
    }
  });

  // node_modules/readable-stream/lib/stream/promises.js
  var require_promises = __commonJS({
    "node_modules/readable-stream/lib/stream/promises.js"(exports, module) {
      "use strict";
      var { ArrayPrototypePop, Promise: Promise2 } = require_primordials();
      var { isIterable, isNodeStream, isWebStream } = require_utils();
      var { pipelineImpl: pl } = require_pipeline();
      var { finished } = require_end_of_stream();
      require_stream();
      function pipeline(...streams) {
        return new Promise2((resolve, reject) => {
          let signal;
          let end;
          const lastArg = streams[streams.length - 1];
          if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
            const options = ArrayPrototypePop(streams);
            signal = options.signal;
            end = options.end;
          }
          pl(
            streams,
            (err, value) => {
              if (err) {
                reject(err);
              } else {
                resolve(value);
              }
            },
            {
              signal,
              end
            }
          );
        });
      }
      module.exports = {
        finished,
        pipeline
      };
    }
  });

  // node_modules/readable-stream/lib/stream.js
  var require_stream = __commonJS({
    "node_modules/readable-stream/lib/stream.js"(exports, module) {
      "use strict";
      var { Buffer: Buffer3 } = require_buffer();
      var { ObjectDefineProperty, ObjectKeys, ReflectApply } = require_primordials();
      var {
        promisify: { custom: customPromisify }
      } = require_util();
      var { streamReturningOperators, promiseReturningOperators } = require_operators();
      var {
        codes: { ERR_ILLEGAL_CONSTRUCTOR }
      } = require_errors();
      var compose = require_compose();
      var { setDefaultHighWaterMark, getDefaultHighWaterMark } = require_state();
      var { pipeline } = require_pipeline();
      var { destroyer } = require_destroy();
      var eos = require_end_of_stream();
      var promises = require_promises();
      var utils = require_utils();
      var Stream = module.exports = require_legacy().Stream;
      Stream.isDestroyed = utils.isDestroyed;
      Stream.isDisturbed = utils.isDisturbed;
      Stream.isErrored = utils.isErrored;
      Stream.isReadable = utils.isReadable;
      Stream.isWritable = utils.isWritable;
      Stream.Readable = require_readable();
      for (const key of ObjectKeys(streamReturningOperators)) {
        let fn = function(...args) {
          if (new.target) {
            throw ERR_ILLEGAL_CONSTRUCTOR();
          }
          return Stream.Readable.from(ReflectApply(op, this, args));
        };
        const op = streamReturningOperators[key];
        ObjectDefineProperty(fn, "name", {
          __proto__: null,
          value: op.name
        });
        ObjectDefineProperty(fn, "length", {
          __proto__: null,
          value: op.length
        });
        ObjectDefineProperty(Stream.Readable.prototype, key, {
          __proto__: null,
          value: fn,
          enumerable: false,
          configurable: true,
          writable: true
        });
      }
      for (const key of ObjectKeys(promiseReturningOperators)) {
        let fn = function(...args) {
          if (new.target) {
            throw ERR_ILLEGAL_CONSTRUCTOR();
          }
          return ReflectApply(op, this, args);
        };
        const op = promiseReturningOperators[key];
        ObjectDefineProperty(fn, "name", {
          __proto__: null,
          value: op.name
        });
        ObjectDefineProperty(fn, "length", {
          __proto__: null,
          value: op.length
        });
        ObjectDefineProperty(Stream.Readable.prototype, key, {
          __proto__: null,
          value: fn,
          enumerable: false,
          configurable: true,
          writable: true
        });
      }
      Stream.Writable = require_writable();
      Stream.Duplex = require_duplex();
      Stream.Transform = require_transform();
      Stream.PassThrough = require_passthrough();
      Stream.pipeline = pipeline;
      var { addAbortSignal } = require_add_abort_signal();
      Stream.addAbortSignal = addAbortSignal;
      Stream.finished = eos;
      Stream.destroy = destroyer;
      Stream.compose = compose;
      Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
      Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
      ObjectDefineProperty(Stream, "promises", {
        __proto__: null,
        configurable: true,
        enumerable: true,
        get() {
          return promises;
        }
      });
      ObjectDefineProperty(pipeline, customPromisify, {
        __proto__: null,
        enumerable: true,
        get() {
          return promises.pipeline;
        }
      });
      ObjectDefineProperty(eos, customPromisify, {
        __proto__: null,
        enumerable: true,
        get() {
          return promises.finished;
        }
      });
      Stream.Stream = Stream;
      Stream._isUint8Array = function isUint8Array(value) {
        return value instanceof Uint8Array;
      };
      Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
        return Buffer3.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      };
    }
  });

  // node_modules/readable-stream/lib/ours/browser.js
  var require_browser3 = __commonJS({
    "node_modules/readable-stream/lib/ours/browser.js"(exports, module) {
      "use strict";
      var CustomStream = require_stream();
      var promises = require_promises();
      var originalDestroy = CustomStream.Readable.destroy;
      module.exports = CustomStream.Readable;
      module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
      module.exports._isUint8Array = CustomStream._isUint8Array;
      module.exports.isDisturbed = CustomStream.isDisturbed;
      module.exports.isErrored = CustomStream.isErrored;
      module.exports.isReadable = CustomStream.isReadable;
      module.exports.Readable = CustomStream.Readable;
      module.exports.Writable = CustomStream.Writable;
      module.exports.Duplex = CustomStream.Duplex;
      module.exports.Transform = CustomStream.Transform;
      module.exports.PassThrough = CustomStream.PassThrough;
      module.exports.addAbortSignal = CustomStream.addAbortSignal;
      module.exports.finished = CustomStream.finished;
      module.exports.destroy = CustomStream.destroy;
      module.exports.destroy = originalDestroy;
      module.exports.pipeline = CustomStream.pipeline;
      module.exports.compose = CustomStream.compose;
      Object.defineProperty(CustomStream, "promises", {
        configurable: true,
        enumerable: true,
        get() {
          return promises;
        }
      });
      module.exports.Stream = CustomStream.Stream;
      module.exports.default = module.exports;
    }
  });

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    Calendar: () => Calendar,
    Flashcards: () => Flashcards2,
    Movies: () => Movies,
    Recipes: () => Recipes,
    connectApp: () => connectApp,
    dataModule: () => dataModule,
    parseMovies: () => parseMovies,
    parseRecipes: () => parseRecipes
  });

  // src/native-solid.js
  function nativeSolidView({ fetch: authenticatedFetch, webId, root, adapter }, helpers2, domain, permission = () => true) {
    const pod = new URL(root);
    if (!pod.pathname.endsWith("/") || pod.search || pod.hash || pod.username || pod.password || !(pod.protocol === "https:" || pod.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(pod.hostname))) throw Error("Choose an HTTPS Solid Pod root (or localhost)");
    if (typeof authenticatedFetch !== "function") throw Error("A Solid session fetch is required");
    const profile = new URL(webId);
    profile.hash = "";
    if (profile.username || profile.password || !["https:", "http:"].includes(profile.protocol)) throw Error("Unsupported Solid identity URL");
    const scoped = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input), pod);
      if (url.username || url.password || /%(?:2f|5c)/i.test(url.pathname) || !["https:", "http:"].includes(url.protocol)) throw Error("Unsupported Solid document URL");
      const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
      const own = url.href.startsWith(pod.href), read = ["GET", "HEAD"].includes(method);
      if (!permission(read ? "r" : "rw")) return new Response(null, { status: 403 });
      if (!own && !read) return new Response(null, { status: 403 });
      if (own || url.href.split("#")[0] === profile.href) return authenticatedFetch(input instanceof Request ? input : url.href, init);
      return publicRead(input, init, pod);
    };
    const api = { ...helpers2, nativeSolidDocuments: true, root: pod.href, webId, fetch: scoped };
    if (adapter) Object.defineProperty(api, "adapter", { value: adapter, enumerable: true });
    return Object.assign(api, domain(api));
  }
  function publicRead(input, init, base) {
    const request = new Request(input instanceof Request ? input : new URL(String(input), base), init);
    if (!["GET", "HEAD"].includes(request.method)) return Promise.resolve(new Response(null, { status: 403 }));
    return globalThis.fetch(request.url, {
      method: request.method,
      credentials: "omit",
      signal: request.signal,
      headers: { Accept: request.headers.get("Accept") || "*/*" }
    });
  }

  // node_modules/n3/src/index.js
  var src_exports = {};
  __export(src_exports, {
    BaseIRI: () => BaseIRI,
    BlankNode: () => BlankNode,
    DataFactory: () => N3DataFactory_default,
    DefaultGraph: () => DefaultGraph,
    EntityIndex: () => N3EntityIndex,
    Lexer: () => N3Lexer,
    Literal: () => Literal,
    NamedNode: () => NamedNode,
    Parser: () => N3Parser,
    Quad: () => Quad,
    Reasoner: () => N3Reasoner,
    Store: () => N3Store,
    StoreFactory: () => N3DatasetCoreFactory,
    StreamParser: () => N3StreamParser,
    StreamWriter: () => N3StreamWriter,
    Term: () => Term,
    Triple: () => Quad,
    Util: () => N3Util_exports,
    Variable: () => Variable,
    Writer: () => N3Writer,
    default: () => src_default,
    getRulesFromDataset: () => getRulesFromDataset,
    termFromId: () => termFromId,
    termToId: () => termToId
  });

  // node_modules/n3/src/N3Lexer.js
  var import_buffer = __toESM(require_buffer());

  // node_modules/n3/src/IRIs.js
  var RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  var XSD = "http://www.w3.org/2001/XMLSchema#";
  var SWAP = "http://www.w3.org/2000/10/swap/";
  var IRIs_default = {
    xsd: {
      decimal: `${XSD}decimal`,
      boolean: `${XSD}boolean`,
      double: `${XSD}double`,
      integer: `${XSD}integer`,
      string: `${XSD}string`
    },
    rdf: {
      type: `${RDF}type`,
      nil: `${RDF}nil`,
      first: `${RDF}first`,
      rest: `${RDF}rest`,
      langString: `${RDF}langString`
    },
    owl: {
      sameAs: "http://www.w3.org/2002/07/owl#sameAs"
    },
    r: {
      forSome: `${SWAP}reify#forSome`,
      forAll: `${SWAP}reify#forAll`
    },
    log: {
      implies: `${SWAP}log#implies`,
      isImpliedBy: `${SWAP}log#isImpliedBy`
    }
  };

  // node_modules/n3/src/N3Lexer.js
  var { xsd } = IRIs_default;
  var escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g;
  var escapeReplacements = {
    "\\": "\\",
    "'": "'",
    '"': '"',
    "n": "\n",
    "r": "\r",
    "t": "	",
    "f": "\f",
    "b": "\b",
    "_": "_",
    "~": "~",
    ".": ".",
    "-": "-",
    "!": "!",
    "$": "$",
    "&": "&",
    "(": "(",
    ")": ")",
    "*": "*",
    "+": "+",
    ",": ",",
    ";": ";",
    "=": "=",
    "/": "/",
    "?": "?",
    "#": "#",
    "@": "@",
    "%": "%"
  };
  var illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
  var lineModeRegExps = {
    _iri: true,
    _unescapedIri: true,
    _simpleQuotedString: true,
    _langcode: true,
    _blank: true,
    _newline: true,
    _comment: true,
    _whitespace: true,
    _endOfFile: true
  };
  var invalidRegExp = /$0^/;
  var N3Lexer = class {
    constructor(options) {
      this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;
      this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;
      this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/;
      this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/;
      this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i;
      this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/;
      this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/;
      this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/;
      this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/;
      this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/;
      this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/;
      this._keyword = /^@[a-z]+(?=[\s#<:])/i;
      this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i;
      this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/;
      this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/;
      this._comment = /#([^\n\r]*)/;
      this._whitespace = /^[ \t]+/;
      this._endOfFile = /^(?:#[^\n\r]*)?$/;
      options = options || {};
      this._isImpliedBy = options.isImpliedBy;
      if (this._lineMode = !!options.lineMode) {
        this._n3Mode = false;
        for (const key in this) {
          if (!(key in lineModeRegExps) && this[key] instanceof RegExp)
            this[key] = invalidRegExp;
        }
      } else {
        this._n3Mode = options.n3 !== false;
      }
      this.comments = !!options.comments;
      this._literalClosingPos = 0;
    }
    // ## Private methods
    // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
    _tokenizeToEnd(callback, inputFinished) {
      let input = this._input;
      let currentLineLength = input.length;
      while (true) {
        let whiteSpaceMatch, comment;
        while (whiteSpaceMatch = this._newline.exec(input)) {
          if (this.comments && (comment = this._comment.exec(whiteSpaceMatch[0])))
            emitToken("comment", comment[1], "", this._line, whiteSpaceMatch[0].length);
          input = input.substr(whiteSpaceMatch[0].length, input.length);
          currentLineLength = input.length;
          this._line++;
        }
        if (!whiteSpaceMatch && (whiteSpaceMatch = this._whitespace.exec(input)))
          input = input.substr(whiteSpaceMatch[0].length, input.length);
        if (this._endOfFile.test(input)) {
          if (inputFinished) {
            if (this.comments && (comment = this._comment.exec(input)))
              emitToken("comment", comment[1], "", this._line, input.length);
            input = null;
            emitToken("eof", "", "", this._line, 0);
          }
          return this._input = input;
        }
        const line = this._line, firstChar = input[0];
        let type = "", value = "", prefix2 = "", match = null, matchLength = 0, inconclusive = false;
        switch (firstChar) {
          case "^":
            if (input.length < 3)
              break;
            else if (input[1] === "^") {
              this._previousMarker = "^^";
              input = input.substr(2);
              if (input[0] !== "<") {
                inconclusive = true;
                break;
              }
            } else {
              if (this._n3Mode) {
                matchLength = 1;
                type = "^";
              }
              break;
            }
          // Fall through in case the type is an IRI
          case "<":
            if (match = this._unescapedIri.exec(input))
              type = "IRI", value = match[1];
            else if (match = this._iri.exec(input)) {
              value = this._unescape(match[1]);
              if (value === null || illegalIriChars.test(value))
                return reportSyntaxError(this);
              type = "IRI";
            } else if (input.length > 1 && input[1] === "<")
              type = "<<", matchLength = 2;
            else if (this._n3Mode && input.length > 1 && input[1] === "=") {
              matchLength = 2;
              if (this._isImpliedBy) type = "abbreviation", value = "<";
              else type = "inverse", value = ">";
            }
            break;
          case ">":
            if (input.length > 1 && input[1] === ">")
              type = ">>", matchLength = 2;
            break;
          case "_":
            if ((match = this._blank.exec(input)) || inputFinished && (match = this._blank.exec(`${input} `)))
              type = "blank", prefix2 = "_", value = match[1];
            break;
          case '"':
            if (match = this._simpleQuotedString.exec(input))
              value = match[1];
            else {
              ({ value, matchLength } = this._parseLiteral(input));
              if (value === null)
                return reportSyntaxError(this);
            }
            if (match !== null || matchLength !== 0) {
              type = "literal";
              this._literalClosingPos = 0;
            }
            break;
          case "'":
            if (!this._lineMode) {
              if (match = this._simpleApostropheString.exec(input))
                value = match[1];
              else {
                ({ value, matchLength } = this._parseLiteral(input));
                if (value === null)
                  return reportSyntaxError(this);
              }
              if (match !== null || matchLength !== 0) {
                type = "literal";
                this._literalClosingPos = 0;
              }
            }
            break;
          case "?":
            if (this._n3Mode && (match = this._variable.exec(input)))
              type = "var", value = match[0];
            break;
          case "@":
            if (this._previousMarker === "literal" && (match = this._langcode.exec(input)))
              type = "langcode", value = match[1];
            else if (match = this._keyword.exec(input))
              type = match[0];
            break;
          case ".":
            if (input.length === 1 ? inputFinished : input[1] < "0" || input[1] > "9") {
              type = ".";
              matchLength = 1;
              break;
            }
          // Fall through to numerical case (could be a decimal dot)
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          case "+":
          case "-":
            if (match = this._number.exec(input) || inputFinished && (match = this._number.exec(`${input} `))) {
              type = "literal", value = match[0];
              prefix2 = typeof match[1] === "string" ? xsd.double : typeof match[2] === "string" ? xsd.decimal : xsd.integer;
            }
            break;
          case "B":
          case "b":
          case "p":
          case "P":
          case "G":
          case "g":
            if (match = this._sparqlKeyword.exec(input))
              type = match[0].toUpperCase();
            else
              inconclusive = true;
            break;
          case "f":
          case "t":
            if (match = this._boolean.exec(input))
              type = "literal", value = match[0], prefix2 = xsd.boolean;
            else
              inconclusive = true;
            break;
          case "a":
            if (match = this._shortPredicates.exec(input))
              type = "abbreviation", value = "a";
            else
              inconclusive = true;
            break;
          case "=":
            if (this._n3Mode && input.length > 1) {
              type = "abbreviation";
              if (input[1] !== ">")
                matchLength = 1, value = "=";
              else
                matchLength = 2, value = ">";
            }
            break;
          case "!":
            if (!this._n3Mode)
              break;
          case ",":
          case ";":
          case "[":
          case "]":
          case "(":
          case ")":
          case "}":
            if (!this._lineMode) {
              matchLength = 1;
              type = firstChar;
            }
            break;
          case "{":
            if (!this._lineMode && input.length >= 2) {
              if (input[1] === "|")
                type = "{|", matchLength = 2;
              else
                type = firstChar, matchLength = 1;
            }
            break;
          case "|":
            if (input.length >= 2 && input[1] === "}")
              type = "|}", matchLength = 2;
            break;
          default:
            inconclusive = true;
        }
        if (inconclusive) {
          if ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (match = this._prefix.exec(input)))
            type = "prefix", value = match[1] || "";
          else if ((match = this._prefixed.exec(input)) || inputFinished && (match = this._prefixed.exec(`${input} `)))
            type = "prefixed", prefix2 = match[1] || "", value = this._unescape(match[2]);
        }
        if (this._previousMarker === "^^") {
          switch (type) {
            case "prefixed":
              type = "type";
              break;
            case "IRI":
              type = "typeIRI";
              break;
            default:
              type = "";
          }
        }
        if (!type) {
          if (inputFinished || !/^'''|^"""/.test(input) && /\n|\r/.test(input))
            return reportSyntaxError(this);
          else
            return this._input = input;
        }
        const length = matchLength || match[0].length;
        const token = emitToken(type, value, prefix2, line, length);
        this.previousToken = token;
        this._previousMarker = type;
        input = input.substr(length, input.length);
      }
      function emitToken(type, value, prefix2, line, length) {
        const start = input ? currentLineLength - input.length : currentLineLength;
        const end = start + length;
        const token = { type, value, prefix: prefix2, line, start, end };
        callback(null, token);
        return token;
      }
      function reportSyntaxError(self2) {
        callback(self2._syntaxError(/^\S*/.exec(input)[0]));
      }
    }
    // ### `_unescape` replaces N3 escape codes by their corresponding characters
    _unescape(item) {
      let invalid = false;
      const replaced = item.replace(escapeSequence, (sequence, unicode4, unicode8, escapedChar) => {
        if (typeof unicode4 === "string")
          return String.fromCharCode(Number.parseInt(unicode4, 16));
        if (typeof unicode8 === "string") {
          let charCode = Number.parseInt(unicode8, 16);
          return charCode <= 65535 ? String.fromCharCode(Number.parseInt(unicode8, 16)) : String.fromCharCode(55296 + ((charCode -= 65536) >> 10), 56320 + (charCode & 1023));
        }
        if (escapedChar in escapeReplacements)
          return escapeReplacements[escapedChar];
        invalid = true;
        return "";
      });
      return invalid ? null : replaced;
    }
    // ### `_parseLiteral` parses a literal into an unescaped value
    _parseLiteral(input) {
      if (input.length >= 3) {
        const opening = input.match(/^(?:"""|"|'''|'|)/)[0];
        const openingLength = opening.length;
        let closingPos = Math.max(this._literalClosingPos, openingLength);
        while ((closingPos = input.indexOf(opening, closingPos)) > 0) {
          let backslashCount = 0;
          while (input[closingPos - backslashCount - 1] === "\\")
            backslashCount++;
          if (backslashCount % 2 === 0) {
            const raw = input.substring(openingLength, closingPos);
            const lines = raw.split(/\r\n|\r|\n/).length - 1;
            const matchLength = closingPos + openingLength;
            if (openingLength === 1 && lines !== 0 || openingLength === 3 && this._lineMode)
              break;
            this._line += lines;
            return { value: this._unescape(raw), matchLength };
          }
          closingPos++;
        }
        this._literalClosingPos = input.length - openingLength + 1;
      }
      return { value: "", matchLength: 0 };
    }
    // ### `_syntaxError` creates a syntax error for the given issue
    _syntaxError(issue) {
      this._input = null;
      const err = new Error(`Unexpected "${issue}" on line ${this._line}.`);
      err.context = {
        token: void 0,
        line: this._line,
        previousToken: this.previousToken
      };
      return err;
    }
    // ### Strips off any starting UTF BOM mark.
    _readStartingBom(input) {
      return input.startsWith("\uFEFF") ? input.substr(1) : input;
    }
    // ## Public methods
    // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
    // The input can be a string or a stream.
    tokenize(input, callback) {
      this._line = 1;
      if (typeof input === "string") {
        this._input = this._readStartingBom(input);
        if (typeof callback === "function")
          queueMicrotask(() => this._tokenizeToEnd(callback, true));
        else {
          const tokens = [];
          let error;
          this._tokenizeToEnd((e, t) => e ? error = e : tokens.push(t), true);
          if (error) throw error;
          return tokens;
        }
      } else {
        this._pendingBuffer = null;
        if (typeof input.setEncoding === "function")
          input.setEncoding("utf8");
        input.on("data", (data) => {
          if (this._input !== null && data.length !== 0) {
            if (this._pendingBuffer) {
              data = import_buffer.Buffer.concat([this._pendingBuffer, data]);
              this._pendingBuffer = null;
            }
            if (data[data.length - 1] & 128) {
              this._pendingBuffer = data;
            } else {
              if (typeof this._input === "undefined")
                this._input = this._readStartingBom(typeof data === "string" ? data : data.toString());
              else
                this._input += data;
              this._tokenizeToEnd(callback, false);
            }
          }
        });
        input.on("end", () => {
          if (typeof this._input === "string")
            this._tokenizeToEnd(callback, true);
        });
        input.on("error", callback);
      }
    }
  };

  // node_modules/n3/src/N3DataFactory.js
  var { rdf, xsd: xsd2 } = IRIs_default;
  var DEFAULTGRAPH;
  var _blankNodeCounter = 0;
  var DataFactory = {
    namedNode,
    blankNode,
    variable,
    literal,
    defaultGraph,
    quad,
    triple: quad,
    fromTerm,
    fromQuad
  };
  var N3DataFactory_default = DataFactory;
  var Term = class _Term {
    constructor(id) {
      this.id = id;
    }
    // ### The value of this term
    get value() {
      return this.id;
    }
    // ### Returns whether this object represents the same term as the other
    equals(other) {
      if (other instanceof _Term)
        return this.id === other.id;
      return !!other && this.termType === other.termType && this.value === other.value;
    }
    // ### Implement hashCode for Immutable.js, since we implement `equals`
    // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
    hashCode() {
      return 0;
    }
    // ### Returns a plain object representation of this term
    toJSON() {
      return {
        termType: this.termType,
        value: this.value
      };
    }
  };
  var NamedNode = class extends Term {
    // ### The term type of this term
    get termType() {
      return "NamedNode";
    }
  };
  var Literal = class _Literal extends Term {
    // ### The term type of this term
    get termType() {
      return "Literal";
    }
    // ### The text value of this literal
    get value() {
      return this.id.substring(1, this.id.lastIndexOf('"'));
    }
    // ### The language of this literal
    get language() {
      const id = this.id;
      let atPos = id.lastIndexOf('"') + 1;
      return atPos < id.length && id[atPos++] === "@" ? id.substr(atPos).toLowerCase() : "";
    }
    // ### The datatype IRI of this literal
    get datatype() {
      return new NamedNode(this.datatypeString);
    }
    // ### The datatype string of this literal
    get datatypeString() {
      const id = this.id, dtPos = id.lastIndexOf('"') + 1;
      const char = dtPos < id.length ? id[dtPos] : "";
      return char === "^" ? id.substr(dtPos + 2) : (
        // If "@" follows, return rdf:langString; xsd:string otherwise
        char !== "@" ? xsd2.string : rdf.langString
      );
    }
    // ### Returns whether this object represents the same term as the other
    equals(other) {
      if (other instanceof _Literal)
        return this.id === other.id;
      return !!other && !!other.datatype && this.termType === other.termType && this.value === other.value && this.language === other.language && this.datatype.value === other.datatype.value;
    }
    toJSON() {
      return {
        termType: this.termType,
        value: this.value,
        language: this.language,
        datatype: { termType: "NamedNode", value: this.datatypeString }
      };
    }
  };
  var BlankNode = class extends Term {
    constructor(name) {
      super(`_:${name}`);
    }
    // ### The term type of this term
    get termType() {
      return "BlankNode";
    }
    // ### The name of this blank node
    get value() {
      return this.id.substr(2);
    }
  };
  var Variable = class extends Term {
    constructor(name) {
      super(`?${name}`);
    }
    // ### The term type of this term
    get termType() {
      return "Variable";
    }
    // ### The name of this variable
    get value() {
      return this.id.substr(1);
    }
  };
  var DefaultGraph = class extends Term {
    constructor() {
      super("");
      return DEFAULTGRAPH || this;
    }
    // ### The term type of this term
    get termType() {
      return "DefaultGraph";
    }
    // ### Returns whether this object represents the same term as the other
    equals(other) {
      return this === other || !!other && this.termType === other.termType;
    }
  };
  DEFAULTGRAPH = new DefaultGraph();
  function termFromId(id, factory, nested) {
    factory = factory || DataFactory;
    if (!id)
      return factory.defaultGraph();
    switch (id[0]) {
      case "?":
        return factory.variable(id.substr(1));
      case "_":
        return factory.blankNode(id.substr(2));
      case '"':
        if (factory === DataFactory)
          return new Literal(id);
        if (id[id.length - 1] === '"')
          return factory.literal(id.substr(1, id.length - 2));
        const endPos = id.lastIndexOf('"', id.length - 1);
        return factory.literal(
          id.substr(1, endPos - 1),
          id[endPos + 1] === "@" ? id.substr(endPos + 2) : factory.namedNode(id.substr(endPos + 3))
        );
      case "[":
        id = JSON.parse(id);
        break;
      default:
        if (!nested || !Array.isArray(id)) {
          return factory.namedNode(id);
        }
    }
    return factory.quad(
      termFromId(id[0], factory, true),
      termFromId(id[1], factory, true),
      termFromId(id[2], factory, true),
      id[3] && termFromId(id[3], factory, true)
    );
  }
  function termToId(term, nested) {
    if (typeof term === "string")
      return term;
    if (term instanceof Term && term.termType !== "Quad")
      return term.id;
    if (!term)
      return DEFAULTGRAPH.id;
    switch (term.termType) {
      case "NamedNode":
        return term.value;
      case "BlankNode":
        return `_:${term.value}`;
      case "Variable":
        return `?${term.value}`;
      case "DefaultGraph":
        return "";
      case "Literal":
        return `"${term.value}"${term.language ? `@${term.language}` : term.datatype && term.datatype.value !== xsd2.string ? `^^${term.datatype.value}` : ""}`;
      case "Quad":
        const res = [
          termToId(term.subject, true),
          termToId(term.predicate, true),
          termToId(term.object, true)
        ];
        if (term.graph && term.graph.termType !== "DefaultGraph") {
          res.push(termToId(term.graph, true));
        }
        return nested ? res : JSON.stringify(res);
      default:
        throw new Error(`Unexpected termType: ${term.termType}`);
    }
  }
  var Quad = class extends Term {
    constructor(subject, predicate, object, graph) {
      super("");
      this._subject = subject;
      this._predicate = predicate;
      this._object = object;
      this._graph = graph || DEFAULTGRAPH;
    }
    // ### The term type of this term
    get termType() {
      return "Quad";
    }
    get subject() {
      return this._subject;
    }
    get predicate() {
      return this._predicate;
    }
    get object() {
      return this._object;
    }
    get graph() {
      return this._graph;
    }
    // ### Returns a plain object representation of this quad
    toJSON() {
      return {
        termType: this.termType,
        subject: this._subject.toJSON(),
        predicate: this._predicate.toJSON(),
        object: this._object.toJSON(),
        graph: this._graph.toJSON()
      };
    }
    // ### Returns whether this object represents the same quad as the other
    equals(other) {
      return !!other && this._subject.equals(other.subject) && this._predicate.equals(other.predicate) && this._object.equals(other.object) && this._graph.equals(other.graph);
    }
  };
  function namedNode(iri) {
    return new NamedNode(iri);
  }
  function blankNode(name) {
    return new BlankNode(name || `n3-${_blankNodeCounter++}`);
  }
  function literal(value, languageOrDataType) {
    if (typeof languageOrDataType === "string")
      return new Literal(`"${value}"@${languageOrDataType.toLowerCase()}`);
    let datatype = languageOrDataType ? languageOrDataType.value : "";
    if (datatype === "") {
      if (typeof value === "boolean")
        datatype = xsd2.boolean;
      else if (typeof value === "number") {
        if (Number.isFinite(value))
          datatype = Number.isInteger(value) ? xsd2.integer : xsd2.double;
        else {
          datatype = xsd2.double;
          if (!Number.isNaN(value))
            value = value > 0 ? "INF" : "-INF";
        }
      }
    }
    return datatype === "" || datatype === xsd2.string ? new Literal(`"${value}"`) : new Literal(`"${value}"^^${datatype}`);
  }
  function variable(name) {
    return new Variable(name);
  }
  function defaultGraph() {
    return DEFAULTGRAPH;
  }
  function quad(subject, predicate, object, graph) {
    return new Quad(subject, predicate, object, graph);
  }
  function fromTerm(term) {
    if (term instanceof Term)
      return term;
    switch (term.termType) {
      case "NamedNode":
        return namedNode(term.value);
      case "BlankNode":
        return blankNode(term.value);
      case "Variable":
        return variable(term.value);
      case "DefaultGraph":
        return DEFAULTGRAPH;
      case "Literal":
        return literal(term.value, term.language || term.datatype);
      case "Quad":
        return fromQuad(term);
      default:
        throw new Error(`Unexpected termType: ${term.termType}`);
    }
  }
  function fromQuad(inQuad) {
    if (inQuad instanceof Quad)
      return inQuad;
    if (inQuad.termType !== "Quad")
      throw new Error(`Unexpected termType: ${inQuad.termType}`);
    return quad(fromTerm(inQuad.subject), fromTerm(inQuad.predicate), fromTerm(inQuad.object), fromTerm(inQuad.graph));
  }

  // node_modules/n3/src/N3Parser.js
  var blankNodePrefix = 0;
  var N3Parser = class {
    constructor(options) {
      this._contextStack = [];
      this._graph = null;
      options = options || {};
      this._setBase(options.baseIRI);
      options.factory && initDataFactory(this, options.factory);
      const format = typeof options.format === "string" ? options.format.match(/\w*$/)[0].toLowerCase() : "", isTurtle = /turtle/.test(format), isTriG = /trig/.test(format), isNTriples = /triple/.test(format), isNQuads = /quad/.test(format), isN3 = this._n3Mode = /n3/.test(format), isLineMode = isNTriples || isNQuads;
      if (!(this._supportsNamedGraphs = !(isTurtle || isN3)))
        this._readPredicateOrNamedGraph = this._readPredicate;
      this._supportsQuads = !(isTurtle || isTriG || isNTriples || isN3);
      this._isImpliedBy = options.isImpliedBy;
      this._supportsRDFStar = format === "" || /star|\*$/.test(format);
      if (isLineMode)
        this._resolveRelativeIRI = (iri) => {
          return null;
        };
      this._blankNodePrefix = typeof options.blankNodePrefix !== "string" ? "" : options.blankNodePrefix.replace(/^(?!_:)/, "_:");
      this._lexer = options.lexer || new N3Lexer({ lineMode: isLineMode, n3: isN3, isImpliedBy: this._isImpliedBy });
      this._explicitQuantifiers = !!options.explicitQuantifiers;
    }
    // ## Static class methods
    // ### `_resetBlankNodePrefix` restarts blank node prefix identification
    static _resetBlankNodePrefix() {
      blankNodePrefix = 0;
    }
    // ## Private methods
    // ### `_setBase` sets the base IRI to resolve relative IRIs
    _setBase(baseIRI) {
      if (!baseIRI) {
        this._base = "";
        this._basePath = "";
      } else {
        const fragmentPos = baseIRI.indexOf("#");
        if (fragmentPos >= 0)
          baseIRI = baseIRI.substr(0, fragmentPos);
        this._base = baseIRI;
        this._basePath = baseIRI.indexOf("/") < 0 ? baseIRI : baseIRI.replace(/[^\/?]*(?:\?.*)?$/, "");
        baseIRI = baseIRI.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i);
        this._baseRoot = baseIRI[0];
        this._baseScheme = baseIRI[1];
      }
    }
    // ### `_saveContext` stores the current parsing context
    // when entering a new scope (list, blank node, formula)
    _saveContext(type, graph, subject, predicate, object) {
      const n3Mode = this._n3Mode;
      this._contextStack.push({
        type,
        subject,
        predicate,
        object,
        graph,
        inverse: n3Mode ? this._inversePredicate : false,
        blankPrefix: n3Mode ? this._prefixes._ : "",
        quantified: n3Mode ? this._quantified : null
      });
      if (n3Mode) {
        this._inversePredicate = false;
        this._prefixes._ = this._graph ? `${this._graph.value}.` : ".";
        this._quantified = Object.create(this._quantified);
      }
    }
    // ### `_restoreContext` restores the parent context
    // when leaving a scope (list, blank node, formula)
    _restoreContext(type, token) {
      const context = this._contextStack.pop();
      if (!context || context.type !== type)
        return this._error(`Unexpected ${token.type}`, token);
      this._subject = context.subject;
      this._predicate = context.predicate;
      this._object = context.object;
      this._graph = context.graph;
      if (this._n3Mode) {
        this._inversePredicate = context.inverse;
        this._prefixes._ = context.blankPrefix;
        this._quantified = context.quantified;
      }
    }
    // ### `_readInTopContext` reads a token when in the top context
    _readInTopContext(token) {
      switch (token.type) {
        // If an EOF token arrives in the top context, signal that we're done
        case "eof":
          if (this._graph !== null)
            return this._error("Unclosed graph", token);
          delete this._prefixes._;
          return this._callback(null, null, this._prefixes);
        // It could be a prefix declaration
        case "PREFIX":
          this._sparqlStyle = true;
        case "@prefix":
          return this._readPrefix;
        // It could be a base declaration
        case "BASE":
          this._sparqlStyle = true;
        case "@base":
          return this._readBaseIRI;
        // It could be a graph
        case "{":
          if (this._supportsNamedGraphs) {
            this._graph = "";
            this._subject = null;
            return this._readSubject;
          }
        case "GRAPH":
          if (this._supportsNamedGraphs)
            return this._readNamedGraphLabel;
        // Otherwise, the next token must be a subject
        default:
          return this._readSubject(token);
      }
    }
    // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
    _readEntity(token, quantifier) {
      let value;
      switch (token.type) {
        // Read a relative or absolute IRI
        case "IRI":
        case "typeIRI":
          const iri = this._resolveIRI(token.value);
          if (iri === null)
            return this._error("Invalid IRI", token);
          value = this._factory.namedNode(iri);
          break;
        // Read a prefixed name
        case "type":
        case "prefixed":
          const prefix2 = this._prefixes[token.prefix];
          if (prefix2 === void 0)
            return this._error(`Undefined prefix "${token.prefix}:"`, token);
          value = this._factory.namedNode(prefix2 + token.value);
          break;
        // Read a blank node
        case "blank":
          value = this._factory.blankNode(this._prefixes[token.prefix] + token.value);
          break;
        // Read a variable
        case "var":
          value = this._factory.variable(token.value.substr(1));
          break;
        // Everything else is not an entity
        default:
          return this._error(`Expected entity but got ${token.type}`, token);
      }
      if (!quantifier && this._n3Mode && value.id in this._quantified)
        value = this._quantified[value.id];
      return value;
    }
    // ### `_readSubject` reads a quad's subject
    _readSubject(token) {
      this._predicate = null;
      switch (token.type) {
        case "[":
          this._saveContext(
            "blank",
            this._graph,
            this._subject = this._factory.blankNode(),
            null,
            null
          );
          return this._readBlankNodeHead;
        case "(":
          this._saveContext("list", this._graph, this.RDF_NIL, null, null);
          this._subject = null;
          return this._readListItem;
        case "{":
          if (!this._n3Mode)
            return this._error("Unexpected graph", token);
          this._saveContext(
            "formula",
            this._graph,
            this._graph = this._factory.blankNode(),
            null,
            null
          );
          return this._readSubject;
        case "}":
          return this._readPunctuation(token);
        case "@forSome":
          if (!this._n3Mode)
            return this._error('Unexpected "@forSome"', token);
          this._subject = null;
          this._predicate = this.N3_FORSOME;
          this._quantifier = "blankNode";
          return this._readQuantifierList;
        case "@forAll":
          if (!this._n3Mode)
            return this._error('Unexpected "@forAll"', token);
          this._subject = null;
          this._predicate = this.N3_FORALL;
          this._quantifier = "variable";
          return this._readQuantifierList;
        case "literal":
          if (!this._n3Mode)
            return this._error("Unexpected literal", token);
          if (token.prefix.length === 0) {
            this._literalValue = token.value;
            return this._completeSubjectLiteral;
          } else
            this._subject = this._factory.literal(token.value, this._factory.namedNode(token.prefix));
          break;
        case "<<":
          if (!this._supportsRDFStar)
            return this._error("Unexpected RDF-star syntax", token);
          this._saveContext("<<", this._graph, null, null, null);
          this._graph = null;
          return this._readSubject;
        default:
          if ((this._subject = this._readEntity(token)) === void 0)
            return;
          if (this._n3Mode)
            return this._getPathReader(this._readPredicateOrNamedGraph);
      }
      return this._readPredicateOrNamedGraph;
    }
    // ### `_readPredicate` reads a quad's predicate
    _readPredicate(token) {
      const type = token.type;
      switch (type) {
        case "inverse":
          this._inversePredicate = true;
        case "abbreviation":
          this._predicate = this.ABBREVIATIONS[token.value];
          break;
        case ".":
        case "]":
        case "}":
          if (this._predicate === null)
            return this._error(`Unexpected ${type}`, token);
          this._subject = null;
          return type === "]" ? this._readBlankNodeTail(token) : this._readPunctuation(token);
        case ";":
          return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", token);
        case "[":
          if (this._n3Mode) {
            this._saveContext(
              "blank",
              this._graph,
              this._subject,
              this._subject = this._factory.blankNode(),
              null
            );
            return this._readBlankNodeHead;
          }
        case "blank":
          if (!this._n3Mode)
            return this._error("Disallowed blank node as predicate", token);
        default:
          if ((this._predicate = this._readEntity(token)) === void 0)
            return;
      }
      return this._readObject;
    }
    // ### `_readObject` reads a quad's object
    _readObject(token) {
      switch (token.type) {
        case "literal":
          if (token.prefix.length === 0) {
            this._literalValue = token.value;
            return this._readDataTypeOrLang;
          } else
            this._object = this._factory.literal(token.value, this._factory.namedNode(token.prefix));
          break;
        case "[":
          this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._predicate,
            this._subject = this._factory.blankNode()
          );
          return this._readBlankNodeHead;
        case "(":
          this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL);
          this._subject = null;
          return this._readListItem;
        case "{":
          if (!this._n3Mode)
            return this._error("Unexpected graph", token);
          this._saveContext(
            "formula",
            this._graph,
            this._subject,
            this._predicate,
            this._graph = this._factory.blankNode()
          );
          return this._readSubject;
        case "<<":
          if (!this._supportsRDFStar)
            return this._error("Unexpected RDF-star syntax", token);
          this._saveContext("<<", this._graph, this._subject, this._predicate, null);
          this._graph = null;
          return this._readSubject;
        default:
          if ((this._object = this._readEntity(token)) === void 0)
            return;
          if (this._n3Mode)
            return this._getPathReader(this._getContextEndReader());
      }
      return this._getContextEndReader();
    }
    // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
    _readPredicateOrNamedGraph(token) {
      return token.type === "{" ? this._readGraph(token) : this._readPredicate(token);
    }
    // ### `_readGraph` reads a graph
    _readGraph(token) {
      if (token.type !== "{")
        return this._error(`Expected graph but got ${token.type}`, token);
      this._graph = this._subject, this._subject = null;
      return this._readSubject;
    }
    // ### `_readBlankNodeHead` reads the head of a blank node
    _readBlankNodeHead(token) {
      if (token.type === "]") {
        this._subject = null;
        return this._readBlankNodeTail(token);
      } else {
        this._predicate = null;
        return this._readPredicate(token);
      }
    }
    // ### `_readBlankNodeTail` reads the end of a blank node
    _readBlankNodeTail(token) {
      if (token.type !== "]")
        return this._readBlankNodePunctuation(token);
      if (this._subject !== null)
        this._emit(this._subject, this._predicate, this._object, this._graph);
      const empty = this._predicate === null;
      this._restoreContext("blank", token);
      if (this._object !== null)
        return this._getContextEndReader();
      else if (this._predicate !== null)
        return this._readObject;
      else
        return empty ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
    }
    // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
    _readPredicateAfterBlank(token) {
      switch (token.type) {
        case ".":
        case "}":
          this._subject = null;
          return this._readPunctuation(token);
        default:
          return this._readPredicate(token);
      }
    }
    // ### `_readListItem` reads items from a list
    _readListItem(token) {
      let item = null, list = null, next = this._readListItem;
      const previousList = this._subject, stack = this._contextStack, parent = stack[stack.length - 1];
      switch (token.type) {
        case "[":
          this._saveContext(
            "blank",
            this._graph,
            list = this._factory.blankNode(),
            this.RDF_FIRST,
            this._subject = item = this._factory.blankNode()
          );
          next = this._readBlankNodeHead;
          break;
        case "(":
          this._saveContext(
            "list",
            this._graph,
            list = this._factory.blankNode(),
            this.RDF_FIRST,
            this.RDF_NIL
          );
          this._subject = null;
          break;
        case ")":
          this._restoreContext("list", token);
          if (stack.length !== 0 && stack[stack.length - 1].type === "list")
            this._emit(this._subject, this._predicate, this._object, this._graph);
          if (this._predicate === null) {
            next = this._readPredicate;
            if (this._subject === this.RDF_NIL)
              return next;
          } else {
            next = this._getContextEndReader();
            if (this._object === this.RDF_NIL)
              return next;
          }
          list = this.RDF_NIL;
          break;
        case "literal":
          if (token.prefix.length === 0) {
            this._literalValue = token.value;
            next = this._readListItemDataTypeOrLang;
          } else {
            item = this._factory.literal(token.value, this._factory.namedNode(token.prefix));
            next = this._getContextEndReader();
          }
          break;
        case "{":
          if (!this._n3Mode)
            return this._error("Unexpected graph", token);
          this._saveContext(
            "formula",
            this._graph,
            this._subject,
            this._predicate,
            this._graph = this._factory.blankNode()
          );
          return this._readSubject;
        default:
          if ((item = this._readEntity(token)) === void 0)
            return;
      }
      if (list === null)
        this._subject = list = this._factory.blankNode();
      if (previousList === null) {
        if (parent.predicate === null)
          parent.subject = list;
        else
          parent.object = list;
      } else {
        this._emit(previousList, this.RDF_REST, list, this._graph);
      }
      if (item !== null) {
        if (this._n3Mode && (token.type === "IRI" || token.type === "prefixed")) {
          this._saveContext("item", this._graph, list, this.RDF_FIRST, item);
          this._subject = item, this._predicate = null;
          return this._getPathReader(this._readListItem);
        }
        this._emit(list, this.RDF_FIRST, item, this._graph);
      }
      return next;
    }
    // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
    _readDataTypeOrLang(token) {
      return this._completeObjectLiteral(token, false);
    }
    // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
    _readListItemDataTypeOrLang(token) {
      return this._completeObjectLiteral(token, true);
    }
    // ### `_completeLiteral` completes a literal with an optional datatype or language
    _completeLiteral(token) {
      let literal2 = this._factory.literal(this._literalValue);
      switch (token.type) {
        // Create a datatyped literal
        case "type":
        case "typeIRI":
          const datatype = this._readEntity(token);
          if (datatype === void 0) return;
          literal2 = this._factory.literal(this._literalValue, datatype);
          token = null;
          break;
        // Create a language-tagged string
        case "langcode":
          literal2 = this._factory.literal(this._literalValue, token.value);
          token = null;
          break;
      }
      return { token, literal: literal2 };
    }
    // Completes a literal in subject position
    _completeSubjectLiteral(token) {
      this._subject = this._completeLiteral(token).literal;
      return this._readPredicateOrNamedGraph;
    }
    // Completes a literal in object position
    _completeObjectLiteral(token, listItem) {
      const completed = this._completeLiteral(token);
      if (!completed)
        return;
      this._object = completed.literal;
      if (listItem)
        this._emit(this._subject, this.RDF_FIRST, this._object, this._graph);
      if (completed.token === null)
        return this._getContextEndReader();
      else {
        this._readCallback = this._getContextEndReader();
        return this._readCallback(completed.token);
      }
    }
    // ### `_readFormulaTail` reads the end of a formula
    _readFormulaTail(token) {
      if (token.type !== "}")
        return this._readPunctuation(token);
      if (this._subject !== null)
        this._emit(this._subject, this._predicate, this._object, this._graph);
      this._restoreContext("formula", token);
      return this._object === null ? this._readPredicate : this._getContextEndReader();
    }
    // ### `_readPunctuation` reads punctuation between quads or quad parts
    _readPunctuation(token) {
      let next, graph = this._graph;
      const subject = this._subject, inversePredicate = this._inversePredicate;
      switch (token.type) {
        // A closing brace ends a graph
        case "}":
          if (this._graph === null)
            return this._error("Unexpected graph closing", token);
          if (this._n3Mode)
            return this._readFormulaTail(token);
          this._graph = null;
        // A dot just ends the statement, without sharing anything with the next
        case ".":
          this._subject = null;
          next = this._contextStack.length ? this._readSubject : this._readInTopContext;
          if (inversePredicate) this._inversePredicate = false;
          break;
        // Semicolon means the subject is shared; predicate and object are different
        case ";":
          next = this._readPredicate;
          break;
        // Comma means both the subject and predicate are shared; the object is different
        case ",":
          next = this._readObject;
          break;
        // {| means that the current triple is annotated with predicate-object pairs.
        case "{|":
          if (!this._supportsRDFStar)
            return this._error("Unexpected RDF-star syntax", token);
          const predicate = this._predicate, object = this._object;
          this._subject = this._factory.quad(subject, predicate, object, this.DEFAULTGRAPH);
          next = this._readPredicate;
          break;
        // |} means that the current quoted triple in annotation syntax is finalized.
        case "|}":
          if (this._subject.termType !== "Quad")
            return this._error("Unexpected asserted triple closing", token);
          this._subject = null;
          next = this._readPunctuation;
          break;
        default:
          if (this._supportsQuads && this._graph === null && (graph = this._readEntity(token)) !== void 0) {
            next = this._readQuadPunctuation;
            break;
          }
          return this._error(`Expected punctuation to follow "${this._object.id}"`, token);
      }
      if (subject !== null) {
        const predicate = this._predicate, object = this._object;
        if (!inversePredicate)
          this._emit(subject, predicate, object, graph);
        else
          this._emit(object, predicate, subject, graph);
      }
      return next;
    }
    // ### `_readBlankNodePunctuation` reads punctuation in a blank node
    _readBlankNodePunctuation(token) {
      let next;
      switch (token.type) {
        // Semicolon means the subject is shared; predicate and object are different
        case ";":
          next = this._readPredicate;
          break;
        // Comma means both the subject and predicate are shared; the object is different
        case ",":
          next = this._readObject;
          break;
        default:
          return this._error(`Expected punctuation to follow "${this._object.id}"`, token);
      }
      this._emit(this._subject, this._predicate, this._object, this._graph);
      return next;
    }
    // ### `_readQuadPunctuation` reads punctuation after a quad
    _readQuadPunctuation(token) {
      if (token.type !== ".")
        return this._error("Expected dot to follow quad", token);
      return this._readInTopContext;
    }
    // ### `_readPrefix` reads the prefix of a prefix declaration
    _readPrefix(token) {
      if (token.type !== "prefix")
        return this._error("Expected prefix to follow @prefix", token);
      this._prefix = token.value;
      return this._readPrefixIRI;
    }
    // ### `_readPrefixIRI` reads the IRI of a prefix declaration
    _readPrefixIRI(token) {
      if (token.type !== "IRI")
        return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, token);
      const prefixNode = this._readEntity(token);
      this._prefixes[this._prefix] = prefixNode.value;
      this._prefixCallback(this._prefix, prefixNode);
      return this._readDeclarationPunctuation;
    }
    // ### `_readBaseIRI` reads the IRI of a base declaration
    _readBaseIRI(token) {
      const iri = token.type === "IRI" && this._resolveIRI(token.value);
      if (!iri)
        return this._error("Expected valid IRI to follow base declaration", token);
      this._setBase(iri);
      return this._readDeclarationPunctuation;
    }
    // ### `_readNamedGraphLabel` reads the label of a named graph
    _readNamedGraphLabel(token) {
      switch (token.type) {
        case "IRI":
        case "blank":
        case "prefixed":
          return this._readSubject(token), this._readGraph;
        case "[":
          return this._readNamedGraphBlankLabel;
        default:
          return this._error("Invalid graph label", token);
      }
    }
    // ### `_readNamedGraphLabel` reads a blank node label of a named graph
    _readNamedGraphBlankLabel(token) {
      if (token.type !== "]")
        return this._error("Invalid graph label", token);
      this._subject = this._factory.blankNode();
      return this._readGraph;
    }
    // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
    _readDeclarationPunctuation(token) {
      if (this._sparqlStyle) {
        this._sparqlStyle = false;
        return this._readInTopContext(token);
      }
      if (token.type !== ".")
        return this._error("Expected declaration to end with a dot", token);
      return this._readInTopContext;
    }
    // Reads a list of quantified symbols from a @forSome or @forAll statement
    _readQuantifierList(token) {
      let entity;
      switch (token.type) {
        case "IRI":
        case "prefixed":
          if ((entity = this._readEntity(token, true)) !== void 0)
            break;
        default:
          return this._error(`Unexpected ${token.type}`, token);
      }
      if (!this._explicitQuantifiers)
        this._quantified[entity.id] = this._factory[this._quantifier](this._factory.blankNode().value);
      else {
        if (this._subject === null)
          this._emit(
            this._graph || this.DEFAULTGRAPH,
            this._predicate,
            this._subject = this._factory.blankNode(),
            this.QUANTIFIERS_GRAPH
          );
        else
          this._emit(
            this._subject,
            this.RDF_REST,
            this._subject = this._factory.blankNode(),
            this.QUANTIFIERS_GRAPH
          );
        this._emit(this._subject, this.RDF_FIRST, entity, this.QUANTIFIERS_GRAPH);
      }
      return this._readQuantifierPunctuation;
    }
    // Reads punctuation from a @forSome or @forAll statement
    _readQuantifierPunctuation(token) {
      if (token.type === ",")
        return this._readQuantifierList;
      else {
        if (this._explicitQuantifiers) {
          this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH);
          this._subject = null;
        }
        this._readCallback = this._getContextEndReader();
        return this._readCallback(token);
      }
    }
    // ### `_getPathReader` reads a potential path and then resumes with the given function
    _getPathReader(afterPath) {
      this._afterPath = afterPath;
      return this._readPath;
    }
    // ### `_readPath` reads a potential path
    _readPath(token) {
      switch (token.type) {
        // Forward path
        case "!":
          return this._readForwardPath;
        // Backward path
        case "^":
          return this._readBackwardPath;
        // Not a path; resume reading where we left off
        default:
          const stack = this._contextStack, parent = stack.length && stack[stack.length - 1];
          if (parent && parent.type === "item") {
            const item = this._subject;
            this._restoreContext("item", token);
            this._emit(this._subject, this.RDF_FIRST, item, this._graph);
          }
          return this._afterPath(token);
      }
    }
    // ### `_readForwardPath` reads a '!' path
    _readForwardPath(token) {
      let subject, predicate;
      const object = this._factory.blankNode();
      if ((predicate = this._readEntity(token)) === void 0)
        return;
      if (this._predicate === null)
        subject = this._subject, this._subject = object;
      else
        subject = this._object, this._object = object;
      this._emit(subject, predicate, object, this._graph);
      return this._readPath;
    }
    // ### `_readBackwardPath` reads a '^' path
    _readBackwardPath(token) {
      const subject = this._factory.blankNode();
      let predicate, object;
      if ((predicate = this._readEntity(token)) === void 0)
        return;
      if (this._predicate === null)
        object = this._subject, this._subject = subject;
      else
        object = this._object, this._object = subject;
      this._emit(subject, predicate, object, this._graph);
      return this._readPath;
    }
    // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF-star quad or the end of a nested RDF-star triple
    _readRDFStarTailOrGraph(token) {
      if (token.type !== ">>") {
        if (this._supportsQuads && this._graph === null && (this._graph = this._readEntity(token)) !== void 0)
          return this._readRDFStarTail;
        return this._error(`Expected >> to follow "${this._object.id}"`, token);
      }
      return this._readRDFStarTail(token);
    }
    // ### `_readRDFStarTail` reads the end of a nested RDF-star triple
    _readRDFStarTail(token) {
      if (token.type !== ">>")
        return this._error(`Expected >> but got ${token.type}`, token);
      const quad4 = this._factory.quad(
        this._subject,
        this._predicate,
        this._object,
        this._graph || this.DEFAULTGRAPH
      );
      this._restoreContext("<<", token);
      if (this._subject === null) {
        this._subject = quad4;
        return this._readPredicate;
      } else {
        this._object = quad4;
        return this._getContextEndReader();
      }
    }
    // ### `_getContextEndReader` gets the next reader function at the end of a context
    _getContextEndReader() {
      const contextStack = this._contextStack;
      if (!contextStack.length)
        return this._readPunctuation;
      switch (contextStack[contextStack.length - 1].type) {
        case "blank":
          return this._readBlankNodeTail;
        case "list":
          return this._readListItem;
        case "formula":
          return this._readFormulaTail;
        case "<<":
          return this._readRDFStarTailOrGraph;
      }
    }
    // ### `_emit` sends a quad through the callback
    _emit(subject, predicate, object, graph) {
      this._callback(null, this._factory.quad(subject, predicate, object, graph || this.DEFAULTGRAPH));
    }
    // ### `_error` emits an error message through the callback
    _error(message, token) {
      const err = new Error(`${message} on line ${token.line}.`);
      err.context = {
        token,
        line: token.line,
        previousToken: this._lexer.previousToken
      };
      this._callback(err);
      this._callback = noop;
    }
    // ### `_resolveIRI` resolves an IRI against the base path
    _resolveIRI(iri) {
      return /^[a-z][a-z0-9+.-]*:/i.test(iri) ? iri : this._resolveRelativeIRI(iri);
    }
    // ### `_resolveRelativeIRI` resolves an IRI against the base path,
    // assuming that a base path has been set and that the IRI is indeed relative
    _resolveRelativeIRI(iri) {
      if (!iri.length)
        return this._base;
      switch (iri[0]) {
        // Resolve relative fragment IRIs against the base IRI
        case "#":
          return this._base + iri;
        // Resolve relative query string IRIs by replacing the query string
        case "?":
          return this._base.replace(/(?:\?.*)?$/, iri);
        // Resolve root-relative IRIs at the root of the base IRI
        case "/":
          return (iri[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(iri);
        // Resolve all other IRIs at the base IRI's path
        default:
          return /^[^/:]*:/.test(iri) ? null : this._removeDotSegments(this._basePath + iri);
      }
    }
    // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
    _removeDotSegments(iri) {
      if (!/(^|\/)\.\.?($|[/#?])/.test(iri))
        return iri;
      const length = iri.length;
      let result = "", i = -1, pathStart = -1, segmentStart = 0, next = "/";
      while (i < length) {
        switch (next) {
          // The path starts with the first slash after the authority
          case ":":
            if (pathStart < 0) {
              if (iri[++i] === "/" && iri[++i] === "/")
                while ((pathStart = i + 1) < length && iri[pathStart] !== "/")
                  i = pathStart;
            }
            break;
          // Don't modify a query string or fragment
          case "?":
          case "#":
            i = length;
            break;
          // Handle '/.' or '/..' path segments
          case "/":
            if (iri[i + 1] === ".") {
              next = iri[++i + 1];
              switch (next) {
                // Remove a '/.' segment
                case "/":
                  result += iri.substring(segmentStart, i - 1);
                  segmentStart = i + 1;
                  break;
                // Remove a trailing '/.' segment
                case void 0:
                case "?":
                case "#":
                  return result + iri.substring(segmentStart, i) + iri.substr(i + 1);
                // Remove a '/..' segment
                case ".":
                  next = iri[++i + 1];
                  if (next === void 0 || next === "/" || next === "?" || next === "#") {
                    result += iri.substring(segmentStart, i - 2);
                    if ((segmentStart = result.lastIndexOf("/")) >= pathStart)
                      result = result.substr(0, segmentStart);
                    if (next !== "/")
                      return `${result}/${iri.substr(i + 1)}`;
                    segmentStart = i + 1;
                  }
              }
            }
        }
        next = iri[++i];
      }
      return result + iri.substring(segmentStart);
    }
    // ## Public methods
    // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
    parse(input, quadCallback, prefixCallback) {
      let onQuad, onPrefix, onComment;
      if (quadCallback && (quadCallback.onQuad || quadCallback.onPrefix || quadCallback.onComment)) {
        onQuad = quadCallback.onQuad;
        onPrefix = quadCallback.onPrefix;
        onComment = quadCallback.onComment;
      } else {
        onQuad = quadCallback;
        onPrefix = prefixCallback;
      }
      this._readCallback = this._readInTopContext;
      this._sparqlStyle = false;
      this._prefixes = /* @__PURE__ */ Object.create(null);
      this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${blankNodePrefix++}_`;
      this._prefixCallback = onPrefix || noop;
      this._inversePredicate = false;
      this._quantified = /* @__PURE__ */ Object.create(null);
      if (!onQuad) {
        const quads = [];
        let error;
        this._callback = (e, t) => {
          e ? error = e : t && quads.push(t);
        };
        this._lexer.tokenize(input).every((token) => {
          return this._readCallback = this._readCallback(token);
        });
        if (error) throw error;
        return quads;
      }
      let processNextToken = (error, token) => {
        if (error !== null)
          this._callback(error), this._callback = noop;
        else if (this._readCallback)
          this._readCallback = this._readCallback(token);
      };
      if (onComment) {
        this._lexer.comments = true;
        processNextToken = (error, token) => {
          if (error !== null)
            this._callback(error), this._callback = noop;
          else if (this._readCallback) {
            if (token.type === "comment")
              onComment(token.value);
            else
              this._readCallback = this._readCallback(token);
          }
        };
      }
      this._callback = onQuad;
      this._lexer.tokenize(input, processNextToken);
    }
  };
  function noop() {
  }
  function initDataFactory(parser, factory) {
    parser._factory = factory;
    parser.DEFAULTGRAPH = factory.defaultGraph();
    parser.RDF_FIRST = factory.namedNode(IRIs_default.rdf.first);
    parser.RDF_REST = factory.namedNode(IRIs_default.rdf.rest);
    parser.RDF_NIL = factory.namedNode(IRIs_default.rdf.nil);
    parser.N3_FORALL = factory.namedNode(IRIs_default.r.forAll);
    parser.N3_FORSOME = factory.namedNode(IRIs_default.r.forSome);
    parser.ABBREVIATIONS = {
      "a": factory.namedNode(IRIs_default.rdf.type),
      "=": factory.namedNode(IRIs_default.owl.sameAs),
      ">": factory.namedNode(IRIs_default.log.implies),
      "<": factory.namedNode(IRIs_default.log.isImpliedBy)
    };
    parser.QUANTIFIERS_GRAPH = factory.namedNode("urn:n3:quantifiers");
  }
  initDataFactory(N3Parser.prototype, N3DataFactory_default);

  // node_modules/n3/src/N3Util.js
  var N3Util_exports = {};
  __export(N3Util_exports, {
    inDefaultGraph: () => inDefaultGraph,
    isBlankNode: () => isBlankNode,
    isDefaultGraph: () => isDefaultGraph,
    isLiteral: () => isLiteral,
    isNamedNode: () => isNamedNode,
    isQuad: () => isQuad,
    isVariable: () => isVariable,
    prefix: () => prefix,
    prefixes: () => prefixes
  });
  function isNamedNode(term) {
    return !!term && term.termType === "NamedNode";
  }
  function isBlankNode(term) {
    return !!term && term.termType === "BlankNode";
  }
  function isLiteral(term) {
    return !!term && term.termType === "Literal";
  }
  function isVariable(term) {
    return !!term && term.termType === "Variable";
  }
  function isQuad(term) {
    return !!term && term.termType === "Quad";
  }
  function isDefaultGraph(term) {
    return !!term && term.termType === "DefaultGraph";
  }
  function inDefaultGraph(quad4) {
    return isDefaultGraph(quad4.graph);
  }
  function prefix(iri, factory) {
    return prefixes({ "": iri.value || iri }, factory)("");
  }
  function prefixes(defaultPrefixes, factory) {
    const prefixes2 = /* @__PURE__ */ Object.create(null);
    for (const prefix2 in defaultPrefixes)
      processPrefix(prefix2, defaultPrefixes[prefix2]);
    factory = factory || N3DataFactory_default;
    function processPrefix(prefix2, iri) {
      if (typeof iri === "string") {
        const cache = /* @__PURE__ */ Object.create(null);
        prefixes2[prefix2] = (local) => {
          return cache[local] || (cache[local] = factory.namedNode(iri + local));
        };
      } else if (!(prefix2 in prefixes2)) {
        throw new Error(`Unknown prefix: ${prefix2}`);
      }
      return prefixes2[prefix2];
    }
    return processPrefix;
  }

  // node_modules/n3/src/Util.js
  function escapeRegex(regex) {
    return regex.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, "\\$&");
  }

  // node_modules/n3/src/BaseIRI.js
  var BASE_UNSUPPORTED = /^:?[^:?#]*(?:[?#]|$)|^file:|^[^:]*:\/*[^?#]+?\/(?:\.\.?(?:\/|$)|\/)/i;
  var SUFFIX_SUPPORTED = /^(?:(?:[^/?#]{3,}|\.?[^/?#.]\.?)(?:\/[^/?#]{3,}|\.?[^/?#.]\.?)*\/?)?(?:[?#]|$)/;
  var CURRENT = "./";
  var PARENT = "../";
  var QUERY = "?";
  var FRAGMENT = "#";
  var BaseIRI = class _BaseIRI {
    constructor(base) {
      this.base = base;
      this._baseLength = 0;
      this._baseMatcher = null;
      this._pathReplacements = new Array(base.length + 1);
    }
    static supports(base) {
      return !BASE_UNSUPPORTED.test(base);
    }
    _getBaseMatcher() {
      if (this._baseMatcher)
        return this._baseMatcher;
      if (!_BaseIRI.supports(this.base))
        return this._baseMatcher = /.^/;
      const scheme = /^[^:]*:\/*/.exec(this.base)[0];
      const regexHead = ["^", escapeRegex(scheme)];
      const regexTail = [];
      const segments = [], segmenter = /[^/?#]*([/?#])/y;
      let segment, query = 0, fragment = 0, last = segmenter.lastIndex = scheme.length;
      while (!query && !fragment && (segment = segmenter.exec(this.base))) {
        if (segment[1] === FRAGMENT)
          fragment = segmenter.lastIndex - 1;
        else {
          regexHead.push(escapeRegex(segment[0]), "(?:");
          regexTail.push(")?");
          if (segment[1] !== QUERY)
            segments.push(last = segmenter.lastIndex);
          else {
            query = last = segmenter.lastIndex;
            fragment = this.base.indexOf(FRAGMENT, query);
            this._pathReplacements[query] = QUERY;
          }
        }
      }
      for (let i = 0; i < segments.length; i++)
        this._pathReplacements[segments[i]] = PARENT.repeat(segments.length - i - 1);
      this._pathReplacements[segments[segments.length - 1]] = CURRENT;
      this._baseLength = fragment > 0 ? fragment : this.base.length;
      regexHead.push(
        escapeRegex(this.base.substring(last, this._baseLength)),
        query ? "(?:#|$)" : "(?:[?#]|$)"
      );
      return this._baseMatcher = new RegExp([...regexHead, ...regexTail].join(""));
    }
    toRelative(iri) {
      const match = this._getBaseMatcher().exec(iri);
      if (!match)
        return iri;
      const length = match[0].length;
      if (length === this._baseLength && length === iri.length)
        return "";
      const parentPath = this._pathReplacements[length];
      if (parentPath) {
        const suffix = iri.substring(length);
        if (parentPath !== QUERY && !SUFFIX_SUPPORTED.test(suffix))
          return iri;
        if (parentPath === CURRENT && /^[^?#]/.test(suffix))
          return suffix;
        return parentPath + suffix;
      }
      return iri.substring(length - 1);
    }
  };

  // node_modules/n3/src/N3Writer.js
  var DEFAULTGRAPH2 = N3DataFactory_default.defaultGraph();
  var { rdf: rdf2, xsd: xsd3 } = IRIs_default;
  var escape = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/;
  var escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g;
  var escapedCharacters = {
    "\\": "\\\\",
    '"': '\\"',
    "	": "\\t",
    "\n": "\\n",
    "\r": "\\r",
    "\b": "\\b",
    "\f": "\\f"
  };
  var SerializedTerm = class extends Term {
    // Pretty-printed nodes are not equal to any other node
    // (e.g., [] does not equal [])
    equals(other) {
      return other === this;
    }
  };
  var N3Writer = class {
    constructor(outputStream, options) {
      this._prefixRegex = /$0^/;
      if (outputStream && typeof outputStream.write !== "function")
        options = outputStream, outputStream = null;
      options = options || {};
      this._lists = options.lists;
      if (!outputStream) {
        let output = "";
        this._outputStream = {
          write(chunk, encoding, done) {
            output += chunk;
            done && done();
          },
          end: (done) => {
            done && done(null, output);
          }
        };
        this._endStream = true;
      } else {
        this._outputStream = outputStream;
        this._endStream = options.end === void 0 ? true : !!options.end;
      }
      this._subject = null;
      if (!/triple|quad/i.test(options.format)) {
        this._lineMode = false;
        this._graph = DEFAULTGRAPH2;
        this._prefixIRIs = /* @__PURE__ */ Object.create(null);
        options.prefixes && this.addPrefixes(options.prefixes);
        if (options.baseIRI) {
          this._baseIri = new BaseIRI(options.baseIRI);
        }
      } else {
        this._lineMode = true;
        this._writeQuad = this._writeQuadLine;
      }
    }
    // ## Private methods
    // ### Whether the current graph is the default graph
    get _inDefaultGraph() {
      return DEFAULTGRAPH2.equals(this._graph);
    }
    // ### `_write` writes the argument to the output stream
    _write(string, callback) {
      this._outputStream.write(string, "utf8", callback);
    }
    // ### `_writeQuad` writes the quad to the output stream
    _writeQuad(subject, predicate, object, graph, done) {
      try {
        if (!graph.equals(this._graph)) {
          this._write((this._subject === null ? "" : this._inDefaultGraph ? ".\n" : "\n}\n") + (DEFAULTGRAPH2.equals(graph) ? "" : `${this._encodeIriOrBlank(graph)} {
`));
          this._graph = graph;
          this._subject = null;
        }
        if (subject.equals(this._subject)) {
          if (predicate.equals(this._predicate))
            this._write(`, ${this._encodeObject(object)}`, done);
          else
            this._write(`;
    ${this._encodePredicate(this._predicate = predicate)} ${this._encodeObject(object)}`, done);
        } else
          this._write(`${(this._subject === null ? "" : ".\n") + this._encodeSubject(this._subject = subject)} ${this._encodePredicate(this._predicate = predicate)} ${this._encodeObject(object)}`, done);
      } catch (error) {
        done && done(error);
      }
    }
    // ### `_writeQuadLine` writes the quad to the output stream as a single line
    _writeQuadLine(subject, predicate, object, graph, done) {
      delete this._prefixMatch;
      this._write(this.quadToString(subject, predicate, object, graph), done);
    }
    // ### `quadToString` serializes a quad as a string
    quadToString(subject, predicate, object, graph) {
      return `${this._encodeSubject(subject)} ${this._encodeIriOrBlank(predicate)} ${this._encodeObject(object)}${graph && graph.value ? ` ${this._encodeIriOrBlank(graph)} .
` : " .\n"}`;
    }
    // ### `quadsToString` serializes an array of quads as a string
    quadsToString(quads) {
      let quadsString = "";
      for (const quad4 of quads)
        quadsString += this.quadToString(quad4.subject, quad4.predicate, quad4.object, quad4.graph);
      return quadsString;
    }
    // ### `_encodeSubject` represents a subject
    _encodeSubject(entity) {
      return entity.termType === "Quad" ? this._encodeQuad(entity) : this._encodeIriOrBlank(entity);
    }
    // ### `_encodeIriOrBlank` represents an IRI or blank node
    _encodeIriOrBlank(entity) {
      if (entity.termType !== "NamedNode") {
        if (this._lists && entity.value in this._lists)
          entity = this.list(this._lists[entity.value]);
        return "id" in entity ? entity.id : `_:${entity.value}`;
      }
      let iri = entity.value;
      if (this._baseIri) {
        iri = this._baseIri.toRelative(iri);
      }
      if (escape.test(iri))
        iri = iri.replace(escapeAll, characterReplacer);
      const prefixMatch = this._prefixRegex.exec(iri);
      return !prefixMatch ? `<${iri}>` : !prefixMatch[1] ? iri : this._prefixIRIs[prefixMatch[1]] + prefixMatch[2];
    }
    // ### `_encodeLiteral` represents a literal
    _encodeLiteral(literal2) {
      let value = literal2.value;
      if (escape.test(value))
        value = value.replace(escapeAll, characterReplacer);
      if (literal2.language)
        return `"${value}"@${literal2.language}`;
      if (this._lineMode) {
        if (literal2.datatype.value === xsd3.string)
          return `"${value}"`;
      } else {
        switch (literal2.datatype.value) {
          case xsd3.string:
            return `"${value}"`;
          case xsd3.boolean:
            if (value === "true" || value === "false")
              return value;
            break;
          case xsd3.integer:
            if (/^[+-]?\d+$/.test(value))
              return value;
            break;
          case xsd3.decimal:
            if (/^[+-]?\d*\.\d+$/.test(value))
              return value;
            break;
          case xsd3.double:
            if (/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(value))
              return value;
            break;
        }
      }
      return `"${value}"^^${this._encodeIriOrBlank(literal2.datatype)}`;
    }
    // ### `_encodePredicate` represents a predicate
    _encodePredicate(predicate) {
      return predicate.value === rdf2.type ? "a" : this._encodeIriOrBlank(predicate);
    }
    // ### `_encodeObject` represents an object
    _encodeObject(object) {
      switch (object.termType) {
        case "Quad":
          return this._encodeQuad(object);
        case "Literal":
          return this._encodeLiteral(object);
        default:
          return this._encodeIriOrBlank(object);
      }
    }
    // ### `_encodeQuad` encodes an RDF-star quad
    _encodeQuad({ subject, predicate, object, graph }) {
      return `<<${this._encodeSubject(subject)} ${this._encodePredicate(predicate)} ${this._encodeObject(object)}${isDefaultGraph(graph) ? "" : ` ${this._encodeIriOrBlank(graph)}`}>>`;
    }
    // ### `_blockedWrite` replaces `_write` after the writer has been closed
    _blockedWrite() {
      throw new Error("Cannot write because the writer has been closed.");
    }
    // ### `addQuad` adds the quad to the output stream
    addQuad(subject, predicate, object, graph, done) {
      if (object === void 0)
        this._writeQuad(subject.subject, subject.predicate, subject.object, subject.graph, predicate);
      else if (typeof graph === "function")
        this._writeQuad(subject, predicate, object, DEFAULTGRAPH2, graph);
      else
        this._writeQuad(subject, predicate, object, graph || DEFAULTGRAPH2, done);
    }
    // ### `addQuads` adds the quads to the output stream
    addQuads(quads) {
      for (let i = 0; i < quads.length; i++)
        this.addQuad(quads[i]);
    }
    // ### `addPrefix` adds the prefix to the output stream
    addPrefix(prefix2, iri, done) {
      const prefixes2 = {};
      prefixes2[prefix2] = iri;
      this.addPrefixes(prefixes2, done);
    }
    // ### `addPrefixes` adds the prefixes to the output stream
    addPrefixes(prefixes2, done) {
      if (!this._prefixIRIs)
        return done && done();
      let hasPrefixes = false;
      for (let prefix2 in prefixes2) {
        let iri = prefixes2[prefix2];
        if (typeof iri !== "string")
          iri = iri.value;
        hasPrefixes = true;
        if (this._subject !== null) {
          this._write(this._inDefaultGraph ? ".\n" : "\n}\n");
          this._subject = null, this._graph = "";
        }
        this._prefixIRIs[iri] = prefix2 += ":";
        this._write(`@prefix ${prefix2} <${iri}>.
`);
      }
      if (hasPrefixes) {
        let IRIlist = "", prefixList = "";
        for (const prefixIRI in this._prefixIRIs) {
          IRIlist += IRIlist ? `|${prefixIRI}` : prefixIRI;
          prefixList += (prefixList ? "|" : "") + this._prefixIRIs[prefixIRI];
        }
        IRIlist = escapeRegex(IRIlist, /[\]\/\(\)\*\+\?\.\\\$]/g, "\\$&");
        this._prefixRegex = new RegExp(`^(?:${prefixList})[^/]*$|^(${IRIlist})([_a-zA-Z0-9][\\-_a-zA-Z0-9]*)$`);
      }
      this._write(hasPrefixes ? "\n" : "", done);
    }
    // ### `blank` creates a blank node with the given content
    blank(predicate, object) {
      let children = predicate, child, length;
      if (predicate === void 0)
        children = [];
      else if (predicate.termType)
        children = [{ predicate, object }];
      else if (!("length" in predicate))
        children = [predicate];
      switch (length = children.length) {
        // Generate an empty blank node
        case 0:
          return new SerializedTerm("[]");
        // Generate a non-nested one-triple blank node
        case 1:
          child = children[0];
          if (!(child.object instanceof SerializedTerm))
            return new SerializedTerm(`[ ${this._encodePredicate(child.predicate)} ${this._encodeObject(child.object)} ]`);
        // Generate a multi-triple or nested blank node
        default:
          let contents = "[";
          for (let i = 0; i < length; i++) {
            child = children[i];
            if (child.predicate.equals(predicate))
              contents += `, ${this._encodeObject(child.object)}`;
            else {
              contents += `${(i ? ";\n  " : "\n  ") + this._encodePredicate(child.predicate)} ${this._encodeObject(child.object)}`;
              predicate = child.predicate;
            }
          }
          return new SerializedTerm(`${contents}
]`);
      }
    }
    // ### `list` creates a list node with the given content
    list(elements) {
      const length = elements && elements.length || 0, contents = new Array(length);
      for (let i = 0; i < length; i++)
        contents[i] = this._encodeObject(elements[i]);
      return new SerializedTerm(`(${contents.join(" ")})`);
    }
    // ### `end` signals the end of the output stream
    end(done) {
      if (this._subject !== null) {
        this._write(this._inDefaultGraph ? ".\n" : "\n}\n");
        this._subject = null;
      }
      this._write = this._blockedWrite;
      let singleDone = done && ((error, result) => {
        singleDone = null, done(error, result);
      });
      if (this._endStream) {
        try {
          return this._outputStream.end(singleDone);
        } catch (error) {
        }
      }
      singleDone && singleDone();
    }
  };
  function characterReplacer(character) {
    let result = escapedCharacters[character];
    if (result === void 0) {
      if (character.length === 1) {
        result = character.charCodeAt(0).toString(16);
        result = "\\u0000".substr(0, 6 - result.length) + result;
      } else {
        result = ((character.charCodeAt(0) - 55296) * 1024 + character.charCodeAt(1) + 9216).toString(16);
        result = "\\U00000000".substr(0, 10 - result.length) + result;
      }
    }
    return result;
  }

  // node_modules/n3/src/N3Store.js
  var import_readable_stream = __toESM(require_browser3());
  var ITERATOR = Symbol("iter");
  function merge(target, source, depth = 4) {
    if (depth === 0)
      return Object.assign(target, source);
    for (const key in source)
      target[key] = merge(target[key] || /* @__PURE__ */ Object.create(null), source[key], depth - 1);
    return target;
  }
  function intersect(s1, s2, depth = 4) {
    let target = false;
    for (const key in s1) {
      if (key in s2) {
        const intersection = depth === 0 ? null : intersect(s1[key], s2[key], depth - 1);
        if (intersection !== false) {
          target = target || /* @__PURE__ */ Object.create(null);
          target[key] = intersection;
        } else if (depth === 3) {
          return false;
        }
      }
    }
    return target;
  }
  function difference(s1, s2, depth = 4) {
    let target = false;
    for (const key in s1) {
      if (!(key in s2)) {
        target = target || /* @__PURE__ */ Object.create(null);
        target[key] = depth === 0 ? null : merge({}, s1[key], depth - 1);
      } else if (depth !== 0) {
        const diff = difference(s1[key], s2[key], depth - 1);
        if (diff !== false) {
          target = target || /* @__PURE__ */ Object.create(null);
          target[key] = diff;
        } else if (depth === 3) {
          return false;
        }
      }
    }
    return target;
  }
  var N3EntityIndex = class {
    constructor(options = {}) {
      this._id = 1;
      this._ids = /* @__PURE__ */ Object.create(null);
      this._ids[""] = 1;
      this._entities = /* @__PURE__ */ Object.create(null);
      this._entities[1] = "";
      this._blankNodeIndex = 0;
      this._factory = options.factory || N3DataFactory_default;
    }
    _termFromId(id) {
      if (id[0] === ".") {
        const entities = this._entities;
        const terms = id.split(".");
        const q = this._factory.quad(
          this._termFromId(entities[terms[1]]),
          this._termFromId(entities[terms[2]]),
          this._termFromId(entities[terms[3]]),
          terms[4] && this._termFromId(entities[terms[4]])
        );
        return q;
      }
      return termFromId(id, this._factory);
    }
    _termToNumericId(term) {
      if (term.termType === "Quad") {
        const s = this._termToNumericId(term.subject), p = this._termToNumericId(term.predicate), o = this._termToNumericId(term.object);
        let g;
        return s && p && o && (isDefaultGraph(term.graph) || (g = this._termToNumericId(term.graph))) && this._ids[g ? `.${s}.${p}.${o}.${g}` : `.${s}.${p}.${o}`];
      }
      return this._ids[termToId(term)];
    }
    _termToNewNumericId(term) {
      const str = term && term.termType === "Quad" ? `.${this._termToNewNumericId(term.subject)}.${this._termToNewNumericId(term.predicate)}.${this._termToNewNumericId(term.object)}${isDefaultGraph(term.graph) ? "" : `.${this._termToNewNumericId(term.graph)}`}` : termToId(term);
      return this._ids[str] || (this._ids[this._entities[++this._id] = str] = this._id);
    }
    createBlankNode(suggestedName) {
      let name, index;
      if (suggestedName) {
        name = suggestedName = `_:${suggestedName}`, index = 1;
        while (this._ids[name])
          name = suggestedName + index++;
      } else {
        do {
          name = `_:b${this._blankNodeIndex++}`;
        } while (this._ids[name]);
      }
      this._ids[name] = ++this._id;
      this._entities[this._id] = name;
      return this._factory.blankNode(name.substr(2));
    }
  };
  var N3Store = class _N3Store {
    constructor(quads, options) {
      this._size = 0;
      this._graphs = /* @__PURE__ */ Object.create(null);
      if (!options && quads && !quads[0] && !(typeof quads.match === "function"))
        options = quads, quads = null;
      options = options || {};
      this._factory = options.factory || N3DataFactory_default;
      this._entityIndex = options.entityIndex || new N3EntityIndex({ factory: this._factory });
      this._entities = this._entityIndex._entities;
      this._termFromId = this._entityIndex._termFromId.bind(this._entityIndex);
      this._termToNumericId = this._entityIndex._termToNumericId.bind(this._entityIndex);
      this._termToNewNumericId = this._entityIndex._termToNewNumericId.bind(this._entityIndex);
      if (quads)
        this.addAll(quads);
    }
    // ## Public properties
    // ### `size` returns the number of quads in the store
    get size() {
      let size = this._size;
      if (size !== null)
        return size;
      size = 0;
      const graphs = this._graphs;
      let subjects, subject;
      for (const graphKey in graphs)
        for (const subjectKey in subjects = graphs[graphKey].subjects)
          for (const predicateKey in subject = subjects[subjectKey])
            size += Object.keys(subject[predicateKey]).length;
      return this._size = size;
    }
    // ## Private methods
    // ### `_addToIndex` adds a quad to a three-layered index.
    // Returns if the index has changed, if the entry did not already exist.
    _addToIndex(index0, key0, key1, key2) {
      const index1 = index0[key0] || (index0[key0] = {});
      const index2 = index1[key1] || (index1[key1] = {});
      const existed = key2 in index2;
      if (!existed)
        index2[key2] = null;
      return !existed;
    }
    // ### `_removeFromIndex` removes a quad from a three-layered index
    _removeFromIndex(index0, key0, key1, key2) {
      const index1 = index0[key0], index2 = index1[key1];
      delete index2[key2];
      for (const key in index2) return;
      delete index1[key1];
      for (const key in index1) return;
      delete index0[key0];
    }
    // ### `_findInIndex` finds a set of quads in a three-layered index.
    // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
    // Any of these keys can be undefined, which is interpreted as a wildcard.
    // `name0`, `name1`, and `name2` are the names of the keys at each level,
    // used when reconstructing the resulting quad
    // (for instance: _subject_, _predicate_, and _object_).
    // Finally, `graphId` will be the graph of the created quads.
    *_findInIndex(index0, key0, key1, key2, name0, name1, name2, graphId) {
      let tmp, index1, index2;
      const entityKeys = this._entities;
      const graph = this._termFromId(entityKeys[graphId]);
      const parts = { subject: null, predicate: null, object: null };
      if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
      for (const value0 in index0) {
        if (index1 = index0[value0]) {
          parts[name0] = this._termFromId(entityKeys[value0]);
          if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
          for (const value1 in index1) {
            if (index2 = index1[value1]) {
              parts[name1] = this._termFromId(entityKeys[value1]);
              const values3 = key2 ? key2 in index2 ? [key2] : [] : Object.keys(index2);
              for (let l = 0; l < values3.length; l++) {
                parts[name2] = this._termFromId(entityKeys[values3[l]]);
                yield this._factory.quad(parts.subject, parts.predicate, parts.object, graph);
              }
            }
          }
        }
      }
    }
    // ### `_loop` executes the callback on all keys of index 0
    _loop(index0, callback) {
      for (const key0 in index0)
        callback(key0);
    }
    // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0
    _loopByKey0(index0, key0, callback) {
      let index1, key1;
      if (index1 = index0[key0]) {
        for (key1 in index1)
          callback(key1);
      }
    }
    // ### `_loopByKey1` executes the callback on given keys of all entries in index 0
    _loopByKey1(index0, key1, callback) {
      let key0, index1;
      for (key0 in index0) {
        index1 = index0[key0];
        if (index1[key1])
          callback(key0);
      }
    }
    // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2
    _loopBy2Keys(index0, key0, key1, callback) {
      let index1, index2, key2;
      if ((index1 = index0[key0]) && (index2 = index1[key1])) {
        for (key2 in index2)
          callback(key2);
      }
    }
    // ### `_countInIndex` counts matching quads in a three-layered index.
    // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
    // Any of these keys can be undefined, which is interpreted as a wildcard.
    _countInIndex(index0, key0, key1, key2) {
      let count = 0, tmp, index1, index2;
      if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
      for (const value0 in index0) {
        if (index1 = index0[value0]) {
          if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
          for (const value1 in index1) {
            if (index2 = index1[value1]) {
              if (key2) key2 in index2 && count++;
              else count += Object.keys(index2).length;
            }
          }
        }
      }
      return count;
    }
    // ### `_getGraphs` returns an array with the given graph,
    // or all graphs if the argument is null or undefined.
    _getGraphs(graph) {
      graph = graph === "" ? 1 : graph && (this._termToNumericId(graph) || -1);
      return typeof graph !== "number" ? this._graphs : { [graph]: this._graphs[graph] };
    }
    // ### `_uniqueEntities` returns a function that accepts an entity ID
    // and passes the corresponding entity to callback if it hasn't occurred before.
    _uniqueEntities(callback) {
      const uniqueIds = /* @__PURE__ */ Object.create(null);
      return (id) => {
        if (!(id in uniqueIds)) {
          uniqueIds[id] = true;
          callback(this._termFromId(this._entities[id], this._factory));
        }
      };
    }
    // ## Public methods
    // ### `add` adds the specified quad to the dataset.
    // Returns the dataset instance it was called on.
    // Existing quads, as defined in Quad.equals, will be ignored.
    add(quad4) {
      this.addQuad(quad4);
      return this;
    }
    // ### `addQuad` adds a new quad to the store.
    // Returns if the quad index has changed, if the quad did not already exist.
    addQuad(subject, predicate, object, graph) {
      if (!predicate)
        graph = subject.graph, object = subject.object, predicate = subject.predicate, subject = subject.subject;
      graph = graph ? this._termToNewNumericId(graph) : 1;
      let graphItem = this._graphs[graph];
      if (!graphItem) {
        graphItem = this._graphs[graph] = { subjects: {}, predicates: {}, objects: {} };
        Object.freeze(graphItem);
      }
      subject = this._termToNewNumericId(subject);
      predicate = this._termToNewNumericId(predicate);
      object = this._termToNewNumericId(object);
      if (!this._addToIndex(graphItem.subjects, subject, predicate, object))
        return false;
      this._addToIndex(graphItem.predicates, predicate, object, subject);
      this._addToIndex(graphItem.objects, object, subject, predicate);
      this._size = null;
      return true;
    }
    // ### `addQuads` adds multiple quads to the store
    addQuads(quads) {
      for (let i = 0; i < quads.length; i++)
        this.addQuad(quads[i]);
    }
    // ### `delete` removes the specified quad from the dataset.
    // Returns the dataset instance it was called on.
    delete(quad4) {
      this.removeQuad(quad4);
      return this;
    }
    // ### `has` determines whether a dataset includes a certain quad or quad pattern.
    has(subjectOrQuad, predicate, object, graph) {
      if (subjectOrQuad && subjectOrQuad.subject)
        ({ subject: subjectOrQuad, predicate, object, graph } = subjectOrQuad);
      return !this.readQuads(subjectOrQuad, predicate, object, graph).next().done;
    }
    // ### `import` adds a stream of quads to the store
    import(stream) {
      stream.on("data", (quad4) => {
        this.addQuad(quad4);
      });
      return stream;
    }
    // ### `removeQuad` removes a quad from the store if it exists
    removeQuad(subject, predicate, object, graph) {
      if (!predicate)
        ({ subject, predicate, object, graph } = subject);
      graph = graph ? this._termToNumericId(graph) : 1;
      const graphs = this._graphs;
      let graphItem, subjects, predicates;
      if (!(subject = subject && this._termToNumericId(subject)) || !(predicate = predicate && this._termToNumericId(predicate)) || !(object = object && this._termToNumericId(object)) || !(graphItem = graphs[graph]) || !(subjects = graphItem.subjects[subject]) || !(predicates = subjects[predicate]) || !(object in predicates))
        return false;
      this._removeFromIndex(graphItem.subjects, subject, predicate, object);
      this._removeFromIndex(graphItem.predicates, predicate, object, subject);
      this._removeFromIndex(graphItem.objects, object, subject, predicate);
      if (this._size !== null) this._size--;
      for (subject in graphItem.subjects) return true;
      delete graphs[graph];
      return true;
    }
    // ### `removeQuads` removes multiple quads from the store
    removeQuads(quads) {
      for (let i = 0; i < quads.length; i++)
        this.removeQuad(quads[i]);
    }
    // ### `remove` removes a stream of quads from the store
    remove(stream) {
      stream.on("data", (quad4) => {
        this.removeQuad(quad4);
      });
      return stream;
    }
    // ### `removeMatches` removes all matching quads from the store
    // Setting any field to `undefined` or `null` indicates a wildcard.
    removeMatches(subject, predicate, object, graph) {
      const stream = new import_readable_stream.Readable({ objectMode: true });
      const iterable = this.readQuads(subject, predicate, object, graph);
      stream._read = (size) => {
        while (--size >= 0) {
          const { done, value } = iterable.next();
          if (done) {
            stream.push(null);
            return;
          }
          stream.push(value);
        }
      };
      return this.remove(stream);
    }
    // ### `deleteGraph` removes all triples with the given graph from the store
    deleteGraph(graph) {
      return this.removeMatches(null, null, null, graph);
    }
    // ### `getQuads` returns an array of quads matching a pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    getQuads(subject, predicate, object, graph) {
      return [...this.readQuads(subject, predicate, object, graph)];
    }
    /**
     * `readQuads` returns a generator of quads matching a pattern.
     * Setting any field to `undefined` or `null` indicates a wildcard.
     * @deprecated Use `match` instead.
     */
    *readQuads(subject, predicate, object, graph) {
      const graphs = this._getGraphs(graph);
      let content, subjectId, predicateId, objectId;
      if (subject && !(subjectId = this._termToNumericId(subject)) || predicate && !(predicateId = this._termToNumericId(predicate)) || object && !(objectId = this._termToNumericId(object)))
        return;
      for (const graphId in graphs) {
        if (content = graphs[graphId]) {
          if (subjectId) {
            if (objectId)
              yield* this._findInIndex(
                content.objects,
                objectId,
                subjectId,
                predicateId,
                "object",
                "subject",
                "predicate",
                graphId
              );
            else
              yield* this._findInIndex(
                content.subjects,
                subjectId,
                predicateId,
                null,
                "subject",
                "predicate",
                "object",
                graphId
              );
          } else if (predicateId)
            yield* this._findInIndex(
              content.predicates,
              predicateId,
              objectId,
              null,
              "predicate",
              "object",
              "subject",
              graphId
            );
          else if (objectId)
            yield* this._findInIndex(
              content.objects,
              objectId,
              null,
              null,
              "object",
              "subject",
              "predicate",
              graphId
            );
          else
            yield* this._findInIndex(
              content.subjects,
              null,
              null,
              null,
              "subject",
              "predicate",
              "object",
              graphId
            );
        }
      }
    }
    // ### `match` returns a new dataset that is comprised of all quads in the current instance matching the given arguments.
    // The logic described in Quad Matching is applied for each quad in this dataset to check if it should be included in the output dataset.
    // Note: This method always returns a new DatasetCore, even if that dataset contains no quads.
    // Note: Since a DatasetCore is an unordered set, the order of the quads within the returned sequence is arbitrary.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    // For backwards compatibility, the object return also implements the Readable stream interface.
    match(subject, predicate, object, graph) {
      return new DatasetCoreAndReadableStream(this, subject, predicate, object, graph, { entityIndex: this._entityIndex });
    }
    // ### `countQuads` returns the number of quads matching a pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    countQuads(subject, predicate, object, graph) {
      const graphs = this._getGraphs(graph);
      let count = 0, content, subjectId, predicateId, objectId;
      if (subject && !(subjectId = this._termToNumericId(subject)) || predicate && !(predicateId = this._termToNumericId(predicate)) || object && !(objectId = this._termToNumericId(object)))
        return 0;
      for (const graphId in graphs) {
        if (content = graphs[graphId]) {
          if (subject) {
            if (object)
              count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
            else
              count += this._countInIndex(content.subjects, subjectId, predicateId, objectId);
          } else if (predicate) {
            count += this._countInIndex(content.predicates, predicateId, objectId, subjectId);
          } else {
            count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
          }
        }
      }
      return count;
    }
    // ### `forEach` executes the callback on all quads.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    forEach(callback, subject, predicate, object, graph) {
      this.some((quad4) => {
        callback(quad4, this);
        return false;
      }, subject, predicate, object, graph);
    }
    // ### `every` executes the callback on all quads,
    // and returns `true` if it returns truthy for all them.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    every(callback, subject, predicate, object, graph) {
      return !this.some((quad4) => !callback(quad4, this), subject, predicate, object, graph);
    }
    // ### `some` executes the callback on all quads,
    // and returns `true` if it returns truthy for any of them.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    some(callback, subject, predicate, object, graph) {
      for (const quad4 of this.readQuads(subject, predicate, object, graph))
        if (callback(quad4, this))
          return true;
      return false;
    }
    // ### `getSubjects` returns all subjects that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    getSubjects(predicate, object, graph) {
      const results = [];
      this.forSubjects((s) => {
        results.push(s);
      }, predicate, object, graph);
      return results;
    }
    // ### `forSubjects` executes the callback on all subjects that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    forSubjects(callback, predicate, object, graph) {
      const graphs = this._getGraphs(graph);
      let content, predicateId, objectId;
      callback = this._uniqueEntities(callback);
      if (predicate && !(predicateId = this._termToNumericId(predicate)) || object && !(objectId = this._termToNumericId(object)))
        return;
      for (graph in graphs) {
        if (content = graphs[graph]) {
          if (predicateId) {
            if (objectId)
              this._loopBy2Keys(content.predicates, predicateId, objectId, callback);
            else
              this._loopByKey1(content.subjects, predicateId, callback);
          } else if (objectId)
            this._loopByKey0(content.objects, objectId, callback);
          else
            this._loop(content.subjects, callback);
        }
      }
    }
    // ### `getPredicates` returns all predicates that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    getPredicates(subject, object, graph) {
      const results = [];
      this.forPredicates((p) => {
        results.push(p);
      }, subject, object, graph);
      return results;
    }
    // ### `forPredicates` executes the callback on all predicates that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    forPredicates(callback, subject, object, graph) {
      const graphs = this._getGraphs(graph);
      let content, subjectId, objectId;
      callback = this._uniqueEntities(callback);
      if (subject && !(subjectId = this._termToNumericId(subject)) || object && !(objectId = this._termToNumericId(object)))
        return;
      for (graph in graphs) {
        if (content = graphs[graph]) {
          if (subjectId) {
            if (objectId)
              this._loopBy2Keys(content.objects, objectId, subjectId, callback);
            else
              this._loopByKey0(content.subjects, subjectId, callback);
          } else if (objectId)
            this._loopByKey1(content.predicates, objectId, callback);
          else
            this._loop(content.predicates, callback);
        }
      }
    }
    // ### `getObjects` returns all objects that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    getObjects(subject, predicate, graph) {
      const results = [];
      this.forObjects((o) => {
        results.push(o);
      }, subject, predicate, graph);
      return results;
    }
    // ### `forObjects` executes the callback on all objects that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    forObjects(callback, subject, predicate, graph) {
      const graphs = this._getGraphs(graph);
      let content, subjectId, predicateId;
      callback = this._uniqueEntities(callback);
      if (subject && !(subjectId = this._termToNumericId(subject)) || predicate && !(predicateId = this._termToNumericId(predicate)))
        return;
      for (graph in graphs) {
        if (content = graphs[graph]) {
          if (subjectId) {
            if (predicateId)
              this._loopBy2Keys(content.subjects, subjectId, predicateId, callback);
            else
              this._loopByKey1(content.objects, subjectId, callback);
          } else if (predicateId)
            this._loopByKey0(content.predicates, predicateId, callback);
          else
            this._loop(content.objects, callback);
        }
      }
    }
    // ### `getGraphs` returns all graphs that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    getGraphs(subject, predicate, object) {
      const results = [];
      this.forGraphs((g) => {
        results.push(g);
      }, subject, predicate, object);
      return results;
    }
    // ### `forGraphs` executes the callback on all graphs that match the pattern.
    // Setting any field to `undefined` or `null` indicates a wildcard.
    forGraphs(callback, subject, predicate, object) {
      for (const graph in this._graphs) {
        this.some((quad4) => {
          callback(quad4.graph);
          return true;
        }, subject, predicate, object, this._termFromId(this._entities[graph]));
      }
    }
    // ### `createBlankNode` creates a new blank node, returning its name
    createBlankNode(suggestedName) {
      return this._entityIndex.createBlankNode(suggestedName);
    }
    // ### `extractLists` finds and removes all list triples
    // and returns the items per list.
    extractLists({ remove = false, ignoreErrors = false } = {}) {
      const lists = {};
      const onError = ignoreErrors ? (() => true) : ((node, message) => {
        throw new Error(`${node.value} ${message}`);
      });
      const tails = this.getQuads(null, IRIs_default.rdf.rest, IRIs_default.rdf.nil, null);
      const toRemove = remove ? [...tails] : [];
      tails.forEach((tailQuad) => {
        const items = [];
        let malformed = false;
        let head;
        let headPos;
        const graph = tailQuad.graph;
        let current = tailQuad.subject;
        while (current && !malformed) {
          const objectQuads = this.getQuads(null, null, current, null);
          const subjectQuads = this.getQuads(current, null, null, null);
          let quad4, first = null, rest = null, parent = null;
          for (let i = 0; i < subjectQuads.length && !malformed; i++) {
            quad4 = subjectQuads[i];
            if (!quad4.graph.equals(graph))
              malformed = onError(current, "not confined to single graph");
            else if (head)
              malformed = onError(current, "has non-list arcs out");
            else if (quad4.predicate.value === IRIs_default.rdf.first) {
              if (first)
                malformed = onError(current, "has multiple rdf:first arcs");
              else
                toRemove.push(first = quad4);
            } else if (quad4.predicate.value === IRIs_default.rdf.rest) {
              if (rest)
                malformed = onError(current, "has multiple rdf:rest arcs");
              else
                toRemove.push(rest = quad4);
            } else if (objectQuads.length)
              malformed = onError(current, "can't be subject and object");
            else {
              head = quad4;
              headPos = "subject";
            }
          }
          for (let i = 0; i < objectQuads.length && !malformed; ++i) {
            quad4 = objectQuads[i];
            if (head)
              malformed = onError(current, "can't have coreferences");
            else if (quad4.predicate.value === IRIs_default.rdf.rest) {
              if (parent)
                malformed = onError(current, "has incoming rdf:rest arcs");
              else
                parent = quad4;
            } else {
              head = quad4;
              headPos = "object";
            }
          }
          if (!first)
            malformed = onError(current, "has no list head");
          else
            items.unshift(first.object);
          current = parent && parent.subject;
        }
        if (malformed)
          remove = false;
        else if (head)
          lists[head[headPos].value] = items;
      });
      if (remove)
        this.removeQuads(toRemove);
      return lists;
    }
    /**
     * Returns `true` if the current dataset is a superset of the given dataset; in other words, returns `true` if
     * the given dataset is a subset of, i.e., is contained within, the current dataset.
     *
     * Blank Nodes will be normalized.
     */
    addAll(quads) {
      if (quads instanceof DatasetCoreAndReadableStream)
        quads = quads.filtered;
      if (Array.isArray(quads))
        this.addQuads(quads);
      else if (quads instanceof _N3Store && quads._entityIndex === this._entityIndex) {
        if (quads._size !== 0) {
          this._graphs = merge(this._graphs, quads._graphs);
          this._size = null;
        }
      } else {
        for (const quad4 of quads)
          this.add(quad4);
      }
      return this;
    }
    /**
     * Returns `true` if the current dataset is a superset of the given dataset; in other words, returns `true` if
     * the given dataset is a subset of, i.e., is contained within, the current dataset.
     *
     * Blank Nodes will be normalized.
     */
    contains(other) {
      if (other instanceof DatasetCoreAndReadableStream)
        other = other.filtered;
      if (other === this)
        return true;
      if (!(other instanceof _N3Store) || this._entityIndex !== other._entityIndex)
        return other.every((quad4) => this.has(quad4));
      const g1 = this._graphs, g2 = other._graphs;
      let s1, s2, p1, p2, o1;
      for (const graph in g2) {
        if (!(s1 = g1[graph])) return false;
        s1 = s1.subjects;
        for (const subject in s2 = g2[graph].subjects) {
          if (!(p1 = s1[subject])) return false;
          for (const predicate in p2 = s2[subject]) {
            if (!(o1 = p1[predicate])) return false;
            for (const object in p2[predicate])
              if (!(object in o1)) return false;
          }
        }
      }
      return true;
    }
    /**
     * This method removes the quads in the current dataset that match the given arguments.
     *
     * The logic described in {@link https://rdf.js.org/dataset-spec/#quad-matching|Quad Matching} is applied for each
     * quad in this dataset, to select the quads which will be deleted.
     *
     * @param subject   The optional exact subject to match.
     * @param predicate The optional exact predicate to match.
     * @param object    The optional exact object to match.
     * @param graph     The optional exact graph to match.
     */
    deleteMatches(subject, predicate, object, graph) {
      for (const quad4 of this.match(subject, predicate, object, graph))
        this.removeQuad(quad4);
      return this;
    }
    /**
     * Returns a new dataset that contains all quads from the current dataset that are not included in the given dataset.
     */
    difference(other) {
      if (other && other instanceof DatasetCoreAndReadableStream)
        other = other.filtered;
      if (other === this)
        return new _N3Store({ entityIndex: this._entityIndex });
      if (other instanceof _N3Store && other._entityIndex === this._entityIndex) {
        const store = new _N3Store({ entityIndex: this._entityIndex });
        const graphs = difference(this._graphs, other._graphs);
        if (graphs) {
          store._graphs = graphs;
          store._size = null;
        }
        return store;
      }
      return this.filter((quad4) => !other.has(quad4));
    }
    /**
     * Returns true if the current dataset contains the same graph structure as the given dataset.
     *
     * Blank Nodes will be normalized.
     */
    equals(other) {
      if (other instanceof DatasetCoreAndReadableStream)
        other = other.filtered;
      return other === this || this.size === other.size && this.contains(other);
    }
    /**
     * Creates a new dataset with all the quads that pass the test implemented by the provided `iteratee`.
     *
     * This method is aligned with Array.prototype.filter() in ECMAScript-262.
     */
    filter(iteratee) {
      const store = new _N3Store({ entityIndex: this._entityIndex });
      for (const quad4 of this)
        if (iteratee(quad4, this))
          store.add(quad4);
      return store;
    }
    /**
     * Returns a new dataset containing all quads from the current dataset that are also included in the given dataset.
     */
    intersection(other) {
      if (other instanceof DatasetCoreAndReadableStream)
        other = other.filtered;
      if (other === this) {
        const store = new _N3Store({ entityIndex: this._entityIndex });
        store._graphs = merge(/* @__PURE__ */ Object.create(null), this._graphs);
        store._size = this._size;
        return store;
      } else if (other instanceof _N3Store && this._entityIndex === other._entityIndex) {
        const store = new _N3Store({ entityIndex: this._entityIndex });
        const graphs = intersect(other._graphs, this._graphs);
        if (graphs) {
          store._graphs = graphs;
          store._size = null;
        }
        return store;
      }
      return this.filter((quad4) => other.has(quad4));
    }
    /**
     * Returns a new dataset containing all quads returned by applying `iteratee` to each quad in the current dataset.
     */
    map(iteratee) {
      const store = new _N3Store({ entityIndex: this._entityIndex });
      for (const quad4 of this)
        store.add(iteratee(quad4, this));
      return store;
    }
    /**
     * This method calls the `iteratee` method on each `quad` of the `Dataset`. The first time the `iteratee` method
     * is called, the `accumulator` value is the `initialValue`, or, if not given, equals the first quad of the `Dataset`.
     * The return value of each call to the `iteratee` method is used as the `accumulator` value for the next call.
     *
     * This method returns the return value of the last `iteratee` call.
     *
     * This method is aligned with `Array.prototype.reduce()` in ECMAScript-262.
     */
    reduce(callback, initialValue) {
      const iter = this.readQuads();
      let accumulator = initialValue === void 0 ? iter.next().value : initialValue;
      for (const quad4 of iter)
        accumulator = callback(accumulator, quad4, this);
      return accumulator;
    }
    /**
     * Returns the set of quads within the dataset as a host-language-native sequence, for example an `Array` in
     * ECMAScript-262.
     *
     * Since a `Dataset` is an unordered set, the order of the quads within the returned sequence is arbitrary.
     */
    toArray() {
      return this.getQuads();
    }
    /**
     * Returns an N-Quads string representation of the dataset, preprocessed with the
     * {@link https://json-ld.github.io/normalization/spec/|RDF Dataset Normalization} algorithm.
     */
    toCanonical() {
      throw new Error("not implemented");
    }
    /**
     * Returns a stream that contains all quads of the dataset.
     */
    toStream() {
      return this.match();
    }
    /**
     * Returns an N-Quads string representation of the dataset.
     *
     * No prior normalization is required, therefore the results for the same quads may vary depending on the `Dataset`
     * implementation.
     */
    toString() {
      return new N3Writer().quadsToString(this);
    }
    /**
     * Returns a new `Dataset` that is a concatenation of this dataset and the quads given as an argument.
     */
    union(quads) {
      const store = new _N3Store({ entityIndex: this._entityIndex });
      store._graphs = merge(/* @__PURE__ */ Object.create(null), this._graphs);
      store._size = this._size;
      store.addAll(quads);
      return store;
    }
    // ### Store is an iterable.
    // Can be used where iterables are expected: for...of loops, array spread operator,
    // `yield*`, and destructuring assignment (order is not guaranteed).
    *[Symbol.iterator]() {
      yield* this.readQuads();
    }
  };
  function indexMatch(index, ids, depth = 0) {
    const ind = ids[depth];
    if (ind && !(ind in index))
      return false;
    let target = false;
    for (const key in ind ? { [ind]: index[ind] } : index) {
      const result = depth === 2 ? null : indexMatch(index[key], ids, depth + 1);
      if (result !== false) {
        target = target || /* @__PURE__ */ Object.create(null);
        target[key] = result;
      }
    }
    return target;
  }
  var DatasetCoreAndReadableStream = class _DatasetCoreAndReadableStream extends import_readable_stream.Readable {
    constructor(n3Store, subject, predicate, object, graph, options) {
      super({ objectMode: true });
      Object.assign(this, { n3Store, subject, predicate, object, graph, options });
    }
    get filtered() {
      if (!this._filtered) {
        const { n3Store, graph, object, predicate, subject } = this;
        const newStore = this._filtered = new N3Store({ factory: n3Store._factory, entityIndex: this.options.entityIndex });
        let subjectId, predicateId, objectId;
        if (subject && !(subjectId = newStore._termToNumericId(subject)) || predicate && !(predicateId = newStore._termToNumericId(predicate)) || object && !(objectId = newStore._termToNumericId(object)))
          return newStore;
        const graphs = n3Store._getGraphs(graph);
        for (const graphKey in graphs) {
          let subjects, predicates, objects, content;
          if (content = graphs[graphKey]) {
            if (!subjectId && predicateId) {
              if (predicates = indexMatch(content.predicates, [predicateId, objectId, subjectId])) {
                subjects = indexMatch(content.subjects, [subjectId, predicateId, objectId]);
                objects = indexMatch(content.objects, [objectId, subjectId, predicateId]);
              }
            } else if (objectId) {
              if (objects = indexMatch(content.objects, [objectId, subjectId, predicateId])) {
                subjects = indexMatch(content.subjects, [subjectId, predicateId, objectId]);
                predicates = indexMatch(content.predicates, [predicateId, objectId, subjectId]);
              }
            } else if (subjects = indexMatch(content.subjects, [subjectId, predicateId, objectId])) {
              predicates = indexMatch(content.predicates, [predicateId, objectId, subjectId]);
              objects = indexMatch(content.objects, [objectId, subjectId, predicateId]);
            }
            if (subjects)
              newStore._graphs[graphKey] = { subjects, predicates, objects };
          }
        }
        newStore._size = null;
      }
      return this._filtered;
    }
    get size() {
      return this.filtered.size;
    }
    _read(size) {
      if (size > 0 && !this[ITERATOR])
        this[ITERATOR] = this[Symbol.iterator]();
      const iterable = this[ITERATOR];
      while (--size >= 0) {
        const { done, value } = iterable.next();
        if (done) {
          this.push(null);
          return;
        }
        this.push(value);
      }
    }
    addAll(quads) {
      return this.filtered.addAll(quads);
    }
    contains(other) {
      return this.filtered.contains(other);
    }
    deleteMatches(subject, predicate, object, graph) {
      return this.filtered.deleteMatches(subject, predicate, object, graph);
    }
    difference(other) {
      return this.filtered.difference(other);
    }
    equals(other) {
      return this.filtered.equals(other);
    }
    every(callback, subject, predicate, object, graph) {
      return this.filtered.every(callback, subject, predicate, object, graph);
    }
    filter(iteratee) {
      return this.filtered.filter(iteratee);
    }
    forEach(callback, subject, predicate, object, graph) {
      return this.filtered.forEach(callback, subject, predicate, object, graph);
    }
    import(stream) {
      return this.filtered.import(stream);
    }
    intersection(other) {
      return this.filtered.intersection(other);
    }
    map(iteratee) {
      return this.filtered.map(iteratee);
    }
    some(callback, subject, predicate, object, graph) {
      return this.filtered.some(callback, subject, predicate, object, graph);
    }
    toCanonical() {
      return this.filtered.toCanonical();
    }
    toStream() {
      return this._filtered ? this._filtered.toStream() : this.n3Store.match(this.subject, this.predicate, this.object, this.graph);
    }
    union(quads) {
      return this._filtered ? this._filtered.union(quads) : this.n3Store.match(this.subject, this.predicate, this.object, this.graph).addAll(quads);
    }
    toArray() {
      return this._filtered ? this._filtered.toArray() : this.n3Store.getQuads(this.subject, this.predicate, this.object, this.graph);
    }
    reduce(callback, initialValue) {
      return this.filtered.reduce(callback, initialValue);
    }
    toString() {
      return new N3Writer().quadsToString(this);
    }
    add(quad4) {
      return this.filtered.add(quad4);
    }
    delete(quad4) {
      return this.filtered.delete(quad4);
    }
    has(quad4) {
      return this.filtered.has(quad4);
    }
    match(subject, predicate, object, graph) {
      return new _DatasetCoreAndReadableStream(this.filtered, subject, predicate, object, graph, this.options);
    }
    *[Symbol.iterator]() {
      yield* this._filtered || this.n3Store.readQuads(this.subject, this.predicate, this.object, this.graph);
    }
  };

  // node_modules/n3/src/N3StoreFactory.js
  var N3DatasetCoreFactory = class {
    dataset(quads) {
      return new N3Store(quads);
    }
  };

  // node_modules/n3/src/N3Reasoner.js
  function getRulesFromDataset(dataset) {
    const rules = [];
    for (const { subject, object } of dataset.match(null, N3DataFactory_default.namedNode("http://www.w3.org/2000/10/swap/log#implies"), null, N3DataFactory_default.defaultGraph())) {
      const premise = [...dataset.match(null, null, null, subject)];
      const conclusion = [...dataset.match(null, null, null, object)];
      rules.push({ premise, conclusion });
    }
    return rules;
  }
  var N3Reasoner = class {
    constructor(store) {
      this._store = store;
    }
    _add(subject, predicate, object, graphItem, cb) {
      if (!this._store._addToIndex(graphItem.subjects, subject, predicate, object)) return;
      this._store._addToIndex(graphItem.predicates, predicate, object, subject);
      this._store._addToIndex(graphItem.objects, object, subject, predicate);
      cb();
    }
    // eslint-disable-next-line no-warning-comments
    _evaluatePremise(rule, content, cb, i = 0) {
      let v1, v2, value, index1, index2;
      const [val0, val1, val2] = rule.premise[i].value, index = content[rule.premise[i].content];
      const v0 = !(value = val0.value);
      for (value in v0 ? index : { [value]: index[value] }) {
        if (index1 = index[value]) {
          if (v0) val0.value = Number(value);
          v1 = !(value = val1.value);
          for (value in v1 ? index1 : { [value]: index1[value] }) {
            if (index2 = index1[value]) {
              if (v1) val1.value = Number(value);
              v2 = !(value = val2.value);
              for (value in v2 ? index2 : { [value]: index2[value] }) {
                if (v2) val2.value = Number(value);
                if (i === rule.premise.length - 1)
                  rule.conclusion.forEach((c) => {
                    this._add(c.subject.value, c.predicate.value, c.object.value, content, () => {
                      cb(c);
                    });
                  });
                else
                  this._evaluatePremise(rule, content, cb, i + 1);
              }
              if (v2) val2.value = null;
            }
          }
          if (v1) val1.value = null;
        }
      }
      if (v0) val0.value = null;
    }
    _evaluateRules(rules, content, cb) {
      for (let i = 0; i < rules.length; i++) {
        this._evaluatePremise(rules[i], content, cb);
      }
    }
    // A naive reasoning algorithm where rules are just applied by repeatedly applying rules
    // until no more evaluations are made
    _reasonGraphNaive(rules, content) {
      const newRules = [];
      function addRule(conclusion) {
        if (conclusion.next)
          conclusion.next.forEach((rule) => {
            newRules.push([conclusion.subject.value, conclusion.predicate.value, conclusion.object.value, rule]);
          });
      }
      const addConclusions = (conclusion) => {
        conclusion.forEach((c) => {
          this._add(c.subject.value, c.predicate.value, c.object.value, content, () => {
            addRule(c);
          });
        });
      };
      this._evaluateRules(rules, content, addRule);
      let r;
      while ((r = newRules.pop()) !== void 0) {
        const [subject, predicate, object, rule] = r;
        const v1 = rule.basePremise.subject.value;
        if (!v1) rule.basePremise.subject.value = subject;
        const v2 = rule.basePremise.predicate.value;
        if (!v2) rule.basePremise.predicate.value = predicate;
        const v3 = rule.basePremise.object.value;
        if (!v3) rule.basePremise.object.value = object;
        if (rule.premise.length === 0) {
          addConclusions(rule.conclusion);
        } else {
          this._evaluatePremise(rule, content, addRule);
        }
        if (!v1) rule.basePremise.subject.value = null;
        if (!v2) rule.basePremise.predicate.value = null;
        if (!v3) rule.basePremise.object.value = null;
      }
    }
    _createRule({ premise, conclusion }) {
      const varMapping = {};
      const toId = (value) => value.termType === "Variable" ? (
        // If the term is a variable, then create an empty object that values can be placed into
        varMapping[value.value] = varMapping[value.value] || {}
      ) : (
        // If the term is not a variable, then set the ID value
        { value: this._store._termToNewNumericId(value) }
      );
      const t = (term) => ({ subject: toId(term.subject), predicate: toId(term.predicate), object: toId(term.object) });
      return {
        premise: premise.map((p) => t(p)),
        conclusion: conclusion.map((p) => t(p)),
        variables: Object.values(varMapping)
      };
    }
    reason(rules) {
      if (!Array.isArray(rules)) {
        rules = getRulesFromDataset(rules);
      }
      rules = rules.map((rule) => this._createRule(rule));
      for (const r1 of rules) {
        for (const r2 of rules) {
          for (let i = 0; i < r2.premise.length; i++) {
            const p = r2.premise[i];
            for (const c of r1.conclusion) {
              if (termEq(p.subject, c.subject) && termEq(p.predicate, c.predicate) && termEq(p.object, c.object)) {
                const set = /* @__PURE__ */ new Set();
                const premise = [];
                p.subject.value = p.subject.value || 1;
                p.object.value = p.object.value || 1;
                p.predicate.value = p.predicate.value || 1;
                for (let j = 0; j < r2.premise.length; j++) {
                  if (j !== i) {
                    premise.push(getIndex(r2.premise[j], set));
                  }
                }
                (c.next = c.next || []).push({
                  premise,
                  conclusion: r2.conclusion,
                  // This is a single premise of the form { subject, predicate, object },
                  // which we can use to instantiate the rule using the new data that was emitted
                  basePremise: p
                });
              }
              r2.variables.forEach((v) => {
                v.value = null;
              });
            }
          }
        }
      }
      for (const rule of rules) {
        const set = /* @__PURE__ */ new Set();
        rule.premise = rule.premise.map((p) => getIndex(p, set));
      }
      const graphs = this._store._getGraphs();
      for (const graphId in graphs) {
        this._reasonGraphNaive(rules, graphs[graphId]);
      }
      this._store._size = null;
    }
  };
  function getIndex({ subject, predicate, object }, set) {
    const s = subject.value || set.has(subject) || (set.add(subject), false);
    const p = predicate.value || set.has(predicate) || (set.add(predicate), false);
    const o = object.value || set.has(object) || (set.add(object), false);
    return !s && p ? { content: "predicates", value: [predicate, object, subject] } : o ? { content: "objects", value: [object, subject, predicate] } : { content: "subjects", value: [subject, predicate, object] };
  }
  function termEq(t1, t2) {
    if (t1.value === null) {
      t1.value = t2.value;
    }
    return t1.value === t2.value;
  }

  // node_modules/n3/src/N3StreamParser.js
  var import_readable_stream2 = __toESM(require_browser3());
  var N3StreamParser = class extends import_readable_stream2.Transform {
    constructor(options) {
      super({ decodeStrings: true });
      this._readableState.objectMode = true;
      const parser = new N3Parser(options);
      let onData, onEnd;
      const callbacks = {
        // Handle quads by pushing them down the pipeline
        onQuad: (error, quad4) => {
          error && this.emit("error", error) || quad4 && this.push(quad4);
        },
        // Emit prefixes through the `prefix` event
        onPrefix: (prefix2, uri) => {
          this.emit("prefix", prefix2, uri);
        }
      };
      if (options && options.comments)
        callbacks.onComment = (comment) => {
          this.emit("comment", comment);
        };
      parser.parse({
        on: (event, callback) => {
          switch (event) {
            case "data":
              onData = callback;
              break;
            case "end":
              onEnd = callback;
              break;
          }
        }
      }, callbacks);
      this._transform = (chunk, encoding, done) => {
        onData(chunk);
        done();
      };
      this._flush = (done) => {
        onEnd();
        done();
      };
    }
    // ### Parses a stream of strings
    import(stream) {
      stream.on("data", (chunk) => {
        this.write(chunk);
      });
      stream.on("end", () => {
        this.end();
      });
      stream.on("error", (error) => {
        this.emit("error", error);
      });
      return this;
    }
  };

  // node_modules/n3/src/N3StreamWriter.js
  var import_readable_stream3 = __toESM(require_browser3());
  var N3StreamWriter = class extends import_readable_stream3.Transform {
    constructor(options) {
      super({ encoding: "utf8", writableObjectMode: true });
      const writer = this._writer = new N3Writer({
        write: (quad4, encoding, callback) => {
          this.push(quad4);
          callback && callback();
        },
        end: (callback) => {
          this.push(null);
          callback && callback();
        }
      }, options);
      this._transform = (quad4, encoding, done) => {
        writer.addQuad(quad4, done);
      };
      this._flush = (done) => {
        writer.end(done);
      };
    }
    // ### Serializes a stream of quads
    import(stream) {
      stream.on("data", (quad4) => {
        this.write(quad4);
      });
      stream.on("end", () => {
        this.end();
      });
      stream.on("error", (error) => {
        this.emit("error", error);
      });
      stream.on("prefix", (prefix2, iri) => {
        this._writer.addPrefix(prefix2, iri);
      });
      return this;
    }
  };

  // node_modules/n3/src/index.js
  var src_default = {
    Lexer: N3Lexer,
    Parser: N3Parser,
    Writer: N3Writer,
    Store: N3Store,
    StoreFactory: N3DatasetCoreFactory,
    EntityIndex: N3EntityIndex,
    StreamParser: N3StreamParser,
    StreamWriter: N3StreamWriter,
    Util: N3Util_exports,
    Reasoner: N3Reasoner,
    BaseIRI,
    DataFactory: N3DataFactory_default,
    Term,
    NamedNode,
    Literal,
    BlankNode,
    Variable,
    DefaultGraph,
    Quad,
    Triple: Quad,
    termFromId,
    termToId
  };

  // src/public-resources.js
  var { namedNode: namedNode2, quad: quad2 } = N3DataFactory_default;
  function publicResources({ privateClient, publicClient, store, root }) {
    privateClient.declareType("published-resource", { type: "object", required: ["url", "paths"], properties: { url: { type: "string" }, paths: { type: "array", items: { type: "string" } } } });
    let sync = async () => {
    };
    const key = (url) => "_rs/published/" + encodeURIComponent(url.split("#")[0]);
    const path = (url) => "exports/" + url.slice(root.length);
    const own = (url) => {
      if (!url.startsWith(root) || url.endsWith("/")) throw Error("Choose a document in this module to share");
    };
    const write = async (source, resource, links2) => {
      if (resource.kind === "container") throw Error("Share documents, not whole folders");
      if (resource.kind === "file") return publicClient.storeFile(resource.contentType, path(source), resource.bytes);
      const change = (term) => {
        if (term.termType !== "NamedNode") return term;
        const [doc, fragment] = term.value.split("#");
        return links2.has(doc) ? namedNode2(links2.get(doc) + (fragment ? "#" + fragment : "")) : term;
      };
      const writer = new N3Writer({ format: "N-Triples" });
      writer.addQuads(new N3Parser().parse(resource.triples.join("\n")).map((q) => quad2(change(q.subject), q.predicate, change(q.object), q.graph)));
      const body = await new Promise((resolve, reject) => writer.end((error, text) => error ? reject(error) : resolve(text)));
      return publicClient.storeFile("text/turtle", path(source), body);
    };
    return {
      configureSync(callback) {
        sync = callback;
      },
      async getPublicURL(url) {
        return (await privateClient.getObject(key(url)))?.url;
      },
      async publish(url, related = []) {
        url = url.split("#")[0];
        const sources = [.../* @__PURE__ */ new Set([url, ...related.map((x) => x.split("#")[0])])];
        sources.forEach(own);
        if (!publicClient) throw Error("Public storage is unavailable");
        const resources = await Promise.all(sources.map(async (source) => {
          const resource = await store.get(source);
          if (!resource) throw Error("Document is not saved yet");
          return resource;
        }));
        for (let i = 0; i < sources.length; i++) await write(sources[i], resources[i], /* @__PURE__ */ new Map());
        await sync();
        const links2 = /* @__PURE__ */ new Map();
        for (const source of sources) {
          const link = await publicClient.getItemURL(path(source));
          if (!link) throw Error("The storage provider did not return a public link");
          links2.set(source, link);
        }
        for (let i = 0; i < sources.length; i++) await write(sources[i], resources[i], links2);
        await sync();
        const result = links2.get(url);
        await privateClient.storeObject("published-resource", key(url), { url: result, paths: sources.map(path) });
        return result;
      },
      async unpublish(url) {
        const record = await privateClient.getObject(key(url));
        if (!record) return;
        for (const item of record.paths) {
          const response = await publicClient.remove(item);
          if (!response || !(response.statusCode >= 200 && response.statusCode < 300 || response.statusCode === 404)) throw Error("The provider refused to remove the public copy");
        }
        await sync();
        await privateClient.remove(key(url));
      }
    };
  }

  // src/flashcards-legacy.js
  var Flashcards = function(privateClient) {
    privateClient.declareType("flashcard", {
      "type": "object",
      "properties": {
        "@id": {
          "type": "string"
        },
        "@type": {
          "enum": ["flashcard"]
        },
        "frontText": {
          "type": "string"
        },
        "backText": {
          "type": "string"
        },
        "hint": {
          "type": "string"
        },
        "familiarity": {
          "type": "number"
        },
        "reviewedCount": {
          "type": "number"
        },
        "group": {
          "type": "string"
        },
        "reviewedAt": {
          "type": "string",
          "format": "date-time"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": ["@id", "@type", "frontText", "group", "createdAt"]
    });
    const flashcards = {
      name: "flashcards",
      on: privateClient.on,
      /**
       * Stores a flashcard
       *
       * @param {string} frontText - Filename
       * @param {string} backText  - Filename
       *
       * @returns {Promise} A promise, which will be fulfilled with the updated flashcard object
       *
       * @alias module:flashcards
       * @public
       *
       * @example
       *
       * remoteStorage.flashcards.store(flashcard)
       *   .then((flashcard) => { console.log(`the updated flashcard object is: ${flashcard}`)
       */
      store: function(flashcard) {
        const date = this._formattedDate(/* @__PURE__ */ new Date());
        flashcard["@id"] = flashcard["@id"] || date;
        flashcard.group = flashcard.group || "default";
        flashcard["@type"] = "flashcard";
        flashcard.familiarity = flashcard.familiarity || 0;
        flashcard.reviewedCount = flashcard.reviewedCount || 0;
        flashcard.reviewedAt = flashcard.reviewedAt || date;
        flashcard.updatedAt = date;
        if (!flashcard.createdAt) {
          flashcard.createdAt = date;
        }
        return privateClient.storeObject(
          "flashcard",
          flashcard.group + "/" + flashcard["@id"],
          flashcard
        ).then(() => {
          return this.get(flashcard.group, flashcard["@id"]);
        });
      },
      /**
       * Remove a flashcard
       *
       * @param {string} group - The group name of the flashcard
       * @param {string} id - The ID of the flashcard
       *
       * @returns {Promise}
       *
       * @alias module:flashcards
       * @public
       */
      remove: function(group, id) {
        return privateClient.remove(group + "/" + id);
      },
      /**
       * Get a flashcard.
       *
       * @param {string} id - the ID of the flashcard
       *
       * @returns {object} The flashcard object
       *
       * @alias module:flashcards
       * @public
       */
      get: function(group, id) {
        return privateClient.getObject(group + "/" + id);
      },
      /**
       * List all flashcard groups
       *
       * @returns {Promise} Resolves with an array containing the flashcard group names
       *
       * @alias module:flashcards
       * @public
       */
      listGroups: function() {
        return privateClient.getListing();
      },
      /**
       * List all flashcards in a group
       *
       * @param {string} group - the name of the group
       *
       * @returns {Promise} Resolves with an array containing all the flashcard objects of that group
       *
       * @alias module:flashcards
       * @public
       */
      getAllByGroup: function(group) {
        group = group || "default";
        return privateClient.getAll(group + "/");
      },
      /**
       * Helper method for formatting dates for filenames
       *
       * @param {date} date - a Date object
       *
       * @returns {string} A formatted date string, like e.g. '131106-1523'
       *
       * @private
       */
      _formattedDate: function(date) {
        const pad = function(num) {
          num = String(num);
          if (num.length === 1) {
            num = "0" + num;
          }
          return num;
        };
        const yrs = pad(date.getUTCFullYear().toString()), mon = pad(date.getUTCMonth() + 1), day = pad(date.getUTCDate()), hrs = pad(date.getUTCHours()), min = pad(date.getUTCMinutes()), sec = pad(date.getUTCSeconds());
        return yrs + mon + day + "-" + hrs + min + sec;
      }
    };
    return { exports: flashcards };
  };
  var flashcards_legacy_default = { name: "flashcards", builder: Flashcards };

  // src/flashcards.js
  function flashcardsDomain(api) {
    const sources = () => {
      const candidates = [api, api.adapter].filter(Boolean);
      return candidates.filter((source, index) => candidates.findIndex((other) => other.webId === source.webId) === index);
    };
    return {
      /** Identities whose type indexes should be read; native documents first. */
      storageSources() {
        return sources().map((source) => ({
          webId: source.webId,
          root: source.root,
          ...source === api.adapter && source !== api ? { optional: true } : {}
        }));
      },
      /** Keep registration changes in the type index that owns this instance. */
      identityFor(url) {
        const resource = new URL(url);
        const source = sources().find(({ root }) => resource.href.startsWith(new URL(root).href));
        return source?.webId;
      }
    };
  }

  // src/solid-import.js
  var { namedNode: namedNode3, quad: quad3 } = N3DataFactory_default;
  var solid = "http://www.w3.org/ns/solid/terms#";
  var contains = "http://www.w3.org/ns/ldp#contains";
  async function turtle(quads) {
    const writer = new N3Writer({ format: "N-Triples" });
    writer.addQuads(quads);
    return new Promise((resolve, reject) => writer.end((error, text) => error ? reject(error) : resolve(text)));
  }
  async function importSolid({ fetcher, webId, classes, root, store, fetch, excludePrefix }) {
    const readGraph = async (url) => {
      const response = await fetcher(url, { headers: { Accept: "text/turtle" } });
      if (!response.ok) throw Error("Could not import " + url + " (HTTP " + response.status + ")");
      return new N3Store(new N3Parser({ baseIRI: url }).parse(await response.text()));
    };
    const profile = await readGraph(webId.split("#")[0]);
    const indexes = ["privateTypeIndex", "publicTypeIndex"].flatMap((key) => profile.getObjects(namedNode3(webId), namedNode3(solid + key), null).map((t) => t.value));
    for (const preferences of profile.getObjects(namedNode3(webId), namedNode3("http://www.w3.org/ns/pim/space#preferencesFile"), null)) {
      const graph = await readGraph(preferences.value);
      indexes.push(...graph.getObjects(namedNode3(webId), namedNode3(solid + "privateTypeIndex"), null).map((t) => t.value));
    }
    const registrations = [];
    for (const index of [...new Set(indexes)]) {
      const graph = await readGraph(index);
      for (const cls of classes) for (const subject of graph.getSubjects(namedNode3(solid + "forClass"), namedNode3(cls), null)) {
        for (const predicate of ["instanceContainer", "instance"]) for (const target of graph.getObjects(subject, namedNode3(solid + predicate), null)) {
          const source = target.value.split("#")[0];
          const tree = predicate === "instanceContainer" || source.endsWith("/") ? source : source.slice(0, source.lastIndexOf("/") + 1);
          registrations.push({ cls, predicate, target: target.value, tree });
        }
      }
    }
    const trees = [...new Set(registrations.map((r) => r.tree))];
    const destinations = new Map(trees.map((tree) => [tree, root + "imported/" + encodeURIComponent(tree) + "/"]));
    const rewrite = (value) => {
      const tree = trees.find((tree2) => value.startsWith(tree2));
      return tree ? destinations.get(tree) + value.slice(tree.length) : value;
    };
    const changeTerm = (term) => term.termType === "NamedNode" ? namedNode3(rewrite(term.value)) : term;
    const visited = /* @__PURE__ */ new Set();
    async function copy(source, tree) {
      if (excludePrefix && source.startsWith(excludePrefix)) return;
      if (visited.has(source)) return;
      if (!source.startsWith(tree)) throw Error("Import member escaped its registered container");
      if (visited.size >= 1e4) throw Error("Import exceeds 10000 resources; source remains unchanged");
      visited.add(source);
      const destination = rewrite(source);
      const response = await fetcher(source, { headers: { Accept: "text/turtle, */*;q=0.5" } });
      if (!response.ok) throw Error("Could not import " + source + " (HTTP " + response.status + ")");
      if (source.endsWith("/")) {
        const graph = new N3Store(new N3Parser({ baseIRI: source }).parse(await response.text()));
        if (!await store.get(destination)) {
          const metadata = graph.getQuads(null, null, null, null).filter((q) => q.predicate.value !== contains);
          const triples = (await turtle(metadata.map((q) => quad3(changeTerm(q.subject), q.predicate, changeTerm(q.object), q.graph)))).split("\n").filter(Boolean);
          await store.set(destination, { kind: "container", triples, etag: '"' + crypto.randomUUID() + '"' });
        }
        for (const member of graph.getObjects(namedNode3(source), namedNode3(contains), null)) await copy(member.value, tree);
        return;
      }
      if (await store.get(destination)) return;
      const type = response.headers.get("content-type") || "application/octet-stream";
      let body;
      if (type.includes("text/turtle") || type.includes("application/n-triples")) {
        const quads = new N3Parser({ baseIRI: source }).parse(await response.text());
        body = await turtle(quads.map((q) => quad3(changeTerm(q.subject), q.predicate, changeTerm(q.object), q.graph)));
      } else body = await response.arrayBuffer();
      const result = await fetch(destination, { method: "PUT", headers: { "Content-Type": type }, body });
      if (!result.ok) throw Error("Could not store imported resource " + destination);
    }
    for (const tree of trees) await copy(tree, tree);
    if (registrations.length) {
      const index = root + "settings/privateTypeIndex";
      const triples = registrations.map((r, i) => `<#import-${i}> a <${solid}TypeRegistration>; <${solid}forClass> <${r.cls}>; <${solid + r.predicate}> <${rewrite(r.target)}>.`).join("\n");
      await fetch(index, { method: "PATCH", headers: { "Content-Type": "application/sparql-update" }, body: "INSERT DATA { " + triples + " }" });
      await fetch(root + "profile/card", { method: "PATCH", headers: { "Content-Type": "application/sparql-update" }, body: `INSERT DATA { <#me> <${solid}privateTypeIndex> <${index}>. }` });
    }
    return { registrations: registrations.length, resources: visited.size };
  }

  // src/resource-store.js
  function createResourceStore(client, scope) {
    client.declareType("rdf-resource", {
      type: "object",
      required: ["url", "resource"],
      properties: { url: { type: "string" }, resource: {
        type: "object",
        required: ["kind", "etag"],
        properties: { kind: { enum: ["container", "rdf", "file"] }, etag: { type: "string" } }
      } }
    });
    const legacyPath = (url) => "_rs/resources/" + encodeURIComponent(url);
    const compactPath = async (url) => {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(url));
      return "_rs/resources/url-" + [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    };
    const locate = async (url) => {
      const compact = await compactPath(url);
      const current = await client.getObject(compact);
      const legacy = legacyPath(url);
      const listing = await client.getListing("_rs/resources/") || {};
      const old = Object.prototype.hasOwnProperty.call(listing, legacy.slice("_rs/resources/".length)) ? await client.getObject(legacy) : void 0;
      for (const record of [current, old]) if (record && record.url !== url) throw Error("Resource identity does not match its storage key");
      if (current && old && JSON.stringify(current) !== JSON.stringify(old)) throw Error("Conflicting resource copies need attention");
      return { path: old ? legacy : compact, record: old || current, duplicate: current && old ? compact : void 0 };
    };
    let queue = Promise.resolve();
    return {
      async get(url) {
        const { record } = await locate(url);
        if (!record) return void 0;
        const resource = { ...record.resource };
        if (!["container", "rdf", "file"].includes(resource.kind) || typeof resource.etag !== "string") throw Error("Invalid module resource record");
        if (resource.kind === "rdf" || resource.kind === "container" && resource.triples !== void 0) {
          if (!Array.isArray(resource.triples) || resource.triples.some((line) => typeof line !== "string")) throw Error("Invalid stored RDF statements");
          new N3Parser({ baseIRI: url }).parse(resource.triples.join("\n"));
        }
        if (resource.kind === "file") resource.bytes = Uint8Array.from(atob(resource.base64), (c) => c.charCodeAt(0));
        delete resource.base64;
        return resource;
      },
      async set(url, value) {
        const resource = { ...value };
        if (resource.kind === "file") {
          let text = "";
          for (let i = 0; i < resource.bytes.length; i += 8192) text += String.fromCharCode(...resource.bytes.slice(i, i + 8192));
          resource.base64 = btoa(text);
          delete resource.bytes;
        }
        const existing = await locate(url);
        if (existing.duplicate) throw Error("Duplicate resource copies must be reconciled before editing");
        await client.storeObject("rdf-resource", existing.path, { ...existing.record, url, resource });
      },
      async delete(url) {
        const existing = await locate(url);
        await client.remove(existing.path);
        if (existing.duplicate) await client.remove(existing.duplicate);
      },
      async urls() {
        const urls = [];
        for (const name of Object.keys(await client.getListing("_rs/resources/") || {}).filter((name2) => !name2.endsWith("/"))) {
          if (/^url-[0-9a-f]{64}$/.test(name)) {
            const record = await client.getObject("_rs/resources/" + name);
            if (!record || typeof record.url !== "string" || await compactPath(record.url) !== "_rs/resources/" + name) throw Error("Invalid compact resource identity");
            urls.push(record.url);
          } else urls.push(decodeURIComponent(name));
        }
        return [...new Set(urls)];
      },
      async clear() {
        for (const url of await this.urls()) await this.delete(url);
      },
      exclusive(work) {
        const run = queue.then(() => globalThis.navigator?.locks ? navigator.locks.request("rs-data-module:" + scope, work) : work());
        queue = run.catch(() => void 0);
        return run;
      }
    };
  }

  // src/rdf-lines.js
  var TripleLines = class extends Set {
  };
  async function triplesOf(url, turtle2) {
    const quads = new N3Parser({ baseIRI: url }).parse(turtle2);
    const writer = new N3Writer({ format: "N-Triples" });
    writer.addQuads(quads);
    const output = await new Promise((resolve, reject) => writer.end((error, text) => error ? reject(error) : resolve(text)));
    return new TripleLines(output.split("\n").filter(Boolean));
  }

  // src/expanded-jsonld.js
  function expandedJsonLd(turtle2, baseIRI) {
    var _a;
    const nodes2 = /* @__PURE__ */ new Map();
    const id = (term) => term.termType === "BlankNode" ? "_:" + term.value : term.value;
    for (const quad4 of new N3Parser({ baseIRI }).parse(turtle2)) {
      const subject = id(quad4.subject);
      if (!nodes2.has(subject)) nodes2.set(subject, { "@id": subject });
      const node = nodes2.get(subject);
      if (quad4.predicate.value === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && quad4.object.termType === "NamedNode") {
        (node["@type"] || (node["@type"] = [])).push(quad4.object.value);
        continue;
      }
      const object = quad4.object;
      const value = object.termType === "Literal" ? { "@value": object.value, ...object.language ? { "@language": object.language } : { "@type": object.datatype.value } } : { "@id": id(object) };
      (node[_a = quad4.predicate.value] || (node[_a] = [])).push(value);
    }
    return [...nodes2.values()];
  }

  // src/resource-pod.ts
  var LDP = "http://www.w3.org/ns/ldp#";
  var PIM_STORAGE = "http://www.w3.org/ns/pim/space#Storage";
  var RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
  function createLocalPod({ root, store, newEtag }) {
    return async (input, init) => {
      const url = withoutFragment(String(input instanceof Request ? input.url : input));
      let method = (init?.method ?? "GET").toUpperCase();
      let headers = new Headers(init?.headers);
      let body = init?.body ?? null;
      if (!url.startsWith(root)) return answer(url, 404);
      if (input instanceof Request) {
        const request = new Request(input, init);
        method = request.method;
        headers = request.headers;
        const type = (headers.get("Content-Type") || "").toLowerCase();
        body = request.body === null ? null : method === "PATCH" || type.startsWith("text/turtle") ? await request.text() : await request.arrayBuffer();
      }
      try {
        return await store.exclusive(() => handle({ url, method, headers, body }));
      } catch (cause) {
        if (cause instanceof TypeError || cause instanceof Error && cause.name === "AbortError") throw cause;
        const error = new TypeError("The module storage request failed");
        Object.defineProperty(error, "cause", { value: cause });
        throw error;
      }
    };
    async function handle(request) {
      const { url, method, headers } = request;
      const current = await store.get(url);
      if (method === "GET" || method === "HEAD") return read(url, method, headers, current);
      if (method === "POST") {
        if (!url.endsWith("/") || current?.kind !== "container") return answer(url, 409);
        const container = /<http:\/\/www\.w3\.org\/ns\/ldp#(?:Basic)?Container>/.test(headers.get("Link") || "");
        const slug = encodeURIComponent(headers.get("Slug") || crypto.randomUUID());
        const target = url + slug + (container ? "/" : "");
        const result = await handle({ ...request, url: target, method: "PUT" });
        return result.ok ? answer(target, 201, null, { Location: target }) : result;
      }
      if (method !== "PUT" && method !== "PATCH" && method !== "DELETE") return answer(url, 405);
      const ifMatch = headers.get("If-Match");
      if (ifMatch !== null && ifMatch !== current?.etag) return answer(url, 412);
      if (headers.get("If-None-Match") === "*" && current !== void 0) return answer(url, 412);
      if (method === "DELETE") return remove(url, current);
      if (url.endsWith("/")) {
        if (method === "PATCH") {
          if (!current || current.kind !== "container" || typeof request.body !== "string") return answer(url, 409);
          const triples2 = await patched(url, current.triples ?? [], request.body);
          if (!triples2) return answer(url, 400);
          await store.set(url, { ...current, triples: triples2, etag: newEtag() });
          return answer(url, 205);
        }
        if (method !== "PUT" || current !== void 0) return answer(url, 409);
        const triples = typeof request.body === "string" ? await parsed(url, request.body) : [];
        if (!triples) return answer(url, 400);
        await create(url, { kind: "container", etag: newEtag(), triples: [...triples] });
        return answer(url, 201);
      }
      const next = await written(request, current);
      if (next instanceof Response) return next;
      if (current === void 0) {
        await create(url, next);
        return answer(url, 201);
      }
      await store.set(url, next);
      return answer(url, 205);
    }
    async function read(url, method, headers, current) {
      if (current === void 0) return answer(url, 404);
      if (headers.get("If-None-Match") === current.etag)
        return answer(url, 304, null, { ETag: current.etag });
      let { body, contentType } = await representationOf(url, current);
      if (current.kind !== "file" && headers.get("Accept")?.includes("application/ld+json")) {
        body = JSON.stringify(expandedJsonLd(String(body), url));
        contentType = "application/ld+json";
      }
      return answer(url, 200, method === "HEAD" ? null : body, {
        "Content-Type": contentType,
        ETag: current.etag,
        Link: linksOf(url, current),
        "Accept-Patch": "application/sparql-update, text/n3",
        "WAC-Allow": 'user="read write append"',
        "MS-Author-Via": "SPARQL"
      });
    }
    async function remove(url, current) {
      if (current === void 0) return answer(url, 404);
      if (url === root) return answer(url, 405);
      if (current.kind === "container" && (await childrenOf(url)).length > 0) return answer(url, 409);
      await store.delete(url);
      await touch(parentOf(url));
      return answer(url, 205);
    }
    async function written(request, current) {
      const { url, method, headers } = request;
      const contentType = headers.get("Content-Type") ?? "";
      const mediaType = contentType.split(";")[0].trim().toLowerCase();
      const text = typeof request.body === "string" ? request.body : null;
      if (method === "PATCH") {
        if (mediaType !== "application/sparql-update" && mediaType !== "text/n3" || text === null)
          return answer(url, 415);
        if (current !== void 0 && current.kind !== "rdf") return answer(url, 409);
        const triples = mediaType === "text/n3" ? await n3Patched(url, current?.triples ?? [], text) : await patched(url, current?.triples ?? [], text);
        if (triples === null) return answer(url, 400);
        return { kind: "rdf", etag: newEtag(), triples };
      }
      if (mediaType === "text/turtle") {
        const triples = await parsed(url, text ?? "");
        if (triples === null) return answer(url, 400);
        return { kind: "rdf", etag: newEtag(), triples: [...triples] };
      }
      return { kind: "file", etag: newEtag(), contentType, bytes: await bytesOf(request.body) };
    }
    async function create(url, resource) {
      const parent = url === root ? null : parentOf(url);
      if (parent !== null) {
        if (await store.get(parent) === void 0)
          await create(parent, { kind: "container", etag: newEtag() });
        else await touch(parent);
      }
      await store.set(url, resource);
    }
    async function touch(container) {
      await store.set(container, { ...await store.get(container), etag: newEtag() });
    }
    async function childrenOf(container) {
      return (await store.urls()).filter((candidate) => parentOf(candidate) === container).sort();
    }
    async function representationOf(url, resource) {
      if (resource.kind === "file")
        return { body: resource.bytes, contentType: resource.contentType };
      if (resource.kind === "rdf")
        return { body: resource.triples.join("\n"), contentType: "text/turtle" };
      const lines = [
        ...resource.triples ?? [],
        `<${url}> <${RDF_TYPE}> <${LDP}Container> .`,
        `<${url}> <${RDF_TYPE}> <${LDP}BasicContainer> .`,
        ...(await childrenOf(url)).flatMap((child) => [
          `<${url}> <${LDP}contains> <${child}> .`,
          ...child.endsWith("/") ? [`<${child}> <${RDF_TYPE}> <${LDP}Container> .`, `<${child}> <${RDF_TYPE}> <${LDP}BasicContainer> .`] : []
        ])
      ];
      return { body: lines.join("\n"), contentType: "text/turtle" };
    }
    function linksOf(url, resource) {
      const types = [`${LDP}Resource`];
      if (resource.kind === "container") types.push(`${LDP}Container`, `${LDP}BasicContainer`);
      if (url === root) types.push(PIM_STORAGE);
      return types.map((type) => `<${type}>; rel="type"`).concat(resource.kind === "container" ? [`<${url}>; rel="describedBy"`] : []).join(", ");
    }
  }
  async function parsed(url, turtle2) {
    try {
      return await triplesOf(url, turtle2);
    } catch {
      return null;
    }
  }
  async function patched(url, triples, update) {
    const blocks = dataBlocks(update);
    if (blocks === null) return null;
    const result = new TripleLines(triples);
    for (const { operation, data } of blocks) {
      const changed = await parsed(url, data);
      if (changed === null) return null;
      for (const triple of changed) {
        if (operation === "INSERT") result.add(triple);
        else result.delete(triple);
      }
    }
    return [...result];
  }
  async function n3Patched(url, triples, update) {
    try {
      const quads = new N3Parser({ baseIRI: url, format: "N3" }).parse(update);
      const solid2 = "http://www.w3.org/ns/solid/terms#";
      const root = quads.filter((q) => q.graph.termType === "DefaultGraph");
      const patches = root.filter((q) => q.predicate.value === RDF_TYPE && q.object.value === solid2 + "InsertDeletePatch");
      if (patches.length !== 1 || root.some((q) => ![RDF_TYPE, solid2 + "inserts", solid2 + "deletes"].includes(q.predicate.value))) return null;
      const result = new TripleLines(triples);
      for (const link of root.filter((q) => q.predicate.value === solid2 + "deletes" || q.predicate.value === solid2 + "inserts")) {
        const contents = quads.filter((q) => q.graph.equals(link.object));
        if (contents.some((q) => [q.subject, q.predicate, q.object].some((t) => t.termType === "Variable" || t.termType === "BlankNode"))) return null;
        const writer = new N3Writer({ format: "N-Triples" });
        writer.addQuads(contents.map((q) => N3DataFactory_default.quad(q.subject, q.predicate, q.object)));
        const text = await new Promise((resolve, reject) => writer.end((error, text2) => error ? reject(error) : resolve(text2)));
        for (const line of text.split("\n").filter(Boolean)) {
          if (link.predicate.value === solid2 + "deletes") result.delete(line);
          else result.add(line);
        }
      }
      return [...result];
    } catch {
      return null;
    }
  }
  function dataBlocks(update) {
    const blocks = [];
    let at = 0;
    for (; ; ) {
      while (at < update.length && /[\s;]/.test(update[at])) at++;
      if (at === update.length) return blocks;
      const opening = /^(INSERT|DELETE)\s+DATA\s*\{/i.exec(update.slice(at));
      if (opening === null) return null;
      const start = at + opening[0].length;
      const end = blockEnd(update, start);
      if (end === null) return null;
      blocks.push({
        operation: opening[1].toUpperCase(),
        data: update.slice(start, end)
      });
      at = end + 1;
    }
  }
  function blockEnd(update, from) {
    let quote = null;
    for (let at = from; at < update.length; at++) {
      const c = update[at];
      if (quote !== null) {
        if (c === "\\") at++;
        else if (update.startsWith(quote, at)) {
          at += quote.length - 1;
          quote = null;
        }
      } else if (c === "<") {
        at = update.indexOf(">", at);
        if (at === -1) return null;
      } else if (c === '"' || c === "'") {
        quote = update.startsWith(c.repeat(3), at) ? c.repeat(3) : c;
        at += quote.length - 1;
      } else if (c === "#") {
        const end = update.indexOf("\n", at);
        at = end === -1 ? update.length : end;
      } else if (c === "}") return at;
    }
    return null;
  }
  function parentOf(url) {
    const path = new URL(url).pathname;
    if (path === "/") return null;
    const trimmed = url.endsWith("/") ? url.slice(0, -1) : url;
    return trimmed.slice(0, trimmed.lastIndexOf("/") + 1);
  }
  function withoutFragment(url) {
    const hash = url.indexOf("#");
    return hash === -1 ? url : url.slice(0, hash);
  }
  async function bytesOf(body) {
    return new Uint8Array(await new Response(body).arrayBuffer());
  }
  function answer(url, status, body = null, headers = {}) {
    const response = new Response(status === 304 || status === 204 || status === 205 ? null : body, {
      status,
      headers: { "Accept-Patch": "application/sparql-update, text/n3", "WAC-Allow": 'user="read write append"', "MS-Author-Via": "SPARQL", ...headers }
    });
    Object.defineProperty(response, "url", { value: url });
    return response;
  }

  // src/recipes.js
  var { namedNode: namedNode4 } = N3DataFactory_default;
  var schema = "https://schema.org/";
  var rdfType = namedNode4("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
  function values(graph, subject, field) {
    return graph.getObjects(subject, namedNode4(schema + field), null);
  }
  function literals(graph, subject, field) {
    return values(graph, subject, field).filter((term) => term.termType === "Literal").map((term) => term.value);
  }
  function parseRecipes(turtle2, documentUrl) {
    const graph = new N3Store(new N3Parser({ baseIRI: documentUrl }).parse(turtle2));
    return graph.getSubjects(rdfType, namedNode4(schema + "Recipe"), null).map((subject) => {
      const [title] = literals(graph, subject, "name");
      if (!title?.trim()) {
        throw new Error(`Recipe ${subject.value} has no title`);
      }
      const instructions = values(graph, subject, "recipeInstructions").flatMap((term) => {
        if (term.termType === "Literal") return [{ text: term.value }];
        const [text] = literals(graph, term, "text");
        const [position] = literals(graph, term, "position");
        return text === void 0 ? [] : [{
          text,
          position: /^[0-9]+$/.test(position ?? "") ? Number(position) : void 0
        }];
      }).sort((left, right) => (left.position ?? Infinity) - (right.position ?? Infinity)).map((step) => step.text);
      const recipe = {
        title,
        ingredients: literals(graph, subject, "recipeIngredient"),
        instructions
      };
      for (const [property, field] of [
        ["yield", "recipeYield"],
        ["prepTime", "prepTime"],
        ["cookTime", "cookTime"],
        ["totalTime", "totalTime"]
      ]) {
        const [value] = literals(graph, subject, field);
        if (value !== void 0) recipe[property] = value;
      }
      return { source: subject.termType === "NamedNode" ? subject.value : void 0, recipe };
    });
  }

  // src/movies-jsonld.ts
  function getJsonLdFields(entry, pred, subPred) {
    if (Array.isArray(entry[pred])) {
      return entry[pred].map((obj) => obj[subPred]);
    }
    return [];
  }
  function getJsonLdField(entry, pred, subPred) {
    const results = getJsonLdFields(entry, pred, subPred);
    if (results.length === 1) {
      return results[0];
    }
    return void 0;
  }
  function getJsonLdLinkField(entry, pred) {
    return getJsonLdField(entry, pred, "@id");
  }
  function getJsonLdStringField(entry, pred) {
    return getJsonLdField(entry, pred, "@value");
  }
  function getJsonLdLinkOrStringField(entry, pred) {
    let ret = getJsonLdLinkField(entry, pred);
    if (typeof ret === "undefined") {
      ret = getJsonLdStringField(entry, pred);
    }
    return ret;
  }
  function getJsonLdDateField(entry, pred) {
    const typeStr = getJsonLdField(entry, pred, "@type");
    if (typeStr === "http://www.w3.org/2001/XMLSchema#dateTime") {
      const valueStr = getJsonLdStringField(entry, pred);
      if (typeof valueStr === "string") {
        return new Date(valueStr);
      }
    }
    return void 0;
  }

  // src/movies.ts
  var schema2 = "https://schema.org/";
  function nodes(value) {
    const graph = !Array.isArray(value) && value && typeof value === "object" ? value["@graph"] : value;
    if (!Array.isArray(graph) || graph.some((node) => !node || typeof node !== "object" || Array.isArray(node))) {
      throw new TypeError("Expected expanded JSON-LD nodes or an @graph wrapper");
    }
    return graph;
  }
  function values2(node, predicate) {
    return Array.isArray(node[predicate]) ? node[predicate].filter((value) => value && typeof value === "object") : [];
  }
  function links(node, predicate) {
    return values2(node, predicate).map((value) => value["@id"] ?? value["@value"]).filter((value) => typeof value === "string");
  }
  function parseMovies(value) {
    const result = { listings: [], watchActions: [] };
    for (const thing of nodes(value)) {
      const types = Array.isArray(thing["@type"]) ? thing["@type"] : [];
      const id = typeof thing["@id"] === "string" ? thing["@id"] : void 0;
      if (types.includes(schema2 + "Movie")) {
        result.listings.push({
          id,
          created: getJsonLdDateField(thing, "http://purl.org/dc/terms/created"),
          modified: getJsonLdDateField(thing, "http://purl.org/dc/terms/modified"),
          movie: {
            published: getJsonLdDateField(thing, schema2 + "datePublished"),
            description: getJsonLdStringField(thing, schema2 + "description"),
            image: getJsonLdLinkOrStringField(thing, schema2 + "image"),
            name: getJsonLdStringField(thing, schema2 + "name"),
            sameAs: links(thing, schema2 + "sameAs")
          }
        });
      }
      if (types.includes(schema2 + "WatchAction")) {
        result.watchActions.push({
          id,
          created: getJsonLdDateField(thing, "http://purl.org/dc/terms/created"),
          startTime: getJsonLdDateField(thing, schema2 + "startTime"),
          endTime: getJsonLdDateField(thing, schema2 + "endTime"),
          listingId: getJsonLdLinkOrStringField(thing, schema2 + "object")
        });
      }
    }
    return result;
  }

  // node_modules/ical.js/dist/ical.js
  var Binary = class _Binary {
    /**
     * Creates a new ICAL.Binary instance
     *
     * @param {String} aValue     The binary data for this value
     */
    constructor(aValue) {
      /**
       * The type name, to be used in the jCal object.
       * @default "binary"
       * @constant
       */
      __publicField(this, "icaltype", "binary");
      this.value = aValue;
    }
    /**
     * Creates a binary value from the given string.
     *
     * @param {String} aString        The binary value string
     * @return {Binary}               The binary value instance
     */
    static fromString(aString) {
      return new _Binary(aString);
    }
    /**
     * Base64 decode the current value
     *
     * @return {String}         The base64-decoded value
     */
    decodeValue() {
      return this._b64_decode(this.value);
    }
    /**
     * Encodes the passed parameter with base64 and sets the internal
     * value to the result.
     *
     * @param {String} aValue      The raw binary value to encode
     */
    setEncodedValue(aValue) {
      this.value = this._b64_encode(aValue);
    }
    _b64_encode(data) {
      let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
      if (!data) {
        return data;
      }
      do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 63;
        h2 = bits >> 12 & 63;
        h3 = bits >> 6 & 63;
        h4 = bits & 63;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);
      enc = tmp_arr.join("");
      let r = data.length % 3;
      return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    }
    _b64_decode(data) {
      let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
      if (!data) {
        return data;
      }
      data += "";
      do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 255;
        o2 = bits >> 8 & 255;
        o3 = bits & 255;
        if (h3 == 64) {
          tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
          tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
          tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
      } while (i < data.length);
      dec = tmp_arr.join("");
      return dec;
    }
    /**
     * The string representation of this value
     * @return {String}
     */
    toString() {
      return this.value;
    }
  };
  var DURATION_LETTERS = /([PDWHMTS]{1,1})/;
  var DATA_PROPS_TO_COPY = ["weeks", "days", "hours", "minutes", "seconds", "isNegative"];
  var Duration = class _Duration {
    /**
     * Creates a new ICAL.Duration instance.
     *
     * @param {Object} data                 An object with members of the duration
     * @param {Number=} data.weeks          Duration in weeks
     * @param {Number=} data.days           Duration in days
     * @param {Number=} data.hours          Duration in hours
     * @param {Number=} data.minutes        Duration in minutes
     * @param {Number=} data.seconds        Duration in seconds
     * @param {Boolean=} data.isNegative    If true, the duration is negative
     */
    constructor(data) {
      /**
       * The weeks in this duration
       * @type {Number}
       * @default 0
       */
      __publicField(this, "weeks", 0);
      /**
       * The days in this duration
       * @type {Number}
       * @default 0
       */
      __publicField(this, "days", 0);
      /**
       * The days in this duration
       * @type {Number}
       * @default 0
       */
      __publicField(this, "hours", 0);
      /**
       * The minutes in this duration
       * @type {Number}
       * @default 0
       */
      __publicField(this, "minutes", 0);
      /**
       * The seconds in this duration
       * @type {Number}
       * @default 0
       */
      __publicField(this, "seconds", 0);
      /**
       * The seconds in this duration
       * @type {Boolean}
       * @default false
       */
      __publicField(this, "isNegative", false);
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "icalduration"
       */
      __publicField(this, "icalclass", "icalduration");
      /**
       * The type name, to be used in the jCal object.
       * @constant
       * @type {String}
       * @default "duration"
       */
      __publicField(this, "icaltype", "duration");
      this.wrappedJSObject = this;
      this.fromData(data);
    }
    /**
     * Returns a new ICAL.Duration instance from the passed seconds value.
     *
     * @param {Number} aSeconds       The seconds to create the instance from
     * @return {Duration}             The newly created duration instance
     */
    static fromSeconds(aSeconds) {
      return new _Duration().fromSeconds(aSeconds);
    }
    /**
     * Checks if the given string is an iCalendar duration value.
     *
     * @param {String} value      The raw ical value
     * @return {Boolean}          True, if the given value is of the
     *                              duration ical type
     */
    static isValueString(string) {
      return string[0] === "P" || string[1] === "P";
    }
    /**
     * Creates a new {@link ICAL.Duration} instance from the passed string.
     *
     * @param {String} aStr       The string to parse
     * @return {Duration}         The created duration instance
     */
    static fromString(aStr) {
      let pos = 0;
      let dict = /* @__PURE__ */ Object.create(null);
      let chunks = 0;
      while ((pos = aStr.search(DURATION_LETTERS)) !== -1) {
        let type = aStr[pos];
        let numeric = aStr.slice(0, Math.max(0, pos));
        aStr = aStr.slice(pos + 1);
        chunks += parseDurationChunk(type, numeric, dict);
      }
      if (chunks < 2) {
        throw new Error(
          'invalid duration value: Not enough duration components in "' + aStr + '"'
        );
      }
      return new _Duration(dict);
    }
    /**
     * Creates a new ICAL.Duration instance from the given data object.
     *
     * @param {Object} aData                An object with members of the duration
     * @param {Number=} aData.weeks         Duration in weeks
     * @param {Number=} aData.days          Duration in days
     * @param {Number=} aData.hours         Duration in hours
     * @param {Number=} aData.minutes       Duration in minutes
     * @param {Number=} aData.seconds       Duration in seconds
     * @param {Boolean=} aData.isNegative   If true, the duration is negative
     * @return {Duration}                   The createad duration instance
     */
    static fromData(aData) {
      return new _Duration(aData);
    }
    /**
     * Returns a clone of the duration object.
     *
     * @return {Duration}      The cloned object
     */
    clone() {
      return _Duration.fromData(this);
    }
    /**
     * The duration value expressed as a number of seconds.
     *
     * @return {Number}             The duration value in seconds
     */
    toSeconds() {
      let seconds = this.seconds + 60 * this.minutes + 3600 * this.hours + 86400 * this.days + 7 * 86400 * this.weeks;
      return this.isNegative ? -seconds : seconds;
    }
    /**
     * Reads the passed seconds value into this duration object. Afterwards,
     * members like {@link ICAL.Duration#days days} and {@link ICAL.Duration#weeks weeks} will be set up
     * accordingly.
     *
     * @param {Number} aSeconds     The duration value in seconds
     * @return {Duration}           Returns this instance
     */
    fromSeconds(aSeconds) {
      let secs = Math.abs(aSeconds);
      this.isNegative = aSeconds < 0;
      this.days = trunc(secs / 86400);
      if (this.days % 7 == 0) {
        this.weeks = this.days / 7;
        this.days = 0;
      } else {
        this.weeks = 0;
      }
      secs -= (this.days + 7 * this.weeks) * 86400;
      this.hours = trunc(secs / 3600);
      secs -= this.hours * 3600;
      this.minutes = trunc(secs / 60);
      secs -= this.minutes * 60;
      this.seconds = secs;
      return this;
    }
    /**
     * Sets up the current instance using members from the passed data object.
     *
     * @param {Object} aData                An object with members of the duration
     * @param {Number=} aData.weeks         Duration in weeks
     * @param {Number=} aData.days          Duration in days
     * @param {Number=} aData.hours         Duration in hours
     * @param {Number=} aData.minutes       Duration in minutes
     * @param {Number=} aData.seconds       Duration in seconds
     * @param {Boolean=} aData.isNegative   If true, the duration is negative
     */
    fromData(aData) {
      for (let prop2 of DATA_PROPS_TO_COPY) {
        if (aData && prop2 in aData) {
          this[prop2] = aData[prop2];
        } else {
          this[prop2] = 0;
        }
      }
    }
    /**
     * Resets the duration instance to the default values, i.e. PT0S
     */
    reset() {
      this.isNegative = false;
      this.weeks = 0;
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
    /**
     * Compares the duration instance with another one.
     *
     * @param {Duration} aOther             The instance to compare with
     * @return {Number}                     -1, 0 or 1 for less/equal/greater
     */
    compare(aOther) {
      let thisSeconds = this.toSeconds();
      let otherSeconds = aOther.toSeconds();
      return (thisSeconds > otherSeconds) - (thisSeconds < otherSeconds);
    }
    /**
     * Normalizes the duration instance. For example, a duration with a value
     * of 61 seconds will be normalized to 1 minute and 1 second.
     */
    normalize() {
      this.fromSeconds(this.toSeconds());
    }
    /**
     * The string representation of this duration.
     * @return {String}
     */
    toString() {
      if (this.toSeconds() == 0) {
        return "PT0S";
      } else {
        let str = "";
        if (this.isNegative) str += "-";
        str += "P";
        let hasWeeks = false;
        if (this.weeks) {
          if (this.days || this.hours || this.minutes || this.seconds) {
            str += this.weeks * 7 + this.days + "D";
          } else {
            str += this.weeks + "W";
            hasWeeks = true;
          }
        } else if (this.days) {
          str += this.days + "D";
        }
        if (!hasWeeks) {
          if (this.hours || this.minutes || this.seconds) {
            str += "T";
            if (this.hours) {
              str += this.hours + "H";
            }
            if (this.minutes) {
              str += this.minutes + "M";
            }
            if (this.seconds) {
              str += this.seconds + "S";
            }
          }
        }
        return str;
      }
    }
    /**
     * The iCalendar string representation of this duration.
     * @return {String}
     */
    toICALString() {
      return this.toString();
    }
  };
  function parseDurationChunk(letter, number, object) {
    let type;
    switch (letter) {
      case "P":
        if (number && number === "-") {
          object.isNegative = true;
        } else {
          object.isNegative = false;
        }
        break;
      case "D":
        type = "days";
        break;
      case "W":
        type = "weeks";
        break;
      case "H":
        type = "hours";
        break;
      case "M":
        type = "minutes";
        break;
      case "S":
        type = "seconds";
        break;
      default:
        return 0;
    }
    if (type) {
      if (!number && number !== 0) {
        throw new Error(
          'invalid duration value: Missing number before "' + letter + '"'
        );
      }
      let num = parseInt(number, 10);
      if (isStrictlyNaN(num)) {
        throw new Error(
          'invalid duration value: Invalid number "' + number + '" before "' + letter + '"'
        );
      }
      object[type] = num;
    }
    return 1;
  }
  var Period = class _Period {
    /**
     * Creates a new ICAL.Period instance. The passed data object cannot contain both and end date and
     * a duration.
     *
     * @param {Object} aData                  An object with members of the period
     * @param {Time=} aData.start             The start of the period
     * @param {Time=} aData.end               The end of the period
     * @param {Duration=} aData.duration      The duration of the period
     */
    constructor(aData) {
      /**
       * The start of the period
       * @type {Time}
       */
      __publicField(this, "start", null);
      /**
       * The end of the period
       * @type {Time}
       */
      __publicField(this, "end", null);
      /**
       * The duration of the period
       * @type {Duration}
       */
      __publicField(this, "duration", null);
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "icalperiod"
       */
      __publicField(this, "icalclass", "icalperiod");
      /**
       * The type name, to be used in the jCal object.
       * @constant
       * @type {String}
       * @default "period"
       */
      __publicField(this, "icaltype", "period");
      this.wrappedJSObject = this;
      if (aData && "start" in aData) {
        if (aData.start && !(aData.start instanceof Time)) {
          throw new TypeError(".start must be an instance of ICAL.Time");
        }
        this.start = aData.start;
      }
      if (aData && aData.end && aData.duration) {
        throw new Error("cannot accept both end and duration");
      }
      if (aData && "end" in aData) {
        if (aData.end && !(aData.end instanceof Time)) {
          throw new TypeError(".end must be an instance of ICAL.Time");
        }
        this.end = aData.end;
      }
      if (aData && "duration" in aData) {
        if (aData.duration && !(aData.duration instanceof Duration)) {
          throw new TypeError(".duration must be an instance of ICAL.Duration");
        }
        this.duration = aData.duration;
      }
    }
    /**
     * Creates a new {@link ICAL.Period} instance from the passed string.
     *
     * @param {String} str            The string to parse
     * @param {Property} prop         The property this period will be on
     * @return {Period}               The created period instance
     */
    static fromString(str, prop2) {
      let parts = str.split("/");
      if (parts.length !== 2) {
        throw new Error(
          'Invalid string value: "' + str + '" must contain a "/" char.'
        );
      }
      let options = {
        start: Time.fromDateTimeString(parts[0], prop2)
      };
      let end = parts[1];
      if (Duration.isValueString(end)) {
        options.duration = Duration.fromString(end);
      } else {
        options.end = Time.fromDateTimeString(end, prop2);
      }
      return new _Period(options);
    }
    /**
     * Creates a new {@link ICAL.Period} instance from the given data object.
     * The passed data object cannot contain both and end date and a duration.
     *
     * @param {Object} aData                  An object with members of the period
     * @param {Time=} aData.start             The start of the period
     * @param {Time=} aData.end               The end of the period
     * @param {Duration=} aData.duration      The duration of the period
     * @return {Period}                       The period instance
     */
    static fromData(aData) {
      return new _Period(aData);
    }
    /**
     * Returns a new period instance from the given jCal data array. The first
     * member is always the start date string, the second member is either a
     * duration or end date string.
     *
     * @param {jCalComponent} aData           The jCal data array
     * @param {Property} aProp                The property this jCal data is on
     * @param {Boolean} aLenient              If true, data value can be both date and date-time
     * @return {Period}                       The period instance
     */
    static fromJSON(aData, aProp, aLenient) {
      function fromDateOrDateTimeString(aValue, dateProp) {
        if (aLenient) {
          return Time.fromString(aValue, dateProp);
        } else {
          return Time.fromDateTimeString(aValue, dateProp);
        }
      }
      if (Duration.isValueString(aData[1])) {
        return _Period.fromData({
          start: fromDateOrDateTimeString(aData[0], aProp),
          duration: Duration.fromString(aData[1])
        });
      } else {
        return _Period.fromData({
          start: fromDateOrDateTimeString(aData[0], aProp),
          end: fromDateOrDateTimeString(aData[1], aProp)
        });
      }
    }
    /**
     * Returns a clone of the duration object.
     *
     * @return {Period}      The cloned object
     */
    clone() {
      return _Period.fromData({
        start: this.start ? this.start.clone() : null,
        end: this.end ? this.end.clone() : null,
        duration: this.duration ? this.duration.clone() : null
      });
    }
    /**
     * Calculates the duration of the period, either directly or by subtracting
     * start from end date.
     *
     * @return {Duration}      The calculated duration
     */
    getDuration() {
      if (this.duration) {
        return this.duration;
      } else {
        return this.end.subtractDate(this.start);
      }
    }
    /**
     * Calculates the end date of the period, either directly or by adding
     * duration to start date.
     *
     * @return {Time}          The calculated end date
     */
    getEnd() {
      if (this.end) {
        return this.end;
      } else {
        let end = this.start.clone();
        end.addDuration(this.duration);
        return end;
      }
    }
    /**
     * Compare this period with a date or other period. To maintain the logic where a.compare(b)
     * returns 1 when a > b, this function will return 1 when the period is after the date, 0 when the
     * date is within the period, and -1 when the period is before the date. When comparing two
     * periods, as soon as they overlap in any way this will return 0.
     *
     * @param {Time|Period} dt    The date or other period to compare with
     */
    compare(dt) {
      if (dt.compare(this.start) < 0) {
        return 1;
      } else if (dt.compare(this.getEnd()) > 0) {
        return -1;
      } else {
        return 0;
      }
    }
    /**
     * The string representation of this period.
     * @return {String}
     */
    toString() {
      return this.start + "/" + (this.end || this.duration);
    }
    /**
     * The jCal representation of this period type.
     * @return {Object}
     */
    toJSON() {
      return [this.start.toString(), (this.end || this.duration).toString()];
    }
    /**
     * The iCalendar string representation of this period.
     * @return {String}
     */
    toICALString() {
      return this.start.toICALString() + "/" + (this.end || this.duration).toICALString();
    }
  };
  var _epochTime;
  var _Time = class _Time {
    // MONDAY
    /**
     * Creates a new ICAL.Time instance.
     *
     * @param {timeInit} data           Time initialization
     * @param {Timezone} zone           timezone this position occurs in
     */
    constructor(data, zone) {
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "icaltime"
       */
      __publicField(this, "icalclass", "icaltime");
      __publicField(this, "_cachedUnixTime", null);
      /**
       * The timezone for this time.
       * @type {Timezone}
       */
      __publicField(this, "zone", null);
      /**
       * Internal uses to indicate that a change has been made and the next read
       * operation must attempt to normalize the value (for example changing the
       * day to 33).
       *
       * @type {Boolean}
       * @private
       */
      __publicField(this, "_pendingNormalization", false);
      this.wrappedJSObject = this;
      this._time = /* @__PURE__ */ Object.create(null);
      this._time.year = 0;
      this._time.month = 1;
      this._time.day = 1;
      this._time.hour = 0;
      this._time.minute = 0;
      this._time.second = 0;
      this._time.isDate = false;
      this.fromData(data, zone);
    }
    /**
     * Returns the days in the given month
     *
     * @param {Number} month      The month to check
     * @param {Number} year       The year to check
     * @return {Number}           The number of days in the month
     */
    static daysInMonth(month, year) {
      let _daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let days = 30;
      if (month < 1 || month > 12) return days;
      days = _daysInMonth[month];
      if (month == 2) {
        days += _Time.isLeapYear(year);
      }
      return days;
    }
    /**
     * Checks if the year is a leap year
     *
     * @param {Number} year       The year to check
     * @return {Boolean}          True, if the year is a leap year
     */
    static isLeapYear(year) {
      if (year <= 1752) {
        return year % 4 == 0;
      } else {
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
      }
    }
    /**
     * Create a new ICAL.Time from the day of year and year. The date is returned
     * in floating timezone.
     *
     * @param {Number} aDayOfYear     The day of year
     * @param {Number} aYear          The year to create the instance in
     * @return {Time}                 The created instance with the calculated date
     */
    static fromDayOfYear(aDayOfYear, aYear) {
      let year = aYear;
      let doy = aDayOfYear;
      let tt = new _Time();
      tt.auto_normalize = false;
      let is_leap = _Time.isLeapYear(year) ? 1 : 0;
      if (doy < 1) {
        year--;
        is_leap = _Time.isLeapYear(year) ? 1 : 0;
        doy += _Time.daysInYearPassedMonth[is_leap][12];
        return _Time.fromDayOfYear(doy, year);
      } else if (doy > _Time.daysInYearPassedMonth[is_leap][12]) {
        is_leap = _Time.isLeapYear(year) ? 1 : 0;
        doy -= _Time.daysInYearPassedMonth[is_leap][12];
        year++;
        return _Time.fromDayOfYear(doy, year);
      }
      tt.year = year;
      tt.isDate = true;
      for (let month = 11; month >= 0; month--) {
        if (doy > _Time.daysInYearPassedMonth[is_leap][month]) {
          tt.month = month + 1;
          tt.day = doy - _Time.daysInYearPassedMonth[is_leap][month];
          break;
        }
      }
      tt.auto_normalize = true;
      return tt;
    }
    /**
     * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
     *
     * @deprecated                Use {@link ICAL.Time.fromDateString} instead
     * @param {String} str        The string to create from
     * @return {Time}             The date/time instance
     */
    static fromStringv2(str) {
      return new _Time({
        year: parseInt(str.slice(0, 4), 10),
        month: parseInt(str.slice(5, 7), 10),
        day: parseInt(str.slice(8, 10), 10),
        isDate: true
      });
    }
    /**
     * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
     *
     * @param {String} aValue     The string to create from
     * @return {Time}             The date/time instance
     */
    static fromDateString(aValue) {
      return new _Time({
        year: strictParseInt(aValue.slice(0, 4)),
        month: strictParseInt(aValue.slice(5, 7)),
        day: strictParseInt(aValue.slice(8, 10)),
        isDate: true
      });
    }
    /**
     * Returns a new ICAL.Time instance from a date-time string, e.g
     * 2015-01-02T03:04:05. If a property is specified, the timezone is set up
     * from the property's TZID parameter.
     *
     * @param {String} aValue         The string to create from
     * @param {Property=} prop        The property the date belongs to
     * @return {Time}                 The date/time instance
     */
    static fromDateTimeString(aValue, prop2) {
      if (aValue.length < 19) {
        throw new Error(
          'invalid date-time value: "' + aValue + '"'
        );
      }
      let zone;
      let zoneId;
      if (aValue.slice(-1) === "Z") {
        zone = Timezone.utcTimezone;
      } else if (prop2) {
        zoneId = prop2.getParameter("tzid");
        if (prop2.parent) {
          if (prop2.parent.name === "standard" || prop2.parent.name === "daylight") {
            zone = Timezone.localTimezone;
          } else if (zoneId) {
            zone = prop2.parent.getTimeZoneByID(zoneId);
          }
        }
      }
      const timeData = {
        year: strictParseInt(aValue.slice(0, 4)),
        month: strictParseInt(aValue.slice(5, 7)),
        day: strictParseInt(aValue.slice(8, 10)),
        hour: strictParseInt(aValue.slice(11, 13)),
        minute: strictParseInt(aValue.slice(14, 16)),
        second: strictParseInt(aValue.slice(17, 19))
      };
      if (zoneId && !zone) {
        timeData.timezone = zoneId;
      }
      return new _Time(timeData, zone);
    }
    /**
     * Returns a new ICAL.Time instance from a date or date-time string,
     *
     * @param {String} aValue         The string to create from
     * @param {Property=} prop        The property the date belongs to
     * @return {Time}                 The date/time instance
     */
    static fromString(aValue, aProperty) {
      if (aValue.length > 10) {
        return _Time.fromDateTimeString(aValue, aProperty);
      } else {
        return _Time.fromDateString(aValue);
      }
    }
    /**
     * Creates a new ICAL.Time instance from the given Javascript Date.
     *
     * @param {?Date} aDate             The Javascript Date to read, or null to reset
     * @param {Boolean} [useUTC=false]  If true, the UTC values of the date will be used
     */
    static fromJSDate(aDate, useUTC) {
      let tt = new _Time();
      return tt.fromJSDate(aDate, useUTC);
    }
    /**
     * Creates a new ICAL.Time instance from the current moment.
     * The instance is “floating” - has no timezone relation.
     * To create an instance considering the time zone, call
     * ICAL.Time.fromJSDate(new Date(), true)
     * @return {Time}
     */
    static now() {
      return _Time.fromJSDate(/* @__PURE__ */ new Date(), false);
    }
    /**
     * Returns the date on which ISO week number 1 starts.
     *
     * @see Time#weekNumber
     * @param {Number} aYear                  The year to search in
     * @param {weekDay=} aWeekStart           The week start weekday, used for calculation.
     * @return {Time}                         The date on which week number 1 starts
     */
    static weekOneStarts(aYear, aWeekStart) {
      let t = _Time.fromData({
        year: aYear,
        month: 1,
        day: 1,
        isDate: true
      });
      let dow = t.dayOfWeek();
      let wkst = aWeekStart || _Time.DEFAULT_WEEK_START;
      if (dow > _Time.THURSDAY) {
        t.day += 7;
      }
      if (wkst > _Time.THURSDAY) {
        t.day -= 7;
      }
      t.day -= dow - wkst;
      return t;
    }
    /**
     * Get the dominical letter for the given year. Letters range from A - G for
     * common years, and AG to GF for leap years.
     *
     * @param {Number} yr           The year to retrieve the letter for
     * @return {String}             The dominical letter.
     */
    static getDominicalLetter(yr) {
      let LTRS = "GFEDCBA";
      let dom = (yr + (yr / 4 | 0) + (yr / 400 | 0) - (yr / 100 | 0) - 1) % 7;
      let isLeap = _Time.isLeapYear(yr);
      if (isLeap) {
        return LTRS[(dom + 6) % 7] + LTRS[dom];
      } else {
        return LTRS[dom];
      }
    }
    /**
     * January 1st, 1970 as an ICAL.Time.
     * @type {Time}
     * @constant
     * @instance
     */
    static get epochTime() {
      if (!__privateGet(this, _epochTime)) {
        __privateSet(this, _epochTime, _Time.fromData({
          year: 1970,
          month: 1,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
          isDate: false,
          timezone: "Z"
        }));
      }
      return __privateGet(this, _epochTime);
    }
    static _cmp_attr(a, b, attr) {
      if (a[attr] > b[attr]) return 1;
      if (a[attr] < b[attr]) return -1;
      return 0;
    }
    /**
     * The type name, to be used in the jCal object. This value may change and
     * is strictly defined by the {@link ICAL.Time#isDate isDate} member.
     * @type {String}
     * @default "date-time"
     */
    get icaltype() {
      return this.isDate ? "date" : "date-time";
    }
    /**
     * The year of this date.
     * @type {Number}
     */
    get year() {
      return this._getTimeAttr("year");
    }
    set year(val) {
      this._setTimeAttr("year", val);
    }
    /**
     * The month of this date.
     * @type {Number}
     */
    get month() {
      return this._getTimeAttr("month");
    }
    set month(val) {
      this._setTimeAttr("month", val);
    }
    /**
     * The day of this date.
     * @type {Number}
     */
    get day() {
      return this._getTimeAttr("day");
    }
    set day(val) {
      this._setTimeAttr("day", val);
    }
    /**
     * The hour of this date-time.
     * @type {Number}
     */
    get hour() {
      return this._getTimeAttr("hour");
    }
    set hour(val) {
      this._setTimeAttr("hour", val);
    }
    /**
     * The minute of this date-time.
     * @type {Number}
     */
    get minute() {
      return this._getTimeAttr("minute");
    }
    set minute(val) {
      this._setTimeAttr("minute", val);
    }
    /**
     * The second of this date-time.
     * @type {Number}
     */
    get second() {
      return this._getTimeAttr("second");
    }
    set second(val) {
      this._setTimeAttr("second", val);
    }
    /**
     * If true, the instance represents a date (as opposed to a date-time)
     * @type {Boolean}
     */
    get isDate() {
      return this._getTimeAttr("isDate");
    }
    set isDate(val) {
      this._setTimeAttr("isDate", val);
    }
    /**
     * @private
     * @param {String} attr             Attribute to get (one of: year, month,
     *                                  day, hour, minute, second, isDate)
     * @return {Number|Boolean}         Current value for the attribute
     */
    _getTimeAttr(attr) {
      if (this._pendingNormalization) {
        this._normalize();
        this._pendingNormalization = false;
      }
      return this._time[attr];
    }
    /**
     * @private
     * @param {String} attr             Attribute to set (one of: year, month,
     *                                  day, hour, minute, second, isDate)
     * @param {Number|Boolean} val      New value for the attribute
     */
    _setTimeAttr(attr, val) {
      if (attr === "isDate" && val && !this._time.isDate) {
        this.adjust(0, 0, 0, 0);
      }
      this._cachedUnixTime = null;
      this._pendingNormalization = true;
      this._time[attr] = val;
    }
    /**
     * Returns a clone of the time object.
     *
     * @return {Time}              The cloned object
     */
    clone() {
      return new _Time(this._time, this.zone);
    }
    /**
     * Reset the time instance to epoch time
     */
    reset() {
      this.fromData(_Time.epochTime);
      this.zone = Timezone.utcTimezone;
    }
    /**
     * Reset the time instance to the given date/time values.
     *
     * @param {Number} year             The year to set
     * @param {Number} month            The month to set
     * @param {Number} day              The day to set
     * @param {Number} hour             The hour to set
     * @param {Number} minute           The minute to set
     * @param {Number} second           The second to set
     * @param {Timezone} timezone       The timezone to set
     */
    resetTo(year, month, day, hour, minute, second, timezone) {
      this.fromData({
        year,
        month,
        day,
        hour,
        minute,
        second,
        zone: timezone
      });
    }
    /**
     * Set up the current instance from the Javascript date value.
     *
     * @param {?Date} aDate             The Javascript Date to read, or null to reset
     * @param {Boolean} [useUTC=false]  If true, the UTC values of the date will be used
     */
    fromJSDate(aDate, useUTC) {
      if (!aDate) {
        this.reset();
      } else {
        if (useUTC) {
          this.zone = Timezone.utcTimezone;
          this.year = aDate.getUTCFullYear();
          this.month = aDate.getUTCMonth() + 1;
          this.day = aDate.getUTCDate();
          this.hour = aDate.getUTCHours();
          this.minute = aDate.getUTCMinutes();
          this.second = aDate.getUTCSeconds();
        } else {
          this.zone = Timezone.localTimezone;
          this.year = aDate.getFullYear();
          this.month = aDate.getMonth() + 1;
          this.day = aDate.getDate();
          this.hour = aDate.getHours();
          this.minute = aDate.getMinutes();
          this.second = aDate.getSeconds();
        }
      }
      this._cachedUnixTime = null;
      return this;
    }
    /**
     * Sets up the current instance using members from the passed data object.
     *
     * @param {timeInit} aData          Time initialization
     * @param {Timezone=} aZone         Timezone this position occurs in
     */
    fromData(aData, aZone) {
      if (aData) {
        for (let [key, value] of Object.entries(aData)) {
          if (key === "icaltype") continue;
          this[key] = value;
        }
      }
      if (aZone) {
        this.zone = aZone;
      }
      if (aData && !("isDate" in aData)) {
        this.isDate = !("hour" in aData);
      } else if (aData && "isDate" in aData) {
        this.isDate = aData.isDate;
      }
      if (aData && "timezone" in aData) {
        let zone = TimezoneService.get(
          aData.timezone
        );
        this.zone = zone || Timezone.localTimezone;
      }
      if (aData && "zone" in aData) {
        this.zone = aData.zone;
      }
      if (!this.zone) {
        this.zone = Timezone.localTimezone;
      }
      this._cachedUnixTime = null;
      return this;
    }
    /**
     * Calculate the day of week.
     * @param {weekDay=} aWeekStart
     *        The week start weekday, defaults to SUNDAY
     * @return {weekDay}
     */
    dayOfWeek(aWeekStart) {
      let firstDow = aWeekStart || _Time.SUNDAY;
      let dowCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + firstDow;
      if (dowCacheKey in _Time._dowCache) {
        return _Time._dowCache[dowCacheKey];
      }
      let q = this.day;
      let m = this.month + (this.month < 3 ? 12 : 0);
      let Y = this.year - (this.month < 3 ? 1 : 0);
      let h = q + Y + trunc((m + 1) * 26 / 10) + trunc(Y / 4);
      {
        h += trunc(Y / 100) * 6 + trunc(Y / 400);
      }
      h = (h + 7 - firstDow) % 7 + 1;
      _Time._dowCache[dowCacheKey] = h;
      return h;
    }
    /**
     * Calculate the day of year.
     * @return {Number}
     */
    dayOfYear() {
      let is_leap = _Time.isLeapYear(this.year) ? 1 : 0;
      let diypm = _Time.daysInYearPassedMonth;
      return diypm[is_leap][this.month - 1] + this.day;
    }
    /**
     * Returns a copy of the current date/time, rewound to the start of the
     * week. The resulting ICAL.Time instance is of icaltype date, even if this
     * is a date-time.
     *
     * @param {weekDay=} aWeekStart
     *        The week start weekday, defaults to SUNDAY
     * @return {Time}      The start of the week (cloned)
     */
    startOfWeek(aWeekStart) {
      let firstDow = aWeekStart || _Time.SUNDAY;
      let result = this.clone();
      result.day -= (this.dayOfWeek() + 7 - firstDow) % 7;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * Returns a copy of the current date/time, shifted to the end of the week.
     * The resulting ICAL.Time instance is of icaltype date, even if this is a
     * date-time.
     *
     * @param {weekDay=} aWeekStart
     *        The week start weekday, defaults to SUNDAY
     * @return {Time}      The end of the week (cloned)
     */
    endOfWeek(aWeekStart) {
      let firstDow = aWeekStart || _Time.SUNDAY;
      let result = this.clone();
      result.day += (7 - this.dayOfWeek() + firstDow - _Time.SUNDAY) % 7;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * Returns a copy of the current date/time, rewound to the start of the
     * month. The resulting ICAL.Time instance is of icaltype date, even if
     * this is a date-time.
     *
     * @return {Time}      The start of the month (cloned)
     */
    startOfMonth() {
      let result = this.clone();
      result.day = 1;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * Returns a copy of the current date/time, shifted to the end of the
     * month.  The resulting ICAL.Time instance is of icaltype date, even if
     * this is a date-time.
     *
     * @return {Time}      The end of the month (cloned)
     */
    endOfMonth() {
      let result = this.clone();
      result.day = _Time.daysInMonth(result.month, result.year);
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * Returns a copy of the current date/time, rewound to the start of the
     * year. The resulting ICAL.Time instance is of icaltype date, even if
     * this is a date-time.
     *
     * @return {Time}      The start of the year (cloned)
     */
    startOfYear() {
      let result = this.clone();
      result.day = 1;
      result.month = 1;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * Returns a copy of the current date/time, shifted to the end of the
     * year.  The resulting ICAL.Time instance is of icaltype date, even if
     * this is a date-time.
     *
     * @return {Time}      The end of the year (cloned)
     */
    endOfYear() {
      let result = this.clone();
      result.day = 31;
      result.month = 12;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    }
    /**
     * First calculates the start of the week, then returns the day of year for
     * this date. If the day falls into the previous year, the day is zero or negative.
     *
     * @param {weekDay=} aFirstDayOfWeek
     *        The week start weekday, defaults to SUNDAY
     * @return {Number}     The calculated day of year
     */
    startDoyWeek(aFirstDayOfWeek) {
      let firstDow = aFirstDayOfWeek || _Time.SUNDAY;
      let delta = this.dayOfWeek() - firstDow;
      if (delta < 0) delta += 7;
      return this.dayOfYear() - delta;
    }
    /**
     * Get the dominical letter for the current year. Letters range from A - G
     * for common years, and AG to GF for leap years.
     *
     * @param {Number} yr           The year to retrieve the letter for
     * @return {String}             The dominical letter.
     */
    getDominicalLetter() {
      return _Time.getDominicalLetter(this.year);
    }
    /**
     * Finds the nthWeekDay relative to the current month (not day).  The
     * returned value is a day relative the month that this month belongs to so
     * 1 would indicate the first of the month and 40 would indicate a day in
     * the following month.
     *
     * @param {Number} aDayOfWeek   Day of the week see the day name constants
     * @param {Number} aPos         Nth occurrence of a given week day values
     *        of 1 and 0 both indicate the first weekday of that type. aPos may
     *        be either positive or negative
     *
     * @return {Number} numeric value indicating a day relative
     *                   to the current month of this time object
     */
    nthWeekDay(aDayOfWeek, aPos) {
      let daysInMonth = _Time.daysInMonth(this.month, this.year);
      let weekday;
      let pos = aPos;
      let start = 0;
      let otherDay = this.clone();
      if (pos >= 0) {
        otherDay.day = 1;
        if (pos != 0) {
          pos--;
        }
        start = otherDay.day;
        let startDow = otherDay.dayOfWeek();
        let offset = aDayOfWeek - startDow;
        if (offset < 0)
          offset += 7;
        start += offset;
        start -= aDayOfWeek;
        weekday = aDayOfWeek;
      } else {
        otherDay.day = daysInMonth;
        let endDow = otherDay.dayOfWeek();
        pos++;
        weekday = endDow - aDayOfWeek;
        if (weekday < 0) {
          weekday += 7;
        }
        weekday = daysInMonth - weekday;
      }
      weekday += pos * 7;
      return start + weekday;
    }
    /**
     * Checks if current time is the nth weekday, relative to the current
     * month.  Will always return false when rule resolves outside of current
     * month.
     *
     * @param {weekDay} aDayOfWeek                 Day of week to check
     * @param {Number} aPos                        Relative position
     * @return {Boolean}                           True, if it is the nth weekday
     */
    isNthWeekDay(aDayOfWeek, aPos) {
      let dow = this.dayOfWeek();
      if (aPos === 0 && dow === aDayOfWeek) {
        return true;
      }
      let day = this.nthWeekDay(aDayOfWeek, aPos);
      if (day === this.day) {
        return true;
      }
      return false;
    }
    /**
     * Calculates the ISO 8601 week number. The first week of a year is the
     * week that contains the first Thursday. The year can have 53 weeks, if
     * January 1st is a Friday.
     *
     * Note there are regions where the first week of the year is the one that
     * starts on January 1st, which may offset the week number. Also, if a
     * different week start is specified, this will also affect the week
     * number.
     *
     * @see Time.weekOneStarts
     * @param {weekDay} aWeekStart                  The weekday the week starts with
     * @return {Number}                             The ISO week number
     */
    weekNumber(aWeekStart) {
      let wnCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + aWeekStart;
      if (wnCacheKey in _Time._wnCache) {
        return _Time._wnCache[wnCacheKey];
      }
      let week1;
      let dt = this.clone();
      dt.isDate = true;
      let isoyear = this.year;
      if (dt.month == 12 && dt.day > 25) {
        week1 = _Time.weekOneStarts(isoyear + 1, aWeekStart);
        if (dt.compare(week1) < 0) {
          week1 = _Time.weekOneStarts(isoyear, aWeekStart);
        } else {
          isoyear++;
        }
      } else {
        week1 = _Time.weekOneStarts(isoyear, aWeekStart);
        if (dt.compare(week1) < 0) {
          week1 = _Time.weekOneStarts(--isoyear, aWeekStart);
        }
      }
      let daysBetween = dt.subtractDate(week1).toSeconds() / 86400;
      let answer2 = trunc(daysBetween / 7) + 1;
      _Time._wnCache[wnCacheKey] = answer2;
      return answer2;
    }
    /**
     * Adds the duration to the current time. The instance is modified in
     * place.
     *
     * @param {Duration} aDuration         The duration to add
     */
    addDuration(aDuration) {
      let mult = aDuration.isNegative ? -1 : 1;
      let second = this.second;
      let minute = this.minute;
      let hour = this.hour;
      let day = this.day;
      second += mult * aDuration.seconds;
      minute += mult * aDuration.minutes;
      hour += mult * aDuration.hours;
      day += mult * aDuration.days;
      day += mult * 7 * aDuration.weeks;
      this.second = second;
      this.minute = minute;
      this.hour = hour;
      this.day = day;
      this._cachedUnixTime = null;
    }
    /**
     * Subtract the date details (_excluding_ timezone).  Useful for finding
     * the relative difference between two time objects excluding their
     * timezone differences.
     *
     * @param {Time} aDate     The date to subtract
     * @return {Duration}      The difference as a duration
     */
    subtractDate(aDate) {
      let unixTime = this.toUnixTime() + this.utcOffset();
      let other = aDate.toUnixTime() + aDate.utcOffset();
      return Duration.fromSeconds(unixTime - other);
    }
    /**
     * Subtract the date details, taking timezones into account.
     *
     * @param {Time} aDate  The date to subtract
     * @return {Duration}   The difference in duration
     */
    subtractDateTz(aDate) {
      let unixTime = this.toUnixTime();
      let other = aDate.toUnixTime();
      return Duration.fromSeconds(unixTime - other);
    }
    /**
     * Compares the ICAL.Time instance with another one, or a period.
     *
     * @param {Time|Period} aOther                  The instance to compare with
     * @return {Number}                             -1, 0 or 1 for less/equal/greater
     */
    compare(other) {
      if (other instanceof Period) {
        return -1 * other.compare(this);
      } else {
        let a = this.toUnixTime();
        let b = other.toUnixTime();
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
      }
    }
    /**
     * Compares only the date part of this instance with another one.
     *
     * @param {Time} other                  The instance to compare with
     * @param {Timezone} tz                 The timezone to compare in
     * @return {Number}                     -1, 0 or 1 for less/equal/greater
     */
    compareDateOnlyTz(other, tz) {
      let a = this.convertToZone(tz);
      let b = other.convertToZone(tz);
      let rc = 0;
      if ((rc = _Time._cmp_attr(a, b, "year")) != 0) return rc;
      if ((rc = _Time._cmp_attr(a, b, "month")) != 0) return rc;
      if ((rc = _Time._cmp_attr(a, b, "day")) != 0) return rc;
      return rc;
    }
    /**
     * Convert the instance into another timezone. The returned ICAL.Time
     * instance is always a copy.
     *
     * @param {Timezone} zone      The zone to convert to
     * @return {Time}              The copy, converted to the zone
     */
    convertToZone(zone) {
      let copy = this.clone();
      let zone_equals = this.zone.tzid == zone.tzid;
      if (!this.isDate && !zone_equals) {
        Timezone.convert_time(copy, this.zone, zone);
      }
      copy.zone = zone;
      return copy;
    }
    /**
     * Calculates the UTC offset of the current date/time in the timezone it is
     * in.
     *
     * @return {Number}     UTC offset in seconds
     */
    utcOffset() {
      if (this.zone == Timezone.localTimezone || this.zone == Timezone.utcTimezone) {
        return 0;
      } else {
        return this.zone.utcOffset(this);
      }
    }
    /**
     * Returns an RFC 5545 compliant ical representation of this object.
     *
     * @return {String} ical date/date-time
     */
    toICALString() {
      let string = this.toString();
      if (string.length > 10) {
        return design.icalendar.value["date-time"].toICAL(string);
      } else {
        return design.icalendar.value.date.toICAL(string);
      }
    }
    /**
     * The string representation of this date/time, in jCal form
     * (including : and - separators).
     * @return {String}
     */
    toString() {
      let result = this.year + "-" + pad2(this.month) + "-" + pad2(this.day);
      if (!this.isDate) {
        result += "T" + pad2(this.hour) + ":" + pad2(this.minute) + ":" + pad2(this.second);
        if (this.zone === Timezone.utcTimezone) {
          result += "Z";
        }
      }
      return result;
    }
    /**
     * Converts the current instance to a Javascript date
     * @return {Date}
     */
    toJSDate() {
      if (this.zone == Timezone.localTimezone) {
        if (this.isDate) {
          return new Date(this.year, this.month - 1, this.day);
        } else {
          return new Date(
            this.year,
            this.month - 1,
            this.day,
            this.hour,
            this.minute,
            this.second,
            0
          );
        }
      } else {
        return new Date(this.toUnixTime() * 1e3);
      }
    }
    _normalize() {
      if (this._time.isDate) {
        this._time.hour = 0;
        this._time.minute = 0;
        this._time.second = 0;
      }
      this.adjust(0, 0, 0, 0);
      return this;
    }
    /**
     * Adjust the date/time by the given offset
     *
     * @param {Number} aExtraDays       The extra amount of days
     * @param {Number} aExtraHours      The extra amount of hours
     * @param {Number} aExtraMinutes    The extra amount of minutes
     * @param {Number} aExtraSeconds    The extra amount of seconds
     * @param {Number=} aTime           The time to adjust, defaults to the
     *                                    current instance.
     */
    adjust(aExtraDays, aExtraHours, aExtraMinutes, aExtraSeconds, aTime) {
      let minutesOverflow, hoursOverflow, daysOverflow = 0, yearsOverflow = 0;
      let second, minute, hour, day;
      let daysInMonth;
      let time = aTime || this._time;
      if (!time.isDate) {
        second = time.second + aExtraSeconds;
        time.second = second % 60;
        minutesOverflow = trunc(second / 60);
        if (time.second < 0) {
          time.second += 60;
          minutesOverflow--;
        }
        minute = time.minute + aExtraMinutes + minutesOverflow;
        time.minute = minute % 60;
        hoursOverflow = trunc(minute / 60);
        if (time.minute < 0) {
          time.minute += 60;
          hoursOverflow--;
        }
        hour = time.hour + aExtraHours + hoursOverflow;
        time.hour = hour % 24;
        daysOverflow = trunc(hour / 24);
        if (time.hour < 0) {
          time.hour += 24;
          daysOverflow--;
        }
      }
      if (time.month > 12) {
        yearsOverflow = trunc((time.month - 1) / 12);
      } else if (time.month < 1) {
        yearsOverflow = trunc(time.month / 12) - 1;
      }
      time.year += yearsOverflow;
      time.month -= 12 * yearsOverflow;
      day = time.day + aExtraDays + daysOverflow;
      if (day > 0) {
        for (; ; ) {
          daysInMonth = _Time.daysInMonth(time.month, time.year);
          if (day <= daysInMonth) {
            break;
          }
          time.month++;
          if (time.month > 12) {
            time.year++;
            time.month = 1;
          }
          day -= daysInMonth;
        }
      } else {
        while (day <= 0) {
          if (time.month == 1) {
            time.year--;
            time.month = 12;
          } else {
            time.month--;
          }
          day += _Time.daysInMonth(time.month, time.year);
        }
      }
      time.day = day;
      this._cachedUnixTime = null;
      return this;
    }
    /**
     * Sets up the current instance from unix time, the number of seconds since
     * January 1st, 1970.
     *
     * @param {Number} seconds      The seconds to set up with
     */
    fromUnixTime(seconds) {
      this.zone = Timezone.utcTimezone;
      let date = new Date(seconds * 1e3);
      this.year = date.getUTCFullYear();
      this.month = date.getUTCMonth() + 1;
      this.day = date.getUTCDate();
      if (this._time.isDate) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
      } else {
        this.hour = date.getUTCHours();
        this.minute = date.getUTCMinutes();
        this.second = date.getUTCSeconds();
      }
      this._cachedUnixTime = null;
    }
    /**
     * Converts the current instance to seconds since January 1st 1970.
     *
     * @return {Number}         Seconds since 1970
     */
    toUnixTime() {
      if (this._cachedUnixTime !== null) {
        return this._cachedUnixTime;
      }
      let offset = this.utcOffset();
      let ms = Date.UTC(
        this.year,
        this.month - 1,
        this.day,
        this.hour,
        this.minute,
        this.second - offset
      );
      this._cachedUnixTime = ms / 1e3;
      return this._cachedUnixTime;
    }
    /**
     * Converts time to into Object which can be serialized then re-created
     * using the constructor.
     *
     * @example
     * // toJSON will automatically be called
     * var json = JSON.stringify(mytime);
     *
     * var deserialized = JSON.parse(json);
     *
     * var time = new ICAL.Time(deserialized);
     *
     * @return {Object}
     */
    toJSON() {
      let copy = [
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "isDate"
      ];
      let result = /* @__PURE__ */ Object.create(null);
      let i = 0;
      let len = copy.length;
      let prop2;
      for (; i < len; i++) {
        prop2 = copy[i];
        result[prop2] = this[prop2];
      }
      if (this.zone) {
        result.timezone = this.zone.tzid;
      }
      return result;
    }
  };
  _epochTime = new WeakMap();
  __publicField(_Time, "_dowCache", {});
  __publicField(_Time, "_wnCache", {});
  /**
   * Creates a new ICAL.Time instance from the the passed data object.
   *
   * @param {timeInit} aData          Time initialization
   * @param {Timezone=} aZone         Timezone this position occurs in
   */
  __publicField(_Time, "fromData", function fromData(aData, aZone) {
    let t = new _Time();
    return t.fromData(aData, aZone);
  });
  __privateAdd(_Time, _epochTime, null);
  /**
   * The days that have passed in the year after a given month. The array has
   * two members, one being an array of passed days for non-leap years, the
   * other analog for leap years.
   * @example
   * var isLeapYear = ICAL.Time.isLeapYear(year);
   * var passedDays = ICAL.Time.daysInYearPassedMonth[isLeapYear][month];
   * @type {Array.<Array.<Number>>}
   */
  __publicField(_Time, "daysInYearPassedMonth", [
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
    [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]
  ]);
  __publicField(_Time, "SUNDAY", 1);
  __publicField(_Time, "MONDAY", 2);
  __publicField(_Time, "TUESDAY", 3);
  __publicField(_Time, "WEDNESDAY", 4);
  __publicField(_Time, "THURSDAY", 5);
  __publicField(_Time, "FRIDAY", 6);
  __publicField(_Time, "SATURDAY", 7);
  /**
   * The default weekday for the WKST part.
   * @constant
   * @default ICAL.Time.MONDAY
   */
  __publicField(_Time, "DEFAULT_WEEK_START", 2);
  var Time = _Time;
  var CHAR = /[^ \t]/;
  var VALUE_DELIMITER = ":";
  var PARAM_DELIMITER = ";";
  var PARAM_NAME_DELIMITER = "=";
  var DEFAULT_VALUE_TYPE$1 = "unknown";
  var DEFAULT_PARAM_TYPE = "text";
  var RFC6868_REPLACE_MAP$1 = { "^'": '"', "^n": "\n", "^^": "^" };
  function parse(input) {
    let state = {};
    let root = state.component = [];
    state.stack = [root];
    parse._eachLine(input, function(err, line) {
      parse._handleContentLine(line, state);
    });
    if (state.stack.length > 1) {
      throw new ParserError(
        "invalid ical body. component began but did not end"
      );
    }
    state = null;
    return root.length == 1 ? root[0] : root;
  }
  parse.property = function(str, designSet) {
    let state = {
      component: [[], []],
      designSet: designSet || design.defaultSet
    };
    parse._handleContentLine(str, state);
    return state.component[1][0];
  };
  parse.component = function(str) {
    return parse(str);
  };
  var ParserError = class extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", this.constructor.name);
    }
  };
  parse.ParserError = ParserError;
  parse._handleContentLine = function(line, state) {
    let valuePos = line.indexOf(VALUE_DELIMITER);
    let paramPos = line.indexOf(PARAM_DELIMITER);
    let lastParamIndex;
    let lastValuePos;
    let name;
    let value;
    let params = {};
    if (paramPos !== -1 && valuePos !== -1) {
      if (paramPos > valuePos) {
        paramPos = -1;
      }
    }
    let parsedParams;
    if (paramPos !== -1) {
      name = line.slice(0, Math.max(0, paramPos)).toLowerCase();
      parsedParams = parse._parseParameters(line.slice(Math.max(0, paramPos)), 0, state.designSet);
      if (parsedParams[2] == -1) {
        throw new ParserError("Invalid parameters in '" + line + "'");
      }
      params = parsedParams[0];
      let parsedParamLength;
      if (typeof parsedParams[1] === "string") {
        parsedParamLength = parsedParams[1].length;
      } else {
        parsedParamLength = parsedParams[1].reduce((accumulator, currentValue) => {
          return accumulator + currentValue.length;
        }, 0);
      }
      lastParamIndex = parsedParamLength + parsedParams[2] + paramPos;
      if ((lastValuePos = line.slice(Math.max(0, lastParamIndex)).indexOf(VALUE_DELIMITER)) !== -1) {
        value = line.slice(Math.max(0, lastParamIndex + lastValuePos + 1));
      } else {
        throw new ParserError("Missing parameter value in '" + line + "'");
      }
    } else if (valuePos !== -1) {
      name = line.slice(0, Math.max(0, valuePos)).toLowerCase();
      value = line.slice(Math.max(0, valuePos + 1));
      if (name === "begin") {
        let newComponent = [value.toLowerCase(), [], []];
        if (state.stack.length === 1) {
          state.component.push(newComponent);
        } else {
          state.component[2].push(newComponent);
        }
        state.stack.push(state.component);
        state.component = newComponent;
        if (!state.designSet) {
          state.designSet = design.getDesignSet(state.component[0]);
        }
        return;
      } else if (name === "end") {
        state.component = state.stack.pop();
        return;
      }
    } else {
      throw new ParserError(
        'invalid line (no token ";" or ":") "' + line + '"'
      );
    }
    let valueType;
    let multiValue = false;
    let structuredValue = false;
    let propertyDetails;
    let splitName;
    let ungroupedName;
    if (state.designSet.propertyGroups && name.indexOf(".") !== -1) {
      splitName = name.split(".");
      params.group = splitName[0];
      ungroupedName = splitName[1];
    } else {
      ungroupedName = name;
    }
    if (ungroupedName in state.designSet.property) {
      propertyDetails = state.designSet.property[ungroupedName];
      if ("multiValue" in propertyDetails) {
        multiValue = propertyDetails.multiValue;
      }
      if ("structuredValue" in propertyDetails) {
        structuredValue = propertyDetails.structuredValue;
      }
      if (value && "detectType" in propertyDetails) {
        valueType = propertyDetails.detectType(value);
      }
    }
    if (!valueType) {
      if (!("value" in params)) {
        if (propertyDetails) {
          valueType = propertyDetails.defaultType;
        } else {
          valueType = DEFAULT_VALUE_TYPE$1;
        }
      } else {
        valueType = params.value.toLowerCase();
      }
    }
    delete params.value;
    let result;
    if (multiValue && structuredValue) {
      value = parse._parseMultiValue(value, structuredValue, valueType, [], multiValue, state.designSet, structuredValue);
      result = [ungroupedName, params, valueType, value];
    } else if (multiValue) {
      result = [ungroupedName, params, valueType];
      parse._parseMultiValue(value, multiValue, valueType, result, null, state.designSet, false);
    } else if (structuredValue) {
      value = parse._parseMultiValue(value, structuredValue, valueType, [], null, state.designSet, structuredValue);
      result = [ungroupedName, params, valueType, value];
    } else {
      value = parse._parseValue(value, valueType, state.designSet, false);
      result = [ungroupedName, params, valueType, value];
    }
    if (state.component[0] === "vcard" && state.component[1].length === 0 && !(name === "version" && value === "4.0")) {
      state.designSet = design.getDesignSet("vcard3");
    }
    state.component[1].push(result);
  };
  parse._parseValue = function(value, type, designSet, structuredValue) {
    if (type in designSet.value && "fromICAL" in designSet.value[type]) {
      return designSet.value[type].fromICAL(value, structuredValue);
    }
    return value;
  };
  parse._parseParameters = function(line, start, designSet) {
    let lastParam = start;
    let pos = 0;
    let delim = PARAM_NAME_DELIMITER;
    let result = {};
    let name, lcname;
    let value, valuePos = -1;
    let type, multiValue, mvdelim;
    while (pos !== false && (pos = line.indexOf(delim, pos + 1)) !== -1) {
      name = line.slice(lastParam + 1, pos);
      if (name.length == 0) {
        throw new ParserError("Empty parameter name in '" + line + "'");
      }
      lcname = name.toLowerCase();
      mvdelim = false;
      multiValue = false;
      if (lcname in designSet.param && designSet.param[lcname].valueType) {
        type = designSet.param[lcname].valueType;
      } else {
        type = DEFAULT_PARAM_TYPE;
      }
      if (lcname in designSet.param) {
        multiValue = designSet.param[lcname].multiValue;
        if (designSet.param[lcname].multiValueSeparateDQuote) {
          mvdelim = parse._rfc6868Escape('"' + multiValue + '"');
        }
      }
      let nextChar = line[pos + 1];
      if (nextChar === '"') {
        valuePos = pos + 2;
        pos = line.indexOf('"', valuePos);
        if (multiValue && pos != -1) {
          let extendedValue = true;
          while (extendedValue) {
            if (line[pos + 1] == multiValue && line[pos + 2] == '"') {
              pos = line.indexOf('"', pos + 3);
            } else {
              extendedValue = false;
            }
          }
        }
        if (pos === -1) {
          throw new ParserError(
            'invalid line (no matching double quote) "' + line + '"'
          );
        }
        value = line.slice(valuePos, pos);
        lastParam = line.indexOf(PARAM_DELIMITER, pos);
        let propValuePos = line.indexOf(VALUE_DELIMITER, pos);
        if (lastParam === -1 || propValuePos !== -1 && lastParam > propValuePos) {
          pos = false;
        }
      } else {
        valuePos = pos + 1;
        let nextPos = line.indexOf(PARAM_DELIMITER, valuePos);
        let propValuePos = line.indexOf(VALUE_DELIMITER, valuePos);
        if (propValuePos !== -1 && nextPos > propValuePos) {
          nextPos = propValuePos;
          pos = false;
        } else if (nextPos === -1) {
          if (propValuePos === -1) {
            nextPos = line.length;
          } else {
            nextPos = propValuePos;
          }
          pos = false;
        } else {
          lastParam = nextPos;
          pos = nextPos;
        }
        value = line.slice(valuePos, nextPos);
      }
      const length_before = value.length;
      value = parse._rfc6868Escape(value);
      valuePos += length_before - value.length;
      if (multiValue) {
        let delimiter = mvdelim || multiValue;
        value = parse._parseMultiValue(value, delimiter, type, [], null, designSet);
      } else {
        value = parse._parseValue(value, type, designSet);
      }
      if (multiValue && lcname in result) {
        if (Array.isArray(result[lcname])) {
          result[lcname].push(value);
        } else {
          result[lcname] = [
            result[lcname],
            value
          ];
        }
      } else {
        result[lcname] = value;
      }
    }
    return [result, value, valuePos];
  };
  parse._rfc6868Escape = function(val) {
    return val.replace(/\^['n^]/g, function(x) {
      return RFC6868_REPLACE_MAP$1[x];
    });
  };
  parse._parseMultiValue = function(buffer, delim, type, result, innerMulti, designSet, structuredValue) {
    let pos = 0;
    let lastPos = 0;
    let value;
    if (delim.length === 0) {
      return buffer;
    }
    while ((pos = unescapedIndexOf(buffer, delim, lastPos)) !== -1) {
      value = buffer.slice(lastPos, pos);
      if (innerMulti) {
        value = parse._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
      } else {
        value = parse._parseValue(value, type, designSet, structuredValue);
      }
      result.push(value);
      lastPos = pos + delim.length;
    }
    value = buffer.slice(lastPos);
    if (innerMulti) {
      value = parse._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
    } else {
      value = parse._parseValue(value, type, designSet, structuredValue);
    }
    result.push(value);
    return result.length == 1 ? result[0] : result;
  };
  parse._eachLine = function(buffer, callback) {
    let len = buffer.length;
    let lastPos = buffer.search(CHAR);
    let pos = lastPos;
    let line;
    let firstChar;
    let newlineOffset;
    do {
      pos = buffer.indexOf("\n", lastPos) + 1;
      if (pos > 1 && buffer[pos - 2] === "\r") {
        newlineOffset = 2;
      } else {
        newlineOffset = 1;
      }
      if (pos === 0) {
        pos = len;
        newlineOffset = 0;
      }
      firstChar = buffer[lastPos];
      if (firstChar === " " || firstChar === "	") {
        line += buffer.slice(lastPos + 1, pos - newlineOffset);
      } else {
        if (line)
          callback(null, line);
        line = buffer.slice(lastPos, pos - newlineOffset);
      }
      lastPos = pos;
    } while (pos !== len);
    line = line.trim();
    if (line.length)
      callback(null, line);
  };
  var OPTIONS = ["tzid", "location", "tznames", "latitude", "longitude"];
  var _utcTimezone, _localTimezone;
  var _Timezone = class _Timezone {
    /**
     * Creates a new ICAL.Timezone instance, by passing in a tzid and component.
     *
     * @param {Component|Object} data options for class
     * @param {String|Component} data.component
     *        If data is a simple object, then this member can be set to either a
     *        string containing the component data, or an already parsed
     *        ICAL.Component
     * @param {String} data.tzid      The timezone identifier
     * @param {String} data.location  The timezone locationw
     * @param {String} data.tznames   An alternative string representation of the
     *                                  timezone
     * @param {Number} data.latitude  The latitude of the timezone
     * @param {Number} data.longitude The longitude of the timezone
     */
    constructor(data) {
      /**
       * Timezone identifier
       * @type {String}
       */
      __publicField(this, "tzid", "");
      /**
       * Timezone location
       * @type {String}
       */
      __publicField(this, "location", "");
      /**
       * Alternative timezone name, for the string representation
       * @type {String}
       */
      __publicField(this, "tznames", "");
      /**
       * The primary latitude for the timezone.
       * @type {Number}
       */
      __publicField(this, "latitude", 0);
      /**
       * The primary longitude for the timezone.
       * @type {Number}
       */
      __publicField(this, "longitude", 0);
      /**
       * The vtimezone component for this timezone.
       * @type {Component}
       */
      __publicField(this, "component", null);
      /**
       * The year this timezone has been expanded to. All timezone transition
       * dates until this year are known and can be used for calculation
       *
       * @private
       * @type {Number}
       */
      __publicField(this, "expandedUntilYear", 0);
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "icaltimezone"
       */
      __publicField(this, "icalclass", "icaltimezone");
      this.wrappedJSObject = this;
      this.fromData(data);
    }
    static _compare_change_fn(a, b) {
      if (a.year < b.year) return -1;
      else if (a.year > b.year) return 1;
      if (a.month < b.month) return -1;
      else if (a.month > b.month) return 1;
      if (a.day < b.day) return -1;
      else if (a.day > b.day) return 1;
      if (a.hour < b.hour) return -1;
      else if (a.hour > b.hour) return 1;
      if (a.minute < b.minute) return -1;
      else if (a.minute > b.minute) return 1;
      if (a.second < b.second) return -1;
      else if (a.second > b.second) return 1;
      return 0;
    }
    /**
     * Convert the date/time from one zone to the next.
     *
     * @param {Time} tt                  The time to convert
     * @param {Timezone} from_zone       The source zone to convert from
     * @param {Timezone} to_zone         The target zone to convert to
     * @return {Time}                    The converted date/time object
     */
    static convert_time(tt, from_zone, to_zone) {
      if (tt.isDate || from_zone.tzid == to_zone.tzid || from_zone == _Timezone.localTimezone || to_zone == _Timezone.localTimezone) {
        tt.zone = to_zone;
        return tt;
      }
      let utcOffset = from_zone.utcOffset(tt);
      tt.adjust(0, 0, 0, -utcOffset);
      utcOffset = to_zone.utcOffset(tt);
      tt.adjust(0, 0, 0, utcOffset);
      return null;
    }
    /**
     * Creates a new ICAL.Timezone instance from the passed data object.
     *
     * @param {Component|Object} aData options for class
     * @param {String|Component} aData.component
     *        If aData is a simple object, then this member can be set to either a
     *        string containing the component data, or an already parsed
     *        ICAL.Component
     * @param {String} aData.tzid      The timezone identifier
     * @param {String} aData.location  The timezone locationw
     * @param {String} aData.tznames   An alternative string representation of the
     *                                  timezone
     * @param {Number} aData.latitude  The latitude of the timezone
     * @param {Number} aData.longitude The longitude of the timezone
     */
    static fromData(aData) {
      let tt = new _Timezone();
      return tt.fromData(aData);
    }
    static get utcTimezone() {
      if (!__privateGet(this, _utcTimezone)) {
        __privateSet(this, _utcTimezone, _Timezone.fromData({
          tzid: "UTC"
        }));
      }
      return __privateGet(this, _utcTimezone);
    }
    static get localTimezone() {
      if (!__privateGet(this, _localTimezone)) {
        __privateSet(this, _localTimezone, _Timezone.fromData({
          tzid: "floating"
        }));
      }
      return __privateGet(this, _localTimezone);
    }
    /**
     * Adjust a timezone change object.
     * @private
     * @param {Object} change     The timezone change object
     * @param {Number} days       The extra amount of days
     * @param {Number} hours      The extra amount of hours
     * @param {Number} minutes    The extra amount of minutes
     * @param {Number} seconds    The extra amount of seconds
     */
    static adjust_change(change, days, hours, minutes, seconds) {
      return Time.prototype.adjust.call(
        change,
        days,
        hours,
        minutes,
        seconds,
        change
      );
    }
    /**
     * Sets up the current instance using members from the passed data object.
     *
     * @param {Component|Object} aData options for class
     * @param {String|Component} aData.component
     *        If aData is a simple object, then this member can be set to either a
     *        string containing the component data, or an already parsed
     *        ICAL.Component
     * @param {String} aData.tzid      The timezone identifier
     * @param {String} aData.location  The timezone locationw
     * @param {String} aData.tznames   An alternative string representation of the
     *                                  timezone
     * @param {Number} aData.latitude  The latitude of the timezone
     * @param {Number} aData.longitude The longitude of the timezone
     */
    fromData(aData) {
      this.expandedUntilYear = 0;
      this.changes = [];
      if (aData instanceof Component) {
        this.component = aData;
      } else {
        if (aData && "component" in aData) {
          if (typeof aData.component == "string") {
            let jCal = parse(aData.component);
            this.component = new Component(jCal);
          } else if (aData.component instanceof Component) {
            this.component = aData.component;
          } else {
            this.component = null;
          }
        }
        for (let prop2 of OPTIONS) {
          if (aData && prop2 in aData) {
            this[prop2] = aData[prop2];
          }
        }
      }
      if (this.component instanceof Component && !this.tzid) {
        this.tzid = this.component.getFirstPropertyValue("tzid");
      }
      return this;
    }
    /**
     * Finds the utcOffset the given time would occur in this timezone.
     *
     * @param {Time} tt         The time to check for
     * @return {Number}         utc offset in seconds
     */
    utcOffset(tt) {
      if (this == _Timezone.utcTimezone || this == _Timezone.localTimezone) {
        return 0;
      }
      this._ensureCoverage(tt.year);
      if (!this.changes.length) {
        return 0;
      }
      let tt_change = {
        year: tt.year,
        month: tt.month,
        day: tt.day,
        hour: tt.hour,
        minute: tt.minute,
        second: tt.second
      };
      let change_num = this._findNearbyChange(tt_change);
      let change_num_to_use = -1;
      let step = 1;
      for (; ; ) {
        let change = clone(this.changes[change_num], true);
        if (change.utcOffset < change.prevUtcOffset) {
          _Timezone.adjust_change(change, 0, 0, 0, change.utcOffset);
        } else {
          _Timezone.adjust_change(
            change,
            0,
            0,
            0,
            change.prevUtcOffset
          );
        }
        let cmp = _Timezone._compare_change_fn(tt_change, change);
        if (cmp >= 0) {
          change_num_to_use = change_num;
        } else {
          step = -1;
        }
        if (step == -1 && change_num_to_use != -1) {
          break;
        }
        change_num += step;
        if (change_num < 0) {
          return 0;
        }
        if (change_num >= this.changes.length) {
          break;
        }
      }
      let zone_change = this.changes[change_num_to_use];
      let utcOffset_change = zone_change.utcOffset - zone_change.prevUtcOffset;
      if (utcOffset_change < 0 && change_num_to_use > 0) {
        let tmp_change = clone(zone_change, true);
        _Timezone.adjust_change(tmp_change, 0, 0, 0, tmp_change.prevUtcOffset);
        if (_Timezone._compare_change_fn(tt_change, tmp_change) < 0) {
          let prev_zone_change = this.changes[change_num_to_use - 1];
          let want_daylight = false;
          if (zone_change.is_daylight != want_daylight && prev_zone_change.is_daylight == want_daylight) {
            zone_change = prev_zone_change;
          }
        }
      }
      return zone_change.utcOffset;
    }
    _findNearbyChange(change) {
      let idx = binsearchInsert(
        this.changes,
        change,
        _Timezone._compare_change_fn
      );
      if (idx >= this.changes.length) {
        return this.changes.length - 1;
      }
      return idx;
    }
    _ensureCoverage(aYear) {
      if (_Timezone._minimumExpansionYear == -1) {
        let today = Time.now();
        _Timezone._minimumExpansionYear = today.year;
      }
      let changesEndYear = aYear;
      if (changesEndYear < _Timezone._minimumExpansionYear) {
        changesEndYear = _Timezone._minimumExpansionYear;
      }
      changesEndYear += _Timezone.EXTRA_COVERAGE;
      if (!this.changes.length || this.expandedUntilYear < aYear) {
        let subcomps = this.component.getAllSubcomponents();
        let compLen = subcomps.length;
        let compIdx = 0;
        for (; compIdx < compLen; compIdx++) {
          this._expandComponent(
            subcomps[compIdx],
            changesEndYear,
            this.changes
          );
        }
        this.changes.sort(_Timezone._compare_change_fn);
        this.expandedUntilYear = changesEndYear;
      }
    }
    _expandComponent(aComponent, aYear, changes) {
      if (!aComponent.hasProperty("dtstart") || !aComponent.hasProperty("tzoffsetto") || !aComponent.hasProperty("tzoffsetfrom")) {
        return null;
      }
      let dtstart = aComponent.getFirstProperty("dtstart").getFirstValue();
      let change;
      function convert_tzoffset(offset) {
        return offset.factor * (offset.hours * 3600 + offset.minutes * 60);
      }
      function init_changes() {
        let changebase = {};
        changebase.is_daylight = aComponent.name == "daylight";
        changebase.utcOffset = convert_tzoffset(
          aComponent.getFirstProperty("tzoffsetto").getFirstValue()
        );
        changebase.prevUtcOffset = convert_tzoffset(
          aComponent.getFirstProperty("tzoffsetfrom").getFirstValue()
        );
        return changebase;
      }
      if (!aComponent.hasProperty("rrule") && !aComponent.hasProperty("rdate")) {
        change = init_changes();
        change.year = dtstart.year;
        change.month = dtstart.month;
        change.day = dtstart.day;
        change.hour = dtstart.hour;
        change.minute = dtstart.minute;
        change.second = dtstart.second;
        _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
        changes.push(change);
      } else {
        let props = aComponent.getAllProperties("rdate");
        for (let rdate of props) {
          let time = rdate.getFirstValue();
          change = init_changes();
          change.year = time.year;
          change.month = time.month;
          change.day = time.day;
          if (time.isDate) {
            change.hour = dtstart.hour;
            change.minute = dtstart.minute;
            change.second = dtstart.second;
            if (dtstart.zone != _Timezone.utcTimezone) {
              _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
            }
          } else {
            change.hour = time.hour;
            change.minute = time.minute;
            change.second = time.second;
            if (time.zone != _Timezone.utcTimezone) {
              _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
            }
          }
          changes.push(change);
        }
        let rrule = aComponent.getFirstProperty("rrule");
        if (rrule) {
          rrule = rrule.getFirstValue();
          change = init_changes();
          if (rrule.until && rrule.until.zone == _Timezone.utcTimezone) {
            rrule.until.adjust(0, 0, 0, change.prevUtcOffset);
            rrule.until.zone = _Timezone.localTimezone;
          }
          let iterator = rrule.iterator(dtstart);
          let occ;
          while (occ = iterator.next()) {
            change = init_changes();
            if (occ.year > aYear || !occ) {
              break;
            }
            change.year = occ.year;
            change.month = occ.month;
            change.day = occ.day;
            change.hour = occ.hour;
            change.minute = occ.minute;
            change.second = occ.second;
            change.isDate = occ.isDate;
            _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
            changes.push(change);
          }
        }
      }
      return changes;
    }
    /**
     * The string representation of this timezone.
     * @return {String}
     */
    toString() {
      return this.tznames ? this.tznames : this.tzid;
    }
  };
  _utcTimezone = new WeakMap();
  _localTimezone = new WeakMap();
  /**
   * The instance describing the UTC timezone
   * @type {Timezone}
   * @constant
   * @instance
   */
  __privateAdd(_Timezone, _utcTimezone, null);
  /**
   * The instance describing the local timezone
   * @type {Timezone}
   * @constant
   * @instance
   */
  __privateAdd(_Timezone, _localTimezone, null);
  __publicField(_Timezone, "_minimumExpansionYear", -1);
  __publicField(_Timezone, "EXTRA_COVERAGE", 5);
  var Timezone = _Timezone;
  var zones = null;
  var TimezoneService = {
    get count() {
      if (zones === null) {
        return 0;
      }
      return Object.keys(zones).length;
    },
    reset: function() {
      zones = /* @__PURE__ */ Object.create(null);
      let utc = Timezone.utcTimezone;
      zones.Z = utc;
      zones.UTC = utc;
      zones.GMT = utc;
    },
    _hard_reset: function() {
      zones = null;
    },
    /**
     * Checks if timezone id has been registered.
     *
     * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
     * @return {Boolean}        False, when not present
     */
    has: function(tzid) {
      if (zones === null) {
        return false;
      }
      return !!zones[tzid];
    },
    /**
     * Returns a timezone by its tzid if present.
     *
     * @param {String} tzid               Timezone identifier (e.g. America/Los_Angeles)
     * @return {Timezone | undefined}     The timezone, or undefined if not found
     */
    get: function(tzid) {
      if (zones === null) {
        this.reset();
      }
      return zones[tzid];
    },
    /**
     * Registers a timezone object or component.
     *
     * @param {Component|Timezone} timezone
     *        The initialized zone or vtimezone.
     *
     * @param {String=} name
     *        The name of the timezone. Defaults to the component's TZID if not
     *        passed.
     */
    register: function(timezone, name) {
      if (zones === null) {
        this.reset();
      }
      if (typeof timezone === "string" && name instanceof Timezone) {
        [timezone, name] = [name, timezone];
      }
      if (!name) {
        if (timezone instanceof Timezone) {
          name = timezone.tzid;
        } else {
          if (timezone.name === "vtimezone") {
            timezone = new Timezone(timezone);
            name = timezone.tzid;
          }
        }
      }
      if (!name) {
        throw new TypeError("Neither a timezone nor a name was passed");
      }
      if (timezone instanceof Timezone) {
        zones[name] = timezone;
      } else {
        throw new TypeError("timezone must be ICAL.Timezone or ICAL.Component");
      }
    },
    /**
     * Removes a timezone by its tzid from the list.
     *
     * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
     * @return {?Timezone}      The removed timezone, or null if not registered
     */
    remove: function(tzid) {
      if (zones === null) {
        return null;
      }
      return delete zones[tzid];
    }
  };
  function updateTimezones(vcal) {
    let allsubs, properties, vtimezones, reqTzid, i;
    if (!vcal || vcal.name !== "vcalendar") {
      return vcal;
    }
    allsubs = vcal.getAllSubcomponents();
    properties = [];
    vtimezones = {};
    for (i = 0; i < allsubs.length; i++) {
      if (allsubs[i].name === "vtimezone") {
        let tzid = allsubs[i].getFirstProperty("tzid").getFirstValue();
        vtimezones[tzid] = allsubs[i];
      } else {
        properties = properties.concat(allsubs[i].getAllProperties());
      }
    }
    reqTzid = {};
    for (i = 0; i < properties.length; i++) {
      let tzid = properties[i].getParameter("tzid");
      if (tzid) {
        reqTzid[tzid] = true;
      }
    }
    for (let [tzid, comp] of Object.entries(vtimezones)) {
      if (!reqTzid[tzid]) {
        vcal.removeSubcomponent(comp);
      }
    }
    for (let tzid of Object.keys(reqTzid)) {
      if (!vtimezones[tzid] && TimezoneService.has(tzid)) {
        vcal.addSubcomponent(TimezoneService.get(tzid).component);
      }
    }
    return vcal;
  }
  function isStrictlyNaN(number) {
    return typeof number === "number" && isNaN(number);
  }
  function strictParseInt(string) {
    let result = parseInt(string, 10);
    if (isStrictlyNaN(result)) {
      throw new Error(
        'Could not extract integer from "' + string + '"'
      );
    }
    return result;
  }
  function formatClassType(data, type) {
    if (typeof data === "undefined") {
      return void 0;
    }
    if (data instanceof type) {
      return data;
    }
    return new type(data);
  }
  function unescapedIndexOf(buffer, search, pos) {
    while ((pos = buffer.indexOf(search, pos)) !== -1) {
      if (pos > 0 && buffer[pos - 1] === "\\") {
        pos += 1;
      } else {
        return pos;
      }
    }
    return -1;
  }
  function binsearchInsert(list, seekVal, cmpfunc) {
    if (!list.length)
      return 0;
    let low = 0, high = list.length - 1, mid, cmpval;
    while (low <= high) {
      mid = low + Math.floor((high - low) / 2);
      cmpval = cmpfunc(seekVal, list[mid]);
      if (cmpval < 0)
        high = mid - 1;
      else if (cmpval > 0)
        low = mid + 1;
      else
        break;
    }
    if (cmpval < 0)
      return mid;
    else if (cmpval > 0)
      return mid + 1;
    else
      return mid;
  }
  function clone(aSrc, aDeep) {
    if (!aSrc || typeof aSrc != "object") {
      return aSrc;
    } else if (aSrc instanceof Date) {
      return new Date(aSrc.getTime());
    } else if ("clone" in aSrc) {
      return aSrc.clone();
    } else if (Array.isArray(aSrc)) {
      let arr = [];
      for (let i = 0; i < aSrc.length; i++) {
        arr.push(aDeep ? clone(aSrc[i], true) : aSrc[i]);
      }
      return arr;
    } else {
      let obj = {};
      for (let [name, value] of Object.entries(aSrc)) {
        if (aDeep) {
          obj[name] = clone(value, true);
        } else {
          obj[name] = value;
        }
      }
      return obj;
    }
  }
  function foldline(aLine) {
    let result = "";
    let line = aLine || "", pos = 0, line_length = 0;
    while (line.length) {
      let cp = line.codePointAt(pos);
      if (cp < 128) ++line_length;
      else if (cp < 2048) line_length += 2;
      else if (cp < 65536) line_length += 3;
      else line_length += 4;
      if (line_length < ICALmodule.foldLength + 1)
        pos += cp > 65535 ? 2 : 1;
      else {
        result += ICALmodule.newLineChar + " " + line.slice(0, Math.max(0, pos));
        line = line.slice(Math.max(0, pos));
        pos = line_length = 0;
      }
    }
    return result.slice(ICALmodule.newLineChar.length + 1);
  }
  function pad2(data) {
    if (typeof data !== "string") {
      if (typeof data === "number") {
        data = parseInt(data);
      }
      data = String(data);
    }
    let len = data.length;
    switch (len) {
      case 0:
        return "00";
      case 1:
        return "0" + data;
      default:
        return data;
    }
  }
  function trunc(number) {
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  function extend(source, target) {
    for (let key in source) {
      let descr = Object.getOwnPropertyDescriptor(source, key);
      if (descr && !Object.getOwnPropertyDescriptor(target, key)) {
        Object.defineProperty(target, key, descr);
      }
    }
    return target;
  }
  var helpers = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    binsearchInsert,
    clone,
    extend,
    foldline,
    formatClassType,
    isStrictlyNaN,
    pad2,
    strictParseInt,
    trunc,
    unescapedIndexOf,
    updateTimezones
  });
  var UtcOffset = class _UtcOffset {
    /**
     * Creates a new ICAL.UtcOffset instance.
     *
     * @param {Object} aData          An object with members of the utc offset
     * @param {Number=} aData.hours   The hours for the utc offset
     * @param {Number=} aData.minutes The minutes in the utc offset
     * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
     */
    constructor(aData) {
      /**
       * The hours in the utc-offset
       * @type {Number}
       */
      __publicField(this, "hours", 0);
      /**
       * The minutes in the utc-offset
       * @type {Number}
       */
      __publicField(this, "minutes", 0);
      /**
       * The sign of the utc offset, 1 for positive offset, -1 for negative
       * offsets.
       * @type {Number}
       */
      __publicField(this, "factor", 1);
      /**
       * The type name, to be used in the jCal object.
       * @constant
       * @type {String}
       * @default "utc-offset"
       */
      __publicField(this, "icaltype", "utc-offset");
      this.fromData(aData);
    }
    /**
     * Creates a new {@link ICAL.UtcOffset} instance from the passed string.
     *
     * @param {String} aString    The string to parse
     * @return {Duration}         The created utc-offset instance
     */
    static fromString(aString) {
      let options = {};
      options.factor = aString[0] === "+" ? 1 : -1;
      options.hours = strictParseInt(aString.slice(1, 3));
      options.minutes = strictParseInt(aString.slice(4, 6));
      return new _UtcOffset(options);
    }
    /**
     * Creates a new {@link ICAL.UtcOffset} instance from the passed seconds
     * value.
     *
     * @param {Number} aSeconds       The number of seconds to convert
     */
    static fromSeconds(aSeconds) {
      let instance = new _UtcOffset();
      instance.fromSeconds(aSeconds);
      return instance;
    }
    /**
     * Returns a clone of the utc offset object.
     *
     * @return {UtcOffset}     The cloned object
     */
    clone() {
      return _UtcOffset.fromSeconds(this.toSeconds());
    }
    /**
     * Sets up the current instance using members from the passed data object.
     *
     * @param {Object} aData          An object with members of the utc offset
     * @param {Number=} aData.hours   The hours for the utc offset
     * @param {Number=} aData.minutes The minutes in the utc offset
     * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
     */
    fromData(aData) {
      if (aData) {
        for (let [key, value] of Object.entries(aData)) {
          this[key] = value;
        }
      }
      this._normalize();
    }
    /**
     * Sets up the current instance from the given seconds value. The seconds
     * value is truncated to the minute. Offsets are wrapped when the world
     * ends, the hour after UTC+14:00 is UTC-12:00.
     *
     * @param {Number} aSeconds         The seconds to convert into an offset
     */
    fromSeconds(aSeconds) {
      let secs = Math.abs(aSeconds);
      this.factor = aSeconds < 0 ? -1 : 1;
      this.hours = trunc(secs / 3600);
      secs -= this.hours * 3600;
      this.minutes = trunc(secs / 60);
      return this;
    }
    /**
     * Convert the current offset to a value in seconds
     *
     * @return {Number}                 The offset in seconds
     */
    toSeconds() {
      return this.factor * (60 * this.minutes + 3600 * this.hours);
    }
    /**
     * Compare this utc offset with another one.
     *
     * @param {UtcOffset} other             The other offset to compare with
     * @return {Number}                     -1, 0 or 1 for less/equal/greater
     */
    compare(other) {
      let a = this.toSeconds();
      let b = other.toSeconds();
      return (a > b) - (b > a);
    }
    _normalize() {
      let secs = this.toSeconds();
      let factor = this.factor;
      while (secs < -43200) {
        secs += 97200;
      }
      while (secs > 50400) {
        secs -= 97200;
      }
      this.fromSeconds(secs);
      if (secs == 0) {
        this.factor = factor;
      }
    }
    /**
     * The iCalendar string representation of this utc-offset.
     * @return {String}
     */
    toICALString() {
      return design.icalendar.value["utc-offset"].toICAL(this.toString());
    }
    /**
     * The string representation of this utc-offset.
     * @return {String}
     */
    toString() {
      return (this.factor == 1 ? "+" : "-") + pad2(this.hours) + ":" + pad2(this.minutes);
    }
  };
  var VCardTime = class _VCardTime extends Time {
    /**
     * Creates a new ICAL.VCardTime instance.
     *
     * @param {Object} data                           The data for the time instance
     * @param {Number=} data.year                     The year for this date
     * @param {Number=} data.month                    The month for this date
     * @param {Number=} data.day                      The day for this date
     * @param {Number=} data.hour                     The hour for this date
     * @param {Number=} data.minute                   The minute for this date
     * @param {Number=} data.second                   The second for this date
     * @param {Timezone|UtcOffset} zone               The timezone to use
     * @param {String} icaltype                       The type for this date/time object
     */
    constructor(data, zone, icaltype) {
      super(data, zone);
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "vcardtime"
       */
      __publicField(this, "icalclass", "vcardtime");
      /**
       * The type name, to be used in the jCal object.
       * @type {String}
       * @default "date-and-or-time"
       */
      __publicField(this, "icaltype", "date-and-or-time");
      this.icaltype = icaltype || "date-and-or-time";
    }
    /**
     * Returns a new ICAL.VCardTime instance from a date and/or time string.
     *
     * @param {String} aValue     The string to create from
     * @param {String} aIcalType  The type for this instance, e.g. date-and-or-time
     * @return {VCardTime}        The date/time instance
     */
    static fromDateAndOrTimeString(aValue, aIcalType) {
      function part(v, s, e) {
        return v ? strictParseInt(v.slice(s, s + e)) : null;
      }
      let parts = aValue.split("T");
      let dt = parts[0], tmz = parts[1];
      let splitzone = tmz ? design.vcard.value.time._splitZone(tmz) : [];
      let zone = splitzone[0], tm = splitzone[1];
      let dtlen = dt ? dt.length : 0;
      let tmlen = tm ? tm.length : 0;
      let hasDashDate = dt && dt[0] == "-" && dt[1] == "-";
      let hasDashTime = tm && tm[0] == "-";
      let o = {
        year: hasDashDate ? null : part(dt, 0, 4),
        month: hasDashDate && (dtlen == 4 || dtlen == 7) ? part(dt, 2, 2) : dtlen == 7 ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 5, 2) : null,
        day: dtlen == 5 ? part(dt, 3, 2) : dtlen == 7 && hasDashDate ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 8, 2) : null,
        hour: hasDashTime ? null : part(tm, 0, 2),
        minute: hasDashTime && tmlen == 3 ? part(tm, 1, 2) : tmlen > 4 ? hasDashTime ? part(tm, 1, 2) : part(tm, 3, 2) : null,
        second: tmlen == 4 ? part(tm, 2, 2) : tmlen == 6 ? part(tm, 4, 2) : tmlen == 8 ? part(tm, 6, 2) : null
      };
      if (zone == "Z") {
        zone = Timezone.utcTimezone;
      } else if (zone && zone[3] == ":") {
        zone = UtcOffset.fromString(zone);
      } else {
        zone = null;
      }
      return new _VCardTime(o, zone, aIcalType);
    }
    /**
     * Returns a clone of the vcard date/time object.
     *
     * @return {VCardTime}     The cloned object
     */
    clone() {
      return new _VCardTime(this._time, this.zone, this.icaltype);
    }
    _normalize() {
      return this;
    }
    /**
     * @inheritdoc
     */
    utcOffset() {
      if (this.zone instanceof UtcOffset) {
        return this.zone.toSeconds();
      } else {
        return Time.prototype.utcOffset.apply(this, arguments);
      }
    }
    /**
     * Returns an RFC 6350 compliant representation of this object.
     *
     * @return {String}         vcard date/time string
     */
    toICALString() {
      return design.vcard.value[this.icaltype].toICAL(this.toString());
    }
    /**
     * The string representation of this date/time, in jCard form
     * (including : and - separators).
     * @return {String}
     */
    toString() {
      let y = this.year, m = this.month, d = this.day;
      let h = this.hour, mm = this.minute, s = this.second;
      let hasYear = y !== null, hasMonth = m !== null, hasDay = d !== null;
      let hasHour = h !== null, hasMinute = mm !== null, hasSecond = s !== null;
      let datepart = (hasYear ? pad2(y) + (hasMonth || hasDay ? "-" : "") : hasMonth || hasDay ? "--" : "") + (hasMonth ? pad2(m) : "") + (hasDay ? "-" + pad2(d) : "");
      let timepart = (hasHour ? pad2(h) : "-") + (hasHour && hasMinute ? ":" : "") + (hasMinute ? pad2(mm) : "") + (!hasHour && !hasMinute ? "-" : "") + (hasMinute && hasSecond ? ":" : "") + (hasSecond ? pad2(s) : "");
      let zone;
      if (this.zone === Timezone.utcTimezone) {
        zone = "Z";
      } else if (this.zone instanceof UtcOffset) {
        zone = this.zone.toString();
      } else if (this.zone === Timezone.localTimezone) {
        zone = "";
      } else if (this.zone instanceof Timezone) {
        let offset = UtcOffset.fromSeconds(this.zone.utcOffset(this));
        zone = offset.toString();
      } else {
        zone = "";
      }
      switch (this.icaltype) {
        case "time":
          return timepart + zone;
        case "date-and-or-time":
        case "date-time":
          return datepart + (timepart == "--" ? "" : "T" + timepart + zone);
        case "date":
          return datepart;
      }
      return null;
    }
  };
  var _RecurIterator = class _RecurIterator {
    /**
     * Creates a new ICAL.RecurIterator instance. The options object may contain additional members
     * when resuming iteration from a previous run.
     *
     * @param {Object} options                The iterator options
     * @param {Recur} options.rule            The rule to iterate.
     * @param {Time} options.dtstart          The start date of the event.
     * @param {Boolean=} options.initialized  When true, assume that options are
     *        from a previously constructed iterator. Initialization will not be
     *        repeated.
     */
    constructor(options) {
      /**
       * True when iteration is finished.
       * @type {Boolean}
       */
      __publicField(this, "completed", false);
      /**
       * The rule that is being iterated
       * @type {Recur}
       */
      __publicField(this, "rule", null);
      /**
       * The start date of the event being iterated.
       * @type {Time}
       */
      __publicField(this, "dtstart", null);
      /**
       * The last occurrence that was returned from the
       * {@link RecurIterator#next} method.
       * @type {Time}
       */
      __publicField(this, "last", null);
      /**
       * The sequence number from the occurrence
       * @type {Number}
       */
      __publicField(this, "occurrence_number", 0);
      /**
       * The indices used for the {@link ICAL.RecurIterator#by_data} object.
       * @type {Object}
       * @private
       */
      __publicField(this, "by_indices", null);
      /**
       * If true, the iterator has already been initialized
       * @type {Boolean}
       * @private
       */
      __publicField(this, "initialized", false);
      /**
       * The initializd by-data.
       * @type {Object}
       * @private
       */
      __publicField(this, "by_data", null);
      /**
       * The expanded yeardays
       * @type {Array}
       * @private
       */
      __publicField(this, "days", null);
      /**
       * The index in the {@link ICAL.RecurIterator#days} array.
       * @type {Number}
       * @private
       */
      __publicField(this, "days_index", 0);
      this.fromData(options);
    }
    /**
     * Initialize the recurrence iterator from the passed data object. This
     * method is usually not called directly, you can initialize the iterator
     * through the constructor.
     *
     * @param {Object} options                The iterator options
     * @param {Recur} options.rule            The rule to iterate.
     * @param {Time} options.dtstart          The start date of the event.
     * @param {Boolean=} options.initialized  When true, assume that options are
     *        from a previously constructed iterator. Initialization will not be
     *        repeated.
     */
    fromData(options) {
      this.rule = formatClassType(options.rule, Recur);
      if (!this.rule) {
        throw new Error("iterator requires a (ICAL.Recur) rule");
      }
      this.dtstart = formatClassType(options.dtstart, Time);
      if (!this.dtstart) {
        throw new Error("iterator requires a (ICAL.Time) dtstart");
      }
      if (options.by_data) {
        this.by_data = options.by_data;
      } else {
        this.by_data = clone(this.rule.parts, true);
      }
      if (options.occurrence_number)
        this.occurrence_number = options.occurrence_number;
      this.days = options.days || [];
      if (options.last) {
        this.last = formatClassType(options.last, Time);
      }
      this.by_indices = options.by_indices;
      if (!this.by_indices) {
        this.by_indices = {
          "BYSECOND": 0,
          "BYMINUTE": 0,
          "BYHOUR": 0,
          "BYDAY": 0,
          "BYMONTH": 0,
          "BYWEEKNO": 0,
          "BYMONTHDAY": 0
        };
      }
      this.initialized = options.initialized || false;
      if (!this.initialized) {
        try {
          this.init();
        } catch (e) {
          if (e instanceof InvalidRecurrenceRuleError) {
            this.completed = true;
          } else {
            throw e;
          }
        }
      }
    }
    /**
     * Initialize the iterator
     * @private
     */
    init() {
      this.initialized = true;
      this.last = this.dtstart.clone();
      let parts = this.by_data;
      if ("BYDAY" in parts) {
        this.sort_byday_rules(parts.BYDAY);
      }
      if ("BYYEARDAY" in parts) {
        if ("BYMONTH" in parts || "BYWEEKNO" in parts || "BYMONTHDAY" in parts) {
          throw new Error("Invalid BYYEARDAY rule");
        }
      }
      if ("BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
        throw new Error("BYWEEKNO does not fit to BYMONTHDAY");
      }
      if (this.rule.freq == "MONTHLY" && ("BYYEARDAY" in parts || "BYWEEKNO" in parts)) {
        throw new Error("For MONTHLY recurrences neither BYYEARDAY nor BYWEEKNO may appear");
      }
      if (this.rule.freq == "WEEKLY" && ("BYYEARDAY" in parts || "BYMONTHDAY" in parts)) {
        throw new Error("For WEEKLY recurrences neither BYMONTHDAY nor BYYEARDAY may appear");
      }
      if (this.rule.freq != "YEARLY" && "BYYEARDAY" in parts) {
        throw new Error("BYYEARDAY may only appear in YEARLY rules");
      }
      this.last.second = this.setup_defaults("BYSECOND", "SECONDLY", this.dtstart.second);
      this.last.minute = this.setup_defaults("BYMINUTE", "MINUTELY", this.dtstart.minute);
      this.last.hour = this.setup_defaults("BYHOUR", "HOURLY", this.dtstart.hour);
      this.last.day = this.setup_defaults("BYMONTHDAY", "DAILY", this.dtstart.day);
      this.last.month = this.setup_defaults("BYMONTH", "MONTHLY", this.dtstart.month);
      if (this.rule.freq == "WEEKLY") {
        if ("BYDAY" in parts) {
          let [, dow] = this.ruleDayOfWeek(parts.BYDAY[0], this.rule.wkst);
          let wkdy = dow - this.last.dayOfWeek(this.rule.wkst);
          if (this.last.dayOfWeek(this.rule.wkst) < dow && wkdy >= 0 || wkdy < 0) {
            this.last.day += wkdy;
          }
        } else {
          let dayName = Recur.numericDayToIcalDay(this.dtstart.dayOfWeek());
          parts.BYDAY = [dayName];
        }
      }
      if (this.rule.freq == "YEARLY") {
        const untilYear = this.rule.until ? this.rule.until.year : 2e4;
        while (this.last.year <= untilYear) {
          this.expand_year_days(this.last.year);
          if (this.days.length > 0) {
            break;
          }
          this.increment_year(this.rule.interval);
        }
        if (this.days.length == 0) {
          throw new InvalidRecurrenceRuleError();
        }
        if (!this._nextByYearDay() && !this.next_year() && !this.next_year() && !this.next_year()) {
          throw new InvalidRecurrenceRuleError();
        }
      }
      if (this.rule.freq == "MONTHLY") {
        if (this.has_by_data("BYDAY")) {
          let tempLast = null;
          let initLast = this.last.clone();
          let daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
          for (let bydow of this.by_data.BYDAY) {
            this.last = initLast.clone();
            let [pos, dow] = this.ruleDayOfWeek(bydow);
            let dayOfMonth = this.last.nthWeekDay(dow, pos);
            if (pos >= 6 || pos <= -6) {
              throw new Error("Malformed values in BYDAY part");
            }
            if (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
              if (tempLast && tempLast.month == initLast.month) {
                continue;
              }
              while (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
                this.increment_month();
                daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
                dayOfMonth = this.last.nthWeekDay(dow, pos);
              }
            }
            this.last.day = dayOfMonth;
            if (!tempLast || this.last.compare(tempLast) < 0) {
              tempLast = this.last.clone();
            }
          }
          this.last = tempLast.clone();
          if (this.has_by_data("BYMONTHDAY")) {
            this._byDayAndMonthDay(true);
          }
          if (this.last.day > daysInMonth || this.last.day == 0) {
            throw new Error("Malformed values in BYDAY part");
          }
        } else if (this.has_by_data("BYMONTHDAY")) {
          this.last.day = 1;
          let normalized = this.normalizeByMonthDayRules(
            this.last.year,
            this.last.month,
            this.rule.parts.BYMONTHDAY
          ).filter((d) => d >= this.last.day);
          if (normalized.length) {
            this.last.day = normalized[0];
            this.by_data.BYMONTHDAY = normalized;
          } else {
            if (!this.next_month() && !this.next_month() && !this.next_month()) {
              throw new InvalidRecurrenceRuleError();
            }
          }
        }
      }
    }
    /**
     * Retrieve the next occurrence from the iterator.
     * @return {Time}
     */
    next(again = false) {
      let before = this.last ? this.last.clone() : null;
      if (this.rule.count && this.occurrence_number >= this.rule.count || this.rule.until && this.last.compare(this.rule.until) > 0) {
        this.completed = true;
      }
      if (this.completed) {
        return null;
      }
      if (this.occurrence_number == 0 && this.last.compare(this.dtstart) >= 0) {
        this.occurrence_number++;
        return this.last;
      }
      let valid;
      let invalid_count = 0;
      do {
        valid = 1;
        switch (this.rule.freq) {
          case "SECONDLY":
            this.next_second();
            break;
          case "MINUTELY":
            this.next_minute();
            break;
          case "HOURLY":
            this.next_hour();
            break;
          case "DAILY":
            this.next_day();
            break;
          case "WEEKLY":
            this.next_week();
            break;
          case "MONTHLY":
            valid = this.next_month();
            if (valid) {
              invalid_count = 0;
            } else if (++invalid_count == 336) {
              this.completed = true;
              return null;
            }
            break;
          case "YEARLY":
            valid = this.next_year();
            if (valid) {
              invalid_count = 0;
            } else if (++invalid_count == 28) {
              this.completed = true;
              return null;
            }
            break;
          default:
            return null;
        }
      } while (!this.check_contracting_rules() || this.last.compare(this.dtstart) < 0 || !valid);
      if (this.last.compare(before) == 0) {
        if (again) {
          throw new Error("Same occurrence found twice, protecting you from death by recursion");
        }
        this.next(true);
      }
      if (this.rule.until && this.last.compare(this.rule.until) > 0) {
        this.completed = true;
        return null;
      } else {
        this.occurrence_number++;
        return this.last;
      }
    }
    next_second() {
      return this.next_generic("BYSECOND", "SECONDLY", "second", "minute");
    }
    increment_second(inc) {
      return this.increment_generic(inc, "second", 60, "minute");
    }
    next_minute() {
      return this.next_generic(
        "BYMINUTE",
        "MINUTELY",
        "minute",
        "hour",
        "next_second"
      );
    }
    increment_minute(inc) {
      return this.increment_generic(inc, "minute", 60, "hour");
    }
    next_hour() {
      return this.next_generic(
        "BYHOUR",
        "HOURLY",
        "hour",
        "monthday",
        "next_minute"
      );
    }
    increment_hour(inc) {
      this.increment_generic(inc, "hour", 24, "monthday");
    }
    next_day() {
      let this_freq = this.rule.freq == "DAILY";
      if (this.next_hour() == 0) {
        return 0;
      }
      if (this_freq) {
        this.increment_monthday(this.rule.interval);
      } else {
        this.increment_monthday(1);
      }
      return 0;
    }
    next_week() {
      let end_of_data = 0;
      if (this.next_weekday_by_week() == 0) {
        return end_of_data;
      }
      if (this.has_by_data("BYWEEKNO")) {
        this.by_indices.BYWEEKNO++;
        if (this.by_indices.BYWEEKNO == this.by_data.BYWEEKNO.length) {
          this.by_indices.BYWEEKNO = 0;
          end_of_data = 1;
        }
        this.last.month = 1;
        this.last.day = 1;
        let week_no = this.by_data.BYWEEKNO[this.by_indices.BYWEEKNO];
        this.last.day += 7 * week_no;
        if (end_of_data) {
          this.increment_year(1);
        }
      } else {
        this.increment_monthday(7 * this.rule.interval);
      }
      return end_of_data;
    }
    /**
     * Normalize each by day rule for a given year/month.
     * Takes into account ordering and negative rules
     *
     * @private
     * @param {Number} year         Current year.
     * @param {Number} month        Current month.
     * @param {Array}  rules        Array of rules.
     *
     * @return {Array} sorted and normalized rules.
     *                 Negative rules will be expanded to their
     *                 correct positive values for easier processing.
     */
    normalizeByMonthDayRules(year, month, rules) {
      let daysInMonth = Time.daysInMonth(month, year);
      let newRules = [];
      let ruleIdx = 0;
      let len = rules.length;
      let rule;
      for (; ruleIdx < len; ruleIdx++) {
        rule = parseInt(rules[ruleIdx], 10);
        if (isNaN(rule)) {
          throw new Error("Invalid BYMONTHDAY value");
        }
        if (Math.abs(rule) > daysInMonth) {
          continue;
        }
        if (rule < 0) {
          rule = daysInMonth + (rule + 1);
        } else if (rule === 0) {
          continue;
        }
        if (newRules.indexOf(rule) === -1) {
          newRules.push(rule);
        }
      }
      return newRules.sort(function(a, b) {
        return a - b;
      });
    }
    /**
     * NOTES:
     * We are given a list of dates in the month (BYMONTHDAY) (23, etc..)
     * Also we are given a list of days (BYDAY) (MO, 2SU, etc..) when
     * both conditions match a given date (this.last.day) iteration stops.
     *
     * @private
     * @param {Boolean=} isInit     When given true will not increment the
     *                                current day (this.last).
     */
    _byDayAndMonthDay(isInit) {
      let byMonthDay;
      let byDay = this.by_data.BYDAY;
      let date;
      let dateIdx = 0;
      let dateLen;
      let dayLen = byDay.length;
      let dataIsValid = 0;
      let daysInMonth;
      let self2 = this;
      let lastDay = this.last.day;
      function initMonth() {
        daysInMonth = Time.daysInMonth(
          self2.last.month,
          self2.last.year
        );
        byMonthDay = self2.normalizeByMonthDayRules(
          self2.last.year,
          self2.last.month,
          self2.by_data.BYMONTHDAY
        );
        dateLen = byMonthDay.length;
        while (byMonthDay[dateIdx] <= lastDay && !(isInit && byMonthDay[dateIdx] == lastDay) && dateIdx < dateLen - 1) {
          dateIdx++;
        }
      }
      function nextMonth() {
        lastDay = 0;
        self2.increment_month();
        dateIdx = 0;
        initMonth();
      }
      initMonth();
      if (isInit) {
        lastDay -= 1;
      }
      let monthsCounter = 48;
      while (!dataIsValid && monthsCounter) {
        monthsCounter--;
        date = lastDay + 1;
        if (date > daysInMonth) {
          nextMonth();
          continue;
        }
        let next = byMonthDay[dateIdx++];
        if (next >= date) {
          lastDay = next;
        } else {
          nextMonth();
          continue;
        }
        for (let dayIdx = 0; dayIdx < dayLen; dayIdx++) {
          let parts = this.ruleDayOfWeek(byDay[dayIdx]);
          let pos = parts[0];
          let dow = parts[1];
          this.last.day = lastDay;
          if (this.last.isNthWeekDay(dow, pos)) {
            dataIsValid = 1;
            break;
          }
        }
        if (!dataIsValid && dateIdx === dateLen) {
          nextMonth();
          continue;
        }
      }
      if (monthsCounter <= 0) {
        throw new Error("Malformed values in BYDAY combined with BYMONTHDAY parts");
      }
      return dataIsValid;
    }
    next_month() {
      let data_valid = 1;
      if (this.next_hour() == 0) {
        return data_valid;
      }
      if (this.has_by_data("BYDAY") && this.has_by_data("BYMONTHDAY")) {
        data_valid = this._byDayAndMonthDay();
      } else if (this.has_by_data("BYDAY")) {
        let daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
        let setpos = 0;
        let setpos_total = 0;
        if (this.has_by_data("BYSETPOS")) {
          let last_day = this.last.day;
          for (let day2 = 1; day2 <= daysInMonth; day2++) {
            this.last.day = day2;
            if (this.is_day_in_byday(this.last)) {
              setpos_total++;
              if (day2 <= last_day) {
                setpos++;
              }
            }
          }
          this.last.day = last_day;
        }
        data_valid = 0;
        let day;
        for (day = this.last.day + 1; day <= daysInMonth; day++) {
          this.last.day = day;
          if (this.is_day_in_byday(this.last)) {
            if (!this.has_by_data("BYSETPOS") || this.check_set_position(++setpos) || this.check_set_position(setpos - setpos_total - 1)) {
              data_valid = 1;
              break;
            }
          }
        }
        if (day > daysInMonth) {
          this.last.day = 1;
          this.increment_month();
          if (this.is_day_in_byday(this.last)) {
            if (!this.has_by_data("BYSETPOS") || this.check_set_position(1)) {
              data_valid = 1;
            }
          } else {
            data_valid = 0;
          }
        }
      } else if (this.has_by_data("BYMONTHDAY")) {
        this.by_indices.BYMONTHDAY++;
        if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
          this.by_indices.BYMONTHDAY = 0;
          this.increment_month();
          if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
            return 0;
          }
        }
        let daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
        let day = this.by_data.BYMONTHDAY[this.by_indices.BYMONTHDAY];
        if (day < 0) {
          day = daysInMonth + day + 1;
        }
        if (day > daysInMonth) {
          this.last.day = 1;
          data_valid = this.is_day_in_byday(this.last);
        } else {
          this.last.day = day;
        }
      } else {
        this.increment_month();
        let daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
        if (this.by_data.BYMONTHDAY[0] > daysInMonth) {
          data_valid = 0;
        } else {
          this.last.day = this.by_data.BYMONTHDAY[0];
        }
      }
      return data_valid;
    }
    next_weekday_by_week() {
      let end_of_data = 0;
      if (this.next_hour() == 0) {
        return end_of_data;
      }
      if (!this.has_by_data("BYDAY")) {
        return 1;
      }
      for (; ; ) {
        let tt = new Time();
        this.by_indices.BYDAY++;
        if (this.by_indices.BYDAY == Object.keys(this.by_data.BYDAY).length) {
          this.by_indices.BYDAY = 0;
          end_of_data = 1;
        }
        let coded_day = this.by_data.BYDAY[this.by_indices.BYDAY];
        let parts = this.ruleDayOfWeek(coded_day);
        let dow = parts[1];
        dow -= this.rule.wkst;
        if (dow < 0) {
          dow += 7;
        }
        tt.year = this.last.year;
        tt.month = this.last.month;
        tt.day = this.last.day;
        let startOfWeek = tt.startDoyWeek(this.rule.wkst);
        if (dow + startOfWeek < 1) {
          if (!end_of_data) {
            continue;
          }
        }
        let next = Time.fromDayOfYear(startOfWeek + dow, this.last.year);
        this.last.year = next.year;
        this.last.month = next.month;
        this.last.day = next.day;
        return end_of_data;
      }
    }
    next_year() {
      if (this.next_hour() == 0) {
        return 0;
      }
      if (this.days.length == 0 || ++this.days_index == this.days.length) {
        this.days_index = 0;
        this.increment_year(this.rule.interval);
        if (this.has_by_data("BYMONTHDAY")) {
          this.by_data.BYMONTHDAY = this.normalizeByMonthDayRules(
            this.last.year,
            this.last.month,
            this.rule.parts.BYMONTHDAY
          );
        }
        this.expand_year_days(this.last.year);
        if (this.days.length == 0) {
          return 0;
        }
      }
      return this._nextByYearDay();
    }
    _nextByYearDay() {
      let doy = this.days[this.days_index];
      let year = this.last.year;
      if (Math.abs(doy) == 366 && !Time.isLeapYear(this.last.year)) {
        return 0;
      }
      if (doy < 1) {
        doy += 1;
        year += 1;
      }
      let next = Time.fromDayOfYear(doy, year);
      this.last.day = next.day;
      this.last.month = next.month;
      return 1;
    }
    /**
     * @param dow (eg: '1TU', '-1MO')
     * @param {weekDay=} aWeekStart The week start weekday
     * @return [pos, numericDow] (eg: [1, 3]) numericDow is relative to aWeekStart
     */
    ruleDayOfWeek(dow, aWeekStart) {
      let matches = dow.match(/([+-]?[0-9])?(MO|TU|WE|TH|FR|SA|SU)/);
      if (matches) {
        let pos = parseInt(matches[1] || 0, 10);
        dow = Recur.icalDayToNumericDay(matches[2], aWeekStart);
        return [pos, dow];
      } else {
        return [0, 0];
      }
    }
    next_generic(aRuleType, aInterval, aDateAttr, aFollowingAttr, aPreviousIncr) {
      let has_by_rule = aRuleType in this.by_data;
      let this_freq = this.rule.freq == aInterval;
      let end_of_data = 0;
      if (aPreviousIncr && this[aPreviousIncr]() == 0) {
        return end_of_data;
      }
      if (has_by_rule) {
        this.by_indices[aRuleType]++;
        let dta = this.by_data[aRuleType];
        if (this.by_indices[aRuleType] == dta.length) {
          this.by_indices[aRuleType] = 0;
          end_of_data = 1;
        }
        this.last[aDateAttr] = dta[this.by_indices[aRuleType]];
      } else if (this_freq) {
        this["increment_" + aDateAttr](this.rule.interval);
      }
      if (has_by_rule && end_of_data && this_freq) {
        this["increment_" + aFollowingAttr](1);
      }
      return end_of_data;
    }
    increment_monthday(inc) {
      for (let i = 0; i < inc; i++) {
        let daysInMonth = Time.daysInMonth(this.last.month, this.last.year);
        this.last.day++;
        if (this.last.day > daysInMonth) {
          this.last.day -= daysInMonth;
          this.increment_month();
        }
      }
    }
    increment_month() {
      this.last.day = 1;
      if (this.has_by_data("BYMONTH")) {
        this.by_indices.BYMONTH++;
        if (this.by_indices.BYMONTH == this.by_data.BYMONTH.length) {
          this.by_indices.BYMONTH = 0;
          this.increment_year(1);
        }
        this.last.month = this.by_data.BYMONTH[this.by_indices.BYMONTH];
      } else {
        if (this.rule.freq == "MONTHLY") {
          this.last.month += this.rule.interval;
        } else {
          this.last.month++;
        }
        this.last.month--;
        let years = trunc(this.last.month / 12);
        this.last.month %= 12;
        this.last.month++;
        if (years != 0) {
          this.increment_year(years);
        }
      }
      if (this.has_by_data("BYMONTHDAY")) {
        this.by_data.BYMONTHDAY = this.normalizeByMonthDayRules(
          this.last.year,
          this.last.month,
          this.rule.parts.BYMONTHDAY
        );
      }
    }
    increment_year(inc) {
      this.last.day = 1;
      this.last.year += inc;
    }
    increment_generic(inc, aDateAttr, aFactor, aNextIncrement) {
      this.last[aDateAttr] += inc;
      let nextunit = trunc(this.last[aDateAttr] / aFactor);
      this.last[aDateAttr] %= aFactor;
      if (nextunit != 0) {
        this["increment_" + aNextIncrement](nextunit);
      }
    }
    has_by_data(aRuleType) {
      return aRuleType in this.rule.parts;
    }
    expand_year_days(aYear) {
      let t = new Time();
      this.days = [];
      let parts = {};
      let rules = ["BYDAY", "BYWEEKNO", "BYMONTHDAY", "BYMONTH", "BYYEARDAY"];
      for (let part of rules) {
        if (part in this.rule.parts) {
          parts[part] = this.rule.parts[part];
        }
      }
      if ("BYMONTH" in parts && "BYWEEKNO" in parts) {
        let valid = 1;
        let validWeeks = {};
        t.year = aYear;
        t.isDate = true;
        for (let monthIdx = 0; monthIdx < this.by_data.BYMONTH.length; monthIdx++) {
          let month = this.by_data.BYMONTH[monthIdx];
          t.month = month;
          t.day = 1;
          let first_week = t.weekNumber(this.rule.wkst);
          t.day = Time.daysInMonth(month, aYear);
          let last_week = t.weekNumber(this.rule.wkst);
          for (monthIdx = first_week; monthIdx < last_week; monthIdx++) {
            validWeeks[monthIdx] = 1;
          }
        }
        for (let weekIdx = 0; weekIdx < this.by_data.BYWEEKNO.length && valid; weekIdx++) {
          let weekno = this.by_data.BYWEEKNO[weekIdx];
          if (weekno < 52) {
            valid &= validWeeks[weekIdx];
          } else {
            valid = 0;
          }
        }
        if (valid) {
          delete parts.BYMONTH;
        } else {
          delete parts.BYWEEKNO;
        }
      }
      let partCount = Object.keys(parts).length;
      if (partCount == 0) {
        let t1 = this.dtstart.clone();
        t1.year = this.last.year;
        this.days.push(t1.dayOfYear());
      } else if (partCount == 1 && "BYMONTH" in parts) {
        for (let month of this.by_data.BYMONTH) {
          let t2 = this.dtstart.clone();
          t2.year = aYear;
          t2.month = month;
          t2.isDate = true;
          this.days.push(t2.dayOfYear());
        }
      } else if (partCount == 1 && "BYMONTHDAY" in parts) {
        for (let monthday of this.by_data.BYMONTHDAY) {
          let t3 = this.dtstart.clone();
          if (monthday < 0) {
            let daysInMonth = Time.daysInMonth(t3.month, aYear);
            monthday = monthday + daysInMonth + 1;
          }
          t3.day = monthday;
          t3.year = aYear;
          t3.isDate = true;
          this.days.push(t3.dayOfYear());
        }
      } else if (partCount == 2 && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
        for (let month of this.by_data.BYMONTH) {
          let daysInMonth = Time.daysInMonth(month, aYear);
          for (let monthday of this.by_data.BYMONTHDAY) {
            if (monthday < 0) {
              monthday = monthday + daysInMonth + 1;
            }
            t.day = monthday;
            t.month = month;
            t.year = aYear;
            t.isDate = true;
            this.days.push(t.dayOfYear());
          }
        }
      } else if (partCount == 1 && "BYWEEKNO" in parts) ;
      else if (partCount == 2 && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) ;
      else if (partCount == 1 && "BYDAY" in parts) {
        this.days = this.days.concat(this.expand_by_day(aYear));
      } else if (partCount == 2 && "BYDAY" in parts && "BYMONTH" in parts) {
        for (let month of this.by_data.BYMONTH) {
          let daysInMonth = Time.daysInMonth(month, aYear);
          t.year = aYear;
          t.month = month;
          t.day = 1;
          t.isDate = true;
          let first_dow = t.dayOfWeek();
          let doy_offset = t.dayOfYear() - 1;
          t.day = daysInMonth;
          let last_dow = t.dayOfWeek();
          if (this.has_by_data("BYSETPOS")) {
            let by_month_day = [];
            for (let day = 1; day <= daysInMonth; day++) {
              t.day = day;
              if (this.is_day_in_byday(t)) {
                by_month_day.push(day);
              }
            }
            for (let spIndex = 0; spIndex < by_month_day.length; spIndex++) {
              if (this.check_set_position(spIndex + 1) || this.check_set_position(spIndex - by_month_day.length)) {
                this.days.push(doy_offset + by_month_day[spIndex]);
              }
            }
          } else {
            for (let coded_day of this.by_data.BYDAY) {
              let bydayParts = this.ruleDayOfWeek(coded_day);
              let pos = bydayParts[0];
              let dow = bydayParts[1];
              let month_day;
              let first_matching_day = (dow + 7 - first_dow) % 7 + 1;
              let last_matching_day = daysInMonth - (last_dow + 7 - dow) % 7;
              if (pos == 0) {
                for (let day = first_matching_day; day <= daysInMonth; day += 7) {
                  this.days.push(doy_offset + day);
                }
              } else if (pos > 0) {
                month_day = first_matching_day + (pos - 1) * 7;
                if (month_day <= daysInMonth) {
                  this.days.push(doy_offset + month_day);
                }
              } else {
                month_day = last_matching_day + (pos + 1) * 7;
                if (month_day > 0) {
                  this.days.push(doy_offset + month_day);
                }
              }
            }
          }
        }
        this.days.sort(function(a, b) {
          return a - b;
        });
      } else if (partCount == 2 && "BYDAY" in parts && "BYMONTHDAY" in parts) {
        let expandedDays = this.expand_by_day(aYear);
        for (let day of expandedDays) {
          let tt = Time.fromDayOfYear(day, aYear);
          if (this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
            this.days.push(day);
          }
        }
      } else if (partCount == 3 && "BYDAY" in parts && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
        let expandedDays = this.expand_by_day(aYear);
        for (let day of expandedDays) {
          let tt = Time.fromDayOfYear(day, aYear);
          if (this.by_data.BYMONTH.indexOf(tt.month) >= 0 && this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
            this.days.push(day);
          }
        }
      } else if (partCount == 2 && "BYDAY" in parts && "BYWEEKNO" in parts) {
        let expandedDays = this.expand_by_day(aYear);
        for (let day of expandedDays) {
          let tt = Time.fromDayOfYear(day, aYear);
          let weekno = tt.weekNumber(this.rule.wkst);
          if (this.by_data.BYWEEKNO.indexOf(weekno)) {
            this.days.push(day);
          }
        }
      } else if (partCount == 3 && "BYDAY" in parts && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) ;
      else if (partCount == 1 && "BYYEARDAY" in parts) {
        this.days = this.days.concat(this.by_data.BYYEARDAY);
      } else if (partCount == 2 && "BYYEARDAY" in parts && "BYDAY" in parts) {
        let daysInYear2 = Time.isLeapYear(aYear) ? 366 : 365;
        let expandedDays = new Set(this.expand_by_day(aYear));
        for (let doy of this.by_data.BYYEARDAY) {
          if (doy < 0) {
            doy += daysInYear2 + 1;
          }
          if (expandedDays.has(doy)) {
            this.days.push(doy);
          }
        }
      } else {
        this.days = [];
      }
      let daysInYear = Time.isLeapYear(aYear) ? 366 : 365;
      this.days.sort((a, b) => {
        if (a < 0) a += daysInYear + 1;
        if (b < 0) b += daysInYear + 1;
        return a - b;
      });
      return 0;
    }
    expand_by_day(aYear) {
      let days_list = [];
      let tmp = this.last.clone();
      tmp.year = aYear;
      tmp.month = 1;
      tmp.day = 1;
      tmp.isDate = true;
      let start_dow = tmp.dayOfWeek();
      tmp.month = 12;
      tmp.day = 31;
      tmp.isDate = true;
      let end_dow = tmp.dayOfWeek();
      let end_year_day = tmp.dayOfYear();
      for (let day of this.by_data.BYDAY) {
        let parts = this.ruleDayOfWeek(day);
        let pos = parts[0];
        let dow = parts[1];
        if (pos == 0) {
          let tmp_start_doy = (dow + 7 - start_dow) % 7 + 1;
          for (let doy = tmp_start_doy; doy <= end_year_day; doy += 7) {
            days_list.push(doy);
          }
        } else if (pos > 0) {
          let first;
          if (dow >= start_dow) {
            first = dow - start_dow + 1;
          } else {
            first = dow - start_dow + 8;
          }
          days_list.push(first + (pos - 1) * 7);
        } else {
          let last;
          pos = -pos;
          if (dow <= end_dow) {
            last = end_year_day - end_dow + dow;
          } else {
            last = end_year_day - end_dow + dow - 7;
          }
          days_list.push(last - (pos - 1) * 7);
        }
      }
      return days_list;
    }
    is_day_in_byday(tt) {
      if (this.by_data.BYDAY) {
        for (let day of this.by_data.BYDAY) {
          let parts = this.ruleDayOfWeek(day);
          let pos = parts[0];
          let dow = parts[1];
          let this_dow = tt.dayOfWeek();
          if (pos == 0 && dow == this_dow || tt.nthWeekDay(dow, pos) == tt.day) {
            return 1;
          }
        }
      }
      return 0;
    }
    /**
     * Checks if given value is in BYSETPOS.
     *
     * @private
     * @param {Numeric} aPos position to check for.
     * @return {Boolean} false unless BYSETPOS rules exist
     *                   and the given value is present in rules.
     */
    check_set_position(aPos) {
      if (this.has_by_data("BYSETPOS")) {
        let idx = this.by_data.BYSETPOS.indexOf(aPos);
        return idx !== -1;
      }
      return false;
    }
    sort_byday_rules(aRules) {
      for (let i = 0; i < aRules.length; i++) {
        for (let j = 0; j < i; j++) {
          let one = this.ruleDayOfWeek(aRules[j], this.rule.wkst)[1];
          let two = this.ruleDayOfWeek(aRules[i], this.rule.wkst)[1];
          if (one > two) {
            let tmp = aRules[i];
            aRules[i] = aRules[j];
            aRules[j] = tmp;
          }
        }
      }
    }
    check_contract_restriction(aRuleType, v) {
      let indexMapValue = _RecurIterator._indexMap[aRuleType];
      let ruleMapValue = _RecurIterator._expandMap[this.rule.freq][indexMapValue];
      let pass = false;
      if (aRuleType in this.by_data && ruleMapValue == _RecurIterator.CONTRACT) {
        let ruleType = this.by_data[aRuleType];
        for (let bydata of ruleType) {
          if (bydata == v) {
            pass = true;
            break;
          }
        }
      } else {
        pass = true;
      }
      return pass;
    }
    check_contracting_rules() {
      let dow = this.last.dayOfWeek();
      let weekNo = this.last.weekNumber(this.rule.wkst);
      let doy = this.last.dayOfYear();
      return this.check_contract_restriction("BYSECOND", this.last.second) && this.check_contract_restriction("BYMINUTE", this.last.minute) && this.check_contract_restriction("BYHOUR", this.last.hour) && this.check_contract_restriction("BYDAY", Recur.numericDayToIcalDay(dow)) && this.check_contract_restriction("BYWEEKNO", weekNo) && this.check_contract_restriction("BYMONTHDAY", this.last.day) && this.check_contract_restriction("BYMONTH", this.last.month) && this.check_contract_restriction("BYYEARDAY", doy);
    }
    setup_defaults(aRuleType, req, deftime) {
      let indexMapValue = _RecurIterator._indexMap[aRuleType];
      let ruleMapValue = _RecurIterator._expandMap[this.rule.freq][indexMapValue];
      if (ruleMapValue != _RecurIterator.CONTRACT) {
        if (!(aRuleType in this.by_data)) {
          this.by_data[aRuleType] = [deftime];
        }
        if (this.rule.freq != req) {
          return this.by_data[aRuleType][0];
        }
      }
      return deftime;
    }
    /**
     * Convert iterator into a serialize-able object.  Will preserve current
     * iteration sequence to ensure the seamless continuation of the recurrence
     * rule.
     * @return {Object}
     */
    toJSON() {
      let result = /* @__PURE__ */ Object.create(null);
      result.initialized = this.initialized;
      result.rule = this.rule.toJSON();
      result.dtstart = this.dtstart.toJSON();
      result.by_data = this.by_data;
      result.days = this.days;
      result.last = this.last.toJSON();
      result.by_indices = this.by_indices;
      result.occurrence_number = this.occurrence_number;
      return result;
    }
  };
  __publicField(_RecurIterator, "_indexMap", {
    "BYSECOND": 0,
    "BYMINUTE": 1,
    "BYHOUR": 2,
    "BYDAY": 3,
    "BYMONTHDAY": 4,
    "BYYEARDAY": 5,
    "BYWEEKNO": 6,
    "BYMONTH": 7,
    "BYSETPOS": 8
  });
  __publicField(_RecurIterator, "_expandMap", {
    "SECONDLY": [1, 1, 1, 1, 1, 1, 1, 1],
    "MINUTELY": [2, 1, 1, 1, 1, 1, 1, 1],
    "HOURLY": [2, 2, 1, 1, 1, 1, 1, 1],
    "DAILY": [2, 2, 2, 1, 1, 1, 1, 1],
    "WEEKLY": [2, 2, 2, 2, 3, 3, 1, 1],
    "MONTHLY": [2, 2, 2, 2, 2, 3, 3, 1],
    "YEARLY": [2, 2, 2, 2, 2, 2, 2, 2]
  });
  __publicField(_RecurIterator, "UNKNOWN", 0);
  __publicField(_RecurIterator, "CONTRACT", 1);
  __publicField(_RecurIterator, "EXPAND", 2);
  __publicField(_RecurIterator, "ILLEGAL", 3);
  var RecurIterator = _RecurIterator;
  var InvalidRecurrenceRuleError = class extends Error {
    constructor() {
      super("Recurrence rule has no valid occurrences");
    }
  };
  var VALID_DAY_NAMES = /^(SU|MO|TU|WE|TH|FR|SA)$/;
  var VALID_BYDAY_PART = /^([+-])?(5[0-3]|[1-4][0-9]|[1-9])?(SU|MO|TU|WE|TH|FR|SA)$/;
  var DOW_MAP = {
    SU: Time.SUNDAY,
    MO: Time.MONDAY,
    TU: Time.TUESDAY,
    WE: Time.WEDNESDAY,
    TH: Time.THURSDAY,
    FR: Time.FRIDAY,
    SA: Time.SATURDAY
  };
  var REVERSE_DOW_MAP = Object.fromEntries(Object.entries(DOW_MAP).map((entry) => entry.reverse()));
  var ALLOWED_FREQ = [
    "SECONDLY",
    "MINUTELY",
    "HOURLY",
    "DAILY",
    "WEEKLY",
    "MONTHLY",
    "YEARLY"
  ];
  var Recur = class _Recur {
    /**
     * Create a new instance of the Recur class.
     *
     * @param {Object} data                               An object with members of the recurrence
     * @param {frequencyValues=} data.freq                The frequency value
     * @param {Number=} data.interval                     The INTERVAL value
     * @param {weekDay=} data.wkst                        The week start value
     * @param {Time=} data.until                          The end of the recurrence set
     * @param {Number=} data.count                        The number of occurrences
     * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
     * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
     * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
     * @param {Array.<String>=} data.byday                The BYDAY values
     * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
     * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
     * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
     * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
     * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
     */
    constructor(data) {
      /**
       * An object holding the BY-parts of the recurrence rule
       * @memberof ICAL.Recur
       * @typedef {Object} byParts
       * @property {Array.<Number>=} BYSECOND            The seconds for the BYSECOND part
       * @property {Array.<Number>=} BYMINUTE            The minutes for the BYMINUTE part
       * @property {Array.<Number>=} BYHOUR              The hours for the BYHOUR part
       * @property {Array.<String>=} BYDAY               The BYDAY values
       * @property {Array.<Number>=} BYMONTHDAY          The days for the BYMONTHDAY part
       * @property {Array.<Number>=} BYYEARDAY           The days for the BYYEARDAY part
       * @property {Array.<Number>=} BYWEEKNO            The weeks for the BYWEEKNO part
       * @property {Array.<Number>=} BYMONTH             The month for the BYMONTH part
       * @property {Array.<Number>=} BYSETPOS            The positionals for the BYSETPOS part
       */
      /**
       * An object holding the BY-parts of the recurrence rule
       * @type {byParts}
       */
      __publicField(this, "parts", null);
      /**
       * The interval value for the recurrence rule.
       * @type {Number}
       */
      __publicField(this, "interval", 1);
      /**
       * The week start day
       *
       * @type {weekDay}
       * @default ICAL.Time.MONDAY
       */
      __publicField(this, "wkst", Time.MONDAY);
      /**
       * The end of the recurrence
       * @type {?Time}
       */
      __publicField(this, "until", null);
      /**
       * The maximum number of occurrences
       * @type {?Number}
       */
      __publicField(this, "count", null);
      /**
       * The frequency value.
       * @type {frequencyValues}
       */
      __publicField(this, "freq", null);
      /**
       * The class identifier.
       * @constant
       * @type {String}
       * @default "icalrecur"
       */
      __publicField(this, "icalclass", "icalrecur");
      /**
       * The type name, to be used in the jCal object.
       * @constant
       * @type {String}
       * @default "recur"
       */
      __publicField(this, "icaltype", "recur");
      this.wrappedJSObject = this;
      this.parts = {};
      if (data && typeof data === "object") {
        this.fromData(data);
      }
    }
    /**
     * Creates a new {@link ICAL.Recur} instance from the passed string.
     *
     * @param {String} string         The string to parse
     * @return {Recur}                The created recurrence instance
     */
    static fromString(string) {
      let data = this._stringToData(string, false);
      return new _Recur(data);
    }
    /**
     * Creates a new {@link ICAL.Recur} instance using members from the passed
     * data object.
     *
     * @param {Object} aData                              An object with members of the recurrence
     * @param {frequencyValues=} aData.freq               The frequency value
     * @param {Number=} aData.interval                    The INTERVAL value
     * @param {weekDay=} aData.wkst                       The week start value
     * @param {Time=} aData.until                         The end of the recurrence set
     * @param {Number=} aData.count                       The number of occurrences
     * @param {Array.<Number>=} aData.bysecond            The seconds for the BYSECOND part
     * @param {Array.<Number>=} aData.byminute            The minutes for the BYMINUTE part
     * @param {Array.<Number>=} aData.byhour              The hours for the BYHOUR part
     * @param {Array.<String>=} aData.byday               The BYDAY values
     * @param {Array.<Number>=} aData.bymonthday          The days for the BYMONTHDAY part
     * @param {Array.<Number>=} aData.byyearday           The days for the BYYEARDAY part
     * @param {Array.<Number>=} aData.byweekno            The weeks for the BYWEEKNO part
     * @param {Array.<Number>=} aData.bymonth             The month for the BYMONTH part
     * @param {Array.<Number>=} aData.bysetpos            The positionals for the BYSETPOS part
     */
    static fromData(aData) {
      return new _Recur(aData);
    }
    /**
     * Converts a recurrence string to a data object, suitable for the fromData
     * method.
     *
     * @private
     * @param {String} string     The string to parse
     * @param {Boolean} fmtIcal   If true, the string is considered to be an
     *                              iCalendar string
     * @return {Recur}            The recurrence instance
     */
    static _stringToData(string, fmtIcal) {
      let dict = /* @__PURE__ */ Object.create(null);
      let values3 = string.split(";");
      let len = values3.length;
      for (let i = 0; i < len; i++) {
        let parts = values3[i].split("=");
        let ucname = parts[0].toUpperCase();
        let lcname = parts[0].toLowerCase();
        let name = fmtIcal ? lcname : ucname;
        let value = parts[1];
        if (ucname in partDesign) {
          let partArr = value.split(",");
          let partSet = /* @__PURE__ */ new Set();
          for (let part of partArr) {
            partSet.add(partDesign[ucname](part));
          }
          partArr = [...partSet];
          dict[name] = partArr.length == 1 ? partArr[0] : partArr;
        } else if (ucname in optionDesign) {
          optionDesign[ucname](value, dict, fmtIcal);
        } else {
          dict[lcname] = value;
        }
      }
      return dict;
    }
    /**
     * Convert an ical representation of a day (SU, MO, etc..)
     * into a numeric value of that day.
     *
     * @param {String} string     The iCalendar day name
     * @param {weekDay=} aWeekStart
     *        The week start weekday, defaults to SUNDAY
     * @return {Number}           Numeric value of given day
     */
    static icalDayToNumericDay(string, aWeekStart) {
      let firstDow = aWeekStart || Time.SUNDAY;
      return (DOW_MAP[string] - firstDow + 7) % 7 + 1;
    }
    /**
     * Convert a numeric day value into its ical representation (SU, MO, etc..)
     *
     * @param {Number} num        Numeric value of given day
     * @param {weekDay=} aWeekStart
     *        The week start weekday, defaults to SUNDAY
     * @return {String}           The ICAL day value, e.g SU,MO,...
     */
    static numericDayToIcalDay(num, aWeekStart) {
      let firstDow = aWeekStart || Time.SUNDAY;
      let dow = num + firstDow - Time.SUNDAY;
      if (dow > 7) {
        dow -= 7;
      }
      return REVERSE_DOW_MAP[dow];
    }
    /**
     * Create a new iterator for this recurrence rule. The passed start date
     * must be the start date of the event, not the start of the range to
     * search in.
     *
     * @example
     * let recur = comp.getFirstPropertyValue('rrule');
     * let dtstart = comp.getFirstPropertyValue('dtstart');
     * let iter = recur.iterator(dtstart);
     * for (let next = iter.next(); next; next = iter.next()) {
     *   if (next.compare(rangeStart) < 0) {
     *     continue;
     *   }
     *   console.log(next.toString());
     * }
     *
     * @param {Time} aStart        The item's start date
     * @return {RecurIterator}     The recurrence iterator
     */
    iterator(aStart) {
      return new RecurIterator({
        rule: this,
        dtstart: aStart
      });
    }
    /**
     * Returns a clone of the recurrence object.
     *
     * @return {Recur}      The cloned object
     */
    clone() {
      return new _Recur(this.toJSON());
    }
    /**
     * Checks if the current rule is finite, i.e. has a count or until part.
     *
     * @return {Boolean}        True, if the rule is finite
     */
    isFinite() {
      return !!(this.count || this.until);
    }
    /**
     * Checks if the current rule has a count part, and not limited by an until
     * part.
     *
     * @return {Boolean}        True, if the rule is by count
     */
    isByCount() {
      return !!(this.count && !this.until);
    }
    /**
     * Adds a component (part) to the recurrence rule. This is not a component
     * in the sense of {@link ICAL.Component}, but a part of the recurrence
     * rule, i.e. BYMONTH.
     *
     * @param {String} aType            The name of the component part
     * @param {Array|String} aValue     The component value
     */
    addComponent(aType, aValue) {
      let ucname = aType.toUpperCase();
      if (ucname in this.parts) {
        this.parts[ucname].push(aValue);
      } else {
        this.parts[ucname] = [aValue];
      }
    }
    /**
     * Sets the component value for the given by-part.
     *
     * @param {String} aType        The component part name
     * @param {Array} aValues       The component values
     */
    setComponent(aType, aValues) {
      this.parts[aType.toUpperCase()] = aValues.slice();
    }
    /**
     * Gets (a copy) of the requested component value.
     *
     * @param {String} aType        The component part name
     * @return {Array}              The component part value
     */
    getComponent(aType) {
      let ucname = aType.toUpperCase();
      return ucname in this.parts ? this.parts[ucname].slice() : [];
    }
    /**
     * Retrieves the next occurrence after the given recurrence id. See the
     * guide on {@tutorial terminology} for more details.
     *
     * NOTE: Currently, this method iterates all occurrences from the start
     * date. It should not be called in a loop for performance reasons. If you
     * would like to get more than one occurrence, you can iterate the
     * occurrences manually, see the example on the
     * {@link ICAL.Recur#iterator iterator} method.
     *
     * @param {Time} aStartTime        The start of the event series
     * @param {Time} aRecurrenceId     The date of the last occurrence
     * @return {Time}                  The next occurrence after
     */
    getNextOccurrence(aStartTime, aRecurrenceId) {
      let iter = this.iterator(aStartTime);
      let next;
      do {
        next = iter.next();
      } while (next && next.compare(aRecurrenceId) <= 0);
      if (next && aRecurrenceId.zone) {
        next.zone = aRecurrenceId.zone;
      }
      return next;
    }
    /**
     * Sets up the current instance using members from the passed data object.
     *
     * @param {Object} data                               An object with members of the recurrence
     * @param {frequencyValues=} data.freq                The frequency value
     * @param {Number=} data.interval                     The INTERVAL value
     * @param {weekDay=} data.wkst                        The week start value
     * @param {Time=} data.until                          The end of the recurrence set
     * @param {Number=} data.count                        The number of occurrences
     * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
     * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
     * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
     * @param {Array.<String>=} data.byday                The BYDAY values
     * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
     * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
     * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
     * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
     * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
     */
    fromData(data) {
      for (let key in data) {
        let uckey = key.toUpperCase();
        if (uckey in partDesign) {
          if (Array.isArray(data[key])) {
            this.parts[uckey] = data[key];
          } else {
            this.parts[uckey] = [data[key]];
          }
        } else {
          this[key] = data[key];
        }
      }
      if (this.interval && typeof this.interval != "number") {
        optionDesign.INTERVAL(this.interval, this);
      }
      if (this.wkst && typeof this.wkst != "number") {
        this.wkst = _Recur.icalDayToNumericDay(this.wkst);
      }
      if (this.until && !(this.until instanceof Time)) {
        this.until = Time.fromString(this.until);
      }
    }
    /**
     * The jCal representation of this recurrence type.
     * @return {Object}
     */
    toJSON() {
      let res = /* @__PURE__ */ Object.create(null);
      res.freq = this.freq;
      if (this.count) {
        res.count = this.count;
      }
      if (this.interval > 1) {
        res.interval = this.interval;
      }
      for (let [k, kparts] of Object.entries(this.parts)) {
        if (Array.isArray(kparts) && kparts.length == 1) {
          res[k.toLowerCase()] = kparts[0];
        } else {
          res[k.toLowerCase()] = clone(kparts);
        }
      }
      if (this.until) {
        res.until = this.until.toString();
      }
      if ("wkst" in this && this.wkst !== Time.DEFAULT_WEEK_START) {
        res.wkst = _Recur.numericDayToIcalDay(this.wkst);
      }
      return res;
    }
    /**
     * The string representation of this recurrence rule.
     * @return {String}
     */
    toString() {
      let str = "FREQ=" + this.freq;
      if (this.count) {
        str += ";COUNT=" + this.count;
      }
      if (this.interval > 1) {
        str += ";INTERVAL=" + this.interval;
      }
      for (let [k, v] of Object.entries(this.parts)) {
        str += ";" + k + "=" + v;
      }
      if (this.until) {
        str += ";UNTIL=" + this.until.toICALString();
      }
      if ("wkst" in this && this.wkst !== Time.DEFAULT_WEEK_START) {
        str += ";WKST=" + _Recur.numericDayToIcalDay(this.wkst);
      }
      return str;
    }
  };
  function parseNumericValue(type, min, max, value) {
    let result = value;
    if (value[0] === "+") {
      result = value.slice(1);
    }
    result = strictParseInt(result);
    if (min !== void 0 && value < min) {
      throw new Error(
        type + ': invalid value "' + value + '" must be > ' + min
      );
    }
    if (max !== void 0 && value > max) {
      throw new Error(
        type + ': invalid value "' + value + '" must be < ' + min
      );
    }
    return result;
  }
  var optionDesign = {
    FREQ: function(value, dict, fmtIcal) {
      if (ALLOWED_FREQ.indexOf(value) !== -1) {
        dict.freq = value;
      } else {
        throw new Error(
          'invalid frequency "' + value + '" expected: "' + ALLOWED_FREQ.join(", ") + '"'
        );
      }
    },
    COUNT: function(value, dict, fmtIcal) {
      dict.count = strictParseInt(value);
    },
    INTERVAL: function(value, dict, fmtIcal) {
      dict.interval = strictParseInt(value);
      if (dict.interval < 1) {
        dict.interval = 1;
      }
    },
    UNTIL: function(value, dict, fmtIcal) {
      if (value.length > 10) {
        dict.until = design.icalendar.value["date-time"].fromICAL(value);
      } else {
        dict.until = design.icalendar.value.date.fromICAL(value);
      }
      if (!fmtIcal) {
        dict.until = Time.fromString(dict.until);
      }
    },
    WKST: function(value, dict, fmtIcal) {
      if (VALID_DAY_NAMES.test(value)) {
        dict.wkst = Recur.icalDayToNumericDay(value);
      } else {
        throw new Error('invalid WKST value "' + value + '"');
      }
    }
  };
  var partDesign = {
    BYSECOND: parseNumericValue.bind(void 0, "BYSECOND", 0, 60),
    BYMINUTE: parseNumericValue.bind(void 0, "BYMINUTE", 0, 59),
    BYHOUR: parseNumericValue.bind(void 0, "BYHOUR", 0, 23),
    BYDAY: function(value) {
      if (VALID_BYDAY_PART.test(value)) {
        return value;
      } else {
        throw new Error('invalid BYDAY value "' + value + '"');
      }
    },
    BYMONTHDAY: parseNumericValue.bind(void 0, "BYMONTHDAY", -31, 31),
    BYYEARDAY: parseNumericValue.bind(void 0, "BYYEARDAY", -366, 366),
    BYWEEKNO: parseNumericValue.bind(void 0, "BYWEEKNO", -53, 53),
    BYMONTH: parseNumericValue.bind(void 0, "BYMONTH", 1, 12),
    BYSETPOS: parseNumericValue.bind(void 0, "BYSETPOS", -366, 366)
  };
  var FROM_ICAL_NEWLINE = /\\\\|\\;|\\,|\\[Nn]/g;
  var TO_ICAL_NEWLINE = /\\|;|,|\n/g;
  var FROM_VCARD_NEWLINE = /\\\\|\\,|\\[Nn]/g;
  var TO_VCARD_NEWLINE = /\\|,|\n/g;
  function createTextType(fromNewline, toNewline) {
    let result = {
      matches: /.*/,
      fromICAL: function(aValue, structuredEscape) {
        return replaceNewline(aValue, fromNewline, structuredEscape);
      },
      toICAL: function(aValue, structuredEscape) {
        let regEx = toNewline;
        if (structuredEscape)
          regEx = new RegExp(regEx.source + "|" + structuredEscape, regEx.flags);
        return aValue.replace(regEx, function(str) {
          switch (str) {
            case "\\":
              return "\\\\";
            case ";":
              return "\\;";
            case ",":
              return "\\,";
            case "\n":
              return "\\n";
            /* c8 ignore next 2 */
            default:
              return str;
          }
        });
      }
    };
    return result;
  }
  var DEFAULT_TYPE_TEXT = { defaultType: "text" };
  var DEFAULT_TYPE_TEXT_MULTI = { defaultType: "text", multiValue: "," };
  var DEFAULT_TYPE_TEXT_STRUCTURED = { defaultType: "text", structuredValue: ";" };
  var DEFAULT_TYPE_INTEGER = { defaultType: "integer" };
  var DEFAULT_TYPE_DATETIME_DATE = { defaultType: "date-time", allowedTypes: ["date-time", "date"] };
  var DEFAULT_TYPE_DATETIME = { defaultType: "date-time" };
  var DEFAULT_TYPE_URI = { defaultType: "uri" };
  var DEFAULT_TYPE_UTCOFFSET = { defaultType: "utc-offset" };
  var DEFAULT_TYPE_RECUR = { defaultType: "recur" };
  var DEFAULT_TYPE_DATE_ANDOR_TIME = { defaultType: "date-and-or-time", allowedTypes: ["date-time", "date", "text"] };
  function replaceNewlineReplace(string) {
    switch (string) {
      case "\\\\":
        return "\\";
      case "\\;":
        return ";";
      case "\\,":
        return ",";
      case "\\n":
      case "\\N":
        return "\n";
      /* c8 ignore next 2 */
      default:
        return string;
    }
  }
  function replaceNewline(value, newline, structuredEscape) {
    if (value.indexOf("\\") === -1) {
      return value;
    }
    if (structuredEscape)
      newline = new RegExp(newline.source + "|\\\\" + structuredEscape, newline.flags);
    return value.replace(newline, replaceNewlineReplace);
  }
  var commonProperties = {
    "categories": DEFAULT_TYPE_TEXT_MULTI,
    "url": DEFAULT_TYPE_URI,
    "version": DEFAULT_TYPE_TEXT,
    "uid": DEFAULT_TYPE_TEXT
  };
  var commonValues = {
    "boolean": {
      values: ["TRUE", "FALSE"],
      fromICAL: function(aValue) {
        switch (aValue) {
          case "TRUE":
            return true;
          case "FALSE":
            return false;
          default:
            return false;
        }
      },
      toICAL: function(aValue) {
        if (aValue) {
          return "TRUE";
        }
        return "FALSE";
      }
    },
    float: {
      matches: /^[+-]?\d+\.\d+$/,
      fromICAL: function(aValue) {
        let parsed2 = parseFloat(aValue);
        if (isStrictlyNaN(parsed2)) {
          return 0;
        }
        return parsed2;
      },
      toICAL: function(aValue) {
        return String(aValue);
      }
    },
    integer: {
      fromICAL: function(aValue) {
        let parsed2 = parseInt(aValue);
        if (isStrictlyNaN(parsed2)) {
          return 0;
        }
        return parsed2;
      },
      toICAL: function(aValue) {
        return String(aValue);
      }
    },
    "utc-offset": {
      toICAL: function(aValue) {
        if (aValue.length < 7) {
          return aValue.slice(0, 3) + aValue.slice(4, 6);
        } else {
          return aValue.slice(0, 3) + aValue.slice(4, 6) + aValue.slice(7, 9);
        }
      },
      fromICAL: function(aValue) {
        if (aValue.length < 6) {
          return aValue.slice(0, 3) + ":" + aValue.slice(3, 5);
        } else {
          return aValue.slice(0, 3) + ":" + aValue.slice(3, 5) + ":" + aValue.slice(5, 7);
        }
      },
      decorate: function(aValue) {
        return UtcOffset.fromString(aValue);
      },
      undecorate: function(aValue) {
        return aValue.toString();
      }
    }
  };
  var icalParams = {
    // Although the syntax is DQUOTE uri DQUOTE, I don't think we should
    // enforce anything aside from it being a valid content line.
    //
    // At least some params require - if multi values are used - DQUOTEs
    // for each of its values - e.g. delegated-from="uri1","uri2"
    // To indicate this, I introduced the new k/v pair
    // multiValueSeparateDQuote: true
    //
    // "ALTREP": { ... },
    // CN just wants a param-value
    // "CN": { ... }
    "cutype": {
      values: ["INDIVIDUAL", "GROUP", "RESOURCE", "ROOM", "UNKNOWN"],
      allowXName: true,
      allowIanaToken: true
    },
    "delegated-from": {
      valueType: "cal-address",
      multiValue: ",",
      multiValueSeparateDQuote: true
    },
    "delegated-to": {
      valueType: "cal-address",
      multiValue: ",",
      multiValueSeparateDQuote: true
    },
    // "DIR": { ... }, // See ALTREP
    "encoding": {
      values: ["8BIT", "BASE64"]
    },
    // "FMTTYPE": { ... }, // See ALTREP
    "fbtype": {
      values: ["FREE", "BUSY", "BUSY-UNAVAILABLE", "BUSY-TENTATIVE"],
      allowXName: true,
      allowIanaToken: true
    },
    // "LANGUAGE": { ... }, // See ALTREP
    "member": {
      valueType: "cal-address",
      multiValue: ",",
      multiValueSeparateDQuote: true
    },
    "partstat": {
      // TODO These values are actually different per-component
      values: [
        "NEEDS-ACTION",
        "ACCEPTED",
        "DECLINED",
        "TENTATIVE",
        "DELEGATED",
        "COMPLETED",
        "IN-PROCESS"
      ],
      allowXName: true,
      allowIanaToken: true
    },
    "range": {
      values: ["THISANDFUTURE"]
    },
    "related": {
      values: ["START", "END"]
    },
    "reltype": {
      values: ["PARENT", "CHILD", "SIBLING"],
      allowXName: true,
      allowIanaToken: true
    },
    "role": {
      values: [
        "REQ-PARTICIPANT",
        "CHAIR",
        "OPT-PARTICIPANT",
        "NON-PARTICIPANT"
      ],
      allowXName: true,
      allowIanaToken: true
    },
    "rsvp": {
      values: ["TRUE", "FALSE"]
    },
    "sent-by": {
      valueType: "cal-address"
    },
    "tzid": {
      matches: /^\//
    },
    "value": {
      // since the value here is a 'type' lowercase is used.
      values: [
        "binary",
        "boolean",
        "cal-address",
        "date",
        "date-time",
        "duration",
        "float",
        "integer",
        "period",
        "recur",
        "text",
        "time",
        "uri",
        "utc-offset"
      ],
      allowXName: true,
      allowIanaToken: true
    }
  };
  var icalValues = extend(commonValues, {
    text: createTextType(FROM_ICAL_NEWLINE, TO_ICAL_NEWLINE),
    uri: {
      // TODO
      /* ... */
    },
    "binary": {
      decorate: function(aString) {
        return Binary.fromString(aString);
      },
      undecorate: function(aBinary) {
        return aBinary.toString();
      }
    },
    "cal-address": {
      // needs to be an uri
    },
    "date": {
      decorate: function(aValue, aProp) {
        if (design.strict) {
          return Time.fromDateString(aValue, aProp);
        } else {
          return Time.fromString(aValue, aProp);
        }
      },
      /**
       * undecorates a time object.
       */
      undecorate: function(aValue) {
        return aValue.toString();
      },
      fromICAL: function(aValue) {
        if (!design.strict && aValue.length >= 15) {
          return icalValues["date-time"].fromICAL(aValue);
        } else {
          return aValue.slice(0, 4) + "-" + aValue.slice(4, 6) + "-" + aValue.slice(6, 8);
        }
      },
      toICAL: function(aValue) {
        let len = aValue.length;
        if (len == 10) {
          return aValue.slice(0, 4) + aValue.slice(5, 7) + aValue.slice(8, 10);
        } else if (len >= 19) {
          return icalValues["date-time"].toICAL(aValue);
        } else {
          return aValue;
        }
      }
    },
    "date-time": {
      fromICAL: function(aValue) {
        if (!design.strict && aValue.length == 8) {
          return icalValues.date.fromICAL(aValue);
        } else {
          let result = aValue.slice(0, 4) + "-" + aValue.slice(4, 6) + "-" + aValue.slice(6, 8) + "T" + aValue.slice(9, 11) + ":" + aValue.slice(11, 13) + ":" + aValue.slice(13, 15);
          if (aValue[15] && aValue[15] === "Z") {
            result += "Z";
          }
          return result;
        }
      },
      toICAL: function(aValue) {
        let len = aValue.length;
        if (len == 10 && !design.strict) {
          return icalValues.date.toICAL(aValue);
        } else if (len >= 19) {
          let result = aValue.slice(0, 4) + aValue.slice(5, 7) + // grab the (DDTHH) segment
          aValue.slice(8, 13) + // MM
          aValue.slice(14, 16) + // SS
          aValue.slice(17, 19);
          if (aValue[19] && aValue[19] === "Z") {
            result += "Z";
          }
          return result;
        } else {
          return aValue;
        }
      },
      decorate: function(aValue, aProp) {
        if (design.strict) {
          return Time.fromDateTimeString(aValue, aProp);
        } else {
          return Time.fromString(aValue, aProp);
        }
      },
      undecorate: function(aValue) {
        return aValue.toString();
      }
    },
    duration: {
      decorate: function(aValue) {
        return Duration.fromString(aValue);
      },
      undecorate: function(aValue) {
        return aValue.toString();
      }
    },
    period: {
      fromICAL: function(string) {
        let parts = string.split("/");
        parts[0] = icalValues["date-time"].fromICAL(parts[0]);
        if (!Duration.isValueString(parts[1])) {
          parts[1] = icalValues["date-time"].fromICAL(parts[1]);
        }
        return parts;
      },
      toICAL: function(parts) {
        parts = parts.slice();
        if (!design.strict && parts[0].length == 10) {
          parts[0] = icalValues.date.toICAL(parts[0]);
        } else {
          parts[0] = icalValues["date-time"].toICAL(parts[0]);
        }
        if (!Duration.isValueString(parts[1])) {
          if (!design.strict && parts[1].length == 10) {
            parts[1] = icalValues.date.toICAL(parts[1]);
          } else {
            parts[1] = icalValues["date-time"].toICAL(parts[1]);
          }
        }
        return parts.join("/");
      },
      decorate: function(aValue, aProp) {
        return Period.fromJSON(aValue, aProp, !design.strict);
      },
      undecorate: function(aValue) {
        return aValue.toJSON();
      }
    },
    recur: {
      fromICAL: function(string) {
        return Recur._stringToData(string, true);
      },
      toICAL: function(data) {
        let str = "";
        for (let [k, val] of Object.entries(data)) {
          if (k == "until") {
            if (val.length > 10) {
              val = icalValues["date-time"].toICAL(val);
            } else {
              val = icalValues.date.toICAL(val);
            }
          } else if (k == "wkst") {
            if (typeof val === "number") {
              val = Recur.numericDayToIcalDay(val);
            }
          } else if (Array.isArray(val)) {
            val = val.join(",");
          }
          str += k.toUpperCase() + "=" + val + ";";
        }
        return str.slice(0, Math.max(0, str.length - 1));
      },
      decorate: function decorate(aValue) {
        return Recur.fromData(aValue);
      },
      undecorate: function(aRecur) {
        return aRecur.toJSON();
      }
    },
    time: {
      fromICAL: function(aValue) {
        if (aValue.length < 6) {
          return aValue;
        }
        let result = aValue.slice(0, 2) + ":" + aValue.slice(2, 4) + ":" + aValue.slice(4, 6);
        if (aValue[6] === "Z") {
          result += "Z";
        }
        return result;
      },
      toICAL: function(aValue) {
        if (aValue.length < 8) {
          return aValue;
        }
        let result = aValue.slice(0, 2) + aValue.slice(3, 5) + aValue.slice(6, 8);
        if (aValue[8] === "Z") {
          result += "Z";
        }
        return result;
      }
    }
  });
  var icalProperties = extend(commonProperties, {
    "action": DEFAULT_TYPE_TEXT,
    "attach": { defaultType: "uri" },
    "attendee": { defaultType: "cal-address" },
    "calscale": DEFAULT_TYPE_TEXT,
    "class": DEFAULT_TYPE_TEXT,
    "comment": DEFAULT_TYPE_TEXT,
    "completed": DEFAULT_TYPE_DATETIME,
    "contact": DEFAULT_TYPE_TEXT,
    "created": DEFAULT_TYPE_DATETIME,
    "description": DEFAULT_TYPE_TEXT,
    "dtend": DEFAULT_TYPE_DATETIME_DATE,
    "dtstamp": DEFAULT_TYPE_DATETIME,
    "dtstart": DEFAULT_TYPE_DATETIME_DATE,
    "due": DEFAULT_TYPE_DATETIME_DATE,
    "duration": { defaultType: "duration" },
    "exdate": {
      defaultType: "date-time",
      allowedTypes: ["date-time", "date"],
      multiValue: ","
    },
    "exrule": DEFAULT_TYPE_RECUR,
    "freebusy": { defaultType: "period", multiValue: "," },
    "geo": { defaultType: "float", structuredValue: ";" },
    "last-modified": DEFAULT_TYPE_DATETIME,
    "location": DEFAULT_TYPE_TEXT,
    "method": DEFAULT_TYPE_TEXT,
    "organizer": { defaultType: "cal-address" },
    "percent-complete": DEFAULT_TYPE_INTEGER,
    "priority": DEFAULT_TYPE_INTEGER,
    "prodid": DEFAULT_TYPE_TEXT,
    "related-to": DEFAULT_TYPE_TEXT,
    "repeat": DEFAULT_TYPE_INTEGER,
    "rdate": {
      defaultType: "date-time",
      allowedTypes: ["date-time", "date", "period"],
      multiValue: ",",
      detectType: function(string) {
        if (string.indexOf("/") !== -1) {
          return "period";
        }
        return string.indexOf("T") === -1 ? "date" : "date-time";
      }
    },
    "recurrence-id": DEFAULT_TYPE_DATETIME_DATE,
    "resources": DEFAULT_TYPE_TEXT_MULTI,
    "request-status": DEFAULT_TYPE_TEXT_STRUCTURED,
    "rrule": DEFAULT_TYPE_RECUR,
    "sequence": DEFAULT_TYPE_INTEGER,
    "status": DEFAULT_TYPE_TEXT,
    "summary": DEFAULT_TYPE_TEXT,
    "transp": DEFAULT_TYPE_TEXT,
    "trigger": { defaultType: "duration", allowedTypes: ["duration", "date-time"] },
    "tzoffsetfrom": DEFAULT_TYPE_UTCOFFSET,
    "tzoffsetto": DEFAULT_TYPE_UTCOFFSET,
    "tzurl": DEFAULT_TYPE_URI,
    "tzid": DEFAULT_TYPE_TEXT,
    "tzname": DEFAULT_TYPE_TEXT
  });
  var vcardValues = extend(commonValues, {
    text: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
    uri: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
    date: {
      decorate: function(aValue) {
        return VCardTime.fromDateAndOrTimeString(aValue, "date");
      },
      undecorate: function(aValue) {
        return aValue.toString();
      },
      fromICAL: function(aValue) {
        if (aValue.length == 8) {
          return icalValues.date.fromICAL(aValue);
        } else if (aValue[0] == "-" && aValue.length == 6) {
          return aValue.slice(0, 4) + "-" + aValue.slice(4);
        } else {
          return aValue;
        }
      },
      toICAL: function(aValue) {
        if (aValue.length == 10) {
          return icalValues.date.toICAL(aValue);
        } else if (aValue[0] == "-" && aValue.length == 7) {
          return aValue.slice(0, 4) + aValue.slice(5);
        } else {
          return aValue;
        }
      }
    },
    time: {
      decorate: function(aValue) {
        return VCardTime.fromDateAndOrTimeString("T" + aValue, "time");
      },
      undecorate: function(aValue) {
        return aValue.toString();
      },
      fromICAL: function(aValue) {
        let splitzone = vcardValues.time._splitZone(aValue, true);
        let zone = splitzone[0], value = splitzone[1];
        if (value.length == 6) {
          value = value.slice(0, 2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6);
        } else if (value.length == 4 && value[0] != "-") {
          value = value.slice(0, 2) + ":" + value.slice(2, 4);
        } else if (value.length == 5) {
          value = value.slice(0, 3) + ":" + value.slice(3, 5);
        }
        if (zone.length == 5 && (zone[0] == "-" || zone[0] == "+")) {
          zone = zone.slice(0, 3) + ":" + zone.slice(3);
        }
        return value + zone;
      },
      toICAL: function(aValue) {
        let splitzone = vcardValues.time._splitZone(aValue);
        let zone = splitzone[0], value = splitzone[1];
        if (value.length == 8) {
          value = value.slice(0, 2) + value.slice(3, 5) + value.slice(6, 8);
        } else if (value.length == 5 && value[0] != "-") {
          value = value.slice(0, 2) + value.slice(3, 5);
        } else if (value.length == 6) {
          value = value.slice(0, 3) + value.slice(4, 6);
        }
        if (zone.length == 6 && (zone[0] == "-" || zone[0] == "+")) {
          zone = zone.slice(0, 3) + zone.slice(4);
        }
        return value + zone;
      },
      _splitZone: function(aValue, isFromIcal) {
        let lastChar = aValue.length - 1;
        let signChar = aValue.length - (isFromIcal ? 5 : 6);
        let sign = aValue[signChar];
        let zone, value;
        if (aValue[lastChar] == "Z") {
          zone = aValue[lastChar];
          value = aValue.slice(0, Math.max(0, lastChar));
        } else if (aValue.length > 6 && (sign == "-" || sign == "+")) {
          zone = aValue.slice(signChar);
          value = aValue.slice(0, Math.max(0, signChar));
        } else {
          zone = "";
          value = aValue;
        }
        return [zone, value];
      }
    },
    "date-time": {
      decorate: function(aValue) {
        return VCardTime.fromDateAndOrTimeString(aValue, "date-time");
      },
      undecorate: function(aValue) {
        return aValue.toString();
      },
      fromICAL: function(aValue) {
        return vcardValues["date-and-or-time"].fromICAL(aValue);
      },
      toICAL: function(aValue) {
        return vcardValues["date-and-or-time"].toICAL(aValue);
      }
    },
    "date-and-or-time": {
      decorate: function(aValue) {
        return VCardTime.fromDateAndOrTimeString(aValue, "date-and-or-time");
      },
      undecorate: function(aValue) {
        return aValue.toString();
      },
      fromICAL: function(aValue) {
        let parts = aValue.split("T");
        return (parts[0] ? vcardValues.date.fromICAL(parts[0]) : "") + (parts[1] ? "T" + vcardValues.time.fromICAL(parts[1]) : "");
      },
      toICAL: function(aValue) {
        let parts = aValue.split("T");
        return vcardValues.date.toICAL(parts[0]) + (parts[1] ? "T" + vcardValues.time.toICAL(parts[1]) : "");
      }
    },
    timestamp: icalValues["date-time"],
    "language-tag": {
      matches: /^[a-zA-Z0-9-]+$/
      // Could go with a more strict regex here
    },
    "phone-number": {
      fromICAL: function(aValue) {
        return Array.from(aValue).filter(function(c) {
          return c === "\\" ? void 0 : c;
        }).join("");
      },
      toICAL: function(aValue) {
        return Array.from(aValue).map(function(c) {
          return c === "," || c === ";" ? "\\" + c : c;
        }).join("");
      }
    }
  });
  var vcardParams = {
    "type": {
      valueType: "text",
      multiValue: ","
    },
    "value": {
      // since the value here is a 'type' lowercase is used.
      values: [
        "text",
        "uri",
        "date",
        "time",
        "date-time",
        "date-and-or-time",
        "timestamp",
        "boolean",
        "integer",
        "float",
        "utc-offset",
        "language-tag"
      ],
      allowXName: true,
      allowIanaToken: true
    }
  };
  var vcardProperties = extend(commonProperties, {
    "adr": { defaultType: "text", structuredValue: ";", multiValue: "," },
    "anniversary": DEFAULT_TYPE_DATE_ANDOR_TIME,
    "bday": DEFAULT_TYPE_DATE_ANDOR_TIME,
    "caladruri": DEFAULT_TYPE_URI,
    "caluri": DEFAULT_TYPE_URI,
    "clientpidmap": DEFAULT_TYPE_TEXT_STRUCTURED,
    "email": DEFAULT_TYPE_TEXT,
    "fburl": DEFAULT_TYPE_URI,
    "fn": DEFAULT_TYPE_TEXT,
    "gender": DEFAULT_TYPE_TEXT_STRUCTURED,
    "geo": DEFAULT_TYPE_URI,
    "impp": DEFAULT_TYPE_URI,
    "key": DEFAULT_TYPE_URI,
    "kind": DEFAULT_TYPE_TEXT,
    "lang": { defaultType: "language-tag" },
    "logo": DEFAULT_TYPE_URI,
    "member": DEFAULT_TYPE_URI,
    "n": { defaultType: "text", structuredValue: ";", multiValue: "," },
    "nickname": DEFAULT_TYPE_TEXT_MULTI,
    "note": DEFAULT_TYPE_TEXT,
    "org": { defaultType: "text", structuredValue: ";" },
    "photo": DEFAULT_TYPE_URI,
    "related": DEFAULT_TYPE_URI,
    "rev": { defaultType: "timestamp" },
    "role": DEFAULT_TYPE_TEXT,
    "sound": DEFAULT_TYPE_URI,
    "source": DEFAULT_TYPE_URI,
    "tel": { defaultType: "uri", allowedTypes: ["uri", "text"] },
    "title": DEFAULT_TYPE_TEXT,
    "tz": { defaultType: "text", allowedTypes: ["text", "utc-offset", "uri"] },
    "xml": DEFAULT_TYPE_TEXT
  });
  var vcard3Values = extend(commonValues, {
    binary: icalValues.binary,
    date: vcardValues.date,
    "date-time": vcardValues["date-time"],
    "phone-number": vcardValues["phone-number"],
    uri: icalValues.uri,
    text: vcardValues.text,
    time: icalValues.time,
    vcard: icalValues.text,
    "utc-offset": {
      toICAL: function(aValue) {
        return aValue.slice(0, 7);
      },
      fromICAL: function(aValue) {
        return aValue.slice(0, 7);
      },
      decorate: function(aValue) {
        return UtcOffset.fromString(aValue);
      },
      undecorate: function(aValue) {
        return aValue.toString();
      }
    }
  });
  var vcard3Params = {
    "type": {
      valueType: "text",
      multiValue: ","
    },
    "value": {
      // since the value here is a 'type' lowercase is used.
      values: [
        "text",
        "uri",
        "date",
        "date-time",
        "phone-number",
        "time",
        "boolean",
        "integer",
        "float",
        "utc-offset",
        "vcard",
        "binary"
      ],
      allowXName: true,
      allowIanaToken: true
    }
  };
  var vcard3Properties = extend(commonProperties, {
    fn: DEFAULT_TYPE_TEXT,
    n: { defaultType: "text", structuredValue: ";", multiValue: "," },
    nickname: DEFAULT_TYPE_TEXT_MULTI,
    photo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
    bday: {
      defaultType: "date-time",
      allowedTypes: ["date-time", "date"],
      detectType: function(string) {
        return string.indexOf("T") === -1 ? "date" : "date-time";
      }
    },
    adr: { defaultType: "text", structuredValue: ";", multiValue: "," },
    label: DEFAULT_TYPE_TEXT,
    tel: { defaultType: "phone-number" },
    email: DEFAULT_TYPE_TEXT,
    mailer: DEFAULT_TYPE_TEXT,
    tz: { defaultType: "utc-offset", allowedTypes: ["utc-offset", "text"] },
    geo: { defaultType: "float", structuredValue: ";" },
    title: DEFAULT_TYPE_TEXT,
    role: DEFAULT_TYPE_TEXT,
    logo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
    agent: { defaultType: "vcard", allowedTypes: ["vcard", "text", "uri"] },
    org: DEFAULT_TYPE_TEXT_STRUCTURED,
    note: DEFAULT_TYPE_TEXT_MULTI,
    prodid: DEFAULT_TYPE_TEXT,
    rev: {
      defaultType: "date-time",
      allowedTypes: ["date-time", "date"],
      detectType: function(string) {
        return string.indexOf("T") === -1 ? "date" : "date-time";
      }
    },
    "sort-string": DEFAULT_TYPE_TEXT,
    sound: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
    class: DEFAULT_TYPE_TEXT,
    key: { defaultType: "binary", allowedTypes: ["binary", "text"] }
  });
  var icalSet = {
    name: "ical",
    value: icalValues,
    param: icalParams,
    property: icalProperties,
    propertyGroups: false
  };
  var vcardSet = {
    name: "vcard4",
    value: vcardValues,
    param: vcardParams,
    property: vcardProperties,
    propertyGroups: true
  };
  var vcard3Set = {
    name: "vcard3",
    value: vcard3Values,
    param: vcard3Params,
    property: vcard3Properties,
    propertyGroups: true
  };
  var design = {
    /**
     * Can be set to false to make the parser more lenient.
     */
    strict: true,
    /**
     * The default set for new properties and components if none is specified.
     * @type {designSet}
     */
    defaultSet: icalSet,
    /**
     * The default type for unknown properties
     * @type {String}
     */
    defaultType: "unknown",
    /**
     * Holds the design set for known top-level components
     *
     * @type {Object}
     * @property {designSet} vcard       vCard VCARD
     * @property {designSet} vevent      iCalendar VEVENT
     * @property {designSet} vtodo       iCalendar VTODO
     * @property {designSet} vjournal    iCalendar VJOURNAL
     * @property {designSet} valarm      iCalendar VALARM
     * @property {designSet} vtimezone   iCalendar VTIMEZONE
     * @property {designSet} daylight    iCalendar DAYLIGHT
     * @property {designSet} standard    iCalendar STANDARD
     *
     * @example
     * let propertyName = 'fn';
     * let componentDesign = ICAL.design.components.vcard;
     * let propertyDetails = componentDesign.property[propertyName];
     * if (propertyDetails.defaultType == 'text') {
     *   // Yep, sure is...
     * }
     */
    components: {
      vcard: vcardSet,
      vcard3: vcard3Set,
      vevent: icalSet,
      vtodo: icalSet,
      vjournal: icalSet,
      valarm: icalSet,
      vtimezone: icalSet,
      daylight: icalSet,
      standard: icalSet
    },
    /**
     * The design set for iCalendar (rfc5545/rfc7265) components.
     * @type {designSet}
     */
    icalendar: icalSet,
    /**
     * The design set for vCard (rfc6350/rfc7095) components.
     * @type {designSet}
     */
    vcard: vcardSet,
    /**
     * The design set for vCard (rfc2425/rfc2426/rfc7095) components.
     * @type {designSet}
     */
    vcard3: vcard3Set,
    /**
     * Gets the design set for the given component name.
     *
     * @param {String} componentName        The name of the component
     * @return {designSet}      The design set for the component
     */
    getDesignSet: function(componentName) {
      let isInDesign = componentName && componentName in design.components;
      return isInDesign ? design.components[componentName] : design.defaultSet;
    }
  };
  var LINE_ENDING = "\r\n";
  var DEFAULT_VALUE_TYPE = "unknown";
  var RFC6868_REPLACE_MAP = { '"': "^'", "\n": "^n", "^": "^^" };
  function stringify(jCal) {
    if (typeof jCal[0] == "string") {
      jCal = [jCal];
    }
    let i = 0;
    let len = jCal.length;
    let result = "";
    for (; i < len; i++) {
      result += stringify.component(jCal[i]) + LINE_ENDING;
    }
    return result;
  }
  stringify.component = function(component, designSet) {
    let name = component[0].toUpperCase();
    let result = "BEGIN:" + name + LINE_ENDING;
    let props = component[1];
    let propIdx = 0;
    let propLen = props.length;
    let designSetName = component[0];
    if (designSetName === "vcard" && component[1].length > 0 && !(component[1][0][0] === "version" && component[1][0][3] === "4.0")) {
      designSetName = "vcard3";
    }
    designSet = designSet || design.getDesignSet(designSetName);
    for (; propIdx < propLen; propIdx++) {
      result += stringify.property(props[propIdx], designSet) + LINE_ENDING;
    }
    let comps = component[2] || [];
    let compIdx = 0;
    let compLen = comps.length;
    for (; compIdx < compLen; compIdx++) {
      result += stringify.component(comps[compIdx], designSet) + LINE_ENDING;
    }
    result += "END:" + name;
    return result;
  };
  stringify.property = function(property, designSet, noFold) {
    let name = property[0].toUpperCase();
    let jsName = property[0];
    let params = property[1];
    if (!designSet) {
      designSet = design.defaultSet;
    }
    let groupName = params.group;
    let line;
    if (designSet.propertyGroups && groupName) {
      line = groupName.toUpperCase() + "." + name;
    } else {
      line = name;
    }
    for (let [paramName, value] of Object.entries(params)) {
      if (designSet.propertyGroups && paramName == "group") {
        continue;
      }
      let paramDesign = designSet.param[paramName];
      let multiValue2 = paramDesign && paramDesign.multiValue;
      if (multiValue2 && Array.isArray(value)) {
        value = value.map(function(val) {
          val = stringify._rfc6868Unescape(val);
          val = stringify.paramPropertyValue(val, paramDesign.multiValueSeparateDQuote);
          return val;
        });
        value = stringify.multiValue(value, multiValue2, "unknown", null, designSet);
      } else {
        value = stringify._rfc6868Unescape(value);
        value = stringify.paramPropertyValue(value);
      }
      line += ";" + paramName.toUpperCase() + "=" + value;
    }
    if (property.length === 3) {
      return line + ":";
    }
    let valueType = property[2];
    let propDetails;
    let multiValue = false;
    let structuredValue = false;
    let isDefault = false;
    if (jsName in designSet.property) {
      propDetails = designSet.property[jsName];
      if ("multiValue" in propDetails) {
        multiValue = propDetails.multiValue;
      }
      if ("structuredValue" in propDetails && Array.isArray(property[3])) {
        structuredValue = propDetails.structuredValue;
      }
      if ("defaultType" in propDetails) {
        if (valueType === propDetails.defaultType) {
          isDefault = true;
        }
      } else {
        if (valueType === DEFAULT_VALUE_TYPE) {
          isDefault = true;
        }
      }
    } else {
      if (valueType === DEFAULT_VALUE_TYPE) {
        isDefault = true;
      }
    }
    if (!isDefault) {
      line += ";VALUE=" + valueType.toUpperCase();
    }
    line += ":";
    if (multiValue && structuredValue) {
      line += stringify.multiValue(
        property[3],
        structuredValue,
        valueType,
        multiValue,
        designSet,
        structuredValue
      );
    } else if (multiValue) {
      line += stringify.multiValue(
        property.slice(3),
        multiValue,
        valueType,
        null,
        designSet,
        false
      );
    } else if (structuredValue) {
      line += stringify.multiValue(
        property[3],
        structuredValue,
        valueType,
        null,
        designSet,
        structuredValue
      );
    } else {
      line += stringify.value(property[3], valueType, designSet, false);
    }
    return noFold ? line : foldline(line);
  };
  stringify.paramPropertyValue = function(value, force) {
    if (!force && value.indexOf(",") === -1 && value.indexOf(":") === -1 && value.indexOf(";") === -1) {
      return value;
    }
    return '"' + value + '"';
  };
  stringify.multiValue = function(values3, delim, type, innerMulti, designSet, structuredValue) {
    let result = "";
    let len = values3.length;
    let i = 0;
    for (; i < len; i++) {
      if (innerMulti && Array.isArray(values3[i])) {
        result += stringify.multiValue(values3[i], innerMulti, type, null, designSet, structuredValue);
      } else {
        result += stringify.value(values3[i], type, designSet, structuredValue);
      }
      if (i !== len - 1) {
        result += delim;
      }
    }
    return result;
  };
  stringify.value = function(value, type, designSet, structuredValue) {
    if (type in designSet.value && "toICAL" in designSet.value[type]) {
      return designSet.value[type].toICAL(value, structuredValue);
    }
    return value;
  };
  stringify._rfc6868Unescape = function(val) {
    return val.replace(/[\n^"]/g, function(x) {
      return RFC6868_REPLACE_MAP[x];
    });
  };
  var NAME_INDEX$1 = 0;
  var PROP_INDEX = 1;
  var TYPE_INDEX = 2;
  var VALUE_INDEX = 3;
  var Property = class _Property {
    /**
     * Create an {@link ICAL.Property} by parsing the passed iCalendar string.
     *
     * @param {String} str            The iCalendar string to parse
     * @param {designSet=} designSet  The design data to use for this property
     * @return {Property}             The created iCalendar property
     */
    static fromString(str, designSet) {
      return new _Property(parse.property(str, designSet));
    }
    /**
     * Creates a new ICAL.Property instance.
     *
     * It is important to note that mutations done in the wrapper directly mutate the jCal object used
     * to initialize.
     *
     * Can also be used to create new properties by passing the name of the property (as a String).
     *
     * @param {Array|String} jCal         Raw jCal representation OR the new name of the property
     * @param {Component=} parent         Parent component
     */
    constructor(jCal, parent) {
      this._parent = parent || null;
      if (typeof jCal === "string") {
        this.jCal = [jCal, {}, design.defaultType];
        this.jCal[TYPE_INDEX] = this.getDefaultType();
      } else {
        this.jCal = jCal;
      }
      this._updateType();
    }
    /**
     * The value type for this property
     * @type {String}
     */
    get type() {
      return this.jCal[TYPE_INDEX];
    }
    /**
     * The name of this property, in lowercase.
     * @type {String}
     */
    get name() {
      return this.jCal[NAME_INDEX$1];
    }
    /**
     * The parent component for this property.
     * @type {Component}
     */
    get parent() {
      return this._parent;
    }
    set parent(p) {
      let designSetChanged = !this._parent || p && p._designSet != this._parent._designSet;
      this._parent = p;
      if (this.type == design.defaultType && designSetChanged) {
        this.jCal[TYPE_INDEX] = this.getDefaultType();
        this._updateType();
      }
    }
    /**
     * The design set for this property, e.g. icalendar vs vcard
     *
     * @type {designSet}
     * @private
     */
    get _designSet() {
      return this.parent ? this.parent._designSet : design.defaultSet;
    }
    /**
     * Updates the type metadata from the current jCal type and design set.
     *
     * @private
     */
    _updateType() {
      let designSet = this._designSet;
      if (this.type in designSet.value) {
        if ("decorate" in designSet.value[this.type]) {
          this.isDecorated = true;
        } else {
          this.isDecorated = false;
        }
        if (this.name in designSet.property) {
          this.isMultiValue = "multiValue" in designSet.property[this.name];
          this.isStructuredValue = "structuredValue" in designSet.property[this.name];
        }
      }
    }
    /**
     * Hydrate a single value. The act of hydrating means turning the raw jCal
     * value into a potentially wrapped object, for example {@link ICAL.Time}.
     *
     * @private
     * @param {Number} index        The index of the value to hydrate
     * @return {?Object}             The decorated value.
     */
    _hydrateValue(index) {
      if (this._values && this._values[index]) {
        return this._values[index];
      }
      if (this.jCal.length <= VALUE_INDEX + index) {
        return null;
      }
      if (this.isDecorated) {
        if (!this._values) {
          this._values = [];
        }
        return this._values[index] = this._decorate(
          this.jCal[VALUE_INDEX + index]
        );
      } else {
        return this.jCal[VALUE_INDEX + index];
      }
    }
    /**
     * Decorate a single value, returning its wrapped object. This is used by
     * the hydrate function to actually wrap the value.
     *
     * @private
     * @param {?} value         The value to decorate
     * @return {Object}         The decorated value
     */
    _decorate(value) {
      return this._designSet.value[this.type].decorate(value, this);
    }
    /**
     * Undecorate a single value, returning its raw jCal data.
     *
     * @private
     * @param {Object} value         The value to undecorate
     * @return {?}                   The undecorated value
     */
    _undecorate(value) {
      return this._designSet.value[this.type].undecorate(value, this);
    }
    /**
     * Sets the value at the given index while also hydrating it. The passed
     * value can either be a decorated or undecorated value.
     *
     * @private
     * @param {?} value             The value to set
     * @param {Number} index        The index to set it at
     */
    _setDecoratedValue(value, index) {
      if (!this._values) {
        this._values = [];
      }
      if (typeof value === "object" && "icaltype" in value) {
        this.jCal[VALUE_INDEX + index] = this._undecorate(value);
        this._values[index] = value;
      } else {
        this.jCal[VALUE_INDEX + index] = value;
        this._values[index] = this._decorate(value);
      }
    }
    /**
     * Gets a parameter on the property.
     *
     * @param {String}        name   Parameter name (lowercase)
     * @return {Array|String}        Parameter value
     */
    getParameter(name) {
      if (name in this.jCal[PROP_INDEX]) {
        return this.jCal[PROP_INDEX][name];
      } else {
        return void 0;
      }
    }
    /**
     * Gets first parameter on the property.
     *
     * @param {String}        name   Parameter name (lowercase)
     * @return {String}        Parameter value
     */
    getFirstParameter(name) {
      let parameters = this.getParameter(name);
      if (Array.isArray(parameters)) {
        return parameters[0];
      }
      return parameters;
    }
    /**
     * Sets a parameter on the property.
     *
     * @param {String}       name     The parameter name
     * @param {Array|String} value    The parameter value
     */
    setParameter(name, value) {
      let lcname = name.toLowerCase();
      if (typeof value === "string" && lcname in this._designSet.param && "multiValue" in this._designSet.param[lcname]) {
        value = [value];
      }
      this.jCal[PROP_INDEX][name] = value;
    }
    /**
     * Removes a parameter
     *
     * @param {String} name     The parameter name
     */
    removeParameter(name) {
      delete this.jCal[PROP_INDEX][name];
    }
    /**
     * Get the default type based on this property's name.
     *
     * @return {String}     The default type for this property
     */
    getDefaultType() {
      let name = this.jCal[NAME_INDEX$1];
      let designSet = this._designSet;
      if (name in designSet.property) {
        let details = designSet.property[name];
        if ("defaultType" in details) {
          return details.defaultType;
        }
      }
      return design.defaultType;
    }
    /**
     * Sets type of property and clears out any existing values of the current
     * type.
     *
     * @param {String} type     New iCAL type (see design.*.values)
     */
    resetType(type) {
      this.removeAllValues();
      this.jCal[TYPE_INDEX] = type;
      this._updateType();
    }
    /**
     * Finds the first property value.
     *
     * @return {Binary | Duration | Period |
     * Recur | Time | UtcOffset | Geo | string | null}         First property value
     */
    getFirstValue() {
      return this._hydrateValue(0);
    }
    /**
     * Gets all values on the property.
     *
     * NOTE: this creates an array during each call.
     *
     * @return {Array}          List of values
     */
    getValues() {
      let len = this.jCal.length - VALUE_INDEX;
      if (len < 1) {
        return [];
      }
      let i = 0;
      let result = [];
      for (; i < len; i++) {
        result[i] = this._hydrateValue(i);
      }
      return result;
    }
    /**
     * Removes all values from this property
     */
    removeAllValues() {
      if (this._values) {
        this._values.length = 0;
      }
      this.jCal.length = 3;
    }
    /**
     * Sets the values of the property.  Will overwrite the existing values.
     * This can only be used for multi-value properties.
     *
     * @param {Array} values    An array of values
     */
    setValues(values3) {
      if (!this.isMultiValue) {
        throw new Error(
          this.name + ": does not not support mulitValue.\noverride isMultiValue"
        );
      }
      let len = values3.length;
      let i = 0;
      this.removeAllValues();
      if (len > 0 && typeof values3[0] === "object" && "icaltype" in values3[0]) {
        this.resetType(values3[0].icaltype);
      }
      if (this.isDecorated) {
        for (; i < len; i++) {
          this._setDecoratedValue(values3[i], i);
        }
      } else {
        for (; i < len; i++) {
          this.jCal[VALUE_INDEX + i] = values3[i];
        }
      }
    }
    /**
     * Sets the current value of the property. If this is a multi-value
     * property, all other values will be removed.
     *
     * @param {String|Object} value     New property value.
     */
    setValue(value) {
      this.removeAllValues();
      if (typeof value === "object" && "icaltype" in value) {
        this.resetType(value.icaltype);
      }
      if (this.isDecorated) {
        this._setDecoratedValue(value, 0);
      } else {
        this.jCal[VALUE_INDEX] = value;
      }
    }
    /**
     * Returns the Object representation of this component. The returned object
     * is a live jCal object and should be cloned if modified.
     * @return {Object}
     */
    toJSON() {
      return this.jCal;
    }
    /**
     * The string representation of this component.
     * @return {String}
     */
    toICALString() {
      return stringify.property(
        this.jCal,
        this._designSet,
        true
      );
    }
  };
  var NAME_INDEX = 0;
  var PROPERTY_INDEX = 1;
  var COMPONENT_INDEX = 2;
  var PROPERTY_NAME_INDEX = 0;
  var PROPERTY_VALUE_INDEX = 3;
  var Component = class _Component {
    /**
     * Creates a new Component instance.
     *
     * @param {Array|String} jCal         Raw jCal component data OR name of new
     *                                      component
     * @param {Component=} parent     Parent component to associate
     */
    constructor(jCal, parent) {
      /**
       * Hydrated properties are inserted into the _properties array at the same
       * position as in the jCal array, so it is possible that the array contains
       * undefined values for unhydrdated properties. To avoid iterating the
       * array when checking if all properties have been hydrated, we save the
       * count here.
       *
       * @type {Number}
       * @private
       */
      __publicField(this, "_hydratedPropertyCount", 0);
      /**
       * The same count as for _hydratedPropertyCount, but for subcomponents
       *
       * @type {Number}
       * @private
       */
      __publicField(this, "_hydratedComponentCount", 0);
      /**
       * A cache of hydrated time zone objects which may be used by consumers, keyed
       * by time zone ID.
       *
       * @type {Map}
       * @private
       */
      __publicField(this, "_timezoneCache", null);
      /**
       * @private
       */
      __publicField(this, "_components", null);
      /**
       * @private
       */
      __publicField(this, "_properties", null);
      if (typeof jCal === "string") {
        jCal = [jCal, [], []];
      }
      this.jCal = jCal;
      this.parent = parent || null;
      if (!this.parent && this.name === "vcalendar") {
        this._timezoneCache = /* @__PURE__ */ new Map();
      }
    }
    /**
     * Create an {@link ICAL.Component} by parsing the passed iCalendar string.
     *
     * @param {String} str        The iCalendar string to parse
     */
    static fromString(str) {
      return new _Component(parse.component(str));
    }
    /**
     * The name of this component
     *
     * @type {String}
     */
    get name() {
      return this.jCal[NAME_INDEX];
    }
    /**
     * The design set for this component, e.g. icalendar vs vcard
     *
     * @type {designSet}
     * @private
     */
    get _designSet() {
      let parentDesign = this.parent && this.parent._designSet;
      if (!parentDesign && this.name == "vcard") {
        let versionProp = this.jCal[PROPERTY_INDEX]?.[0];
        if (versionProp && versionProp[PROPERTY_NAME_INDEX] == "version" && versionProp[PROPERTY_VALUE_INDEX] == "3.0") {
          return design.getDesignSet("vcard3");
        }
      }
      return parentDesign || design.getDesignSet(this.name);
    }
    /**
     * @private
     */
    _hydrateComponent(index) {
      if (!this._components) {
        this._components = [];
        this._hydratedComponentCount = 0;
      }
      if (this._components[index]) {
        return this._components[index];
      }
      let comp = new _Component(
        this.jCal[COMPONENT_INDEX][index],
        this
      );
      this._hydratedComponentCount++;
      return this._components[index] = comp;
    }
    /**
     * @private
     */
    _hydrateProperty(index) {
      if (!this._properties) {
        this._properties = [];
        this._hydratedPropertyCount = 0;
      }
      if (this._properties[index]) {
        return this._properties[index];
      }
      let prop2 = new Property(
        this.jCal[PROPERTY_INDEX][index],
        this
      );
      this._hydratedPropertyCount++;
      return this._properties[index] = prop2;
    }
    /**
     * Finds first sub component, optionally filtered by name.
     *
     * @param {String=} name        Optional name to filter by
     * @return {?Component}     The found subcomponent
     */
    getFirstSubcomponent(name) {
      if (name) {
        let i = 0;
        let comps = this.jCal[COMPONENT_INDEX];
        let len = comps.length;
        for (; i < len; i++) {
          if (comps[i][NAME_INDEX] === name) {
            let result = this._hydrateComponent(i);
            return result;
          }
        }
      } else {
        if (this.jCal[COMPONENT_INDEX].length) {
          return this._hydrateComponent(0);
        }
      }
      return null;
    }
    /**
     * Finds all sub components, optionally filtering by name.
     *
     * @param {String=} name            Optional name to filter by
     * @return {Component[]}       The found sub components
     */
    getAllSubcomponents(name) {
      let jCalLen = this.jCal[COMPONENT_INDEX].length;
      let i = 0;
      if (name) {
        let comps = this.jCal[COMPONENT_INDEX];
        let result = [];
        for (; i < jCalLen; i++) {
          if (name === comps[i][NAME_INDEX]) {
            result.push(
              this._hydrateComponent(i)
            );
          }
        }
        return result;
      } else {
        if (!this._components || this._hydratedComponentCount !== jCalLen) {
          for (; i < jCalLen; i++) {
            this._hydrateComponent(i);
          }
        }
        return this._components || [];
      }
    }
    /**
     * Returns true when a named property exists.
     *
     * @param {String} name     The property name
     * @return {Boolean}        True, when property is found
     */
    hasProperty(name) {
      let props = this.jCal[PROPERTY_INDEX];
      let len = props.length;
      let i = 0;
      for (; i < len; i++) {
        if (props[i][NAME_INDEX] === name) {
          return true;
        }
      }
      return false;
    }
    /**
     * Finds the first property, optionally with the given name.
     *
     * @param {String=} name        Lowercase property name
     * @return {?Property}     The found property
     */
    getFirstProperty(name) {
      if (name) {
        let i = 0;
        let props = this.jCal[PROPERTY_INDEX];
        let len = props.length;
        for (; i < len; i++) {
          if (props[i][NAME_INDEX] === name) {
            let result = this._hydrateProperty(i);
            return result;
          }
        }
      } else {
        if (this.jCal[PROPERTY_INDEX].length) {
          return this._hydrateProperty(0);
        }
      }
      return null;
    }
    /**
     * Returns first property's value, if available.
     *
     * @param {String=} name                    Lowercase property name
     * @return {Binary | Duration | Period |
     * Recur | Time | UtcOffset | Geo | string | null}         The found property value.
     */
    getFirstPropertyValue(name) {
      let prop2 = this.getFirstProperty(name);
      if (prop2) {
        return prop2.getFirstValue();
      }
      return null;
    }
    /**
     * Get all properties in the component, optionally filtered by name.
     *
     * @param {String=} name        Lowercase property name
     * @return {Property[]}    List of properties
     */
    getAllProperties(name) {
      let jCalLen = this.jCal[PROPERTY_INDEX].length;
      let i = 0;
      if (name) {
        let props = this.jCal[PROPERTY_INDEX];
        let result = [];
        for (; i < jCalLen; i++) {
          if (name === props[i][NAME_INDEX]) {
            result.push(
              this._hydrateProperty(i)
            );
          }
        }
        return result;
      } else {
        if (!this._properties || this._hydratedPropertyCount !== jCalLen) {
          for (; i < jCalLen; i++) {
            this._hydrateProperty(i);
          }
        }
        return this._properties || [];
      }
    }
    /**
     * @private
     */
    _removeObjectByIndex(jCalIndex, cache, index) {
      cache = cache || [];
      if (cache[index]) {
        let obj = cache[index];
        if ("parent" in obj) {
          obj.parent = null;
        }
      }
      cache.splice(index, 1);
      this.jCal[jCalIndex].splice(index, 1);
    }
    /**
     * @private
     */
    _removeObject(jCalIndex, cache, nameOrObject) {
      let i = 0;
      let objects = this.jCal[jCalIndex];
      let len = objects.length;
      let cached = this[cache];
      if (typeof nameOrObject === "string") {
        for (; i < len; i++) {
          if (objects[i][NAME_INDEX] === nameOrObject) {
            this._removeObjectByIndex(jCalIndex, cached, i);
            return true;
          }
        }
      } else if (cached) {
        for (; i < len; i++) {
          if (cached[i] && cached[i] === nameOrObject) {
            this._removeObjectByIndex(jCalIndex, cached, i);
            return true;
          }
        }
      }
      return false;
    }
    /**
     * @private
     */
    _removeAllObjects(jCalIndex, cache, name) {
      let cached = this[cache];
      let objects = this.jCal[jCalIndex];
      let i = objects.length - 1;
      for (; i >= 0; i--) {
        if (!name || objects[i][NAME_INDEX] === name) {
          this._removeObjectByIndex(jCalIndex, cached, i);
        }
      }
    }
    /**
     * Adds a single sub component.
     *
     * @param {Component} component        The component to add
     * @return {Component}                 The passed in component
     */
    addSubcomponent(component) {
      if (!this._components) {
        this._components = [];
        this._hydratedComponentCount = 0;
      }
      if (component.parent) {
        component.parent.removeSubcomponent(component);
      }
      let idx = this.jCal[COMPONENT_INDEX].push(component.jCal);
      this._components[idx - 1] = component;
      this._hydratedComponentCount++;
      component.parent = this;
      return component;
    }
    /**
     * Removes a single component by name or the instance of a specific
     * component.
     *
     * @param {Component|String} nameOrComp    Name of component, or component
     * @return {Boolean}                            True when comp is removed
     */
    removeSubcomponent(nameOrComp) {
      let removed = this._removeObject(COMPONENT_INDEX, "_components", nameOrComp);
      if (removed) {
        this._hydratedComponentCount--;
      }
      return removed;
    }
    /**
     * Removes all components or (if given) all components by a particular
     * name.
     *
     * @param {String=} name            Lowercase component name
     */
    removeAllSubcomponents(name) {
      let removed = this._removeAllObjects(COMPONENT_INDEX, "_components", name);
      this._hydratedComponentCount = 0;
      return removed;
    }
    /**
     * Adds an {@link ICAL.Property} to the component.
     *
     * @param {Property} property      The property to add
     * @return {Property}              The passed in property
     */
    addProperty(property) {
      if (!(property instanceof Property)) {
        throw new TypeError("must be instance of ICAL.Property");
      }
      if (!this._properties) {
        this._properties = [];
        this._hydratedPropertyCount = 0;
      }
      if (property.parent) {
        property.parent.removeProperty(property);
      }
      let idx = this.jCal[PROPERTY_INDEX].push(property.jCal);
      this._properties[idx - 1] = property;
      this._hydratedPropertyCount++;
      property.parent = this;
      return property;
    }
    /**
     * Helper method to add a property with a value to the component.
     *
     * @param {String}               name         Property name to add
     * @param {String|Number|Object} value        Property value
     * @return {Property}                    The created property
     */
    addPropertyWithValue(name, value) {
      let prop2 = new Property(name);
      prop2.setValue(value);
      this.addProperty(prop2);
      return prop2;
    }
    /**
     * Helper method that will update or create a property of the given name
     * and sets its value. If multiple properties with the given name exist,
     * only the first is updated.
     *
     * @param {String}               name         Property name to update
     * @param {String|Number|Object} value        Property value
     * @return {Property}                    The created property
     */
    updatePropertyWithValue(name, value) {
      let prop2 = this.getFirstProperty(name);
      if (prop2) {
        prop2.setValue(value);
      } else {
        prop2 = this.addPropertyWithValue(name, value);
      }
      return prop2;
    }
    /**
     * Removes a single property by name or the instance of the specific
     * property.
     *
     * @param {String|Property} nameOrProp     Property name or instance to remove
     * @return {Boolean}                            True, when deleted
     */
    removeProperty(nameOrProp) {
      let removed = this._removeObject(PROPERTY_INDEX, "_properties", nameOrProp);
      if (removed) {
        this._hydratedPropertyCount--;
      }
      return removed;
    }
    /**
     * Removes all properties associated with this component, optionally
     * filtered by name.
     *
     * @param {String=} name        Lowercase property name
     * @return {Boolean}            True, when deleted
     */
    removeAllProperties(name) {
      let removed = this._removeAllObjects(PROPERTY_INDEX, "_properties", name);
      this._hydratedPropertyCount = 0;
      return removed;
    }
    /**
     * Returns the Object representation of this component. The returned object
     * is a live jCal object and should be cloned if modified.
     * @return {Object}
     */
    toJSON() {
      return this.jCal;
    }
    /**
     * The string representation of this component.
     * @return {String}
     */
    toString() {
      return stringify.component(
        this.jCal,
        this._designSet
      );
    }
    /**
     * Retrieve a time zone definition from the component tree, if any is present.
     * If the tree contains no time zone definitions or the TZID cannot be
     * matched, returns null.
     *
     * @param {String} tzid     The ID of the time zone to retrieve
     * @return {Timezone}  The time zone corresponding to the ID, or null
     */
    getTimeZoneByID(tzid) {
      if (this.parent) {
        return this.parent.getTimeZoneByID(tzid);
      }
      if (!this._timezoneCache) {
        return null;
      }
      if (this._timezoneCache.has(tzid)) {
        return this._timezoneCache.get(tzid);
      }
      const zones2 = this.getAllSubcomponents("vtimezone");
      for (const zone of zones2) {
        if (zone.getFirstProperty("tzid").getFirstValue() === tzid) {
          const hydratedZone = new Timezone({
            component: zone,
            tzid
          });
          this._timezoneCache.set(tzid, hydratedZone);
          return hydratedZone;
        }
      }
      return null;
    }
  };
  var RecurExpansion = class {
    /**
     * Creates a new ICAL.RecurExpansion instance.
     *
     * The options object can be filled with the specified initial values. It can also contain
     * additional members, as a result of serializing a previous expansion state, as shown in the
     * example.
     *
     * @param {Object} options
     *        Recurrence expansion options
     * @param {Time} options.dtstart
     *        Start time of the event
     * @param {Component=} options.component
     *        Component for expansion, required if not resuming.
     */
    constructor(options) {
      /**
       * True when iteration is fully completed.
       * @type {Boolean}
       */
      __publicField(this, "complete", false);
      /**
       * Array of rrule iterators.
       *
       * @type {RecurIterator[]}
       * @private
       */
      __publicField(this, "ruleIterators", null);
      /**
       * Array of rdate instances.
       *
       * @type {Time[]}
       * @private
       */
      __publicField(this, "ruleDates", null);
      /**
       * Array of exdate instances.
       *
       * @type {Time[]}
       * @private
       */
      __publicField(this, "exDates", null);
      /**
       * Current position in ruleDates array.
       * @type {Number}
       * @private
       */
      __publicField(this, "ruleDateInc", 0);
      /**
       * Current position in exDates array
       * @type {Number}
       * @private
       */
      __publicField(this, "exDateInc", 0);
      /**
       * Current negative date.
       *
       * @type {Time}
       * @private
       */
      __publicField(this, "exDate", null);
      /**
       * Current additional date.
       *
       * @type {Time}
       * @private
       */
      __publicField(this, "ruleDate", null);
      /**
       * Start date of recurring rules.
       *
       * @type {Time}
       */
      __publicField(this, "dtstart", null);
      /**
       * Last expanded time
       *
       * @type {Time}
       */
      __publicField(this, "last", null);
      this.ruleDates = [];
      this.exDates = [];
      this.fromData(options);
    }
    /**
     * Initialize the recurrence expansion from the data object. The options
     * object may also contain additional members, see the
     * {@link ICAL.RecurExpansion constructor} for more details.
     *
     * @param {Object} options
     *        Recurrence expansion options
     * @param {Time} options.dtstart
     *        Start time of the event
     * @param {Component=} options.component
     *        Component for expansion, required if not resuming.
     */
    fromData(options) {
      let start = formatClassType(options.dtstart, Time);
      if (!start) {
        throw new Error(".dtstart (ICAL.Time) must be given");
      } else {
        this.dtstart = start;
      }
      if (options.component) {
        this._init(options.component);
      } else {
        this.last = formatClassType(options.last, Time) || start.clone();
        if (!options.ruleIterators) {
          throw new Error(".ruleIterators or .component must be given");
        }
        this.ruleIterators = options.ruleIterators.map(function(item) {
          return formatClassType(item, RecurIterator);
        });
        this.ruleDateInc = options.ruleDateInc;
        this.exDateInc = options.exDateInc;
        if (options.ruleDates) {
          this.ruleDates = options.ruleDates.map((item) => formatClassType(item, Time));
          this.ruleDate = this.ruleDates[this.ruleDateInc];
        }
        if (options.exDates) {
          this.exDates = options.exDates.map((item) => formatClassType(item, Time));
          this.exDate = this.exDates[this.exDateInc];
        }
        if (typeof options.complete !== "undefined") {
          this.complete = options.complete;
        }
      }
    }
    /**
     * Compare two ICAL.Time objects.  When the second parameter is a DATE and the first parameter is
     * DATE-TIME, strip the time and compare only the days.
     *
     * @private
     * @param {Time} a   The one object to compare
     * @param {Time} b   The other object to compare
     */
    _compare_special(a, b) {
      if (!a.isDate && b.isDate)
        return new Time({ year: a.year, month: a.month, day: a.day }).compare(b);
      return a.compare(b);
    }
    /**
     * Retrieve the next occurrence in the series.
     * @return {Time}
     */
    next() {
      let iter;
      let next;
      let compare;
      let maxTries = 500;
      let currentTry = 0;
      while (true) {
        if (currentTry++ > maxTries) {
          throw new Error(
            "max tries have occurred, rule may be impossible to fulfill."
          );
        }
        next = this.ruleDate;
        iter = this._nextRecurrenceIter(this.last);
        if (!next && !iter) {
          this.complete = true;
          break;
        }
        if (!next || iter && next.compare(iter.last) > 0) {
          next = iter.last.clone();
          iter.next();
        }
        if (this.ruleDate === next) {
          this._nextRuleDay();
        }
        this.last = next;
        if (this.exDate) {
          compare = this._compare_special(this.last, this.exDate);
          if (compare > 0) {
            this._nextExDay();
          }
          if (compare === 0) {
            this._nextExDay();
            continue;
          }
        }
        return this.last;
      }
    }
    /**
     * Converts object into a serialize-able format. This format can be passed
     * back into the expansion to resume iteration.
     * @return {Object}
     */
    toJSON() {
      function toJSON(item) {
        return item.toJSON();
      }
      let result = /* @__PURE__ */ Object.create(null);
      result.ruleIterators = this.ruleIterators.map(toJSON);
      if (this.ruleDates) {
        result.ruleDates = this.ruleDates.map(toJSON);
      }
      if (this.exDates) {
        result.exDates = this.exDates.map(toJSON);
      }
      result.ruleDateInc = this.ruleDateInc;
      result.exDateInc = this.exDateInc;
      result.last = this.last.toJSON();
      result.dtstart = this.dtstart.toJSON();
      result.complete = this.complete;
      return result;
    }
    /**
     * Extract all dates from the properties in the given component. The
     * properties will be filtered by the property name.
     *
     * @private
     * @param {Component} component             The component to search in
     * @param {String} propertyName             The property name to search for
     * @return {Time[]}                         The extracted dates.
     */
    _extractDates(component, propertyName) {
      let result = [];
      let props = component.getAllProperties(propertyName);
      for (let i = 0, len = props.length; i < len; i++) {
        for (let prop2 of props[i].getValues()) {
          let idx = binsearchInsert(
            result,
            prop2,
            (a, b) => a.compare(b)
          );
          result.splice(idx, 0, prop2);
        }
      }
      return result;
    }
    /**
     * Initialize the recurrence expansion.
     *
     * @private
     * @param {Component} component    The component to initialize from.
     */
    _init(component) {
      this.ruleIterators = [];
      this.last = this.dtstart.clone();
      if (!component.hasProperty("rdate") && !component.hasProperty("rrule") && !component.hasProperty("recurrence-id")) {
        this.ruleDate = this.last.clone();
        this.complete = true;
        return;
      }
      if (component.hasProperty("rdate")) {
        this.ruleDates = this._extractDates(component, "rdate");
        if (this.ruleDates[0] && this.ruleDates[0].compare(this.dtstart) < 0) {
          this.ruleDateInc = 0;
          this.last = this.ruleDates[0].clone();
        } else {
          this.ruleDateInc = binsearchInsert(
            this.ruleDates,
            this.last,
            (a, b) => a.compare(b)
          );
        }
        this.ruleDate = this.ruleDates[this.ruleDateInc];
      }
      if (component.hasProperty("rrule")) {
        let rules = component.getAllProperties("rrule");
        let i = 0;
        let len = rules.length;
        let rule;
        let iter;
        for (; i < len; i++) {
          rule = rules[i].getFirstValue();
          iter = rule.iterator(this.dtstart);
          this.ruleIterators.push(iter);
          iter.next();
        }
      }
      if (component.hasProperty("exdate")) {
        this.exDates = this._extractDates(component, "exdate");
        this.exDateInc = binsearchInsert(
          this.exDates,
          this.last,
          this._compare_special
        );
        this.exDate = this.exDates[this.exDateInc];
      }
    }
    /**
     * Advance to the next exdate
     * @private
     */
    _nextExDay() {
      this.exDate = this.exDates[++this.exDateInc];
    }
    /**
     * Advance to the next rule date
     * @private
     */
    _nextRuleDay() {
      this.ruleDate = this.ruleDates[++this.ruleDateInc];
    }
    /**
     * Find and return the recurrence rule with the most recent event and
     * return it.
     *
     * @private
     * @return {?RecurIterator}    Found iterator.
     */
    _nextRecurrenceIter() {
      let iters = this.ruleIterators;
      if (iters.length === 0) {
        return null;
      }
      let len = iters.length;
      let iter;
      let iterTime;
      let iterIdx = 0;
      let chosenIter;
      for (; iterIdx < len; iterIdx++) {
        iter = iters[iterIdx];
        iterTime = iter.last;
        if (iter.completed) {
          len--;
          if (iterIdx !== 0) {
            iterIdx--;
          }
          iters.splice(iterIdx, 1);
          continue;
        }
        if (!chosenIter || chosenIter.last.compare(iterTime) > 0) {
          chosenIter = iter;
        }
      }
      return chosenIter;
    }
  };
  var _Event = class _Event {
    /**
     * Creates a new ICAL.Event instance.
     *
     * @param {Component=} component              The ICAL.Component to base this event on
     * @param {Object} [options]                  Options for this event
     * @param {Boolean=} options.strictExceptions  When true, will verify exceptions are related by
     *                                              their UUID
     * @param {Array<Component|Event>=} options.exceptions
     *          Exceptions to this event, either as components or events. If not
     *            specified exceptions will automatically be set in relation of
     *            component's parent
     */
    constructor(component, options) {
      /**
       * List of related event exceptions.
       *
       * @type {Event[]}
       */
      __publicField(this, "exceptions", null);
      /**
       * When true, will verify exceptions are related by their UUID.
       *
       * @type {Boolean}
       */
      __publicField(this, "strictExceptions", false);
      if (!(component instanceof Component)) {
        options = component;
        component = null;
      }
      if (component) {
        this.component = component;
      } else {
        this.component = new Component("vevent");
      }
      this._rangeExceptionCache = /* @__PURE__ */ Object.create(null);
      this.exceptions = /* @__PURE__ */ Object.create(null);
      this.rangeExceptions = [];
      if (options && options.strictExceptions) {
        this.strictExceptions = options.strictExceptions;
      }
      if (options && options.exceptions) {
        options.exceptions.forEach(this.relateException, this);
      } else if (this.component.parent && !this.isRecurrenceException()) {
        this.component.parent.getAllSubcomponents("vevent").forEach(function(event) {
          if (event.hasProperty("recurrence-id")) {
            this.relateException(event);
          }
        }, this);
      }
    }
    /**
     * Relates a given event exception to this object.  If the given component
     * does not share the UID of this event it cannot be related and will throw
     * an exception.
     *
     * If this component is an exception it cannot have other exceptions
     * related to it.
     *
     * @param {Component|Event} obj       Component or event
     */
    relateException(obj) {
      if (this.isRecurrenceException()) {
        throw new Error("cannot relate exception to exceptions");
      }
      if (obj instanceof Component) {
        obj = new _Event(obj);
      }
      if (this.strictExceptions && obj.uid !== this.uid) {
        throw new Error("attempted to relate unrelated exception");
      }
      let id = obj.recurrenceId.toString();
      this.exceptions[id] = obj;
      if (obj.modifiesFuture()) {
        let item = [
          obj.recurrenceId.toUnixTime(),
          id
        ];
        let idx = binsearchInsert(
          this.rangeExceptions,
          item,
          compareRangeException
        );
        this.rangeExceptions.splice(idx, 0, item);
      }
    }
    /**
     * Checks if this record is an exception and has the RANGE=THISANDFUTURE
     * value.
     *
     * @return {Boolean}        True, when exception is within range
     */
    modifiesFuture() {
      if (!this.component.hasProperty("recurrence-id")) {
        return false;
      }
      let range = this.component.getFirstProperty("recurrence-id").getParameter("range");
      return range === _Event.THISANDFUTURE;
    }
    /**
     * Finds the range exception nearest to the given date.
     *
     * @param {Time} time   usually an occurrence time of an event
     * @return {?Event}     the related event/exception or null
     */
    findRangeException(time) {
      if (!this.rangeExceptions.length) {
        return null;
      }
      let utc = time.toUnixTime();
      let idx = binsearchInsert(
        this.rangeExceptions,
        [utc],
        compareRangeException
      );
      idx -= 1;
      if (idx < 0) {
        return null;
      }
      let rangeItem = this.rangeExceptions[idx];
      if (utc < rangeItem[0]) {
        return null;
      }
      return rangeItem[1];
    }
    /**
     * Returns the occurrence details based on its start time.  If the
     * occurrence has an exception will return the details for that exception.
     *
     * NOTE: this method is intend to be used in conjunction
     *       with the {@link ICAL.Event#iterator iterator} method.
     *
     * @param {Time} occurrence               time occurrence
     * @return {occurrenceDetails}            Information about the occurrence
     */
    getOccurrenceDetails(occurrence) {
      let id = occurrence.toString();
      let utcId = occurrence.convertToZone(Timezone.utcTimezone).toString();
      let item;
      let result = {
        //XXX: Clone?
        recurrenceId: occurrence
      };
      if (id in this.exceptions) {
        item = result.item = this.exceptions[id];
        result.startDate = item.startDate;
        result.endDate = item.endDate;
        result.item = item;
      } else if (utcId in this.exceptions) {
        item = this.exceptions[utcId];
        result.startDate = item.startDate;
        result.endDate = item.endDate;
        result.item = item;
      } else {
        let rangeExceptionId = this.findRangeException(
          occurrence
        );
        let end;
        if (rangeExceptionId) {
          let exception = this.exceptions[rangeExceptionId];
          result.item = exception;
          let startDiff = this._rangeExceptionCache[rangeExceptionId];
          if (!startDiff) {
            let original = exception.recurrenceId.clone();
            let newStart = exception.startDate.clone();
            original.zone = newStart.zone;
            startDiff = newStart.subtractDate(original);
            this._rangeExceptionCache[rangeExceptionId] = startDiff;
          }
          let start = occurrence.clone();
          start.zone = exception.startDate.zone;
          start.addDuration(startDiff);
          end = start.clone();
          end.addDuration(exception.duration);
          result.startDate = start;
          result.endDate = end;
        } else {
          end = occurrence.clone();
          end.addDuration(this.duration);
          result.endDate = end;
          result.startDate = occurrence;
          result.item = this;
        }
      }
      return result;
    }
    /**
     * Builds a recur expansion instance for a specific point in time (defaults
     * to startDate).
     *
     * @param {Time=} startTime     Starting point for expansion
     * @return {RecurExpansion}    Expansion object
     */
    iterator(startTime) {
      return new RecurExpansion({
        component: this.component,
        dtstart: startTime || this.startDate
      });
    }
    /**
     * Checks if the event is recurring
     *
     * @return {Boolean}        True, if event is recurring
     */
    isRecurring() {
      let comp = this.component;
      return comp.hasProperty("rrule") || comp.hasProperty("rdate");
    }
    /**
     * Checks if the event describes a recurrence exception. See
     * {@tutorial terminology} for details.
     *
     * @return {Boolean}    True, if the event describes a recurrence exception
     */
    isRecurrenceException() {
      return this.component.hasProperty("recurrence-id");
    }
    /**
     * Returns the types of recurrences this event may have.
     *
     * Returned as an object with the following possible keys:
     *
     *    - YEARLY
     *    - MONTHLY
     *    - WEEKLY
     *    - DAILY
     *    - MINUTELY
     *    - SECONDLY
     *
     * @return {Object.<frequencyValues, Boolean>}
     *          Object of recurrence flags
     */
    getRecurrenceTypes() {
      let rules = this.component.getAllProperties("rrule");
      let i = 0;
      let len = rules.length;
      let result = /* @__PURE__ */ Object.create(null);
      for (; i < len; i++) {
        let value = rules[i].getFirstValue();
        result[value.freq] = true;
      }
      return result;
    }
    /**
     * The uid of this event
     * @type {String}
     */
    get uid() {
      return this._firstProp("uid");
    }
    set uid(value) {
      this._setProp("uid", value);
    }
    /**
     * The start date
     * @type {Time}
     */
    get startDate() {
      return this._firstProp("dtstart");
    }
    set startDate(value) {
      this._setTime("dtstart", value);
    }
    /**
     * The end date. This can be the result directly from the property, or the
     * end date calculated from start date and duration. Setting the property
     * will remove any duration properties.
     * @type {Time}
     */
    get endDate() {
      let endDate = this._firstProp("dtend");
      if (!endDate) {
        let duration = this._firstProp("duration");
        endDate = this.startDate.clone();
        if (duration) {
          endDate.addDuration(duration);
        } else if (endDate.isDate) {
          endDate.day += 1;
        }
      }
      return endDate;
    }
    set endDate(value) {
      if (this.component.hasProperty("duration")) {
        this.component.removeProperty("duration");
      }
      this._setTime("dtend", value);
    }
    /**
     * The duration. This can be the result directly from the property, or the
     * duration calculated from start date and end date. Setting the property
     * will remove any `dtend` properties.
     * @type {Duration}
     */
    get duration() {
      let duration = this._firstProp("duration");
      if (!duration) {
        return this.endDate.subtractDateTz(this.startDate);
      }
      return duration;
    }
    set duration(value) {
      if (this.component.hasProperty("dtend")) {
        this.component.removeProperty("dtend");
      }
      this._setProp("duration", value);
    }
    /**
     * The location of the event.
     * @type {String}
     */
    get location() {
      return this._firstProp("location");
    }
    set location(value) {
      this._setProp("location", value);
    }
    /**
     * The attendees in the event
     * @type {Property[]}
     */
    get attendees() {
      return this.component.getAllProperties("attendee");
    }
    /**
     * The event summary
     * @type {String}
     */
    get summary() {
      return this._firstProp("summary");
    }
    set summary(value) {
      this._setProp("summary", value);
    }
    /**
     * The event description.
     * @type {String}
     */
    get description() {
      return this._firstProp("description");
    }
    set description(value) {
      this._setProp("description", value);
    }
    /**
     * The event color from [rfc7986](https://datatracker.ietf.org/doc/html/rfc7986)
     * @type {String}
     */
    get color() {
      return this._firstProp("color");
    }
    set color(value) {
      this._setProp("color", value);
    }
    /**
     * The organizer value as an uri. In most cases this is a mailto: uri, but
     * it can also be something else, like urn:uuid:...
     * @type {String}
     */
    get organizer() {
      return this._firstProp("organizer");
    }
    set organizer(value) {
      this._setProp("organizer", value);
    }
    /**
     * The sequence value for this event. Used for scheduling
     * see {@tutorial terminology}.
     * @type {Number}
     */
    get sequence() {
      return this._firstProp("sequence");
    }
    set sequence(value) {
      this._setProp("sequence", value);
    }
    /**
     * The recurrence id for this event. See {@tutorial terminology} for details.
     * @type {Time}
     */
    get recurrenceId() {
      return this._firstProp("recurrence-id");
    }
    set recurrenceId(value) {
      this._setTime("recurrence-id", value);
    }
    /**
     * Set/update a time property's value.
     * This will also update the TZID of the property.
     *
     * TODO: this method handles the case where we are switching
     * from a known timezone to an implied timezone (one without TZID).
     * This does _not_ handle the case of moving between a known
     *  (by TimezoneService) timezone to an unknown timezone...
     *
     * We will not add/remove/update the VTIMEZONE subcomponents
     *  leading to invalid ICAL data...
     * @private
     * @param {String} propName     The property name
     * @param {Time} time           The time to set
     */
    _setTime(propName, time) {
      let prop2 = this.component.getFirstProperty(propName);
      if (!prop2) {
        prop2 = new Property(propName);
        this.component.addProperty(prop2);
      }
      if (time.zone === Timezone.localTimezone || time.zone === Timezone.utcTimezone) {
        prop2.removeParameter("tzid");
      } else {
        prop2.setParameter("tzid", time.zone.tzid);
      }
      prop2.setValue(time);
    }
    _setProp(name, value) {
      this.component.updatePropertyWithValue(name, value);
    }
    _firstProp(name) {
      return this.component.getFirstPropertyValue(name);
    }
    /**
     * The string representation of this event.
     * @return {String}
     */
    toString() {
      return this.component.toString();
    }
  };
  __publicField(_Event, "THISANDFUTURE", "THISANDFUTURE");
  var Event = _Event;
  function compareRangeException(a, b) {
    if (a[0] > b[0]) return 1;
    if (b[0] > a[0]) return -1;
    return 0;
  }
  var ComponentParser = class {
    /**
     * Creates a new ICAL.ComponentParser instance.
     *
     * @param {Object=} options                   Component parser options
     * @param {Boolean} options.parseEvent        Whether events should be parsed
     * @param {Boolean} options.parseTimezeone    Whether timezones should be parsed
     */
    constructor(options) {
      /**
       * When true, parse events
       *
       * @type {Boolean}
       */
      __publicField(this, "parseEvent", true);
      /**
       * When true, parse timezones
       *
       * @type {Boolean}
       */
      __publicField(this, "parseTimezone", true);
      /* SAX like events here for reference */
      /**
       * Fired when parsing is complete
       * @callback
       */
      __publicField(
        this,
        "oncomplete",
        /* c8 ignore next */
        function() {
        }
      );
      /**
       * Fired if an error occurs during parsing.
       *
       * @callback
       * @param {Error} err details of error
       */
      __publicField(
        this,
        "onerror",
        /* c8 ignore next */
        function(err) {
        }
      );
      /**
       * Fired when a top level component (VTIMEZONE) is found
       *
       * @callback
       * @param {Timezone} component     Timezone object
       */
      __publicField(
        this,
        "ontimezone",
        /* c8 ignore next */
        function(component) {
        }
      );
      /**
       * Fired when a top level component (VEVENT) is found.
       *
       * @callback
       * @param {Event} component    Top level component
       */
      __publicField(
        this,
        "onevent",
        /* c8 ignore next */
        function(component) {
        }
      );
      if (typeof options === "undefined") {
        options = {};
      }
      for (let [key, value] of Object.entries(options)) {
        this[key] = value;
      }
    }
    /**
     * Process a string or parse ical object.  This function itself will return
     * nothing but will start the parsing process.
     *
     * Events must be registered prior to calling this method.
     *
     * @param {Component|String|Object} ical      The component to process,
     *        either in its final form, as a jCal Object, or string representation
     */
    process(ical) {
      if (typeof ical === "string") {
        ical = parse(ical);
      }
      if (!(ical instanceof Component)) {
        ical = new Component(ical);
      }
      let components = ical.getAllSubcomponents();
      let i = 0;
      let len = components.length;
      let component;
      for (; i < len; i++) {
        component = components[i];
        switch (component.name) {
          case "vtimezone":
            if (this.parseTimezone) {
              let tzid = component.getFirstPropertyValue("tzid");
              if (tzid) {
                this.ontimezone(new Timezone({
                  tzid,
                  component
                }));
              }
            }
            break;
          case "vevent":
            if (this.parseEvent) {
              this.onevent(new Event(component));
            }
            break;
          default:
            continue;
        }
      }
      this.oncomplete();
    }
  };
  var ICALmodule = {
    /**
     * The number of characters before iCalendar line folding should occur
     * @type {Number}
     * @default 75
     */
    foldLength: 75,
    debug: false,
    /**
     * The character(s) to be used for a newline. The default value is provided by
     * rfc5545.
     * @type {String}
     * @default "\r\n"
     */
    newLineChar: "\r\n",
    Binary,
    Component,
    ComponentParser,
    Duration,
    Event,
    Period,
    Property,
    Recur,
    RecurExpansion,
    RecurIterator,
    Time,
    Timezone,
    TimezoneService,
    UtcOffset,
    VCardTime,
    parse,
    stringify,
    design,
    helpers
  };

  // ../calendar/vanilla/src/schemas.js
  var CAL = "https://pondersource.com/ns/calendar/";
  var ICAL = "http://www.w3.org/2002/12/cal/ical#";
  var SCHEMA = "https://schema.org/";
  var ATOMIC = "https://atomicdata.dev/";
  var SOURCE_KEY = CAL + "sources";
  var temporal = {
    type: "object",
    required: ["value"],
    additionalProperties: false,
    properties: {
      value: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:\\d{2})?)?$" },
      timezone: { type: "string", minLength: 1 }
    }
  };
  var calendarSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: CAL + "Event.json",
    type: "object",
    required: ["uid", "start"],
    additionalProperties: true,
    properties: {
      uid: { type: "string", minLength: 1 },
      title: { type: "string" },
      description: { type: "string" },
      location: { type: "string" },
      duration: { type: "string" },
      start: temporal,
      end: temporal,
      recurrenceId: temporal,
      recurrence: { type: "object", additionalProperties: true, properties: {
        rules: { type: "array", items: { type: "string" } },
        dates: { type: "array", items: temporal },
        excludedDates: { type: "array", items: temporal }
      } },
      sources: { type: "object", additionalProperties: true }
    }
  };
  var fieldMappings = [
    { field: "uid", ical: "uid", rdf: ICAL + "uid", schema: SCHEMA + "identifier", atomic: CAL + "uid" },
    { field: "title", ical: "summary", rdf: ICAL + "summary", schema: SCHEMA + "name", atomic: ATOMIC + "properties/name" },
    { field: "description", ical: "description", rdf: ICAL + "description", schema: SCHEMA + "description", atomic: ATOMIC + "properties/description" },
    { field: "location", ical: "location", rdf: ICAL + "location", schema: SCHEMA + "location", atomic: CAL + "location" },
    { field: "duration", ical: "duration", rdf: ICAL + "duration", schema: SCHEMA + "duration", atomic: CAL + "duration" },
    { field: "start", ical: "dtstart", rdf: ICAL + "dtstart", schema: SCHEMA + "startDate", atomic: CAL + "start" },
    { field: "end", ical: "dtend", rdf: ICAL + "dtend", schema: SCHEMA + "endDate", atomic: CAL + "end" },
    { field: "recurrenceId", ical: "recurrence-id", rdf: ICAL + "recurrenceId", schema: CAL + "recurrenceId", atomic: CAL + "recurrenceId" }
  ].map((field) => ({ ...field, schemaHttp: field.schema.startsWith(SCHEMA) ? field.schema.replace(SCHEMA, "http://schema.org/") : field.schema }));
  var prolog = `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ical: <${ICAL}>
PREFIX s: <${SCHEMA}>
PREFIX cal: <${CAL}>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
`;
  var calendarShape = prolog + [
    ["VEvent", "ical:Vevent", "rdf"],
    ["SchemaEvent", "s:Event", "schema"],
    ["SchemaHttpEvent", "<http://schema.org/Event>", "schemaHttp"]
  ].map(([name, type, vocabulary]) => `<${CAL + name}> EXTRA a {
  a [${type}] ;
${fieldMappings.map((field) => `  <${field[vocabulary]}> ${["start", "end", "recurrenceId"].includes(field.field) ? "(xsd:date OR xsd:dateTime)" : field.field === "uid" ? "xsd:string" : "(xsd:string OR rdf:langString)"}${field.field === "start" || field.field === "uid" && vocabulary === "rdf" ? "" : field.field === "uid" ? "?" : "*"} ;`).join("\n")}
  cal:startTimezone xsd:string? ; cal:endTimezone xsd:string? ; cal:recurrenceIdTimezone xsd:string? ;
  cal:recurrence xsd:string? ; cal:sources xsd:string?
}`).join("\n") + "\n";
  var prop = ATOMIC + "properties/";
  var definitions = [
    ...fieldMappings.filter((field) => !field.atomic.startsWith(prop)).map((field) => [field.atomic, "string"]),
    ...["startTimezone", "endTimezone", "recurrenceIdTimezone"].map((name) => [CAL + name, "string"]),
    [CAL + "recurrence", "json"],
    [SOURCE_KEY, "json"]
  ];
  var atomicSchema = [
    {
      "@id": CAL + "Event",
      [prop + "isA"]: [ATOMIC + "classes/Class"],
      [prop + "shortname"]: "calendar-event",
      [prop + "requires"]: [CAL + "uid", CAL + "start"],
      [prop + "recommends"]: fieldMappings.slice(1).map((field) => field.atomic)
    },
    ...definitions.map(([id, type]) => ({
      "@id": id,
      [prop + "isA"]: [ATOMIC + "classes/Property"],
      [prop + "shortname"]: "calendar-" + id.slice(CAL.length).replace(/[A-Z]/g, (char) => "-" + char.toLowerCase()),
      [prop + "datatype"]: ATOMIC + "datatypes/" + type
    }))
  ];

  // ../calendar/vanilla/src/codecs.js
  function createCalendarCodecs(ICALJS, { Parser, Writer, DataFactory: DataFactory2 }) {
    const { namedNode: namedNode5, literal: literal2, quad: quad4, defaultGraph: defaultGraph2, blankNode: blankNode2 } = DataFactory2;
    const XSD2 = "http://www.w3.org/2001/XMLSchema#";
    const TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    const META = "x-pondersource-calendar-sources";
    const timed = (name) => ["start", "end", "recurrenceId"].includes(name);
    const clone2 = (value) => structuredClone(value);
    const sourcesOf = (value) => {
      if (value === void 0) return {};
      if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("Invalid calendar source envelope");
      return clone2(value);
    };
    function validateEvent(event) {
      if (!event || typeof event.uid !== "string" || !event.uid || !event.start) throw Error("A calendar event needs a UID and start");
      for (const field of ["title", "description", "location"]) if (event[field] !== void 0 && typeof event[field] !== "string") throw Error("Invalid " + field);
      for (const value of [event.start, event.end, event.recurrenceId, ...event.recurrence?.dates || [], ...event.recurrence?.excludedDates || []].filter(Boolean)) {
        if (typeof value.value !== "string" || !/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?)?$/.test(value.value)) throw Error("Invalid calendar date");
        const [year, month, day] = value.value.slice(0, 10).split("-").map(Number);
        const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (month < 1 || month > 12 || day < 1 || day > [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]) throw Error("Invalid calendar date");
        if (value.value.includes("T") && (+value.value.slice(11, 13) > 23 || +value.value.slice(14, 16) > 59 || +value.value.slice(17, 19) > 59)) throw Error("Invalid calendar time");
        if (value.timezone !== void 0 && (typeof value.timezone !== "string" || !value.timezone || !value.value.includes("T") || /[Z+-]/.test(value.value.slice(19)))) throw Error("A timezone requires a floating local date-time");
      }
      if (event.end && event.end.value.length === 10 !== (event.start.value.length === 10)) throw Error("Start and end must both be dates or both date-times");
      if (event.duration !== void 0) {
        if (event.end) throw Error("Use either end or duration, not both");
        if (typeof event.duration !== "string") throw Error("Invalid duration");
        ICALJS.Duration.fromString(event.duration);
      }
      if (event.recurrence?.rules) for (const rule of event.recurrence.rules) ICALJS.Recur.fromString(rule);
      return event;
    }
    function fromJSON(document2) {
      const value = typeof document2 === "string" ? JSON.parse(document2) : clone2(document2);
      const sources = sourcesOf(value.sources);
      delete value.sources;
      return validateEvent({ ...value, sources: { ...sources, json: value } });
    }
    function toJSON(event) {
      validateEvent(event);
      const original = clone2(event.sources?.json || {});
      for (const name of [...fieldMappings.map((field) => field.field), "recurrence"]) delete original[name];
      return { ...original, ...clone2(event) };
    }
    function timeFromProperty(property) {
      if (!property) return void 0;
      const time = property.getFirstValue();
      return { value: time.toString(), ...property.getParameter("tzid") ? { timezone: property.getParameter("tzid") } : {} };
    }
    function writeTime(component, name, value, parameters = {}) {
      const property = new ICALJS.Property(name);
      const text = /[+-]\d{2}:\d{2}$/.test(value.value) ? new Date(value.value).toISOString().slice(0, 19) + "Z" : value.value;
      property.setValue(ICALJS.Time.fromString(text));
      for (const [key, item] of Object.entries(parameters)) if (!["tzid", "value"].includes(key)) property.setParameter(key, item);
      if (value.timezone) property.setParameter("tzid", value.timezone);
      component.addProperty(property);
    }
    function fromICalendar(text) {
      const calendar = new ICALJS.Component(ICALJS.parse(text));
      if (calendar.name !== "vcalendar") throw Error("Expected a VCALENDAR document");
      const events = calendar.getAllSubcomponents("vevent");
      const envelopes = events.map((event) => {
        const raw = event.getFirstPropertyValue(META);
        event.removeAllProperties(META);
        return raw ? sourcesOf(JSON.parse(raw)) : {};
      });
      const source = events.some((_event, index) => Object.keys(envelopes[index]).length) ? calendar.toString() : text;
      return events.map((component, index) => {
        const result = {};
        for (const field of fieldMappings) {
          const value = timed(field.field) ? timeFromProperty(component.getFirstProperty(field.ical)) : component.getFirstPropertyValue(field.ical);
          if (value !== null && value !== void 0) result[field.field] = field.field === "duration" ? value.toString() : value;
        }
        const rules = component.getAllProperties("rrule").map((property) => property.getFirstValue().toString());
        const dates = (name) => component.getAllProperties(name).flatMap((property) => property.getValues().map((time) => ({ value: time.toString(), ...property.getParameter("tzid") ? { timezone: property.getParameter("tzid") } : {} })));
        result.recurrence = { rules, dates: dates("rdate"), excludedDates: dates("exdate") };
        result.sources = { ...envelopes[index], icalendar: { text: source, index } };
        return validateEvent(result);
      });
    }
    function toICalendar(event) {
      validateEvent(event);
      const source = event.sources?.icalendar;
      const calendar = source ? new ICALJS.Component(ICALJS.parse(source.text)) : new ICALJS.Component("vcalendar");
      if (!source) {
        calendar.addPropertyWithValue("version", "2.0");
        calendar.addPropertyWithValue("prodid", "-//Ponder Source//Calendar module//EN");
      }
      const component = source ? calendar.getAllSubcomponents("vevent")[source.index] : new ICALJS.Component("vevent");
      if (!component) throw Error("Calendar source event is missing");
      if (!source) {
        calendar.addSubcomponent(component);
        component.addPropertyWithValue("dtstamp", ICALJS.Time.fromJSDate(/* @__PURE__ */ new Date(), true));
      }
      for (const field of fieldMappings) {
        const parameters = clone2(component.getFirstProperty(field.ical)?.toJSON()[1] || {});
        component.removeAllProperties(field.ical);
        if (event[field.field] === void 0) continue;
        if (timed(field.field)) writeTime(component, field.ical, event[field.field], parameters);
        else {
          const property = new ICALJS.Property(field.ical);
          property.setValue(field.field === "duration" ? ICALJS.Duration.fromString(event[field.field]) : event[field.field]);
          for (const [key, item] of Object.entries(parameters)) property.setParameter(key, item);
          component.addProperty(property);
        }
      }
      if (event.end) component.removeAllProperties("duration");
      const before = source ? fromICalendar(source.text)[source.index].recurrence : void 0;
      if (!source || JSON.stringify(before) !== JSON.stringify(event.recurrence)) {
        for (const key of ["rrule", "rdate", "exdate"]) component.removeAllProperties(key);
        for (const rule of event.recurrence?.rules || []) component.addPropertyWithValue("rrule", ICALJS.Recur.fromString(rule));
        for (const [key, name] of [["dates", "rdate"], ["excludedDates", "exdate"]]) for (const time of event.recurrence?.[key] || []) writeTime(component, name, time);
      }
      component.removeAllProperties(META);
      component.addPropertyWithValue(META, JSON.stringify(event.sources || {}));
      return calendar.toString();
    }
    const nquads = (quads) => new Writer({ format: "N-Quads" }).quadsToString(quads);
    const parse2 = (text, baseIRI) => new Parser({ baseIRI, blankNodePrefix: "" }).parse(text);
    const termKey = (term) => term.termType + ":" + term.value;
    const storedTerm = (term) => ({ type: term.termType, value: term.value });
    const restoreTerm = (term) => term.type === "BlankNode" ? blankNode2(term.value) : term.type === "DefaultGraph" ? defaultGraph2() : namedNode5(term.value);
    function fromRDF(text, { baseIRI } = {}) {
      const quads = parse2(text, baseIRI), groups = /* @__PURE__ */ new Map();
      for (const statement of quads) if (statement.predicate.value === TYPE && [ICAL + "Vevent", SCHEMA + "Event", "http://schema.org/Event"].includes(statement.object.value)) {
        const key = termKey(statement.subject) + "|" + termKey(statement.graph);
        if (!groups.has(key)) groups.set(key, { subject: statement.subject, graph: statement.graph, vocabulary: statement.object.value === ICAL + "Vevent" ? "rdf" : statement.object.value === SCHEMA + "Event" ? "schema" : "schemaHttp" });
      }
      return [...groups.values()].map(({ subject, graph, vocabulary }) => {
        const own = quads.filter((q) => q.subject.equals(subject) && q.graph.equals(graph));
        const envelope = own.find((q) => q.predicate.value === SOURCE_KEY && q.object.termType === "Literal");
        const sources = envelope ? sourcesOf(JSON.parse(envelope.object.value)) : {};
        const result = {};
        const selected = {};
        for (const field of fieldMappings) {
          const statement = own.find((q) => q.predicate.value === field[vocabulary] && q.object.termType === "Literal");
          if (!statement) continue;
          selected[field.field] = own.filter((q) => q.predicate.value === field[vocabulary]).indexOf(statement);
          if (timed(field.field)) {
            const timezone = own.find((q) => q.predicate.value === CAL + field.field + "Timezone")?.object.value;
            result[field.field] = { value: statement.object.value, ...timezone ? { timezone } : {} };
          } else result[field.field] = statement.object.value;
        }
        result.uid || (result.uid = subject.termType === "NamedNode" ? subject.value : void 0);
        const recurrence = own.find((q) => q.predicate.value === CAL + "recurrence");
        if (recurrence) result.recurrence = JSON.parse(recurrence.object.value);
        else {
          const rules = own.filter((q) => q.predicate.value === ICAL + "rrule" && q.object.termType === "Literal").map((q) => q.object.value);
          if (rules.length) result.recurrence = { rules };
        }
        const clean = quads.filter((q) => q.predicate.value !== SOURCE_KEY);
        result.sources = { ...sources, rdf: { text: nquads(clean), subject: storedTerm(subject), graph: storedTerm(graph), vocabulary, selected } };
        return validateEvent(result);
      });
    }
    function toRDF(event, { id } = {}) {
      validateEvent(event);
      const source = event.sources?.rdf;
      const subject = source ? restoreTerm(source.subject) : namedNode5(id || "urn:calendar:" + encodeURIComponent(event.uid) + (event.recurrenceId ? ":" + encodeURIComponent(event.recurrenceId.value) : ""));
      const graph = source ? restoreTerm(source.graph) : defaultGraph2();
      const vocabulary = source?.vocabulary || "rdf";
      let quads = source ? parse2(source.text) : [quad4(subject, namedNode5(TYPE), namedNode5(ICAL + "Vevent"), graph)];
      const own = (q) => q.subject.equals(subject) && q.graph.equals(graph);
      for (const field of fieldMappings) {
        const predicate = field[vocabulary], existing = quads.filter((q) => own(q) && q.predicate.value === predicate);
        const selected = existing[source?.selected?.[field.field] ?? 0];
        if (selected?.object.termType === "Literal" && event[field.field] === void 0) quads = quads.filter((q) => q !== selected);
        else if (selected?.object.termType !== "Literal" && existing.length && event[field.field] !== void 0) throw Error("Cannot replace a structured RDF " + field.field + " implicitly");
        if (event[field.field] !== void 0) {
          const value = event[field.field];
          const object = timed(field.field) ? literal2(value.value, namedNode5(XSD2 + (value.value.length === 10 ? "date" : "dateTime"))) : literal2(value, selected?.object.language || selected?.object.datatype);
          const statement = quad4(subject, namedNode5(predicate), object, graph);
          if (selected?.object.termType === "Literal") quads[quads.indexOf(selected)] = statement;
          else quads.push(statement);
        }
        if (timed(field.field)) {
          quads = quads.filter((q) => !(own(q) && q.predicate.value === CAL + field.field + "Timezone"));
          if (event[field.field]?.timezone) quads.push(quad4(subject, namedNode5(CAL + field.field + "Timezone"), literal2(event[field.field].timezone), graph));
        }
      }
      quads = quads.filter((q) => !(own(q) && [CAL + "recurrence", SOURCE_KEY].includes(q.predicate.value)));
      if (event.recurrence) {
        quads = quads.filter((q) => !(own(q) && q.predicate.value === ICAL + "rrule" && q.object.termType === "Literal"));
        for (const rule of event.recurrence.rules || []) quads.push(quad4(subject, namedNode5(ICAL + "rrule"), literal2(rule), graph));
        quads.push(quad4(subject, namedNode5(CAL + "recurrence"), literal2(JSON.stringify(event.recurrence)), graph));
      }
      quads.push(quad4(subject, namedNode5(SOURCE_KEY), literal2(JSON.stringify(event.sources || {})), graph));
      return nquads(quads);
    }
    function fromAtomic(document2) {
      const value = clone2(document2), sources = sourcesOf(value[SOURCE_KEY]);
      delete value[SOURCE_KEY];
      const result = {};
      for (const field of fieldMappings) if (value[field.atomic] !== void 0) {
        result[field.field] = timed(field.field) ? { value: value[field.atomic], ...value[CAL + field.field + "Timezone"] ? { timezone: value[CAL + field.field + "Timezone"] } : {} } : value[field.atomic];
      }
      if (value[CAL + "recurrence"]) result.recurrence = clone2(value[CAL + "recurrence"]);
      result.sources = { ...sources, atomic: value };
      return validateEvent(result);
    }
    function toAtomic(event, { id } = {}) {
      validateEvent(event);
      const result = clone2(event.sources?.atomic || {});
      result["@id"] = id || result["@id"];
      if (!result["@id"] || !/^https?:\/\//.test(result["@id"])) throw Error("An Atomic resource URL is required");
      const isA = ATOMIC + "properties/isA";
      result[isA] = [.../* @__PURE__ */ new Set([...result[isA] || [], CAL + "Event"])];
      for (const field of fieldMappings) {
        delete result[field.atomic];
        delete result[CAL + field.field + "Timezone"];
        if (event[field.field] !== void 0) result[field.atomic] = timed(field.field) ? event[field.field].value : event[field.field];
        if (timed(field.field) && event[field.field]?.timezone) result[CAL + field.field + "Timezone"] = event[field.field].timezone;
      }
      delete result[CAL + "recurrence"];
      if (event.recurrence) result[CAL + "recurrence"] = clone2(event.recurrence);
      result[SOURCE_KEY] = clone2(event.sources || {});
      return result;
    }
    function calendarModule2(client) {
      client.declareType("event", calendarSchema);
      const path = (id) => "events/" + encodeURIComponent(id) + ".json";
      return {
        calendarSchema,
        calendarShape,
        atomicSchema,
        fieldMappings,
        fromJSON,
        toJSON,
        fromRDF,
        toRDF,
        fromAtomic,
        toAtomic,
        fromICalendar,
        toICalendar,
        async get(id) {
          const event = await client.getObject(path(id));
          return event ? fromJSON(event) : void 0;
        },
        async getAll() {
          const all = await client.getAll("events/");
          return Object.fromEntries(Object.entries(all || {}).map(([key, event]) => [decodeURIComponent(key.slice(0, -5)), fromJSON(event)]));
        },
        async create(event, id = crypto.randomUUID()) {
          if (await client.getObject(path(id))) throw Error("Calendar event already exists");
          await client.storeObject("event", path(id), toJSON(event));
          return id;
        },
        async update(id, changes) {
          const previous = await this.get(id);
          if (!previous) throw Error("Calendar event does not exist");
          const next = { ...previous, ...clone2(changes) };
          await client.storeObject("event", path(id), toJSON(next));
          return next;
        },
        async delete(id) {
          await client.remove(path(id));
        }
      };
    }
    return { validateEvent, fromJSON, toJSON, fromICalendar, toICalendar, fromRDF, toRDF, fromAtomic, toAtomic, calendarModule: calendarModule2 };
  }

  // ../calendar/vanilla/src/rdf-factory.js
  function createCalendarRDF({ fromRDF, toRDF, validateEvent }, Parser) {
    return function calendarRDF2({ fetch, root }) {
      const base = new URL(root);
      if (!base.pathname.endsWith("/") || base.search || base.hash || base.username || base.password || !(base.protocol === "https:" || base.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname))) throw Error("Choose an HTTPS calendar root (or loopback HTTP)");
      const owned = (value) => {
        const url = new URL(value, base);
        if (!url.href.startsWith(base.href) || url.username || url.password || url.search || /%(?:2f|5c)/i.test(url.pathname)) throw Error("Calendar resource is outside the selected root");
        return url;
      };
      const read = async (value) => {
        const id = owned(value), url = new URL(id);
        url.hash = "";
        const response = await fetch(url.href, { headers: { Accept: "text/turtle, application/n-quads;q=0.9" } });
        if (!response.ok) throw Error("Calendar read failed: " + response.status);
        const events = fromRDF(await response.text(), { baseIRI: url.href });
        const event = id.hash ? events.find((event2) => event2.sources.rdf.subject.value === id.href) : events.length === 1 ? events[0] : void 0;
        if (!event) throw Error("Select a specific event in this RDF document");
        return { event, events, url: url.href, etag: response.headers.get("ETag") };
      };
      const write = async (url, method, body, etag) => {
        const response = await fetch(url, { method, headers: { "Content-Type": "application/n-quads", ...etag ? { "If-Match": etag } : { "If-None-Match": "*" } }, ...body === void 0 ? {} : { body } });
        if (!response.ok) throw Error(response.status === 412 ? "Calendar changed; reload before retrying" : "Calendar write failed: " + response.status);
      };
      return {
        async get(id) {
          return (await read(id)).event;
        },
        async getAll(container = base.href) {
          const url = owned(container);
          url.hash = "";
          const response = await fetch(url.href, { headers: { Accept: "text/turtle" } });
          if (!response.ok) throw Error("Calendar listing failed: " + response.status);
          const children = new Parser({ baseIRI: url.href }).parse(await response.text()).filter((q) => q.predicate.value === "http://www.w3.org/ns/ldp#contains" && q.object.termType === "NamedNode");
          const result = {};
          for (const child of children) {
            const target = owned(child.object.value);
            if (target.pathname.endsWith("/")) continue;
            const document2 = await fetch(target.href, { headers: { Accept: "text/turtle, application/n-quads;q=0.9" } });
            if (!document2.ok) throw Error("Calendar read failed: " + document2.status);
            for (const event of fromRDF(await document2.text(), { baseIRI: target.href })) result[event.sources.rdf.subject.value] = event;
          }
          return result;
        },
        async create(event, id = new URL(crypto.randomUUID() + ".ttl#event", base).href) {
          const subject = owned(id);
          if (!subject.hash) subject.hash = "event";
          const document2 = new URL(subject);
          document2.hash = "";
          await write(document2.href, "PUT", toRDF(event, { id: subject.href }));
          return subject.href;
        },
        async update(id, changes) {
          const current = await read(id);
          if (!current.etag) throw Error("Calendar server did not provide an ETag; editing is blocked");
          const next = validateEvent({ ...current.event, ...structuredClone(changes) });
          await write(current.url, "PUT", toRDF(next), current.etag);
          return next;
        },
        async delete(id) {
          const current = await read(id);
          if (!current.etag) throw Error("Calendar server did not provide an ETag; deleting is blocked");
          if (current.events.length !== 1) throw Error("This document contains other events; deleting the document is blocked");
          await write(current.url, "DELETE", void 0, current.etag);
        }
      };
    };
  }

  // src/calendar.js
  var codecs = createCalendarCodecs(ICALmodule, src_exports);
  var { calendarModule } = codecs;
  var calendarRDF = createCalendarRDF(codecs, N3Parser);

  // src/oauth-home.js
  function useOAuthHome(rs, browser = window) {
    for (const name of ["dropbox", "googledrive"]) {
      const backend = rs[name];
      if (!backend) continue;
      const connect = backend.connect.bind(backend);
      backend.connect = async (...args) => {
        const previous = browser.location.href;
        browser.history.replaceState(browser.history.state, "", browser.location.origin + "/");
        try {
          return await connect(...args);
        } catch (error) {
          browser.history.replaceState(browser.history.state, "", previous);
          throw error;
        }
      };
    }
  }

  // src/connection.js
  function connectApp(module, { RemoteStorage, Widget, apiKeys = {}, element = "storage-widget", widgetOptions = {}, nativeSolid = false }) {
    const rs = new RemoteStorage({ modules: [module] });
    rs.access.claim(module.name, "rw");
    rs.caching.enable("/" + module.name + "/");
    rs.setApiKeys(Object.fromEntries(Object.entries(apiKeys).filter(([name]) => name !== "onedrive" || rs.onedrive)));
    const widget = new Widget(rs, { solidProviders: { allowAnyProvider: true }, skipInitial: true, leaveOpen: true, ...widgetOptions });
    const host = document.getElementById(element);
    Object.assign(host.style, { position: "fixed", bottom: "12px", left: "12px", zIndex: "1000" });
    widget.attach(element);
    const listeners = /* @__PURE__ */ new Set();
    let preparing, activeApi, generation = 0;
    const ready = new Promise((resolve) => rs.on("ready", () => {
      useOAuthHome(rs);
      resolve();
    }));
    const prepare = () => preparing || (preparing = (async () => {
      const current = generation, adapter = rs[module.name];
      adapter.configureSync(() => rs.startSync());
      let api = adapter;
      if (rs.backend === "solid" && nativeSolid) {
        const session = rs.solid.getSession();
        if (!session?.info?.webId) throw Error("The Solid session has no identity");
        api = adapter.nativeSolid({ fetch: session.fetch.bind(session), webId: session.info.webId, root: rs.solid.getPodURL() });
      } else {
        await adapter.initialize();
        if (rs.backend === "solid") {
          const session = rs.solid.getSession();
          await adapter.migrateSolid(session.fetch.bind(session), session.info.webId, rs.solid.getPodURL() + module.name + "/_rs/");
        }
      }
      if (current !== generation) throw Error("The storage connection changed while it was opening");
      activeApi = api;
      const profile = api.webId.split("#")[0];
      return {
        webId: api.webId,
        name: rs.remote.userAddress || "My storage",
        cloaked: false,
        writableProfileUrl: profile.startsWith(api.root) ? profile : void 0,
        storageUrls: [api.root],
        ...api.nativeSolidDocuments ? {} : { privateTypeIndexUrl: api.root + "settings/privateTypeIndex" }
      };
    })());
    rs.on("connected", () => {
      const current = ++generation;
      preparing = void 0;
      activeApi = void 0;
      prepare().then((user) => {
        if (current === generation) for (const listener of listeners) listener(user);
      }).catch((error) => {
        if (current !== generation) return;
        const message = document.createElement("p");
        message.setAttribute("role", "alert");
        message.textContent = "Storage could not be opened: " + error.message;
        document.getElementById(element).append(message);
      });
    });
    rs.on("disconnected", () => {
      generation++;
      preparing = void 0;
      activeApi = void 0;
      for (const listener of listeners) listener(null);
    });
    return {
      rs,
      widget,
      get api() {
        return activeApi || rs[module.name];
      },
      ready,
      async restore() {
        await ready;
        return rs.connected ? prepare() : null;
      },
      onUser(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      open() {
        widget.open();
        widget.showChooseOrSignIn();
      },
      disconnect() {
        if (rs.connected) rs.disconnect();
      },
      fetch: (input, init) => {
        const adapter = rs[module.name], api = activeApi || adapter;
        const url = new URL(input instanceof Request ? input.url : String(input), api.root);
        if (url.href.startsWith(adapter.root)) return adapter.fetch(input, init);
        if (api.nativeSolidDocuments) return api.fetch(input, init);
        return publicRead(input, init, api.root);
      }
    };
  }

  // src/index.js
  var Calendar = { name: "calendar", builder(client) {
    const api = calendarModule(client);
    api.nativeSolid = (context) => nativeSolidView(context, api, calendarRDF, (mode) => client.storage?.access ? client.storage.access.checkPermission("calendar", mode) : true);
    return { exports: api };
  } };
  function dataModule(name, classes, helpers2 = {}, domain = () => ({})) {
    return { name, builder(privateClient, publicClient) {
      const store = createResourceStore(privateClient, name);
      const root = "https://" + name + ".storage.pondersource.invalid/";
      const fetch = createLocalPod({ root, store, newEtag: () => '"' + crypto.randomUUID() + '"' });
      privateClient.declareType("migration", { type: "object", properties: { complete: { type: "boolean" } }, required: ["complete"] });
      const api = {
        ...helpers2,
        nativeSolid: (context) => nativeSolidView({ ...context, adapter: api }, helpers2, domain, (mode) => privateClient.storage?.access ? privateClient.storage.access.checkPermission(name, mode) : true),
        ...publicResources({ privateClient, publicClient, store, root }),
        async migrateSolid(fetcher, webId, excludePrefix) {
          if ((await privateClient.getObject("_rs/migration"))?.complete) return;
          await importSolid({ fetcher, webId, classes, root, store, fetch, excludePrefix });
          await privateClient.storeObject("migration", "_rs/migration", { complete: true });
        },
        importSolid: (fetcher, webId) => importSolid({ fetcher, webId, classes, root, store, fetch }),
        root,
        webId: root + "profile/card#me",
        classes,
        fetch,
        // Solid Memo's existing RDF adapters can use the exact resource-store contract.
        resources: store,
        onChange(callback) {
          if (!privateClient.on) throw Error("This client does not provide change events");
          privateClient.on("change", callback);
          return () => privateClient.removeEventListener("change", callback);
        },
        async initialize() {
          const profile = root + "profile/card";
          if (await store.get(profile)) return;
          await fetch(root + "settings/privateTypeIndex", { method: "PUT", headers: { "Content-Type": "text/turtle" }, body: "<> a <http://www.w3.org/ns/solid/terms#TypeIndex>, <http://www.w3.org/ns/solid/terms#UnlistedDocument>." });
          await fetch(root + "settings/preferences", { method: "PUT", headers: { "Content-Type": "text/turtle" }, body: `<${root}profile/card#me> <http://www.w3.org/ns/solid/terms#privateTypeIndex> <${root}settings/privateTypeIndex>.` });
          await fetch(profile, { method: "PUT", headers: { "Content-Type": "text/turtle", "If-None-Match": "*" }, body: `<#me> a <http://xmlns.com/foaf/0.1/Person>; <http://xmlns.com/foaf/0.1/name> "My storage"; <http://www.w3.org/ns/pim/space#storage> <${root}>; <http://www.w3.org/ns/pim/space#preferencesFile> <${root}settings/preferences>; <http://www.w3.org/ns/solid/terms#privateTypeIndex> <${root}settings/privateTypeIndex>.` });
        }
      };
      return { exports: Object.assign(api, domain(api)) };
    } };
  }
  var Recipes = dataModule("recipes", ["https://schema.org/Recipe"], { parseRecipes });
  var Movies = dataModule("movies", ["https://schema.org/Movie", "https://schema.org/WatchAction"], { parseMovies });
  var FlashcardsRdf = dataModule("flashcards", ["https://solid-memo.com/ns/vocab/v1.ttl#Instance"], {}, flashcardsDomain);
  var Flashcards2 = { name: "flashcards", builder(client, publicClient) {
    const legacy = flashcards_legacy_default.builder(client).exports;
    const api = FlashcardsRdf.builder(client, publicClient).exports;
    for (const [key, value] of Object.entries(legacy)) if (!(key in api)) api[key] = value;
    api.listGroups = async () => {
      const groups = await client.getListing();
      return Object.fromEntries(Object.entries(groups || {}).filter(([key]) => key.endsWith("/") && key !== "_rs/"));
    };
    return { exports: api };
  } };
  return __toCommonJS(index_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
