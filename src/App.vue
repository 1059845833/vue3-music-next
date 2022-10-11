<template>
  <header-bar></header-bar>
  <tab-link></tab-link>
  <!-- <suspense> -->
  <router-view />
  <!-- </suspense> -->
</template>
<script setup>
import HeaderBar from '@/components/header/HeaderBar.vue';
import TabLink from '@/components/tab/TabLink.vue';
</script>
<style lang="scss"></style>
