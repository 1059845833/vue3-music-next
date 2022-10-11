<template>
  <div class="recommend-wrapper" v-loading:[`加载中...`].absoulte="loading">
    <ScrollWrapper class="recommend-content">
      <div name="recommend-view">
        <div class="slider-wrapper">
          <div class="slider-content">
            <SliderShow v-if="sliderData.length" :sliderData="sliderData" />
          </div>
        </div>
        <div v-if="albumsData.length" class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albumsData" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ScrollWrapper>
  </div>
</template>

<script setup>
import { watchEffect, ref, computed, onMounted } from 'vue';
import { getRecommend } from '@/service/recommend';
import SliderShow from '@/components/base/slider/SliderShow.vue';
import ScrollWrapper from '@/components/base/scroll/ScrollWrapper.vue';
// 当滚动栏和推荐栏都没有数据的时候执行loading
const loading = computed(() => !sliderData.value.length && !albumsData.value.length);

// 请求轮播图与推荐专辑数据
const sliderData = ref([]),
  albumsData = ref([]);
watchEffect(async () => {
  const { sliders, albums } = await getRecommend();
  sliderData.value = sliders;
  albumsData.value = albums;
});
</script>

<style lang="scss" scoped>
// 固定recommend
.recommend-wrapper {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
