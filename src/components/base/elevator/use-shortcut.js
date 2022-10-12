import { computed, ref, onMounted } from 'vue';
import { throttle } from '@/assets/js/tools';
export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18;
  const TOP_PADDING = 20;
  // scrollWrapper组件的实例
  const scrollRef = ref(null);
  // 存储两次滚动的间隔以及计算currentIndex
  const touch = {};

  // tip提示是否显示
  const showTip = ref(false);
  // tip的top值
  const topValue = ref(0);
  // 初始化shortcut元素的顶部距离
  // 处理滑动开始时事件
  const handleTouchstart = function (event) {
    const index = event.target.dataset.index;
    touch.y1 = event.targetTouches[0].pageY;
    touch.index = index;
    scrollTo(index);
    showTip.value = true;
  };
  // 处理滑动中事件
  const handleTouchMove = throttle(function (event) {
    touch.y2 = event.targetTouches[0].pageY;
    // 第一次拖动和当前的偏移量/18等于层级,为正则在其下面,负则在上面
    const deltaY = touch.y2 - touch.y1;
    const delta = Math.floor(deltaY / ANCHOR_HEIGHT);
    // 将上次索引加上当前索引偏移量
    const curIndex = parseInt(touch.index) + delta;
    scrollTo(curIndex);
  }, 150);
  // 滑动结束事件
  const handleTouchEnd = function (event) {
    showTip.value = false;
  };
  // scrollToElement的封装
  function scrollTo(index) {
    const element = groupRef.value.children[index];
    let temp = index * ANCHOR_HEIGHT + TOP_PADDING;
    console.log(temp);
    if (element) {
      console.log(temp);
      topValue.value = temp;
      scrollRef.value.scroll.scrollToElement(element, 0);
    }
  }

  const shortcutList = computed(() => props.listData.map(item => item.title));
  return {
    topValue,
    showTip,
    handleTouchMove,
    handleTouchEnd,
    scrollRef,
    shortcutList,
    handleTouchstart,
  };
}
