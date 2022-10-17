import { get } from './base';
// http://localhost:8080/music.mp4
export function getDefaultSong() {
  return get('/music.mp4').then(result => {
    console.log(result);
  });
}
export function processSongs(songs) {
  if (!songs.length) {
    // 如果列表为空
    return Promise.resolve(songs);
  }
  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid;
    }),
  }).then(result => {
    const map = result.map;
    return songs
      .map(song => {
        song.url = map[song.mid];
        return song;
      })
      .filter(song => {
        return song.url && song.url.indexOf('vkey') > -1;
      });
  });
}

const lyricMap = {};

export function getLyric(song) {
  // 如果歌曲中有歌词，则不发请求
  if (song.lyric) {
    return Promise.resolve(song.lyric);
  }
  // 如果歌曲没有但map中，也可
  const mid = song.mid;
  const lyric = lyricMap[mid];
  if (lyric) {
    return Promise.resolve(lyric);
  }
  return get('/api/getLyric', { mid }).then(result => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词';
    lyricMap[mid] = lyric;
    return lyric;
  });
}
