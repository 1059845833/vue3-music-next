<template>
  <header-bar></header-bar>
  <tab-link></tab-link>
  <router-view />
</template>
<script setup>
import HeaderBar from '@/components/header/HeaderBar.vue';
import TabLink from '@/components/tab/TabLink.vue';
</script>
<style lang="scss"></style>
