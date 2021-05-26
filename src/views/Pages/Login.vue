<template>
  <div class="login-modal" > 
        
         <!-- <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header> 
        <b-container fluid class="mt-4"> </b-container> -->
  
<div class="container">
    <div class="row">
        <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
           
            <div class="row">
                <div class="col-lg-5.5 col-md-0 mx-auto">

                    <!-- form card login -->
                    <div class="card rounded shadow shadow-sm">
                        <div class="card-header" >
                          <b-icon-x icon = "type-bold" style="float:right; cursor: pointer; height:1.5rem; width:1.5rem; " @click="toggleResearchWindow"> </b-icon-x>
                            <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                <div class="form-group">
                                  <div class="text-center text-muted mb-1 md-0">
                                  <small v-if="step==0">Sign in with</small>
                                  </div>
                                   <div class="text-center text-muted mb-1 md-0">
                                  <small v-if="step==1">Sign in with</small>
                                  </div>

                                            <div class="btn-wrapper text-center mb--4" >
                                                <a href="#" class="btn btn-neutral btn-icon" @click="linkedInSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/linkedin.svg"></span>
                                                <span class="btn-inner--text">LinkedIn</span>
                                                </a>
                                                <a href="#" class="btn btn-neutral btn-icon" @click="googleSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/google.svg"></span>
                                                <span class="btn-inner--text">Google</span>
                                                </a>
                                                <div class="form-group">
                                                <a href="#" class="btn btn-neutral btn-icon" @click="facebookSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/facebook.svg"></span>
                                                <span class="btn-inner--text">Facebook</span>
                                                </a>
                                                <a href="#" class="btn btn-neutral btn-icon">
                                                <span class="btn-inner--icon"><img src="img/SSO/orcid.svg"></span>
                                                <span class="btn-inner--text">ORCID</span>
                                                </a>
                                                </div>
                                            </div>
                                </div>

<div class="card-body">
                    <div class="form-group">
              <b-card-body class="px-lg-5 py-lg-2">
              <div class="text-center text-muted mb-1 md-0">
                <small v-if="step==0">Or sign in with us</small>
                <small v-if="step==1">Or sign up with us</small>
              </div>
              </b-card-body>
              
              <b-card-body class="px-lg-0 py-lg-2">
                <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input alternative
                            class="mb-3"
                            style="width: 150px"
                            name="Username"
                            :rules="{required: true}"
                            prepend-icon="fas fa-user"
                            placeholder="Username"
                            v-model="username">
                    </base-input>
                   <base-input v-if="step==1" alternative
                              class="mb-3"
                              prepend-icon="fas fa-envelope"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="email">
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
                  
                      <div class = "mb--2" v-if="step==0"> 
                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox> </div>
                      <div class = "mb-1" v-if="step==1"> 
                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox> </div>
                     <div class = "custom-control custom-checkbox checkbox-lg mb--2" v-if="step==1">
                <input type="checkbox" class="custom-control-input" id="checkbox-2" v-model="subscription" checked="">
                <label class="custom-control-label" for="checkbox-2">Would you like to subscribe to AMR Newsletter?</label>
               </div>
                    <div class="text-center mb--6" v-if="step==0">
                      <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                    </div>

                     <div class="text-center mb--6" v-if="step==1">
                      <base-button type="primary" native-type="submit" class="my-4">Sign up</base-button>
                    </div>

                     <div class="mb--6">
                     </div>
                  </b-form>

                  
                </validation-observer>
              
              
            </b-card-body>
                    </div>
</div>
   </form>


 <b-row class="mt-3 mb--4">
            <b-col cols="6" class="text-left text">
            <p style="cursor:pointer" @click="changestep2"><small>Forgot Password?</small></p>
            </b-col>



            <b-col cols="6" class="text-right text">
            <p style="cursor:pointer" @click="changestep"><small>Create new account</small></p>
            </b-col>
 </b-row>
   </div>
                        </div>
                    </div>
                </div>




   </div>
                        </div>
                    </div>
                </div>











              



<!--/container-->
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
      name: 'login',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false,
        step:0
      }
    },
    created() {
      this.$forceUpdate();
      this.findUser();

      if(this.$store.state.signedIn)
      {
          this.$router.push('home');
      }

      AmplifyEventBus.$on('authState', info => {
          //check if there is a logged in user. if yes, change store signedIn property to true.
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
        //if username, password provided exists in Cognito User Pool, then log the user in -- set store property signedIn to true and user to current user
        Auth.signIn(this.username, this.password).then(user => {
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
            this.$router.push('home'); //render homepage
          })
          .catch(err => console.log(err));
      },
      googleSignIn() {
        //redirects to the Google sign in to login to the webpage thru Google
        Auth.federatedSignIn({ provider: 'Google' });
      },
      facebookSignIn() {
        //redirects to the Facebook sign in to login to the webpage thru Facebook
        Auth.federatedSignIn({ provider: 'Facebook' });
      },
      linkedInSignIn() {
        //redirects to the LinkedIn sign in to login to the webpage thru LinkedIn
        Auth.federatedSignIn({ provider: 'LinkedIn' });
      },

      changestep(){
        this.step=1;
        console.log(this.step);
      },
      changestep2(){
        this.step=2;
        console.log(this.step)
      },
       toggleResearchWindow(){
            // this.researchWindowIsOpen = !this.researchWindowIsOpen;
            this.$emit('update', this.researchWindowIsOpen);
             console.log(this.researchWindowIsOpen);
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

