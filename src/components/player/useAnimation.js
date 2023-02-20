import { ref } from 'vue';
import animations from 'create-keyframe-animation';

export default function useAnimation() {
  const cdWrapperRef = ref(null);
  const { deltaX, deltaY, scale } = getPositionAndScale();
  const animation = {
    0: {
      transform: `translate3d(${-deltaX}px, ${deltaY}px, 0) scale(${scale})`,
    },
    100: {
      transform: 'translate3d(0, 0, 0) scale(1)',
    },
  };
  function onEnter(el, done) {
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
    });
    animations.runAnimation(cdWrapperRef.value, 'move', done);
  }
  function onAfterEnter(el) {
    // cdWrapperRef.value.style = '';
    animations.unregisterAnimation('move');
    cdWrapperRef.value.animation = '';
  }
  function onLeave(el, done) {
    console.log('leave');
    // animations.registerAnimation({
    //   name: 'move',
    //   animation,
    //   presets: {
    //     duration: 600,
    //     easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
    //     direction: 'reverse',
    //   },
    // });
    // animations.runAnimation(cdWrapperRef.value, 'move', done);
    const cdWrapperEl = cdWrapperRef.value;
    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)';
    cdWrapperEl.style.transform = `translate3d(${-deltaX}px, ${deltaY}px,0) scale(${scale})`;
    cdWrapperEl.addEventListener('transitionend', next);

    function next() {
      cdWrapperEl.removeEventListener('transitionend', next);
      done();
    }
  }
  function onAfterLeave(el) {
    console.log('after-leave');
    const cdWrapperEl = cdWrapperRef.value;

    cdWrapperEl.style.transition = '';
    cdWrapperEl.style.transform = '';
  }
  function getPositionAndScale() {
    const targetWidth = 40, // 小圆宽度40px
      paddingLeft = 40, // 小圆圆心距离左边40px
      paddingBottom = 30, // 小圆圆心距离底部30px
      paddintTop = 85, // 大圆的上外边距为85px
      width = window.innerWidth * 0.8;

    // x与y的偏移量
    const deltaX = window.innerWidth / 2 - paddingLeft;
    const deltaY = window.innerHeight - paddintTop - paddingBottom - width / 2;
    // 缩放倍率
    const scale = targetWidth / width;
    return { deltaX, deltaY, scale };
  }
  return {
    onEnter,
    onAfterEnter,
    onLeave,
    onAfterLeave,
    cdWrapperRef,
  };
}
