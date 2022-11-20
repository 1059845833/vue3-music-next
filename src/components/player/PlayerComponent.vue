<template>
  <div class="player">
    <transition
      name="normal"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.pic" alt="" />
        </div>
        <div class="top">
          <div class="back" @click="hideNormalPlayer"><i class="icon-back"></i></div>
          <h1 class="title">{{ currentSong.name }}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <!-- 中间层 -->
        <div class="middle">
          <div class="middle-l">
            <div ref="cdWrapperRef" class="cd-wrapper">
              <div ref="cdRef" class="cd">
                <img
                  ref="cdImageRef"
                  class="image playing"
                  :style="animation"
                  :src="currentSong.pic"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 下方按钮等控件 -->
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :progress="progress"
                ref="barRef"
                @progress-changing="handleProgressChanging"
                @progress-changed="handleProgressChanged"
              ></progress-bar>
            </div>
            <span class="time time-r">{{ formatTime(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i @click="changeMode" :class="modeIcon"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="shiftSong(-1)" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="shiftSong(1)" class="icon-next"></i>
            </div>
            <div class="icon i-right volume">
              <progress-bar
                :progress="volumeProgress"
                @progress-changing="handleVolumeChange"
              ></progress-bar>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- mini-player -->
    <mini-player ref="miniRef" :progress="progress">
      <i @click="togglePlay" :class="playIcon"></i>
    </mini-player>
    <audio
      ref="audioRef"
      @canplay="handleSongReady"
      @timeupdate="timeUpdate"
      @pause="handleAudioPause"
      @ended="handleAudioEnd"
    ></audio>
  </div>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue';
import MiniPlayer from './MiniPlayer.vue';
import { formatTime } from '@/assets/js/utils';
import { PLAY_MODE } from '@/assets/js/constant';
import useMode from './use-mode';
import useAnimation from './useAnimation';
import { useStore } from 'vuex';
import { computed, watch, ref, onMounted } from 'vue';
import * as mutation from '@/assets/js/mutation-types';
/* hooks */
// 播放状态hooks
const { modeIcon, changeMode } = useMode();
const { onEnter, onAfterEnter, onLeave, onAfterLeave, cdWrapperRef } = useAnimation();
// vuex 状态
const store = useStore();
const playing = computed(() => store.state.playing);
const fullScreen = computed(() => store.state.fullScreen);
const currentIndex = computed(() => store.state.currentIndex);
/* currentSong内部也是一个基于currentIndex的computed */
const currentSong = computed(() => store.getters.currentSong);
const playList = computed(() => store.state.playList);
const playMode = computed(() => store.state.playMode);
const currentTime = ref(0); // 当前播放时间
// 音量条
const volumeProgress = ref(0.3);

/* 控制组件播放展示, 并控制其播放暂停  */
// 歌曲audio-dom获取
const audioRef = ref(null);
// 歌曲是否canplay
const songReady = ref(false);
// 监听歌曲,切歌时放新歌
watch(currentSong, (newSong, pre) => {
  // 每次切歌的时候都将songReady设为false
  // 如果缓冲成功,会触发回调自己改为true
  songReady.value = false;
  const audioEl = audioRef.value;
  let src = newSong.url;
  if (!src) {
    src = `/music/music-${Math.floor(Math.random() * 8) + 1}.mp4`;
  }
  // newSong.pic = `/photo/${Math.floor(Math.random() * 4) + 1}.png`;
  audioEl.src = src;
  // volumeProgress.value = 1;
  audioEl.volume = volumeProgress.value;
  audioEl.play();
  store.commit(mutation.SET_PLAYING_STATE, true);
});
watch(playing, cur => {
  if (!songReady.value) {
    return;
  }
  if (cur) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
});
/* audio事件处理 */
function error() {
  songReady.value = true;
}
// 歌曲可以播放了
function handleSongReady(event) {
  if (songReady.value) {
    return;
  }
  songReady.value = true;
}

// 避免歌曲因为电脑原因暂停,导致playing数据混乱
function handleAudioPause() {
  store.commit(mutation.SET_PLAYING_STATE, false);
}
// 歌曲播放完毕跳下一首歌
function handleAudioEnd(event) {
  shiftSong(1);
}
/* 播放状态 */
// 播放按钮
const playIcon = computed(() => {
  return playing.value ? 'icon-pause' : 'icon-play';
});
function togglePlay() {
  if (!songReady.value) {
    return;
  }
  store.commit(mutation.SET_PLAYING_STATE, !playing.value);
}
// 播放时候执行旋转动画
const animation = computed(() => {
  if (playing.value) {
    return 'animation-play-state: running';
  }
  return 'animation-play-state: paused';
});
// 切换歌曲,上一首,下一首,如果只有一首歌就循环播放
function shiftSong(offset) {
  if (!songReady.value) {
    return;
  }
  // 如果只有一首歌,或者是单曲循环
  if (playList.value.length === 1 || playMode.value === PLAY_MODE.loop) {
    const audioEl = audioRef.value;
    audioEl.currentTime = 0;
    audioEl.play();
    return;
  }
  // 获取下一首歌的下标是当前下标+1
  let index = currentIndex.value + offset;
  // 如果到尾了从头开始
  if (index === playList.value.length) {
    index = 0;
  } else if (index < 0) {
    // 到头了从尾开始
    index = playList.value.length - 1;
  }
  store.commit(mutation.SET_CURRENT_INDEX, index);
  // 如果当前是暂停的,改为播放
}

let autoChanging = true;
// currentTime修改
function timeUpdate(event) {
  autoChanging && (currentTime.value = event.target.currentTime);
}
// 进度条,是一个百分比值,
const progress = computed(() => {
  return currentTime.value / currentSong.value.duration;
});
function handleProgressChanging(progress) {
  autoChanging = false;
  currentTime.value = currentSong.value.duration * progress;
}
function handleProgressChanged(progress) {
  autoChanging = true;
  audioRef.value.currentTime = currentSong.value.duration * progress;
  if (!playing.value) {
    store.commit(mutation.SET_PLAYING_STATE, true);
  }
}

// 音量控制
function handleVolumeChange(value) {
  volumeProgress.value = value;
  audioRef.value.volume = value;
}
const disableCls = computed(() => {
  return songReady.value ? '' : 'disable';
});
// 隐藏normal-player
function hideNormalPlayer() {
  store.commit('setFullScreen', false);
}
</script>

<style lang="scss">
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .volume {
          flex-grow: 0.5;
          padding-right: 20px;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 1s;
      .top,
      .bottom,
      .cd-wrapper {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    // from就是开始的初始值,to是离开是最终值
    &.normal-enter-from,
    &.normal-leave-to {
      // 这里设置opacity为0,代表开始时是0和最终时是0
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
      // .cd-wrapper {
      //   transform: translate(-147.5px, 402px) scale(0.133);
      // }
    }
  }
}
</style>
