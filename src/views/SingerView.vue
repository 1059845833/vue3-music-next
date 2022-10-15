<template>
  <div class="singer" v-loading:[`等待加载`].absoulte="!singerList.length">
    <ElevatorList @enter-singer-detail="handleEnterSingerDetail" :list-data="singerList" />
    <router-view :singer="singerData"></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getSingerList } from '@/service/singer';
import { watchEffect, ref } from 'vue';
import ElevatorList from '@/components/base/elevator/ElevatorList.vue';
const singerList = ref([]);
watchEffect(async () => {
  const { singers } = await getSingerList();
  singerList.value = singers;
});

const singerData = ref({});
const router = useRouter();
function handleEnterSingerDetail(singer) {
  console.log('进入父组件');
  singerData.value = singer;
  router.push(`/singer/${singer.mid}`);
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
