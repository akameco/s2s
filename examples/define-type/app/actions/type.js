// @flow
type ADD = 'app/actions/ADD'
type INCREMENT = 'app/actions/INCREMENT'

type Action = { type: ADD } | { type: INCREMENT, n: number }
