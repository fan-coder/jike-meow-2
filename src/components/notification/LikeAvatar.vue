<template>
  <div class="liked" :class="{ dark: $store.state.isDarkMode }">
    <div class="left">
      <div class="text">
        <a
          :href="`https://web.okjike.com/user/${data.actionItem.users[0].username}/post`"
          target="_blank"
        >{{ data.actionItem.users[0].screenName }}</a> 赞了你的头像
      </div>
      <div class="avatars">
        <i
          :style="{backgroundImage: 'url(' + data.actionItem.users[0].profileImageUrl + ')'}"
          :class="{ isVerified: data.actionItem.users[0].isVerified }"
        ></i>
      </div>
      <div class="time">{{ data.createdAt | reformatTime }}</div>
    </div>
    <div class="right">
      <i class="avatar">
        <img :src="data.referenceItem.referenceImageUrl">
      </i>
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

div.left,
div.right {
  display: inline-block;
  vertical-align: top;
}
div.left {
  width: calc(100% - 85px);
  margin-right: 15px;
}
div.right {
  width: 70px;
}

/* 左侧文案 */
div.text {
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: #808080;
}
div.liked.dark div.text {
  color: #bbb;
}
div.text > a {
  color: #000;
}
div.liked.dark div.text > a {
  color: #fff;
}

/* 左侧头像 */
div.avatars {
  display: block;
  padding-top: 10px;
}
div.avatars > i {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  width: 30px;
  border: 1px solid #e1e2e3;
  border-radius: 50%;
  background: #e1e2e3 center no-repeat;
  background-size: cover;
}
div.avatars > i.isVerified::after {
  content: "";
  position: absolute;
  right: -2px;
  bottom: -1px;
  height: 12px;
  width: 12px;
  background: url("../../assets/verified.svg") center no-repeat;
  background-size: 100%;
  z-index: 5;
}
div.liked.dark div.avatars > i {
  border-color: #262626;
  background-color: #262626;
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
div.liked.dark div.time {
  color: #bbb;
}

/* 右侧头像 */
i.avatar {
  display: block;
  height: 70px;
  width: 70px;
  margin: auto;
  outline: 0;
}
i.avatar > img {
  display: block;
  height: 70px;
  width: 70px;
  border: 1px solid #e1e2e3;
  border-radius: 8px;
}
div.liked.dark i.avatar > img {
  border-color: #262626;
  background-color: #262626;
}
</style>
