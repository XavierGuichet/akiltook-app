import './main.scss';
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueAuth from '@websanova/vue-auth'
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);


import filter from './filters/'
// Add routes to VueRouter
import router from './router'
Vue.router = router

import { ENTRYPOINT } from './config/entrypoint';
Vue.http.options.root = ENTRYPOINT;
Vue.use(require('@websanova/vue-auth'), {
    // auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    auth: require('./auth-driver/bearer-body.js'),
    http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'roles',
    parseUserData: function (data) {
      return data || {}
    },
    loginData: {
      url: ENTRYPOINT + 'login_check',
      redirect: '/match',
      fetchUser: true
    },
    refreshData: {
      url: '/login/token-refresh',
      method: 'POST',
      enabled: false
    },
    fetchData: {
      url: ENTRYPOINT + 'accounts/me',
      enabled: true
    },
});




// Add the modules in the store
import account from './store/modules/account/';
import club from './store/modules/club/';
import game from './store/modules/game/';
import mediaobject from './store/modules/mediaobject/';
import took from './store/modules/took/';
import team from './store/modules/team/';

export const store = new Vuex.Store({
  modules: {
    account,
    club,
    mediaobject,
    game,
    team,
    took
  }
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
