# babel-plugin-s2s-action-types

> generate action types

## Install

```
$ npm install --save-dev babel-plugin-s2s-action-types
```

## Usage

#### In:

```js
export type Action = Increment
```

#### Out:

```js
// @flow
export const INCREMENT: 'app/counter/INCREMENT' = 'app/counter/INCREMENT'

export const Actions = {
  INCREMENT,
}

export type Increment = {
  type: typeof INCREMENT,
}

export type Action = Increment
```

### Request/Success/Failure pattern

#### In:

```js
export type Action = FetchRequest
```

#### Out:

```js
export const FETCH_REQUEST: 'app/counter/FETCH_REQUEST' =
  'app/counter/FETCH_REQUEST'
export const FETCH_SUCCESS: 'app/counter/FETCH_SUCCESS' =
  'app/counter/FETCH_SUCCESS'
export const FETCH_FAILURE: 'app/counter/FETCH_FAILURE' =
  'app/counter/FETCH_FAILURE'

export const Actions = {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
}

export type FetchRequest = {
  type: typeof FETCH_REQUEST,
}
export type FetchSuccess = {
  type: typeof FETCH_SUCCESS,
}
export type FetchFailure = {
  type: typeof FETCH_FAILURE,
}

export type Action = FetchRequest | FetchSuccess | FetchFailure
```
