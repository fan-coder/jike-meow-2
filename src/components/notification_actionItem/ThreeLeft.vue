<template>
  <div class="notification-left" :class="{ dark: $store.state.isDarkMode }">
    <!-- Avatar -->
    <div class="avatar">
      <i
        :style="{backgroundImage: 'url(' + data.actionItem.users[0].profileImageUrl + ')'}"
        :class="{ isVerified: data.actionItem.users[0].isVerified }"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
div.notification-left {
  display: inline-block;
  vertical-align: top;
  width: 35px;
  margin-right: 15px;

  div.avatar {
    display: block;

    & > i {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      height: 35px;
      width: 35px;
      border: 0;
      border-radius: 50%;
      background: #e4e7ed center no-repeat;
      background-size: cover;

      &.isVerified::after {
        content: "";
        position: absolute;
        right: -2px;
        bottom: -2px;
        height: 14px;
        width: 14px;
        background: url("../../assets/verified.svg") center no-repeat;
        background-size: 100%;
        z-index: 5;
      }
    }
  }
}

div.notification-left.dark {
  div.avatar {
    & > i {
      background-color: #262626;
    }
  }
}
</style>
