import types from '../../utils/types'
import api from '../../utils/api'

const actionCreator = {
  loadSuccess: (data) => ({
    type: types.success,
    payload: data,
  }),
  startFetch: () => ({
    type: types.loading,
  }),
  fetchData: () => dispatch => {
    dispatch(actionCreator.startFetch())
    return api().then(data => dispatch(actionCreator.loadSuccess(data)))
  },
  fetchDataByDispatch: dispatch => {
    dispatch(actionCreator.startFetch())
    return api().then(data => dispatch(actionCreator.loadSuccess(data)))
  },
  clearData: () => ({
    type: types.clear,
  })
}

export {
  actionCreator,
}