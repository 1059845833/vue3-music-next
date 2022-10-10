<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useScroll from './use-scroll';
const wrapper = ref(null);
const scroll = useScroll(wrapper);
</script>

<style lang="scss" scoped>
// .scroll-wrapper {
//   height: 100%;
// }
</style>
