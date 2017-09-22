// @flow
import path from 'path'
import fs from 'fs'
import { transformFileSync } from 'babel-core'

type Path = string
type Filename = string
type Code = string

export function log(msg: string) {
  console.log(msg)
}

export function compile(
  filename: Filename,
  opts: Object
): { code?: Code, ignored: boolean } {
  try {
    return transformFileSync(filename, opts)
  } catch (err) {
    console.error(toErrorStack(err))
    return { ignored: true }
  }
}

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

  return path.resolve(path.dirname(input), output)
}

export function writeFileSync(outputPath: Path, code: string) {
  fs.writeFileSync(outputPath, code, 'utf-8')
}

export function relativeFromCwd(input: Path) {
  return path.relative(process.cwd(), input)
}

export function getDirAndBaseName(testPath: string) {
  const dirname = path.dirname(testPath)
  const basename = path.basename(testPath)

  return {
    dirname,
    basename,
  }
}
