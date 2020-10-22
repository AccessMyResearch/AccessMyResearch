<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">Create an account with us below or use your Google or LinkedIn account</p>
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
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-header class="bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
              <div class="text-center">
                <a href="#" class="btn btn-neutral btn-icon mr-4">
                  <span class="btn-inner--icon"><img src="img/SSO/linkedin.svg"></span>
                  <span class="btn-inner--text">LinkedIn</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon mr-4">
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
                <small>Or sign up</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-user"
                              placeholder="Username"
                              name="Username"
                              :rules="{required: true}"
                              v-model="username">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-envelope"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-lock-open"
                              placeholder="Password"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="password">
                  </base-input>
                  <div class="text-muted font-italic"><small>password strength: <span
                    class="text-success font-weight-700">strong</span></small></div>
                  <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="agree">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Create account</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { AmplifyEventBus } from 'aws-amplify-vue';
  import { Auth } from 'aws-amplify';

  export default {
    mounted(){

      if(this.$store.state.signedIn === true)
      {
          this.$router.push('home');
      }

      AmplifyEventBus.$on('authState', info => {
        if(info == 'signedIn')
        {
          this.$router.push('home');
        }
      })
    },
    data() {
      return {
          username: '',
          email: '',
          password: '',
          agree: false
      }
    },
    name: 'register',
    components: {},
    methods: {
      onSubmit() {
        //TODO: API call to register user here
          Auth.signUp({
                username: this.username,
                password: this.password,
                attributes: {
                    email: this.email
                },
                validationData: [],  //optional
                })
                .then(data => {
                    this.user = data.user
                    this.$router.push('interests');
                  })
                .catch(err => console.log(err));
      }
    }
  };
</script>
<style></style>
