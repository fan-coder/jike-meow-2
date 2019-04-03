<template>
  <div class="notification-left" :class="{ dark: $store.state.isDarkMode }">
    <div class="avatars">
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
<style scoped>
div.notification-left {
  display: inline-block;
  vertical-align: top;
  width: 35px;
  margin-right: 15px;
}

/* 左侧头像 */
div.avatars {
  display: block;
}
div.avatars > i {
  display: inline-block;
  vertical-align: middle;
  height: 35px;
  width: 35px;
  border: 0;
  border-radius: 50%;
  background: #e1e2e3 center no-repeat;
  background-size: cover;
}
div.avatars > i.isVerified::after {
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
div.notification-left.dark div.avatars > i {
  background-color: #262626;
}
div.avatars > i + i {
  margin-left: -5px;
}
</style>
