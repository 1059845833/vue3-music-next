import { PLAY_MODE } from '@/assets/js/constant';
import { shuffle } from '@/assets/js/utils';
import {
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_PLAY_LIST,
  SET_PLAY_MODE,
  SET_SEQUENCE_LIST,
} from '@/assets/js/mutation-types';
const actions = {
  selectPlay({ commit }, { list, index }) {
    commit(SET_PLAY_MODE, PLAY_MODE.sequence);
    commit(SET_SEQUENCE_LIST, list);
    commit(SET_PLAY_LIST, list);
    // 设置为 playing 播放状态
    commit(SET_PLAYING_STATE, true);
    commit(SET_FULL_SCREEN, true);
    commit(SET_CURRENT_INDEX, index);
  },
  randomPlay({ commit }, { list }) {
    commit(SET_PLAY_MODE, PLAY_MODE.random);
    commit(SET_CURRENT_INDEX, 0);
    commit(SET_SEQUENCE_LIST, list);
    commit(SET_PLAYING_STATE, true);
    commit(SET_FULL_SCREEN, true);
    commit(SET_PLAY_LIST, shuffle(list));
  },
  changeMode({ commit, state, getters }, mode) {
    // 先缓存当前歌曲id
    const currentId = getters.currentSong.id;
    // 随机模式与顺序播放模式下要切换list
    if (mode === PLAY_MODE.random) {
      commit('setPlayList', shuffle(state.sequenceList));
    } else {
      commit('setPlayList', state.sequenceList);
    }
    // 修改后将当前歌曲的下标找到
    const index = state.playList.findIndex(song => {
      return song.id === currentId;
    });

    commit('setCurrentIndex', index);
    commit('setPlayMode', mode);
  },
};

export default actions;
