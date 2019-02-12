import MediaObjectList from '../components/mediaobject/List'
import MediaObjectCreate from '../components/mediaobject/Create'
import MediaObjectUpdate from '../components/mediaobject/Update'
import MediaObjectShow from '../components/mediaobject/Show'

export default [
  { name: 'MediaObjectList', path: '/mediaObjects/', component: MediaObjectList },
  { name: 'MediaObjectCreate', path: '/mediaObjects/create', component: MediaObjectCreate },
  { name: 'MediaObjectUpdate', path: '/mediaObjects/edit/:id', component: MediaObjectUpdate },
  { name: 'MediaObjectShow', path: '/mediaObjects/show/:id', component: MediaObjectShow }
]
