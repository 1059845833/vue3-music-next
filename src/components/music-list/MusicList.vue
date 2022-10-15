<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="goBackSingerList"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div ref="bgImage" class="bg-image" :style="bgImageStyle">
      <div :style="filterStyle" class="filter"></div>
    </div>
    <ScrollWrapper
      :probe-type="3"
      v-loading:[`加载歌手歌曲中...`].absoulte="loading"
      :style="scrollStyle"
      @scroll="handleScroll"
      class="list"
    >
      <div class="song-list-wrapper">
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollWrapper>
  </div>
</template>

<script setup>
import ScrollWrapper from '@/components/base/scroll/ScrollWrapper.vue';
import SongList from '../base/song-list/SongList.vue';
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  pic: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
// 滚动交互优化
// 1.到顶部40px截止
const scrollY = ref(0);
function handleScroll({ x, y }) {
  scrollY.value = y;
}
const router = useRouter();
const goBackSingerList = () => {
  router.back();
};
// 对图片高度的处理
const RESERVED_HEIGHT = 40;
let maxTranslateY = 20;
const bgImage = ref(null);
const imageHeight = ref(null);
onMounted(() => {
  (bgImage.value.style[`background-image`] = `url(${props.pic})`),
    (imageHeight.value = bgImage.value.clientHeight);
  maxTranslateY = imageHeight.value - RESERVED_HEIGHT;
});
const bgImageStyle = computed(() => {
  let zIndex = 0,
    paddingTop = '70%',
    translateZ = 0,
    scale = 1;
  if (-scrollY.value >= maxTranslateY) {
    zIndex = 10;
    translateZ = 1;
    paddingTop = `${RESERVED_HEIGHT}px`;
  }
  if (scrollY.value > 0) {
    scale = 1 + scrollY.value / imageHeight.value;
  }
  return {
    zIndex,
    transform: `scale(${scale}) translateZ(${translateZ}px)`,
    paddingTop,
  };
});
const filterStyle = computed(() => {
  let backdropFilter = 'blur(0px)';
  if (scrollY.value < 0) {
    const blur = Math.min(15, Math.abs(scrollY.value / imageHeight.value) * 15);
    console.log(blur);
    backdropFilter = `blur(${blur}px)`;
  }
  return {
    backdropFilter,
  };
});
const scrollStyle = computed(() => {
  return {
    top: `${imageHeight.value}px`,
  };
});
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
