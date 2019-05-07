import './main.scss';
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueAuth from '@websanova/vue-auth'
import App from './App.vue';

import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
require('offline-plugin/runtime').install();
Vue.use(datePicker);

import Navbar from 'bootstrap-vue/es/components/navbar'
Vue.use(Navbar)

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle',
  },
});

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faEdit)

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('font-awesome-icon', FontAwesomeIcon)

import filter from './filters/'
// Add routes to VueRouter
import router from './router'
Vue.router = router

import {
  ENTRYPOINT, FACEBOOK_ID, GOOGLE_ID
} from './config/entrypoint';
Vue.http.options.root = ENTRYPOINT;
Vue.use(require('@websanova/vue-auth'), {
  // Auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  auth: require('./auth-driver/bearer-body.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'roles',
  parseUserData: function(data) {
    return data || {}
  },
  loginData: {
    url: ENTRYPOINT + 'login_check',
    redirect: '/match',
    fetchUser: true,
  },
  refreshData: {
    url: '/login/token-refresh',
    method: 'POST',
    enabled: false,
  },
  fetchData: {
    url: ENTRYPOINT + 'accounts/me',
    enabled: true,
  },
  facebookData: {
    url: '/login/check-facebook"',
    method: 'POST',
    redirect: '/match',
  },
  facebookOauth2Data: {
    clientId: FACEBOOK_ID,
    params: {
      redirect_uri: function() {
        return this.options.getUrl() + '/login/oauth/facebook';
      },
    },
    scope: 'public_profile, email',
  },
  googleData: {
    url: '/login/check-google',
    method: 'POST',
    redirect: '/match',
  },
  googleOauth2Data: {
    url: 'https://accounts.google.com/o/oauth2/auth',
    params: {
      redirect_uri: function() {
        return this.options.getUrl() + '/login/oauth/google';
      },
      client_id: GOOGLE_ID,
      scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
    },
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
    took,
  },
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
