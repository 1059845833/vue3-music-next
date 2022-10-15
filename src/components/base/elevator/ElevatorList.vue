<template>
  <ScrollWrapper
    class="elevator-list"
    ref="scrollRef"
    v-bind="{ probeType: 3, click: true }"
    @scroll="handleScroll"
  >
    <ul ref="groupRef">
      <li class="group" v-for="{ title, list } in listData" :key="title">
        <h2 class="title">{{ title }}</h2>
        <ul>
          <li @click="onSingerDetailClick(item)" v-for="item in list" :key="item.id" class="item">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed">
      <div
        class="fixed-title"
        v-show="currentFixedTitle"
        :style="`transform: translateY(${fixedStyle}px)`"
      >
        {{ currentFixedTitle }}
      </div>
    </div>
    <div class="shortcut-wrapper">
      <div class="shortcut" ref="shortcutRef">
        <ul
          @touchstart.stop.prevent="handleTouchstart"
          @touchmove.stop.prevent="handleTouchMove"
          @touchend.stop.prevent="handleTouchEnd"
        >
          <li
            v-for="(item, index) in shortcutList"
            :key="item"
            class="item"
            :data-index="index"
            :class="{ current: currentIndex === index }"
          >
            {{ item }}
          </li>
        </ul>
        <Transition name="fade">
          <div
            v-show="showTip"
            class="tips"
            :style="{
              top: topValue + 'px',
            }"
          >
            {{ currentFixedTitle }}
          </div>
        </Transition>
      </div>
    </div>
  </ScrollWrapper>
</template>

<script setup>
import ScrollWrapper from '../scroll/ScrollWrapper.vue';
import useShortcut from './use-shortcut';
import useFixed from './use-fixed';
const emit = defineEmits(['enter-singer-detail']);
const props = defineProps({
  listData: {
    type: Array,
    default: () => [],
  },
});
const { groupRef, handleScroll, fixedStyle, currentIndex, currentFixedTitle } = useFixed(props);
const {
  shortcutRef,
  showTip,
  topValue,
  scrollRef,
  shortcutList,
  handleTouchstart,
  handleTouchMove,
  handleTouchEnd,
} = useShortcut(props, groupRef);
function onSingerDetailClick(singerItem) {
  emit('enter-singer-detail', singerItem);
}
</script>

<style lang="scss" scoped>
.elevator-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
    .tips {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 1.2em;
    }
    .fade-enter-active {
      animation: fade 0.5s ease;
    }
    .fade-leave-active {
      animation: fade 1s ease reverse;
    }
    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>
