// @flow

class Lock {
  _lock: Map<string, number>

  constructor() {
    this._lock = new Map()
  }

  has(input: string) {
    return this._lock.has(input)
  }

  add(input: string) {
    if (this.has(input)) {
      clearTimeout(this._lock.get(input))
    }

    const timer = setTimeout(() => {
      this._lock.delete(input)
      this.delete(input)
    }, 1000)

    this._lock.set(input, timer)
  }

  delete(input: string) {
    if (this.has(input)) {
      clearTimeout(this._lock.get(input))
      this._lock.delete(input)
    }
  }
}

export default new Lock()
