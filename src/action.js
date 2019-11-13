import * as types from './types'

const api = new Promise((resolve, reject) => setTimeout(() => resolve([1,2,3]), 3000))

export const loadSuccess = (data) => ({
  type: types.success,
  payload: data,
})

export const startFetch = () => ({
  type: types.loading,
})

export const fetchData = () => dispatch => {
  dispatch(startFetch())
  return api.then(data => dispatch(loadSuccess(data)))
}
