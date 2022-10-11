import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import { onMounted, onBeforeUnmount, ref } from 'vue';
BScroll.use(ObserveDOM);
function useScroll(wrapper, options = {}, emits) {
  //   Object.assign(options, {
  //     observeDOM: true,
  //   });
  let scroll = ref(null);
  onMounted(() => {
    // debugger;
    // 此处 debugger发现初始时内容没加载出来,内容没有高度
    // 因此一开始不会滚动,所以需要使用observerDOM插件
    scroll.value = new BScroll(wrapper.value, { observeDOM: true, ...options });
    if ([1, 2, 3].includes(options.probeType)) {
      scroll.value.on('scroll', event => {
        emits('scroll', event);
      });
    }
  });
  onBeforeUnmount(() => {
    scroll.value.destroy();
  });
  return { scroll };
}

export default useScroll;
