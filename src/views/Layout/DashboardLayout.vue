<template>
  <div class="wrapper">
    <notifications />
    <!--TODO: Add some code back here for mobile navigation -->
    <!--<side-bar/>-->
    <div class="main-content">
      <dashboard-navbar
        :type="$route.meta.navbarType"
        :chatIsOpen="chatIsOpen"
        v-on:update="chatToggle($event)"
        v-on:convoidUpdate="conversation_idToggle($event)"
        v-on:usernameUpdate="username_Toggle($event)"
      />
      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view />
          <!-- style="height:90vh; overflow-y:scroll;" -->
        </fade-transition>

        <!-- <popup-chat/> TODO: attempted to use PopupChatBox.vue here instead of writing into Layout, need to fix -->

        <!-- Separate div to create maximize functionality -->
        <div
          id="chatbox-area"
          class="chatbox-area"
          v-if="chatIsOpen && chatIsMinimized"
          style="display: flex; flex-direction: column"
        >
          <div
            class="chat-header"
            style="
              width: 100%;
              height: 1.75rem;
              background-color: #4577b8;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <b-icon-arrows-angle-expand
              class="chatbox-minimize-button"
              style="
                color: white;
                margin-left: 0.5rem;
                height: 0.75rem;
                width: 0.75rem;
              "
              @click="maximizeChat"
            ></b-icon-arrows-angle-expand>
            <p
              style="
                color: white;
                font-weight: bold;
                width: fit-content;
                margin: auto;
              "
            >
              Geralt
              <!-- TODO: pass in chat person's name variable here -->
            </p>
            <b-icon-x
              class="chatbox-close-button"
              style="color: white"
              @click="closeChat"
            ></b-icon-x>
            <!-- closes chat on X -->
          </div>
        </div>

        <!-- Div for everything contained inside the chatbox when opened-->
        <div
          id="chatbox-area"
          class="chatbox-area"
          v-if="chatIsOpen && !chatIsMinimized"
          style="display: flex; flex-direction: column"
        >
          <div
            class="chat-header"
            style="
              width: 100%;
              height: 3rem;
              background-color: #4577b8;
              margin-bottom: 0.5rem;
              display: flex;
              justify-content: space-between;
            "
          >
            <b-icon-dash
              class="chatbox-minimize-button"
              style="color: white"
              @click="minimizeChat"
            ></b-icon-dash>
            <p
              style="
                color: white;
                font-weight: bold;
                width: fit-content;
                margin: auto;
              "
            >
              Geralt
              <!-- TODO: pass in chat person's name variable here -->
            </p>
            <b-icon-x
              class="chatbox-close-button"
              style="color: white"
              @click="closeChat"
            ></b-icon-x>
            <!-- closes chat on X -->
          </div>

          <div class="card-content chat-content" style="padding: 0 0.5rem">
            <div v-for="message in messages" :key="message.id" class="content">
              <!-- 

                1. Check if user is logged in or not
                  - If user is logged in, give class "writer-user"
                2. Get name, most recent message, and timestamp


               -->
              <div
                v-if="loggedInUsername == message.author"
                class="chat-message-group writer-user"
              >
                <div class="chat-messages">
                  <!-- <div class="message">{{ message.message }}</div>
                  <div class="from">{{ message.time }}</div> -->
                  <div class="message">{{ message.message }}</div>
                  <div class="from">{{ message.time }}</div>
                </div>
              </div>

              <div v-else class="chat-message-group">
                <div class="chat-thumb"></div>
                <div
                  class="chat-messages"
                  style="display: flex; align-items: flex-end"
                >
                  <!-- Add in the image file again for each message but change dimensions to fit chatbox -->
                  <img
                    class="img_tiny"
                    src="img/theme/team-4.jpg"
                    alt="sunil"
                  />
                  <div class="message">{{ message.message }}</div>
                </div>
              </div>
            </div>
            <!-- <div class="chat-message-group">
              <div class="typing">Typing</div>
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div> -->
          </div>
          <footer class="card-footer" id="chatBox-textbox">
            <textarea
              id="chatTextarea"
              class="chat-textarea"
              placeholder="Type here"
              @keyup.enter="saveMessage"
              v-model="message"
              v-on:focus="expandTextArea()"
              v-on:blur="dexpandTetArea()"
            ></textarea>
          </footer>
        </div>
      </div>
      <content-footer v-if="!$route.meta.hideFooter" />
    </div>
  </div>
</template>
<script>
// v-on:focus="expandTextArea()"
// v-on:blur="dexpandTetArea()"

