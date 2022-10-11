<template>
  <ScrollWrapper class="elevator-list" @scroll="handleScroll" :probeType="3">
    <ul ref="groupRef">
      <li class="group" v-for="{ title, list } in listData" :key="title">
        <h2 class="title">{{ title }}</h2>
        <ul>
          <li v-for="item in list" :key="item.id" class="item">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed">
      <div v-show="currentFixedTitle" class="fixed-title">{{ currentFixedTitle }}</div>
    </div>
  </ScrollWrapper>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useFixed from './use-fixed';
import ScrollWrapper from '../scroll/ScrollWrapper.vue';
const props = defineProps({
  listData: {
    type: Array,
    default: () => [],
  },
});
const { groupRef, handleScroll, currentIndex, currentFixedTitle } = useFixed(props);
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
    z-index: 20;
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
    right: 4px;
    top: 50%;
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
  }
}
</style>
