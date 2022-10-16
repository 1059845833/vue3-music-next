<template>
  <div class="singer-detail">
    <MusicList :loading="loading" :songs="songsList" v-bind="picAndName"></MusicList>
  </div>
</template>

<script setup>
import MusicList from '@/components/music-list/MusicList.vue';
import { getSingerDetail } from '@/service/singer';
import { ref, computed } from 'vue';
import { BetterStorage } from '@/assets/js/storage';
import { SINGER_KEY } from '@/assets/js/constant';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
  singer: {
    type: Object,
    default: null,
  },
});

// singer信息,如果props有就读取props的否则读取session的
const route = useRoute();
const singerData = computed(() => {
  let res = null;
  if (props.singer) {
    res = props.singer;
  } else {
    const cache = BetterStorage.session.get(SINGER_KEY);
    if (cache && route.params.id === cache.mid) {
      res = cache;
    }
  }
  return res;
});
const router = useRouter();
// 获取歌曲数据;
const songsList = ref([]);
const loading = ref(true);
async function initData() {
  // 如果singerData没有内容,直接退出
  if (!singerData.value) {
    router.replace(route.matched[0].path);
    return;
  }
  const { songs } = await getSingerDetail(singerData.value);
  songsList.value = songs;
  loading.value = false;
}
initData();

const picAndName = computed(() => {
  const singerDataValue = singerData.value;
  return singerDataValue && { pic: singerDataValue.pic, title: singerDataValue.name };
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
