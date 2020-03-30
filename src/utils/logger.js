const logger = token => store => next => action => {
  console.log(token)

  console.group('action type:', action.type || (typeof action === 'function' && 'thunk'))
  console.info('dispatching', action)

  let result = next(action)

  console.log('next state', store.getState())
  console.groupEnd()

  return result
}

export default logger;
