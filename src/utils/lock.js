// @flow

export default class Lock {
  _lock: Set<string>
  _timer: ?number

  constructor() {
    this._lock = new Set()
  }

  has(input: string) {
    return this._lock.has(input)
  }

  add(input: string) {
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
