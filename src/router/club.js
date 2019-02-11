import ClubList from '../components/club/List'
import ClubCreate from '../components/club/Create'
import ClubUpdate from '../components/club/Update'
import ClubShow from '../components/club/Show'

export default [
  { name: 'ClubList', path: '/clubs/', component: ClubList },
  { name: 'ClubCreate', path: '/clubs/create', component: ClubCreate },
  { name: 'ClubUpdate', path: '/clubs/edit/:id', component: ClubUpdate },
  { name: 'ClubShow', path: '/clubs/show/:id', component: ClubShow }
]
