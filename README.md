This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Questions

- [x] One store for one app?

  - [x] What if one store in other?

- [ ] How middleware works?

  - [ ] middleware applied sequence matters.

  - [ ] what if I use dispatch given from the mapDispatchToProps in action creator?

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
