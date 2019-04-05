<template>
  <div class="notification-left" :class="{ dark: $store.state.isDarkMode }">
    <div class="text">
      <a
        v-for="user in data.actionItem.users"
        :key="user.id"
        :href="`https://web.okjike.com/user/${user.username}/post`"
        target="_blank"
      >{{ user.screenName }}</a>&nbsp;
      <span v-if="data.actionItem.usersCount >= 3">等 {{ data.actionItem.usersCount }} 人</span>
      <span>{{ actionDescription }}</span>
    </div>
    <div class="avatars">
      <i
        v-for="avatar in data.actionItem.users"
        :key="avatar.id"
        :style="{backgroundImage: 'url(' + avatar.profileImageUrl + ')'}"
        :class="{ isVerified: avatar.isVerified }"
      ></i>
    </div>
    <div class="time">{{ data.createdAt | reformatTime }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data", "actionDescription"]
})
export default class Home extends Vue {}
</script>

<style scoped>
div.notification-left {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 85px);
  margin-right: 15px;
}

/* 左侧文案 */
div.text {
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: #808080;
}
div.notification-left.dark div.text {
  color: #bbb;
}
div.text > a {
  color: #000;
}
div.text > a + a::before {
  content: "、";
}
div.notification-left.dark div.text > a {
  color: #fff;
}

/* 左侧头像 */
div.avatars {
  display: block;
  padding-top: 10px;
}
div.avatars > i {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  width: 30px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #e1e2e3 center no-repeat;
  background-size: cover;
}
div.avatars > i.isVerified::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -1px;
  height: 11px;
  width: 11px;
  background: url("../../assets/verified.svg") center no-repeat;
  background-size: 100%;
}
div.notification-left.dark div.avatars > i {
  border-color: #323639;
  background-color: #262626;
}
div.avatars > i:first-child {
  margin-left: -2px;
}
div.avatars > i + i {
  margin-left: -5px;
}

/* 左侧时间 */
div.time {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.6;
  color: #999;
}
div.notification-left.dark div.time {
  color: #bbb;
}
</style>
