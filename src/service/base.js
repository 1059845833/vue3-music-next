import axios from 'axios';

const ERR_OK = 0;
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ustbhuangyi.com/music-next/' : '/';

axios.defaults.baseURL = baseURL;

// 对 axios 的简单封装
/**
 * 直接将错误码判断等操作封装在内部
 * 外部使用直接调用get函数即可
 */
export function get(url, params) {
  return axios
    .get(url, {
      params,
    })
    .then(res => {
      const serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.result;
      }
    })
    .catch(e => {
      console.log(e);
    });
}
