<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="goBackSingerList"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div ref="bgImage" class="bg-image" :style="bgImageStyle">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="randomPlay">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div :style="filterStyle" class="filter"></div>
    </div>
    <ScrollWrapper
      :probe-type="3"
      v-no-result:[`抱歉，没有可播放的歌曲`]="noResult"
      v-loading:[`加载歌手歌曲中...`].absoulte="loading"
      :style="scrollStyle"
      @scroll="handleScroll"
      click
      class="list"
    >
      <div class="song-list-wrapper">
        <SongList @select-song="handleSelectSong" :songs="songs"></SongList>
      </div>
    </ScrollWrapper>
  </div>
</template>

<script setup>
import ScrollWrapper from '@/components/base/scroll/ScrollWrapper.vue';
import SongList from '../base/song-list/SongList.vue';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

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
const goBackSingerList = () => {
  router.back();
};
// 对图片高度的处理
const RESERVED_HEIGHT = 40;
let maxTranslateY = 20;
const bgImage = ref(null);
const imageHeight = ref(null);

onMounted(() => {
  // dom挂在后拿到背景图的clientHeight
  imageHeight.value = bgImage.value.clientHeight;
  maxTranslateY = imageHeight.value - RESERVED_HEIGHT;
});

// 获取到图片高度后,给scroll设置一个top值将其位于图片之下
const scrollStyle = computed(() => {
  return {
    top: `${imageHeight.value}px`,
  };
});

// 背景图style,实现上拖到顶40px时,z-index变大,下拖时图片拉大
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
    backgroundImage: `url(${props.pic})`,
    zIndex,
    transform: `scale(${scale}) translateZ(${translateZ}px)`,
    paddingTop,
  };
});

// 背景图蒙版style,上拉模糊效果
const filterStyle = computed(() => {
  let backdropFilter = 'blur(0px)';
  if (scrollY.value < 0) {
    const blur = Math.min(15, Math.abs(scrollY.value / imageHeight.value) * 15);
    backdropFilter = `blur(${blur}px)`;
  }
  return {
    backdropFilter,
  };
});
// 随机播放按钮,拉到最顶层时不显示,也可以不使用,直接设置bottom = 40px
const playBtnStyle = computed(() => {
  let display = '';
  if (-scrollY.value >= maxTranslateY) {
    display = 'none';
  }
  return { display };
});

// no-result判断
const noResult = computed(() => {
  return !props.loading && !props.songs.length;
});

// selectSong 选择一首歌开始播放,并初始化歌曲列表
function handleSelectSong({ song, index }) {
  // console.log('选择了', song);
  console.log(index);
  store.dispatch('selectPlay', { list: props.songs, index });
}
// 随机播放
function randomPlay() {
  store.dispatch('randomPlay', { list: props.songs });
}
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
