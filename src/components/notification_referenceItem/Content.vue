<template>
  <div class="content" :class="{ dark: $store.state.isDarkMode }">{{ content }}</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["content"]
})
export default class Home extends Vue {}
</script>
<style scoped>
div.content {
  display: block;
  display: -webkit-box;
  height: 60px;
  width: 70px;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: #999;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.content.dark {
  color: #e1e2e3;
}
</style>
