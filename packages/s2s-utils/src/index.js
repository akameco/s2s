// @flow
import { relative, dirname, extname, normalize, sep } from 'path'
import slash from 'slash'
import babelTemplate from 'babel-template'
import * as t from 'babel-types'

export function trimExtension(path: string, ext: string = '.js') {
  return extname(path) === ext ? path.replace(ext, '') : path
}

export function getImportPath(from: string, to: string): string {
  const relativePath = slash(relative(dirname(from), to))
  const fomattedPath = trimExtension(relativePath)
  if (!/^\.\.?/.test(fomattedPath)) {
    return `./${fomattedPath}`
  }
  return fomattedPath
}

export function template(code: string, plugins: ?(string[]) = ['flow']) {
  return babelTemplate(code, { sourceType: 'module', plugins })
}

export function inheritsOpts() {
  return {
    // eslint-disable-next-line flowtype/no-weak-types
    manipulateOptions(opts: Object, parserOpts: Object) {
      ;['flow', 'objectRestSpread'].forEach(plugin => {
        parserOpts.plugins.push(plugin)
      })
    },
  }
}

export function getParentDirName(filePath: string) {
  const parentPath = normalize(dirname(filePath)).split(sep)
  return parentPath[parentPath.length - 1]
}

export function typeImport(local: string, imported: string, source: string) {
  const im = t.importDeclaration(
    [t.importSpecifier(t.identifier(local), t.identifier(imported))],
    t.stringLiteral(source)
  )
  im.importKind = 'type'
  return im
}

export function defaultImport(local: string, source: string) {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(local))],
    t.stringLiteral(source)
  )
}

export function createImportDeclaration(
  locals: string[] | string,
  source: string
) {
  const finalLocals = [].concat(locals)
  const specifiers = finalLocals.map(local => {
    const i = t.identifier(local)
    return t.importSpecifier(i, i)
  })
  return t.importDeclaration(specifiers, t.stringLiteral(source))
}
