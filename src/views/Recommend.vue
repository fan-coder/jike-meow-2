<template>
  <div class="recommend">
    <Header/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Message } from "element-ui";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {}
</script>