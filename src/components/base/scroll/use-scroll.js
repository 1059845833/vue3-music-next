import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import { onMounted, onBeforeUnmount } from 'vue';
BScroll.use(ObserveDOM);
function useScroll(wrapper, options = {}) {
  //   Object.assign(options, {
  //     observeDOM: true,
  //   });
  let scroll = null;
  onMounted(() => {
    // debugger;
    // 此处 debugger发现初始时内容没加载出来,内容没有高度
    // 因此一开始不会滚动,所以需要使用observerDOM插件
    scroll = new BScroll(wrapper.value, { observeDOM: true, ...options });
  });

  onBeforeUnmount(() => {
    scroll.destroy();
  });
}

export default useScroll;
