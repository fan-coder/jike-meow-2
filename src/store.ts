import Vue from "vue";
import Vuex from "vuex";
import { MessageBox } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDarkMode: false
  },
  mutations: {
    updateTheme(state, payload = false) {
      state.isDarkMode = payload.status;

      if (state.isDarkMode === false) {
        document.body.className = "";
        localStorage.setItem("theme", "light");
        return;
      }
      document.body.className = "dark";
      localStorage.setItem("theme", "dark");
    },
    enlargeImage(state, item: any) {
      MessageBox.confirm(
        `<img class='alert-image' src='${item.actionItem.pictures[0].picUrl}'>`,
        "",
        {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          showClose: true,
          confirmButtonText: "查看原图",
          cancelButtonText: "关闭"
        }
      )
        .then(() => {
          window.open(item.actionItem.pictures[0].picUrl);
        })
        .catch(() => {});
    }
  }
});

// Default Theme
const THEME = localStorage["theme"];
if (THEME && THEME === "dark") {
  store.commit({
    type: "updateTheme",
    status: true
  });
}

export default store;
