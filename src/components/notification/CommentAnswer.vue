<template>
  <div class="comment" :class="{ dark: $store.state.isDarkMode }">
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
        >{{ data.actionItem.users[0].screenName }}</a>&nbsp;
        <span>评论了你</span>
        <div class="content">
          {{ data.actionItem.content || '' }}
          <span
            class="content-picture"
            v-if="data.actionItem.pictures && data.actionItem.pictures.length > 0"
            @click.self.stop="$emit('enlargeImage')"
          >查看图片</span>
        </div>
      </div>
      <div class="time">{{ data.createdAt | reformatTime }}</div>
    </div>
    <div class="right">
      <meow-nr-content v-if="!data.referenceItem.referenceImageUrl" :data="data"/>
      <meow-nr-image v-else :data="data"/>
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
div.comment {
  display: block;
  width: calc(100% - 40px);
  padding: 10px 0;
  margin: 10px auto 0 auto;
  font-size: 0;
  border-bottom: 1px solid #efefef;
}
div.comment.dark {
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
  width: calc(100% - 135px);
  margin-right: 15px;
}
div.right {
  width: 70px;
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
div.comment.dark div.avatars > i {
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
div.comment.dark div.text {
  color: #bbb;
}
div.text > a {
  color: #000;
}
div.comment.dark div.text > a {
  color: #fff;
}
div.content {
  display: block;
  width: 100%;
  margin-top: 3px;
  font-size: 13px;
  line-height: 1.6;
  color: #999;
}
span.content-picture {
  cursor: pointer;
  color: #409eff;
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
div.comment.dark div.time {
  color: #bbb;
}
</style>
