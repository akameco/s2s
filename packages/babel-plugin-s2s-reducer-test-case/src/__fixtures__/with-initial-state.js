import * as Actions from './actionTypes'

type State = {
  count: number,
}

const initialState: State = {
  count: 0,
}

export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { count: state + 1 }
    case Actions.DECREMENT:
      return { count: state - 1 }
    default:
      return state
  }
}
