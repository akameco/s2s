// @flow
export type A_TYPE = 'a/test'
export type C_TYPE = 'c/test'

export type Action = {| +type: A_TYPE | C_TYPE |}
