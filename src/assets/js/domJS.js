/**
 *
 * @param {HTMLElement} el
 * @param {String} className
 */
function addClass(el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

function addClasses(el, ...classNames) {
  el.classList.add(classNames);
}

function removeClass(el, ...className) {
  el.classList.remove(className);
}
export { addClass, addClasses };
