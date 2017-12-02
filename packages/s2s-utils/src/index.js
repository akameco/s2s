// @flow
import path from 'path'
import slash from 'slash'
import babelTemplate from 'babel-template'
import normalizePathSeq from 'normalize-path-sep'
import * as t from 'babel-types'

export function trimExtension(filename: string, ext: string = '.js') {
  return path.extname(filename) === ext ? filename.replace(ext, '') : filename
}

export function getImportPath(from: string, to: string): string {
  const relativePath = slash(
    path.relative(path.dirname(normalizePathSeq(from)), normalizePathSeq(to))
  )
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
  const parentPath = slash(path.dirname(normalizePathSeq(filePath))).split('/')
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
