// @flow
import path from 'path'
import fs from 'fs'
import slash from 'slash'
import normalizePathSeq from 'normalize-path-sep'
import type { Path } from 'types'

// eslint-disable-next-line flowtype/no-weak-types
export function toErrorStack(err: Object) {
  if (err._babel && err instanceof SyntaxError) {
    return `${err.name}: ${err.message}\n${err.codeFrame}`
  }
  return err.stack
}

export function getOutputPath(output: Path, input: Path): Path {
  if (path.isAbsolute(output)) {
    return output
  }

  return slash(
    path.join(path.dirname(normalizePathSeq(input)), normalizePathSeq(output))
  )
}

export function writeFileSync(outputPath: Path, code: string) {
  fs.writeFileSync(outputPath, code, 'utf-8')
}

export function relativeFromCwd(input: Path) {
  return slash(path.relative(process.cwd(), input))
}

export function getDirAndBaseName(testPath: string) {
  const dirname = path.dirname(testPath)
  const basename = path.basename(testPath)

  return {
    dirname,
    basename,
  }
}

export function isAlreadyExist(input: Path) {
  try {
    const code = fs.readFileSync(input, 'utf-8')
    if (code.length === 0 || code.trim() === '') {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

export function resolveInputPath(input: ?string, eventPath: Path): Path {
  if (!input) {
    return eventPath
  }

  if (path.isAbsolute(input)) {
    return input
  }

  return path.resolve(path.dirname(eventPath), input)
}
