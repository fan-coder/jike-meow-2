<template>
  <div class="notification">
    <Header/>

    <main>
      <el-row :gutter="15">
        <el-col :span="12">
          <Block title="登录网页版" @click.stop.native="storeToken"/>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script lang="ts">
import chrome from "@/function/chrome";
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Block from "@/components/tools/Block.vue";

@Component({
  components: { Header, Block }
})
export default class Tools extends Vue {
  storeToken() {
    chrome.storeToken();
  }
}
</script>

<style scoped>
main {
  display: block;
  height: 500px;
  width: 100%;
  padding: 50px 20px 20px 20px;
  overflow-y: auto;
}

div.block {
  margin-top: 15px;
}
</style>