/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import { Auth, AuthHelperRoles } from "@/util/auth-helper.js";
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    // DashboardContent,
    FadeTransition,
  },

  data() {
    return {
      // signedIn: false,
      messages: null,
      message: null,
      chatIsOpen: false,
      chatIsMinimized: false,
      loggedInUsername: null,
    };
  },

  async created() {
    // if (this.$store.state.user.username === null) {
    //   this.$store.state.user = await Auth.currentAuthenticatedUser();
    // }
    // loggedInUsername = this.$store.state.user.username;
  },

  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isExpert() {
      return this.$store.state.isExpert;
    },
  },
  methods: {
    saveMessage() {
      db.collection("Conversations")
        .doc(this.conversation_id)
        .collection("Messages")
        .doc()
        .set({
          author: this.$store.state.user.username,
          message: this.message,
          time: new Date().getTime(),
        });

      this.updateConversationTimestamp(this.conversation_id);
      this.message = null;
    },
    initScrollbar() {
      if (navigator.platform.startsWith("Win")) {
        //Checks if platform is Windows
        initScrollbar("sidenav");
      }
    },

    scrollToBottom() {
      let box = document.querySelector(".card-content chat-content");
      box.scrollTop = box.scrollHeight;
    },

    updateUserStatus: async function () {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.state.signedIn = true;
        this.$store.state.user = user;
        this.$store.state.isAdmin = await AuthHelperRoles.isAdmin(user);
        this.$store.state.isExpert = await AuthHelperRoles.isExpert(user);
      } catch (err) {
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
        this.$store.state.isAdmin = false;
        this.$store.state.isExpert = false;
      }
    },
    redirect() {
      if (!this.signedIn) {
        this.$router.push("/login"); //if not signed in, the page will redirect to login page
      }
    },

    chatToggle(event) {
      this.chatIsOpen = event; // updates the event variable each time chat is opened or closed
    },
    conversation_idToggle(event) {
      this.conversation_id = event;
      this.fetchSpecificConversation(event);
    },
    username_Toggle(event) {
      this.loggedInUsername = event;
    },
    closeChat() {
      this.chatIsOpen = false;
    },
    minimizeChat() {
      this.chatIsMinimized = true;
    },

    maximizeChat() {
      this.chatIsMinimized = false;
    },

    async fetchSpecificConversation(convo_id) {
      // if (!chatIsOpen && chatIsMinimized) break;
      // Get all messages from Database and display on screen
      db.collection("Conversations")
        .doc(convo_id)
        .collection("Messages")
        .orderBy("time", "asc")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            let curr_data = doc.data();
            curr_data.time = this.convertTime(curr_data.time);
            allMessages.push(curr_data);
            this.messages = allMessages;
          });
          // Auto Scroll to bottom
          // setTimeout(() => {
          //   this.scrollToBottom();
          // }, 200);
        });
    },
    convertTime(event_date) {
      let d = new Date(event_date);
      // let timeCorrection = d.getTimezoneOffset() - event_timezone_offset;
      // d.setMinutes(d.getMinutes() + timeCorrection);
      return (
        `${d.getMonth()}-${d.getDate()}-${d.getFullYear()} ` +
        `${d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()}`
      );
    },
  },
  mounted() {
    this.updateUserStatus();
    this.initScrollbar();
  },
};
</script>

<style lang="scss">
.show {
  display: block;
}
.thumb-user-list {
  display: none;
}
.thumb-user-list .image img {
  border-radius: 30px;
}
.usersChatList .card-header {
  background: #683db8;
  font-size: 13px;
}
.chatBox {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  margin: 40px;
  margin-bottom: 0;
  font-size: 13px;
}
.chatbox-area {
  background-color: white;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
  border: 0.2rem solid #4577b8;
  width: 350px;
}
.chatbox-close-button {
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
}

.chatbox-minimize-button {
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
}
.img_tiny {
  height: 1.75rem;
  width: 1.75rem;
}
.chat-content {
  overflow: auto;
  height: 300px;
}
.chatBox .card {
  border-radius: 4px;
}
.chatBox .card-header {
  background: #683db8;
}
.header-title {
  height: 50px;
}
.card-header-title i {
  font-size: 10px;
  color: #32e4cd;
  margin-right: 6px;
}
.card-header .card-header-title {
  color: #fff;
}
.chat-content small {
  margin: 0;
}
.chat-content p {
  background: #ecf1f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 0;
}
.my-content .media-content {
  width: 80%;
}
.my-content .message {
  float: right;
  background: #f78626;
  color: #fff;
  text-align: right;
  padding: 10px;
  margin-bottom: 4px;
  font-size: 13px;
}
.my-content .chat-content small {
  float: right;
}
.my-content small {
  display: block;
  float: right;
  width: 100%;
  text-align: right;
}
.chat-textarea {
  font-size: 14px;
  padding: 8px;
  height: 40px;
  width: 100%;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
}
.chat-message-group {
}

.chat-message-group .chat-thumb {
  float: left;
  width: 20%;
}
.chat-message-group .chat-messages {
  float: left;
  width: 80%;
  margin-bottom: 20px;
}
.chat-message-group .message {
  float: left;
  padding: 10px;
  background: #ecf1f8;
  font-size: 13px;
  border-radius: 5px;
  // margin-bottom: 3px;
}
.chat-messages .from {
  float: left;
  display: block;
  width: 100%;
  text-align: left;
  font-size: 11px;
}
.chat-thumb img {
  border-radius: 40px;
}
.writer-user .chat-messages {
  float: right;
  width: 100%;
}
.writer-user .chat-messages .message {
  float: right;
  background: #f78626;
  color: #fff;
}
.writer-user .chat-messages .from {
  float: left;
  display: block;
  width: 100%;
  text-align: right;
}
.chat-message-group .typing {
  float: left;
}
.chatBox .card-header-icon i {
  color: #fff;
  font-size: 13px;
}
/* CSSS */
.outside-box {
  height: 100px;
  background: #f8c;
  width: 200px;
  margin: 20px;
  overflow: auto;
}
.outside-box .content-insider {
  height: 300px;
  background: #c9c;
}
/* CSS Spinner */
.spinner {
  margin: 0 30px;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 4px;
  height: 4px;
  background-color: #888;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.card-header-title img {
  border-radius: 40px;
}

.chat_img {
  float: left;
  width: 11%;
}
</style>

