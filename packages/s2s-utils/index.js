// @flow
const { relative, dirname, extname, normalize } = require('path')
const slash = require('slash')
const babelTemplate = require('babel-template')
const t = require('babel-types')

function trimExtension(path /* : string */, ext /* : string */ = '.js') {
  return extname(path) === ext ? path.replace(ext, '') : path
}

function getImportPath(from /* : string */, to /* : string */) /* : string */ {
  const relativePath = slash(relative(dirname(from), to))
  const fomattedPath = trimExtension(relativePath)
  if (!/^\.\.?/.test(fomattedPath)) {
    return `./${fomattedPath}`
  }
  return fomattedPath
}

function template(code /* : string */, plugins /* :?string[] */ = ['flow']) {
  return babelTemplate(code, { sourceType: 'module', plugins })
}

function inheritsOpts() {
  return {
    manipulateOptions(opts /* : Object */, parserOpts /* : Object */) {
      ;['flow', 'objectRestSpread'].forEach(plugin => {
        parserOpts.plugins.push(plugin)
      })
    },
  }
}

function getParentDirName(path /* : string */) {
  const parentPath = normalize(dirname(path)).split('/')
  return parentPath[parentPath.length - 1]
}

function typeImport(
  local /*: string*/,
  imported /*: string*/,
  source /*: string */
) {
  const im = t.importDeclaration(
    [t.importSpecifier(t.identifier(local), t.identifier(imported))],
    t.stringLiteral(source)
  )
  im.importKind = 'type'
  return im
}

function defaultImport(local /*: string */, source /*: string*/) {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(local))],
    t.stringLiteral(source)
  )
}

exports.defaultImport = defaultImport
exports.getImportPath = getImportPath
exports.template = template
exports.inheritsOpts = inheritsOpts
exports.getParentDirName = getParentDirName
exports.typeImport = typeImport
