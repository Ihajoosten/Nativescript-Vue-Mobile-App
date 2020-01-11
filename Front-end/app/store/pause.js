
const pause = {
  namespaced: true,
  state: {
    pause: 0,
    startTime: null
  },
  actions: {
    addEndPause({ state, commit }, endTime) {
      let start = state.startTime.split(":");
      let startHours = +start[0];
      let startMinutes = +start[1];

      let end = endTime.split(":");
      let endHours = +end[0];
      let endMinutes = +end[1];

      let x = endHours - startHours;
      if ( endHours < startHours ) {
        x = 24 - (startHours - endHours);
      }
      let y = endMinutes - startMinutes;
      if (endMinutes < startMinutes) {
        y = 60 - (startMinutes - endMinutes);
        x--;
      }

      const pauseTime = 60 * x + y;

      commit("addPause", pauseTime);
      return state.pause;
    },
    addStartPause({ _, commit }, startTime) {
      commit("setStartTime", startTime);
    }
  },
  mutations: {
    setStartTime(state, time) {
      state.startTime = time;
    },
    addPause(state, item) {
      state.pause += item;
    }
  }
};

export default pause;
