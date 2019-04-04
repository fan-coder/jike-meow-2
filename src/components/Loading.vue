<template>
  <vue-loading
    type="bubbles"
    :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
    :size="{ width: '60px', height: '60px' }"
  ></vue-loading>
</template>
