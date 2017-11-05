// @flow
type Age = number

type User = {
  id: number,
  name: string,
  age: ?Age,
  sex?: string,
}

let defaultUser: User

type Info = {
  user: User,
  users: Array<User>,
  union: string | number,
}

let info: Info
