<template>
  <div>
    <base-header
      class="pb-5 pb-8 pt-5 pt-md-8 bg-gradient-primary"
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
              <b-icon icon="star-fill" class="h2" variant="warning"></b-icon>
            </div>
            <div class="text-right" v-else>
              <b-icon icon="" class="h2" variant="warning"></b-icon>
            </div>

            <b-img
              left
              class="avatar avatar-lg rounded-circle"
              :src="user.imageurl"
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
                class=""
                href="#"
                variant="primary"
                @click="handleProfile(user)"
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
import { listFollows } from '../../graphql/queries.js';

export default {
  name: "follows",
  props: {},
  data() {
    return {
      users: [],
      userid: ''
    };
  },
  created() 
  {
    if(this.$store.state.signedIn)
    {
        this.signedIn = true;
    }

    this.listUsers();
  },
  methods: 
  {
    async listUsers()
    {
      //gets the list of Follow rows found in the Follow table of DynamoDB
        const listFollowers = await API.graphql(graphqlOperation(listFollows));
        for(const [key, value] of Object.entries(listFollowers.data.listFollows.items)) //for all the rows in the Follow table
        {
          if(value.friend.id == this.$store.state.user.username) //if the current user is the one being followed
          {
              //push the friend user inforamation to the users array
              this.users.push({
                id: value.user.id,
                name: value.user.name,
                username: value.user.username,
              });
          }
        }
    },
    handleProfile(user) 
    {
      //redirect to the user profile page clicked
        this.$router.push({
            name: 'User',
            params: { id: user.username }
        });
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
