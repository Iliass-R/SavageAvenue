import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../../supabase';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/ui',
    name: 'UI',
    component: () => import('../views/ui/UiPage.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/auth/SignupPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginPage.vue'),
  },
  {
    path: '/creator-home',
    name: 'CreatorHome',
    component: () => import('../views/creatorView/CreatorHomePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/creatorView/OnboardingPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
  },
  {
    path: '/CommentCaMarche',
    name: 'CommentCaMarche',
    component: () => import('../views/ExplicationPage.vue'),
  },
  {
    path: '/defile',
    name: 'Defile',
    component: () => import('../views/DefilePage.vue'),
  },
  {
    path: '/defile/:id',
    name: 'DefileDetail',
    component: () => import('../views/DefileDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const session = await supabase.auth.getSession();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !session.data.session) {
    console.log('Redirection vers la page de connexion');
    next({ name: 'Login' });
  } else if (session.data.session && (to.name === 'Login' || to.name === 'SignUp')) {
    console.log('Redirection vers la page "creator-home"');
    next({ name: 'CreatorHome' });
  } else {
    console.log('Accès autorisé à la route');
    next();
  }
});

export default router;
