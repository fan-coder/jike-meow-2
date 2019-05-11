<template>
  <Container>
    <ThreeLeft :data="data"/>
    <ThreeCenter :data="data" :actionDescription="'关注了你'"/>
    <div class="right">
      <button v-if="data.actionItem.users[0].following" @click.self.stop="$emit('unfollow')"></button>
      <button class="notFollowing" v-else @click.self.stop="$emit('follow')"></button>
    </div>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Container from "@/components/notification/Container.vue";
import ThreeLeft from "@/components/notification_actionItem/ThreeLeft.vue";
import ThreeCenter from "@/components/notification_actionItem/ThreeCenter.vue";

@Component({
  props: ["data"],
  components: { Container, ThreeLeft, ThreeCenter }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
div.notification {
  div.notification-center {
    width: calc(100% - 145px);
  }

  div.right {
    display: inline-block;
    vertical-align: top;
    width: 80px;

    button {
      cursor: pointer;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      height: 30px;
      width: 100%;
      background-color: transparent;
      text-align: center;

      &:after {
        content: "已关注";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 13px;
        font-weight: 500;
        line-height: 30px;
        color: #fff;
        background-color: #c0c4cc;
        border-radius: 30px;
        text-align: center;
      }
      &:hover::after {
        content: "取消关注";
        background-color: #606266;
      }

      &.notFollowing::after {
        content: "关注";
        color: #000;
        background-color: #ffe411;
      }
      &.notFollowing:hover::after {
        content: "关注";
      }
    }
  }
}

div.notification.dark {
  div.right {
    button {
      &::after {
        background-color: #262626;
      }
      &:hover::after {
        background-color: #606266;
      }

      &.notFollowing::after {
        color: #000;
        background-color: #ffe411;
      }
    }
  }
}
</style>
