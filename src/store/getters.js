const getters = {
  currentSong(state) {
    console.log(state);
    return state.playList[state.currentIndex] ?? {};
  },
};

export default getters;
