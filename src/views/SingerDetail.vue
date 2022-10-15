<template>
  <div class="singer-detail">
    <MusicList :loading="loading" :songs="songsList" v-bind="singerData"></MusicList>
  </div>
</template>

<script setup>
import MusicList from '@/components/music-list/MusicList.vue';
import { getSingerDetail } from '@/service/singer';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  singer: {
    type: Object,
    default: () => {},
  },
});

// 获取歌曲数据;
const songsList = ref([]);
const loading = ref(true);
async function initData() {
  const { songs } = await getSingerDetail(props.singer);
  songsList.value = songs;
  loading.value = false;
}
initData();
const singerData = computed(() => {
  return props.singer && { pic: props.singer.pic, title: props.singer.name };
});
</script>

<style lang="scss" scoped>
.singer-detail {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 10;
  background: $color-background;
}
</style>
