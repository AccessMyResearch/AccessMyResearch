<template>
  <div v-if="dataloaded">
          <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-primary opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">{{ user.firstName }} {{ user.lastName }}</h1>
              <p class="text-white mt-0 mb-5">This is your colleague's profile page. Here, you can see profile information of other AccessMyResearch users. See if some of your hobbies and interests match.</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
            <b-card no-body class="card-profile" alt="Image placeholder" img-top v-if="dataloaded">
                <b-row class="justify-content-center">
                <b-col lg="3" class="order-lg-2">
                    <div class="card-profile-image">
                    <a href="#">
                        <b-img src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" rounded="circle" />
                    </a>
                    </div>
                </b-col>
                </b-row>

                <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between">
                    <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                    <a href="#" class="btn btn-sm btn-default float-right">Message</a>
                </div>
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
        </b-col>
        <b-col xl="8" class="order-xl-1">
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
    import { Auth } from 'aws-amplify';
    import { API, graphqlOperation } from 'aws-amplify';
    import * as queries from '../../graphql/queries.js';
    import { getFriend } from '../../graphql/queries';

  export default {
    data() {
      return {
        dataloaded: true,
        signedIn: false,
        data: '',
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
            articles: "",
            comments: "",
            friends: ""
      },
      };
    },
    async created() {
      
      const friend = await API.graphql({query: queries.getFriend, variables: {id: this.$route.params.id}}); //get the profile information of the colleague user clicked on by current user 

        this.user.username = friend.data.getFriend.username;
        this.user.firstName = friend.data.getFriend.first_name;
        this.user.lastName = friend.data.getFriend.last_name;
        this.user.articles = friend.data.getFriend.articles;
        this.user.comments = friend.data.getFriend.comments;
        this.user.friends = friend.data.getFriend.user.items.length;
        this.user.university = friend.data.getFriend.university;
        this.user.education = friend.data.getFriend.education;
        this.user.expertise = friend.data.getFriend.expertise;
        this.user.city = friend.data.getFriend.city;
        this.user.state = friend.data.getFriend.state;
        this.user.country = friend.data.getFriend.country;
        this.user.aboutMe = friend.data.getFriend.bio;


      if(this.$store.state.signedIn)
      {
        this.signedIn = true;
      }
    },
    methods: {
    }
  };
</script>