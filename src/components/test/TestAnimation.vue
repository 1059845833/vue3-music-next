<template>
  <div class="container">
    <button class="btn" @click="fullScreen = !fullScreen">start</button>
    <Transition name="cd" @enter="onBeforeEnter" @after-leave="onAfterLeave">
      <div class="box-wrapper" v-show="fullScreen">
        <div class="box" ref="boxRef">
          <img class="img" src="/photo/6.png" alt="" />
        </div>
      </div>
    </Transition>
    {{ info }}
    <div class="player-box">
      <div class="mini-img" v-show="!fullScreen" ref="miniRef">
        <img class="img" src="/photo/6.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 全屏
const fullScreen = ref(false);
// 两个元素
const boxRef = ref(null);
const miniRef = ref(null);
const info = ref({});
function getPositionAndScale() {
  const bigRect = boxRef.value.getBoundingClientRect(),
    miniRect = miniRef.value.getBoundingClientRect();
  console.log(bigRect, miniRect);
  console.log(window.innerHeight, window.innerWidth);
  const targetWidth = miniRect.width,
    bigLeft = bigRect.left,
    bigWidth = bigRect.width,
    bigHeight = bigRect.height,
    bigTop = bigRect.top,
    miniLeft = miniRect.left,
    miniTop = miniRect.top,
    miniWidth = miniRect.width,
    miniHeight = miniRect.height;
  const deltaX = miniLeft + miniWidth / 2 - (bigLeft + bigWidth / 2);
  const deltaY = miniTop + miniHeight / 2 - (bigTop + bigHeight / 2);
  const scale = miniWidth / bigWidth;
  info.value = {
    deltaX,
    deltaY,
    scale,
  };
}

let index = null;
function onBeforeEnter(el) {
  getPositionAndScale();
  console.log('enter');
  // console.log(document.styleSheets[0].cssRules.length);
  const { deltaX, deltaY, scale } = info.value;
  index = document.styleSheets[0].insertRule(`
    @keyframes cd {
      0% {
        transform: translate(${deltaX}px, ${deltaY}px) scale(${scale});
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }`);
}
function onAfterLeave(el) {
  console.log('after-leave', document.styleSheets[0].rules);
  document.styleSheets[0].deleteRule(index);
}
</script>

<style lang="scss" scoped>
.container {
  height: 200vh;
  .btn {
    width: 60px;
    border-radius: 10px;
    margin: 10px;
  }
  .box-wrapper {
    display: flex;
    justify-content: center;
    .box {
      // border-radius: 50%;
      // overflow: hidden;
      width: 300px;
      height: 300px;
      .img {
        box-sizing: border-box;
        border: 10px solid hsla(0, 0%, 100%, 0.1);
      }
    }
  }
  .player-box {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #333;
    width: 100%;
    .mini-img {
      width: 60px;
      height: 60px;
    }
  }
  .img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .cd-enter-active .box {
    animation: cd 0.6s;
  }
  .cd-leave-active .box {
    animation: cd 0.6s reverse;
  }
  // @keyframes cd {
  //   0% {
  //     transform: translate(-157.5px, 445.5px) scale(0.2);
  //     opacity: 0;
  //   }
  //   100% {
  //     opacity: 1;
  //   }
  // }
}
</style>
