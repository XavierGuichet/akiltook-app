import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.ACCOUNT_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.ACCOUNT_SHOW_TOGGLE_LOADING)
      commit(types.ACCOUNT_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.ACCOUNT_SHOW_TOGGLE_LOADING)
      commit(types.ACCOUNT_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.ACCOUNT_SHOW_RESET)
}
