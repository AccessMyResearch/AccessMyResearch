<template>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">

    <div class="networkFilterPanel">
    <div class="accordion" role="tablist">
        <b-card no-body class="filterPanelCard" style="max-height:70px;">
        <b-card-header header-tag="header" class="p-1 firstFilter">
            <b-button
            block v-b-toggle.SortByAccordion squared variant="#4577B8"
            class = "dropdownButton"><div>Network<span><i class="fas fa-list-ul fa-lg addItem"></i></span></div>
            </b-button>
        </b-card-header>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.connectionsAccordion squared variant="outline-primary"
             class = "dropdownButton toggleBg" @click="step=0"><div>Connections</div>
            </b-button>
        </b-card-header>
        </b-card>
    

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.groupsAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=1"><div>Groups</div>
            </b-button>
        </b-card-header>
        </b-card>
        
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.followedAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=2"
            ><div>Followed</div>
            </b-button>
        </b-card-header>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.otherMembersAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=3"><div>Other Members</div>
            </b-button>
        </b-card-header>
        </b-card>
    </div>
    </div>

      <!-- network body -->
      <b-card no-body class="lightTable-card" style="margin-right:0">
          <b-card-header class="border-1" style = "height: 90px;"> 
            <span style="margin-top:1px; margin-left: 5px; font-size: large">1,272 Connections</span>
            <span class="searchIcon" style="display: inline-block; margin-left: 20%"><i class="fas fa-search fa-sm searchGlass"></i></span>
            <input type="message" class="searchTextArea" placeholder="Search by name" style="display: inline-block; width: 250px; border: 1px solid grey;">
            <span style="font-size: small; color: #4577B8; margin-left: 1%"> <strong>Search with filters</strong></span>
            <div><span style="margin-top:5px; margin-left: 5px; font-size: small; display:inline-block">Sort by: <strong>Recently Added</strong></span><i class="fas fa-sort-down" style="display: inline-block; margin-left: 5px;"></i></div>
            <br>
          </b-card-header>


          <div style="height: 70vh; overflow-y: scroll;">
            <!-- <div id="NetworkContent" v-if="step==0"><p>Network Test Content</p></div> -->
            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Jennifer</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Field Training Agent </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 3 hours ago</p>
                </div>
              </div>
            </b-card>

            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Geralt</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Full-stack Software Engineer </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 2 days ago</p>
                </div>
              </div>
            </b-card>

            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Kathy</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Health Advisor at UT Southwestern </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 13 days ago</p>
                </div>
              </div>
            </b-card>

            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Kris</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">U. of Texas at Dallas </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 25 days ago</p>
                </div>
              </div>
            </b-card>

            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Frank</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Field Sales Leader </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 61 days ago</p>
                </div>
              </div>
            </b-card>

            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">Sally</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Neuroscientist and Advisor </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 95 days ago</p>
                </div>
              </div>
            </b-card>


            <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0">
              <div>
                <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                <h2 style="font-size:medium; top-margin: 10px; margin-left: -3%">John</h2> 
                <i class="fas fa-lg fa-ellipsis-h" style="float:right; margin-top: -2px"></i>
                <button class="btn btn-primary btn-sm align-top messageButton">Message</button>
                <h2 style="font-size:small; margin-top: -5px; margin-left: -3%">Firefighter </h2>
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">Connected 97 days ago</p>
                </div>
              </div>
            </b-card>

            <div id="GroupsContent" v-if="step==1"><p>Groups Test Content</p></div>
            <div id="FollowedContent" v-if="step==2"><p>Followed Test Content</p></div>
            <div id="OtherMembersContent" v-if="step==3"><p>Other Members Test Content</p></div>
          </div>
      </b-card>

      </card>
  </div>


<!-- 
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
    <div class="category-container"> -->
      <!-- <b-button type="submit" variant="light" class="btn btn-info mr-4" inline>View More</b-button> -->
      <!-- <pulse-loader color="orange"></pulse-loader>
    </div> -->
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
      step: 0,
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


.networkFilterPanel{
  float: left; 
  width:235px; 
  overflow-y: auto; 
  max-height: 90vh;
  margin-right: 1.5%;
}

.dropdownButton {
    text-align: left;
    border: 0px;
    font-size: 16px;
    width: 235px;
}

img{max-width:100%; max-height: 100%;}

.filterPanelCard{
    margin-right: 0rem;
    margin-bottom: .25rem !important;
    box-shadow: 0 2px 3px #9b9d9e;
}

.toggleBg.not-collapsed {
  background-color: #4577B8;
  color: white;
}

.firstFilter{
  background-color: #F78626;
}

.downArrow{
    float:right;
    padding: 3px 0px 0px 4px;
}

.lightTable-card{
    box-shadow: 0 3px 5px #8898AA; 
    margin-left:15px;
    display: flex;
}

.addItem{
    float: right; 
    padding: 3px 0px 0px 4px;
}

.img_tiny {
    height:1.75rem;
    width:1.75rem;
  }

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}

.chat_img {
  float: left;
  width:9%;
}

.message_button_position {
  float: right;
  /* position: absolute; */
  margin-top: 50%;
  
  border-radius: 15px; 
}

.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.searchMessageCard{
  margin-right: 0rem;
  /* margin-bottom: .25rem !important; */
  box-shadow: 0 2px 3px #9b9d9e;
  width: 250px;
  float:center;
  margin-left: 50%;
  position:relative;
}
.searchTextArea{
  margin-left: 1%;
  width: 85%;
  border: none;
}

.messageButton{
  float:right; 
  border-radius: 15px; 
  background-color: white; 
  color:#4577B8; 
  margin-top: -10px;
}
</style>