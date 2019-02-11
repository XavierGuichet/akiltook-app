import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const del = ({ commit }, item) => {
  commit(types.CLUB_DELETE_TOGGLE_LOADING)

  return fetch(item['@id'], { method: 'DELETE' })
    .then(() => {
      commit(types.CLUB_DELETE_TOGGLE_LOADING)
      commit(types.CLUB_DELETE_SET_DELETED, item)
    })
    .catch((e) => {
      commit(types.CLUB_DELETE_TOGGLE_LOADING)
      commit(types.CLUB_DELETE_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.CLUB_DELETE_RESET)
}
