/**
 * 洗牌算法
 * @param {Array} source
 */
function shuffle(source) {
  const arr = source.slice();
  const len = source.length;
  for (let i = 0; i < len; ++i) {
    const j = getRandomFromMax(i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomFromMax(max) {
  return Math.floor(Math.random() * (max + 1));
}
function formatTime(interval) {
  // 向下取整
  // interval = interval | 0;
  interval = Math.floor(interval);
  // 分钟部分,前面要填充0
  const minute = (((interval / 60) | 0) + '').padStart(2, '0');
  // 秒钟部分,前面要填充0
  const second = ((interval % 60) + '').padStart(2, '0');
  return `${minute}:${second}`;
}
export { shuffle, formatTime };
