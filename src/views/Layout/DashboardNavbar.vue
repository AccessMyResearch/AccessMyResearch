<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
    
  >
    <router-link to="/">

      <img class="logo" :src="logo" style="width:200px; max-width:none;" alt="AccessMyResearch">
      <img class="logoSmall" :src="logoSmall" style="width:50px; max-width:none; position:absolute; top:150px; right:300px; z-index:999;" alt="AccessMyResearch">
      
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
      
        <b-input-group class="input-group-alternative input-group-merge border-0 rounded-0 w-75" style="height:40px; position: relative; min-width: 15px;">
          
          <b-form-input
            id="search"
            v-model="search.text"
            @input="filterRecentSearches"
            @focus="modal = false"
            @click="openAutoComplete"
            v-click-outside="closeModal"
            autocomplete="off"
            type="text"
            placeholder="Search by keyword"
            class="text-primary bg-white"
            style="border-radius: .375rem"
            
          >
          </b-form-input>
          <!-- <b-input-group-append style="height:40px"> -->
            
              <button class="bg-orange border-0" type="submit" style="border-radius:4px; position:relative;"><i class="fas fa-search text-white lrgIcon p-1 " /></button>
            
          <!-- </b-input-group-append> -->
          
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
            <!-- <b-dropdown variant="transparent" style="width:0%" right text="">
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

              TODO: figure out why click isn't working first 3 times 
              <input
                type="checkbox"
                v-model="defaultFilterCheckbox"
                @click="defaultFilterCheckboxChecked()"
              />
              Save current filters as default
              <b-button class="btn float-right" variant="primary">Search</b-button>
            </b-dropdown> -->
          </div>
        </b-input-group>
      
    </b-form>
    
    <b-navbar-nav class="align-items-center ml-auto" >
      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toggleResearchWindow"
          aria-expanded="false"
          v-if="signedIn"
          id = "uploadButton"
        >
        <!-- v-bind binds a style element based on a condition, so here we use the iconColor styling only if the website reroutes to the Uploads page -->
          <i v-bind:class="{iconColor: researchWindowIsOpen == true}" class="fas fa-plus fa-lg TopIcon"/>     
      </a>

      <!-- Sets the outer overlay as gray and places the Upload page div on top of the overlay -->
      <div id="outer-overlay" class="overlay" @click="overlay" v-if="researchWindowIsOpen" >
          <Upload :researchWindowIsOpen="researchWindowIsOpen" v-on:update="researchWindowToggle($event)" class="research-window"/>
      </div>
     
      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="https://www.paypal.com/donate/?hosted_button_id=A2S4AUZ8RTDYS"
          role="button"
          target="_blank"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i  v-bind:class="{iconColor: this.$route.path == '/donate'}" class="fas fa-donate fa-lg TopIcon"/>
      </a>
      <a
          slot="title-container"
          class="nav-link nav-link-icon nav-item"
          href="#"
          role="button"
          @click="toProject"
          aria-expanded="false"
          v-if="signedIn"
        >
          <i v-bind:class="{iconColor: this.$route.path == '/project' }" class="fas fa-project-diagram fa-lg TopIcon"/>
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
          <i v-bind:class="{iconColor: this.$route.path == '/collections' }" class="fas fa-book-open fa-lg TopIcon"/>
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
          <i v-bind:class="{iconColor: this.$route.path == '/network-list' }" class="fas fa-user-friends fa-lg TopIcon"/>
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
          <!-- <i v-bind:class="{iconColor: (this.$route.path == '/notifications') || (@click="toggleNotificationDropDown") }" class="fas fa-bell fa-lg TopIcon"/> -->
          <i v-bind:class="{iconColor: (this.$route.path == '/notifications')}" class="fas fa-bell fa-lg TopIcon"/>
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
        <b-alert show variant="default" class="text-dark" v-if="!signedIn">
          <i class="fas fa-exclamation-circle"/>
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
          <i v-bind:class="{iconColor: (this.$route.path == '/messages')}" class="fas fa-comment-dots fa-lg TopIcon"/>
        </a>
        
