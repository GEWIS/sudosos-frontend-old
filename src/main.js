import Vue from 'vue'
import { Drag, Drop } from 'vue-drag-drop';
import VModal from 'vue-js-modal'
import App from './App.vue'
import router from './router'
import { TableComponent, TableColumn } from 'vue-table-component';

Vue.config.productionTip = false;

Vue.component('drag', Drag);
Vue.component('drop', Drop);
Vue.component('table-component', TableComponent);
Vue.component('table-column', TableColumn);

Vue.use(VModal);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
