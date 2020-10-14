import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: DashboardLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/upload',
        name: 'upload an article',
        component: () => import('../views/Upload.vue')
      },
      {
        path: '/ask',
        name: 'ask an expert',
        component: () => import('../views/Ask.vue')
      },
      {
        path: '/collections',
        name: 'my collections',
        component: () => import('../views/Collections.vue')
      },
      {
        path: '/projects',
        name: 'my projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: '/messages',
        name: 'messages',
        component: () => import('../views/Messages.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Pages/UserProfile.vue')
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('../views/Notifications.vue')
      },
      {
        path: '/activity',
        name: 'activity',
        component: () => import('../views/Activity.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/Settings.vue')
      },
      {
        path: '/donate',
        name: 'donate',
        component: () => import('../views/Donate.vue')
      },
      {
        path: '/contact',
        name: 'contact us',
        component: () => import('../views/Contact.vue')
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('../views/Help.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/interests',
        name: 'interests',
        component: () => import('../views/Pages/Interests.vue')
      },
      {
        path: '/results',
        name: 'results',
        component: () => import('../views/SearchResults.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Pages/Register.vue')
      },
      {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: () => import('../views/Pages/ForgotPassword.vue')
      },
      {
        path: '/codeverification',
        name: 'codeverification',
        component: () => import('../views/Pages/CodeVerification.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;