<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <router-link class="navbar-brand" to="/">
      <img :src="logo" width="80%" class="navbar-brand-img" alt="AccessMyResearch">
    </router-link>
    <!-- Navbar links -->
    <b-form
      class="navbar-search form-inline w-100"
      :class="{
        'navbar-search-dark': type === 'default',
        'navbar-search-light': type === 'light',
      }"
      id="navbar-search-main"
      @submit.prevent="onSubmit"
    >
      <b-form-group class="mb-0">
        <b-input-group class="input-group-alternative input-group-merge">
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-search"/>
            </span>
          </div>
          <b-form-input
            id="search"
            v-model="search.text"
            @input="filterRecentSearches"
            @focus="modal = false"
            @click="openAutoComplete"
            autocomplete="off"
            type="text"
            placeholder="Search by keyword"
          >
          </b-form-input>
          <!-- autocomplete start -->
          <div
            v-if="filteredRecentSearches && modal"
            class="AutoCompleteDropDown"
          >
            <ul>
              <b-dropdown-item
                v-for="filteredRecentSearch in filteredRecentSearches"
                :key="filteredRecentSearch"
                @click="setSearch(filteredRecentSearch)"
              >
                {{ filteredRecentSearch }}
              </b-dropdown-item>
            </ul>
          </div>
          <!-- autocomplete start -->
          <!-- start here  -->
          <div class="SearchDropDown">
            <b-dropdown variant="transparent" style="width:0%" right text="">
              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.SortByAccordion
                      variant="primary"
                      >Sort By</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="SortByAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-select
                          id="sortByFilter"
                          @input="sort"
                          v-model="selectedSortBy"
                          :options="sortBy"
                        ></b-form-select>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.areaAccordion variant="primary">Area</b-button>
                  </b-card-header>
                  <b-collapse
                    id="areaAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-checkbox-group
                          id="areaFilter"
                          v-model="selectedFilters"
                          @input="sort"
                          :options="areas"
                          name="area"
                        ></b-form-checkbox-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.expertiseAccordion
                      variant="primary"
                      >Expertise</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="expertiseAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-checkbox-group
                          id="expertiseFilter"
                          v-model="selectedFilters"
                          :options="expertise"
                          name="expertise"
                        ></b-form-checkbox-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.accessibilityAccordion
                      variant="primary"
                      >Accessibility</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="accessibilityAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-group>
                        <b-form-checkbox-group 
                          style="column-count: 2;"
                          id="accessibilityFilter"
                          v-model="selectedFilters"
                          :options="accessibilityOptions"
                          name="acccessibility"
                        ></b-form-checkbox-group>
                        </b-form-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.yearAccordion variant="primary">Year</b-button>
                  </b-card-header>
                  <b-collapse
                    id="yearAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <br/>
                        <vue-slider
                          v-model="yearRange"
                          :min="1950"
                          :max="2020"
                          :enable-cross="false"
                          :tooltip="'always'"
                        ></vue-slider>
                        <br/>
                        <div>Years Selected: {{ yearRange }}</div>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.typeAccordion variant="primary">Type</b-button>
                  </b-card-header>
                  <b-collapse
                    id="typeAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-checkbox-group
                          style="column-count: 2;"
                          id="typeFilter"
                          v-model="selectedFilters"
                          :options="types"
                          name="type"
                        ></b-form-checkbox-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.databaseAccordion
                      variant="primary"
                      >Database</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="databaseAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-checkbox-group
                          style="column-count: 2;"
                          id="databaseFilter"
                          v-model="selectedFilters"
                          :options="databases"
                          name="database"
                        ></b-form-checkbox-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <div class="accordion" role="tablist">

                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.journalAccordion
                      variant="primary"
                      >Journals</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="journalAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-dropdown-group class="small">
                        <b-form-checkbox-group
                          id="journalFilter"
                          v-model="selectedFilters"
                          @input="sort"
                          :options="journals"
                          name="journals"
                        ></b-form-checkbox-group>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

                <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle.defaultAccordion
                      variant="primary"
                      >Default</b-button
                    >
                  </b-card-header>
                  <b-collapse
                    id="defaultAccordion"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body v-if="defaultFilterCheckbox">
                      <b-dropdown-group class="small">
                        <div>{{ selectedFilters }}</div>
                      </b-dropdown-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>

              <!--TODO: figure out why click isn't working first 3 times -->
              <input
                type="checkbox"
                v-model="defaultFilterCheckbox"
                @click="defaultFilterCheckboxChecked()"
              />
              Save current filters as default
              <b-button class="btn float-right" variant="primary">Search</b-button>
            </b-dropdown>
          </div>
        </b-input-group>
      </b-form-group>
    </b-form>
    <b-navbar-nav class="align-items-center ml-auto">
      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toUpload"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i class="fas fa-plus TopIcon"/>
      </a>

      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toDonate"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i class="fas fa-donate TopIcon"/>
      </a>

      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toCollections"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i class="fas fa-layer-group TopIcon"/>
      </a>

      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toNetwork"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i class="fas fa-user-friends TopIcon"/>
      </a>

      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a
          slot="title-container"
          class="nav-link nav-link-icon"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          @click="toggleNotificationDropDown"
        >
          <i class="fas fa-bell TopIcon"/>
        </a>
        <div v-for="user in users" :key="user.id">
          <a class="dropdown-item" @click="reroute(user)" v-if="signedIn">
            <i class="fas fa-user-friends"></i>
            {{ user.id }} {{ user.message }}
            <small class="form-text text-muted">{{ user.created }}</small>
          </a>
        </div>
        <span v-for="(key, val) in this.reminders" v-bind:key="val">
          <a class="dropdown-item" to="/notifications">
            <i class="fas fa-search"/>
            Search for: {{ val }}
            <small class="form-text text-muted">{{ key }}</small>
          </a>
        </span>
        <div class="dropdown-divider"/>
        <router-link to="/notifications" class="dropdown-item">
          <i class="fas fa-clock"/>
          <span>All Requests </span>
        </router-link>
        <router-link to="/notifications" class="dropdown-item">
          <i class="fas fa-clock"/>
          <span>All Notifications </span>
        </router-link>
        <b-alert show variant="light" class="text-dark" v-if="!signedIn">
          <i class="fas fa-exclamation-circle fa-lg"/>
          In order to access this feature, you must login. You can login
          <router-link class="font-weight-bolder text-dark" to="/login">here.</router-link>
        </b-alert>
      </base-dropdown>

      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a
          slot="title-container"
          class="nav-link nav-link-icon"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          @click="redirect"
        >
          <i class="fas fa-comment TopIcon"/>
        </a>
        <a class="dropdown-item" to="/messages" v-if="signedIn">
          <!-- TODO: Link to Messages-->
          <i class="fas fa-comment"/>
          Mehmet Günal: Check out my research!
          <small class="form-text text-muted">Yesterday</small>
        </a>
        <a class="dropdown-item" to="/messages" v-if="signedIn">
          <i class="far fa-comment"/>
          Greg Kitchen: Check out his research!
          <small class="form-text text-muted">1 week ago</small>
        </a>
        <div class="dropdown-divider"/>
        <router-link to="/notifications" class="dropdown-item">
          <i class="fas fa-clock"/>
          <span>All Messages </span>
        </router-link>
        <b-alert show variant="light" class="text-dark" v-if="!signedIn">
          <i class="fas fa-exclamation-circle fa-lg"/>
          In order to access this feature, you must login. You can login
          <router-link class="font-weight-bolder text-black" to="/login">here.</router-link>
        </b-alert>
      </base-dropdown>

      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="/img/theme/team-4.jpg" />
              <!--TODO: Show profile pic-->
            </span>
          </b-media>
          <!-- </b-media> -->
        </a>

        <template>
          <b-dropdown-header class="noti-title" v-if="signedIn">
            <h6 class="text-overflow m-0">Hi, Mehmet!</h6>
          </b-dropdown-header>
          <b-dropdown-item to="/profile" v-if="signedIn">
            <i class="fas fa-user"/>
            <span>My profile</span>
          </b-dropdown-item>
          <b-dropdown-item to="/search-history">
            <i class="fas fa-history"/>
            <span>Search History</span>
          </b-dropdown-item>
          <div class="dropdown-divider" v-if="signedIn"/>
          <b-dropdown-item to="/settings" v-if="signedIn">
            <i class="fas fa-cog"/>
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item to="/login" v-if="!signedIn">
            <i class="fas fa-sign-in-alt"/>
            <span>Login</span>
          </b-dropdown-item>
          <b-dropdown-item @click="signOut" v-if="signedIn">
            <i class="fas fa-sign-out-alt"/>
            <span>Logout</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { Auth } from "aws-amplify";
