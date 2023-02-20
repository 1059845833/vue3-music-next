<!-- 环形进度条组件 -->
<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="none"
        stroke="#eeeeee"
        stroke-linecap="round"
        :stroke-width="width"
      />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="none"
        stroke-linecap="round"
        :stroke-width="width"
        :stroke="currentColor"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="progress__text">
      <slot name="default" :percentage="showPercentage"> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  radius: {
    type: Number,
    default: 100,
  },
  progress: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  width: {
    type: [Number, String],
    default: '10px',
  },
  color: {
    type: [Array, String],
    default: () => [],
  },
});
const dashArray = ref(Math.PI * 100);
const percentage = computed(() => {
  return props.progress / props.max;
});
const showPercentage = computed(() => Math.floor(100 * percentage.value));
const dashOffset = computed(() => {
  return (1 - percentage.value) * dashArray.value;
});
const currentColor = computed(() => {
  if (typeof props.color === 'string') {
    return props.color;
  }
  for (const { color, percentage } of props.color) {
    if (showPercentage.value <= percentage) {
      return color;
    }
  }
  return '#ffcd32';
});
</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;
  circle {
    transition: all 0.6s;
    // stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
      // 背景环的颜色
      // stroke: #f5f7fa;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      // stroke: $color-theme;
    }
  }
  .progress__text {
    position: absolute;
    top: 0%;
    left: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
  }
}
</style>
