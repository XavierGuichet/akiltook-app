import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

const getItems = ({ commit }, page = '/sport_events?order[startAt]=asc&startAt[after]=-1%20days') => {
  commit(types.TOGGLE_LOADING)

  fetch(page)
    .then(response => response.json())
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ITEMS, data['hydra:member'])
      commit(types.SET_VIEW, data['hydra:view'])
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export default getItems
