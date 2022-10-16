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

export { shuffle };
