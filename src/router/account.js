import AccountList from '../components/account/List'
import AccountCreate from '../components/account/Create'
import AccountUpdate from '../components/account/Update'
import AccountShow from '../components/account/Show'

export default [
  { name: 'AccountList', path: '/accounts/', component: AccountList },
  { name: 'AccountCreate', path: '/accounts/create', component: AccountCreate },
  { name: 'AccountUpdate', path: '/accounts/edit/:id', component: AccountUpdate },
  { name: 'AccountShow', path: '/accounts/show/:id', component: AccountShow }
]
