import { createApp } from 'vue';
import { addClass } from '@/assets/js/domJS';
const RELATIVE_CLASS = 'g-relative';

// el.$instance被覆盖的问题
export default function createLoadingLikeDirective(Component) {
  // 新增节点
  function append(el) {
    const name = Component.__name;
    // el.$instance相当于是一个app,内部的 $el才是其dom结构
    // 让v-loading作用的元素不依赖于其position, 不应该假设此容器是非static的
    if (!['relative', 'fixed', 'absolute'].includes(getComputedStyle(el).position)) {
      addClass(el[name], RELATIVE_CLASS);
    }
    el.appendChild(el[name].$instance.$el);
  }
  // 删除节点
  function remove(el) {
    const name = Component.__name;
    el.removeChild(el[name].$instance.$el);
  }

  return {
    mounted(el, binding) {
      const { modifiers, value, arg } = binding;
      const app = createApp(Component, { ...modifiers, title: arg });
      const instance = app.mount(document.createElement('div'));

      const name = Component.__name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].$instance = instance;
      if (value) {
        // 一开始就需要展示
        append(el);
      }
    },
    updated(el, binding) {
      const { value, oldValue } = binding;
      if (value !== oldValue) {
        value ? append(el) : remove(el);
      }
    },
  };
}
