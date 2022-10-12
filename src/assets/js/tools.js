/**
 * 防抖
 * @param {Function} func
 * @param {Number} delay
 */
function debounce(func, delay = 500) {
  let timer = null;
  function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  }
  return _debounce;
}
/**
 * 节流
 * @param {Function} func
 * @param {Number} delay
 */
function throttle(func, delay = 200) {
  let timer = null;
  return function (...args) {
    //如果为true就触发方法
    if (!timer) {
      func.apply(this, args);
      timer = setTimeout(() => (timer = null), delay);
    }
  };
}
function throttle2(fn, wait = 200) {
  let pre = new Date();
  return function () {
    let context = this;
    let args = arguments;
    let now = new Date();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = now;
    }
  };
}
export { debounce, throttle, throttle2 };
