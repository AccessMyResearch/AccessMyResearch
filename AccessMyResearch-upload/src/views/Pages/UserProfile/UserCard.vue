<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top v-if="dataloaded">
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img src="img/theme/team-4.jpg" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
      <div class="d-flex justify-content-between">
        <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
        <a href="#" class="btn btn-sm btn-default float-right">Message</a>
      </div>
      <UserActionDropdown></UserActionDropdown>
    </b-card-header>

    <b-card-body class="pt-0">
      <b-row>
        <b-col >
          <div class="card-profile-stats d-flex justify-content-center mt-md-5">
            <div>
              <span class="heading">{{user.articles}}</span>
              <span class="description">Articles</span>
            </div>
            <div>
              <span class="heading">{{user.friends}}</span>
              <span class="description">Friends</span>
            </div>
            <div>
              <span class="heading">{{user.comments}}</span>
              <span class="description">Comments</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">
        <h5 class="h3">{{user.firstName + " " + user.lastName}}<span class="font-weight-light">, {{user.education}}</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="fas fa-map-marker-alt mr-2"/>{{user.city + ", " + user.state + ", " + user.country}}
        </div>
        <div class="h5 mt-4">
          <i class="fas fa-briefcase mr-2"/>{{user.expertise}}
        </div>
        <div>
          <i class="fas fa-user-graduate mr-2"/>{{user.university}}
        </div>
        <hr class="my-4">
        <p>{{user.aboutMe}}</p>
        <a href="#">Show more</a>

      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import UserActionDropdown from "./UserActionsDropdown.vue";
import { Auth } from 'aws-amplify';

export default {
  components:{
    UserActionDropdown
  },
  data() {
    return {
      signedIn: false,
      data: '',
      dataloaded: false,
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
        university: ''
      },
    };
  },
  async created() {
    await this.getUserData();
    if(this.$store.state.signedIn)
    {
      this.signedIn = true;
      this.user = this.$store.state.user;
      // this.getUserData();
    }
  },
  methods: {
    getUserData() {
      
      //gets the profile information stored in Cognito
      Auth.currentAuthenticatedUser().then((value) => {
        var values = value.storage;

        for (const [key, value] of Object.entries(values)) {
          if(value.substring(0, 15) == "{\"UserAttribute") //the user attribute field contains all the user attributes of the current signed in user
          {
            this.data = value;
            break ;
          }
        }

        var obj = JSON.parse(this.data);

        for(const [key, value] of Object.entries(obj.UserAttributes)) //push the user information in Cognito to the store's user array and the page's user array (to access it locally, store array cannot be accessed from the HTML)
        {
          if(value.Name == "custom:articles")
          { 
            this.$store.state.user.articles = value.Value;
            this.user.articles = value.Value;
          }

          if(value.Name == "custom:comments")
          { 
            this.$store.state.user.comments = value.Value;
            this.user.comments = value.Value;
          }

          if(value.Name == "custom:friends")
          { 
            this.$store.state.user.friends = value.Value;
            this.user.friends = value.Value;
          }

          if(value.Name == "custom:last_name")
          { 
            this.$store.state.user.lastName = value.Value;
            this.user.lastName = value.Value;
          }

          if(value.Name == "custom:first_name")
          {
            this.$store.state.user.firstName = value.Value;
            this.user.firstName = value.Value;
          }

          if(value.Name == "custom:education")
          { 
            this.$store.state.user.education = value.Value;
            this.user.education = value.Value;
          }

          if(value.Name == "custom:city")
          { 
            this.$store.state.user.city = value.Value;
            this.user.city = value.Value;
          }

          if(value.Name == "custom:state")
          { 
            this.$store.state.user.state = value.Value;
            this.user.state = value.Value;
          }

          if(value.Name == "custom:country")
          { 
            this.$store.state.user.country = value.Value;
            this.user.country = value.Value;
          }

          if(value.Name == "custom:expertise")
          { 
            this.$store.state.user.expertise = value.Value;
            this.user.expertise = value.Value;
          }

          if(value.Name == "custom:university")
          { 
            this.$store.state.user.university = value.Value;
            this.user.university = value.Value;
          }

          if(value.Name == "custom:bio")
          { 
            this.$store.state.user.aboutMe = value.Value;
            this.user.aboutMe = value.Value;
            this.dataloaded = true; //sets the data loaded property to true which renders the page (ensures all the data is loaded before rendering user card fully)
          }
        }
      });

    }
  }
};
</script>

<style>
</style>