import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import SearchViewVue from '@/views/SearchView.vue';
import SingerViewVue from '@/views/SingerView.vue';
import TopListViewVue from '@/views/TopListView.vue';
import RecommendView from '@/views/RecommendView.vue';
import SingerDetail from '@/views/SingerDetail.vue';
const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/recommend',
    // 别名
    alias: '/home',
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: RecommendView,
  },
  {
    path: '/search',
    name: 'searchView',
    component: SearchViewVue,
  },
  {
    path: '/singer',
    name: 'singerView',
    component: SingerViewVue,
    children: [
      {
        path: ':id',
        name: 'singerDetail',
        component: SingerDetail,
      },
    ],
  },
  {
    path: '/top-list',
    name: 'top-listView',
    component: TopListViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
