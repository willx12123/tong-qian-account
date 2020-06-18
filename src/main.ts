import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import NavBar from '@/components/NavBar.vue';

Vue.config.productionTip = false;

Vue.component('NavBar', NavBar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
