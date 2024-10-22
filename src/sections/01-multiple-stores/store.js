import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from "redux-thunk";
import logger from '../../utils/logger'

import types from '../../utils/types'
import reducer from '../../utils/reducer'
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
  clearData: () => ({
    type: types.clear,
  })
}

const create = () => createStore(reducer, applyMiddleware(logger('🦦'), ReduxThunk));

export {
  create,
  actionCreator,
};
