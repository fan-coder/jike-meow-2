<template>
  <Container>
    <ThreeLeft :data="data"/>
    <ThreeCenter :data="data" :actionDescription="'回复了你'"/>
    <ThreeRight :data="data"/>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Container from "@/components/notification/Container.vue";
import ThreeLeft from "@/components/notification_actionItem/ThreeLeft.vue";
import ThreeCenter from "@/components/notification_actionItem/ThreeCenter.vue";
import ThreeRight from "@/components/notification_actionItem/ThreeRight.vue";

@Component({
  props: ["data"],
  components: { Container, ThreeLeft, ThreeCenter, ThreeRight }
})
export default class Home extends Vue {}
</script>
