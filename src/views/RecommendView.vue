<template>
  <div>
    123
    <!-- {{ res }} -->
  </div>
</template>

<script setup>
import { getRecommend } from '@/service/recommend';
import { watchEffect, ref } from 'vue';
let obj = ref({});
watchEffect(async () => {
  // console.log('触发watch');
  obj.value = await getRecommend();
  console.log(obj);
});
</script>

<style lang="scss" scoped>
div {
  color: white;
}
</style>
