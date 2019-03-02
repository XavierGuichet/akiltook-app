import AuthLogin from '../components/auth/Login'
import AuthOauthLogin from '../components/auth/OauthLogin'
import AuthRegiser from '../components/auth/Register'

export default [
  { name: 'AuthLogin', path: '/login/', component: AuthLogin },
  { name: 'AuthLoginFacebook', path: '/login/oauth/facebook', component: AuthOauthLogin },
  { name: 'AuthLoginGoogle', path: '/login/oauth/google', component: AuthOauthLogin },
  { name: 'AuthRegister', path: '/register/', component: AuthRegiser },
]
