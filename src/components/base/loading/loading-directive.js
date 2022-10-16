import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive';
import LoadingView from './LoadingView.vue';

// 创建loading-directive
const loadingDirective = createLoadingLikeDirective(LoadingView);
export default loadingDirective;
