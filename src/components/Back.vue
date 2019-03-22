<template>
  <header :class="{ dark: $store.state.isDarkMode }">
    <router-link to="/me">
      <i class="el-icon-back"></i>
    </router-link>
    <p>{{ title }}</p>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["title"]
})
export default class Home extends Vue {}
</script>
<style scoped>
header {
  display: block;
  height: 50px;
  width: 100%;
  max-width: 350px;
  margin: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  font-size: 0;
  background-color: #fff;
  text-align: left;
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
  width: 50px;
}

i {
  cursor: pointer;
  display: block;
  height: 50px;
  width: 50px;
  margin-left: 20px;
  font-size: 20px;
  line-height: 50px;
  color: #000;
}
header.dark i {
  color: #fff;
}

p {
  display: block;
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(50%);
  font-size: 15px;
  font-weight: bold;
  line-height: 50px;
}
</style>
