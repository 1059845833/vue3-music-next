import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
// import { getRecommend } from '@/service/recommend';

import { onMounted, ref, onBeforeUnmount } from 'vue';
BScroll.use(Slide);

/**
 * @param {Ref<HTMLElement>} sliderWrapper
 * @returns
 */
function useSlider(sliderWrapper) {
  let slider = null;
  const currentPageIndex = ref(0);
  onMounted(() => {
    slider = new BScroll(sliderWrapper.value, {
      scrollX: true,
      scrollY: false,
      slide: true,
      momentum: false,
      bounce: false,
    });
    slider.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX;
    });
  });
  onBeforeUnmount(() => {
    // console.log('slider销毁');
    slider.destroy();
  });
  return { currentPageIndex };
}

export default useSlider;
