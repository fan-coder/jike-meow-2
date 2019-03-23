<template>
  <div class="follower" :class="{ dark: $store.state.isDarkMode }">
    <div class="left">
      <div class="avatars">
        <i
          :style="{backgroundImage: 'url(' + data.actionItem.users[0].profileImageUrl + ')'}"
          :class="{ isVerified: data.actionItem.users[0].isVerified }"
        ></i>
      </div>
    </div>
    <div class="center">
      <div class="text">
        <a
          :href="`https://web.okjike.com/user/${data.actionItem.users[0].username}/post`"
          target="_blank"
        >{{ data.actionItem.users[0].screenName }}</a> 关注了你
      </div>
      <div class="time">{{ data.createdAt | reformatTime }}</div>
    </div>
    <div class="right">
      <button v-if="data.actionItem.users[0].following">已关注</button>
      <button class="notFollowing" v-else>关注</button>
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
div.follower {
  display: block;
  width: calc(100% - 40px);
  padding: 10px 0;
  margin: 10px auto 0 auto;
  font-size: 0;
  border-bottom: 1px solid #efefef;
}
div.follower.dark {
  border-color: #666;
}

div.left,
div.center,
div.right {
  display: inline-block;
  vertical-align: top;
}
div.left {
  width: 35px;
  margin-right: 15px;
}
div.center {
  width: calc(100% - 145px);
  margin-right: 15px;
}
div.right {
  width: 80px;
}

/* 左侧头像 */
div.avatars {
  display: block;
}
div.avatars > i {
  cursor: pointer;
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
div.follower.dark div.avatars > i {
  background-color: #262626;
}
div.avatars > i + i {
  margin-left: -5px;
}

/* 中间文案 */
div.text {
  display: block;
  min-height: 44px;
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: #808080;
}
div.follower.dark div.text {
  color: #bbb;
}
div.text > a {
  color: #000;
}
div.follower.dark div.text > a {
  color: #fff;
}

/* 中间时间 */
div.time {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1.6;
  color: #999;
}
div.follower.dark div.time {
  color: #bbb;
}

/* 右侧按钮 */
button {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  line-height: 30px;
  color: #fff;
  background-color: #dbdbdb;
  border-radius: 30px;
  text-align: center;
}
button:hover {
  background-color: #909090;
}
div.follower.dark button {
  background-color: #262626;
}
div.follower.dark button:hover {
  background-color: #888;
}
button.notFollowing {
  color: #000;
  background-color: #ffe411;
}
div.follower.dark button.notFollowing {
  background-color: #ffe411;
}
button.notFollowing:hover {
  color: #000;
  background-color: #ffe411;
}
</style>
