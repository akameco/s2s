type Exact<T> = T & $Shape<T>

declare module 'enzyme-to-json' {
  declare module.exports: any => Object;
}

declare module 'redux-thunk' {
  declare module.exports: any => any;
}
