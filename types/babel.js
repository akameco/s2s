// @flow

export type BabelNode = {
  type: string,
  [key: string | number]: *,
}

export type BabelPath = {
  type: string,
  node: BabelNode,
  [key: string | number]: *,
  get(key: string): BabelNode,
}

export type File = Object // eslint-disable-line flowtype/no-weak-types

export type State = {
  opts: Object, // eslint-disable-line flowtype/no-weak-types
  file: File,
}
