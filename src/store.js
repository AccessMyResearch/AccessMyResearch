import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false,
    isAdmin: false,
    isExpert: false,
    username: "",
    user: {
      company: 'AccessMyResearch',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      education: '',
      city: '',
      country: '',
      state: '',
      aboutMe: '',
      expertise: '',
      university: '',
    },
    requests: [],
    follows: []
  },
  mutations: {

  },
  actions: {

  }
})