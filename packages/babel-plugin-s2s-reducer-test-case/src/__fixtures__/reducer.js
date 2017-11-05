import * as Actions from './actionTypes'

export default function(state, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { count: state + 1 }
    case Actions.DECREMENT:
      return { count: state - 1 }
    default:
      return state
  }
}
