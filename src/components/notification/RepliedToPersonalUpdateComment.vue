<template>
  <div class="notification" :class="{ dark: $store.state.isDarkMode }">
    <ThreeLeft :data="data"/>
    <ThreeCenter :data="data" :actionDescription="'回复了你'"/>
    <ThreeRight :data="data"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThreeLeft from "@/components/notification_actionItem/ThreeLeft.vue";
import ThreeCenter from "@/components/notification_actionItem/ThreeCenter.vue";
import ThreeRight from "@/components/notification_actionItem/ThreeRight.vue";

@Component({
  props: ["data"],
  components: { ThreeLeft, ThreeCenter, ThreeRight }
})
export default class Home extends Vue {}
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
