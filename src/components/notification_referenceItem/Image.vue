<template>
  <div class="image" :class="{ dark: $store.state.isDarkMode }" @click.stop="link">
    <img :src="data.referenceItem.referenceImageUrl">
  </div>
</template>

<script lang="ts">
import func from "@/function";
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Img extends Vue {
  link() {
    func.linkURL(this.$props.data);
  }
}
</script>

<style scoped>
div.image {
  cursor: pointer;
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
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  object-fit: cover;
}
div.image.dark > img {
  border-color: #262626;
  background-color: #262626;
}
</style>
