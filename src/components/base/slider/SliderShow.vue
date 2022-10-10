<template>
  <div class="slider" ref="slider">
    <div class="slider-content">
      <div class="slider-page" v-for="item in sliderData" :key="item.id">
        <!-- <a :href="item.link"> -->
        <img :src="item.pic" />
        <!-- </a> -->
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliderData"
        :key="item.id"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useSlider from './use-slider';
const props = defineProps({
  sliderData: {
    type: Array,
    default: () => [],
  },
});
// useSlider hooks
const slider = ref(null);
// 当前页面
const { currentPageIndex } = useSlider(slider);
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;
  .slider-content {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      //   a {
      //     display: block;
      //     width: 100%;
      //   }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 15px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
