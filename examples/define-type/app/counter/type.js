// @flow
type ADD = 'app/counter/ADD'
type INCREMENT = 'app/counter/INCREMENT'

type Action = { type: ADD } | { type: INCREMENT, n: number }
