// @flow

export default class Lock<T: string> {
  _lock: Set<T>
  _timer: ?number

  constructor() {
    this._lock = new Set()
  }

  has(input: T) {
    return this._lock.has(input)
  }

  add(input: T) {
    this.clear()
    clearTimeout(this._timer)

    this._lock.add(input)

    this._timer = setTimeout(() => {
      this._lock.delete(input)
    }, 1000)
  }

  clear() {
    this._lock.clear()
  }
}
