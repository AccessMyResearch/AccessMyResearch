/*!
=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import store from './store';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import infiniteScroll from 'vue-infinite-scroll';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_exports from './aws-exports';
import VueAnalytics from 'vue-analytics'

Amplify.configure({
  ...aws_exports,
  Analytics: { 
      disabled: true
  }
});

console.log(Auth.currentSession());

const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue').default);
Vue.use(infiniteScroll);

// router setup
import router from './routes/router';

// analytics setup
Vue.use(VueAnalytics, {
  id: 'UA-183671144-1', //google analytics tracking id
  router
});

// plugin setup
Vue.use(DashboardPlugin);

// start firebase
import firebase from 'firebase'

// connection  to the firebase  start here
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDACi1PfVrV1sMl_WAfeQ5FuMQm5fEl5jE",
  authDomain: "chatv-85249.firebaseapp.com",
  databaseURL: "https://chatv-85249.firebaseio.com",
  projectId: "chatv-85249",
  storageBucket: "chatv-85249.appspot.com",
  messagingSenderId: "1071441139587",
  appId: "1:1071441139587:web:9d2cfb4b4409fc58c108b6",
  measurementId: "G-DTXHZ2CSJR"
};
firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;
// end firebase

// added for sliders in year filter
//ADDED FROM slider-changes branch
import HistogramSlider from 'vue-histogram-slider'
import 'vue-histogram-slider/dist/histogram-slider.css'
Vue.component('HistogramSlider', HistogramSlider)
//end added
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)
// end of code added

Vue.prototype.$endpoints = {
  aspnet: 'http://localhost:5000/',
  crossref: 'https://api.crossref.org/',
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
