<template>
  <div>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <div class="container">
            <div class="messaging">
              <div class="inbox_msg">
                <div class="inbox_people">
                  <div class="headind_srch">
                    <div class="recent_heading">
                      <h4>Recent</h4>
                    </div>
                    <div class="srch_bar">
                      <div class="stylish-input-group">
                        <input
                          type="text"
                          class="search-bar"
                          placeholder="Search"
                        />
                        <span class="input-group-addon">
                          <button type="button">
                            <i class="fa fa-search" aria-hidden="true" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- 
                  <div class="chat_list active_chat">
                    <div class="chat_people">
                      <div class="chat_img">
                        <img src="img/theme/team-4.jpg" alt="sunil" />
                      </div>
                      <div class="chat_ib">
                        <h5>Frank <span class="chat_date">Apr 10</span></h5>
                        <p>
                          Can I be your friend? I will have you know that I
                          graduated top of my class.
                        </p>
                      </div>
                    </div>
                  </div> -->

                  <!-- We are elevated beings, read our code and absorb the knowledge -->
                  <div class="inbox_chat">
                    <div
                      v-for="user in column_users"
                      :key="user.convo_id"
                      class="chat_list"
                      @click="
                        selectItem(user.convo_id);
                        fetchSpecificConversation(user.convo_id);
                      "
                      :class="{
                        active_chat: user.convo_id === activeItem,
                      }"
                    >
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src="img/theme/team-4.jpg" alt="sunil" />
                        </div>
                        <div class="chat_ib">
                          <h5>
                            {{ user.author }}
                            <span class="chat_date">{{ user.date }}</span>
                          </h5>
                          <p>{{ user.message }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mesgs">
                  <div class="msg_history">
                    <div
                      v-for="message in messages"
                      :key="message.id"
                      class="incoming_msg"
                    >
                      <div class="incoming_msg_img">
                        <img src="img/theme/team-4.jpg" alt="sunil" />
                      </div>
                      <div
                        class="[message.author==authUser.displayName? 'sent_msg':'received_msg']"
                      >
                        <div class="received_withd_msg">
                          <p>{{ message.message }}</p>
                          <span class="time_date">
                            {{ message.time }} |{{ message.author }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="type_msg">
                    <div class="input_msg_write">
                      <input
                        @keyup.enter="saveMessage"
                        v-model="message"
                        type="text"
                        class="write_msg"
                        placeholder="Type a message"
                      />
                      <button class="msg_send_btn" type="button">
                        <i class="fas fa-paper-plane" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Message",

  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      column_users: [],
      activeItem: null,
      conversation_id: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchRecentMessages();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
  },
  methods: {
    selectItem(i) {
      this.activeItem = i;
    },
    scrollToBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    },
    saveMessage() {
      // save a message in the database with the current message and username and time
      // then, update the conversation timestamp for all users that belong to this conversation
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
    // Convert Time for displaying on screen
    convertTime(event_date) {
      let d = new Date(event_date);
      return (
        `${d.getMonth()}-${d.getDate()}-${d.getFullYear()} ` +
        `${d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()}`
      );
    },

    // this function will update the conversation timestamp for every user in a given conversation
    async updateConversationTimestamp(conversation_id) {
      // get the conversation object given a certain conversation ID
      let conversation_object = await db
        .collection("Conversations")
        .doc(conversation_id)
        .get();

      // loop through the Users array stored in the conversation object and update the time of the given conversation
      conversation_object.data().Users.forEach((user) => {
        db.collection("Users")
          .doc(user)
          .collection("Conversations")
          .doc(conversation_id)
          .set({ created: new Date().getTime() }, { merge: true });
      });
    },
    // this function gets all conversations from a user and orders them from newest to oldest
    async fetchRecentMessages() {
      if (this.$store.state.user.username === "") {
        this.$store.state.user = await Auth.currentAuthenticatedUser();
      }

      // Get latest conversation ID
      const recentConversations = [];

      await db
        .collection("Users") // enter User collection
        .doc(this.$store.state.user.username) // at current logged in user's conversations
        .collection("Conversations")
        .orderBy("created", "desc") // sort earliest to latest conversation ID
        .onSnapshot(async (conversation_snapshot) => {
          // this if statement checks for whether or not the list already is populated
          // if so, only check to update the list
          // else populate the entire list
          if (this.column_users.length != 0) {
            conversation_snapshot.forEach(async (conversation_document) => {
              // loop through sorted conversations
              await db
                .collection("Conversations") // enter Conversation collection
                .doc(conversation_document.id) // pull specific conversation's messages
                .collection("Messages")
                .orderBy("time", "desc") // sort earliest to latest message
                .limit(1) // limit only the first message since we are populating the preview message tab
                .onSnapshot((message_snapshot) => {
                  message_snapshot.forEach(async (message_document) => {
                    // formatting data correctly
                    let time = this.convertToDate(message_document.data().time);
                    let user_list = await db
                      .collection("Conversations")
                      .doc(conversation_document.id)
                      .get();
                    // storing data in custom object
                    let temp = {
                      author: this.get_user_list(user_list.data().Users),
                      message: message_document.data().message,
                      date: time,
                      convo_id: conversation_document.id,
                    };

                    // default index to -1, look for matching convo_id with changed message (ie updated entry)
                    // store that index if there
                    let index = -1;
                    this.column_users.forEach((user) => {
                      if (
                        temp.convo_id === user.convo_id &&
                        temp.message !== user.message
                      ) {
                        index = this.column_users.indexOf(user);
                      }
                    });

                    // if index >= 0 meaning that there is an updated entry at postition index
                    if (index >= 0) {
                      // remove the out of date entry from the array
                      this.column_users.splice(index, 1);

                      // Insert the updated entry to the front of the array
                      this.column_users.unshift(temp);
                    }
                  });
                });
            });
          } else {
            conversation_snapshot.forEach(async (conversation_document) => {
              // loop through sorted conversations
              await db
                .collection("Conversations") // enter Conversation collection
                .doc(conversation_document.id) // pull specific conversation's messages
                .collection("Messages")
                .orderBy("time", "desc") // sort earliest to latest message
                .limit(1) // limit only the first message since we are populating the preview message tab
                .get()
                .then((message_snapshot) => {
                  // loop through the single message
                  message_snapshot.forEach(async (message_document) => {
                    // format data and input into custom object
                    let time = this.convertToDate(message_document.data().time);
                    let user_list = await db
                      .collection("Conversations")
                      .doc(conversation_document.id)
                      .get();
                    let temp = {
                      author: this.get_user_list(user_list.data().Users),
                      message: message_document.data().message,
                      date: time,
                      convo_id: conversation_document.id,
                    };
                    // store data into array
                    this.column_users.push(temp);
                  });
                });
            });
          }
        });
    },

    // formats a user array found in the conversation object into a string of the users concatenated with commas
    get_user_list(users) {
      let return_string = "";
      users.forEach((user) => {
        if (user !== this.$store.state.user.username) {
          if (return_string !== "") {
            return_string += ", ";
          }
          return_string += user;
        }
      });
      return return_string;
    },

    // this function will get a specific conversation given an id
    async fetchSpecificConversation(conversation_id) {
      // Get all messages from Database and display on screen
      this.conversation_id = conversation_id;
      db.collection("Conversations")
        .doc(conversation_id)
        .collection("Messages")
        .orderBy("time", "asc")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            let curr_data = doc.data();
            curr_data.time = this.convertTime(new Date().getTime());
            allMessages.push(curr_data);
            this.messages = allMessages;
          });
          // Auto Scroll to bottom
          setTimeout(() => {
            this.scrollToBottom();
          }, 200);
        });
    },

    // convert a date to Month Day format (ie April 10)
    convertToDate(event_date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let d = new Date(event_date);

      // let timeCorrection = d.getTimezoneOffset() - event_timezone_offset;
      // d.setMinutes(d.getMinutes() + timeCorrection);
      return `${monthNames[d.getMonth()]} ${d.getDate()}`;
    },
  },

  // authentication before accessing the chat room
  // Global Before Guards
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  },
};
</script>
<style scoped>
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
/* .srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
} */
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.chat_list:hover {
  cursor: pointer;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

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
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
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

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
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
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>