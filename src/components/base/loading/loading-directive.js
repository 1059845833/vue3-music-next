import LoadingView from './LoadingView.vue';
import { createApp } from 'vue';
import { addClass } from '@/assets/js/domJS';
const RELATIVE_CLASS = 'g-relative';
const loadingDirective = {
  mounted(el, binding) {
    const { modifiers, value, arg } = binding;
    console.log(binding);
    const app = createApp(LoadingView, { ...modifiers, title: arg });
    const instance = app.mount(document.createElement('div'));
    el.$instance = instance;
    if (value) {
      // 需要展示
      append(el);
    }
  },
  updated(el, binding) {
    console.log(binding);
    const { value, oldValue } = binding;
    if (value !== oldValue) {
      value ? append(el) : remove(el);
    }
  },
};
function append(el) {
  // el.$instance相当于是一个app,内部的 $el才是其dom结构
  // 让v-loading作用的元素不依赖于其position, 不应该假设此容器是非static的
  if (!['relative', 'fixed', 'absolute'].includes(getComputedStyle(el).position)) {
    addClass(el, RELATIVE_CLASS);
  }
  el.appendChild(el.$instance.$el);
}
function remove(el) {
  el.removeChild(el.$instance.$el);
}
export default loadingDirective;
