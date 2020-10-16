<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <a href="#" aria-current="page" class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-auto">
      <b-form
        class="navbar-search form-inline mr-sm-3"
        :class="{
          'navbar-search-dark': type === 'default',
          'navbar-search-light': type === 'light'
        }"
        id="navbar-search-main"
        @submit="onSubmit"
      >
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <b-form-input
              id="search"
              v-model="search.text"
              @input="filterRecentSearches"
              @focus="modal = false"
              autocomplete="off"
              type="text"
              placeholder="Search by Keyword or Author">
            </b-form-input>
            <!-- autocomplete start -->
            <div v-if="filteredRecentSearches && !modal" class="AutoCompleteDropDown">
              <ul class="list">
                <li
                  v-for="filteredRecentSearch in filteredRecentSearches"
                  :key="filteredRecentSearch.id"
                  @click="setSearch(filteredRecentSearch)"
                >
                  {{ filteredRecentSearch }}
                </li>
              </ul>
            </div>
            <!-- autocomplete start -->
            <!-- start here  -->
            <div class="SearchDropDown">
              <b-dropdown variant="Primary" right text="">
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.SortByAccordion variant="primary">Sort By</b-button>
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
                            @input="sort()"
                            v-model="selectedSortBy"
                            :options="sortBy">
                          </b-form-select>
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
                      <b-button block v-b-toggle.expertiseAccordion variant="primary">Expertise</b-button>
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
                      <b-button block v-b-toggle.yearAccordion variant="primary">Year</b-button>
                    </b-card-header>
                    <b-collapse
                      id="yearAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-dropdown-group class="small">
                          <br />
                          <vue-slider
                            v-model="value"
                            :min="1950"
                            :max="2020"
                            :enable-cross="false"
                            :tooltip="'always'"
                          ></vue-slider>
                          <br />
                          <div>Years Selected: {{ value }}</div>
                        </b-dropdown-group>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>

                <!-- <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.viewAccordion variant="primary"
                        >View Count</b-button
                      >
                    </b-card-header>
                    <b-collapse
                      id="viewAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-dropdown-group class="small">
                          <b-form-checkbox-group
                            id="viewCountFilter"
                            v-model="selectedViewCount"
                            :options="views"
                            name="viewcount"
                          ></b-form-checkbox-group>
                        </b-dropdown-group>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div> -->

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
                      <b-button block v-b-toggle.databaseAccordion variant="primary">Database</b-button>
                    </b-card-header>
                    <b-collapse
                      id="databaseAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-dropdown-group class="small">
                          <b-form-checkbox-group
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
                <div>
                  <!-- need to arrange correctly  -->
                  <b-form-checkbox-group
                    v-model="selectedFilters"
                    :options="defaultFilter"
                  ></b-form-checkbox-group>
                  <b-button class="btn float-right" variant="primary">Search</b-button>
                </div>
              </b-dropdown>
            </div>
            <!-- end here -->
          </b-input-group>
        </b-form-group>
      </b-form>

      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
            aria-haspopup="true" aria-expanded="false" @click="redirect">
            <i class="fas fa-bell"></i>
        </a>
        <a class="dropdown-item" to="/notifications"> <!-- TODO: Link to Notification-->
          <i class="fas fa-book-open"></i>
          New Article by: Mehmet Günal
          <small class="form-text text-muted">Yesterday</small>
        </a>
        <a class="dropdown-item" to="/notifications">
          <i class="fas fa-user-friends"></i>
          New friend: Mehmet Günal
          <small class="form-text text-muted">1 week ago</small>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" to="/notifications">
          <i class="fas fa-clock"></i>
          All Notifications
        </a>
      </base-dropdown>
      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
            aria-haspopup="true" aria-expanded="false" @click="redirect">
            <i class="fas fa-comment"></i>
        </a>
        <a class="dropdown-item" to="/messages"> <!-- TODO: Link to Messages-->
          <i class="fas fa-comment"></i>
          Mehmet Günal: Check out my research!
          <small class="form-text text-muted">Yesterday</small>
        </a>
        <a class="dropdown-item" to="/messages">
          <i class="far fa-comment"></i>
          Greg Kitchen: Check out his research!
          <small class="form-text text-muted">1 week ago</small>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" to="/messages">
          <i class="fas fa-clock"></i>
          All Messages
        </a>
      </base-dropdown>
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="User Profile" src="img/theme/team-4.jpg"> <!--TODO: Show profile pic-->
                  </span>
          </b-media>
          <!-- </b-media> -->
        </a>

        <template>
          <b-dropdown-header class="noti-title" v-if="signedIn">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item to="/profile" v-if="signedIn">
            <i class="fas fa-user"></i>
            <span>My profile</span>
          </b-dropdown-item>
          <b-dropdown-item to="/activity" v-if="signedIn">
            <i class="far fa-calendar-alt"></i>
            <span>Activity</span>
          </b-dropdown-item>
          <div class="dropdown-divider" v-if="signedIn"></div>
          <b-dropdown-item to="/settings" v-if="signedIn">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item to="/donate">
            <i class="fas fa-donate"></i>
            <span>Donate</span>
          </b-dropdown-item>
          <b-dropdown-item to="/login" v-if="!signedIn">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </b-dropdown-item>
          <b-dropdown-item @click="signOut" v-if="signedIn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import { Auth } from 'aws-amplify';
