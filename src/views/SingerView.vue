<template>
  <div class="singer" v-loading:[`正在载入...`].absoulte="!singerList.length">
    <ElevatorList @enter-singer-detail="handleEnterSingerDetail" :list-data="singerList" />
    <router-view v-slot="{ Component }">
      <transition appear name="slider">
        <component :singer="singerData" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getSingerList } from '@/service/singer';
import { watchEffect, ref, toRaw } from 'vue';
import ElevatorList from '@/components/base/elevator/ElevatorList.vue';
import { BetterStorage } from '@/assets/js/storage';
import { SINGER_KEY } from '@/assets/js/constant';

const singerList = ref([]);
watchEffect(async () => {
  const { singers } = await getSingerList();
  singerList.value = singers;
});
const singerData = ref(null);
const router = useRouter();
function handleEnterSingerDetail(singer) {
  BetterStorage.session.set(SINGER_KEY, toRaw(singer));
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
