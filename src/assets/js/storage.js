/**
 * good-storage v1.1.1
 */

// 解决 Object.assign 的环境依赖
const _extends =
  Object.assign ||
  function (target) {
    // 第一个为target,其余的都是source
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

/**
 * 本地存储实现,封装localStorage和sessionStorage
 */
// 是否有 window
const isServer = typeof window === 'undefined';

const store = {
  storage: !isServer ? window.localStorage : null,
  session: {
    storage: !isServer ? window.sessionStorage : null,
  },
};

const api = {
  set(key, val) {
    if (this.disabled) {
      return;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, serialize(val));
    return val;
  },
  get(key, def) {
    if (this.disabled) {
      return def;
    }
    var val = deserialize(this.storage.getItem(key));
    return val === undefined ? def : val;
  },
  has(key) {
    return this.get(key) !== undefined;
  },
  remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },
  clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  },
  getAll() {
    if (this.disabled) {
      return null;
    }
    var ret = {};
    this.forEach(function (key, val) {
      ret[key] = val;
    });
    return ret;
  },
  forEach(callback) {
    if (this.disabled) {
      return;
    }
    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      callback(key, this.get(key));
    }
  },
};

_extends(store, api);

_extends(store.session, api);

// 序列化
function serialize(val) {
  return JSON.stringify(val);
}

// 反序列化
function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}

try {
  // 测试是否可用
  const testKey = '__storejs__';
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}

export { store as BetterStorage };
