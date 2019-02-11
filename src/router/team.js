import TeamList from '../components/team/List'
import TeamCreate from '../components/team/Create'
import TeamUpdate from '../components/team/Update'
import TeamShow from '../components/team/Show'

export default [
  { name: 'TeamList', path: '/teams/', component: TeamList },
  { name: 'TeamCreate', path: '/teams/create', component: TeamCreate },
  { name: 'TeamUpdate', path: '/teams/edit/:id', component: TeamUpdate },
  { name: 'TeamShow', path: '/teams/show/:id', component: TeamShow }
]
