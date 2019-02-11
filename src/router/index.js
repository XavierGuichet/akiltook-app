import VueRouter from 'vue-router';
//import routes
import authRoutes from './auth';
import accountRoutes from './account';
import clubRoutes from './club';
import gameRoutes from './game';
import tookRoutes from './took';
import teamRoutes from './team';

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...accountRoutes,
      ...authRoutes,
      ...clubRoutes,
      ...gameRoutes,
      ...tookRoutes,
      ...teamRoutes,
  ]
});

export default router
