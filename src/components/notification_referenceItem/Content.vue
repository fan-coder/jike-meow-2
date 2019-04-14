<template>
  <div
    class="content"
    :class="{ dark: $store.state.isDarkMode }"
    @click.stop="link"
  >{{ data.referenceItem.content }}</div>
</template>

<script lang="ts">
import func from "@/function";
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Home extends Vue {
  link() {
    func.linkURL(this.$props.data);
  }
}
</script>

<style scoped>
div.content {
  cursor: pointer;
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
