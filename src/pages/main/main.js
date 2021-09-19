import Vue from 'vue'
import store from '@/store/index'
import router from './router'
import echarts from 'echarts'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import main from './main.vue'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(ElementUi)

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

new Vue({
  store,
  router,
  render: h => h(main),
}).$mount('#main')
