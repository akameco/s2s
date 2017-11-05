export const INCREMENT: 'App/INCREMENT' = 'App/INCREMENT'
export const DECREMENT: 'App/DECREMENT' = 'App/DECREMENT'

export const Actions = {
  INCREMENT,
  DECREMENT,
}

export type Increment = {
  type: typeof INCREMENT,
}

export type Decrement = {
  type: typeof DECREMENT,
}

export type Action = Increment | Decrement
