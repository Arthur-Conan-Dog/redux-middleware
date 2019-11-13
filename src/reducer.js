import * as types from './types'
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
    default: return state
  }
}

export default reducer
