import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDarkMode: false
  },
  mutations: {
    changeTheme(state, payload = false) {
      state.isDarkMode = payload;
      if (state.isDarkMode === false) {
        document.body.className = "";
        localStorage.setItem("theme", "light");
        return;
      }
      document.body.className = "dark";
      localStorage.setItem("theme", "dark");
    }
  }
});

// Change default theme config
const THEME = localStorage["theme"];
if (THEME && THEME === "dark") {
  store.commit("changeTheme", true);
}

export default store;
