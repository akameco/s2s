export const SET: 'App/SET' = 'App/SET'

export const Actions = {
  SET,
}

export type Set = {
  type: typeof SET,
  count: number,
}

export type Action = Set
