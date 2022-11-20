<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner" @click="handleClick">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="handleTouchEnd"
        :style="btnStyle"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
const props = defineProps({
  // 进度,[0,1]
  progress: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['progress-changing', 'progress-changed']);
/* 进度条长度 */
const progress = ref(null);
const progressBtnWidth = 16;
const offset = ref(0);
const progressBar = ref(null);

/* 随着进度条拖动而修正进度样式 */
const progressStyle = computed(() => {
  return `width: ${offset.value}px`;
});
const btnStyle = computed(() => {
  return `transform: translateX(${offset.value}px)`;
});
function getBarWidth() {
  return progressBar.value.clientWidth - progressBtnWidth;
}
// 监听滚动条变化
watch(
  () => props.progress,
  (cur, pre) => {
    const barWidth = getBarWidth();
    offset.value = barWidth * cur;
  },
  {
    // immediate: true,
  },
);
const touch = {};
/* 拖动进度条按钮 */
function handleTouchStart(event) {
  const { clientX } = event.touches[0];
  // 坐标在的水平位置
  touch.x1 = clientX;
  touch.beginWidth = progress.value.clientWidth;
}
function handleTouchMove(event) {
  // 当前水平位置
  const { clientX } = event.touches[0];
  // 减去一开始的水平位置得出偏移量
  const deltaX = clientX - touch.x1;
  // 位移之后进度条的宽度
  const tempWidth = touch.beginWidth + deltaX;
  // 进度条总进度
  const barWidth = getBarWidth();
  // 限定在 [0,1]
  const progressWidth = Math.min(1, Math.max(0, tempWidth / barWidth));
  offset.value = progressWidth * barWidth;
  emit('progress-changing', progressWidth);
}
function handleTouchEnd(event) {
  // 进度条总进度
  const barWidth = getBarWidth();
  const progressWidth = progress.value.clientWidth / barWidth;
  emit('progress-changed', progressWidth);
}

function handleClick(event) {
  // 进度条总进度
  const { clientX } = event;
  const barLeft = progressBar.value.getBoundingClientRect().left;
  const progressPercent = (clientX - barLeft) / getBarWidth();
  emit('progress-changed', progressPercent);
}
</script>
<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
