export const error = state => state.error
export const isLoading = state => state.isLoading
export const items = state => state.items
export const view = state => state.view
export const itemById = (state) => {
  return (id) => {
    let item = state.items.find(obj => { return obj['@id'] == id })
    return item || {}
  }
}
