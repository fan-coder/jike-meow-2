<template>
  <div class="block" :class="{ dark: $store.state.isDarkMode }">{{ title }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["title"]
})
export default class Block extends Vue {}
</script>

<style scoped>
div.block {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background-color: #e4e7ed;
  border-radius: 4px;
  text-align: center;
  transition: all 0.25s ease-in-out;
}
div.block.dark {
  background-color: #262626;
}
div.block:hover {
  color: #000;
  background-color: #ffe411;
}
</style>
