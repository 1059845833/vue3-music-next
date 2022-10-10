import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';
import lazyPlugin from 'vue3-lazy';
import loadingDirective from './components/base/loading/loading-directive';
const app = createApp(App);
app.use(lazyPlugin, {
  loading: require('@/assets/images/loading.gif'),
  error: require('@/assets/images/default.png'),
});
app.directive('loading', loadingDirective);
app.use(store).use(router).mount('#app');
