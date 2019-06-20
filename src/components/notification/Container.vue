<template>
  <div class="notification" :class="{ dark: $store.state.isDarkMode }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>

<style scoped>
div.notification {
  display: block;
  width: calc(100% - 40px);
  padding: 10px 0;
  margin: 10px auto 0 auto;
  font-size: 0;
  border-bottom: 1px solid #efefef;
}
div.notification.dark {
  border-color: #666;
}
</style>