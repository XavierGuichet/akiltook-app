import VueRouter from 'vue-router';
//import routes
import authRoutes from './auth';
import accountRoutes from './account';
import clubRoutes from './club';
import cmsRoutes from './cms';
import gameRoutes from './game';
import mediaObjectRoutes from './mediaObject';
import profileRoutes from './profile';
import tookRoutes from './took';
import teamRoutes from './team';

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...accountRoutes,
      ...authRoutes,
      ...clubRoutes,
      ...cmsRoutes,
      ...gameRoutes,
      ...mediaObjectRoutes,
      ...profileRoutes,
      ...tookRoutes,
      ...teamRoutes,
  ]
});

export default router
