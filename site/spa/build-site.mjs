var __defProp = Object.defineProperty;
var __export = (target, all8) => {
  for (var name in all8)
    __defProp(target, name, { get: all8[name], enumerable: true });
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Function.js
var isFunction = (input) => typeof input === "function";
var dual = function(arity, body) {
  if (typeof arity === "function") {
    return function() {
      if (arity(arguments)) {
        return body.apply(this, arguments);
      }
      return (self) => body(self, ...arguments);
    };
  }
  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);
    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self) {
          return body(self, a);
        };
      };
    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self) {
          return body(self, a, b);
        };
      };
    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self) {
          return body(self, a, b, c);
        };
      };
    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self) {
          return body(self, a, b, c, d);
        };
      };
    default:
      return function() {
        if (arguments.length >= arity) {
          return body.apply(this, arguments);
        }
        const args = arguments;
        return function(self) {
          return body(self, ...args);
        };
      };
  }
};
var identity = (a) => a;
var constant = (value5) => () => value5;
var constTrue = /* @__PURE__ */ constant(true);
var constFalse = /* @__PURE__ */ constant(false);
var constUndefined = /* @__PURE__ */ constant(void 0);
var constVoid = constUndefined;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/version.js
var moduleVersion = "2.0.0-next.62";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/GlobalValue.js
var globalStoreId = /* @__PURE__ */ Symbol.for(`effect/GlobalValue/globalStoreId/${moduleVersion}`);
if (!(globalStoreId in globalThis)) {
  ;
  globalThis[globalStoreId] = /* @__PURE__ */ new Map();
}
var globalStore = globalThis[globalStoreId];
var globalValue = (id2, compute) => {
  if (!globalStore.has(id2)) {
    globalStore.set(id2, compute());
  }
  return globalStore.get(id2);
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Predicate.js
var isString = (input) => typeof input === "string";
var isNumber = (input) => typeof input === "number";
var isBoolean = (input) => typeof input === "boolean";
var isBigInt = (input) => typeof input === "bigint";
var isSymbol = (input) => typeof input === "symbol";
var isFunction2 = isFunction;
var isUndefined = (input) => input === void 0;
var isNotUndefined = (input) => input !== void 0;
var isNotNull = (input) => input !== null;
var isNever = (_) => false;
var isRecordOrArray = (input) => typeof input === "object" && input !== null;
var isObject = (input) => isRecordOrArray(input) || isFunction2(input);
var hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);
var isTagged = /* @__PURE__ */ dual(2, (self, tag4) => hasProperty(self, "_tag") && self["_tag"] === tag4);
var isNullable = (input) => input === null || input === void 0;
var isNotNullable = (input) => input !== null && input !== void 0;
var isUint8Array = (input) => input instanceof Uint8Array;
var isDate = (input) => input instanceof Date;
var isIterable = (input) => hasProperty(input, Symbol.iterator);
var isRecord = (input) => isRecordOrArray(input) && !Array.isArray(input);
var isPromise = (input) => hasProperty(input, "then") && "catch" in input && isFunction2(input.then) && isFunction2(input.catch);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Utils.js
var GenKindTypeId = /* @__PURE__ */ Symbol.for("effect/Gen/GenKind");
var GenKindImpl = class {
  value;
  constructor(value5) {
    this.value = value5;
  }
  /**
   * @since 2.0.0
   */
  get _F() {
    return identity;
  }
  /**
   * @since 2.0.0
   */
  get _R() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _O() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _E() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  [GenKindTypeId] = GenKindTypeId;
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new SingleShotGen(this);
  }
};
var SingleShotGen = class _SingleShotGen {
  self;
  called = false;
  constructor(self) {
    this.self = self;
  }
  /**
   * @since 2.0.0
   */
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  /**
   * @since 2.0.0
   */
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  /**
   * @since 2.0.0
   */
  throw(e) {
    throw e;
  }
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new _SingleShotGen(this.self);
  }
};
var defaultIncHi = 335903614;
var defaultIncLo = 4150755663;
var MUL_HI = 1481765933 >>> 0;
var MUL_LO = 1284865837 >>> 0;
var BIT_53 = 9007199254740992;
var BIT_27 = 134217728;
var PCGRandom = class {
  _state;
  constructor(seedHi, seedLo, incHi, incLo) {
    if (isNullable(seedLo) && isNullable(seedHi)) {
      seedLo = Math.random() * 4294967295 >>> 0;
      seedHi = 0;
    } else if (isNullable(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNullable(incLo) && isNullable(incHi)) {
      incLo = this._state ? this._state[3] : defaultIncLo;
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNullable(incLo)) {
      incLo = incHi;
      incHi = 0;
    }
    this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
    this._next();
    add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
    this._next();
    return this;
  }
  /**
   * Returns a copy of the internal state of this random number generator as a
   * JavaScript Array.
   *
   * @category getters
   * @since 2.0.0
   */
  getState() {
    return [this._state[0], this._state[1], this._state[2], this._state[3]];
  }
  /**
   * Restore state previously retrieved using `getState()`.
   *
   * @since 2.0.0
   */
  setState(state) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 2.0.0
   */
  integer(max6) {
    if (!max6) {
      return this._next();
    }
    max6 = max6 >>> 0;
    if ((max6 & max6 - 1) === 0) {
      return this._next() & max6 - 1;
    }
    let num = 0;
    const skew = (-max6 >>> 0) % max6 >>> 0;
    for (num = this._next(); num < skew; num = this._next()) {
    }
    return num % max6;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 2.0.0
   */
  number() {
    const hi = (this._next() & 67108863) * 1;
    const lo = (this._next() & 134217727) * 1;
    return (hi * BIT_27 + lo) / BIT_53;
  }
  /** @internal */
  _next() {
    const oldHi = this._state[0] >>> 0;
    const oldLo = this._state[1] >>> 0;
    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let xsHi = oldHi >>> 18;
    let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = (-rot >>> 0 & 31) >>> 0;
    return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
  }
};
function mul64(out, aHi, aLo, bHi, bLo) {
  let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
  let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
  let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
  let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
  c0 = c0 << 16 >>> 0;
  lo = lo + c0 >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  c1 = c1 << 16 >>> 0;
  lo = lo + c1 >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  hi = hi + Math.imul(aLo, bHi) >>> 0;
  hi = hi + Math.imul(aHi, bLo) >>> 0;
  out[0] = hi;
  out[1] = lo;
}
function add64(out, aHi, aLo, bHi, bLo) {
  let hi = aHi + bHi >>> 0;
  const lo = aLo + bLo >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = hi + 1 | 0;
  }
  out[0] = hi;
  out[1] = lo;
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Hash.js
var randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
var pcgr = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/pcgr"), () => new PCGRandom());
var symbol = /* @__PURE__ */ Symbol.for("effect/Hash");
var hash = (self) => {
  switch (typeof self) {
    case "number":
      return number(self);
    case "bigint":
      return string(self.toString(10));
    case "boolean":
      return string(String(self));
    case "symbol":
      return string(String(self));
    case "string":
      return string(self);
    case "undefined":
      return string("undefined");
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      }
      if (isHash(self)) {
        return self[symbol]();
      } else {
        return random(self);
      }
    }
    default:
      throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
};
var random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number(pcgr.integer(Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
var combine = (b) => (self) => self * 53 ^ b;
var optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
var isHash = (u) => hasProperty(u, symbol);
var number = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(n);
};
var string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
var structureKeys = (o, keys5) => {
  let h = 12289;
  for (let i = 0; i < keys5.length; i++) {
    h ^= pipe(string(keys5[i]), combine(hash(o[keys5[i]])));
  }
  return optimize(h);
};
var structure = (o) => structureKeys(o, Object.keys(o));
var array = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = pipe(h, combine(hash(arr[i])));
  }
  return optimize(h);
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Equal.js
var symbol2 = /* @__PURE__ */ Symbol.for("effect/Equal");
function equals() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if ((selfType === "object" || selfType === "function") && self !== null && that !== null) {
    if (isEqual(self) && isEqual(that)) {
      return hash(self) === hash(that) && self[symbol2](that);
    }
  }
  return false;
}
var isEqual = (u) => hasProperty(u, symbol2);
var equivalence = () => (self, that) => equals(self, that);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Equivalence.js
var make = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
var isStrictEquivalent = (x, y) => x === y;
var strict = () => isStrictEquivalent;
var number2 = /* @__PURE__ */ strict();
var mapInput = /* @__PURE__ */ dual(2, (self, f) => make((x, y) => self(f(x), f(y))));
var Date2 = /* @__PURE__ */ mapInput(number2, (date5) => date5.getTime());
var array2 = (item) => make((self, that) => {
  if (self.length !== that.length) {
    return false;
  }
  for (let i = 0; i < self.length; i++) {
    const isEq = item(self[i], that[i]);
    if (!isEq) {
      return false;
    }
  }
  return true;
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Inspectable.js
var NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var toJSON = (x) => {
  if (hasProperty(x, "toJSON") && isFunction2(x["toJSON"]) && x["toJSON"].length === 0) {
    return x.toJSON();
  } else if (Array.isArray(x)) {
    return x.map(toJSON);
  }
  return x;
};
var format = (x) => JSON.stringify(x, null, 2);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Pipeable.js
var pipeArguments = (self, args) => {
  switch (args.length) {
    case 1:
      return args[0](self);
    case 2:
      return args[1](args[0](self));
    case 3:
      return args[2](args[1](args[0](self)));
    case 4:
      return args[3](args[2](args[1](args[0](self))));
    case 5:
      return args[4](args[3](args[2](args[1](args[0](self)))));
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
    case 8:
      return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
    case 9:
      return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args.length; i < len; i++) {
        ret = args[i](ret);
      }
      return ret;
    }
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/effect.js
var OP_ASYNC = "Async";
var OP_COMMIT = "Commit";
var OP_FAILURE = "Failure";
var OP_ON_FAILURE = "OnFailure";
var OP_ON_SUCCESS = "OnSuccess";
var OP_ON_SUCCESS_AND_FAILURE = "OnSuccessAndFailure";
var OP_SUCCESS = "Success";
var OP_SYNC = "Sync";
var OP_TAG = "Tag";
var OP_UPDATE_RUNTIME_FLAGS = "UpdateRuntimeFlags";
var OP_WHILE = "While";
var OP_WITH_RUNTIME = "WithRuntime";
var OP_YIELD = "Yield";
var OP_REVERT_FLAGS = "RevertFlags";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/effectable.js
var EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
var StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
var SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
var ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
var effectVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _,
  _V: moduleVersion
};
var sinkVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _Z: (_) => _
};
var channelVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
var EffectPrototype = {
  [EffectTypeId]: effectVariance,
  [StreamTypeId]: effectVariance,
  [SinkTypeId]: sinkVariance,
  [ChannelTypeId]: channelVariance,
  [symbol2](that) {
    return this === that;
  },
  [symbol]() {
    return random(this);
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var StructuralPrototype = {
  [symbol]() {
    return structure(this);
  },
  [symbol2](that) {
    const selfKeys = Object.keys(this);
    const thatKeys = Object.keys(that);
    if (selfKeys.length !== thatKeys.length) {
      return false;
    }
    for (const key2 of selfKeys) {
      if (!(key2 in that && equals(this[key2], that[key2]))) {
        return false;
      }
    }
    return true;
  }
};
var CommitPrototype = {
  ...EffectPrototype,
  _op: OP_COMMIT
};
var StructuralCommitPrototype = {
  ...CommitPrototype,
  ...StructuralPrototype
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/option.js
var TypeId = /* @__PURE__ */ Symbol.for("effect/Option");
var CommonProto = {
  ...EffectPrototype,
  [TypeId]: {
    _A: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Some",
  _op: "Some",
  [symbol2](that) {
    return isOption(that) && isSome(that) && equals(that.value, this.value);
  },
  [symbol]() {
    return combine(hash(this._tag))(hash(this.value));
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag,
      value: toJSON(this.value)
    };
  }
});
var NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "None",
  _op: "None",
  [symbol2](that) {
    return isOption(that) && isNone(that);
  },
  [symbol]() {
    return combine(hash(this._tag));
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag
    };
  }
});
var isOption = (input) => hasProperty(input, TypeId);
var isNone = (fa) => fa._tag === "None";
var isSome = (fa) => fa._tag === "Some";
var none = /* @__PURE__ */ Object.create(NoneProto);
var some = (value5) => {
  const a = Object.create(SomeProto);
  a.value = value5;
  return a;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/either.js
var TypeId2 = /* @__PURE__ */ Symbol.for("effect/Either");
var CommonProto2 = {
  ...EffectPrototype,
  [TypeId2]: {
    _A: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto2), {
  _tag: "Right",
  _op: "Right",
  [symbol2](that) {
    return isEither(that) && isRight(that) && equals(that.right, this.right);
  },
  [symbol]() {
    return combine(hash(this._tag))(hash(this.right));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      right: toJSON(this.right)
    };
  }
});
var LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto2), {
  _tag: "Left",
  _op: "Left",
  [symbol2](that) {
    return isEither(that) && isLeft(that) && equals(that.left, this.left);
  },
  [symbol]() {
    return combine(hash(this._tag))(hash(this.left));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      left: toJSON(this.left)
    };
  }
});
var isEither = (input) => hasProperty(input, TypeId2);
var isLeft = (ma) => ma._tag === "Left";
var isRight = (ma) => ma._tag === "Right";
var left = (left3) => {
  const a = Object.create(LeftProto);
  a.left = left3;
  return a;
};
var right = (right3) => {
  const a = Object.create(RightProto);
  a.right = right3;
  return a;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Order.js
var make2 = (compare) => (self, that) => self === that ? 0 : compare(self, that);
var number3 = /* @__PURE__ */ make2((self, that) => self < that ? -1 : 1);
var boolean = /* @__PURE__ */ make2((self, that) => self < that ? -1 : 1);
var reverse = (O) => make2((self, that) => O(that, self));
var mapInput2 = /* @__PURE__ */ dual(2, (self, f) => make2((b1, b2) => self(f(b1), f(b2))));
var all = (collection) => {
  return make2((x, y) => {
    const len = Math.min(x.length, y.length);
    let collectionLength = 0;
    for (const O of collection) {
      if (collectionLength >= len) {
        break;
      }
      const o = O(x[collectionLength], y[collectionLength]);
      if (o !== 0) {
        return o;
      }
      collectionLength++;
    }
    return 0;
  });
};
var tuple = (...elements) => all(elements);
var lessThan = (O) => dual(2, (self, that) => O(self, that) === -1);
var greaterThan = (O) => dual(2, (self, that) => O(self, that) === 1);
var lessThanOrEqualTo = (O) => dual(2, (self, that) => O(self, that) !== 1);
var greaterThanOrEqualTo = (O) => dual(2, (self, that) => O(self, that) !== -1);
var max = (O) => dual(2, (self, that) => self === that || O(self, that) > -1 ? self : that);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Option.js
var none2 = () => none;
var some2 = some;
var isOption2 = isOption;
var isNone2 = isNone;
var isSome2 = isSome;
var match = /* @__PURE__ */ dual(2, (self, {
  onNone,
  onSome
}) => isNone2(self) ? onNone() : onSome(self.value));
var getOrElse = /* @__PURE__ */ dual(2, (self, onNone) => isNone2(self) ? onNone() : self.value);
var orElse = /* @__PURE__ */ dual(2, (self, that) => isNone2(self) ? that() : self);
var fromNullable = (nullableValue) => nullableValue == null ? none2() : some2(nullableValue);
var getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
var getOrThrowWith = /* @__PURE__ */ dual(2, (self, onNone) => {
  if (isSome2(self)) {
    return self.value;
  }
  throw onNone();
});
var getOrThrow = /* @__PURE__ */ getOrThrowWith(() => new Error("getOrThrow called on a None"));
var map = /* @__PURE__ */ dual(2, (self, f) => isNone2(self) ? none2() : some2(f(self.value)));
var flatMap = /* @__PURE__ */ dual(2, (self, f) => isNone2(self) ? none2() : f(self.value));
var filterMap = /* @__PURE__ */ dual(2, (self, f) => isNone2(self) ? none2() : f(self.value));
var filter = /* @__PURE__ */ dual(2, (self, predicate) => filterMap(self, (b) => predicate(b) ? some(b) : none));
var getEquivalence = (isEquivalent) => make((x, y) => x === y || (isNone2(x) ? isNone2(y) : isNone2(y) ? false : isEquivalent(x.value, y.value)));
var liftPredicate = (predicate) => (b) => predicate(b) ? some2(b) : none2();
var containsWith = (isEquivalent) => dual(2, (self, a) => isNone2(self) ? false : isEquivalent(self.value, a));
var _equivalence = /* @__PURE__ */ equivalence();
var contains = /* @__PURE__ */ containsWith(_equivalence);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/BigDecimal.js
var TypeId3 = /* @__PURE__ */ Symbol.for("effect/BigDecimal");
var BigDecimalProto = {
  [TypeId3]: TypeId3,
  [symbol]() {
    const normalized = normalize(this);
    return pipe(hash(normalized.value), combine(number(normalized.scale)));
  },
  [symbol2](that) {
    return isBigDecimal(that) && equals2(this, that);
  },
  toString() {
    return `BigDecimal(${format2(this)})`;
  },
  toJSON() {
    return {
      _id: "BigDecimal",
      value: String(this.value),
      scale: this.scale
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isBigDecimal = (u) => hasProperty(u, TypeId3);
var make3 = (value5, scale2) => {
  const o = Object.create(BigDecimalProto);
  o.value = value5;
  o.scale = scale2;
  return o;
};
var unsafeMakeNormalized = (value5, scale2) => {
  if (value5 !== bigint0 && value5 % bigint10 === bigint0) {
    throw new RangeError("Value must be normalized");
  }
  const o = make3(value5, scale2);
  o.normalized = o;
  return o;
};
var bigint0 = /* @__PURE__ */ BigInt(0);
var bigint10 = /* @__PURE__ */ BigInt(10);
var zero = /* @__PURE__ */ unsafeMakeNormalized(bigint0, 0);
var normalize = (self) => {
  if (self.normalized === void 0) {
    if (self.value === bigint0) {
      self.normalized = zero;
    } else {
      const digits = `${self.value}`;
      let trail = 0;
      for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] === "0") {
          trail++;
        } else {
          break;
        }
      }
      if (trail === 0) {
        self.normalized = self;
      }
      const value5 = BigInt(digits.substring(0, digits.length - trail));
      const scale2 = self.scale - trail;
      self.normalized = unsafeMakeNormalized(value5, scale2);
    }
  }
  return self.normalized;
};
var scale = (self, scale2) => {
  if (scale2 > self.scale) {
    return make3(self.value * bigint10 ** BigInt(scale2 - self.scale), scale2);
  }
  if (scale2 < self.scale) {
    return make3(self.value / bigint10 ** BigInt(self.scale - scale2), scale2);
  }
  return self;
};
var Equivalence = /* @__PURE__ */ make((self, that) => {
  if (self.scale > that.scale) {
    return scale(that, self.scale).value === self.value;
  }
  if (self.scale < that.scale) {
    return scale(self, that.scale).value === that.value;
  }
  return self.value === that.value;
});
var equals2 = /* @__PURE__ */ dual(2, (self, that) => Equivalence(self, that));
var format2 = (n) => {
  const negative = n.value < bigint0;
  const absolute = negative ? `${n.value}`.substring(1) : `${n.value}`;
  let before2;
  let after2;
  if (n.scale >= absolute.length) {
    before2 = "0";
    after2 = "0".repeat(n.scale - absolute.length) + absolute;
  } else {
    const location = absolute.length - n.scale;
    if (location > absolute.length) {
      const zeros = location - absolute.length;
      before2 = `${absolute}${"0".repeat(zeros)}`;
      after2 = "";
    } else {
      after2 = absolute.slice(location);
      before2 = absolute.slice(0, location);
    }
  }
  const complete3 = after2 === "" ? before2 : `${before2}.${after2}`;
  return negative ? `-${complete3}` : complete3;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Boolean.js
var not = (self) => !self;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Either.js
var right2 = right;
var left2 = left;
var isEither2 = isEither;
var isLeft2 = isLeft;
var isRight2 = isRight;
var match2 = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft2(self) ? onLeft(self.left) : onRight(self.right));
var merge = /* @__PURE__ */ match2({
  onLeft: identity,
  onRight: identity
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/readonlyArray.js
var isNonEmptyArray = (self) => self.length > 0;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Tuple.js
var make4 = (...elements) => elements;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/ReadonlyArray.js
var make5 = (...elements) => elements;
var makeBy = (n, f) => {
  const max6 = Math.max(1, Math.floor(n));
  const out = [f(0)];
  for (let i = 1; i < max6; i++) {
    out.push(f(i));
  }
  return out;
};
var fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
var match3 = /* @__PURE__ */ dual(2, (self, {
  onEmpty,
  onNonEmpty
}) => isNonEmptyReadonlyArray(self) ? onNonEmpty(self) : onEmpty());
var matchLeft = /* @__PURE__ */ dual(2, (self, {
  onEmpty,
  onNonEmpty
}) => isNonEmptyReadonlyArray(self) ? onNonEmpty(headNonEmpty(self), tailNonEmpty(self)) : onEmpty());
var prepend = /* @__PURE__ */ dual(2, (self, head6) => [head6, ...self]);
var append = /* @__PURE__ */ dual(2, (self, last5) => [...self, last5]);
var appendAll = /* @__PURE__ */ dual(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
var isEmptyArray = (self) => self.length === 0;
var isEmptyReadonlyArray = isEmptyArray;
var isNonEmptyArray2 = isNonEmptyArray;
var isNonEmptyReadonlyArray = isNonEmptyArray;
var isOutOfBound = (i, as7) => i < 0 || i >= as7.length;
var clamp = (i, as7) => Math.floor(Math.min(Math.max(0, i), as7.length));
var get = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  return isOutOfBound(i, self) ? none2() : some2(self[i]);
});
var unsafeGet = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
var head = /* @__PURE__ */ get(0);
var headNonEmpty = /* @__PURE__ */ unsafeGet(0);
var last = (self) => isNonEmptyReadonlyArray(self) ? some2(lastNonEmpty(self)) : none2();
var lastNonEmpty = (self) => self[self.length - 1];
var tailNonEmpty = (self) => self.slice(1);
var spanIndex = (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (!predicate(a)) {
      break;
    }
    i++;
  }
  return i;
};
var span = /* @__PURE__ */ dual(2, (self, predicate) => splitAt(self, spanIndex(self, predicate)));
var drop = /* @__PURE__ */ dual(2, (self, n) => {
  const input = fromIterable(self);
  return input.slice(clamp(n, input), input.length);
});
var findFirstIndex = /* @__PURE__ */ dual(2, (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (predicate(a)) {
      return some2(i);
    }
    i++;
  }
  return none2();
});
var findFirst = /* @__PURE__ */ dual(2, (self, predicate) => {
  const input = fromIterable(self);
  for (let i = 0; i < input.length; i++) {
    if (predicate(input[i])) {
      return some2(input[i]);
    }
  }
  return none2();
});
var findLast = /* @__PURE__ */ dual(2, (self, predicate) => {
  const input = fromIterable(self);
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i])) {
      return some2(input[i]);
    }
  }
  return none2();
});
var reverse2 = (self) => Array.from(self).reverse();
var sort = /* @__PURE__ */ dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O);
  return out;
});
var zip = /* @__PURE__ */ dual(2, (self, that) => zipWith(self, that, make4));
var zipWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const as7 = fromIterable(self);
  const bs = fromIterable(that);
  if (isNonEmptyReadonlyArray(as7) && isNonEmptyReadonlyArray(bs)) {
    const out = [f(headNonEmpty(as7), headNonEmpty(bs))];
    const len = Math.min(as7.length, bs.length);
    for (let i = 1; i < len; i++) {
      out[i] = f(as7[i], bs[i]);
    }
    return out;
  }
  return [];
});
var containsWith2 = (isEquivalent) => dual(2, (self, a) => {
  for (const i of self) {
    if (isEquivalent(a, i)) {
      return true;
    }
  }
  return false;
});
var _equivalence2 = /* @__PURE__ */ equivalence();
var contains2 = /* @__PURE__ */ containsWith2(_equivalence2);
var splitAt = /* @__PURE__ */ dual(2, (self, n) => {
  const input = Array.from(self);
  const _n = Math.floor(n);
  if (isNonEmptyReadonlyArray(input)) {
    if (_n >= 1) {
      return splitNonEmptyAt(input, _n);
    }
    return [[], input];
  }
  return [input, []];
});
var splitNonEmptyAt = /* @__PURE__ */ dual(2, (self, n) => {
  const _n = Math.max(1, Math.floor(n));
  return _n >= self.length ? [copy(self), []] : [prepend(self.slice(1, _n), headNonEmpty(self)), self.slice(_n)];
});
var copy = (self) => self.slice();
var unionWith = /* @__PURE__ */ dual(3, (self, that, isEquivalent) => {
  const a = fromIterable(self);
  const b = fromIterable(that);
  if (isNonEmptyReadonlyArray(a)) {
    if (isNonEmptyReadonlyArray(b)) {
      const dedupe2 = dedupeWith(isEquivalent);
      return dedupe2(appendAll(a, b));
    }
    return a;
  }
  return b;
});
var union = /* @__PURE__ */ dual(2, (self, that) => unionWith(self, that, _equivalence2));
var empty = () => [];
var of = (a) => [a];
var map2 = /* @__PURE__ */ dual(2, (self, f) => self.map(f));
var flatMap2 = /* @__PURE__ */ dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    out.push(...f(self[i], i));
  }
  return out;
});
var flatten = /* @__PURE__ */ flatMap2(identity);
var filterMap2 = /* @__PURE__ */ dual(2, (self, f) => {
  const as7 = fromIterable(self);
  const out = [];
  for (let i = 0; i < as7.length; i++) {
    const o = f(as7[i], i);
    if (isSome2(o)) {
      out.push(o.value);
    }
  }
  return out;
});
var getSomes = /* @__PURE__ */ filterMap2(identity);
var filter2 = /* @__PURE__ */ dual(2, (self, predicate) => {
  const as7 = fromIterable(self);
  const out = [];
  for (let i = 0; i < as7.length; i++) {
    if (predicate(as7[i], i)) {
      out.push(as7[i]);
    }
  }
  return out;
});
var reduce = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable(self).reduce((b2, a, i) => f(b2, a, i), b));
var reduceRight = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable(self).reduceRight((b2, a, i) => f(b2, a, i), b));
var unfold = (b, f) => {
  const out = [];
  let next = b;
  let o;
  while (isSome2(o = f(next))) {
    const [a, b2] = o.value;
    out.push(a);
    next = b2;
  }
  return out;
};
var getEquivalence2 = array2;
var dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const input = fromIterable(self);
  if (isNonEmptyReadonlyArray(input)) {
    const out = [headNonEmpty(input)];
    const rest = tailNonEmpty(input);
    for (const r of rest) {
      if (out.every((a) => !isEquivalent(r, a))) {
        out.push(r);
      }
    }
    return out;
  }
  return [];
});
var dedupe = (self) => dedupeWith(self, equivalence());
var join = /* @__PURE__ */ dual(2, (self, sep) => fromIterable(self).join(sep));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Brand.js
var RefinedConstructorsTypeId = /* @__PURE__ */ Symbol.for("effect/Brand/Refined");
var nominal = () => {
  return Object.assign((args) => args, {
    [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
    option: (args) => some2(args),
    either: (args) => right2(args),
    is: (_args) => true
  });
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/context.js
var TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
var STMSymbolKey = "effect/STM";
var STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
var TagProto = {
  ...EffectPrototype,
  _tag: "Tag",
  _op: "Tag",
  [STMTypeId]: effectVariance,
  [TagTypeId]: {
    _Service: (_) => _,
    _Identifier: (_) => _
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Tag",
      identifier: this.identifier,
      stack: this.stack
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  of(self) {
    return self;
  },
  context(self) {
    return make6(this, self);
  }
};
var tagRegistry = /* @__PURE__ */ globalValue("effect/Context/Tag/tagRegistry", () => /* @__PURE__ */ new Map());
var makeTag = (identifier) => {
  if (identifier && tagRegistry.has(identifier)) {
    return tagRegistry.get(identifier);
  }
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  const tag4 = Object.create(TagProto);
  Object.defineProperty(tag4, "stack", {
    get() {
      return creationError.stack;
    }
  });
  if (identifier) {
    tag4.identifier = identifier;
    tagRegistry.set(identifier, tag4);
  }
  return tag4;
};
var TypeId4 = /* @__PURE__ */ Symbol.for("effect/Context");
var ContextProto = {
  [TypeId4]: {
    _Services: (_) => _
  },
  [symbol2](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  },
  [symbol]() {
    return number(this.unsafeMap.size);
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Context",
      services: Array.from(this.unsafeMap).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var makeContext = (unsafeMap) => {
  const context6 = Object.create(ContextProto);
  context6.unsafeMap = unsafeMap;
  return context6;
};
var serviceNotFoundError = (tag4) => {
  const error2 = new Error(`Service not found${tag4.identifier ? `: ${String(tag4.identifier)}` : ""}`);
  if (tag4.stack) {
    const lines2 = tag4.stack.split("\n");
    if (lines2.length > 2) {
      const afterAt = lines2[2].match(/at (.*)/);
      if (afterAt) {
        error2.message = error2.message + ` (defined at ${afterAt[1]})`;
      }
    }
  }
  if (error2.stack) {
    const lines2 = error2.stack.split("\n");
    lines2.splice(1, 3);
    error2.stack = lines2.join("\n");
  }
  return error2;
};
var isContext = (u) => hasProperty(u, TypeId4);
var isTag = (u) => hasProperty(u, TagTypeId);
var _empty = /* @__PURE__ */ makeContext(/* @__PURE__ */ new Map());
var empty2 = () => _empty;
var make6 = (tag4, service2) => makeContext(/* @__PURE__ */ new Map([[tag4, service2]]));
var add = /* @__PURE__ */ dual(3, (self, tag4, service2) => {
  const map27 = new Map(self.unsafeMap);
  map27.set(tag4, service2);
  return makeContext(map27);
});
var unsafeGet2 = /* @__PURE__ */ dual(2, (self, tag4) => {
  if (!self.unsafeMap.has(tag4)) {
    throw serviceNotFoundError(tag4);
  }
  return self.unsafeMap.get(tag4);
});
var get2 = unsafeGet2;
var getOption = /* @__PURE__ */ dual(2, (self, tag4) => {
  if (!self.unsafeMap.has(tag4)) {
    return none;
  }
  return some(self.unsafeMap.get(tag4));
});
var merge2 = /* @__PURE__ */ dual(2, (self, that) => {
  const map27 = new Map(self.unsafeMap);
  for (const [tag4, s] of that.unsafeMap) {
    map27.set(tag4, s);
  }
  return makeContext(map27);
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Context.js
var Tag = makeTag;
var isContext2 = isContext;
var isTag2 = isTag;
var empty3 = empty2;
var make7 = make6;
var add2 = add;
var get3 = get2;
var unsafeGet3 = unsafeGet2;
var getOption2 = getOption;
var merge3 = merge2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Chunk.js
var TypeId5 = /* @__PURE__ */ Symbol.for("effect/Chunk");
function copy2(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
var emptyArray = [];
var getEquivalence3 = (isEquivalent) => make((self, that) => self.length === that.length && toReadonlyArray(self).every((value5, i) => isEquivalent(value5, unsafeGet4(that, i))));
var _equivalence3 = /* @__PURE__ */ getEquivalence3(equals);
var ChunkProto = {
  [TypeId5]: {
    _A: (_) => _
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Chunk",
      values: toReadonlyArray(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol2](that) {
    return isChunk(that) && _equivalence3(this, that);
  },
  [symbol]() {
    return array(toReadonlyArray(this));
  },
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]();
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]();
      }
      default: {
        return toReadonlyArray(this)[Symbol.iterator]();
      }
    }
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeChunk = (backing) => {
  const chunk3 = Object.create(ChunkProto);
  chunk3.backing = backing;
  switch (backing._tag) {
    case "IEmpty": {
      chunk3.length = 0;
      chunk3.depth = 0;
      chunk3.left = chunk3;
      chunk3.right = chunk3;
      break;
    }
    case "IConcat": {
      chunk3.length = backing.left.length + backing.right.length;
      chunk3.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
      chunk3.left = backing.left;
      chunk3.right = backing.right;
      break;
    }
    case "IArray": {
      chunk3.length = backing.array.length;
      chunk3.depth = 0;
      chunk3.left = _empty2;
      chunk3.right = _empty2;
      break;
    }
    case "ISingleton": {
      chunk3.length = 1;
      chunk3.depth = 0;
      chunk3.left = _empty2;
      chunk3.right = _empty2;
      break;
    }
    case "ISlice": {
      chunk3.length = backing.length;
      chunk3.depth = backing.chunk.depth + 1;
      chunk3.left = _empty2;
      chunk3.right = _empty2;
      break;
    }
  }
  return chunk3;
};
var isChunk = (u) => hasProperty(u, TypeId5);
var _empty2 = /* @__PURE__ */ makeChunk({
  _tag: "IEmpty"
});
var empty4 = () => _empty2;
var of2 = (a) => makeChunk({
  _tag: "ISingleton",
  a
});
var fromIterable2 = (self) => isChunk(self) ? self : makeChunk({
  _tag: "IArray",
  array: fromIterable(self)
});
var copyToArray = (self, array6, initial) => {
  switch (self.backing._tag) {
    case "IArray": {
      copy2(self.backing.array, 0, array6, initial, self.length);
      break;
    }
    case "IConcat": {
      copyToArray(self.left, array6, initial);
      copyToArray(self.right, array6, initial + self.left.length);
      break;
    }
    case "ISingleton": {
      array6[initial] = self.backing.a;
      break;
    }
    case "ISlice": {
      let i = 0;
      let j = initial;
      while (i < self.length) {
        array6[j] = unsafeGet4(self, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
var toReadonlyArray = (self) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray;
    }
    case "IArray": {
      return self.backing.array;
    }
    default: {
      const arr = new Array(self.length);
      copyToArray(self, arr, 0);
      self.backing = {
        _tag: "IArray",
        array: arr
      };
      self.left = _empty2;
      self.right = _empty2;
      self.depth = 0;
      return arr;
    }
  }
};
var reverse3 = (self) => {
  switch (self.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self;
    case "IArray": {
      return makeChunk({
        _tag: "IArray",
        array: reverse2(self.backing.array)
      });
    }
    case "IConcat": {
      return makeChunk({
        _tag: "IConcat",
        left: reverse3(self.backing.right),
        right: reverse3(self.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse2(toReadonlyArray(self)));
  }
};
var get4 = /* @__PURE__ */ dual(2, (self, index2) => index2 < 0 || index2 >= self.length ? none2() : some2(unsafeGet4(self, index2)));
var unsafeFromArray = (self) => makeChunk({
  _tag: "IArray",
  array: self
});
var unsafeGet4 = /* @__PURE__ */ dual(2, (self, index2) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`);
    }
    case "ISingleton": {
      if (index2 !== 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.a;
    }
    case "IArray": {
      if (index2 >= self.length || index2 < 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.array[index2];
    }
    case "IConcat": {
      return index2 < self.left.length ? unsafeGet4(self.left, index2) : unsafeGet4(self.right, index2 - self.left.length);
    }
    case "ISlice": {
      return unsafeGet4(self.backing.chunk, index2 + self.backing.offset);
    }
  }
});
var append2 = /* @__PURE__ */ dual(2, (self, a) => appendAll2(self, of2(a)));
var prepend2 = /* @__PURE__ */ dual(2, (self, elem) => appendAll2(of2(elem), self));
var drop2 = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _empty2;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return makeChunk({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          offset: self.backing.offset + n,
          length: self.backing.length - n
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return drop2(self.right, n - self.left.length);
        }
        return makeChunk({
          _tag: "IConcat",
          left: drop2(self.left, n),
          right: self.right
        });
      }
      default: {
        return makeChunk({
          _tag: "ISlice",
          chunk: self,
          offset: n,
          length: self.length - n
        });
      }
    }
  }
});
var appendAll2 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.backing._tag === "IEmpty") {
    return that;
  }
  if (that.backing._tag === "IEmpty") {
    return self;
  }
  const diff8 = that.depth - self.depth;
  if (Math.abs(diff8) <= 1) {
    return makeChunk({
      _tag: "IConcat",
      left: self,
      right: that
    });
  } else if (diff8 < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = appendAll2(self.right, that);
      return makeChunk({
        _tag: "IConcat",
        left: self.left,
        right: nr
      });
    } else {
      const nrr = appendAll2(self.right.right, that);
      if (nrr.depth === self.depth - 3) {
        const nr = makeChunk({
          _tag: "IConcat",
          left: self.right.left,
          right: nrr
        });
        return makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: nr
        });
      } else {
        const nl = makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: self.right.left
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: nrr
        });
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = appendAll2(self, that.left);
      return makeChunk({
        _tag: "IConcat",
        left: nl,
        right: that.right
      });
    } else {
      const nll = appendAll2(self, that.left.left);
      if (nll.depth === that.depth - 3) {
        const nl = makeChunk({
          _tag: "IConcat",
          left: nll,
          right: that.left.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nr = makeChunk({
          _tag: "IConcat",
          left: that.left.right,
          right: that.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nll,
          right: nr
        });
      }
    }
  }
});
var filter3 = /* @__PURE__ */ dual(2, (self, predicate) => unsafeFromArray(filterMap2(self, liftPredicate(predicate))));
var isEmpty = (self) => self.length === 0;
var isNonEmpty = (self) => self.length > 0;
var head2 = /* @__PURE__ */ get4(0);
var unsafeHead = (self) => unsafeGet4(self, 0);
var headNonEmpty2 = unsafeHead;
var map3 = /* @__PURE__ */ dual(2, (self, f) => self.backing._tag === "ISingleton" ? of2(f(self.backing.a, 0)) : unsafeFromArray(pipe(toReadonlyArray(self), map2((a, i) => f(a, i)))));
var tailNonEmpty2 = (self) => drop2(self, 1);
var reduce2 = reduce;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashMap/config.js
var SIZE = 5;
var BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashMap/bitwise.js
function popcount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function hashFragment(shift2, h) {
  return h >>> shift2 & MASK;
}
function toBitmap(x) {
  return 1 << x;
}
function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/stack.js
var Stack = class {
  value;
  previous;
  constructor(value5, previous) {
    this.value = value5;
    this.previous = previous;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashMap/array.js
function arrayUpdate(mutate3, at, v, arr) {
  let out = arr;
  if (!mutate3) {
    const len = arr.length;
    out = new Array(len);
    for (let i = 0; i < len; ++i)
      out[i] = arr[i];
  }
  out[at] = v;
  return out;
}
function arraySpliceOut(mutate3, at, arr) {
  const newLen = arr.length - 1;
  let i = 0;
  let g = 0;
  let out = arr;
  if (mutate3) {
    i = g = at;
  } else {
    out = new Array(newLen);
    while (i < at)
      out[g++] = arr[i++];
  }
  ;
  ++i;
  while (i <= newLen)
    out[g++] = arr[i++];
  if (mutate3) {
    out.length = newLen;
  }
  return out;
}
function arraySpliceIn(mutate3, at, v, arr) {
  const len = arr.length;
  if (mutate3) {
    let i2 = len;
    while (i2 >= at)
      arr[i2--] = arr[i2];
    arr[at] = v;
    return arr;
  }
  let i = 0, g = 0;
  const out = new Array(len + 1);
  while (i < at)
    out[g++] = arr[i++];
  out[at] = v;
  while (i < len)
    out[++g] = arr[i++];
  return out;
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashMap/node.js
var EmptyNode = class _EmptyNode {
  _tag = "EmptyNode";
  modify(edit, _shift, f, hash2, key2, size12) {
    const v = f(none2());
    if (isNone2(v))
      return new _EmptyNode();
    ++size12.value;
    return new LeafNode(edit, hash2, key2, v);
  }
};
function isEmptyNode(a) {
  return isTagged(a, "EmptyNode");
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
var LeafNode = class _LeafNode {
  edit;
  hash;
  key;
  value;
  _tag = "LeafNode";
  constructor(edit, hash2, key2, value5) {
    this.edit = edit;
    this.hash = hash2;
    this.key = key2;
    this.value = value5;
  }
  modify(edit, shift2, f, hash2, key2, size12) {
    if (equals(key2, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value)
        return this;
      else if (isNone2(v2)) {
        ;
        --size12.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new _LeafNode(edit, hash2, key2, v2);
    }
    const v = f(none2());
    if (isNone2(v))
      return this;
    ++size12.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new _LeafNode(edit, hash2, key2, v));
  }
};
var CollisionNode = class _CollisionNode {
  edit;
  hash;
  children;
  _tag = "CollisionNode";
  constructor(edit, hash2, children2) {
    this.edit = edit;
    this.hash = hash2;
    this.children = children2;
  }
  modify(edit, shift2, f, hash2, key2, size12) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list4 = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key2, size12);
      if (list4 === this.children)
        return this;
      return list4.length > 1 ? new _CollisionNode(edit, this.hash, list4) : list4[0];
    }
    const v = f(none2());
    if (isNone2(v))
      return this;
    ++size12.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new LeafNode(edit, hash2, key2, v));
  }
  updateCollisionList(mutate3, edit, hash2, list4, f, key2, size12) {
    const len = list4.length;
    for (let i = 0; i < len; ++i) {
      const child = list4[i];
      if ("key" in child && equals(key2, child.key)) {
        const value5 = child.value;
        const newValue2 = f(value5);
        if (newValue2 === value5)
          return list4;
        if (isNone2(newValue2)) {
          ;
          --size12.value;
          return arraySpliceOut(mutate3, i, list4);
        }
        return arrayUpdate(mutate3, i, new LeafNode(edit, hash2, key2, newValue2), list4);
      }
    }
    const newValue = f(none2());
    if (isNone2(newValue))
      return list4;
    ++size12.value;
    return arrayUpdate(mutate3, len, new LeafNode(edit, hash2, key2, newValue), list4);
  }
};
var IndexedNode = class _IndexedNode {
  edit;
  mask;
  children;
  _tag = "IndexedNode";
  constructor(edit, mask, children2) {
    this.edit = edit;
    this.mask = mask;
    this.children = children2;
  }
  modify(edit, shift2, f, hash2, key2, size12) {
    const mask = this.mask;
    const children2 = this.children;
    const frag = hashFragment(shift2, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists3 = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists3) {
      const _newChild = new EmptyNode().modify(edit, shift2 + SIZE, f, hash2, key2, size12);
      if (!_newChild)
        return this;
      return children2.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children2) : new _IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children2));
    }
    const current = children2[indx];
    const child = current.modify(edit, shift2 + SIZE, f, hash2, key2, size12);
    if (current === child)
      return this;
    let bitmap = mask;
    let newChildren;
    if (isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap)
        return new EmptyNode();
      if (children2.length <= 2 && isLeafNode(children2[indx ^ 1])) {
        return children2[indx ^ 1];
      }
      newChildren = arraySpliceOut(canEdit, indx, children2);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children2);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return new _IndexedNode(edit, bitmap, newChildren);
  }
};
var ArrayNode = class _ArrayNode {
  edit;
  size;
  children;
  _tag = "ArrayNode";
  constructor(edit, size12, children2) {
    this.edit = edit;
    this.size = size12;
    this.children = children2;
  }
  modify(edit, shift2, f, hash2, key2, size12) {
    let count3 = this.size;
    const children2 = this.children;
    const frag = hashFragment(shift2, hash2);
    const child = children2[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift2 + SIZE, f, hash2, key2, size12);
    if (child === newChild)
      return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ;
      ++count3;
      newChildren = arrayUpdate(canEdit, frag, newChild, children2);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      ;
      --count3;
      if (count3 <= MIN_ARRAY_NODE) {
        return pack(edit, count3, frag, children2);
      }
      newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children2);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children2);
    }
    if (canEdit) {
      this.size = count3;
      this.children = newChildren;
      return this;
    }
    return new _ArrayNode(edit, count3, newChildren);
  }
};
function pack(edit, count3, removed, elements) {
  const children2 = new Array(count3 - 1);
  let g = 0;
  let bitmap = 0;
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];
      if (elem && !isEmptyNode(elem)) {
        children2[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }
  return new IndexedNode(edit, bitmap, children2);
}
function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count3 = 0;
  for (let i = 0; bit; ++i) {
    if (bit & 1)
      arr[i] = subNodes[count3++];
    bit >>>= 1;
  }
  arr[frag] = child;
  return new ArrayNode(edit, count3 + 1, arr);
}
function mergeLeavesInner(edit, shift2, h1, n1, h2, n2) {
  if (h1 === h2)
    return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = hashFragment(shift2, h1);
  const subH2 = hashFragment(shift2, h2);
  if (subH1 === subH2) {
    return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
  } else {
    const children2 = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children2);
  }
}
function mergeLeaves(edit, shift2, h1, n1, h2, n2) {
  let stack = void 0;
  let currentShift = shift2;
  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
    if (typeof res === "function") {
      stack = new Stack(res, stack);
      currentShift = currentShift + SIZE;
    } else {
      let final = res;
      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }
      return final;
    }
  }
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashMap.js
var HashMapSymbolKey = "effect/HashMap";
var HashMapTypeId = /* @__PURE__ */ Symbol.for(HashMapSymbolKey);
var HashMapProto = {
  [HashMapTypeId]: HashMapTypeId,
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  },
  [symbol]() {
    let hash2 = hash(HashMapSymbolKey);
    for (const item of this) {
      hash2 ^= pipe(hash(item[0]), combine(hash(item[1])));
    }
    return hash2;
  },
  [symbol2](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = pipe(that, getHash(item[0], hash(item[0])));
        if (isNone2(elem)) {
          return false;
        } else {
          if (!equals(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeImpl = (editable, edit, root, size12) => {
  const map27 = Object.create(HashMapProto);
  map27._editable = editable;
  map27._edit = edit;
  map27._root = root;
  map27._size = size12;
  return map27;
};
var HashMapIterator = class _HashMapIterator {
  map;
  f;
  v;
  constructor(map27, f) {
    this.map = map27;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone2(this.v)) {
      return {
        done: true,
        value: void 0
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new _HashMapIterator(this.map, this.f);
  }
};
var applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none2();
var visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome2(node.value)) {
        return some2({
          value: f(node.key, node.value.value),
          cont
        });
      }
      return applyCont(cont);
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children2 = node.children;
      return visitLazyChildren(children2.length, children2, 0, f, cont);
    }
    default: {
      return applyCont(cont);
    }
  }
};
var visitLazyChildren = (len, children2, i, f, cont) => {
  while (i < len) {
    const child = children2[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children2, i, f, cont]);
    }
  }
  return applyCont(cont);
};
var _empty3 = /* @__PURE__ */ makeImpl(false, 0, /* @__PURE__ */ new EmptyNode(), 0);
var empty5 = () => _empty3;
var make8 = (...entries2) => fromIterable3(entries2);
var fromIterable3 = (entries2) => {
  const map27 = beginMutation(empty5());
  for (const entry of entries2) {
    set(map27, entry[0], entry[1]);
  }
  return endMutation(map27);
};
var isHashMap = (u) => hasProperty(u, HashMapTypeId);
var isEmpty2 = (self) => self && isEmptyNode(self._root);
var get5 = /* @__PURE__ */ dual(2, (self, key2) => getHash(self, key2, hash(key2)));
var getHash = /* @__PURE__ */ dual(3, (self, key2, hash2) => {
  let node = self._root;
  let shift2 = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals(key2, node.key) ? node.value : none2();
      }
      case "CollisionNode": {
        if (hash2 === node.hash) {
          const children2 = node.children;
          for (let i = 0, len = children2.length; i < len; ++i) {
            const child = children2[i];
            if ("key" in child && equals(key2, child.key)) {
              return child.value;
            }
          }
        }
        return none2();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift2, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift2 += SIZE;
          break;
        }
        return none2();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift2, hash2)];
        if (node) {
          shift2 += SIZE;
          break;
        }
        return none2();
      }
      default:
        return none2();
    }
  }
});
var has = /* @__PURE__ */ dual(2, (self, key2) => isSome2(getHash(self, key2, hash(key2))));
var set = /* @__PURE__ */ dual(3, (self, key2, value5) => modifyAt(self, key2, () => some2(value5)));
var setTree = /* @__PURE__ */ dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    ;
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : makeImpl(self._editable, self._edit, newRoot, newSize);
});
var keys = (self) => new HashMapIterator(self, (key2) => key2);
var size = (self) => self._size;
var beginMutation = (self) => makeImpl(true, self._edit + 1, self._root, self._size);
var endMutation = (self) => {
  ;
  self._editable = false;
  return self;
};
var modifyAt = /* @__PURE__ */ dual(3, (self, key2, f) => modifyHash(self, key2, hash(key2), f));
var modifyHash = /* @__PURE__ */ dual(4, (self, key2, hash2, f) => {
  const size12 = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash2, key2, size12);
  return pipe(self, setTree(newRoot, size12.value));
});
var remove2 = /* @__PURE__ */ dual(2, (self, key2) => modifyAt(self, key2, none2));
var map4 = /* @__PURE__ */ dual(2, (self, f) => reduce3(self, empty5(), (map27, value5, key2) => set(map27, key2, f(value5, key2))));
var forEach = /* @__PURE__ */ dual(2, (self, f) => reduce3(self, void 0, (_, value5, key2) => f(value5, key2)));
var reduce3 = /* @__PURE__ */ dual(3, (self, zero3, f) => {
  const root = self._root;
  if (root._tag === "LeafNode") {
    return isSome2(root.value) ? f(zero3, root.value.value, root.key) : zero3;
  }
  if (root._tag === "EmptyNode") {
    return zero3;
  }
  const toVisit = [root.children];
  let children2;
  while (children2 = toVisit.pop()) {
    for (let i = 0, len = children2.length; i < len; ) {
      const child = children2[i++];
      if (child && !isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (isSome2(child.value)) {
            zero3 = f(zero3, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero3;
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/hashSet.js
var HashSetSymbolKey = "effect/HashSet";
var HashSetTypeId = /* @__PURE__ */ Symbol.for(HashSetSymbolKey);
var HashSetProto = {
  [HashSetTypeId]: HashSetTypeId,
  [Symbol.iterator]() {
    return keys(this._keyMap);
  },
  [symbol]() {
    return combine(hash(this._keyMap))(hash(HashSetSymbolKey));
  },
  [symbol2](that) {
    if (isHashSet(that)) {
      return size(this._keyMap) === size(that._keyMap) && equals(this._keyMap, that._keyMap);
    }
    return false;
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashSet",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeImpl2 = (keyMap) => {
  const set8 = Object.create(HashSetProto);
  set8._keyMap = keyMap;
  return set8;
};
var isHashSet = (u) => hasProperty(u, HashSetTypeId);
var _empty4 = /* @__PURE__ */ makeImpl2(/* @__PURE__ */ empty5());
var empty6 = () => _empty4;
var fromIterable4 = (elements) => {
  const set8 = beginMutation2(empty6());
  for (const value5 of elements) {
    add3(set8, value5);
  }
  return endMutation2(set8);
};
var make9 = (...elements) => {
  const set8 = beginMutation2(empty6());
  for (const value5 of elements) {
    add3(set8, value5);
  }
  return endMutation2(set8);
};
var has2 = /* @__PURE__ */ dual(2, (self, value5) => has(self._keyMap, value5));
var size2 = (self) => size(self._keyMap);
var beginMutation2 = (self) => makeImpl2(beginMutation(self._keyMap));
var endMutation2 = (self) => {
  ;
  self._keyMap._editable = false;
  return self;
};
var mutate = /* @__PURE__ */ dual(2, (self, f) => {
  const transient = beginMutation2(self);
  f(transient);
  return endMutation2(transient);
});
var add3 = /* @__PURE__ */ dual(2, (self, value5) => self._keyMap._editable ? (set(value5, true)(self._keyMap), self) : makeImpl2(set(value5, true)(self._keyMap)));
var remove3 = /* @__PURE__ */ dual(2, (self, value5) => self._keyMap._editable ? (remove2(value5)(self._keyMap), self) : makeImpl2(remove2(value5)(self._keyMap)));
var difference = /* @__PURE__ */ dual(2, (self, that) => mutate(self, (set8) => {
  for (const value5 of that) {
    remove3(set8, value5);
  }
}));
var union2 = /* @__PURE__ */ dual(2, (self, that) => mutate(empty6(), (set8) => {
  forEach2(self, (value5) => add3(set8, value5));
  for (const value5 of that) {
    add3(set8, value5);
  }
}));
var forEach2 = /* @__PURE__ */ dual(2, (self, f) => forEach(self._keyMap, (_, k) => f(k)));
var reduce4 = /* @__PURE__ */ dual(3, (self, zero3, f) => reduce3(self._keyMap, zero3, (z, _, a) => f(z, a)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/HashSet.js
var empty7 = empty6;
var fromIterable5 = fromIterable4;
var make10 = make9;
var has3 = has2;
var size3 = size2;
var add4 = add3;
var remove4 = remove3;
var difference2 = difference;
var union3 = union2;
var reduce5 = reduce4;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/MutableRef.js
var TypeId6 = /* @__PURE__ */ Symbol.for("effect/MutableRef");
var MutableRefProto = {
  [TypeId6]: TypeId6,
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableRef",
      current: toJSON(this.current)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make11 = (value5) => {
  const ref = Object.create(MutableRefProto);
  ref.current = value5;
  return ref;
};
var compareAndSet = /* @__PURE__ */ dual(3, (self, oldValue, newValue) => {
  if (equals(oldValue, self.current)) {
    self.current = newValue;
    return true;
  }
  return false;
});
var get6 = (self) => self.current;
var incrementAndGet = (self) => updateAndGet(self, (n) => n + 1);
var set2 = /* @__PURE__ */ dual(2, (self, value5) => {
  self.current = value5;
  return self;
});
var setAndGet = /* @__PURE__ */ dual(2, (self, value5) => {
  self.current = value5;
  return self.current;
});
var updateAndGet = /* @__PURE__ */ dual(2, (self, f) => setAndGet(self, f(get6(self))));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberId.js
var FiberIdSymbolKey = "effect/FiberId";
var FiberIdTypeId = /* @__PURE__ */ Symbol.for(FiberIdSymbolKey);
var OP_NONE = "None";
var OP_RUNTIME = "Runtime";
var OP_COMPOSITE = "Composite";
var None = class {
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_NONE;
  [symbol]() {
    return pipe(hash(FiberIdSymbolKey), combine(hash(this._tag)));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
  toString() {
    return format(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var Runtime = class {
  id;
  startTimeMillis;
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_RUNTIME;
  constructor(id2, startTimeMillis) {
    this.id = id2;
    this.startTimeMillis = startTimeMillis;
  }
  [symbol]() {
    return pipe(hash(FiberIdSymbolKey), combine(hash(this._tag)), combine(hash(this.id)), combine(hash(this.startTimeMillis)));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
  toString() {
    return format(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      id: this.id,
      startTimeMillis: this.startTimeMillis
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var Composite = class {
  left;
  right;
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_COMPOSITE;
  constructor(left3, right3) {
    this.left = left3;
    this.right = right3;
  }
  [symbol]() {
    return pipe(hash(FiberIdSymbolKey), combine(hash(this._tag)), combine(hash(this.left)), combine(hash(this.right)));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_COMPOSITE && equals(this.left, that.left) && equals(this.right, that.right);
  }
  toString() {
    return format(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      left: toJSON(this.left),
      right: toJSON(this.right)
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var none3 = /* @__PURE__ */ new None();
var runtime = (id2, startTimeMillis) => {
  return new Runtime(id2, startTimeMillis);
};
var composite = (left3, right3) => {
  return new Composite(left3, right3);
};
var isFiberId = (self) => hasProperty(self, FiberIdTypeId);
var combine2 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self._tag === OP_NONE) {
    return that;
  }
  if (that._tag === OP_NONE) {
    return self;
  }
  return new Composite(self, that);
});
var ids = (self) => {
  switch (self._tag) {
    case OP_NONE: {
      return empty7();
    }
    case OP_RUNTIME: {
      return make10(self.id);
    }
    case OP_COMPOSITE: {
      return pipe(ids(self.left), union3(ids(self.right)));
    }
  }
};
var _fiberCounter = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Fiber/Id/_fiberCounter"), () => make11(0));
var threadName = (self) => {
  const identifiers = Array.from(ids(self)).map((n) => `#${n}`).join(",");
  return identifiers;
};
var unsafeMake = () => {
  const id2 = get6(_fiberCounter);
  pipe(_fiberCounter, set2(id2 + 1));
  return new Runtime(id2, Date.now());
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/FiberId.js
var none4 = none3;
var runtime2 = runtime;
var composite2 = composite;
var isFiberId2 = isFiberId;
var combine3 = combine2;
var threadName2 = threadName;
var unsafeMake2 = unsafeMake;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/HashMap.js
var empty8 = empty5;
var make13 = make8;
var fromIterable6 = fromIterable3;
var isEmpty3 = isEmpty2;
var get7 = get5;
var set3 = set;
var keys2 = keys;
var size4 = size;
var map6 = map4;
var forEach3 = forEach;
var reduce6 = reduce3;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/List.js
var TypeId7 = /* @__PURE__ */ Symbol.for("effect/List");
var toArray2 = (self) => Array.from(self);
var getEquivalence4 = (isEquivalent) => mapInput(getEquivalence2(isEquivalent), toArray2);
var _equivalence4 = /* @__PURE__ */ getEquivalence4(equals);
var ConsProto = {
  [TypeId7]: TypeId7,
  _tag: "Cons",
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Cons",
      values: toArray2(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol2](that) {
    return isList(that) && this._tag === that._tag && _equivalence4(this, that);
  },
  [symbol]() {
    return array(toArray2(this));
  },
  [Symbol.iterator]() {
    let done9 = false;
    let self = this;
    return {
      next() {
        if (done9) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done9 = true;
          return this.return();
        }
        const value5 = self.head;
        self = self.tail;
        return {
          done: done9,
          value: value5
        };
      },
      return(value5) {
        if (!done9) {
          done9 = true;
        }
        return {
          done: true,
          value: value5
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeCons = (head6, tail) => {
  const cons3 = Object.create(ConsProto);
  cons3.head = head6;
  cons3.tail = tail;
  return cons3;
};
var NilProto = {
  [TypeId7]: TypeId7,
  _tag: "Nil",
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Nil"
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol]() {
    return array(toArray2(this));
  },
  [symbol2](that) {
    return isList(that) && this._tag === that._tag;
  },
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: void 0
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var _Nil = /* @__PURE__ */ Object.create(NilProto);
var isList = (u) => hasProperty(u, TypeId7);
var isNil = (self) => self._tag === "Nil";
var isCons = (self) => self._tag === "Cons";
var nil = () => _Nil;
var cons = (head6, tail) => makeCons(head6, tail);
var empty9 = nil;
var of3 = (value5) => makeCons(value5, _Nil);
var appendAll3 = /* @__PURE__ */ dual(2, (self, that) => prependAll(that, self));
var prepend3 = /* @__PURE__ */ dual(2, (self, element) => cons(element, self));
var prependAll = /* @__PURE__ */ dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = makeCons(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = makeCons(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
var reduce7 = /* @__PURE__ */ dual(3, (self, zero3, f) => {
  let acc = zero3;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
var reverse4 = (self) => {
  let result = empty9();
  let these = self;
  while (!isNil(these)) {
    result = prepend3(result, these.head);
    these = these.tail;
  }
  return result;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/data.js
var ArrayProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(Array.prototype), {
  [symbol]() {
    return array(this);
  },
  [symbol2](that) {
    if (Array.isArray(that) && this.length === that.length) {
      return this.every((v, i) => equals(v, that[i]));
    } else {
      return false;
    }
  }
});
var Structural = /* @__PURE__ */ function() {
  function Structural2(args) {
    if (args) {
      Object.assign(this, args);
    }
  }
  Structural2.prototype = StructuralPrototype;
  return Structural2;
}();
var struct = (as7) => Object.assign(Object.create(StructuralPrototype), as7);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/differ/contextPatch.js
var ContextPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferContextPatch");
function variance(a) {
  return a;
}
var PatchProto = {
  ...Structural.prototype,
  [ContextPatchTypeId]: {
    _Value: variance,
    _Patch: variance
  }
};
var EmptyProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Empty"
});
var _empty5 = /* @__PURE__ */ Object.create(EmptyProto);
var empty10 = () => _empty5;
var AndThenProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "AndThen"
});
var makeAndThen = (first3, second) => {
  const o = Object.create(AndThenProto);
  o.first = first3;
  o.second = second;
  return o;
};
var AddServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "AddService"
});
var makeAddService = (tag4, service2) => {
  const o = Object.create(AddServiceProto);
  o.tag = tag4;
  o.service = service2;
  return o;
};
var RemoveServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "RemoveService"
});
var makeRemoveService = (tag4) => {
  const o = Object.create(RemoveServiceProto);
  o.tag = tag4;
  return o;
};
var UpdateServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "UpdateService"
});
var makeUpdateService = (tag4, update4) => {
  const o = Object.create(UpdateServiceProto);
  o.tag = tag4;
  o.update = update4;
  return o;
};
var diff = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch9 = empty10();
  for (const [tag4, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag4)) {
      const old = missingServices.get(tag4);
      missingServices.delete(tag4);
      if (!equals(old, newService)) {
        patch9 = combine4(makeUpdateService(tag4, () => newService))(patch9);
      }
    } else {
      missingServices.delete(tag4);
      patch9 = combine4(makeAddService(tag4, newService))(patch9);
    }
  }
  for (const [tag4] of missingServices.entries()) {
    patch9 = combine4(makeRemoveService(tag4))(patch9);
  }
  return patch9;
};
var combine4 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen(self, that));
var patch = /* @__PURE__ */ dual(2, (self, context6) => {
  if (self._tag === "Empty") {
    return context6;
  }
  let wasServiceUpdated = false;
  let patches = of2(self);
  const updatedContext = new Map(context6.unsafeMap);
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    const tail = tailNonEmpty2(patches);
    switch (head6._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AddService": {
        updatedContext.set(head6.tag, head6.service);
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend2(prepend2(tail, head6.second), head6.first);
        break;
      }
      case "RemoveService": {
        updatedContext.delete(head6.tag);
        patches = tail;
        break;
      }
      case "UpdateService": {
        updatedContext.set(head6.tag, head6.update(updatedContext.get(head6.tag)));
        wasServiceUpdated = true;
        patches = tail;
        break;
      }
    }
  }
  if (!wasServiceUpdated) {
    return makeContext(updatedContext);
  }
  const map27 = /* @__PURE__ */ new Map();
  for (const [tag4] of context6.unsafeMap) {
    if (updatedContext.has(tag4)) {
      map27.set(tag4, updatedContext.get(tag4));
      updatedContext.delete(tag4);
    }
  }
  for (const [tag4, s] of updatedContext) {
    map27.set(tag4, s);
  }
  return makeContext(map27);
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/differ/hashSetPatch.js
var HashSetPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferHashSetPatch");
function variance2(a) {
  return a;
}
var PatchProto2 = {
  ...Structural.prototype,
  [HashSetPatchTypeId]: {
    _Value: variance2,
    _Key: variance2,
    _Patch: variance2
  }
};
var EmptyProto2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto2), {
  _tag: "Empty"
});
var _empty6 = /* @__PURE__ */ Object.create(EmptyProto2);
var empty11 = () => _empty6;
var AndThenProto2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto2), {
  _tag: "AndThen"
});
var makeAndThen2 = (first3, second) => {
  const o = Object.create(AndThenProto2);
  o.first = first3;
  o.second = second;
  return o;
};
var AddProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto2), {
  _tag: "Add"
});
var makeAdd = (value5) => {
  const o = Object.create(AddProto);
  o.value = value5;
  return o;
};
var RemoveProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto2), {
  _tag: "Remove"
});
var makeRemove = (value5) => {
  const o = Object.create(RemoveProto);
  o.value = value5;
  return o;
};
var diff2 = (oldValue, newValue) => {
  const [removed, patch9] = reduce5([oldValue, empty11()], ([set8, patch10], value5) => {
    if (has3(value5)(set8)) {
      return [remove4(value5)(set8), patch10];
    }
    return [set8, combine5(makeAdd(value5))(patch10)];
  })(newValue);
  return reduce5(patch9, (patch10, value5) => combine5(makeRemove(value5))(patch10))(removed);
};
var combine5 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen2(self, that));
var patch2 = /* @__PURE__ */ dual(2, (self, oldValue) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let set8 = oldValue;
  let patches = of2(self);
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    const tail = tailNonEmpty2(patches);
    switch (head6._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend2(head6.first)(prepend2(head6.second)(tail));
        break;
      }
      case "Add": {
        set8 = add4(head6.value)(set8);
        patches = tail;
        break;
      }
      case "Remove": {
        set8 = remove4(head6.value)(set8);
        patches = tail;
      }
    }
  }
  return set8;
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/differ/readonlyArrayPatch.js
var ReadonlyArrayPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferReadonlyArrayPatch");
function variance3(a) {
  return a;
}
var PatchProto3 = {
  ...Structural.prototype,
  [ReadonlyArrayPatchTypeId]: {
    _Value: variance3,
    _Patch: variance3
  }
};
var EmptyProto3 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto3), {
  _tag: "Empty"
});
var _empty7 = /* @__PURE__ */ Object.create(EmptyProto3);
var empty12 = () => _empty7;
var AndThenProto3 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto3), {
  _tag: "AndThen"
});
var makeAndThen3 = (first3, second) => {
  const o = Object.create(AndThenProto3);
  o.first = first3;
  o.second = second;
  return o;
};
var AppendProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto3), {
  _tag: "Append"
});
var makeAppend = (values3) => {
  const o = Object.create(AppendProto);
  o.values = values3;
  return o;
};
var SliceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto3), {
  _tag: "Slice"
});
var makeSlice = (from2, until) => {
  const o = Object.create(SliceProto);
  o.from = from2;
  o.until = until;
  return o;
};
var UpdateProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto3), {
  _tag: "Update"
});
var makeUpdate = (index2, patch9) => {
  const o = Object.create(UpdateProto);
  o.index = index2;
  o.patch = patch9;
  return o;
};
var diff3 = (options3) => {
  let i = 0;
  let patch9 = empty12();
  while (i < options3.oldValue.length && i < options3.newValue.length) {
    const oldElement = options3.oldValue[i];
    const newElement = options3.newValue[i];
    const valuePatch = options3.differ.diff(oldElement, newElement);
    if (!equals(valuePatch, options3.differ.empty)) {
      patch9 = combine6(patch9, makeUpdate(i, valuePatch));
    }
    i = i + 1;
  }
  if (i < options3.oldValue.length) {
    patch9 = combine6(patch9, makeSlice(0, i));
  }
  if (i < options3.newValue.length) {
    patch9 = combine6(patch9, makeAppend(drop(i)(options3.newValue)));
  }
  return patch9;
};
var combine6 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen3(self, that));
var patch3 = /* @__PURE__ */ dual(3, (self, oldValue, differ3) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let readonlyArray2 = oldValue.slice();
  let patches = of(self);
  while (isNonEmptyArray2(patches)) {
    const head6 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head6._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        tail.unshift(head6.first, head6.second);
        patches = tail;
        break;
      }
      case "Append": {
        readonlyArray2.push(...head6.values);
        patches = tail;
        break;
      }
      case "Slice": {
        readonlyArray2 = readonlyArray2.slice(head6.from, head6.until);
        patches = tail;
        break;
      }
      case "Update": {
        readonlyArray2[head6.index] = differ3.patch(head6.patch, readonlyArray2[head6.index]);
        patches = tail;
        break;
      }
    }
  }
  return readonlyArray2;
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/differ.js
var DifferTypeId = /* @__PURE__ */ Symbol.for("effect/Differ");
var DifferProto = {
  [DifferTypeId]: {
    _P: identity,
    _V: identity
  }
};
var make14 = (params) => {
  const differ3 = Object.create(DifferProto);
  differ3.empty = params.empty;
  differ3.diff = params.diff;
  differ3.combine = params.combine;
  differ3.patch = params.patch;
  return differ3;
};
var environment = () => make14({
  empty: empty10(),
  combine: (first3, second) => combine4(second)(first3),
  diff: (oldValue, newValue) => diff(oldValue, newValue),
  patch: (patch9, oldValue) => patch(oldValue)(patch9)
});
var hashSet = () => make14({
  empty: empty11(),
  combine: (first3, second) => combine5(second)(first3),
  diff: (oldValue, newValue) => diff2(oldValue, newValue),
  patch: (patch9, oldValue) => patch2(oldValue)(patch9)
});
var readonlyArray = (differ3) => make14({
  empty: empty12(),
  combine: (first3, second) => combine6(first3, second),
  diff: (oldValue, newValue) => diff3({
    oldValue,
    newValue,
    differ: differ3
  }),
  patch: (patch9, oldValue) => patch3(patch9, oldValue, differ3)
});
var update = () => updateWith((_, a) => a);
var updateWith = (f) => make14({
  empty: identity,
  combine: (first3, second) => {
    if (first3 === identity) {
      return second;
    }
    if (second === identity) {
      return first3;
    }
    return (a) => second(first3(a));
  },
  diff: (oldValue, newValue) => {
    if (equals(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch9, oldValue) => f(oldValue, patch9(oldValue))
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/runtimeFlagsPatch.js
var BIT_MASK = 255;
var BIT_SHIFT = 8;
var active = (patch9) => patch9 & BIT_MASK;
var enabled = (patch9) => patch9 >> BIT_SHIFT & BIT_MASK;
var make15 = (active2, enabled2) => (active2 & BIT_MASK) + ((enabled2 & active2 & BIT_MASK) << BIT_SHIFT);
var empty13 = /* @__PURE__ */ make15(0, 0);
var enable = (flag) => make15(flag, flag);
var disable = (flag) => make15(flag, 0);
var exclude = /* @__PURE__ */ dual(2, (self, flag) => make15(active(self) & ~flag, enabled(self)));
var andThen = /* @__PURE__ */ dual(2, (self, that) => self | that);
var invert = (n) => ~n >>> 0 & BIT_MASK;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/runtimeFlags.js
var None2 = 0;
var Interruption = 1 << 0;
var OpSupervision = 1 << 1;
var RuntimeMetrics = 1 << 2;
var WindDown = 1 << 4;
var CooperativeYielding = 1 << 5;
var cooperativeYielding = (self) => isEnabled(self, CooperativeYielding);
var enable2 = /* @__PURE__ */ dual(2, (self, flag) => self | flag);
var interruptible = (self) => interruption(self) && !windDown(self);
var interruption = (self) => isEnabled(self, Interruption);
var isEnabled = /* @__PURE__ */ dual(2, (self, flag) => (self & flag) !== 0);
var make16 = (...flags) => flags.reduce((a, b) => a | b, 0);
var none5 = /* @__PURE__ */ make16(None2);
var runtimeMetrics = (self) => isEnabled(self, RuntimeMetrics);
var windDown = (self) => isEnabled(self, WindDown);
var diff4 = /* @__PURE__ */ dual(2, (self, that) => make15(self ^ that, that));
var patch4 = /* @__PURE__ */ dual(2, (self, patch9) => self & (invert(active(patch9)) | enabled(patch9)) | active(patch9) & enabled(patch9));
var differ = /* @__PURE__ */ make14({
  empty: empty13,
  diff: (oldValue, newValue) => diff4(oldValue, newValue),
  combine: (first3, second) => andThen(second)(first3),
  patch: (_patch, oldValue) => patch4(oldValue, _patch)
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/RuntimeFlagsPatch.js
var empty14 = empty13;
var enable3 = enable;
var disable2 = disable;
var exclude2 = exclude;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/blockedRequests.js
var empty15 = {
  _tag: "Empty"
};
var par = (self, that) => ({
  _tag: "Par",
  left: self,
  right: that
});
var seq = (self, that) => ({
  _tag: "Seq",
  left: self,
  right: that
});
var single = (dataSource, blockedRequest) => ({
  _tag: "Single",
  dataSource,
  blockedRequest
});
var flatten2 = (self) => {
  let current = of3(self);
  let updated = empty9();
  while (1) {
    const [parallel4, sequential4] = reduce7(current, [parallelCollectionEmpty(), empty9()], ([parallel5, sequential5], blockedRequest) => {
      const [par2, seq2] = step(blockedRequest);
      return [parallelCollectionCombine(parallel5, par2), appendAll3(sequential5, seq2)];
    });
    updated = merge4(updated, parallel4);
    if (isNil(sequential4)) {
      return reverse4(updated);
    }
    current = sequential4;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues");
};
var step = (requests) => {
  let current = requests;
  let parallel4 = parallelCollectionEmpty();
  let stack = empty9();
  let sequential4 = empty9();
  while (1) {
    switch (current._tag) {
      case "Empty": {
        if (isNil(stack)) {
          return [parallel4, sequential4];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
      case "Par": {
        stack = cons(current.right, stack);
        current = current.left;
        break;
      }
      case "Seq": {
        const left3 = current.left;
        const right3 = current.right;
        switch (left3._tag) {
          case "Empty": {
            current = right3;
            break;
          }
          case "Par": {
            const l = left3.left;
            const r = left3.right;
            current = par(seq(l, right3), seq(r, right3));
            break;
          }
          case "Seq": {
            const l = left3.left;
            const r = left3.right;
            current = seq(l, seq(r, right3));
            break;
          }
          case "Single": {
            current = left3;
            sequential4 = cons(right3, sequential4);
            break;
          }
        }
        break;
      }
      case "Single": {
        parallel4 = parallelCollectionCombine(parallel4, parallelCollectionMake(current.dataSource, current.blockedRequest));
        if (isNil(stack)) {
          return [parallel4, sequential4];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
    }
  }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/effect/issues");
};
var merge4 = (sequential4, parallel4) => {
  if (isNil(sequential4)) {
    return of3(parallelCollectionToSequentialCollection(parallel4));
  }
  if (parallelCollectionIsEmpty(parallel4)) {
    return sequential4;
  }
  const seqHeadKeys = sequentialCollectionKeys(sequential4.head);
  const parKeys = parallelCollectionKeys(parallel4);
  if (seqHeadKeys.length === 1 && parKeys.length === 1 && equals(seqHeadKeys[0], parKeys[0])) {
    return cons(sequentialCollectionCombine(sequential4.head, parallelCollectionToSequentialCollection(parallel4)), sequential4.tail);
  }
  return cons(parallelCollectionToSequentialCollection(parallel4), sequential4);
};
var EntryTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/Entry");
var EntryImpl = class {
  request;
  result;
  listeners;
  ownerId;
  state;
  [EntryTypeId] = blockedRequestVariance;
  constructor(request2, result, listeners, ownerId, state) {
    this.request = request2;
    this.result = result;
    this.listeners = listeners;
    this.ownerId = ownerId;
    this.state = state;
  }
};
var blockedRequestVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
var makeEntry = (options3) => new EntryImpl(options3.request, options3.result, options3.listeners, options3.ownerId, options3.state);
var RequestBlockParallelTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockParallel");
var parallelVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
var ParallelImpl = class {
  map;
  [RequestBlockParallelTypeId] = parallelVariance;
  constructor(map27) {
    this.map = map27;
  }
};
var parallelCollectionEmpty = () => new ParallelImpl(empty8());
var parallelCollectionMake = (dataSource, blockedRequest) => new ParallelImpl(make13([dataSource, Array.of(blockedRequest)]));
var parallelCollectionCombine = (self, that) => new ParallelImpl(reduce6(self.map, that.map, (map27, value5, key2) => set3(map27, key2, match(get7(map27, key2), {
  onNone: () => value5,
  onSome: (a) => [...a, ...value5]
}))));
var parallelCollectionIsEmpty = (self) => isEmpty3(self.map);
var parallelCollectionKeys = (self) => Array.from(keys2(self.map));
var parallelCollectionToSequentialCollection = (self) => sequentialCollectionMake(map6(self.map, (x) => Array.of(x)));
var SequentialCollectionTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockSequential");
var sequentialVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
var SequentialImpl = class {
  map;
  [SequentialCollectionTypeId] = sequentialVariance;
  constructor(map27) {
    this.map = map27;
  }
};
var sequentialCollectionMake = (map27) => new SequentialImpl(map27);
var sequentialCollectionCombine = (self, that) => new SequentialImpl(reduce6(that.map, self.map, (map27, value5, key2) => set3(map27, key2, match(get7(map27, key2), {
  onNone: () => [],
  onSome: (a) => [...a, ...value5]
}))));
var sequentialCollectionKeys = (self) => Array.from(keys2(self.map));
var sequentialCollectionToChunk = (self) => Array.from(self.map);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/cause.js
var OP_DIE = "Die";
var OP_EMPTY = "Empty";
var OP_FAIL = "Fail";
var OP_INTERRUPT = "Interrupt";
var OP_PARALLEL = "Parallel";
var OP_SEQUENTIAL = "Sequential";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/cause.js
var CauseSymbolKey = "effect/Cause";
var CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
var variance4 = {
  /* c8 ignore next */
  _E: (_) => _
};
var proto = {
  [CauseTypeId]: variance4,
  [symbol]() {
    return pipe(hash(CauseSymbolKey), combine(hash(flattenCause(this))));
  },
  [symbol2](that) {
    return isCause(that) && causeEquals(this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toJSON() {
    switch (this._tag) {
      case "Empty":
        return {
          _id: "Cause",
          _tag: this._tag
        };
      case "Die":
        return {
          _id: "Cause",
          _tag: this._tag,
          defect: toJSON(this.defect)
        };
      case "Interrupt":
        return {
          _id: "Cause",
          _tag: this._tag,
          fiberId: this.fiberId.toJSON()
        };
      case "Fail":
        return {
          _id: "Cause",
          _tag: this._tag,
          failure: toJSON(this.error)
        };
      case "Sequential":
      case "Parallel":
        return {
          _id: "Cause",
          _tag: this._tag,
          left: toJSON(this.left),
          right: toJSON(this.right)
        };
    }
  },
  toString() {
    return pretty(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var empty16 = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ Object.create(proto);
  o._tag = OP_EMPTY;
  return o;
})();
var fail = (error2) => {
  const o = Object.create(proto);
  o._tag = OP_FAIL;
  o.error = error2;
  return o;
};
var die = (defect) => {
  const o = Object.create(proto);
  o._tag = OP_DIE;
  o.defect = defect;
  return o;
};
var interrupt = (fiberId3) => {
  const o = Object.create(proto);
  o._tag = OP_INTERRUPT;
  o.fiberId = fiberId3;
  return o;
};
var parallel = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_PARALLEL;
  o.left = left3;
  o.right = right3;
  return o;
};
var sequential = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_SEQUENTIAL;
  o.left = left3;
  o.right = right3;
  return o;
};
var isCause = (u) => hasProperty(u, CauseTypeId);
var isDieType = (self) => self._tag === OP_DIE;
var isEmpty5 = (self) => {
  if (self._tag === OP_EMPTY) {
    return true;
  }
  return reduce8(self, true, (acc, cause3) => {
    switch (cause3._tag) {
      case OP_EMPTY: {
        return some2(acc);
      }
      case OP_DIE:
      case OP_FAIL:
      case OP_INTERRUPT: {
        return some2(false);
      }
      default: {
        return none2();
      }
    }
  });
};
var isInterrupted = (self) => isSome2(interruptOption(self));
var isInterruptedOnly = (self) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self);
var failures = (self) => reverse3(reduce8(self, empty4(), (list4, cause3) => cause3._tag === OP_FAIL ? some2(pipe(list4, prepend2(cause3.error))) : none2()));
var defects = (self) => reverse3(reduce8(self, empty4(), (list4, cause3) => cause3._tag === OP_DIE ? some2(pipe(list4, prepend2(cause3.defect))) : none2()));
var interruptors = (self) => reduce8(self, empty7(), (set8, cause3) => cause3._tag === OP_INTERRUPT ? some2(pipe(set8, add4(cause3.fiberId))) : none2());
var failureOption = (self) => find(self, (cause3) => cause3._tag === OP_FAIL ? some2(cause3.error) : none2());
var failureOrCause = (self) => {
  const option4 = failureOption(self);
  switch (option4._tag) {
    case "None": {
      return right2(self);
    }
    case "Some": {
      return left2(option4.value);
    }
  }
};
var flipCauseOption = (self) => match4(self, {
  onEmpty: some2(empty16),
  onFail: (failureOption2) => pipe(failureOption2, map(fail)),
  onDie: (defect) => some2(die(defect)),
  onInterrupt: (fiberId3) => some2(interrupt(fiberId3)),
  onSequential: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(sequential(left3.value, right3.value));
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    return none2();
  },
  onParallel: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(parallel(left3.value, right3.value));
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    return none2();
  }
});
var interruptOption = (self) => find(self, (cause3) => cause3._tag === OP_INTERRUPT ? some2(cause3.fiberId) : none2());
var keepDefects = (self) => match4(self, {
  onEmpty: none2(),
  onFail: () => none2(),
  onDie: (defect) => some2(die(defect)),
  onInterrupt: () => none2(),
  onSequential: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(sequential(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  },
  onParallel: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(parallel(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  }
});
var keepDefectsAndElectFailures = (self) => match4(self, {
  onEmpty: none2(),
  onFail: (failure) => some2(die(failure)),
  onDie: (defect) => some2(die(defect)),
  onInterrupt: () => none2(),
  onSequential: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(sequential(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  },
  onParallel: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(parallel(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  }
});
var stripFailures = (self) => match4(self, {
  onEmpty: empty16,
  onFail: () => empty16,
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onSequential: sequential,
  onParallel: parallel
});
var electFailures = (self) => match4(self, {
  onEmpty: empty16,
  onFail: (failure) => die(failure),
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onSequential: (left3, right3) => sequential(left3, right3),
  onParallel: (left3, right3) => parallel(left3, right3)
});
var map8 = /* @__PURE__ */ dual(2, (self, f) => flatMap6(self, (e) => fail(f(e))));
var flatMap6 = /* @__PURE__ */ dual(2, (self, f) => match4(self, {
  onEmpty: empty16,
  onFail: (error2) => f(error2),
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onSequential: (left3, right3) => sequential(left3, right3),
  onParallel: (left3, right3) => parallel(left3, right3)
}));
var flatten3 = (self) => flatMap6(self, identity);
var causeEquals = (left3, right3) => {
  let leftStack = of2(left3);
  let rightStack = of2(right3);
  while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = pipe(headNonEmpty2(leftStack), reduce8([empty7(), empty4()], ([parallel4, sequential4], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return some2([pipe(parallel4, union3(par2)), pipe(sequential4, appendAll2(seq2))]);
    }));
    const [rightParallel, rightSequential] = pipe(headNonEmpty2(rightStack), reduce8([empty7(), empty4()], ([parallel4, sequential4], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return some2([pipe(parallel4, union3(par2)), pipe(sequential4, appendAll2(seq2))]);
    }));
    if (!equals(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
var flattenCause = (cause3) => {
  return flattenCauseLoop(of2(cause3), empty4());
};
var flattenCauseLoop = (causes, flattened2) => {
  while (1) {
    const [parallel4, sequential4] = pipe(causes, reduce([empty7(), empty4()], ([parallel5, sequential5], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return [pipe(parallel5, union3(par2)), pipe(sequential5, appendAll2(seq2))];
    }));
    const updated = size3(parallel4) > 0 ? pipe(flattened2, prepend2(parallel4)) : flattened2;
    if (isEmpty(sequential4)) {
      return reverse3(updated);
    }
    causes = sequential4;
    flattened2 = updated;
  }
  throw new Error("BUG: Cause.flattenCauseLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
};
var find = /* @__PURE__ */ dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option4 = pf(item);
    switch (option4._tag) {
      case "None": {
        switch (item._tag) {
          case OP_SEQUENTIAL:
          case OP_PARALLEL: {
            stack.push(item.right);
            stack.push(item.left);
            break;
          }
        }
        break;
      }
      case "Some": {
        return option4;
      }
    }
  }
  return none2();
});
var evaluateCause = (self) => {
  let cause3 = self;
  const stack = [];
  let _parallel = empty7();
  let _sequential = empty4();
  while (cause3 !== void 0) {
    switch (cause3._tag) {
      case OP_EMPTY: {
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause3 = stack.pop();
        break;
      }
      case OP_FAIL: {
        _parallel = add4(_parallel, cause3.error);
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause3 = stack.pop();
        break;
      }
      case OP_DIE: {
        _parallel = add4(_parallel, cause3.defect);
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause3 = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        _parallel = add4(_parallel, cause3.fiberId);
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause3 = stack.pop();
        break;
      }
      case OP_SEQUENTIAL: {
        switch (cause3.left._tag) {
          case OP_EMPTY: {
            cause3 = cause3.right;
            break;
          }
          case OP_SEQUENTIAL: {
            cause3 = sequential(cause3.left.left, sequential(cause3.left.right, cause3.right));
            break;
          }
          case OP_PARALLEL: {
            cause3 = parallel(sequential(cause3.left.left, cause3.right), sequential(cause3.left.right, cause3.right));
            break;
          }
          default: {
            _sequential = prepend2(_sequential, cause3.right);
            cause3 = cause3.left;
            break;
          }
        }
        break;
      }
      case OP_PARALLEL: {
        stack.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
    }
  }
  throw new Error("BUG: Cause.evaluateCauseLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
};
var IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  sequentialCase: (_, left3, right3) => left3 && right3,
  parallelCase: (_, left3, right3) => left3 && right3
};
var OP_SEQUENTIAL_CASE = "SequentialCase";
var OP_PARALLEL_CASE = "ParallelCase";
var match4 = /* @__PURE__ */ dual(2, (self, {
  onDie,
  onEmpty,
  onFail,
  onInterrupt: onInterrupt3,
  onParallel,
  onSequential
}) => {
  return reduceWithContext(self, void 0, {
    emptyCase: () => onEmpty,
    failCase: (_, error2) => onFail(error2),
    dieCase: (_, defect) => onDie(defect),
    interruptCase: (_, fiberId3) => onInterrupt3(fiberId3),
    sequentialCase: (_, left3, right3) => onSequential(left3, right3),
    parallelCase: (_, left3, right3) => onParallel(left3, right3)
  });
});
var reduce8 = /* @__PURE__ */ dual(3, (self, zero3, pf) => {
  let accumulator = zero3;
  let cause3 = self;
  const causes = [];
  while (cause3 !== void 0) {
    const option4 = pf(accumulator, cause3);
    accumulator = isSome2(option4) ? option4.value : accumulator;
    switch (cause3._tag) {
      case OP_SEQUENTIAL: {
        causes.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
      case OP_PARALLEL: {
        causes.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
      default: {
        cause3 = void 0;
        break;
      }
    }
    if (cause3 === void 0 && causes.length > 0) {
      cause3 = causes.pop();
    }
  }
  return accumulator;
});
var reduceWithContext = /* @__PURE__ */ dual(3, (self, context6, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause3 = input.pop();
    switch (cause3._tag) {
      case OP_EMPTY: {
        output.push(right2(reducer.emptyCase(context6)));
        break;
      }
      case OP_FAIL: {
        output.push(right2(reducer.failCase(context6, cause3.error)));
        break;
      }
      case OP_DIE: {
        output.push(right2(reducer.dieCase(context6, cause3.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right2(reducer.interruptCase(context6, cause3.fiberId)));
        break;
      }
      case OP_SEQUENTIAL: {
        input.push(cause3.right);
        input.push(cause3.left);
        output.push(left2({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL: {
        input.push(cause3.right);
        input.push(cause3.left);
        output.push(left2({
          _tag: OP_PARALLEL_CASE
        }));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either6 = output.pop();
    switch (either6._tag) {
      case "Left": {
        switch (either6.left._tag) {
          case OP_SEQUENTIAL_CASE: {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value5 = reducer.sequentialCase(context6, left3, right3);
            accumulator.push(value5);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value5 = reducer.parallelCase(context6, left3, right3);
            accumulator.push(value5);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either6.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
  }
  return accumulator.pop();
});
var filterStack = (stack) => {
  const lines2 = stack.split("\n");
  const out = [];
  for (let i = 0; i < lines2.length; i++) {
    out.push(lines2[i].replace(/at .*effect_cutpoint.*\((.*)\)/, "at $1"));
    if (lines2[i].includes("effect_cutpoint")) {
      return out.join("\n");
    }
  }
  return out.join("\n");
};
var pretty = (cause3) => {
  if (isInterruptedOnly(cause3)) {
    return "All fibers interrupted without errors.";
  }
  const final = prettyErrors(cause3).map((e) => {
    let message = e.message;
    if (e.stack) {
      message += `\r
${filterStack(e.stack)}`;
    }
    if (e.span) {
      let current = e.span;
      let i = 0;
      while (current && current._tag === "Span" && i < 10) {
        message += `\r
    at ${current.name}`;
        current = getOrUndefined(current.parent);
        i++;
      }
    }
    return message;
  }).join("\r\n");
  return final;
};
var PrettyError = class {
  message;
  stack;
  span;
  constructor(message, stack, span2) {
    this.message = message;
    this.stack = stack;
    this.span = span2;
  }
  toJSON() {
    const out = {
      message: this.message
    };
    if (this.stack) {
      out.stack = this.stack;
    }
    if (this.span) {
      out.span = this.span;
    }
    return out;
  }
};
var prettyErrorMessage = (u) => {
  if (typeof u === "string") {
    return `Error: ${u}`;
  }
  if (hasProperty(u, "toString") && isFunction2(u["toString"]) && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }
  return `Error: ${JSON.stringify(u)}`;
};
var spanSymbol = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
var defaultRenderError = (error2) => {
  const span2 = hasProperty(error2, spanSymbol) && error2[spanSymbol];
  if (error2 instanceof Error) {
    return new PrettyError(prettyErrorMessage(error2), error2.stack?.split("\n").filter((_) => _.match(/at (.*)/)).join("\n"), span2);
  }
  return new PrettyError(prettyErrorMessage(error2), void 0, span2);
};
var prettyErrors = (cause3) => reduceWithContext(cause3, void 0, {
  emptyCase: () => [],
  dieCase: (_, unknownError) => {
    return [defaultRenderError(unknownError)];
  },
  failCase: (_, error2) => {
    return [defaultRenderError(error2)];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r]
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/deferred.js
var OP_STATE_PENDING = "Pending";
var OP_STATE_DONE = "Done";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/deferred.js
var DeferredSymbolKey = "effect/Deferred";
var DeferredTypeId = /* @__PURE__ */ Symbol.for(DeferredSymbolKey);
var deferredVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
var pending = (joiners) => {
  return {
    _tag: OP_STATE_PENDING,
    joiners
  };
};
var done = (effect2) => {
  return {
    _tag: OP_STATE_DONE,
    effect: effect2
  };
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/internalize.js
var internalize = (f) => {
  Object.defineProperty(f, "name", {
    value: "effect_cutpoint"
  });
  return f;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/tracer.js
var TracerTypeId = /* @__PURE__ */ Symbol.for("effect/Tracer");
var make17 = (options3) => ({
  [TracerTypeId]: TracerTypeId,
  ...options3
});
var tracerTag = /* @__PURE__ */ Tag(/* @__PURE__ */ Symbol.for("effect/Tracer"));
var spanTag = /* @__PURE__ */ Tag(/* @__PURE__ */ Symbol.for("effect/ParentSpan"));
var ids2 = /* @__PURE__ */ globalValue("effect/Tracer/SpanId.ids", () => make11(0));
var NativeSpan = class {
  name;
  parent;
  context;
  links;
  startTime;
  _tag = "Span";
  spanId;
  traceId = "native";
  sampled = true;
  status;
  attributes;
  events = [];
  constructor(name, parent, context6, links, startTime) {
    this.name = name;
    this.parent = parent;
    this.context = context6;
    this.links = links;
    this.startTime = startTime;
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = /* @__PURE__ */ new Map();
    this.spanId = `span${incrementAndGet(ids2)}`;
  }
  end = (endTime, exit3) => {
    this.status = {
      _tag: "Ended",
      endTime,
      exit: exit3,
      startTime: this.status.startTime
    };
  };
  attribute = (key2, value5) => {
    this.attributes.set(key2, value5);
  };
  event = (name, startTime, attributes) => {
    this.events.push([name, startTime, attributes ?? {}]);
  };
};
var nativeTracer = /* @__PURE__ */ make17({
  span: (name, parent, context6, links, startTime) => new NativeSpan(name, parent, context6, links, startTime),
  context: (f) => f()
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/core.js
var EffectErrorSymbolKey = "effect/EffectError";
var EffectErrorTypeId = /* @__PURE__ */ Symbol.for(EffectErrorSymbolKey);
var isEffectError = (u) => hasProperty(u, EffectErrorTypeId);
var makeEffectError = (cause3) => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause: cause3
});
var blocked = (blockedRequests, _continue3) => {
  const effect2 = new EffectPrimitive("Blocked");
  effect2.i0 = blockedRequests;
  effect2.i1 = _continue3;
  return effect2;
};
var runRequestBlock = (blockedRequests) => {
  const effect2 = new EffectPrimitive("RunBlocked");
  effect2.i0 = blockedRequests;
  return effect2;
};
var EffectTypeId2 = /* @__PURE__ */ Symbol.for("effect/Effect");
var RevertFlags = class {
  patch;
  op;
  _op = OP_REVERT_FLAGS;
  constructor(patch9, op) {
    this.patch = patch9;
    this.op = op;
  }
};
var EffectPrimitive = class {
  _op;
  i0 = void 0;
  i1 = void 0;
  i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
  }
  [symbol2](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Effect",
      _op: this._op,
      i0: toJSON(this.i0),
      i1: toJSON(this.i1),
      i2: toJSON(this.i2)
    };
  }
  toString() {
    return format(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var EffectPrimitiveFailure = class {
  _op;
  i0 = void 0;
  i1 = void 0;
  i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol2](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  get cause() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      cause: this.cause.toJSON()
    };
  }
  toString() {
    return format(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var EffectPrimitiveSuccess = class {
  _op;
  i0 = void 0;
  i1 = void 0;
  i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol2](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  get value() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      value: toJSON(this.value)
    };
  }
  toString() {
    return format(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var isEffect = (u) => hasProperty(u, EffectTypeId2);
var withFiberRuntime = (withRuntime) => {
  internalize(withRuntime);
  const effect2 = new EffectPrimitive(OP_WITH_RUNTIME);
  effect2.i0 = withRuntime;
  return effect2;
};
var acquireUseRelease = /* @__PURE__ */ dual(3, (acquire, use, release) => uninterruptibleMask((restore) => flatMap7(acquire, (a) => flatMap7(exit(suspend(() => restore(use(a)))), (exit3) => {
  return suspend(() => release(a, exit3)).pipe(matchCauseEffect({
    onFailure: (cause3) => {
      switch (exit3._tag) {
        case OP_FAILURE: {
          return failCause(parallel(exit3.i0, cause3));
        }
        case OP_SUCCESS: {
          return failCause(cause3);
        }
      }
    },
    onSuccess: () => exit3
  }));
}))));
var as = /* @__PURE__ */ dual(2, (self, value5) => flatMap7(self, () => succeed(value5)));
var asUnit = (self) => as(self, void 0);
var async = (register, blockingOn = none4) => suspend(() => {
  internalize(register);
  let backingResume = void 0;
  let pendingEffect = void 0;
  function proxyResume(effect3) {
    if (backingResume) {
      backingResume(effect3);
    } else if (pendingEffect === void 0) {
      pendingEffect = effect3;
    }
  }
  const effect2 = new EffectPrimitive(OP_ASYNC);
  effect2.i0 = (resume2) => {
    backingResume = resume2;
    if (pendingEffect) {
      resume2(pendingEffect);
    }
  };
  effect2.i1 = blockingOn;
  let cancelerRef = void 0;
  let controllerRef = void 0;
  if (register.length !== 1) {
    controllerRef = new AbortController();
    cancelerRef = register(proxyResume, controllerRef.signal);
  } else {
    cancelerRef = register(proxyResume);
  }
  return cancelerRef || controllerRef ? onInterrupt(effect2, (_) => {
    if (controllerRef) {
      controllerRef.abort();
    }
    return cancelerRef ?? unit;
  }) : effect2;
});
var asyncEither = (register, blockingOn = none4) => async((resume2) => {
  const result = register(resume2);
  if (isRight2(result)) {
    resume2(result.right);
  } else {
    return result.left;
  }
}, blockingOn);
var catchAllCause = /* @__PURE__ */ dual(2, (self, f) => {
  const effect2 = new EffectPrimitive(OP_ON_FAILURE);
  effect2.i0 = self;
  effect2.i1 = f;
  internalize(f);
  return effect2;
});
var catchAll = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: f,
  onSuccess: succeed
}));
var unified = (f) => (...args) => f(...args);
var catchIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchAllCause(self, (cause3) => {
  const either6 = failureOrCause(cause3);
  switch (either6._tag) {
    case "Left": {
      return predicate(either6.left) ? f(either6.left) : failCause(cause3);
    }
    case "Right": {
      return failCause(either6.right);
    }
  }
}));
var catchSome = /* @__PURE__ */ dual(2, (self, pf) => catchAllCause(self, (cause3) => {
  const either6 = failureOrCause(cause3);
  switch (either6._tag) {
    case "Left": {
      return pipe(pf(either6.left), getOrElse(() => failCause(cause3)));
    }
    case "Right": {
      return failCause(either6.right);
    }
  }
}));
var checkInterruptible = (f) => withFiberRuntime((_, status2) => f(interruption(status2.runtimeFlags)));
var spanSymbol2 = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
var originalSymbol = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation");
var capture = (obj, span2) => {
  if (isSome2(span2)) {
    return new Proxy(obj, {
      has(target, p2) {
        return p2 === spanSymbol2 || p2 === originalSymbol || p2 in target;
      },
      get(target, p2) {
        if (p2 === spanSymbol2) {
          return span2.value;
        }
        if (p2 === originalSymbol) {
          return obj;
        }
        return target[p2];
      }
    });
  }
  return obj;
};
var die2 = (defect) => isObject(defect) && !(spanSymbol2 in defect) ? withFiberRuntime((fiber) => failCause(die(capture(defect, currentSpanFromFiber(fiber))))) : failCause(die(defect));
var dieMessage = (message) => failCauseSync(() => die(new RuntimeException(message)));
var dieSync = (evaluate) => flatMap7(sync(evaluate), die2);
var either2 = (self) => matchEffect(self, {
  onFailure: (e) => succeed(left2(e)),
  onSuccess: (a) => succeed(right2(a))
});
var exit = (self) => matchCause(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
var fail2 = (error2) => isObject(error2) && !(spanSymbol2 in error2) ? withFiberRuntime((fiber) => failCause(fail(capture(error2, currentSpanFromFiber(fiber))))) : failCause(fail(error2));
var failSync = (evaluate) => flatMap7(sync(evaluate), fail2);
var failCause = (cause3) => {
  const effect2 = new EffectPrimitiveFailure(OP_FAILURE);
  effect2.i0 = cause3;
  return effect2;
};
var failCauseSync = (evaluate) => flatMap7(sync(evaluate), failCause);
var fiberId = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.id()));
var fiberIdWith = (f) => withFiberRuntime((state) => f(state.id()));
var flatMap7 = /* @__PURE__ */ dual(2, (self, f) => {
  internalize(f);
  const effect2 = new EffectPrimitive(OP_ON_SUCCESS);
  effect2.i0 = self;
  effect2.i1 = f;
  return effect2;
});
var andThen2 = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => {
  const b = typeof f === "function" ? f(a) : f;
  if (isEffect(b)) {
    return b;
  } else if (isPromise(b)) {
    return async((resume2) => {
      b.then((a2) => resume2(succeed(a2))).catch((e) => resume2(fail2(new UnknownException(e))));
    });
  }
  return succeed(b);
}));
var step2 = (self) => {
  const effect2 = new EffectPrimitive("OnStep");
  effect2.i0 = self;
  return effect2;
};
var flatten4 = (self) => flatMap7(self, identity);
var flip = (self) => matchEffect(self, {
  onFailure: succeed,
  onSuccess: fail2
});
var matchCause = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => succeed(onFailure(cause3)),
  onSuccess: (a) => succeed(onSuccess(a))
}));
var matchCauseEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  const effect2 = new EffectPrimitive(OP_ON_SUCCESS_AND_FAILURE);
  effect2.i0 = self;
  effect2.i1 = onFailure;
  effect2.i2 = onSuccess;
  internalize(onFailure);
  internalize(onSuccess);
  return effect2;
});
var matchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const failures2 = failures(cause3);
    const defects2 = defects(cause3);
    if (defects2.length > 0) {
      return failCause(electFailures(cause3));
    }
    if (failures2.length > 0) {
      return onFailure(unsafeHead(failures2));
    }
    return failCause(cause3);
  },
  onSuccess
}));
var forEachSequential = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable(self);
  const ret = new Array(arr.length);
  let i = 0;
  return as(whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: (b) => {
      ret[i++] = b;
    }
  }), ret);
}));
var forEachSequentialDiscard = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable(self);
  let i = 0;
  return whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: () => {
      i++;
    }
  });
}));
var if_ = /* @__PURE__ */ dual((args) => typeof args[0] === "boolean" || isEffect(args[0]), (self, {
  onFalse,
  onTrue
}) => typeof self === "boolean" ? self ? onTrue : onFalse : flatMap7(self, unified((b) => b ? onTrue : onFalse)));
var interrupt2 = /* @__PURE__ */ flatMap7(fiberId, (fiberId3) => interruptWith(fiberId3));
var interruptWith = (fiberId3) => failCause(interrupt(fiberId3));
var interruptible2 = (self) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = enable3(Interruption);
  effect2.i1 = () => self;
  return effect2;
};
var interruptibleMask = (f) => {
  internalize(f);
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = enable3(Interruption);
  effect2.i1 = (oldFlags) => interruption(oldFlags) ? f(interruptible2) : f(uninterruptible);
  return effect2;
};
var intoDeferred = /* @__PURE__ */ dual(2, (self, deferred) => uninterruptibleMask((restore) => flatMap7(exit(restore(self)), (exit3) => deferredDone(deferred, exit3))));
var map9 = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => sync(() => f(a))));
var mapBoth = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchEffect(self, {
  onFailure: (e) => failSync(() => onFailure(e)),
  onSuccess: (a) => sync(() => onSuccess(a))
}));
var mapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either6 = failureOrCause(cause3);
    switch (either6._tag) {
      case "Left": {
        return failSync(() => f(either6.left));
      }
      case "Right": {
        return failCause(either6.right);
      }
    }
  },
  onSuccess: succeed
}));
var onError = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, unified((exit3) => exitIsSuccess(exit3) ? unit : cleanup(exit3.i0))));
var onExit = /* @__PURE__ */ dual(2, (self, cleanup) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => {
    const result = exitFailCause(cause1);
    return matchCauseEffect(cleanup(result), {
      onFailure: (cause22) => exitFailCause(sequential(cause1, cause22)),
      onSuccess: () => result
    });
  },
  onSuccess: (success) => {
    const result = exitSucceed(success);
    return zipRight(cleanup(result), result);
  }
})));
var onInterrupt = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, exitMatch({
  onFailure: (cause3) => isInterruptedOnly(cause3) ? asUnit(cleanup(interruptors(cause3))) : unit,
  onSuccess: () => unit
})));
var orElse2 = /* @__PURE__ */ dual(2, (self, that) => attemptOrElse(self, that, succeed));
var orDie = (self) => orDieWith(self, identity);
var orDieWith = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: (e) => die2(f(e)),
  onSuccess: succeed
}));
var partitionMap2 = (elements, f) => fromIterable(elements).reduceRight(([lefts, rights], current) => {
  const either6 = f(current);
  switch (either6._tag) {
    case "Left": {
      return [[either6.left, ...lefts], rights];
    }
    case "Right": {
      return [lefts, [either6.right, ...rights]];
    }
  }
}, [new Array(), new Array()]);
var runtimeFlags = /* @__PURE__ */ withFiberRuntime((_, status2) => succeed(status2.runtimeFlags));
var succeed = (value5) => {
  const effect2 = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect2.i0 = value5;
  return effect2;
};
var suspend = (effect2) => flatMap7(sync(effect2), identity);
var sync = (evaluate) => {
  internalize(evaluate);
  const effect2 = new EffectPrimitive(OP_SYNC);
  effect2.i0 = evaluate;
  return effect2;
};
var tap = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => {
  const b = typeof f === "function" ? f(a) : f;
  if (isEffect(b)) {
    return as(b, a);
  } else if (isPromise(b)) {
    return async((resume2) => {
      b.then((_) => resume2(succeed(a))).catch((e) => resume2(fail2(new UnknownException(e))));
    });
  }
  return succeed(a);
}));
var transplant = (f) => withFiberRuntime((state) => {
  const scopeOverride = state.getFiberRef(currentForkScopeOverride);
  const scope4 = pipe(scopeOverride, getOrElse(() => state.scope()));
  return f(fiberRefLocally(currentForkScopeOverride, some2(scope4)));
});
var attemptOrElse = /* @__PURE__ */ dual(3, (self, that, onSuccess) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const defects2 = defects(cause3);
    if (defects2.length > 0) {
      return failCause(getOrThrow(keepDefectsAndElectFailures(cause3)));
    }
    return that();
  },
  onSuccess
}));
var uninterruptible = (self) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = disable2(Interruption);
  effect2.i1 = () => self;
  return effect2;
};
var uninterruptibleMask = (f) => {
  internalize(f);
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = disable2(Interruption);
  effect2.i1 = (oldFlags) => interruption(oldFlags) ? f(interruptible2) : f(uninterruptible);
  return effect2;
};
var unit = /* @__PURE__ */ succeed(void 0);
var updateRuntimeFlags = (patch9) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = patch9;
  effect2.i1 = void 0;
  return effect2;
};
var whenEffect = /* @__PURE__ */ dual(2, (self, predicate) => flatMap7(predicate, (b) => {
  if (b) {
    return pipe(self, map9(some2));
  }
  return succeed(none2());
}));
var whileLoop = (options3) => {
  const effect2 = new EffectPrimitive(OP_WHILE);
  effect2.i0 = options3.while;
  effect2.i1 = options3.body;
  effect2.i2 = options3.step;
  internalize(options3.body);
  internalize(options3.step);
  internalize(options3.while);
  return effect2;
};
var withConcurrency = /* @__PURE__ */ dual(2, (self, concurrency) => fiberRefLocally(self, currentConcurrency, concurrency));
var withRequestBatching = /* @__PURE__ */ dual(2, (self, requestBatching) => fiberRefLocally(self, currentRequestBatching, requestBatching));
var withRuntimeFlags = /* @__PURE__ */ dual(2, (self, update4) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.i0 = update4;
  effect2.i1 = () => self;
  return effect2;
});
var withTracerTiming = /* @__PURE__ */ dual(2, (effect2, enabled2) => fiberRefLocally(effect2, currentTracerTimingEnabled, enabled2));
var yieldNow = (options3) => {
  const effect2 = new EffectPrimitive(OP_YIELD);
  return typeof options3?.priority !== "undefined" ? withSchedulingPriority(effect2, options3.priority) : effect2;
};
var zip2 = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, (a) => map9(that, (b) => [a, b])));
var zipLeft = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, (a) => as(that, a)));
var zipRight = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, () => that));
var zipWith2 = /* @__PURE__ */ dual(3, (self, that, f) => flatMap7(self, (a) => map9(that, (b) => f(a, b))));
var never = /* @__PURE__ */ asyncEither(() => {
  const interval = setInterval(() => {
  }, 2 ** 31 - 1);
  return left2(sync(() => clearInterval(interval)));
});
var interruptFiber = (self) => flatMap7(fiberId, (fiberId3) => pipe(self, interruptAsFiber(fiberId3)));
var interruptAsFiber = /* @__PURE__ */ dual(2, (self, fiberId3) => flatMap7(self.interruptAsFork(fiberId3), () => self.await));
var logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var allLogLevels = [logLevelAll, logLevelTrace, logLevelDebug, logLevelInfo, logLevelWarning, logLevelError, logLevelFatal, logLevelNone];
var FiberRefSymbolKey = "effect/FiberRef";
var FiberRefTypeId = /* @__PURE__ */ Symbol.for(FiberRefSymbolKey);
var fiberRefVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var fiberRefGet = (self) => fiberRefModify(self, (a) => [a, a]);
var fiberRefGetWith = /* @__PURE__ */ dual(2, (self, f) => flatMap7(fiberRefGet(self), f));
var fiberRefSet = /* @__PURE__ */ dual(2, (self, value5) => fiberRefModify(self, () => [void 0, value5]));
var fiberRefModify = /* @__PURE__ */ dual(2, (self, f) => withFiberRuntime((state) => {
  const [b, a] = f(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}));
var RequestResolverSymbolKey = "effect/RequestResolver";
var RequestResolverTypeId = /* @__PURE__ */ Symbol.for(RequestResolverSymbolKey);
var requestResolverVariance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
var RequestResolverImpl = class _RequestResolverImpl {
  runAll;
  target;
  [RequestResolverTypeId] = requestResolverVariance;
  constructor(runAll, target) {
    this.runAll = runAll;
    this.target = target;
    this.runAll = runAll;
  }
  [symbol]() {
    return this.target ? hash(this.target) : random(this);
  }
  [symbol2](that) {
    return this.target ? isRequestResolver(that) && equals(this.target, that.target) : this === that;
  }
  identified(...ids4) {
    return new _RequestResolverImpl(this.runAll, fromIterable2(ids4));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isRequestResolver = (u) => hasProperty(u, RequestResolverTypeId);
var fiberRefLocally = /* @__PURE__ */ dual(3, (use, self, value5) => acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value5)), () => use, (oldValue) => fiberRefSet(self, oldValue)));
var fiberRefLocallyWith = /* @__PURE__ */ dual(3, (use, self, f) => fiberRefGetWith(self, (a) => fiberRefLocally(use, self, f(a))));
var fiberRefUnsafeMake = (initial, options3) => fiberRefUnsafeMakePatch(initial, {
  differ: update(),
  fork: options3?.fork ?? identity,
  join: options3?.join
});
var fiberRefUnsafeMakeHashSet = (initial) => {
  const differ3 = hashSet();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ3,
    fork: differ3.empty
  });
};
var fiberRefUnsafeMakeReadonlyArray = (initial) => {
  const differ3 = readonlyArray(update());
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ3,
    fork: differ3.empty
  });
};
var fiberRefUnsafeMakeContext = (initial) => {
  const differ3 = environment();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ3,
    fork: differ3.empty
  });
};
var fiberRefUnsafeMakePatch = (initial, options3) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => options3.differ.diff(oldValue, newValue),
  combine: (first3, second) => options3.differ.combine(first3, second),
  patch: (patch9) => (oldValue) => options3.differ.patch(patch9, oldValue),
  fork: options3.fork,
  join: options3.join ?? ((_, n) => n),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var fiberRefUnsafeMakeRuntimeFlags = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ,
  fork: differ.empty
});
var currentContext = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentContext"), () => fiberRefUnsafeMakeContext(empty3()));
var currentSchedulingPriority = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentSchedulingPriority"), () => fiberRefUnsafeMake(0));
var currentMaxOpsBeforeYield = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMaxOpsBeforeYield"), () => fiberRefUnsafeMake(2048));
var currentLogAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogAnnotation"), () => fiberRefUnsafeMake(empty8()));
var currentLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogLevel"), () => fiberRefUnsafeMake(logLevelInfo));
var currentLogSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogSpan"), () => fiberRefUnsafeMake(empty9()));
var withSchedulingPriority = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentSchedulingPriority, scheduler));
var withMaxOpsBeforeYield = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentMaxOpsBeforeYield, scheduler));
var currentConcurrency = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentConcurrency"), () => fiberRefUnsafeMake("unbounded"));
var currentRequestBatching = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestBatching"), () => fiberRefUnsafeMake(true));
var currentUnhandledErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentUnhandledErrorLogLevel"), () => fiberRefUnsafeMake(some2(logLevelDebug)));
var withUnhandledErrorLogLevel = /* @__PURE__ */ dual(2, (self, level) => fiberRefLocally(self, currentUnhandledErrorLogLevel, level));
var currentMetricLabels = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMetricLabels"), () => fiberRefUnsafeMakeReadonlyArray(empty()));
var metricLabels = /* @__PURE__ */ fiberRefGet(currentMetricLabels);
var currentForkScopeOverride = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentForkScopeOverride"), () => fiberRefUnsafeMake(none2(), {
  fork: () => none2(),
  join: (parent, _) => parent
}));
var currentInterruptedCause = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentInterruptedCause"), () => fiberRefUnsafeMake(empty16, {
  fork: () => empty16,
  join: (parent, _) => parent
}));
var currentTracerTimingEnabled = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerTiming"), () => fiberRefUnsafeMake(true));
var currentTracerSpanAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerSpanAnnotations"), () => fiberRefUnsafeMake(empty8()));
var currentTracerSpanLinks = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerSpanLinks"), () => fiberRefUnsafeMake(empty4()));
var ScopeTypeId = /* @__PURE__ */ Symbol.for("effect/Scope");
var CloseableScopeTypeId = /* @__PURE__ */ Symbol.for("effect/CloseableScope");
var scopeAddFinalizer = (self, finalizer2) => self.addFinalizer(() => asUnit(finalizer2));
var scopeAddFinalizerExit = (self, finalizer2) => self.addFinalizer(finalizer2);
var scopeClose = (self, exit3) => self.close(exit3);
var scopeFork = (self, strategy) => self.fork(strategy);
var releaseMapAdd = /* @__PURE__ */ dual(2, (self, finalizer2) => map9(releaseMapAddIfOpen(self, finalizer2), match({
  onNone: () => () => unit,
  onSome: (key2) => (exit3) => releaseMapRelease(key2, exit3)(self)
})));
var releaseMapRelease = /* @__PURE__ */ dual(3, (self, key2, exit3) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      return unit;
    }
    case "Running": {
      const finalizer2 = self.state.finalizers.get(key2);
      self.state.finalizers.delete(key2);
      if (finalizer2 != null) {
        return self.state.update(finalizer2)(exit3);
      }
      return unit;
    }
  }
}));
var releaseMapAddIfOpen = /* @__PURE__ */ dual(2, (self, finalizer2) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      self.state.nextKey += 1;
      return as(finalizer2(self.state.exit), none2());
    }
    case "Running": {
      const key2 = self.state.nextKey;
      self.state.finalizers.set(key2, finalizer2);
      self.state.nextKey += 1;
      return succeed(some2(key2));
    }
  }
}));
var releaseMapMake = /* @__PURE__ */ sync(() => ({
  state: {
    _tag: "Running",
    nextKey: 0,
    finalizers: /* @__PURE__ */ new Map(),
    update: identity
  }
}));
var YieldableError = /* @__PURE__ */ function() {
  class YieldableError2 extends globalThis.Error {
    commit() {
      return fail2(this);
    }
    toString() {
      return this.message ? `${this.name}: ${this.message}` : this.name;
    }
    toJSON() {
      return {
        ...this
      };
    }
    [NodeInspectSymbol]() {
      const stack = this.stack;
      if (stack) {
        return `${this.toString()}
${stack.split("\n").slice(1).join("\n")}`;
      }
      return this.toString();
    }
  }
  Object.assign(YieldableError2.prototype, StructuralCommitPrototype);
  return YieldableError2;
}();
var makeException = (proto21, tag4) => {
  class Base2 extends YieldableError {
    _tag = tag4;
  }
  Object.assign(Base2.prototype, proto21);
  Base2.prototype.name = tag4;
  return Base2;
};
var RuntimeExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/RuntimeException");
var RuntimeException = /* @__PURE__ */ makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
var InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InterruptedException");
var InterruptedException = /* @__PURE__ */ makeException({
  [InterruptedExceptionTypeId]: InterruptedExceptionTypeId
}, "InterruptedException");
var isInterruptedException = (u) => hasProperty(u, InterruptedExceptionTypeId);
var IllegalArgumentExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/IllegalArgument");
var IllegalArgumentException = /* @__PURE__ */ makeException({
  [IllegalArgumentExceptionTypeId]: IllegalArgumentExceptionTypeId
}, "IllegalArgumentException");
var NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/NoSuchElement");
var NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
var isNoSuchElementException = (u) => hasProperty(u, NoSuchElementExceptionTypeId);
var InvalidPubSubCapacityExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InvalidPubSubCapacityException");
var InvalidPubSubCapacityException = /* @__PURE__ */ makeException({
  [InvalidPubSubCapacityExceptionTypeId]: InvalidPubSubCapacityExceptionTypeId
}, "InvalidPubSubCapacityException");
var UnknownExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/UnknownException");
var UnknownException = /* @__PURE__ */ function() {
  class UnknownException2 extends YieldableError {
    error;
    _tag = "UnknownException";
    constructor(error2, message) {
      super(message ?? (hasProperty(error2, "message") && isString(error2.message) ? error2.message : void 0));
      this.error = error2;
    }
  }
  Object.assign(UnknownException2.prototype, {
    [UnknownExceptionTypeId]: UnknownExceptionTypeId,
    name: "UnknownException"
  });
  return UnknownException2;
}();
var exitIsFailure = (self) => self._tag === "Failure";
var exitIsSuccess = (self) => self._tag === "Success";
var exitAs = /* @__PURE__ */ dual(2, (self, value5) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(value5);
    }
  }
});
var exitAsUnit = (self) => exitAs(self, void 0);
var exitCollectAll = (exits, options3) => exitCollectAllInternal(exits, options3?.parallel ? parallel : sequential);
var exitDie = (defect) => exitFailCause(die(defect));
var exitFail = (error2) => exitFailCause(fail(error2));
var exitFailCause = (cause3) => {
  const effect2 = new EffectPrimitiveFailure(OP_FAILURE);
  effect2.i0 = cause3;
  return effect2;
};
var exitFlatMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return f(self.i0);
    }
  }
});
var exitFlatten = (self) => pipe(self, exitFlatMap(identity));
var exitInterrupt = (fiberId3) => exitFailCause(interrupt(fiberId3));
var exitMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(f(self.i0));
    }
  }
});
var exitMatch = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return onFailure(self.i0);
    }
    case OP_SUCCESS: {
      return onSuccess(self.i0);
    }
  }
});
var exitMatchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return onFailure(self.i0);
    }
    case OP_SUCCESS: {
      return onSuccess(self.i0);
    }
  }
});
var exitSucceed = (value5) => {
  const effect2 = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect2.i0 = value5;
  return effect2;
};
var exitUnit = /* @__PURE__ */ exitSucceed(void 0);
var exitZip = /* @__PURE__ */ dual(2, (self, that) => exitZipWith(self, that, {
  onSuccess: (a, a2) => [a, a2],
  onFailure: sequential
}));
var exitZipRight = /* @__PURE__ */ dual(2, (self, that) => exitZipWith(self, that, {
  onSuccess: (_, a2) => a2,
  onFailure: sequential
}));
var exitZipWith = /* @__PURE__ */ dual(3, (self, that, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitFailCause(self.i0);
        }
        case OP_FAILURE: {
          return exitFailCause(onFailure(self.i0, that.i0));
        }
      }
    }
    case OP_SUCCESS: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitSucceed(onSuccess(self.i0, that.i0));
        }
        case OP_FAILURE: {
          return exitFailCause(that.i0);
        }
      }
    }
  }
});
var exitCollectAllInternal = (exits, combineCauses) => {
  const list4 = fromIterable2(exits);
  if (!isNonEmpty(list4)) {
    return none2();
  }
  return pipe(tailNonEmpty2(list4), reduce(pipe(headNonEmpty2(list4), exitMap(of2)), (accumulator, current) => pipe(accumulator, exitZipWith(current, {
    onSuccess: (list5, value5) => pipe(list5, prepend2(value5)),
    onFailure: combineCauses
  }))), exitMap(reverse3), exitMap((chunk3) => Array.from(chunk3)), some2);
};
var deferredUnsafeMake = (fiberId3) => ({
  [DeferredTypeId]: deferredVariance,
  state: make11(pending([])),
  blockingOn: fiberId3,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var deferredMake = () => flatMap7(fiberId, (id2) => deferredMakeAs(id2));
var deferredMakeAs = (fiberId3) => sync(() => deferredUnsafeMake(fiberId3));
var deferredAwait = (self) => asyncEither((k) => {
  const state = get6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return right2(state.effect);
    }
    case OP_STATE_PENDING: {
      pipe(self.state, set2(pending([k, ...state.joiners])));
      return left2(deferredInterruptJoiner(self, k));
    }
  }
}, self.blockingOn);
var deferredComplete = /* @__PURE__ */ dual(2, (self, effect2) => intoDeferred(effect2, self));
var deferredCompleteWith = /* @__PURE__ */ dual(2, (self, effect2) => sync(() => {
  const state = get6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return false;
    }
    case OP_STATE_PENDING: {
      pipe(self.state, set2(done(effect2)));
      for (let i = 0; i < state.joiners.length; i++) {
        state.joiners[i](effect2);
      }
      return true;
    }
  }
}));
var deferredDone = /* @__PURE__ */ dual(2, (self, exit3) => deferredCompleteWith(self, exit3));
var deferredFailCause = /* @__PURE__ */ dual(2, (self, cause3) => deferredCompleteWith(self, failCause(cause3)));
var deferredInterrupt = (self) => flatMap7(fiberId, (fiberId3) => deferredCompleteWith(self, interruptWith(fiberId3)));
var deferredInterruptWith = /* @__PURE__ */ dual(2, (self, fiberId3) => deferredCompleteWith(self, interruptWith(fiberId3)));
var deferredIsDone = (self) => sync(() => get6(self.state)._tag === OP_STATE_DONE);
var deferredSucceed = /* @__PURE__ */ dual(2, (self, value5) => deferredCompleteWith(self, succeed(value5)));
var deferredUnsafeDone = (self, effect2) => {
  const state = get6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    pipe(self.state, set2(done(effect2)));
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect2);
    }
  }
};
var deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = get6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    pipe(self.state, set2(pending(state.joiners.filter((j) => j !== joiner))));
  }
});
var constContext = /* @__PURE__ */ fiberRefGet(currentContext);
var context = () => constContext;
var contextWithEffect = (f) => flatMap7(context(), f);
var provideContext = /* @__PURE__ */ dual(2, (self, context6) => fiberRefLocally(currentContext, context6)(self));
var provideSomeContext = /* @__PURE__ */ dual(2, (self, context6) => fiberRefLocallyWith(currentContext, (parent) => merge3(parent, context6))(self));
var mapInputContext = /* @__PURE__ */ dual(2, (self, f) => contextWithEffect((context6) => provideContext(self, f(context6))));
var currentSpanFromFiber = (fiber) => {
  const span2 = fiber.getFiberRef(currentContext).unsafeMap.get(spanTag);
  return span2 !== void 0 && span2._tag === "Span" ? some2(span2) : none2();
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Deferred.js
var make19 = deferredMake;
var _await = deferredAwait;
var done2 = deferredDone;
var failCause2 = deferredFailCause;
var interrupt3 = deferredInterrupt;
var isDone = deferredIsDone;
var succeed2 = deferredSucceed;
var unsafeMake3 = deferredUnsafeMake;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Duration.js
var TypeId8 = /* @__PURE__ */ Symbol.for("effect/Duration");
var bigint1e3 = /* @__PURE__ */ BigInt(1e3);
var bigint1e9 = /* @__PURE__ */ BigInt(1e9);
var DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos|micros|millis|seconds|minutes|hours|days|weeks)$/;
var decode = (input) => {
  if (isDuration(input)) {
    return input;
  } else if (isNumber(input)) {
    return millis(input);
  } else if (isBigInt(input)) {
    return nanos(input);
  } else if (Array.isArray(input)) {
    if (input.length === 2 && isNumber(input[0]) && isNumber(input[1])) {
      return nanos(BigInt(input[0]) * bigint1e9 + BigInt(input[1]));
    }
  } else {
    DURATION_REGEX.lastIndex = 0;
    const match17 = DURATION_REGEX.exec(input);
    if (match17) {
      const [_, valueStr, unit8] = match17;
      const value5 = Number(valueStr);
      switch (unit8) {
        case "nanos":
          return nanos(BigInt(valueStr));
        case "micros":
          return micros(BigInt(valueStr));
        case "millis":
          return millis(value5);
        case "seconds":
          return seconds(value5);
        case "minutes":
          return minutes(value5);
        case "hours":
          return hours(value5);
        case "days":
          return days(value5);
        case "weeks":
          return weeks(value5);
      }
    }
  }
  throw new Error("Invalid duration input");
};
var zeroValue = {
  _tag: "Millis",
  millis: 0
};
var infinityValue = {
  _tag: "Infinity"
};
var DurationProto = {
  [TypeId8]: TypeId8,
  [symbol]() {
    return structure(this.value);
  },
  [symbol2](that) {
    return isDuration(that) && equals3(this, that);
  },
  toString() {
    return `Duration(${format3(this)})`;
  },
  toJSON() {
    switch (this.value._tag) {
      case "Millis":
        return {
          _id: "Duration",
          _tag: "Millis",
          millis: this.value.millis
        };
      case "Nanos":
        return {
          _id: "Duration",
          _tag: "Nanos",
          hrtime: toHrTime(this)
        };
      case "Infinity":
        return {
          _id: "Duration",
          _tag: "Infinity"
        };
    }
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make20 = (input) => {
  const duration = Object.create(DurationProto);
  if (isNumber(input)) {
    if (isNaN(input) || input < 0) {
      duration.value = zeroValue;
    } else if (!Number.isFinite(input)) {
      duration.value = infinityValue;
    } else if (!Number.isInteger(input)) {
      duration.value = {
        _tag: "Nanos",
        nanos: BigInt(Math.round(input * 1e6))
      };
    } else {
      duration.value = {
        _tag: "Millis",
        millis: input
      };
    }
  } else if (input < BigInt(0)) {
    duration.value = zeroValue;
  } else {
    duration.value = {
      _tag: "Nanos",
      nanos: input
    };
  }
  return duration;
};
var isDuration = (u) => hasProperty(u, TypeId8);
var zero2 = /* @__PURE__ */ make20(0);
var infinity = /* @__PURE__ */ make20(Infinity);
var nanos = (nanos2) => make20(nanos2);
var micros = (micros2) => make20(micros2 * bigint1e3);
var millis = (millis2) => make20(millis2);
var seconds = (seconds2) => make20(seconds2 * 1e3);
var minutes = (minutes2) => make20(minutes2 * 6e4);
var hours = (hours2) => make20(hours2 * 36e5);
var days = (days2) => make20(days2 * 864e5);
var weeks = (weeks2) => make20(weeks2 * 6048e5);
var toMillis = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return Infinity;
    case "Nanos":
      return Number(_self.value.nanos) / 1e6;
    case "Millis":
      return _self.value.millis;
  }
};
var unsafeToNanos = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      throw new Error("Cannot convert infinite duration to nanos");
    case "Nanos":
      return _self.value.nanos;
    case "Millis":
      return BigInt(Math.round(_self.value.millis * 1e6));
  }
};
var toHrTime = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return [Infinity, 0];
    case "Nanos":
      return [Number(_self.value.nanos / bigint1e9), Number(_self.value.nanos % bigint1e9)];
    case "Millis":
      return [Math.floor(_self.value.millis / 1e3), Math.round(_self.value.millis % 1e3 * 1e6)];
  }
};
var matchWith = /* @__PURE__ */ dual(3, (self, that, options3) => {
  const _self = decode(self);
  const _that = decode(that);
  if (_self.value._tag === "Infinity" || _that.value._tag === "Infinity") {
    return options3.onMillis(toMillis(_self), toMillis(_that));
  } else if (_self.value._tag === "Nanos" || _that.value._tag === "Nanos") {
    const selfNanos = _self.value._tag === "Nanos" ? _self.value.nanos : BigInt(Math.round(_self.value.millis * 1e6));
    const thatNanos = _that.value._tag === "Nanos" ? _that.value.nanos : BigInt(Math.round(_that.value.millis * 1e6));
    return options3.onNanos(selfNanos, thatNanos);
  }
  return options3.onMillis(_self.value.millis, _that.value.millis);
});
var Equivalence2 = (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 === that2,
  onNanos: (self2, that2) => self2 === that2
});
var greaterThanOrEqualTo2 = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 >= that2,
  onNanos: (self2, that2) => self2 >= that2
}));
var equals3 = /* @__PURE__ */ dual(2, (self, that) => Equivalence2(decode(self), decode(that)));
var format3 = (self) => {
  const duration = decode(self);
  const parts = [];
  if (duration.value._tag === "Infinity") {
    return "Infinity";
  }
  const nanos2 = unsafeToNanos(duration);
  if (nanos2 % 1000000n) {
    parts.push(`${nanos2 % 1000000n}ns`);
  }
  const ms = nanos2 / 1000000n;
  if (ms % 1000n !== 0n) {
    parts.push(`${ms % 1000n}ms`);
  }
  const sec = ms / 1000n;
  if (sec % 60n !== 0n) {
    parts.push(`${sec % 60n}s`);
  }
  const min4 = sec / 60n;
  if (min4 % 60n !== 0n) {
    parts.push(`${min4 % 60n}m`);
  }
  const hr = min4 / 60n;
  if (hr % 24n !== 0n) {
    parts.push(`${hr % 24n}h`);
  }
  const days2 = hr / 24n;
  if (days2 !== 0n) {
    parts.push(`${days2}d`);
  }
  return parts.reverse().join(" ");
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Exit.js
var isFailure = exitIsFailure;
var all2 = exitCollectAll;
var die3 = exitDie;
var fail3 = exitFail;
var failCause3 = exitFailCause;
var flatten5 = exitFlatten;
var map10 = exitMap;
var match5 = exitMatch;
var succeed3 = exitSucceed;
var unit2 = exitUnit;
var zip3 = exitZip;
var zipRight2 = exitZipRight;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/MutableHashMap.js
var TypeId9 = /* @__PURE__ */ Symbol.for("effect/MutableHashMap");
var MutableHashMapProto = {
  [TypeId9]: TypeId9,
  [Symbol.iterator]() {
    return new MutableHashMapIterator(this);
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableHashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var MutableHashMapIterator = class _MutableHashMapIterator {
  self;
  referentialIterator;
  bucketIterator;
  constructor(self) {
    this.self = self;
    this.referentialIterator = self.referential[Symbol.iterator]();
  }
  next() {
    if (this.bucketIterator !== void 0) {
      return this.bucketIterator.next();
    }
    const result = this.referentialIterator.next();
    if (result.done) {
      this.bucketIterator = new BucketIterator(this.self.buckets.values());
      return this.next();
    }
    return result;
  }
  [Symbol.iterator]() {
    return new _MutableHashMapIterator(this.self);
  }
};
var BucketIterator = class {
  backing;
  constructor(backing) {
    this.backing = backing;
  }
  currentBucket;
  next() {
    if (this.currentBucket === void 0) {
      const result2 = this.backing.next();
      if (result2.done) {
        return result2;
      }
      this.currentBucket = result2.value[Symbol.iterator]();
    }
    const result = this.currentBucket.next();
    if (result.done) {
      this.currentBucket = void 0;
      return this.next();
    }
    return result;
  }
};
var empty17 = () => {
  const self = Object.create(MutableHashMapProto);
  self.referential = /* @__PURE__ */ new Map();
  self.buckets = /* @__PURE__ */ new Map();
  self.bucketsSize = 0;
  return self;
};
var get8 = /* @__PURE__ */ dual(2, (self, key2) => {
  if (isEqual(key2) === false) {
    return self.referential.has(key2) ? some2(self.referential.get(key2)) : none2();
  }
  const hash2 = key2[symbol]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    return none2();
  }
  return getFromBucket(self, bucket, key2);
});
var getFromBucket = (self, bucket, key2, remove9 = false) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key2[symbol2](bucket[i][0])) {
      const value5 = bucket[i][1];
      if (remove9) {
        bucket.splice(i, 1);
        self.bucketsSize--;
      }
      return some2(value5);
    }
  }
  return none2();
};
var has4 = /* @__PURE__ */ dual(2, (self, key2) => isSome2(get8(self, key2)));
var set4 = /* @__PURE__ */ dual(3, (self, key2, value5) => {
  if (isEqual(key2) === false) {
    self.referential.set(key2, value5);
    return self;
  }
  const hash2 = key2[symbol]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    self.buckets.set(hash2, [[key2, value5]]);
    self.bucketsSize++;
    return self;
  }
  removeFromBucket(self, bucket, key2);
  bucket.push([key2, value5]);
  self.bucketsSize++;
  return self;
});
var removeFromBucket = (self, bucket, key2) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key2[symbol2](bucket[i][0])) {
      bucket.splice(i, 1);
      self.bucketsSize--;
      return;
    }
  }
};
var remove5 = /* @__PURE__ */ dual(2, (self, key2) => {
  if (isEqual(key2) === false) {
    self.referential.delete(key2);
    return self;
  }
  const hash2 = key2[symbol]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    return self;
  }
  removeFromBucket(self, bucket, key2);
  if (bucket.length === 0) {
    self.buckets.delete(hash2);
  }
  return self;
});
var size5 = (self) => {
  return self.referential.size + self.bucketsSize;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/MutableList.js
var TypeId10 = /* @__PURE__ */ Symbol.for("effect/MutableList");
var MutableListProto = {
  [TypeId10]: TypeId10,
  [Symbol.iterator]() {
    let done9 = false;
    let head6 = this.head;
    return {
      next() {
        if (done9) {
          return this.return();
        }
        if (head6 == null) {
          done9 = true;
          return this.return();
        }
        const value5 = head6.value;
        head6 = head6.next;
        return {
          done: done9,
          value: value5
        };
      },
      return(value5) {
        if (!done9) {
          done9 = true;
        }
        return {
          done: true,
          value: value5
        };
      }
    };
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableList",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var LinkedListNode = class {
  value;
  removed = false;
  prev = void 0;
  next = void 0;
  constructor(value5) {
    this.value = value5;
  }
};
var empty18 = () => {
  const list4 = Object.create(MutableListProto);
  list4.head = void 0;
  list4.tail = void 0;
  list4._length = 0;
  return list4;
};
var isEmpty6 = (self) => length(self) === 0;
var length = (self) => self._length;
var append3 = /* @__PURE__ */ dual(2, (self, value5) => {
  const node = new LinkedListNode(value5);
  if (self.head === void 0) {
    self.head = node;
  }
  if (self.tail === void 0) {
    self.tail = node;
  } else {
    self.tail.next = node;
    node.prev = self.tail;
    self.tail = node;
  }
  ;
  self._length += 1;
  return self;
});
var shift = (self) => {
  const head6 = self.head;
  if (head6 !== void 0) {
    remove6(self, head6);
    return head6.value;
  }
  return void 0;
};
var remove6 = (self, node) => {
  if (node.removed) {
    return;
  }
  node.removed = true;
  if (node.prev !== void 0 && node.next !== void 0) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  } else if (node.prev !== void 0) {
    self.tail = node.prev;
    node.prev.next = void 0;
  } else if (node.next !== void 0) {
    self.head = node.next;
    node.next.prev = void 0;
  } else {
    self.tail = void 0;
    self.head = void 0;
  }
  if (self._length > 0) {
    ;
    self._length -= 1;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/MutableQueue.js
var TypeId11 = /* @__PURE__ */ Symbol.for("effect/MutableQueue");
var EmptyMutableQueue = /* @__PURE__ */ Symbol.for("effect/mutable/MutableQueue/Empty");
var MutableQueueProto = {
  [TypeId11]: TypeId11,
  [Symbol.iterator]() {
    return Array.from(this.queue)[Symbol.iterator]();
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableQueue",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make21 = (capacity3) => {
  const queue = Object.create(MutableQueueProto);
  queue.queue = empty18();
  queue.capacity = capacity3;
  return queue;
};
var bounded = (capacity3) => make21(capacity3);
var unbounded = () => make21(void 0);
var length2 = (self) => length(self.queue);
var isEmpty7 = (self) => isEmpty6(self.queue);
var capacity = (self) => self.capacity === void 0 ? Infinity : self.capacity;
var offer = /* @__PURE__ */ dual(2, (self, value5) => {
  const queueLength = length(self.queue);
  if (self.capacity !== void 0 && queueLength === self.capacity) {
    return false;
  }
  append3(value5)(self.queue);
  return true;
});
var offerAll = /* @__PURE__ */ dual(2, (self, values3) => {
  const iterator = values3[Symbol.iterator]();
  let next;
  let remainder = empty4();
  let offering = true;
  while (offering && (next = iterator.next()) && !next.done) {
    offering = offer(next.value)(self);
  }
  while (next != null && !next.done) {
    remainder = prepend2(next.value)(remainder);
    next = iterator.next();
  }
  return reverse3(remainder);
});
var poll = /* @__PURE__ */ dual(2, (self, def) => {
  if (isEmpty6(self.queue)) {
    return def;
  }
  return shift(self.queue);
});
var pollUpTo = /* @__PURE__ */ dual(2, (self, n) => {
  let result = empty4();
  let count3 = 0;
  while (count3 < n) {
    const element = poll(EmptyMutableQueue)(self);
    if (element === EmptyMutableQueue) {
      break;
    }
    result = prepend2(element)(result);
    count3 += 1;
  }
  return reverse3(result);
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/timeout.js
var isBun = typeof process === "undefined" ? false : !!process?.isBun;
var clear = isBun ? (id2) => clearInterval(id2) : (id2) => clearTimeout(id2);
var set5 = isBun ? (fn, ms) => {
  const id2 = setInterval(() => {
    fn();
    clearInterval(id2);
  }, ms);
  return id2;
} : (fn, ms) => setTimeout(fn, ms);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/clock.js
var ClockSymbolKey = "effect/Clock";
var ClockTypeId = /* @__PURE__ */ Symbol.for(ClockSymbolKey);
var clockTag = /* @__PURE__ */ Tag(ClockTypeId);
var MAX_TIMER_MILLIS = 2 ** 31 - 1;
var globalClockScheduler = {
  unsafeSchedule(task, duration) {
    const millis2 = toMillis(duration);
    if (millis2 > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = set5(() => {
      completed = true;
      task();
    }, millis2);
    return () => {
      clear(handle);
      return !completed;
    };
  }
};
var performanceNowNanos = /* @__PURE__ */ function() {
  const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e6;
  }
  const origin = "timeOrigin" in performance && typeof performance.timeOrigin === "number" ? /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(performance.timeOrigin * 1e6)) : /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e6 - /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(/* @__PURE__ */ performance.now() * 1e6));
  return () => origin + BigInt(Math.round(performance.now() * 1e6));
}();
var processOrPerformanceNow = /* @__PURE__ */ function() {
  const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
  if (!processHrtime) {
    return performanceNowNanos;
  }
  const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
  return () => origin + processHrtime.bigint();
}();
var ClockImpl = class {
  [ClockTypeId] = ClockTypeId;
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return processOrPerformanceNow();
  }
  currentTimeMillis = sync(() => this.unsafeCurrentTimeMillis());
  currentTimeNanos = sync(() => this.unsafeCurrentTimeNanos());
  scheduler() {
    return succeed(globalClockScheduler);
  }
  sleep(duration) {
    return asyncEither((cb) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => cb(unit), duration);
      return left2(asUnit(sync(canceler)));
    });
  }
};
var make22 = () => new ClockImpl();

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Number.js
var Order = number3;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/configError.js
var OP_AND = "And";
var OP_OR = "Or";
var OP_INVALID_DATA = "InvalidData";
var OP_MISSING_DATA = "MissingData";
var OP_SOURCE_UNAVAILABLE = "SourceUnavailable";
var OP_UNSUPPORTED = "Unsupported";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/configError.js
var ConfigErrorSymbolKey = "effect/ConfigError";
var ConfigErrorTypeId = /* @__PURE__ */ Symbol.for(ConfigErrorSymbolKey);
var proto2 = {
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
var And = (self, that) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_AND;
  error2.left = self;
  error2.right = that;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  return error2;
};
var Or = (self, that) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_OR;
  error2.left = self;
  error2.right = that;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  return error2;
};
var InvalidData = (path2, message, options3 = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_INVALID_DATA;
  error2.path = path2;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path3 = pipe(this.path, join(options3.pathDelim));
      return `(Invalid data at ${path3}: "${this.message}")`;
    }
  });
  return error2;
};
var MissingData = (path2, message, options3 = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_MISSING_DATA;
  error2.path = path2;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path3 = pipe(this.path, join(options3.pathDelim));
      return `(Missing data at ${path3}: "${this.message}")`;
    }
  });
  return error2;
};
var SourceUnavailable = (path2, message, cause3, options3 = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_SOURCE_UNAVAILABLE;
  error2.path = path2;
  error2.message = message;
  error2.cause = cause3;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path3 = pipe(this.path, join(options3.pathDelim));
      return `(Source unavailable at ${path3}: "${this.message}")`;
    }
  });
  return error2;
};
var Unsupported = (path2, message, options3 = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_UNSUPPORTED;
  error2.path = path2;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path3 = pipe(this.path, join(options3.pathDelim));
      return `(Unsupported operation at ${path3}: "${this.message}")`;
    }
  });
  return error2;
};
var prefixed = /* @__PURE__ */ dual(2, (self, prefix) => {
  switch (self._tag) {
    case OP_AND: {
      return And(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_OR: {
      return Or(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_INVALID_DATA: {
      return InvalidData([...prefix, ...self.path], self.message);
    }
    case OP_MISSING_DATA: {
      return MissingData([...prefix, ...self.path], self.message);
    }
    case OP_SOURCE_UNAVAILABLE: {
      return SourceUnavailable([...prefix, ...self.path], self.message, self.cause);
    }
    case OP_UNSUPPORTED: {
      return Unsupported([...prefix, ...self.path], self.message);
    }
  }
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/configProvider/pathPatch.js
var empty19 = {
  _tag: "Empty"
};
var patch5 = /* @__PURE__ */ dual(2, (path2, patch9) => {
  let input = of3(patch9);
  let output = path2;
  while (isCons(input)) {
    const patch10 = input.head;
    switch (patch10._tag) {
      case "Empty": {
        input = input.tail;
        break;
      }
      case "AndThen": {
        input = cons(patch10.first, cons(patch10.second, input.tail));
        break;
      }
      case "MapName": {
        output = map2(output, patch10.f);
        input = input.tail;
        break;
      }
      case "Nested": {
        output = prepend(output, patch10.name);
        input = input.tail;
        break;
      }
      case "Unnested": {
        const containsName = pipe(head(output), contains(patch10.name));
        if (containsName) {
          output = tailNonEmpty(output);
          input = input.tail;
        } else {
          return left2(MissingData(output, `Expected ${patch10.name} to be in path in ConfigProvider#unnested`));
        }
        break;
      }
    }
  }
  return right2(output);
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/config.js
var OP_CONSTANT = "Constant";
var OP_FAIL2 = "Fail";
var OP_FALLBACK = "Fallback";
var OP_DESCRIBED = "Described";
var OP_LAZY = "Lazy";
var OP_MAP_OR_FAIL = "MapOrFail";
var OP_NESTED = "Nested";
var OP_PRIMITIVE = "Primitive";
var OP_SEQUENCE = "Sequence";
var OP_HASHMAP = "HashMap";
var OP_ZIP_WITH = "ZipWith";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/configProvider.js
var concat = (l, r) => [...l, ...r];
var ConfigProviderSymbolKey = "effect/ConfigProvider";
var ConfigProviderTypeId = /* @__PURE__ */ Symbol.for(ConfigProviderSymbolKey);
var configProviderTag = /* @__PURE__ */ Tag(ConfigProviderTypeId);
var FlatConfigProviderSymbolKey = "effect/ConfigProviderFlat";
var FlatConfigProviderTypeId = /* @__PURE__ */ Symbol.for(FlatConfigProviderSymbolKey);
var make23 = (options3) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options3
});
var makeFlat = (options3) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch: options3.patch,
  load: (path2, config, split2 = true) => options3.load(path2, config, split2),
  enumerateChildren: options3.enumerateChildren
});
var fromFlat = (flat) => make23({
  load: (config) => flatMap7(fromFlatLoop(flat, empty(), config, false), (chunk3) => match(head(chunk3), {
    onNone: () => fail2(MissingData(empty(), `Expected a single value having structure: ${config}`)),
    onSome: succeed
  })),
  flattened: flat
});
var fromEnv = (config = {}) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, config);
  const makePathString = (path2) => pipe(path2, join(pathDelim));
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load = (path2, primitive, split2 = true) => {
    const pathString = makePathString(path2);
    const current = getEnv();
    const valueOpt = pathString in current ? some2(current[pathString]) : none2();
    return pipe(valueOpt, mapError(() => MissingData(path2, `Expected ${pathString} to exist in the process context`)), flatMap7((value5) => parsePrimitive(value5, path2, primitive, seqDelim, split2)));
  };
  const enumerateChildren = (path2) => sync(() => {
    const current = getEnv();
    const keys5 = Object.keys(current);
    const keyPaths = Array.from(keys5).map((value5) => unmakePathString(value5.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path2.length; i++) {
        const pathComponent = pipe(path2, unsafeGet(i));
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path2.length, path2.length + 1));
    return fromIterable5(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load,
    enumerateChildren,
    patch: empty19
  }));
};
var extend = (leftDef, rightDef, left3, right3) => {
  const leftPad = unfold(left3.length, (index2) => index2 >= right3.length ? none2() : some2([leftDef(index2), index2 + 1]));
  const rightPad = unfold(right3.length, (index2) => index2 >= left3.length ? none2() : some2([rightDef(index2), index2 + 1]));
  const leftExtension = concat(left3, leftPad);
  const rightExtension = concat(right3, rightPad);
  return [leftExtension, rightExtension];
};
var appendConfigPath = (path2, config) => {
  let op = config;
  if (op._tag === "Nested") {
    const out = path2.slice();
    while (op._tag === "Nested") {
      out.push(op.name);
      op = op.config;
    }
    return out;
  }
  return path2;
};
var fromFlatLoop = (flat, prefix, config, split2) => {
  const op = config;
  switch (op._tag) {
    case OP_CONSTANT: {
      return succeed(of(op.value));
    }
    case OP_DESCRIBED: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config, split2));
    }
    case OP_FAIL2: {
      return fail2(MissingData(prefix, op.message));
    }
    case OP_FALLBACK: {
      return pipe(suspend(() => fromFlatLoop(flat, prefix, op.first, split2)), catchAll((error1) => {
        if (op.condition(error1)) {
          return pipe(fromFlatLoop(flat, prefix, op.second, split2), catchAll((error2) => fail2(Or(error1, error2))));
        }
        return fail2(error1);
      }));
    }
    case OP_LAZY: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config(), split2));
    }
    case OP_MAP_OR_FAIL: {
      return suspend(() => pipe(fromFlatLoop(flat, prefix, op.original, split2), flatMap7(forEachSequential((a) => pipe(op.mapOrFail(a), mapError(prefixed(appendConfigPath(prefix, op.original))))))));
    }
    case OP_NESTED: {
      return suspend(() => fromFlatLoop(flat, concat(prefix, of(op.name)), op.config, split2));
    }
    case OP_PRIMITIVE: {
      return pipe(patch5(prefix, flat.patch), flatMap7((prefix2) => pipe(flat.load(prefix2, op, split2), flatMap7((values3) => {
        if (values3.length === 0) {
          const name = pipe(last(prefix2), getOrElse(() => "<n/a>"));
          return fail2(MissingData([], `Expected ${op.description} with name ${name}`));
        }
        return succeed(values3);
      }))));
    }
    case OP_SEQUENCE: {
      return pipe(patch5(prefix, flat.patch), flatMap7((patchedPrefix) => pipe(flat.enumerateChildren(patchedPrefix), flatMap7(indicesFrom), flatMap7((indices) => {
        if (indices.length === 0) {
          return suspend(() => map9(fromFlatLoop(flat, patchedPrefix, op.config, true), of));
        }
        return pipe(forEachSequential(indices, (index2) => fromFlatLoop(flat, append(prefix, `[${index2}]`), op.config, true)), map9((chunkChunk) => {
          const flattened2 = flatten(chunkChunk);
          if (flattened2.length === 0) {
            return of(empty());
          }
          return of(flattened2);
        }));
      }))));
    }
    case OP_HASHMAP: {
      return suspend(() => pipe(patch5(prefix, flat.patch), flatMap7((prefix2) => pipe(flat.enumerateChildren(prefix2), flatMap7((keys5) => {
        return pipe(keys5, forEachSequential((key2) => fromFlatLoop(flat, concat(prefix2, of(key2)), op.valueConfig, split2)), map9((values3) => {
          if (values3.length === 0) {
            return of(empty8());
          }
          const matrix = values3.map((x) => Array.from(x));
          return pipe(transpose(matrix), map2((values4) => fromIterable6(zip(fromIterable(keys5), values4))));
        }));
      })))));
    }
    case OP_ZIP_WITH: {
      return suspend(() => pipe(fromFlatLoop(flat, prefix, op.left, split2), either2, flatMap7((left3) => pipe(fromFlatLoop(flat, prefix, op.right, split2), either2, flatMap7((right3) => {
        if (isLeft2(left3) && isLeft2(right3)) {
          return fail2(And(left3.left, right3.left));
        }
        if (isLeft2(left3) && isRight2(right3)) {
          return fail2(left3.left);
        }
        if (isRight2(left3) && isLeft2(right3)) {
          return fail2(right3.left);
        }
        if (isRight2(left3) && isRight2(right3)) {
          const path2 = pipe(prefix, join("."));
          const fail15 = fromFlatLoopFail(prefix, path2);
          const [lefts, rights] = extend(fail15, fail15, pipe(left3.right, map2(right2)), pipe(right3.right, map2(right2)));
          return pipe(lefts, zip(rights), forEachSequential(([left4, right4]) => pipe(zip2(left4, right4), map9(([left5, right5]) => op.zip(left5, right5)))));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
      })))));
    }
  }
};
var fromFlatLoopFail = (prefix, path2) => (index2) => left2(MissingData(prefix, `The element at index ${index2} in a sequence at path "${path2}" was missing`));
var splitPathString = (text10, delim) => {
  const split2 = text10.split(new RegExp(`\\s*${escapeRegex(delim)}\\s*`));
  return split2;
};
var parsePrimitive = (text10, path2, primitive, delimiter, split2) => {
  if (!split2) {
    return pipe(primitive.parse(text10), mapBoth({
      onFailure: prefixed(path2),
      onSuccess: of
    }));
  }
  return pipe(splitPathString(text10, delimiter), forEachSequential((char5) => primitive.parse(char5.trim())), mapError(prefixed(path2)));
};
var transpose = (array6) => {
  return Object.keys(array6[0]).map((column3) => array6.map((row) => row[column3]));
};
var escapeRegex = (string5) => {
  return string5.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};
var indicesFrom = (quotedIndices) => pipe(forEachSequential(quotedIndices, parseQuotedIndex), mapBoth({
  onFailure: () => empty(),
  onSuccess: sort(Order)
}), either2, map9(merge));
var QUOTED_INDEX_REGEX = /^(\[(\d+)\])$/;
var parseQuotedIndex = (str) => {
  const match17 = str.match(QUOTED_INDEX_REGEX);
  if (match17 !== null) {
    const matchedIndex = match17[2];
    return pipe(matchedIndex !== void 0 && matchedIndex.length > 0 ? some2(matchedIndex) : none2(), flatMap(parseInteger));
  }
  return none2();
};
var parseInteger = (str) => {
  const parsedIndex = Number.parseInt(str);
  return Number.isNaN(parsedIndex) ? none2() : some2(parsedIndex);
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/defaultServices/console.js
var TypeId12 = /* @__PURE__ */ Symbol.for("effect/Console");
var consoleTag = /* @__PURE__ */ Tag(TypeId12);
var defaultConsole = {
  [TypeId12]: TypeId12,
  assert(condition, ...args) {
    return sync(() => {
      console.assert(condition, ...args);
    });
  },
  clear: /* @__PURE__ */ sync(() => {
    console.clear();
  }),
  count(label) {
    return sync(() => {
      console.count(label);
    });
  },
  countReset(label) {
    return sync(() => {
      console.countReset(label);
    });
  },
  debug(...args) {
    return sync(() => {
      console.debug(...args);
    });
  },
  dir(item, options3) {
    return sync(() => {
      console.dir(item, options3);
    });
  },
  dirxml(...args) {
    return sync(() => {
      console.dirxml(...args);
    });
  },
  error(...args) {
    return sync(() => {
      console.error(...args);
    });
  },
  group(options3) {
    return options3?.collapsed ? sync(() => console.groupCollapsed(options3?.label)) : sync(() => console.group(options3?.label));
  },
  groupEnd: /* @__PURE__ */ sync(() => {
    console.groupEnd();
  }),
  info(...args) {
    return sync(() => {
      console.info(...args);
    });
  },
  log(...args) {
    return sync(() => {
      console.log(...args);
    });
  },
  table(tabularData, properties) {
    return sync(() => {
      console.table(tabularData, properties);
    });
  },
  time(label) {
    return sync(() => console.time(label));
  },
  timeEnd(label) {
    return sync(() => console.timeEnd(label));
  },
  timeLog(label, ...args) {
    return sync(() => {
      console.timeLog(label, ...args);
    });
  },
  trace(...args) {
    return sync(() => {
      console.trace(...args);
    });
  },
  warn(...args) {
    return sync(() => {
      console.warn(...args);
    });
  },
  unsafe: console
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/random.js
var RandomSymbolKey = "effect/Random";
var RandomTypeId = /* @__PURE__ */ Symbol.for(RandomSymbolKey);
var randomTag = /* @__PURE__ */ Tag(RandomTypeId);
var RandomImpl = class {
  seed;
  [RandomTypeId] = RandomTypeId;
  PRNG;
  constructor(seed) {
    this.seed = seed;
    this.PRNG = new PCGRandom(seed);
  }
  get next() {
    return sync(() => this.PRNG.number());
  }
  get nextBoolean() {
    return map9(this.next, (n) => n > 0.5);
  }
  get nextInt() {
    return sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(min4, max6) {
    return map9(this.next, (n) => (max6 - min4) * n + min4);
  }
  nextIntBetween(min4, max6) {
    return sync(() => this.PRNG.integer(max6 - min4) + min4);
  }
  shuffle(elements) {
    return shuffleWith(elements, (n) => this.nextIntBetween(0, n));
  }
};
var shuffleWith = (elements, nextIntBounded) => {
  return suspend(() => pipe(sync(() => Array.from(elements)), flatMap7((buffer2) => {
    const numbers = [];
    for (let i = buffer2.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return pipe(numbers, forEachSequentialDiscard((n) => pipe(nextIntBounded(n), map9((k) => swap(buffer2, n - 1, k)))), as(fromIterable2(buffer2)));
  })));
};
var swap = (buffer2, index1, index2) => {
  const tmp = buffer2[index1];
  buffer2[index1] = buffer2[index2];
  buffer2[index2] = tmp;
  return buffer2;
};
var make24 = (seed) => new RandomImpl(seed);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/defaultServices.js
var liveServices = /* @__PURE__ */ pipe(/* @__PURE__ */ empty3(), /* @__PURE__ */ add2(clockTag, /* @__PURE__ */ make22()), /* @__PURE__ */ add2(consoleTag, defaultConsole), /* @__PURE__ */ add2(randomTag, /* @__PURE__ */ make24(/* @__PURE__ */ Math.random() * 4294967296 >>> 0)), /* @__PURE__ */ add2(configProviderTag, /* @__PURE__ */ fromEnv()), /* @__PURE__ */ add2(tracerTag, nativeTracer));
var currentServices = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/DefaultServices/currentServices"), () => fiberRefUnsafeMakeContext(liveServices));
var sleep = (duration) => {
  const decodedDuration = decode(duration);
  return clockWith((clock3) => clock3.sleep(decodedDuration));
};
var clockWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, clockTag)));
var currentTimeMillis = /* @__PURE__ */ clockWith((clock3) => clock3.currentTimeMillis);
var currentTimeNanos = /* @__PURE__ */ clockWith((clock3) => clock3.currentTimeNanos);
var withClock = /* @__PURE__ */ dual(2, (effect2, value5) => fiberRefLocallyWith(currentServices, add2(clockTag, value5))(effect2));
var withConfigProvider = /* @__PURE__ */ dual(2, (effect2, value5) => fiberRefLocallyWith(currentServices, add2(configProviderTag, value5))(effect2));
var configProviderWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, configProviderTag)));
var randomWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, randomTag)));
var tracerWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, tracerTag)));
var withTracer = /* @__PURE__ */ dual(2, (effect2, value5) => fiberRefLocallyWith(currentServices, add2(tracerTag, value5))(effect2));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Clock.js
var sleep2 = sleep;
var currentTimeMillis2 = currentTimeMillis;
var currentTimeNanos2 = currentTimeNanos;
var clockWith2 = clockWith;
var Clock = clockTag;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberRefs.js
function unsafeMake4(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
function empty20() {
  return unsafeMake4(/* @__PURE__ */ new Map());
}
var FiberRefsSym = /* @__PURE__ */ Symbol.for("effect/FiberRefs");
var FiberRefsImpl = class {
  locals;
  [FiberRefsSym] = FiberRefsSym;
  constructor(locals) {
    this.locals = locals;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = void 0;
  while (ret === void 0) {
    if (isNonEmptyReadonlyArray(parentStack) && isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = headNonEmpty(parentStack)[0];
      const parentAncestors = tailNonEmpty(parentStack);
      const childFiberId = headNonEmpty(childStack)[0];
      const childRefValue = headNonEmpty(childStack)[1];
      const childAncestors = tailNonEmpty(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
var joinAs = /* @__PURE__ */ dual(3, (self, fiberId3, that) => {
  const parentFiberRefs = new Map(self.locals);
  that.locals.forEach((childStack, fiberRef) => {
    const childValue = childStack[0][1];
    if (!childStack[0][0][symbol2](fiberId3)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (equals(childValue, fiberRef.initial)) {
          return;
        }
        parentFiberRefs.set(fiberRef, [[fiberId3, fiberRef.join(fiberRef.initial, childValue)]]);
        return;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch9 = fiberRef.diff(ancestor, childValue);
        const oldValue = parentStack[0][1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch9)(oldValue));
        if (!equals(oldValue, newValue)) {
          let newStack;
          const parentFiberId = parentStack[0][0];
          if (parentFiberId[symbol2](fiberId3)) {
            newStack = [[parentFiberId, newValue], ...parentStack.slice(1)];
          } else {
            newStack = [[fiberId3, newValue], ...parentStack];
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  });
  return new FiberRefsImpl(parentFiberRefs);
});
var forkAs = /* @__PURE__ */ dual(2, (self, childId) => {
  const map27 = /* @__PURE__ */ new Map();
  unsafeForkAs(self, map27, childId);
  return new FiberRefsImpl(map27);
});
var unsafeForkAs = (self, map27, fiberId3) => {
  self.locals.forEach((stack, fiberRef) => {
    const oldValue = stack[0][1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (equals(oldValue, newValue)) {
      map27.set(fiberRef, stack);
    } else {
      map27.set(fiberRef, [[fiberId3, newValue], ...stack]);
    }
  });
};
var fiberRefs = (self) => fromIterable5(self.locals.keys());
var setAll = (self) => forEachSequentialDiscard(fiberRefs(self), (fiberRef) => fiberRefSet(fiberRef, getOrDefault(self, fiberRef)));
var delete_ = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
var get9 = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return none2();
  }
  return some2(headNonEmpty(self.locals.get(fiberRef))[1]);
});
var getOrDefault = /* @__PURE__ */ dual(2, (self, fiberRef) => pipe(get9(self, fiberRef), getOrElse(() => fiberRef.initial)));
var updateAs = /* @__PURE__ */ dual(2, (self, {
  fiberId: fiberId3,
  fiberRef,
  value: value5
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(/* @__PURE__ */ new Map([[fiberRef, [[fiberId3, value5]]]]));
  }
  const locals = new Map(self.locals);
  unsafeUpdateAs(locals, fiberId3, fiberRef, value5);
  return new FiberRefsImpl(locals);
});
var unsafeUpdateAs = (locals, fiberId3, fiberRef, value5) => {
  const oldStack = locals.get(fiberRef) ?? [];
  let newStack;
  if (isNonEmptyReadonlyArray(oldStack)) {
    const [currentId, currentValue] = headNonEmpty(oldStack);
    if (currentId[symbol2](fiberId3)) {
      if (equals(currentValue, value5)) {
        return;
      } else {
        newStack = [[fiberId3, value5], ...oldStack.slice(1)];
      }
    } else {
      newStack = [[fiberId3, value5], ...oldStack];
    }
  } else {
    newStack = [[fiberId3, value5]];
  }
  locals.set(fiberRef, newStack);
};
var updateManyAs = /* @__PURE__ */ dual(2, (self, {
  entries: entries2,
  forkAs: forkAs2
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(new Map(entries2));
  }
  const locals = new Map(self.locals);
  if (forkAs2 !== void 0) {
    unsafeForkAs(self, locals, forkAs2);
  }
  entries2.forEach(([fiberRef, values3]) => {
    if (values3.length === 1) {
      unsafeUpdateAs(locals, values3[0][0], fiberRef, values3[0][1]);
    } else {
      values3.forEach(([fiberId3, value5]) => {
        unsafeUpdateAs(locals, fiberId3, fiberRef, value5);
      });
    }
  });
  return new FiberRefsImpl(locals);
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/FiberRefs.js
var get10 = get9;
var getOrDefault2 = getOrDefault;
var joinAs2 = joinAs;
var setAll2 = setAll;
var updateManyAs2 = updateManyAs;
var empty21 = empty20;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/LogLevel.js
var LogLevel_exports = {};
__export(LogLevel_exports, {
  All: () => All,
  Debug: () => Debug,
  Error: () => Error2,
  Fatal: () => Fatal,
  Info: () => Info,
  None: () => None3,
  Order: () => Order2,
  Trace: () => Trace,
  Warning: () => Warning,
  allLevels: () => allLevels,
  fromLiteral: () => fromLiteral,
  greaterThan: () => greaterThan2,
  greaterThanEqual: () => greaterThanEqual,
  lessThan: () => lessThan2,
  lessThanEqual: () => lessThanEqual,
  locally: () => locally
});
var All = logLevelAll;
var Fatal = logLevelFatal;
var Error2 = logLevelError;
var Warning = logLevelWarning;
var Info = logLevelInfo;
var Debug = logLevelDebug;
var Trace = logLevelTrace;
var None3 = logLevelNone;
var allLevels = allLogLevels;
var locally = /* @__PURE__ */ dual(2, (use, self) => fiberRefLocally(use, currentLogLevel, self));
var Order2 = /* @__PURE__ */ pipe(Order, /* @__PURE__ */ mapInput2((level) => level.ordinal));
var lessThan2 = /* @__PURE__ */ lessThan(Order2);
var lessThanEqual = /* @__PURE__ */ lessThanOrEqualTo(Order2);
var greaterThan2 = /* @__PURE__ */ greaterThan(Order2);
var greaterThanEqual = /* @__PURE__ */ greaterThanOrEqualTo(Order2);
var fromLiteral = (literal2) => {
  switch (literal2) {
    case "All":
      return All;
    case "Debug":
      return Debug;
    case "Error":
      return Error2;
    case "Fatal":
      return Fatal;
    case "Info":
      return Info;
    case "Trace":
      return Trace;
    case "None":
      return None3;
    case "Warning":
      return Warning;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/logSpan.js
var make25 = (label, startTime) => ({
  label,
  startTime
});
var render = (now) => {
  return (self) => {
    const label = self.label.replace(/[\s="]/g, "_");
    return `${label}=${now - self.startTime}ms`;
  };
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/LogSpan.js
var make26 = make25;
var render2 = render;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/ref.js
var RefTypeId = /* @__PURE__ */ Symbol.for("effect/Ref");
var refVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var RefImpl = class {
  ref;
  [RefTypeId] = refVariance;
  constructor(ref) {
    this.ref = ref;
  }
  modify(f) {
    return sync(() => {
      const current = get6(this.ref);
      const [b, a] = f(current);
      if (current !== a) {
        set2(a)(this.ref);
      }
      return b;
    });
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var unsafeMake5 = (value5) => new RefImpl(make11(value5));
var make27 = (value5) => sync(() => unsafeMake5(value5));
var get11 = (self) => self.modify((a) => [a, a]);
var set6 = /* @__PURE__ */ dual(2, (self, value5) => self.modify(() => [void 0, value5]));
var getAndSet = /* @__PURE__ */ dual(2, (self, value5) => self.modify((a) => [a, value5]));
var modify2 = /* @__PURE__ */ dual(2, (self, f) => self.modify(f));
var update2 = /* @__PURE__ */ dual(2, (self, f) => self.modify((a) => [void 0, f(a)]));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Ref.js
var make28 = make27;
var get12 = get11;
var getAndSet2 = getAndSet;
var modify3 = modify2;
var set7 = set6;
var update3 = update2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Tracer.js
var tracerWith2 = tracerWith;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberRefs/patch.js
var OP_EMPTY2 = "Empty";
var OP_ADD = "Add";
var OP_REMOVE = "Remove";
var OP_UPDATE = "Update";
var OP_AND_THEN = "AndThen";
var empty22 = {
  _tag: OP_EMPTY2
};
var diff5 = (oldValue, newValue) => {
  const missingLocals = new Map(oldValue.locals);
  let patch9 = empty22;
  for (const [fiberRef, pairs] of newValue.locals.entries()) {
    const newValue2 = headNonEmpty(pairs)[1];
    const old = missingLocals.get(fiberRef);
    if (old !== void 0) {
      const oldValue2 = headNonEmpty(old)[1];
      if (!equals(oldValue2, newValue2)) {
        patch9 = combine7({
          _tag: OP_UPDATE,
          fiberRef,
          patch: fiberRef.diff(oldValue2, newValue2)
        })(patch9);
      }
    } else {
      patch9 = combine7({
        _tag: OP_ADD,
        fiberRef,
        value: newValue2
      })(patch9);
    }
    missingLocals.delete(fiberRef);
  }
  for (const [fiberRef] of missingLocals.entries()) {
    patch9 = combine7({
      _tag: OP_REMOVE,
      fiberRef
    })(patch9);
  }
  return patch9;
};
var combine7 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: OP_AND_THEN,
  first: self,
  second: that
}));
var patch6 = /* @__PURE__ */ dual(3, (self, fiberId3, oldValue) => {
  let fiberRefs3 = oldValue;
  let patches = of(self);
  while (isNonEmptyReadonlyArray(patches)) {
    const head6 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head6._tag) {
      case OP_EMPTY2: {
        patches = tail;
        break;
      }
      case OP_ADD: {
        fiberRefs3 = updateAs(fiberRefs3, {
          fiberId: fiberId3,
          fiberRef: head6.fiberRef,
          value: head6.value
        });
        patches = tail;
        break;
      }
      case OP_REMOVE: {
        fiberRefs3 = delete_(fiberRefs3, head6.fiberRef);
        patches = tail;
        break;
      }
      case OP_UPDATE: {
        const value5 = getOrDefault(fiberRefs3, head6.fiberRef);
        fiberRefs3 = updateAs(fiberRefs3, {
          fiberId: fiberId3,
          fiberRef: head6.fiberRef,
          value: head6.fiberRef.patch(head6.patch)(value5)
        });
        patches = tail;
        break;
      }
      case OP_AND_THEN: {
        patches = prepend(head6.first)(prepend(head6.second)(tail));
        break;
      }
    }
  }
  return fiberRefs3;
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/label.js
var MetricLabelSymbolKey = "effect/MetricLabel";
var MetricLabelTypeId = /* @__PURE__ */ Symbol.for(MetricLabelSymbolKey);
var MetricLabelImpl = class {
  key;
  value;
  [MetricLabelTypeId] = MetricLabelTypeId;
  _hash;
  constructor(key2, value5) {
    this.key = key2;
    this.value = value5;
    this._hash = string(MetricLabelSymbolKey + this.key + this.value);
  }
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isMetricLabel(that) && this.key === that.key && this.value === that.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make29 = (key2, value5) => {
  return new MetricLabelImpl(key2, value5);
};
var isMetricLabel = (u) => hasProperty(u, MetricLabelTypeId);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/singleShotGen.js
var SingleShotGen2 = class _SingleShotGen {
  self;
  called = false;
  constructor(self) {
    this.self = self;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new _SingleShotGen(this.self);
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/core-effect.js
var annotateLogs = /* @__PURE__ */ dual((args) => isEffect(args[0]), function() {
  const args = arguments;
  return fiberRefLocallyWith(args[0], currentLogAnnotations, typeof args[1] === "string" ? set3(args[1], args[2]) : (annotations2) => Object.entries(args[1]).reduce((acc, [key2, value5]) => set3(acc, key2, value5), annotations2));
});
var asSome = (self) => map9(self, some2);
var asSomeError = (self) => mapError(self, some2);
var asyncOption = (register, blockingOn = none4) => asyncEither((cb) => {
  const option4 = register(cb);
  switch (option4._tag) {
    case "None": {
      return left2(unit);
    }
    case "Some": {
      return right2(option4.value);
    }
  }
}, blockingOn);
var try_ = (arg) => {
  let evaluate;
  let onFailure = void 0;
  if (typeof arg === "function") {
    evaluate = arg;
  } else {
    evaluate = arg.try;
    onFailure = arg.catch;
  }
  return sync(() => {
    try {
      return evaluate();
    } catch (error2) {
      throw makeEffectError(fail(onFailure ? onFailure(error2) : new UnknownException(error2)));
    }
  });
};
var _catch = /* @__PURE__ */ dual(
  // @ts-expect-error
  3,
  (self, tag4, options3) => catchAll(self, (e) => {
    if (hasProperty(e, tag4) && e[tag4] === options3.failure) {
      return options3.onFailure(e);
    }
    return fail2(e);
  })
);
var catchAllDefect = /* @__PURE__ */ dual(2, (self, f) => catchAllCause(self, unified((cause3) => {
  const option4 = find(cause3, (_) => isDieType(_) ? some2(_) : none2());
  switch (option4._tag) {
    case "None": {
      return failCause(cause3);
    }
    case "Some": {
      return f(option4.value.defect);
    }
  }
})));
var catchSomeCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const option4 = f(cause3);
    switch (option4._tag) {
      case "None": {
        return failCause(cause3);
      }
      case "Some": {
        return option4.value;
      }
    }
  },
  onSuccess: succeed
}));
var catchSomeDefect = /* @__PURE__ */ dual(2, (self, pf) => catchAllCause(self, unified((cause3) => {
  const option4 = find(cause3, (_) => isDieType(_) ? some2(_) : none2());
  switch (option4._tag) {
    case "None": {
      return failCause(cause3);
    }
    case "Some": {
      const optionEffect = pf(option4.value.defect);
      return optionEffect._tag === "Some" ? optionEffect.value : failCause(cause3);
    }
  }
})));
var catchTag = /* @__PURE__ */ dual(3, (self, k, f) => catchIf(self, isTagged(k), f));
var catchTags = /* @__PURE__ */ dual(2, (self, cases) => {
  let keys5;
  return catchIf(self, (e) => {
    keys5 ??= Object.keys(cases);
    return hasProperty(e, "_tag") && isString(e["_tag"]) && keys5.includes(e["_tag"]);
  }, (e) => cases[e["_tag"]](e));
});
var cause = (self) => matchCause(self, {
  onFailure: identity,
  onSuccess: () => empty16
});
var clockWith3 = clockWith2;
var clock = /* @__PURE__ */ clockWith3(succeed);
var delay = /* @__PURE__ */ dual(2, (self, duration) => zipRight(sleep2(duration), self));
var descriptorWith = (f) => withFiberRuntime((state, status2) => f({
  id: state.id(),
  status: status2,
  interruptors: interruptors(state.getFiberRef(currentInterruptedCause))
}));
var allowInterrupt = /* @__PURE__ */ descriptorWith((descriptor3) => size3(descriptor3.interruptors) > 0 ? interrupt2 : unit);
var descriptor = /* @__PURE__ */ descriptorWith(succeed);
var diffFiberRefs = (self) => summarized(self, fiberRefs2, diff5);
var diffFiberRefsAndRuntimeFlags = (self) => summarized(self, zip2(fiberRefs2, runtimeFlags), ([refs, flags], [refsNew, flagsNew]) => [diff5(refs, refsNew), diff4(flags, flagsNew)]);
var Do = /* @__PURE__ */ succeed({});
var bind = /* @__PURE__ */ dual(3, (self, tag4, f) => flatMap7(self, (k) => map9(f(k), (a) => ({
  ...k,
  [tag4]: a
}))));
var bindTo = /* @__PURE__ */ dual(2, (self, tag4) => map9(self, (a) => ({
  [tag4]: a
})));
var bindValue = /* @__PURE__ */ dual(3, (self, tag4, f) => map9(self, (k) => ({
  ...k,
  [tag4]: f(k)
})));
var dropUntil = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping3 = succeed(false);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    dropping3 = flatMap7(dropping3, (bool) => {
      if (bool) {
        builder.push(a);
        return succeed(true);
      }
      return predicate(a, index2);
    });
  }
  return map9(dropping3, () => builder);
}));
var dropWhile = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping3 = succeed(true);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    dropping3 = flatMap7(dropping3, (d) => map9(d ? predicate(a, index2) : succeed(false), (b) => {
      if (!b) {
        builder.push(a);
      }
      return b;
    }));
  }
  return map9(dropping3, () => builder);
}));
var contextWith = (f) => map9(context(), f);
var eventually = (self) => orElse2(self, () => flatMap7(yieldNow(), () => eventually(self)));
var filterOrDie = /* @__PURE__ */ dual(3, (self, filter11, orDieWith5) => filterOrElse(self, filter11, (a) => dieSync(() => orDieWith5(a))));
var filterOrDieMessage = /* @__PURE__ */ dual(3, (self, filter11, message) => filterOrElse(self, filter11, () => dieMessage(message)));
var filterOrElse = /* @__PURE__ */ dual(3, (self, filter11, orElse13) => flatMap7(self, (a) => filter11(a) ? succeed(a) : orElse13(a)));
var filterOrFail = /* @__PURE__ */ dual(3, (self, filter11, orFailWith) => filterOrElse(self, filter11, (a) => failSync(() => orFailWith(a))));
var findFirst3 = /* @__PURE__ */ dual(2, (elements, f) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const next = iterator.next();
  if (!next.done) {
    return findLoop(iterator, 0, f, next.value);
  }
  return succeed(none2());
}));
var findLoop = (iterator, index2, f, value5) => flatMap7(f(value5, index2), (result) => {
  if (result) {
    return succeed(some2(value5));
  }
  const next = iterator.next();
  if (!next.done) {
    return findLoop(iterator, index2 + 1, f, next.value);
  }
  return succeed(none2());
});
var firstSuccessOf = (effects) => suspend(() => {
  const list4 = fromIterable2(effects);
  if (!isNonEmpty(list4)) {
    return dieSync(() => new IllegalArgumentException(`Received an empty collection of effects`));
  }
  return pipe(tailNonEmpty2(list4), reduce(headNonEmpty2(list4), (left3, right3) => orElse2(left3, () => right3)));
});
var flipWith = /* @__PURE__ */ dual(2, (self, f) => flip(f(flip(self))));
var match6 = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchEffect(self, {
  onFailure: (e) => succeed(onFailure(e)),
  onSuccess: (a) => succeed(onSuccess(a))
}));
var every3 = /* @__PURE__ */ dual(2, (elements, f) => suspend(() => forAllLoop(elements[Symbol.iterator](), 0, f)));
var forAllLoop = (iterator, index2, f) => {
  const next = iterator.next();
  return next.done ? succeed(true) : flatMap7(f(next.value, index2), (b) => b ? forAllLoop(iterator, index2 + 1, f) : succeed(b));
};
var forever = (self) => {
  const loop3 = flatMap7(flatMap7(self, () => yieldNow()), () => loop3);
  return loop3;
};
var EffectGen = class {
  value;
  constructor(value5) {
    this.value = value5;
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(this);
  }
};
var adapter = function() {
  let x = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    x = arguments[i](x);
  }
  return new EffectGen(x);
};
var gen = function() {
  let f;
  if (arguments.length === 1) {
    f = arguments[0];
  } else {
    f = arguments[1].bind(arguments[0]);
  }
  internalize(f);
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();
    const run4 = (state2) => state2.done ? succeed(state2.value) : pipe(state2.value.value, flatMap7((val) => run4(iterator.next(val))));
    return run4(state);
  });
};
var fiberRefs2 = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.getFiberRefs()));
var head3 = (self) => flatMap7(self, (as7) => {
  const iterator = as7[Symbol.iterator]();
  const next = iterator.next();
  if (next.done) {
    return fail2(new NoSuchElementException());
  }
  return succeed(next.value);
});
var ignore = (self) => match6(self, {
  onFailure: constVoid,
  onSuccess: constVoid
});
var ignoreLogged = (self) => matchCauseEffect(self, {
  onFailure: (cause3) => logDebug(cause3, "An error was silently ignored because it is not anticipated to be useful"),
  onSuccess: () => unit
});
var inheritFiberRefs = (childFiberRefs) => updateFiberRefs((parentFiberId, parentFiberRefs) => joinAs2(parentFiberRefs, parentFiberId, childFiberRefs));
var isFailure2 = (self) => match6(self, {
  onFailure: constTrue,
  onSuccess: constFalse
});
var isSuccess = (self) => match6(self, {
  onFailure: constFalse,
  onSuccess: constTrue
});
var iterate = (initial, options3) => suspend(() => {
  if (options3.while(initial)) {
    return flatMap7(options3.body(initial), (z2) => iterate(z2, options3));
  }
  return succeed(initial);
});
var logWithLevel = (level) => (messageOrCause, supplementary) => {
  const levelOption = fromNullable(level);
  let message;
  let cause3;
  if (isCause(messageOrCause)) {
    cause3 = messageOrCause;
    message = supplementary ?? "";
  } else {
    message = messageOrCause;
    cause3 = supplementary ?? empty16;
  }
  return withFiberRuntime((fiberState) => {
    fiberState.log(message, cause3, levelOption);
    return unit;
  });
};
var log = /* @__PURE__ */ logWithLevel();
var logTrace = /* @__PURE__ */ logWithLevel(Trace);
var logDebug = /* @__PURE__ */ logWithLevel(Debug);
var logInfo = /* @__PURE__ */ logWithLevel(Info);
var logWarning = /* @__PURE__ */ logWithLevel(Warning);
var logError = /* @__PURE__ */ logWithLevel(Error2);
var logFatal = /* @__PURE__ */ logWithLevel(Fatal);
var withLogSpan = /* @__PURE__ */ dual(2, (effect2, label) => flatMap7(currentTimeMillis2, (now) => fiberRefLocallyWith(effect2, currentLogSpan, prepend3(make26(label, now)))));
var logAnnotations = /* @__PURE__ */ fiberRefGet(currentLogAnnotations);
var loop = (initial, options3) => options3.discard ? loopDiscard(initial, options3.while, options3.step, options3.body) : map9(loopInternal(initial, options3.while, options3.step, options3.body), (x) => Array.from(x));
var loopInternal = (initial, cont, inc, body) => suspend(() => cont(initial) ? flatMap7(body(initial), (a) => map9(loopInternal(inc(initial), cont, inc, body), prepend3(a))) : sync(() => empty9()));
var loopDiscard = (initial, cont, inc, body) => suspend(() => cont(initial) ? flatMap7(body(initial), () => loopDiscard(inc(initial), cont, inc, body)) : unit);
var mapAccum2 = /* @__PURE__ */ dual(3, (elements, zero3, f) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let result = succeed(zero3);
  let next;
  let i = 0;
  while (!(next = iterator.next()).done) {
    const index2 = i++;
    result = flatMap7(result, (state) => map9(f(state, next.value, index2), ([z, b]) => {
      builder.push(b);
      return z;
    }));
  }
  return map9(result, (z) => [z, builder]);
}));
var mapErrorCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (c) => failCauseSync(() => f(c)),
  onSuccess: succeed
}));
var memoize = (self) => pipe(deferredMake(), flatMap7((deferred) => pipe(diffFiberRefsAndRuntimeFlags(self), intoDeferred(deferred), once, map9((complete3) => zipRight(complete3, pipe(deferredAwait(deferred), flatMap7(([patch9, a]) => as(zip2(patchFiberRefs(patch9[0]), updateRuntimeFlags(patch9[1])), a))))))));
var merge5 = (self) => matchEffect(self, {
  onFailure: (e) => succeed(e),
  onSuccess: succeed
});
var negate = (self) => map9(self, (b) => !b);
var none6 = (self) => flatMap7(self, (option4) => {
  switch (option4._tag) {
    case "None": {
      return unit;
    }
    case "Some": {
      return fail2(new NoSuchElementException());
    }
  }
});
var once = (self) => map9(make28(true), (ref) => asUnit(whenEffect(self, getAndSet2(ref, false))));
var option = (self) => matchEffect(self, {
  onFailure: () => succeed(none2()),
  onSuccess: (a) => succeed(some2(a))
});
var orElseFail = /* @__PURE__ */ dual(2, (self, evaluate) => orElse2(self, () => failSync(evaluate)));
var orElseSucceed = /* @__PURE__ */ dual(2, (self, evaluate) => orElse2(self, () => sync(evaluate)));
var parallelErrors = (self) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const errors = Array.from(failures(cause3));
    return errors.length === 0 ? failCause(cause3) : fail2(errors);
  },
  onSuccess: succeed
});
var patchFiberRefs = (patch9) => updateFiberRefs((fiberId3, fiberRefs3) => pipe(patch9, patch6(fiberId3, fiberRefs3)));
var promise = (evaluate) => evaluate.length >= 1 ? async((resolve2, signal) => {
  evaluate(signal).then((a) => resolve2(exitSucceed(a))).catch((e) => resolve2(exitDie(e)));
}) : async((resolve2) => {
  ;
  evaluate().then((a) => resolve2(exitSucceed(a))).catch((e) => resolve2(exitDie(e)));
});
var provideService = /* @__PURE__ */ dual(3, (self, tag4, service2) => contextWithEffect((env) => provideContext(self, add2(env, tag4, service2))));
var provideServiceEffect = /* @__PURE__ */ dual(3, (self, tag4, effect2) => contextWithEffect((env) => flatMap7(effect2, (service2) => provideContext(self, pipe(env, add2(tag4, service2))))));
var random2 = /* @__PURE__ */ randomWith(succeed);
var reduce9 = /* @__PURE__ */ dual(3, (elements, zero3, f) => fromIterable(elements).reduce((acc, el, i) => flatMap7(acc, (a) => f(a, el, i)), succeed(zero3)));
var reduceRight2 = /* @__PURE__ */ dual(3, (elements, zero3, f) => fromIterable(elements).reduceRight((acc, el, i) => flatMap7(acc, (a) => f(el, a, i)), succeed(zero3)));
var reduceWhile = /* @__PURE__ */ dual(3, (elements, zero3, options3) => flatMap7(sync(() => elements[Symbol.iterator]()), (iterator) => reduceWhileLoop(iterator, 0, zero3, options3.while, options3.body)));
var reduceWhileLoop = (iterator, index2, state, predicate, f) => {
  const next = iterator.next();
  if (!next.done && predicate(state)) {
    return flatMap7(f(state, next.value, index2), (nextState) => reduceWhileLoop(iterator, index2 + 1, nextState, predicate, f));
  }
  return succeed(state);
};
var repeatN = /* @__PURE__ */ dual(2, (self, n) => suspend(() => repeatNLoop(self, n)));
var repeatNLoop = (self, n) => flatMap7(self, (a) => n <= 0 ? succeed(a) : zipRight(yieldNow(), repeatNLoop(self, n - 1)));
var sandbox = (self) => matchCauseEffect(self, {
  onFailure: fail2,
  onSuccess: succeed
});
var setFiberRefs = (fiberRefs3) => suspend(() => setAll2(fiberRefs3));
var sleep3 = sleep2;
var succeedNone = /* @__PURE__ */ succeed(/* @__PURE__ */ none2());
var succeedSome = (value5) => succeed(some2(value5));
var summarized = /* @__PURE__ */ dual(3, (self, summary5, f) => flatMap7(summary5, (start3) => flatMap7(self, (value5) => map9(summary5, (end4) => [f(start3, end4), value5]))));
var tagMetrics = /* @__PURE__ */ dual((args) => isEffect(args[0]), function() {
  return labelMetrics(arguments[0], typeof arguments[1] === "string" ? [make29(arguments[1], arguments[2])] : Object.entries(arguments[1]).map(([k, v]) => make29(k, v)));
});
var labelMetrics = /* @__PURE__ */ dual(2, (self, labels) => fiberRefLocallyWith(self, currentMetricLabels, (old) => union(old, labels)));
var takeUntil = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let effect2 = succeed(false);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    effect2 = flatMap7(effect2, (bool) => {
      if (bool) {
        return succeed(true);
      }
      builder.push(a);
      return predicate(a, index2);
    });
  }
  return map9(effect2, () => builder);
}));
var takeWhile = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let taking = succeed(true);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    taking = flatMap7(taking, (taking2) => pipe(taking2 ? predicate(a, index2) : succeed(false), map9((bool) => {
      if (bool) {
        builder.push(a);
      }
      return bool;
    })));
  }
  return map9(taking, () => builder);
}));
var tapBoth = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either6 = failureOrCause(cause3);
    switch (either6._tag) {
      case "Left": {
        return zipRight(onFailure(either6.left), failCause(cause3));
      }
      case "Right": {
        return failCause(cause3);
      }
    }
  },
  onSuccess: (a) => as(onSuccess(a), a)
}));
var tapDefect = /* @__PURE__ */ dual(2, (self, f) => catchAllCause(self, (cause3) => match(keepDefects(cause3), {
  onNone: () => failCause(cause3),
  onSome: (a) => zipRight(f(a), failCause(cause3))
})));
var tapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either6 = failureOrCause(cause3);
    switch (either6._tag) {
      case "Left": {
        return zipRight(f(either6.left), failCause(cause3));
      }
      case "Right": {
        return failCause(cause3);
      }
    }
  },
  onSuccess: succeed
}));
var tapErrorTag = /* @__PURE__ */ dual(3, (self, k, f) => tapError(self, (e) => {
  if (isTagged(e, k)) {
    return f(e);
  }
  return unit;
}));
var tapErrorCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => zipRight(f(cause3), failCause(cause3)),
  onSuccess: succeed
}));
var timed = (self) => timedWith(self, currentTimeNanos2);
var timedWith = /* @__PURE__ */ dual(2, (self, nanos2) => summarized(self, nanos2, (start3, end4) => nanos(end4 - start3)));
var tracerWith3 = tracerWith2;
var tracer = /* @__PURE__ */ tracerWith3(succeed);
var tryPromise = (arg) => {
  let evaluate;
  let catcher = void 0;
  if (typeof arg === "function") {
    evaluate = arg;
  } else {
    evaluate = arg.try;
    catcher = arg.catch;
  }
  if (evaluate.length >= 1) {
    return async((resolve2, signal) => {
      try {
        evaluate(signal).then((a) => resolve2(exitSucceed(a))).catch((e) => resolve2(fail2(catcher ? catcher(e) : new UnknownException(e))));
      } catch (e) {
        resolve2(fail2(catcher ? catcher(e) : new UnknownException(e)));
      }
    });
  }
  return async((resolve2) => {
    try {
      evaluate().then((a) => resolve2(exitSucceed(a))).catch((e) => resolve2(fail2(catcher ? catcher(e) : new UnknownException(e))));
    } catch (e) {
      resolve2(fail2(catcher ? catcher(e) : new UnknownException(e)));
    }
  });
};
var tryMap = /* @__PURE__ */ dual(2, (self, options3) => flatMap7(self, (a) => try_({
  try: () => options3.try(a),
  catch: options3.catch
})));
var tryMapPromise = /* @__PURE__ */ dual(2, (self, options3) => flatMap7(self, (a) => tryPromise({
  try: options3.try.length >= 1 ? (signal) => options3.try(a, signal) : () => options3.try(a),
  catch: options3.catch
})));
var unless = /* @__PURE__ */ dual(2, (self, predicate) => suspend(() => predicate() ? succeedNone : asSome(self)));
var unlessEffect = /* @__PURE__ */ dual(2, (self, predicate) => flatMap7(predicate, (b) => b ? succeedNone : asSome(self)));
var unsandbox = (self) => mapErrorCause(self, flatten3);
var updateFiberRefs = (f) => withFiberRuntime((state) => {
  state.setFiberRefs(f(state.id(), state.getFiberRefs()));
  return unit;
});
var updateService = /* @__PURE__ */ dual(3, (self, tag4, f) => mapInputContext(self, (context6) => add2(context6, tag4, f(unsafeGet3(context6, tag4)))));
var when = /* @__PURE__ */ dual(2, (self, predicate) => suspend(() => predicate() ? map9(self, some2) : succeed(none2())));
var whenFiberRef = /* @__PURE__ */ dual(3, (self, fiberRef, predicate) => flatMap7(fiberRefGet(fiberRef), (s) => predicate(s) ? map9(self, (a) => [s, some2(a)]) : succeed([s, none2()])));
var whenRef = /* @__PURE__ */ dual(3, (self, ref, predicate) => flatMap7(get12(ref), (s) => predicate(s) ? map9(self, (a) => [s, some2(a)]) : succeed([s, none2()])));
var withMetric = /* @__PURE__ */ dual(2, (self, metric) => metric(self));
var serviceFunctionEffect = (service2, f) => (...args) => flatMap7(service2, (a) => f(a)(...args));
var serviceFunction = (service2, f) => (...args) => map9(service2, (a) => f(a)(...args));
var serviceFunctions = (tag4) => new Proxy({}, {
  get(_target, prop, _receiver) {
    return (...args) => flatMap7(tag4, (s) => s[prop](...args));
  }
});
var serviceConstants = (tag4) => new Proxy({}, {
  get(_target, prop, _receiver) {
    return flatMap7(tag4, (s) => s[prop]);
  }
});
var serviceMembers = (tag4) => ({
  functions: serviceFunctions(tag4),
  constants: serviceConstants(tag4)
});
var serviceOption = (tag4) => map9(context(), getOption2(tag4));
var serviceOptional = (tag4) => flatMap7(context(), getOption2(tag4));
var annotateCurrentSpan = function() {
  const args = arguments;
  return ignore(flatMap7(currentSpan, (span2) => sync(() => {
    if (typeof args[0] === "string") {
      span2.attribute(args[0], args[1]);
    } else {
      for (const key2 in args[0]) {
        span2.attribute(key2, args[0][key2]);
      }
    }
  })));
};
var annotateSpans = /* @__PURE__ */ dual((args) => isEffect(args[0]), function() {
  const args = arguments;
  return fiberRefLocallyWith(args[0], currentTracerSpanAnnotations, typeof args[1] === "string" ? set3(args[1], args[2]) : (annotations2) => Object.entries(args[1]).reduce((acc, [key2, value5]) => set3(acc, key2, value5), annotations2));
});
var currentParentSpan = /* @__PURE__ */ serviceOptional(spanTag);
var currentSpan = /* @__PURE__ */ flatMap7(/* @__PURE__ */ context(), (context6) => {
  const span2 = context6.unsafeMap.get(spanTag);
  return span2 !== void 0 && span2._tag === "Span" ? succeed(span2) : fail2(new NoSuchElementException());
});
var bigint02 = /* @__PURE__ */ BigInt(0);
var currentTimeNanosTracing = /* @__PURE__ */ fiberRefGetWith(currentTracerTimingEnabled, (enabled2) => enabled2 ? currentTimeNanos2 : succeed(bigint02));
var linkSpans = /* @__PURE__ */ dual((args) => isEffect(args[0]), (self, span2, attributes) => fiberRefLocallyWith(self, currentTracerSpanLinks, append2({
  _tag: "SpanLink",
  span: span2,
  attributes: attributes ?? {}
})));
var makeSpan = (name, options3) => flatMap7(fiberRefs2, (fiberRefs3) => sync(() => {
  const context6 = getOrDefault2(fiberRefs3, currentContext);
  const services = getOrDefault2(fiberRefs3, currentServices);
  const tracer3 = get3(services, tracerTag);
  const clock3 = get3(services, Clock);
  const timingEnabled = getOrDefault2(fiberRefs3, currentTracerTimingEnabled);
  const annotationsFromEnv = get10(fiberRefs3, currentTracerSpanAnnotations);
  const linksFromEnv = get10(fiberRefs3, currentTracerSpanLinks);
  const parent = options3?.parent ? some2(options3.parent) : options3?.root ? none2() : getOption2(context6, spanTag);
  const links = linksFromEnv._tag === "Some" ? [...toReadonlyArray(linksFromEnv.value), ...options3?.links ?? []] : options3?.links ?? [];
  const span2 = tracer3.span(name, parent, options3?.context ?? empty3(), links, timingEnabled ? clock3.unsafeCurrentTimeNanos() : bigint02);
  if (annotationsFromEnv._tag === "Some") {
    forEach3(annotationsFromEnv.value, (value5, key2) => span2.attribute(key2, value5));
  }
  if (options3?.attributes) {
    Object.entries(options3.attributes).forEach(([k, v]) => span2.attribute(k, v));
  }
  return span2;
}));
var spanAnnotations = /* @__PURE__ */ fiberRefGet(currentTracerSpanAnnotations);
var spanLinks = /* @__PURE__ */ fiberRefGet(currentTracerSpanLinks);
var useSpan = (name, ...args) => {
  const options3 = args.length === 1 ? void 0 : args[0];
  const evaluate = args[args.length - 1];
  return acquireUseRelease(makeSpan(name, options3), evaluate, (span2, exit3) => flatMap7(currentTimeNanosTracing, (endTime) => sync(() => span2.end(endTime, exit3))));
};
var withParentSpan = /* @__PURE__ */ dual(2, (self, span2) => provideService(self, spanTag, span2));
var withSpan = /* @__PURE__ */ dual((args) => typeof args[0] !== "string", (self, name, options3) => useSpan(name, options3 ?? {}, (span2) => withParentSpan(self, span2)));
var fromNullable2 = (value5) => value5 == null ? fail2(new NoSuchElementException()) : succeed(value5);
var optionFromOptional = (self) => catchAll(map9(self, some2), (error2) => isNoSuchElementException(error2) ? succeedNone : fail2(error2));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Effectable.js
var EffectTypeId3 = EffectTypeId;
var CommitPrototype2 = CommitPrototype;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/executionStrategy.js
var OP_SEQUENTIAL2 = "Sequential";
var OP_PARALLEL2 = "Parallel";
var OP_PARALLEL_N = "ParallelN";
var sequential2 = {
  _tag: OP_SEQUENTIAL2
};
var parallel2 = {
  _tag: OP_PARALLEL2
};
var parallelN = (parallelism) => ({
  _tag: OP_PARALLEL_N,
  parallelism
});
var isSequential = (self) => self._tag === OP_SEQUENTIAL2;
var isParallel = (self) => self._tag === OP_PARALLEL2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/ExecutionStrategy.js
var sequential3 = sequential2;
var parallel3 = parallel2;
var parallelN2 = parallelN;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/FiberRefsPatch.js
var diff6 = diff5;
var patch7 = patch6;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberStatus.js
var FiberStatusSymbolKey = "effect/FiberStatus";
var FiberStatusTypeId = /* @__PURE__ */ Symbol.for(FiberStatusSymbolKey);
var OP_DONE = "Done";
var OP_RUNNING = "Running";
var OP_SUSPENDED = "Suspended";
var Done = class {
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_DONE;
  [symbol]() {
    return pipe(hash(FiberStatusSymbolKey), combine(hash(this._tag)));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_DONE;
  }
};
var Running = class {
  runtimeFlags;
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_RUNNING;
  constructor(runtimeFlags2) {
    this.runtimeFlags = runtimeFlags2;
  }
  [symbol]() {
    return pipe(hash(FiberStatusSymbolKey), combine(hash(this._tag)), combine(hash(this.runtimeFlags)));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
};
var Suspended = class {
  runtimeFlags;
  blockingOn;
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_SUSPENDED;
  constructor(runtimeFlags2, blockingOn) {
    this.runtimeFlags = runtimeFlags2;
    this.blockingOn = blockingOn;
  }
  [symbol]() {
    return pipe(hash(FiberStatusSymbolKey), combine(hash(this._tag)), combine(hash(this.runtimeFlags)), combine(hash(this.blockingOn)));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && equals(this.blockingOn, that.blockingOn);
  }
};
var done3 = /* @__PURE__ */ new Done();
var running = (runtimeFlags2) => new Running(runtimeFlags2);
var suspended = (runtimeFlags2, blockingOn) => new Suspended(runtimeFlags2, blockingOn);
var isFiberStatus = (u) => hasProperty(u, FiberStatusTypeId);
var isDone2 = (self) => self._tag === OP_DONE;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/FiberStatus.js
var done4 = done3;
var running2 = running;
var suspended2 = suspended;
var isDone3 = isDone2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Scheduler.js
var PriorityBuckets = class {
  /**
   * @since 2.0.0
   */
  buckets = [];
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    let bucket = void 0;
    let index2;
    for (index2 = 0; index2 < this.buckets.length; index2++) {
      if (this.buckets[index2][0] <= priority) {
        bucket = this.buckets[index2];
      } else {
        break;
      }
    }
    if (bucket) {
      bucket[1].push(task);
    } else {
      const newBuckets = [];
      for (let i = 0; i < index2; i++) {
        newBuckets.push(this.buckets[i]);
      }
      newBuckets.push([priority, [task]]);
      for (let i = index2; i < this.buckets.length; i++) {
        newBuckets.push(this.buckets[i]);
      }
      this.buckets = newBuckets;
    }
  }
};
var MixedScheduler = class {
  maxNextTickBeforeTimer;
  /**
   * @since 2.0.0
   */
  running = false;
  /**
   * @since 2.0.0
   */
  tasks = new PriorityBuckets();
  constructor(maxNextTickBeforeTimer) {
    this.maxNextTickBeforeTimer = maxNextTickBeforeTimer;
  }
  /**
   * @since 2.0.0
   */
  starveInternal(depth) {
    const tasks = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [_, toRun] of tasks) {
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    if (this.tasks.buckets.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  /**
   * @since 2.0.0
   */
  starve(depth = 0) {
    if (depth >= this.maxNextTickBeforeTimer) {
      set5(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  /**
   * @since 2.0.0
   */
  shouldYield(fiber) {
    return fiber.currentOpCount > fiber.getFiberRef(currentMaxOpsBeforeYield) ? fiber.getFiberRef(currentSchedulingPriority) : false;
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    this.tasks.scheduleTask(task, priority);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
};
var defaultScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Scheduler/defaultScheduler"), () => new MixedScheduler(2048));
var SyncScheduler = class {
  /**
   * @since 2.0.0
   */
  tasks = new PriorityBuckets();
  /**
   * @since 2.0.0
   */
  deferred = false;
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task, priority);
    } else {
      this.tasks.scheduleTask(task, priority);
    }
  }
  /**
   * @since 2.0.0
   */
  shouldYield(fiber) {
    return fiber.currentOpCount > fiber.getFiberRef(currentMaxOpsBeforeYield) ? fiber.getFiberRef(currentSchedulingPriority) : false;
  }
  /**
   * @since 2.0.0
   */
  flush() {
    while (this.tasks.buckets.length > 0) {
      const tasks = this.tasks.buckets;
      this.tasks.buckets = [];
      for (const [_, toRun] of tasks) {
        for (let i = 0; i < toRun.length; i++) {
          toRun[i]();
        }
      }
    }
    this.deferred = true;
  }
};
var currentScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentScheduler"), () => fiberRefUnsafeMake(defaultScheduler));
var withScheduler = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentScheduler, scheduler));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/completedRequestMap.js
var currentRequestMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestMap"), () => fiberRefUnsafeMake(/* @__PURE__ */ new Map()));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/concurrency.js
var match8 = (concurrency, sequential4, unbounded6, bounded4) => {
  switch (concurrency) {
    case void 0:
      return sequential4();
    case "unbounded":
      return unbounded6();
    case "inherit":
      return fiberRefGetWith(currentConcurrency, (concurrency2) => concurrency2 === "unbounded" ? unbounded6() : concurrency2 > 1 ? bounded4(concurrency2) : sequential4());
    default:
      return concurrency > 1 ? bounded4(concurrency) : sequential4();
  }
};
var matchSimple = (concurrency, sequential4, concurrent) => {
  switch (concurrency) {
    case void 0:
      return sequential4();
    case "unbounded":
      return concurrent();
    case "inherit":
      return fiberRefGetWith(currentConcurrency, (concurrency2) => concurrency2 === "unbounded" || concurrency2 > 1 ? concurrent() : sequential4());
    default:
      return concurrency > 1 ? concurrent() : sequential4();
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberMessage.js
var OP_INTERRUPT_SIGNAL = "InterruptSignal";
var OP_STATEFUL = "Stateful";
var OP_RESUME = "Resume";
var OP_YIELD_NOW = "YieldNow";
var interruptSignal = (cause3) => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause: cause3
});
var stateful = (onFiber) => ({
  _tag: OP_STATEFUL,
  onFiber
});
var resume = (effect2) => ({
  _tag: OP_RESUME,
  effect: effect2
});
var yieldNow2 = () => ({
  _tag: OP_YIELD_NOW
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberScope.js
var FiberScopeSymbolKey = "effect/FiberScope";
var FiberScopeTypeId = /* @__PURE__ */ Symbol.for(FiberScopeSymbolKey);
var Global = class {
  [FiberScopeTypeId] = FiberScopeTypeId;
  fiberId = none4;
  roots = /* @__PURE__ */ new Set();
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.addObserver(() => {
      this.roots.delete(child);
    });
  }
};
var Local = class {
  fiberId;
  parent;
  [FiberScopeTypeId] = FiberScopeTypeId;
  constructor(fiberId3, parent) {
    this.fiberId = fiberId3;
    this.parent = parent;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(stateful((parentFiber) => {
      parentFiber.addChild(child);
      child.addObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
};
var unsafeMake6 = (fiber) => {
  return new Local(fiber.id(), fiber);
};
var globalScope = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberScope/Global"), () => new Global());

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiber.js
var FiberSymbolKey = "effect/Fiber";
var FiberTypeId = /* @__PURE__ */ Symbol.for(FiberSymbolKey);
var fiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
var fiberProto = {
  [FiberTypeId]: fiberVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var RuntimeFiberSymbolKey = "effect/Fiber";
var RuntimeFiberTypeId = /* @__PURE__ */ Symbol.for(RuntimeFiberSymbolKey);
var _await2 = (self) => self.await;
var inheritAll = (self) => self.inheritAll;
var interruptAsFork = /* @__PURE__ */ dual(2, (self, fiberId3) => self.interruptAsFork(fiberId3));
var join2 = (self) => zipLeft(flatten4(self.await), self.inheritAll);
var never2 = {
  ...fiberProto,
  id: () => none4,
  await: never,
  children: /* @__PURE__ */ succeed([]),
  inheritAll: never,
  poll: /* @__PURE__ */ succeed(/* @__PURE__ */ none2()),
  interruptAsFork: () => never
};
var currentFiberURI = "effect/FiberCurrent";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/logger.js
var LoggerSymbolKey = "effect/Logger";
var LoggerTypeId = /* @__PURE__ */ Symbol.for(LoggerSymbolKey);
var loggerVariance = {
  /* c8 ignore next */
  _Message: (_) => _,
  /* c8 ignore next */
  _Output: (_) => _
};
var makeLogger = (log5) => ({
  [LoggerTypeId]: loggerVariance,
  log: log5,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var none7 = {
  [LoggerTypeId]: loggerVariance,
  log: constVoid,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var stringLogger = /* @__PURE__ */ makeLogger(({
  annotations: annotations2,
  cause: cause3,
  date: date5,
  fiberId: fiberId3,
  logLevel,
  message,
  spans: spans2
}) => {
  const nowMillis = date5.getTime();
  const outputArray = [`timestamp=${date5.toISOString()}`, `level=${logLevel.label}`, `fiber=${threadName(fiberId3)}`];
  let output = outputArray.join(" ");
  const stringMessage = serializeUnknown(message);
  if (stringMessage.length > 0) {
    output = output + " message=";
    output = appendQuoted(stringMessage, output);
  }
  if (cause3 != null && cause3._tag !== "Empty") {
    output = output + " cause=";
    output = appendQuoted(pretty(cause3), output);
  }
  if (isCons(spans2)) {
    output = output + " ";
    let first3 = true;
    for (const span2 of spans2) {
      if (first3) {
        first3 = false;
      } else {
        output = output + " ";
      }
      output = output + pipe(span2, render2(nowMillis));
    }
  }
  if (pipe(annotations2, size4) > 0) {
    output = output + " ";
    let first3 = true;
    for (const [key2, value5] of annotations2) {
      if (first3) {
        first3 = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key2);
      output = output + "=";
      output = appendQuoted(serializeUnknown(value5), output);
    }
  }
  return output;
});
var serializeUnknown = (u) => {
  try {
    return typeof u === "object" ? JSON.stringify(u) : String(u);
  } catch (_) {
    return String(u);
  }
};
var escapeDoubleQuotes = (str) => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
var textOnly = /^[^\s"=]+$/;
var appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
var filterKeyName = (key2) => key2.replace(/[\s="]/g, "_");

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/boundaries.js
var MetricBoundariesSymbolKey = "effect/MetricBoundaries";
var MetricBoundariesTypeId = /* @__PURE__ */ Symbol.for(MetricBoundariesSymbolKey);
var MetricBoundariesImpl = class {
  values;
  [MetricBoundariesTypeId] = MetricBoundariesTypeId;
  constructor(values3) {
    this.values = values3;
    this._hash = pipe(string(MetricBoundariesSymbolKey), combine(array(this.values)));
  }
  _hash;
  [symbol]() {
    return this._hash;
  }
  [symbol2](u) {
    return isMetricBoundaries(u) && equals(this.values, u.values);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isMetricBoundaries = (u) => hasProperty(u, MetricBoundariesTypeId);
var fromIterable7 = (iterable) => {
  const values3 = pipe(iterable, appendAll(of2(Number.POSITIVE_INFINITY)), dedupe);
  return new MetricBoundariesImpl(values3);
};
var exponential = (options3) => pipe(makeBy(options3.count - 1, (i) => options3.start * Math.pow(options3.factor, i)), unsafeFromArray, fromIterable7);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/keyType.js
var MetricKeyTypeSymbolKey = "effect/MetricKeyType";
var MetricKeyTypeTypeId = /* @__PURE__ */ Symbol.for(MetricKeyTypeSymbolKey);
var CounterKeyTypeSymbolKey = "effect/MetricKeyType/Counter";
var CounterKeyTypeTypeId = /* @__PURE__ */ Symbol.for(CounterKeyTypeSymbolKey);
var FrequencyKeyTypeSymbolKey = "effect/MetricKeyType/Frequency";
var FrequencyKeyTypeTypeId = /* @__PURE__ */ Symbol.for(FrequencyKeyTypeSymbolKey);
var GaugeKeyTypeSymbolKey = "effect/MetricKeyType/Gauge";
var GaugeKeyTypeTypeId = /* @__PURE__ */ Symbol.for(GaugeKeyTypeSymbolKey);
var HistogramKeyTypeSymbolKey = "effect/MetricKeyType/Histogram";
var HistogramKeyTypeTypeId = /* @__PURE__ */ Symbol.for(HistogramKeyTypeSymbolKey);
var SummaryKeyTypeSymbolKey = "effect/MetricKeyType/Summary";
var SummaryKeyTypeTypeId = /* @__PURE__ */ Symbol.for(SummaryKeyTypeSymbolKey);
var metricKeyTypeVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
var CounterKeyType = class {
  incremental;
  bigint;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [CounterKeyTypeTypeId] = CounterKeyTypeTypeId;
  constructor(incremental, bigint) {
    this.incremental = incremental;
    this.bigint = bigint;
    this._hash = string(CounterKeyTypeSymbolKey);
  }
  _hash;
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isCounterKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var FrequencyKeyType = class {
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [FrequencyKeyTypeTypeId] = FrequencyKeyTypeTypeId;
  _hash = string(FrequencyKeyTypeSymbolKey);
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isFrequencyKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var GaugeKeyType = class {
  bigint;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [GaugeKeyTypeTypeId] = GaugeKeyTypeTypeId;
  constructor(bigint) {
    this.bigint = bigint;
  }
  _hash = string(GaugeKeyTypeSymbolKey);
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isGaugeKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var HistogramKeyType = class {
  boundaries;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [HistogramKeyTypeTypeId] = HistogramKeyTypeTypeId;
  constructor(boundaries) {
    this.boundaries = boundaries;
    this._hash = pipe(string(HistogramKeyTypeSymbolKey), combine(hash(this.boundaries)));
  }
  _hash;
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isHistogramKey(that) && equals(this.boundaries, that.boundaries);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var SummaryKeyType = class {
  maxAge;
  maxSize;
  error;
  quantiles;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [SummaryKeyTypeTypeId] = SummaryKeyTypeTypeId;
  constructor(maxAge, maxSize, error2, quantiles) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
    this.error = error2;
    this.quantiles = quantiles;
    this._hash = pipe(string(SummaryKeyTypeSymbolKey), combine(hash(this.maxAge)), combine(hash(this.maxSize)), combine(hash(this.error)), combine(array(this.quantiles)));
  }
  _hash;
  [symbol]() {
    return this._hash;
  }
  [symbol2](that) {
    return isSummaryKey(that) && equals(this.maxAge, that.maxAge) && this.maxSize === that.maxSize && this.error === that.error && equals(this.quantiles, that.quantiles);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var counter = (options3) => new CounterKeyType(options3?.incremental ?? false, options3?.bigint ?? false);
var histogram = (boundaries) => {
  return new HistogramKeyType(boundaries);
};
var isCounterKey = (u) => hasProperty(u, CounterKeyTypeTypeId);
var isFrequencyKey = (u) => hasProperty(u, FrequencyKeyTypeTypeId);
var isGaugeKey = (u) => hasProperty(u, GaugeKeyTypeTypeId);
var isHistogramKey = (u) => hasProperty(u, HistogramKeyTypeTypeId);
var isSummaryKey = (u) => hasProperty(u, SummaryKeyTypeTypeId);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/key.js
var MetricKeySymbolKey = "effect/MetricKey";
var MetricKeyTypeId = /* @__PURE__ */ Symbol.for(MetricKeySymbolKey);
var metricKeyVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
var arrayEquivilence = /* @__PURE__ */ getEquivalence2(equals);
var MetricKeyImpl = class {
  name;
  keyType;
  description;
  tags;
  [MetricKeyTypeId] = metricKeyVariance;
  constructor(name, keyType, description, tags2 = []) {
    this.name = name;
    this.keyType = keyType;
    this.description = description;
    this.tags = tags2;
    this._hash = pipe(string(this.name + this.description), combine(hash(this.keyType)), combine(array(this.tags)));
  }
  _hash;
  [symbol]() {
    return this._hash;
  }
  [symbol2](u) {
    return isMetricKey(u) && this.name === u.name && equals(this.keyType, u.keyType) && equals(this.description, u.description) && arrayEquivilence(this.tags, u.tags);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isMetricKey = (u) => hasProperty(u, MetricKeyTypeId);
var counter2 = (name, options3) => new MetricKeyImpl(name, counter(options3), fromNullable(options3?.description));
var histogram2 = (name, boundaries, description) => new MetricKeyImpl(name, histogram(boundaries), fromNullable(description));
var taggedWithLabels = /* @__PURE__ */ dual(2, (self, extraTags) => extraTags.length === 0 ? self : new MetricKeyImpl(self.name, self.keyType, self.description, union(self.tags, extraTags)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/state.js
var MetricStateSymbolKey = "effect/MetricState";
var MetricStateTypeId = /* @__PURE__ */ Symbol.for(MetricStateSymbolKey);
var CounterStateSymbolKey = "effect/MetricState/Counter";
var CounterStateTypeId = /* @__PURE__ */ Symbol.for(CounterStateSymbolKey);
var FrequencyStateSymbolKey = "effect/MetricState/Frequency";
var FrequencyStateTypeId = /* @__PURE__ */ Symbol.for(FrequencyStateSymbolKey);
var GaugeStateSymbolKey = "effect/MetricState/Gauge";
var GaugeStateTypeId = /* @__PURE__ */ Symbol.for(GaugeStateSymbolKey);
var HistogramStateSymbolKey = "effect/MetricState/Histogram";
var HistogramStateTypeId = /* @__PURE__ */ Symbol.for(HistogramStateSymbolKey);
var SummaryStateSymbolKey = "effect/MetricState/Summary";
var SummaryStateTypeId = /* @__PURE__ */ Symbol.for(SummaryStateSymbolKey);
var metricStateVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var CounterState = class {
  count;
  [MetricStateTypeId] = metricStateVariance;
  [CounterStateTypeId] = CounterStateTypeId;
  constructor(count3) {
    this.count = count3;
  }
  [symbol]() {
    return pipe(hash(CounterStateSymbolKey), combine(hash(this.count)));
  }
  [symbol2](that) {
    return isCounterState(that) && this.count === that.count;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var arrayEquals = /* @__PURE__ */ getEquivalence2(equals);
var FrequencyState = class {
  occurrences;
  [MetricStateTypeId] = metricStateVariance;
  [FrequencyStateTypeId] = FrequencyStateTypeId;
  constructor(occurrences) {
    this.occurrences = occurrences;
  }
  _hash;
  [symbol]() {
    if (this._hash !== void 0) {
      return this._hash;
    }
    this._hash = pipe(string(FrequencyStateSymbolKey), combine(array(fromIterable(this.occurrences.entries()))));
    return this._hash;
  }
  [symbol2](that) {
    return isFrequencyState(that) && arrayEquals(fromIterable(this.occurrences.entries()), fromIterable(that.occurrences.entries()));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var GaugeState = class {
  value;
  [MetricStateTypeId] = metricStateVariance;
  [GaugeStateTypeId] = GaugeStateTypeId;
  constructor(value5) {
    this.value = value5;
  }
  [symbol]() {
    return pipe(hash(GaugeStateSymbolKey), combine(hash(this.value)));
  }
  [symbol2](u) {
    return isGaugeState(u) && this.value === u.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var HistogramState = class {
  buckets;
  count;
  min;
  max;
  sum;
  [MetricStateTypeId] = metricStateVariance;
  [HistogramStateTypeId] = HistogramStateTypeId;
  constructor(buckets, count3, min4, max6, sum3) {
    this.buckets = buckets;
    this.count = count3;
    this.min = min4;
    this.max = max6;
    this.sum = sum3;
  }
  [symbol]() {
    return pipe(hash(HistogramStateSymbolKey), combine(hash(this.buckets)), combine(hash(this.count)), combine(hash(this.min)), combine(hash(this.max)), combine(hash(this.sum)));
  }
  [symbol2](that) {
    return isHistogramState(that) && equals(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var SummaryState = class {
  error;
  quantiles;
  count;
  min;
  max;
  sum;
  [MetricStateTypeId] = metricStateVariance;
  [SummaryStateTypeId] = SummaryStateTypeId;
  constructor(error2, quantiles, count3, min4, max6, sum3) {
    this.error = error2;
    this.quantiles = quantiles;
    this.count = count3;
    this.min = min4;
    this.max = max6;
    this.sum = sum3;
  }
  [symbol]() {
    return pipe(hash(SummaryStateSymbolKey), combine(hash(this.error)), combine(hash(this.quantiles)), combine(hash(this.count)), combine(hash(this.min)), combine(hash(this.max)), combine(hash(this.sum)));
  }
  [symbol2](that) {
    return isSummaryState(that) && this.error === that.error && equals(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var counter3 = (count3) => new CounterState(count3);
var frequency2 = (occurrences) => {
  return new FrequencyState(occurrences);
};
var gauge2 = (count3) => new GaugeState(count3);
var histogram3 = (options3) => new HistogramState(options3.buckets, options3.count, options3.min, options3.max, options3.sum);
var summary2 = (options3) => new SummaryState(options3.error, options3.quantiles, options3.count, options3.min, options3.max, options3.sum);
var isCounterState = (u) => hasProperty(u, CounterStateTypeId);
var isFrequencyState = (u) => hasProperty(u, FrequencyStateTypeId);
var isGaugeState = (u) => hasProperty(u, GaugeStateTypeId);
var isHistogramState = (u) => hasProperty(u, HistogramStateTypeId);
var isSummaryState = (u) => hasProperty(u, SummaryStateTypeId);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/hook.js
var MetricHookSymbolKey = "effect/MetricHook";
var MetricHookTypeId = /* @__PURE__ */ Symbol.for(MetricHookSymbolKey);
var metricHookVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
var make30 = (options3) => ({
  [MetricHookTypeId]: metricHookVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options3
});
var bigint03 = /* @__PURE__ */ BigInt(0);
var counter4 = (key2) => {
  let sum3 = key2.keyType.bigint ? bigint03 : 0;
  const canUpdate = key2.keyType.incremental ? key2.keyType.bigint ? (value5) => value5 >= bigint03 : (value5) => value5 >= 0 : (_value) => true;
  return make30({
    get: () => counter3(sum3),
    update: (value5) => {
      if (canUpdate(value5)) {
        sum3 = sum3 + value5;
      }
    }
  });
};
var frequency3 = (_key) => {
  let count3 = 0;
  const values3 = /* @__PURE__ */ new Map();
  const update4 = (word) => {
    count3 = count3 + 1;
    const slotCount = values3.get(word) ?? 0;
    values3.set(word, slotCount + 1);
  };
  return make30({
    get: () => frequency2(values3),
    update: update4
  });
};
var gauge3 = (_key, startAt) => {
  let value5 = startAt;
  return make30({
    get: () => gauge2(value5),
    update: (v) => {
      value5 = v;
    }
  });
};
var histogram4 = (key2) => {
  const bounds = key2.keyType.boundaries.values;
  const size12 = bounds.length;
  const values3 = new Uint32Array(size12 + 1);
  const boundaries = new Float32Array(size12);
  let count3 = 0;
  let sum3 = 0;
  let min4 = Number.MAX_VALUE;
  let max6 = Number.MIN_VALUE;
  pipe(bounds, sort(Order), map2((n, i) => {
    boundaries[i] = n;
  }));
  const update4 = (value5) => {
    let from2 = 0;
    let to3 = size12;
    while (from2 !== to3) {
      const mid = Math.floor(from2 + (to3 - from2) / 2);
      const boundary = boundaries[mid];
      if (value5 <= boundary) {
        to3 = mid;
      } else {
        from2 = mid;
      }
      if (to3 === from2 + 1) {
        if (value5 <= boundaries[from2]) {
          to3 = from2;
        } else {
          from2 = to3;
        }
      }
    }
    values3[from2] = values3[from2] + 1;
    count3 = count3 + 1;
    sum3 = sum3 + value5;
    if (value5 < min4) {
      min4 = value5;
    }
    if (value5 > max6) {
      max6 = value5;
    }
  };
  const getBuckets = () => {
    const builder = Array(size12);
    let cumulated = 0;
    for (let i = 0; i < size12; i++) {
      const boundary = boundaries[i];
      const value5 = values3[i];
      cumulated = cumulated + value5;
      builder[i] = [boundary, cumulated];
    }
    return builder;
  };
  return make30({
    get: () => histogram3({
      buckets: getBuckets(),
      count: count3,
      min: min4,
      max: max6,
      sum: sum3
    }),
    update: update4
  });
};
var summary3 = (key2) => {
  const {
    error: error2,
    maxAge,
    maxSize,
    quantiles
  } = key2.keyType;
  const sortedQuantiles = pipe(quantiles, sort(Order));
  const values3 = Array(maxSize);
  let head6 = 0;
  let count3 = 0;
  let sum3 = 0;
  let min4 = Number.MAX_VALUE;
  let max6 = Number.MIN_VALUE;
  const snapshot = (now) => {
    const builder = [];
    let i = 0;
    while (i !== maxSize - 1) {
      const item = values3[i];
      if (item != null) {
        const [t, v] = item;
        const age = millis(now - t);
        if (greaterThanOrEqualTo2(age, zero2) && age <= maxAge) {
          builder.push(v);
        }
      }
      i = i + 1;
    }
    return calculateQuantiles(error2, sortedQuantiles, sort(builder, Order));
  };
  const observe = (value5, timestamp) => {
    if (maxSize > 0) {
      head6 = head6 + 1;
      const target = head6 % maxSize;
      values3[target] = [timestamp, value5];
    }
    count3 = count3 + 1;
    sum3 = sum3 + value5;
    if (value5 < min4) {
      min4 = value5;
    }
    if (value5 > max6) {
      max6 = value5;
    }
  };
  return make30({
    get: () => summary2({
      error: error2,
      quantiles: snapshot(Date.now()),
      count: count3,
      min: min4,
      max: max6,
      sum: sum3
    }),
    update: ([value5, timestamp]) => observe(value5, timestamp)
  });
};
var calculateQuantiles = (error2, sortedQuantiles, sortedSamples) => {
  const sampleCount = sortedSamples.length;
  if (!isNonEmptyReadonlyArray(sortedQuantiles)) {
    return empty();
  }
  const head6 = sortedQuantiles[0];
  const tail = sortedQuantiles.slice(1);
  const resolvedHead = resolveQuantile(error2, sampleCount, none2(), 0, head6, sortedSamples);
  const resolved = of(resolvedHead);
  tail.forEach((quantile) => {
    resolved.push(resolveQuantile(error2, sampleCount, resolvedHead.value, resolvedHead.consumed, quantile, resolvedHead.rest));
  });
  return map2(resolved, (rq) => [rq.quantile, rq.value]);
};
var resolveQuantile = (error2, sampleCount, current, consumed, quantile, rest) => {
  let error_1 = error2;
  let sampleCount_1 = sampleCount;
  let current_1 = current;
  let consumed_1 = consumed;
  let quantile_1 = quantile;
  let rest_1 = rest;
  let error_2 = error2;
  let sampleCount_2 = sampleCount;
  let current_2 = current;
  let consumed_2 = consumed;
  let quantile_2 = quantile;
  let rest_2 = rest;
  while (1) {
    if (!isNonEmptyReadonlyArray(rest_1)) {
      return {
        quantile: quantile_1,
        value: none2(),
        consumed: consumed_1,
        rest: []
      };
    }
    if (quantile_1 === 1) {
      return {
        quantile: quantile_1,
        value: some2(lastNonEmpty(rest_1)),
        consumed: consumed_1 + rest_1.length,
        rest: []
      };
    }
    const sameHead = span(rest_1, (n) => n <= rest_1[0]);
    const desired = quantile_1 * sampleCount_1;
    const allowedError = error_1 / 2 * desired;
    const candConsumed = consumed_1 + sameHead[0].length;
    const candError = Math.abs(candConsumed - desired);
    if (candConsumed < desired - allowedError) {
      error_2 = error_1;
      sampleCount_2 = sampleCount_1;
      current_2 = head(rest_1);
      consumed_2 = candConsumed;
      quantile_2 = quantile_1;
      rest_2 = sameHead[1];
      error_1 = error_2;
      sampleCount_1 = sampleCount_2;
      current_1 = current_2;
      consumed_1 = consumed_2;
      quantile_1 = quantile_2;
      rest_1 = rest_2;
      continue;
    }
    if (candConsumed > desired + allowedError) {
      return {
        quantile: quantile_1,
        value: current_1,
        consumed: consumed_1,
        rest: rest_1
      };
    }
    switch (current_1._tag) {
      case "None": {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead[1];
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      case "Some": {
        const prevError = Math.abs(desired - current_1.value);
        if (candError < prevError) {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead[1];
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        return {
          quantile: quantile_1,
          value: some2(current_1.value),
          consumed: consumed_1,
          rest: rest_1
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues");
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/pair.js
var MetricPairSymbolKey = "effect/MetricPair";
var MetricPairTypeId = /* @__PURE__ */ Symbol.for(MetricPairSymbolKey);
var metricPairVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
var unsafeMake7 = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState,
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric/registry.js
var MetricRegistrySymbolKey = "effect/MetricRegistry";
var MetricRegistryTypeId = /* @__PURE__ */ Symbol.for(MetricRegistrySymbolKey);
var MetricRegistryImpl = class {
  [MetricRegistryTypeId] = MetricRegistryTypeId;
  map = empty17();
  snapshot() {
    const result = [];
    for (const [key2, hook] of this.map) {
      result.push(unsafeMake7(key2, hook.get()));
    }
    return result;
  }
  get(key2) {
    const hook = pipe(this.map, get8(key2), getOrUndefined);
    if (hook == null) {
      if (isCounterKey(key2.keyType)) {
        return this.getCounter(key2);
      }
      if (isGaugeKey(key2.keyType)) {
        return this.getGauge(key2);
      }
      if (isFrequencyKey(key2.keyType)) {
        return this.getFrequency(key2);
      }
      if (isHistogramKey(key2.keyType)) {
        return this.getHistogram(key2);
      }
      if (isSummaryKey(key2.keyType)) {
        return this.getSummary(key2);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/effect/issues");
    } else {
      return hook;
    }
  }
  getCounter(key2) {
    let value5 = pipe(this.map, get8(key2), getOrUndefined);
    if (value5 == null) {
      const counter6 = counter4(key2);
      if (!pipe(this.map, has4(key2))) {
        pipe(this.map, set4(key2, counter6));
      }
      value5 = counter6;
    }
    return value5;
  }
  getFrequency(key2) {
    let value5 = pipe(this.map, get8(key2), getOrUndefined);
    if (value5 == null) {
      const frequency5 = frequency3(key2);
      if (!pipe(this.map, has4(key2))) {
        pipe(this.map, set4(key2, frequency5));
      }
      value5 = frequency5;
    }
    return value5;
  }
  getGauge(key2) {
    let value5 = pipe(this.map, get8(key2), getOrUndefined);
    if (value5 == null) {
      const gauge5 = gauge3(key2, key2.keyType.bigint ? BigInt(0) : 0);
      if (!pipe(this.map, has4(key2))) {
        pipe(this.map, set4(key2, gauge5));
      }
      value5 = gauge5;
    }
    return value5;
  }
  getHistogram(key2) {
    let value5 = pipe(this.map, get8(key2), getOrUndefined);
    if (value5 == null) {
      const histogram6 = histogram4(key2);
      if (!pipe(this.map, has4(key2))) {
        pipe(this.map, set4(key2, histogram6));
      }
      value5 = histogram6;
    }
    return value5;
  }
  getSummary(key2) {
    let value5 = pipe(this.map, get8(key2), getOrUndefined);
    if (value5 == null) {
      const summary5 = summary3(key2);
      if (!pipe(this.map, has4(key2))) {
        pipe(this.map, set4(key2, summary5));
      }
      value5 = summary5;
    }
    return value5;
  }
};
var make31 = () => {
  return new MetricRegistryImpl();
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/metric.js
var MetricSymbolKey = "effect/Metric";
var MetricTypeId = /* @__PURE__ */ Symbol.for(MetricSymbolKey);
var metricVariance = {
  /* c8 ignore next */
  _Type: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
var globalMetricRegistry = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Metric/globalMetricRegistry"), () => make31());
var make32 = function(keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign((effect2) => tap(effect2, (a) => sync(() => unsafeUpdate(a, []))), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue,
    register() {
      this.unsafeValue([]);
      return this;
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  });
  return metric;
};
var counter5 = (name, options3) => fromMetricKey(counter2(name, options3));
var fromMetricKey = (key2) => {
  let untaggedHook;
  const hookCache = /* @__PURE__ */ new WeakMap();
  const hook = (extraTags) => {
    if (extraTags.length === 0) {
      if (untaggedHook !== void 0) {
        return untaggedHook;
      }
      untaggedHook = globalMetricRegistry.get(key2);
      return untaggedHook;
    }
    let hook2 = hookCache.get(extraTags);
    if (hook2 !== void 0) {
      return hook2;
    }
    hook2 = globalMetricRegistry.get(taggedWithLabels(key2, extraTags));
    hookCache.set(extraTags, hook2);
    return hook2;
  };
  return make32(key2.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get());
};
var histogram5 = (name, boundaries, description) => fromMetricKey(histogram2(name, boundaries, description));
var tagged = /* @__PURE__ */ dual(3, (self, key2, value5) => taggedWithLabels2(self, [make29(key2, value5)]));
var taggedWithLabels2 = /* @__PURE__ */ dual(2, (self, extraTags) => {
  return make32(self.keyType, (input, extraTags1) => self.unsafeUpdate(input, union(extraTags, extraTags1)), (extraTags1) => self.unsafeValue(union(extraTags, extraTags1)));
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/request.js
var RequestSymbolKey = "effect/Request";
var RequestTypeId = /* @__PURE__ */ Symbol.for(RequestSymbolKey);
var requestVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
var RequestPrototype = {
  ...StructuralPrototype,
  [RequestTypeId]: requestVariance
};
var complete = /* @__PURE__ */ dual(2, (self, result) => fiberRefGetWith(currentRequestMap, (map27) => sync(() => {
  if (map27.has(self)) {
    const entry = map27.get(self);
    if (!entry.state.completed) {
      entry.state.completed = true;
      deferredUnsafeDone(entry.result, result);
    }
  }
})));
var Listeners = class {
  count = 0;
  observers = /* @__PURE__ */ new Set();
  addObserver(f) {
    this.observers.add(f);
  }
  removeObserver(f) {
    this.observers.delete(f);
  }
  increment() {
    this.count++;
    this.observers.forEach((f) => f(this.count));
  }
  decrement() {
    this.count--;
    this.observers.forEach((f) => f(this.count));
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/redBlackTree/iterator.js
var Direction = {
  Forward: 0,
  Backward: 1 << 0
};
var RedBlackTreeIterator = class _RedBlackTreeIterator {
  self;
  stack;
  direction;
  count = 0;
  constructor(self, stack, direction) {
    this.self = self;
    this.stack = stack;
    this.direction = direction;
  }
  /**
   * Clones the iterator
   */
  clone() {
    return new _RedBlackTreeIterator(this.self, this.stack.slice(), this.direction);
  }
  /**
   * Reverse the traversal direction
   */
  reversed() {
    return new _RedBlackTreeIterator(this.self, this.stack.slice(), this.direction === Direction.Forward ? Direction.Backward : Direction.Forward);
  }
  /**
   * Iterator next
   */
  next() {
    const entry = this.entry;
    this.count++;
    if (this.direction === Direction.Forward) {
      this.moveNext();
    } else {
      this.movePrev();
    }
    switch (entry._tag) {
      case "None": {
        return {
          done: true,
          value: this.count
        };
      }
      case "Some": {
        return {
          done: false,
          value: entry.value
        };
      }
    }
  }
  /**
   * Returns the key
   */
  get key() {
    if (this.stack.length > 0) {
      return some2(this.stack[this.stack.length - 1].key);
    }
    return none2();
  }
  /**
   * Returns the value
   */
  get value() {
    if (this.stack.length > 0) {
      return some2(this.stack[this.stack.length - 1].value);
    }
    return none2();
  }
  /**
   * Returns the key
   */
  get entry() {
    return map(last(this.stack), (node) => [node.key, node.value]);
  }
  /**
   * Returns the position of this iterator in the sorted list
   */
  get index() {
    let idx = 0;
    const stack = this.stack;
    if (stack.length === 0) {
      const r = this.self._root;
      if (r != null) {
        return r.count;
      }
      return 0;
    } else if (stack[stack.length - 1].left != null) {
      idx = stack[stack.length - 1].left.count;
    }
    for (let s = stack.length - 2; s >= 0; --s) {
      if (stack[s + 1] === stack[s].right) {
        ;
        ++idx;
        if (stack[s].left != null) {
          idx += stack[s].left.count;
        }
      }
    }
    return idx;
  }
  /**
   * Advances iterator to next element in list
   */
  moveNext() {
    const stack = this.stack;
    if (stack.length === 0) {
      return;
    }
    let n = stack[stack.length - 1];
    if (n.right != null) {
      n = n.right;
      while (n != null) {
        stack.push(n);
        n = n.left;
      }
    } else {
      stack.pop();
      while (stack.length > 0 && stack[stack.length - 1].right === n) {
        n = stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  /**
   * Checks if there is a next element
   */
  get hasNext() {
    const stack = this.stack;
    if (stack.length === 0) {
      return false;
    }
    if (stack[stack.length - 1].right != null) {
      return true;
    }
    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].left === stack[s]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Advances iterator to previous element in list
   */
  movePrev() {
    const stack = this.stack;
    if (stack.length === 0) {
      return;
    }
    let n = stack[stack.length - 1];
    if (n != null && n.left != null) {
      n = n.left;
      while (n != null) {
        stack.push(n);
        n = n.right;
      }
    } else {
      stack.pop();
      while (stack.length > 0 && stack[stack.length - 1].left === n) {
        n = stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  /**
   * Checks if there is a previous element
   */
  get hasPrev() {
    const stack = this.stack;
    if (stack.length === 0) {
      return false;
    }
    if (stack[stack.length - 1].left != null) {
      return true;
    }
    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].right === stack[s]) {
        return true;
      }
    }
    return false;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/redBlackTree/node.js
var Color = {
  Red: 0,
  Black: 1 << 0
};
var Node = class {
  color;
  key;
  value;
  left;
  right;
  count;
  constructor(color3, key2, value5, left3, right3, count3) {
    this.color = color3;
    this.key = key2;
    this.value = value5;
    this.left = left3;
    this.right = right3;
    this.count = count3;
  }
};
function clone(node) {
  return new Node(node.color, node.key, node.value, node.left, node.right, node.count);
}
function swap2(n, v) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n.color = v.color;
  n.count = v.count;
}
function repaint(node, color3) {
  return new Node(color3, node.key, node.value, node.left, node.right, node.count);
}
function recount(node) {
  node.count = 1 + (node.left?.count ?? 0) + (node.right?.count ?? 0);
}

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/redBlackTree.js
var RedBlackTreeSymbolKey = "effect/RedBlackTree";
var RedBlackTreeTypeId = /* @__PURE__ */ Symbol.for(RedBlackTreeSymbolKey);
var redBlackTreeVariance = {
  /* c8 ignore next */
  _Key: (_) => _,
  /* c8 ignore next */
  _Value: (_) => _
};
var RedBlackTreeProto = {
  [RedBlackTreeTypeId]: redBlackTreeVariance,
  [symbol]() {
    let hash2 = hash(RedBlackTreeSymbolKey);
    for (const item of this) {
      hash2 ^= pipe(hash(item[0]), combine(hash(item[1])));
    }
    return hash2;
  },
  [symbol2](that) {
    if (isRedBlackTree(that)) {
      if ((this._root?.count ?? 0) !== (that._root?.count ?? 0)) {
        return false;
      }
      const entries2 = Array.from(that);
      return Array.from(this).every((itemSelf, i) => {
        const itemThat = entries2[i];
        return equals(itemSelf[0], itemThat[0]) && equals(itemSelf[1], itemThat[1]);
      });
    }
    return false;
  },
  [Symbol.iterator]() {
    const stack = [];
    let n = this._root;
    while (n != null) {
      stack.push(n);
      n = n.left;
    }
    return new RedBlackTreeIterator(this, stack, Direction.Forward);
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "RedBlackTree",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeImpl3 = (ord, root) => {
  const tree = Object.create(RedBlackTreeProto);
  tree._ord = ord;
  tree._root = root;
  return tree;
};
var isRedBlackTree = (u) => hasProperty(u, RedBlackTreeTypeId);
var findFirst4 = /* @__PURE__ */ dual(2, (self, key2) => {
  const cmp = self._ord;
  let node = self._root;
  while (node !== void 0) {
    const d = cmp(key2, node.key);
    if (equals(key2, node.key)) {
      return some2(node.value);
    }
    if (d <= 0) {
      node = node.left;
    } else {
      node = node.right;
    }
  }
  return none2();
});
var has5 = /* @__PURE__ */ dual(2, (self, key2) => isSome2(findFirst4(self, key2)));
var insert = /* @__PURE__ */ dual(3, (self, key2, value5) => {
  const cmp = self._ord;
  let n = self._root;
  const n_stack = [];
  const d_stack = [];
  while (n != null) {
    const d = cmp(key2, n.key);
    n_stack.push(n);
    d_stack.push(d);
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  n_stack.push(new Node(Color.Red, key2, value5, void 0, void 0, 1));
  for (let s = n_stack.length - 2; s >= 0; --s) {
    const n2 = n_stack[s];
    if (d_stack[s] <= 0) {
      n_stack[s] = new Node(n2.color, n2.key, n2.value, n_stack[s + 1], n2.right, n2.count + 1);
    } else {
      n_stack[s] = new Node(n2.color, n2.key, n2.value, n2.left, n_stack[s + 1], n2.count + 1);
    }
  }
  for (let s = n_stack.length - 1; s > 1; --s) {
    const p2 = n_stack[s - 1];
    const n3 = n_stack[s];
    if (p2.color === Color.Black || n3.color === Color.Black) {
      break;
    }
    const pp = n_stack[s - 2];
    if (pp.left === p2) {
      if (p2.left === n3) {
        const y = pp.right;
        if (y && y.color === Color.Red) {
          p2.color = Color.Black;
          pp.right = repaint(y, Color.Black);
          pp.color = Color.Red;
          s -= 1;
        } else {
          pp.color = Color.Red;
          pp.left = p2.right;
          p2.color = Color.Black;
          p2.right = pp;
          n_stack[s - 2] = p2;
          n_stack[s - 1] = n3;
          recount(pp);
          recount(p2);
          if (s >= 3) {
            const ppp = n_stack[s - 3];
            if (ppp.left === pp) {
              ppp.left = p2;
            } else {
              ppp.right = p2;
            }
          }
          break;
        }
      } else {
        const y = pp.right;
        if (y && y.color === Color.Red) {
          p2.color = Color.Black;
          pp.right = repaint(y, Color.Black);
          pp.color = Color.Red;
          s -= 1;
        } else {
          p2.right = n3.left;
          pp.color = Color.Red;
          pp.left = n3.right;
          n3.color = Color.Black;
          n3.left = p2;
          n3.right = pp;
          n_stack[s - 2] = n3;
          n_stack[s - 1] = p2;
          recount(pp);
          recount(p2);
          recount(n3);
          if (s >= 3) {
            const ppp = n_stack[s - 3];
            if (ppp.left === pp) {
              ppp.left = n3;
            } else {
              ppp.right = n3;
            }
          }
          break;
        }
      }
    } else {
      if (p2.right === n3) {
        const y = pp.left;
        if (y && y.color === Color.Red) {
          p2.color = Color.Black;
          pp.left = repaint(y, Color.Black);
          pp.color = Color.Red;
          s -= 1;
        } else {
          pp.color = Color.Red;
          pp.right = p2.left;
          p2.color = Color.Black;
          p2.left = pp;
          n_stack[s - 2] = p2;
          n_stack[s - 1] = n3;
          recount(pp);
          recount(p2);
          if (s >= 3) {
            const ppp = n_stack[s - 3];
            if (ppp.right === pp) {
              ppp.right = p2;
            } else {
              ppp.left = p2;
            }
          }
          break;
        }
      } else {
        const y = pp.left;
        if (y && y.color === Color.Red) {
          p2.color = Color.Black;
          pp.left = repaint(y, Color.Black);
          pp.color = Color.Red;
          s -= 1;
        } else {
          p2.left = n3.right;
          pp.color = Color.Red;
          pp.right = n3.left;
          n3.color = Color.Black;
          n3.right = p2;
          n3.left = pp;
          n_stack[s - 2] = n3;
          n_stack[s - 1] = p2;
          recount(pp);
          recount(p2);
          recount(n3);
          if (s >= 3) {
            const ppp = n_stack[s - 3];
            if (ppp.right === pp) {
              ppp.right = n3;
            } else {
              ppp.left = n3;
            }
          }
          break;
        }
      }
    }
  }
  n_stack[0].color = Color.Black;
  return makeImpl3(self._ord, n_stack[0]);
});
var keysForward = (self) => keys3(self, Direction.Forward);
var keys3 = (self, direction) => {
  const begin = self[Symbol.iterator]();
  let count3 = 0;
  return {
    [Symbol.iterator]: () => keys3(self, direction),
    next: () => {
      count3++;
      const entry = begin.key;
      if (direction === Direction.Forward) {
        begin.moveNext();
      } else {
        begin.movePrev();
      }
      switch (entry._tag) {
        case "None": {
          return {
            done: true,
            value: count3
          };
        }
        case "Some": {
          return {
            done: false,
            value: entry.value
          };
        }
      }
    }
  };
};
var removeFirst = /* @__PURE__ */ dual(2, (self, key2) => {
  if (!has5(self, key2)) {
    return self;
  }
  const ord = self._ord;
  const cmp = ord;
  let node = self._root;
  const stack = [];
  while (node !== void 0) {
    const d = cmp(key2, node.key);
    stack.push(node);
    if (equals(key2, node.key)) {
      node = void 0;
    } else if (d <= 0) {
      node = node.left;
    } else {
      node = node.right;
    }
  }
  if (stack.length === 0) {
    return self;
  }
  const cstack = new Array(stack.length);
  let n = stack[stack.length - 1];
  cstack[cstack.length - 1] = new Node(n.color, n.key, n.value, n.left, n.right, n.count);
  for (let i = stack.length - 2; i >= 0; --i) {
    n = stack[i];
    if (n.left === stack[i + 1]) {
      cstack[i] = new Node(n.color, n.key, n.value, cstack[i + 1], n.right, n.count);
    } else {
      cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count);
    }
  }
  n = cstack[cstack.length - 1];
  if (n.left !== void 0 && n.right !== void 0) {
    const split2 = cstack.length;
    n = n.left;
    while (n.right != null) {
      cstack.push(n);
      n = n.right;
    }
    const v = cstack[split2 - 1];
    cstack.push(new Node(n.color, v.key, v.value, n.left, n.right, n.count));
    cstack[split2 - 1].key = n.key;
    cstack[split2 - 1].value = n.value;
    for (let i = cstack.length - 2; i >= split2; --i) {
      n = cstack[i];
      cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count);
    }
    cstack[split2 - 1].left = cstack[split2];
  }
  n = cstack[cstack.length - 1];
  if (n.color === Color.Red) {
    const p2 = cstack[cstack.length - 2];
    if (p2.left === n) {
      p2.left = void 0;
    } else if (p2.right === n) {
      p2.right = void 0;
    }
    cstack.pop();
    for (let i = 0; i < cstack.length; ++i) {
      cstack[i].count--;
    }
    return makeImpl3(ord, cstack[0]);
  } else {
    if (n.left !== void 0 || n.right !== void 0) {
      if (n.left !== void 0) {
        swap2(n, n.left);
      } else if (n.right !== void 0) {
        swap2(n, n.right);
      }
      n.color = Color.Black;
      for (let i = 0; i < cstack.length - 1; ++i) {
        cstack[i].count--;
      }
      return makeImpl3(ord, cstack[0]);
    } else if (cstack.length === 1) {
      return makeImpl3(ord, void 0);
    } else {
      for (let i = 0; i < cstack.length; ++i) {
        cstack[i].count--;
      }
      const parent = cstack[cstack.length - 2];
      fixDoubleBlack(cstack);
      if (parent.left === n) {
        parent.left = void 0;
      } else {
        parent.right = void 0;
      }
    }
  }
  return makeImpl3(ord, cstack[0]);
});
var fixDoubleBlack = (stack) => {
  let n, p2, s, z;
  for (let i = stack.length - 1; i >= 0; --i) {
    n = stack[i];
    if (i === 0) {
      n.color = Color.Black;
      return;
    }
    p2 = stack[i - 1];
    if (p2.left === n) {
      s = p2.right;
      if (s !== void 0 && s.right !== void 0 && s.right.color === Color.Red) {
        s = p2.right = clone(s);
        z = s.right = clone(s.right);
        p2.right = s.left;
        s.left = p2;
        s.right = z;
        s.color = p2.color;
        n.color = Color.Black;
        p2.color = Color.Black;
        z.color = Color.Black;
        recount(p2);
        recount(s);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.left === p2) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i - 1] = s;
        return;
      } else if (s !== void 0 && s.left !== void 0 && s.left.color === Color.Red) {
        s = p2.right = clone(s);
        z = s.left = clone(s.left);
        p2.right = z.left;
        s.left = z.right;
        z.left = p2;
        z.right = s;
        z.color = p2.color;
        p2.color = Color.Black;
        s.color = Color.Black;
        n.color = Color.Black;
        recount(p2);
        recount(s);
        recount(z);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.left === p2) {
            pp.left = z;
          } else {
            pp.right = z;
          }
        }
        stack[i - 1] = z;
        return;
      }
      if (s !== void 0 && s.color === Color.Black) {
        if (p2.color === Color.Red) {
          p2.color = Color.Black;
          p2.right = repaint(s, Color.Red);
          return;
        } else {
          p2.right = repaint(s, Color.Red);
          continue;
        }
      } else if (s !== void 0) {
        s = clone(s);
        p2.right = s.left;
        s.left = p2;
        s.color = p2.color;
        p2.color = Color.Red;
        recount(p2);
        recount(s);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.left === p2) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i - 1] = s;
        stack[i] = p2;
        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }
        i = i + 2;
      }
    } else {
      s = p2.left;
      if (s !== void 0 && s.left !== void 0 && s.left.color === Color.Red) {
        s = p2.left = clone(s);
        z = s.left = clone(s.left);
        p2.left = s.right;
        s.right = p2;
        s.left = z;
        s.color = p2.color;
        n.color = Color.Black;
        p2.color = Color.Black;
        z.color = Color.Black;
        recount(p2);
        recount(s);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.right === p2) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i - 1] = s;
        return;
      } else if (s !== void 0 && s.right !== void 0 && s.right.color === Color.Red) {
        s = p2.left = clone(s);
        z = s.right = clone(s.right);
        p2.left = z.right;
        s.right = z.left;
        z.right = p2;
        z.left = s;
        z.color = p2.color;
        p2.color = Color.Black;
        s.color = Color.Black;
        n.color = Color.Black;
        recount(p2);
        recount(s);
        recount(z);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.right === p2) {
            pp.right = z;
          } else {
            pp.left = z;
          }
        }
        stack[i - 1] = z;
        return;
      }
      if (s !== void 0 && s.color === Color.Black) {
        if (p2.color === Color.Red) {
          p2.color = Color.Black;
          p2.left = repaint(s, Color.Red);
          return;
        } else {
          p2.left = repaint(s, Color.Red);
          continue;
        }
      } else if (s !== void 0) {
        s = clone(s);
        p2.left = s.right;
        s.right = p2;
        s.color = p2.color;
        p2.color = Color.Red;
        recount(p2);
        recount(s);
        if (i > 1) {
          const pp = stack[i - 2];
          if (pp.right === p2) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i - 1] = s;
        stack[i] = p2;
        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }
        i = i + 2;
      }
    }
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/RedBlackTree.js
var has6 = has5;
var insert2 = insert;
var keys4 = keysForward;
var removeFirst2 = removeFirst;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/SortedSet.js
var TypeId13 = /* @__PURE__ */ Symbol.for("effect/SortedSet");
var SortedSetProto = {
  [TypeId13]: {
    _A: (_) => _
  },
  [symbol]() {
    return pipe(hash(this.keyTree), combine(hash(TypeId13)));
  },
  [symbol2](that) {
    return isSortedSet(that) && equals(this.keyTree, that.keyTree);
  },
  [Symbol.iterator]() {
    return keys4(this.keyTree);
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "SortedSet",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var fromTree = (keyTree) => {
  const a = Object.create(SortedSetProto);
  a.keyTree = keyTree;
  return a;
};
var isSortedSet = (u) => hasProperty(u, TypeId13);
var add5 = /* @__PURE__ */ dual(2, (self, value5) => has6(self.keyTree, value5) ? self : fromTree(insert2(self.keyTree, value5, true)));
var remove7 = /* @__PURE__ */ dual(2, (self, value5) => fromTree(removeFirst2(self.keyTree, value5)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/supervisor.js
var SupervisorSymbolKey = "effect/Supervisor";
var SupervisorTypeId = /* @__PURE__ */ Symbol.for(SupervisorSymbolKey);
var supervisorVariance = {
  /* c8 ignore next */
  _T: (_) => _
};
var ProxySupervisor = class _ProxySupervisor {
  underlying;
  value0;
  [SupervisorTypeId] = supervisorVariance;
  constructor(underlying, value0) {
    this.underlying = underlying;
    this.value0 = value0;
  }
  get value() {
    return this.value0;
  }
  onStart(context6, effect2, parent, fiber) {
    this.underlying.onStart(context6, effect2, parent, fiber);
  }
  onEnd(value5, fiber) {
    this.underlying.onEnd(value5, fiber);
  }
  onEffect(fiber, effect2) {
    this.underlying.onEffect(fiber, effect2);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new _ProxySupervisor(this, pipe(this.value, map9(f)));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
};
var Zip = class _Zip {
  left;
  right;
  _tag = "Zip";
  [SupervisorTypeId] = supervisorVariance;
  constructor(left3, right3) {
    this.left = left3;
    this.right = right3;
  }
  get value() {
    return zip2(this.left.value, this.right.value);
  }
  onStart(context6, effect2, parent, fiber) {
    this.left.onStart(context6, effect2, parent, fiber);
    this.right.onStart(context6, effect2, parent, fiber);
  }
  onEnd(value5, fiber) {
    this.left.onEnd(value5, fiber);
    this.right.onEnd(value5, fiber);
  }
  onEffect(fiber, effect2) {
    this.left.onEffect(fiber, effect2);
    this.right.onEffect(fiber, effect2);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map9(f)));
  }
  zip(right3) {
    return new _Zip(this, right3);
  }
};
var isZip = (self) => hasProperty(self, SupervisorTypeId) && isTagged(self, "Zip");
var Track = class {
  [SupervisorTypeId] = supervisorVariance;
  fibers = /* @__PURE__ */ new Set();
  get value() {
    return sync(() => Array.from(this.fibers));
  }
  onStart(_context, _effect, _parent, fiber) {
    this.fibers.add(fiber);
  }
  onEnd(_value, fiber) {
    this.fibers.delete(fiber);
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map9(f)));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, _fiber) {
    return execution();
  }
};
var Const = class {
  effect;
  [SupervisorTypeId] = supervisorVariance;
  constructor(effect2) {
    this.effect = effect2;
  }
  get value() {
    return this.effect;
  }
  onStart(_context, _effect, _parent, _fiber) {
  }
  onEnd(_value, _fiber) {
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map9(f)));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, _fiber) {
    return execution();
  }
};
var FibersIn = class {
  ref;
  [SupervisorTypeId] = supervisorVariance;
  constructor(ref) {
    this.ref = ref;
  }
  get value() {
    return sync(() => get6(this.ref));
  }
  onStart(_context, _effect, _parent, fiber) {
    pipe(this.ref, set2(pipe(get6(this.ref), add5(fiber))));
  }
  onEnd(_value, fiber) {
    pipe(this.ref, set2(pipe(get6(this.ref), remove7(fiber))));
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map9(f)));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, _fiber) {
    return execution();
  }
};
var unsafeTrack = () => {
  return new Track();
};
var track = /* @__PURE__ */ sync(unsafeTrack);
var fromEffect = (effect2) => {
  return new Const(effect2);
};
var none8 = /* @__PURE__ */ globalValue("effect/Supervisor/none", () => fromEffect(unit));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Differ.js
var make34 = make14;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/supervisor/patch.js
var OP_EMPTY3 = "Empty";
var OP_ADD_SUPERVISOR = "AddSupervisor";
var OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
var OP_AND_THEN2 = "AndThen";
var empty25 = {
  _tag: OP_EMPTY3
};
var combine8 = (self, that) => {
  return {
    _tag: OP_AND_THEN2,
    first: self,
    second: that
  };
};
var patch8 = (self, supervisor) => {
  return patchLoop(supervisor, of2(self));
};
var patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    switch (head6._tag) {
      case OP_EMPTY3: {
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_ADD_SUPERVISOR: {
        supervisor = supervisor.zip(head6.supervisor);
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_REMOVE_SUPERVISOR: {
        supervisor = removeSupervisor(supervisor, head6.supervisor);
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_AND_THEN2: {
        patches = prepend2(head6.first)(prepend2(head6.second)(tailNonEmpty2(patches)));
        break;
      }
    }
  }
  return supervisor;
};
var removeSupervisor = (self, that) => {
  if (equals(self, that)) {
    return none8;
  } else {
    if (isZip(self)) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
var toSet2 = (self) => {
  if (equals(self, none8)) {
    return empty7();
  } else {
    if (isZip(self)) {
      return pipe(toSet2(self.left), union3(toSet2(self.right)));
    } else {
      return make10(self);
    }
  }
};
var diff7 = (oldValue, newValue) => {
  if (equals(oldValue, newValue)) {
    return empty25;
  }
  const oldSupervisors = toSet2(oldValue);
  const newSupervisors = toSet2(newValue);
  const added = pipe(newSupervisors, difference2(oldSupervisors), reduce5(empty25, (patch9, supervisor) => combine8(patch9, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  })));
  const removed = pipe(oldSupervisors, difference2(newSupervisors), reduce5(empty25, (patch9, supervisor) => combine8(patch9, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  })));
  return combine8(added, removed);
};
var differ2 = /* @__PURE__ */ make34({
  empty: empty25,
  patch: patch8,
  combine: combine8,
  diff: diff7
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/fiberRuntime.js
var fiberStarted = /* @__PURE__ */ counter5("effect_fiber_started");
var fiberActive = /* @__PURE__ */ counter5("effect_fiber_active");
var fiberSuccesses = /* @__PURE__ */ counter5("effect_fiber_successes");
var fiberFailures = /* @__PURE__ */ counter5("effect_fiber_failures");
var fiberLifetimes = /* @__PURE__ */ tagged(/* @__PURE__ */ histogram5("effect_fiber_lifetimes", /* @__PURE__ */ exponential({
  start: 0.5,
  factor: 2,
  count: 35
})), "time_unit", "milliseconds");
var EvaluationSignalContinue = "Continue";
var EvaluationSignalDone = "Done";
var EvaluationSignalYieldNow = "Yield";
var runtimeFiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
var absurd = (_) => {
  throw new Error(`BUG: FiberRuntime - ${JSON.stringify(_)} - please report an issue at https://github.com/Effect-TS/effect/issues`);
};
var YieldedOp = /* @__PURE__ */ Symbol.for("effect/internal/fiberRuntime/YieldedOp");
var yieldedOpChannel = /* @__PURE__ */ globalValue("effect/internal/fiberRuntime/yieldedOpChannel", () => ({
  currentOp: null
}));
var contOpSuccess = {
  [OP_ON_SUCCESS]: (_, cont, value5) => {
    return cont.i1(value5);
  },
  ["OnStep"]: (_, _cont, value5) => {
    return exitSucceed(exitSucceed(value5));
  },
  [OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value5) => {
    return cont.i2(value5);
  },
  [OP_REVERT_FLAGS]: (self, cont, value5) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch);
    if (interruptible(self._runtimeFlags) && self.isInterrupted()) {
      return exitFailCause(self.getInterruptedCause());
    } else {
      return exitSucceed(value5);
    }
  },
  [OP_WHILE]: (self, cont, value5) => {
    cont.i2(value5);
    if (cont.i0()) {
      self.pushStack(cont);
      return cont.i1();
    } else {
      return unit;
    }
  }
};
var drainQueueWhileRunningTable = {
  [OP_INTERRUPT_SIGNAL]: (self, runtimeFlags2, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return interruptible(runtimeFlags2) ? exitFailCause(message.cause) : cur;
  },
  [OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [OP_STATEFUL]: (self, runtimeFlags2, cur, message) => {
    message.onFiber(self, running2(runtimeFlags2));
    return cur;
  },
  [OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return flatMap7(yieldNow(), () => cur);
  }
};
var runBlockedRequests = (self) => forEachSequentialDiscard(flatten2(self), (requestsByRequestResolver) => forEachConcurrentDiscard(sequentialCollectionToChunk(requestsByRequestResolver), ([dataSource, sequential4]) => {
  const map27 = /* @__PURE__ */ new Map();
  for (const block of sequential4) {
    for (const entry of block) {
      map27.set(entry.request, entry);
    }
  }
  return fiberRefLocally(invokeWithInterrupt(dataSource.runAll(sequential4), sequential4.flat()), currentRequestMap, map27);
}, false, false));
var FiberRuntime = class {
  [FiberTypeId] = fiberVariance;
  [RuntimeFiberTypeId] = runtimeFiberVariance;
  pipe() {
    return pipeArguments(this, arguments);
  }
  _fiberRefs;
  _fiberId;
  _runtimeFlags;
  _queue = new Array();
  _children = null;
  _observers = new Array();
  _running = false;
  _stack = [];
  _asyncInterruptor = null;
  _asyncBlockingOn = null;
  _exitValue = null;
  _steps = [];
  _supervisor;
  _scheduler;
  _tracer;
  currentOpCount = 0;
  isYielding = false;
  constructor(fiberId3, fiberRefs0, runtimeFlags0) {
    this._runtimeFlags = runtimeFlags0;
    this._fiberId = fiberId3;
    this._fiberRefs = fiberRefs0;
    this._supervisor = this.getFiberRef(currentSupervisor);
    this._scheduler = this.getFiberRef(currentScheduler);
    if (runtimeMetrics(runtimeFlags0)) {
      const tags2 = this.getFiberRef(currentMetricLabels);
      fiberStarted.unsafeUpdate(1, tags2);
      fiberActive.unsafeUpdate(1, tags2);
    }
    this._tracer = get3(this.getFiberRef(currentServices), tracerTag);
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(effect2) {
    this.tell(resume(effect2));
  }
  /**
   * The status of the fiber.
   */
  get status() {
    return this.ask((_, status2) => status2);
  }
  /**
   * Gets the fiber runtime flags.
   */
  get runtimeFlags() {
    return this.ask((state, status2) => {
      if (isDone3(status2)) {
        return state._runtimeFlags;
      }
      return status2.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return unsafeMake6(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  get children() {
    return this.ask((fiber) => Array.from(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = /* @__PURE__ */ new Set();
    }
    return this._children;
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(currentInterruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((fiber) => fiber.getFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return suspend(() => {
      const deferred = deferredUnsafeMake(this._fiberId);
      this.tell(stateful((fiber, status2) => {
        deferredUnsafeDone(deferred, sync(() => f(fiber, status2)));
      }));
      return deferredAwait(deferred);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    this._queue.push(message);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  get await() {
    return async((resume2) => {
      const cb = (exit3) => resume2(succeed(exit3));
      this.tell(stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.addObserver(cb);
        }
      }));
      return sync(() => this.tell(stateful((fiber, _) => {
        fiber.removeObserver(cb);
      })));
    }, this.id());
  }
  get inheritAll() {
    return withFiberRuntime((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.getFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.getFiberRefs();
      const updatedFiberRefs = joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch9 = pipe(
        diff4(parentRuntimeFlags, updatedRuntimeFlags),
        // Do not inherit WindDown or Interruption!
        exclude2(Interruption),
        exclude2(WindDown)
      );
      return updateRuntimeFlags(patch9);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  get poll() {
    return sync(() => fromNullable(this._exitValue));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId3) {
    return sync(() => this.tell(interruptSignal(interrupt(fiberId3))));
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  unsafeInterruptAsFork(fiberId3) {
    this.tell(interruptSignal(interrupt(fiberId3)));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeObserver(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    if (this._fiberRefs.locals.has(fiberRef)) {
      return this._fiberRefs.locals.get(fiberRef)[0][1];
    }
    return fiberRef.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value5) {
    this._fiberRefs = updateAs(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef,
      value: value5
    });
    this.refreshRefCache();
  }
  refreshRefCache() {
    this._tracer = get3(this.getFiberRef(currentServices), tracerTag);
    this._supervisor = this.getFiberRef(currentSupervisor);
    this._scheduler = this.getFiberRef(currentScheduler);
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs3) {
    this._fiberRefs = fiberRefs3;
    this.refreshRefCache();
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = this._queue.length === 0 ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
        }
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
      }
      if (this._queue.length > 0 && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this._scheduler.scheduleTask(this.run, this.getFiberRef(currentSchedulingPriority));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags2, cur0) {
    let cur = cur0;
    while (this._queue.length > 0) {
      const message = this._queue.splice(0, 1)[0];
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags2, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !isEmpty5(this.getFiberRef(currentInterruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause3) {
    const oldSC = this.getFiberRef(currentInterruptedCause);
    this.setFiberRef(currentInterruptedCause, sequential(oldSC, cause3));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause3) {
    this.addInterruptedCause(cause3);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(interruptSignal(interrupt(this.id())));
      told = true;
    }
    return told;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children.values();
      this._children = null;
      let isDone6 = false;
      const body = () => {
        const next = it.next();
        if (!next.done) {
          return asUnit(next.value.await);
        } else {
          return sync(() => {
            isDone6 = true;
          });
        }
      };
      return whileLoop({
        while: () => !isDone6,
        body,
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(exit3) {
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags2 = this.getFiberRef(currentMetricLabels);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = Date.now();
      fiberLifetimes.unsafeUpdate(endTimeMillis - startTimeMillis, tags2);
      fiberActive.unsafeUpdate(-1, tags2);
      switch (exit3._tag) {
        case OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags2);
          break;
        }
        case OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags2);
          break;
        }
      }
    }
    if (exit3._tag === "Failure") {
      const level = this.getFiberRef(currentUnhandledErrorLogLevel);
      if (!isInterruptedOnly(exit3.cause) && level._tag === "Some") {
        this.log("Fiber terminated with a non handled error", exit3.cause, level);
      }
    }
  }
  setExitValue(exit3) {
    this._exitValue = exit3;
    this.reportExitValue(exit3);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit3);
    }
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause3, overrideLogLevel) {
    const logLevel = isSome2(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(currentLogLevel);
    const minimumLogLevel = this.getFiberRef(currentMinimumLogLevel);
    if (greaterThan2(minimumLogLevel, logLevel)) {
      return;
    }
    const spans2 = this.getFiberRef(currentLogSpan);
    const annotations2 = this.getFiberRef(currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.getFiberRefs();
    if (size3(loggers) > 0) {
      const clockService = get3(this.getFiberRef(currentServices), clockTag);
      const date5 = new Date(clockService.unsafeCurrentTimeMillis());
      for (const logger of loggers) {
        logger.log({
          fiberId: this.id(),
          logLevel,
          message,
          cause: cause3,
          context: contextMap,
          spans: spans2,
          annotations: annotations2,
          date: date5
        });
      }
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case OP_YIELD_NOW: {
        return EvaluationSignalYieldNow;
      }
      case OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause);
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(exitFailCause(message.cause));
          this._asyncInterruptor = null;
        }
        return EvaluationSignalContinue;
      }
      case OP_RESUME: {
        this._asyncInterruptor = null;
        this._asyncBlockingOn = null;
        this.evaluateEffect(message.effect);
        return EvaluationSignalContinue;
      }
      case OP_STATEFUL: {
        message.onFiber(this, this._exitValue !== null ? done4 : suspended2(this._runtimeFlags, this._asyncBlockingOn));
        return EvaluationSignalContinue;
      }
      default: {
        return absurd(message);
      }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this._supervisor.onResume(this);
    try {
      let effect2 = interruptible(this._runtimeFlags) && this.isInterrupted() ? exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect2 !== null) {
        const eff = effect2;
        const exit3 = this.runLoop(eff);
        if (exit3 === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          yieldedOpChannel.currentOp = null;
          if (op._op === OP_YIELD) {
            if (cooperativeYielding(this._runtimeFlags)) {
              this.tell(yieldNow2());
              this.tell(resume(exitUnit));
              effect2 = null;
            } else {
              effect2 = exitUnit;
            }
          } else if (op._op === OP_ASYNC) {
            effect2 = null;
          }
        } else {
          this._runtimeFlags = pipe(this._runtimeFlags, enable2(WindDown));
          const interruption2 = this.interruptAllChildren();
          if (interruption2 !== null) {
            effect2 = flatMap7(interruption2, () => exit3);
          } else {
            if (this._queue.length === 0) {
              this.setExitValue(exit3);
            } else {
              this.tell(resume(exit3));
            }
            effect2 = null;
          }
        }
      }
    } finally {
      this._supervisor.onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(effect2) {
    if (!this._running) {
      this._running = true;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        this.evaluateEffect(effect2);
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
        if (this._queue.length > 0) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(resume(effect2));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect2) {
    this.tell(resume(effect2));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch9) {
    const newRuntimeFlags = patch4(oldRuntimeFlags, patch9);
    globalThis[currentFiberURI] = this;
    this._runtimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags2, asyncRegister) {
    let alreadyCalled = false;
    const callback = (effect2) => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(resume(effect2));
      }
    };
    if (interruptible(runtimeFlags2)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(failCause(die(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if (cont._op === "OnStep") {
      this._steps.push({
        refs: this.getFiberRefs(),
        flags: this._runtimeFlags
      });
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if (item._op === "OnStep") {
        this._steps.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_FAILURE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_SUCCESS && frame._op !== OP_WHILE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [OP_TAG](op) {
    return map9(fiberRefGet(currentContext), (context6) => unsafeGet3(context6, op));
  }
  ["Left"](op) {
    return fail2(op.left);
  }
  ["None"](_) {
    return fail2(new NoSuchElementException());
  }
  ["Right"](op) {
    return exitSucceed(op.right);
  }
  ["Some"](op) {
    return exitSucceed(op.value);
  }
  [OP_SYNC](op) {
    const value5 = op.i0();
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, value5);
    } else {
      yieldedOpChannel.currentOp = exitSucceed(value5);
      return YieldedOp;
    }
  }
  [OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, oldCur.i0);
    } else {
      yieldedOpChannel.currentOp = oldCur;
      return YieldedOp;
    }
  }
  [OP_FAILURE](op) {
    const cause3 = op.i0;
    const cont = this.getNextFailCont();
    if (cont !== void 0) {
      switch (cont._op) {
        case OP_ON_FAILURE:
        case OP_ON_SUCCESS_AND_FAILURE: {
          if (!(interruptible(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(cause3);
          } else {
            return exitFailCause(stripFailures(cause3));
          }
        }
        case "OnStep": {
          if (!(interruptible(this._runtimeFlags) && this.isInterrupted())) {
            return exitSucceed(exitFailCause(cause3));
          } else {
            return exitFailCause(stripFailures(cause3));
          }
        }
        case OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this._runtimeFlags, cont.patch);
          if (interruptible(this._runtimeFlags) && this.isInterrupted()) {
            return exitFailCause(sequential(cause3, this.getInterruptedCause()));
          } else {
            return exitFailCause(cause3);
          }
        }
        default: {
          absurd(cont);
        }
      }
    } else {
      yieldedOpChannel.currentOp = exitFailCause(cause3);
      return YieldedOp;
    }
  }
  [OP_WITH_RUNTIME](op) {
    return op.i0(this, running2(this._runtimeFlags));
  }
  ["Blocked"](op) {
    const refs = this.getFiberRefs();
    const flags = this._runtimeFlags;
    if (this._steps.length > 0) {
      const frames = [];
      const snap = this._steps[this._steps.length - 1];
      let frame = this.popStack();
      while (frame && frame._op !== "OnStep") {
        frames.push(frame);
        frame = this.popStack();
      }
      this.setFiberRefs(snap.refs);
      this._runtimeFlags = snap.flags;
      const patchRefs = diff6(snap.refs, refs);
      const patchFlags = diff4(snap.flags, flags);
      return exitSucceed(blocked(op.i0, withFiberRuntime((newFiber) => {
        while (frames.length > 0) {
          newFiber.pushStack(frames.pop());
        }
        newFiber.setFiberRefs(patch7(newFiber.id(), newFiber.getFiberRefs())(patchRefs));
        newFiber._runtimeFlags = patch4(patchFlags)(newFiber._runtimeFlags);
        return op.i1;
      })));
    }
    return uninterruptibleMask((restore) => flatMap7(forkDaemon(runRequestBlock(op.i0)), () => restore(op.i1)));
  }
  ["RunBlocked"](op) {
    return runBlockedRequests(op.i0);
  }
  [OP_UPDATE_RUNTIME_FLAGS](op) {
    const updateFlags = op.i0;
    const oldRuntimeFlags = this._runtimeFlags;
    const newRuntimeFlags = patch4(oldRuntimeFlags, updateFlags);
    if (interruptible(newRuntimeFlags) && this.isInterrupted()) {
      return exitFailCause(this.getInterruptedCause());
    } else {
      this.patchRuntimeFlags(this._runtimeFlags, updateFlags);
      if (op.i1) {
        const revertFlags = diff4(newRuntimeFlags, oldRuntimeFlags);
        this.pushStack(new RevertFlags(revertFlags, op));
        return op.i1(oldRuntimeFlags);
      } else {
        return exitUnit;
      }
    }
  }
  [OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.i0;
  }
  ["OnStep"](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ASYNC](op) {
    this._asyncBlockingOn = op.i1;
    this.initiateAsync(this._runtimeFlags, op.i0);
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_YIELD](op) {
    this.isYielding = false;
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_WHILE](op) {
    const check = op.i0;
    const body = op.i1;
    if (check()) {
      this.pushStack(op);
      return body();
    } else {
      return exitUnit;
    }
  }
  [OP_COMMIT](op) {
    return op.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    this.currentOpCount = 0;
    while (true) {
      if ((this._runtimeFlags & OpSupervision) !== 0) {
        this._supervisor.onEffect(this, cur);
      }
      if (this._queue.length > 0) {
        cur = this.drainQueueWhileRunning(this._runtimeFlags, cur);
      }
      if (!this.isYielding) {
        this.currentOpCount += 1;
        const shouldYield = this._scheduler.shouldYield(this);
        if (shouldYield !== false) {
          this.isYielding = true;
          this.currentOpCount = 0;
          const oldCur = cur;
          cur = flatMap7(yieldNow({
            priority: shouldYield
          }), () => oldCur);
        }
      }
      try {
        if (!("_op" in cur) || !(cur._op in this)) {
          absurd(cur);
        }
        cur = this._tracer.context(() => {
          if (moduleVersion !== cur[EffectTypeId3]._V) {
            return dieMessage(`Cannot execute an Effect versioned ${cur[EffectTypeId3]._V} with a Runtime of version ${moduleVersion}`);
          }
          return this[cur._op](cur);
        }, this);
        if (cur === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          if (op._op === OP_YIELD || op._op === OP_ASYNC) {
            return YieldedOp;
          }
          yieldedOpChannel.currentOp = null;
          return op._op === OP_SUCCESS || op._op === OP_FAILURE ? op : exitFailCause(die(op));
        }
      } catch (e) {
        if (isEffectError(e)) {
          cur = exitFailCause(e.cause);
        } else if (isInterruptedException(e)) {
          cur = exitFailCause(sequential(die(e), interrupt(none4)));
        } else {
          cur = exitFailCause(die(e));
        }
      }
    }
  }
  run = () => {
    this.drainQueueOnCurrentThread();
  };
};
var currentMinimumLogLevel = /* @__PURE__ */ globalValue("effect/FiberRef/currentMinimumLogLevel", () => fiberRefUnsafeMake(fromLiteral("Info")));
var getConsole = (refs) => {
  const defaultServicesValue = getOrDefault2(refs, currentServices);
  const cnsl = get3(defaultServicesValue, consoleTag);
  return cnsl.unsafe;
};
var defaultLogger = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/defaultLogger"), () => makeLogger((options3) => {
  const formatted = stringLogger.log(options3);
  getConsole(options3.context).log(formatted);
}));
var tracerLogger = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/tracerLogger"), () => makeLogger(({
  annotations: annotations2,
  cause: cause3,
  context: context6,
  fiberId: fiberId3,
  logLevel,
  message
}) => {
  const span2 = flatMap(get9(context6, currentContext), getOption2(spanTag));
  const clockService = map(get9(context6, currentServices), (_) => get3(_, clockTag));
  if (span2._tag === "None" || span2.value._tag === "ExternalSpan" || clockService._tag === "None") {
    return;
  }
  const attributes = Object.fromEntries(map6(annotations2, (value5) => serializeUnknown(value5)));
  attributes["effect.fiberId"] = threadName2(fiberId3);
  attributes["effect.logLevel"] = logLevel.label;
  if (cause3 !== null && cause3._tag !== "Empty") {
    attributes["effect.cause"] = pretty(cause3);
  }
  span2.value.event(String(message), clockService.value.unsafeCurrentTimeNanos(), attributes);
}));
var currentLoggers = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLoggers"), () => fiberRefUnsafeMakeHashSet(make10(defaultLogger, tracerLogger)));
var acquireRelease = /* @__PURE__ */ dual((args) => isEffect(args[0]), (acquire, release) => {
  return uninterruptible(tap(acquire, (a) => addFinalizer((exit3) => release(a, exit3))));
});
var acquireReleaseInterruptible = /* @__PURE__ */ dual((args) => isEffect(args[0]), (acquire, release) => {
  return ensuring(acquire, addFinalizer((exit3) => release(exit3)));
});
var addFinalizer = (finalizer2) => withFiberRuntime((runtime5) => {
  const acquireRefs = runtime5.getFiberRefs();
  const acquireFlags = runtime5._runtimeFlags;
  return flatMap7(scope, (scope4) => scopeAddFinalizerExit(scope4, (exit3) => withFiberRuntime((runtimeFinalizer) => {
    const preRefs = runtimeFinalizer.getFiberRefs();
    const preFlags = runtimeFinalizer._runtimeFlags;
    const patchRefs = diff6(preRefs, acquireRefs);
    const patchFlags = diff4(preFlags, acquireFlags);
    const inverseRefs = diff6(acquireRefs, preRefs);
    runtimeFinalizer.setFiberRefs(patch7(patchRefs, runtimeFinalizer.id(), acquireRefs));
    return ensuring(withRuntimeFlags(finalizer2(exit3), patchFlags), sync(() => {
      runtimeFinalizer.setFiberRefs(patch7(inverseRefs, runtimeFinalizer.id(), runtimeFinalizer.getFiberRefs()));
    }));
  })));
});
var daemonChildren = (self) => {
  const forkScope = fiberRefLocally(currentForkScopeOverride, some2(globalScope));
  return forkScope(self);
};
var _existsParFound = /* @__PURE__ */ Symbol.for("effect/Effect/existsPar/found");
var exists = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options3) => matchSimple(options3?.concurrency, () => suspend(() => existsLoop(elements[Symbol.iterator](), 0, f)), () => matchEffect(forEach7(elements, (a, i) => if_(f(a, i), {
  onTrue: fail2(_existsParFound),
  onFalse: unit
}), options3), {
  onFailure: (e) => e === _existsParFound ? succeed(true) : fail2(e),
  onSuccess: () => succeed(false)
})));
var existsLoop = (iterator, index2, f) => {
  const next = iterator.next();
  if (next.done) {
    return succeed(false);
  }
  return pipe(flatMap7(f(next.value, index2), (b) => b ? succeed(b) : existsLoop(iterator, index2 + 1, f)));
};
var filter6 = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options3) => {
  const predicate = options3?.negate ? (a, i) => map9(f(a, i), not) : f;
  return matchSimple(options3?.concurrency, () => suspend(() => fromIterable(elements).reduceRight((effect2, a, i) => zipWith2(effect2, suspend(() => predicate(a, i)), (list4, b) => b ? [a, ...list4] : list4), sync(() => new Array()))), () => map9(forEach7(elements, (a, i) => map9(predicate(a, i), (b) => b ? some2(a) : none2()), options3), getSomes));
});
var allResolveInput = (input) => {
  if (Array.isArray(input) || isIterable(input)) {
    return [input, none2()];
  }
  const keys5 = Object.keys(input);
  const size12 = keys5.length;
  return [keys5.map((k) => input[k]), some2((values3) => {
    const res = {};
    for (let i = 0; i < size12; i++) {
      ;
      res[keys5[i]] = values3[i];
    }
    return res;
  })];
};
var allValidate = (effects, reconcile, options3) => {
  const eitherEffects = [];
  for (const effect2 of effects) {
    eitherEffects.push(either2(effect2));
  }
  return flatMap7(forEach7(eitherEffects, identity, {
    concurrency: options3?.concurrency,
    batching: options3?.batching
  }), (eithers) => {
    const none13 = none2();
    const size12 = eithers.length;
    const errors = new Array(size12);
    const successes = new Array(size12);
    let errored = false;
    for (let i = 0; i < size12; i++) {
      const either6 = eithers[i];
      if (either6._tag === "Left") {
        errors[i] = some2(either6.left);
        errored = true;
      } else {
        successes[i] = either6.right;
        errors[i] = none13;
      }
    }
    if (errored) {
      return reconcile._tag === "Some" ? fail2(reconcile.value(errors)) : fail2(errors);
    } else if (options3?.discard) {
      return unit;
    }
    return reconcile._tag === "Some" ? succeed(reconcile.value(successes)) : succeed(successes);
  });
};
var allEither = (effects, reconcile, options3) => {
  const eitherEffects = [];
  for (const effect2 of effects) {
    eitherEffects.push(either2(effect2));
  }
  if (options3?.discard) {
    return forEach7(eitherEffects, identity, {
      concurrency: options3?.concurrency,
      batching: options3?.batching,
      discard: true
    });
  }
  return map9(forEach7(eitherEffects, identity, {
    concurrency: options3?.concurrency,
    batching: options3?.batching
  }), (eithers) => reconcile._tag === "Some" ? reconcile.value(eithers) : eithers);
};
var all4 = (arg, options3) => {
  const [effects, reconcile] = allResolveInput(arg);
  if (options3?.mode === "validate") {
    return allValidate(effects, reconcile, options3);
  } else if (options3?.mode === "either") {
    return allEither(effects, reconcile, options3);
  }
  return reconcile._tag === "Some" ? map9(forEach7(effects, identity, options3), reconcile.value) : forEach7(effects, identity, options3);
};
var allWith = (options3) => (arg) => all4(arg, options3);
var allSuccesses = (elements, options3) => map9(all4(fromIterable(elements).map(exit), options3), filterMap2((exit3) => exitIsSuccess(exit3) ? some2(exit3.i0) : none2()));
var replicate = /* @__PURE__ */ dual(2, (self, n) => Array.from({
  length: n
}, () => self));
var replicateEffect = /* @__PURE__ */ dual((args) => isEffect(args[0]), (self, n, options3) => all4(replicate(self, n), options3));
var forEach7 = /* @__PURE__ */ dual((args) => isIterable(args[0]), (self, f, options3) => withFiberRuntime((r) => {
  const isRequestBatchingEnabled = options3?.batching === true || options3?.batching === "inherit" && r.getFiberRef(currentRequestBatching);
  if (options3?.discard) {
    return match8(options3.concurrency, () => finalizersMask(sequential3)((restore) => isRequestBatchingEnabled ? forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), true, false, 1) : forEachSequentialDiscard(self, (a, i) => restore(f(a, i)))), () => finalizersMask(parallel3)((restore) => forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled, false)), (n) => finalizersMask(parallelN2(n))((restore) => forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled, false, n)));
  }
  return match8(options3?.concurrency, () => finalizersMask(sequential3)((restore) => isRequestBatchingEnabled ? forEachParN(self, 1, (a, i) => restore(f(a, i)), true) : forEachSequential(self, (a, i) => restore(f(a, i)))), () => finalizersMask(parallel3)((restore) => forEachParUnbounded(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled)), (n) => finalizersMask(parallelN2(n))((restore) => forEachParN(self, n, (a, i) => restore(f(a, i)), isRequestBatchingEnabled)));
}));
var forEachParUnbounded = (self, f, batching) => suspend(() => {
  const as7 = fromIterable(self);
  const array6 = new Array(as7.length);
  const fn = (a, i) => flatMap7(f(a, i), (b) => sync(() => array6[i] = b));
  return zipRight(forEachConcurrentDiscard(as7, fn, batching, false), succeed(array6));
});
var forEachConcurrentDiscard = (self, f, batching, processAll, n) => uninterruptibleMask((restore) => transplant((graft) => withFiberRuntime((parent) => {
  let todos = Array.from(self).reverse();
  let target = todos.length;
  if (target === 0) {
    return unit;
  }
  let counter6 = 0;
  let interrupted2 = false;
  const fibersCount = n ? Math.min(todos.length, n) : todos.length;
  const fibers = /* @__PURE__ */ new Set();
  const results = new Array();
  const interruptAll2 = () => fibers.forEach((fiber) => {
    fiber._scheduler.scheduleTask(() => {
      fiber.unsafeInterruptAsFork(parent.id());
    }, 0);
  });
  const startOrder = new Array();
  const joinOrder = new Array();
  const residual = new Array();
  const collectExits = () => {
    const exits = results.filter(({
      exit: exit3
    }) => exit3._tag === "Failure").sort((a, b) => a.index < b.index ? -1 : a.index === b.index ? 0 : 1).map(({
      exit: exit3
    }) => exit3);
    if (exits.length === 0) {
      exits.push(exitUnit);
    }
    return exits;
  };
  const runFiber = (eff) => {
    const runnable = uninterruptible(graft(eff));
    const fiber = unsafeForkUnstarted(runnable, parent, parent._runtimeFlags, globalScope);
    parent._scheduler.scheduleTask(() => {
      fiber.resume(runnable);
    }, 0);
    return fiber;
  };
  const onInterruptSignal = () => {
    if (!processAll) {
      target -= todos.length;
      todos = [];
    }
    interrupted2 = true;
    interruptAll2();
  };
  const stepOrExit = batching ? step2 : exit;
  const processingFiber = runFiber(async((resume2) => {
    const pushResult = (res, index2) => {
      if (res._op === "Blocked") {
        residual.push(res);
      } else {
        results.push({
          index: index2,
          exit: res
        });
        if (res._op === "Failure" && !interrupted2) {
          onInterruptSignal();
        }
      }
    };
    const next = () => {
      if (todos.length > 0) {
        const a = todos.pop();
        let index2 = counter6++;
        const returnNextElement = () => {
          const a2 = todos.pop();
          index2 = counter6++;
          return flatMap7(yieldNow(), () => flatMap7(stepOrExit(restore(f(a2, index2))), onRes));
        };
        const onRes = (res) => {
          if (todos.length > 0) {
            pushResult(res, index2);
            if (todos.length > 0) {
              return returnNextElement();
            }
          }
          return succeed(res);
        };
        const todo = flatMap7(stepOrExit(restore(f(a, index2))), onRes);
        const fiber = runFiber(todo);
        startOrder.push(fiber);
        fibers.add(fiber);
        if (interrupted2) {
          fiber._scheduler.scheduleTask(() => {
            fiber.unsafeInterruptAsFork(parent.id());
          }, 0);
        }
        fiber.addObserver((wrapped) => {
          let exit3;
          if (wrapped._op === "Failure") {
            exit3 = wrapped;
          } else {
            exit3 = wrapped.i0;
          }
          joinOrder.push(fiber);
          fibers.delete(fiber);
          pushResult(exit3, index2);
          if (results.length === target) {
            resume2(succeed(getOrElse(exitCollectAll(collectExits(), {
              parallel: true
            }), () => exitUnit)));
          } else if (residual.length + results.length === target) {
            const requests = residual.map((blocked3) => blocked3.i0).reduce(par);
            resume2(succeed(blocked(requests, forEachConcurrentDiscard([getOrElse(exitCollectAll(collectExits(), {
              parallel: true
            }), () => exitUnit), ...residual.map((blocked3) => blocked3.i1)], (i) => i, batching, true, n))));
          } else {
            next();
          }
        });
      }
    };
    for (let i = 0; i < fibersCount; i++) {
      next();
    }
  }));
  return asUnit(tap(flatten4(onInterrupt(restore(join2(processingFiber)), () => {
    onInterruptSignal();
    return _await2(processingFiber);
  })), () => forEachSequential(joinOrder, (f2) => f2.inheritAll)));
})));
var forEachParN = (self, n, f, batching) => suspend(() => {
  const as7 = fromIterable(self);
  const array6 = new Array(as7.length);
  const fn = (a, i) => map9(f(a, i), (b) => array6[i] = b);
  return zipRight(forEachConcurrentDiscard(as7, fn, batching, false, n), succeed(array6));
});
var fork = (self) => withFiberRuntime((state, status2) => succeed(unsafeFork(self, state, status2.runtimeFlags)));
var forkDaemon = (self) => forkWithScopeOverride(self, globalScope);
var forkWithErrorHandler = /* @__PURE__ */ dual(2, (self, handler) => fork(onError(self, (cause3) => {
  const either6 = failureOrCause(cause3);
  switch (either6._tag) {
    case "Left": {
      return handler(either6.left);
    }
    case "Right": {
      return failCause(either6.right);
    }
  }
})));
var unsafeFork = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect2, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect2);
  return childFiber;
};
var unsafeForkUnstarted = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect2, parentFiber, parentRuntimeFlags, overrideScope);
  return childFiber;
};
var unsafeMakeChildFiber = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = unsafeMake2();
  const parentFiberRefs = parentFiber.getFiberRefs();
  const childFiberRefs = forkAs(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = getOrDefault(childFiberRefs, currentContext);
  const supervisor = childFiber._supervisor;
  supervisor.onStart(childContext, effect2, some2(parentFiber), childFiber);
  childFiber.addObserver((exit3) => supervisor.onEnd(exit3, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : pipe(parentFiber.getFiberRef(currentForkScopeOverride), getOrElse(() => parentFiber.scope()));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
var forkWithScopeOverride = (self, scopeOverride) => withFiberRuntime((parentFiber, parentStatus) => succeed(unsafeFork(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
var mergeAll = /* @__PURE__ */ dual((args) => isFunction2(args[2]), (elements, zero3, f, options3) => matchSimple(options3?.concurrency, () => fromIterable(elements).reduce((acc, a, i) => zipWith2(acc, a, (acc2, a2) => f(acc2, a2, i)), succeed(zero3)), () => flatMap7(make28(zero3), (acc) => flatMap7(forEach7(elements, (effect2, i) => flatMap7(effect2, (a) => update3(acc, (b) => f(b, a, i))), options3), () => get12(acc)))));
var partition3 = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options3) => pipe(forEach7(elements, (a, i) => either2(f(a, i)), options3), map9((chunk3) => partitionMap2(chunk3, identity))));
var validateAll = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options3) => flatMap7(partition3(elements, f, {
  concurrency: options3?.concurrency,
  batching: options3?.batching
}), ([es, bs]) => es.length === 0 ? options3?.discard ? unit : succeed(bs) : fail2(es)));
var raceAll = (all8) => {
  const list4 = fromIterable2(all8);
  if (!isNonEmpty(list4)) {
    return dieSync(() => new IllegalArgumentException(`Received an empty collection of effects`));
  }
  const self = headNonEmpty2(list4);
  const effects = tailNonEmpty2(list4);
  const inheritAll3 = (res) => pipe(inheritAll(res[1]), as(res[0]));
  return pipe(deferredMake(), flatMap7((done9) => pipe(make28(effects.length), flatMap7((fails) => uninterruptibleMask((restore) => pipe(fork(interruptible2(self)), flatMap7((head6) => pipe(effects, forEachSequential((effect2) => fork(interruptible2(effect2))), map9(unsafeFromArray), map9((tail) => pipe(tail, prepend2(head6))), tap((fibers) => pipe(fibers, reduce(unit, (effect2, fiber) => pipe(effect2, zipRight(pipe(_await2(fiber), flatMap7(raceAllArbiter(fibers, fiber, done9, fails)), fork, asUnit)))))), flatMap7((fibers) => pipe(restore(pipe(_await(done9), flatMap7(inheritAll3))), onInterrupt(() => pipe(fibers, reduce(unit, (effect2, fiber) => pipe(effect2, zipLeft(interruptFiber(fiber))))))))))))))));
};
var raceAllArbiter = (fibers, winner, deferred, fails) => (exit3) => exitMatchEffect(exit3, {
  onFailure: (cause3) => pipe(modify3(fails, (fails2) => [fails2 === 0 ? pipe(deferredFailCause(deferred, cause3), asUnit) : unit, fails2 - 1]), flatten4),
  onSuccess: (value5) => pipe(deferredSucceed(deferred, [value5, winner]), flatMap7((set8) => set8 ? pipe(fromIterable2(fibers), reduce(unit, (effect2, fiber) => fiber === winner ? effect2 : pipe(effect2, zipLeft(interruptFiber(fiber))))) : unit))
});
var reduceEffect = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, zero3, f, options3) => matchSimple(options3?.concurrency, () => fromIterable(elements).reduce((acc, a, i) => zipWith2(acc, a, (acc2, a2) => f(acc2, a2, i)), zero3), () => suspend(() => pipe(mergeAll([zero3, ...elements], none2(), (acc, elem, i) => {
  switch (acc._tag) {
    case "None": {
      return some2(elem);
    }
    case "Some": {
      return some2(f(acc.value, elem, i));
    }
  }
}, options3), map9((option4) => {
  switch (option4._tag) {
    case "None": {
      throw new Error("BUG: Effect.reduceEffect - please report an issue at https://github.com/Effect-TS/effect/issues");
    }
    case "Some": {
      return option4.value;
    }
  }
})))));
var parallelFinalizers = (self) => contextWithEffect((context6) => match(getOption2(context6, scopeTag), {
  onNone: () => self,
  onSome: (scope4) => {
    switch (scope4.strategy._tag) {
      case "Parallel":
        return self;
      case "Sequential":
      case "ParallelN":
        return flatMap7(scopeFork(scope4, parallel3), (inner) => scopeExtend(self, inner));
    }
  }
}));
var parallelNFinalizers = (parallelism) => (self) => contextWithEffect((context6) => match(getOption2(context6, scopeTag), {
  onNone: () => self,
  onSome: (scope4) => {
    if (scope4.strategy._tag === "ParallelN" && scope4.strategy.parallelism === parallelism) {
      return self;
    }
    return flatMap7(scopeFork(scope4, parallelN2(parallelism)), (inner) => scopeExtend(self, inner));
  }
}));
var finalizersMask = (strategy) => (self) => contextWithEffect((context6) => match(getOption2(context6, scopeTag), {
  onNone: () => self(identity),
  onSome: (scope4) => {
    const patch9 = strategy._tag === "Parallel" ? parallelFinalizers : strategy._tag === "Sequential" ? sequentialFinalizers : parallelNFinalizers(strategy.parallelism);
    switch (scope4.strategy._tag) {
      case "Parallel":
        return patch9(self(parallelFinalizers));
      case "Sequential":
        return patch9(self(sequentialFinalizers));
      case "ParallelN":
        return patch9(self(parallelNFinalizers(scope4.strategy.parallelism)));
    }
  }
}));
var scopeWith = (f) => flatMap7(scopeTag, f);
var scopedEffect = (effect2) => flatMap7(scopeMake(), (scope4) => scopeUse(scope4)(effect2));
var sequentialFinalizers = (self) => contextWithEffect((context6) => match(getOption2(context6, scopeTag), {
  onNone: () => self,
  onSome: (scope4) => {
    switch (scope4.strategy._tag) {
      case "Sequential":
        return self;
      case "Parallel":
      case "ParallelN":
        return flatMap7(scopeFork(scope4, sequential3), (inner) => scopeExtend(self, inner));
    }
  }
}));
var tagMetricsScoped = (key2, value5) => labelMetricsScoped([make29(key2, value5)]);
var labelMetricsScoped = (labels) => fiberRefLocallyScopedWith(currentMetricLabels, (old) => union(old, labels));
var using = /* @__PURE__ */ dual(2, (self, use) => acquireUseRelease(scopeMake(), (scope4) => flatMap7(scopeExtend(self, scope4), use), (scope4, exit3) => scopeClose(scope4, exit3)));
var validate = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options3) => validateWith(self, that, (a, b) => [a, b], options3));
var validateWith = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, f, options3) => flatten4(zipWithOptions(exit(self), exit(that), (ea, eb) => exitZipWith(ea, eb, {
  onSuccess: f,
  onFailure: (ca, cb) => options3?.concurrent ? parallel(ca, cb) : sequential(ca, cb)
}), options3)));
var validateFirst = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options3) => flip(forEach7(elements, (a, i) => flip(f(a, i)), options3)));
var withClockScoped = (value5) => fiberRefLocallyScopedWith(currentServices, add2(clockTag, value5));
var withConfigProviderScoped = (value5) => fiberRefLocallyScopedWith(currentServices, add2(configProviderTag, value5));
var withEarlyRelease = (self) => scopeWith((parent) => flatMap7(scopeFork(parent, sequential2), (child) => pipe(self, scopeExtend(child), map9((value5) => [fiberIdWith((fiberId3) => scopeClose(child, exitInterrupt(fiberId3))), value5]))));
var zipOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options3) => zipWithOptions(self, that, (a, b) => [a, b], options3));
var zipLeftOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options3) => zipWithOptions(self, that, (a, _) => a, options3));
var zipRightOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options3) => zipWithOptions(self, that, (_, b) => b, options3));
var zipWithOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, f, options3) => map9(all4([self, that], {
  concurrency: options3?.concurrent ? 2 : 1,
  batching: options3?.batching
}), ([a, a2]) => f(a, a2)));
var withRuntimeFlagsScoped = (update4) => {
  if (update4 === empty14) {
    return unit;
  }
  return pipe(runtimeFlags, flatMap7((runtimeFlags2) => {
    const updatedRuntimeFlags = patch4(runtimeFlags2, update4);
    const revertRuntimeFlags = diff4(updatedRuntimeFlags, runtimeFlags2);
    return pipe(updateRuntimeFlags(update4), zipRight(addFinalizer(() => updateRuntimeFlags(revertRuntimeFlags))), asUnit);
  }), uninterruptible);
};
var releaseMapReleaseAll = (strategy, exit3) => (self) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      return unit;
    }
    case "Running": {
      const finalizersMap = self.state.finalizers;
      const update4 = self.state.update;
      const finalizers = Array.from(finalizersMap.keys()).sort((a, b) => b - a).map((key2) => finalizersMap.get(key2));
      self.state = {
        _tag: "Exited",
        nextKey: self.state.nextKey,
        exit: exit3,
        update: update4
      };
      return isSequential(strategy) ? pipe(finalizers, forEachSequential((fin) => exit(update4(fin)(exit3))), flatMap7((results) => pipe(exitCollectAll(results), map(exitAsUnit), getOrElse(() => exitUnit)))) : isParallel(strategy) ? pipe(forEachParUnbounded(finalizers, (fin) => exit(update4(fin)(exit3)), false), flatMap7((results) => pipe(exitCollectAll(results, {
        parallel: true
      }), map(exitAsUnit), getOrElse(() => exitUnit)))) : pipe(forEachParN(finalizers, strategy.parallelism, (fin) => exit(update4(fin)(exit3)), false), flatMap7((results) => pipe(exitCollectAll(results, {
        parallel: true
      }), map(exitAsUnit), getOrElse(() => exitUnit))));
    }
  }
});
var scopeTag = /* @__PURE__ */ Tag(ScopeTypeId);
var scope = scopeTag;
var scopeMake = (strategy = sequential2) => map9(releaseMapMake, (rm2) => ({
  [ScopeTypeId]: ScopeTypeId,
  [CloseableScopeTypeId]: CloseableScopeTypeId,
  strategy,
  pipe() {
    return pipeArguments(this, arguments);
  },
  fork: (strategy2) => uninterruptible(pipe(scopeMake(strategy2), flatMap7((scope4) => pipe(releaseMapAdd(rm2, (exit3) => scopeClose(scope4, exit3)), tap((fin) => scopeAddFinalizerExit(scope4, fin)), as(scope4))))),
  close: (exit3) => asUnit(releaseMapReleaseAll(strategy, exit3)(rm2)),
  addFinalizer: (fin) => asUnit(releaseMapAdd(fin)(rm2))
}));
var scopeExtend = /* @__PURE__ */ dual(2, (effect2, scope4) => mapInputContext(
  effect2,
  // @ts-expect-error
  merge3(make7(scopeTag, scope4))
));
var scopeUse = /* @__PURE__ */ dual(2, (effect2, scope4) => pipe(effect2, scopeExtend(scope4), onExit((exit3) => scope4.close(exit3))));
var fiberRefUnsafeMakeSupervisor = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: differ2,
  fork: empty25
});
var fiberRefLocallyScoped = /* @__PURE__ */ dual(2, (self, value5) => asUnit(acquireRelease(flatMap7(fiberRefGet(self), (oldValue) => as(fiberRefSet(self, value5), oldValue)), (oldValue) => fiberRefSet(self, oldValue))));
var fiberRefLocallyScopedWith = /* @__PURE__ */ dual(2, (self, f) => fiberRefGetWith(self, (a) => fiberRefLocallyScoped(self, f(a))));
var currentRuntimeFlags = /* @__PURE__ */ fiberRefUnsafeMakeRuntimeFlags(none5);
var currentSupervisor = /* @__PURE__ */ fiberRefUnsafeMakeSupervisor(none8);
var fiberAwaitAll = (fibers) => asUnit(_await2(fiberAll(fibers)));
var fiberAll = (fibers) => ({
  [FiberTypeId]: fiberVariance,
  id: () => fromIterable(fibers).reduce((id2, fiber) => combine3(id2, fiber.id()), none4),
  await: exit(forEachParUnbounded(fibers, (fiber) => flatten4(fiber.await), false)),
  children: map9(forEachParUnbounded(fibers, (fiber) => fiber.children, false), flatten),
  inheritAll: forEachSequentialDiscard(fibers, (fiber) => fiber.inheritAll),
  poll: map9(forEachSequential(fibers, (fiber) => fiber.poll), reduceRight(some2(exitSucceed(new Array())), (optionB, optionA) => {
    switch (optionA._tag) {
      case "None": {
        return none2();
      }
      case "Some": {
        switch (optionB._tag) {
          case "None": {
            return none2();
          }
          case "Some": {
            return some2(exitZipWith(optionA.value, optionB.value, {
              onSuccess: (a, chunk3) => [a, ...chunk3],
              onFailure: parallel
            }));
          }
        }
      }
    }
  })),
  interruptAsFork: (fiberId3) => forEachSequentialDiscard(fibers, (fiber) => fiber.interruptAsFork(fiberId3)),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var raceWith = /* @__PURE__ */ dual(3, (self, other, options3) => raceFibersWith(self, other, {
  onSelfWin: (winner, loser) => flatMap7(winner.await, (exit3) => {
    switch (exit3._tag) {
      case OP_SUCCESS: {
        return flatMap7(winner.inheritAll, () => options3.onSelfDone(exit3, loser));
      }
      case OP_FAILURE: {
        return options3.onSelfDone(exit3, loser);
      }
    }
  }),
  onOtherWin: (winner, loser) => flatMap7(winner.await, (exit3) => {
    switch (exit3._tag) {
      case OP_SUCCESS: {
        return flatMap7(winner.inheritAll, () => options3.onOtherDone(exit3, loser));
      }
      case OP_FAILURE: {
        return options3.onOtherDone(exit3, loser);
      }
    }
  })
}));
var disconnect = (self) => uninterruptibleMask((restore) => fiberIdWith((fiberId3) => flatMap7(forkDaemon(restore(self)), (fiber) => pipe(restore(join2(fiber)), onInterrupt(() => pipe(fiber, interruptAsFork(fiberId3)))))));
var race = /* @__PURE__ */ dual(2, (self, that) => fiberIdWith((parentFiberId) => raceWith(self, that, {
  onSelfDone: (exit3, right3) => exitMatchEffect(exit3, {
    onFailure: (cause3) => pipe(join2(right3), mapErrorCause((cause22) => parallel(cause3, cause22))),
    onSuccess: (value5) => pipe(right3, interruptAsFiber(parentFiberId), as(value5))
  }),
  onOtherDone: (exit3, left3) => exitMatchEffect(exit3, {
    onFailure: (cause3) => pipe(join2(left3), mapErrorCause((cause22) => parallel(cause22, cause3))),
    onSuccess: (value5) => pipe(left3, interruptAsFiber(parentFiberId), as(value5))
  })
})));
var raceFibersWith = /* @__PURE__ */ dual(3, (self, other, options3) => withFiberRuntime((parentFiber, parentStatus) => {
  const parentRuntimeFlags = parentStatus.runtimeFlags;
  const raceIndicator = make11(true);
  const leftFiber = unsafeMakeChildFiber(self, parentFiber, parentRuntimeFlags, options3.selfScope);
  const rightFiber = unsafeMakeChildFiber(other, parentFiber, parentRuntimeFlags, options3.otherScope);
  return async((cb) => {
    leftFiber.addObserver(() => completeRace(leftFiber, rightFiber, options3.onSelfWin, raceIndicator, cb));
    rightFiber.addObserver(() => completeRace(rightFiber, leftFiber, options3.onOtherWin, raceIndicator, cb));
    leftFiber.startFork(self);
    rightFiber.startFork(other);
  }, combine3(leftFiber.id(), rightFiber.id()));
}));
var completeRace = (winner, loser, cont, ab, cb) => {
  if (compareAndSet(true, false)(ab)) {
    cb(cont(winner, loser));
  }
};
var ensuring = /* @__PURE__ */ dual(2, (self, finalizer2) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => matchCauseEffect(finalizer2, {
    onFailure: (cause22) => failCause(sequential(cause1, cause22)),
    onSuccess: () => failCause(cause1)
  }),
  onSuccess: (a) => as(finalizer2, a)
})));
var invokeWithInterrupt = (dataSource, all8) => fiberIdWith((id2) => flatMap7(flatMap7(forkDaemon(interruptible2(dataSource)), (processing) => async((cb) => {
  const counts = all8.map((_) => _.listeners.count);
  const checkDone = () => {
    if (counts.every((count3) => count3 === 0)) {
      cleanup.forEach((f) => f());
      cb(interruptFiber(processing));
    }
  };
  processing.addObserver((exit3) => {
    cleanup.forEach((f) => f());
    cb(exit3);
  });
  const cleanup = all8.map((r, i) => {
    const observer = (count3) => {
      counts[i] = count3;
      checkDone();
    };
    r.listeners.addObserver(observer);
    return () => r.listeners.removeObserver(observer);
  });
  checkDone();
  return sync(() => {
    cleanup.forEach((f) => f());
  });
})), () => suspend(() => {
  const residual = all8.flatMap((entry) => {
    if (!entry.state.completed) {
      return [entry];
    }
    return [];
  });
  return forEachSequentialDiscard(residual, (entry) => complete(entry.request, exitInterrupt(id2)));
})));
var makeSpanScoped = (name, options3) => acquireRelease(makeSpan(name, options3), (span2, exit3) => flatMap7(currentTimeNanosTracing, (endTime) => sync(() => span2.end(endTime, exit3))));
var withTracerScoped = (value5) => fiberRefLocallyScopedWith(currentServices, add2(tracerTag, value5));
var withSpanScoped = /* @__PURE__ */ dual((args) => typeof args[0] !== "string", (self, name, options3) => flatMap7(makeSpanScoped(name, options3), (span2) => provideService(self, spanTag, span2)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/cache.js
var complete2 = (key2, exit3, entryStats, timeToLiveMillis) => struct({
  _tag: "Complete",
  key: key2,
  exit: exit3,
  entryStats,
  timeToLiveMillis
});
var pending2 = (key2, deferred) => struct({
  _tag: "Pending",
  key: key2,
  deferred
});
var refreshing = (deferred, complete3) => struct({
  _tag: "Refreshing",
  deferred,
  complete: complete3
});
var MapKeyTypeId = /* @__PURE__ */ Symbol.for("effect/Cache/MapKey");
var MapKeyImpl = class {
  current;
  [MapKeyTypeId] = MapKeyTypeId;
  previous = void 0;
  next = void 0;
  constructor(current) {
    this.current = current;
  }
  [symbol]() {
    return pipe(hash(this.current), combine(hash(this.previous)), combine(hash(this.next)));
  }
  [symbol2](that) {
    if (this === that) {
      return true;
    }
    return isMapKey(that) && equals(this.current, that.current) && equals(this.previous, that.previous) && equals(this.next, that.next);
  }
};
var makeMapKey = (current) => new MapKeyImpl(current);
var isMapKey = (u) => hasProperty(u, MapKeyTypeId);
var KeySetImpl = class {
  head = void 0;
  tail = void 0;
  add(key2) {
    if (key2 !== this.tail) {
      if (this.tail === void 0) {
        this.head = key2;
        this.tail = key2;
      } else {
        const previous = key2.previous;
        const next = key2.next;
        if (next !== void 0) {
          key2.next = void 0;
          if (previous !== void 0) {
            previous.next = next;
            next.previous = previous;
          } else {
            this.head = next;
            this.head.previous = void 0;
          }
        }
        this.tail.next = key2;
        key2.previous = this.tail;
        this.tail = key2;
      }
    }
  }
  remove() {
    const key2 = this.head;
    if (key2 !== void 0) {
      const next = key2.next;
      if (next !== void 0) {
        key2.next = void 0;
        this.head = next;
        this.head.previous = void 0;
      } else {
        this.head = void 0;
        this.tail = void 0;
      }
    }
    return key2;
  }
};
var makeKeySet = () => new KeySetImpl();
var makeCacheState = (map27, keys5, accesses, updating, hits, misses) => ({
  map: map27,
  keys: keys5,
  accesses,
  updating,
  hits,
  misses
});
var initialCacheState = () => makeCacheState(empty17(), makeKeySet(), unbounded(), make11(false), 0, 0);
var CacheSymbolKey = "effect/Cache";
var CacheTypeId = /* @__PURE__ */ Symbol.for(CacheSymbolKey);
var cacheVariance = {
  /* c8 ignore next */
  _Key: (_) => _,
  /* c8 ignore next */
  _Error: (_) => _,
  /* c8 ignore next */
  _Value: (_) => _
};
var makeCacheStats = (options3) => options3;
var makeEntryStats = (loadedMillis) => ({
  loadedMillis
});
var CacheImpl = class {
  capacity;
  context;
  fiberId;
  lookup;
  timeToLive;
  [CacheTypeId] = cacheVariance;
  cacheState;
  constructor(capacity3, context6, fiberId3, lookup, timeToLive) {
    this.capacity = capacity3;
    this.context = context6;
    this.fiberId = fiberId3;
    this.lookup = lookup;
    this.timeToLive = timeToLive;
    this.cacheState = initialCacheState();
  }
  get(key2) {
    return map9(this.getEither(key2), merge);
  }
  get cacheStats() {
    return sync(() => makeCacheStats({
      hits: this.cacheState.hits,
      misses: this.cacheState.misses,
      size: size5(this.cacheState.map)
    }));
  }
  getOption(key2) {
    return suspend(() => match(get8(this.cacheState.map, key2), {
      onNone: () => {
        const mapKey = makeMapKey(key2);
        this.trackAccess(mapKey);
        this.trackMiss();
        return succeed(none2());
      },
      onSome: (value5) => this.resolveMapValue(value5)
    }));
  }
  getOptionComplete(key2) {
    return suspend(() => match(get8(this.cacheState.map, key2), {
      onNone: () => {
        const mapKey = makeMapKey(key2);
        this.trackAccess(mapKey);
        this.trackMiss();
        return succeed(none2());
      },
      onSome: (value5) => this.resolveMapValue(value5, true)
    }));
  }
  contains(key2) {
    return sync(() => has4(this.cacheState.map, key2));
  }
  entryStats(key2) {
    return sync(() => {
      const option4 = get8(this.cacheState.map, key2);
      if (isSome2(option4)) {
        switch (option4.value._tag) {
          case "Complete": {
            const loaded = option4.value.entryStats.loadedMillis;
            return some2(makeEntryStats(loaded));
          }
          case "Pending": {
            return none2();
          }
          case "Refreshing": {
            const loaded = option4.value.complete.entryStats.loadedMillis;
            return some2(makeEntryStats(loaded));
          }
        }
      }
      return none2();
    });
  }
  getEither(key2) {
    return suspend(() => {
      const k = key2;
      let mapKey = void 0;
      let deferred = void 0;
      let value5 = getOrUndefined(get8(this.cacheState.map, k));
      if (value5 === void 0) {
        deferred = unsafeMake3(this.fiberId);
        mapKey = makeMapKey(k);
        if (has4(this.cacheState.map, k)) {
          value5 = getOrUndefined(get8(this.cacheState.map, k));
        } else {
          set4(this.cacheState.map, k, pending2(mapKey, deferred));
        }
      }
      if (value5 === void 0) {
        this.trackAccess(mapKey);
        this.trackMiss();
        return map9(this.lookupValueOf(key2, deferred), right2);
      } else {
        return flatMap7(this.resolveMapValue(value5), match({
          onNone: () => this.getEither(key2),
          onSome: (value6) => succeed(left2(value6))
        }));
      }
    });
  }
  invalidate(key2) {
    return sync(() => {
      remove5(this.cacheState.map, key2);
    });
  }
  invalidateWhen(key2, when6) {
    return sync(() => {
      const value5 = get8(this.cacheState.map, key2);
      if (isSome2(value5) && value5.value._tag === "Complete") {
        if (value5.value.exit._tag === "Success") {
          if (when6(value5.value.exit.value)) {
            remove5(this.cacheState.map, key2);
          }
        }
      }
    });
  }
  get invalidateAll() {
    return sync(() => {
      this.cacheState.map = empty17();
    });
  }
  refresh(key2) {
    return clockWith3((clock3) => suspend(() => {
      const k = key2;
      const deferred = unsafeMake3(this.fiberId);
      let value5 = getOrUndefined(get8(this.cacheState.map, k));
      if (value5 === void 0) {
        if (has4(this.cacheState.map, k)) {
          value5 = getOrUndefined(get8(this.cacheState.map, k));
        } else {
          set4(this.cacheState.map, k, pending2(makeMapKey(k), deferred));
        }
      }
      if (value5 === void 0) {
        return asUnit(this.lookupValueOf(key2, deferred));
      } else {
        switch (value5._tag) {
          case "Complete": {
            if (this.hasExpired(clock3, value5.timeToLiveMillis)) {
              const found = getOrUndefined(get8(this.cacheState.map, k));
              if (equals(found, value5)) {
                remove5(this.cacheState.map, k);
              }
              return asUnit(this.get(key2));
            }
            return pipe(this.lookupValueOf(key2, deferred), when(() => {
              const current = getOrUndefined(get8(this.cacheState.map, k));
              if (equals(current, value5)) {
                const mapValue = refreshing(deferred, value5);
                set4(this.cacheState.map, k, mapValue);
                return true;
              }
              return false;
            }), asUnit);
          }
          case "Pending": {
            return _await(value5.deferred);
          }
          case "Refreshing": {
            return _await(value5.deferred);
          }
        }
      }
    }));
  }
  set(key2, value5) {
    return clockWith3((clock3) => sync(() => {
      const now = clock3.unsafeCurrentTimeMillis();
      const k = key2;
      const lookupResult = succeed3(value5);
      const mapValue = complete2(makeMapKey(k), lookupResult, makeEntryStats(now), now + toMillis(decode(this.timeToLive(lookupResult))));
      set4(this.cacheState.map, k, mapValue);
    }));
  }
  get size() {
    return sync(() => {
      return size5(this.cacheState.map);
    });
  }
  get values() {
    return sync(() => {
      const values3 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          values3.push(entry[1].exit.value);
        }
      }
      return values3;
    });
  }
  get entries() {
    return sync(() => {
      const values3 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          values3.push([entry[0], entry[1].exit.value]);
        }
      }
      return values3;
    });
  }
  get keys() {
    return sync(() => {
      const keys5 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          keys5.push(entry[0]);
        }
      }
      return keys5;
    });
  }
  resolveMapValue(value5, ignorePending = false) {
    return clockWith3((clock3) => {
      switch (value5._tag) {
        case "Complete": {
          this.trackAccess(value5.key);
          this.trackHit();
          if (this.hasExpired(clock3, value5.timeToLiveMillis)) {
            remove5(this.cacheState.map, value5.key.current);
            return succeed(none2());
          }
          return map9(value5.exit, some2);
        }
        case "Pending": {
          this.trackAccess(value5.key);
          this.trackHit();
          if (ignorePending) {
            return succeed(none2());
          }
          return map9(_await(value5.deferred), some2);
        }
        case "Refreshing": {
          this.trackAccess(value5.complete.key);
          this.trackHit();
          if (this.hasExpired(clock3, value5.complete.timeToLiveMillis)) {
            if (ignorePending) {
              return succeed(none2());
            }
            return map9(_await(value5.deferred), some2);
          }
          return map9(value5.complete.exit, some2);
        }
      }
    });
  }
  trackHit() {
    this.cacheState.hits = this.cacheState.hits + 1;
  }
  trackMiss() {
    this.cacheState.misses = this.cacheState.misses + 1;
  }
  trackAccess(key2) {
    offer(this.cacheState.accesses, key2);
    if (compareAndSet(this.cacheState.updating, false, true)) {
      let loop3 = true;
      while (loop3) {
        const key3 = poll(this.cacheState.accesses, EmptyMutableQueue);
        if (key3 === EmptyMutableQueue) {
          loop3 = false;
        } else {
          this.cacheState.keys.add(key3);
        }
      }
      let size12 = size5(this.cacheState.map);
      loop3 = size12 > this.capacity;
      while (loop3) {
        const key3 = this.cacheState.keys.remove();
        if (key3 !== void 0) {
          if (has4(this.cacheState.map, key3.current)) {
            remove5(this.cacheState.map, key3.current);
            size12 = size12 - 1;
            loop3 = size12 > this.capacity;
          }
        } else {
          loop3 = false;
        }
      }
      set2(this.cacheState.updating, false);
    }
  }
  hasExpired(clock3, timeToLiveMillis) {
    return clock3.unsafeCurrentTimeMillis() > timeToLiveMillis;
  }
  lookupValueOf(input, deferred) {
    return clockWith3((clock3) => suspend(() => {
      const key2 = input;
      return pipe(this.lookup(input), provideContext(this.context), exit, flatMap7((exit3) => {
        const now = clock3.unsafeCurrentTimeMillis();
        const stats = makeEntryStats(now);
        const value5 = complete2(makeMapKey(key2), exit3, stats, now + toMillis(decode(this.timeToLive(exit3))));
        set4(this.cacheState.map, key2, value5);
        return zipRight(done2(deferred, exit3), exit3);
      }), onInterrupt(() => zipRight(interrupt3(deferred), sync(() => {
        remove5(this.cacheState.map, key2);
      }))));
    }));
  }
};
var unsafeMakeWith = (capacity3, lookup, timeToLive) => new CacheImpl(capacity3, empty3(), none3, lookup, (exit3) => decode(timeToLive(exit3)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Cause.js
var fail4 = fail;
var die4 = die;
var interrupt4 = interrupt;
var isInterrupted2 = isInterrupted;
var failureOrCause2 = failureOrCause;
var flipCauseOption2 = flipCauseOption;
var map11 = map8;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Effect.js
var Effect_exports = {};
__export(Effect_exports, {
  Do: () => Do2,
  EffectTypeId: () => EffectTypeId4,
  acquireRelease: () => acquireRelease2,
  acquireReleaseInterruptible: () => acquireReleaseInterruptible2,
  acquireUseRelease: () => acquireUseRelease2,
  addFinalizer: () => addFinalizer3,
  all: () => all5,
  allSuccesses: () => allSuccesses2,
  allWith: () => allWith2,
  allowInterrupt: () => allowInterrupt2,
  andThen: () => andThen4,
  annotateCurrentSpan: () => annotateCurrentSpan2,
  annotateLogs: () => annotateLogs2,
  annotateSpans: () => annotateSpans2,
  ap: () => ap,
  as: () => as3,
  asSome: () => asSome2,
  asSomeError: () => asSomeError2,
  asUnit: () => asUnit2,
  async: () => async2,
  asyncEffect: () => asyncEffect2,
  asyncEither: () => asyncEither2,
  asyncOption: () => asyncOption2,
  awaitAllChildren: () => awaitAllChildren2,
  bind: () => bind2,
  bindTo: () => bindTo2,
  blocked: () => blocked2,
  cacheRequestResult: () => cacheRequestResult,
  cached: () => cached2,
  cachedFunction: () => cachedFunction,
  cachedInvalidateWithTTL: () => cachedInvalidateWithTTL,
  cachedWithTTL: () => cachedWithTTL,
  catch: () => _catch2,
  catchAll: () => catchAll2,
  catchAllCause: () => catchAllCause2,
  catchAllDefect: () => catchAllDefect2,
  catchIf: () => catchIf2,
  catchSome: () => catchSome2,
  catchSomeCause: () => catchSomeCause2,
  catchSomeDefect: () => catchSomeDefect2,
  catchTag: () => catchTag2,
  catchTags: () => catchTags2,
  cause: () => cause2,
  checkInterruptible: () => checkInterruptible2,
  clock: () => clock2,
  clockWith: () => clockWith4,
  configProviderWith: () => configProviderWith2,
  console: () => console3,
  consoleWith: () => consoleWith2,
  context: () => context2,
  contextWith: () => contextWith2,
  contextWithEffect: () => contextWithEffect2,
  currentParentSpan: () => currentParentSpan2,
  currentSpan: () => currentSpan2,
  daemonChildren: () => daemonChildren2,
  delay: () => delay2,
  descriptor: () => descriptor2,
  descriptorWith: () => descriptorWith2,
  die: () => die5,
  dieMessage: () => dieMessage2,
  dieSync: () => dieSync2,
  diffFiberRefs: () => diffFiberRefs2,
  disconnect: () => disconnect2,
  dropUntil: () => dropUntil2,
  dropWhile: () => dropWhile2,
  either: () => either3,
  ensuring: () => ensuring2,
  ensuringChild: () => ensuringChild2,
  ensuringChildren: () => ensuringChildren2,
  eventually: () => eventually2,
  every: () => every4,
  exists: () => exists2,
  exit: () => exit2,
  fail: () => fail6,
  failCause: () => failCause5,
  failCauseSync: () => failCauseSync2,
  failSync: () => failSync2,
  fiberId: () => fiberId2,
  fiberIdWith: () => fiberIdWith2,
  filter: () => filter8,
  filterOrDie: () => filterOrDie2,
  filterOrDieMessage: () => filterOrDieMessage2,
  filterOrElse: () => filterOrElse2,
  filterOrFail: () => filterOrFail2,
  finalizersMask: () => finalizersMask2,
  findFirst: () => findFirst5,
  firstSuccessOf: () => firstSuccessOf2,
  flatMap: () => flatMap8,
  flatten: () => flatten6,
  flip: () => flip2,
  flipWith: () => flipWith2,
  forEach: () => forEach8,
  forever: () => forever2,
  fork: () => fork3,
  forkAll: () => forkAll2,
  forkDaemon: () => forkDaemon2,
  forkIn: () => forkIn2,
  forkScoped: () => forkScoped2,
  forkWithErrorHandler: () => forkWithErrorHandler2,
  fromFiber: () => fromFiber2,
  fromFiberEffect: () => fromFiberEffect2,
  fromNullable: () => fromNullable3,
  gen: () => gen2,
  getFiberRefs: () => getFiberRefs,
  getRuntimeFlags: () => getRuntimeFlags,
  head: () => head4,
  if: () => if_2,
  ignore: () => ignore2,
  ignoreLogged: () => ignoreLogged2,
  inheritFiberRefs: () => inheritFiberRefs2,
  interrupt: () => interrupt6,
  interruptWith: () => interruptWith2,
  interruptible: () => interruptible3,
  interruptibleMask: () => interruptibleMask2,
  intoDeferred: () => intoDeferred2,
  isEffect: () => isEffect2,
  isFailure: () => isFailure4,
  isSuccess: () => isSuccess2,
  iterate: () => iterate2,
  labelMetrics: () => labelMetrics2,
  labelMetricsScoped: () => labelMetricsScoped2,
  let: () => let_,
  linkSpans: () => linkSpans2,
  locally: () => locally2,
  locallyScoped: () => locallyScoped,
  locallyScopedWith: () => locallyScopedWith,
  locallyWith: () => locallyWith,
  log: () => log3,
  logAnnotations: () => logAnnotations2,
  logDebug: () => logDebug2,
  logError: () => logError2,
  logFatal: () => logFatal2,
  logInfo: () => logInfo2,
  logTrace: () => logTrace2,
  logWarning: () => logWarning2,
  loop: () => loop2,
  makeSemaphore: () => makeSemaphore2,
  makeSpan: () => makeSpan2,
  makeSpanScoped: () => makeSpanScoped2,
  map: () => map13,
  mapAccum: () => mapAccum3,
  mapBoth: () => mapBoth2,
  mapError: () => mapError2,
  mapErrorCause: () => mapErrorCause2,
  mapInputContext: () => mapInputContext2,
  match: () => match10,
  matchCause: () => matchCause2,
  matchCauseEffect: () => matchCauseEffect2,
  matchEffect: () => matchEffect2,
  merge: () => merge6,
  mergeAll: () => mergeAll2,
  metricLabels: () => metricLabels2,
  negate: () => negate2,
  never: () => never3,
  none: () => none9,
  onError: () => onError2,
  onExit: () => onExit2,
  onInterrupt: () => onInterrupt2,
  once: () => once2,
  option: () => option2,
  optionFromOptional: () => optionFromOptional2,
  orDie: () => orDie2,
  orDieWith: () => orDieWith2,
  orElse: () => orElse4,
  orElseFail: () => orElseFail2,
  orElseSucceed: () => orElseSucceed2,
  parallelErrors: () => parallelErrors2,
  parallelFinalizers: () => parallelFinalizers2,
  partition: () => partition4,
  patchFiberRefs: () => patchFiberRefs2,
  patchRuntimeFlags: () => patchRuntimeFlags,
  promise: () => promise2,
  provide: () => provide,
  provideService: () => provideService2,
  provideServiceEffect: () => provideServiceEffect2,
  race: () => race2,
  raceAll: () => raceAll2,
  raceFirst: () => raceFirst2,
  raceWith: () => raceWith2,
  random: () => random3,
  randomWith: () => randomWith2,
  reduce: () => reduce11,
  reduceEffect: () => reduceEffect2,
  reduceRight: () => reduceRight3,
  reduceWhile: () => reduceWhile2,
  repeat: () => repeat,
  repeatN: () => repeatN2,
  repeatOrElse: () => repeatOrElse,
  repeatUntil: () => repeatUntil,
  repeatUntilEffect: () => repeatUntilEffect,
  repeatWhile: () => repeatWhile,
  repeatWhileEffect: () => repeatWhileEffect,
  replicate: () => replicate2,
  replicateEffect: () => replicateEffect2,
  request: () => request,
  retry: () => retry,
  retryN: () => retryN,
  retryOrElse: () => retryOrElse,
  retryUntil: () => retryUntil,
  retryUntilEffect: () => retryUntilEffect,
  retryWhile: () => retryWhile,
  retryWhileEffect: () => retryWhileEffect,
  runCallback: () => runCallback,
  runFork: () => runFork,
  runPromise: () => runPromise,
  runPromiseExit: () => runPromiseExit,
  runRequestBlock: () => runRequestBlock2,
  runSync: () => runSync,
  runSyncExit: () => runSyncExit,
  runtime: () => runtime4,
  sandbox: () => sandbox2,
  schedule: () => schedule,
  scheduleForked: () => scheduleForked2,
  scheduleFrom: () => scheduleFrom,
  scope: () => scope2,
  scopeWith: () => scopeWith2,
  scoped: () => scoped,
  sequentialFinalizers: () => sequentialFinalizers2,
  serviceConstants: () => serviceConstants2,
  serviceFunction: () => serviceFunction2,
  serviceFunctionEffect: () => serviceFunctionEffect2,
  serviceFunctions: () => serviceFunctions2,
  serviceMembers: () => serviceMembers2,
  serviceOption: () => serviceOption2,
  serviceOptional: () => serviceOptional2,
  setFiberRefs: () => setFiberRefs2,
  sleep: () => sleep4,
  spanAnnotations: () => spanAnnotations2,
  spanLinks: () => spanLinks2,
  step: () => step3,
  succeed: () => succeed6,
  succeedNone: () => succeedNone2,
  succeedSome: () => succeedSome2,
  summarized: () => summarized2,
  supervised: () => supervised2,
  suspend: () => suspend2,
  sync: () => sync2,
  tagMetrics: () => tagMetrics2,
  tagMetricsScoped: () => tagMetricsScoped2,
  takeUntil: () => takeUntil2,
  takeWhile: () => takeWhile2,
  tap: () => tap2,
  tapBoth: () => tapBoth2,
  tapDefect: () => tapDefect2,
  tapError: () => tapError2,
  tapErrorCause: () => tapErrorCause2,
  tapErrorTag: () => tapErrorTag2,
  timed: () => timed2,
  timedWith: () => timedWith2,
  timeout: () => timeout2,
  timeoutFail: () => timeoutFail2,
  timeoutFailCause: () => timeoutFailCause2,
  timeoutTo: () => timeoutTo2,
  tracer: () => tracer2,
  tracerWith: () => tracerWith4,
  transplant: () => transplant2,
  try: () => try_2,
  tryMap: () => tryMap2,
  tryMapPromise: () => tryMapPromise2,
  tryPromise: () => tryPromise2,
  unified: () => unified2,
  unifiedFn: () => unifiedFn,
  uninterruptible: () => uninterruptible2,
  uninterruptibleMask: () => uninterruptibleMask2,
  unit: () => unit4,
  unless: () => unless2,
  unlessEffect: () => unlessEffect2,
  unsafeMakeSemaphore: () => unsafeMakeSemaphore2,
  unsandbox: () => unsandbox2,
  updateFiberRefs: () => updateFiberRefs2,
  updateService: () => updateService2,
  useSpan: () => useSpan2,
  using: () => using2,
  validate: () => validate2,
  validateAll: () => validateAll2,
  validateFirst: () => validateFirst2,
  validateWith: () => validateWith2,
  when: () => when2,
  whenEffect: () => whenEffect2,
  whenFiberRef: () => whenFiberRef2,
  whenRef: () => whenRef2,
  whileLoop: () => whileLoop2,
  withClock: () => withClock2,
  withClockScoped: () => withClockScoped2,
  withConcurrency: () => withConcurrency2,
  withConfigProvider: () => withConfigProvider2,
  withConfigProviderScoped: () => withConfigProviderScoped2,
  withConsole: () => withConsole2,
  withConsoleScoped: () => withConsoleScoped2,
  withEarlyRelease: () => withEarlyRelease2,
  withLogSpan: () => withLogSpan2,
  withMaxOpsBeforeYield: () => withMaxOpsBeforeYield2,
  withMetric: () => withMetric2,
  withParentSpan: () => withParentSpan2,
  withRequestBatching: () => withRequestBatching2,
  withRequestCache: () => withRequestCache2,
  withRequestCaching: () => withRequestCaching2,
  withRuntimeFlagsPatch: () => withRuntimeFlagsPatch,
  withRuntimeFlagsPatchScoped: () => withRuntimeFlagsPatchScoped,
  withScheduler: () => withScheduler2,
  withSchedulingPriority: () => withSchedulingPriority2,
  withSpan: () => withSpan2,
  withSpanScoped: () => withSpanScoped2,
  withTracer: () => withTracer2,
  withTracerScoped: () => withTracerScoped2,
  withTracerTiming: () => withTracerTiming2,
  withUnhandledErrorLogLevel: () => withUnhandledErrorLogLevel2,
  yieldNow: () => yieldNow3,
  zip: () => zip5,
  zipLeft: () => zipLeft2,
  zipRight: () => zipRight3,
  zipWith: () => zipWith3
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/schedule/interval.js
var IntervalSymbolKey = "effect/ScheduleInterval";
var IntervalTypeId = /* @__PURE__ */ Symbol.for(IntervalSymbolKey);
var empty26 = {
  [IntervalTypeId]: IntervalTypeId,
  startMillis: 0,
  endMillis: 0
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/ScheduleInterval.js
var empty27 = empty26;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/schedule/intervals.js
var start = (self) => {
  return pipe(self.intervals, head2, getOrElse(() => empty27)).startMillis;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/ScheduleIntervals.js
var start2 = start;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/schedule/decision.js
var OP_DONE2 = "Done";
var isDone4 = (self) => {
  return self._tag === OP_DONE2;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/ScheduleDecision.js
var isDone5 = isDone4;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Scope.js
var addFinalizer2 = scopeAddFinalizer;
var close = scopeClose;
var extend2 = scopeExtend;
var fork2 = scopeFork;
var make38 = scopeMake;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/schedule.js
var ScheduleSymbolKey = "effect/Schedule";
var ScheduleTypeId = /* @__PURE__ */ Symbol.for(ScheduleSymbolKey);
var ScheduleDriverSymbolKey = "effect/ScheduleDriver";
var ScheduleDriverTypeId = /* @__PURE__ */ Symbol.for(ScheduleDriverSymbolKey);
var scheduleVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
var scheduleDriverVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
var ScheduleImpl = class {
  initial;
  step;
  [ScheduleTypeId] = scheduleVariance;
  constructor(initial, step4) {
    this.initial = initial;
    this.step = step4;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var ScheduleDriverImpl = class {
  schedule;
  ref;
  [ScheduleDriverTypeId] = scheduleDriverVariance;
  constructor(schedule3, ref) {
    this.schedule = schedule3;
    this.ref = ref;
  }
  get state() {
    return map9(get11(this.ref), (tuple5) => tuple5[1]);
  }
  get last() {
    return flatMap7(get11(this.ref), ([element, _]) => {
      switch (element._tag) {
        case "None": {
          return failSync(() => new NoSuchElementException());
        }
        case "Some": {
          return succeed(element.value);
        }
      }
    });
  }
  get reset() {
    return set6(this.ref, [none2(), this.schedule.initial]);
  }
  next(input) {
    return pipe(map9(get11(this.ref), (tuple5) => tuple5[1]), flatMap7((state) => pipe(currentTimeMillis2, flatMap7((now) => pipe(suspend(() => this.schedule.step(now, input, state)), flatMap7(([state2, out, decision]) => isDone5(decision) ? pipe(set6(this.ref, [some2(out), state2]), zipRight(fail2(none2()))) : pipe(set6(this.ref, [some2(out), state2]), zipRight(sleep3(millis(start2(decision.intervals) - now))), as(out))))))));
  }
};
var driver = (self) => pipe(make27([none2(), self.initial]), map9((ref) => new ScheduleDriverImpl(self, ref)));
var repeat_Effect = /* @__PURE__ */ dual(2, (self, schedule3) => repeatOrElse_Effect(self, schedule3, (e, _) => fail2(e)));
var repeatOrElse_Effect = /* @__PURE__ */ dual(3, (self, schedule3, orElse13) => flatMap7(driver(schedule3), (driver2) => matchEffect(self, {
  onFailure: (error2) => orElse13(error2, none2()),
  onSuccess: (value5) => repeatOrElseEffectLoop(self, driver2, orElse13, value5)
})));
var repeatOrElseEffectLoop = (self, driver2, orElse13, value5) => {
  return matchEffect(driver2.next(value5), {
    onFailure: () => orDie(driver2.last),
    onSuccess: (b) => matchEffect(self, {
      onFailure: (error2) => orElse13(error2, some2(b)),
      onSuccess: (value6) => repeatOrElseEffectLoop(self, driver2, orElse13, value6)
    })
  });
};
var repeatUntil_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatUntilEffect_Effect(self, (a) => sync(() => f(a))));
var repeatUntilEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => flatMap7(f(a), (result) => result ? succeed(a) : flatMap7(yieldNow(), () => repeatUntilEffect_Effect(self, f)))));
var repeatWhile_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatWhileEffect_Effect(self, (a) => sync(() => f(a))));
var repeatWhileEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatUntilEffect_Effect(self, (a) => negate(f(a))));
var retry_Effect = /* @__PURE__ */ dual(2, (self, policy) => retryOrElse_Effect(self, policy, (e, _) => fail2(e)));
var retryN_Effect = /* @__PURE__ */ dual(2, (self, n) => retryN_EffectLoop(self, n));
var retryN_EffectLoop = (self, n) => {
  return catchAll(self, (e) => n <= 0 ? fail2(e) : flatMap7(yieldNow(), () => retryN_EffectLoop(self, n - 1)));
};
var retryOrElse_Effect = /* @__PURE__ */ dual(3, (self, policy, orElse13) => flatMap7(driver(policy), (driver2) => retryOrElse_EffectLoop(self, driver2, orElse13)));
var retryOrElse_EffectLoop = (self, driver2, orElse13) => {
  return catchAll(self, (e) => matchEffect(driver2.next(e), {
    onFailure: () => pipe(driver2.last, orDie, flatMap7((out) => orElse13(e, out))),
    onSuccess: () => retryOrElse_EffectLoop(self, driver2, orElse13)
  }));
};
var retryUntil_Effect = /* @__PURE__ */ dual(2, (self, f) => retryUntilEffect_Effect(self, (e) => sync(() => f(e))));
var retryUntilEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => catchAll(self, (e) => flatMap7(f(e), (b) => b ? fail2(e) : flatMap7(yieldNow(), () => retryUntilEffect_Effect(self, f)))));
var retryWhile_Effect = /* @__PURE__ */ dual(2, (self, f) => retryWhileEffect_Effect(self, (e) => sync(() => f(e))));
var retryWhileEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => retryUntilEffect_Effect(self, (e) => negate(f(e))));
var schedule_Effect = /* @__PURE__ */ dual(2, (self, schedule3) => scheduleFrom_Effect(self, void 0, schedule3));
var scheduleFrom_Effect = /* @__PURE__ */ dual(3, (self, initial, schedule3) => flatMap7(driver(schedule3), (driver2) => scheduleFrom_EffectLoop(self, initial, driver2)));
var scheduleFrom_EffectLoop = (self, initial, driver2) => matchEffect(driver2.next(initial), {
  onFailure: () => orDie(driver2.last),
  onSuccess: () => flatMap7(self, (a) => scheduleFrom_EffectLoop(self, a, driver2))
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/effect/circular.js
var Semaphore = class {
  permits;
  waiters = new Array();
  taken = 0;
  constructor(permits) {
    this.permits = permits;
  }
  get free() {
    return this.permits - this.taken;
  }
  take = (n) => asyncEither((resume2) => {
    if (this.free < n) {
      const observer = () => {
        if (this.free >= n) {
          const observerIndex = this.waiters.findIndex((cb) => cb === observer);
          if (observerIndex !== -1) {
            this.waiters.splice(observerIndex, 1);
          }
          this.taken += n;
          resume2(succeed(n));
        }
      };
      this.waiters.push(observer);
      return left2(sync(() => {
        const observerIndex = this.waiters.findIndex((cb) => cb === observer);
        if (observerIndex !== -1) {
          this.waiters.splice(observerIndex, 1);
        }
      }));
    }
    this.taken += n;
    return right2(succeed(n));
  });
  release = (n) => withFiberRuntime((fiber) => {
    this.taken -= n;
    fiber.getFiberRef(currentScheduler).scheduleTask(() => {
      this.waiters.forEach((wake) => wake());
    }, fiber.getFiberRef(currentSchedulingPriority));
    return unit;
  });
  withPermits = (n) => (self) => uninterruptibleMask((restore) => flatMap7(restore(this.take(n)), (permits) => ensuring(restore(self), this.release(permits))));
};
var unsafeMakeSemaphore = (leases) => {
  return new Semaphore(leases);
};
var makeSemaphore = (permits) => sync(() => unsafeMakeSemaphore(permits));
var awaitAllChildren = (self) => ensuringChildren(self, fiberAwaitAll);
var cached = /* @__PURE__ */ dual(2, (self, timeToLive) => map9(cachedInvalidate(self, timeToLive), (tuple5) => tuple5[0]));
var cachedInvalidate = /* @__PURE__ */ dual(2, (self, timeToLive) => {
  const duration = decode(timeToLive);
  return flatMap7(context(), (env) => map9(makeSynchronized(none2()), (cache) => [provideContext(getCachedValue(self, duration, cache), env), invalidateCache(cache)]));
});
var computeCachedValue = (self, timeToLive, start3) => {
  const timeToLiveMillis = toMillis(decode(timeToLive));
  return pipe(deferredMake(), tap((deferred) => intoDeferred(self, deferred)), map9((deferred) => some2([start3 + timeToLiveMillis, deferred])));
};
var getCachedValue = (self, timeToLive, cache) => uninterruptibleMask((restore) => pipe(clockWith3((clock3) => clock3.currentTimeMillis), flatMap7((time2) => updateSomeAndGetEffectSynchronized(cache, (option4) => {
  switch (option4._tag) {
    case "None": {
      return some2(computeCachedValue(self, timeToLive, time2));
    }
    case "Some": {
      const [end4] = option4.value;
      return end4 - time2 <= 0 ? some2(computeCachedValue(self, timeToLive, time2)) : none2();
    }
  }
})), flatMap7((option4) => isNone2(option4) ? dieMessage("BUG: Effect.cachedInvalidate - please report an issue at https://github.com/Effect-TS/effect/issues") : restore(deferredAwait(option4.value[1])))));
var invalidateCache = (cache) => set6(cache, none2());
var ensuringChild = /* @__PURE__ */ dual(2, (self, f) => ensuringChildren(self, (children2) => f(fiberAll(children2))));
var ensuringChildren = /* @__PURE__ */ dual(2, (self, children2) => flatMap7(track, (supervisor) => pipe(supervised(self, supervisor), ensuring(flatMap7(supervisor.value, children2)))));
var forkAll = /* @__PURE__ */ dual((args) => isIterable(args[0]), (effects, options3) => options3?.discard ? forEachSequentialDiscard(effects, fork) : map9(forEachSequential(effects, fork), fiberAll));
var forkIn = /* @__PURE__ */ dual(2, (self, scope4) => uninterruptibleMask((restore) => flatMap7(scope4.fork(sequential2), (child) => pipe(restore(self), onExit((exit3) => child.close(exit3)), forkDaemon, tap((fiber) => child.addFinalizer(() => fiberIdWith((fiberId3) => equals(fiberId3, fiber.id()) ? unit : asUnit(interruptFiber(fiber)))))))));
var forkScoped = (self) => scopeWith((scope4) => forkIn(self, scope4));
var fromFiber = (fiber) => join2(fiber);
var fromFiberEffect = (fiber) => suspend(() => flatMap7(fiber, join2));
var memoKeySymbol = /* @__PURE__ */ Symbol.for("effect/Effect/memoizeFunction.key");
var Key = class {
  a;
  eq;
  [memoKeySymbol] = memoKeySymbol;
  constructor(a, eq) {
    this.a = a;
    this.eq = eq;
  }
  [symbol2](that) {
    if (hasProperty(that, memoKeySymbol)) {
      if (this.eq) {
        return this.eq(this.a, that.a);
      } else {
        return equals(this.a, that.a);
      }
    }
    return false;
  }
  [symbol]() {
    return this.eq ? 0 : hash(this.a);
  }
};
var memoizeFunction = (f, eq) => {
  return pipe(sync(() => empty17()), flatMap7(makeSynchronized), map9((ref) => (a) => pipe(ref.modifyEffect((map27) => {
    const result = pipe(map27, get8(new Key(a, eq)));
    if (isNone2(result)) {
      return pipe(deferredMake(), tap((deferred) => pipe(diffFiberRefs(f(a)), intoDeferred(deferred), fork)), map9((deferred) => [deferred, pipe(map27, set4(new Key(a, eq), deferred))]));
    }
    return succeed([result.value, map27]);
  }), flatMap7(deferredAwait), flatMap7(([patch9, b]) => pipe(patchFiberRefs(patch9), as(b))))));
};
var raceFirst = /* @__PURE__ */ dual(2, (self, that) => pipe(exit(self), race(exit(that)), (effect2) => flatten4(effect2)));
var scheduleForked = /* @__PURE__ */ dual(2, (self, schedule3) => pipe(self, schedule_Effect(schedule3), forkScoped));
var supervised = /* @__PURE__ */ dual(2, (self, supervisor) => {
  const supervise = fiberRefLocallyWith(currentSupervisor, (s) => s.zip(supervisor));
  return supervise(self);
});
var timeout = /* @__PURE__ */ dual(2, (self, duration) => timeoutFail(self, {
  onTimeout: () => new NoSuchElementException(),
  duration
}));
var timeoutFail = /* @__PURE__ */ dual(2, (self, {
  duration,
  onTimeout
}) => flatten4(timeoutTo(self, {
  onTimeout: () => failSync(onTimeout),
  onSuccess: succeed,
  duration
})));
var timeoutFailCause = /* @__PURE__ */ dual(2, (self, {
  duration,
  onTimeout
}) => flatten4(timeoutTo(self, {
  onTimeout: () => failCauseSync(onTimeout),
  onSuccess: succeed,
  duration
})));
var timeoutTo = /* @__PURE__ */ dual(2, (self, {
  duration,
  onSuccess,
  onTimeout
}) => fiberIdWith((parentFiberId) => raceFibersWith(self, interruptible2(sleep3(duration)), {
  onSelfWin: (winner, loser) => flatMap7(winner.await, (exit3) => {
    if (exit3._tag === "Success") {
      return flatMap7(winner.inheritAll, () => as(interruptAsFiber(loser, parentFiberId), onSuccess(exit3.value)));
    } else {
      return flatMap7(interruptAsFiber(loser, parentFiberId), () => exitFailCause(exit3.cause));
    }
  }),
  onOtherWin: (winner, loser) => flatMap7(winner.await, (exit3) => {
    if (exit3._tag === "Success") {
      return flatMap7(winner.inheritAll, () => as(interruptAsFiber(loser, parentFiberId), onTimeout()));
    } else {
      return flatMap7(interruptAsFiber(loser, parentFiberId), () => exitFailCause(exit3.cause));
    }
  }),
  otherScope: globalScope
})));
var SynchronizedSymbolKey = "effect/Ref/SynchronizedRef";
var SynchronizedTypeId = /* @__PURE__ */ Symbol.for(SynchronizedSymbolKey);
var synchronizedVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var SynchronizedImpl = class {
  ref;
  withLock;
  [SynchronizedTypeId] = synchronizedVariance;
  [RefTypeId] = refVariance;
  constructor(ref, withLock) {
    this.ref = ref;
    this.withLock = withLock;
  }
  modify(f) {
    return this.modifyEffect((a) => succeed(f(a)));
  }
  modifyEffect(f) {
    return this.withLock(pipe(flatMap7(get11(this.ref), f), flatMap7(([b, a]) => as(set6(this.ref, a), b))));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var makeSynchronized = (value5) => sync(() => unsafeMakeSynchronized(value5));
var unsafeMakeSynchronized = (value5) => {
  const ref = unsafeMake5(value5);
  const sem = unsafeMakeSemaphore(1);
  return new SynchronizedImpl(ref, sem.withPermits(1));
};
var updateSomeAndGetEffectSynchronized = /* @__PURE__ */ dual(2, (self, pf) => self.modifyEffect((value5) => {
  const result = pf(value5);
  switch (result._tag) {
    case "None": {
      return succeed([value5, value5]);
    }
    case "Some": {
      return map9(result.value, (a) => [a, a]);
    }
  }
}));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/layer.js
var OP_FRESH = "Fresh";
var OP_FROM_EFFECT = "FromEffect";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Fiber.js
var _await3 = _await2;
var inheritAll2 = inheritAll;
var interrupt5 = interruptFiber;
var interruptAs = interruptAsFiber;
var join3 = join2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/runtime.js
var unsafeFork2 = (runtime5) => (self, options3) => {
  const fiberId3 = unsafeMake2();
  const effect2 = self;
  const fiberRefUpdates = [[currentContext, [[fiberId3, runtime5.context]]]];
  if (options3?.scheduler) {
    fiberRefUpdates.push([currentScheduler, [[fiberId3, options3.scheduler]]]);
  }
  let fiberRefs3 = updateManyAs2(runtime5.fiberRefs, {
    entries: fiberRefUpdates,
    forkAs: fiberId3
  });
  if (options3?.updateRefs) {
    fiberRefs3 = options3.updateRefs(fiberRefs3, fiberId3);
  }
  const fiberRuntime = new FiberRuntime(fiberId3, fiberRefs3, runtime5.runtimeFlags);
  const supervisor = fiberRuntime._supervisor;
  if (supervisor !== none8) {
    supervisor.onStart(runtime5.context, effect2, none2(), fiberRuntime);
    fiberRuntime.addObserver((exit3) => supervisor.onEnd(exit3, fiberRuntime));
  }
  globalScope.add(runtime5.runtimeFlags, fiberRuntime);
  fiberRuntime.start(effect2);
  return fiberRuntime;
};
var unsafeRunCallback = (runtime5) => (effect2, onExit3) => {
  const fiberRuntime = unsafeFork2(runtime5)(effect2);
  if (onExit3) {
    fiberRuntime.addObserver((exit3) => {
      onExit3(exit3);
    });
  }
  return (id2, onExitInterrupt) => unsafeRunCallback(runtime5)(pipe(fiberRuntime, interruptAs(id2 ?? none4)), onExitInterrupt ? (exit3) => onExitInterrupt(flatten5(exit3)) : void 0);
};
var unsafeRunSync = (runtime5) => (effect2) => {
  const result = unsafeRunSyncExit(runtime5)(effect2);
  if (result._tag === "Failure") {
    throw fiberFailure(result.i0);
  } else {
    return result.i0;
  }
};
var asyncFiberException = (fiber) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error2 = new Error();
  Error.stackTraceLimit = limit;
  const message = `Fiber #${fiber.id().id} cannot be be resolved synchronously, this is caused by using runSync on an effect that performs async work`;
  const _tag = "AsyncFiberException";
  Object.defineProperties(error2, {
    _tag: {
      value: _tag
    },
    fiber: {
      value: fiber
    },
    message: {
      value: message
    },
    name: {
      value: _tag
    },
    toString: {
      get() {
        return () => message;
      }
    },
    [NodeInspectSymbol]: {
      get() {
        return () => message;
      }
    }
  });
  return error2;
};
var FiberFailureId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure");
var FiberFailureCauseId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure/Cause");
var fiberFailure = (cause3) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error2 = new Error();
  Error.stackTraceLimit = limit;
  const prettyErrors2 = prettyErrors(cause3);
  if (prettyErrors2.length > 0) {
    const head6 = prettyErrors2[0];
    error2.name = head6.message.split(":")[0];
    error2.message = head6.message.substring(error2.name.length + 2);
    error2.stack = pretty(cause3);
  }
  error2[FiberFailureId] = FiberFailureId;
  error2[FiberFailureCauseId] = cause3;
  error2.toJSON = () => {
    return {
      _id: "FiberFailure",
      cause: cause3.toJSON()
    };
  };
  error2.toString = () => {
    return format(error2.toJSON());
  };
  error2[NodeInspectSymbol] = () => {
    return error2.toJSON();
  };
  return error2;
};
var fastPath = (effect2) => {
  const op = effect2;
  switch (op._op) {
    case "Failure":
    case "Success": {
      return op;
    }
    case "Left": {
      return exitFail(op.left);
    }
    case "Right": {
      return exitSucceed(op.right);
    }
    case "Some": {
      return exitSucceed(op.value);
    }
    case "None": {
      return exitFail(NoSuchElementException());
    }
  }
};
var unsafeRunSyncExit = (runtime5) => (effect2) => {
  const op = fastPath(effect2);
  if (op) {
    return op;
  }
  const scheduler = new SyncScheduler();
  const fiberRuntime = unsafeFork2(runtime5)(effect2, {
    scheduler
  });
  scheduler.flush();
  const result = fiberRuntime.unsafePoll();
  if (result) {
    return result;
  }
  throw asyncFiberException(fiberRuntime);
};
var unsafeRunPromise = (runtime5) => (effect2) => unsafeRunPromiseExit(runtime5)(effect2).then((result) => {
  switch (result._tag) {
    case OP_SUCCESS: {
      return result.i0;
    }
    case OP_FAILURE: {
      throw fiberFailure(result.i0);
    }
  }
});
var unsafeRunPromiseExit = (runtime5) => (effect2) => new Promise((resolve2) => {
  const op = fastPath(effect2);
  if (op) {
    resolve2(op);
  }
  unsafeFork2(runtime5)(effect2).addObserver((exit3) => {
    resolve2(exit3);
  });
});
var RuntimeImpl = class {
  context;
  runtimeFlags;
  fiberRefs;
  constructor(context6, runtimeFlags2, fiberRefs3) {
    this.context = context6;
    this.runtimeFlags = runtimeFlags2;
    this.fiberRefs = fiberRefs3;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make39 = (options3) => new RuntimeImpl(options3.context, options3.runtimeFlags, options3.fiberRefs);
var runtime3 = () => withFiberRuntime((state, status2) => succeed(new RuntimeImpl(state.getFiberRef(currentContext), status2.runtimeFlags, state.getFiberRefs())));
var defaultRuntimeFlags = /* @__PURE__ */ make16(Interruption, CooperativeYielding, RuntimeMetrics);
var defaultRuntime = /* @__PURE__ */ make39({
  context: /* @__PURE__ */ empty3(),
  runtimeFlags: defaultRuntimeFlags,
  fiberRefs: /* @__PURE__ */ empty21()
});
var unsafeRunEffect = /* @__PURE__ */ unsafeRunCallback(defaultRuntime);
var unsafeForkEffect = /* @__PURE__ */ unsafeFork2(defaultRuntime);
var unsafeRunPromiseEffect = /* @__PURE__ */ unsafeRunPromise(defaultRuntime);
var unsafeRunPromiseExitEffect = /* @__PURE__ */ unsafeRunPromiseExit(defaultRuntime);
var unsafeRunSyncEffect = /* @__PURE__ */ unsafeRunSync(defaultRuntime);
var unsafeRunSyncExitEffect = /* @__PURE__ */ unsafeRunSyncExit(defaultRuntime);
var asyncEffect = (register) => flatMap7(deferredMake(), (deferred) => flatMap7(runtime3(), (runtime5) => uninterruptibleMask((restore) => zipRight(fork(restore(catchAllCause(register((cb) => unsafeRunCallback(runtime5)(intoDeferred(cb, deferred))), (cause3) => deferredFailCause(deferred, cause3)))), restore(deferredAwait(deferred))))));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/synchronizedRef.js
var modifyEffect = /* @__PURE__ */ dual(2, (self, f) => self.modifyEffect(f));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/layer.js
var LayerSymbolKey = "effect/Layer";
var LayerTypeId = /* @__PURE__ */ Symbol.for(LayerSymbolKey);
var layerVariance = {
  /* c8 ignore next */
  _RIn: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _ROut: (_) => _
};
var proto3 = {
  [LayerTypeId]: layerVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var MemoMapTypeIdKey = "effect/Layer/MemoMap";
var MemoMapTypeId = /* @__PURE__ */ Symbol.for(MemoMapTypeIdKey);
var isLayer = (u) => hasProperty(u, LayerTypeId);
var isFresh = (self) => {
  return self._tag === OP_FRESH;
};
var MemoMapImpl = class {
  ref;
  [MemoMapTypeId];
  constructor(ref) {
    this.ref = ref;
    this[MemoMapTypeId] = MemoMapTypeId;
  }
  /**
   * Checks the memo map to see if a layer exists. If it is, immediately
   * returns it. Otherwise, obtains the layer, stores it in the memo map,
   * and adds a finalizer to the `Scope`.
   */
  getOrElseMemoize(layer3, scope4) {
    return pipe(modifyEffect(this.ref, (map27) => {
      const inMap = map27.get(layer3);
      if (inMap !== void 0) {
        const [acquire, release] = inMap;
        const cached3 = pipe(acquire, flatMap7(([patch9, b]) => pipe(patchFiberRefs(patch9), as(b))), onExit(exitMatch({
          onFailure: () => unit,
          onSuccess: () => scopeAddFinalizerExit(scope4, release)
        })));
        return succeed([cached3, map27]);
      }
      return pipe(make27(0), flatMap7((observers) => pipe(deferredMake(), flatMap7((deferred) => pipe(make27(() => unit), map9((finalizerRef) => {
        const resource = uninterruptibleMask((restore) => pipe(scopeMake(), flatMap7((innerScope) => pipe(restore(flatMap7(makeBuilder(layer3, innerScope, true), (f) => diffFiberRefs(f(this)))), exit, flatMap7((exit3) => {
          switch (exit3._tag) {
            case OP_FAILURE: {
              return pipe(deferredFailCause(deferred, exit3.i0), zipRight(scopeClose(innerScope, exit3)), zipRight(failCause(exit3.i0)));
            }
            case OP_SUCCESS: {
              return pipe(set6(finalizerRef, (exit4) => pipe(scopeClose(innerScope, exit4), whenEffect(modify2(observers, (n) => [n === 1, n - 1])), asUnit)), zipRight(update2(observers, (n) => n + 1)), zipRight(scopeAddFinalizerExit(scope4, (exit4) => pipe(sync(() => map27.delete(layer3)), zipRight(get11(finalizerRef)), flatMap7((finalizer2) => finalizer2(exit4))))), zipRight(deferredSucceed(deferred, exit3.i0)), as(exit3.i0[1]));
            }
          }
        })))));
        const memoized = [pipe(deferredAwait(deferred), onExit(exitMatchEffect({
          onFailure: () => unit,
          onSuccess: () => update2(observers, (n) => n + 1)
        }))), (exit3) => pipe(get11(finalizerRef), flatMap7((finalizer2) => finalizer2(exit3)))];
        return [resource, isFresh(layer3) ? map27 : map27.set(layer3, memoized)];
      }))))));
    }), flatten4);
  }
};
var makeMemoMap = /* @__PURE__ */ suspend(() => map9(makeSynchronized(/* @__PURE__ */ new Map()), (ref) => new MemoMapImpl(ref)));
var buildWithScope = /* @__PURE__ */ dual(2, (self, scope4) => flatMap7(makeMemoMap, (memoMap) => flatMap7(makeBuilder(self, scope4), (run4) => run4(memoMap))));
var makeBuilder = (self, scope4, inMemoMap = false) => {
  const op = self;
  switch (op._tag) {
    case "Locally": {
      return sync(() => (memoMap) => op.f(memoMap.getOrElseMemoize(op.self, scope4)));
    }
    case "ExtendScope": {
      return sync(() => (memoMap) => scopeWith((scope5) => memoMap.getOrElseMemoize(op.layer, scope5)));
    }
    case "Fold": {
      return sync(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.layer, scope4), matchCauseEffect({
        onFailure: (cause3) => memoMap.getOrElseMemoize(op.failureK(cause3), scope4),
        onSuccess: (value5) => memoMap.getOrElseMemoize(op.successK(value5), scope4)
      })));
    }
    case "Fresh": {
      return sync(() => (_) => pipe(op.layer, buildWithScope(scope4)));
    }
    case "FromEffect": {
      return inMemoMap ? sync(() => (_) => op.effect) : sync(() => (memoMap) => memoMap.getOrElseMemoize(self, scope4));
    }
    case "Provide": {
      return sync(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope4), flatMap7((env) => pipe(memoMap.getOrElseMemoize(op.second, scope4), provideContext(env)))));
    }
    case "Scoped": {
      return inMemoMap ? sync(() => (_) => scopeExtend(op.effect, scope4)) : sync(() => (memoMap) => memoMap.getOrElseMemoize(self, scope4));
    }
    case "Suspend": {
      return sync(() => (memoMap) => memoMap.getOrElseMemoize(op.evaluate(), scope4));
    }
    case "ProvideMerge": {
      return sync(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope4), zipWith2(memoMap.getOrElseMemoize(op.second, scope4), op.zipK)));
    }
    case "ZipWith": {
      return sync(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope4), zipWithOptions(memoMap.getOrElseMemoize(op.second, scope4), op.zipK, {
        concurrent: true
      })));
    }
  }
};
function fromEffectContext(effect2) {
  const fromEffect7 = Object.create(proto3);
  fromEffect7._tag = OP_FROM_EFFECT;
  fromEffect7.effect = effect2;
  return fromEffect7;
}
var succeed5 = /* @__PURE__ */ dual(2, (a, b) => {
  const tagFirst = isTag2(a);
  const tag4 = tagFirst ? a : b;
  const resource = tagFirst ? b : a;
  return fromEffectContext(succeed(make7(tag4, resource)));
});
var provideSomeLayer = /* @__PURE__ */ dual(2, (self, layer3) => acquireUseRelease(scopeMake(), (scope4) => flatMap7(buildWithScope(layer3, scope4), (context6) => provideSomeContext(self, context6)), (scope4, exit3) => scopeClose(scope4, exit3)));
var provideSomeRuntime = /* @__PURE__ */ dual(2, (self, rt) => {
  const patchRefs = diff6(defaultRuntime.fiberRefs, rt.fiberRefs);
  const patchFlags = diff4(defaultRuntime.runtimeFlags, rt.runtimeFlags);
  return uninterruptibleMask((restore) => withFiberRuntime((fiber) => {
    const oldRefs = fiber.getFiberRefs();
    const newRefs = patch7(fiber.id(), oldRefs)(patchRefs);
    const oldFlags = fiber._runtimeFlags;
    const newFlags = patch4(patchFlags)(oldFlags);
    const rollbackRefs = diff6(newRefs, oldRefs);
    const rollbackFlags = diff4(newFlags, oldFlags);
    fiber.setFiberRefs(newRefs);
    fiber._runtimeFlags = newFlags;
    return ensuring(provideSomeContext(restore(self), rt.context), withFiberRuntime((fiber2) => {
      fiber2.setFiberRefs(patch7(fiber2.id(), fiber2.getFiberRefs())(rollbackRefs));
      fiber2._runtimeFlags = patch4(rollbackFlags)(fiber2._runtimeFlags);
      return unit;
    }));
  }));
});
var effect_provide = /* @__PURE__ */ dual(2, (self, source) => isLayer(source) ? provideSomeLayer(self, source) : isContext2(source) ? provideSomeContext(self, source) : provideSomeRuntime(self, source));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/console.js
var console2 = /* @__PURE__ */ map9(/* @__PURE__ */ fiberRefGet(currentServices), /* @__PURE__ */ get3(consoleTag));
var consoleWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, consoleTag)));
var withConsole = /* @__PURE__ */ dual(2, (effect2, value5) => fiberRefLocallyWith(effect2, currentServices, add2(consoleTag, value5)));
var withConsoleScoped = (console4) => fiberRefLocallyScopedWith(currentServices, add2(consoleTag, console4));
var log2 = (...args) => consoleWith((_) => _.log(...args));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/query.js
var currentCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentCache"), () => fiberRefUnsafeMake(unsafeMakeWith(65536, () => map9(deferredMake(), (handle) => ({
  listeners: new Listeners(),
  handle
})), () => seconds(60))));
var currentCacheEnabled = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentCacheEnabled"), () => fiberRefUnsafeMake(false));
var fromRequest = (request2, dataSource) => flatMap7(isEffect(dataSource) ? dataSource : succeed(dataSource), (ds) => fiberIdWith((id2) => {
  const proxy = new Proxy(request2, {});
  return fiberRefGetWith(currentCacheEnabled, (cacheEnabled) => {
    if (cacheEnabled) {
      return fiberRefGetWith(currentCache, (cache) => flatMap7(cache.getEither(proxy), (orNew) => {
        switch (orNew._tag) {
          case "Left": {
            orNew.left.listeners.increment();
            return blocked(empty15, flatMap7(exit(deferredAwait(orNew.left.handle)), (exit3) => {
              if (exit3._tag === "Failure" && isInterruptedOnly(exit3.cause)) {
                orNew.left.listeners.decrement();
                return flatMap7(cache.invalidateWhen(proxy, (entry) => entry.handle === orNew.left.handle), () => fromRequest(proxy, ds));
              }
              return ensuring(deferredAwait(orNew.left.handle), sync(() => orNew.left.listeners.decrement()));
            }));
          }
          case "Right": {
            orNew.right.listeners.increment();
            return blocked(single(ds, makeEntry({
              request: proxy,
              result: orNew.right.handle,
              listeners: orNew.right.listeners,
              ownerId: id2,
              state: {
                completed: false
              }
            })), uninterruptibleMask((restore) => flatMap7(exit(restore(deferredAwait(orNew.right.handle))), (exit3) => {
              orNew.right.listeners.decrement();
              return exit3;
            })));
          }
        }
      }));
    }
    const listeners = new Listeners();
    listeners.increment();
    return flatMap7(deferredMake(), (ref) => blocked(single(ds, makeEntry({
      request: proxy,
      result: ref,
      listeners,
      ownerId: id2,
      state: {
        completed: false
      }
    })), ensuring(deferredAwait(ref), sync(() => listeners.decrement()))));
  });
}));
var cacheRequest = (request2, result) => {
  return fiberRefGetWith(currentCacheEnabled, (cacheEnabled) => {
    if (cacheEnabled) {
      return fiberRefGetWith(currentCache, (cache) => flatMap7(cache.getEither(request2), (orNew) => {
        switch (orNew._tag) {
          case "Left": {
            return unit;
          }
          case "Right": {
            return deferredComplete(orNew.right.handle, result);
          }
        }
      }));
    }
    return unit;
  });
};
var withRequestCaching = /* @__PURE__ */ dual(2, (self, strategy) => fiberRefLocally(self, currentCacheEnabled, strategy));
var withRequestCache = /* @__PURE__ */ dual(
  2,
  // @ts-expect-error
  (self, cache) => fiberRefLocally(self, currentCache, cache)
);

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Effect.js
var EffectTypeId4 = EffectTypeId2;
var isEffect2 = isEffect;
var cachedWithTTL = cached;
var cachedInvalidateWithTTL = cachedInvalidate;
var cached2 = memoize;
var cachedFunction = memoizeFunction;
var once2 = once;
var all5 = all4;
var allWith2 = allWith;
var allSuccesses2 = allSuccesses;
var dropUntil2 = dropUntil;
var dropWhile2 = dropWhile;
var every4 = every3;
var exists2 = exists;
var filter8 = filter6;
var findFirst5 = findFirst3;
var firstSuccessOf2 = firstSuccessOf;
var forEach8 = forEach7;
var head4 = head3;
var mergeAll2 = mergeAll;
var partition4 = partition3;
var reduce11 = reduce9;
var reduceEffect2 = reduceEffect;
var reduceRight3 = reduceRight2;
var reduceWhile2 = reduceWhile;
var replicate2 = replicate;
var replicateEffect2 = replicateEffect;
var takeUntil2 = takeUntil;
var takeWhile2 = takeWhile;
var validateAll2 = validateAll;
var validateFirst2 = validateFirst;
var async2 = async;
var asyncEffect2 = asyncEffect;
var asyncOption2 = asyncOption;
var asyncEither2 = asyncEither;
var fail6 = fail2;
var failSync2 = failSync;
var failCause5 = failCause;
var failCauseSync2 = failCauseSync;
var die5 = die2;
var dieMessage2 = dieMessage;
var dieSync2 = dieSync;
var gen2 = gen;
var never3 = never;
var none9 = none6;
var promise2 = promise;
var succeed6 = succeed;
var succeedNone2 = succeedNone;
var succeedSome2 = succeedSome;
var suspend2 = suspend;
var sync2 = sync;
var unit4 = unit;
var yieldNow3 = yieldNow;
var _catch2 = _catch;
var catchAll2 = catchAll;
var catchAllCause2 = catchAllCause;
var catchAllDefect2 = catchAllDefect;
var catchIf2 = catchIf;
var catchSome2 = catchSome;
var catchSomeCause2 = catchSomeCause;
var catchSomeDefect2 = catchSomeDefect;
var catchTag2 = catchTag;
var catchTags2 = catchTags;
var cause2 = cause;
var eventually2 = eventually;
var ignore2 = ignore;
var ignoreLogged2 = ignoreLogged;
var parallelErrors2 = parallelErrors;
var sandbox2 = sandbox;
var retry = retry_Effect;
var retryN = retryN_Effect;
var retryOrElse = retryOrElse_Effect;
var retryUntil = retryUntil_Effect;
var retryUntilEffect = retryUntilEffect_Effect;
var retryWhile = retryWhile_Effect;
var retryWhileEffect = retryWhileEffect_Effect;
var try_2 = try_;
var tryMap2 = tryMap;
var tryMapPromise2 = tryMapPromise;
var tryPromise2 = tryPromise;
var unsandbox2 = unsandbox;
var allowInterrupt2 = allowInterrupt;
var checkInterruptible2 = checkInterruptible;
var disconnect2 = disconnect;
var interrupt6 = interrupt2;
var interruptWith2 = interruptWith;
var interruptible3 = interruptible2;
var interruptibleMask2 = interruptibleMask;
var onInterrupt2 = onInterrupt;
var uninterruptible2 = uninterruptible;
var uninterruptibleMask2 = uninterruptibleMask;
var as3 = as;
var asSome2 = asSome;
var asSomeError2 = asSomeError;
var asUnit2 = asUnit;
var flip2 = flip;
var flipWith2 = flipWith;
var map13 = map9;
var mapAccum3 = mapAccum2;
var mapBoth2 = mapBoth;
var mapError2 = mapError;
var mapErrorCause2 = mapErrorCause;
var merge6 = merge5;
var negate2 = negate;
var acquireRelease2 = acquireRelease;
var acquireReleaseInterruptible2 = acquireReleaseInterruptible;
var acquireUseRelease2 = acquireUseRelease;
var addFinalizer3 = addFinalizer;
var ensuring2 = ensuring;
var onError2 = onError;
var onExit2 = onExit;
var parallelFinalizers2 = parallelFinalizers;
var finalizersMask2 = finalizersMask;
var sequentialFinalizers2 = sequentialFinalizers;
var scope2 = scope;
var scopeWith2 = scopeWith;
var scoped = scopedEffect;
var using2 = using;
var withEarlyRelease2 = withEarlyRelease;
var awaitAllChildren2 = awaitAllChildren;
var daemonChildren2 = daemonChildren;
var descriptor2 = descriptor;
var descriptorWith2 = descriptorWith;
var diffFiberRefs2 = diffFiberRefs;
var ensuringChild2 = ensuringChild;
var ensuringChildren2 = ensuringChildren;
var fiberId2 = fiberId;
var fiberIdWith2 = fiberIdWith;
var fork3 = fork;
var forkDaemon2 = forkDaemon;
var forkAll2 = forkAll;
var forkIn2 = forkIn;
var forkScoped2 = forkScoped;
var forkWithErrorHandler2 = forkWithErrorHandler;
var fromFiber2 = fromFiber;
var fromFiberEffect2 = fromFiberEffect;
var supervised2 = supervised;
var transplant2 = transplant;
var withConcurrency2 = withConcurrency;
var withScheduler2 = withScheduler;
var withSchedulingPriority2 = withSchedulingPriority;
var withMaxOpsBeforeYield2 = withMaxOpsBeforeYield;
var clock2 = clock;
var clockWith4 = clockWith3;
var withClockScoped2 = withClockScoped;
var withClock2 = withClock;
var console3 = console2;
var consoleWith2 = consoleWith;
var withConsoleScoped2 = withConsoleScoped;
var withConsole2 = withConsole;
var delay2 = delay;
var sleep4 = sleep3;
var timed2 = timed;
var timedWith2 = timedWith;
var timeout2 = timeout;
var timeoutFail2 = timeoutFail;
var timeoutFailCause2 = timeoutFailCause;
var timeoutTo2 = timeoutTo;
var configProviderWith2 = configProviderWith;
var withConfigProvider2 = withConfigProvider;
var withConfigProviderScoped2 = withConfigProviderScoped;
var context2 = context;
var contextWith2 = contextWith;
var contextWithEffect2 = contextWithEffect;
var mapInputContext2 = mapInputContext;
var provide = effect_provide;
var provideService2 = provideService;
var provideServiceEffect2 = provideServiceEffect;
var serviceFunction2 = serviceFunction;
var serviceFunctionEffect2 = serviceFunctionEffect;
var serviceFunctions2 = serviceFunctions;
var serviceConstants2 = serviceConstants;
var serviceMembers2 = serviceMembers;
var serviceOption2 = serviceOption;
var serviceOptional2 = serviceOptional;
var updateService2 = updateService;
var Do2 = Do;
var bind2 = bind;
var bindTo2 = bindTo;
var let_ = bindValue;
var either3 = either2;
var exit2 = exit;
var intoDeferred2 = intoDeferred;
var option2 = option;
var if_2 = if_;
var filterOrDie2 = filterOrDie;
var filterOrDieMessage2 = filterOrDieMessage;
var filterOrElse2 = filterOrElse;
var filterOrFail2 = filterOrFail;
var unless2 = unless;
var unlessEffect2 = unlessEffect;
var when2 = when;
var whenEffect2 = whenEffect;
var whenFiberRef2 = whenFiberRef;
var whenRef2 = whenRef;
var flatMap8 = flatMap7;
var andThen4 = andThen2;
var flatten6 = flatten4;
var raceAll2 = raceAll;
var race2 = race;
var raceFirst2 = raceFirst;
var raceWith2 = raceWith;
var summarized2 = summarized;
var tap2 = tap;
var tapBoth2 = tapBoth;
var tapDefect2 = tapDefect;
var tapError2 = tapError;
var tapErrorTag2 = tapErrorTag;
var tapErrorCause2 = tapErrorCause;
var forever2 = forever;
var iterate2 = iterate;
var loop2 = loop;
var repeat = repeat_Effect;
var repeatN2 = repeatN;
var repeatOrElse = repeatOrElse_Effect;
var repeatUntil = repeatUntil_Effect;
var repeatUntilEffect = repeatUntilEffect_Effect;
var repeatWhile = repeatWhile_Effect;
var repeatWhileEffect = repeatWhileEffect_Effect;
var schedule = schedule_Effect;
var scheduleForked2 = scheduleForked;
var scheduleFrom = scheduleFrom_Effect;
var whileLoop2 = whileLoop;
var getFiberRefs = fiberRefs2;
var inheritFiberRefs2 = inheritFiberRefs;
var locally2 = fiberRefLocally;
var locallyWith = fiberRefLocallyWith;
var locallyScoped = fiberRefLocallyScoped;
var locallyScopedWith = fiberRefLocallyScopedWith;
var patchFiberRefs2 = patchFiberRefs;
var setFiberRefs2 = setFiberRefs;
var updateFiberRefs2 = updateFiberRefs;
var isFailure4 = isFailure2;
var isSuccess2 = isSuccess;
var match10 = match6;
var matchCause2 = matchCause;
var matchCauseEffect2 = matchCauseEffect;
var matchEffect2 = matchEffect;
var log3 = log;
var logTrace2 = logTrace;
var logDebug2 = logDebug;
var logInfo2 = logInfo;
var logWarning2 = logWarning;
var logError2 = logError;
var logFatal2 = logFatal;
var withLogSpan2 = withLogSpan;
var annotateLogs2 = annotateLogs;
var logAnnotations2 = logAnnotations;
var withUnhandledErrorLogLevel2 = withUnhandledErrorLogLevel;
var orDie2 = orDie;
var orDieWith2 = orDieWith;
var orElse4 = orElse2;
var orElseFail2 = orElseFail;
var orElseSucceed2 = orElseSucceed;
var random3 = random2;
var randomWith2 = randomWith;
var runtime4 = runtime3;
var getRuntimeFlags = runtimeFlags;
var patchRuntimeFlags = updateRuntimeFlags;
var withRuntimeFlagsPatch = withRuntimeFlags;
var withRuntimeFlagsPatchScoped = withRuntimeFlagsScoped;
var tagMetrics2 = tagMetrics;
var labelMetrics2 = labelMetrics;
var tagMetricsScoped2 = tagMetricsScoped;
var labelMetricsScoped2 = labelMetricsScoped;
var metricLabels2 = metricLabels;
var withMetric2 = withMetric;
var unifiedFn = unified;
var unified2 = identity;
var unsafeMakeSemaphore2 = unsafeMakeSemaphore;
var makeSemaphore2 = makeSemaphore;
var runFork = unsafeForkEffect;
var runCallback = unsafeRunEffect;
var runPromise = unsafeRunPromiseEffect;
var runPromiseExit = unsafeRunPromiseExitEffect;
var runSync = unsafeRunSyncEffect;
var runSyncExit = unsafeRunSyncExitEffect;
var validate2 = validate;
var validateWith2 = validateWith;
var zip5 = zipOptions;
var zipLeft2 = zipLeftOptions;
var zipRight3 = zipRightOptions;
var zipWith3 = zipWithOptions;
var ap = /* @__PURE__ */ dual(2, (self, that) => zipWith3(self, that, (f, a) => f(a)));
var blocked2 = blocked;
var runRequestBlock2 = runRequestBlock;
var step3 = step2;
var request = fromRequest;
var cacheRequestResult = cacheRequest;
var withRequestBatching2 = withRequestBatching;
var withRequestCaching2 = withRequestCaching;
var withRequestCache2 = withRequestCache;
var tracer2 = tracer;
var tracerWith4 = tracerWith;
var withTracer2 = withTracer;
var withTracerScoped2 = withTracerScoped;
var withTracerTiming2 = withTracerTiming;
var annotateSpans2 = annotateSpans;
var annotateCurrentSpan2 = annotateCurrentSpan;
var currentSpan2 = currentSpan;
var currentParentSpan2 = currentParentSpan;
var spanAnnotations2 = spanAnnotations;
var spanLinks2 = spanLinks;
var linkSpans2 = linkSpans;
var makeSpan2 = makeSpan;
var makeSpanScoped2 = makeSpanScoped;
var useSpan2 = useSpan;
var withSpan2 = withSpan;
var withSpanScoped2 = withSpanScoped;
var withParentSpan2 = withParentSpan;
var fromNullable3 = fromNullable2;
var optionFromOptional2 = optionFromOptional;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Layer.js
var succeed7 = succeed5;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/queue.js
var EnqueueSymbolKey = "effect/QueueEnqueue";
var EnqueueTypeId = /* @__PURE__ */ Symbol.for(EnqueueSymbolKey);
var DequeueSymbolKey = "effect/QueueDequeue";
var DequeueTypeId = /* @__PURE__ */ Symbol.for(DequeueSymbolKey);
var QueueStrategySymbolKey = "effect/QueueStrategy";
var QueueStrategyTypeId = /* @__PURE__ */ Symbol.for(QueueStrategySymbolKey);
var BackingQueueSymbolKey = "effect/BackingQueue";
var BackingQueueTypeId = /* @__PURE__ */ Symbol.for(BackingQueueSymbolKey);
var queueStrategyVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var backingQueueVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var enqueueVariance = {
  /* c8 ignore next */
  _In: (_) => _
};
var dequeueVariance = {
  /* c8 ignore next */
  _Out: (_) => _
};
var QueueImpl = class {
  queue;
  takers;
  shutdownHook;
  shutdownFlag;
  strategy;
  [EnqueueTypeId] = enqueueVariance;
  [DequeueTypeId] = dequeueVariance;
  constructor(queue, takers, shutdownHook, shutdownFlag, strategy) {
    this.queue = queue;
    this.takers = takers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  capacity() {
    return this.queue.capacity();
  }
  get size() {
    return suspend(() => catchAll(this.unsafeSize(), () => interrupt2));
  }
  unsafeSize() {
    if (get6(this.shutdownFlag)) {
      return none2();
    }
    return some2(this.queue.length() - length2(this.takers) + this.strategy.surplusSize());
  }
  get isEmpty() {
    return map9(this.size, (size12) => size12 <= 0);
  }
  get isFull() {
    return map9(this.size, (size12) => size12 >= this.capacity());
  }
  get shutdown() {
    return uninterruptible(withFiberRuntime((state) => {
      pipe(this.shutdownFlag, set2(true));
      return pipe(forEachConcurrentDiscard(unsafePollAll(this.takers), (d) => deferredInterruptWith(d, state.id()), false, false), zipRight(this.strategy.shutdown), whenEffect(deferredSucceed(this.shutdownHook, void 0)), asUnit);
    }));
  }
  get isShutdown() {
    return sync(() => get6(this.shutdownFlag));
  }
  get awaitShutdown() {
    return deferredAwait(this.shutdownHook);
  }
  isActive() {
    return !get6(this.shutdownFlag);
  }
  unsafeOffer(value5) {
    if (get6(this.shutdownFlag)) {
      return false;
    }
    let noRemaining;
    if (this.queue.length() === 0) {
      const taker = pipe(this.takers, poll(EmptyMutableQueue));
      if (taker !== EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, value5);
        noRemaining = true;
      } else {
        noRemaining = false;
      }
    } else {
      noRemaining = false;
    }
    if (noRemaining) {
      return true;
    }
    const succeeded = this.queue.offer(value5);
    unsafeCompleteTakers(this.strategy, this.queue, this.takers);
    return succeeded;
  }
  offer(value5) {
    return suspend(() => {
      if (get6(this.shutdownFlag)) {
        return interrupt2;
      }
      let noRemaining;
      if (this.queue.length() === 0) {
        const taker = pipe(this.takers, poll(EmptyMutableQueue));
        if (taker !== EmptyMutableQueue) {
          unsafeCompleteDeferred(taker, value5);
          noRemaining = true;
        } else {
          noRemaining = false;
        }
      } else {
        noRemaining = false;
      }
      if (noRemaining) {
        return succeed(true);
      }
      const succeeded = this.queue.offer(value5);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return succeeded ? succeed(true) : this.strategy.handleSurplus([value5], this.queue, this.takers, this.shutdownFlag);
    });
  }
  offerAll(iterable) {
    return suspend(() => {
      if (get6(this.shutdownFlag)) {
        return interrupt2;
      }
      const values3 = fromIterable(iterable);
      const pTakers = this.queue.length() === 0 ? fromIterable(unsafePollN(this.takers, values3.length)) : empty;
      const [forTakers, remaining] = pipe(values3, splitAt(pTakers.length));
      for (let i = 0; i < pTakers.length; i++) {
        const taker = pTakers[i];
        const item = forTakers[i];
        unsafeCompleteDeferred(taker, item);
      }
      if (remaining.length === 0) {
        return succeed(true);
      }
      const surplus = this.queue.offerAll(remaining);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return isEmpty(surplus) ? succeed(true) : this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag);
    });
  }
  get take() {
    return withFiberRuntime((state) => {
      if (get6(this.shutdownFlag)) {
        return interrupt2;
      }
      const item = this.queue.poll(EmptyMutableQueue);
      if (item !== EmptyMutableQueue) {
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return succeed(item);
      } else {
        const deferred = deferredUnsafeMake(state.id());
        return pipe(suspend(() => {
          pipe(this.takers, offer(deferred));
          unsafeCompleteTakers(this.strategy, this.queue, this.takers);
          return get6(this.shutdownFlag) ? interrupt2 : deferredAwait(deferred);
        }), onInterrupt(() => {
          return sync(() => unsafeRemove(this.takers, deferred));
        }));
      }
    });
  }
  get takeAll() {
    return suspend(() => {
      return get6(this.shutdownFlag) ? interrupt2 : sync(() => {
        const values3 = this.queue.pollUpTo(Number.POSITIVE_INFINITY);
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return fromIterable2(values3);
      });
    });
  }
  takeUpTo(max6) {
    return suspend(() => get6(this.shutdownFlag) ? interrupt2 : sync(() => {
      const values3 = this.queue.pollUpTo(max6);
      this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
      return fromIterable2(values3);
    }));
  }
  takeBetween(min4, max6) {
    return suspend(() => takeRemainderLoop(this, min4, max6, empty4()));
  }
};
var takeRemainderLoop = (self, min4, max6, acc) => {
  if (max6 < min4) {
    return succeed(acc);
  }
  return pipe(takeUpTo(self, max6), flatMap7((bs) => {
    const remaining = min4 - bs.length;
    if (remaining === 1) {
      return pipe(take(self), map9((b) => pipe(acc, appendAll2(bs), append2(b))));
    }
    if (remaining > 1) {
      return pipe(take(self), flatMap7((b) => takeRemainderLoop(self, remaining - 1, max6 - bs.length - 1, pipe(acc, appendAll2(bs), append2(b)))));
    }
    return succeed(pipe(acc, appendAll2(bs)));
  }));
};
var bounded2 = (requestedCapacity) => pipe(sync(() => bounded(requestedCapacity)), flatMap7((queue) => make40(backingQueueFromMutableQueue(queue), backPressureStrategy())));
var dropping = (requestedCapacity) => pipe(sync(() => bounded(requestedCapacity)), flatMap7((queue) => make40(backingQueueFromMutableQueue(queue), droppingStrategy())));
var sliding = (requestedCapacity) => pipe(sync(() => bounded(requestedCapacity)), flatMap7((queue) => make40(backingQueueFromMutableQueue(queue), slidingStrategy())));
var unbounded2 = () => pipe(sync(() => unbounded()), flatMap7((queue) => make40(backingQueueFromMutableQueue(queue), droppingStrategy())));
var unsafeMake8 = (queue, takers, shutdownHook, shutdownFlag, strategy) => {
  return new QueueImpl(queue, takers, shutdownHook, shutdownFlag, strategy);
};
var make40 = (queue, strategy) => pipe(deferredMake(), map9((deferred) => unsafeMake8(queue, unbounded(), deferred, make11(false), strategy)));
var BackingQueueFromMutableQueue = class {
  mutable;
  [BackingQueueTypeId] = backingQueueVariance;
  constructor(mutable2) {
    this.mutable = mutable2;
  }
  poll(def) {
    return poll(this.mutable, def);
  }
  pollUpTo(limit) {
    return pollUpTo(this.mutable, limit);
  }
  offerAll(elements) {
    return offerAll(this.mutable, elements);
  }
  offer(element) {
    return offer(this.mutable, element);
  }
  capacity() {
    return capacity(this.mutable);
  }
  length() {
    return length2(this.mutable);
  }
};
var backingQueueFromMutableQueue = (mutable2) => new BackingQueueFromMutableQueue(mutable2);
var size10 = (self) => self.size;
var shutdown = (self) => self.shutdown;
var offer2 = /* @__PURE__ */ dual(2, (self, value5) => self.offer(value5));
var take = (self) => self.take;
var takeUpTo = /* @__PURE__ */ dual(2, (self, max6) => self.takeUpTo(max6));
var backPressureStrategy = () => new BackPressureStrategy();
var droppingStrategy = () => new DroppingStrategy();
var slidingStrategy = () => new SlidingStrategy();
var BackPressureStrategy = class {
  [QueueStrategyTypeId] = queueStrategyVariance;
  putters = unbounded();
  surplusSize() {
    return length2(this.putters);
  }
  onCompleteTakersWithEmptyQueue(takers) {
    while (!isEmpty7(this.putters) && !isEmpty7(takers)) {
      const taker = poll(takers, void 0);
      const putter = poll(this.putters, void 0);
      if (putter[2]) {
        unsafeCompleteDeferred(putter[1], true);
      }
      unsafeCompleteDeferred(taker, putter[0]);
    }
  }
  get shutdown() {
    return pipe(fiberId, flatMap7((fiberId3) => pipe(sync(() => unsafePollAll(this.putters)), flatMap7((putters) => forEachConcurrentDiscard(putters, ([_, deferred, isLastItem]) => isLastItem ? pipe(deferredInterruptWith(deferred, fiberId3), asUnit) : unit, false, false)))));
  }
  handleSurplus(iterable, queue, takers, isShutdown3) {
    return withFiberRuntime((state) => {
      const deferred = deferredUnsafeMake(state.id());
      return pipe(suspend(() => {
        this.unsafeOffer(iterable, deferred);
        this.unsafeOnQueueEmptySpace(queue, takers);
        unsafeCompleteTakers(this, queue, takers);
        return get6(isShutdown3) ? interrupt2 : deferredAwait(deferred);
      }), onInterrupt(() => sync(() => this.unsafeRemove(deferred))));
    });
  }
  unsafeOnQueueEmptySpace(queue, takers) {
    let keepPolling = true;
    while (keepPolling && (queue.capacity() === Number.POSITIVE_INFINITY || queue.length() < queue.capacity())) {
      const putter = pipe(this.putters, poll(EmptyMutableQueue));
      if (putter === EmptyMutableQueue) {
        keepPolling = false;
      } else {
        const offered = queue.offer(putter[0]);
        if (offered && putter[2]) {
          unsafeCompleteDeferred(putter[1], true);
        } else if (!offered) {
          unsafeOfferAll(this.putters, pipe(unsafePollAll(this.putters), prepend2(putter)));
        }
        unsafeCompleteTakers(this, queue, takers);
      }
    }
  }
  unsafeOffer(iterable, deferred) {
    const stuff = Array.from(iterable);
    for (let i = 0; i < stuff.length; i++) {
      const value5 = stuff[i];
      if (i === stuff.length - 1) {
        pipe(this.putters, offer([value5, deferred, true]));
      } else {
        pipe(this.putters, offer([value5, deferred, false]));
      }
    }
  }
  unsafeRemove(deferred) {
    unsafeOfferAll(this.putters, pipe(unsafePollAll(this.putters), filter3(([, _]) => _ !== deferred)));
  }
};
var DroppingStrategy = class {
  [QueueStrategyTypeId] = queueStrategyVariance;
  surplusSize() {
    return 0;
  }
  get shutdown() {
    return unit;
  }
  onCompleteTakersWithEmptyQueue() {
  }
  handleSurplus(_iterable, _queue, _takers, _isShutdown) {
    return succeed(false);
  }
  unsafeOnQueueEmptySpace(_queue, _takers) {
  }
};
var SlidingStrategy = class {
  [QueueStrategyTypeId] = queueStrategyVariance;
  surplusSize() {
    return 0;
  }
  get shutdown() {
    return unit;
  }
  onCompleteTakersWithEmptyQueue() {
  }
  handleSurplus(iterable, queue, takers, _isShutdown) {
    return sync(() => {
      this.unsafeOffer(queue, iterable);
      unsafeCompleteTakers(this, queue, takers);
      return true;
    });
  }
  unsafeOnQueueEmptySpace(_queue, _takers) {
  }
  unsafeOffer(queue, iterable) {
    const iterator = iterable[Symbol.iterator]();
    let next;
    let offering = true;
    while (!(next = iterator.next()).done && offering) {
      if (queue.capacity() === 0) {
        return;
      }
      queue.poll(EmptyMutableQueue);
      offering = queue.offer(next.value);
    }
  }
};
var unsafeCompleteDeferred = (deferred, a) => {
  return deferredUnsafeDone(deferred, succeed(a));
};
var unsafeOfferAll = (queue, as7) => {
  return pipe(queue, offerAll(as7));
};
var unsafePollAll = (queue) => {
  return pipe(queue, pollUpTo(Number.POSITIVE_INFINITY));
};
var unsafePollN = (queue, max6) => {
  return pipe(queue, pollUpTo(max6));
};
var unsafeRemove = (queue, a) => {
  unsafeOfferAll(queue, pipe(unsafePollAll(queue), filter3((b) => a !== b)));
};
var unsafeCompleteTakers = (strategy, queue, takers) => {
  let keepPolling = true;
  while (keepPolling && queue.length() !== 0) {
    const taker = pipe(takers, poll(EmptyMutableQueue));
    if (taker !== EmptyMutableQueue) {
      const element = queue.poll(EmptyMutableQueue);
      if (element !== EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, element);
        strategy.unsafeOnQueueEmptySpace(queue, takers);
      } else {
        unsafeOfferAll(takers, pipe(unsafePollAll(takers), prepend2(taker)));
      }
      keepPolling = true;
    } else {
      keepPolling = false;
    }
  }
  if (keepPolling && queue.length() === 0 && !isEmpty7(takers)) {
    strategy.onCompleteTakersWithEmptyQueue(takers);
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Queue.js
var bounded3 = bounded2;
var dropping2 = dropping;
var sliding2 = sliding;
var unbounded3 = unbounded2;
var size11 = size10;
var shutdown2 = shutdown;
var offer3 = offer2;
var take2 = take;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelChildExecutorDecision.js
var OP_CONTINUE = "Continue";
var OP_CLOSE = "Close";
var OP_YIELD2 = "Yield";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/childExecutorDecision.js
var ChildExecutorDecisionSymbolKey = "effect/ChannelChildExecutorDecision";
var ChildExecutorDecisionTypeId = /* @__PURE__ */ Symbol.for(ChildExecutorDecisionSymbolKey);
var proto4 = {
  [ChildExecutorDecisionTypeId]: ChildExecutorDecisionTypeId
};
var Continue = (_) => {
  const op = Object.create(proto4);
  op._tag = OP_CONTINUE;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/continuation.js
var OP_CONTINUATION_K = "ContinuationK";
var OP_CONTINUATION_FINALIZER = "ContinuationFinalizer";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/continuation.js
var ContinuationTypeId = /* @__PURE__ */ Symbol.for("effect/ChannelContinuation");
var continuationVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _,
  /* c8 ignore next */
  _OutErr2: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone2: (_) => _
};
var ContinuationKImpl = class {
  onSuccess;
  onHalt;
  _tag = OP_CONTINUATION_K;
  [ContinuationTypeId] = continuationVariance;
  constructor(onSuccess, onHalt) {
    this.onSuccess = onSuccess;
    this.onHalt = onHalt;
  }
  onExit(exit3) {
    return isFailure(exit3) ? this.onHalt(exit3.cause) : this.onSuccess(exit3.value);
  }
};
var ContinuationFinalizerImpl = class {
  finalizer;
  _tag = OP_CONTINUATION_FINALIZER;
  [ContinuationTypeId] = continuationVariance;
  constructor(finalizer2) {
    this.finalizer = finalizer2;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelUpstreamPullStrategy.js
var OP_PULL_AFTER_NEXT = "PullAfterNext";
var OP_PULL_AFTER_ALL_ENQUEUED = "PullAfterAllEnqueued";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/upstreamPullStrategy.js
var UpstreamPullStrategySymbolKey = "effect/ChannelUpstreamPullStrategy";
var UpstreamPullStrategyTypeId = /* @__PURE__ */ Symbol.for(UpstreamPullStrategySymbolKey);
var upstreamPullStrategyVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var proto5 = {
  [UpstreamPullStrategyTypeId]: upstreamPullStrategyVariance
};
var PullAfterNext = (emitSeparator) => {
  const op = Object.create(proto5);
  op._tag = OP_PULL_AFTER_NEXT;
  op.emitSeparator = emitSeparator;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channel.js
var OP_BRACKET_OUT = "BracketOut";
var OP_BRIDGE = "Bridge";
var OP_CONCAT_ALL = "ConcatAll";
var OP_EMIT = "Emit";
var OP_ENSURING = "Ensuring";
var OP_FAIL3 = "Fail";
var OP_FOLD2 = "Fold";
var OP_FROM_EFFECT2 = "FromEffect";
var OP_PIPE_TO = "PipeTo";
var OP_PROVIDE2 = "Provide";
var OP_READ = "Read";
var OP_SUCCEED = "Succeed";
var OP_SUCCEED_NOW = "SucceedNow";
var OP_SUSPEND2 = "Suspend";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/core-stream.js
var ChannelSymbolKey = "effect/Channel";
var ChannelTypeId2 = /* @__PURE__ */ Symbol.for(ChannelSymbolKey);
var channelVariance2 = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
var proto6 = {
  [ChannelTypeId2]: channelVariance2,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isChannel = (u) => hasProperty(u, ChannelTypeId2) || isEffect2(u);
var acquireReleaseOut = /* @__PURE__ */ dual(2, (self, release) => {
  const op = Object.create(proto6);
  op._tag = OP_BRACKET_OUT;
  op.acquire = () => self;
  op.finalizer = release;
  return op;
});
var concatAllWith = (channels, f, g) => {
  const op = Object.create(proto6);
  op._tag = OP_CONCAT_ALL;
  op.combineInners = f;
  op.combineAll = g;
  op.onPull = () => PullAfterNext(none2());
  op.onEmit = () => Continue;
  op.value = () => channels;
  op.k = identity;
  return op;
};
var concatMapWith = /* @__PURE__ */ dual(4, (self, f, g, h) => {
  const op = Object.create(proto6);
  op._tag = OP_CONCAT_ALL;
  op.combineInners = g;
  op.combineAll = h;
  op.onPull = () => PullAfterNext(none2());
  op.onEmit = () => Continue;
  op.value = () => self;
  op.k = f;
  return op;
});
var embedInput = /* @__PURE__ */ dual(2, (self, input) => {
  const op = Object.create(proto6);
  op._tag = OP_BRIDGE;
  op.input = input;
  op.channel = self;
  return op;
});
var ensuringWith = /* @__PURE__ */ dual(2, (self, finalizer2) => {
  const op = Object.create(proto6);
  op._tag = OP_ENSURING;
  op.channel = self;
  op.finalizer = finalizer2;
  return op;
});
var fail8 = (error2) => failCause7(fail4(error2));
var failCause7 = (cause3) => failCauseSync4(() => cause3);
var failCauseSync4 = (evaluate) => {
  const op = Object.create(proto6);
  op._tag = OP_FAIL3;
  op.error = evaluate;
  return op;
};
var flatMap10 = /* @__PURE__ */ dual(2, (self, f) => {
  const op = Object.create(proto6);
  op._tag = OP_FOLD2;
  op.channel = self;
  op.k = new ContinuationKImpl(f, failCause7);
  return op;
});
var fromEffect4 = (effect2) => {
  const op = Object.create(proto6);
  op._tag = OP_FROM_EFFECT2;
  op.effect = () => effect2;
  return op;
};
var pipeTo = /* @__PURE__ */ dual(2, (self, that) => {
  const op = Object.create(proto6);
  op._tag = OP_PIPE_TO;
  op.left = () => self;
  op.right = () => that;
  return op;
});
var readWith = (options3) => readWithCause({
  onInput: options3.onInput,
  onFailure: (cause3) => match2(failureOrCause2(cause3), {
    onLeft: options3.onFailure,
    onRight: failCause7
  }),
  onDone: options3.onDone
});
var readWithCause = (options3) => {
  const op = Object.create(proto6);
  op._tag = OP_READ;
  op.more = options3.onInput;
  op.done = new ContinuationKImpl(options3.onDone, options3.onFailure);
  return op;
};
var succeed8 = (value5) => sync4(() => value5);
var succeedNow = (result) => {
  const op = Object.create(proto6);
  op._tag = OP_SUCCEED_NOW;
  op.terminal = result;
  return op;
};
var sync4 = (evaluate) => {
  const op = Object.create(proto6);
  op._tag = OP_SUCCEED;
  op.evaluate = evaluate;
  return op;
};
var unit5 = /* @__PURE__ */ succeedNow(void 0);
var write = (out) => {
  const op = Object.create(proto6);
  op._tag = OP_EMIT;
  op.out = out;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelState.js
var OP_DONE3 = "Done";
var OP_EMIT2 = "Emit";
var OP_FROM_EFFECT3 = "FromEffect";
var OP_READ2 = "Read";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/channelState.js
var ChannelStateTypeId = /* @__PURE__ */ Symbol.for("effect/ChannelState");
var channelStateVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _
};
var proto7 = {
  [ChannelStateTypeId]: channelStateVariance
};
var Done2 = () => {
  const op = Object.create(proto7);
  op._tag = OP_DONE3;
  return op;
};
var Emit = () => {
  const op = Object.create(proto7);
  op._tag = OP_EMIT2;
  return op;
};
var FromEffect = (effect2) => {
  const op = Object.create(proto7);
  op._tag = OP_FROM_EFFECT3;
  op.effect = effect2;
  return op;
};
var Read = (upstream, onEffect, onEmit, onDone2) => {
  const op = Object.create(proto7);
  op._tag = OP_READ2;
  op.upstream = upstream;
  op.onEffect = onEffect;
  op.onEmit = onEmit;
  op.onDone = onDone2;
  return op;
};
var isFromEffect = (self) => self._tag === OP_FROM_EFFECT3;
var effect = (self) => isFromEffect(self) ? self.effect : unit4;
var effectOrUndefinedIgnored = (self) => isFromEffect(self) ? ignore2(self.effect) : void 0;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/subexecutor.js
var OP_PULL_FROM_CHILD = "PullFromChild";
var OP_PULL_FROM_UPSTREAM = "PullFromUpstream";
var OP_DRAIN_CHILD_EXECUTORS = "DrainChildExecutors";
var OP_EMIT3 = "Emit";
var PullFromChild = class {
  childExecutor;
  parentSubexecutor;
  onEmit;
  _tag = OP_PULL_FROM_CHILD;
  constructor(childExecutor, parentSubexecutor, onEmit) {
    this.childExecutor = childExecutor;
    this.parentSubexecutor = parentSubexecutor;
    this.onEmit = onEmit;
  }
  close(exit3) {
    const fin1 = this.childExecutor.close(exit3);
    const fin2 = this.parentSubexecutor.close(exit3);
    if (fin1 !== void 0 && fin2 !== void 0) {
      return zipWith3(exit2(fin1), exit2(fin2), (exit1, exit22) => pipe(exit1, zipRight2(exit22)));
    } else if (fin1 !== void 0) {
      return fin1;
    } else if (fin2 !== void 0) {
      return fin2;
    } else {
      return void 0;
    }
  }
  enqueuePullFromChild(_child) {
    return this;
  }
};
var PullFromUpstream = class _PullFromUpstream {
  upstreamExecutor;
  createChild;
  lastDone;
  activeChildExecutors;
  combineChildResults;
  combineWithChildResult;
  onPull;
  onEmit;
  _tag = OP_PULL_FROM_UPSTREAM;
  constructor(upstreamExecutor, createChild, lastDone, activeChildExecutors, combineChildResults, combineWithChildResult, onPull, onEmit) {
    this.upstreamExecutor = upstreamExecutor;
    this.createChild = createChild;
    this.lastDone = lastDone;
    this.activeChildExecutors = activeChildExecutors;
    this.combineChildResults = combineChildResults;
    this.combineWithChildResult = combineWithChildResult;
    this.onPull = onPull;
    this.onEmit = onEmit;
  }
  close(exit3) {
    const fin1 = this.upstreamExecutor.close(exit3);
    const fins = [...this.activeChildExecutors.map((child) => child !== void 0 ? child.childExecutor.close(exit3) : void 0), fin1];
    const result = fins.reduce((acc, next) => {
      if (acc !== void 0 && next !== void 0) {
        return zipWith3(acc, exit2(next), (exit1, exit22) => zipRight2(exit1, exit22));
      } else if (acc !== void 0) {
        return acc;
      } else if (next !== void 0) {
        return exit2(next);
      } else {
        return void 0;
      }
    }, void 0);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(child) {
    return new _PullFromUpstream(this.upstreamExecutor, this.createChild, this.lastDone, [...this.activeChildExecutors, child], this.combineChildResults, this.combineWithChildResult, this.onPull, this.onEmit);
  }
};
var DrainChildExecutors = class _DrainChildExecutors {
  upstreamExecutor;
  lastDone;
  activeChildExecutors;
  upstreamDone;
  combineChildResults;
  combineWithChildResult;
  onPull;
  _tag = OP_DRAIN_CHILD_EXECUTORS;
  constructor(upstreamExecutor, lastDone, activeChildExecutors, upstreamDone, combineChildResults, combineWithChildResult, onPull) {
    this.upstreamExecutor = upstreamExecutor;
    this.lastDone = lastDone;
    this.activeChildExecutors = activeChildExecutors;
    this.upstreamDone = upstreamDone;
    this.combineChildResults = combineChildResults;
    this.combineWithChildResult = combineWithChildResult;
    this.onPull = onPull;
  }
  close(exit3) {
    const fin1 = this.upstreamExecutor.close(exit3);
    const fins = [...this.activeChildExecutors.map((child) => child !== void 0 ? child.childExecutor.close(exit3) : void 0), fin1];
    const result = fins.reduce((acc, next) => {
      if (acc !== void 0 && next !== void 0) {
        return zipWith3(acc, exit2(next), (exit1, exit22) => zipRight2(exit1, exit22));
      } else if (acc !== void 0) {
        return acc;
      } else if (next !== void 0) {
        return exit2(next);
      } else {
        return void 0;
      }
    }, void 0);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(child) {
    return new _DrainChildExecutors(this.upstreamExecutor, this.lastDone, [...this.activeChildExecutors, child], this.upstreamDone, this.combineChildResults, this.combineWithChildResult, this.onPull);
  }
};
var Emit2 = class {
  value;
  next;
  _tag = OP_EMIT3;
  constructor(value5, next) {
    this.value = value5;
    this.next = next;
  }
  close(exit3) {
    const result = this.next.close(exit3);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(_child) {
    return this;
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelUpstreamPullRequest.js
var OP_PULLED = "Pulled";
var OP_NO_UPSTREAM = "NoUpstream";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/upstreamPullRequest.js
var UpstreamPullRequestSymbolKey = "effect/ChannelUpstreamPullRequest";
var UpstreamPullRequestTypeId = /* @__PURE__ */ Symbol.for(UpstreamPullRequestSymbolKey);
var upstreamPullRequestVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
var proto8 = {
  [UpstreamPullRequestTypeId]: upstreamPullRequestVariance
};
var Pulled = (value5) => {
  const op = Object.create(proto8);
  op._tag = OP_PULLED;
  op.value = value5;
  return op;
};
var NoUpstream = (activeDownstreamCount) => {
  const op = Object.create(proto8);
  op._tag = OP_NO_UPSTREAM;
  op.activeDownstreamCount = activeDownstreamCount;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/channelExecutor.js
var ChannelExecutor = class _ChannelExecutor {
  _activeSubexecutor = void 0;
  _cancelled = void 0;
  _closeLastSubstream = void 0;
  _currentChannel;
  _done = void 0;
  _doneStack = [];
  _emitted = void 0;
  _executeCloseLastSubstream;
  _input = void 0;
  _inProgressFinalizer = void 0;
  _providedEnv;
  constructor(initialChannel, providedEnv, executeCloseLastSubstream) {
    this._currentChannel = initialChannel;
    this._executeCloseLastSubstream = executeCloseLastSubstream;
    this._providedEnv = providedEnv;
  }
  run() {
    let result = void 0;
    while (result === void 0) {
      if (this._cancelled !== void 0) {
        result = this.processCancellation();
      } else if (this._activeSubexecutor !== void 0) {
        result = this.runSubexecutor();
      } else {
        try {
          if (this._currentChannel === void 0) {
            result = Done2();
          } else {
            if (isEffect2(this._currentChannel)) {
              this._currentChannel = fromEffect4(this._currentChannel);
            } else {
              switch (this._currentChannel._tag) {
                case OP_BRACKET_OUT: {
                  result = this.runBracketOut(this._currentChannel);
                  break;
                }
                case OP_BRIDGE: {
                  const bridgeInput = this._currentChannel.input;
                  this._currentChannel = this._currentChannel.channel;
                  if (this._input !== void 0) {
                    const inputExecutor = this._input;
                    this._input = void 0;
                    const drainer = () => flatMap8(bridgeInput.awaitRead(), () => suspend2(() => {
                      const state = inputExecutor.run();
                      switch (state._tag) {
                        case OP_DONE3: {
                          return match5(inputExecutor.getDone(), {
                            onFailure: (cause3) => bridgeInput.error(cause3),
                            onSuccess: (value5) => bridgeInput.done(value5)
                          });
                        }
                        case OP_EMIT2: {
                          return flatMap8(bridgeInput.emit(inputExecutor.getEmit()), () => drainer());
                        }
                        case OP_FROM_EFFECT3: {
                          return matchCauseEffect2(state.effect, {
                            onFailure: (cause3) => bridgeInput.error(cause3),
                            onSuccess: () => drainer()
                          });
                        }
                        case OP_READ2: {
                          return readUpstream(state, () => drainer(), (cause3) => bridgeInput.error(cause3));
                        }
                      }
                    }));
                    result = FromEffect(flatMap8(forkDaemon2(drainer()), (fiber) => sync2(() => this.addFinalizer((exit3) => flatMap8(interrupt5(fiber), () => suspend2(() => {
                      const effect2 = this.restorePipe(exit3, inputExecutor);
                      return effect2 !== void 0 ? effect2 : unit4;
                    }))))));
                  }
                  break;
                }
                case OP_CONCAT_ALL: {
                  const executor = new _ChannelExecutor(this._currentChannel.value(), this._providedEnv, (effect2) => sync2(() => {
                    const prevLastClose = this._closeLastSubstream === void 0 ? unit4 : this._closeLastSubstream;
                    this._closeLastSubstream = pipe(prevLastClose, zipRight3(effect2));
                  }));
                  executor._input = this._input;
                  const channel = this._currentChannel;
                  this._activeSubexecutor = new PullFromUpstream(executor, (value5) => channel.k(value5), void 0, [], (x, y) => channel.combineInners(x, y), (x, y) => channel.combineAll(x, y), (request2) => channel.onPull(request2), (value5) => channel.onEmit(value5));
                  this._closeLastSubstream = void 0;
                  this._currentChannel = void 0;
                  break;
                }
                case OP_EMIT: {
                  this._emitted = this._currentChannel.out;
                  this._currentChannel = this._activeSubexecutor !== void 0 ? void 0 : unit5;
                  result = Emit();
                  break;
                }
                case OP_ENSURING: {
                  this.runEnsuring(this._currentChannel);
                  break;
                }
                case OP_FAIL3: {
                  result = this.doneHalt(this._currentChannel.error());
                  break;
                }
                case OP_FOLD2: {
                  this._doneStack.push(this._currentChannel.k);
                  this._currentChannel = this._currentChannel.channel;
                  break;
                }
                case OP_FROM_EFFECT2: {
                  const effect2 = this._providedEnv === void 0 ? this._currentChannel.effect() : pipe(this._currentChannel.effect(), provide(this._providedEnv));
                  result = FromEffect(matchCauseEffect2(effect2, {
                    onFailure: (cause3) => {
                      const state = this.doneHalt(cause3);
                      return state !== void 0 && isFromEffect(state) ? state.effect : unit4;
                    },
                    onSuccess: (value5) => {
                      const state = this.doneSucceed(value5);
                      return state !== void 0 && isFromEffect(state) ? state.effect : unit4;
                    }
                  }));
                  break;
                }
                case OP_PIPE_TO: {
                  const previousInput = this._input;
                  const leftExec = new _ChannelExecutor(this._currentChannel.left(), this._providedEnv, (effect2) => this._executeCloseLastSubstream(effect2));
                  leftExec._input = previousInput;
                  this._input = leftExec;
                  this.addFinalizer((exit3) => {
                    const effect2 = this.restorePipe(exit3, previousInput);
                    return effect2 !== void 0 ? effect2 : unit4;
                  });
                  this._currentChannel = this._currentChannel.right();
                  break;
                }
                case OP_PROVIDE2: {
                  const previousEnv = this._providedEnv;
                  this._providedEnv = this._currentChannel.context();
                  this._currentChannel = this._currentChannel.inner;
                  this.addFinalizer(() => sync2(() => {
                    this._providedEnv = previousEnv;
                  }));
                  break;
                }
                case OP_READ: {
                  const read2 = this._currentChannel;
                  result = Read(this._input, identity, (emitted) => {
                    try {
                      this._currentChannel = read2.more(emitted);
                    } catch (error2) {
                      this._currentChannel = read2.done.onExit(die3(error2));
                    }
                    return void 0;
                  }, (exit3) => {
                    const onExit3 = (exit4) => {
                      return read2.done.onExit(exit4);
                    };
                    this._currentChannel = onExit3(exit3);
                    return void 0;
                  });
                  break;
                }
                case OP_SUCCEED: {
                  result = this.doneSucceed(this._currentChannel.evaluate());
                  break;
                }
                case OP_SUCCEED_NOW: {
                  result = this.doneSucceed(this._currentChannel.terminal);
                  break;
                }
                case OP_SUSPEND2: {
                  this._currentChannel = this._currentChannel.channel();
                  break;
                }
                default: {
                  this._currentChannel._tag;
                }
              }
            }
          }
        } catch (error2) {
          this._currentChannel = failCause7(die4(error2));
        }
      }
    }
    return result;
  }
  getDone() {
    return this._done;
  }
  getEmit() {
    return this._emitted;
  }
  cancelWith(exit3) {
    this._cancelled = exit3;
  }
  clearInProgressFinalizer() {
    this._inProgressFinalizer = void 0;
  }
  storeInProgressFinalizer(finalizer2) {
    this._inProgressFinalizer = finalizer2;
  }
  popAllFinalizers(exit3) {
    const finalizers = [];
    let next = this._doneStack.pop();
    while (next) {
      if (next._tag === "ContinuationFinalizer") {
        finalizers.push(next.finalizer);
      }
      next = this._doneStack.pop();
    }
    const effect2 = finalizers.length === 0 ? unit4 : runFinalizers(finalizers, exit3);
    this.storeInProgressFinalizer(effect2);
    return effect2;
  }
  popNextFinalizers() {
    const builder = [];
    while (this._doneStack.length !== 0) {
      const cont = this._doneStack[this._doneStack.length - 1];
      if (cont._tag === OP_CONTINUATION_K) {
        return builder;
      }
      builder.push(cont);
      this._doneStack.pop();
    }
    return builder;
  }
  restorePipe(exit3, prev) {
    const currInput = this._input;
    this._input = prev;
    if (currInput !== void 0) {
      const effect2 = currInput.close(exit3);
      return effect2;
    }
    return unit4;
  }
  close(exit3) {
    let runInProgressFinalizers = void 0;
    const finalizer2 = this._inProgressFinalizer;
    if (finalizer2 !== void 0) {
      runInProgressFinalizers = pipe(finalizer2, ensuring2(sync2(() => this.clearInProgressFinalizer())));
    }
    let closeSelf = void 0;
    const selfFinalizers = this.popAllFinalizers(exit3);
    if (selfFinalizers !== void 0) {
      closeSelf = pipe(selfFinalizers, ensuring2(sync2(() => this.clearInProgressFinalizer())));
    }
    const closeSubexecutors = this._activeSubexecutor === void 0 ? void 0 : this._activeSubexecutor.close(exit3);
    if (closeSubexecutors === void 0 && runInProgressFinalizers === void 0 && closeSelf === void 0) {
      return void 0;
    }
    return pipe(
      exit2(ifNotNull(closeSubexecutors)),
      zip5(exit2(ifNotNull(runInProgressFinalizers))),
      zip5(exit2(ifNotNull(closeSelf))),
      map13(([[exit1, exit22], exit32]) => pipe(exit1, zipRight2(exit22), zipRight2(exit32))),
      uninterruptible2,
      // TODO: remove
      flatMap8((exit4) => suspend2(() => exit4))
    );
  }
  doneSucceed(value5) {
    if (this._doneStack.length === 0) {
      this._done = succeed3(value5);
      this._currentChannel = void 0;
      return Done2();
    }
    const head6 = this._doneStack[this._doneStack.length - 1];
    if (head6._tag === OP_CONTINUATION_K) {
      this._doneStack.pop();
      this._currentChannel = head6.onSuccess(value5);
      return void 0;
    }
    const finalizers = this.popNextFinalizers();
    if (this._doneStack.length === 0) {
      this._doneStack = finalizers.reverse();
      this._done = succeed3(value5);
      this._currentChannel = void 0;
      return Done2();
    }
    const finalizerEffect = runFinalizers(finalizers.map((f) => f.finalizer), succeed3(value5));
    this.storeInProgressFinalizer(finalizerEffect);
    const effect2 = pipe(finalizerEffect, ensuring2(sync2(() => this.clearInProgressFinalizer())), uninterruptible2, flatMap8(() => sync2(() => this.doneSucceed(value5))));
    return FromEffect(effect2);
  }
  doneHalt(cause3) {
    if (this._doneStack.length === 0) {
      this._done = failCause3(cause3);
      this._currentChannel = void 0;
      return Done2();
    }
    const head6 = this._doneStack[this._doneStack.length - 1];
    if (head6._tag === OP_CONTINUATION_K) {
      this._doneStack.pop();
      this._currentChannel = head6.onHalt(cause3);
      return void 0;
    }
    const finalizers = this.popNextFinalizers();
    if (this._doneStack.length === 0) {
      this._doneStack = finalizers.reverse();
      this._done = failCause3(cause3);
      this._currentChannel = void 0;
      return Done2();
    }
    const finalizerEffect = runFinalizers(finalizers.map((f) => f.finalizer), failCause3(cause3));
    this.storeInProgressFinalizer(finalizerEffect);
    const effect2 = pipe(finalizerEffect, ensuring2(sync2(() => this.clearInProgressFinalizer())), uninterruptible2, flatMap8(() => sync2(() => this.doneHalt(cause3))));
    return FromEffect(effect2);
  }
  processCancellation() {
    this._currentChannel = void 0;
    this._done = this._cancelled;
    this._cancelled = void 0;
    return Done2();
  }
  runBracketOut(bracketOut) {
    const effect2 = uninterruptible2(matchCauseEffect2(this.provide(bracketOut.acquire()), {
      onFailure: (cause3) => sync2(() => {
        this._currentChannel = failCause7(cause3);
      }),
      onSuccess: (out) => sync2(() => {
        this.addFinalizer((exit3) => this.provide(bracketOut.finalizer(out, exit3)));
        this._currentChannel = write(out);
      })
    }));
    return FromEffect(effect2);
  }
  provide(effect2) {
    if (this._providedEnv === void 0) {
      return effect2;
    }
    return pipe(effect2, provide(this._providedEnv));
  }
  runEnsuring(ensuring6) {
    this.addFinalizer(ensuring6.finalizer);
    this._currentChannel = ensuring6.channel;
  }
  addFinalizer(f) {
    this._doneStack.push(new ContinuationFinalizerImpl(f));
  }
  runSubexecutor() {
    const subexecutor = this._activeSubexecutor;
    switch (subexecutor._tag) {
      case OP_PULL_FROM_CHILD: {
        return this.pullFromChild(subexecutor.childExecutor, subexecutor.parentSubexecutor, subexecutor.onEmit, subexecutor);
      }
      case OP_PULL_FROM_UPSTREAM: {
        return this.pullFromUpstream(subexecutor);
      }
      case OP_DRAIN_CHILD_EXECUTORS: {
        return this.drainChildExecutors(subexecutor);
      }
      case OP_EMIT3: {
        this._emitted = subexecutor.value;
        this._activeSubexecutor = subexecutor.next;
        return Emit();
      }
    }
  }
  replaceSubexecutor(nextSubExec) {
    this._currentChannel = void 0;
    this._activeSubexecutor = nextSubExec;
  }
  finishWithExit(exit3) {
    const state = match5(exit3, {
      onFailure: (cause3) => this.doneHalt(cause3),
      onSuccess: (value5) => this.doneSucceed(value5)
    });
    this._activeSubexecutor = void 0;
    return state === void 0 ? unit4 : effect(state);
  }
  finishSubexecutorWithCloseEffect(subexecutorDone, ...closeFuncs) {
    this.addFinalizer(() => pipe(closeFuncs, forEach8((closeFunc) => pipe(sync2(() => closeFunc(subexecutorDone)), flatMap8((closeEffect) => closeEffect !== void 0 ? closeEffect : unit4)), {
      discard: true
    })));
    const state = pipe(subexecutorDone, match5({
      onFailure: (cause3) => this.doneHalt(cause3),
      onSuccess: (value5) => this.doneSucceed(value5)
    }));
    this._activeSubexecutor = void 0;
    return state;
  }
  applyUpstreamPullStrategy(upstreamFinished, queue, strategy) {
    switch (strategy._tag) {
      case OP_PULL_AFTER_NEXT: {
        const shouldPrepend = !upstreamFinished || queue.some((subexecutor) => subexecutor !== void 0);
        return [strategy.emitSeparator, shouldPrepend ? [void 0, ...queue] : queue];
      }
      case OP_PULL_AFTER_ALL_ENQUEUED: {
        const shouldEnqueue = !upstreamFinished || queue.some((subexecutor) => subexecutor !== void 0);
        return [strategy.emitSeparator, shouldEnqueue ? [...queue, void 0] : queue];
      }
    }
  }
  pullFromChild(childExecutor, parentSubexecutor, onEmitted, subexecutor) {
    return Read(childExecutor, identity, (emitted) => {
      const childExecutorDecision = onEmitted(emitted);
      switch (childExecutorDecision._tag) {
        case OP_CONTINUE: {
          break;
        }
        case OP_CLOSE: {
          this.finishWithDoneValue(childExecutor, parentSubexecutor, childExecutorDecision.value);
          break;
        }
        case OP_YIELD2: {
          const modifiedParent = parentSubexecutor.enqueuePullFromChild(subexecutor);
          this.replaceSubexecutor(modifiedParent);
          break;
        }
      }
      this._activeSubexecutor = new Emit2(emitted, this._activeSubexecutor);
      return void 0;
    }, match5({
      onFailure: (cause3) => {
        const state = this.handleSubexecutorFailure(childExecutor, parentSubexecutor, cause3);
        return state === void 0 ? void 0 : effectOrUndefinedIgnored(state);
      },
      onSuccess: (doneValue) => {
        this.finishWithDoneValue(childExecutor, parentSubexecutor, doneValue);
        return void 0;
      }
    }));
  }
  finishWithDoneValue(childExecutor, parentSubexecutor, doneValue) {
    const subexecutor = parentSubexecutor;
    switch (subexecutor._tag) {
      case OP_PULL_FROM_UPSTREAM: {
        const modifiedParent = new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone !== void 0 ? subexecutor.combineChildResults(subexecutor.lastDone, doneValue) : doneValue, subexecutor.activeChildExecutors, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit);
        this._closeLastSubstream = childExecutor.close(succeed3(doneValue));
        this.replaceSubexecutor(modifiedParent);
        break;
      }
      case OP_DRAIN_CHILD_EXECUTORS: {
        const modifiedParent = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone !== void 0 ? subexecutor.combineChildResults(subexecutor.lastDone, doneValue) : doneValue, subexecutor.activeChildExecutors, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
        this._closeLastSubstream = childExecutor.close(succeed3(doneValue));
        this.replaceSubexecutor(modifiedParent);
        break;
      }
      default: {
        break;
      }
    }
  }
  handleSubexecutorFailure(childExecutor, parentSubexecutor, cause3) {
    return this.finishSubexecutorWithCloseEffect(failCause3(cause3), (exit3) => parentSubexecutor.close(exit3), (exit3) => childExecutor.close(exit3));
  }
  pullFromUpstream(subexecutor) {
    if (subexecutor.activeChildExecutors.length === 0) {
      return this.performPullFromUpstream(subexecutor);
    }
    const activeChild = subexecutor.activeChildExecutors[0];
    const parentSubexecutor = new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, subexecutor.activeChildExecutors.slice(1), subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit);
    if (activeChild === void 0) {
      return this.performPullFromUpstream(parentSubexecutor);
    }
    this.replaceSubexecutor(new PullFromChild(activeChild.childExecutor, parentSubexecutor, activeChild.onEmit));
    return void 0;
  }
  performPullFromUpstream(subexecutor) {
    return Read(subexecutor.upstreamExecutor, (effect2) => {
      const closeLastSubstream = this._closeLastSubstream === void 0 ? unit4 : this._closeLastSubstream;
      this._closeLastSubstream = void 0;
      return pipe(this._executeCloseLastSubstream(closeLastSubstream), zipRight3(effect2));
    }, (emitted) => {
      if (this._closeLastSubstream !== void 0) {
        const closeLastSubstream = this._closeLastSubstream;
        this._closeLastSubstream = void 0;
        return pipe(this._executeCloseLastSubstream(closeLastSubstream), map13(() => {
          const childExecutor2 = new _ChannelExecutor(subexecutor.createChild(emitted), this._providedEnv, this._executeCloseLastSubstream);
          childExecutor2._input = this._input;
          const [emitSeparator2, updatedChildExecutors2] = this.applyUpstreamPullStrategy(false, subexecutor.activeChildExecutors, subexecutor.onPull(Pulled(emitted)));
          this._activeSubexecutor = new PullFromChild(childExecutor2, new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, updatedChildExecutors2, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit), subexecutor.onEmit);
          if (isSome2(emitSeparator2)) {
            this._activeSubexecutor = new Emit2(emitSeparator2.value, this._activeSubexecutor);
          }
          return void 0;
        }));
      }
      const childExecutor = new _ChannelExecutor(subexecutor.createChild(emitted), this._providedEnv, this._executeCloseLastSubstream);
      childExecutor._input = this._input;
      const [emitSeparator, updatedChildExecutors] = this.applyUpstreamPullStrategy(false, subexecutor.activeChildExecutors, subexecutor.onPull(Pulled(emitted)));
      this._activeSubexecutor = new PullFromChild(childExecutor, new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, updatedChildExecutors, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit), subexecutor.onEmit);
      if (isSome2(emitSeparator)) {
        this._activeSubexecutor = new Emit2(emitSeparator.value, this._activeSubexecutor);
      }
      return void 0;
    }, (exit3) => {
      if (subexecutor.activeChildExecutors.some((subexecutor2) => subexecutor2 !== void 0)) {
        const drain4 = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, [void 0, ...subexecutor.activeChildExecutors], subexecutor.upstreamExecutor.getDone(), subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
        if (this._closeLastSubstream !== void 0) {
          const closeLastSubstream2 = this._closeLastSubstream;
          this._closeLastSubstream = void 0;
          return pipe(this._executeCloseLastSubstream(closeLastSubstream2), map13(() => this.replaceSubexecutor(drain4)));
        }
        this.replaceSubexecutor(drain4);
        return void 0;
      }
      const closeLastSubstream = this._closeLastSubstream;
      const state = this.finishSubexecutorWithCloseEffect(pipe(exit3, map10((a) => subexecutor.combineWithChildResult(subexecutor.lastDone, a))), () => closeLastSubstream, (exit4) => subexecutor.upstreamExecutor.close(exit4));
      return state === void 0 ? void 0 : (
        // NOTE: assuming finalizers cannot fail
        effectOrUndefinedIgnored(state)
      );
    });
  }
  drainChildExecutors(subexecutor) {
    if (subexecutor.activeChildExecutors.length === 0) {
      const lastClose = this._closeLastSubstream;
      if (lastClose !== void 0) {
        this.addFinalizer(() => succeed6(lastClose));
      }
      return this.finishSubexecutorWithCloseEffect(subexecutor.upstreamDone, () => lastClose, (exit3) => subexecutor.upstreamExecutor.close(exit3));
    }
    const activeChild = subexecutor.activeChildExecutors[0];
    const rest = subexecutor.activeChildExecutors.slice(1);
    if (activeChild === void 0) {
      const [emitSeparator, remainingExecutors] = this.applyUpstreamPullStrategy(true, rest, subexecutor.onPull(NoUpstream(rest.reduce((n, curr) => curr !== void 0 ? n + 1 : n, 0))));
      this.replaceSubexecutor(new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, remainingExecutors, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull));
      if (isSome2(emitSeparator)) {
        this._emitted = emitSeparator.value;
        return Emit();
      }
      return void 0;
    }
    const parentSubexecutor = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, rest, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
    this.replaceSubexecutor(new PullFromChild(activeChild.childExecutor, parentSubexecutor, activeChild.onEmit));
    return void 0;
  }
};
var ifNotNull = (effect2) => effect2 !== void 0 ? effect2 : unit4;
var runFinalizers = (finalizers, exit3) => {
  return pipe(forEach8(finalizers, (fin) => exit2(fin(exit3))), map13((exits) => pipe(all2(exits), getOrElse(() => unit2))), flatMap8((exit4) => suspend2(() => exit4)));
};
var readUpstream = (r, onSuccess, onFailure) => {
  const readStack = [r];
  const read2 = () => {
    const current = readStack.pop();
    if (current === void 0 || current.upstream === void 0) {
      return dieMessage2("Unexpected end of input for channel execution");
    }
    const state = current.upstream.run();
    switch (state._tag) {
      case OP_EMIT2: {
        const emitEffect = current.onEmit(current.upstream.getEmit());
        if (readStack.length === 0) {
          if (emitEffect === void 0) {
            return suspend2(onSuccess);
          }
          return pipe(emitEffect, matchCauseEffect2({
            onFailure,
            onSuccess
          }));
        }
        if (emitEffect === void 0) {
          return suspend2(() => read2());
        }
        return pipe(emitEffect, matchCauseEffect2({
          onFailure,
          onSuccess: () => read2()
        }));
      }
      case OP_DONE3: {
        const doneEffect = current.onDone(current.upstream.getDone());
        if (readStack.length === 0) {
          if (doneEffect === void 0) {
            return suspend2(onSuccess);
          }
          return pipe(doneEffect, matchCauseEffect2({
            onFailure,
            onSuccess
          }));
        }
        if (doneEffect === void 0) {
          return suspend2(() => read2());
        }
        return pipe(doneEffect, matchCauseEffect2({
          onFailure,
          onSuccess: () => read2()
        }));
      }
      case OP_FROM_EFFECT3: {
        readStack.push(current);
        return pipe(current.onEffect(state.effect), catchAllCause2((cause3) => suspend2(() => {
          const doneEffect = current.onDone(failCause3(cause3));
          return doneEffect === void 0 ? unit4 : doneEffect;
        })), matchCauseEffect2({
          onFailure,
          onSuccess: () => read2()
        }));
      }
      case OP_READ2: {
        readStack.push(current);
        readStack.push(state);
        return suspend2(() => read2());
      }
    }
  };
  return read2();
};
var runScoped = (self) => {
  const run4 = (channelDeferred, scopeDeferred, scope4) => acquireUseRelease2(sync2(() => new ChannelExecutor(self, void 0, identity)), (exec) => suspend2(() => pipe(runScopedInterpret(exec.run(), exec), intoDeferred2(channelDeferred), zipRight3(_await(channelDeferred)), zipLeft2(_await(scopeDeferred)))), (exec, exit3) => {
    const finalize = exec.close(exit3);
    if (finalize === void 0) {
      return unit4;
    }
    return tapErrorCause2(finalize, (cause3) => addFinalizer2(scope4, failCause5(cause3)));
  });
  return uninterruptibleMask2((restore) => flatMap8(scope2, (parent) => pipe(all5([fork2(parent, sequential3), make19(), make19()]), flatMap8(([child, channelDeferred, scopeDeferred]) => pipe(forkScoped2(restore(run4(channelDeferred, scopeDeferred, child))), flatMap8((fiber) => pipe(addFinalizer3(() => succeed2(scopeDeferred, void 0)), zipRight3(restore(_await(channelDeferred))), zipLeft2(inheritAll2(fiber)))))))));
};
var runScopedInterpret = (channelState, exec) => {
  const op = channelState;
  switch (op._tag) {
    case OP_FROM_EFFECT3: {
      return pipe(op.effect, flatMap8(() => runScopedInterpret(exec.run(), exec)));
    }
    case OP_EMIT2: {
      return runScopedInterpret(exec.run(), exec);
    }
    case OP_DONE3: {
      return suspend2(() => exec.getDone());
    }
    case OP_READ2: {
      return readUpstream(op, () => runScopedInterpret(exec.run(), exec), failCause5);
    }
  }
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelMergeDecision.js
var OP_DONE4 = "Done";
var OP_AWAIT = "Await";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/mergeDecision.js
var MergeDecisionSymbolKey = "effect/ChannelMergeDecision";
var MergeDecisionTypeId = /* @__PURE__ */ Symbol.for(MergeDecisionSymbolKey);
var proto9 = {
  [MergeDecisionTypeId]: {
    _R: (_) => _,
    _E0: (_) => _,
    _Z0: (_) => _,
    _E: (_) => _,
    _Z: (_) => _
  }
};
var Await = (f) => {
  const op = Object.create(proto9);
  op._tag = OP_AWAIT;
  op.f = f;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelMergeState.js
var OP_BOTH_RUNNING = "BothRunning";
var OP_LEFT_DONE = "LeftDone";
var OP_RIGHT_DONE = "RightDone";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/mergeState.js
var MergeStateSymbolKey = "effect/ChannelMergeState";
var MergeStateTypeId = /* @__PURE__ */ Symbol.for(MergeStateSymbolKey);
var proto10 = {
  [MergeStateTypeId]: MergeStateTypeId
};
var BothRunning = (left3, right3) => {
  const op = Object.create(proto10);
  op._tag = OP_BOTH_RUNNING;
  op.left = left3;
  op.right = right3;
  return op;
};
var LeftDone = (f) => {
  const op = Object.create(proto10);
  op._tag = OP_LEFT_DONE;
  op.f = f;
  return op;
};
var RightDone = (f) => {
  const op = Object.create(proto10);
  op._tag = OP_RIGHT_DONE;
  op.f = f;
  return op;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/opCodes/channelMergeStrategy.js
var OP_BACK_PRESSURE = "BackPressure";
var OP_BUFFER_SLIDING = "BufferSliding";

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/mergeStrategy.js
var MergeStrategySymbolKey = "effect/ChannelMergeStrategy";
var MergeStrategyTypeId = /* @__PURE__ */ Symbol.for(MergeStrategySymbolKey);
var proto11 = {
  [MergeStrategyTypeId]: MergeStrategyTypeId
};
var BackPressure = (_) => {
  const op = Object.create(proto11);
  op._tag = OP_BACK_PRESSURE;
  return op;
};
var BufferSliding = (_) => {
  const op = Object.create(proto11);
  op._tag = OP_BUFFER_SLIDING;
  return op;
};
var match12 = /* @__PURE__ */ dual(2, (self, {
  onBackPressure,
  onBufferSliding
}) => {
  switch (self._tag) {
    case OP_BACK_PRESSURE: {
      return onBackPressure();
    }
    case OP_BUFFER_SLIDING: {
      return onBufferSliding();
    }
  }
});

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel/singleProducerAsyncInput.js
var OP_STATE_EMPTY = "Empty";
var OP_STATE_EMIT = "Emit";
var OP_STATE_ERROR = "Error";
var OP_STATE_DONE2 = "Done";
var stateEmpty = (notifyProducer) => ({
  _tag: OP_STATE_EMPTY,
  notifyProducer
});
var stateEmit = (notifyConsumers) => ({
  _tag: OP_STATE_EMIT,
  notifyConsumers
});
var stateError = (cause3) => ({
  _tag: OP_STATE_ERROR,
  cause: cause3
});
var stateDone = (done9) => ({
  _tag: OP_STATE_DONE2,
  done: done9
});
var SingleProducerAsyncInputImpl = class {
  ref;
  constructor(ref) {
    this.ref = ref;
  }
  awaitRead() {
    return flatten6(modify3(this.ref, (state) => state._tag === OP_STATE_EMPTY ? [_await(state.notifyProducer), state] : [unit4, state]));
  }
  get close() {
    return fiberIdWith2((fiberId3) => this.error(interrupt4(fiberId3)));
  }
  done(value5) {
    return flatten6(modify3(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          return [forEach8(state.notifyConsumers, (deferred) => succeed2(deferred, left2(value5)), {
            discard: true
          }), stateDone(value5)];
        }
        case OP_STATE_ERROR: {
          return [interrupt6, state];
        }
        case OP_STATE_DONE2: {
          return [interrupt6, state];
        }
      }
    }));
  }
  emit(element) {
    return flatMap8(make19(), (deferred) => flatten6(modify3(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          const notifyConsumer = state.notifyConsumers[0];
          const notifyConsumers = state.notifyConsumers.slice(1);
          if (notifyConsumer !== void 0) {
            return [succeed2(notifyConsumer, right2(element)), notifyConsumers.length === 0 ? stateEmpty(deferred) : stateEmit(notifyConsumers)];
          }
          throw new Error("Bug: Channel.SingleProducerAsyncInput.emit - Queue was empty! please report an issue at https://github.com/Effect-TS/effect/issues");
        }
        case OP_STATE_ERROR: {
          return [interrupt6, state];
        }
        case OP_STATE_DONE2: {
          return [interrupt6, state];
        }
      }
    })));
  }
  error(cause3) {
    return flatten6(modify3(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          return [forEach8(state.notifyConsumers, (deferred) => failCause2(deferred, cause3), {
            discard: true
          }), stateError(cause3)];
        }
        case OP_STATE_ERROR: {
          return [interrupt6, state];
        }
        case OP_STATE_DONE2: {
          return [interrupt6, state];
        }
      }
    }));
  }
  get take() {
    return this.takeWith((cause3) => failCause3(map11(cause3, left2)), (elem) => succeed3(elem), (done9) => fail3(right2(done9)));
  }
  takeWith(onError4, onElement, onDone2) {
    return flatMap8(make19(), (deferred) => flatten6(modify3(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [zipRight3(succeed2(state.notifyProducer, void 0), matchCause2(_await(deferred), {
            onFailure: onError4,
            onSuccess: match2({
              onLeft: onDone2,
              onRight: onElement
            })
          })), stateEmit([deferred])];
        }
        case OP_STATE_EMIT: {
          return [matchCause2(_await(deferred), {
            onFailure: onError4,
            onSuccess: match2({
              onLeft: onDone2,
              onRight: onElement
            })
          }), stateEmit([...state.notifyConsumers, deferred])];
        }
        case OP_STATE_ERROR: {
          return [succeed6(onError4(state.cause)), state];
        }
        case OP_STATE_DONE2: {
          return [succeed6(onDone2(state.done)), state];
        }
      }
    })));
  }
};
var make41 = () => pipe(make19(), flatMap8((deferred) => make28(stateEmpty(deferred))), map13((ref) => new SingleProducerAsyncInputImpl(ref)));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/channel.js
var concatMap = /* @__PURE__ */ dual(2, (self, f) => concatMapWith(self, f, () => void 0, () => void 0));
var drain = (self) => {
  const drainer = readWithCause({
    onInput: () => drainer,
    onFailure: failCause7,
    onDone: succeed8
  });
  return pipeTo(self, drainer);
};
var ensuring3 = /* @__PURE__ */ dual(2, (self, finalizer2) => ensuringWith(self, () => finalizer2));
var flatten8 = (self) => flatMap10(self, identity);
var fromInput = (input) => unwrap(input.takeWith(failCause7, (elem) => flatMap10(write(elem), () => fromInput(input)), succeed8));
var map15 = /* @__PURE__ */ dual(2, (self, f) => flatMap10(self, (a) => sync4(() => f(a))));
var mapOut = /* @__PURE__ */ dual(2, (self, f) => {
  const reader = readWith({
    onInput: (outElem) => flatMap10(write(f(outElem)), () => reader),
    onFailure: fail8,
    onDone: succeedNow
  });
  return pipeTo(self, reader);
});
var mapOutEffect = /* @__PURE__ */ dual(2, (self, f) => {
  const reader = readWithCause({
    onInput: (outElem) => pipe(fromEffect4(f(outElem)), flatMap10(write), flatMap10(() => reader)),
    onFailure: failCause7,
    onDone: succeedNow
  });
  return pipeTo(self, reader);
});
var mergeAll4 = (options3) => {
  return (channels) => mergeAllWith(options3)(channels, constVoid);
};
var mergeAllWith = ({
  bufferSize = 16,
  concurrency,
  mergeStrategy = BackPressure()
}) => (channels, f) => pipe(gen2(function* ($) {
  const concurrencyN = concurrency === "unbounded" ? Number.MAX_SAFE_INTEGER : concurrency;
  const input = yield* $(make41());
  const queueReader = fromInput(input);
  const queue = yield* $(acquireRelease2(bounded3(bufferSize), (queue2) => shutdown2(queue2)));
  const cancelers = yield* $(acquireRelease2(unbounded3(), (queue2) => shutdown2(queue2)));
  const lastDone = yield* $(make28(none2()));
  const errorSignal = yield* $(make19());
  const withPermits = (yield* $(makeSemaphore2(concurrencyN))).withPermits;
  const pull = yield* $(toPull(channels));
  const evaluatePull = (pull2) => pipe(flatMap8(pull2, match2({
    onLeft: (done9) => succeed6(some2(done9)),
    onRight: (outElem) => as3(offer3(queue, succeed6(right2(outElem))), none2())
  })), repeatUntil(isSome2), flatMap8((outDone) => update3(lastDone, match({
    onNone: () => some2(outDone.value),
    onSome: (lastDone2) => some2(f(lastDone2, outDone.value))
  }))), catchAllCause2((cause3) => isInterrupted2(cause3) ? failCause5(cause3) : pipe(offer3(queue, failCause5(cause3)), zipRight3(succeed2(errorSignal, void 0)), asUnit2)));
  yield* $(matchCauseEffect2(pull, {
    onFailure: (cause3) => pipe(offer3(queue, failCause5(cause3)), zipRight3(succeed6(false))),
    onSuccess: match2({
      onLeft: (outDone) => raceWith2(_await(errorSignal), withPermits(concurrencyN)(unit4), {
        onSelfDone: (_, permitAcquisition) => as3(interrupt5(permitAcquisition), false),
        onOtherDone: (_, failureAwait) => zipRight3(interrupt5(failureAwait), pipe(get12(lastDone), flatMap8(match({
          onNone: () => offer3(queue, succeed6(left2(outDone))),
          onSome: (lastDone2) => offer3(queue, succeed6(left2(f(lastDone2, outDone))))
        })), as3(false)))
      }),
      onRight: (channel) => match12(mergeStrategy, {
        onBackPressure: () => gen2(function* ($2) {
          const latch = yield* $2(make19());
          const raceEffects = pipe(queueReader, pipeTo(channel), toPull, flatMap8((pull2) => race2(evaluatePull(pull2), _await(errorSignal))), scoped);
          yield* $2(succeed2(latch, void 0), zipRight3(raceEffects), withPermits(1), forkScoped2);
          yield* $2(_await(latch));
          const errored = yield* $2(isDone(errorSignal));
          return !errored;
        }),
        onBufferSliding: () => gen2(function* ($2) {
          const canceler = yield* $2(make19());
          const latch = yield* $2(make19());
          const size12 = yield* $2(size11(cancelers));
          yield* $2(take2(cancelers), flatMap8((_) => succeed2(_, void 0)), when2(() => size12 >= concurrencyN));
          yield* $2(offer3(cancelers, canceler));
          const raceEffects = pipe(queueReader, pipeTo(channel), toPull, flatMap8((pull2) => pipe(evaluatePull(pull2), race2(_await(errorSignal)), race2(_await(canceler)))), scoped);
          yield* $2(succeed2(latch, void 0), zipRight3(raceEffects), withPermits(1), forkScoped2);
          yield* $2(_await(latch));
          const errored = yield* $2(isDone(errorSignal));
          return !errored;
        })
      })
    })
  }), repeatWhile(identity), forkScoped2);
  return [queue, input];
}), map13(([queue, input]) => {
  const consumer = pipe(take2(queue), flatten6, matchCause2({
    onFailure: failCause7,
    onSuccess: match2({
      onLeft: succeedNow,
      onRight: (outElem) => flatMap10(write(outElem), () => consumer)
    })
  }), unwrap);
  return embedInput(consumer, input);
}), unwrapScoped2);
var mergeMap = /* @__PURE__ */ dual(3, (self, f, options3) => mergeAll4(options3)(mapOut(self, f)));
var mergeWith = /* @__PURE__ */ dual(2, (self, options3) => unwrapScoped2(flatMap8(make41(), (input) => {
  const queueReader = fromInput(input);
  return map13(zip5(toPull(pipeTo(queueReader, self)), toPull(pipeTo(queueReader, options3.other))), ([pullL, pullR]) => {
    const handleSide = (exit3, fiber, pull) => (done9, both2, single2) => {
      const onDecision = (decision) => {
        const op = decision;
        if (op._tag === OP_DONE4) {
          return succeed6(fromEffect4(zipRight3(interrupt5(fiber), op.effect)));
        }
        return map13(_await3(fiber), match5({
          onFailure: (cause3) => fromEffect4(op.f(failCause3(cause3))),
          onSuccess: match2({
            onLeft: (done10) => fromEffect4(op.f(succeed3(done10))),
            onRight: (elem) => zipRight4(write(elem), go4(single2(op.f)))
          })
        }));
      };
      return match5(exit3, {
        onFailure: (cause3) => onDecision(done9(failCause3(cause3))),
        onSuccess: match2({
          onLeft: (z) => onDecision(done9(succeed3(z))),
          onRight: (elem) => succeed6(flatMap10(write(elem), () => flatMap10(fromEffect4(forkDaemon2(pull)), (leftFiber) => go4(both2(leftFiber, fiber)))))
        })
      });
    };
    const go4 = (state) => {
      switch (state._tag) {
        case OP_BOTH_RUNNING: {
          const leftJoin = interruptible3(join3(state.left));
          const rightJoin = interruptible3(join3(state.right));
          return unwrap(raceWith2(leftJoin, rightJoin, {
            onSelfDone: (leftExit, rf) => zipRight3(interrupt5(rf), handleSide(leftExit, state.right, pullL)(options3.onSelfDone, BothRunning, (f) => LeftDone(f))),
            onOtherDone: (rightExit, lf) => zipRight3(interrupt5(lf), handleSide(rightExit, state.left, pullR)(options3.onOtherDone, (left3, right3) => BothRunning(right3, left3), (f) => RightDone(f)))
          }));
        }
        case OP_LEFT_DONE: {
          return unwrap(map13(exit2(pullR), match5({
            onFailure: (cause3) => fromEffect4(state.f(failCause3(cause3))),
            onSuccess: match2({
              onLeft: (done9) => fromEffect4(state.f(succeed3(done9))),
              onRight: (elem) => flatMap10(write(elem), () => go4(LeftDone(state.f)))
            })
          })));
        }
        case OP_RIGHT_DONE: {
          return unwrap(map13(exit2(pullL), match5({
            onFailure: (cause3) => fromEffect4(state.f(failCause3(cause3))),
            onSuccess: match2({
              onLeft: (done9) => fromEffect4(state.f(succeed3(done9))),
              onRight: (elem) => flatMap10(write(elem), () => go4(RightDone(state.f)))
            })
          })));
        }
      }
    };
    return pipe(fromEffect4(zipWith3(forkDaemon2(pullL), forkDaemon2(pullR), (left3, right3) => BothRunning(left3, right3))), flatMap10(go4), embedInput(input));
  });
})));
var scoped3 = (effect2) => unwrap(uninterruptibleMask2((restore) => map13(make38(), (scope4) => acquireReleaseOut(tapErrorCause2(restore(extend2(scope4)(effect2)), (cause3) => close(scope4, failCause3(cause3))), (_, exit3) => close(scope4, exit3)))));
var toPull = (self) => map13(acquireRelease2(sync2(() => new ChannelExecutor(self, void 0, identity)), (exec, exit3) => {
  const finalize = exec.close(exit3);
  return finalize === void 0 ? unit4 : finalize;
}), (exec) => suspend2(() => interpretToPull(exec.run(), exec)));
var interpretToPull = (channelState, exec) => {
  const state = channelState;
  switch (state._tag) {
    case OP_DONE3: {
      return match5(exec.getDone(), {
        onFailure: failCause5,
        onSuccess: (done9) => succeed6(left2(done9))
      });
    }
    case OP_EMIT2: {
      return succeed6(right2(exec.getEmit()));
    }
    case OP_FROM_EFFECT3: {
      return pipe(state.effect, flatMap8(() => interpretToPull(exec.run(), exec)));
    }
    case OP_READ2: {
      return readUpstream(state, () => interpretToPull(exec.run(), exec), (cause3) => failCause5(cause3));
    }
  }
};
var unwrap = (channel) => flatten8(fromEffect4(channel));
var unwrapScoped2 = (self) => concatAllWith(scoped3(self), (d, _) => d, (d, _) => d);
var writeChunk = (outs) => writeChunkWriter(0, outs.length, outs);
var writeChunkWriter = (idx, len, chunk3) => {
  return idx === len ? unit5 : pipe(write(pipe(chunk3, unsafeGet4(idx))), flatMap10(() => writeChunkWriter(idx + 1, len, chunk3)));
};
var zip6 = /* @__PURE__ */ dual((args) => isChannel(args[1]), (self, that, options3) => options3?.concurrent ? mergeWith(self, {
  other: that,
  onSelfDone: (exit1) => Await((exit22) => suspend2(() => zip3(exit1, exit22))),
  onOtherDone: (exit22) => Await((exit1) => suspend2(() => zip3(exit1, exit22)))
}) : flatMap10(self, (a) => map15(that, (b) => [a, b])));
var zipRight4 = /* @__PURE__ */ dual((args) => isChannel(args[1]), (self, that, options3) => options3?.concurrent ? map15(zip6(self, that, {
  concurrent: true
}), (tuple5) => tuple5[1]) : flatMap10(self, () => that));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/sink.js
var SinkTypeId2 = /* @__PURE__ */ Symbol.for("effect/Sink");
var sinkVariance2 = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _Z: (_) => _
};
var SinkImpl = class {
  channel;
  [SinkTypeId2] = sinkVariance2;
  constructor(channel) {
    this.channel = channel;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var forEach9 = (f) => {
  const process2 = readWithCause({
    onInput: (input) => pipe(fromEffect4(forEach8(input, (v) => f(v), {
      discard: true
    })), flatMap10(() => process2)),
    onFailure: failCause7,
    onDone: () => unit5
  });
  return new SinkImpl(process2);
};
var fromEffect5 = (effect2) => new SinkImpl(fromEffect4(effect2));
var toChannel = (self) => isEffect2(self) ? toChannel(fromEffect5(self)) : self.channel;
var unwrapScoped3 = (effect2) => {
  return new SinkImpl(unwrapScoped2(pipe(effect2, map13((sink) => toChannel(sink)))));
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/take.js
var TakeSymbolKey = "effect/Take";
var TakeTypeId = /* @__PURE__ */ Symbol.for(TakeSymbolKey);
var takeVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
var TakeImpl = class {
  exit;
  [TakeTypeId] = takeVariance;
  constructor(exit3) {
    this.exit = exit3;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var chunk2 = (chunk3) => new TakeImpl(succeed3(chunk3));
var end3 = /* @__PURE__ */ new TakeImpl(/* @__PURE__ */ fail3(/* @__PURE__ */ none2()));
var failCause8 = (cause3) => new TakeImpl(failCause3(pipe(cause3, map11(some2))));
var match13 = /* @__PURE__ */ dual(2, (self, {
  onEnd,
  onFailure,
  onSuccess
}) => match5(self.exit, {
  onFailure: (cause3) => match(flipCauseOption2(cause3), {
    onNone: onEnd,
    onSome: onFailure
  }),
  onSuccess
}));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/stream.js
var StreamSymbolKey = "effect/Stream";
var StreamTypeId2 = /* @__PURE__ */ Symbol.for(StreamSymbolKey);
var streamVariance = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};
var StreamImpl = class {
  channel;
  [StreamTypeId2] = streamVariance;
  constructor(channel) {
    this.channel = channel;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isStream = (u) => hasProperty(u, StreamTypeId2) || isEffect2(u);
var bufferChunks = /* @__PURE__ */ dual(2, (self, options3) => {
  if (options3.strategy === "dropping") {
    return bufferChunksDropping(self, options3.capacity);
  } else if (options3.strategy === "sliding") {
    return bufferChunksSliding(self, options3.capacity);
  }
  const queue = toQueue(self, options3);
  return new StreamImpl(unwrapScoped2(map13(queue, (queue2) => {
    const process2 = pipe(fromEffect4(take2(queue2)), flatMap10(match13({
      onEnd: () => unit5,
      onFailure: failCause7,
      onSuccess: (value5) => pipe(write(value5), flatMap10(() => process2))
    })));
    return process2;
  })));
});
var bufferChunksDropping = /* @__PURE__ */ dual(2, (self, capacity3) => {
  const queue = acquireRelease2(dropping2(capacity3), (queue2) => shutdown2(queue2));
  return new StreamImpl(bufferSignal(queue, toChannel2(self)));
});
var bufferChunksSliding = /* @__PURE__ */ dual(2, (self, capacity3) => {
  const queue = acquireRelease2(sliding2(capacity3), (queue2) => shutdown2(queue2));
  return new StreamImpl(bufferSignal(queue, toChannel2(self)));
});
var bufferSignal = (scoped5, bufferChannel) => {
  const producer = (queue, ref) => {
    const terminate = (take6) => pipe(get12(ref), tap2(_await), zipRight3(make19()), flatMap8((deferred) => pipe(offer3(queue, [take6, deferred]), zipRight3(set7(ref, deferred)), zipRight3(_await(deferred)))), asUnit2, fromEffect4);
    return readWithCause({
      onInput: (input) => pipe(make19(), flatMap8((deferred) => pipe(offer3(queue, [chunk2(input), deferred]), flatMap8((added) => pipe(set7(ref, deferred), when2(() => added))))), asUnit2, fromEffect4, flatMap10(() => producer(queue, ref))),
      onFailure: (error2) => terminate(failCause8(error2)),
      onDone: () => terminate(end3)
    });
  };
  const consumer = (queue) => {
    const process2 = pipe(fromEffect4(take2(queue)), flatMap10(([take6, deferred]) => zipRight4(fromEffect4(succeed2(deferred, void 0)), match13(take6, {
      onEnd: () => unit5,
      onFailure: failCause7,
      onSuccess: (value5) => pipe(write(value5), flatMap10(() => process2))
    }))));
    return process2;
  };
  return unwrapScoped2(pipe(scoped5, flatMap8((queue) => pipe(make19(), tap2((start3) => succeed2(start3, void 0)), flatMap8((start3) => pipe(make28(start3), flatMap8((ref) => pipe(bufferChannel, pipeTo(producer(queue, ref)), runScoped, forkScoped2)), as3(consumer(queue))))))));
};
var flatMap12 = /* @__PURE__ */ dual((args) => isStream(args[0]), (self, f, options3) => {
  const bufferSize = options3?.bufferSize ?? 16;
  if (options3?.switch) {
    return matchConcurrency(options3?.concurrency, () => flatMapParSwitchBuffer(self, 1, bufferSize, f), (n) => flatMapParSwitchBuffer(self, n, bufferSize, f));
  }
  return matchConcurrency(options3?.concurrency, () => new StreamImpl(concatMap(toChannel2(self), (as7) => pipe(as7, map3((a) => toChannel2(f(a))), reduce2(unit5, (left3, right3) => pipe(left3, zipRight4(right3)))))), (_) => new StreamImpl(pipe(toChannel2(self), concatMap(writeChunk), mergeMap((out) => toChannel2(f(out)), options3))));
});
var matchConcurrency = (concurrency, sequential4, bounded4) => {
  switch (concurrency) {
    case void 0:
      return sequential4();
    case "unbounded":
      return bounded4(Number.MAX_SAFE_INTEGER);
    default:
      return concurrency > 1 ? bounded4(concurrency) : sequential4();
  }
};
var flatMapParSwitchBuffer = /* @__PURE__ */ dual(4, (self, n, bufferSize, f) => new StreamImpl(pipe(toChannel2(self), concatMap(writeChunk), mergeMap((out) => toChannel2(f(out)), {
  concurrency: n,
  mergeStrategy: BufferSliding(),
  bufferSize
}))));
var flatten10 = /* @__PURE__ */ dual((args) => isStream(args[0]), (self, options3) => flatMap12(self, identity, options3));
var fromChannel = (channel) => new StreamImpl(channel);
var toChannel2 = (stream2) => {
  if ("channel" in stream2) {
    return stream2.channel;
  } else if (isEffect2(stream2)) {
    return toChannel2(fromEffect6(stream2));
  } else {
    throw new TypeError(`Expected a Stream.`);
  }
};
var fromEffect6 = (effect2) => pipe(effect2, mapError2(some2), fromEffectOption);
var fromEffectOption = (effect2) => new StreamImpl(unwrap(match10(effect2, {
  onFailure: match({
    onNone: () => unit5,
    onSome: fail8
  }),
  onSuccess: (a) => write(of2(a))
})));
var runIntoQueueScoped = /* @__PURE__ */ dual(2, (self, queue) => {
  const writer = readWithCause({
    onInput: (input) => flatMap10(write(chunk2(input)), () => writer),
    onFailure: (cause3) => write(failCause8(cause3)),
    onDone: () => write(end3)
  });
  return pipe(pipeTo(toChannel2(self), writer), mapOutEffect((take6) => offer3(queue, take6)), drain, runScoped, asUnit2);
});
var scoped4 = (effect2) => new StreamImpl(ensuring3(scoped3(pipe(effect2, map13(of2))), unit4));
var toQueue = /* @__PURE__ */ dual((args) => isStream(args[0]), (self, options3) => tap2(acquireRelease2(options3?.strategy === "unbounded" ? unbounded3() : options3?.strategy === "dropping" ? dropping2(options3.capacity ?? 2) : options3?.strategy === "sliding" ? sliding2(options3.capacity ?? 2) : bounded3(options3?.capacity ?? 2), (queue) => shutdown2(queue)), (queue) => forkScoped2(runIntoQueueScoped(self, queue))));
var unwrapScoped4 = (effect2) => flatten10(scoped4(effect2));

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Channel.js
var flatMap13 = flatMap10;
var unit6 = unit5;
var write2 = write;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/secret.js
var SecretSymbolKey = "effect/Secret";
var SecretTypeId = /* @__PURE__ */ Symbol.for(SecretSymbolKey);
var proto12 = {
  [SecretTypeId]: SecretTypeId,
  [symbol]() {
    return pipe(hash(SecretSymbolKey), combine(array(this.raw)));
  },
  [symbol2](that) {
    return isSecret(that) && this.raw.length === that.raw.length && this.raw.every((v, i) => equals(v, that.raw[i]));
  }
};
var isSecret = (u) => hasProperty(u, SecretTypeId);
var make42 = (bytes) => {
  const secret4 = Object.create(proto12);
  Object.defineProperty(secret4, "toString", {
    enumerable: false,
    value() {
      return "Secret(<redacted>)";
    }
  });
  Object.defineProperty(secret4, "raw", {
    enumerable: false,
    value: bytes
  });
  return secret4;
};
var fromString = (text10) => {
  return make42(text10.split("").map((char5) => char5.charCodeAt(0)));
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Console.js
var log4 = log2;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Data.js
var struct2 = struct;
var Error3 = /* @__PURE__ */ function() {
  return class Base extends YieldableError {
    constructor(args) {
      super();
      if (args) {
        Object.assign(this, args);
      }
    }
  };
}();
var TaggedError = (tag4) => {
  class Base2 extends Error3 {
    _tag = tag4;
  }
  ;
  Base2.prototype.name = tag4;
  return Base2;
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/internal/matcher.js
var TypeId14 = /* @__PURE__ */ Symbol.for("@effect/matcher/Matcher");
var TypeMatcherProto = {
  [TypeId14]: {
    _input: identity,
    _filters: identity,
    _remaining: identity,
    _result: identity
  },
  _tag: "TypeMatcher",
  add(_case) {
    return makeTypeMatcher([...this.cases, _case]);
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
function makeTypeMatcher(cases) {
  const matcher = Object.create(TypeMatcherProto);
  matcher.cases = cases;
  return matcher;
}
var ValueMatcherProto = {
  [TypeId14]: {
    _input: identity,
    _filters: identity,
    _result: identity
  },
  _tag: "ValueMatcher",
  add(_case) {
    if (this.value._tag === "Right") {
      return this;
    }
    if (_case._tag === "When" && _case.guard(this.provided) === true) {
      return makeValueMatcher(this.provided, right2(_case.evaluate(this.provided)));
    } else if (_case._tag === "Not" && _case.guard(this.provided) === false) {
      return makeValueMatcher(this.provided, right2(_case.evaluate(this.provided)));
    }
    return this;
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
function makeValueMatcher(provided, value5) {
  const matcher = Object.create(ValueMatcherProto);
  matcher.provided = provided;
  matcher.value = value5;
  return matcher;
}
var makeWhen = (guard, evaluate) => ({
  _tag: "When",
  guard,
  evaluate
});
var makePredicate = (pattern) => {
  if (typeof pattern === "function") {
    return pattern;
  } else if (Array.isArray(pattern)) {
    const predicates = pattern.map(makePredicate);
    const len = predicates.length;
    return (u) => {
      if (!Array.isArray(u)) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (predicates[i](u[i]) === false) {
          return false;
        }
      }
      return true;
    };
  } else if (pattern !== null && typeof pattern === "object") {
    const keysAndPredicates = Object.entries(pattern).map(([k, p2]) => [k, makePredicate(p2)]);
    const len = keysAndPredicates.length;
    return (u) => {
      if (typeof u !== "object" || u === null) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        const [key2, predicate] = keysAndPredicates[i];
        if (!(key2 in u) || predicate(u[key2]) === false) {
          return false;
        }
      }
      return true;
    };
  }
  return (u) => u === pattern;
};
var value = (i) => makeValueMatcher(i, left2(i));
var when3 = (pattern, f) => (self) => self.add(makeWhen(makePredicate(pattern), f));
var orElse7 = (f) => (self) => {
  const result = either4(self);
  if (isEither2(result)) {
    return result._tag === "Right" ? result.right : f(result.left);
  }
  return (input) => {
    const a = result(input);
    return a._tag === "Right" ? a.right : f(a.left);
  };
};
var either4 = (self) => {
  if (self._tag === "ValueMatcher") {
    return self.value;
  }
  const len = self.cases.length;
  if (len === 1) {
    const _case = self.cases[0];
    return (input) => {
      if (_case._tag === "When" && _case.guard(input) === true) {
        return right2(_case.evaluate(input));
      } else if (_case._tag === "Not" && _case.guard(input) === false) {
        return right2(_case.evaluate(input));
      }
      return left2(input);
    };
  }
  return (input) => {
    for (let i = 0; i < len; i++) {
      const _case = self.cases[i];
      if (_case._tag === "When" && _case.guard(input) === true) {
        return right2(_case.evaluate(input));
      } else if (_case._tag === "Not" && _case.guard(input) === false) {
        return right2(_case.evaluate(input));
      }
    }
    return left2(input);
  };
};

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Match.js
var value2 = value;
var when4 = when3;
var orElse8 = orElse7;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Stream.js
var bufferChunks2 = bufferChunks;
var fromChannel2 = fromChannel;
var unwrapScoped5 = unwrapScoped4;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Secret.js
var isSecret2 = isSecret;
var fromString2 = fromString;

// ../../.yarn/cache/effect-npm-2.0.0-next.62-cddb36287c-e917517243.zip/node_modules/effect/dist/esm/Sink.js
var forEach10 = forEach9;
var unwrapScoped6 = unwrapScoped3;

// ../../util/index.mts
import { join as join5, extname, resolve, relative } from "node:path";

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/internal/error.js
var PlatformErrorTypeId = /* @__PURE__ */ Symbol.for("@effect/platform/Error/PlatformErrorTypeId");
var make44 = (tag4) => (props) => struct2({
  [PlatformErrorTypeId]: PlatformErrorTypeId,
  _tag: tag4,
  ...props
});
var badArgument = /* @__PURE__ */ make44("BadArgument");
var systemError = /* @__PURE__ */ make44("SystemError");

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/Error.js
var BadArgument = badArgument;
var SystemError = systemError;

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/internal/fileSystem.js
var tag2 = /* @__PURE__ */ Tag("@effect/platform/FileSystem");
var Size = (bytes) => typeof bytes === "bigint" ? bytes : BigInt(bytes);
var bigint1024 = /* @__PURE__ */ BigInt(1024);
var bigintPiB = bigint1024 * bigint1024 * bigint1024 * bigint1024 * bigint1024;
var make45 = (impl) => {
  return tag2.of({
    ...impl,
    exists: (path2) => pipe(impl.access(path2), as3(true), catchTag2("SystemError", (e) => e.reason === "NotFound" ? succeed6(false) : fail6(e))),
    readFileString: (path2, encoding) => tryMap2(impl.readFile(path2), {
      try: (_) => new TextDecoder(encoding).decode(_),
      catch: () => BadArgument({
        module: "FileSystem",
        method: "readFileString",
        message: "invalid encoding"
      })
    }),
    stream: (path2, options3) => pipe(impl.open(path2, {
      flag: "r"
    }), options3?.offset ? tap2((file3) => file3.seek(options3.offset, "start")) : identity, map13((file3) => stream(file3, options3)), unwrapScoped5),
    sink: (path2, options3) => pipe(impl.open(path2, {
      flag: "w",
      ...options3
    }), map13((file3) => forEach10((_) => file3.writeAll(_))), unwrapScoped6),
    writeFileString: (path2, data, options3) => flatMap8(try_2({
      try: () => new TextEncoder().encode(data),
      catch: () => BadArgument({
        module: "FileSystem",
        method: "writeFileString",
        message: "could not encode string"
      })
    }), (_) => impl.writeFile(path2, _, options3))
  });
};
var stream = (file3, {
  bufferSize = 16,
  bytesToRead: bytesToRead_,
  chunkSize: chunkSize_ = Size(64 * 1024)
} = {}) => {
  const bytesToRead = bytesToRead_ !== void 0 ? Size(bytesToRead_) : void 0;
  const chunkSize = Size(chunkSize_);
  function loop3(totalBytesRead) {
    if (bytesToRead !== void 0 && bytesToRead <= totalBytesRead) {
      return unit6;
    }
    const toRead = bytesToRead !== void 0 && bytesToRead - totalBytesRead < chunkSize ? bytesToRead - totalBytesRead : chunkSize;
    return flatMap13(file3.readAlloc(toRead), match({
      onNone: () => unit6,
      onSome: (buf) => flatMap13(write2(of2(buf)), (_) => loop3(totalBytesRead + BigInt(buf.length)))
    }));
  }
  return bufferChunks2(fromChannel2(loop3(BigInt(0))), {
    capacity: bufferSize
  });
};

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/FileSystem.js
var Size2 = Size;
var FileSystem = tag2;
var make46 = make45;
var FileTypeId = /* @__PURE__ */ Symbol.for("@effect/platform/FileSystem/File");
var FileDescriptor = /* @__PURE__ */ nominal();

// ../../.yarn/__virtual__/@effect-platform-node-virtual-c1b6a8b191/0/cache/@effect-platform-node-npm-0.39.0-7f5696fed2-148d1a8f3a.zip/node_modules/@effect/platform-node/dist/esm/internal/error.js
var handleErrnoException = (module, method) => (err, [path2]) => {
  let reason = "Unknown";
  switch (err.code) {
    case "ENOENT":
      reason = "NotFound";
      break;
    case "EACCES":
      reason = "PermissionDenied";
      break;
    case "EEXIST":
      reason = "AlreadyExists";
      break;
    case "EISDIR":
      reason = "BadResource";
      break;
    case "ENOTDIR":
      reason = "BadResource";
      break;
    case "EBUSY":
      reason = "Busy";
      break;
    case "ELOOP":
      reason = "BadResource";
      break;
  }
  return SystemError({
    reason,
    module,
    method,
    pathOrDescriptor: path2,
    syscall: err.syscall,
    message: err.message
  });
};

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/internal/effectify.js
var effectify = (fn, onError4, onSyncError) => (...args) => async2((resume2) => {
  try {
    fn(...args, (err, result) => {
      if (err) {
        resume2(fail6(onError4 ? onError4(err, args) : err));
      } else {
        resume2(succeed6(result));
      }
    });
  } catch (err) {
    resume2(onSyncError ? fail6(onSyncError(err, args)) : die5(err));
  }
});

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/Effectify.js
var effectify2 = effectify;

// ../../.yarn/__virtual__/@effect-platform-node-virtual-c1b6a8b191/0/cache/@effect-platform-node-npm-0.39.0-7f5696fed2-148d1a8f3a.zip/node_modules/@effect/platform-node/dist/esm/FileSystem.js
var FileSystem_exports2 = {};
__export(FileSystem_exports2, {
  FileSystem: () => FileSystem,
  Size: () => Size2,
  layer: () => layer2
});

// ../../.yarn/__virtual__/@effect-platform-node-virtual-c1b6a8b191/0/cache/@effect-platform-node-npm-0.39.0-7f5696fed2-148d1a8f3a.zip/node_modules/@effect/platform-node/dist/esm/internal/fileSystem.js
import * as Crypto from "node:crypto";
import * as NFS from "node:fs";
import * as OS from "node:os";
import * as Path from "node:path";
var handleBadArgument = (method) => (err) => BadArgument({
  module: "FileSystem",
  method,
  message: err.message ?? String(err)
});
var access2 = /* @__PURE__ */ (() => {
  const nodeAccess = /* @__PURE__ */ effectify2(NFS.access, /* @__PURE__ */ handleErrnoException("FileSystem", "access"), /* @__PURE__ */ handleBadArgument("access"));
  return (path2, options3) => {
    let mode = NFS.constants.F_OK;
    if (options3?.readable) {
      mode |= NFS.constants.R_OK;
    }
    if (options3?.writable) {
      mode |= NFS.constants.W_OK;
    }
    return nodeAccess(path2, mode);
  };
})();
var copy3 = /* @__PURE__ */ (() => {
  const nodeCp = /* @__PURE__ */ effectify2(NFS.cp, /* @__PURE__ */ handleErrnoException("FileSystem", "copy"), /* @__PURE__ */ handleBadArgument("copy"));
  return (fromPath, toPath, options3) => nodeCp(fromPath, toPath, {
    force: options3?.overwrite ?? false,
    preserveTimestamps: options3?.preserveTimestamps ?? false,
    recursive: true
  });
})();
var copyFile2 = /* @__PURE__ */ (() => {
  const nodeCopyFile = /* @__PURE__ */ effectify2(NFS.copyFile, /* @__PURE__ */ handleErrnoException("FileSystem", "copyFile"), /* @__PURE__ */ handleBadArgument("copyFile"));
  return (fromPath, toPath) => nodeCopyFile(fromPath, toPath);
})();
var chmod2 = /* @__PURE__ */ (() => {
  const nodeChmod = /* @__PURE__ */ effectify2(NFS.chmod, /* @__PURE__ */ handleErrnoException("FileSystem", "chmod"), /* @__PURE__ */ handleBadArgument("chmod"));
  return (path2, mode) => nodeChmod(path2, mode);
})();
var chown2 = /* @__PURE__ */ (() => {
  const nodeChown = /* @__PURE__ */ effectify2(NFS.chown, /* @__PURE__ */ handleErrnoException("FileSystem", "chown"), /* @__PURE__ */ handleBadArgument("chown"));
  return (path2, uid, gid) => nodeChown(path2, uid, gid);
})();
var link2 = /* @__PURE__ */ (() => {
  const nodeLink = /* @__PURE__ */ effectify2(NFS.link, /* @__PURE__ */ handleErrnoException("FileSystem", "link"), /* @__PURE__ */ handleBadArgument("link"));
  return (existingPath, newPath) => nodeLink(existingPath, newPath);
})();
var makeDirectory = /* @__PURE__ */ (() => {
  const nodeMkdir = /* @__PURE__ */ effectify2(NFS.mkdir, /* @__PURE__ */ handleErrnoException("FileSystem", "makeDirectory"), /* @__PURE__ */ handleBadArgument("makeDirectory"));
  return (path2, options3) => nodeMkdir(path2, {
    recursive: options3?.recursive ?? false,
    mode: options3?.mode
  });
})();
var makeTempDirectoryFactory = (method) => {
  const nodeMkdtemp = effectify2(NFS.mkdtemp, handleErrnoException("FileSystem", method), handleBadArgument(method));
  return (options3) => suspend2(() => {
    const prefix = options3?.prefix ?? "";
    const directory3 = typeof options3?.directory === "string" ? Path.join(options3.directory, ".") : OS.tmpdir();
    return nodeMkdtemp(prefix ? Path.join(directory3, prefix) : directory3 + "/");
  });
};
var makeTempDirectory = /* @__PURE__ */ makeTempDirectoryFactory("makeTempDirectory");
var removeFactory = (method) => {
  const nodeRm = effectify2(NFS.rm, handleErrnoException("FileSystem", method), handleBadArgument(method));
  return (path2, options3) => nodeRm(path2, {
    recursive: options3?.recursive ?? false
  });
};
var remove8 = /* @__PURE__ */ removeFactory("remove");
var makeTempDirectoryScoped = /* @__PURE__ */ (() => {
  const makeDirectory2 = /* @__PURE__ */ makeTempDirectoryFactory("makeTempDirectoryScoped");
  const removeDirectory = /* @__PURE__ */ removeFactory("makeTempDirectoryScoped");
  return (options3) => acquireRelease2(makeDirectory2(options3), (directory3) => orDie2(removeDirectory(directory3, {
    recursive: true
  })));
})();
var openFactory = (method) => {
  const nodeOpen = effectify2(NFS.open, handleErrnoException("FileSystem", method), handleBadArgument(method));
  const nodeClose = effectify2(NFS.close, handleErrnoException("FileSystem", method), handleBadArgument(method));
  return (path2, options3) => pipe(acquireRelease2(nodeOpen(path2, options3?.flag ?? "r", options3?.mode), (fd) => orDie2(nodeClose(fd))), map13((fd) => makeFile(FileDescriptor(fd), options3?.flag?.startsWith("a") ?? false)));
};
var open2 = /* @__PURE__ */ openFactory("open");
var makeFile = /* @__PURE__ */ (() => {
  const nodeReadFactory = (method) => effectify2(NFS.read, handleErrnoException("FileSystem", method), handleBadArgument(method));
  const nodeRead = /* @__PURE__ */ nodeReadFactory("read");
  const nodeReadAlloc = /* @__PURE__ */ nodeReadFactory("readAlloc");
  const nodeStat = /* @__PURE__ */ effectify2(NFS.fstat, /* @__PURE__ */ handleErrnoException("FileSystem", "stat"), /* @__PURE__ */ handleBadArgument("stat"));
  const nodeTruncate = /* @__PURE__ */ effectify2(NFS.ftruncate, /* @__PURE__ */ handleErrnoException("FileSystem", "truncate"), /* @__PURE__ */ handleBadArgument("truncate"));
  const nodeWriteFactory = (method) => effectify2(NFS.write, handleErrnoException("FileSystem", method), handleBadArgument(method));
  const nodeWrite = /* @__PURE__ */ nodeWriteFactory("write");
  const nodeWriteAll = /* @__PURE__ */ nodeWriteFactory("writeAll");
  class FileImpl {
    fd;
    append;
    [FileTypeId];
    semaphore = unsafeMakeSemaphore2(1);
    position = 0n;
    constructor(fd, append4) {
      this.fd = fd;
      this.append = append4;
      this[FileTypeId] = FileTypeId;
    }
    get stat() {
      return map13(nodeStat(this.fd), makeFileInfo);
    }
    seek(offset, from2) {
      const offsetSize = Size2(offset);
      return this.semaphore.withPermits(1)(sync2(() => {
        if (from2 === "start") {
          this.position = offsetSize;
        } else if (from2 === "current") {
          this.position = this.position + offsetSize;
        }
        return this.position;
      }));
    }
    read(buffer2) {
      return this.semaphore.withPermits(1)(map13(suspend2(() => nodeRead(this.fd, {
        buffer: buffer2,
        position: this.position
      })), (bytesRead) => {
        const sizeRead = Size2(bytesRead);
        this.position = this.position + sizeRead;
        return sizeRead;
      }));
    }
    readAlloc(size12) {
      const sizeNumber = Number(size12);
      return this.semaphore.withPermits(1)(flatMap8(sync2(() => Buffer.allocUnsafeSlow(sizeNumber)), (buffer2) => map13(nodeReadAlloc(this.fd, {
        buffer: buffer2,
        position: this.position
      }), (bytesRead) => {
        if (bytesRead === 0) {
          return none2();
        }
        this.position = this.position + BigInt(bytesRead);
        if (bytesRead === sizeNumber) {
          return some2(buffer2);
        }
        const dst = Buffer.allocUnsafeSlow(bytesRead);
        buffer2.copy(dst, 0, 0, bytesRead);
        return some2(dst);
      })));
    }
    truncate(length3) {
      return this.semaphore.withPermits(1)(map13(nodeTruncate(this.fd, length3 ? Number(length3) : void 0), () => {
        if (!this.append) {
          const len = BigInt(length3 ?? 0);
          if (this.position > len) {
            this.position = len;
          }
        }
      }));
    }
    write(buffer2) {
      return this.semaphore.withPermits(1)(map13(suspend2(() => nodeWrite(this.fd, buffer2, void 0, void 0, this.append ? void 0 : Number(this.position))), (bytesWritten) => {
        const sizeWritten = Size2(bytesWritten);
        if (!this.append) {
          this.position = this.position + sizeWritten;
        }
        return sizeWritten;
      }));
    }
    writeAllChunk(buffer2) {
      return flatMap8(suspend2(() => nodeWriteAll(this.fd, buffer2, void 0, void 0, this.append ? void 0 : Number(this.position))), (bytesWritten) => {
        if (bytesWritten === 0) {
          return fail6(SystemError({
            module: "FileSystem",
            method: "writeAll",
            reason: "WriteZero",
            pathOrDescriptor: this.fd,
            message: "write returned 0 bytes written"
          }));
        }
        if (!this.append) {
          this.position = this.position + BigInt(bytesWritten);
        }
        return bytesWritten < buffer2.length ? this.writeAllChunk(buffer2.subarray(bytesWritten)) : unit4;
      });
    }
    writeAll(buffer2) {
      return this.semaphore.withPermits(1)(this.writeAllChunk(buffer2));
    }
  }
  return (fd, append4) => new FileImpl(fd, append4);
})();
var makeTempFileFactory = (method) => {
  const makeDirectory2 = makeTempDirectoryFactory(method);
  const open3 = openFactory(method);
  const randomHexString = (bytes) => sync2(() => Crypto.randomBytes(bytes).toString("hex"));
  return (options3) => pipe(zip5(makeDirectory2(options3), randomHexString(6)), map13(([directory3, random4]) => Path.join(directory3, random4)), tap2((path2) => scoped(open3(path2, {
    flag: "w+"
  }))));
};
var makeTempFile = /* @__PURE__ */ makeTempFileFactory("makeTempFile");
var makeTempFileScoped = /* @__PURE__ */ (() => {
  const makeFile2 = /* @__PURE__ */ makeTempFileFactory("makeTempFileScoped");
  const removeFile = /* @__PURE__ */ removeFactory("makeTempFileScoped");
  return (options3) => acquireRelease2(makeFile2(options3), (file3) => orDie2(removeFile(file3)));
})();
var readDirectory = /* @__PURE__ */ (() => {
  const nodeReadDirectory = /* @__PURE__ */ effectify2(NFS.readdir, /* @__PURE__ */ handleErrnoException("FileSystem", "readDirectory"), /* @__PURE__ */ handleBadArgument("readDirectory"));
  return (path2, options3) => nodeReadDirectory(path2, options3);
})();
var readFile2 = (path2) => async2((resume2, signal) => {
  try {
    NFS.readFile(path2, {
      signal
    }, (err, data) => {
      if (err) {
        resume2(fail6(handleErrnoException("FileSystem", "readFile")(err, [path2])));
      } else {
        resume2(succeed6(data));
      }
    });
  } catch (err) {
    resume2(fail6(handleBadArgument("readFile")(err)));
  }
});
var readLink = /* @__PURE__ */ (() => {
  const nodeReadLink = /* @__PURE__ */ effectify2(NFS.readlink, /* @__PURE__ */ handleErrnoException("FileSystem", "readLink"), /* @__PURE__ */ handleBadArgument("readLink"));
  return (path2) => nodeReadLink(path2);
})();
var realPath = /* @__PURE__ */ (() => {
  const nodeRealPath = /* @__PURE__ */ effectify2(NFS.realpath, /* @__PURE__ */ handleErrnoException("FileSystem", "realPath"), /* @__PURE__ */ handleBadArgument("realPath"));
  return (path2) => nodeRealPath(path2);
})();
var rename2 = /* @__PURE__ */ (() => {
  const nodeRename = /* @__PURE__ */ effectify2(NFS.rename, /* @__PURE__ */ handleErrnoException("FileSystem", "rename"), /* @__PURE__ */ handleBadArgument("rename"));
  return (oldPath, newPath) => nodeRename(oldPath, newPath);
})();
var makeFileInfo = (stat3) => ({
  type: stat3.isFile() ? "File" : stat3.isDirectory() ? "Directory" : stat3.isSymbolicLink() ? "SymbolicLink" : stat3.isBlockDevice() ? "BlockDevice" : stat3.isCharacterDevice() ? "CharacterDevice" : stat3.isFIFO() ? "FIFO" : stat3.isSocket() ? "Socket" : "Unknown",
  mtime: fromNullable(stat3.mtime),
  atime: fromNullable(stat3.atime),
  birthtime: fromNullable(stat3.birthtime),
  dev: stat3.dev,
  rdev: fromNullable(stat3.rdev),
  ino: fromNullable(stat3.ino),
  mode: stat3.mode,
  nlink: fromNullable(stat3.nlink),
  uid: fromNullable(stat3.uid),
  gid: fromNullable(stat3.gid),
  size: Size2(stat3.size),
  blksize: fromNullable(Size2(stat3.blksize)),
  blocks: fromNullable(stat3.blocks)
});
var stat2 = /* @__PURE__ */ (() => {
  const nodeStat = /* @__PURE__ */ effectify2(NFS.stat, /* @__PURE__ */ handleErrnoException("FileSystem", "stat"), /* @__PURE__ */ handleBadArgument("stat"));
  return (path2) => map13(nodeStat(path2), makeFileInfo);
})();
var symlink2 = /* @__PURE__ */ (() => {
  const nodeSymlink = /* @__PURE__ */ effectify2(NFS.symlink, /* @__PURE__ */ handleErrnoException("FileSystem", "symlink"), /* @__PURE__ */ handleBadArgument("symlink"));
  return (target, path2) => nodeSymlink(target, path2);
})();
var truncate2 = /* @__PURE__ */ (() => {
  const nodeTruncate = /* @__PURE__ */ effectify2(NFS.truncate, /* @__PURE__ */ handleErrnoException("FileSystem", "truncate"), /* @__PURE__ */ handleBadArgument("truncate"));
  return (path2, length3) => nodeTruncate(path2, length3 !== void 0 ? Number(length3) : void 0);
})();
var utimes2 = /* @__PURE__ */ (() => {
  const nodeUtimes = /* @__PURE__ */ effectify2(NFS.utimes, /* @__PURE__ */ handleErrnoException("FileSystem", "utime"), /* @__PURE__ */ handleBadArgument("utime"));
  return (path2, atime, mtime) => nodeUtimes(path2, atime, mtime);
})();
var writeFile2 = (path2, data, options3) => async2((resume2, signal) => {
  try {
    NFS.writeFile(path2, data, {
      signal,
      flag: options3?.flag,
      mode: options3?.mode
    }, (err) => {
      if (err) {
        resume2(fail6(handleErrnoException("FileSystem", "writeFile")(err, [path2])));
      } else {
        resume2(unit4);
      }
    });
  } catch (err) {
    resume2(fail6(handleBadArgument("writeFile")(err)));
  }
});
var fileSystemImpl = /* @__PURE__ */ make46({
  access: access2,
  chmod: chmod2,
  chown: chown2,
  copy: copy3,
  copyFile: copyFile2,
  link: link2,
  makeDirectory,
  makeTempDirectory,
  makeTempDirectoryScoped,
  makeTempFile,
  makeTempFileScoped,
  open: open2,
  readDirectory,
  readFile: readFile2,
  readLink,
  realPath,
  remove: remove8,
  rename: rename2,
  stat: stat2,
  symlink: symlink2,
  truncate: truncate2,
  utimes: utimes2,
  writeFile: writeFile2
});
var layer = /* @__PURE__ */ succeed7(FileSystem, fileSystemImpl);

// ../../.yarn/__virtual__/@effect-platform-node-virtual-c1b6a8b191/0/cache/@effect-platform-node-npm-0.39.0-7f5696fed2-148d1a8f3a.zip/node_modules/@effect/platform-node/dist/esm/FileSystem.js
var layer2 = layer;

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/internal/ast.js
var getKeysForIndexSignature = (input, parameter) => {
  switch (parameter._tag) {
    case "StringKeyword":
    case "TemplateLiteral":
      return Object.keys(input);
    case "SymbolKeyword":
      return Object.getOwnPropertySymbols(input);
    case "Refinement":
      return getKeysForIndexSignature(input, parameter.from);
  }
};
var ownKeys = (o) => Object.keys(o).concat(Object.getOwnPropertySymbols(o));
var memoizeThunk = (f) => {
  let done9 = false;
  let a;
  return () => {
    if (done9) {
      return a;
    }
    a = f();
    done9 = true;
    return a;
  };
};

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/AST.js
var TypeAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Type");
var MessageAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Message");
var IdentifierAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Identifier");
var TitleAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Title");
var DescriptionAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Description");
var ExamplesAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Examples");
var DefaultAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Default");
var JSONSchemaAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/JSONSchema");
var DocumentationAnnotationId = /* @__PURE__ */ Symbol.for("@effect/schema/annotation/Documentation");
var getAnnotation = /* @__PURE__ */ dual(2, (annotated, key2) => Object.prototype.hasOwnProperty.call(annotated.annotations, key2) ? some2(annotated.annotations[key2]) : none2());
var getMessageAnnotation = /* @__PURE__ */ getAnnotation(MessageAnnotationId);
var getTitleAnnotation = /* @__PURE__ */ getAnnotation(TitleAnnotationId);
var getIdentifierAnnotation = /* @__PURE__ */ getAnnotation(IdentifierAnnotationId);
var getDescriptionAnnotation = /* @__PURE__ */ getAnnotation(DescriptionAnnotationId);
var createDeclaration = (typeParameters, type3, decode3, annotations2 = {}) => ({
  _tag: "Declaration",
  typeParameters,
  type: type3,
  decode: decode3,
  annotations: annotations2
});
var createLiteral = (literal2, annotations2 = {}) => ({
  _tag: "Literal",
  literal: literal2,
  annotations: annotations2
});
var isLiteral = (ast) => ast._tag === "Literal";
var _null = /* @__PURE__ */ createLiteral(null);
var createUniqueSymbol = (symbol3, annotations2 = {}) => ({
  _tag: "UniqueSymbol",
  symbol: symbol3,
  annotations: annotations2
});
var isUniqueSymbol = (ast) => ast._tag === "UniqueSymbol";
var undefinedKeyword = {
  _tag: "UndefinedKeyword",
  annotations: {
    [TitleAnnotationId]: "undefined"
  }
};
var voidKeyword = {
  _tag: "VoidKeyword",
  annotations: {
    [TitleAnnotationId]: "void"
  }
};
var neverKeyword = {
  _tag: "NeverKeyword",
  annotations: {
    [TitleAnnotationId]: "never"
  }
};
var unknownKeyword = {
  _tag: "UnknownKeyword",
  annotations: {
    [TitleAnnotationId]: "unknown"
  }
};
var isUnknownKeyword = (ast) => ast._tag === "UnknownKeyword";
var anyKeyword = {
  _tag: "AnyKeyword",
  annotations: {
    [TitleAnnotationId]: "any"
  }
};
var isAnyKeyword = (ast) => ast._tag === "AnyKeyword";
var stringKeyword = {
  _tag: "StringKeyword",
  annotations: {
    [TitleAnnotationId]: "string",
    [DescriptionAnnotationId]: "a string"
  }
};
var isStringKeyword = (ast) => ast._tag === "StringKeyword";
var numberKeyword = {
  _tag: "NumberKeyword",
  annotations: {
    [TitleAnnotationId]: "number",
    [DescriptionAnnotationId]: "a number"
  }
};
var isNumberKeyword = (ast) => ast._tag === "NumberKeyword";
var booleanKeyword = {
  _tag: "BooleanKeyword",
  annotations: {
    [TitleAnnotationId]: "boolean",
    [DescriptionAnnotationId]: "a boolean"
  }
};
var isBooleanKeyword = (ast) => ast._tag === "BooleanKeyword";
var bigIntKeyword = {
  _tag: "BigIntKeyword",
  annotations: {
    [TitleAnnotationId]: "bigint",
    [DescriptionAnnotationId]: "a bigint"
  }
};
var isBigIntKeyword = (ast) => ast._tag === "BigIntKeyword";
var symbolKeyword = {
  _tag: "SymbolKeyword",
  annotations: {
    [TitleAnnotationId]: "symbol",
    [DescriptionAnnotationId]: "a symbol"
  }
};
var isSymbolKeyword = (ast) => ast._tag === "SymbolKeyword";
var objectKeyword = {
  _tag: "ObjectKeyword",
  annotations: {
    [TitleAnnotationId]: "object",
    [DescriptionAnnotationId]: "an object"
  }
};
var createElement = (type3, isOptional) => ({
  type: type3,
  isOptional
});
var createTuple = (elements, rest, isReadonly, annotations2 = {}) => ({
  _tag: "Tuple",
  elements,
  rest,
  isReadonly,
  annotations: annotations2
});
var createPropertySignature = (name, type3, isOptional, isReadonly, annotations2 = {}) => ({
  name,
  type: type3,
  isOptional,
  isReadonly,
  annotations: annotations2
});
var isParameter = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return true;
    case "Refinement":
      return isParameter(ast.from);
    default:
      return false;
  }
};
var createIndexSignature = (parameter, type3, isReadonly) => {
  if (isParameter(parameter)) {
    return {
      parameter,
      type: type3,
      isReadonly
    };
  }
  throw new Error("An index signature parameter type must be 'string', 'symbol', a template literal type or a refinement of the previous types");
};
var createTypeLiteral = (propertySignatures, indexSignatures, annotations2 = {}) => {
  const keys5 = {};
  for (let i = 0; i < propertySignatures.length; i++) {
    const name = propertySignatures[i].name;
    if (Object.prototype.hasOwnProperty.call(keys5, name)) {
      throw new Error(`Duplicate property signature ${String(name)}`);
    }
    keys5[name] = null;
  }
  const parameters = {
    string: false,
    symbol: false
  };
  for (let i = 0; i < indexSignatures.length; i++) {
    const parameter = getParameterBase(indexSignatures[i].parameter);
    if (isStringKeyword(parameter)) {
      if (parameters.string) {
        throw new Error("Duplicate index signature for type `string`");
      }
      parameters.string = true;
    } else if (isSymbolKeyword(parameter)) {
      if (parameters.symbol) {
        throw new Error("Duplicate index signature for type `symbol`");
      }
      parameters.symbol = true;
    }
  }
  return {
    _tag: "TypeLiteral",
    propertySignatures: sortPropertySignatures(propertySignatures),
    indexSignatures,
    annotations: annotations2
  };
};
var isTypeLiteral = (ast) => ast._tag === "TypeLiteral";
var isMembers = (as7) => as7.length > 1;
var createUnion = (candidates, annotations2 = {}) => {
  const types = unify(candidates);
  if (isMembers(types)) {
    return {
      _tag: "Union",
      types: sortUnionMembers(types),
      annotations: annotations2
    };
  }
  if (isNonEmptyReadonlyArray(types)) {
    return types[0];
  }
  return neverKeyword;
};
var isUnion = (ast) => ast._tag === "Union";
var createSuspend = (f, annotations2 = {}) => ({
  _tag: "Suspend",
  f: memoizeThunk(f),
  annotations: annotations2
});
var createRefinement = (from2, filter11, annotations2 = {}) => {
  if (isTransform(from2)) {
    return createTransform(from2.from, createRefinement(from2.to, filter11, annotations2), from2.transformation, from2.annotations);
  }
  return {
    _tag: "Refinement",
    from: from2,
    filter: filter11,
    annotations: annotations2
  };
};
var isRefinement = (ast) => ast._tag === "Refinement";
var createTransform = (from2, to3, transformation, annotations2 = {}) => ({
  _tag: "Transform",
  from: from2,
  to: to3,
  transformation,
  annotations: annotations2
});
var isTransform = (ast) => ast._tag === "Transform";
var createFinalTransformation = (decode3, encode2) => ({
  _tag: "FinalTransformation",
  decode: decode3,
  encode: encode2
});
var composeTransformation = {
  _tag: "ComposeTransformation"
};
var createFinalPropertySignatureTransformation = (decode3, encode2) => ({
  _tag: "FinalPropertySignatureTransformation",
  decode: decode3,
  encode: encode2
});
var createPropertySignatureTransform = (from2, to3, propertySignatureTransformation) => ({
  from: from2,
  to: to3,
  propertySignatureTransformation
});
var createTypeLiteralTransformation = (propertySignatureTransformations) => {
  const keys5 = {};
  for (const pst of propertySignatureTransformations) {
    const key2 = pst.from;
    if (keys5[key2]) {
      throw new Error(`Duplicate property signature transformation ${String(key2)}`);
    }
    keys5[key2] = true;
  }
  return {
    _tag: "TypeLiteralTransformation",
    propertySignatureTransformations
  };
};
var isTypeLiteralTransformation = (ast) => ast._tag === "TypeLiteralTransformation";
var mergeAnnotations = (ast, annotations2) => ({
  ...ast,
  annotations: {
    ...ast.annotations,
    ...annotations2
  }
});
var getToPropertySignatures = (ps) => ps.map((p2) => createPropertySignature(p2.name, to(p2.type), p2.isOptional, p2.isReadonly, p2.annotations));
var getToIndexSignatures = (ps) => ps.map((is3) => createIndexSignature(is3.parameter, to(is3.type), is3.isReadonly));
var to = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return createDeclaration(ast.typeParameters.map(to), to(ast.type), ast.decode, ast.annotations);
    case "Tuple":
      return createTuple(ast.elements.map((e) => createElement(to(e.type), e.isOptional)), map(ast.rest, map2(to)), ast.isReadonly, ast.annotations);
    case "TypeLiteral":
      return createTypeLiteral(getToPropertySignatures(ast.propertySignatures), getToIndexSignatures(ast.indexSignatures), ast.annotations);
    case "Union":
      return createUnion(ast.types.map(to), ast.annotations);
    case "Suspend":
      return createSuspend(() => to(ast.f()), ast.annotations);
    case "Refinement":
      return createRefinement(to(ast.from), ast.filter, ast.annotations);
    case "Transform":
      return to(ast.to);
  }
  return ast;
};
var preserveIdentifierAnnotation = (annotated) => {
  return match(getIdentifierAnnotation(annotated), {
    onNone: () => void 0,
    onSome: (identifier) => ({
      [IdentifierAnnotationId]: identifier
    })
  });
};
var from = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return createDeclaration(ast.typeParameters.map(from), from(ast.type), ast.decode, ast.annotations);
    case "Tuple":
      return createTuple(ast.elements.map((e) => createElement(from(e.type), e.isOptional)), map(ast.rest, map2(from)), ast.isReadonly, preserveIdentifierAnnotation(ast));
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map((p2) => createPropertySignature(p2.name, from(p2.type), p2.isOptional, p2.isReadonly)), ast.indexSignatures.map((is3) => createIndexSignature(is3.parameter, from(is3.type), is3.isReadonly)), preserveIdentifierAnnotation(ast));
    case "Union":
      return createUnion(ast.types.map(from), preserveIdentifierAnnotation(ast));
    case "Suspend":
      return createSuspend(() => from(ast.f()), preserveIdentifierAnnotation(ast));
    case "Refinement":
    case "Transform":
      return from(ast.from);
  }
  return ast;
};
var getCardinality = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return getCardinality(ast.type);
    case "NeverKeyword":
      return 0;
    case "Literal":
    case "UndefinedKeyword":
    case "VoidKeyword":
    case "UniqueSymbol":
      return 1;
    case "BooleanKeyword":
      return 2;
    case "StringKeyword":
    case "NumberKeyword":
    case "BigIntKeyword":
    case "SymbolKeyword":
      return 3;
    case "ObjectKeyword":
      return 5;
    case "UnknownKeyword":
    case "AnyKeyword":
      return 6;
    default:
      return 4;
  }
};
var sortPropertySignatures = /* @__PURE__ */ sort(/* @__PURE__ */ pipe(Order, /* @__PURE__ */ mapInput2((ps) => getCardinality(ps.type))));
var WeightOrder = /* @__PURE__ */ tuple(Order, Order, Order);
var maxWeight = /* @__PURE__ */ max(WeightOrder);
var emptyWeight = [0, 0, 0];
var maxWeightAll = (weights) => weights.reduce(maxWeight, emptyWeight);
var getWeight = (ast) => {
  switch (ast._tag) {
    case "Tuple": {
      const y = ast.elements.length;
      const z = isSome2(ast.rest) ? ast.rest.value.length : 0;
      return [2, y, z];
    }
    case "TypeLiteral": {
      const y = ast.propertySignatures.length;
      const z = ast.indexSignatures.length;
      return y + z === 0 ? [-4, 0, 0] : [4, y, z];
    }
    case "Declaration": {
      const [_, y, z] = getWeight(ast.type);
      return [6, y, z];
    }
    case "Suspend":
      return [8, 0, 0];
    case "Union":
      return maxWeightAll(ast.types.map(getWeight));
    case "Refinement": {
      const [x, y, z] = getWeight(ast.from);
      return [x + 1, y, z];
    }
    case "Transform":
      return getWeight(ast.from);
    case "ObjectKeyword":
      return [-2, 0, 0];
    case "UnknownKeyword":
    case "AnyKeyword":
      return [-4, 0, 0];
    default:
      return emptyWeight;
  }
};
var sortUnionMembers = /* @__PURE__ */ sort(/* @__PURE__ */ reverse(/* @__PURE__ */ mapInput2(WeightOrder, getWeight)));
var unify = (candidates) => {
  let out = pipe(candidates, flatMap2((ast) => {
    switch (ast._tag) {
      case "NeverKeyword":
        return [];
      case "Union":
        return ast.types;
      default:
        return [ast];
    }
  }));
  if (out.some(isAnyKeyword)) {
    return [anyKeyword];
  }
  if (out.some(isUnknownKeyword)) {
    return [unknownKeyword];
  }
  let i;
  if ((i = out.findIndex(isStringKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isStringKeyword(m) && !(isLiteral(m) && typeof m.literal === "string"));
  }
  if ((i = out.findIndex(isNumberKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isNumberKeyword(m) && !(isLiteral(m) && typeof m.literal === "number"));
  }
  if ((i = out.findIndex(isBooleanKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBooleanKeyword(m) && !(isLiteral(m) && typeof m.literal === "boolean"));
  }
  if ((i = out.findIndex(isBigIntKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBigIntKeyword(m) && !(isLiteral(m) && typeof m.literal === "bigint"));
  }
  if ((i = out.findIndex(isSymbolKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isSymbolKeyword(m) && !isUniqueSymbol(m));
  }
  return out;
};
var getParameterBase = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return ast;
    case "Refinement":
      return getParameterBase(ast.from);
  }
};
var compose = (ab, cd) => createTransform(ab, cd, composeTransformation);

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/internal/filters.js
var GreaterThanTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/GreaterThan");
var GreaterThanOrEqualToTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualTo");
var LessThanTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/LessThan");
var LessThanOrEqualToTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/LessThanOrEqualTo");
var IntTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/Int");
var BetweenTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/Between");
var GreaterThanBigintTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/GreaterThanBigint");
var GreaterThanOrEqualToBigintTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualToBigint");
var LessThanBigintTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/LessThanBigint");
var LessThanOrEqualToBigintTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/LessThanOrEqualToBigint");
var BetweenBigintTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/BetweenBigint");
var MinLengthTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/MinLength");
var MaxLengthTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/MaxLength");
var LengthTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/Length");
var MinItemsTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/MinItems");
var MaxItemsTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/MaxItems");
var ItemsCountTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/ItemsCount");

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/internal/hooks.js
var ArbitraryHookId = /* @__PURE__ */ Symbol.for("@effect/schema/ArbitraryHookId");
var PrettyHookId = /* @__PURE__ */ Symbol.for("@effect/schema/PrettyHookId");
var EquivalenceHookId = /* @__PURE__ */ Symbol.for("@effect/schema/EquivalenceHookId");

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/TreeFormatter.js
var make47 = (value5, forest = []) => ({
  value: value5,
  forest
});
var formatErrors = (errors) => drawTree(make47(`error(s) found`, errors.map(go)));
var drawTree = (tree) => tree.value + draw("\n", tree.forest);
var draw = (indentation, forest) => {
  let r = "";
  const len = forest.length;
  let tree;
  for (let i = 0; i < len; i++) {
    tree = forest[i];
    const isLast = i === len - 1;
    r += indentation + (isLast ? "\u2514" : "\u251C") + "\u2500 " + tree.value;
    r += draw(indentation + (len > 1 && !isLast ? "\u2502  " : "   "), tree.forest);
  }
  return r;
};
var formatActual = (actual) => {
  if (isString(actual)) {
    return JSON.stringify(actual);
  } else if (isNumber(actual) || actual == null || isBoolean(actual) || isSymbol(actual) || isDate(actual)) {
    return String(actual);
  } else if (isBigInt(actual)) {
    return String(actual) + "n";
  } else if (!Array.isArray(actual) && hasProperty(actual, "toString") && isFunction2(actual["toString"]) && actual["toString"] !== Object.prototype.toString) {
    return actual["toString"]();
  }
  try {
    return JSON.stringify(actual);
  } catch (e) {
    return String(actual);
  }
};
var formatTemplateLiteralSpan = (span2) => {
  switch (span2.type._tag) {
    case "StringKeyword":
      return "${string}";
    case "NumberKeyword":
      return "${number}";
  }
};
var formatTemplateLiteral = (ast) => ast.head + ast.spans.map((span2) => formatTemplateLiteralSpan(span2) + span2.literal).join("");
var getExpected = (ast) => getIdentifierAnnotation(ast).pipe(orElse(() => getTitleAnnotation(ast)), orElse(() => getDescriptionAnnotation(ast)));
var formatExpected = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "NumberKeyword":
    case "BooleanKeyword":
    case "BigIntKeyword":
    case "UndefinedKeyword":
    case "SymbolKeyword":
    case "ObjectKeyword":
    case "AnyKeyword":
    case "UnknownKeyword":
    case "VoidKeyword":
    case "NeverKeyword":
      return getOrElse(getExpected(ast), () => ast._tag);
    case "Literal":
      return getOrElse(getExpected(ast), () => formatActual(ast.literal));
    case "UniqueSymbol":
      return getOrElse(getExpected(ast), () => formatActual(ast.symbol));
    case "Union":
      return [...new Set(ast.types.map(formatExpected))].join(" or ");
    case "TemplateLiteral":
      return getOrElse(getExpected(ast), () => formatTemplateLiteral(ast));
    case "Tuple":
      return getOrElse(getExpected(ast), () => "<anonymous tuple or array schema>");
    case "TypeLiteral":
      return getOrElse(getExpected(ast), () => "<anonymous type literal schema>");
    case "Enums":
      return getOrElse(getExpected(ast), () => ast.enums.map((_, value5) => JSON.stringify(value5)).join(" | "));
    case "Suspend":
      return getOrElse(getExpected(ast), () => "<anonymous suspended schema>");
    case "Declaration":
      return getOrElse(getExpected(ast), () => "<anonymous declaration schema>");
    case "Refinement":
      return getOrElse(getExpected(ast), () => "<anonymous refinement schema>");
    case "Transform":
      return getOrElse(getExpected(ast), () => `${formatExpected(ast.from)} <-> ${formatExpected(ast.to)}`);
  }
};
var isCollapsible = (es, errors) => es.length === 1 && es[0].forest.length !== 0 && errors[0]._tag !== "UnionMember";
var getMessage = (e) => getMessageAnnotation(e.expected).pipe(map((annotation) => annotation(e.actual)), orElse(() => e.message), getOrElse(() => `Expected ${formatExpected(e.expected)}, actual ${formatActual(e.actual)}`));
var go = (e) => {
  switch (e._tag) {
    case "Type":
      return make47(getMessage(e));
    case "Forbidden":
      return make47("is forbidden");
    case "Index": {
      const es = e.errors.map(go);
      if (isCollapsible(es, e.errors)) {
        return make47(`[${e.index}]${es[0].value}`, es[0].forest);
      }
      return make47(`[${e.index}]`, es);
    }
    case "Unexpected":
      return make47("is unexpected" + (isSome2(e.ast) ? `, expected ${formatExpected(e.ast.value)}` : ""));
    case "Key": {
      const es = e.errors.map(go);
      if (isCollapsible(es, e.errors)) {
        return make47(`[${formatActual(e.key)}]${es[0].value}`, es[0].forest);
      }
      return make47(`[${formatActual(e.key)}]`, es);
    }
    case "Missing":
      return make47("is missing");
    case "UnionMember":
      return make47("union member", e.errors.map(go));
  }
};

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/ParseResult.js
var ParseErrorImpl = class {
  errors;
  _tag = "ParseError";
  constructor(errors) {
    this.errors = errors;
  }
  toString() {
    return formatErrors(this.errors);
  }
  toJSON() {
    return {
      _id: "ParseError",
      message: this.toString()
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var parseError = (errors) => new ParseErrorImpl(errors);
var type2 = (expected, actual, message) => ({
  _tag: "Type",
  expected,
  actual,
  message: fromNullable(message)
});
var forbidden = {
  _tag: "Forbidden"
};
var index = (index2, errors) => ({
  _tag: "Index",
  index: index2,
  errors
});
var key = (key2, errors) => ({
  _tag: "Key",
  key: key2,
  errors
});
var missing = {
  _tag: "Missing"
};
var unexpected = (ast) => ({
  _tag: "Unexpected",
  ast
});
var unionMember = (errors) => ({
  _tag: "UnionMember",
  errors
});
var succeed11 = right2;
var fail12 = (error2) => {
  const e = error2;
  if ("_tag" in e) {
    return e._tag === "ParseError" ? left2(e) : left2(parseError([e]));
  }
  return left2(parseError(e));
};
var eitherOrUndefined = (self) => {
  const s = self;
  if (s["_tag"] === "Left" || s["_tag"] === "Right") {
    return s;
  }
};
var flatMap15 = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return f(s.right);
  }
  return flatMap8(self, f);
};
var map18 = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return right2(f(s.right));
  }
  return map13(self, f);
};

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/Parser.js
var getEither = (ast, isDecoding) => goMemo(ast, isDecoding);
var getEffect = (ast, isDecoding) => {
  const parser = goMemo(ast, isDecoding);
  return (input, options3) => parser(input, {
    ...options3,
    isEffectAllowed: true
  });
};
var parse = (schema) => getEffect(schema.ast, true);
var validateEither = (schema) => getEither(to(schema.ast), true);
var is2 = (schema) => {
  const getEither2 = validateEither(schema);
  return (a) => isRight2(getEither2(a));
};
var encode = (schema) => getEffect(schema.ast, false);
var defaultParseOption = {};
var decodeMemoMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/schema/Parser/decodeMemoMap"), () => /* @__PURE__ */ new WeakMap());
var encodeMemoMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/schema/Parser/encodeMemoMap"), () => /* @__PURE__ */ new WeakMap());
var goMemo = (ast, isDecoding) => {
  const memoMap = isDecoding ? decodeMemoMap : encodeMemoMap;
  const memo = memoMap.get(ast);
  if (memo) {
    return memo;
  }
  const parser = go2(ast, isDecoding);
  memoMap.set(ast, parser);
  return parser;
};
var go2 = (ast, isDecoding) => {
  switch (ast._tag) {
    case "Refinement": {
      if (isDecoding) {
        const from2 = goMemo(ast.from, true);
        return (i, options3) => handleForbidden(flatMap15(from2(i, options3), (a) => match(ast.filter(a, options3 ?? defaultParseOption, ast), {
          onNone: () => succeed11(a),
          onSome: fail12
        })), options3);
      } else {
        const from2 = goMemo(to(ast), true);
        const to3 = goMemo(dropRightRefinement(ast.from), false);
        return (i, options3) => handleForbidden(flatMap15(from2(i, options3), (a) => to3(a, options3)), options3);
      }
    }
    case "Transform": {
      const transform3 = getFinalTransformation(ast.transformation, isDecoding);
      const from2 = isDecoding ? goMemo(ast.from, true) : goMemo(ast.to, false);
      const to3 = isDecoding ? goMemo(ast.to, true) : goMemo(ast.from, false);
      return (i1, options3) => handleForbidden(flatMap15(from2(i1, options3), (a) => flatMap15(transform3(a, options3 ?? defaultParseOption, ast), (i2) => to3(i2, options3))), options3);
    }
    case "Declaration": {
      const parse4 = ast.decode(isDecoding, ...ast.typeParameters);
      return (i, options3) => handleForbidden(parse4(i, options3 ?? defaultParseOption, ast), options3);
    }
    case "Literal":
      return fromRefinement(ast, (u) => u === ast.literal);
    case "UniqueSymbol":
      return fromRefinement(ast, (u) => u === ast.symbol);
    case "UndefinedKeyword":
      return fromRefinement(ast, isUndefined);
    case "VoidKeyword":
      return fromRefinement(ast, isUndefined);
    case "NeverKeyword":
      return fromRefinement(ast, isNever);
    case "UnknownKeyword":
    case "AnyKeyword":
      return succeed11;
    case "StringKeyword":
      return fromRefinement(ast, isString);
    case "NumberKeyword":
      return fromRefinement(ast, isNumber);
    case "BooleanKeyword":
      return fromRefinement(ast, isBoolean);
    case "BigIntKeyword":
      return fromRefinement(ast, isBigInt);
    case "SymbolKeyword":
      return fromRefinement(ast, isSymbol);
    case "ObjectKeyword":
      return fromRefinement(ast, isObject);
    case "Enums":
      return fromRefinement(ast, (u) => ast.enums.some(([_, value5]) => value5 === u));
    case "TemplateLiteral": {
      const regex = getTemplateLiteralRegex(ast);
      return fromRefinement(ast, (u) => isString(u) && regex.test(u));
    }
    case "Tuple": {
      const elements = ast.elements.map((e) => goMemo(e.type, isDecoding));
      const rest = map(ast.rest, map2((ast2) => goMemo(ast2, isDecoding)));
      let requiredLen = ast.elements.filter((e) => !e.isOptional).length;
      if (isSome2(ast.rest)) {
        requiredLen += ast.rest.value.length - 1;
      }
      return (input, options3) => {
        if (!Array.isArray(input)) {
          return fail12(type2(ast, input));
        }
        const allErrors = options3?.errors === "all";
        const es = [];
        let stepKey = 0;
        const len = input.length;
        for (let i2 = len; i2 <= requiredLen - 1; i2++) {
          const e = index(i2, [missing]);
          if (allErrors) {
            es.push([stepKey++, e]);
            continue;
          } else {
            return fail12(e);
          }
        }
        if (isNone2(ast.rest)) {
          for (let i2 = ast.elements.length; i2 <= len - 1; i2++) {
            const e = index(i2, [unexpected(none2())]);
            if (allErrors) {
              es.push([stepKey++, e]);
              continue;
            } else {
              return fail12(mutableAppend(sortByIndex(es), e));
            }
          }
        }
        const output = [];
        let i = 0;
        let queue = void 0;
        for (; i < elements.length; i++) {
          if (len < i + 1) {
            if (ast.elements[i].isOptional) {
              continue;
            }
          } else {
            const parser = elements[i];
            const te = parser(input[i], options3);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = index(i, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return fail12(mutableAppend(sortByIndex(es), e));
                }
              }
              output.push([stepKey++, eu.right]);
            } else {
              const nk = stepKey++;
              const index2 = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap8(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = index(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit4;
                  } else {
                    return fail12(mutableAppend(sortByIndex(es2), e));
                  }
                }
                output2.push([nk, t.right]);
                return unit4;
              }));
            }
          }
        }
        if (isSome2(rest)) {
          const [head6, ...tail] = rest.value;
          for (; i < len - tail.length; i++) {
            const te = head6(input[i], options3);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = index(i, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return fail12(mutableAppend(sortByIndex(es), e));
                }
              } else {
                output.push([stepKey++, eu.right]);
              }
            } else {
              const nk = stepKey++;
              const index2 = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap8(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = index(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit4;
                  } else {
                    return fail12(mutableAppend(sortByIndex(es2), e));
                  }
                } else {
                  output2.push([nk, t.right]);
                  return unit4;
                }
              }));
            }
          }
          for (let j = 0; j < tail.length; j++) {
            i += j;
            if (len < i + 1) {
              continue;
            } else {
              const te = tail[j](input[i], options3);
              const eu = eitherOrUndefined(te);
              if (eu) {
                if (isLeft2(eu)) {
                  const e = index(i, eu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return fail12(mutableAppend(sortByIndex(es), e));
                  }
                }
                output.push([stepKey++, eu.right]);
              } else {
                const nk = stepKey++;
                const index2 = i;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es: es2,
                  output: output2
                }) => flatMap8(either3(te), (t) => {
                  if (isLeft2(t)) {
                    const e = index(index2, t.left.errors);
                    if (allErrors) {
                      es2.push([nk, e]);
                      return unit4;
                    } else {
                      return fail12(mutableAppend(sortByIndex(es2), e));
                    }
                  }
                  output2.push([nk, t.right]);
                  return unit4;
                }));
              }
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => isNonEmptyArray2(es2) ? fail12(sortByIndex(es2)) : succeed11(sortByIndex(output2));
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend2(() => {
            const state = {
              es: Array.from(es),
              output: Array.from(output)
            };
            return flatMap8(forEach8(cqueue, (f) => f(state), {
              concurrency: "unbounded",
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          output,
          es
        });
      };
    }
    case "TypeLiteral": {
      if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
        return fromRefinement(ast, isNotNullable);
      }
      const propertySignatures = [];
      const expectedKeys = {};
      for (const ps of ast.propertySignatures) {
        propertySignatures.push(goMemo(ps.type, isDecoding));
        expectedKeys[ps.name] = null;
      }
      const indexSignatures = ast.indexSignatures.map((is3) => [goMemo(is3.parameter, isDecoding), goMemo(is3.type, isDecoding)]);
      const expectedAST = createUnion(ast.indexSignatures.map((is3) => is3.parameter).concat(ownKeys(expectedKeys).map((key2) => isSymbol(key2) ? createUniqueSymbol(key2) : createLiteral(key2))));
      const expected = goMemo(expectedAST, isDecoding);
      return (input, options3) => {
        if (!isRecord(input)) {
          return fail12(type2(ast, input));
        }
        const allErrors = options3?.errors === "all";
        const es = [];
        let stepKey = 0;
        const onExcessPropertyError = options3?.onExcessProperty === "error";
        if (onExcessPropertyError) {
          for (const key2 of ownKeys(input)) {
            const eu = eitherOrUndefined(expected(key2, options3));
            if (eu && isLeft2(eu)) {
              const e = key(key2, [unexpected(some2(expectedAST))]);
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return fail12(mutableAppend(sortByIndex(es), e));
              }
            }
          }
        }
        const output = {};
        let queue = void 0;
        for (let i = 0; i < propertySignatures.length; i++) {
          const ps = ast.propertySignatures[i];
          const parser = propertySignatures[i];
          const name = ps.name;
          if (Object.prototype.hasOwnProperty.call(input, name)) {
            const te = parser(input[name], options3);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = key(name, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return fail12(mutableAppend(sortByIndex(es), e));
                }
              }
              output[name] = eu.right;
            } else {
              const nk = stepKey++;
              const index2 = name;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap8(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = key(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit4;
                  } else {
                    return fail12(mutableAppend(sortByIndex(es2), e));
                  }
                }
                output2[index2] = t.right;
                return unit4;
              }));
            }
          } else {
            if (!ps.isOptional) {
              const e = key(name, [missing]);
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return fail12(e);
              }
            }
          }
        }
        for (let i = 0; i < indexSignatures.length; i++) {
          const indexSignature = indexSignatures[i];
          const parameter = indexSignature[0];
          const type3 = indexSignature[1];
          const keys5 = getKeysForIndexSignature(input, ast.indexSignatures[i].parameter);
          for (const key2 of keys5) {
            const keu = eitherOrUndefined(parameter(key2, options3));
            if (keu && isRight2(keu)) {
              const vpr = type3(input[key2], options3);
              const veu = eitherOrUndefined(vpr);
              if (veu) {
                if (isLeft2(veu)) {
                  const e = key(key2, veu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return fail12(mutableAppend(sortByIndex(es), e));
                  }
                } else {
                  if (!Object.prototype.hasOwnProperty.call(expectedKeys, key2)) {
                    output[key2] = veu.right;
                  }
                }
              } else {
                const nk = stepKey++;
                const index2 = key2;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es: es2,
                  output: output2
                }) => flatMap8(either3(vpr), (tv) => {
                  if (isLeft2(tv)) {
                    const e = key(index2, tv.left.errors);
                    if (allErrors) {
                      es2.push([nk, e]);
                      return unit4;
                    } else {
                      return fail12(mutableAppend(sortByIndex(es2), e));
                    }
                  } else {
                    if (!Object.prototype.hasOwnProperty.call(expectedKeys, key2)) {
                      output2[key2] = tv.right;
                    }
                    return unit4;
                  }
                }));
              }
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => isNonEmptyArray2(es2) ? fail12(sortByIndex(es2)) : succeed11(output2);
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend2(() => {
            const state = {
              es: Array.from(es),
              output: Object.assign({}, output)
            };
            return flatMap8(forEach8(cqueue, (f) => f(state), {
              concurrency: "unbounded",
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          es,
          output
        });
      };
    }
    case "Union": {
      const searchTree = getSearchTree(ast.types, isDecoding);
      const ownKeys2 = ownKeys(searchTree.keys);
      const len = ownKeys2.length;
      const map27 = /* @__PURE__ */ new Map();
      for (let i = 0; i < ast.types.length; i++) {
        map27.set(ast.types[i], goMemo(ast.types[i], isDecoding));
      }
      return (input, options3) => {
        const es = [];
        let stepKey = 0;
        let candidates = [];
        if (len > 0) {
          if (isRecord(input)) {
            for (let i = 0; i < len; i++) {
              const name = ownKeys2[i];
              const buckets = searchTree.keys[name].buckets;
              if (Object.prototype.hasOwnProperty.call(input, name)) {
                const literal2 = String(input[name]);
                if (Object.prototype.hasOwnProperty.call(buckets, literal2)) {
                  candidates = candidates.concat(buckets[literal2]);
                } else {
                  es.push([stepKey++, key(name, [type2(searchTree.keys[name].ast, input[name])])]);
                }
              } else {
                es.push([stepKey++, key(name, [missing])]);
              }
            }
          } else {
            es.push([stepKey++, type2(ast, input)]);
          }
        }
        if (searchTree.otherwise.length > 0) {
          candidates = candidates.concat(searchTree.otherwise);
        }
        let queue = void 0;
        for (let i = 0; i < candidates.length; i++) {
          const pr = map27.get(candidates[i])(input, options3);
          const eu = !queue || queue.length === 0 ? eitherOrUndefined(pr) : void 0;
          if (eu) {
            if (isRight2(eu)) {
              return succeed11(eu.right);
            } else {
              es.push([stepKey++, unionMember(eu.left.errors)]);
            }
          } else {
            const nk = stepKey++;
            if (!queue) {
              queue = [];
            }
            queue.push((state) => suspend2(() => {
              if ("finalResult" in state) {
                return unit4;
              } else {
                return flatMap8(either3(pr), (t) => {
                  if (isRight2(t)) {
                    state.finalResult = succeed11(t.right);
                  } else {
                    state.es.push([nk, unionMember(t.left.errors)]);
                  }
                  return unit4;
                });
              }
            }));
          }
        }
        const computeResult = (es2) => isNonEmptyArray2(es2) ? fail12(sortByIndex(es2)) : (
          // this should never happen
          fail12(type2(neverKeyword, input))
        );
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend2(() => {
            const state = {
              es: Array.from(es)
            };
            return flatMap8(forEach8(cqueue, (f) => f(state), {
              concurrency: 1,
              discard: true
            }), () => {
              if ("finalResult" in state) {
                return state.finalResult;
              }
              return computeResult(state.es);
            });
          });
        }
        return computeResult(es);
      };
    }
    case "Suspend": {
      const get13 = memoizeThunk(() => goMemo(ast.f(), isDecoding));
      return (a, options3) => get13()(a, options3);
    }
  }
};
var fromRefinement = (ast, refinement) => (u) => refinement(u) ? succeed11(u) : fail12(type2(ast, u));
var getLiterals = (ast, isDecoding) => {
  switch (ast._tag) {
    case "Declaration":
      return getLiterals(ast.type, isDecoding);
    case "TypeLiteral": {
      const out = [];
      for (let i = 0; i < ast.propertySignatures.length; i++) {
        const propertySignature = ast.propertySignatures[i];
        const type3 = isDecoding ? from(propertySignature.type) : to(propertySignature.type);
        if (isLiteral(type3) && !propertySignature.isOptional) {
          out.push([propertySignature.name, type3]);
        }
      }
      return out;
    }
    case "Refinement":
      return getLiterals(ast.from, isDecoding);
    case "Transform":
      return getLiterals(isDecoding ? ast.from : ast.to, isDecoding);
  }
  return [];
};
var getSearchTree = (members, isDecoding) => {
  const keys5 = {};
  const otherwise = [];
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const tags2 = getLiterals(member, isDecoding);
    if (tags2.length > 0) {
      for (let j = 0; j < tags2.length; j++) {
        const [key2, literal2] = tags2[j];
        const hash2 = String(literal2.literal);
        keys5[key2] = keys5[key2] || {
          buckets: {},
          ast: neverKeyword
        };
        const buckets = keys5[key2].buckets;
        if (Object.prototype.hasOwnProperty.call(buckets, hash2)) {
          if (j < tags2.length - 1) {
            continue;
          }
          buckets[hash2].push(member);
          keys5[key2].ast = createUnion([keys5[key2].ast, literal2]);
        } else {
          buckets[hash2] = [member];
          keys5[key2].ast = createUnion([keys5[key2].ast, literal2]);
          break;
        }
      }
    } else {
      otherwise.push(member);
    }
  }
  return {
    keys: keys5,
    otherwise
  };
};
var dropRightRefinement = (ast) => isRefinement(ast) ? dropRightRefinement(ast.from) : ast;
var handleForbidden = (conditional, options3) => {
  const eu = eitherOrUndefined(conditional);
  return eu ? eu : options3?.isEffectAllowed === true ? conditional : fail12(forbidden);
};
var mutableAppend = (self, a) => {
  self.push(a);
  return self;
};
var getTemplateLiteralRegex = (ast) => {
  let pattern = `^${ast.head}`;
  for (const span2 of ast.spans) {
    if (isStringKeyword(span2.type)) {
      pattern += ".*";
    } else if (isNumberKeyword(span2.type)) {
      pattern += "[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?";
    }
    pattern += span2.literal;
  }
  pattern += "$";
  return new RegExp(pattern);
};
function sortByIndex(es) {
  return es.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0).map(([_, a]) => a);
}
var getFinalPropertySignatureTransformation = (transformation, isDecoding) => {
  switch (transformation._tag) {
    case "FinalPropertySignatureTransformation":
      return isDecoding ? transformation.decode : transformation.encode;
  }
};
var getFinalTransformation = (transformation, isDecoding) => {
  switch (transformation._tag) {
    case "FinalTransformation":
      return isDecoding ? transformation.decode : transformation.encode;
    case "ComposeTransformation":
      return succeed11;
    case "TypeLiteralTransformation":
      return (input) => {
        let out = right2(input);
        for (const pst of transformation.propertySignatureTransformations) {
          const [from2, to3] = isDecoding ? [pst.from, pst.to] : [pst.to, pst.from];
          const transform3 = getFinalPropertySignatureTransformation(pst.propertySignatureTransformation, isDecoding);
          const f = (input2) => {
            const o = transform3(Object.prototype.hasOwnProperty.call(input2, from2) ? some2(input2[from2]) : none2());
            delete input2[from2];
            if (isSome2(o)) {
              input2[to3] = o.value;
            }
            return input2;
          };
          out = map18(out, f);
        }
        return out;
      };
  }
};

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/Arbitrary.js
var ArbitraryHookId2 = ArbitraryHookId;
var unsafe = (schema) => go3(schema.ast, {});
var depthSize = 1;
var record = (fc, key2, value5, options3) => {
  return (options3.isSuspend ? fc.oneof({
    depthSize
  }, fc.constant([]), fc.array(fc.tuple(key2, value5), {
    minLength: 1,
    maxLength: 2
  })) : fc.array(fc.tuple(key2, value5))).map((tuples) => {
    const out = {};
    for (const [k, v] of tuples) {
      out[k] = v;
    }
    return out;
  });
};
var getHook = /* @__PURE__ */ getAnnotation(ArbitraryHookId2);
var go3 = (ast, options3) => {
  switch (ast._tag) {
    case "Declaration": {
      const hook = getHook(ast);
      if (isSome2(hook)) {
        return hook.value(...ast.typeParameters.map((p2) => go3(p2, options3)));
      }
      throw new Error("cannot build an Arbitrary for a declaration without annotations");
    }
    case "Literal":
      return (fc) => fc.constant(ast.literal);
    case "UniqueSymbol":
      return (fc) => fc.constant(ast.symbol);
    case "UndefinedKeyword":
    case "VoidKeyword":
      return (fc) => fc.constant(void 0);
    case "NeverKeyword":
      return () => {
        throw new Error("cannot build an Arbitrary for `never`");
      };
    case "UnknownKeyword":
    case "AnyKeyword":
      return (fc) => fc.anything();
    case "StringKeyword":
      return (fc) => {
        if (options3.constraints) {
          switch (options3.constraints._tag) {
            case "StringConstraints":
              return fc.string(options3.constraints.constraints);
          }
        }
        return fc.string();
      };
    case "NumberKeyword":
      return (fc) => {
        if (options3.constraints) {
          switch (options3.constraints._tag) {
            case "NumberConstraints":
              return fc.float(options3.constraints.constraints);
            case "IntegerConstraints":
              return fc.integer(options3.constraints.constraints);
          }
        }
        return fc.float();
      };
    case "BooleanKeyword":
      return (fc) => fc.boolean();
    case "BigIntKeyword":
      return (fc) => {
        if (options3.constraints) {
          switch (options3.constraints._tag) {
            case "BigIntConstraints":
              return fc.bigInt(options3.constraints.constraints);
          }
        }
        return fc.bigInt();
      };
    case "SymbolKeyword":
      return (fc) => fc.string().map((s) => Symbol.for(s));
    case "ObjectKeyword":
      return (fc) => fc.oneof(fc.object(), fc.array(fc.anything()));
    case "TemplateLiteral": {
      return (fc) => {
        const string5 = fc.string({
          maxLength: 5
        });
        const number5 = fc.float({
          noDefaultInfinity: true
        }).filter((n) => !Number.isNaN(n));
        const components = [fc.constant(ast.head)];
        for (const span2 of ast.spans) {
          if (isStringKeyword(span2.type)) {
            components.push(string5);
          } else {
            components.push(number5);
          }
          components.push(fc.constant(span2.literal));
        }
        return fc.tuple(...components).map((spans2) => spans2.join(""));
      };
    }
    case "Tuple": {
      const elements = [];
      let hasOptionals = false;
      for (const element of ast.elements) {
        elements.push(go3(element.type, options3));
        if (element.isOptional) {
          hasOptionals = true;
        }
      }
      const rest = map(ast.rest, map2((e) => go3(e, options3)));
      return (fc) => {
        let output = fc.tuple(...elements.map((arb) => arb(fc)));
        if (hasOptionals) {
          const indexes = fc.tuple(...ast.elements.map((element) => element.isOptional ? fc.boolean() : fc.constant(true)));
          output = output.chain((tuple5) => indexes.map((booleans) => {
            for (const [i, b] of booleans.reverse().entries()) {
              if (!b) {
                tuple5.splice(booleans.length - i, 1);
              }
            }
            return tuple5;
          }));
        }
        if (isSome2(rest)) {
          const [head6, ...tail] = rest.value;
          const arb = head6(fc);
          const constraints = options3.constraints;
          output = output.chain((as7) => {
            let out = fc.array(arb);
            if (options3.isSuspend) {
              out = fc.oneof({
                depthSize
              }, fc.constant([]), fc.array(arb, {
                minLength: 1,
                maxLength: 2
              }));
            } else if (constraints && constraints._tag === "ArrayConstraints") {
              out = fc.array(arb, constraints.constraints);
            }
            return out.map((rest2) => [...as7, ...rest2]);
          });
          for (let j = 0; j < tail.length; j++) {
            output = output.chain((as7) => tail[j](fc).map((a) => [...as7, a]));
          }
        }
        return output;
      };
    }
    case "TypeLiteral": {
      const propertySignaturesTypes = ast.propertySignatures.map((f) => go3(f.type, options3));
      const indexSignatures = ast.indexSignatures.map((is3) => [go3(is3.parameter, options3), go3(is3.type, options3)]);
      return (fc) => {
        const arbs = {};
        const requiredKeys = [];
        for (let i = 0; i < propertySignaturesTypes.length; i++) {
          const ps = ast.propertySignatures[i];
          const name = ps.name;
          if (!ps.isOptional) {
            requiredKeys.push(name);
          }
          arbs[name] = propertySignaturesTypes[i](fc);
        }
        let output = fc.record(arbs, {
          requiredKeys
        });
        for (let i = 0; i < indexSignatures.length; i++) {
          const parameter = indexSignatures[i][0](fc);
          const type3 = indexSignatures[i][1](fc);
          output = output.chain((o) => {
            return record(fc, parameter, type3, options3).map((d) => ({
              ...d,
              ...o
            }));
          });
        }
        return output;
      };
    }
    case "Union": {
      const types = ast.types.map((t) => go3(t, options3));
      return (fc) => fc.oneof({
        depthSize
      }, ...types.map((arb) => arb(fc)));
    }
    case "Enums": {
      if (ast.enums.length === 0) {
        throw new Error("cannot build an Arbitrary for an empty enum");
      }
      return (fc) => fc.oneof(...ast.enums.map(([_, value5]) => fc.constant(value5)));
    }
    case "Refinement": {
      const constraints = combineConstraints(options3.constraints, getConstraints(ast));
      const from2 = go3(ast.from, constraints ? {
        ...options3,
        constraints
      } : options3);
      return pipe(getHook(ast), match({
        onNone: () => (fc) => from2(fc).filter((a) => isNone2(ast.filter(a, defaultParseOption, ast))),
        onSome: (handler) => handler(from2)
      }));
    }
    case "Suspend": {
      return pipe(getHook(ast), match({
        onNone: () => {
          const get13 = memoizeThunk(() => go3(ast.f(), {
            ...options3,
            isSuspend: true
          }));
          return (fc) => fc.constant(null).chain(() => get13()(fc));
        },
        onSome: (handler) => handler()
      }));
    }
    case "Transform":
      throw new Error("cannot build an Arbitrary for transformations");
  }
};
var numberConstraints = (constraints) => {
  if (isNumber(constraints.min)) {
    constraints.min = Math.fround(constraints.min);
  }
  if (isNumber(constraints.max)) {
    constraints.max = Math.fround(constraints.max);
  }
  return {
    _tag: "NumberConstraints",
    constraints
  };
};
var stringConstraints = (constraints) => {
  return {
    _tag: "StringConstraints",
    constraints
  };
};
var integerConstraints = (constraints) => {
  return {
    _tag: "IntegerConstraints",
    constraints
  };
};
var arrayConstraints = (constraints) => {
  return {
    _tag: "ArrayConstraints",
    constraints
  };
};
var bigintConstraints = (constraints) => {
  return {
    _tag: "BigIntConstraints",
    constraints
  };
};
var getConstraints = (ast) => {
  const TypeAnnotationId2 = ast.annotations[TypeAnnotationId];
  const jsonSchema = ast.annotations[JSONSchemaAnnotationId];
  switch (TypeAnnotationId2) {
    case GreaterThanTypeId:
    case GreaterThanOrEqualToTypeId:
      return numberConstraints({
        min: jsonSchema.exclusiveMinimum ?? jsonSchema.minimum
      });
    case LessThanTypeId:
    case LessThanOrEqualToTypeId:
      return numberConstraints({
        max: jsonSchema.exclusiveMaximum ?? jsonSchema.maximum
      });
    case IntTypeId:
      return integerConstraints({});
    case BetweenTypeId: {
      const min4 = jsonSchema.minimum;
      const max6 = jsonSchema.maximum;
      const constraints = {};
      if (isNumber(min4)) {
        constraints.min = min4;
      }
      if (isNumber(max6)) {
        constraints.max = max6;
      }
      return numberConstraints(constraints);
    }
    case GreaterThanBigintTypeId:
    case GreaterThanOrEqualToBigintTypeId: {
      const params = ast.annotations[TypeAnnotationId2];
      return bigintConstraints({
        min: params.min
      });
    }
    case LessThanBigintTypeId:
    case LessThanOrEqualToBigintTypeId: {
      const params = ast.annotations[TypeAnnotationId2];
      return bigintConstraints({
        max: params.max
      });
    }
    case BetweenBigintTypeId: {
      const params = ast.annotations[TypeAnnotationId2];
      const min4 = params.min;
      const max6 = params.max;
      const constraints = {};
      if (isBigInt(min4)) {
        constraints.min = min4;
      }
      if (isBigInt(max6)) {
        constraints.max = max6;
      }
      return bigintConstraints(constraints);
    }
    case MinLengthTypeId:
      return stringConstraints({
        minLength: jsonSchema.minLength
      });
    case MaxLengthTypeId:
      return stringConstraints({
        maxLength: jsonSchema.maxLength
      });
    case LengthTypeId:
      return stringConstraints({
        minLength: jsonSchema.minLength,
        maxLength: jsonSchema.maxLength
      });
    case MinItemsTypeId:
      return arrayConstraints({
        minLength: jsonSchema.minItems
      });
    case MaxItemsTypeId:
      return arrayConstraints({
        maxLength: jsonSchema.maxItems
      });
    case ItemsCountTypeId:
      return arrayConstraints({
        minLength: jsonSchema.minItems,
        maxLength: jsonSchema.maxItems
      });
  }
};
var combineConstraints = (c1, c2) => {
  if (c1 === void 0) {
    return c2;
  }
  if (c2 === void 0) {
    return c1;
  }
  switch (c1._tag) {
    case "ArrayConstraints": {
      switch (c2._tag) {
        case "ArrayConstraints": {
          const c = {
            ...c1.constraints,
            ...c2.constraints
          };
          const minLength2 = getMax(c1.constraints.minLength, c2.constraints.minLength);
          if (isNumber(minLength2)) {
            c.minLength = minLength2;
          }
          const maxLength = getMin(c1.constraints.maxLength, c2.constraints.maxLength);
          if (isNumber(maxLength)) {
            c.maxLength = maxLength;
          }
          return arrayConstraints(c);
        }
      }
      break;
    }
    case "NumberConstraints": {
      switch (c2._tag) {
        case "NumberConstraints": {
          const c = {
            ...c1.constraints,
            ...c2.constraints
          };
          const min4 = getMax(c1.constraints.min, c2.constraints.min);
          if (isNumber(min4)) {
            c.min = min4;
          }
          const max6 = getMin(c1.constraints.max, c2.constraints.max);
          if (isNumber(max6)) {
            c.max = max6;
          }
          return numberConstraints(c);
        }
        case "IntegerConstraints": {
          const c = {
            ...c2.constraints
          };
          const min4 = getMax(c1.constraints.min, c2.constraints.min);
          if (isNumber(min4)) {
            c.min = min4;
          }
          const max6 = getMin(c1.constraints.max, c2.constraints.max);
          if (isNumber(max6)) {
            c.max = max6;
          }
          return integerConstraints(c);
        }
      }
      break;
    }
    case "BigIntConstraints": {
      switch (c2._tag) {
        case "BigIntConstraints": {
          const c = {
            ...c1.constraints,
            ...c2.constraints
          };
          const min4 = getMax(c1.constraints.min, c2.constraints.min);
          if (isBigInt(min4)) {
            c.min = min4;
          }
          const max6 = getMin(c1.constraints.max, c2.constraints.max);
          if (isBigInt(max6)) {
            c.max = max6;
          }
          return bigintConstraints(c);
        }
      }
      break;
    }
    case "StringConstraints": {
      switch (c2._tag) {
        case "StringConstraints": {
          const c = {
            ...c1.constraints,
            ...c2.constraints
          };
          const minLength2 = getMax(c1.constraints.minLength, c2.constraints.minLength);
          if (isNumber(minLength2)) {
            c.minLength = minLength2;
          }
          const maxLength = getMin(c1.constraints.maxLength, c2.constraints.maxLength);
          if (isNumber(maxLength)) {
            c.maxLength = maxLength;
          }
          return stringConstraints(c);
        }
      }
      break;
    }
    case "IntegerConstraints": {
      switch (c2._tag) {
        case "NumberConstraints":
        case "IntegerConstraints": {
          const c = {
            ...c1.constraints
          };
          const min4 = getMax(c1.constraints.min, c2.constraints.min);
          if (isNumber(min4)) {
            c.min = min4;
          }
          const max6 = getMin(c1.constraints.max, c2.constraints.max);
          if (isNumber(max6)) {
            c.max = max6;
          }
          return integerConstraints(c);
        }
      }
      break;
    }
  }
};
function getMax(n1, n2) {
  return n1 === void 0 ? n2 : n2 === void 0 ? n1 : n1 <= n2 ? n2 : n1;
}
function getMin(n1, n2) {
  return n1 === void 0 ? n2 : n2 === void 0 ? n1 : n1 <= n2 ? n1 : n2;
}

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/internal/schema.js
var TypeId15 = /* @__PURE__ */ Symbol.for("@effect/schema/Schema");
var variance5 = {
  From: (_) => _,
  To: (_) => _
};
var SchemaImpl = class {
  ast;
  [TypeId15] = variance5;
  constructor(ast) {
    this.ast = ast;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};

// ../../.yarn/__virtual__/@effect-schema-virtual-1564220173/0/cache/@effect-schema-npm-0.56.1-0075bae3cf-69e53ff985.zip/node_modules/@effect/schema/dist/esm/Schema.js
var TypeId16 = TypeId15;
var to2 = (schema) => make48(to(schema.ast));
var isSchema = (u) => isObject(u) && TypeId16 in u && "ast" in u;
var variance6 = {
  From: (_) => _,
  To: (_) => _
};
var SchemaImpl2 = class {
  ast;
  [TypeId16] = variance6;
  constructor(ast) {
    this.ast = ast;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make48 = (ast) => new SchemaImpl2(ast);
var makeLiteral = (value5) => make48(createLiteral(value5));
var literal = (...literals) => union8(...literals.map((literal2) => makeLiteral(literal2)));
var declare = (typeParameters, type3, decode3, annotations2) => make48(createDeclaration(typeParameters.map((tp) => tp.ast), type3.ast, (isDecoding, ...typeParameters2) => decode3(isDecoding, ...typeParameters2.map(make48)), annotations2));
var _undefined = /* @__PURE__ */ make48(undefinedKeyword);
var _null2 = /* @__PURE__ */ make48(_null);
var any2 = /* @__PURE__ */ make48(anyKeyword);
var string2 = /* @__PURE__ */ make48(stringKeyword);
var number4 = /* @__PURE__ */ make48(numberKeyword);
var bigintFromSelf = /* @__PURE__ */ make48(bigIntKeyword);
var union8 = (...members) => make48(createUnion(members.map((m) => m.ast)));
var nullable = (self) => union8(_null2, self);
var orUndefined = (self) => union8(_undefined, self);
var nullish = (self) => union8(_null2, _undefined, self);
var tuple2 = (...elements) => make48(createTuple(elements.map((schema) => createElement(schema.ast, false)), none2(), true));
var array3 = (item) => make48(createTuple([], some2([item.ast]), true));
var PropertySignatureImpl = class {
  propertySignatureAST;
  [TypeId16] = variance6;
  FromIsOptional;
  ToIsOptional;
  constructor(propertySignatureAST) {
    this.propertySignatureAST = propertySignatureAST;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var optionalToRequired = (from2, to3, decode3, encode2, options3) => new PropertySignatureImpl({
  _tag: "OptionalToRequired",
  from: from2.ast,
  to: to3.ast,
  decode: (o) => some2(decode3(o)),
  encode: flatMap(encode2),
  annotations: toAnnotations(options3)
});
var optional = (schema, options3) => {
  const isExact = options3?.exact;
  const value5 = options3?.default;
  const isNullable2 = options3?.nullable;
  const asOption = options3?.as == "Option";
  if (isExact) {
    if (value5) {
      if (isNullable2) {
        return optionalToRequired(nullable(schema), to2(schema), match({
          onNone: value5,
          onSome: (a) => a === null ? value5() : a
        }), some2);
      } else {
        return optionalToRequired(schema, to2(schema), match({
          onNone: value5,
          onSome: identity
        }), some2);
      }
    } else {
      if (asOption) {
        if (isNullable2) {
          return optionalToRequired(nullable(schema), optionFromSelf(to2(schema)), filter(isNotNull), identity);
        } else {
          return optionalToRequired(schema, optionFromSelf(to2(schema)), identity, identity);
        }
      }
      return new PropertySignatureImpl({
        _tag: "Declaration",
        from: schema.ast,
        isOptional: true
      });
    }
  } else {
    if (value5) {
      if (isNullable2) {
        return optionalToRequired(nullish(schema), to2(schema), match({
          onNone: value5,
          onSome: (a) => a == null ? value5() : a
        }), some2);
      } else {
        return optionalToRequired(orUndefined(schema), to2(schema), match({
          onNone: value5,
          onSome: (a) => a === void 0 ? value5() : a
        }), some2);
      }
    } else {
      if (asOption) {
        if (isNullable2) {
          return optionalToRequired(nullish(schema), optionFromSelf(to2(schema)), filter((a) => a != null), identity);
        } else {
          return optionalToRequired(orUndefined(schema), optionFromSelf(to2(schema)), filter(isNotUndefined), identity);
        }
      }
      return new PropertySignatureImpl({
        _tag: "Declaration",
        from: orUndefined(schema).ast,
        isOptional: true
      });
    }
  }
};
var struct3 = (fields) => {
  const ownKeys2 = ownKeys(fields);
  const pss = [];
  const pssFrom = [];
  const pssTo = [];
  const psTransformations = [];
  for (let i = 0; i < ownKeys2.length; i++) {
    const key2 = ownKeys2[i];
    const field = fields[key2];
    if ("propertySignatureAST" in field) {
      const psAst = field.propertySignatureAST;
      const from2 = psAst.from;
      const annotations2 = psAst.annotations;
      switch (psAst._tag) {
        case "Declaration":
          pss.push(createPropertySignature(key2, from2, psAst.isOptional, true, annotations2));
          pssFrom.push(createPropertySignature(key2, from2, psAst.isOptional, true));
          pssTo.push(createPropertySignature(key2, to(from2), psAst.isOptional, true, annotations2));
          break;
        case "OptionalToRequired":
          pssFrom.push(createPropertySignature(key2, from2, true, true));
          pssTo.push(createPropertySignature(key2, psAst.to, false, true, annotations2));
          psTransformations.push(createPropertySignatureTransform(key2, key2, createFinalPropertySignatureTransformation(psAst.decode, psAst.encode)));
          break;
      }
    } else {
      pss.push(createPropertySignature(key2, field.ast, false, true));
      pssFrom.push(createPropertySignature(key2, field.ast, false, true));
      pssTo.push(createPropertySignature(key2, to(field.ast), false, true));
    }
  }
  if (isNonEmptyReadonlyArray(psTransformations)) {
    return make48(createTransform(createTypeLiteral(pssFrom, []), createTypeLiteral(pssTo, []), createTypeLiteralTransformation(psTransformations)));
  }
  return make48(createTypeLiteral(pss, []));
};
var intersectUnionMembers = (xs, ys) => {
  return createUnion(xs.flatMap((x) => {
    return ys.map((y) => {
      if (isTypeLiteral(x)) {
        if (isTypeLiteral(y)) {
          return createTypeLiteral(x.propertySignatures.concat(y.propertySignatures), x.indexSignatures.concat(y.indexSignatures));
        } else if (isTransform(y) && isTypeLiteralTransformation(y.transformation) && isTypeLiteral(y.from) && isTypeLiteral(y.to)) {
          const from2 = createTypeLiteral(x.propertySignatures.concat(y.from.propertySignatures), x.indexSignatures.concat(y.from.indexSignatures));
          const to3 = createTypeLiteral(getToPropertySignatures(x.propertySignatures).concat(y.to.propertySignatures), getToIndexSignatures(x.indexSignatures).concat(y.to.indexSignatures));
          return createTransform(from2, to3, createTypeLiteralTransformation(y.transformation.propertySignatureTransformations));
        }
      } else if (isTransform(x) && isTypeLiteralTransformation(x.transformation) && isTypeLiteral(x.from) && isTypeLiteral(x.to)) {
        if (isTypeLiteral(y)) {
          const from2 = createTypeLiteral(x.from.propertySignatures.concat(y.propertySignatures), x.from.indexSignatures.concat(y.indexSignatures));
          const to3 = createTypeLiteral(x.to.propertySignatures.concat(getToPropertySignatures(y.propertySignatures)), x.to.indexSignatures.concat(getToIndexSignatures(y.indexSignatures)));
          return createTransform(from2, to3, createTypeLiteralTransformation(x.transformation.propertySignatureTransformations));
        } else if (isTransform(y) && isTypeLiteralTransformation(y.transformation) && isTypeLiteral(y.from) && isTypeLiteral(y.to)) {
          const from2 = createTypeLiteral(x.from.propertySignatures.concat(y.from.propertySignatures), x.from.indexSignatures.concat(y.from.indexSignatures));
          const to3 = createTypeLiteral(x.to.propertySignatures.concat(y.to.propertySignatures), x.to.indexSignatures.concat(y.to.indexSignatures));
          return createTransform(from2, to3, createTypeLiteralTransformation(x.transformation.propertySignatureTransformations.concat(y.transformation.propertySignatureTransformations)));
        }
      }
      throw new Error("`extend` can only handle type literals or unions of type literals");
    });
  }));
};
var extend3 = /* @__PURE__ */ dual(2, (self, that) => make48(intersectUnionMembers(isUnion(self.ast) ? self.ast.types : [self.ast], isUnion(that.ast) ? that.ast.types : [that.ast])));
var compose2 = /* @__PURE__ */ dual(2, (ab, cd) => make48(compose(ab.ast, cd.ast)));
var suspend7 = (f, annotations2) => make48(createSuspend(() => f().ast, annotations2));
function filter10(predicate, options3) {
  return (self) => make48(createRefinement(self.ast, (a, options4, ast) => {
    const out = predicate(a, options4, ast);
    if (isBoolean(out)) {
      return out ? none2() : some2(parseError([type2(ast, a)]));
    }
    return out;
  }, toAnnotations(options3)));
}
var transformOrFail = /* @__PURE__ */ dual((args) => isSchema(args[0]) && isSchema(args[1]), (from2, to3, decode3, encode2) => make48(createTransform(from2.ast, to3.ast, createFinalTransformation(decode3, encode2))));
var transform2 = /* @__PURE__ */ dual((args) => isSchema(args[0]) && isSchema(args[1]), (from2, to3, decode3, encode2) => transformOrFail(from2, to3, (a, options3, ast) => right2(decode3(a, options3, ast)), (b, options3, ast) => right2(encode2(b, options3, ast))));
var toAnnotations = (options3) => {
  if (!options3) {
    return {};
  }
  const out = {};
  const custom2 = Object.getOwnPropertySymbols(options3);
  for (const sym of custom2) {
    out[sym] = options3[sym];
  }
  if (options3.typeId !== void 0) {
    const typeId = options3.typeId;
    if (typeof typeId === "object") {
      out[TypeAnnotationId] = typeId.id;
      out[typeId.id] = typeId.params;
    } else {
      out[TypeAnnotationId] = typeId;
    }
  }
  const move = (from2, to3) => {
    if (options3[from2] !== void 0) {
      out[to3] = options3[from2];
    }
  };
  move("message", MessageAnnotationId);
  move("identifier", IdentifierAnnotationId);
  move("title", TitleAnnotationId);
  move("description", DescriptionAnnotationId);
  move("examples", ExamplesAnnotationId);
  move("default", DefaultAnnotationId);
  move("documentation", DocumentationAnnotationId);
  move("jsonSchema", JSONSchemaAnnotationId);
  move("arbitrary", ArbitraryHookId);
  move("pretty", PrettyHookId);
  move("equivalence", EquivalenceHookId);
  return out;
};
var annotations = (annotations2) => (self) => make48(mergeAnnotations(self.ast, annotations2));
var MinLengthTypeId2 = MinLengthTypeId;
var minLength = (minLength2, options3) => (self) => self.pipe(filter10((a) => a.length >= minLength2, {
  typeId: MinLengthTypeId2,
  description: `a string at least ${minLength2} character(s) long`,
  jsonSchema: {
    minLength: minLength2
  },
  ...options3
}));
var nonEmpty = (options3) => minLength(1, {
  description: "a non empty string",
  ...options3
});
var FiniteTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/Finite");
var finite = (options3) => (self) => self.pipe(filter10((a) => Number.isFinite(a), {
  typeId: FiniteTypeId,
  description: "a finite number",
  ...options3
}));
var GreaterThanOrEqualToTypeId2 = GreaterThanOrEqualToTypeId;
var greaterThanOrEqualTo4 = (min4, options3) => (self) => self.pipe(filter10((a) => a >= min4, {
  typeId: GreaterThanOrEqualToTypeId2,
  description: min4 === 0 ? "a non-negative number" : `a number greater than or equal to ${min4}`,
  jsonSchema: {
    minimum: min4
  },
  ...options3
}));
var IntTypeId2 = IntTypeId;
var int = (options3) => (self) => self.pipe(filter10((a) => Number.isSafeInteger(a), {
  typeId: IntTypeId2,
  title: "integer",
  description: "an integer",
  jsonSchema: {
    type: "integer"
  },
  ...options3
}));
var nonNegative = (options3) => greaterThanOrEqualTo4(0, options3);
var NumberFromString = /* @__PURE__ */ transformOrFail(string2, number4, (s, _, ast) => {
  if (s === "NaN") {
    return succeed11(NaN);
  }
  if (s === "Infinity") {
    return succeed11(Infinity);
  }
  if (s === "-Infinity") {
    return succeed11(-Infinity);
  }
  if (s.trim() === "") {
    return fail12(type2(ast, s));
  }
  const n = Number(s);
  return Number.isNaN(n) ? fail12(type2(ast, s)) : succeed11(n);
}, (n) => succeed11(String(n)));
var Int = /* @__PURE__ */ number4.pipe(/* @__PURE__ */ int());
var NonNegative = /* @__PURE__ */ number4.pipe(/* @__PURE__ */ nonNegative());
var SecretFromSelf = /* @__PURE__ */ declare([], string2, () => (u, _, ast) => isSecret2(u) ? succeed11(u) : fail12(type2(ast, u)), {
  [IdentifierAnnotationId]: "Secret",
  [PrettyHookId]: () => (secret4) => String(secret4),
  [ArbitraryHookId]: () => (fc) => fc.string().map((_) => fromString2(_))
});
var DurationFromSelf = /* @__PURE__ */ declare([], /* @__PURE__ */ struct3({
  value: /* @__PURE__ */ union8(/* @__PURE__ */ struct3({
    _tag: /* @__PURE__ */ literal("Millis"),
    millis: number4
  }), /* @__PURE__ */ struct3({
    _tag: /* @__PURE__ */ literal("Nanos"),
    nanos: bigintFromSelf
  }), /* @__PURE__ */ struct3({
    _tag: /* @__PURE__ */ literal("Infinity")
  }))
}), () => (u, _, ast) => isDuration(u) ? succeed11(u) : fail12(type2(ast, u)), {
  [IdentifierAnnotationId]: "Duration",
  [PrettyHookId]: () => (duration) => String(duration),
  [ArbitraryHookId]: () => (fc) => fc.oneof(fc.constant(infinity), fc.bigUint().map((_) => nanos(_)), fc.bigUint().map((_) => micros(_)), fc.maxSafeNat().map((_) => millis(_)), fc.maxSafeNat().map((_) => seconds(_)), fc.maxSafeNat().map((_) => minutes(_)), fc.maxSafeNat().map((_) => hours(_)), fc.maxSafeNat().map((_) => days(_)), fc.maxSafeNat().map((_) => weeks(_))),
  [EquivalenceHookId]: () => Equivalence2
});
var hrTime = /* @__PURE__ */ tuple2(NonNegative.pipe(annotations({
  [TitleAnnotationId]: "seconds",
  [DescriptionAnnotationId]: "seconds"
}), finite()), NonNegative.pipe(annotations({
  [TitleAnnotationId]: "nanos",
  [DescriptionAnnotationId]: "nanos"
}), finite())).pipe(/* @__PURE__ */ annotations({
  [TitleAnnotationId]: "a high resolution time tuple",
  [DescriptionAnnotationId]: "a high resolution time tuple"
}));
var Uint8ArrayFromSelf = /* @__PURE__ */ declare([], /* @__PURE__ */ array3(number4), () => (u, _, ast) => isUint8Array(u) ? succeed11(u) : fail12(type2(ast, u)), {
  [IdentifierAnnotationId]: "Uint8Array",
  [PrettyHookId]: () => (u8arr) => `new Uint8Array(${JSON.stringify(Array.from(u8arr))})`,
  [ArbitraryHookId]: () => (fc) => fc.uint8Array(),
  [EquivalenceHookId]: () => getEquivalence2(strict())
});
var ValidDateTypeId = /* @__PURE__ */ Symbol.for("@effect/schema/TypeId/ValidDate");
var validDate = (options3) => (self) => self.pipe(filter10((a) => !Number.isNaN(a.getTime()), {
  typeId: ValidDateTypeId,
  description: "a valid Date",
  ...options3
}));
var dateArbitrary = () => (fc) => fc.date({
  noInvalidDate: false
});
var datePretty = () => (date5) => `new Date(${JSON.stringify(date5)})`;
var DateFromSelf = /* @__PURE__ */ declare([], /* @__PURE__ */ struct3({
  valueOf: number4
}), () => (u, _, ast) => isDate(u) ? succeed11(u) : fail12(type2(ast, u)), {
  [IdentifierAnnotationId]: "Date",
  [PrettyHookId]: datePretty,
  [ArbitraryHookId]: dateArbitrary,
  [EquivalenceHookId]: () => Date2
});
var DateFromString = /* @__PURE__ */ transform2(string2, DateFromSelf, (s) => new Date(s), (n) => n.toISOString());
var _Date = /* @__PURE__ */ DateFromString.pipe(/* @__PURE__ */ validDate());
var optionFrom = (value5) => union8(struct3({
  _tag: literal("None")
}), struct3({
  _tag: literal("Some"),
  value: value5
}));
var optionDecode = (input) => input._tag === "None" ? none2() : some2(input.value);
var optionArbitrary = (value5) => {
  const arb = unsafe(optionFrom(schemaFromArbitrary(value5)));
  return (fc) => arb(fc).map(optionDecode);
};
var optionPretty = (value5) => match({
  onNone: () => "none()",
  onSome: (a) => `some(${value5(a)})`
});
var optionFromSelf = (value5) => {
  return declare([value5], optionFrom(value5), (isDecoding, value6) => {
    const parse4 = isDecoding ? parse(value6) : encode(value6);
    return (u, options3, ast) => isOption2(u) ? isNone2(u) ? succeed11(none2()) : map18(parse4(u.value, options3), some2) : fail12(type2(ast, u));
  }, {
    [IdentifierAnnotationId]: "Option",
    [PrettyHookId]: optionPretty,
    [ArbitraryHookId]: optionArbitrary,
    [EquivalenceHookId]: getEquivalence
  });
};
var bigDecimalPretty = () => (val) => `BigDecimal(${format2(normalize(val))})`;
var bigDecimalArbitrary = () => (fc) => fc.tuple(fc.bigInt(), fc.integer()).map(([value5, scale2]) => make3(value5, scale2));
var BigDecimalFromSelf = /* @__PURE__ */ declare([], /* @__PURE__ */ struct3({
  value: bigintFromSelf,
  scale: number4
}), () => (u, _, ast) => isBigDecimal(u) ? succeed11(u) : fail12(type2(ast, u)), {
  [IdentifierAnnotationId]: "BigDecimal",
  [PrettyHookId]: bigDecimalPretty,
  [ArbitraryHookId]: bigDecimalArbitrary,
  [EquivalenceHookId]: () => Equivalence
});
var FiberIdFrom = /* @__PURE__ */ union8(/* @__PURE__ */ struct3({
  _tag: /* @__PURE__ */ literal("Composite"),
  left: /* @__PURE__ */ suspend7(() => FiberIdFrom),
  right: /* @__PURE__ */ suspend7(() => FiberIdFrom)
}), /* @__PURE__ */ struct3({
  _tag: /* @__PURE__ */ literal("None")
}), /* @__PURE__ */ struct3({
  _tag: /* @__PURE__ */ literal("Runtime"),
  id: /* @__PURE__ */ Int.pipe(/* @__PURE__ */ nonNegative({
    title: "id",
    description: "id"
  })),
  startTimeMillis: /* @__PURE__ */ Int.pipe(/* @__PURE__ */ nonNegative({
    title: "startTimeMillis",
    description: "startTimeMillis"
  }))
}));
var fiberIdFromArbitrary = /* @__PURE__ */ unsafe(FiberIdFrom);
var fiberIdArbitrary = (fc) => fiberIdFromArbitrary(fc).map(fiberIdDecode);
var fiberIdPretty = (fiberId3) => {
  switch (fiberId3._tag) {
    case "None":
      return "FiberId.none";
    case "Runtime":
      return `FiberId.runtime(${fiberId3.id}, ${fiberId3.startTimeMillis})`;
    case "Composite":
      return `FiberId.composite(${fiberIdPretty(fiberId3.right)}, ${fiberIdPretty(fiberId3.left)})`;
  }
};
var FiberIdFromSelf = /* @__PURE__ */ declare([], FiberIdFrom, () => (input, _, ast) => isFiberId2(input) ? succeed11(input) : fail12(type2(ast, input)), {
  [IdentifierAnnotationId]: "FiberId",
  [PrettyHookId]: () => fiberIdPretty,
  [ArbitraryHookId]: () => fiberIdArbitrary,
  [EquivalenceHookId]: () => equals
});
var fiberIdDecode = (input) => {
  switch (input._tag) {
    case "Composite":
      return composite2(fiberIdDecode(input.left), fiberIdDecode(input.right));
    case "None":
      return none4;
    case "Runtime":
      return runtime2(input.id, input.startTimeMillis);
  }
};
var schemaFromArbitrary = (value5) => suspend7(() => any2).pipe(annotations({
  [ArbitraryHookId]: () => value5
}));

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/internal/terminal.js
var tag3 = /* @__PURE__ */ Tag("@effect/platform/Terminal");

// ../../.yarn/__virtual__/@effect-platform-virtual-2781b45a0b/0/cache/@effect-platform-npm-0.39.0-aa8dd425b4-e2e4e17828.zip/node_modules/@effect/platform/dist/esm/Terminal.js
var QuitException = class extends TaggedError("QuitException") {
};
var Terminal = tag3;

// ../../.yarn/__virtual__/@effect-typeclass-virtual-2cde3db774/0/cache/@effect-typeclass-npm-0.21.0-44c823cb88-485d341806.zip/node_modules/@effect/typeclass/dist/esm/internal/Iterable.js
function reduce12(b, f) {
  return function(iterable) {
    if (Array.isArray(iterable)) {
      return iterable.reduce(f, b);
    }
    let result = b;
    for (const n of iterable) {
      result = f(result, n);
    }
    return result;
  };
}
function map19(f) {
  return function(iterable) {
    if (Array.isArray(iterable)) {
      return iterable.map(f);
    }
    return function* () {
      for (const n of iterable) {
        yield f(n);
      }
    }();
  };
}

// ../../.yarn/__virtual__/@effect-typeclass-virtual-2cde3db774/0/cache/@effect-typeclass-npm-0.21.0-44c823cb88-485d341806.zip/node_modules/@effect/typeclass/dist/esm/Product.js
var struct4 = (F) => (fields) => {
  const keys5 = Object.keys(fields);
  return F.imap(F.productAll(keys5.map((k) => fields[k])), (values3) => {
    const out = {};
    for (let i = 0; i < values3.length; i++) {
      out[keys5[i]] = values3[i];
    }
    return out;
  }, (r) => keys5.map((k) => r[k]));
};

// ../../.yarn/__virtual__/@effect-typeclass-virtual-2cde3db774/0/cache/@effect-typeclass-npm-0.21.0-44c823cb88-485d341806.zip/node_modules/@effect/typeclass/dist/esm/Semigroup.js
var make49 = (combine12, combineMany = (self, collection) => reduce12(self, combine12)(collection)) => ({
  combine: combine12,
  combineMany
});
var constant2 = (a) => make49(() => a, () => a);
var first2 = () => make49((a) => a, (a) => a);
var imap = /* @__PURE__ */ dual(3, (S, to3, from2) => make49((self, that) => to3(S.combine(from2(self), from2(that))), (self, collection) => to3(S.combineMany(from2(self), map19(from2)(collection)))));
var product = (self, that) => make49(([xa, xb], [ya, yb]) => [self.combine(xa, ya), that.combine(xb, yb)]);
var productAll = (collection) => {
  return make49((x, y) => {
    const len = Math.min(x.length, y.length);
    const out = [];
    let collectionLength = 0;
    for (const s of collection) {
      if (collectionLength >= len) {
        break;
      }
      out.push(s.combine(x[collectionLength], y[collectionLength]));
      collectionLength++;
    }
    return out;
  });
};
var productMany = (self, collection) => {
  const semigroup = productAll(collection);
  return make49((x, y) => [self.combine(x[0], y[0]), ...semigroup.combine(x.slice(1), y.slice(1))]);
};
var of5 = constant2;
var Product = {
  of: of5,
  imap,
  product,
  productMany,
  productAll
};
var array4 = () => make49((self, that) => self.concat(that));
var struct5 = /* @__PURE__ */ struct4(Product);

// ../../.yarn/__virtual__/@effect-typeclass-virtual-2cde3db774/0/cache/@effect-typeclass-npm-0.21.0-44c823cb88-485d341806.zip/node_modules/@effect/typeclass/dist/esm/Monoid.js
var fromSemigroup = (S, empty38) => ({
  combine: S.combine,
  combineMany: S.combineMany,
  empty: empty38,
  combineAll: (collection) => S.combineMany(empty38, collection)
});
var array5 = () => fromSemigroup(array4(), []);
var struct6 = (fields) => {
  const empty38 = {};
  for (const k in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, k)) {
      empty38[k] = fields[k].empty;
    }
  }
  return fromSemigroup(struct5(fields), empty38);
};

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/internal/color.js
var black = {
  _tag: "Black"
};
var red = {
  _tag: "Red"
};
var green = {
  _tag: "Green"
};
var cyan = {
  _tag: "Cyan"
};
var white = {
  _tag: "White"
};
var toCode = (color3) => {
  switch (color3._tag) {
    case "Black": {
      return 0;
    }
    case "Red": {
      return 1;
    }
    case "Green": {
      return 2;
    }
    case "Yellow": {
      return 3;
    }
    case "Blue": {
      return 4;
    }
    case "Magenta": {
      return 5;
    }
    case "Cyan": {
      return 6;
    }
    case "White": {
      return 7;
    }
  }
};

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/internal/sgr.js
var reset = {
  _tag: "Reset"
};
var setBold = (bold3) => ({
  _tag: "SetBold",
  bold: bold3
});
var setColor = (color3, vivid, layer3) => ({
  _tag: "SetColor",
  color: color3,
  vivid,
  layer: layer3
});
var setItalicized = (italicized3) => ({
  _tag: "SetItalicized",
  italicized: italicized3
});
var setStrikethrough = (strikethrough3) => ({
  _tag: "SetStrikethrough",
  strikethrough: strikethrough3
});
var setUnderlined = (underlined3) => ({
  _tag: "SetUnderlined",
  underlined: underlined3
});
var toCode2 = (self) => {
  switch (self._tag) {
    case "Reset": {
      return 0;
    }
    case "SetBold": {
      return self.bold ? 1 : 22;
    }
    case "SetColor": {
      switch (self.layer) {
        case "foreground": {
          return self.vivid ? 90 + toCode(self.color) : 30 + toCode(self.color);
        }
        case "background": {
          return self.vivid ? 100 + toCode(self.color) : 40 + toCode(self.color);
        }
      }
    }
    case "SetItalicized": {
      return self.italicized ? 3 : 23;
    }
    case "SetStrikethrough": {
      return self.strikethrough ? 9 : 29;
    }
    case "SetUnderlined": {
      return self.underlined ? 4 : 24;
    }
  }
};
var toEscapeSequence = (sgrs) => csi("m", sgrs);
var csi = (controlFunction, sgrs) => {
  const params = Array.from(sgrs).map((sgr) => `${toCode2(sgr)}`).join(";");
  return `\x1B[${params}${controlFunction}`;
};

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/internal/ansi.js
var AnsiSymbolKey = "@effect/printer-ansi/Ansi";
var AnsiTypeId = /* @__PURE__ */ Symbol.for(AnsiSymbolKey);
var make50 = (params) => ({
  ...AnsiMonoid.empty,
  ...params
});
var typeIdSemigroup = /* @__PURE__ */ first2();
var getFirstSomeSemigroup = /* @__PURE__ */ make49((self, that) => isSome2(self) ? self : that);
var AnsiSemigroup = /* @__PURE__ */ struct5({
  [AnsiTypeId]: typeIdSemigroup,
  commands: /* @__PURE__ */ array4(),
  foreground: getFirstSomeSemigroup,
  background: getFirstSomeSemigroup,
  bold: getFirstSomeSemigroup,
  italicized: getFirstSomeSemigroup,
  strikethrough: getFirstSomeSemigroup,
  underlined: getFirstSomeSemigroup
});
var typeIdMonoid = /* @__PURE__ */ fromSemigroup(typeIdSemigroup, AnsiTypeId);
var monoidOrElse = /* @__PURE__ */ fromSemigroup(getFirstSomeSemigroup, /* @__PURE__ */ none2());
var AnsiMonoid = /* @__PURE__ */ struct6({
  [AnsiTypeId]: typeIdMonoid,
  commands: /* @__PURE__ */ array5(),
  foreground: monoidOrElse,
  background: monoidOrElse,
  bold: monoidOrElse,
  italicized: monoidOrElse,
  strikethrough: monoidOrElse,
  underlined: monoidOrElse
});
var none10 = AnsiMonoid.empty;
var ESC = "\x1B[";
var BEL = "\x07";
var SEP = ";";
var bold = /* @__PURE__ */ make50({
  bold: /* @__PURE__ */ some2(/* @__PURE__ */ setBold(true))
});
var italicized = /* @__PURE__ */ make50({
  italicized: /* @__PURE__ */ some2(/* @__PURE__ */ setItalicized(true))
});
var strikethrough = /* @__PURE__ */ make50({
  strikethrough: /* @__PURE__ */ some2(/* @__PURE__ */ setStrikethrough(true))
});
var underlined = /* @__PURE__ */ make50({
  underlined: /* @__PURE__ */ some2(/* @__PURE__ */ setUnderlined(true))
});
var brightColor = (color3) => make50({
  foreground: some2(setColor(color3, true, "foreground"))
});
var color = (color3) => make50({
  foreground: some2(setColor(color3, false, "foreground"))
});
var black2 = /* @__PURE__ */ color(black);
var red2 = /* @__PURE__ */ color(red);
var green2 = /* @__PURE__ */ color(green);
var white2 = /* @__PURE__ */ color(white);
var blackBright = /* @__PURE__ */ brightColor(black);
var cyanBright = /* @__PURE__ */ brightColor(cyan);
var beep = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(BEL)
});
var cursorTo = (column3, row) => {
  if (row === void 0) {
    const command2 = `${ESC}${Math.max(column3 + 1, 0)}G`;
    return make50({
      commands: of(command2)
    });
  }
  const command = `${ESC}${row + 1}${SEP}${Math.max(column3 + 1, 0)}H`;
  return make50({
    commands: of(command)
  });
};
var cursorMove = (column3, row = 0) => {
  let command = "";
  if (row < 0) {
    command += `${ESC}${-row}A`;
  }
  if (row > 0) {
    command += `${ESC}${row}B`;
  }
  if (column3 > 0) {
    command += `${ESC}${column3}C`;
  }
  if (column3 < 0) {
    command += `${ESC}${-column3}D`;
  }
  return make50({
    commands: of(command)
  });
};
var cursorDown = (lines2 = 1) => {
  const command = `${ESC}${lines2}B`;
  return make50({
    commands: of(command)
  });
};
var cursorLeft = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}G`)
});
var cursorSavePosition = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}s`)
});
var cursorRestorePosition = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}u`)
});
var cursorHide = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}?25l`)
});
var cursorShow = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}?25h`)
});
var eraseLines = (rows) => {
  let command = "";
  for (let i = 0; i < rows; i++) {
    command += `${ESC}2K` + (i < rows - 1 ? `${ESC}1A` : "");
  }
  if (rows > 0) {
    command += `${ESC}G`;
  }
  return make50({
    commands: of(command)
  });
};
var eraseEndLine = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}K`)
});
var eraseStartLine = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}1K`)
});
var eraseLine = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}2K`)
});
var eraseDown = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}J`)
});
var eraseUp = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}1J`)
});
var eraseScreen = /* @__PURE__ */ make50({
  commands: /* @__PURE__ */ of(`${ESC}2J`)
});
var stringify = (self) => stringifyInternal(self);
var combine10 = /* @__PURE__ */ dual(2, (self, that) => combineInternal(self, that));
var combineInternal = (self, that) => AnsiSemigroup.combine(self, that);
var stringifyInternal = (self) => {
  const displaySequence = toEscapeSequence(getSomes([some2(reset), self.foreground, self.background, self.bold, self.italicized, self.strikethrough, self.underlined]));
  const commandSequence = join(self.commands, "");
  return `${displaySequence}${commandSequence}`;
};

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/Ansi.js
var bold2 = bold;
var italicized2 = italicized;
var strikethrough2 = strikethrough;
var underlined2 = underlined;
var color2 = color;
var black3 = black2;
var red3 = red2;
var green3 = green2;
var white3 = white2;
var blackBright2 = blackBright;
var cyanBright2 = cyanBright;
var combine11 = combine10;

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/flatten.js
var FlattenSymbolKey = "@effect/printer/Flatten";
var FlattenTypeId = /* @__PURE__ */ Symbol.for(FlattenSymbolKey);
var protoHash = {
  Flattened: (self) => combine(hash(self.value))(string(FlattenSymbolKey)),
  AlreadyFlat: (_) => combine(string("@effect/printer/Flattened/AlreadyFlat"))(string(FlattenSymbolKey)),
  NeverFlat: (_) => combine(string("@effect/printer/Flattened/NeverFlat"))(string(FlattenSymbolKey))
};
var protoEqual = {
  Flattened: (self, that) => isFlatten(that) && that._tag === "Flattened" && equals(self.value, that.value),
  AlreadyFlat: (_, that) => isFlatten(that) && that._tag === "AlreadyFlat",
  NeverFlat: (_, that) => isFlatten(that) && that._tag === "NeverFlat"
};
var proto13 = {
  [FlattenTypeId]: {
    _A: (_) => _
  },
  [symbol]() {
    return protoHash[this._tag](this);
  },
  [symbol2](that) {
    return protoEqual[this._tag](this, that);
  }
};
var isFlatten = (u) => typeof u === "object" && u != null && "_id" in u && FlattenTypeId in u;
var isFlattened = (self) => self._tag === "Flattened";
var isAlreadyFlat = (self) => self._tag === "AlreadyFlat";
var isNeverFlat = (a) => a._tag === "NeverFlat";
var flattened = (value5) => (() => {
  const op = Object.create(proto13);
  op._tag = "Flattened";
  op.value = value5;
  return op;
})();
var alreadyFlat = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto13);
  op._tag = "AlreadyFlat";
  return op;
})();
var neverFlat = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto13);
  op._tag = "NeverFlat";
  return op;
})();
var map20 = /* @__PURE__ */ dual(2, (self, f) => self._tag === "Flattened" ? flattened(f(self.value)) : self);

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/doc.js
var DocSymbolKey = "@effect/printer/Doc";
var DocTypeId = /* @__PURE__ */ Symbol.for(DocSymbolKey);
var protoHash2 = {
  Fail: (_) => combine(hash(DocSymbolKey))(hash("@effect/printer/Doc/Fail")),
  Empty: (_) => combine(hash(DocSymbolKey))(hash("@effect/printer/Doc/Empty")),
  Char: (self) => combine(hash(DocSymbolKey))(string(self.char)),
  Text: (self) => combine(hash(DocSymbolKey))(string(self.text)),
  Line: (_) => combine(hash(DocSymbolKey))(hash("@effect/printer/Doc/Line")),
  FlatAlt: (self) => combine(hash(DocSymbolKey))(combine(hash(self.left))(hash(self.right))),
  Cat: (self) => combine(hash(DocSymbolKey))(combine(hash(self.left))(hash(self.right))),
  Nest: (self) => combine(hash(DocSymbolKey))(combine(hash(self.indent))(hash(self.doc))),
  Union: (self) => combine(hash(DocSymbolKey))(combine(hash(self.left))(hash(self.right))),
  Column: (self) => combine(hash(DocSymbolKey))(hash(self.react)),
  WithPageWidth: (self) => combine(hash(DocSymbolKey))(hash(self.react)),
  Nesting: (self) => combine(hash(DocSymbolKey))(hash(self.react)),
  Annotated: (self) => combine(hash(DocSymbolKey))(combine(hash(self.annotation))(hash(self.doc)))
};
var protoEqual2 = {
  Fail: (_, that) => isDoc(that) && that._tag === "Fail",
  Empty: (_, that) => isDoc(that) && that._tag === "Empty",
  Char: (self, that) => isDoc(that) && that._tag === "Char" && self.char === that.char,
  Text: (self, that) => isDoc(that) && that._tag === "Text" && self.text === that.text,
  Line: (_, that) => isDoc(that) && that._tag === "Line",
  FlatAlt: (self, that) => isDoc(that) && that._tag === "FlatAlt" && equals(that.left)(self.left) && equals(that.right)(self.right),
  Cat: (self, that) => isDoc(that) && that._tag === "Cat" && equals(that.left)(self.left) && equals(that.right)(self.right),
  Nest: (self, that) => isDoc(that) && that._tag === "Nest" && self.indent === that.indent && equals(that.doc)(self.doc),
  Union: (self, that) => isDoc(that) && that._tag === "Union" && equals(that.left)(self.left) && equals(that.right)(self.right),
  Column: (self, that) => isDoc(that) && that._tag === "Column" && equals(that.react)(self.react),
  WithPageWidth: (self, that) => isDoc(that) && that._tag === "WithPageWidth" && equals(that.react)(self.react),
  Nesting: (self, that) => isDoc(that) && that._tag === "Nesting" && equals(that.react)(self.react),
  Annotated: (self, that) => isDoc(that) && that._tag === "Annotated" && equals(that.annotation)(self.annotation) && equals(that.doc)(self.doc)
};
var proto14 = {
  [DocTypeId]: {
    _A: (_) => _
  },
  [symbol]() {
    return protoHash2[this._tag](this);
  },
  [symbol2](that) {
    return protoEqual2[this._tag](this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isDoc = (u) => typeof u === "object" && u != null && DocTypeId in u;
var isEmpty11 = (self) => self._tag === "Empty";
var isChar = (self) => self._tag === "Char";
var isText = (self) => self._tag === "Text";
var isCat = (self) => self._tag === "Cat";
var isNest = (self) => self._tag === "Nest";
var char = (char5) => {
  const op = Object.create(proto14);
  op._tag = "Char";
  op.char = char5;
  return op;
};
var text = (text10) => {
  const op = Object.create(proto14);
  op._tag = "Text";
  op.text = text10;
  return op;
};
var flatAlt = /* @__PURE__ */ dual(2, (self, that) => {
  const op = Object.create(proto14);
  op._tag = "FlatAlt";
  op.left = self;
  op.right = that;
  return op;
});
var union9 = /* @__PURE__ */ dual(2, (self, that) => {
  const op = Object.create(proto14);
  op._tag = "Union";
  op.left = self;
  op.right = that;
  return op;
});
var cat = /* @__PURE__ */ dual(2, (self, that) => {
  const op = Object.create(proto14);
  op._tag = "Cat";
  op.left = self;
  op.right = that;
  return op;
});
var empty31 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto14);
  op._tag = "Empty";
  return op;
})();
var fail13 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto14);
  op._tag = "Fail";
  return op;
})();
var hardLine = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto14);
  op._tag = "Line";
  return op;
})();
var line = /* @__PURE__ */ flatAlt(char(" "))(hardLine);
var lineBreak = /* @__PURE__ */ flatAlt(empty31)(hardLine);
var space = /* @__PURE__ */ char(" ");
var cats = (docs) => group2(vcat(docs));
var catWithLine = /* @__PURE__ */ dual(2, (self, that) => cat(self, cat(line, that)));
var catWithLineBreak = /* @__PURE__ */ dual(2, (self, that) => cat(self, cat(lineBreak, that)));
var catWithSpace = /* @__PURE__ */ dual(2, (self, that) => cat(self, cat(space, that)));
var concatWith = /* @__PURE__ */ dual(2, (docs, f) => {
  const documents = fromIterable(docs);
  if (isNonEmptyReadonlyArray(documents)) {
    const head6 = documents[0];
    const tail = documents.slice(1);
    return tail.reduce((acc, curr) => f(acc, curr), head6);
  }
  return empty31;
});
var vcat = (docs) => concatWith(docs, (left3, right3) => catWithLineBreak(left3, right3));
var hsep = (docs) => concatWith(docs, (left3, right3) => catWithSpace(left3, right3));
var vsep = (docs) => concatWith(docs, (left3, right3) => catWithLine(left3, right3));
var group2 = (self) => {
  switch (self._tag) {
    case "FlatAlt": {
      const flattened2 = changesUponFlattening(self.right);
      switch (flattened2._tag) {
        case "Flattened": {
          return union9(flattened2.value, self.left);
        }
        case "AlreadyFlat": {
          return union9(self.right, self.left);
        }
        case "NeverFlat": {
          return self.left;
        }
      }
    }
    case "Union": {
      return self;
    }
    default: {
      const flattened2 = changesUponFlattening(self);
      return flattened2._tag === "Flattened" ? union9(flattened2.value, self) : self;
    }
  }
};
var column = (react) => {
  const op = Object.create(proto14);
  op._tag = "Column";
  op.react = react;
  return op;
};
var nesting = (react) => {
  const op = Object.create(proto14);
  op._tag = "Nesting";
  op.react = react;
  return op;
};
var pageWidth = (react) => {
  const op = Object.create(proto14);
  op._tag = "WithPageWidth";
  op.react = react;
  return op;
};
var nest = /* @__PURE__ */ dual(2, (self, indent3) => indent3 === 0 ? self : (() => {
  const op = Object.create(proto14);
  op._tag = "Nest";
  op.indent = indent3;
  op.doc = self;
  return op;
})());
var align = (self) => column((position) => nesting((level) => nest(self, position - level)));
var hang = /* @__PURE__ */ dual(2, (self, indent3) => align(nest(self, indent3)));
var indent = /* @__PURE__ */ dual(2, (self, indent3) => hang(cat(spaces(indent3), self), indent3));
var flatten11 = (self) => runSync(flattenSafe(self));
var flattenSafe = (self) => {
  switch (self._tag) {
    case "Line":
      return succeed6(fail13);
    case "Cat":
      return zipWith3(suspend2(() => flattenSafe(self.left)), suspend2(() => flattenSafe(self.right)), (left3, right3) => cat(left3, right3));
    case "FlatAlt":
      return suspend2(() => flattenSafe(self.right));
    case "Union":
      return suspend2(() => flattenSafe(self.left));
    case "Nest":
      return map13(suspend2(() => flattenSafe(self.doc)), nest(self.indent));
    case "Column":
      return succeed6(column((position) => runSync(flattenSafe(self.react(position)))));
    case "WithPageWidth":
      return succeed6(pageWidth((pageWidth3) => runSync(flattenSafe(self.react(pageWidth3)))));
    case "Nesting":
      return succeed6(nesting((level) => runSync(flattenSafe(self.react(level)))));
    case "Annotated":
      return map13(suspend2(() => flattenSafe(self.doc)), annotate(self.annotation));
    default:
      return succeed6(self);
  }
};
var changesUponFlattening = (self) => runSync(changesUponFlatteningSafe(self));
var changesUponFlatteningSafe = (self) => {
  switch (self._tag) {
    case "Fail": {
      return succeed6(neverFlat);
    }
    case "Line": {
      return succeed6(neverFlat);
    }
    case "FlatAlt": {
      return succeed6(flattened(flatten11(self.right)));
    }
    case "Cat": {
      return zipWith3(suspend2(() => changesUponFlatteningSafe(self.left)), suspend2(() => changesUponFlatteningSafe(self.right)), (left3, right3) => {
        if (isNeverFlat(left3) || isNeverFlat(right3)) {
          return neverFlat;
        }
        if (isFlattened(left3) && isFlattened(right3)) {
          return flattened(cat(left3.value, right3.value));
        }
        if (isFlattened(left3) && isAlreadyFlat(right3)) {
          return flattened(cat(left3.value, self.right));
        }
        if (isAlreadyFlat(left3) && isFlattened(right3)) {
          return flattened(cat(self.left, right3.value));
        }
        if (isAlreadyFlat(left3) && isAlreadyFlat(right3)) {
          return alreadyFlat;
        }
        throw new Error("bug, it seems we didn't manage a branch");
      });
    }
    case "Nest": {
      return map13(suspend2(() => changesUponFlatteningSafe(self.doc)), map20(nest(self.indent)));
    }
    case "Union": {
      return succeed6(flattened(self.left));
    }
    case "Column": {
      return succeed6(flattened(column((position) => flatten11(self.react(position)))));
    }
    case "WithPageWidth": {
      return succeed6(flattened(pageWidth((pageWidth3) => flatten11(self.react(pageWidth3)))));
    }
    case "Nesting": {
      return succeed6(flattened(nesting((level) => flatten11(self.react(level)))));
    }
    case "Annotated": {
      return map13(suspend2(() => changesUponFlatteningSafe(self.doc)), map20(annotate(self.annotation)));
    }
    default: {
      return succeed6(alreadyFlat);
    }
  }
};
var annotate = /* @__PURE__ */ dual(2, (self, annotation) => {
  const op = Object.create(proto14);
  op._tag = "Annotated";
  op.doc = self;
  op.annotation = annotation;
  return op;
});
var spaces = (n) => {
  if (n <= 0) {
    return empty31;
  }
  if (n === 1) {
    return char(" ");
  }
  return text(textSpaces(n));
};
var textSpaces = (n) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    s = s += " ";
  }
  return s;
};

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/Doc.js
var char2 = char;
var text2 = text;
var empty32 = empty31;
var hardLine2 = hardLine;
var space2 = space;
var cat2 = cat;
var cats2 = cats;
var hsep2 = hsep;
var vsep2 = vsep;
var nest2 = nest;
var align2 = align;
var indent2 = indent;
var annotate2 = annotate;

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/internal/ansiDoc.js
var beep2 = /* @__PURE__ */ annotate2(empty32, beep);
var cursorTo2 = (column3, row) => annotate2(empty32, cursorTo(column3, row));
var cursorMove2 = (column3, row) => annotate2(empty32, cursorMove(column3, row));
var cursorDown2 = (lines2 = 1) => annotate2(empty32, cursorDown(lines2));
var cursorLeft2 = /* @__PURE__ */ annotate2(empty32, cursorLeft);
var cursorSavePosition2 = /* @__PURE__ */ annotate2(empty32, cursorSavePosition);
var cursorRestorePosition2 = /* @__PURE__ */ annotate2(empty32, cursorRestorePosition);
var cursorHide2 = /* @__PURE__ */ annotate2(empty32, cursorHide);
var cursorShow2 = /* @__PURE__ */ annotate2(empty32, cursorShow);
var eraseLines2 = (rows) => annotate2(empty32, eraseLines(rows));
var eraseLine2 = /* @__PURE__ */ annotate2(empty32, eraseLine);

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/docStream.js
var DocStreamSymbolKey = "@effect/printer/DocStream";
var DocStreamTypeId = /* @__PURE__ */ Symbol.for(DocStreamSymbolKey);
var protoHash3 = {
  FailedStream: (_) => pipe(string("@effect/printer/DocStream/FailedStream"), combine(string(DocStreamSymbolKey))),
  EmptyStream: (_) => pipe(string("@effect/printer/DocStream/EmptyStream"), combine(string(DocStreamSymbolKey))),
  CharStream: (self) => pipe(hash("@effect/printer/DocStream/CharStream"), combine(string(DocStreamSymbolKey)), combine(string(self.char)), combine(hash(self.stream))),
  TextStream: (self) => pipe(string("@effect/printer/DocStream/TextStream"), combine(string(DocStreamSymbolKey)), combine(string(self.text)), combine(hash(self.stream))),
  LineStream: (self) => pipe(string("@effect/printer/DocStream/LineStream"), combine(string(DocStreamSymbolKey)), combine(hash(self.stream))),
  PushAnnotationStream: (self) => pipe(string("@effect/printer/DocStream/PopAnnotationStream"), combine(string(DocStreamSymbolKey)), combine(hash(self.annotation)), combine(hash(self.stream))),
  PopAnnotationStream: (self) => pipe(string("@effect/printer/DocStream/PopAnnotationStream"), combine(string(DocStreamSymbolKey)), combine(hash(self.stream)))
};
var protoEqual3 = {
  FailedStream: (self, that) => isDocStream(that) && that._tag === "FailedStream",
  EmptyStream: (self, that) => isDocStream(that) && that._tag === "EmptyStream",
  CharStream: (self, that) => isDocStream(that) && that._tag === "CharStream" && self.char === that.char && equals(self.stream, that.stream),
  TextStream: (self, that) => isDocStream(that) && that._tag === "TextStream" && self.text === that.text && equals(self.stream, that.stream),
  LineStream: (self, that) => isDocStream(that) && that._tag === "LineStream" && equals(self.stream, that.stream),
  PushAnnotationStream: (self, that) => isDocStream(that) && that._tag === "PushAnnotationStream" && equals(self.annotation, that.annotation) && equals(self.stream, that.stream),
  PopAnnotationStream: (self, that) => isDocStream(that) && that._tag === "PopAnnotationStream" && equals(self.stream, that.stream)
};
var proto15 = {
  [DocStreamTypeId]: {
    _A: (_) => _
  },
  [symbol]() {
    return protoHash3[this._tag](this);
  },
  [symbol2](that) {
    return protoEqual3[this._tag](this, that);
  }
};
var isDocStream = (u) => typeof u === "object" && u != null && DocStreamTypeId in u;
var isEmptyStream = (self) => self._tag === "EmptyStream";
var isLineStream = (self) => self._tag === "LineStream";
var failed = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto15);
  op._tag = "FailedStream";
  return op;
})();
var empty33 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto15);
  op._tag = "EmptyStream";
  return op;
})();
var char3 = /* @__PURE__ */ dual(2, (self, char5) => {
  const op = Object.create(proto15);
  op._tag = "CharStream";
  op.char = char5;
  op.stream = self;
  return op;
});
var text3 = /* @__PURE__ */ dual(2, (self, text10) => {
  const op = Object.create(proto15);
  op._tag = "TextStream";
  op.text = text10;
  op.stream = self;
  return op;
});
var line2 = /* @__PURE__ */ dual(2, (self, indentation) => {
  const op = Object.create(proto15);
  op._tag = "LineStream";
  op.indentation = indentation;
  op.stream = self;
  return op;
});
var pushAnnotation = /* @__PURE__ */ dual(2, (self, annotation) => {
  const op = Object.create(proto15);
  op._tag = "PushAnnotationStream";
  op.annotation = annotation;
  op.stream = self;
  return op;
});
var popAnnotation = (stream2) => {
  const op = Object.create(proto15);
  op._tag = "PopAnnotationStream";
  op.stream = stream2;
  return op;
};

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/DocStream.js
var failed2 = failed;
var empty34 = empty33;
var char4 = char3;
var text4 = text3;
var line3 = line2;

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/layoutPipeline.js
var nil2 = {
  _tag: "Nil"
};
var cons2 = (indent3, document, pipeline) => ({
  _tag: "Cons",
  indent: indent3,
  document,
  pipeline
});
var undoAnnotation = (pipeline) => ({
  _tag: "UndoAnnotation",
  pipeline
});

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/pageWidth.js
var PageWidthSymbolKey = "@effect/printer/PageWidth";
var PageWidthTypeId = /* @__PURE__ */ Symbol.for(PageWidthSymbolKey);
var protoHash4 = {
  AvailablePerLine: (self) => pipe(hash("@effect/printer/PageWidth/AvailablePerLine"), combine(hash(PageWidthSymbolKey)), combine(hash(self.lineWidth)), combine(hash(self.ribbonFraction))),
  Unbounded: (_) => pipe(hash("@effect/printer/PageWidth/Unbounded"), combine(hash(PageWidthSymbolKey)))
};
var protoEqual4 = {
  AvailablePerLine: (self, that) => isPageWidth(that) && that._tag === "AvailablePerLine" && self.lineWidth === that.lineWidth && self.ribbonFraction === that.ribbonFraction,
  Unbounded: (self, that) => isPageWidth(that) && that._tag === "Unbounded"
};
var proto16 = {
  [PageWidthTypeId]: PageWidthTypeId,
  [symbol]() {
    return protoHash4[this._tag](this);
  },
  [symbol2](that) {
    return protoEqual4[this._tag](this, that);
  }
};
var isPageWidth = (u) => typeof u === "object" && u != null && PageWidthTypeId in u;
var availablePerLine = (lineWidth, ribbonFraction) => {
  const op = Object.create(proto16);
  op._tag = "AvailablePerLine";
  op.lineWidth = lineWidth;
  op.ribbonFraction = ribbonFraction;
  return op;
};
var unbounded4 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto16);
  op._tag = "Unbounded";
  return op;
})();
var defaultPageWidth = /* @__PURE__ */ availablePerLine(80, 1);
var remainingWidth = (lineLength, ribbonFraction, lineIndent, currentColumn) => {
  const columnsLeftInLine = lineLength - currentColumn;
  const ribbonWidth = Math.max(0, Math.min(lineLength, Math.floor(lineLength * ribbonFraction)));
  const columnsLeftInRibbon = lineIndent + ribbonWidth - currentColumn;
  return Math.min(columnsLeftInLine, columnsLeftInRibbon);
};

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/layout.js
var options = (pageWidth3) => ({
  pageWidth: pageWidth3
});
var wadlerLeijen = /* @__PURE__ */ dual(3, (self, fits, options3) => runSync(wadlerLeijenSafe(0, 0, cons2(0, self, nil2), fits, options3)));
var wadlerLeijenSafe = (nl, cc, x, fits, options3) => {
  switch (x._tag) {
    case "Nil": {
      return succeed6(empty33);
    }
    case "Cons": {
      switch (x.document._tag) {
        case "Fail": {
          return succeed6(failed);
        }
        case "Empty": {
          return suspend2(() => wadlerLeijenSafe(nl, cc, x.pipeline, fits, options3));
        }
        case "Char": {
          const char5 = x.document.char;
          return map13(suspend2(() => wadlerLeijenSafe(nl, cc + 1, x.pipeline, fits, options3)), char3(char5));
        }
        case "Text": {
          const text10 = x.document.text;
          return map13(suspend2(() => wadlerLeijenSafe(nl, cc + text10.length, x.pipeline, fits, options3)), text3(text10));
        }
        case "Line": {
          return map13(suspend2(() => wadlerLeijenSafe(x.indent, x.indent, x.pipeline, fits, options3)), (stream2) => line2(stream2, isEmptyStream(stream2) || isLineStream(stream2) ? 0 : x.indent));
        }
        case "FlatAlt": {
          const layoutPipeline = cons2(x.indent, x.document.left, x.pipeline);
          return suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3));
        }
        case "Cat": {
          const inner = cons2(x.indent, x.document.right, x.pipeline);
          const outer = cons2(x.indent, x.document.left, inner);
          return suspend2(() => wadlerLeijenSafe(nl, cc, outer, fits, options3));
        }
        case "Nest": {
          const indent3 = x.indent + x.document.indent;
          const layoutPipeline = cons2(indent3, x.document.doc, x.pipeline);
          return suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3));
        }
        case "Union": {
          const leftPipeline = cons2(x.indent, x.document.left, x.pipeline);
          const rightPipeline = cons2(x.indent, x.document.right, x.pipeline);
          return zipWith3(suspend2(() => wadlerLeijenSafe(nl, cc, leftPipeline, fits, options3)), wadlerLeijenSafe(nl, cc, rightPipeline, fits, options3), (left3, right3) => selectNicer(fits, nl, cc, left3, right3));
        }
        case "Column": {
          const layoutPipeline = cons2(x.indent, x.document.react(cc), x.pipeline);
          return suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3));
        }
        case "WithPageWidth": {
          const layoutPipeline = cons2(x.indent, x.document.react(options3.pageWidth), x.pipeline);
          return suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3));
        }
        case "Nesting": {
          const layoutPipeline = cons2(x.indent, x.document.react(x.indent), x.pipeline);
          return suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3));
        }
        case "Annotated": {
          const annotation = x.document.annotation;
          const layoutPipeline = cons2(x.indent, x.document.doc, undoAnnotation(x.pipeline));
          return map13(suspend2(() => wadlerLeijenSafe(nl, cc, layoutPipeline, fits, options3)), (stream2) => pushAnnotation(annotation)(stream2));
        }
      }
    }
    case "UndoAnnotation":
      return map13(suspend2(() => wadlerLeijenSafe(nl, cc, x.pipeline, fits, options3)), popAnnotation);
  }
};
var initialIndentation = (self) => {
  let stream2 = self;
  while (stream2._tag === "LineStream" || stream2._tag === "PushAnnotationStream" || stream2._tag === "PopAnnotationStream") {
    if (stream2._tag === "LineStream") {
      return some2(stream2.indentation);
    }
    stream2 = stream2.stream;
  }
  return none2();
};
var selectNicer = (fits, lineIndent, currentColumn, x, y) => fits(lineIndent, currentColumn, initialIndentation(y))(x) ? x : y;
var compact2 = (self) => runSync(compactSafe(of3(self), 0));
var compactSafe = (docs, i) => {
  if (isNil(docs)) {
    return succeed6(empty34);
  }
  const head6 = docs.head;
  const tail = docs.tail;
  switch (head6._tag) {
    case "Fail": {
      return succeed6(failed2);
    }
    case "Empty": {
      return suspend2(() => compactSafe(tail, i));
    }
    case "Char": {
      return map13(suspend2(() => compactSafe(tail, i + 1)), char4(head6.char));
    }
    case "Text": {
      return map13(suspend2(() => compactSafe(tail, i + head6.text.length)), text4(head6.text));
    }
    case "Line": {
      return map13(suspend2(() => compactSafe(tail, 0)), line3(0));
    }
    case "FlatAlt": {
      return suspend2(() => compactSafe(cons(head6.left, tail), i));
    }
    case "Cat": {
      return suspend2(() => compactSafe(cons(head6.left, cons(head6.right, tail)), i));
    }
    case "Nest": {
      return suspend2(() => compactSafe(cons(head6.doc, tail), i));
    }
    case "Union": {
      return suspend2(() => compactSafe(cons(head6.right, tail), i));
    }
    case "Column": {
      return suspend2(() => compactSafe(cons(head6.react(i), tail), i));
    }
    case "WithPageWidth": {
      return suspend2(() => compactSafe(cons(head6.react(unbounded4), tail), i));
    }
    case "Nesting": {
      return suspend2(() => compactSafe(cons(head6.react(0), tail), i));
    }
    case "Annotated": {
      return suspend2(() => compactSafe(cons(head6.doc, tail), i));
    }
  }
};
var pretty3 = /* @__PURE__ */ dual(2, (self, options3) => {
  const width3 = options3.pageWidth;
  if (width3._tag === "AvailablePerLine") {
    return wadlerLeijen(self, (lineIndent, currentColumn) => (stream2) => {
      const remainingWidth2 = remainingWidth(width3.lineWidth, width3.ribbonFraction, lineIndent, currentColumn);
      return fitsPretty(stream2, remainingWidth2);
    }, options3);
  }
  return unbounded5(self);
});
var fitsPretty = (self, width3) => {
  let w = width3;
  let stream2 = self;
  while (w >= 0) {
    switch (stream2._tag) {
      case "FailedStream": {
        return false;
      }
      case "EmptyStream": {
        return true;
      }
      case "CharStream": {
        w = w - 1;
        stream2 = stream2.stream;
        break;
      }
      case "TextStream": {
        w = w - stream2.text.length;
        stream2 = stream2.stream;
        break;
      }
      case "LineStream": {
        return true;
      }
      case "PushAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
      case "PopAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
    }
  }
  return false;
};
var smart = /* @__PURE__ */ dual(2, (self, options3) => {
  const width3 = options3.pageWidth;
  if (width3._tag === "AvailablePerLine") {
    return wadlerLeijen(self, fitsSmart(width3.lineWidth, width3.ribbonFraction), options3);
  }
  return unbounded5(self);
});
var fitsSmart = (lineWidth, ribbonFraction) => {
  return (lineIndent, currentColumn, initialIndentY) => (stream2) => {
    const availableWidth = remainingWidth(lineWidth, ribbonFraction, lineIndent, currentColumn);
    let minNestingLevel;
    switch (initialIndentY._tag) {
      case "None": {
        minNestingLevel = currentColumn;
        break;
      }
      case "Some": {
        minNestingLevel = Math.min(initialIndentY.value, currentColumn);
        break;
      }
    }
    return fitsSmartLoop(stream2, availableWidth, minNestingLevel, lineWidth);
  };
};
var fitsSmartLoop = (self, width3, minNestingLevel, lineWidth) => {
  let stream2 = self;
  let w = width3;
  while (w >= 0) {
    switch (stream2._tag) {
      case "FailedStream": {
        return false;
      }
      case "EmptyStream": {
        return true;
      }
      case "CharStream": {
        w = w - 1;
        stream2 = stream2.stream;
        break;
      }
      case "TextStream": {
        w = w - stream2.text.length;
        stream2 = stream2.stream;
        break;
      }
      case "LineStream": {
        if (minNestingLevel >= stream2.indentation) {
          return true;
        }
        w = lineWidth - stream2.indentation;
        stream2 = stream2.stream;
        break;
      }
      case "PushAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
      case "PopAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
    }
  }
  return false;
};
var unbounded5 = (self) => wadlerLeijen(self, () => (stream2) => !failsOnFirstLine(stream2), {
  pageWidth: unbounded4
});
var failsOnFirstLine = (self) => {
  let stream2 = self;
  while (1) {
    switch (stream2._tag) {
      case "FailedStream": {
        return true;
      }
      case "EmptyStream": {
        return false;
      }
      case "CharStream": {
        stream2 = stream2.stream;
        break;
      }
      case "TextStream": {
        stream2 = stream2.stream;
        break;
      }
      case "LineStream": {
        return false;
      }
      case "PushAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
      case "PopAnnotationStream": {
        stream2 = stream2.stream;
        break;
      }
    }
  }
  throw new Error("bug");
};

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/PageWidth.js
var defaultPageWidth2 = defaultPageWidth;

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/Layout.js
var options2 = options;
var compact3 = compact2;
var pretty4 = pretty3;
var smart2 = smart;

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/internal/ansiRender.js
var render3 = /* @__PURE__ */ dual(2, (self, config) => {
  switch (config.style) {
    case "compact": {
      return renderStream(compact3(self));
    }
    case "pretty": {
      const width3 = Object.assign({}, defaultPageWidth2, config.options);
      return renderStream(pretty4(self, options2(width3)));
    }
    case "smart": {
      const width3 = Object.assign({}, defaultPageWidth2, config.options);
      return renderStream(smart2(self, options2(width3)));
    }
  }
});
var renderStream = (self) => runSync(renderSafe(self, of3(none10)));
var unsafePeek = (stack) => {
  if (isNil(stack)) {
    throw new Error("BUG: AnsiRender.unsafePeek - peeked at an empty stack - please report an issue at https://github.com/Effect-TS/printer/issues");
  }
  return stack.head;
};
var unsafePop = (stack) => {
  if (isNil(stack)) {
    throw new Error("BUG: AnsiRender.unsafePop - popped from an empty stack - please report an issue at https://github.com/Effect-TS/printer/issues");
  }
  return [stack.head, stack.tail];
};
var renderSafe = (self, stack) => {
  switch (self._tag) {
    case "FailedStream": {
      return dieMessage2("BUG: AnsiRender.renderSafe - attempted to render a failed doc stream - please report an issue at https://github.com/Effect-TS/printer/issues");
    }
    case "EmptyStream": {
      return succeed6("");
    }
    case "CharStream": {
      return map13(suspend2(() => renderSafe(self.stream, stack)), (rest) => self.char + rest);
    }
    case "TextStream": {
      return map13(suspend2(() => renderSafe(self.stream, stack)), (rest) => self.text + rest);
    }
    case "LineStream": {
      let indent3 = "\n";
      for (let i = 0; i < self.indentation; i++) {
        indent3 = indent3 += " ";
      }
      return map13(suspend2(() => renderSafe(self.stream, stack)), (rest) => indent3 + rest);
    }
    case "PushAnnotationStream": {
      const currentStyle = unsafePeek(stack);
      const nextStyle = combine10(self.annotation, currentStyle);
      return map13(suspend2(() => renderSafe(self.stream, cons(self.annotation, stack))), (rest) => stringify(nextStyle) + rest);
    }
    case "PopAnnotationStream": {
      const [, styles] = unsafePop(stack);
      const nextStyle = unsafePeek(styles);
      return map13(suspend2(() => renderSafe(self.stream, styles)), (rest) => stringify(nextStyle) + rest);
    }
  }
};

// ../../.yarn/__virtual__/@effect-printer-ansi-virtual-739c1fc0c7/0/cache/@effect-printer-ansi-npm-0.30.0-b31e03ece8-1e44ff0678.zip/node_modules/@effect/printer-ansi/dist/esm/AnsiDoc.js
var beep3 = beep2;
var cursorTo3 = cursorTo2;
var cursorMove3 = cursorMove2;
var cursorDown3 = cursorDown2;
var cursorLeft3 = cursorLeft2;
var cursorSavePosition3 = cursorSavePosition2;
var cursorRestorePosition3 = cursorRestorePosition2;
var cursorHide3 = cursorHide2;
var cursorShow3 = cursorShow2;
var eraseLines3 = eraseLines2;
var eraseLine3 = eraseLine2;
var render4 = render3;

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/internal/optimize.js
var optimize2 = /* @__PURE__ */ dual(2, (self, depth) => runSync(optimizeSafe(self, depth)));
var optimizeSafe = (self, depth) => {
  switch (self._tag) {
    case "FlatAlt": {
      return zipWith3(suspend2(() => optimizeSafe(self.left, depth)), suspend2(() => optimizeSafe(self.right, depth)), (left3, right3) => flatAlt(left3, right3));
    }
    case "Cat": {
      if (isEmpty11(self.left)) {
        return suspend2(() => optimizeSafe(self.right, depth));
      }
      if (isEmpty11(self.right)) {
        return suspend2(() => optimizeSafe(self.left, depth));
      }
      if (isChar(self.left) && isChar(self.right)) {
        return succeed6(text(self.left.char + self.right.char));
      }
      if (isText(self.left) && isChar(self.right)) {
        return succeed6(text(self.left.text + self.right.char));
      }
      if (isChar(self.left) && isText(self.right)) {
        return succeed6(text(self.left.char + self.right.text));
      }
      if (isText(self.left) && isText(self.right)) {
        return succeed6(text(self.left.text + self.right.text));
      }
      if (isChar(self.left) && isCat(self.right) && isChar(self.right.left)) {
        const left3 = self.right.left;
        const right3 = self.right.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(self.left, left3), depth)), (inner) => optimizeSafe(cat(right3, inner), depth));
      }
      if (isText(self.left) && isCat(self.right) && isChar(self.right.left)) {
        const left3 = self.right.left;
        const right3 = self.right.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(self.left, left3), depth)), (inner) => optimizeSafe(cat(inner, right3), depth));
      }
      if (isChar(self.left) && isCat(self.right) && isText(self.right.left)) {
        const left3 = self.right.left;
        const right3 = self.right.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(self.left, left3), depth)), (inner) => optimizeSafe(cat(inner, right3), depth));
      }
      if (isText(self.left) && isCat(self.right) && isText(self.right.left)) {
        const left3 = self.right.left;
        const right3 = self.right.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(self.left, left3), depth)), (inner) => optimizeSafe(cat(inner, right3), depth));
      }
      if (isCat(self.left) && isChar(self.left.right)) {
        const left3 = self.left.left;
        const right3 = self.left.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(right3, self.right), depth)), (inner) => optimizeSafe(cat(left3, inner), depth));
      }
      if (isCat(self.left) && isText(self.left.right)) {
        const left3 = self.left.left;
        const right3 = self.left.right;
        return flatMap8(suspend2(() => optimizeSafe(cat(right3, self.right), depth)), (inner) => optimizeSafe(cat(left3, inner), depth));
      }
      return zipWith3(suspend2(() => optimizeSafe(self.left, depth)), suspend2(() => optimizeSafe(self.right, depth)), (left3, right3) => cat(left3, right3));
    }
    case "Nest": {
      if (isEmpty11(self.doc)) {
        return succeed6(self.doc);
      }
      if (isChar(self.doc)) {
        return succeed6(self.doc);
      }
      if (isText(self.doc)) {
        return succeed6(self.doc);
      }
      if (isNest(self.doc)) {
        const doc = self.doc;
        return suspend2(() => optimizeSafe(nest(doc.doc, self.indent + doc.indent), depth));
      }
      if (self.indent === 0) {
        return suspend2(() => optimizeSafe(self.doc, depth));
      }
      return map13(suspend2(() => optimizeSafe(self.doc, depth)), (doc) => nest(doc, self.indent));
    }
    case "Union": {
      return zipWith3(suspend2(() => optimizeSafe(self.left, depth)), suspend2(() => optimizeSafe(self.right, depth)), (left3, right3) => union9(left3, right3));
    }
    case "Column": {
      return depth._tag === "Shallow" ? succeed6(column(self.react)) : succeed6(column((position) => runSync(optimizeSafe(self.react(position), depth))));
    }
    case "WithPageWidth": {
      return depth._tag === "Shallow" ? succeed6(pageWidth(self.react)) : succeed6(pageWidth((pageWidth3) => runSync(optimizeSafe(self.react(pageWidth3), depth))));
    }
    case "Nesting": {
      return depth._tag === "Shallow" ? succeed6(nesting(self.react)) : succeed6(nesting((level) => runSync(optimizeSafe(self.react(level), depth))));
    }
    case "Annotated": {
      return map13(suspend2(() => optimizeSafe(self.doc, depth)), (doc) => annotate(doc, self.annotation));
    }
    default:
      return succeed6(self);
  }
};

// ../../.yarn/__virtual__/@effect-printer-virtual-2dc78203c7/0/cache/@effect-printer-npm-0.29.0-50d2f347da-35a8738fd0.zip/node_modules/@effect/printer/dist/esm/Optimize.js
var Deep = {
  _tag: "Deep"
};
var optimize3 = optimize2;

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/helpDoc/span.js
var text5 = (value5) => ({
  _tag: "Text",
  value: value5
});
var empty35 = /* @__PURE__ */ text5("");
var space3 = /* @__PURE__ */ text5(" ");
var concat3 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: "Sequence",
  left: self,
  right: that
}));
var spans = (spans2) => {
  const elements = fromIterable(spans2);
  if (isNonEmptyReadonlyArray(elements)) {
    return elements.slice(1).reduce(concat3, elements[0]);
  }
  return empty35;
};
var toAnsiDoc = (self) => {
  switch (self._tag) {
    case "Highlight": {
      return annotate2(toAnsiDoc(self.value), color2(self.color));
    }
    case "Sequence": {
      return cat2(toAnsiDoc(self.left), toAnsiDoc(self.right));
    }
    case "Strong": {
      return annotate2(toAnsiDoc(self.value), bold2);
    }
    case "Text": {
      return text2(self.value);
    }
    case "URI": {
      return annotate2(text2(self.value), underlined2);
    }
    case "Weak": {
      return annotate2(toAnsiDoc(self.value), black3);
    }
  }
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/helpDoc.js
var isEmpty13 = (helpDoc) => helpDoc._tag === "Empty";
var isHeader = (helpDoc) => helpDoc._tag === "Header";
var isParagraph = (helpDoc) => helpDoc._tag === "Paragraph";
var isDescriptionList = (helpDoc) => helpDoc._tag === "DescriptionList";
var empty36 = {
  _tag: "Empty"
};
var sequence = /* @__PURE__ */ dual(2, (self, that) => {
  if (isEmpty13(self)) {
    return that;
  }
  if (isEmpty13(that)) {
    return self;
  }
  return {
    _tag: "Sequence",
    left: self,
    right: that
  };
});
var getSpan = (self) => isHeader(self) || isParagraph(self) ? self.value : empty35;
var descriptionList = (definitions) => ({
  _tag: "DescriptionList",
  definitions
});
var enumeration = (elements) => ({
  _tag: "Enumeration",
  elements
});
var p = (value5) => ({
  _tag: "Paragraph",
  value: typeof value5 === "string" ? text5(value5) : value5
});
var mapDescriptionList = /* @__PURE__ */ dual(2, (self, f) => isDescriptionList(self) ? descriptionList(map2(self.definitions, ([span2, helpDoc]) => f(span2, helpDoc))) : self);
var toAnsiDoc2 = (self) => optimize3(toAnsiDocInternal(self), Deep);
var toAnsiText = (self) => render4(toAnsiDoc2(self), {
  style: "pretty"
});
var toAnsiDocInternal = (self) => {
  switch (self._tag) {
    case "Empty": {
      return empty32;
    }
    case "Header": {
      return pipe(annotate2(toAnsiDoc(self.value), bold2), cat2(hardLine2));
    }
    case "Paragraph": {
      return pipe(toAnsiDoc(self.value), cat2(hardLine2));
    }
    case "DescriptionList": {
      const definitions = self.definitions.map(([span2, doc]) => cats2([annotate2(toAnsiDoc(span2), bold2), empty32, indent2(toAnsiDocInternal(doc), 2)]));
      return vsep2(definitions);
    }
    case "Enumeration": {
      const elements = self.elements.map((doc) => cat2(text2("- "), toAnsiDocInternal(doc)));
      return indent2(vsep2(elements), 2);
    }
    case "Sequence": {
      return vsep2([toAnsiDocInternal(self.left), toAnsiDocInternal(self.right)]);
    }
  }
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/cliConfig.js
var defaultConfig = {
  isCaseSensitive: false,
  autoCorrectLimit: 2,
  finalCheckBuiltIn: false,
  showAllNames: true,
  showBuiltIns: true,
  showTypes: true
};
var normalizeCase = /* @__PURE__ */ dual(2, (self, text10) => self.isCaseSensitive ? text10 : text10.toLowerCase());

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt.js
var PromptSymbolKey = "@effect/cli/Prompt";
var PromptTypeId = /* @__PURE__ */ Symbol.for(PromptSymbolKey);
var proto17 = {
  ...CommitPrototype2,
  [PromptTypeId]: {
    _Output: (_) => _
  },
  commit() {
    return run3(this);
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var custom = (initialState4, render6, process2) => {
  const op = Object.create(proto17);
  op._tag = "Loop";
  op.initialState = initialState4;
  op.render = render6;
  op.process = process2;
  return op;
};
var map24 = /* @__PURE__ */ dual(2, (self, f) => flatMap16(self, (a) => succeed12(f(a))));
var flatMap16 = /* @__PURE__ */ dual(2, (self, f) => {
  const op = Object.create(proto17);
  op._tag = "OnSuccess";
  op.prompt = self;
  op.onSuccess = f;
  return op;
});
var run3 = (self) => flatMap8(Terminal, (terminal) => {
  const op = self;
  switch (op._tag) {
    case "Loop": {
      return all5([make28(none2()), make28(op.initialState)]).pipe(
        flatMap8(([prevStateRef, nextStateRef]) => {
          const loop3 = (action) => all5([get12(prevStateRef), get12(nextStateRef)]).pipe(flatMap8(([prevState, nextState]) => op.render(prevState, nextState, action).pipe(flatMap8((msg) => orDie2(terminal.display(msg))), zipRight3(terminal.readInput), flatMap8((input) => op.process(input, nextState)), flatMap8((action2) => {
            switch (action2._tag) {
              case "Beep": {
                return loop3(action2);
              }
              case "NextFrame": {
                return set7(prevStateRef, some2(nextState)).pipe(zipRight3(set7(nextStateRef, action2.state)), zipRight3(loop3(action2)));
              }
              case "Submit": {
                return op.render(prevState, nextState, action2).pipe(flatMap8((msg) => orDie2(terminal.display(msg))), zipRight3(succeed6(action2.value)));
              }
            }
          }))));
          return loop3({
            _tag: "NextFrame",
            state: op.initialState
          });
        }),
        // Always make sure to restore the display of the cursor
        ensuring2(orDie2(terminal.display(render4(cursorShow3, {
          style: "pretty"
        }))))
      );
    }
    case "OnSuccess": {
      return flatMap8(run3(op.prompt), (a) => run3(op.onSuccess(a)));
    }
    case "Succeed": {
      return succeed6(op.value);
    }
  }
});
var succeed12 = (value5) => {
  const op = Object.create(proto17);
  op._tag = "Succeed";
  op.value = value5;
  return op;
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/action.js
var beep4 = {
  _tag: "Beep"
};
var nextFrame = (state) => ({
  _tag: "NextFrame",
  state
});
var submit = (value5) => ({
  _tag: "Submit",
  value: value5
});

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/ansi-utils.js
var defaultFigures = {
  arrowUp: /* @__PURE__ */ text2("\u2191"),
  arrowDown: /* @__PURE__ */ text2("\u2193"),
  arrowLeft: /* @__PURE__ */ text2("\u2190"),
  arrowRight: /* @__PURE__ */ text2("\u2192"),
  radioOn: /* @__PURE__ */ text2("\u25C9"),
  radioOff: /* @__PURE__ */ text2("\u25EF"),
  tick: /* @__PURE__ */ text2("\u2714"),
  cross: /* @__PURE__ */ text2("\u2716"),
  ellipsis: /* @__PURE__ */ text2("\u2026"),
  pointerSmall: /* @__PURE__ */ text2("\u203A"),
  line: /* @__PURE__ */ text2("\u2500"),
  pointer: /* @__PURE__ */ text2("\u276F")
};
var windowsFigures = {
  arrowUp: defaultFigures.arrowUp,
  arrowDown: defaultFigures.arrowDown,
  arrowLeft: defaultFigures.arrowLeft,
  arrowRight: defaultFigures.arrowRight,
  radioOn: /* @__PURE__ */ text2("(*)"),
  radioOff: /* @__PURE__ */ text2("( )"),
  tick: /* @__PURE__ */ text2("\u221A"),
  cross: /* @__PURE__ */ text2("\xD7"),
  ellipsis: /* @__PURE__ */ text2("..."),
  pointerSmall: /* @__PURE__ */ text2("\xBB"),
  line: /* @__PURE__ */ text2("\u2500"),
  pointer: /* @__PURE__ */ text2(">")
};
var figures = /* @__PURE__ */ map13(/* @__PURE__ */ sync2(() => process.platform === "win32"), (isWindows) => isWindows ? windowsFigures : defaultFigures);
var eraseText = (text10, columns) => {
  if (columns === 0) {
    return cat2(eraseLine3, cursorTo3(0));
  }
  let rows = 0;
  const lines2 = text10.split(/\r?\n/);
  for (const line5 of lines2) {
    rows += 1 + Math.floor(Math.max(line5.length - 1, 0) / columns);
  }
  return eraseLines3(rows);
};
var lines = (prompt, columns) => {
  const lines2 = prompt.split(/\r?\n/);
  return columns === 0 ? lines2.length : pipe(map2(lines2, (line5) => Math.ceil(line5.length / columns)), reduce(0, (left3, right3) => left3 + right3));
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/date.js
var renderBeep = /* @__PURE__ */ render4(beep3, {
  style: "pretty"
});
var renderClearScreen = (prevState, options3, columns) => {
  const resetCurrentLine = cat2(eraseLine3, cursorLeft3);
  if (isNone2(prevState)) {
    return resetCurrentLine;
  }
  const clearError = match(prevState.value.error, {
    onNone: () => empty32,
    onSome: (error2) => pipe(cursorDown3(lines(error2, columns)), cat2(eraseText(`
${error2}`, columns)))
  });
  const clearOutput = eraseText(options3.message, columns);
  return cat2(clearError, cat2(clearOutput, resetCurrentLine));
};
var renderError = (nextState, pointer) => match(nextState.error, {
  onNone: () => empty32,
  onSome: (error2) => {
    const errorLines = error2.split(/\r?\n/);
    if (isNonEmptyReadonlyArray(errorLines)) {
      const annotateLine = (line5) => annotate2(text2(line5), combine11(italicized2, red3));
      const prefix = cat2(annotate2(pointer, red3), space2);
      const lines2 = map2(errorLines, (str) => annotateLine(str));
      return pipe(cursorSavePosition3, cat2(hardLine2), cat2(prefix), cat2(align2(vsep2(lines2))), cat2(cursorRestorePosition3));
    }
    return empty32;
  }
});
var renderParts = (nextState, submitted = false) => reduce(nextState.dateParts, empty32, (doc, part, currentIndex) => {
  const partDoc = text2(part.toString());
  if (currentIndex === nextState.cursor && !submitted) {
    const annotation = combine11(underlined2, cyanBright2);
    return cat2(doc, annotate2(partDoc, annotation));
  }
  return cat2(doc, partDoc);
});
var renderOutput = (leadingSymbol, trailingSymbol, parts, options3) => {
  const annotateLine = (line5) => annotate2(text2(line5), bold2);
  const prefix = cat2(leadingSymbol, space2);
  return match3(options3.message.split(/\r?\n/), {
    onEmpty: () => hsep2([prefix, trailingSymbol, parts]),
    onNonEmpty: (promptLines) => {
      const lines2 = map2(promptLines, (line5) => annotateLine(line5));
      return pipe(prefix, cat2(nest2(vsep2(lines2), 2)), cat2(space2), cat2(trailingSymbol), cat2(space2), cat2(parts));
    }
  });
};
var renderNextFrame = (prevState, nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen(prevState, options3, columns);
  const leadingSymbol = annotate2(text2("?"), cyanBright2);
  const trailingSymbol = annotate2(figures2.pointerSmall, blackBright2);
  const parts = renderParts(nextState);
  const promptMsg = renderOutput(leadingSymbol, trailingSymbol, parts, options3);
  const errorMsg = renderError(nextState, figures2.pointerSmall);
  return pipe(clearScreen, cat2(cursorHide3), cat2(promptMsg), cat2(errorMsg), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var renderSubmission = (nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen(some2(nextState), options3, columns);
  const leadingSymbol = annotate2(figures2.tick, green3);
  const trailingSymbol = annotate2(figures2.ellipsis, blackBright2);
  const parts = renderParts(nextState, true);
  const promptMsg = renderOutput(leadingSymbol, trailingSymbol, parts, options3);
  return pipe(clearScreen, cat2(promptMsg), cat2(hardLine2), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var processUp = (currentState) => {
  currentState.dateParts[currentState.cursor].increment();
  return nextFrame({
    ...currentState,
    typed: ""
  });
};
var processDown = (currentState) => {
  currentState.dateParts[currentState.cursor].decrement();
  return nextFrame({
    ...currentState,
    typed: ""
  });
};
var processCursorLeft = (currentState) => {
  const previousPart = currentState.dateParts[currentState.cursor].previousPart();
  return match(previousPart, {
    onNone: () => beep4,
    onSome: (previous) => nextFrame({
      ...currentState,
      typed: "",
      cursor: currentState.dateParts.indexOf(previous)
    })
  });
};
var processCursorRight = (currentState) => {
  const nextPart = currentState.dateParts[currentState.cursor].nextPart();
  return match(nextPart, {
    onNone: () => beep4,
    onSome: (next) => nextFrame({
      ...currentState,
      typed: "",
      cursor: currentState.dateParts.indexOf(next)
    })
  });
};
var processNext = (currentState) => {
  const nextPart = currentState.dateParts[currentState.cursor].nextPart();
  const cursor = match(nextPart, {
    onNone: () => currentState.dateParts.findIndex((part) => !part.isToken()),
    onSome: (next) => currentState.dateParts.indexOf(next)
  });
  return nextFrame({
    ...currentState,
    cursor
  });
};
var defaultProcessor = (value5, currentState) => {
  if (/\d/.test(value5)) {
    const typed = currentState.typed + value5;
    currentState.dateParts[currentState.cursor].setValue(typed);
    return nextFrame({
      ...currentState,
      typed
    });
  }
  return beep4;
};
var defaultLocales = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
var date = (options3) => {
  const opts = {
    initial: /* @__PURE__ */ new Date(),
    dateMask: "YYYY-MM-DD HH:mm:ss",
    validate: succeed6,
    ...options3,
    locales: {
      ...defaultLocales,
      ...options3.locales
    }
  };
  const dateParts = makeDateParts(opts.dateMask, opts.initial, opts.locales);
  const initialCursorPosition = dateParts.findIndex((part) => !part.isToken());
  return custom({
    dateParts,
    typed: "",
    cursor: initialCursorPosition,
    value: opts.initial,
    error: none2()
  }, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep);
      }
      case "NextFrame": {
        return renderNextFrame(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission(nextState, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "left": {
        return succeed6(processCursorLeft(state));
      }
      case "right": {
        return succeed6(processCursorRight(state));
      }
      case "k":
      case "up": {
        return succeed6(processUp(state));
      }
      case "j":
      case "down": {
        return succeed6(processDown(state));
      }
      case "tab": {
        return succeed6(processNext(state));
      }
      case "enter":
      case "return": {
        return match10(opts.validate(state.value), {
          onFailure: (error2) => nextFrame({
            ...state,
            error: some2(error2)
          }),
          onSuccess: submit
        });
      }
      default: {
        const value5 = getOrElse(input.input, () => "");
        return succeed6(defaultProcessor(value5, state));
      }
    }
  });
};
var DATE_PART_REGEX = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
var regexGroups = {
  1: ({
    token,
    ...opts
  }) => new Token({
    token: token.replace(/\\(.)/g, "$1"),
    ...opts
  }),
  2: (opts) => new Day(opts),
  3: (opts) => new Month(opts),
  4: (opts) => new Year(opts),
  5: (opts) => new Meridiem(opts),
  6: (opts) => new Hours(opts),
  7: (opts) => new Minutes(opts),
  8: (opts) => new Seconds(opts),
  9: (opts) => new Milliseconds(opts)
};
var makeDateParts = (dateMask, date5, locales) => {
  const parts = [];
  let result = null;
  while (result = DATE_PART_REGEX.exec(dateMask)) {
    const match17 = result.shift();
    const index2 = result.findIndex((group4) => group4 !== void 0);
    if (index2 in regexGroups) {
      const token = result[index2] || match17;
      parts.push(regexGroups[index2]({
        token,
        date: date5,
        parts,
        locales
      }));
    } else {
      parts.push(new Token({
        token: result[index2] || match17,
        date: date5,
        parts,
        locales
      }));
    }
  }
  const orderedParts = parts.reduce((array6, element) => {
    const lastElement = array6[array6.length - 1];
    if (element.isToken() && lastElement !== void 0 && lastElement.isToken()) {
      lastElement.setValue(element.token);
    } else {
      array6.push(element);
    }
    return array6;
  }, empty());
  parts.splice(0, parts.length, ...orderedParts);
  return parts;
};
var DatePart = class {
  token;
  date;
  parts;
  locales;
  constructor(params) {
    this.token = params.token;
    this.locales = params.locales;
    this.date = params.date || /* @__PURE__ */ new Date();
    this.parts = params.parts || [this];
  }
  /**
   * Returns `true` if this `DatePart` is a `Token`, `false` otherwise.
   */
  isToken() {
    return false;
  }
  /**
   * Retrieves the next date part in the list of parts.
   */
  nextPart() {
    return pipe(findFirstIndex(this.parts, (part) => part === this), flatMap((currentPartIndex) => findFirst(this.parts.slice(currentPartIndex + 1), (part) => !part.isToken())));
  }
  /**
   * Retrieves the previous date part in the list of parts.
   */
  previousPart() {
    return pipe(findFirstIndex(this.parts, (part) => part === this), flatMap((currentPartIndex) => findLast(this.parts.slice(0, currentPartIndex), (part) => !part.isToken())));
  }
  toString() {
    return String(this.date);
  }
};
var Token = class extends DatePart {
  increment() {
  }
  decrement() {
  }
  setValue(value5) {
    this.token = this.token + value5;
  }
  isToken() {
    return true;
  }
  toString() {
    return this.token;
  }
};
var Milliseconds = class extends DatePart {
  increment() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }
  decrement() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }
  setValue(value5) {
    this.date.setMilliseconds(Number.parseInt(value5.slice(-this.token.length)));
  }
  toString() {
    const millis2 = `${this.date.getMilliseconds()}`;
    return millis2.padStart(4, "0").substring(0, this.token.length);
  }
};
var Seconds = class extends DatePart {
  increment() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }
  decrement() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }
  setValue(value5) {
    this.date.setSeconds(Number.parseInt(value5.slice(-2)));
  }
  toString() {
    const seconds2 = `${this.date.getSeconds()}`;
    return this.token.length > 1 ? seconds2.padStart(2, "0") : seconds2;
  }
};
var Minutes = class extends DatePart {
  increment() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }
  decrement() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }
  setValue(value5) {
    this.date.setMinutes(Number.parseInt(value5.slice(-2)));
  }
  toString() {
    const minutes2 = `${this.date.getMinutes()}`;
    return this.token.length > 1 ? minutes2.padStart(2, "0") : minutes2;
  }
};
var Hours = class extends DatePart {
  increment() {
    this.date.setHours(this.date.getHours() + 1);
  }
  decrement() {
    this.date.setHours(this.date.getHours() - 1);
  }
  setValue(value5) {
    this.date.setHours(Number.parseInt(value5.slice(-2)));
  }
  toString() {
    const hours2 = /h/.test(this.token) ? this.date.getHours() % 12 || 12 : this.date.getHours();
    return this.token.length > 1 ? `${hours2}`.padStart(2, "0") : `${hours2}`;
  }
};
var Day = class extends DatePart {
  increment() {
    this.date.setDate(this.date.getDate() + 1);
  }
  decrement() {
    this.date.setDate(this.date.getDate() - 1);
  }
  setValue(value5) {
    this.date.setDate(Number.parseInt(value5.slice(-2)));
  }
  toString() {
    const date5 = this.date.getDate();
    const day = this.date.getDay();
    return pipe(value2(this.token), when4("DD", () => `${date5}`.padStart(2, "0")), when4("Do", () => `${date5}${this.ordinalIndicator(date5)}`), when4("d", () => `${day + 1}`), when4("ddd", () => this.locales.weekdaysShort[day]), when4("dddd", () => this.locales.weekdays[day]), orElse8(() => `${date5}`));
  }
  ordinalIndicator(day) {
    return pipe(value2(day % 10), when4(1, () => "st"), when4(2, () => "nd"), when4(3, () => "rd"), orElse8(() => "th"));
  }
};
var Month = class extends DatePart {
  increment() {
    this.date.setMonth(this.date.getMonth() + 1);
  }
  decrement() {
    this.date.setMonth(this.date.getMonth() - 1);
  }
  setValue(value5) {
    const month = Number.parseInt(value5.slice(-2)) - 1;
    this.date.setMonth(month < 0 ? 0 : month);
  }
  toString() {
    const month = this.date.getMonth();
    return pipe(value2(this.token.length), when4(2, () => `${month + 1}`.padStart(2, "0")), when4(3, () => this.locales.monthsShort[month]), when4(4, () => this.locales.months[month]), orElse8(() => `${month + 1}`));
  }
};
var Year = class extends DatePart {
  increment() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }
  decrement() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }
  setValue(value5) {
    this.date.setFullYear(Number.parseInt(value5.slice(-4)));
  }
  toString() {
    const year = `${this.date.getFullYear()}`.padStart(4, "0");
    return this.token.length === 2 ? year.substring(-2) : year;
  }
};
var Meridiem = class extends DatePart {
  increment() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }
  decrement() {
    this.increment();
  }
  setValue(_value) {
  }
  toString() {
    const meridiem = this.date.getHours() > 12 ? "pm" : "am";
    return /A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/number.js
var round = (number5, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number5 * factor) / factor;
};
var parseInt2 = /* @__PURE__ */ NumberFromString.pipe(/* @__PURE__ */ int(), parse);
var parseFloat = /* @__PURE__ */ parse(NumberFromString);
var renderBeep2 = /* @__PURE__ */ render4(beep3, {
  style: "pretty"
});
var renderClearScreen2 = (prevState, options3, columns) => {
  const resetCurrentLine = cat2(eraseLine3, cursorLeft3);
  if (isNone2(prevState)) {
    return resetCurrentLine;
  }
  const clearError = match(prevState.value.error, {
    onNone: () => empty32,
    onSome: (error2) => pipe(cursorDown3(lines(error2, columns)), cat2(eraseText(`
${error2}`, columns)))
  });
  const clearOutput = eraseText(options3.message, columns);
  return cat2(clearError, cat2(clearOutput, resetCurrentLine));
};
var renderInput = (nextState, submitted) => {
  const annotation = match(nextState.error, {
    onNone: () => combine11(underlined2, cyanBright2),
    onSome: () => red3
  });
  const value5 = nextState.value === "" ? empty32 : text2(`${nextState.value}`);
  return submitted ? value5 : annotate2(value5, annotation);
};
var renderError2 = (nextState, pointer) => match(nextState.error, {
  onNone: () => empty32,
  onSome: (error2) => match3(error2.split(/\r?\n/), {
    onEmpty: () => empty32,
    onNonEmpty: (errorLines) => {
      const annotateLine = (line5) => annotate2(text2(line5), combine11(italicized2, red3));
      const prefix = cat2(annotate2(pointer, red3), space2);
      const lines2 = map2(errorLines, (str) => annotateLine(str));
      return pipe(cursorSavePosition3, cat2(hardLine2), cat2(prefix), cat2(align2(vsep2(lines2))), cat2(cursorRestorePosition3));
    }
  })
});
var renderOutput2 = (nextState, leadingSymbol, trailingSymbol, options3, submitted = false) => {
  const annotateLine = (line5) => annotate2(text2(line5), bold2);
  const prefix = cat2(leadingSymbol, space2);
  return match3(options3.message.split(/\r?\n/), {
    onEmpty: () => hsep2([prefix, trailingSymbol, renderInput(nextState, submitted)]),
    onNonEmpty: (promptLines) => {
      const lines2 = map2(promptLines, (line5) => annotateLine(line5));
      return pipe(prefix, cat2(nest2(vsep2(lines2), 2)), cat2(space2), cat2(trailingSymbol), cat2(space2), cat2(renderInput(nextState, submitted)));
    }
  });
};
var renderNextFrame2 = (prevState, nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const leadingSymbol = annotate2(text2("?"), cyanBright2);
  const trailingSymbol = annotate2(figures2.pointerSmall, blackBright2);
  const clearScreen = renderClearScreen2(prevState, options3, columns);
  const errorMsg = renderError2(nextState, figures2.pointerSmall);
  const promptMsg = renderOutput2(nextState, leadingSymbol, trailingSymbol, options3);
  return pipe(clearScreen, cat2(promptMsg), cat2(errorMsg), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var renderSubmission2 = (nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen2(some2(nextState), options3, columns);
  const leadingSymbol = annotate2(figures2.tick, green3);
  const trailingSymbol = annotate2(figures2.ellipsis, blackBright2);
  const promptMsg = renderOutput2(nextState, leadingSymbol, trailingSymbol, options3, true);
  return pipe(clearScreen, cat2(promptMsg), cat2(hardLine2), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var processBackspace = (currentState) => {
  if (currentState.value.length <= 0) {
    return succeed6(beep4);
  }
  return succeed6(nextFrame({
    ...currentState,
    value: currentState.value.slice(0, currentState.value.length - 1),
    error: none2()
  }));
};
var defaultIntProcessor = (currentState, input) => {
  if (currentState.value.length === 0 && input === "-") {
    return succeed6(nextFrame({
      ...currentState,
      value: "-",
      error: none2()
    }));
  }
  return match10(parseInt2(currentState.value + input), {
    onFailure: () => beep4,
    onSuccess: (value5) => nextFrame({
      ...currentState,
      value: `${value5}`,
      error: none2()
    })
  });
};
var defaultFloatProcessor = (currentState, input) => {
  if (input === "." && currentState.value.includes(".")) {
    return succeed6(beep4);
  }
  if (currentState.value.length === 0 && input === "-") {
    return succeed6(nextFrame({
      ...currentState,
      value: "-",
      error: none2()
    }));
  }
  return match10(parseFloat(currentState.value + input), {
    onFailure: () => beep4,
    onSuccess: (value5) => nextFrame({
      ...currentState,
      value: input === "." ? `${value5}.` : `${value5}`,
      error: none2()
    })
  });
};
var initialState = {
  cursor: 0,
  value: "",
  error: /* @__PURE__ */ none2()
};
var integer = (options3) => {
  const opts = {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
    incrementBy: 1,
    decrementBy: 1,
    validate: (n) => {
      if (n < opts.min) {
        return fail6(`${n} must be greater than or equal to ${opts.min}`);
      }
      if (n > opts.max) {
        return fail6(`${n} must be less than or equal to ${opts.max}`);
      }
      return succeed6(n);
    },
    ...options3
  };
  return custom(initialState, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep2);
      }
      case "NextFrame": {
        return renderNextFrame2(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission2(nextState, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "backspace": {
        return processBackspace(state);
      }
      case "k":
      case "up": {
        return sync2(() => nextFrame({
          ...state,
          value: state.value === "" || state.value === "-" ? `${opts.incrementBy}` : `${Number.parseInt(state.value) + opts.incrementBy}`,
          error: none2()
        }));
      }
      case "j":
      case "down": {
        return sync2(() => nextFrame({
          ...state,
          value: state.value === "" || state.value === "-" ? `-${opts.decrementBy}` : `${Number.parseInt(state.value) - opts.decrementBy}`,
          error: none2()
        }));
      }
      case "enter":
      case "return": {
        return matchEffect2(parseInt2(state.value), {
          onFailure: () => succeed6(nextFrame({
            ...state,
            error: some2("Must provide an integer value")
          })),
          onSuccess: (n) => match10(opts.validate(n), {
            onFailure: (error2) => nextFrame({
              ...state,
              error: some2(error2)
            }),
            onSuccess: submit
          })
        });
      }
      default: {
        const value5 = getOrElse(input.input, () => "");
        return defaultIntProcessor(state, value5);
      }
    }
  });
};
var float = (options3) => {
  const opts = {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
    incrementBy: 1,
    decrementBy: 1,
    precision: 2,
    validate: (n) => {
      if (n < opts.min) {
        return fail6(`${n} must be greater than or equal to ${opts.min}`);
      }
      if (n > opts.max) {
        return fail6(`${n} must be less than or equal to ${opts.max}`);
      }
      return succeed6(n);
    },
    ...options3
  };
  return custom(initialState, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep2);
      }
      case "NextFrame": {
        return renderNextFrame2(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission2(nextState, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "backspace": {
        return processBackspace(state);
      }
      case "k":
      case "up": {
        return sync2(() => nextFrame({
          ...state,
          value: state.value === "" || state.value === "-" ? `${opts.incrementBy}` : `${Number.parseFloat(state.value) + opts.incrementBy}`,
          error: none2()
        }));
      }
      case "j":
      case "down": {
        return sync2(() => nextFrame({
          ...state,
          value: state.value === "" || state.value === "-" ? `-${opts.decrementBy}` : `${Number.parseFloat(state.value) - opts.decrementBy}`,
          error: none2()
        }));
      }
      case "enter":
      case "return": {
        return matchEffect2(parseFloat(state.value), {
          onFailure: () => succeed6(nextFrame({
            ...state,
            error: some2("Must provide a floating point value")
          })),
          onSuccess: (n) => flatMap8(sync2(() => round(n, opts.precision)), (rounded) => match10(opts.validate(rounded), {
            onFailure: (error2) => nextFrame({
              ...state,
              error: some2(error2)
            }),
            onSuccess: submit
          }))
        });
      }
      default: {
        const value5 = getOrElse(input.input, () => "");
        return defaultFloatProcessor(state, value5);
      }
    }
  });
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/utils.js
var entriesToDisplay = (cursor, total, maxVisible) => {
  const max6 = maxVisible === void 0 ? total : maxVisible;
  let startIndex = Math.min(total - max6, cursor - Math.floor(max6 / 2));
  if (startIndex < 0) {
    startIndex = 0;
  }
  const endIndex = Math.min(startIndex + max6, total);
  return {
    startIndex,
    endIndex
  };
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/select.js
var renderBeep3 = /* @__PURE__ */ render4(beep3, {
  style: "pretty"
});
var renderClearScreen3 = (prevState, options3, columns) => {
  const clearPrompt = cat2(eraseLine3, cursorLeft3);
  if (isNone2(prevState)) {
    return clearPrompt;
  }
  const text10 = "\n".repeat(Math.min(options3.choices.length, options3.maxPerPage)) + options3.message;
  const clearOutput = eraseText(text10, columns);
  return cat2(clearOutput, clearPrompt);
};
var renderChoicePrefix = (nextState, choices, toDisplay, currentIndex, figures2) => {
  let prefix = space2;
  if (currentIndex === toDisplay.startIndex && toDisplay.startIndex > 0) {
    prefix = figures2.arrowUp;
  } else if (currentIndex === toDisplay.endIndex - 1 && toDisplay.endIndex < choices.length) {
    prefix = figures2.arrowDown;
  }
  if (choices[currentIndex].disabled) {
    const annotation = combine11(bold2, blackBright2);
    return nextState.cursor === currentIndex ? pipe(figures2.pointer, annotate2(annotation), cat2(prefix)) : pipe(prefix, cat2(space2));
  }
  return nextState.cursor === currentIndex ? pipe(figures2.pointer, annotate2(cyanBright2), cat2(prefix)) : pipe(prefix, cat2(space2));
};
var renderChoiceTitle = (choice4, isSelected) => {
  const title = text2(choice4.title);
  if (isSelected) {
    return choice4.disabled ? annotate2(title, combine11(underlined2, blackBright2)) : annotate2(title, combine11(underlined2, cyanBright2));
  }
  return choice4.disabled ? annotate2(title, combine11(strikethrough2, blackBright2)) : title;
};
var renderChoiceDescription = (choice4, isSelected) => {
  if (!choice4.disabled && choice4.description && isSelected) {
    return pipe(char2("-"), cat2(space2), cat2(text2(choice4.description)), annotate2(blackBright2));
  }
  return empty32;
};
var renderChoices = (nextState, options3, figures2) => {
  const choices = options3.choices;
  const toDisplay = entriesToDisplay(nextState.cursor, choices.length, options3.maxPerPage);
  const choicesToRender = choices.slice(toDisplay.startIndex, toDisplay.endIndex);
  const docs = map2(choicesToRender, (choice4, currentIndex) => {
    const prefix = renderChoicePrefix(nextState, choicesToRender, toDisplay, currentIndex, figures2);
    const title = renderChoiceTitle(choice4, nextState.cursor === currentIndex);
    const description = renderChoiceDescription(choice4, nextState.cursor === currentIndex);
    return pipe(prefix, cat2(title), cat2(space2), cat2(description));
  });
  return vsep2(docs);
};
var renderOutput3 = (leadingSymbol, trailingSymbol, options3) => {
  const annotateLine = (line5) => annotate2(text2(line5), bold2);
  const prefix = cat2(leadingSymbol, space2);
  return match3(options3.message.split(/\r?\n/), {
    onEmpty: () => hsep2([prefix, trailingSymbol]),
    onNonEmpty: (promptLines) => {
      const lines2 = map2(promptLines, (line5) => annotateLine(line5));
      return pipe(prefix, cat2(nest2(vsep2(lines2), 2)), cat2(space2), cat2(trailingSymbol), cat2(space2));
    }
  });
};
var renderNextFrame3 = (prevState, nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const choices = renderChoices(nextState, options3, figures2);
  const clearScreen = renderClearScreen3(prevState, options3, columns);
  const leadingSymbol = annotate2(text2("?"), cyanBright2);
  const trailingSymbol = annotate2(figures2.pointerSmall, blackBright2);
  const promptMsg = renderOutput3(leadingSymbol, trailingSymbol, options3);
  return pipe(clearScreen, cat2(cursorHide3), cat2(promptMsg), cat2(hardLine2), cat2(choices), render4({
    style: "pretty"
  }));
});
var renderSubmission3 = (state, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const selected = text2(options3.choices[state.cursor].title);
  const clearScreen = renderClearScreen3(some2(state), options3, columns);
  const leadingSymbol = annotate2(figures2.tick, green3);
  const trailingSymbol = annotate2(figures2.ellipsis, blackBright2);
  const promptMsg = renderOutput3(leadingSymbol, trailingSymbol, options3);
  return pipe(clearScreen, cat2(promptMsg), cat2(space2), cat2(annotate2(selected, white3)), cat2(hardLine2), render4({
    style: "pretty"
  }));
});
var initialState2 = {
  cursor: 0
};
var processCursorUp = (state, choices) => {
  if (state.cursor === 0) {
    return succeed6(nextFrame({
      cursor: choices.length - 1
    }));
  }
  return succeed6(nextFrame({
    cursor: state.cursor - 1
  }));
};
var processCursorDown = (state, choices) => {
  if (state.cursor === choices.length - 1) {
    return succeed6(nextFrame({
      cursor: 0
    }));
  }
  return succeed6(nextFrame({
    cursor: state.cursor + 1
  }));
};
var processNext2 = (state, choices) => succeed6(nextFrame({
  cursor: (state.cursor + 1) % choices.length
}));
var select = (options3) => {
  const opts = {
    maxPerPage: 10,
    ...options3
  };
  return custom(initialState2, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep3);
      }
      case "NextFrame": {
        return renderNextFrame3(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission3(nextState, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "k":
      case "up": {
        return processCursorUp(state, opts.choices);
      }
      case "j":
      case "down": {
        return processCursorDown(state, opts.choices);
      }
      case "tab": {
        return processNext2(state, opts.choices);
      }
      case "enter":
      case "return": {
        const selected = opts.choices[state.cursor];
        if (selected.disabled) {
          return succeed6(beep4);
        }
        return succeed6(submit(selected.value));
      }
      default: {
        return succeed6(beep4);
      }
    }
  });
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/text.js
var renderBeep4 = /* @__PURE__ */ render4(beep3, {
  style: "pretty"
});
var renderClearScreen4 = (prevState, options3, columns) => {
  const resetCurrentLine = cat2(eraseLine3, cursorLeft3);
  if (isNone2(prevState)) {
    return resetCurrentLine;
  }
  const clearError = match(prevState.value.error, {
    onNone: () => empty32,
    onSome: (error2) => (
      // If there was an error, move the cursor down to the final error line and
      // then clear all lines of error output
      pipe(
        cursorDown3(lines(error2, columns)),
        // Add a leading newline to the error message to ensure that the corrrect
        // number of error lines are erased
        cat2(eraseText(`
${error2}`, columns))
      )
    )
  });
  const clearOutput = eraseText(options3.message, columns);
  return cat2(clearError, cat2(clearOutput, resetCurrentLine));
};
var renderInput2 = (nextState, options3, submitted) => {
  const annotation = match(nextState.error, {
    onNone: () => submitted ? white3 : combine11(underlined2, cyanBright2),
    onSome: () => red3
  });
  switch (options3.type) {
    case "hidden": {
      return empty32;
    }
    case "password": {
      return annotate2(text2("*".repeat(nextState.value.length)), annotation);
    }
    case "text": {
      return annotate2(text2(nextState.value), annotation);
    }
  }
};
var renderError3 = (nextState, pointer) => match(nextState.error, {
  onNone: () => empty32,
  onSome: (error2) => match3(error2.split(/\r?\n/), {
    onEmpty: () => empty32,
    onNonEmpty: (errorLines) => {
      const annotateLine = (line5) => pipe(text2(line5), annotate2(combine11(italicized2, red3)));
      const prefix = cat2(annotate2(pointer, red3), space2);
      const lines2 = map2(errorLines, (str) => annotateLine(str));
      return pipe(cursorSavePosition3, cat2(hardLine2), cat2(prefix), cat2(align2(vsep2(lines2))), cat2(cursorRestorePosition3));
    }
  })
});
var renderOutput4 = (nextState, leadingSymbol, trailingSymbol, options3, submitted = false) => {
  const annotateLine = (line5) => pipe(text2(line5), annotate2(bold2));
  const promptLines = options3.message.split(/\r?\n/);
  const prefix = cat2(leadingSymbol, space2);
  if (isNonEmptyReadonlyArray(promptLines)) {
    const lines2 = map2(promptLines, (line5) => annotateLine(line5));
    return pipe(prefix, cat2(nest2(vsep2(lines2), 2)), cat2(space2), cat2(trailingSymbol), cat2(space2), cat2(renderInput2(nextState, options3, submitted)));
  }
  return hsep2([prefix, trailingSymbol, renderInput2(nextState, options3, submitted)]);
};
var renderNextFrame4 = (prevState, nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen4(prevState, options3, columns);
  const leadingSymbol = annotate2(text2("?"), cyanBright2);
  const trailingSymbol = annotate2(figures2.pointerSmall, blackBright2);
  const promptMsg = renderOutput4(nextState, leadingSymbol, trailingSymbol, options3);
  const errorMsg = renderError3(nextState, figures2.pointerSmall);
  return pipe(clearScreen, cat2(promptMsg), cat2(errorMsg), cat2(cursorMove3(nextState.offset)), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var renderSubmission4 = (nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen4(some2(nextState), options3, columns);
  const leadingSymbol = annotate2(figures2.tick, green3);
  const trailingSymbol = annotate2(figures2.ellipsis, blackBright2);
  const promptMsg = renderOutput4(nextState, leadingSymbol, trailingSymbol, options3, true);
  return pipe(clearScreen, cat2(promptMsg), cat2(hardLine2), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var processBackspace2 = (currentState) => {
  if (currentState.cursor <= 0) {
    return succeed6(beep4);
  }
  const beforeCursor = currentState.value.slice(0, currentState.cursor - 1);
  const afterCursor = currentState.value.slice(currentState.cursor);
  const cursor = currentState.cursor - 1;
  const value5 = `${beforeCursor}${afterCursor}`;
  return succeed6(nextFrame({
    ...currentState,
    cursor,
    value: value5,
    error: none2()
  }));
};
var processCursorLeft2 = (currentState) => {
  if (currentState.cursor <= 0) {
    return succeed6(beep4);
  }
  const cursor = currentState.cursor - 1;
  const offset = currentState.offset - 1;
  return succeed6(nextFrame({
    ...currentState,
    cursor,
    offset,
    error: none2()
  }));
};
var processCursorRight2 = (currentState) => {
  if (currentState.cursor >= currentState.value.length) {
    return succeed6(beep4);
  }
  const cursor = Math.min(currentState.cursor + 1, currentState.value.length);
  const offset = Math.min(currentState.offset + 1, currentState.value.length);
  return succeed6(nextFrame({
    ...currentState,
    cursor,
    offset,
    error: none2()
  }));
};
var defaultProcessor2 = (input, currentState) => {
  const beforeCursor = currentState.value.slice(0, currentState.cursor);
  const afterCursor = currentState.value.slice(currentState.cursor);
  const value5 = `${beforeCursor}${input}${afterCursor}`;
  const cursor = beforeCursor.length + 1;
  return succeed6(nextFrame({
    ...currentState,
    cursor,
    value: value5,
    error: none2()
  }));
};
var initialState3 = {
  cursor: 0,
  offset: 0,
  value: "",
  error: /* @__PURE__ */ none2()
};
var basePrompt = (options3, type3) => {
  const opts = {
    default: "",
    type: type3,
    validate: succeed6,
    ...options3
  };
  return custom(initialState3, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep4);
      }
      case "NextFrame": {
        return renderNextFrame4(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission4(nextState, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "backspace": {
        return processBackspace2(state);
      }
      case "left": {
        return processCursorLeft2(state);
      }
      case "right": {
        return processCursorRight2(state);
      }
      case "enter":
      case "return": {
        return match10(opts.validate(state.value), {
          onFailure: (error2) => nextFrame({
            ...state,
            error: some2(error2)
          }),
          onSuccess: submit
        });
      }
      default: {
        const value5 = getOrElse(input.input, () => "");
        return defaultProcessor2(value5, state);
      }
    }
  });
};
var hidden = (options3) => basePrompt(options3, "hidden").pipe(map24(fromString2));
var text6 = (options3) => basePrompt(options3, "text");

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/toggle.js
var renderBeep5 = /* @__PURE__ */ render4(beep3, {
  style: "pretty"
});
var renderClearScreen5 = (prevState, options3, columns) => {
  const clearPrompt = cat2(eraseLine3, cursorLeft3);
  if (isNone2(prevState)) {
    return clearPrompt;
  }
  const clearOutput = eraseText(options3.message, columns);
  return cat2(clearOutput, clearPrompt);
};
var renderToggle = (value5, options3, submitted = false) => {
  const separator = pipe(char2("/"), annotate2(blackBright2));
  const selectedAnnotation = combine11(underlined2, submitted ? white3 : cyanBright2);
  const inactive = value5 ? text2(options3.inactive) : annotate2(text2(options3.inactive), selectedAnnotation);
  const active2 = value5 ? annotate2(text2(options3.active), selectedAnnotation) : text2(options3.active);
  return hsep2([active2, separator, inactive]);
};
var renderOutput5 = (toggle3, leadingSymbol, trailingSymbol, options3) => {
  const annotateLine = (line5) => pipe(text2(line5), annotate2(bold2));
  const promptLines = options3.message.split(/\r?\n/);
  const prefix = cat2(leadingSymbol, space2);
  if (isNonEmptyReadonlyArray(promptLines)) {
    const lines2 = map2(promptLines, (line5) => annotateLine(line5));
    return pipe(prefix, cat2(nest2(vsep2(lines2), 2)), cat2(space2), cat2(trailingSymbol), cat2(space2), cat2(toggle3));
  }
  return hsep2([prefix, trailingSymbol, toggle3]);
};
var renderNextFrame5 = (prevState, nextState, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen5(prevState, options3, columns);
  const leadingSymbol = annotate2(text2("?"), cyanBright2);
  const trailingSymbol = annotate2(figures2.pointerSmall, blackBright2);
  const toggle3 = renderToggle(nextState.value, options3);
  const promptMsg = renderOutput5(toggle3, leadingSymbol, trailingSymbol, options3);
  return pipe(clearScreen, cat2(cursorHide3), cat2(promptMsg), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var renderSubmission5 = (nextState, value5, options3) => gen2(function* (_) {
  const terminal = yield* _(Terminal);
  const figures2 = yield* _(figures);
  const columns = yield* _(terminal.columns);
  const clearScreen = renderClearScreen5(some2(nextState), options3, columns);
  const leadingSymbol = annotate2(figures2.tick, green3);
  const trailingSymbol = annotate2(figures2.ellipsis, blackBright2);
  const toggle3 = renderToggle(value5, options3, true);
  const promptMsg = renderOutput5(toggle3, leadingSymbol, trailingSymbol, options3);
  return pipe(clearScreen, cat2(promptMsg), cat2(hardLine2), optimize3(Deep), render4({
    style: "pretty"
  }));
});
var activate = /* @__PURE__ */ succeed6(/* @__PURE__ */ nextFrame({
  value: true
}));
var deactivate = /* @__PURE__ */ succeed6(/* @__PURE__ */ nextFrame({
  value: false
}));
var toggle2 = (options3) => {
  const opts = {
    initial: false,
    active: "on",
    inactive: "off",
    ...options3
  };
  return custom({
    value: opts.initial
  }, (prevState, nextState, action) => {
    switch (action._tag) {
      case "Beep": {
        return succeed6(renderBeep5);
      }
      case "NextFrame": {
        return renderNextFrame5(prevState, nextState, opts);
      }
      case "Submit": {
        return renderSubmission5(nextState, action.value, opts);
      }
    }
  }, (input, state) => {
    switch (input.key.name) {
      case "0":
      case "j":
      case "delete":
      case "right":
      case "down": {
        return deactivate;
      }
      case "1":
      case "k":
      case "left":
      case "up": {
        return activate;
      }
      case " ":
      case "tab": {
        return state.value ? deactivate : activate;
      }
      case "enter":
      case "return": {
        return succeed6(submit(state.value));
      }
      default: {
        return succeed6(beep4);
      }
    }
  });
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/primitive.js
var PrimitiveSymbolKey = "@effect/cli/Primitive";
var PrimitiveTypeId = /* @__PURE__ */ Symbol.for(PrimitiveSymbolKey);
var proto18 = {
  [PrimitiveTypeId]: {
    _A: (_) => _
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isPrimitive = (u) => typeof u === "object" && u != null && PrimitiveTypeId in u;
var isBool = (self) => isPrimitive(self) && isBoolType(self);
var isBoolType = (self) => self._tag === "Bool";
var trueValues = /* @__PURE__ */ literal("true", "1", "y", "yes", "on");
var isTrueValue = /* @__PURE__ */ is2(trueValues);
var falseValues = /* @__PURE__ */ literal("false", "0", "n", "no", "off");
var isFalseValue = /* @__PURE__ */ is2(falseValues);
var boolean2 = (defaultValue) => {
  const op = Object.create(proto18);
  op._tag = "Bool";
  op.defaultValue = defaultValue;
  return op;
};
var choice = (alternatives) => {
  const op = Object.create(proto18);
  op._tag = "Choice";
  op.alternatives = alternatives;
  return op;
};
var date2 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto18);
  op._tag = "DateTime";
  return op;
})();
var float2 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto18);
  op._tag = "Float";
  return op;
})();
var integer2 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto18);
  op._tag = "Integer";
  return op;
})();
var path = (pathType, pathExists) => {
  const op = Object.create(proto18);
  op._tag = "Path";
  op.pathType = pathType;
  op.pathExists = pathExists;
  return op;
};
var secret = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto18);
  op._tag = "Secret";
  return op;
})();
var text7 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto18);
  op._tag = "Text";
  return op;
})();
var getChoices = (self) => getChoicesInternal(self);
var getHelp = (self) => getHelpInternal(self);
var getTypeName = (self) => getTypeNameInternal(self);
var validate4 = /* @__PURE__ */ dual(3, (self, value5, config) => validateInternal(self, value5, config));
var wizard = /* @__PURE__ */ dual(2, (self, help) => wizardInternal(self, help));
var getChoicesInternal = (self) => {
  switch (self._tag) {
    case "Bool": {
      return some2("true | false");
    }
    case "Choice": {
      const choices = pipe(map2(self.alternatives, ([choice4]) => choice4), join(" | "));
      return some2(choices);
    }
    case "DateTime": {
      return some2("date");
    }
    case "Float":
    case "Integer":
    case "Path":
    case "Secret":
    case "Text": {
      return none2();
    }
  }
};
var getHelpInternal = (self) => {
  switch (self._tag) {
    case "Bool": {
      return text5("A true or false value.");
    }
    case "Choice": {
      const choices = pipe(map2(self.alternatives, ([choice4]) => choice4), join(", "));
      return text5(`One of the following: ${choices}`);
    }
    case "DateTime": {
      return text5("A date without a time-zone in the ISO-8601 format, such as 2007-12-03T10:15:30.");
    }
    case "Float": {
      return text5("A floating point number.");
    }
    case "Integer": {
      return text5("An integer.");
    }
    case "Path": {
      if (self.pathType === "either" && self.pathExists === "yes") {
        return text5("An existing file or directory.");
      }
      if (self.pathType === "file" && self.pathExists === "yes") {
        return text5("An existing file.");
      }
      if (self.pathType === "directory" && self.pathExists === "yes") {
        return text5("An existing directory.");
      }
      if (self.pathType === "either" && self.pathExists === "no") {
        return text5("A file or directory that must not exist.");
      }
      if (self.pathType === "file" && self.pathExists === "no") {
        return text5("A file that must not exist.");
      }
      if (self.pathType === "directory" && self.pathExists === "no") {
        return text5("A directory that must not exist.");
      }
      if (self.pathType === "either" && self.pathExists === "either") {
        return text5("A file or directory.");
      }
      if (self.pathType === "file" && self.pathExists === "either") {
        return text5("A file.");
      }
      if (self.pathType === "directory" && self.pathExists === "either") {
        return text5("A directory.");
      }
      throw new Error(`[BUG]: Path.help - encountered invalid combination of path type ('${self.pathType}') and path existence ('${self.pathExists}')`);
    }
    case "Secret": {
      return text5("A user-defined piece of text that is confidential.");
    }
    case "Text": {
      return text5("A user-defined piece of text.");
    }
  }
};
var getTypeNameInternal = (self) => {
  switch (self._tag) {
    case "Bool": {
      return "boolean";
    }
    case "Choice": {
      return "choice";
    }
    case "DateTime": {
      return "date";
    }
    case "Float": {
      return "float";
    }
    case "Integer": {
      return "integer";
    }
    case "Path": {
      if (self.pathType === "either") {
        return "path";
      }
      return self.pathType;
    }
    case "Secret": {
      return "secret";
    }
    case "Text": {
      return "text";
    }
  }
};
var validateInternal = (self, value5, config) => {
  switch (self._tag) {
    case "Bool": {
      return map(value5, (str) => normalizeCase(config, str)).pipe(match({
        onNone: () => orElseFail2(self.defaultValue, () => `Missing default value for boolean parameter`),
        onSome: (value6) => isTrueValue(value6) ? succeed6(true) : isFalseValue(value6) ? succeed6(false) : fail6(`Unable to recognize '${value6}' as a valid boolean`)
      }));
    }
    case "Choice": {
      return orElseFail2(value5, () => `Choice options to not have a default value`).pipe(flatMap8((value6) => findFirst(self.alternatives, ([choice4]) => choice4 === value6)), mapBoth2({
        onFailure: () => {
          const choices = pipe(map2(self.alternatives, ([choice4]) => choice4), join(", "));
          return `Expected one of the following cases: ${choices}`;
        },
        onSuccess: ([, value6]) => value6
      }));
    }
    case "DateTime": {
      return attempt(value5, getTypeNameInternal(self), parse(_Date));
    }
    case "Float": {
      return attempt(value5, getTypeNameInternal(self), parse(NumberFromString));
    }
    case "Integer": {
      const intFromString = compose2(NumberFromString, Int);
      return attempt(value5, getTypeNameInternal(self), parse(intFromString));
    }
    case "Path": {
      return flatMap8(FileSystem, (fileSystem) => {
        const errorMsg = "Path options do not have a default value";
        return orElseFail2(value5, () => errorMsg).pipe(tap2((path2) => orDie2(fileSystem.exists(path2)).pipe(tap2((pathExists) => validatePathExistence(path2, self.pathExists, pathExists).pipe(zipRight3(validatePathType(path2, self.pathType, fileSystem).pipe(when2(() => self.pathExists !== "no" && pathExists))))))));
      });
    }
    case "Secret": {
      return attempt(value5, getTypeNameInternal(self), parse(string2)).pipe(map13((value6) => fromString2(value6)));
    }
    case "Text": {
      return attempt(value5, getTypeNameInternal(self), parse(string2));
    }
  }
};
var attempt = (option4, typeName, parse4) => orElseFail2(option4, () => `${typeName} options do not have a default value`).pipe(flatMap8((value5) => orElseFail2(parse4(value5), () => `'${value5}' is not a ${typeName}`)));
var validatePathExistence = (path2, shouldPathExist, pathExists) => {
  if (shouldPathExist === "no" && pathExists) {
    return fail6(`Path '${path2}' must not exist`);
  }
  if (shouldPathExist === "yes" && !pathExists) {
    return fail6(`Path '${path2}' must exist`);
  }
  return unit4;
};
var validatePathType = (path2, pathType, fileSystem) => {
  switch (pathType) {
    case "file": {
      const checkIsFile = fileSystem.stat(path2).pipe(map13((info2) => info2.type === "File"), orDie2);
      return fail6(`Expected path '${path2}' to be a regular file`).pipe(unlessEffect2(checkIsFile), asUnit2);
    }
    case "directory": {
      const checkIsDirectory = fileSystem.stat(path2).pipe(map13((info2) => info2.type === "Directory"), orDie2);
      return fail6(`Expected path '${path2}' to be a directory`).pipe(unlessEffect2(checkIsDirectory), asUnit2);
    }
    case "either": {
      return unit4;
    }
  }
};
var wizardInternal = (self, help) => {
  switch (self._tag) {
    case "Bool": {
      const primitiveHelp = p("Select true or false");
      const message = sequence(help, primitiveHelp);
      const initial = getOrElse(self.defaultValue, () => false);
      return toggle2({
        message: toAnsiText(message).trimEnd(),
        initial,
        active: "true",
        inactive: "false"
      }).pipe(map24((bool) => `${bool}`));
    }
    case "Choice": {
      const primitiveHelp = p("Select one of the following choices");
      const message = sequence(help, primitiveHelp);
      return select({
        message: toAnsiText(message).trimEnd(),
        choices: map2(self.alternatives, ([title]) => ({
          title,
          value: title
        }))
      });
    }
    case "DateTime": {
      const primitiveHelp = p("Enter a date");
      const message = sequence(help, primitiveHelp);
      return date({
        message: toAnsiText(message).trimEnd()
      }).pipe(map24((date5) => date5.toISOString()));
    }
    case "Float": {
      const primitiveHelp = p("Enter a floating point value");
      const message = sequence(help, primitiveHelp);
      return float({
        message: toAnsiText(message).trimEnd()
      }).pipe(map24((value5) => `${value5}`));
    }
    case "Integer": {
      const primitiveHelp = p("Enter an integer");
      const message = sequence(help, primitiveHelp);
      return integer({
        message: toAnsiText(message).trimEnd()
      }).pipe(map24((value5) => `${value5}`));
    }
    case "Path": {
      const primitiveHelp = p("Enter a file system path");
      const message = sequence(help, primitiveHelp);
      return text6({
        message: toAnsiText(message).trimEnd()
      });
    }
    case "Secret": {
      const primitiveHelp = p("Enter some text (value will be hidden)");
      const message = sequence(help, primitiveHelp);
      return hidden({
        message: toAnsiText(message).trimEnd()
      });
    }
    case "Text": {
      const primitiveHelp = p("Enter some text");
      const message = sequence(help, primitiveHelp);
      return text6({
        message: toAnsiText(message).trimEnd()
      });
    }
  }
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/usage.js
var empty37 = {
  _tag: "Empty"
};
var mixed = {
  _tag: "Empty"
};
var named = (names, acceptedValues) => ({
  _tag: "Named",
  names,
  acceptedValues
});
var optional2 = (self) => ({
  _tag: "Optional",
  usage: self
});
var repeated2 = (self) => ({
  _tag: "Repeated",
  usage: self
});
var alternation = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: "Alternation",
  left: self,
  right: that
}));
var concat4 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: "Concat",
  left: self,
  right: that
}));
var getHelp2 = (self) => {
  const spans2 = enumerate(self, defaultConfig);
  if (isNonEmptyReadonlyArray(spans2)) {
    const head6 = headNonEmpty(spans2);
    const tail = tailNonEmpty(spans2);
    if (isNonEmptyReadonlyArray(tail)) {
      return pipe(map2(spans2, (span2) => p(span2)), reduceRight(empty36, (left3, right3) => sequence(left3, right3)));
    }
    return p(head6);
  }
  return empty36;
};
var enumerate = /* @__PURE__ */ dual(2, (self, config) => render5(simplify(self, config), config));
var simplify = (self, config) => {
  switch (self._tag) {
    case "Empty": {
      return empty37;
    }
    case "Mixed": {
      return mixed;
    }
    case "Named": {
      if (isNone2(head(render5(self, config)))) {
        return empty37;
      }
      return self;
    }
    case "Optional": {
      if (self.usage._tag === "Empty") {
        return empty37;
      }
      const usage = simplify(self.usage, config);
      return usage._tag === "Empty" ? empty37 : optional2(usage);
    }
    case "Repeated": {
      const usage = simplify(self.usage, config);
      return usage._tag === "Empty" ? empty37 : repeated2(usage);
    }
    case "Alternation": {
      const leftUsage = simplify(self.left, config);
      const rightUsage = simplify(self.right, config);
      return leftUsage._tag === "Empty" ? rightUsage : rightUsage._tag === "Empty" ? leftUsage : alternation(leftUsage, rightUsage);
    }
    case "Concat": {
      const leftUsage = simplify(self.left, config);
      const rightUsage = simplify(self.right, config);
      return leftUsage._tag === "Empty" ? rightUsage : rightUsage._tag === "Empty" ? leftUsage : concat4(leftUsage, rightUsage);
    }
  }
};
var render5 = (self, config) => {
  switch (self._tag) {
    case "Empty": {
      return of(text5(""));
    }
    case "Mixed": {
      return of(text5("<command>"));
    }
    case "Named": {
      const typeInfo = config.showTypes ? match(self.acceptedValues, {
        onNone: () => empty35,
        onSome: (s) => concat3(space3, text5(s))
      }) : empty35;
      const namesToShow = config.showAllNames ? self.names : self.names.length > 1 ? pipe(filter2(self.names, (name) => name.startsWith("--")), head, map(of), getOrElse(() => self.names)) : self.names;
      const nameInfo = text5(join(namesToShow, ", "));
      return config.showAllNames && self.names.length > 1 ? of(spans([text5("("), nameInfo, typeInfo, text5(")")])) : of(concat3(nameInfo, typeInfo));
    }
    case "Optional": {
      return map2(render5(self.usage, config), (span2) => spans([text5("["), span2, text5("]")]));
    }
    case "Repeated": {
      return map2(render5(self.usage, config), (span2) => concat3(span2, text5("...")));
    }
    case "Alternation": {
      if (self.left._tag === "Repeated" || self.right._tag === "Repeated" || self.left._tag === "Concat" || self.right._tag === "Concat") {
        return appendAll(render5(self.left, config), render5(self.right, config));
      }
      return flatMap2(render5(self.left, config), (left3) => map2(render5(self.right, config), (right3) => spans([left3, text5("|"), right3])));
    }
    case "Concat": {
      const leftSpan = render5(self.left, config);
      const rightSpan = render5(self.right, config);
      const separator = isNonEmptyReadonlyArray(leftSpan) && isNonEmptyReadonlyArray(rightSpan) ? space3 : empty35;
      return flatMap2(leftSpan, (left3) => map2(rightSpan, (right3) => spans([left3, separator, right3])));
    }
  }
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/validationError.js
var ValidationErrorSymbolKey = "@effect/cli/ValidationError";
var ValidationErrorTypeId = /* @__PURE__ */ Symbol.for(ValidationErrorSymbolKey);
var proto19 = {
  [ValidationErrorTypeId]: ValidationErrorTypeId
};
var isMultipleValuesDetected = (self) => self._tag === "MultipleValuesDetected";
var isMissingValue = (self) => self._tag === "MissingValue";
var correctedFlag = (error2) => {
  const op = Object.create(proto19);
  op._tag = "CorrectedFlag";
  op.error = error2;
  return op;
};
var invalidArgument = (error2) => {
  const op = Object.create(proto19);
  op._tag = "InvalidArgument";
  op.error = error2;
  return op;
};
var invalidValue = (error2) => {
  const op = Object.create(proto19);
  op._tag = "InvalidValue";
  op.error = error2;
  return op;
};
var missingFlag = (error2) => {
  const op = Object.create(proto19);
  op._tag = "MissingFlag";
  op.error = error2;
  return op;
};
var missingValue = (error2) => {
  const op = Object.create(proto19);
  op._tag = "MissingValue";
  op.error = error2;
  return op;
};
var multipleValuesDetected = (error2, values3) => {
  const op = Object.create(proto19);
  op._tag = "MultipleValuesDetected";
  op.error = error2;
  op.values = values3;
  return op;
};
var unclusteredFlag = (error2, unclustered, rest) => {
  const op = Object.create(proto19);
  op._tag = "UnclusteredFlag";
  op.error = error2;
  op.unclustered = unclustered;
  op.rest = rest;
  return op;
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/autoCorrect.js
var levensteinDistance = (first3, second, config) => {
  if (first3.length === 0 && second.length === 0) {
    return 0;
  }
  if (first3.length === 0) {
    return second.length;
  }
  if (second.length === 0) {
    return first3.length;
  }
  const rowCount = first3.length;
  const columnCount = second.length;
  const matrix = new Array(rowCount);
  const normalFirst = normalizeCase(config, first3);
  const normalSecond = normalizeCase(config, second);
  for (let x = 0; x <= rowCount; x++) {
    matrix[x] = new Array(columnCount);
    matrix[x][0] = x;
  }
  for (let y = 0; y <= columnCount; y++) {
    matrix[0][y] = y;
  }
  for (let row = 1; row <= rowCount; row++) {
    for (let col = 1; col <= columnCount; col++) {
      const cost = normalFirst.charAt(row - 1) === normalSecond.charAt(col - 1) ? 0 : 1;
      matrix[row][col] = Math.min(matrix[row][col - 1] + 1, Math.min(matrix[row - 1][col] + 1, matrix[row - 1][col - 1] + cost));
    }
  }
  return matrix[rowCount][columnCount];
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/prompt/list.js
var list3 = (options3) => text6(options3).pipe(map24((output) => output.split(options3.delimiter || ",")));

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/internal/options.js
var OptionsSymbolKey = "@effect/cli/Options";
var OptionsTypeId = /* @__PURE__ */ Symbol.for(OptionsSymbolKey);
var proto20 = {
  [OptionsTypeId]: {
    _A: (_) => _
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isOptions = (u) => typeof u === "object" && u != null && OptionsTypeId in u;
var isInstruction = (self) => self;
var isSingle = (self) => self._tag === "Single";
var isWithDefault = (self) => self._tag === "WithDefault";
var all6 = function() {
  if (arguments.length === 1) {
    if (isOptions(arguments[0])) {
      return map25(arguments[0], (x) => [x]);
    } else if (Array.isArray(arguments[0])) {
      return allTupled(arguments[0]);
    } else {
      const entries2 = Object.entries(arguments[0]);
      let result = map25(entries2[0][1], (value5) => ({
        [entries2[0][0]]: value5
      }));
      if (entries2.length === 1) {
        return result;
      }
      const rest = entries2.slice(1);
      for (const [key2, options3] of rest) {
        result = map25(makeBoth(result, options3), ([record2, value5]) => ({
          ...record2,
          [key2]: value5
        }));
      }
      return result;
    }
  }
  return allTupled(arguments[0]);
};
var defaultBooleanOptions = {
  ifPresent: true,
  negationNames: [],
  aliases: []
};
var boolean3 = (name, options3 = {}) => {
  const {
    aliases,
    ifPresent,
    negationNames
  } = {
    ...defaultBooleanOptions,
    ...options3
  };
  const option4 = makeSingle(name, aliases, boolean2(some2(ifPresent)));
  if (isNonEmptyReadonlyArray(negationNames)) {
    const head6 = headNonEmpty(negationNames);
    const tail = tailNonEmpty(negationNames);
    const negationOption = makeSingle(head6, tail, boolean2(some2(!ifPresent)));
    return withDefault(orElse11(option4, negationOption), !ifPresent);
  }
  return withDefault(option4, !ifPresent);
};
var choice2 = (name, choices) => {
  const primitive = choice(map2(choices, (choice4) => [choice4, choice4]));
  return makeSingle(name, empty(), primitive);
};
var choiceWithValue = (name, choices) => makeSingle(name, empty(), choice(choices));
var date3 = (name) => makeSingle(name, empty(), date2);
var directory = (name, config = {}) => makeSingle(name, empty(), path("directory", config.exists || "either"));
var file = (name, config = {}) => makeSingle(name, empty(), path("file", config.exists || "either"));
var filterMap6 = /* @__PURE__ */ dual(3, (self, f, message) => mapOrFail(self, (a) => match(f(a), {
  onNone: () => left2(invalidValue(p(message))),
  onSome: right2
})));
var float3 = (name) => makeSingle(name, empty(), float2);
var integer3 = (name) => makeSingle(name, empty(), integer2);
var keyValueMap = (option4) => {
  if (typeof option4 === "string") {
    const single2 = makeSingle(option4, empty(), text7);
    return makeKeyValueMap(single2);
  }
  if (!isSingle(option4)) {
    throw new Error("InvalidArgumentException: only single options can be key/value maps");
  } else {
    return makeKeyValueMap(option4);
  }
};
var none11 = /* @__PURE__ */ (() => {
  const op = /* @__PURE__ */ Object.create(proto20);
  op._tag = "Empty";
  return op;
})();
var secret2 = (name) => makeSingle(name, empty(), secret);
var text8 = (name) => makeSingle(name, empty(), text7);
var atLeast = /* @__PURE__ */ dual(2, (self, times2) => makeVariadic(self, some2(times2), none2()));
var atMost = /* @__PURE__ */ dual(2, (self, times2) => makeVariadic(self, none2(), some2(times2)));
var between4 = /* @__PURE__ */ dual(3, (self, min4, max6) => makeVariadic(self, some2(min4), some2(max6)));
var isBool2 = (self) => isBoolInternal(self);
var getHelp3 = (self) => getHelpInternal2(self);
var getIdentifier = (self) => getIdentifierInternal(self);
var getUsage = (self) => getUsageInternal(self);
var map25 = /* @__PURE__ */ dual(2, (self, f) => makeMap(self, (a) => right2(f(a))));
var mapOrFail = /* @__PURE__ */ dual(2, (self, f) => makeMap(self, f));
var mapTryCatch = /* @__PURE__ */ dual(3, (self, f, onError4) => mapOrFail(self, (a) => {
  try {
    return right2(f(a));
  } catch (e) {
    return left2(invalidValue(onError4(e)));
  }
}));
var optional3 = (self) => withDefault(map25(self, some2), none2());
var orElse11 = /* @__PURE__ */ dual(2, (self, that) => orElseEither4(self, that).pipe(map25(merge)));
var orElseEither4 = /* @__PURE__ */ dual(2, (self, that) => makeOrElse(self, that));
var parse2 = /* @__PURE__ */ dual(3, (self, args, config) => parseInternal(self, args, config));
var processCommandLine = /* @__PURE__ */ dual(3, (self, args, config) => matchOptions(args, toParseableInstruction(self), config).pipe(flatMap8(([error2, commandArgs, matchedOptions]) => parseInternal(self, matchedOptions, config).pipe(catchAll2((e) => match(error2, {
  onNone: () => fail6(e),
  onSome: (err) => fail6(err)
})), map13((a) => [error2, commandArgs, a])))));
var repeated3 = (self) => makeVariadic(self, none2(), none2());
var withAlias = /* @__PURE__ */ dual(2, (self, alias) => modifySingle(self, (single2) => {
  const aliases = append(single2.aliases, alias);
  return makeSingle(single2.name, aliases, single2.primitiveType, single2.description, single2.pseudoName);
}));
var withDefault = /* @__PURE__ */ dual(2, (self, fallback) => makeWithDefault(self, fallback));
var withFallbackConfig = /* @__PURE__ */ dual(2, (self, config) => {
  if (isInstruction(self) && isWithDefault(self)) {
    return makeWithDefault(withFallbackConfig(self.options, config), self.fallback);
  }
  return makeWithFallbackConfig(self, config);
});
var withDescription = /* @__PURE__ */ dual(2, (self, desc) => modifySingle(self, (single2) => {
  const description = sequence(single2.description, p(desc));
  return makeSingle(single2.name, single2.aliases, single2.primitiveType, description, single2.pseudoName);
}));
var withPseudoName = /* @__PURE__ */ dual(2, (self, pseudoName) => modifySingle(self, (single2) => makeSingle(single2.name, single2.aliases, single2.primitiveType, single2.description, some2(pseudoName))));
var wizard2 = /* @__PURE__ */ dual(2, (self, config) => wizardInternal2(self, config));
var allTupled = (arg) => {
  if (arg.length === 0) {
    return none11;
  }
  if (arg.length === 1) {
    return map25(arg[0], (x) => [x]);
  }
  let result = map25(arg[0], (x) => [x]);
  for (let i = 1; i < arg.length; i++) {
    const curr = arg[i];
    result = map25(makeBoth(result, curr), ([a, b]) => [...a, b]);
  }
  return result;
};
var getHelpInternal2 = (self) => {
  switch (self._tag) {
    case "Empty": {
      return empty36;
    }
    case "Single": {
      return descriptionList(of([getSpan(getHelp2(getUsageInternal(self))), sequence(p(getHelp(self.primitiveType)), self.description)]));
    }
    case "KeyValueMap": {
      const identifier = getOrThrow(getIdentifierInternal(self.argumentOption));
      return mapDescriptionList(getHelpInternal2(self.argumentOption), (span2, oldBlock) => {
        const header = p("This setting is a property argument which:");
        const single2 = `${identifier} key1=value key2=value2`;
        const multiple = `${identifier} key1=value ${identifier} key2=value2`;
        const description = enumeration([p(`May be specified a single time:  '${single2}'`), p(`May be specified multiple times: '${multiple}'`)]);
        const newBlock = pipe(oldBlock, sequence(header), sequence(description));
        return [span2, newBlock];
      });
    }
    case "Map": {
      return getHelpInternal2(self.options);
    }
    case "Both":
    case "OrElse": {
      return sequence(getHelpInternal2(self.left), getHelpInternal2(self.right));
    }
    case "Variadic": {
      const help = getHelpInternal2(self.argumentOption);
      return mapDescriptionList(help, (oldSpan, oldBlock) => {
        const min4 = getMinSizeInternal(self);
        const max6 = getMaxSizeInternal(self);
        const newSpan = text5(isSome2(self.max) ? ` ${min4} - ${max6}` : min4 === 0 ? "..." : ` ${min4}+`);
        const newBlock = p(isSome2(self.max) ? `This option must be repeated at least ${min4} times and may be repeated up to ${max6} times.` : min4 === 0 ? "This option may be repeated zero or more times." : `This option must be repeated at least ${min4} times.`);
        return [concat3(oldSpan, newSpan), sequence(oldBlock, newBlock)];
      });
    }
    case "WithDefault": {
      return mapDescriptionList(getHelpInternal2(self.options), (span2, block) => {
        const optionalDescription = isOption2(self.fallback) ? match(self.fallback, {
          onNone: () => p("This setting is optional."),
          onSome: () => p(`This setting is optional. Defaults to: ${self.fallback}`)
        }) : p("This setting is optional.");
        return [span2, sequence(block, optionalDescription)];
      });
    }
    case "WithFallbackConfig": {
      return mapDescriptionList(getHelpInternal2(self.options), (span2, block) => [span2, sequence(block, p("This option can be set from environment variables."))]);
    }
  }
};
var getIdentifierInternal = (self) => {
  switch (self._tag) {
    case "Empty": {
      return none2();
    }
    case "Single": {
      return some2(self.fullName);
    }
    case "Both":
    case "OrElse": {
      const ids4 = getSomes([getIdentifierInternal(self.left), getIdentifierInternal(self.right)]);
      return match3(ids4, {
        onEmpty: () => none2(),
        onNonEmpty: (ids5) => some2(join(ids5, ", "))
      });
    }
    case "KeyValueMap":
    case "Variadic": {
      return getIdentifierInternal(self.argumentOption);
    }
    case "Map":
    case "WithFallbackConfig":
    case "WithDefault": {
      return getIdentifierInternal(self.options);
    }
  }
};
var getMinSizeInternal = (self) => {
  switch (self._tag) {
    case "Empty":
    case "WithDefault":
    case "WithFallbackConfig": {
      return 0;
    }
    case "Single":
    case "KeyValueMap": {
      return 1;
    }
    case "Map": {
      return getMinSizeInternal(self.options);
    }
    case "Both": {
      const leftMinSize = getMinSizeInternal(self.left);
      const rightMinSize = getMinSizeInternal(self.right);
      return leftMinSize + rightMinSize;
    }
    case "OrElse": {
      const leftMinSize = getMinSizeInternal(self.left);
      const rightMinSize = getMinSizeInternal(self.right);
      return Math.min(leftMinSize, rightMinSize);
    }
    case "Variadic": {
      const selfMinSize = getOrElse(self.min, () => 0);
      const argumentOptionMinSize = getMinSizeInternal(self.argumentOption);
      return selfMinSize * argumentOptionMinSize;
    }
  }
};
var getMaxSizeInternal = (self) => {
  switch (self._tag) {
    case "Empty": {
      return 0;
    }
    case "Single": {
      return 1;
    }
    case "KeyValueMap": {
      return Number.MAX_SAFE_INTEGER;
    }
    case "Map":
    case "WithDefault":
    case "WithFallbackConfig": {
      return getMaxSizeInternal(self.options);
    }
    case "Both": {
      const leftMaxSize = getMaxSizeInternal(self.left);
      const rightMaxSize = getMaxSizeInternal(self.right);
      return leftMaxSize + rightMaxSize;
    }
    case "OrElse": {
      const leftMin = getMaxSizeInternal(self.left);
      const rightMin = getMaxSizeInternal(self.right);
      return Math.min(leftMin, rightMin);
    }
    case "Variadic": {
      const selfMaxSize = getOrElse(self.max, () => Number.MAX_SAFE_INTEGER / 2);
      const optionsMaxSize = getMaxSizeInternal(self.argumentOption);
      return Math.floor(selfMaxSize * optionsMaxSize);
    }
  }
};
var getUsageInternal = (self) => {
  switch (self._tag) {
    case "Empty": {
      return empty37;
    }
    case "Single": {
      const acceptedValues = isBool(self.primitiveType) ? none2() : orElse(getChoices(self.primitiveType), () => some2(self.placeholder));
      return named(getNames(self), acceptedValues);
    }
    case "KeyValueMap": {
      return getUsageInternal(self.argumentOption);
    }
    case "Map": {
      return getUsageInternal(self.options);
    }
    case "Both": {
      return concat4(getUsageInternal(self.left), getUsageInternal(self.right));
    }
    case "OrElse": {
      return alternation(getUsageInternal(self.left), getUsageInternal(self.right));
    }
    case "Variadic": {
      return repeated2(getUsageInternal(self.argumentOption));
    }
    case "WithDefault":
    case "WithFallbackConfig": {
      return optional2(getUsageInternal(self.options));
    }
  }
};
var isBoolInternal = (self) => {
  switch (self._tag) {
    case "Single": {
      return isBool(self.primitiveType);
    }
    case "Map": {
      return isBoolInternal(self.options);
    }
    case "WithDefault": {
      return isBoolInternal(self.options);
    }
    default: {
      return false;
    }
  }
};
var makeBoth = (left3, right3) => {
  const op = Object.create(proto20);
  op._tag = "Both";
  op.left = left3;
  op.right = right3;
  return op;
};
var makeFullName = (str) => str.length === 1 ? [true, `-${str}`] : [false, `--${str}`];
var makeKeyValueMap = (argumentOption) => {
  const op = Object.create(proto20);
  op._tag = "KeyValueMap";
  op.argumentOption = argumentOption;
  return op;
};
var makeMap = (options3, f) => {
  const op = Object.create(proto20);
  op._tag = "Map";
  op.options = options3;
  op.f = f;
  return op;
};
var makeOrElse = (left3, right3) => {
  const op = Object.create(proto20);
  op._tag = "OrElse";
  op.left = left3;
  op.right = right3;
  return op;
};
var makeSingle = (name, aliases, primitiveType, description = empty36, pseudoName = none2()) => {
  const op = Object.create(proto20);
  op._tag = "Single";
  op.name = name;
  op.fullName = makeFullName(name)[1];
  op.placeholder = `${getOrElse(pseudoName, () => getTypeName(primitiveType))}`;
  op.aliases = aliases;
  op.primitiveType = primitiveType;
  op.description = description;
  op.pseudoName = pseudoName;
  return op;
};
var makeVariadic = (argumentOption, min4, max6) => {
  if (!isSingle(argumentOption)) {
    throw new Error("InvalidArgumentException: only single options can be variadic");
  }
  const op = Object.create(proto20);
  op._tag = "Variadic";
  op.argumentOption = argumentOption;
  op.min = min4;
  op.max = max6;
  return op;
};
var makeWithDefault = (options3, fallback) => {
  const op = Object.create(proto20);
  op._tag = "WithDefault";
  op.options = options3;
  op.fallback = fallback;
  return op;
};
var makeWithFallbackConfig = (options3, config) => {
  const op = Object.create(proto20);
  op._tag = "WithFallbackConfig";
  op.options = options3;
  op.config = config;
  return op;
};
var modifySingle = (self, f) => {
  switch (self._tag) {
    case "Empty": {
      return none11;
    }
    case "Single": {
      return f(self);
    }
    case "KeyValueMap": {
      return makeKeyValueMap(f(self.argumentOption));
    }
    case "Map": {
      return makeMap(modifySingle(self.options, f), self.f);
    }
    case "Both": {
      return makeBoth(modifySingle(self.left, f), modifySingle(self.right, f));
    }
    case "OrElse": {
      return makeOrElse(modifySingle(self.left, f), modifySingle(self.right, f));
    }
    case "Variadic": {
      return makeVariadic(f(self.argumentOption), self.min, self.max);
    }
    case "WithDefault": {
      return makeWithDefault(modifySingle(self.options, f), self.fallback);
    }
    case "WithFallbackConfig": {
      return makeWithFallbackConfig(modifySingle(self.options, f), self.config);
    }
  }
};
var getNames = (self) => {
  const loop3 = (self2) => {
    switch (self2._tag) {
      case "Empty": {
        return empty();
      }
      case "Single": {
        return prepend(self2.aliases, self2.name);
      }
      case "KeyValueMap":
      case "Variadic": {
        return loop3(self2.argumentOption);
      }
      case "Map":
      case "WithDefault":
      case "WithFallbackConfig": {
        return loop3(self2.options);
      }
      case "Both":
      case "OrElse": {
        const left3 = loop3(self2.left);
        const right3 = loop3(self2.right);
        return appendAll(left3, right3);
      }
    }
  };
  const order = mapInput2(boolean, (tuple5) => !tuple5[0]);
  return pipe(loop3(self), map2((str) => makeFullName(str)), sort(order), map2((tuple5) => tuple5[1]));
};
var toParseableInstruction = (self) => {
  switch (self._tag) {
    case "Empty": {
      return empty();
    }
    case "Single":
    case "KeyValueMap":
    case "Variadic": {
      return of(self);
    }
    case "Map":
    case "WithDefault":
    case "WithFallbackConfig": {
      return toParseableInstruction(self.options);
    }
    case "Both":
    case "OrElse": {
      return appendAll(toParseableInstruction(self.left), toParseableInstruction(self.right));
    }
  }
};
var parseInternal = (self, args, config) => {
  switch (self._tag) {
    case "Empty": {
      return unit4;
    }
    case "Single": {
      const singleNames = filterMap2(getNames(self), (name) => get7(args, name));
      if (isNonEmptyReadonlyArray(singleNames)) {
        const head6 = headNonEmpty(singleNames);
        const tail = tailNonEmpty(singleNames);
        if (isEmptyReadonlyArray(tail)) {
          if (isEmptyReadonlyArray(head6)) {
            return validate4(self.primitiveType, none2(), config).pipe(mapError2((e) => invalidValue(p(e))));
          }
          if (isNonEmptyReadonlyArray(head6) && isEmptyReadonlyArray(tailNonEmpty(head6))) {
            const value5 = headNonEmpty(head6);
            return validate4(self.primitiveType, some2(value5), config).pipe(mapError2((e) => invalidValue(p(e))));
          }
          return fail6(multipleValuesDetected(empty36, head6));
        }
        const error3 = p(`More than one reference to option '${self.fullName}' detected`);
        return fail6(invalidValue(error3));
      }
      const error2 = p(`Expected to find option: '${self.fullName}'`);
      return fail6(missingValue(error2));
    }
    case "KeyValueMap": {
      const extractKeyValue = (value5) => {
        const split2 = value5.trim().split("=");
        if (isNonEmptyReadonlyArray(split2) && split2.length === 2 && split2[1] !== "") {
          return succeed6(split2);
        }
        const error2 = p(`Expected a key/value pair but received '${value5}'`);
        return fail6(invalidArgument(error2));
      };
      return parseInternal(self.argumentOption, args, config).pipe(matchEffect2({
        onFailure: (e) => isMultipleValuesDetected(e) ? forEach8(e.values, (kv) => extractKeyValue(kv)).pipe(map13(fromIterable6)) : fail6(e),
        onSuccess: (kv) => extractKeyValue(kv).pipe(map13(make13))
      }));
    }
    case "Map": {
      return parseInternal(self.options, args, config).pipe(flatMap8((a) => self.f(a)));
    }
    case "Both": {
      return parseInternal(self.left, args, config).pipe(catchAll2((err1) => parseInternal(self.right, args, config).pipe(matchEffect2({
        onFailure: (err2) => {
          const error2 = sequence(err1.error, err2.error);
          return fail6(missingValue(error2));
        },
        onSuccess: () => fail6(err1)
      }))), zip5(parseInternal(self.right, args, config)));
    }
    case "OrElse": {
      return parseInternal(self.left, args, config).pipe(matchEffect2({
        onFailure: (err1) => parseInternal(self.right, args, config).pipe(mapBoth2({
          onFailure: (err2) => (
            // orElse option is only missing in case neither option was given
            isMissingValue(err1) && isMissingValue(err2) ? missingValue(sequence(err1.error, err2.error)) : invalidValue(sequence(err1.error, err2.error))
          ),
          onSuccess: (b) => right2(b)
        })),
        onSuccess: (a) => parseInternal(self.right, args, config).pipe(matchEffect2({
          onFailure: () => succeed6(left2(a)),
          onSuccess: () => {
            const leftUid = getOrElse(getIdentifierInternal(self.left), () => "???");
            const rightUid = getOrElse(getIdentifierInternal(self.right), () => "???");
            const error2 = p(`Collision between two options detected - you can only specify one of either: ['${leftUid}', '${rightUid}']`);
            return fail6(invalidValue(error2));
          }
        }))
      }));
    }
    case "Variadic": {
      const min4 = getOrElse(self.min, () => 0);
      const max6 = getOrElse(self.max, () => Number.MAX_SAFE_INTEGER);
      const validateMinMax = (values3) => {
        if (values3.length < min4) {
          const name = self.argumentOption.fullName;
          const error2 = `Expected at least ${min4} value(s) for option: '${name}'`;
          return fail6(invalidValue(p(error2)));
        }
        if (values3.length > max6) {
          const name = self.argumentOption.fullName;
          const error2 = `Expected at most ${max6} value(s) for option: '${name}'`;
          return fail6(invalidValue(p(error2)));
        }
        const primitive = self.argumentOption.primitiveType;
        const validatePrimitive = (value5) => validate4(primitive, some2(value5), config).pipe(mapError2((e) => invalidValue(p(e))));
        return forEach8(values3, (value5) => validatePrimitive(value5));
      };
      return parseInternal(self.argumentOption, args, config).pipe(matchEffect2({
        onFailure: (error2) => isMultipleValuesDetected(error2) ? validateMinMax(error2.values) : fail6(error2),
        onSuccess: (value5) => validateMinMax(of(value5))
      }));
    }
    case "WithDefault": {
      return parseInternal(self.options, args, config).pipe(catchTag2("MissingValue", () => succeed6(self.fallback)));
    }
    case "WithFallbackConfig": {
      return parseInternal(self.options, args, config).pipe(catchTag2("MissingValue", (e) => mapError2(self.config, () => e)));
    }
  }
};
var wizardInternal2 = (self, config) => {
  switch (self._tag) {
    case "Empty": {
      return succeed6(empty());
    }
    case "Single": {
      const help = getHelpInternal2(self);
      return wizard(self.primitiveType, help).pipe(flatMap8((input) => {
        const args = make5(getNames(self)[0], input);
        return parseCommandLine(self, args, config).pipe(as3(args));
      }), zipLeft2(log4()));
    }
    case "KeyValueMap": {
      const message = p("Enter `key=value` pairs separated by spaces");
      return list3({
        message: toAnsiText(message).trim(),
        delimiter: " "
      }).pipe(flatMap8((args) => {
        const identifier = getOrElse(getIdentifierInternal(self), () => "");
        return parseInternal(self, make13([identifier, args]), config).pipe(as3(prepend(args, identifier)));
      }), zipLeft2(log4()));
    }
    case "Map": {
      return wizardInternal2(self.options, config);
    }
    case "Both": {
      return zipWith3(wizardInternal2(self.left, config), wizardInternal2(self.right, config), (left3, right3) => appendAll(left3, right3));
    }
    case "OrElse": {
      const alternativeHelp = p("Select which option you would like to use");
      const message = pipe(getHelpInternal2(self), sequence(alternativeHelp));
      const makeChoice = (title, value5) => ({
        title,
        value: value5
      });
      const choices = getSomes([map(getIdentifierInternal(self.left), (title) => makeChoice(title, self.left)), map(getIdentifierInternal(self.right), (title) => makeChoice(title, self.right))]);
      return select({
        message: toAnsiText(message).trimEnd(),
        choices
      }).pipe(flatMap8((option4) => wizardInternal2(option4, config)));
    }
    case "Variadic": {
      const repeatHelp = p("How many times should this argument should be repeated?");
      const message = pipe(getHelpInternal2(self), sequence(repeatHelp));
      return integer({
        message: toAnsiText(message).trimEnd(),
        min: getMinSizeInternal(self),
        max: getMaxSizeInternal(self)
      }).pipe(flatMap8((n) => make28(empty()).pipe(flatMap8((ref) => wizardInternal2(self.argumentOption, config).pipe(flatMap8((args) => update3(ref, appendAll(args))), repeatN2(n - 1), zipRight3(get12(ref)))))));
    }
    case "WithDefault": {
      if (isBoolInternal(self.options)) {
        return wizardInternal2(self.options, config);
      }
      const defaultHelp = p(`This option is optional - use the default?`);
      const message = pipe(getHelpInternal2(self.options), sequence(defaultHelp));
      return select({
        message: toAnsiText(message).trimEnd(),
        choices: [{
          title: `Default ['${JSON.stringify(self.fallback)}']`,
          value: true
        }, {
          title: "Custom",
          value: false
        }]
      }).pipe(zipLeft2(log4()), flatMap8((useFallback) => useFallback ? succeed6(empty()) : wizardInternal2(self.options, config)));
    }
    case "WithFallbackConfig": {
      if (isBoolInternal(self.options)) {
        return wizardInternal2(self.options, config);
      }
      const defaultHelp = p(`Try load this option from the environment?`);
      const message = pipe(getHelpInternal2(self.options), sequence(defaultHelp));
      return select({
        message: toAnsiText(message).trimEnd(),
        choices: [{
          title: `Use environment variables`,
          value: true
        }, {
          title: "Custom",
          value: false
        }]
      }).pipe(zipLeft2(log4()), flatMap8((useFallback) => useFallback ? succeed6(empty()) : wizardInternal2(self.options, config)));
    }
  }
};
var matchOptions = (input, options3, config) => {
  if (isNonEmptyReadonlyArray(input) && isNonEmptyReadonlyArray(options3)) {
    return findOptions(input, options3, config).pipe(flatMap8(([otherArgs, otherOptions, map1]) => {
      if (isEmpty3(map1)) {
        return succeed6([none2(), input, map1]);
      }
      return matchOptions(otherArgs, otherOptions, config).pipe(map13(([error2, otherArgs2, map27]) => [error2, otherArgs2, merge9(map1, fromIterable(map27))]));
    }), catchAll2((e) => succeed6([some2(e), input, empty8()])));
  }
  return isEmptyReadonlyArray(input) ? succeed6([none2(), empty(), empty8()]) : succeed6([none2(), input, empty8()]);
};
var findOptions = (input, options3, config) => matchLeft(options3, {
  onEmpty: () => succeed6([input, empty(), empty8()]),
  onNonEmpty: (head6, tail) => parseCommandLine(head6, input, config).pipe(flatMap8(({
    leftover: leftover2,
    parsed
  }) => match(parsed, {
    onNone: () => findOptions(leftover2, tail, config).pipe(map13(([nextArgs, nextOptions, map27]) => [nextArgs, prepend(nextOptions, head6), map27])),
    onSome: ({
      name,
      values: values3
    }) => succeed6([leftover2, tail, make13([name, values3])])
  })), catchTags2({
    CorrectedFlag: (e) => findOptions(input, tail, config).pipe(catchSome2(() => some2(fail6(e))), flatMap8(([otherArgs, otherOptions, map27]) => fail6(e).pipe(when2(() => isEmpty3(map27)), as3([otherArgs, prepend(otherOptions, head6), map27])))),
    MissingFlag: () => findOptions(input, tail, config).pipe(map13(([otherArgs, otherOptions, map27]) => [otherArgs, prepend(otherOptions, head6), map27])),
    UnclusteredFlag: (e) => matchUnclustered(e.unclustered, e.rest, options3, config).pipe(catchAll2(() => fail6(e)))
  }))
});
var CLUSTERED_REGEX = /^-{1}([^-]{2,}$)/;
var FLAG_REGEX = /^(--[^=]+)(?:=(.+))?$/;
var processArgs = (args) => matchLeft(args, {
  onEmpty: () => succeed6(empty()),
  onNonEmpty: (head6, tail) => {
    const value5 = head6.trim();
    if (CLUSTERED_REGEX.test(value5)) {
      const unclustered = value5.substring(1).split("").map((c) => `-${c}`);
      return fail6(unclusteredFlag(empty36, unclustered, tail));
    }
    if (FLAG_REGEX.test(value5)) {
      const result = FLAG_REGEX.exec(value5);
      if (result !== null && result[2] !== void 0) {
        return succeed6(appendAll([result[1], result[2]], tail));
      }
    }
    return succeed6(args);
  }
});
var parseCommandLine = (self, args, config) => {
  switch (self._tag) {
    case "Single": {
      return processArgs(args).pipe(flatMap8((args2) => matchLeft(args2, {
        onEmpty: () => {
          const error2 = p(`Expected to find option: '${self.fullName}'`);
          return fail6(missingFlag(error2));
        },
        onNonEmpty: (head6, tail) => {
          const normalize2 = (value5) => normalizeCase(config, value5);
          const normalizedHead = normalize2(head6);
          const normalizedNames = map2(getNames(self), normalize2);
          if (contains2(normalizedNames, normalizedHead)) {
            if (isBool(self.primitiveType)) {
              return matchLeft(tail, {
                onEmpty: () => {
                  const parsed = some2({
                    name: head6,
                    values: empty()
                  });
                  return succeed6({
                    parsed,
                    leftover: tail
                  });
                },
                onNonEmpty: (value5, leftover2) => {
                  if (isTrueValue(value5)) {
                    const parsed2 = some2({
                      name: head6,
                      values: of("true")
                    });
                    return succeed6({
                      parsed: parsed2,
                      leftover: leftover2
                    });
                  }
                  if (isFalseValue(value5)) {
                    const parsed2 = some2({
                      name: head6,
                      values: of("false")
                    });
                    return succeed6({
                      parsed: parsed2,
                      leftover: leftover2
                    });
                  }
                  const parsed = some2({
                    name: head6,
                    values: empty()
                  });
                  return succeed6({
                    parsed,
                    leftover: tail
                  });
                }
              });
            }
            return matchLeft(tail, {
              onEmpty: () => {
                const error3 = p(`Expected a value following option: '${self.fullName}'`);
                return fail6(missingValue(error3));
              },
              onNonEmpty: (value5, leftover2) => {
                const parsed = some2({
                  name: head6,
                  values: of(value5)
                });
                return succeed6({
                  parsed,
                  leftover: leftover2
                });
              }
            });
          }
          if (self.name.length > config.autoCorrectLimit + 1 && levensteinDistance(head6, self.fullName, config) <= config.autoCorrectLimit) {
            const error3 = p(`The flag '${head6}' is not recognized. Did you mean '${self.fullName}'?`);
            return fail6(correctedFlag(error3));
          }
          const error2 = p(`Expected to find option: '${self.fullName}'`);
          return fail6(missingFlag(error2));
        }
      })));
    }
    case "KeyValueMap": {
      const singleNames = map2(getNames(self.argumentOption), (name) => normalizeCase(config, name));
      return matchLeft(args, {
        onEmpty: () => succeed6({
          parsed: none2(),
          leftover: args
        }),
        onNonEmpty: (head6, tail) => {
          const loop3 = (args2) => {
            let keyValues = empty();
            let leftover2 = args2;
            while (isNonEmptyReadonlyArray(leftover2)) {
              const name2 = leftover2[0].trim();
              const normalizedName = normalizeCase(config, name2);
              if (leftover2.length >= 2 && contains2(singleNames, normalizedName)) {
                const keyValue = leftover2[1].trim();
                const [key2, value5] = keyValue.split("=");
                if (key2 !== void 0 && value5 !== void 0 && value5.length > 0) {
                  keyValues = append(keyValues, keyValue);
                  leftover2 = leftover2.slice(2);
                  continue;
                }
              }
              if (name2.includes("=")) {
                const [key2, value5] = name2.split("=");
                if (key2 !== void 0 && value5 !== void 0 && value5.length > 0) {
                  keyValues = append(keyValues, name2);
                  leftover2 = leftover2.slice(1);
                  continue;
                }
              }
              break;
            }
            return [keyValues, leftover2];
          };
          const name = normalizeCase(config, head6);
          if (contains2(singleNames, name)) {
            const [values3, leftover2] = loop3(tail);
            return succeed6({
              parsed: some2({
                name,
                values: values3
              }),
              leftover: leftover2
            });
          }
          return succeed6({
            parsed: none2(),
            leftover: args
          });
        }
      });
    }
    case "Variadic": {
      const singleNames = map2(getNames(self.argumentOption), (name) => normalizeCase(config, name));
      let optionName = void 0;
      let values3 = empty();
      let leftover2 = args;
      while (isNonEmptyReadonlyArray(leftover2)) {
        const name = normalizeCase(config, headNonEmpty(leftover2));
        if (leftover2.length >= 2 && contains2(singleNames, name)) {
          if (optionName === void 0) {
            optionName = name;
          }
          const value5 = leftover2[1];
          if (value5 !== void 0 && value5.length > 0) {
            values3 = append(values3, value5.trim());
            leftover2 = leftover2.slice(2);
            continue;
          }
          break;
        }
      }
      const parsed = fromNullable(optionName).pipe(map((name) => ({
        name,
        values: values3
      })));
      return succeed6({
        parsed,
        leftover: leftover2
      });
    }
  }
};
var matchUnclustered = (input, tail, options3, config) => {
  if (isNonEmptyReadonlyArray(input)) {
    const flag = headNonEmpty(input);
    const otherFlags = tailNonEmpty(input);
    return findOptions(of(flag), options3, config).pipe(flatMap8(([_, opts1, map1]) => {
      if (isEmpty3(map1)) {
        return fail6(unclusteredFlag(empty36, empty(), tail));
      }
      return matchUnclustered(otherFlags, tail, opts1, config).pipe(map13(([_2, opts2, map27]) => [tail, opts2, merge9(map1, fromIterable(map27))]));
    }));
  }
  return succeed6([tail, options3, empty8()]);
};
var merge9 = (map1, map27) => {
  if (isNonEmptyReadonlyArray(map27)) {
    const head6 = headNonEmpty(map27);
    const tail = tailNonEmpty(map27);
    const newMap = match(get7(map1, head6[0]), {
      onNone: () => set3(map1, head6[0], head6[1]),
      onSome: (elems) => set3(map1, head6[0], appendAll(elems, head6[1]))
    });
    return merge9(newMap, tail);
  }
  return map1;
};

// ../../.yarn/__virtual__/@effect-cli-virtual-8b6ccaa812/0/cache/@effect-cli-npm-0.27.0-ebafb7e64b-792d204fa4.zip/node_modules/@effect/cli/dist/esm/Options.js
var Options_exports = {};
__export(Options_exports, {
  OptionsTypeId: () => OptionsTypeId2,
  all: () => all7,
  atLeast: () => atLeast2,
  atMost: () => atMost2,
  between: () => between5,
  boolean: () => boolean4,
  choice: () => choice3,
  choiceWithValue: () => choiceWithValue2,
  date: () => date4,
  directory: () => directory2,
  file: () => file2,
  filterMap: () => filterMap7,
  float: () => float4,
  getHelp: () => getHelp4,
  getIdentifier: () => getIdentifier2,
  getUsage: () => getUsage2,
  integer: () => integer4,
  isBool: () => isBool3,
  isOptions: () => isOptions2,
  keyValueMap: () => keyValueMap2,
  map: () => map26,
  mapOrFail: () => mapOrFail2,
  mapTryCatch: () => mapTryCatch2,
  none: () => none12,
  optional: () => optional4,
  orElse: () => orElse12,
  orElseEither: () => orElseEither5,
  parse: () => parse3,
  processCommandLine: () => processCommandLine2,
  repeated: () => repeated4,
  secret: () => secret3,
  text: () => text9,
  withAlias: () => withAlias2,
  withDefault: () => withDefault2,
  withDescription: () => withDescription2,
  withFallbackConfig: () => withFallbackConfig2,
  withPseudoName: () => withPseudoName2,
  wizard: () => wizard3
});
var OptionsTypeId2 = OptionsTypeId;
var isOptions2 = isOptions;
var all7 = all6;
var boolean4 = boolean3;
var choice3 = choice2;
var choiceWithValue2 = choiceWithValue;
var date4 = date3;
var directory2 = directory;
var file2 = file;
var float4 = float3;
var getHelp4 = getHelp3;
var getIdentifier2 = getIdentifier;
var getUsage2 = getUsage;
var integer4 = integer3;
var keyValueMap2 = keyValueMap;
var none12 = none11;
var secret3 = secret2;
var text9 = text8;
var atMost2 = atMost;
var atLeast2 = atLeast;
var between5 = between4;
var filterMap7 = filterMap6;
var isBool3 = isBool2;
var map26 = map25;
var mapOrFail2 = mapOrFail;
var mapTryCatch2 = mapTryCatch;
var optional4 = optional3;
var orElse12 = orElse11;
var orElseEither5 = orElseEither4;
var parse3 = parse2;
var repeated4 = repeated3;
var processCommandLine2 = processCommandLine;
var withAlias2 = withAlias;
var withDefault2 = withDefault;
var withFallbackConfig2 = withFallbackConfig;
var withDescription2 = withDescription;
var withPseudoName2 = withPseudoName;
var wizard3 = wizard2;

// ../index.mts
var CONTRIB_SITE_TEMPLATES = Object.freeze([
  "spa"
  // 'isogr2013', TODO: implement ISO GR static build
]);
var ContribSiteTemplateName = literal(...CONTRIB_SITE_TEMPLATES);

// ../../util/index.mts
var LogLevelSchema = literal("debug", "info", "error", "silent");
var EFFECT_LOG_LEVELS = {
  "debug": LogLevel_exports.Debug,
  "info": LogLevel_exports.Info,
  "error": LogLevel_exports.Error,
  "silent": LogLevel_exports.None
};
var ReportingConfigSchema = struct3({
  logLevel: LogLevelSchema
});
var reportingOptions = {
  verbose: Options_exports.boolean("verbose").pipe(Options_exports.withAlias("v")),
  debug: Options_exports.boolean("debug")
};
var DatasetBuildConfigSchema = struct3({
  datadir: string2.pipe(nonEmpty())
});
var datasetBuildOptions = {
  datadir: Options_exports.directory("datadir", { exists: "yes" }).pipe(
    Options_exports.optional
  )
};
var siteBuildOptions = {
  outdir: Options_exports.directory("outdir"),
  forUsername: Options_exports.text("forusername").pipe(Options_exports.optional),
  // TODO: instead of passing --dataversion, calculate it based on datadir state?
  dataVersion: Options_exports.text("dataversion").pipe(Options_exports.optional),
  siteTemplateName: Options_exports.choice("template", CONTRIB_SITE_TEMPLATES).pipe(
    Options_exports.withDefault(CONTRIB_SITE_TEMPLATES[0])
  ),
  ...reportingOptions,
  ...datasetBuildOptions
};
var SiteBuildConfigSchema = struct3({
  outdir: string2.pipe(nonEmpty()),
  dataVersion: optional(string2.pipe(nonEmpty())),
  forUsername: optional(string2.pipe(nonEmpty())),
  siteTemplatePath: string2.pipe(nonEmpty())
}).pipe(
  extend3(ReportingConfigSchema),
  extend3(DatasetBuildConfigSchema)
);
var readdirRecursive = (dir2, relativeTo) => Effect_exports.gen(function* (_) {
  const fs = yield* _(FileSystem_exports2.FileSystem);
  const dirEntries = yield* _(
    fs.readDirectory(dir2),
    Effect_exports.map((basenames) => basenames.map((name) => join5(dir2, name)))
  );
  const dirEntryStats = yield* _(
    Effect_exports.reduceEffect(
      dirEntries.map((path2) => pipe(
        fs.stat(path2),
        Effect_exports.map((stat3) => ({ [path2]: stat3 }))
      )),
      Effect_exports.succeed({}),
      (accum, item) => ({ ...accum, ...item }),
      { concurrency: 10 }
    )
  );
  const recursiveListings = dirEntries.map(
    (path2) => dirEntryStats[path2]?.type === "Directory" ? readdirRecursive(path2, relativeTo ?? dir2) : Effect_exports.succeed([relative(relativeTo ?? dir2, path2)])
  );
  const entries2 = yield* _(
    Effect_exports.all(recursiveListings, { concurrency: 10 }),
    Effect_exports.map((resultLists) => resultLists.flat())
  );
  return entries2;
});

// build-site-core.mts
var buildSite = (opts) => Effect_exports.all([
  Effect_exports.logDebug(`What\u2019s up, ${opts.outdir} ${opts.packageRoot}`),
  pipe(
    readdirRecursive(opts.datadir),
    Effect_exports.andThen((dirs) => Effect_exports.logDebug(`${JSON.stringify(dirs)}`))
  )
]);
export {
  buildSite
};