<!-- Div for the dropdown menu, sets the vertical scroll and height -->
        <div style="overflow-y:scroll; height: 20rem;"> 
            <div 
              class="chat_people dropdown-item" 
              @click="togglePopupChat">               <!--sets the click for the popup chat -->
              
              <!-- copied over the images and text from the main messages page and resized -->
              <div class="chat_img"> <img src="img/theme/team-4.jpg" alt="sunil"> </div>
              <div class="chat_ib">
                <h5>Frank <span class="chat_date">Apr 10</span></h5>
                <p>Can I be your friend? I will have you know that I graduated top of my class.</p>
              </div>
            </div>
            <div class="chat_people dropdown-item" to="/notifications" @click="togglePopupChat">
              <div class="chat_img"> <img src="img/theme/team-4.jpg" alt="sunil"> </div>
              <div class="chat_ib">
                <h5>Geralt <span class="chat_date">Oct 14</span></h5>
                <p>Sure we can meet at 10 tomorrow. Please bring a laptop with you.</p>
              </div>
            </div>
          
          <div class="chat_people dropdown-item" to="/notifications" @click="togglePopupChat">
            <div class="chat_img"> <img src="img/theme/team-4.jpg" alt="sunil"> </div>
            <div class="chat_ib">
              <h5>Jennifer <span class="chat_date">Oct 14</span></h5>
              <p>How's your day going?</p>
            </div>
          </div>      
        </div>       

        <div class="dropdown-divider"/>
        
        <router-link to="/messages" class="dropdown-item" v-if="signedIn">
          <i class="fas fa-clock"/>
          <span>All Messages </span>
        </router-link>

        <b-alert show variant="default" class="text-dark" v-if="!signedIn">
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
          <b-media no-body class="align-items-center" v-bind:class="{profileBorder: (this.$route.path == '/profile')}">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="/img/theme/team-4.jpg" />
              <!--TODO: Show profile pic-->
            </span>
          </b-media>
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
import Upload from "./../Upload.vue";  // imports the Upload.vue page into the current file

export default {
  components: {
    //CollapseTransition,
    BaseNav,
    Upload
    //Modal,
    //VueSlider
  },
  props: {
    logo: {
      type: String,
      default: '/img/brand/orange.png',
      description: 'AccessMyResearch Logo'
    },

    logoSmall: {
      type: String,
      default: '/img/brand/favicon.png',
      description: 'AccessMyResearch Small Logo'
    },

    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar",
    },

    chatIsOpen: {
      type: Boolean,
      default: false,
      description:
        "Whether the popup chatboxes are open or closed",
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
      //activeNotifications: false;
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
      //activeIcon: "",
      // autocomplete end
      /*results_data_actual: [],
      results_data: [],*/
      researchWindowIsOpen: false,
      // chatIsMinimized: false
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
    showModal: function(){
      this.show = true;
    },
    async getSearchHistory() {
      let history = await axios.get("http://localhost:3001/search");
      this.recentSearches = Object.entries(history.data).reverse().slice(0, 5);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },   
    // toggleNotificationDropDown(string) {
      toggleNotificationDropDown(){
      //console.log('Reaches toggle method');
      this.activeNotifications = !this.activeNotifications;
      
      // this.setActiveIcon('notifications');
      //this.setActiveIcon = 'notifications';
      //console.log(this.setActiveIcon);
    },
     togglePopupChat() {
      this.$emit('update', !this.chatIsOpen); // $emit notifies the parent component that a variable's value changed
    },

    toggleResearchWindow(){
      // Dashboard Navbar  is the parent class in which the researchWindow variable is flipped
      this.researchWindowIsOpen = !this.researchWindowIsOpen; 
    },
    overlay: function(event) {
    	if(event.target == event.currentTarget)
        this.toggleResearchWindow(); // toggles the research window when clicked anywhere on the overlay 
    },    
  
    researchWindowToggle(event){
      console.log("Navbar" + event);
        this.researchWindowIsOpen = event;    // updates the event variable each time chat is opened or closed
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

      for(const [key, value] of Object.entries(followList.data.lfouteristFollows.items)) //for all items in the rows
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
    closeModal(){
      this.modal = false;
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
    // setActiveIcon(string){
    //   this.activeIcon = string;
    //   console.log(this.activeIcon);
    // },
    toUpload() {
      this.$router.push('upload');
      // this.setActiveIcon('upload');
    },
    toDonate() {
      this.$router.push('donate');
    },
    toProject() {
      this.$router.push('project');
    },
    toCollections() {
      this.$router.push('collections');
      
    },
    toNetwork() {
      this.$router.push('network-list');
    },
    toMessages() {
      this.$router.push('messages');
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

b-form-input::placeholder{
  color:#F78626
}
.TopIcon {
  color: white;
  
} /*TODO: Get variables from assets/custom/_variables.scss instead*/
.TopIcon:hover {
  color: #F78626;
}

img{ max-width:100%;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}

.chat_img {
  float: left;
  width: 11%;
  
}

.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}

.overlay {
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  display:flex;
  align-items: center;
  /* height:100vh; */
  /* width:100%; */
  background-color:rgba(128, 128, 128, 0.5);
}

.research-window {
    margin:auto;
    /* position: absolute;
    z-index:999; */
  }

 @media screen and (max-width: 768px) {
   .logo{
      display:none;
   }

 }

 @media screen and (min-width: 768px) {
   .logoSmall{
      display:none;
   }

 }
  
.iconColor{
  color: #f78626;
}
.profileBorder {
  border: 4px solid #f78626;
  border-radius: 50%;
}
/* router-link img[data-v-0001a5f9]{
    max-width: none;
} */
</style>