import axios from "axios";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries.js';
import { listFollows, listRequestss } from '../../graphql/queries.js';

export default {
  components: {
    //CollapseTransition,
    BaseNav,
    //Modal,
    VueSlider
  },
  props: {
    logo: {
      type: String,
      default: '/img/brand/orange.png',
      description: 'AccessMyResearch Logo'
    },
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    signedIn(){
      return this.$store.state.signedIn;
    }
  },
  mounted() {
    if (localStorage.selectedFilters) {
      this.selectedFilters = localStorage.selectedFilters.split(",");
    }

    if (localStorage.yearRange) {
      this.yearRange = localStorage.yearRange.split(",");
    }

    if (localStorage.defaultFilterCheckbox) {
      this.defaultFilterCheckbox = localStorage.defaultFilterCheckbox;
    }

    this.hover_flag = false;
    var inside = this;
    this.getSearchHistory();
    this.getReminders();
  },
  created()
  {
    this.listUsers();
  },
  data() {
    return {
      activeNotifications: false,
      users: [],
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      timeTotal: 0,
      reminders: [],
      //autocomplete start
      modal: false,
      follows: [],
      recentSearches: [],
      filteredRecentSearches: [],
      defaultFilterCheckbox: false,
      // autocomplete end
      /*results_data_actual: [],
      results_data: [],*/
      yearRange: [1950, 2020],
      selectedFilters: [],
      search: { filter: null, text: "" },
      selectedSortBy: "most-recent",
      sortBy: [
        {
          text: "Most Recent",
          value: "most-recent",
        },
        {
          text: "Most Cited",
          value: "most-cited",
        },
        {
          text: "Most Discussed",
          value: "most-discussed",
        },
        {
          text: "Most Rated",
          value: "most-rated",
        },
        {
          text: "Highest Rated",
          value: "highest-rated",
        },
        {
          text: "Trending",
          value: "trending",
        },
        {
          text: "Expertise",
          value: "expertise",
        },
      ],
      areas: [
        {
          text: "Computer Science",
          value: "cs",
        },
        {
          text: "Electrical Engineering",
          value: "ee",
        },
        {
          text: "Neuroscience",
          value: "ns",
        },
      ],
      expertise: [
        {
          text: "Anyone",
          value: "any",
        },
        {
          text: "1-5 Peer Review Publications",
          value: "1-5",
        },
        {
          text: "5-20 Peer Review Publications",
          value: "5-20",
        },
        {
          text: "20-100 Peer Review Publications",
          value: "20-100",
        },
        {
          text: "100+ Peer Review Publications",
          value: "100+",
        },
      ],
      accessibilityOptions: [
        {
          text: "Open",
          value: "open",
        },
        {
          text: "With Permission",
          value: "with-permission",
        },
        {
          text: "Embargoed",
          value: "embargoed",
        },
        {
          text: "Restricted",
          value: "restricted",
        },
      ],
      types: [
        {
          text: "Peer Review",
          value: "peer-review",
        },
        {
          text: "Pre Print",
          value: "pre-print",
        },
        {
          text: "Book Chapter",
          value: "book-chapter",
        },
        {
          text: "Poster",
          value: "poster",
        },
        {
          text: "Presentation",
          value: "presentation",
        },
        {
          text: "Results",
          value: "results",
        },
        {
          text: "Figures",
          value: "figures",
        },
        {
          text: "Video",
          value: "video",
        },
        {
          text: "Stream",
          value: "stream",
        },
        {
          text: "Blog",
          value: "blog",
        },
        {
          text: "Vlog",
          value: "vlog",
        },
        {
          text: "Courses",
          value: "courses",
        },
      ],
      databases: [
        {
          text: "arXiv",
          value: "arxiv",
        },
        {
          text: "CORE",
          value: "core",
        },
        {
          text: "DBLP",
          value: "dblp",
        },
        {
          text: "PubMed",
          value: "pubmed",
        },
        {
          text: "Unpaywall",
          value: "unpaywall",
        },
      ],
      journals: [
        {
          text: "PLOS ONE", 
          value: "plos one"
        },
        {
          text: "Royal Society Open Science",
          value: "royal society open science"
        },
        {
          text: "Nature",
          value: "nature"
        },
        {
          text: "Science",
          value: "science"
        },
      ]
    };
  },
  methods: {
    async onSubmit(evt) {
      this.timeTotal = 0;
      let duplication = false;
      for (let i = 0; i < this.recentSearches.length; i++) {
        //check for recent searches
        if (this.recentSearches[i] == this.search.text) {
          duplication = true;
        }
      }
      if (!duplication) {
        //No duplication for recent searches allowed
        this.recentSearches.push(this.search.text); //autocomplete adding to recentSearches array
      }
      this.$router
        .push({
          name: "results",
          query: { text: this.search.text, filter: this.search.filter },
        })
        .catch(() => {});
    },
    async getSearchHistory() {
      let history = await axios.get("http://localhost:3000/search");
      this.recentSearches = Object.entries(history.data).reverse().slice(0, 5);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    signOut() {
      /*If the user is signed in, the Auth.signOut 
      function will sign the user out of the account and redirect to the login page. 
      */
      Auth.signOut()
        .then((data) => {
          this.$store.state.signedIn = !!data;
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    redirect() {
      if (!this.$store.state.signedIn) {
        this.$router.push("/login");
      }
    },
    async listUsers() 
    {
      const listRequests = await API.graphql(graphqlOperation(listRequestss)); //returns a JSON of all the rows in the Requests table of DynamoDB

      for(const [key, value] of Object.entries(listRequests.data.listRequestss.items)) //for all items in the rows
      {
        if(value.user != null && value.friend != null && value.user.id == this.$store.state.user.username) //if the user id equals the current user
        {
          //push the request row to the store (to show in notifications)
          this.$store.state.requests.push(
            {
              id: value.friend.id,
              created: value.createdAt,
              message: "wants to add you as a connection"
            });
        }
      }

      this.users = this.$store.state.requests; //setting the current users array to the store's requests array

      const followList = await API.graphql(graphqlOperation(listFollows)); //returns a JSON of all the rows in the Follows table of DynamoDB

      for(const [key, value] of Object.entries(followList.data.listFollows.items)) //for all items in the rows
      {
        if(value.user != null && value.friend != null && value.friend.id == this.$store.state.user.username) //if the user id equals the current user
        {
          //push the follow row to the store (to show in notifications)
          this.$store.state.follows.push(
            {
              id: value.user.id,
              created: value.createdAt,
              message: "followed you!"
            });

          //push the current row to the user array (to show in notifications)
          this.users.push({
              id: value.user.id,
              created: value.createdAt,
              message: "followed you!"
            })
        }
      }
    },
    sort() {
      if (this.search.text) {
        this.onSubmit();
      }

      /*make a if-statement for the Sort By filter.
      console.log(this.search.filter);
      this.search.filter == "b"
        ? this.results_data.sort(function(a, b) {
            return b.likes - a.likes;
          })
        : this.results_data.sort(function(a, b) {
            return b.ratings - a.ratings;
          });*/
    },
    search_text() {
      //FOR DATABASE IN FUTURE
      /*console.log(this.search.text);
      var inside = this;
      this.results_data = this.results_data_actual.filter(function (results) {
        if (
          results.place //https://www.freecodecamp.org/news/how-to-set-up-responsive-ui-search-in-vue-js-bf6007b7fc0f/
            .toLowerCase()
            .indexOf(inside.search.text.toLowerCase()) != "-1"
        ) {
          return results;
        }
      });*/
    },
    //autocomplete start
    filterRecentSearches() {
      this.getSearchHistory();

      this.filteredRecentSearches = this.recentSearches.filter(
        (s) => {
          return this.search.text && JSON.parse(s[1]).query
            .toLowerCase()
            .startsWith(this.search.text.toLowerCase());
        }
      );
      this.filteredRecentSearches = this.filteredRecentSearches.map(item => JSON.parse(item[1]).query).filter((val, index, self) => self.indexOf(val) == index)
},
    setSearch (recentSearch) {
      this.search.text = recentSearch;
      this.modal = false;
    },
    openAutoComplete() {
      this.modal = true;
    },
    //autocomplete end

    //default filter start
    defaultFilterCheckboxChecked() {
      localStorage.selectedFilters = this.selectedFilters;
      localStorage.yearRange = this.yearRange;
      localStorage.defaultFilterCheckbox = this.defaultFilterCheckbox;

      if (localStorage.defaultFilterCheckbox == "true") {
        localStorage.clear();
        return;
      }
    },
    getReminders() {
      this.reminders = JSON.parse(localStorage.reminders);
    },
    toUpload() {
      this.$router.push('upload');
    },
    toDonate() {
      this.$router.push('donate');
    },
    toCollections() {
      this.$router.push('collections');
    },
    toNetwork() {
      this.$router.push('network-list');
    },
    reroute(user) {
      //on click of follow notification, redirects to follows page
      if(user.message == "followed you!")
      {
        this.$router.push('follows');
      }
      else
      {
        //on click of wants to add you as a connection notification, redirects to requests page
          this.$router.push('requests');
      }
    }
  },
};
</script>
<style scoped>
.AutoCompleteDropDown {
  position: absolute;
  background: white;
  border-radius: 4px;
  top: 45px;
  width: 350px;
}
.TopIcon {
  color: white;
} /*TODO: Get variables from assets/custom/_variables.scss instead*/
.TopIcon:hover {
  color: #F78626;
}
</style>