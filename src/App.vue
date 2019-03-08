<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
  width: 350px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, sans-serif;
  color: #404040;
  background: #fff;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}
</style>
