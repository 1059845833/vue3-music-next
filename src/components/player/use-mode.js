import { useStore } from 'vuex';
import { computed } from 'vue';
import { PLAY_MODE } from '@/assets/js/constant';
/**
 * 播放状态 hooks
 */
export default function () {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);
  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    // 返回播放图标
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random
      ? 'icon-random'
      : 'icon-loop';
  });

  function changeMode() {
    const mode = (playMode.value + 1) % 3;
    store.dispatch('changeMode', mode);
  }
  return {
    modeIcon,
    changeMode,
  };
}

/**
 * 孤勇者
 * 富士山下
 * 最佳损友
 * 红玫瑰
 * 漫长岁月
 * 爱情转移
 */