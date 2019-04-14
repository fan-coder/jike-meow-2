<template>
  <div class="notification-right">
    <meow-nr-content v-if="!data.referenceItem.referenceImageUrl" :data="data"/>
    <meow-nr-image v-else :data="data"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Home extends Vue {}
</script>

<style scoped>
div.notification-right {
  display: inline-block;
  vertical-align: top;
  width: 70px;
}
</style>
