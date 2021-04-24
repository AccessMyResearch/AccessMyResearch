<template>
  <div>
    <base-header
      class="pb-5 pt-md-3 bg-gradient-primary"
    ></base-header>

    <b-container fluid class="pb-4" id="suggested-people-container">
      <b-row no-gutters>
        <b-col cols="4" v-for="user in users" :key="user.username">
          <b-card
            tag="article"
            style="max-width: 20rem; max-height: 20rem;"
            class="mb-2 mr-3 ml-5 mt-5 mb-3 h-60 rounded-10"
          >
            <div class="text-right" v-if="user.usertype == 'expert'">
              <b-icon icon="star-fill" class="h2" variant="warning"/>
            </div>
            <div class="text-right" v-else>
              <b-icon icon="" class="h2" variant="warning"/>
            </div>

            <b-img
              left
              class="avatar avatar-lg rounded-circle"
              src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg"
              style="width: 80px; height: 80px;"
            ></b-img>
            <b-card-text class="text-right font-weight-bolder mr-2">
              {{ user.name }}

              <b-card-text class="text-dark">
                @{{ user.username }}
              </b-card-text>
            </b-card-text>

            <div class="text-right">
              <b-button
                class="mt-2 mr-2"
                href="#"
                variant="primary"
                id="button"
                @click="handleClick(user)"
                >View Profile</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <div class="category-container">
      <!-- <b-button type="submit" variant="light" class="btn btn-info mr-4" inline>View More</b-button> -->
      <pulse-loader color="orange"></pulse-loader>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries.js';
import { getUser, listUsers, getUserFriend } from '../../graphql/queries';

export default {
  name: "suggestedpeople",
  props: {},
  data() {
    return {
      suggestions: [],
      storageUsers: '',
      signedIn: false,
      users: []
    };
  },
  created() {
    if(this.$store.state.signedIn)
    {
        this.signedIn = true;
    }

    this.listUsers();
  },
  methods: 
  {
    handleClick(user) 
    {
      this.$router.push({
        name: 'User',
        params: { id: user.username }
      });
    },
    async listUsers()
    {
        //gets the current user information on DynamoDB based on the username 
        const myUser = await API.graphql({ query: queries.getUser, variables: { id: this.$store.state.user.username }});
        
        for(const [key, value] of Object.entries(myUser.data.getUser.friends.items)) //returns all the friend rows of the current user
        {
            const friend = await API.graphql({query: queries.getUserFriend, variables: {id: value.id}}); //gets current user's friends
            
            /*
              pushes the username and name of the friend to the current user array to render on webpage (HTML doesn't allow for rendering from store)
            */
            this.users.push({
                name: friend.data.getUserFriend.friend.name,
                username: friend.data.getUserFriend.friend.username
            });
        }
    },
    handleAddClick(user) 
    {
        
    }
  }
};
</script>

<style scoped>
.category-container {
  position: relative;
  width: 100%;
  text-align: center;
}
</style>
