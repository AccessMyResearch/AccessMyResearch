<template>
<div>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
<div class="messageFilterPanel" style="float: left; width:250px">
 
    <div class="accordion" role="tablist" style="margin-right: 5%;">
        <!-- <div style="overflow-y:auto; height: 20rem;"> -->
        <b-card no-body class="messageCardHeading" style="height:70px; ">
        <b-card-header header-tag="header" class="p-2 heading" role="tab">
            <b-button
            block v-b-toggle.searchMessages squared variant="#primary"
            class = "dropdownButton">Messaging<span><i class="fas fa-list-ul fa-lg listIcon"></i><i class="far fa-edit fa-lg newMessage"></i></span>
            </b-button>
            <b-collapse
            id="searchMessages"
            role="tabpanel"
        >
        </b-collapse>
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
          <div @click="say('hi')">
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

    <b-card no-body class="lightTable-card" style="margin-right:0">
        <b-card-header class="border-1" style = "height: 70px;"><br>
            
        </b-card-header>
        <div style="height: 77vh">
        <splitpanes class="default-theme">
        <pane class="scroll">
        <el-table class="table-responsive table-light"
                  :data="articles"
                  :row-style="tableRowStyle"
                  :show-header="false"
                  :cell-style="{padding: '0', height: '12px'}"
                  size="small"
                  style="width: 100%;"
                  >
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <div style="font-family:Roboto; font-size: 17px; font-weight: 400; padding-bottom:0px; position:relative; top:-15px; margin-bottom:-25px;">
                        <span class="text-black" >{{row.abstract}}</span>
                    </div>
                    <b-modal id="modal" title="Add article to Collection"> <!--TODO: Move this modal to separate function-->
                        <b-list-group>
                            <button class="btn btn-primary">Artificial Intelligence Collection</button>
                            <button class="btn btn-primary">Articles about electricity</button>
                            <button class="btn btn-primary">My favorites</button>
                            <button class="btn btn-light">Create new Collection</button>
                        </b-list-group>
                    </b-modal>
                </template>
            </el-table-column>
            <el-table-column prop="name" >
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center" style="padding-top: 8px">
                        <b-media-body>
                            <span style="font-family:Roboto; font-size: 18px;" class="font-weight-400 name mb-0">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center" style="position: relative; top:-10px; margin-bottom: -10px;">
                        <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                        <p class="font-weight-400 name mb-0 text-blue" style="font-family:Roboto; font-size: 16px;">{{row.author}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; {{row.journal}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; ({{row.year}})</p>
                        <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                    <span class="button-options border-0" style="padding-left: 10px; position: relative; top:-5px; margin-bottom: -20px;">
                        <button @click="hidePane2 = !hidePane2" title="View"  class="far fa-eye fa-lg button-options"></button>
                        <button title="Download" class="fas fa-file-download fa-lg button-options" ></button>
                        <button title="Links" class="fas fa-external-link-alt fa-lg button-options" ></button>
                        <button title="E-Mail" class="fas fa-envelope fa-lg button-options" ></button>
                        <button title="Collections" v-b-modal.modal class="fas fa-layer-group fa-lg button-options"></button>
                        <button title="Cite" class="fas fa-quote-left fa-lg button-options"></button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        
        </pane>
        <pane v-if="!hidePane2" class="scroll">
            <template>
                <CustomPDF></CustomPDF>
            </template>
        </pane>
        </splitpanes>
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
          vm.$router.push('/login')
        }
      })
    })
  }
};
</script>
<style scoped>
.container{max-width:1170px; margin:auto;}
img{max-width:100%; max-height: 100%; border-radius: 50%;}


.heading{
  background-color: #F78626; 
  margin-bottom: .25rem !important;
  box-shadow: 0 2px 3px #9b9d9e;
}
.newMessage{
  float: right;
  padding: 3px 0px 0px 4px;
}
.listIcon{
    float: right; 
    padding: 3px 0px 0px 4px;
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

.recent_heading {float: left; width:40%;}
/* .srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
} */
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}

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

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>