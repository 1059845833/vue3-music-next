import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@/assets/scss/index.scss';
import lazyPlugin from 'vue3-lazy';
// 自定义指令
import loadingDirective from './components/base/loading/loading-directive';
import noResultDirective from './components/base/no-result/no-result-directive';
const app = createApp(App);
app.use(lazyPlugin, {
  loading: require('@/assets/images/loading.gif'),
  error: require('@/assets/images/default.png'),
});
app.directive('loading', loadingDirective);
app.directive('noResult', noResultDirective);
app.use(store).use(router).mount('#app');
