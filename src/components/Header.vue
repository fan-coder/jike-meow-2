<template>
  <header :class="{ dark: $store.state.isDarkMode }">
    <router-link to="/tools">
      <span>小工具</span>
    </router-link>
    <router-link to="/notifications">
      <span>通知</span>
    </router-link>
    <router-link to="/me">
      <span>账号</span>
    </router-link>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import "../element-variables.scss";

header {
  display: block;
  height: 50px;
  width: 100%;
  max-width: 350px;
  margin: auto;
  padding: 0 15px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  font-size: 0;
  background-color: #fff;
  z-index: 9;
}
header.dark {
  background-color: #323639;
}

a {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  width: 30%;
}
a + a {
  margin-left: 5%;
}
a.router-link-exact-active::after {
  content: "";
  display: block;
  height: 5px;
  width: 50px;
  position: absolute;
  right: 50%;
  bottom: 0;
  transform: translateX(50%);
  background-color: $--color-primary;
}

span {
  display: block;
  font-size: 15px;
  font-weight: bold;
  line-height: 50px;
  color: #000;
  text-align: center;
}
header.dark span {
  color: #fff;
}
</style>
