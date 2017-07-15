import Vue from 'vue';
import { Button, Select } from 'element-ui'
import MainApp from './components/App.vue';
import Router from './router.js';
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
new Vue({
  router: Router.getRouter(),
  el: '#app',
  components: {
    'main-app': MainApp
  },
  template: '<main-app></main-app>'
});
