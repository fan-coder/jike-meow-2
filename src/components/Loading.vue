<template>
  <vue-loading
    type="bubbles"
    :color="$store.state.isDarkMode ? '#ffffff' : '#303133'"
    :size="{ width: '60px', height: '60px' }"
  ></vue-loading>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {}
</script>