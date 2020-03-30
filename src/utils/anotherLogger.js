const anotherLogger = () => next => action => {
  console.log('🐞----------')

  let result = next(action)

  console.log('🐞----------')

  return result
}

export default anotherLogger
