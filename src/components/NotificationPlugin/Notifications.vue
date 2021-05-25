<template>
  <div style="max-height:100vh;">
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>

    
   <card class="min-vh-100 main_body center">
      <!-- <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <button type="button" class="btn" @click="currentTabComponent ='Messages'" >Messages</button>
          <button type="button" class="btn" @click="currentTabComponent ='Updates'" >Updates</button>
          <button type="button" class="btn" @click="currentTabComponent ='Requests'" >Requests</button> 
          <p> {{currentTabComponent}} </p> 
          <component v-bind:is ="currentTabComponent" ></component> 
          <p> This will be the settings page</p>
        </div>
      </div> -->
   
    <!-- Setting up the notifications filter panel section -->
    <div class="NotificationsFilterPanel">
    <div class="accordion" role="tablist">
        <b-card no-body class="filterPanelCard" style="max-height:70px;">
        <b-card-header header-tag="header" class="p-1 firstFilter">
            <b-button
            block v-b-toggle.SortByAccordion squared variant="#4577B8"
            class = "dropdownButton"><div>Notifications<span><i class="fas fa-list-ul fa-lg addItem"></i></span></div>
            </b-button>
        </b-card-header>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.connectionsAccordion squared variant="outline-primary"
             class = "dropdownButton toggleBg" @click="step=0"><div>Network</div>
            </b-button>
        </b-card-header>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.groupsAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=1"><div>Posts</div>
            </b-button>
        </b-card-header>
        </b-card>
        
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.followedAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=2"
            ><div>Reactions</div>
            </b-button>
        </b-card-header>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.otherMembersAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg" @click="step=3"><div>Comments</div>
            </b-button>
        </b-card-header>
        </b-card>
    </div>
    </div>

    <!-- network body -->
    <!-- Base templates for the page -->
        <b-card no-body class="lightTable-card" style="margin-right:0; height: 83vh; overflow-y: hidden;">

          <!-- <b-card no-body class="messageCard" id="ConnectionsContent" v-if="step==0" style="height: 80px; margin-top: 1%; outline: 0; border-width: 0 0 1px; border-radius: 0"> -->
            <div style="margin-top: 1%; margin-bottom: -1%">
              <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
              <div class="chat_ib">
                <h2 style="font-size:small; top-margin: 10px; margin-left: -3%; color:black;">Jennifer <b>shared a post</b>: The key to successful
                leadership is <br> influence, not authority. </h2> 
                  
                <i class="fas fa-lg fa-ellipsis-h" style="color: rgb(69, 119, 184); float:right; margin-top: -2px; margin: 12px; cursor: pointer" v-on:click='togglePopupChat'></i>
                </div>
                  
            </div>
            <hr>

          <div  style="margin-top: -1%; margin-bottom: -1%">
              <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
              <div class="chat_ib">
                <h2 style="font-size:small; top-margin: 10px; margin-left: -3%; color:black;">Your post was <b>shared successfully</b> from
                the University <br> of California: UC secures landmark open access deal with <br> world's largest
                scientific publisher.</h2> 
                <p style="font-size: x-small; margin-left: -3%; margin-top: -5px">3 Reactions</p>

                <button class="btn btn-primary btn-sm align-top messageButton" style="float: left; margin-top: 15px; margin-left: -3%">View Your Post</button>

                <i class="fas fa-lg fa-ellipsis-h" style="color: rgb(69, 119, 184); float:right; margin-top: -2px; margin: 12px; cursor: pointer" v-on:click='togglePopupChat'></i>
                </div>
                  
          </div>
            <hr>

          <div style="margin-top: -1%">
              <div class="chat_img" style="height: 70px"><img style="border-radius: 50%; margin-left: 15%;" src="img/theme/team-4.jpg" alt="sunil"></div>
              <div class="chat_ib">
                <h2 style="font-size:small; top-margin: 10px; margin-left: -3%; color:black;">Max <b>viewed your profile</b></h2> 
                  
                <i class="fas fa-lg fa-ellipsis-h" style="color: rgb(69, 119, 184); float:right; margin-top: -2px; margin: 12px; cursor: pointer" v-on:click='togglePopupChat'></i>
                <button class="btn btn-primary btn-sm align-top messageButton" style="float: left; margin-top: 15px; margin-left: -3%">See All Views</button>
                </div>
                  
          </div>
            <hr>

        </b-card>
    <!-- </b-card> -->


 </card>
  </div>
</template>


<script>
import Messages from  '../../views/Messages.vue'
import Updates from  '../../views/Updates.vue';
import Requests from  '../../views/Requests.vue';

export default {
  components:{
    'Messages': Messages,
    'Updates': Updates,
    'Requests': Requests,
  },
  data() {
    return {
      currentTabComponent:""
    };
  },
};
</script>

<style scoped>

.NotificationsFilterPanel{
  float: left; 
  width:235px; 
  overflow-y: auto; 
  max-height: 90vh;
  margin-right: 1.5%;
}

.filterPanelCard{
    margin-right: 0rem;
    margin-bottom: .25rem !important;
    box-shadow: 0 2px 3px #9b9d9e;
}

.dropdownButton {
    text-align: left;
    border: 0px;
    font-size: 16px;
    width: 235px;
}

img{max-width:100%; max-height: 100%;}


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
