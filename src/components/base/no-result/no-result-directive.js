import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive';
import NoResult from './NoResult.vue';

// 创建loading-directive
const noResultDirective = createLoadingLikeDirective(NoResult);
export default noResultDirective;
