<template>
<div>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      
      <div class="messageFilterPanel">
        <div class="accordion" role="tablist" style="margin-right: 5%; width: 235.5px;">
          <b-card no-body class="messageCardHeading" style="height:70px;">
          <b-card-header header-tag="header" class="p-2 d-flex align-items-center heading">Messaging
            <div class="messagingIcons" style="margin-left: 36%">
            <span><i class="fas fa-list-ul fa-lg listIcon"></i>
            <i class="far fa-edit fa-lg newMessage"></i></span>
            </div>
          </b-card-header>
          </b-card>


          <b-card no-body class="searchMessageCard">
            <div class="searchBox" style="padding: 5%">
            <span class="searchIcon" style="display: inline-block"><i class="fas fa-search fa-sm searchGlass"></i></span>
            <input type="message" class="searchTextArea" placeholder="Search Messages" style="display: inline-block">
            <span class="slider" style="display: inline-block"><i class="fas fa-sliders-h fa-sm sliderIcon"></i></span>
            </div>
          </b-card>

          <b-card no-body class="messageCard">
            <div @click="say('Frank')">
              <div class="chat_img"><img src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                  Frank: Can I be your friend? I will have you know that I graduated top of my class.
                </div>
              </div>
          </b-card>

          <b-card no-body class="messageCard">
            <div>
              <div class="chat_img"><img src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                  Geralt: Sure we can meet at 10 tomorrow. Please bring a laptop with you.
                </div>
              </div>
          </b-card>

          <b-card no-body class="messageCard">
            <div>
              <div class="chat_img"><img src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="chat_ib">
                  Jennifer: How's your day going?
                </div>
              </div>
          </b-card>

        </div>
      </div>

      <!-- message chat body -->
      <b-card no-body class="lightTable-card" style="margin-right:0">
          <b-card-header class="border-1" style = "height: 70px;"> 
            <div> 
              <i class="fas fa-lg fa-ellipsis-h" style="float: right"></i>
              <h4 style="color: #3b3b3b; margin: 0;"> Frank </h4>
              <h6 style="color: #c1c1c1"> Active now </h6>
            </div><br>
          </b-card-header>
          <div style="height: 77vh">
            <div class="messageHistory">
              <div  v-for="message in messages" :key="message.id" class="incomingMessage">
                <div class="incoming_msg_img"> <img src="img/theme/team-4.jpg" alt="sunil"></div>
                <div class="[message.author==authUser.displayName? 'sent_msg':'received_msg']">
                  <div class="received_withd_msg">
                    <p>{{message.message}}</p>
                    <span class="time_date"> {{message.time}} |{{message.author}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="messageInputArea">
              <div class="input_msg_write">
                <input  @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="  Type message"/>
                <button class="sendMessageIcon" type="button"><i class="fas fa-paper-plane" aria-hidden="true"/></button>
              </div>
            </div>
          </div>
      </b-card>

      

    </card>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Message',

  data() {
    return{
      message: null,
      messages:[],
      authUser:{},
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchMessages();

    firebase.auth().onAuthStateChanged(user=> {
        if(user) {
          this.authUser = user;
        } else {
          this.authUser = {}
        }
    });
  },
  methods:{
    say: function (message) {
      alert(message)
    },
    scrollToButtom() {
      let box = document.querySelector('.msg_history');
      box.scrollTop = box.scrollHeight;
    },
    saveMessage() {
      //save in firebase
      db.collection('chat').add({
        message: this.message,
        author: this.authUser.displayName,
        time:Date()
      }).then(() => {
          this.scrollToButtom();
      })
      this.message = null;
    },
    fetchMessages() {
      db.collection('chat').orderBy('time').onSnapshot((querySnapshot)=>{
        let allMessages = [];
      querySnapshot.forEach(doc=> {
        //console.log(`${doc.id} => ${doc.data()}`);
        allMessages.push(doc.data())
      })
      this.messages = allMessages
        setTimeout(()=> {
          this.scrollToButtom();
        },1000);
      });
    },
  },
  // authentication before accessing the chat room
  // Global Before Guards
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          next();
        }
        else
        {
          //vm.$router.push('/login')
        }
      })
    })
  }
};
</script>
<style scoped>
.container{max-width:1170px; margin:auto;}
img{max-width:100%; max-height: 100%; border-radius: 50%;}

.messageFilterPanel{
  float: left; 
  width:250px; 
  overflow-y: auto; 
  max-height: 50rem
}
.heading{
  background-color: #F78626; 
  margin-bottom: .25rem !important;
  box-shadow: 0 2px 3px #9b9d9e;
  height:70px; 
  text-transform: none;
}
.newMessage{
  float: right;
  padding: 3px 0px 0px 4px;
}
.listIcon{
    float: right; 
    padding: 3px 0px 0px 4px;
}

.messageHeadingText{
  width: 90%;
}
.messageCard{
    margin-right: 0rem;
    margin-bottom: .25rem !important;
    box-shadow: 0 2px 3px #9b9d9e;
    width: 235.5px;
    height: 80px;
}

.searchMessageCard{
  margin-right: 0rem;
  margin-bottom: .25rem !important;
  box-shadow: 0 2px 3px #9b9d9e;
  width: 235.5px;
}

.searchTextArea{
  margin-left: 1%;
  width: 85%;
  border: none;
}

.chat_img {
  margin-top: 5%;
  margin-left: 3%;
  float: left;
  width: 25%;
}


.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 72%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 80%;
  line-height: 1.25;
  margin-top: 12%;
  
}

.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{margin: 20px 0 0;}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.messageInputArea {border-top: 1px solid #c4c4c4;position: relative;}

.sendMessageIcon {
  background: #0b599b none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 1%;
  top: 11px;
  width: 33px;
  padding-right: 1%;
}
.messaging { padding: 0 0 50px 0;}
.messageHistory {
  height: 92%;
  overflow-y: auto;
}
</style>