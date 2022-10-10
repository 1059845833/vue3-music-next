<template>
  <div class="loading" :class="{ absoulte }">
    <div class="loading-content">
      <img :width="side" :height="side" src="@/assets/images/loading.gif" alt="" />
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  side: {
    type: Number,
    default: 30,
  },
  title: {
    type: String,
    default: '加载中...',
  },
  absoulte: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  z-index: 20;
  // 传入absolute则绝对定位
  &.absoulte {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .loading-content {
    .title {
      color: $color-text-ll;
    }
  }
}
</style>
