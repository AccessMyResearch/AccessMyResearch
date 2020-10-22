<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Sign in with your username &amp; password or use your Google or LinkedIn account</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"  >
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/SSO/linkedin.svg"></span>
                  <span class="btn-inner--text">LinkedIn</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/SSO/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/SSO/facebook.svg"></span>
                  <span class="btn-inner--text">Facebook</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/SSO/orcid.svg"></span>
                  <span class="btn-inner--text">ORCID</span>
                </a>
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign in with us</small>
              </div>
                <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input alternative
                            class="mb-3"
                            name="Username"
                            :rules="{required: true}"
                            prepend-icon="fas fa-user"
                            placeholder="Username"
                            v-model="username">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                name="Password"
                                :rules="{required: true, min: 6}"
                                prepend-icon="fas fa-lock-open"
                                type="password"
                                placeholder="Password"
                                v-model="password">
                    </base-input>

                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox>
                    <div class="text-center">
                      <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                    </div>
                  </b-form>
                </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/forgotpassword" class="text-light"><small>Forgot password?</small></router-link>
            </b-col><!--TODO: Make forgot password-->
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import { Auth } from 'aws-amplify';
  import { AmplifyEventBus } from 'aws-amplify-vue';

  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      }
    },
    created() {
      this.$forceUpdate();
      this.findUser();

      if(this.$store.state.signedIn === true)
      {
          this.$router.push('home');
      }

      AmplifyEventBus.$on('authState', info => {
        if(info === 'signedIn') {
          this.findUser();
        } else {
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      });
    },
    computed: {
      signedIn(){
        return this.$store.state.signedIn;
      }
    },
    methods: {
      onSubmit() {
        //TODO: API call for login here
        Auth.signIn(this.username, this.password).then(user => {
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
            this.$router.push('home');
          })
          .catch(err => console.log(err));
      },
      async findUser() 
      {
        try {
          const user = await Auth.currentAuthenticatedUser();
          this.$store.state.signedIn = true;
          this.$store.state.user = user;
        }
        catch(err){
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      }
    }
  };
</script>