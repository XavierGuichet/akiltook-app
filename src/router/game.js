import GameList from '../components/game/List'
import GameUserList from '../components/game/UserListView'
import GameCreate from '../components/game/Create'
import GameUpdate from '../components/game/Update'
import GameShow from '../components/game/Show'

export default [
  { name: 'GameList', path: '/games/', component: GameList, meta: {auth: ['ROLE_ADMIN']}, },
  { name: 'GameUserList', path: '/match/', component: GameUserList, meta: {auth: ['ROLE_USER','ROLE_ADMIN']}, },
  { name: 'GameCreate', path: '/games/create', component: GameCreate },
  { name: 'GameUpdate', path: '/games/edit/:id', component: GameUpdate },
  { name: 'GameShow', path: '/games/show/:id', component: GameShow }
]
