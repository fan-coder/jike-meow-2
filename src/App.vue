<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: 0;
  position: relative;
  box-sizing: border-box;
}

img {
  border: 0;
  display: block;
}

div,
p,
span,
a {
  hyphens: auto;
  overflow-wrap: break-word;
  text-decoration: none;
  white-space: normal;
  word-wrap: break-word;
}

body {
  display: block;
  min-height: 500px;
  width: 350px;
  margin: auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  background: #fff;
  min-width: 320px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

div.el-message {
  min-width: 200px;
  width: 90%;
  max-width: 400px;
}

div.el-message-box {
  width: 90%;
  max-width: 400px;
}

button.el-button {
  color: #000;
  border-color: #efefef;
}
button.el-button.el-button--primary {
  color: #000;
  background-color: #ffe411;
  border-color: #ffe411;
}
button.el-button.el-button--danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
}
button.el-button:hover,
button.el-button:focus {
  color: #000;
  background-color: #fff;
  border-color: #efefef;
}
button.el-button.el-button--primary:hover,
button.el-button.el-button--primary:focus {
  color: #000;
  background-color: #ffe411;
  border-color: #ffe411;
}
button.el-button.el-button--danger:hover,
button.el-button.el-button--danger:focus {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
}
</style>
