<template>
  <header-bar></header-bar>
  <tab-link></tab-link>
  <router-view />
</template>
<script setup>
import HeaderBar from '@/components/header/HeaderBar.vue';
import TabLink from '@/components/tab/TabLink.vue';
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  background-color: $color-background;
}
</style>
