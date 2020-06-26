import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import NavBar from '@/components/NavBar.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import { tagsListModel } from '@/model';

Vue.config.productionTip = false;

Vue.component('NavBar', NavBar);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagsListModel.fetch();
window.createTag = (name) => {
  if (name) {
    try {
      tagsListModel.create(name);
    } catch (e) {
      if (e.message === 'duplicated') {
        alert('请勿添加重复标签');
      }
    }
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
