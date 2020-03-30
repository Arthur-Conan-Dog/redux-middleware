This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Questions

- [x] One store for one app?

  - [x] What if one store in other?

- [x] How middleware works together?

  - [x] middleware applied sequence matters.

  - [x] what if I use dispatch given from the mapDispatchToProps in action creator?

- [ ] Ways of handling async calls

  - [ ] redux-promise

  - [ ] redux-saga

- [ ] How does reducer match actions?

## Tasks

- [x] Show comparisons on same page.

- [ ] Add nav function.

## FAQ

### Only One Redux Store Per App?

这是官方建议必须遵守的原则，但 Redux 也支持一个应用多个 store 的情况。

为什么要求一个应用只由一个 store 来管理？=> https://stackoverflow.com/questions/33619775/redux-multiple-stores-why-not => 大部分原因在于 Redux 是基于 Flux 的一个改进方案，跟 Flux 的实现所带来的问题有一定关系。具体：1. 通过多个 store 而试图模块化的方式可以通过组合 reducer 来实现。2. 服务端渲染时无需根据 ID 等唯一标示来区分 store。3. Redux DevTools Time Travel 成为可能。4. 单一 store 能够确保 subscriber 消费数据时，数据已被处理，而多 store 则不能保证这点。

#### What if one store in other?

It will find the closest store to connect.

### How middleware works together?

一些能够帮助理解的断点 & 源码：

* logger.js => console.info('dispatching', action) & console.log('next state', store.getState())

* redux-thunk index.js => return action(dispatch, getState, extraArgument) & return next(action)

* redux/src/applyMiddleware.ts => https://github.com/reduxjs/redux/blob/9d3273846aa8906d38890c410b62fb09a4992018/src/applyMiddleware.ts#L75

  * 为 middleware 暂存 store 的引用

* redux/src/compose.ts => https://github.com/reduxjs/redux/blob/9d3273846aa8906d38890c410b62fb09a4992018/src/compose.ts#L101

  * 巧妙地使用 reduce 来完成 chaining => store.dispatch => c) b) a) => new "dispatch"

实现接入 middleware 机制代码的演变过程：

1. 接入单个 middleware：在 dispatch 前后加入自己的逻辑

```js
function addLoggerLogicOntoDispatch(store) {
  let dispatch = store.dispatch
  store.dispatch = (action) => {
    console.log('something')
    dispatch(action)
    return action
  }
}
```

2. 接入多个 middleware

```js
function addLoggerLogicOntoDispatch(store) {
  // ...
}

function addReportLogicOntoDispatch(store) {
  // samiliar as addLoggerLogicInDispatch
}

// add middlewares' logic onto dispatch
addLoggerLogicOntoDispatch()
addReportLogicOntoDispatch()
```

3. 不想在每个middleware的内部实现中保留对 dispatch 胡作非为的逻辑

```js
function logger(store) {
  return dispatch => action => {
    console.log(action)
    dispatch(action)
    return action
  }
}

store.dispatch = logger(store)(store.dispatch) // a new dispatch with logger logic in it

function reporter(store) {
  return dispatch => action => {
    // ...
  }
}

store.dispatch = reporter(store)(store.dispatch) // a new dispatch with logger + dispatch loggic in it
```

4. 美化遍历 & chaining middlewares 的逻辑

```js
const compose = middlewares.reduce((prev, next) => (...args) => prev(next(args)))
dispatch = compose()(store.dispatch)
```

#### For thunk's implementation, what if I use dispatch given from the mapDispatchToProps in action creator?

是可以工作的。但是以 logger 为例，dispatch thunk type of action 这件事由于逻辑的简化就不会被记录下来了。另外在使用形式上也与其他 action 不符，因而显得不美观。
