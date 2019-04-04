<template>
  <div class="notification">
    <Header/>

    <main>
      <meow-loading style="margin-top: 150px"/>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
main {
  display: block;
  width: 100%;
  padding: 50px 0 20px 0;
}
</style>
