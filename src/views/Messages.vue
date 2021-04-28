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
                  <div class="inbox_chat">
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
                    </div>
                    <div class="chat_list">
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src="img/theme/team-4.jpg" alt="sunil" />
                        </div>
                        <div class="chat_ib">
                          <h5>Geralt <span class="chat_date">Oct 14</span></h5>
                          <p>
                            Sure we can meet at 10 tomorrow. Please bring a
                            laptop with you.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="chat_list">
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src="img/theme/team-4.jpg" alt="sunil" />
                        </div>
                        <div class="chat_ib">
                          <h5>
                            Jennifer <span class="chat_date">Jan 01</span>
                          </h5>
                          <p>You do what you gotta do.</p>
                        </div>
                      </div>
                    </div>
                    <div class="chat_list">
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src="img/theme/team-4.jpg" alt="sunil" />
                        </div>
                        <div class="chat_ib">
                          <h5>John <span class="chat_date">Dec 25</span></h5>
                          <p>This project is very difficult.</p>
                        </div>
                      </div>
                    </div>
                    <div class="chat_list">
                      <div class="chat_people">
                        <div class="chat_img">
                          <img src="img/theme/team-4.jpg" alt="sunil" />
                        </div>
                        <div class="chat_ib">
                          <h5>Alex <span class="chat_date">Dec 26</span></h5>
                          <p>Our school has not prepared us for this.</p>
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
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchMessages();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
  },
  methods: {
    scrollToButtom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    },
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
      this.message = null;
    },
    async fetchMessages() {
      //Get User
      let document = await db
        .collection("Users")
        .doc(this.$store.state.user.username)
        .get();

      // If User doesn't exist, create new user and its conversations
      if (!document || !document.exists) {
        // Create User
        await db
          .collection("Users")
          .doc(this.$store.state.user.username)
          .set({ UserID: this.$store.state.username }, { merge: true });

        // Create conversations collection
        await db
          .collection("Users")
          .doc(this.$store.state.user.username)
          .collection("Conversations")
          .doc()
          .set({ created: firebase.firestore.FieldValue.serverTimestamp() });

        //TODO: Delete Dummy Document
      }

      // Get latest conversation ID
      const snapshot = await db
        .collection("Users")
        .doc(this.$store.state.user.username)
        .collection("Conversations")
        .orderBy("created", "desc")
        .limit(1)
        .get();
      snapshot.forEach((doc) => {
        this.conversation_id = doc.id;
      });

      // Get all messages from Database and display on screen
      db.collection("Conversations")
        .doc(this.conversation_id)
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
            this.scrollToButtom();
          }, 200);
        });
    },

    // Convert Time for displaying on screen
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