<template>
  <nav class="navbar navbar-vertical fixed-left-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"> <!--TODO: Replace this logo with search bar-->
          <img :src="logo" class="navbar-brand-img" alt="AccessMyResearch">
      </router-link>
      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" mens-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell"/>
            </a>
            <a class="dropdown-item" to="/notifications"> <!--TODO: Link to notification-->
              <i class="fas fa-book-open"/>
              New Article by: Mehmet Günal
              <small class="form-text text-muted">Yesterday</small>
            </a>
            <a class="dropdown-item" to="/notifications">
              <i class="fas fa-user-friends"/>
              New friend: Mehmet Günal
              <small class="form-text text-muted">1 week ago</small>
            </a>
            <div class="dropdown-divider"/>
            <a class="dropdown-item" to="/notifications">
              <i class="fas fa-clock"/>
              All Notifications
            </a>
          </base-dropdown>
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-comment"/>
            </a>
            <a class="dropdown-item" to="/messages"> <!-- TODO: Link to Messages-->
              <i class="fas fa-comment"/>
              Mehmet Günal: Check out my research!
              <small class="form-text text-muted">Yesterday</small>
            </a>
            <a class="dropdown-item" to="/messages">
              <i class="far fa-comment"/>
              Greg Kitchen: Check out his research!
              <small class="form-text text-muted">1 week ago</small>
            </a>
            <div class="dropdown-divider"/>
            <a class="dropdown-item" to="/messages">
              <i class="fas fa-clock"/>
              All Messages
            </a>
          </base-dropdown>
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-4.jpg"> <!--TODO: Show profile pic-->
                </span>
              </div>
            </a>
            <div class=" dropdown-header noti-title">
                <h6 class="text-overflow m-0">Hi, Mehmet!</h6> <!--TODO: Show real first name-->
            </div>
            <router-link to="/profile" class="dropdown-item">
                <i class="fas fa-user"/>My profile
            </router-link>
            <router-link to="/network-list" class="dropdown-item">
                <i class="fas fa-user-friends"/>Network List
            </router-link>
            <router-link to="/collections" class="dropdown-item">
                <i class="fas fa-layer-group"/>Collections
            </router-link>
            <router-link to="/upload" class="dropdown-item">
                <i class="fas fa-plus"/>Upload
            </router-link>
            <b-dropdown-item to="/search-history">
              <i class="fas fa-history"/>Search History
            </b-dropdown-item>
            <div class="dropdown-divider"/>
            <router-link to="/settings" class="dropdown-item">
                <i class="fas fa-cog"/>Settings
            </router-link>
            <router-link to="/donate" class="dropdown-item">
                <i class="fas fa-donate"/>Donate
            </router-link>
            <a to="/login" class="dropdown-item">
                <i class="fas fa-sign-out-alt"/>Logout
            </a>
          </base-dropdown>
        </ul>
      </slot>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    logo: {
      type: String,
      default: '/img/brand/orange.png',
      description: 'AccessMyResearch Logo'
    }
  },
};
</script>