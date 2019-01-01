import Vue from 'vue'
import { Drag, Drop } from 'vue-drag-drop';
import VModal from 'vue-js-modal'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.component('drag', Drag);
Vue.component('drop', Drop);

Vue.use(VModal);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
