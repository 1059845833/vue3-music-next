import { createLogger, createStore } from 'vuex';
import mutations from './mutations';
import getters from './getters';
import state from './state';
import actions from './actions';

const debug_env = process.env.NODE_ENV !== 'production';
export default createStore({
  state,
  getters,
  mutations,
  actions,
  // 在开发环境中启用插件
  plugins: debug_env ? [createLogger()] : [],
});
