<template>
  <div class="image" :class="{ dark: $store.state.isDarkMode }">
    <img :src="image">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["image"]
})
export default class Home extends Vue {}
</script>
<style scoped>
div.image {
  display: block;
  height: 70px;
  width: 70px;
  margin: auto;
  outline: 0;
}
div.image > img {
  display: block;
  height: 70px;
  width: 70px;
  border: 1px solid #e1e2e3;
  border-radius: 4px;
  object-fit: cover;
}
div.image.dark > img {
  border-color: #262626;
  background-color: #262626;
}
</style>
