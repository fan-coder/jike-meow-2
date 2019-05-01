<template>
  <div class="liked" :class="{ dark: $store.state.isDarkMode }">
    <TwoLeft :data="data" :actionDescription="'赞了你的回答'"/>
    <ThreeRight :data="data"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TwoLeft from "@/components/notification_actionItem/TwoLeft.vue";
import ThreeRight from "@/components/notification_actionItem/ThreeRight.vue";

@Component({
  props: ["data"],
  components: { TwoLeft, ThreeRight }
})
export default class Home extends Vue {}
</script>

<style scoped>
div.liked {
  display: block;
  width: calc(100% - 40px);
  padding: 10px 0;
  margin: 10px auto 0 auto;
  font-size: 0;
  border-bottom: 1px solid #efefef;
}
div.liked.dark {
  border-color: #666;
}
</style>
