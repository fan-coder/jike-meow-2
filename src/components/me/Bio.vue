<template>
  <div class="bio" v-if="data.user.bio" :class="{ dark: $store.state.isDarkMode }">
    <span>{{ data.user.bio }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Bio extends Vue {}
</script>

<style lang="scss" scoped>
div.bio {
  display: block;
  width: 100%;
  padding: 10px 30px;

  & > span {
    font-size: 14px;
    line-height: 1.6;
    color: #606266;
    white-space: pre-wrap;
  }
}

/* Dark Theme */
div.bio.dark {
  & > span {
    color: #fff;
  }
}
</style>
