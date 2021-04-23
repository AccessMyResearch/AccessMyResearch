<template>
    <div>
        <base-header class="pb-8 pt-md-8 bg-gradient-primary"></base-header>
          <card>
            <b-row align-v="center" slot="header" >
                <b-col cols="8">
                <h3 class="mb-0">Your Profile</h3>
                </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
                <h6 class="heading-small text-muted mb-4">User information</h6>

                <div class="pl-lg-4">
                <b-row>
                    <b-col lg="6">
                    <base-input
                        type="text"
                        label="Username"
                        placeholder="username"
                        v-model="user.username"
                        disabled
                    >
                    </base-input>
                    </b-col>
                    <b-col lg="6">
                    <base-input
                        type="email"
                        label="Email address"
                        placeholder="example@email.com"
                        v-model="user.email"
                    >
                    </base-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col lg="6">
                    <base-input
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        v-model="user.firstName"
                    >
                    </base-input>
                    </b-col>
                    <b-col lg="6">
                    <base-input
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        v-model="user.lastName"
                    >
                    </base-input>
                    </b-col>
                </b-row>
                </div>

                <hr class="my-4">
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">Education</h6>
                <div class="pl-lg-4">
                    <b-row >
                        <b-col lg="6">
                        <base-input
                            type="text"
                            label="Level of Education"
                            placeholder="PhD"
                            v-model="user.education"
                        >   
                        </base-input>
                        </b-col>
                        <b-col lg="6">
                        <base-input
                            type="text"
                            label="University"
                            placeholder="University of Texas at Dallas"
                            v-model="user.university"
                        >
                        </base-input>
                        </b-col>
                        <b-col lg="6">
                        <base-input
                            type="text"
                            label="Expertise"
                            placeholder="Computer Science"
                            v-model="user.expertise"
                        >
                        </base-input>
                        </b-col>
                    </b-row>
                </div>

                <hr class="my-4">
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Contact information</h6>

                <div class="pl-lg-4">
                <b-row>
                    <b-col lg="4">
                        <base-input
                            type="text"
                            label="City"
                            placeholder="Richardson"
                            v-model="user.city"
                        >
                        </base-input>
                    </b-col>

                    <b-col lg="4">
                        <base-input
                            label="State"
                            placeholder="TX"
                            v-model="user.state"
                        >
                        </base-input>
                    </b-col>
                    
                    <b-col lg="4">
                        <base-input
                            type="text"
                            label="Country"
                            placeholder="United States"
                            v-model="user.country"
                        >
                        </base-input>
                    </b-col>
                </b-row>
                </div>

                <hr class="my-4">
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">Overview</h6>
                <div class="pl-lg-4">
                <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
                    <!--  <label class="form-control-label">About Me</label> -->
                    <b-form-textarea rows="4" v-model="user.aboutMe" id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
                </b-form-group>
                </div>
            </b-form>

            <div class="category-container mt-5">
                <b-button type="submit" variant="danger" class="btn btn-info" inline @click="updateAttribute">Save & continue</b-button>
            </div>
        </card>
    </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations.js';
import { createUser, createFriend } from '../../graphql/mutations';

export default {
  data() {
    return {
      signedIn: false,
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
      publications: {
        fields: [
          {
            key: 'title',
            sortable: true,
            label: 'Title'
          },
          {
            key: 'date',
            sortable: true,
            label: 'Date Published',
            formatter: (dateObj) => `${(dateObj.month + 1)}/${dateObj.day}/${dateObj.year}`
          },
          {
            key: 'doi',
            sortable: false,
            label: 'DOI Link'
          }
        ],
        data: []
      }
    };
  },
  created() {
    if(this.$store.state.signedIn)
    {
      this.signedIn = true;
    }
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user)); //TODO: Remove test alert
    },
    async updateAttribute() {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
            'custom:first_name': this.user.firstName,
            'custom:last_name': this.user.lastName,
            'custom:education': this.user.education,
            'custom:city': this.user.city,
            'custom:state': this.user.state,
            'custom:country': this.user.country,
            'custom:expertise': this.user.expertise,
            'custom:university': this.user.university,
            "custom:bio": this.user.aboutMe,
            'custom:articles': "0",
            'custom:friends': "0",
            'custom:comments': "0",
        });

        const userInformation = {
          id: this.$store.state.user.username, 
          username: this.$store.state.user.username, 
          name: this.user.firstName + " " + this.user.lastName,
          articles: 0,
          friendsCount: 0,
          comments: 0,
          education: this.user.education,
          city: this.user.city,
          state: this.user.state,
          country: this.user.country,
          university: this.user.university,
          expertise: this.user.expertise,
          bio: this.user.aboutMe,
          first_name: this.user.firstName,
          last_name: this.user.lastName,
        }
        
        //creates two rows (one in the User table, and Friend table of DynamoDB) with the user information provided in the profile fields
        const addingUsers = await API.graphql({ query: mutations.createUser, variables: {input: userInformation}});
        const addingFriend = await API.graphql({ query: mutations.createFriend, variables: {input: userInformation}});

        this.$router.push('home'); //push to homepage
    }
  },
};
</script>

<style scoped>
.category-container {
    position: relative;
    width: 100%;
    text-align: center;
}
</style>
