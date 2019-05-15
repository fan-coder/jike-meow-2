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
  border: 0;
  outline: none;
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
  height: 500px;
  width: 350px;
  margin: auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  background: #fff;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}
body.dark {
  color: #fff;
  background: #323639;
}

/* Message Box - Button */
div.el-message-box button.el-button {
  color: #303133;
  background-color: #fff;
  border-color: #dcdfe6;
}
div.el-message-box button.el-button--primary {
  background-color: #ffe411;
  border-color: #ffe411;
}

img.alert-image {
  display: block;
  max-height: 280px;
  width: 100%;
  object-fit: cover;
}
</style>
