import { ref, computed, watch, nextTick } from 'vue';
export default function useFixed(props) {
  const TITLE_HEIGHT = 30;
  // group的Element
  const groupRef = ref(null);
  // group每层数据
  const listHeight = ref([]);
  // 滚动的纵坐标
  const scrollY = ref(0);
  // 当前第几层
  const currentIndex = ref(0);
  // 当前层数的title
  const currentFixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return '';
    }
    const x = props.listData[currentIndex.value];
    return x ? x.title : '';
  });
  // 当前位置距离当前层级底部的距离
  const distance = ref(0);
  const fixedStyle = computed(() => {
    return TITLE_HEIGHT > distance.value ? distance.value - TITLE_HEIGHT : 0;
  });
  watch(
    () => props.listData,
    async () => {
      await nextTick();
      listHeight.value = calculate(groupRef.value);
    },
  );
  watch(scrollY, cur => {
    const len = listHeight.value.length - 1;
    for (let i = 0; i < len; ++i) {
      const [top, bottom] = [listHeight.value[i], listHeight.value[i + 1]];
      if (top <= cur && bottom > cur) {
        currentIndex.value = i;
        distance.value = bottom - cur;
        break;
      }
    }
  });
  /**
   * scroll事件处理器
   */
  function handleScroll({ x, y }) {
    scrollY.value = -y;
  }

  return { groupRef, handleScroll, currentIndex, currentFixedTitle, fixedStyle };
}
/**
 * 计算每层的区间高度
 */
function calculate(el) {
  const list = el.children;
  const listHeight = [0];
  let height = 0;
  for (const item of list) {
    height += item.clientHeight;
    listHeight.push(height);
  }
  return listHeight;
}
