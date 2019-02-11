import TookList from '../components/took/List'
import TookCreate from '../components/took/Create'
import TookUpdate from '../components/took/Update'
import TookShow from '../components/took/Show'

export default [
  { name: 'TookList', path: '/tooks/', component: TookList },
  { name: 'TookCreate', path: '/tooks/create', component: TookCreate },
  { name: 'TookUpdate', path: '/tooks/edit/:id', component: TookUpdate },
  { name: 'TookShow', path: '/tooks/show/:id', component: TookShow }
]
