<template>
  <header-bar></header-bar>
  <tab-link></tab-link>
  <router-view />
  <player-component />
  <!-- <TestAnimation /> -->
  <!-- <progress-cycle-test /> -->
</template>
<script setup>
import ProgressCycleTest from './components/test/components/ProgressCycleTest.vue';
import TestAnimation from './components/test/TestAnimation.vue';
import HeaderBar from '@/components/header/HeaderBar.vue';
import TabLink from '@/components/tab/TabLink.vue';
import PlayerComponent from '@/components/player/PlayerComponent.vue';
</script>
<style lang="scss"></style>
