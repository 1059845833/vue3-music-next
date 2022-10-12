<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script setup>
import useScroll from './use-scroll';
import { ref } from 'vue';
const props = defineProps({
  click: {
    type: Boolean,
    default: false,
  },
  probeType: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits({
  scroll: null,
});
// 基础内容
const wrapper = ref(null);
const scroll = useScroll(
  wrapper,
  {
    ...props,
  },
  emits,
);
defineExpose({
  scroll,
});
</script>
