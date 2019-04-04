<template>
  <div class="unknown" :class="{ dark: $store.state.isDarkMode }">
    <div class="left">
      <div class="text"></div>
      <div class="avatars">
        <i></i>
      </div>
    </div>
    <div class="right">
      <i class="avatar">
        <i class="el-icon-question"></i>
      </i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style scoped>
div.unknown {
  display: block;
  width: calc(100% - 40px);
  padding: 10px 0;
  margin: 10px auto 0 auto;
  font-size: 0;
  border-bottom: 1px solid #efefef;
}
div.unknown.dark {
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
  height: 20px;
  background-color: #e1e2e3;
}
div.unknown.dark div.text {
  background-color: #262626;
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
div.unknown.dark div.avatars > i {
  border-color: #262626;
  background-color: #262626;
}
div.avatars > i + i {
  margin-left: -5px;
}

/* 左侧时间 */
span.time {
  display: inline-block;
  margin-top: 10px;
  height: 16px;
  width: 50px;
  background-color: #e1e2e3;
}
div.unknown.dark span.time {
  background-color: #262626;
}

/* 右侧头像 */
i.avatar {
  display: block;
  height: 70px;
  width: 70px;
  margin: 0 auto 8px auto;
  outline: 0;
  border: 1px solid #e1e2e3;
  border-radius: 8px;
  background-color: #e1e2e3;
}
div.unknown.dark i.avatar {
  border-color: #262626;
  background-color: #262626;
}
i.el-icon-question {
  display: block;
  font-size: 30px;
  line-height: 68px;
  text-align: center;
}
</style>
