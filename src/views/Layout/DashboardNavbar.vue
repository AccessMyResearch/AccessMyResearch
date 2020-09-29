<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{'navbar-dark': type === 'default'}"
  >
    <a href="#" aria-current="page" class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-auto">
      <b-form class="navbar-search form-inline mr-sm-3"
            :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'light'}"
            id="navbar-search-main"
            @submit="onSubmit">
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <b-form-input id="search" v-model="searchQuery" required placeholder="Search by keyword or author" type="text"> </b-form-input>
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
          </b-input-group>
        </b-form-group>
      </b-form>
      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
            aria-haspopup="true" aria-expanded="false">
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
            aria-haspopup="true" aria-expanded="false">
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
                    <img alt="Image placeholder" src="img/theme/team-4.jpg"> <!--TODO: Show profile pic-->
                  </span>
          </b-media>
        </a>

        <template>
          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item to="/profile">
            <i class="fas fa-user"></i>
            <span>My profile</span>
          </b-dropdown-item>
          <b-dropdown-item to="/activity">
            <i class="far fa-calendar-alt"></i>
            <span>Activity</span>
          </b-dropdown-item>
          <div class="dropdown-divider"></div>
          <b-dropdown-item to="/settings">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item to="/donate">
            <i class="fas fa-donate"></i>
            <span>Donate</span>
          </b-dropdown-item>
          <b-dropdown-item to="/login">
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
import { Client } from 'elasticsearch';
// CHANGE EVENTUALLY
const client = new Client({ node: 'http://localhost:9200/' })
export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
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
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    async search() {
      return await client.search({
        index: 'amr',
        body: {
          query: {
            query_string: {
              fields: ["title", "author", "message"],
              query: this.searchQuery
            }
          }
        }
      }).then(function(res) {
        return res.hits.hits;
      }, function(err) {
        console.err(err);
      });
    },
    async onSubmit(evt) {
      alert(JSON.stringify(await this.search()));
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    }
  }
};
</script>
