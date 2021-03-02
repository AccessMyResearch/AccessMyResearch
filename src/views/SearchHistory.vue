<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4"  v-for="item in searchHistory" :key="item[0]">
          <p style="display: inline">Searched for 
            <a href="#" @click='reSearch(JSON.parse(item[1]).query)'>{{ JSON.parse(item[1]).query}}</a> 
            <br>{{JSON.parse(item[1]).time}} 
            <br>{{'Number of Results (DOAJ): ' + JSON.parse(item[1]).total}}
          </p>
          <base-dropdown style="display: inline; margin: 10px">
            <a @click='createNotification(item[1], "daily")' class="dropdown-item" href="#">Repeat Daily</a>
            <a @click='createNotification(item[1], "weekly")' class="dropdown-item" href="#">Repeat Weekly</a>
            <a @click='createNotification(item[1], "monthly")' class="dropdown-item" href="#">Repeat Monthly</a>
          </base-dropdown>
          <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      searchHistory: [],
      reminders: {},
    };
  },
  mounted() {
    this.getSearchHistory();
    this.reminders = JSON.parse(localStorage.reminders);
  },
  methods: {
    reSearch(evt) {
      this.$router
        .push({
          path: "results",
          query: { text: evt, filter: null },
        })
        .catch(() => {});
    }, 
    async getSearchHistory() {
      let history = await axios.get("http://localhost:3000/search");
      this.searchHistory = Object.entries(history.data).slice().reverse();
    },
    createNotification(id, choice) {
      this.reminders[id] = choice;
      localStorage.reminders = JSON.stringify(this.reminders);
    }
  },
};
</script>

<style>
</style>
