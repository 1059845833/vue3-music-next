const mutations = {
  // 播放状态: 暂停 | 播放
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  // 顺序列表
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  // 真实播放列表
  setPlayList(state, list) {
    state.playList = list;
  },
  // 播放模式: 顺序|随机|单曲
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  // 当前歌曲
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  // 是否全屏
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  addSongLyric(state, { song, lyric }) {
    state.sequenceList.map(item => {
      if (item.mid === song.mid) {
        item.lyric = lyric;
      }
      return item;
    });
  },
};

export default mutations;
