// @flow
import * as constants from './constants'

export type Increment = {
  type: typeof constants.INCREMENT,
}

export type FetchUser = {
  type: typeof constants.FETCH_USER,
}

export type Action = Increment | FetchUser
