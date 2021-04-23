<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Change Password</h1>
              <p class="text-lead text-white">We sent a verification code to the email associated with your username</p>
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
                <small></small>
              </div>
                <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input alternative
                            class="mb-3"
                            name="Verification Code"
                            :rules="{required: true}"
                            prepend-icon="fas fa-user"
                            placeholder="Verification Code"
                            v-model="code">
                    </base-input>
                    <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-lock-open"
                              placeholder="New Password"
                              type="password"
                              name="New Password"
                              :rules="{required: true, min: 6}"
                              v-model="newpassword">
                    </base-input>
                    <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-lock-open"
                              placeholder="Verify New Password"
                              type="password"
                              name="New Password"
                              :rules="{required: true, min: 6}"
                              v-model="verifypassword">
                  </base-input>
                    <div class="text-center">
                      <base-button type="primary" native-type="submit" class="my-4">Change Password</base-button>
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
  import { Auth } from 'aws-amplify';
  import { AmplifyEventBus } from 'aws-amplify-vue';
  import forgotpassword from './ForgotPassword.vue';

  export default {
    name: 'codeverification',
    data() {
      return {
        code: '',
        newpassword: '',
        verifypassword: '',
      }
    },
    created() {
      this.findUser();

      if(this.$store.state.signedIn)
      {
          this.$router.push('home');
      }
    },
    methods: {
      onSubmit() {
        //TODO: API call for login here
        
        if(this.$store.state.signedIn)
        {
            this.$router.push('home');
        }

        if(this.newpassword == this.verifypassword)
        {
          //once the user gets a verification email for forgetting their password, they can use the code to create a new password
            Auth.forgotPasswordSubmit(this.$store.state.user, this.code, this.newpassword)
              .then(data => console.log(data))
              .catch(err => console.log(err));
            this.$router.push('login');
        }
        else
        {
          alert("Passwords do not match.");
        }
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