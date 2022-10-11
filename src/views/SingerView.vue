<template>
  <div class="singer" v-loading:[`等待加载`].absoulte="!singerData.length">
    <ElevatorList :list-data="singerData" />
  </div>
</template>

<script setup>
import { getSingerList } from '@/service/singer';
import { watchEffect, ref } from 'vue';
import ElevatorList from '@/components/base/elevator/ElevatorList.vue';
const singerData = ref([]);
watchEffect(async () => {
  const { singers } = await getSingerList();
  singerData.value = singers;
});
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
