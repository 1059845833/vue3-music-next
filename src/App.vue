<template>
  <header-bar></header-bar>
  <tab-link></tab-link>
  <router-view />
  <player-component />
</template>
<script setup>
import HeaderBar from '@/components/header/HeaderBar.vue';
import TabLink from '@/components/tab/TabLink.vue';
import PlayerComponent from '@/components/player/PlayerComponent.vue';
</script>
<style lang="scss"></style>
