<template>
  <Container>
    <TwoLeft :data="data" :actionDescription="'赞了你的问题'"/>
    <ThreeRight :data="data"/>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Container from "@/components/notification/Container.vue";
import TwoLeft from "@/components/notification_actionItem/TwoLeft.vue";
import ThreeRight from "@/components/notification_actionItem/ThreeRight.vue";

@Component({
  props: ["data"],
  components: { Container, TwoLeft, ThreeRight }
})
export default class LikeQuestion extends Vue {}
</script>
