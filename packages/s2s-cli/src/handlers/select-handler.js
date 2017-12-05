// @flow
import micromatch from 'micromatch'
import handlerBabel from 's2s-handler-babel'
import hanlderTypeScript from 's2s-handler-typescript'
import type { Path, Handler } from 'types'

const DEFAULT_HANDLE_MAPPER = {
  '*.(js|jsx)': handlerBabel,
  '*.(ts|tsx)': hanlderTypeScript,
}

type HandlerMapper = { [extensions: string]: Handler }

export function selectHandler(
  handlerMapper: HandlerMapper,
  handler?: Handler,
  filepath: Path
): Handler {
  if (handler) {
    return handler
  }

  const finalHandlerMapper =
    Object.keys(handlerMapper).length > 0
      ? handlerMapper
      : DEFAULT_HANDLE_MAPPER

  for (const key of Object.keys(finalHandlerMapper)) {
    if (micromatch.isMatch(filepath, key, { matchBase: true })) {
      return finalHandlerMapper[key]
    }
  }

  throw new Error('any handlers not match')
}
