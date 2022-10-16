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
};

export default actions;
