<template>
  <div class="main-content bg-default">
    <base-nav
      v-model="showMenu"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main navbar-top navbar-dark"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <b-navbar-brand to="/">
          <img src="img/brand/white.png">
        </b-navbar-brand>
      </div>

     <template>
       <div class="navbar-collapse-header">
         <b-row>
           <b-col cols="6" class="collapse-brand">
             <router-link to="/">
               <img src="img/brand/orange.png">
             </router-link>
           </b-col>
           <b-col cols="6" class="collapse-close">
             <button type="button" class="navbar-toggler" @click="showMenu = false" v-b-toggle.nav-text-collapse>
               <span></span>
               <span></span>
             </button>
           </b-col>
         </b-row>
       </div>
         <b-navbar-nav  class="align-items-lg-center ml-lg-auto">
           <b-nav-item to="/home">
               <i class="fas fa-home"/>
               <span class="nav-link-inner--text">Home</span>
           </b-nav-item>
           <b-nav-item to="/register">
               <i class="far fa-user"/>
               <span class="nav-link-inner--text">Register</span>
           </b-nav-item>
           <b-nav-item to="/login">
               <i class="fas fa-user circle"/>
               <span class="nav-link-inner--text">Login</span>
           </b-nav-item>
       </b-navbar-nav>
     </template>
    </base-nav>

    <div class="main-content">
      <zoom-center-transition
        :duration="pageTransitionDuration"
        mode="out-in"
      >
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <footer class="py-2" id="footer-main">
      <b-container >
        <b-row align-v="center" class="justify-content-xl-between">
          <b-col xl="6">
            <div class="copyright text-center text-xl-left text-muted">
              © 2021 <a href="#" class="font-weight-bold ml-1" target="_blank">AccessMyResearch</a>
            </div>
          </b-col>
          <b-col xl="6" class="col-xl-6">
            <b-nav align="center" class="nav-footer justify-content-lg-end">
              <b-nav-item to="/contact">
                Contact Us 
              </b-nav-item>
              <b-nav-item to="/help">
                Help
              </b-nav-item>
              <b-nav-item to="/about">
                About
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
  import { BaseNav } from '@/components';
  import { ZoomCenterTransition } from 'vue2-transitions';

  export default {
    components: {
      BaseNav,
      ZoomCenterTransition
    },
    props: {
      backgroundColor: {
        type: String,
        default: 'black'
      }
    },
    data() {
      return {
        showMenu: false,
        menuTransitionDuration: 250,
        pageTransitionDuration: 200,
        pageClass: 'login-page'
      };
    },
    computed: {
      title() {
        return `${this.$route.name} Page`;
      }
    },
    methods: {
      toggleNavbar() {
        document.body.classList.toggle('nav-open');
        this.showMenu = !this.showMenu;
      },
      closeMenu() {
        document.body.classList.remove('nav-open');
        this.showMenu = false;
      },
      setBackgroundColor() {
        document.body.classList.add('bg-default');
      },
      removeBackgroundColor() {
        document.body.classList.remove('bg-default');
      },
      updateBackground() {
        if (!this.$route.meta.noBodyBackground) {
          this.setBackgroundColor();
        } else {
          this.removeBackgroundColor()
        }
      }
    },
    beforeDestroy() {
      this.removeBackgroundColor();
    },
    beforeRouteUpdate(to, from, next) {
      // Close the mobile menu first then transition to next page
      if (this.showMenu) {
        this.closeMenu();
        setTimeout(() => {
          next();
        }, this.menuTransitionDuration);
      } else {
        next();
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler: function () {
          this.updateBackground()
        }
      }
    }
  };
</script>
<style lang="scss">
  $scaleSize: 0.8;
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    100% {
      opacity: 1;
    }
  }

  .main-content .zoomIn {
    animation-name: zoomIn8;
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-content .zoomOut {
    animation-name: zoomOut8;
  }
</style>
