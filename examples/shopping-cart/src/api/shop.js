// @flow
import _products from './products.json'

const TIMEOUT = 100

export function getProducts(cb: (*) => void, timeout: number = TIMEOUT) {
  setTimeout(() => {
    cb(_products)
  }, timeout)
}

export function buyProducts(
  payload: *,
  cb: () => void,
  timeout: number = TIMEOUT
) {
  setTimeout(() => {
    cb()
  }, timeout)
}
