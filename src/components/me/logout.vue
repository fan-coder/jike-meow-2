<template>
  <!-- Log Out -->
  <div class="logout">
    <el-button type="danger" @click.stop="logOut()">退出登录</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  /* Log Out */
  logOut() {
    this.$confirm("确认退出？", "警告", {
      showClose: false,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      iconClass: "el-icon-user-solid"
    })
      .then(() => {
        const STORAGE_TOKEN = localStorage["storageToken"];
        const THEME = localStorage["theme"];
        localStorage.clear();

        if (STORAGE_TOKEN && STORAGE_TOKEN.length > 0)
          localStorage.setItem("storageToken", STORAGE_TOKEN);
        if (THEME && THEME.length > 0) localStorage.setItem("theme", THEME);

        this.$router.replace("/");
      })
      .catch(() => {});
  }
}
</script>

<style scoped>
div.logout {
  display: block;
  width: 100%;
  margin: 20px auto;
  padding: 0 30px;
  text-align: center;
}

button {
  width: 100%;
}
</style>
