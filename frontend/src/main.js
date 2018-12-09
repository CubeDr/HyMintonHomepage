// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import App from './App'
import router from './router'
import axios from 'axios'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: 'http://115.140.236.238:14707/db/'
});
Vue.use(Vuetify);
Vue.use(Vuex);

export const eventBus = new Vue();

String.prototype.paddingLeft = function (paddingValue) {
  return String(paddingValue + this).slice(-paddingValue.length);
};

const store = new Vuex.Store({
  state: {
    user: {
      id: '',
      fname: '',
      lname: '',
      auth: -1
    }
  },
  mutations: {
    login(state, info) {
      state.user = {
        id: info.id, fname: info.fname, lname: info.lname, auth: info.auth
      }
    }
  } ,
  plugins: [createPersistedState()]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
