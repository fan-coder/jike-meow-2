<template>
  <div class="theme">
    <span>夜间模式</span>
    <el-switch v-model="$store.state.isDarkMode" @change="updateTheme"></el-switch>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Theme extends Vue {
  /* Update Theme */
  updateTheme(e: boolean) {
    this.$store.commit({
      type: "updateTheme",
      status: e
    });
  }
}
</script>

<style scoped>
div.theme {
  display: block;
  width: 100%;
  margin: 20px auto 0 auto;
  padding: 0 30px;
  text-align: right;
}

span {
  margin-right: 10px;
}
</style>
