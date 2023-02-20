<template>
  <div class="progress-container">
    <ProgressCycle :radius="200" width="5" :progress="progress" :max="max" :color="colors">
      <template #default="{ percentage }">
        <span>{{ percentage }} %</span>
      </template>
    </ProgressCycle>
  </div>
  <div>
    <div class="btn-group">
      <button class="btn" @click="toggleProgress(-50)">-</button>
      <button class="btn" @click="toggleProgress(50)">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProgressCycle from '@/components/player/ProgressCycle.vue';
const progress = ref(0);
const max = 300;
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];
function toggleProgress(value) {
  progress.value += value;
  progress.value = Math.min(max, Math.max(0, progress.value));
}
</script>

<style lang="scss" scoped>
.progress-container {
  display: inline-block;
  // background-color: hsl(360, 100%, 68%, 1);

  .progress__text {
    position: absolute;
    top: 50%;
    left: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
  }
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-color: #eee;
  padding: 0.5em 1em;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 0.5em;
  transition: color 0.3s;
  &:hover {
    color: hsl(210, 60%, 63%, 1);
    cursor: pointer;
  }
  &:active {
    border: 2px solid;
  }
}
</style>
