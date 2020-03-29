import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from "redux-thunk";
import logger from '../../middlewares/logger'

import api from '../../utils/api'

const types = {
  loading: 'loading',
  success: 'success',
  clear: 'clear',
};

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

const initialState = {
  isLoading: false,
  data: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.loading: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case types.success: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    }
    case types.clear: {
      return {
        ...state,
        data: []
      }
    }
    default: return state
  }
}

const create = () => createStore(reducer, applyMiddleware(logger, ReduxThunk));

export {
  create,
  actionCreator,
};