import axios from 'axios';

export default {
  components: {
    //CollapseTransition,
    BaseNav,
    //Modal,
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  mounted() {
    this.hover_flag = false;
    var inside = this;
    axios
      .get("https://www.mocky.io/v2/5c7b98562f0000c013e59f07")
      .then(function (response) {
        //console.log(response);
        inside.results_data_actual = response.data.data;
        response.data.data.map(function (results) {
          inside.likes.count += results.likes;
        });
        inside.results_data_actual = inside.results_data_actual.map(function (
          results
        ) {
          results.active_like = false;
          return results;
        });
        inside.results_data = response.data.data;
      })
      .catch(function (error) {
        // console.log(error);
      });
  },
  created() {
      if(this.$store.state.signedIn === true)
      {
        this.signedIn = true;
      }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      signedIn: false,
      timeTotal: 0,
      //autocomplete start
      modal: false, 
      recentSearches: [],
      filteredRecentSearches: [],
      //autocomplete end
      /*results_data_actual: [],
      results_data: [],*/
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
      selectedAreas: [],
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
      selectedExpertise: [],
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
      selectedViewCount: [],
      views: [
        {
          text: "Ascending",
          value: "ascend",
        },
        {
          text: "Descending",
          value: "descend",
        },
      ],
      selectedType: [],
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
      selectedDatabase: [],
      databases: [
        {
          text: "Academic Search",
          value: "academic-search",
        },
        {
          text: "arXiv",
          value: "arxiv",
        },
        {
          text: "Association for Computing Machinery Digital Library",
          value: "association-for-computing-machinery-digital-library",
        },
        {
          text: "DBLP",
          value: "dblp",
        },
        {
          text: "GENESIS",
          value: "genesis",
        },
        {
          text: "Global Health",
          value: "global-health",
        },
        {
          text: "Google Scholar",
          value: "google-scholar",
        },
        {
          text: "HubMed",
          value: "hubmed",
        },
        {
          text: "IEEE Xplore",
          value: "ieee-xplore",
        },
        {
          text: "MEDLINE",
          value: "medline",
        },
        {
          text: "MyScienceWork",
          value: "MyScienceWork",
        },
        {
          text: "PubChem",
          value: "pubchem",
        },
        {
          text: "PubMed",
          value: "pubmed",
        },
        {
          text: "PubPsych",
          value: "pubpsych",
        },
        {
          text: "ScienceOpen",
          value: "scienceopen",
        },
      ]
    };
  },
  methods: {
    async onSubmit(evt) {
      this.timeTotal = 0;
      let duplication = false; 
      for (let i = 0; i < this.recentSearches.length; i++){ //check for recent searches
        if (this.recentSearches[i] == this.search.text){
          duplication = true; 
        }
      }
      if (!duplication){ //No duplication for recent searches allowed
        this.recentSearches.push(this.search.text); //autocomplete adding to recentSearches array
      }
      this.$router.push({ path: 'results', query: {text: this.search.text, filter: this.search.filter} }).catch(()=>{});
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
      Auth.signOut().then(data => {
        this.$store.state.signedIn = !!data;
        this.$router.push('login');
      })
      .catch(err => console.log(err));
    },
    redirect() {
      if(this.$store.state.signedIn === false)
      {
        this.$router.push('login');
      }
    },
    sort() {
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
    search_text() { //FOR DATABASE IN FUTURE
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
    filterRecentSearches () {
      this.filteredRecentSearches = this.recentSearches.filter(recentSearch => {
        return recentSearch.toLowerCase().startsWith(this.search.text.toLowerCase())
      })
    },
    setSearch (recentSearch) {
      this.search.text = recentSearch
      this.modal = false
    },
    //autocomplete end
  },
};
</script>
