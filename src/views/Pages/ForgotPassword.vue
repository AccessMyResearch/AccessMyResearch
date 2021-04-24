<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Forgot Password</h1>
              <p class="text-lead text-white">To recover your password, please enter the username associated with your account below</p>
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
            <b-card-body class="px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
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
                    <div class="text-center">
                      <base-button type="primary" native-type="submit" class="my-4">Recover Password</base-button>
                    </div>
                  </b-form>
                </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col>
                <div class="text-center">
                <small class="text-light">Don't have an account? Register</small>
                <router-link to="/register" class="text-light"><small> here</small></router-link>
                </div>
            </b-col><!--TODO: Make forgot password-->
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
    name: 'forgotpassword',
    data() {
      return {
        username: ''
      }
    },
    created() {
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
        //the user can provide their username and the forgotPassword sends a notification to the email associated with the username with a verification code  
        Auth.forgotPassword(this.username)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        this.$store.state.user = this.username;
        //once email sent, render codeverification page
        this.$router.push('codeverification');
      },
      async findUser() 
      {
        try {
          //check if there is a logged in user. if yes, change store signedIn property to true.
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