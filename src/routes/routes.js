import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFound from '@/views/NotFoundPage.vue';

import { AuthHelperRoles } from "@/util/auth-helper.js";
import { Auth } from "aws-amplify";


const routes = [
  //Unregistered User Routes - no navigation guarding
  {
    path: '/',
    redirect: 'home',
    component: DashboardLayout,

    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'results',
        name: 'results',
        component: () => import('../views/SearchResults.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Pages/UserProfile.vue')
      },
      {
        path: 'donate',
        name: 'donate',
        component: () => import('../views/Donate.vue')
      },
      {
        path: 'contact',
        name: 'contact us',
        component: () => import('../views/Contact.vue')
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('../views/Help.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: 'upload',
        name: 'Upload Research Window',
        component: () => import('../views/Upload.vue')
      },

      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('../views/Notifications.vue')
      },

      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/Messages.vue')
      },
    ]
  },

  //Authentication routes. No Navigation Guarding
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/Pages/Register.vue')
      },
      {
        path: 'forgotpassword',
        name: 'forgotpassword',
        component: () => import('../views/Pages/ForgotPassword.vue')
      },
      {
        path: 'codeverification',
        name: 'codeverification',
        component: () => import('../views/Pages/CodeVerification.vue')
      }
    ]
  },

  //Registered user routes - Basic navigatoin guarding - must be logged in.
  {
    path: '/',
    component: DashboardLayout,

    beforeEnter: function(to, from, next){
      //TODO once registrtion is fully functional, we will need to actually check if a user is logged in or not.
      next();
    },

    children: [
      {
        path: 'ask',
        name: 'ask an expert',
        component: () => import('../views/Ask.vue')
      },
      {
        path: 'collections',
        name: 'my collections',
        component: () => import('../views/Collections.vue')
      },
      {
        path: 'projects',
        name: 'my projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/Messages.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('../views/Notifications.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/Settings.vue')
      },
      {
        path: 'interests',
        name: 'interests',
        component: () => import('../views/Pages/Interests.vue')
      },
      {
        path: 'suggestedpeople',
        name: 'suggestions for you',
        component: () => import('../views/Pages/SuggestedPeople.vue')
      },
      {
        path: 'add',
        name: 'add users',
        component: () => import('../views/Pages/AddRemoveUsers.vue')
      },
      {
        path: 'search-history',
        name: 'search history',
        component: () => import('../views/SearchHistory.vue')
      },
      {
        path: 'profile-information',
        name: 'profile information',
        component: () => import('../views/Pages/ProfileInformation.vue')
      },
      {
        path: '/network-list',
        name: 'network list',
        component: () => import('../views/Pages/NetworkList.vue')
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('../views/Notifications.vue')
      },
      {
        path: '/requests',
        name: 'Requests',
        component: () => import('../views/Pages/UserRequests.vue')
      },
      {
        path: '/follows',
        name: 'Follows',
        component: () => import('../views/Pages/UserFollows.vue')
      },
      {
        path: '/user/:id',
        name: 'User',
        component: (id) => import('../views/Pages/UserInformation.vue')
      },
      {
        path: 'add',
        name: 'Add Users',
        component: () => import('../views/Pages/AddRemoveUsers.vue')
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/Upload.vue')
      },
      {
        path: '/messages',
        name: 'Messages',
        component: () => import('../views/Messages.vue')
      }
    ]
  },

  //Expert user routes - Strict navigating guarding (must pass AuthHelperRoles.isExpert())
  {
    path: '/',
    component: DashboardLayout,

    beforeEnter: async function(to, from, next){
      try{
        let user = await Auth.currentAuthenticatedUser()
        let isExpert = await AuthHelperRoles.isExpert(user);
        if(isExpert){
          next();
        }else{
          next({name: 'Home'});
        }
      }catch(e){
        next({ name: 'login' });
      }
    },

    children: [
      {
        path: 'upload',
        name: 'Add Research Material',
        component: () => import('../views/Upload.vue')
      },
    ]
  },

  //Admin user routes - Strict navigation guarding (must pass AuthHelperRoles.isAdmin())
  {
    path: '/admin',
    redirect: {name: 'Admin'},
    component: DashboardLayout,

    async beforeEnter(to, from, next){
      try{
        let user = await Auth.currentAuthenticatedUser()
        let isAdmin = await AuthHelperRoles.isAdmin(user);
        if(isAdmin){
          next();
        }else{
          next({name: 'Home'});
        }
      }catch(e){
        next({ name: 'login' });
      }
    },

    children: [
      {
        path: 'home',
        name: 'Admin',
        component: () => import('../views/Pages/Admin.vue')
      }
    ]
  },

  //404 route
  {
    path: '*',
    component: NotFound
  }
];

export default routes;